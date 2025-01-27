import { Component, inject } from '@angular/core';
import { ModelService } from '../../services/model.service';


@Component({
  selector: 'app-model',
  imports: [],
  templateUrl: './model.component.html',
  styleUrl: './model.component.css'
})
export class ModelComponent {
  model=inject(ModelService);

  constructor(){  //permet d initialiser , est lance en first
    console.log(this.model)
  }
}
