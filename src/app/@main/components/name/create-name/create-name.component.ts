import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { IAppState } from '../../../../ngrx/models/base.model';

import { groupSelector } from '../../../../ngrx/reducers/group.reducer';
import * as groupActions from '../../../../ngrx/actions/group.action';
import { IGetAllGroups, IGroupAll } from '../../../../@share/models/group.model';

@Component({
  selector: 'app-create-name',
  templateUrl: './create-name.component.html',
  styleUrls: ['./create-name.component.scss']
})
export class CreateNameComponent implements OnInit {
  validateForm!: FormGroup;
  allGroup: Array<IGroupAll>;
  
  allGroup$:Observable<IGetAllGroups> = this.store.select(groupSelector.selectAllGroupData);
  
  constructor(
  private fb: FormBuilder,
    private store:Store<IAppState>
  ) { 
    this.store.dispatch(new groupActions.getAllGroupRequest());
    this.allGroup = [];
  }

  ngOnInit(): void {
    this.allGroup$.subscribe(rs=>{
      if(rs.success){
        this.allGroup = rs.data
      }
    })
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      price: [null, [Validators.required]],
      idGroup: [null, [Validators.required]]
    })
  }

  //submit form 
  submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      console.log(this.validateForm)
    }
  }

  genderChange(e:Event){
    console.log(e);
  }
}
