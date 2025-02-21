import { NgIf } from '@angular/common';
import { Component,inject,signal } from '@angular/core';
import { ContactUsComponent } from '../../user/contact/contact.component';
import { ModelService } from '../../services/model.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-about',
  imports: [ContactUsComponent,NgIf],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  model=inject(ModelService);
  auth=inject(AuthService);
  showContact: boolean = false;
  toggleContact() {
    this.showContact = !this.showContact;
  }
}
