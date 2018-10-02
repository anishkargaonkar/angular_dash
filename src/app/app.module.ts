import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

// Components
import { AppComponent } from "./app.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DocumentItemComponent } from './dashboard/document-item/document-item.component';

// UI Modules
import { MatCardModule, MatButtonModule, 
         MatDividerModule, MatTableModule, 
         MatPaginatorModule, MatSelectModule,
         MatIconModule, MatTooltipModule, 
         MatDialogModule, MatInputModule,
         MatSnackBarModule, MatSortModule} from "@angular/material";

@NgModule({
  declarations: [AppComponent, DashboardComponent, DocumentItemComponent],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    HttpModule, FormsModule,

    // UI Components
    MatCardModule, MatButtonModule,
    MatDividerModule, MatTableModule,
    MatPaginatorModule, MatSelectModule, 
    MatIconModule, MatTooltipModule,
    MatDialogModule, MatInputModule,
    MatSnackBarModule, MatSortModule
  ],
  providers: [],
  entryComponents: [DocumentItemComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
