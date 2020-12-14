import { Component, Input, OnInit } from '@angular/core';

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
    if (event) {
      document.querySelector('.layout__left')?.classList.add('sider__responesive__collapsed');
      document.querySelector('.layout__left')?.classList.remove('layout__left');
      document.querySelector('.logo')?.classList.add('logo__collapsed');
      document.querySelector('.logo h3')?.classList.add('hide');
    } else {
      document.querySelector('.sider__responesive__collapsed')?.classList.add('layout__left');
      document.querySelector('.sider__responesive__collapsed')?.classList.remove('sider__responesive__collapsed');
      document.querySelector('.logo')?.classList.remove('logo__collapsed');
      document.querySelector('.logo h3')?.classList.remove('hide');
    }
  }

}
