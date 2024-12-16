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
  IonInput,
} from '@ionic/angular/standalone';
import { MyDataService } from '../services/my-data.service';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';
import { RouterLink } from '@angular/router';

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
    RouterLink,
    IonInput,
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

    if (this.selectedCountry) {
      this.updateNewUrl(this.selectedCountry);
      await this.getCountries();
    } else {
      console.log('No country in local Storage');
    }

    // this.updateNewUrl(this.selectedCountry);
    // this.countryData = [];
    // this.getCountries();
  }

  async loadSelectedCountry() {
    this.selectedCountry = await this.mds.get('country');

    if (this.selectedCountry) {
      console.log('COuntry loaded from storage: ', this.selectedCountry);
    } else {
      console.log('NO COuntry in HEREEEE!!!');
    }
    //console.log('Country is set to: ', this.selectedCountry);
  }

  updateNewUrl(country: string) {
    if (country) {
      this.newUrl = `${this.options.url}${country}`;
      this.options.url = this.newUrl;
      console.log('Updated API URL: ', this.newUrl);
    } else {
      console.log('Cannot update URL. No country provided.');
    }
    // this.newUrl = this.options.url + this.selectedCountry;
    // this.options.url = this.newUrl;
  }

  async getCountries() {
    if (this.newUrl) {
      try {
        const result = await this.mhs.get(this.options);
        this.countryData = result.data;
        console.log('Country data fetched: ', this.countryData);
      } catch (error) {
        console.error('Error fetching country data: ', error);
      }
    } else {
      console.log('No URL set for fetching country data.');
    }

    // let result = await this.mhs.get(this.options);
    // this.countryData = result.data;
    // console.log('Country data: ', this.countryData);
  }
}
