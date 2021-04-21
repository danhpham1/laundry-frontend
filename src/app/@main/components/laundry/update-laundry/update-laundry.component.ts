import { take } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { IAppState } from '../../../../ngrx/models/base.model';

import { IGroupAll } from '../../../../@share/models/group.model';
import { INameOfGroup } from '../../../../@share/models/name.model';
import { IPatchLaundry, IPostLaundryResponse } from '../../../../@share/models/laundry.model';

import * as laundryActions from '../../../../ngrx/actions/laundry.action';
import { laundrySelector } from './../../../../ngrx/reducers/laundry.reducer';
@Component({
  selector: 'app-update-laundry',
  templateUrl: './update-laundry.component.html',
  styleUrls: ['./update-laundry.component.scss']
})
export class UpdateLaundryComponent implements OnInit {
  validateForm!: FormGroup;
  

  isDisableSelectName: boolean;
  
  isLoading: boolean;
  arrNames: Array<INameOfGroup> | [];

  subscriptions:Subscription;

  @Input() id!: string;
  @Input() name!: string;
  @Input() group!: string;
  @Input() price!: number;
  @Input() weight!: number;
  @Input() total!: number;
  @Input() allGroups!: Array<IGroupAll>;

  laundryPatch$: Observable<IPostLaundryResponse> = this.store.select(laundrySelector.selectLaundryPatch);


  constructor(
    private fb: FormBuilder,
    private nzMessageService: NzMessageService,
    private modal: NzModalService,
    private store:Store<IAppState>
  ) { 

    this.isDisableSelectName = true;
    this.arrNames = [];
    this.isLoading = false;
    this.subscriptions = new Subscription();
  }

  ngOnInit(): void {
    
    this.validateForm = this.fb.group({
      group: [null, [Validators.required]],
      name: [null, [Validators.required]],
      weight: [null, [Validators.required]],
      price: [{ value: 0, disabled: true }, [Validators.required]],
      total: [{ value: 0, disabled: true }, [Validators.required]],
    })
    
    this.setFieldForm();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscriptions.unsubscribe();
  }

  //submit form 
  submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if(this.validateForm.controls['weight'].value <= 0){
      this.nzMessageService.create('warning','Please input weight bigger than zero');
    }else{
      if(this.validateForm.valid){
        let body: IPatchLaundry = {
          id: this.id,
          body: {
            ...this.validateForm.getRawValue()
          }
        }
        this.handleUpdateLaundry(body);
      }
    }
  }

  //handle update
  private handleUpdateLaundry(body:IPatchLaundry){
    this.store.dispatch(new laundryActions.patchLaundryRequest(body));
    let laundryPatchSub = this.laundryPatch$.pipe(take(2)).subscribe(rs=>{
      if(rs.success && rs.error === undefined){
        this.nzMessageService.create('success','Laundry updated success!');
        this.modal.closeAll();
      }
      if(!rs.success && rs.error !== undefined){
        this.nzMessageService.create('error','Laundry updated failed!');
      }
    })
    this.subscriptions.add(laundryPatchSub);
  }


  //set field
  private setFieldForm(){
    this.validateForm.controls['group'].setValue(this.group);
    this.getArrName(this.group);
    this.validateForm.controls['price'].setValue(this.price);
    this.validateForm.controls['weight'].setValue(this.weight);
    this.validateForm.controls['total'].setValue(this.total);
  }

  private getArrName(group:string){
    if(group){
      this.arrNames = [];
      let arrNamesCp = this.allGroups.find(el => el.name === group)?.namesArray;
      if (arrNamesCp && arrNamesCp?.length >= 1) {
        this.arrNames = arrNamesCp;
        this.isDisableSelectName = false;
        if(this.arrNames.findIndex(el=>el.name === this.name) !== -1 ){
          this.validateForm.controls['name'].setValue(this.name);      
        }else{
          this.validateForm.controls['name'].setValue('');
        }
      }
    }
  }

  changeSelectGroup(e?: Event | string) {
    if (e) {
      this.arrNames = [];
      this.validateForm.controls['name'].setValue("");
      this.validateForm.controls['price'].setValue(0);
      this.isLoading = true;
      let eToStr = e.toString();
      let arrNamesCp = this.allGroups.find(el => el.name === eToStr)?.namesArray;
      if (arrNamesCp && arrNamesCp?.length >= 1) {
        this.arrNames = arrNamesCp;
        this.isDisableSelectName = false;
        this.isLoading = false;
        this.validateForm.controls['weight'].setValue(0);
        this.validateForm.controls['price'].setValue(0);
        this.validateForm.controls['total'].setValue(0);
      } else {
        this.validateForm.controls['weight'].disable();
        this.validateForm.controls['weight'].setValue(0);
        this.validateForm.controls['total'].setValue(0);
        this.validateForm.controls['price'].setValue(0);
        this.isDisableSelectName = true;
        this.isLoading = false;
      }
    }
  }

  //event change select name
  changeSelectName(e: Event) {
    if (e) {
      let name = e.toString();
      this.arrNames.forEach(el => {
        if (el.name === name) {
          this.validateForm.controls['price'].setValue(el.price);
          this.validateForm.controls['total'].setValue(Number(this.validateForm.controls['weight'].value) * Number(this.validateForm.controls['price'].value));
          this.validateForm.controls['weight'].enable();
        }
      })
    }
  }

  //event change weight
  changeInputWeight(e: Event) {
    let weight = Number(e);
    if (weight > 0) {
      this.validateForm.controls['total'].setValue(weight * Number(this.validateForm.controls['price'].value));
    } else {
      this.validateForm.controls['total'].setValue(0);
    }
  }
}
