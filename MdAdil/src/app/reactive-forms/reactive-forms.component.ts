import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-forms',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reactive-forms.component.html',
  styleUrl: './reactive-forms.component.css'
})
export class ReactiveFormsComponent {

  hobbiesArray: string[] = ['Reading', 'Playing', 'Biking'];
  signUpForm: FormGroup | undefined;

  // signUpForm = new FormGroup({
  //   name: new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
  //   age: new FormControl('',[Validators.required, Validators.min(18), Validators.max(60)]),
  //   email: new FormControl('',[Validators.required, Validators.pattern('[a-zA-Z0-9._%+~-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$')]),
  //   pass: new FormControl('',[Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{8,20}$')]),
  //   gender: new FormControl('',[Validators.required]),
  //   country: new FormControl('', [Validators.required]),
  //   accept: new FormControl(false, [Validators.requiredTrue]),
  //   hobbies: new FormArray([],[Validators.required])
  // });

  /**
   *
   */
  constructor(private fb: FormBuilder) {
    // Main FormGroup with nested 'address' FormGroup
    this.signUpForm = this.fb.group({
      // ... your existing controls ...
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(60)]],
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+~-]+@[a-zA-Z0-9]+\\.[a-zA-Z]{2,}$')]],
      pass: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{8,20}$')]],
      gender: ['', [Validators.required]],
      country: ['', [Validators.required]],
      accept: [false, [Validators.requiredTrue]],
      hobbies: this.fb.array([], [Validators.required]),
      // --- NESTED FORM GROUP (Address) ---
      address: this.fb.group({
        street: ['', Validators.required],      // Required
        city: ['', [Validators.required, Validators.minLength(2)]], // Required, min 2
        zip: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]] // Required, must be 5 digits
      }),
      // formArray
      phoneNumbers: this.fb.array([this.createPhoneGroup()], { validators: [this.noDuplicatePhonesValidator] }),

      // -------- Cross-field password match validator --------
      passwordGroup: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      }, { validators: this.passwordsMatch }),

    });
  }

  ngOnInit(){
    this.signUpForm.get('name').patchValue("Anubhaw Singh");

  }

  handleSubmit() {
    console.log(this.signUpForm.value);
  }

  get form() {
    return this.signUpForm.controls;
  }

  get addressGroup(): FormGroup {
    return this.signUpForm.get('address') as FormGroup;
  }
  get phoneNumbers(): FormArray {
    return this.signUpForm.get('phoneNumbers') as FormArray;
  }
  get passwordGroup(): FormGroup {
    return this.signUpForm.get('passwordGroup') as FormGroup;
  }
  createPhoneGroup(): FormGroup {
    return this.fb.group({
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }
  // Add another phone input
  addPhone() {
    this.phoneNumbers.push(this.createPhoneGroup());
  }
  // Remove a phone input (never let list be empty)
  removePhone(index: number) {
    if (this.phoneNumbers.length > 1) {
      this.phoneNumbers.removeAt(index);
    }
  }
  // CUSTOM VALIDATOR: Prevent duplicate phone numbers
  noDuplicatePhonesValidator(control: AbstractControl) {
    const arr = control.value?.map((obj: any) => obj.phone) || [];
    return new Set(arr).size < arr.length ? { duplicatePhones: true } : null;
  }
  //  -------- Cross-field password match validator --------
  passwordsMatch(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsDoNotMatch: true };
  }
  

  onChange(e: any) {
    const checkedValue = e.target.value;
    const checked = e.target.checked;
    console.log(checkedValue, checked);

    const checkedArray = this.signUpForm.get('hobbies') as FormArray;

    if (checked) {
      checkedArray.push(new FormControl(checkedValue)); // for adding new form control inside form array
    }
    else {
      let i: number = 0;
      checkedArray.controls.forEach((item) => {
        if (item.value == checkedValue) {
          checkedArray.removeAt(i);
        }
        i++;
      })
    }

  }

  // setValue 1.Requires all controls present in the structure you are updating. 2.Will throw if you leave out any value—must be complete.
  fillPreset() {
  this.signUpForm.setValue({
    name: 'Alex Doe',
    age: 30,
    email: 'alex@example.com',
    pass: 'ComplexP@ss1!',
    gender: 'Male',
    country: 'USA',
    accept: true,
    hobbies: ['Reading', 'Playing'],
    address: {
      street: '123 Main St',
      city: 'New York',
      zip: '12345'
    },
    phoneNumbers: [
      { phone: '1234567890' }
    ],
    passwordGroup: {
      password: 'ComplexP@ss1!',
      confirmPassword: 'ComplexP@ss1!'
    }
  });
}

// patchValue 1.You can update some or all controls. Others remain unchanged. Use whenever you want to update part of the data (e.g., just address, or just email).
patchCityEmail() {
  this.signUpForm.patchValue({
    address: { city: 'Miami' },
    email: 'newmail@demo.com'
  });
  // this.signUpForm.get('name').patchValue("Anubhaw Singh")
}

}
