import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-forms',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reactive-forms.component.html',
  styleUrl: './reactive-forms.component.css'
})
export class ReactiveFormsComponent {

  hobbiesArray: string[] = ['Reading', 'Playing', 'Biking'];
  signUpForm = new FormGroup({
    name: new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    age: new FormControl('',[Validators.required, Validators.min(18), Validators.max(60)]),
    email: new FormControl('',[Validators.required, Validators.pattern('[a-zA-Z0-9._%+~-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$')]),
    pass: new FormControl('',[Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{8,20}$')]),
    gender: new FormControl('',[Validators.required]),
    country: new FormControl('', [Validators.required]),
    accept: new FormControl(false, [Validators.requiredTrue]),
    hobbies: new FormArray([],[Validators.required])
  });

  handleSubmit(){
    console.log(this.signUpForm.value);
  }

  get form(){
    return this.signUpForm.controls;
  }

  onChange(e: any){
    const checkedValue = e.target.value;
    const checked = e.target.checked;
    console.log(checkedValue, checked);
    
    const checkedArray = this.signUpForm.get('hobbies') as FormArray;

    if(checked){
      checkedArray.push( new FormControl(checkedValue) ); // for adding new form control inside form array
    }
    else{
      let i: number = 0;
      checkedArray.controls.forEach((item) => {
        if(item.value == checkedValue){
          checkedArray.removeAt(i);
        }
        i++;
      })
    }

  }

}
