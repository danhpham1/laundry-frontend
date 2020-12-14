import { Component, Input, OnInit } from '@angular/core';
declare let collpased: Function;
@Component({
  selector: 'app-sider',
  templateUrl: './sider.component.html',
  styleUrls: ['./sider.component.scss']
})
export class SiderComponent implements OnInit {
  @Input()
  isCollapsed!: boolean;
  constructor() { }

  ngOnInit(): void {
  }

  collapsedChange(event: Event) {
    collpased(event);
  }

}
