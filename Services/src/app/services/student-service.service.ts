import { Injectable } from '@angular/core';

export interface Student {
  id: number;
  name: string;
  age: number;
  grade: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {
  private students: Student[] = [
    { id: 1, name: 'Alice Johnson', age: 17, grade: 'A', email: 'alice.j@example.com' },
    { id: 2, name: 'Bob Lee', age: 18, grade: 'B', email: 'bob.lee@example.com' },
    { id: 3, name: 'Carol Smith', age: 16, grade: 'A', email: 'carol.smith@example.com' },
    { id: 4, name: 'David Patel', age: 17, grade: 'C', email: 'david.patel@example.com' },
    { id: 5, name: 'Eva Brown', age: 18, grade: 'B', email: 'eva.brown@example.com' },
    { id: 6, name: 'Frank Wu', age: 17, grade: 'A', email: 'frank.wu@example.com' },
    { id: 7, name: 'Grace Kim', age: 16, grade: 'B', email: 'grace.kim@example.com' },
    { id: 8, name: 'Henry Clark', age: 18, grade: 'C', email: 'henry.clark@example.com' },
  ];

  constructor() { }
  getStudents(): Student[] {
    return this.students;
  }

  getStudentsById(id: number): Student | undefined {
    return this.students.find(s => s.id === id);
  }
}
