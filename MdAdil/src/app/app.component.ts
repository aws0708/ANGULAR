import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MyTemplateFormComponent } from './my-template-form/my-template-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MyTemplateFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'LearningNeverStops';
}
