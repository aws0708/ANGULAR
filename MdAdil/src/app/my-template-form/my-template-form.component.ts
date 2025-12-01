import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { Student } from '../student';

@Component({
  selector: 'app-my-template-form',
  standalone: true,
  imports: [FormsModule, CommonModule, JsonPipe],
  templateUrl: './my-template-form.component.html',
  styleUrl: './my-template-form.component.css'
})
export class MyTemplateFormComponent {

  std = new Student();
  showPassword = false;
  selectedHobbies: string[] = [];

  constructor(){
    this.std.country='';
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  save(formData: any) {
    // console.log(formData.value);  
    // const std = new Student(formData.value.name,formData.value.age,formData.value.email);
    // console.log(std);

    console.log(this.std);
    console.log(this.selectedHobbies);
    // for resetting the form -- 2nd way   ---- this is not the recommended one
    // formData.reset();    //reset is an inbuilt function in ngForm for resetting the form



  }
  onChange(e:any){
    e?.target?.checked ? this.selectedHobbies.push(e?.target?.value) : this.selectedHobbies.splice(this.selectedHobbies.indexOf(e?.target?.value),1)
  }
  // for resetting the form (1st way)
  resetForm(my_form: NgForm){
    my_form.resetForm();    //resetForm is an inbuilt function to reset in NgForm
  }
}
