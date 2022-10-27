import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FileUploadService } from './file-upload/file-upload.service';
import { createMachine, interpret, invoke, reduce, state, transition } from 'robot3';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showUser(): any {
    console.log(this.machine.state.value);
  }
  title = 'angular-postcss';

  context = () => ({
    users: []
  });

  async loadUsers(): Promise<any[]> {
    console.log('Load users...');
    return [
      { id: 1, name: 'Wilbur' },
      { id: 2, name: 'Matthew' },
      { id: 3, name: 'Anne' }
    ];
  }

  async clearUsers(): Promise<any[]> {
    console.log('Clear users...');
    return [];
  }

  machine = createMachine({
    idle: state(
      transition('fetch', 'loading'),
    ),
    clear: invoke(this.clearUsers,
      transition('done', 'cleared',
        reduce((ctx: any, ev: any) => ({ ...ctx, users: ev.data }))
      )
    ),
    loading: invoke(this.loadUsers,
      transition('done', 'loaded',
        reduce((ctx: any, ev: any) => ({ ...ctx, users: ev.data }))
      )
    ),
    loaded: state(
      transition('clear', 'clear')
    ),
    cleared: state(
      transition('fetch', 'loading')
    )
  }, this.context);


  service = interpret(this.machine, () => {
    console.log('state',this.service.machine.current);

    if (this.service.machine.current === 'loaded') {
      console.log(this.service.context.users);
    }
  });


  constructor(private http: HttpClient, private fs: FileUploadService) {

  }
  ngOnInit(): void {
    // this.http.get('config.json').subscribe(resp=>{
    //   console.log(resp);
    // });
    console.log(environment.apiEndpoint);
  }

  testIam() {
    const body = {
      "loginType": "BusinessUser",
      "username": "chinna",
      "password": "atlas@123!",
      "loggedin": true,
      "tenantId": "manu"
    };
    this.http.post('http://localhost:8082/iam-service-api/api/tenant-management/v1/bussinessadminauth', body).subscribe(data => {
      console.log(data);
    });
  }

  upload($event: any) {
    this.fs.upload($event.target).subscribe(resp => console.log(resp));
  }

  change(e) {
    console.log(e.target.value);
  }
}
