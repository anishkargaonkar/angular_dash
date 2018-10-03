import { Component, OnInit, ViewChild } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Batch , Document} from '../shared/models/batch.model';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { DocumentItemComponent } from './document-item/document-item.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private dashboardData: Batch[];
  dataSource = new MatTableDataSource<Document>();
  displayedColumns: string[] = ['id', 'name', 'status', 'uploaded', 'actions'];
  uploader_selected;
  curr_index: number = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private dataStorageService: DataStorageService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.dataStorageService.getAllFeed();
    this.dataStorageService.feedDataObservable
      .subscribe(next => {
        this.dashboardData = next;
        if (this.curr_index !== null){ 
          this.setDashboardValues(this.curr_index);
        } else {
          this.setDashboardValues(0);
        }
      }, err => console.log(err))
  }

  setDashboardValues(index){
    // console.log(index)
    this.curr_index = index;
    this.uploader_selected = this.dashboardData[index].set_id;
    this.dataSource = new MatTableDataSource<any>((this.dashboardData[index].documents));
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addDocument(): void{
    let doc = new Document(null,null,null,null,null,null,String(Date.now()));
    if(this.dataSource.data.length > 0){
      doc.set_id = Number(this.dataSource.data[this.dataSource.data.length - 1].set_id);
      doc.doc_id = Number(this.dataSource.data[this.dataSource.data.length - 1].doc_id) + 1;
      doc.uploader = this.dataSource.data[this.dataSource.data.length - 1].uploader
    } else {
      doc.set_id = 1;
      doc.doc_id = 1;
      doc.uploader = 'john'
    }

    this.openDialog(doc, false, null);
  }

  editDocument(document_index){
    this.openDialog(this.dashboardData[this.curr_index].documents[document_index], true, document_index);
  }

  openDialog(doc, edit_mode, document_index): void{
    const dialogRef = this.dialog.open(DocumentItemComponent,{
      panelClass: 'custom-dialog-container',
      data: { doc: doc, edit: edit_mode }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){

      // Add new document to the array
      if(!edit_mode && (document_index === null)){
        this.dashboardData[this.curr_index].documents.push(result);
      } else {
        this.dashboardData[this.curr_index].documents[document_index] = result;
      }
      this.dataStorageService.updateData(this.dashboardData[this.curr_index].id,this.dashboardData[this.curr_index]);
    }    
    });
  }

  deleteDocument(document_index){
    this.dashboardData[this.curr_index].documents.splice(document_index,1);
    this.dataStorageService.updateData(this.dashboardData[this.curr_index].id,this.dashboardData[this.curr_index]);
  }

  sortedData: Document[];

  sortData(sort) {
    const data = this.dashboardData[this.curr_index].documents.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return compare(a.doc_id, b.doc_id, isAsc);
        case 'name': return compare(a.name, b.name, isAsc);
        case 'status': return compare(a.status, b.status, isAsc);
        case 'uploaded': return compare(a.date_uploaded, b.date_uploaded, isAsc);
        default: return 0;
      }
  });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
