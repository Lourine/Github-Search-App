import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Repository } from './repository';

@Injectable({
  providedIn: 'root'
})
export class RepoService {
  username: string;
  repoName: string;
  repoitems: any[];


  constructor(private http: HttpClient) { 
    console.log('service is now ready');
  }

  searchRepos() {
    interface ApiResponse{
      repoitems: any[];
      repoName:string;
    }
    let promise =new Promise ((resolve, reject)=>{
      this.http.get<ApiResponse>('https://api.github.com/search/repositories?q=' + ' &per_page=10 ' + environment.myApi).toPromise().then(response=>{
        this.repoitems = response.repoitems["items"];
        this.repoName = response.repoName;
        resolve()
       },
       error=>{
         reject(error)
       })
     })
     return promise
   }
  UpdateRepo(repo:string) {
    this.repoName = repo;
  }

}