import { AuthService } from './services/auth.service';
import { Component,signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthModelComponent } from './user/auth-model/auth-model.component';
import { NavComponent } from './core/nav/nav.component';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [AuthModelComponent,NavComponent,AsyncPipe,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  auth=inject(AuthService);
}
