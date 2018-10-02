import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Batch } from "./models/batch.model";
import { Subject } from "rxjs";
import { MatSnackBar } from "@angular/material";

@Injectable({
  providedIn: "root"
})
export class DataStorageService {
  private apiServerBaseURL = "http://localhost:3000"; // Mock Json Server

  private feed_data: Batch[] = [];
  private feedDataSubject: Subject<Batch[]> = new Subject();

  constructor(private http: Http,
              private snackbar:MatSnackBar) {}

  get feedDataObservable() {
    return this.feedDataSubject.asObservable();
  }

  getAllFeed() {
    this.http.get(this.apiServerBaseURL + "/batch").subscribe(
      next => {
        this.feed_data = next.json(); // save data which can be used for caching
        this.feedDataSubject.next(this.feed_data); // emit the data to update child component
      },
      err => console.log(err)
    );
  }

  updateData(id, document) {
    this.http
      .put(this.apiServerBaseURL + "/batch/" + id, document, {
        headers: new Headers({
          "Content-Type": "application/json"
        })
      })
      .subscribe(
        next => {
          this.feed_data[id - 1] = next.json();
          this.feedDataSubject.next(this.feed_data);
          this.snackbar.open("Successfull !!",null, {
            duration: 1500
          })
          // this.getAllFeed();
        },
        err => {
          console.log("Error occured while updating the data !!", err);
          this.snackbar.open("Error occured !! Try Again",null,{
            duration: 1500
          })
        }
      );
  }

  documentStatusArray = [
    "uploaded",
    "queued",
    "processing",
    "success",
    "failed"
  ];
}
