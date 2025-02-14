import { ValidationErrors, AbstractControl, ValidatorFn } from "@angular/forms";

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
