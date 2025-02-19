import { Component, inject,signal, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PicsListComponent } from '../../video/pics-list/pics-list.component';
import IPic from '../../models/pictures.models';

@Component({
  selector: 'app-paintings',
  imports: [PicsListComponent],
  templateUrl: './paintings.component.html',
  styleUrl: './paintings.component.css'
})
export class PaintingsComponent implements OnInit{
  route=inject(ActivatedRoute);
  id=signal('');
  URL=signal('');
  pic=signal<IPic |null>(null);
  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.pic.set(data['pic']);
      // Ici, pas besoin d'initialiser un player vidéo
      console.log('Donnée painting:', this.pic());
    });
  }
}
