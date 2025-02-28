import { Component,signal,inject } from '@angular/core';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from '../../shared/alert/alert.component';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { InputComponent } from '../../shared/input/input.component';
@Component({
  selector: 'app-contact',
  imports: [FormsModule,AlertComponent,ReactiveFormsModule,InputComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactUsComponent {
  fb=inject(FormBuilder);
  form=this.fb.nonNullable.group({
      user_name:['',[Validators.required,Validators.minLength(3)]],user_email:['',[Validators.email]],
      //if age age:[18] + regexr.com pour les pattern test
    }
  );
  public sendEmail(e: Event) {
    e.preventDefault();

    emailjs
      .sendForm('service_yp4wven', 'template_tghz0y2', e.target as HTMLFormElement, {
        publicKey: 'PgSrUMitIoKpNsiUx',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', (error as EmailJSResponseStatus).text);
        },
      );
      this.showAlert.set(true);
      this.Alertmsg.set("Successfully sent");
      this.alertColor.set("green");
  }

  showAlert=signal(false);
  Alertmsg=signal('');
  alertColor=signal('');
  inSubmission=signal(false);

}
