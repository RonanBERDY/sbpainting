import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms'; //formbuilder c le container de form
import { CommonModule } from '@angular/common'; //permet d importer jsonpipe
import { InputComponent } from '../../shared/input/input.component';
import { AlertComponent } from "../../shared/alert/alert.component";
import { AuthService } from '../../services/auth.service';
import { Match } from './validators';
import { EmailTaken } from './validators';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, InputComponent, AlertComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  fb=inject(FormBuilder);
  auth=inject(AuthService);
  emailtaken=inject(EmailTaken);
  form=this.fb.nonNullable.group({
    name:['',[Validators.required,Validators.minLength(3)]],email:['',[Validators.email],this.emailtaken.validate,],
    password:['',[Validators.required, Validators.pattern(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/)]],
    confirm_password:['',[Validators.required]],//if age age:[18] + regexr.com pour les pattern
  },{
    validators:[Match('password','confirm_password')], //global variable
  }
);
  showAlert=signal(false);
  Alertmsg=signal('please wait !');
  alertColor=signal('blue');
  inSubmission=signal(false)


  async register(){                   //async car on retourne une promise

    this.showAlert.set(true);
    this.Alertmsg.set('please wait !');
    this.alertColor.set('blue');
    this.inSubmission.set(true);
    try{
      await this.auth.createUser(this.form.getRawValue());
      this.Alertmsg.set('Success, your account has been created');
      this.alertColor.set('green');
    }
    catch(e){
      console.log(e);
      this.Alertmsg.set('An expected error occured, please try again later');
      this.alertColor.set('red');
      this.inSubmission.set(false);
      return;
    }
  }

}
