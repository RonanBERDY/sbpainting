import { Component,inject, OnInit,signal } from '@angular/core';
import { RouterLink, Router, ActivatedRoute,Params } from '@angular/router';
@Component({
  selector: 'app-manage',
  imports: [RouterLink],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css'
})
export class ManageComponent implements OnInit {
  router=inject(Router);
  route=inject(ActivatedRoute);
  order=signal('1');
  sort($event: Event){
    const{value}=$event.target as HTMLSelectElement;
    this.router.navigate([],{
      relativeTo:this.route,
      queryParams:{sort:value}
    }
    );
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params:Params)=>{   // this.route.queryParams est un Observable qui “émet” chaque fois que les query params (les paramètres dans l’URL, ex. ?sort=2) changent.
      this.order.set(params['sort']=== 2 ? '2':'1')
    });
  }
}
