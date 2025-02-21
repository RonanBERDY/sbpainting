import { Component,signal } from '@angular/core';
import { PicsListComponent } from '../../video/pics-list/pics-list.component';
import { ContactUsComponent } from "../../user/contact/contact.component";
@Component({
  selector: 'app-home',
  imports: [PicsListComponent, ContactUsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
