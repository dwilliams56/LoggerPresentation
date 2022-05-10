import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-log-info-card',
  templateUrl: './log-info-card.component.html',
  styleUrls: ['./log-info-card.component.css']
})
export class LogInfoCardComponent implements OnInit {

  logID = 1;
  dateTime= "10-22-22 t10:52:23.3299432"

  constructor() { }

  ngOnInit(): void {
  }

}
