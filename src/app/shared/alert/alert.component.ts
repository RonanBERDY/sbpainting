import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-alert',
  imports: [NgClass],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  @Input() color: string = 'blue';  //Angular utilise @Input() pour recevoir des valeurs d'un composant parent.
  get bgColor() {
    return `bg-${this.color}-400`
  }
}
