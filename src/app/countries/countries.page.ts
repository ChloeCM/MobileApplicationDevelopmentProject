import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
} from '@ionic/angular/standalone';
import { MyDataService } from '../services/my-data.service';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.page.html',
  styleUrls: ['./countries.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
  ],
})
export class CountriesPage implements OnInit {
  selectedCountry: string = '';
  newUrl: string = '';
  countryData: any;
  options: HttpOptions = {
    url: 'https://restcountries.com/v3.1/name/',
  };

  constructor(private mds: MyDataService, private mhs: MyHttpService) {}

  async ngOnInit() {
    await this.loadSelectedCountry();
    this.updateNewUrl(this.selectedCountry);
    this.countryData = [];
    this.getCountries();
  }

  async loadSelectedCountry() {
    this.selectedCountry = await this.mds.get('country');
  }

  updateNewUrl(country: string) {
    this.newUrl = this.options.url + this.selectedCountry;
    this.options.url = this.newUrl;
  }

  async getCountries() {
    let result = await this.mhs.get(this.options);
    this.countryData = result.data;
    console.log('Country data: ', this.countryData);
  }
}
