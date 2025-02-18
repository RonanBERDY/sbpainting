import { Component, inject } from '@angular/core';
import { ModelService } from '../../services/model.service';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe } from '@angular/common';
import { Auth } from '@angular/fire/auth';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [AsyncPipe,RouterLink,RouterLinkActive,NgIf],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  model=inject(ModelService);
  auth=inject(AuthService);
  authfb=inject(Auth);
  authSvc = inject(AuthService);
  openModel($event:Event){
    $event.preventDefault();  //pour pas que l user soit rediriger vers une autre page
    this.model.toggle('auth')
  }
  async logout($event:Event){
      $event.preventDefault();  //pour pas que l user soit rediriger vers une autre page
      this.auth.logout($event);
    }

}
