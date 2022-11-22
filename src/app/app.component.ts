import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FileUploadService } from './file-upload/file-upload.service';
import { createMachine, interpret, invoke, reduce, state, transition } from 'robot3';
import { environment } from 'src/environments/environment';


import * as dfd from "danfojs";
import data from './data';


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

  date = new Date("2022-11-29T05:00:00.000+00:00")

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
    console.log('state', this.service.machine.current);

    if (this.service.machine.current === 'loaded') {
      console.log(this.service.context.users);
    }
  });


  constructor(private http: HttpClient, private fs: FileUploadService) {

  }
  ngOnInit(): void {
    this.http.get('config.json').subscribe(resp=>{
      console.log(resp);
    });
    console.log(environment.apiEndpoint);

    const df = new dfd.DataFrame(data);
    let grp = df.groupby(["commodity"]);
    console.log(grp.getGroup(["rice"]))
//  grp.col(["openposition"]).sum().print();
    // console.table(data);

    data.forEach(d=> d['month']=new Date(d.eodRunDate).toLocaleString('default', { month: 'short' }));
   

    const commodityGroup = this.groupBy(data, 'commodity');

    Object.keys(commodityGroup).forEach(commodity => {
      const profitcenterGroup = this.groupBy(commodityGroup[commodity].children, 'profitcenter');
      commodityGroup[commodity]['children'] = profitcenterGroup;

      Object.keys(profitcenterGroup).forEach(profitcenter => {
        const tradeTypeGroup = this.groupBy(profitcenterGroup[profitcenter].children, 'tradetype');
        profitcenterGroup[profitcenter]['children'] = tradeTypeGroup;

        Object.keys(tradeTypeGroup).forEach(tradeType => {
          const tranTypeGroup = this.groupBy(tradeTypeGroup[tradeType].children, 'trantype');
          tradeTypeGroup[tradeType]['children'] = tranTypeGroup;

          Object.keys(tranTypeGroup).forEach(tranType => {
            const monthGroup = this.groupBy(tranTypeGroup[tranType].children, 'month');
            tranTypeGroup[tranType]['children'] = monthGroup;
            Object.keys(monthGroup).forEach(month=> tranTypeGroup[tranType][month]= monthGroup[month].openposition);
          });
        });
      });
    });

    console.log(JSON.stringify(commodityGroup));


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

  groupBy(objectArray, property) {
    return objectArray.reduce((acc, obj) => {
      const key = obj[property];
      const curGroup = acc[key] ?? { children: [], openposition: 0 };
      curGroup.children = [...curGroup.children, obj];
      curGroup.openposition += obj.openposition;

      return { ...acc, [key]: curGroup };
    }, {});
  }

 

}
