import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonLabel,
  IonButton,
  IonButtons,
  IonIcon,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyDataService } from '../services/my-data.service';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    RouterLink,
    IonButton,
    IonLabel,
    IonButtons,
    IonIcon,
    CommonModule,
    FormsModule,
  ],
})
export class HomePage {
  countryToDisplay: string = '';
  newCountry: string = '';
  options: HttpOptions = {
    url: 'https://restcountries.com/v3.1/name/{name}',
  };

  constructor(private mds: MyDataService, private mhs: MyHttpService) {}

  ngOnInit() {
    this.getCountries();
  }

  async getCountries() {
    let result = await this.mhs.get(this.options);
    console.log(result);
  }

  ionViewWillEnter() {
    this.getCountryFromStorage();
  }

  async getCountryFromStorage() {
    this.countryToDisplay = await this.mds.get('country');
    console.log('Your country is set to: ' + this.countryToDisplay);
  }

  async setCountry() {
    await this.mds.set('country', this.newCountry);
    this.countryToDisplay = this.newCountry;
  }
}
