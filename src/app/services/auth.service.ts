import { Injectable,inject,signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword,updateProfile, authState,signOut } from '@angular/fire/auth';
import { Firestore, collection, addDoc, doc, setDoc } from '@angular/fire/firestore';
import IUser from '../models/user.model';
import {delay,filter,map,switchMap} from 'rxjs/operators';
import { Router,ActivatedRoute,NavigationEnd } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth=inject(Auth); //# = private
  private firestore=inject(Firestore)
  router=inject(Router);
  route=inject(ActivatedRoute);
  authstate$= authState(this.auth);
  redirect=false;
  authstatewithdelay$=this.authstate$.pipe(
    delay(1000)
  );
  email = signal<string | null>(null);
  constructor(){
    this.router.events.pipe(
      filter((event)=> event instanceof NavigationEnd),
      map((event)=>{
        let currentRoute = this.route;
        while (currentRoute.firstChild){
          currentRoute=currentRoute.firstChild
        }
        return currentRoute
      }),switchMap((route)=>route.data)  // permet de retrouver la data de la route qu on a defini dans app route
    ).subscribe((data)=>{
      this.redirect = data['adminOnly'] ?? false ;
    });
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
    if (this.redirect){
    await this.router.navigateByUrl('/');}
  }
}
