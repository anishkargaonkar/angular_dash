import { Component, OnInit, ViewChild } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Batch , Document} from '../shared/models/batch.model';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { DocumentItemComponent } from './document-item/document-item.component';
import { getLocaleDateFormat, formatDate } from '@angular/common';

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
  curr_index: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private dataStorageService: DataStorageService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.dataStorageService.getAllFeed();
    this.dataStorageService.feedDataObservable
      .subscribe(next => {
        this.dashboardData = next;
        this.setDashboardValues(0);
        // console.log(this.dashboardData);
      }, err => console.log(err))
  }

  setDashboardValues(index){
    // console.log(index)
    this.curr_index = index;
    this.uploader_selected = this.dashboardData[index].set_id;
    this.dataSource = new MatTableDataSource<any>(this.dashboardData[index].documents);
  }

  addDocument(){
    let doc = new Document(null,null,null,null,null,null,String(Date.now()));
    doc.set_id = Number(this.dataSource.data[this.dataSource.data.length - 1].set_id);
    doc.doc_id = Number(this.dataSource.data[this.dataSource.data.length - 1].doc_id) + 1;
    doc.uploader = this.dataSource.data[this.dataSource.data.length - 1].uploader

    this.dialog.open(DocumentItemComponent,{
      data: { doc: doc, edit: false }
    });
  }
  
}
