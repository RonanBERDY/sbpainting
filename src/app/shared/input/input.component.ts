import { Component,input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule,],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  control=input.required<FormControl>();
}
