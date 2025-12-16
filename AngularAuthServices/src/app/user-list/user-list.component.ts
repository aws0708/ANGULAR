import { Component, inject } from '@angular/core';
import { ApidataService } from '../services/apidata.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  private apiDataService = inject(ApidataService);
  allData: any[] = [];
  data: any[] = [];
  columns: string[] = [];
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  iterableData: any;


  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.apiDataService.getData().subscribe(response => {
      this.allData = response.data || response;
      this.totalItems = this.allData.length;
      this.columns = this.allData.length ? Object.keys(this.allData[0]) : [];
      this.setPage(this.currentPage);
    });
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  setPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    const start = (page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.data = this.allData.slice(start, end);
  }

  pageChanged(page: number): void {
    this.setPage(page);
  }

}
