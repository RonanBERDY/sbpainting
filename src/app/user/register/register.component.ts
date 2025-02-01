import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms'; //formbuilder c le container de form

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  fb=inject(FormBuilder);
  form=this.fb.nonNullable.group({
    name:[''],email:[''],password:[''],confirm_password:[''],//if age age:[18]
  });
}
