import { Injectable,inject,signal } from '@angular/core';
import { Firestore,addDoc,collection, query,where,getDocs,doc,updateDoc,getDoc, deleteDoc,orderBy,limit,startAfter,QueryConstraint, QueryDocumentSnapshot } from '@angular/fire/firestore';
import IPic from '../models/pictures.models';
import { Auth } from '@angular/fire/auth';
import { Storage,ref,deleteObject } from '@angular/fire/storage';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PicturesService {
  private firestore=inject(Firestore);
  private picturecollection=collection(this.firestore,'SBpaintings');
  private auth=inject(Auth);
  storage=inject(Storage);
  pagepic=signal<IPic[]>([]);
  lastdoc:QueryDocumentSnapshot | null =null;
  pendingrequest=false;
  router = inject(Router);


  constructor() { }


  async createpicture(data:IPic){
    return await addDoc(this.picturecollection,data);
  }

  async getUserPics(){
    const q=query(this.picturecollection,
       where('uid','==',this.auth.currentUser?.uid));
       return await getDocs(q);
  }
  async updatepic(id:string,title:string){
    const picRef=doc(this.firestore,'SBpaintings', id);
    return await updateDoc(picRef,{
      title,
    });
  }
  async deletepic(pic:IPic){
    const fileref=ref(this.storage, `SBpainting/${pic.filename}`);
    console.log(fileref);
    await deleteObject(fileref);

    const docRef = doc(this.firestore,'SBpaintings',pic.docId as string);
    console.log(docRef);
    await deleteDoc(docRef);
  }

  async getPics(){
    if (this.pendingrequest) return ;

    this.pendingrequest=true;
    const queryParams: QueryConstraint[]=[
      orderBy('timestamp','desc'),limit(6),
    ];
    if (this.pagepic().length){
      queryParams.push(
        startAfter(this.lastdoc)
      );
    }

    const q=query(this.picturecollection,...queryParams);
    const snapshot=await getDocs(q);
    this.pendingrequest=false;

    if (!snapshot.docs.length) return;
    this.lastdoc=snapshot.docs[snapshot.docs.length -1];
    snapshot.docs.forEach((doc)=>{this.pagepic.set([...this.pagepic(),{
      title : doc.get('title'),
      filename : doc.get('filename'),
      pictureurl :doc.get('pictureurl'),
      timestamp : doc.get('timestamp'),
      docId:doc.id,
      uid:doc.get('uid'),
      type:doc.get('type'),
      dimension:doc.get('dimension'),
    }])})

  }



  async resolve(id: string) {
    const snapshot = await getDoc(doc(this.firestore, 'SBpaintings', id));

    if (!snapshot.exists()) {
      this.router.navigate(['/']);

      return null;
    }
    return snapshot.data() as IPic;
  }
}
