import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-lazy',
  templateUrl: './lazy.component.html',
  styleUrls: ['./lazy.component.css']
})
export class LazyComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      input1: null,
      input2: [null, Validators.required],
      input3: [null, [Validators.required, Validators.min(10)]],
      input4: [null, [Validators.required, Validators.minLength(10), Validators.email]]
    });
    this.validate();
  }

  validate(): void {
    this.form.markAllAsTouched();
  }
}
