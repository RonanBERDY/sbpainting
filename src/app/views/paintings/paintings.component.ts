import { Component, inject,signal, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-paintings',
  imports: [],
  templateUrl: './paintings.component.html',
  styleUrl: './paintings.component.css'
})
export class PaintingsComponent implements OnInit{
  route=inject(ActivatedRoute);
  id=signal('');
  ngOnInit(): void {
    this.id.set(this.route.snapshot.params['id']);
  }
}
