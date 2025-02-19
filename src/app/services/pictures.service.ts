import { Injectable,inject } from '@angular/core';
import { Firestore,addDoc,collection, query,where,getDocs,doc,updateDoc, deleteDoc } from '@angular/fire/firestore';
import IPic from '../models/pictures.models';
import { Auth } from '@angular/fire/auth';
import { Storage,ref,deleteObject } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class PicturesService {
  private firestore=inject(Firestore);
  private picturecollection=collection(this.firestore,'SBpaintings');
  private auth=inject(Auth);
  storage=inject(Storage);

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
}
