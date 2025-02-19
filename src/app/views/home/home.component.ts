import { Component } from '@angular/core';
import { PicsListComponent } from '../../video/pics-list/pics-list.component';
@Component({
  selector: 'app-home',
  imports: [PicsListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
