import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-app-error',
  templateUrl: './app-error.component.html',
  styleUrls: ['./app-error.component.css']
})
export class AppErrorComponent {
@Output() relode=new EventEmitter();
@Input() errorMsg: any;
relodeUser(){
  this.relode.emit();
}
}
