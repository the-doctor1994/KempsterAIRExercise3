import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Subscription } from 'rxjs';
import { DataService } from "../data.service";

interface FileNode {
  name: string;
  path?: string;
  isFile?: boolean;
  children?: FileNode[];
}

const TREE_DATA: FileNode[] = [
  {
    name: 'dir1',
    children: [
      {
        name: 'dirx',
        children: [
          {
            name: 'file.ext',
            isFile: true,
            path: 'root/dir1/dirx/file.ext'
          },
          {
            name: 'file1.ext',
            isFile: true,
            path: 'root/dir1/dirx/file1.ext'
          }
        ]
      },
      {
        name: 'file2.ext',
        isFile: true,
        path: 'root/dir1/file2.ext'
      },
    ]
  }, {
    name: 'dir2',
    children: [
      {
        name: 'diry',
        children: [
          {
            name: 'file3.ext',
            isFile: true,
            path: 'root/dir2/diry/file3.ext'
          }
        ]
      }
    ]
  }, {
    name: 'dir3',
    children: [
      {
        name: 'dirz',
        children: [
          {
            name: 'file4.ext',
            isFile: true,
            path: 'root/dir3/dirz/file4.ext'
          }
        ]
      }
    ]
  }, {
    name: 'dir4',
    children: [
      {
        name: 'dira',
        children: [
          {
            name: 'file5.ext',
            isFile: true,
            path: 'root/dir4/dira/file5.ext'
          }
        ]
      }
    ]
  }, {
    name: 'dir5',
    children: [
      {
        name: 'dirb',
        children: [
          {
            name: 'file6.ext',
            isFile: true,
            path: 'root/dir5/dirb/file6.ext'
          }
        ]
      }
    ]
  }, {
    name: 'dir6',
    children: [
      {
        name: 'dir0',
        children: [
          {
            name: 'file7.ext',
            isFile: true,
            path: 'root/dir6/dir0/file7.ext'
          }, {
            name: 'file8.ext',
            isFile: true,
            path: 'root/dir6/dir0/file8.ext'
          }, {
            name: 'file9.ext',
            isFile: true,
            path: 'root/dir6/dir0/file9.ext'
          }
        ]
      }
    ]
  }, {
    name: 'file10.ext',
    isFile: true,
    path: 'root/file10.ext'
  }, {
    name: 'dir7',
    children: [
      {
        name: 'dirc',
        children: [
          {
            name: 'dirv',
            children: [
              {
                name: 'file11.ext',
                isFile: true,
                path: 'root/dir7/dirc/dirv/file11.ext'
              }
            ]
          }, {
            name: 'dire'
          }, {
            name: 'file12.ext',
            isFile: true,
            path: 'root/dir7/dirc/file12.ext'
          }
        ]
      }
    ]
  }
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  treeControl = new NestedTreeControl<FileNode>(node => node.children);
  treeDataSource = new MatTreeNestedDataSource<FileNode>();
  public modalRef: BsModalRef;
  fileList: string[];
  subscription: Subscription;

  constructor(private modalService: BsModalService, private dataService: DataService) {
    this.treeDataSource.data = TREE_DATA;
  }

  ngOnInit() {
    this.subscription = this.dataService.fileListService.subscribe(fileList => this.fileList = fileList);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public openModal(myModal) {
    this.modalRef = this.modalService.show(myModal);
  }

  public progressBar(deadArgument) {
    let _this = this;
    var bar = document.getElementById("progressBar");
    let input = <HTMLInputElement>document.getElementById("filePath");
    bar.hidden = false;
    var width = 0;
    var id = setInterval(frame, 50);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        bar.innerHTML = "Upload Complete!";
        bar.style.backgroundColor = "white";
        _this.dataService.addFile(input.value); //let the history component know about the path
      } else {
        bar.style.backgroundColor = "lightgreen";
        width++;
        bar.style.width = width + '%';
        bar.innerHTML = width * 1 + '%';
      }
    }
  }

  public selectFile(node) {
    let input = <HTMLInputElement>document.getElementById("filePath");
    let uploadButton = <HTMLInputElement>document.getElementById("uploadButton");
    var bar = document.getElementById("progressBar");
    bar.hidden = true;
    input.value = node.path;
    this.modalRef.hide();
    uploadButton.disabled = false;
  }

  hasChild = (_: number, node: FileNode) => !!node.children && node.children.length > 0;
}
