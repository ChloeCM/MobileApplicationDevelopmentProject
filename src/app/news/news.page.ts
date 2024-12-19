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
  IonButtons,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';
import { MyDataService } from '../services/my-data.service';
import { RouterLink } from '@angular/router';

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
    IonButtons,
    IonButton,
    IonIcon,
    RouterLink,
  ],
})
export class NewsPage implements OnInit {
  constructor(private mhs: MyHttpService, private mds: MyDataService) {}
  displayNews: boolean = false;
  newsData: any = [];
  country: string = '';
  options: HttpOptions = {
    url: 'https://newsdata.io/api/1/latest?apikey=pub_6182620d5deadc7e73c0a7ff6b237b6a00533&country=',
  };

  ngOnInit() {
    this.initaliseData();
  }

  async initaliseData() {
    this.country = await this.mds.get('country');
    await this.updateUrl();
    await this.getCountry();
  }

  async getCountry() {
    let result = await this.mhs.get(this.options);
    this.newsData = result.data.results;
    this.displayNews = true;
    console.log(this.newsData);
  }

  async updateUrl() {
    let cca2 = await this.mds.get('cca2');
    this.options.url = this.options.url.concat(cca2);
    console.log(this.options.url);
  }
}
