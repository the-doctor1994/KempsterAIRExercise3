import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html'
})
export class HistoryPageComponent {
  fileList: string[];
  subscription: Subscription;

  constructor(private dataService: DataService) {

  }
  ngOnInit() {
    this.subscription = this.dataService.fileListService.subscribe(fileList => this.fileList = fileList)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  clearData() {
    this.dataService.clearData();
  }
}

