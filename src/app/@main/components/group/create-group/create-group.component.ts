import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {

  validateGroupForm!: FormGroup;

  // @Output() closeModelGroup = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private modal: NzModalService,
  ) { }

  ngOnInit(): void {
    this.validateGroupForm = this.fb.group({
      nameGroup: ['', [Validators.required]]
    })
  }


  //submit form group
  onSubmit() {
    for (const i in this.validateGroupForm.controls) {
      this.validateGroupForm.controls[i].markAsDirty();
      this.validateGroupForm.controls[i].updateValueAndValidity();
    }
    if (this.validateGroupForm.valid) {
      console.log(this.validateGroupForm.get('nameGroup')?.value);

      //if add success close model
    }
  }
}
