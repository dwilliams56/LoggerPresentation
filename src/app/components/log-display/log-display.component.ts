import { PostLogsService } from './../../services/post-logs.service';
import { BookmarkService } from 'src/app/services/bookmark.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpClient } from '@angular/common/http';
import {SelectionModel} from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild, Inject } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { NoteDialogComponent } from 'src/app/dialog/note-dialog/note-dialog.component';

export interface postBookMark{
  Id: number,
  UserID: number,
  LogID: number
}

export interface getBookMark{
  bookmarkID: number,
  userID: number,
  logID: number
}
export interface User{
  UserID: number,
  UserName: string,
  NormalizedUserName: string,
  Email: string,
  NormalizedEmail: string,
  EmailConfirmed: any,
  PasswordHash: string,
  SecurityStamp: string,
  ConcurrencyStamp: string,
  PhoneNumber: string,
  PhoneNumberConfirmed: any,
  TwoFactorEnabled: any,
  LockoutEnd: string,
  LockoutEnabled: any,
  AccessFailedCount: any
}

export interface Log{
  logID: number,
  application: string,
  applicationVersion: string,
  userID: number,
  companyId: number,
  logDateTime: string,
  logContent: string,
  noteContent: string
}

@Component({
  selector: 'log-display',
  templateUrl: './log-display.component.html',
  styleUrls: ['./log-display.component.css']
})
export class LogDisplayComponent implements OnInit, AfterViewInit {
  private startDate: Date = new Date();
  private endDate: Date = new Date();
  isBookmarked = false;
  bmkColor = 'black';
  displayedColumns: string[] = ['select','logID', 'application', 'applicationVersion', 'userID', 'companyId','logDateTime','logContent','actions'];
  dataSource = new MatTableDataSource<Log>([]);
  copyDataSource = new MatTableDataSource<Log >([]);
  selection = new SelectionModel<Log>(true, []);
  bookmarks = new MatTableDataSource<getBookMark>([]);
  private note: any;

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  constructor(private http: HttpClient,
      private service: PostLogsService,
      private bookmarkService: BookmarkService,
      private authService: AuthenticationService,
      private dialog : MatDialog
      ) {}

  ngOnInit(): void {
    this.service.getLogs().subscribe((data) => {
      this.dataSource.data = data as Log[];
    })
    this.service.getLogs().subscribe((data) => {
      this.copyDataSource.data = data as Log[];
    })
  }

  //Dialog Box For Notes
  openNoteDialog(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    dialogConfig.position = {
      'top': '10',
    };

    let dialogRef = this.dialog.open(NoteDialogComponent, dialogConfig)

    dialogRef.afterClosed()
    .subscribe(response => {
      console.log(response);
      this.setNote(response);
    });

  }

    addNotes(){

      console.log(this.selection.selected);

    for(let i = 0; i < this.selection.selected.length; i++){
      this.selection.selected[i].noteContent = this.getNote();
      this.addNote(this.selection.selected[i]);
      console.log(this.selection.selected[i]);
    }

    this.selection.clear();

  }



    addNote(log: Log){
      var jsonLog = JSON.stringify(log);
      this.service.updateLog(jsonLog);
      console.log("gets here");
    }

    setNote(note: string){
      this.note = note;
    }

    getNote(){
      return this.note;
    }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  refresh(){
    this.dataSource._updateChangeSubscription();
    this.ngAfterViewInit();

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  deleteSelected(){
    var id = [];
    var size;
    var sortedId = [];
    var copy: Log[] = this.dataSource.data;
    let j = 0;

    for(let i = 0; i < this.selection.selected.length ; i++){
      id[i] = this.selection.selected[i].logID;
    }
    sortedId = id.sort((n1,n2) => n1 - n2);
    console.log(sortedId);
    for(let i = 0; i < copy.length; i++){
      if(copy[i].logID == sortedId[j]){
       this.dataSource.data.splice(i, 1);
       j++;
       i--;
      }
    }
    this.service.deleteLogs(sortedId);
    this.refresh();
    this.selection.clear();
  }

  /** Bookmark */
  saveUserBookmark(){
    var bookmark: postBookMark = {Id : 0, UserID : 0, LogID: 0}; //LogID needs to be retrieved.

    this.bookmarkService.addUserBookmarks(bookmark);
    var bookmarks: getBookMark[] = this.bookmarks.data;

    bookmark.UserID = this.getUserId();

    for (let i = 0; i < bookmarks.length; i++){
      if (bookmark.LogID != bookmarks[i].logID && bookmark.UserID == bookmarks[i].userID){
        this.bookmarkService.addUserBookmarks(bookmark);
        i = (bookmarks.length) - 1
      }
      else if(bookmark.LogID == bookmarks[i].logID && bookmark.UserID != bookmarks[i].userID){
        this.bookmarkService.addUserBookmarks(bookmark);
        i = (bookmarks.length) - 1
      }
      else if(bookmark.LogID != bookmarks[i].logID && bookmark.UserID != bookmarks[i].userID){
        this.bookmarkService.addUserBookmarks(bookmark);
        i = (bookmarks.length) - 1
      }
      else {
        console.log("Already in system");
      }
    }

  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Log): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.logID + 1}`;
  }

  /** DateRange Filter */
  getStartDate(){
    return this.startDate;}

  setStartDate(date: Date){
    this.startDate = date;}

  getEndDate(){
    return this.endDate;}

  setEndDate(date: Date){
    this.endDate = date;}

  applyDateRangeFilter(start: Date, end: Date){
    if (start != end)
      this.dataSource.data = this.copyDataSource.data.filter(e=>(new Date(e.logDateTime))  >= start && (new Date(e.logDateTime) <= end));

    console.log(start, end);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fromTime(type: any, event: any){
    var fromTime = event.value;
    this.setStartDate(fromTime);
  }

  toTime(type: any, event: any){
    var toTime = event.value;
    this.setEndDate(toTime);
  }

 /** Getters and Setters For Log */

  getJwtToken(){
   var token = this.authService.setJwtToken();
   console.log(token);
   return (JSON.parse(token));
  }


  getUserId(){
    var token = (this.getJwtToken()['token']);
    var userID: number;
    var tokenParse = JSON.parse(atob(token.split('.')[1]));
    userID = (tokenParse['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
    return(userID);
  }



}
