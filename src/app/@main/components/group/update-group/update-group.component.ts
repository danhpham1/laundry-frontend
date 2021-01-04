import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-update-group',
  templateUrl: './update-group.component.html',
  styleUrls: ['./update-group.component.scss']
})
export class UpdateGroupComponent implements OnInit {
  validateGroupForm!: FormGroup;
  visible!: boolean

  @Input() id!: string;
  @Input() groupName!: string;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalService,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.validateGroupForm = this.fb.group({
      nameGroup: [this.groupName, [Validators.required]]
    });
    this.visible = false;
    console.log(this.id, this.groupName);
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
      this.message.create('warning', 'Vui lòng nhập tên mới của group');
    } else {

    }
  }
}
