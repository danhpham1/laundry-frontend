import { Observable, Subscription } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { Store } from '@ngrx/store';

import { groupSelector } from '../../../../ngrx/reducers/group.reducer';
import * as groupActions from '../../../../ngrx/actions/group.action';

import { IAppState } from '../../../../ngrx/models/base.model';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-update-group',
  templateUrl: './update-group.component.html',
  styleUrls: ['./update-group.component.scss']
})
export class UpdateGroupComponent implements OnInit {
  validateGroupForm!: FormGroup;
  visible!: boolean;
  groupUpdateResponse$: Observable<boolean | undefined> = this.store.select(groupSelector.selectUpdateGroupResponse);
  subscription: Subscription;

  @Input() id!: string;
  @Input() groupName!: string;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalService,
    private nzMessageService: NzMessageService,
    private store: Store<IAppState>
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.validateGroupForm = this.fb.group({
      nameGroup: [this.groupName, [Validators.required]]
    });
    this.visible = false;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

  onSubmit() {
    //check error when input empty
    for (const i in this.validateGroupForm.controls) {
      this.validateGroupForm.controls[i].markAsDirty();
      this.validateGroupForm.controls[i].updateValueAndValidity();
    }
    //check name of group not change
    let groupNameValue = this.validateGroupForm.get('nameGroup')?.value;
    if (groupNameValue == this.groupName) {
      this.nzMessageService.create('warning', 'Vui lòng nhập tên mới của group');
    } else {
      if (this.validateGroupForm.valid) {
        this.dispatchUpdateGroup(groupNameValue);
        this.handleUpdateGroup();
      }
    }
  }

  dispatchUpdateGroup(groupName: string) {
    this.store.dispatch(new groupActions.updateGroupRequest(
      {
        id: this.id,
        name: groupName
      }
    ))
  }

  handleUpdateGroup() {
    let groupUpdatesubscribe = this.groupUpdateResponse$
      .pipe(take(2))
      .subscribe(rs => {
        if (rs === true) {
          this.nzMessageService.create('success', 'Cập nhập tên group thành công!');
          this.modal.closeAll();
        }
        if (rs === false) {
          this.nzMessageService.create('error', 'Cập nhập tên group thất bại!');
        }
      })
    this.subscription.add(groupUpdatesubscribe);
  }
}
