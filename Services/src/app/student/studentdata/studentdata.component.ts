import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student, StudentServiceService } from '../../services/student-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-studentdata',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './studentdata.component.html',
  styleUrl: './studentdata.component.css'
})
export class StudentdataComponent {
  @Input() studentId: number | null = null;
  student: Student | undefined;
  @Output() cancel = new EventEmitter<void>();

  constructor( private studentService: StudentServiceService ) {}

  ngOnChanges() {
    if(this.studentId !== null) {
      this.student = this.studentService.getStudentsById(this.studentId)
    }
    else {
      this.student = undefined;
    }
  }

  onCancel(){
    this.cancel.emit();
  }
}
