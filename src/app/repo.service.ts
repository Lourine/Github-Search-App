import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, empty, from } from 'rxjs';
import { map } from 'rxjs/operators';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RepoService {
  constructor( private httpClient:HttpClient) { }

  public searchResults: any;

  //makes HTTP call to the Api
  searchEntries(term):Observable<any>{
    if(term === ""){
     console.log("Not Defined"); 
    return of(null)
    }else {
      let params = {q: term }
      return this.httpClient.get(environment.myUrl, {params}).pipe(
        map(response =>{
          console.log(response);
          return this.searchResults = response["items"];
        })
      ); 
    }
  }
  
  //returns the response
  public _searchEntries(term){
    return this.searchEntries(term);
  }
}
