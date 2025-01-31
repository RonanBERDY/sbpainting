import { Component, input,signal } from '@angular/core';

@Component({
  selector: 'app-tab',
  imports: [],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.css'
})
export class TabComponent {
  tabTitle=input('');
  active=signal(false) //au debut tous sont falses
}
