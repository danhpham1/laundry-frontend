import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-laundry',
  templateUrl: './create-laundry.component.html',
  styleUrls: ['./create-laundry.component.scss']
})
export class CreateLaundryComponent implements OnInit {
  validateForm!: FormGroup;
  selectedValueGroup: string | null;
  selectedValueName: string | null;

  constructor(
    private fb:FormBuilder
  ) { 
    this.selectedValueGroup = null;
    this.selectedValueName = null;
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      group: [null, [Validators.required]],
      name: [null, [Validators.required]],
      weight: [null, [Validators.required]],
      price: [{ value: 0, disabled:true }, [Validators.required]],
      total: [{ value: 0, disabled:true }, [Validators.required]],
    })
  }

  //submit form 
  submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

}
