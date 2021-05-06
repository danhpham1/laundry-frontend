import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IRegisterBody } from '../../models/register';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  registerForm!:FormGroup

  constructor(
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
    this.initialForm();
  }

  private initialForm(){
    this.registerForm = this.fb.group({
      username:[null,[Validators.required]],
      password:[null,[Validators.required]],
      name:[null,[Validators.required]],
      email:[
        null,
        [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        ]
      ]
    })
  }

  onSubmit(){
    this.registerForm.markAsDirty();
    this.registerForm.markAllAsTouched();

    if(this.registerForm.valid){
      const body:IRegisterBody = {
        username: this.registerForm.controls['username'].value,
        password: this.registerForm.controls['password'].value,
        name: this.registerForm.controls['name'].value,
        email:this.registerForm.controls['email'].value
      }
      console.log(body);
    }
  }

}
