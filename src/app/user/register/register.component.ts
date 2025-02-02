import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms'; //formbuilder c le container de form
import { CommonModule } from '@angular/common'; //permet d importer jsonpipe


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  fb=inject(FormBuilder);
  form=this.fb.nonNullable.group({
    name:['',[Validators.required]],email:['',[Validators.email]],password:['',[Validators.required, Validators.minLength(6)]],confirm_password:[''],//if age age:[18]
  });
}
