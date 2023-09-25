import { group } from '@angular/animations';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import  sampleData  from "./data";

export interface Group {
  type: string;
  id: string;
  children: Child[];
}

export interface Child {
  type: string;
  id: string;
}


@Component({
  selector: 'app-d3-path',
  templateUrl: './d3-path.component.html',
  styleUrls: ['./d3-path.component.css']
})
export class D3PathComponent implements AfterViewInit {

  sampleData = sampleData;
  buy = 'B001';
  sell = 'S001';
  groups: Group[] = [];

  findGroup = (id: string, type: string) => this.groups.findIndex(group => (group.type === type && group.id === id)
    || (group.children.findIndex(child => child.type === type && child.id === id) >= 0));


  add() {
    console.log(this.buy, this.sell);

    let targetIndex = this.findGroup(this.buy, 'buy');

    if (targetIndex >= 0) {
      const targetGroup = this.groups[targetIndex];
      if (targetGroup.type === 'buy') {
        targetGroup.children.push({ type: 'sell', id: this.sell });
      } else if (targetGroup.children.length === 1) {
        this.groups[targetIndex] = { type: 'buy', id: this.buy, children: [{ type: 'sell', id: targetGroup.id },{ type: 'sell', id: this.sell }] }
      } else {
        throw new Error("Invalid link");
      }
      console.log(this.groups);
      return;
    }

    targetIndex = this.findGroup(this.sell, 'sell');

    if (targetIndex >= 0) {
      const targetGroup = this.groups[targetIndex];
      if (targetGroup.type === 'sell') {
        targetGroup.children.push({ type: 'buy', id: this.buy });
      } else if (targetGroup.children.length === 1) {
        this.groups[targetIndex] = { type: 'sell', id: this.sell, children: [{ type: 'buy', id: targetGroup.id },{ type: 'buy', id: this.buy }] }
      }else {
        throw new Error("Invalid link");
      }
      console.log(this.groups);
      return;
    }

    this.groups.push({ type: 'buy', id: this.buy, children: [{ type: 'sell', id: this.sell }] });

    console.log(this.groups);
    

  }



  //   if(targetGroup) {

  //   } else {
  //       create and push new group
  // }

  //   }



  constructor() { }
  ngAfterViewInit(): void {
    var source = d3.selectAll(".wrapper-100").selectAll(".linked-plans").selectAll("source")
    var destination = d3.selectAll(".wrapper-100").selectAll("linked-plans").selectAll("source")




    //     var circles = svg.selectAll('.line-group').selectAll("circle"),
    //           circleCoords = [];
    // var line = d3.svg.line()

    for (let j = 0; j < source.length; j++) {
      console.log(source[j]);

    };

    var linkGen = d3.linkVertical();
    let multiLinkData = [
      { source: [0, 0], target: [250, 250] },
    ];

    //Since this is an array of links, we add its data then join to add our paths
    // d3.select("#wrapper-100").append("svg")    .attr("width", "100%")
    // .attr("height", "100%")
    //   .selectAll("path")
    //   .data(multiLinkData)
    //   .join("path")
    //   .attr("d", linkGen)
    //   .classed("link", true);

  }


}
