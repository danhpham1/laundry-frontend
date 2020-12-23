import { GroupModel, ColumnNameModel } from './../../../@share/models/group.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  mocDataGroup!: Array<GroupModel>;
  listMockDataGroupDisplay!: Array<GroupModel>;
  columnName!: ColumnNameModel;

  searchValue = '';
  visible = false;

  constructor() { }

  ngOnInit(): void {
    this.mocDataGroup = [
      {
        _id: "5fe3645cf47eca3ad8498902",
        name: "Group1",
        createAt: new Date(),
      },
      {
        _id: "5fe3645cf47eca3ad8498902",
        name: "Group2",
        createAt: new Date(),
      },
      {
        _id: "5fe3645cf47eca3ad8498902",
        name: "Group3",
        createAt: new Date(),
      },
      {
        _id: "5fe3645cf47eca3ad8498902",
        name: "Group4",
        createAt: new Date(),
      },
      {
        _id: "5fe3645cf47eca3ad8498902",
        name: "Group5",
        createAt: new Date(),
      },
      {
        _id: "5fe3645cf47eca3ad8498902",
        name: "Group6",
        createAt: new Date(),
      },
      {
        _id: "5fe3645cf47eca3ad8498902",
        name: "Group7",
        createAt: new Date(),
      },
      {
        _id: "5fe3645cf47eca3ad8498902",
        name: "Group8",
        createAt: new Date(),
      }
    ]
    this.listMockDataGroupDisplay = [...this.mocDataGroup];
    this.columnName = {
      sortFn: (a: GroupModel, b: GroupModel) => a.name.localeCompare(b.name),
    };
  }


  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listMockDataGroupDisplay = this.mocDataGroup.filter((item: GroupModel) => item.name.indexOf(this.searchValue) !== -1);
  }

}
