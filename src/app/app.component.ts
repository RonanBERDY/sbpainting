import { Component,signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthModelComponent } from './user/auth-model/auth-model.component';
import { NavComponent } from './core/nav/nav.component';




@Component({
  selector: 'app-root',
  imports: [AuthModelComponent,NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
