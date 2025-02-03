import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms'; //formbuilder c le container de form
import { CommonModule } from '@angular/common'; //permet d importer jsonpipe
import { InputComponent } from '../../shared/input/input.component';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,CommonModule,InputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  fb=inject(FormBuilder);
  form=this.fb.nonNullable.group({
    name:['',[Validators.required,Validators.minLength(3)]],email:['',[Validators.email]],password:['',[Validators.required, Validators.minLength(6)]],confirm_password:[''],//if age age:[18]
  });
}
