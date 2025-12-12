import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentlistComponent } from './student/studentlist/studentlist.component';
import { StudentdataComponent } from './student/studentdata/studentdata.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StudentlistComponent, StudentdataComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Services';
  selectedId: number | null = null;
}
