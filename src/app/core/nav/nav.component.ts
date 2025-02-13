import { Component, inject } from '@angular/core';
import { ModelService } from '../../services/model.service';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [AsyncPipe,],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  model=inject(ModelService);
  auth=inject(AuthService);
  openModel($event:Event){
    $event.preventDefault();  //pour pas que l user soit rediriger vers une autre page
    this.model.toggle('auth')
  }

}
