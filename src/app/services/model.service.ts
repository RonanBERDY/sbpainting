import { Injectable, signal } from '@angular/core';

// Une interface est comme un plan qui décrit à quoi un objet doit ressembler.
interface Imodel {
  id: string; 
  element: HTMLDialogElement; 
}


@Injectable({
  providedIn: 'root' // Rend ce service disponible partout dans l'application
})
export class ModelService {
 

  private model = signal<Imodel[]>([]); //La propriété model n'est accessible qu'à l'intérieur de la classe ModelService.

  constructor() { }
  register(id:string,element:HTMLDialogElement){
    this.model.set([
      ...this.model(),
      {
        id,element,
      }
    ]);
    
  }
}
