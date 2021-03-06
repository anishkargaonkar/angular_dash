import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { DataStorageService } from "../../shared/data-storage.service";
import { Document } from '../../shared/models/batch.model';

@Component({
  selector: "app-document-item",
  templateUrl: "./document-item.component.html",
  styleUrls: ["./document-item.component.css"]
})
export class DocumentItemComponent implements OnInit {
  constructor(
    private dataStorageService: DataStorageService,
    public dialogRef: MatDialogRef<DocumentItemComponent>,
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { doc: Document, edit: Boolean }
  ) {}

  private document_status_arrray = this.dataStorageService.documentStatusArray;

  ngOnInit() {
    // console.log(this.data);
  }

  onFileInput(event){
    let file_name_array = event.target.value.split('\\');
    let file_name = file_name_array[file_name_array.length-1];

    if (((file_name.split('.'))[file_name.split('.').length - 1]).toLowerCase() !== 'pdf') {
      // console.log(file_name);
      this.snackbar.open("Please Upload a PDF Document !!",null,{
        duration: 1500
      })
    } else {
      this.data.doc.name = file_name;
      this.data.doc.preview_url = `/file/cluster/${((file_name.split('.'))[0]).toUpperCase()}/preview.jpeg`
      this.data.doc.status = 'uploaded'
      // console.log(this.data);
    }

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
