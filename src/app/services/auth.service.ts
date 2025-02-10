import { Injectable,inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import IUser
 from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth=inject(Auth); //# = private
  private firestore=inject(Firestore)
  constructor() { }
  async createUser(userData: IUser){
    const {email,password,name}=userData;

      const usercred = await createUserWithEmailAndPassword(
      this.auth,email,password);
      await addDoc(collection(this.firestore,'names'),{name,email});
      console.log(usercred)



  }
}
