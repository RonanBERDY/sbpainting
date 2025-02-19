import { PicturesService } from './../../services/pictures.service';
import { Component, OnInit, OnDestroy,inject,input } from '@angular/core';
import { RouterLink } from '@angular/router';




@Component({
  selector: 'app-pics-list',
  imports: [RouterLink ],
  templateUrl: './pics-list.component.html',
  styleUrl: './pics-list.component.css'
})
export class PicsListComponent implements OnInit,OnDestroy {
  pictureservice=inject(PicturesService);
  scrollable=input(true);

  constructor(){
    this.pictureservice.getPics();
  }
  ngOnInit(): void {
    if (this.scrollable()){
      window.addEventListener('scroll',this.handlescroll);
    }

  }
  ngOnDestroy(): void {
    if (this.scrollable()){
      window.removeEventListener('scroll',this.handlescroll);
    }
    this.pictureservice.pagepic.set([])
  }
  handlescroll= ()=>{
    const { scrollTop,offsetHeight} = document.documentElement;
    const {innerHeight} = window;
    const bottomofthewindow= Math.round(scrollTop) + innerHeight > offsetHeight -150;
    if(bottomofthewindow){
      this.pictureservice.getPics();
    }
  };
}
