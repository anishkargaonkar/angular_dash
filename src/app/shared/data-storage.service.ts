import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Batch } from "./models/batch.model";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DataStorageService {
  private apiServerBaseURL = "http://localhost:3000"; // Mock Json Server

  private feed_data: Batch[] = [];
  private feedDataSubject: Subject<Batch[]> = new Subject();

  constructor(private http: Http) {}

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

  documentStatusArray = [
    "uploaded",
    "queued",
    "processing",
    "success",
    "failed"
  ];
}
