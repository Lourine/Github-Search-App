import { Component, OnInit } from '@angular/core';
import{ FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, throwError } from 'rxjs'; 
import { map, debounceTime, distinctUntilChanged, switchMap, catchError, retry, retryWhen } from 'rxjs/operators';
import { RepoService } from '../repo.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  providers: [RepoService],
  styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit {
  [x: string]: any;
  
  
  constructor(private repoService: RepoService) { }
  

public searchTerm =  new Subject<string>();
public searchResults: any;
public paginationElements: any;
public errorMessage:any;  
public searchForm = new FormGroup({
  search: new FormControl ( "", Validators.required),
});

public search(){
  this.searchTerm.pipe(
    map((e: any) => {
      console.log(e.target.value);
      return e.target.value
    }),
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(term => {
      return this.repoService._searchEntries (term);
    }),
     catchError((e) =>{
      console.log(e);
      this.errorMessage = e.message;
      return throwError(e);
     }),

  ).subscribe(v => {
    this.loading = false;
    this.searchResults = v;//null 
    this.results = this.searchResults;
  })
}
  ngOnInit() {
      this.search();
  }

}
