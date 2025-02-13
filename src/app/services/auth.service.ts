import { Injectable,inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword,updateProfile, authState } from '@angular/fire/auth';
import { Firestore, collection, addDoc, doc, setDoc } from '@angular/fire/firestore';
import IUser from '../models/user.model';
import {delay} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth=inject(Auth); //# = private
  private firestore=inject(Firestore)
  authstate$= authState(this.auth);
  authstatewithdelay$=this.authstate$.pipe(
    delay(1000)
  );

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
}
