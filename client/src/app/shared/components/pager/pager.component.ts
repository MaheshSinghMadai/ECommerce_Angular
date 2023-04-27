import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit{
  
  @Input() totalCount : number;
  @Input() pageSize : number;
  @Output() pageChanged: new EventEmitter<number>();

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
  onPagerChanged(event:any) {
    this.pageChanged.emit(event.page);
  }
}
