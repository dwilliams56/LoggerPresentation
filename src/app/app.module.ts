import { RouterModule } from '@angular/router';
import { PostLogsService } from './services/post-logs.service'
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog'
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card'
import { MatToolbarModule} from '@angular/material/toolbar'

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginCardComponent } from './components/login-card/login-card.component';
import { LogDashboardComponent } from './pages/log-dashboard/log-dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LogDisplayComponent } from './components/log-display/log-display.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogInfoCardComponent } from './components/log-info-card/log-info-card.component';
import { NoteDialogComponent } from './dialog/note-dialog/note-dialog.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    LoginCardComponent,
    LogDashboardComponent,
    SidebarComponent,
    LogDisplayComponent,
    FooterComponent,
    LogInfoCardComponent,
    NoteDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatCardModule,
    MatToolbarModule,
    RouterModule,
    AppRoutingModule

  ],
  providers: [
    PostLogsService
  ],
  bootstrap: [AppComponent],
  entryComponents: [NoteDialogComponent]
})
export class AppModule { }
