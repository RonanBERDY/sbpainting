import { Component,signal,inject, OnDestroy } from '@angular/core';
import { EventBlockerDirective } from '../../shared/directives/event-blocker.directive';
import { NgClass } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validator, Validators } from '@angular/forms';
import { InputComponent } from '../../shared/input/input.component';
import {
  Storage,
  ref,
  uploadBytesResumable,
  fromTask,
  getDownloadURL,
  UploadTask,
} from '@angular/fire/storage';
import { v4 as uuid } from 'uuid';
import { AlertComponent } from '../../shared/alert/alert.component';
import { PicturesService } from '../../services/pictures.service';
import { Router } from '@angular/router';
import { serverTimestamp, Timestamp } from 'firebase/firestore';
import { timestamp } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { PercentPipe } from '@angular/common';
@Component({
  selector: 'app-upload',
  imports: [EventBlockerDirective,NgClass,ReactiveFormsModule,InputComponent,AlertComponent,PercentPipe  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent implements OnDestroy {
  isdragover=signal(false);
  file=signal<File | null>(null);
  nextstep=signal(false);
  fb=inject(FormBuilder);
  private picservice=inject(PicturesService);
  private storage=inject(Storage);
  private router=inject(Router);
  private auth=inject(Auth);
  form=this.fb.nonNullable.group({
    title:['', [Validators.required,Validators.minLength(3)]],

  });
  storefile($event:Event){
    this.isdragover.set(false);

    this.file.set(($event as DragEvent).dataTransfer?.files.item(0) ?? null );
    if (this.file()?.type !== "image/png") return;
    this.form.controls.title.setValue(this.file()?.name.replace(/\.[^/.]+$/,'') ?? '')
    this.nextstep.set(true);
  }

  showAlert=signal(false);
  Alertmsg=signal('please wait !');
  alertColor=signal('blue');
  inSubmission=signal(false)
  showPercentage = signal(false);
  percentage=signal(0);
  pituretask?: UploadTask;
  uploadFile() {
    this.inSubmission.set(true);
    this.showAlert.set(true);

    const picturefilename=uuid();
    const pngPath=`SBpainting/${picturefilename}.png`;
    const pictureref=ref(this.storage,pngPath);

    this.pituretask = uploadBytesResumable(pictureref, this.file() as File);




    fromTask(this.pituretask).subscribe({
      next: (snapshot: any) => {
        this.form.disable();

        const progress = snapshot.bytesTransferred / snapshot.totalBytes;

        this.percentage.set(progress);
      },
      error: (error: any) => {
        this.form.enable();

        this.alertColor.set('red');
        this.Alertmsg.set('Upload failed! Please try again later.');
        this.inSubmission.set(false);
        this.showPercentage.set(false);

        console.error(error);
      },
      complete: async () => {
        const pictureurl = await getDownloadURL(pictureref);

        const picture={
          title : this.form.controls.title.value,
          filename : `${picturefilename}.png`,
          pictureurl,
          timestamp:serverTimestamp() as Timestamp,
          uid: this.auth.currentUser?.uid as string,
        };

        const picdocref= await this.picservice.createpicture(picture);

        this.alertColor.set('green');
        this.Alertmsg.set(
          'Success! Your clip is now ready to share with the world.'
        );
        this.showPercentage.set(false);
        setTimeout(()=>{this.router.navigate(['paintings',picdocref.id]);},1000);

      },
    });
  }
  ngOnDestroy() {
    this.pituretask?.cancel();
  }


}








