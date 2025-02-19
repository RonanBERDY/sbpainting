import { Component,input,inject, effect,signal,output } from '@angular/core';
import { ModelComponent } from "../../shared/model/model.component";
import IPic from '../../models/pictures.models';
import { ReactiveFormsModule,Validators,FormBuilder } from '@angular/forms';
import { InputComponent } from '../../shared/input/input.component';
import { AlertComponent } from '../../shared/alert/alert.component';
import { NgClass } from '@angular/common';
import { PicturesService } from '../../services/pictures.service';
import { ModelService } from '../../services/model.service';
@Component({
  selector: 'app-edit',
  imports: [ModelComponent,ReactiveFormsModule,InputComponent,AlertComponent,NgClass],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  activepic=input<IPic|null>(null);
  fb=inject(FormBuilder);
  form=this.fb.nonNullable.group({
    id:[''],
    title:['', [Validators.required,Validators.minLength(3)]],

    });
    constructor(){
      effect(()=>{
        this.form.controls.id.setValue(this.activepic()?.docId ?? '');
        this.form.controls.title.setValue(this.activepic()?.title ?? '');
        this.inSubmission.set(false);
        this.showAlert.set(false);
      },{allowSignalWrites:true});
    }
    showAlert=signal(false);
    Alertmsg=signal('please wait !');
    alertColor=signal('blue');
    inSubmission=signal(false);
    picservice=inject(PicturesService);
    model=inject(ModelService);
    update=output<IPic>();

    async submit(){
      this.showAlert.set(true);
      this.Alertmsg.set('please wait !');
      this.alertColor.set('blue');
      this.inSubmission.set(true);
      try{
      await this.picservice.updatepic(
        this.form.controls.id.value,
        this.form.controls.title.value,
      );}catch(e){
      this.showAlert.set(true);
      this.Alertmsg.set('Error');
      this.alertColor.set('red');
      this.inSubmission.set(false);
      return;
      }
      const updatedPic = this.activepic();
      if (updatedPic){
        updatedPic.title=this.form.controls.title.value;
        this.update.emit(updatedPic) ;
      }

      this.showAlert.set(true);
      this.Alertmsg.set('Success !');
      this.alertColor.set('green');
      this.inSubmission.set(false);
      setTimeout(() => {
        this.showAlert.set(false);
        this.model.toggle('editpic');
      }, 3000);
    }
}
