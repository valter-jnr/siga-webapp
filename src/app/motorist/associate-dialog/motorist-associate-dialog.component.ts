import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sga-motorist-associate-dialog',
  templateUrl: './motorist-associate-dialog.component.html',
  styleUrls: ['./motorist-associate-dialog.component.scss']
})
export class MotoristAssociateDialogComponent implements OnInit {
  @Input() showDialog: boolean;
  @Input()
  get motorists(): Array<any> {
    return this._motorists;
  }
  set motorists(motorists: Array<any>) {
    this._motorists = motorists;
    this.setCurrentMotorists();
  }

  private _motorists: Array<any> = [];

  public selectedMotorist: any;
  public showMotoristDialog = false;

  public addList: Array<any> = [];
  public removeList: Array<any> = [];
  public currentList: Array<any> = [];

  public searchText: any;
  public hideAdminErrorModal = true;

  constructor() {}

  private setCurrentMotorists() {
    this.currentList = [];
    this.motorists.map(motorist => {
      if (!this.motoristIsDuplicate(motorist.id)) this.currentList.push(motorist)
    });
  }

  private motoristIsDuplicate(motoristId): boolean {
    return this.removeList.find(m => m.id == motoristId);
  }

  public onMotoristSelected(event) {
    event
  }

  public showMotoristModal(id) {
    this.showMotoristDialog = true;
    this.selectedMotorist = this.motorists.filter(m => m.id === id)[0];
  }

  public motoristDialogClose() {
    this.showMotoristDialog = false;
  }

  onAdminMotoristCellClick(event) {
    event
  }

  ngOnInit() {}

  applyChanges() {}
}
