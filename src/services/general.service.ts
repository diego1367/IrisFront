import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  private url = environment.url;
  constructor(private http: HttpClient) { }

  public getToken (token: any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.url}/token?username=diego`, { headers: headers });
  }
  public get (token: any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.url}`, { headers: headers });
  }

  public post(token: any,parameters: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
   return this.http.post(`${this.url}`,parameters, { headers: headers });
 }
 public put( token: any, parameters: any) {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
   return this.http.put(`${this.url}`,parameters,  { headers: headers });
 }

 public delete(token: any, parameters:number ){
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  return this.http.delete(`${this.url}/${parameters}`, { headers: headers });
}

}
