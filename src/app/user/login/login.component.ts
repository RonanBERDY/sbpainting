import { Component,signal,inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from "../../shared/alert/alert.component";
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  imports: [FormsModule, AlertComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentiales={
    email:'',
    password:'',
  }
  authSvc   = inject(AuthService);
  auth=inject(Auth);
  showAlert=signal(false);
  Alertmsg=signal('');
  alertColor=signal('');
  inSubmission=signal(false);
  async login(){
    this.showAlert.set(true);
    this.Alertmsg.set('please wait !');
    this.alertColor.set('blue');
    this.inSubmission.set(true);
    try{
      await signInWithEmailAndPassword(this.auth,this.credentiales.email,this.credentiales.password);
      this.showAlert.set(true);
      this.authSvc.email.set(this.credentiales.email);
      this.Alertmsg.set("Successfully signed");
      this.alertColor.set("green");

    } catch(e){
      this.showAlert.set(true);
      this.Alertmsg.set("Error");
      this.alertColor.set("red");
      this.inSubmission=signal(false);
    }
  }
}
