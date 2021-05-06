import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm!:FormGroup;

  constructor(
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
    this.initialForm();
  }

  private initialForm(){
    this.loginForm = this.fb.group({
      username:[null,[Validators.required]],
      password: [null, [Validators.required, Validators.minLength(5)]]
    })
  }

  onSubmit(){
    this.loginForm.markAsDirty();
    this.loginForm.markAllAsTouched();
  }
}
