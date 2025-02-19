import { Component,inject, OnInit,signal,computed } from '@angular/core';
import { RouterLink, Router, ActivatedRoute,Params } from '@angular/router';
import { PicturesService } from '../../services/pictures.service';
import IPic from '../../models/pictures.models';
import { EditComponent } from '../../video/edit/edit.component';
import { ModelService } from '../../services/model.service';

@Component({
  selector: 'app-manage',
  imports: [RouterLink,EditComponent],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css'
})
export class ManageComponent implements OnInit {
  router=inject(Router);
  route=inject(ActivatedRoute);
  order=signal('1');
  picservice=inject(PicturesService);
  pics=signal<IPic[]>([]);
  model=inject(ModelService);
  activepic=signal<IPic|null>(null);

  sort($event: Event){
    const{value}=$event.target as HTMLSelectElement;
    this.router.navigate([],{
      relativeTo:this.route,
      queryParams:{sort:value}
    }
    );
  }
  async ngOnInit() {
    this.route.queryParams.subscribe((params:Params)=>{   // this.route.queryParams est un Observable qui “émet” chaque fois que les query params (les paramètres dans l’URL, ex. ?sort=2) changent.
      this.order.set(params['sort']=== 2 ? '2':'1')
    });
    const results=await this.picservice.getUserPics();
    console.log(results);
    results.forEach((document)=>{
      const data=document.data();
      this.pics.set([...this.pics(),{docId:document.id,
        filename:data['filename'],
        title:data['title'],
        pictureurl:data['pictureurl'],
        timestamp :data['timestamp'],
        uid:data['uid'],
        dimension:data['dimension'],
        type:data['type'],
      }]);
    });
  }

  openModel($event:Event,pic:IPic){
    $event.preventDefault();
    this.activepic.set(pic);
    this.model.toggle('editpic');
  }
  update($event:IPic){
    const currentpic=this.pics();
    currentpic.forEach((element,index)=>{
      if (element.docId == $event.docId){
        currentpic[index].title=$event.title;
      }
    });
    this.pics.set(currentpic);
  }

  orderedpic=computed(()=>{
    return this.pics().sort((a,b)=>{return this.order()==='1' ?
      a.timestamp.toMillis()-b.timestamp.toMillis() : b.timestamp.toMillis()-a.timestamp.toMillis(); });
  });

  deletepainting($event:Event,pic:IPic){
    $event.preventDefault();
    this.picservice.deletepic(pic);

    const currentpic=this.pics();
    currentpic.forEach((element,index)=>{
      if (element.docId == pic.docId){
        currentpic.splice(index,1);
      }
    });
    this.pics.set(currentpic);
  }
}
