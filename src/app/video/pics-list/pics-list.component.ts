import { Component, OnInit, OnDestroy,inject } from '@angular/core';
import { PicturesService } from '../../services/pictures.service';
import { RouterLink } from '@angular/router';




@Component({
  selector: 'app-pics-list',
  imports: [RouterLink ],
  templateUrl: './pics-list.component.html',
  styleUrl: './pics-list.component.css'
})
export class PicsListComponent implements OnInit,OnDestroy {
  pictureservice=inject(PicturesService);

  constructor(){
    this.pictureservice.getPics();
  }
  ngOnInit(): void {
    window.addEventListener('scroll',this.handlescroll);
  }
  ngOnDestroy(): void {
    window.removeEventListener('scroll',this.handlescroll)
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
