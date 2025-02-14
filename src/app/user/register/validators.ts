import { ValidationErrors, AbstractControl, ValidatorFn } from "@angular/forms";
import { Auth, fetchSignInMethodsForEmail } from "@angular/fire/auth";
import { inject, Injectable } from "@angular/core";
import { AsyncValidator } from "@angular/forms";

export function Match(controlname:string,
  matchingcontrolname:string
): ValidatorFn {
  return (group:AbstractControl): ValidationErrors | null=> {
  const control = group.get(controlname);
  const matchingcontrol = group.get(matchingcontrolname);
  if (!control || !matchingcontrol){
    return{controlNotfound:false}
  }
  const error = control.value == matchingcontrol.value ? null : {noMatch:true};
  matchingcontrol.setErrors(error);
  return error;
}
}

@Injectable({
  providedIn:'root'
})
export class EmailTaken implements AsyncValidator{
  auth=inject(Auth);

  validate = (control:AbstractControl): Promise<ValidationErrors | null> =>{
    return fetchSignInMethodsForEmail(this.auth,control.value).then((response)=>response.length ? {EmailTaken : true} : null);


  }
}
