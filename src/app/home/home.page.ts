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

  constructor(private mds: MyDataService) {}

  ionViewWillEnter() {
    this.getCountryFromStorage();
  }

  async getCountryFromStorage() {
    this.countryToDisplay = await this.mds.get('country');
    console.log('Your country is set to: ' + this.countryToDisplay);
  }

  async setCountry() {
    await this.mds.set('country', this.newCountry);
  }
}
