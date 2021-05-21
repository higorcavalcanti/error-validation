import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      input1: null,
      input2: [null, Validators.required],
      input3: [null, Validators.required],
      input4: [null, [Validators.required, Validators.min(10)]],
      input5: [null, [Validators.required, Validators.minLength(10), Validators.email]]
    });
  }

  validate(): void {
    this.form.markAllAsTouched();
  }
}
