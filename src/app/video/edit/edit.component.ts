import { Component,input,inject, effect } from '@angular/core';
import { ModelComponent } from "../../shared/model/model.component";
import IPic from '../../models/pictures.models';
import { ReactiveFormsModule,Validators,FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit',
  imports: [ModelComponent,ReactiveFormsModule],
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

      });
    }
}
