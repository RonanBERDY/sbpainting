import { Injectable,inject,signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword,updateProfile, authState,signOut } from '@angular/fire/auth';
import { Firestore, collection, addDoc, doc, setDoc } from '@angular/fire/firestore';
import IUser from '../models/user.model';
import {delay} from 'rxjs/operators';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth=inject(Auth); //# = private
  private firestore=inject(Firestore)
  router=inject(Router);
  route=inject(ActivatedRoute);
  authstate$= authState(this.auth);
  authstatewithdelay$=this.authstate$.pipe(
    delay(1000)
  );
  email = signal<string | null>(null);
  constructor(){

  }
  async createUser(userData: IUser){
    const {email,password,name}=userData;

      const usercred = await createUserWithEmailAndPassword(
      this.auth,email,password);

      await setDoc(doc(this.firestore,'names',usercred.user.uid),{name,email});
      console.log(usercred)
      console.log('User UID:', usercred.user.uid);

      updateProfile(usercred.user,{
        displayName:userData.name,
      });

  }
  async logout($event?:Event){
    $event?.preventDefault();  //pour pas que l user soit rediriger vers une autre page
    await signOut(this.auth);
    this.router.navigateByUrl('/');
  }
}
