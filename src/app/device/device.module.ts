import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DeviceRoutingModule } from './device-routing.module';
import { SharedModule } from '../shared/modules/shared.module';

import { GridDeviceComponent } from './grid-device/grid-device.component';
import { MapDeviceComponent } from './map-device/map-device.component';
import { MapService } from '../shared/services/map.service';

import { Map } from '../shared/models/Map';
import { ConfigDeviceComponent } from './config-device/config-device.component';
import { RegisterDeviceComponent } from './register-device/register-device.component';

@NgModule({
  imports: [
    FormsModule,
    SharedModule,
    CommonModule,
    DeviceRoutingModule
  ],
  exports: [
    GridDeviceComponent,
    RegisterDeviceComponent
  ],
  declarations: [GridDeviceComponent, MapDeviceComponent, ConfigDeviceComponent, RegisterDeviceComponent],
  providers: [
    {
      provide: Map,
      useClass: MapService
    }
  ]
})
export class DeviceModule { }