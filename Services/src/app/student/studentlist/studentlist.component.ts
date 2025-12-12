import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Student, StudentServiceService } from '../../services/student-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-studentlist',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './studentlist.component.html',
  styleUrl: './studentlist.component.css'
})
export class StudentlistComponent implements OnInit {
  students: Student[] = [];
  @Output() selectedStudentId = new EventEmitter<number>();
  constructor(private studentService: StudentServiceService) {}

  ngOnInit(){
    this.students = this.studentService.getStudents();
  }

  selectStudent(id: number) {
    this.selectedStudentId.emit(id);
  }

}
