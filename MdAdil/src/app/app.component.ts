import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MyTemplateFormComponent } from './my-template-form/my-template-form.component';
import { ReactiveFormsComponent } from './reactive-forms/reactive-forms.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MyTemplateFormComponent,ReactiveFormsComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'LearningNeverStops';
  isTemplate: boolean = false;
  isReactive: boolean = false;
  ngOnInit(){
    this.isReactive = true;
  }
  showTemplateForm(){
    this.isTemplate = true;
    this.isReactive = false;
  }
  showReactiveForm(){
    this.isReactive = true;
    this.isTemplate = false;
  }
}
