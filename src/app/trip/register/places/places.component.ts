import { Component, OnInit, EventEmitter } from '@angular/core';

import { Map } from '../../../shared/models/Map';
import { DirectionService } from '../../../shared/services/direction.service';
import { ISlimScrollOptions, SlimScrollEvent } from 'ngx-slimscroll';
import { FormService } from '../dataform.service';

@Component({
  selector: 'sga-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit {

  public places = new Array<any>();
  public route: any;
  opts: ISlimScrollOptions;
  scrollEvents: EventEmitter<SlimScrollEvent>;

  public timeStart;
  public timeEnd;
  public placeObj = [];

  public itineraryInfo;

  constructor(private map: Map, private directionService: DirectionService, private formItinerary: FormService) { }

  ngOnInit(): void {
    this.injectMap();
    this.scrollEvents = new EventEmitter<SlimScrollEvent>();
    this.opts = {
      alwaysVisible: false,
      gridOpacity: '0.2',
      barOpacity: '0.5',
      gridBackground: '#ccc',
      gridWidth: '5',
      gridMargin: '2px 2px',
      barBackground: 'rgba(55, 56, 58, 0.6)',
      barWidth: '4',
      barMargin: '2px 2px'
    };
  }
  ngOnDestroy(){
    debugger
    for(let item of this.places){
      this
         .placeObj
         .push(item.address_components
               .filter(obj => obj.types.includes('administrative_area_level_2') )
               .map(obj =>  obj.long_name)[0],);
    }
    this.itineraryInfo = {
        timeStart: this.timeStart.value,
        timeEnd: this.timeEnd.value,
        places: this.placeObj
    }
    this.formItinerary.updateObj(this.itineraryInfo,'generalInfos')
  }
  
  public selectPlace = place => {
    const location = {
      name: place.formatted_address,
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    };

    this.places.push(location);
    this.plotRoute();
    this.moveMap(location.lat, location.lng, 15);
  }

  public addPlace = item => console.log(item);

  public removePlace = item => {
    const index = this.places.findIndex(a => a === item);
    this.places.splice(index, 1);
    this.plotRoute();
  }

  public revertPlaces = () => {
    this.places = this.places.reverse();
    this.plotRoute();
  }

  private moveMap = (lat: number, lng: number, zoom = 7) => {
    this.map.setZoom(zoom);
    this.map.setCenter(lat, lng);
  }

  private plotRoute = () => {
    if (this.places.length > 1) {
      this.map.clearAll();
      this.places.map(this.addPoint);
      this.directionService
        .getCoordinates(this.places)
        .subscribe(
          data => this.onSuccessRoute(data),
          error => console.log(error));
    }
  }

  private onSuccessRoute = ({ routes }) => {
    const { geometry, distance, duration } = routes[0];
    this.route = { distance: this.formatToKm(distance), duration: this.formatDate(duration) };

    const featureList = this.directionService.decode(geometry);
    const latLngs = featureList.map(feat => L.latLng(feat.geometry.coordinates[1], feat.geometry.coordinates[0]));
    this.map.drawPolyline(latLngs);
  }

  private formatToKm = meters => (meters / 1000).toFixed(1);

  private formatDate = seconds => {
    const date = new Date(null);
    date.setSeconds(seconds);
    return date.toISOString().substr(11, 8);
  }

  private injectMap = () => this.map.createMapBoxMapInstance();

  private addPoint = place => this.map.addCircle(L.latLng(place.lat, place.lng));
}
