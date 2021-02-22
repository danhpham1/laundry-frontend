import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { IAppState } from '../../../../ngrx/models/base.model';

import { IGetAllGroups, IGroupAll } from '../../../../@share/models/group.model';
import { groupSelector } from '../../../../ngrx/reducers/group.reducer';
import * as groupActions from '../../../../ngrx/actions/group.action';

import { nameSelector } from '../../../../ngrx/reducers/name.reducer';
import * as nameActions from '../../../../ngrx/actions/name.action';
import { ICreateNameResponse } from '../../../../@share/models/name.model';
@Component({
  selector: 'app-create-name',
  templateUrl: './create-name.component.html',
  styleUrls: ['./create-name.component.scss']
})
export class CreateNameComponent implements OnInit {
  validateForm!: FormGroup;
  allGroup: Array<IGroupAll>;
  subscribe:Subscription;
  
  allGroup$:Observable<IGetAllGroups> = this.store.select(groupSelector.selectAllGroupData);

  createName$:Observable<ICreateNameResponse> = this.store.select(nameSelector.selectPostNameResponse);
  
  constructor(
    private fb: FormBuilder,
    private store:Store<IAppState>,
    private nzMessageService:NzMessageService,
    private modal: NzModalService,
  ) { 
    this.store.dispatch(new groupActions.getAllGroupRequest());
    this.allGroup = [];
    this.subscribe = new Subscription();
  }

  ngOnInit(): void {
    let allGroupObser = this.allGroup$.subscribe(rs=>{
      if(rs.success){
        this.allGroup = rs.data
      }
    })
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      idGroup: [null, [Validators.required]],
      price: [null, [Validators.required]],
    })

    this.subscribe.add(allGroupObser);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscribe.unsubscribe();
  }

  //submit form 
  submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.store.dispatch(new nameActions.postNameRequest(this.validateForm.value));
      this.handleCreateName();
      // this.handleErrorCreateName();
    }
  }
  

  //handel create name
  handleCreateName(){
    //succuess
    let createNameSubcribe = this.createName$.pipe(take(2)).subscribe((rs:ICreateNameResponse) =>{
      console.log(rs);
      if(rs.success && (rs.error === undefined)){
        this.nzMessageService.create('success','Tạo name thành công!');
        this.modal.closeAll();
      }
      if(rs.error === true){
        this.nzMessageService.create('error', 'Tạo name thất bại, name bị trùng hoặc không hợp lệ');
      }
    })

    this.subscribe.add(createNameSubcribe);
  }
}
