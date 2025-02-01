import { Component } from '@angular/core';
import { ModelComponent } from '../../shared/model/model.component';
import { TabsContainerComponent } from '../../shared/tabs-container/tabs-container.component';
import { TabComponent } from '../../shared/tab/tab.component';
import { LoginComponent } from "../login/login.component";
import { RegisterComponent } from "../register/register.component";

@Component({
  selector: 'app-auth-model',
  imports: [ModelComponent, TabComponent, TabsContainerComponent, LoginComponent, RegisterComponent],
  templateUrl: './auth-model.component.html',
  styleUrl: './auth-model.component.css'
})
export class AuthModelComponent {

}
