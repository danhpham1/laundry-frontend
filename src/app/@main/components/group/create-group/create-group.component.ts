import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';

import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { groupSelector } from '../../../../ngrx/reducers/group.reducer';
import * as groupActions from '../../../../ngrx/actions/group.action';
import { ICreateGroupResponse } from 'src/app/@share/models/group.model';
import { IAppState } from 'src/app/ngrx/models/base.model';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {

  validateGroupForm!: FormGroup;
  subscription: Subscription;

  groupCreateResponse$: Observable<ICreateGroupResponse>;

  // @Output() closeModelGroup = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private modal: NzModalService,
    private store: Store<IAppState>,
    private nzMessageService: NzMessageService,
  ) {
    this.groupCreateResponse$ = this.store.select(groupSelector.selectCreateGroupResponse);
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.validateGroupForm = this.fb.group({
      nameGroup: ['', [Validators.required]]
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }


  //submit form group
  onSubmit() {
    for (const i in this.validateGroupForm.controls) {
      this.validateGroupForm.controls[i].markAsDirty();
      this.validateGroupForm.controls[i].updateValueAndValidity();
    }
    if (this.validateGroupForm.valid) {
      let name = this.validateGroupForm.get('nameGroup')?.value;
      this.store.dispatch(new groupActions.createGroupRequest({ name: name }));
      this.handleCreateGroupSuccess();
      //if add success close model
    }
  }

  handleCreateGroupSuccess() {
    let subscribe = this.groupCreateResponse$.subscribe(rs => {
      if (rs.success) {
        // this.store.dispatch(new groupActions.getGroupRequest());
        this.modal.closeAll();
      }
    })
    this.subscription.add(subscribe);
  }
}
