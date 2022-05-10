import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { PostLogsService } from 'services/post-logs.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-note-dialog',
  templateUrl: './note-dialog.component.html',
  styleUrls: ['./note-dialog.component.css']
})
export class NoteDialogComponent implements OnInit {

  public note: string = '';


  constructor(private dialogRef: MatDialogRef<NoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    ) { }

  ngOnInit(): void {
}

  save(){
    this.dialogRef.close(this.note);
  }

  close(){
    this.dialogRef.close();
  }
}


