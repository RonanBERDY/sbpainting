import { Component, contentChildren, AfterContentInit } from '@angular/core';
import { TabComponent } from '../tab/tab.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-tabs-container',
  standalone: true,
  imports:[NgClass],
  // or you might need `imports: [CommonModule]` or so...
  templateUrl: './tabs-container.component.html',
  styleUrls: ['./tabs-container.component.css']
})

export class TabsContainerComponent implements AfterContentInit {
  tabs = contentChildren(TabComponent);
  //@ContentChildren permet de récupérer et manipuler une liste de
  // composants ou directives projetés
  // dans un autre composant via le contenu transclus (<ng-content>) et voir auth-model ici on voit que tabcompo est children de tab container
  ngAfterContentInit() {
    // If `this.tabs` is truly a signal-based QueryList,
    // you might do `this.tabs().find(...)`
    const activeTab = this.tabs().find(tab => tab.active()); //cherche un onglet actif
    if (!activeTab) {
      this.selectTab(this.tabs()[0]);
    }
  }

  selectTab(tab: TabComponent) { //fait le toggle
    this.tabs().forEach(tab => tab.active.set(false));
    tab.active.set(true);

    return false; //pour eviter de changer de link pour eviter le default event
  }
}

