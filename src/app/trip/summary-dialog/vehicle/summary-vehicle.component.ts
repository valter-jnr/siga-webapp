
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sga-summary-vehicle',
  templateUrl: './summary-vehicle.component.html',
  styleUrls: ['./summary-vehicle.component.scss']
})


export class SummaryVehicleComponent implements OnInit {

 
  selectedVehicle: any;

  public vehicles: Array<any>;
  public associateVehicle = new Array<any>();
  public showRegisterForm = false;

  constructor(private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.data.subscribe(
      data => (this.vehicles = data.vehicles || new Array<any>())
    );
  }

  public showVehicleData(vehicle) {
    this.selectedVehicle = vehicle
  }


  public showVehicleForm() {  
    this.showRegisterForm = true;
  }

  public closeFormRegister() {
    this.showRegisterForm = false;
  }

  public VehicleSelected(vehicle: any): void {
    this.associateVehicle.push(vehicle);
  }

  public removeAssociate(vehicle: any): void {
    const index = this.associateVehicle.findIndex(a => a === vehicle);
    this.associateVehicle.splice(index, 1);
    this.selectedVehicle = null;
  }
}