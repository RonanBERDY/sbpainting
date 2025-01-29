import { Injectable, signal } from '@angular/core';
//un service permet de gerer les données et de les partager vers differents component
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
    ]);}
  toggle(id:string){
      const model=this.model().find((item)=> item.id === id);
      if (!model) return; //on va pas plus loin si model est empty
      if (model.element.open) {
        model.element.close()
      }
      else {
        model.element.showModal();
      }
    };

   

  
}
