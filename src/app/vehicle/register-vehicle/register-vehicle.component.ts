import { Component, Output,OnInit, EventEmitter, Input,ViewChild  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ISlimScrollOptions, SlimScrollEvent } from 'ngx-slimscroll';


class RegisterForm {
  
}


@Component({
  selector: 'sga-register-vehicle',
  templateUrl: './register-vehicle.component.html',
  styleUrls: ['./register-vehicle.component.scss']
})

export class RegisterVehicleComponent implements  OnInit {

  model: RegisterForm = new RegisterForm();
  @ViewChild('formVehicle') formVehicle: any;
  anttDueDate: Date;
  comunication: string;
 
  pt:any;

  //Slim Scroll options
  opts: ISlimScrollOptions;
  scrollEvents: EventEmitter<SlimScrollEvent>;

  ngOnInit() {
    this.scrollEvents = new EventEmitter<SlimScrollEvent>();
    this.opts = {
      alwaysVisible: true
    }
    this.pt = {
        firstDayOfWeek: 1,
        dayNames: [ "Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado" ],
        dayNamesShort: [ "Dom","Seg","Ter","Qua","Qui","Sex","Sáb" ],
        dayNamesMin: [ "D","S","T","Q","Q","S","S" ],
        monthNames: [ "Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro" ],
        monthNamesShort: [ "Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez" ],
        today: 'Hoje',
        clear: 'Limpar'
    }

  }

  onSubmit() {
      if (this.formVehicle.valid) {
        console.log("Form Submitted!");
        this.formVehicle.reset();
      }
    }

  // Show image profile
  addProfilePhoto(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event:any) => {
        var url = event.target.result;
        var removeImage = document.querySelector('.remove-img-profile');
        var containerImage = document.querySelector('.img-profile');
        (removeImage as HTMLElement).style.display = 'flex';
        (containerImage as HTMLElement).style.display = 'block';
        (containerImage as HTMLElement).style.backgroundImage  = "url("+url+")";
      }
      reader.readAsDataURL(event.target.files[0]);

    }
  }
  removeProfilePhoto(){
     var containerImage = document.querySelector('.img-profile');
     var removeImage = document.querySelector('.remove-img-profile');
     (containerImage as HTMLElement).style.backgroundImage  = "url(' ')";
     (containerImage as HTMLElement).style.display = 'none';
     (removeImage as HTMLElement).style.display = 'none';

  }

  private place: any;
  formMotorist:any;

  @Input('showForm')
  public showForm: boolean;

  @Output('onFormClose')
  public onFormClose = new EventEmitter();

  public mapUrl: SafeResourceUrl;

  constructor(private domSanitizer : DomSanitizer) {
    this.mapUrl = domSanitizer.bypassSecurityTrustResourceUrl(this.getMapUrlByLatLng(-23.53, -46.62));
  }
  
  placesFiltered(place: any) {
    const urlValue = this.getMapUrlByLatLng(place.geometry.location.lat(), place.geometry.location.lng());
    this.mapUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(urlValue);
    this.place = place;
  }

  filterRemoved() {
    this.place = null;
  }
  
  cancel() {
    this.onFormClose.emit();
  }

  create(formMotorist: NgForm) {
    const vehicle = {
      location: this.place.formatted_address,
      ...formMotorist.value
    };

    console.log(vehicle);
  }

  getMapUrlByLatLng(lat: number, lng: number) {
    return `https://maps.google.com/maps?q=${lat},${lng}&hl=es;z=14&amp&output=embed`;
  }


}
