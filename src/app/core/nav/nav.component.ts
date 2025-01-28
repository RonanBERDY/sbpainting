import { Component, inject } from '@angular/core';
import { ModelService } from '../../services/model.service';


@Component({
  selector: 'app-nav',
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  model=inject(ModelService);
  openModel($event:Event){
    $event.preventDefault();  //pour pas que l user soit rediriger vers une autre page
    this.model.toggle('auth')
  }
}
