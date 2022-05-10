import { BookmarkService } from './../../../assets/img/services/bookmark.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  bookmarkCount = 0;

  constructor(private service: BookmarkService) {}


  ngOnInit(): void {}

}
