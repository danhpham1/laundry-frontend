import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';

import { INameOfGroup } from '../../../../@share/models/name.model';
import { IGroupAll } from '../../../../@share/models/group.model';
import { IAppState } from '../../../../ngrx/models/base.model';

import { IPostLaundry, IPostLaundryResponse } from './../../../../@share/models/laundry.model';
import  * as laundryActions from '../../../../ngrx/actions/laundry.action';
import { laundrySelector } from './../../../../ngrx/reducers/laundry.reducer';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-create-laundry',
  templateUrl: './create-laundry.component.html',
  styleUrls: ['./create-laundry.component.scss']
})
export class CreateLaundryComponent implements OnInit {
  validateForm!: FormGroup;
  selectedValueGroup: string | null;
  selectedValueName: string | null;
  isDisableSelectName:boolean;
  isLoading:boolean;
  arrNames: Array<INameOfGroup> | [];
  subscription:Subscription;

  laundryPost$:Observable<IPostLaundryResponse> = this.store.select(laundrySelector.selectLaundryPost);
 
  @Input() allGroups!: Array<IGroupAll>;

  constructor(
    private fb:FormBuilder,
    private nzMessageService: NzMessageService,
    private modal: NzModalService,
    private store:Store<IAppState>
  ) { 
    this.selectedValueGroup = null;
    this.selectedValueName = null;
    this.isDisableSelectName = true;
    this.arrNames = [];
    this.isLoading = false;
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      group: [null, [Validators.required]],
      name: [null, [Validators.required]],
      weight: [{value:null,disabled:true}, [Validators.required]],
      price: [{ value: 0, disabled:true }, [Validators.required]],
      total: [{ value: 0, disabled:true }, [Validators.required]],
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

  //submit form 
  submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if(this.validateForm.controls['weight'].value > 0){
      if(this.validateForm.valid){
        this.handleDistpatchPostLaundry(this.validateForm.getRawValue());
      }
    }else{
      this.nzMessageService.create('warning','Please input weight again ( > 0 )');
    }
  }

  handleDistpatchPostLaundry(bodyLaundry:IPostLaundry){
    this.store.dispatch(new laundryActions.postLaundryRequest({...bodyLaundry}));
    let postLaundrySub = this.laundryPost$.pipe(take(2)).subscribe(laundryRes=>{
      console.log(laundryRes);
      if(laundryRes.success){
        this.modal.closeAll();
        this.nzMessageService.create('success','Laundry created success!');
      }
      if(laundryRes.error){
        this.nzMessageService.create('error', 'Laundrycreated failed!');
      }
    });
    this.subscription.add(postLaundrySub);
  }

  //event change select group
  changeSelectGroup(e:Event){
    if(e){
      this.arrNames = [];
      this.validateForm.controls['name'].setValue("");
      this.validateForm.controls['price'].setValue(0);
      this.isLoading = true;
      let eToStr = e.toString();
      let arrNamesCp = this.allGroups.find(el => el.name === eToStr)?.namesArray;
      if (arrNamesCp && arrNamesCp?.length >= 1){
        this.arrNames = arrNamesCp;
        this.isDisableSelectName = false;
        this.isLoading = false;
      }else{
        this.validateForm.controls['weight'].disable();
        this.validateForm.controls['weight'].setValue(0);
        this.validateForm.controls['total'].setValue(0);
        this.isDisableSelectName = true;
        this.isLoading = false;
      }
    }
  }

  //event change select name
  changeSelectName(e:Event){
    if(e){
      let name = e.toString();
      this.arrNames.forEach(el=>{
        if(el.name === name){
          this.validateForm.controls['price'].setValue(el.price);
          this.validateForm.controls['total'].setValue(Number(this.validateForm.controls['weight'].value) * Number(this.validateForm.controls['price'].value));
          this.validateForm.controls['weight'].enable();
        }
      })
    }
  }

  //event change weight
  changeInputWeight(e:Event){
    let weight = Number(e);
    if(weight > 0){
      this.validateForm.controls['total'].setValue(weight * Number(this.validateForm.controls['price'].value));
    }else{
      this.validateForm.controls['total'].setValue(0);
    }
  }
}
