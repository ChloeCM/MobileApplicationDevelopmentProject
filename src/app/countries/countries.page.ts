import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { MyDataService } from '../services/my-data.service';

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
  ],
})
export class CountriesPage implements OnInit {
  country: string = '';
  newUrl: string = '';

  constructor(private mds: MyDataService) {}

  async ngOnInit() {
    await this.getCountry();
    this.setUrl(this.country);
  }

  async getCountry() {
    this.country = await this.mds.get('country');
  }

  setUrl(country: string) {
    this.newUrl = 'https://restcountries.com/v3.1/name/' + this.country;
  }
}
