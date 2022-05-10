import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class PostLogsService {
  private getLogUrl = "https://localhost:5001/api/DatabaseLogs/GetAllDatabaseLogs";
  private testDataUrl = "https://api.jsonbin.io/b/6250885bd20ace068f959856/17";
  headers = { headers: new Headers({ 'Content-Type': 'application/json' })};

  constructor(private http: HttpClient) { }

  getLogs(){
    const headers = { 'content-type': 'application/json'}
    return this.http.get(this.getLogUrl, {'headers': headers});
  }


  updateLog(log: string){
    const headers = { 'content-type': 'application/json'}
    return this.http.post("https://localhost:5001/api/DatabaseLogs/SaveDatabaseLog", log, {'headers': headers}).subscribe( (response) =>
    {console.log(response);
    });
  }

  deleteLogs(id: any[]){
    const headers = { 'content-type': 'application/json'}
    console.log("https://localhost:5001/api/DatabaseLogs/DeleteDatabaseLog?LogID="+ id);
    for( let i=0; i < id.length; i++){
    this.http.delete("https://localhost:5001/api/DatabaseLogs/DeleteDatabaseLog?LogID="+ id[i], {'headers': headers}).subscribe( (response) =>
    {console.log(response);
    });
    }
   }

}
