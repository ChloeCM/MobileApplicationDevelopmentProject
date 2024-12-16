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
import { count } from 'rxjs';

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

  ngOnInit() {
    this.getCountry();
  }

  async getCountry() {
    this.selectedCountry = await this.mds.get('country');
    this.options.url = this.options.url.concat(this.selectedCountry);
    let result = await this.mhs.get(this.options);
    this.countryData = result.data;
    console.log(JSON.stringify(this.countryData));
  }

  async newsPage(country: any) {
    console.log(country.cca2);
    await this.mds.set('cca2', country.cca2);
    console.log(this.mds.get('cca2'));
  }
}
