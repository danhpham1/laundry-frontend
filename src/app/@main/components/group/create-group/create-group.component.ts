import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { last, take, takeLast } from 'rxjs/operators';

import { groupSelector } from '../../../../ngrx/reducers/group.reducer';
import * as groupActions from '../../../../ngrx/actions/group.action';

import { ICreateGroupResponse } from '../../../../@share/models/group.model';
import { IAppState } from '../../../../ngrx/models/base.model';
@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {

  validateGroupForm!: FormGroup;
  subscription: Subscription;

  groupCreateResponse$: Observable<ICreateGroupResponse>;
  errorCreateGroupResponse$: Observable<any>;

  // @Output() closeModelGroup = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private modal: NzModalService,
    private store: Store<IAppState>,
    private nzMessageService: NzMessageService,
  ) {
    this.groupCreateResponse$ = this.store.select(groupSelector.selectCreateGroupResponse);
    this.errorCreateGroupResponse$ = this.store.select(groupSelector.selectCreateGroupFailedResponse);

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
      //check add success or failed
      this.handleCreateGroupFailed();
      this.handleCreateGroupSuccess();
    }
  }

  handleCreateGroupFailed() {
    let subscribe = this.errorCreateGroupResponse$
      .pipe(take(2))
      .subscribe(rs => {
        if (rs === false) {
          this.nzMessageService.create('error', 'Tên bị trùng vui lòng nhập tên mới!')
        }
      })
    this.subscription.add(subscribe);
  }

  handleCreateGroupSuccess() {
    let subscribe = this.groupCreateResponse$
      .pipe(take(2))
      .subscribe(rs => {
        if (rs.success) {
          this.nzMessageService.create('success', 'Tạo group thành công!');
          this.modal.closeAll();
        }
      })
    this.subscription.add(subscribe);
  }
}
