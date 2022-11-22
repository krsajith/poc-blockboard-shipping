import { Component, OnInit } from '@angular/core';
import * as colorSort from "color-sorter";
@Component({
  selector: 'app-taomish-colors',
  templateUrl: './taomish-colors.component.html',
  styleUrls: ['./taomish-colors.component.css']
})
export class TaomishColorsComponent implements OnInit {

  colors = ['#000000','#0059D3','#15094E','#15104E','#171346','#2C2860','#2D2660','#32BCF3','#333333','#363636','#666666','#6D6B8B','#909AAD','#91BC76','#979797','#A7A7A7','#A7B6D4','#CD3A3A','#CDCDCD','#CECECE','#D9D9D9','#DCDCDC','#E3EFFF','#E5E3FD','#EBEBEB','#EBF0F9','#EE9732','#EFEFEF','#F26522','#F2F2F2','#F2F4FF','#F3F4FF','#F5F5F5','#F7F7F7','#FBFBFB','#FCFCFC','#FF8200','#FFF2E3','#FFFFFF'];
  constructor() { }

  ngOnInit(): void {
    this.colors.sort(colorSort.sortFn)
    this.colors.forEach((c,index)=>{
      console.log(`--color-${index}:${c};`)
    });
  }

}
