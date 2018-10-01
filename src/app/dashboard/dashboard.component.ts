import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Batch } from '../shared/models/batch.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private dashboardData: Batch[];

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.dataStorageService.getAllFeed();
    this.dataStorageService.feedDataObservable
      .subscribe(next => {
        this.dashboardData = next
        console.log(this.dashboardData);
      }, err => console.log(err))
  }
  
}
