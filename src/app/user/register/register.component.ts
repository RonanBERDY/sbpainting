import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms'; //formbuilder c le container de form
import { CommonModule } from '@angular/common'; //permet d importer jsonpipe
import { InputComponent } from '../../shared/input/input.component';
import { AlertComponent } from "../../shared/alert/alert.component";

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, InputComponent, AlertComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  fb=inject(FormBuilder);
  form=this.fb.nonNullable.group({
    name:['',[Validators.required,Validators.minLength(3)]],email:['',[Validators.email]],
    password:['',[Validators.required, Validators.pattern(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/)]],
    confirm_password:['',[Validators.required]],//if age age:[18] + regexr.com pour les pattern
  });
  showAlert=signal(false);
  Alertmsg=signal('please wait !');
  alertColor=signal('blue');
  register(){
    this.showAlert.set(true);
    this.Alertmsg.set('please wait !');
    this.alertColor.set('blue');
  }

}
