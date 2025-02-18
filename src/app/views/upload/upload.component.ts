import { Component,signal,inject } from '@angular/core';
import { EventBlockerDirective } from '../../shared/directives/event-blocker.directive';
import { NgClass } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validator, Validators } from '@angular/forms';
import { InputComponent } from '../../shared/input/input.component';
import { Storage, ref,uploadBytesResumable } from '@angular/fire/storage';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-upload',
  imports: [EventBlockerDirective,NgClass,ReactiveFormsModule,InputComponent ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
  isdragover=signal(false);
  file=signal<File | null>(null);
  nextstep=signal(false);
  fb=inject(FormBuilder);
  private storage=inject(Storage);
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

  uploadfile(){
    const picturefilename=uuid();
    const pngPath=`SBpainting/${picturefilename}.png`;
    const pictureref=ref(this.storage,pngPath);
    uploadBytesResumable(pictureref, this.file() as File);
  }
}
