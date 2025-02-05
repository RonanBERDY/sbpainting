import { Component,signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from "../../shared/alert/alert.component";

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
  showAlert=signal(false);
  Alertmsg=signal('please wait !');
  alertColor=signal('blue');
  login(){
    this.showAlert.set(true);
    this.Alertmsg.set('please wait !');
    this.alertColor.set('blue');
  }
}
