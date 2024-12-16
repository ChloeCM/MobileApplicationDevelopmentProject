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
} from '@ionic/angular/standalone';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
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
  ],
})
export class NewsPage implements OnInit {
  // selectedCountry: string = '';
  //   newUrl: string = '';
  //   countryData: any;
  //   options: HttpOptions = {
  //     url: 'https://restcountries.com/v3.1/name/',
  //   };

  //   constructor(private mds: MyDataService, private mhs: MyHttpService) {}

  //   ngOnInit() {
  //     this.getCountry();
  //   }

  //   async getCountry() {
  //     this.selectedCountry = await this.mds.get('country');
  //     this.options.url = this.options.url.concat(this.selectedCountry);
  //     let result = await this.mhs.get(this.options);
  //     this.countryData = result.data;
  //     console.log(JSON.stringify(this.countryData));
  constructor(private mhs: MyHttpService) {}
  newsData: any = [];
  options: HttpOptions = {
    url: 'https://newsdata.io/api/1/latest?apikey=pub_6182620d5deadc7e73c0a7ff6b237b6a00533&q=ireland',
  };

  ngOnInit() {}

  ionViewWillEnter() {
    this.getCountry();
  }

  async getCountry() {
    let result = await this.mhs.get(this.options);
    this.newsData = result.data.results;
    console.log(this.newsData);
  }
}
