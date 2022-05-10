import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

@Injectable({
  providedIn: 'root'
})

export class PostLogsService {
  private testDataurl = "https://api.jsonbin.io/b/6250885bd20ace068f959856/17";
  private getAllLogUrl = "https://localhost:5001/api/DatabaseLogs/GetAllDatabaseLogs";
  private deleteLogUrl = "https://localhost:5001/api/DatabaseLogs/DeleteDatabaseLog?LogID=";
  private getBmkUrl = "https://localhost:5001/api/Bookmark/GetAllBookmarks";
  private addBmkUrl = "https://localhost:5001/api/Bookmark/AddBookmark";
  private loginUrl = "https://localhost:5001/api/User/login";
  token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJoZWxsbzEiLCJqdGkiOiI0NGQ2NGQzMy1iM2ZmLTRiMDYtODgyMS1kYjUyNzVmZjJkZjYiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiaGVsbG8xIiwibmJmIjoxNjUxNTQxNDI3LCJleHAiOjE2NTE4MDA2MjcsImF1ZCI6IlJlbW90ZUxvZ2dlclVzZXJzIn0.nfGJdEn7dMD39cze_58gB5-4k2JA229aVDEo98R12R7nQF-bbFZHO7fVpYojX6ZBnws_R_yJDYN8MByLsfTsVg';
  token2 = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJoZWxsbzEiLCJqdGkiOiI0NGQ2NGQzMy1iM2ZmLTRiMDYtODgyMS1kYjUyNzVmZjJkZjYiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiaGVsbG8xIiwibmJmIjoxNjUxNTQxNDI3LCJleHAiOjE2NTE4MDA2MjcsImF1ZCI6IlJlbW90ZUxvZ2dlclVzZXJzIn0.nfGJdEn7dMD39cze_58gB5-4k2JA229aVDEo98R12R7nQF-bbFZHO7fVpYojX6ZBnws_R_yJDYN8MByLsfTsVg';
  headers = { headers: new Headers({ 'Content-Type': 'application/json' })};

  constructor(private http: HttpClient) { }

  getLogs(){
    const headers = { 'content-type': 'application/json'}
    return this.http.get(this.testDataurl, {'headers': headers});
  }

  deleteLogs(id: any[]){
    const headers = { 'content-type': 'application/json'}
    console.log(+ id);
    for( let i=0; i < id.length; i++){
    this.http.delete(this.deleteLogUrl+ id[i], {'headers': headers}).subscribe( (response) =>
    {console.log(response);
    });
    }
   }

   /** BOOKMARK FUNCTIONS */
  getUserBookmarks(){
    const headers = { 'content-type': 'application/json'}
    return this.http.get(this.getBmkUrl, {'headers': headers});
  }

  addUserBookmarks(bookMark: postBookMark){
    const headers = { 'content-type': 'application/json'}
    console.log(bookMark);
    var book = JSON.stringify(bookMark)
    console.log(book);
    return this.http.post(this.addBmkUrl, book, {'headers': headers}).subscribe((response) =>
    { console.log(response);
    });
  }

  getJwtToken(){
    var jsonToken = JSON.parse(atob(this.token.split('.')[1]));
    return this.token2;
  }

  /**  Login Method -- Returns JWT */
  userLogin(user: string, password: string){
    const headers = { 'content-type': 'application/json'}
    var body = JSON.stringify({ UserName: user, Password: password });
    console.log(body);
    return this.http.post(this.loginUrl, body, {'headers': headers}).subscribe((response) =>
    { console.log(response);
    });
  }

}
