import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { TableClickEvent } from '../../shared/components/table/table.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sga-grid-motorist',
  templateUrl: './grid-motorist.component.html',
  styleUrls: ['./grid-motorist.component.scss']
})
export class GridMotoristComponent implements OnInit {
  @Input() motorists = new Array();
  @Input() dataLoading: boolean = true;
  @Output() onMotoristSelected: EventEmitter<any> = new EventEmitter();

  text: any;
  distance: any;
  motorist: any;
  placeText: any;
  styleClass: any;
  filterLocation: any;
  filterDistance: any;
  selectedMotorist: any;
  contextMenuSelected: any;

  showDialog = false;
  showMotoristDialog: boolean;
  showColumnSelector = false;

  public headers = new Array<string>();
  public filterHeaders = new Array<string>();

  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.data.subscribe(data => this.motorists = data.motorists);
  }

  public onCellClick(event) {
    this.selectedMotorist = event.data;
    this.onMotoristSelected.emit(this.selectedMotorist);
    if (event.cellIndex === 0) this.showMotoristDialog = true;
  }

  public onCellRightClick(event: TableClickEvent) {
    this.selectedMotorist = event.data;
    this.onMotoristSelected.emit(this.selectedMotorist);
  }

  public onPlacesFiltered(event) {
    this.filterDistance = event.distance;
    this.filterLocation = { lat: event.lat, lng: event.lng };
  }

  public onPlacesFilterRemoved() {
    this.filterDistance = null;
    this.filterLocation = null;
  }

  public showMotoristModal = () => this.showMotoristDialog = true;

  public motoristDialogClose = () => this.showMotoristDialog = false;

  public whenHeaderReady = headers => this.headers = headers;

  public onToggleItem = itemsSelected => this.filterHeaders = itemsSelected;
}
