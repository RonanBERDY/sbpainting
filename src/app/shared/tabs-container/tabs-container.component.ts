import { Component, contentChildren, AfterContentInit } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabs-container',
  imports: [],
  templateUrl: './tabs-container.component.html',
  styleUrl: './tabs-container.component.css'
})
export class TabsContainerComponent implements AfterContentInit {
  tabs = contentChildren(TabComponent);  //@ContentChildren permet de récupérer et manipuler une liste de 
  // composants ou directives projetés 
  // dans un autre composant via le contenu transclus (<ng-content>) et voir auth-model ici on voit que tabcompo est children de tab container
  ngAfterContentInit(): void {
    console.log(this.tabs())   
  }
}
