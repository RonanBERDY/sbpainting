import { Component, inject, input,viewChild,AfterViewInit,ElementRef } from '@angular/core';
import { ModelService } from '../../services/model.service';


@Component({
  selector: 'app-model',
  imports: [],
  templateUrl: './model.component.html',
  styleUrl: './model.component.css'
})
export class ModelComponent implements AfterViewInit {
  model=inject(ModelService);
  id=input.required<string>();
  dialog=viewChild.required<ElementRef<HTMLDialogElement>>('basedialog'); //en gros on a dans le dom html une balise dialogue
  //  identifiable avec #basedialog et avec viewchield on va pouvoir acceder ou load ce basedialog 

  constructor(){  //permet d initialiser , est lance en first
    
  }
  ngAfterViewInit() {
    this.model.register(this.id(),this.dialog().nativeElement)
  }
  closeModel(){
    this.model.toggle('auth')
    }
}
