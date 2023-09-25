import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  countSubject = new BehaviorSubject(0);
  countSubject$ = this.countSubject.asObservable();
  count = 0;

  data = [];
  filtered = [];
  page = [];
  currentPage: number;

  searchString = '';
  
  constructor(private http: HttpClient,private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.countSubject$.subscribe(count=>console.log(count));
  }

  testFlexNonReactive() {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');


    this.http.get('http://localhost:8081/applicants/non-reactive').subscribe(data => {
      console.log(data);
    });
  }

  testFlex() {
    const eventSource = new EventSource(`http://localhost:8081/applicants`);
    // const eventSource = new EventSource(`http://localhost:8080/applicants/1000`);

    this.count = 0;
    this.data = [];
    this.page = [];
    this.currentPage = 1;

    eventSource.onmessage = (event) => {
      this.count++;
      const applicant = JSON.parse(event.data);
      this.data.push(applicant);
      if (this.filterMatch(applicant)) {
        this.filtered.push(applicant);
      }
      if(this.filtered.length>10 && this.page.length===0){
        this.page = this.filtered.slice(0,10);
      }
      this.countSubject.next(this.count);
      this.cd.detectChanges();
      // console.log(this.count, applicant);
    }


    eventSource.onerror = (event) => {
      if (eventSource.readyState === 0) {
        console.log('The stream has been closed by the server.');
        eventSource.close();
      } else {
        console.log('EventSource error: ' + event);
      }
    }
  }

  nextPage() {
    const start = this.currentPage * 10 + 1;
    this.page = this.filtered.slice(start,start+10);
    this.currentPage++;
  }

  sort(){
    this.filtered.sort(function(a, b) {
      const nameA = a.firstName.toUpperCase(); 
      const nameB = b.firstName.toUpperCase(); 
      if (nameA > nameB) {
        return 1;
      }
      if (nameA < nameB) {
        return -1;
      }

      return 0;
    });
    this.page = this.filtered.slice(0,10);
    this.currentPage = 1;
  }

  filter() {
      this.filtered = this.data.filter(a=> this.filterMatch(a));
      this.page = this.filtered.slice(0,10);
      this.currentPage = 1;
  }

  filterMatch(a){
    if(this.searchString.trim().length===0) return true;
    const token = this.searchString.toUpperCase();
    return a.firstName.toUpperCase().includes(token);
  }
}
