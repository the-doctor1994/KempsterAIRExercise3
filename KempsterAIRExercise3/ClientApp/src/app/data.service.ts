import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  private fileListBehaviorSubject = new BehaviorSubject([]);
  fileListService = this.fileListBehaviorSubject.asObservable();

  constructor() { }

  addFile(message: string) {
    this.fileListBehaviorSubject.value.push(message);
  }

  clearData() {
    this.fileListBehaviorSubject.next([]);
  }

}
