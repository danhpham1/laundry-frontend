import { IUpdateName, IUpdateNameResponse } from './../../../../@share/models/name.model';
import { Component, Input, OnInit } from '@angular/core';
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
  selector: 'app-update-name',
  templateUrl: './update-name.component.html',
  styleUrls: ['./update-name.component.scss']
})
export class UpdateNameComponent implements OnInit {
  validateForm!: FormGroup;

  @Input() idName!:string;
  @Input() idGroup!: string;
  @Input() name!:string;
  @Input() price!:number;

  allGroup: Array<IGroupAll>;
  subscribe: Subscription;

  allGroup$: Observable<IGetAllGroups> = this.store.select(groupSelector.selectAllGroupData);

  updateName$:Observable<IUpdateNameResponse> = this.store.select(nameSelector.selectUpdateNameResponse);

  constructor(
    private fb: FormBuilder,
    private store:Store<IAppState>,
    private nzMessageService: NzMessageService,
    private modal: NzModalService,
  ) { 
    this.allGroup = [];
    this.subscribe = new Subscription();
  }

  ngOnInit(): void {
    this.getAllGroup();
    this.validateForm = this.fb.group({
      name: [this.name, [Validators.required]],
      idGroup: [this.idGroup, [Validators.required]],
      price: [this.price, [Validators.required]]
    })
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

    let name = this.validateForm.get('name')?.value;
    let idGroup = this.validateForm.get('idGroup')?.value;
    let price = this.validateForm.get('price')?.value;

    if (this.validateForm.valid) {
      let flag = false;

      if (this.name != name){
        flag = true;
      }

      if (this.idGroup != idGroup) {
        flag = true;
      }

      if (this.price != price) {
        flag = true;
      }

      if(flag){
        this.handleUpdateName(name,idGroup,price);

      }else{
        this.nzMessageService.create('warning','Data of name not change');
      }

    }
  }

  private handleUpdateName(name?:string,idGroup?:string,price?:number){
    let objNameUpdate:IUpdateName = {
      idName:this.idName,
      body:{
        name: name,
        idGroup: idGroup,
        price: price
      }
    }
    this.store.dispatch(new nameActions.updateNameRequest({...objNameUpdate}));
    this.handleSubUpdateName();
  }

  private handleSubUpdateName(){
    this.updateName$.subscribe(rs=>{
      if(rs.success){
        this.nzMessageService.create('success','Name updated success!');
        this.modal.closeAll();
      }
      if(rs.error){
        this.nzMessageService.create('error','Name updated failed!')
      }
    })
  }

  //call get all group
  private getAllGroup(){
    this.store.dispatch(new groupActions.getAllGroupRequest());
    let allGroupSub = this.allGroup$.subscribe(rs=>{
      console.log(rs);
      if(rs.success){
        this.allGroup = rs.data;
      }
    })
    this.subscribe.add(allGroupSub);
  }

}
