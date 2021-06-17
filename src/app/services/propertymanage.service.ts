import {Router } from "@angular/router";
import { Injectable,EventEmitter } from '@angular/core';

@Injectable(
    {
        providedIn: 'root'
      }
)
export class PropertyManageService  {
 statusUpdated= new EventEmitter<string>()
callS(){
    alert("fd")
    this.statusUpdated.emit()
}
}