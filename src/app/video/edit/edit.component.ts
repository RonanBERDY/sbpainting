import { Component,input,inject, effect,signal } from '@angular/core';
import { ModelComponent } from "../../shared/model/model.component";
import IPic from '../../models/pictures.models';
import { ReactiveFormsModule,Validators,FormBuilder } from '@angular/forms';
import { InputComponent } from '../../shared/input/input.component';
import { AlertComponent } from '../../shared/alert/alert.component';
import { NgClass } from '@angular/common';
import { PicturesService } from '../../services/pictures.service';
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
      });
    }
    showAlert=signal(false);
    Alertmsg=signal('please wait !');
    alertColor=signal('blue');
    inSubmission=signal(false);
    picservice=inject(PicturesService)
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
    }
}
