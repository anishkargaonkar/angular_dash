import { Component, OnInit, ViewChild } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Batch } from '../shared/models/batch.model';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private dashboardData: Batch[];
  dataSource = new MatTableDataSource<Document>();
  displayedColumns: string[] = ['id', 'name', 'status', 'uploaded'];
  uploader_selected;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.dataStorageService.getAllFeed();
    this.dataStorageService.feedDataObservable
      .subscribe(next => {
        this.dashboardData = next;
        this.setDashboardValues(0);
        console.log(this.dashboardData);
      }, err => console.log(err))
  }

  setDashboardValues(index){
    console.log(index)
    this.uploader_selected = this.dashboardData[index].set_id;
    this.dataSource = new MatTableDataSource<any>(this.dashboardData[index].documents);
  }
  
}
