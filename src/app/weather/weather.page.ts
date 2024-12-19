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
  IonCardContent,
} from '@ionic/angular/standalone';
import { HttpOptions } from '@capacitor/core';
import { MyDataService } from '../services/my-data.service';
import { MyHttpService } from '../services/my-http.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
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
    IonCardContent,
  ],
})
export class WeatherPage implements OnInit {
  constructor(private mhs: MyHttpService, private mds: MyDataService) {}
  displayweather: boolean = false;
  weatherData: any = [];
  capital: string = '';
  weatherIconUrl: string = '';

  unit: string = '';
  apiKey: string = '5435b742b0a0d532ed35c0ff2578bd41';
  options: HttpOptions = {
    url: 'https://api.openweathermap.org/data/2.5/weather?',
  };

  ngOnInit() {
    this.initaliseData();
  }

  async initaliseData() {
    try {
      await this.getCapital();
      await this.getUnits();
      await this.updateUrl();
      await this.getWeatherData();
    } catch (error) {
      console.error('Error during initialization:', error);
    }
  }

  async getWeatherData() {
    try {
      const result = await this.mhs.get(this.options);
      this.weatherData = result.data;
      this.displayweather = true;

      const weatherIcon = this.weatherData.weather?.[0]?.icon;
      if (weatherIcon) {
        this.weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
      } else {
        console.error('Weather icon not found');
      }

      console.log('Weather data@', this.weatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

  async updateUrl() {
    let latlng = await this.mds.get('latlng');
    let lat = latlng[0];
    let lng = latlng[1];

    console.log('Lat', lat);
    console.log('Long', lng);

    this.options.url = `${this.options.url}lat=${lat}&lon=${lng}&units=${this.unit}&appid=${this.apiKey}`;
    console.log(this.options.url);
  }

  async getCapital() {
    try {
      const result = await this.mds.get('capital');
      this.capital = typeof result === 'string' ? result : 'Unknown Location';
    } catch (error) {
      console.error('Error fetching capital:', error);
      this.capital = 'Unknown Location';
    }
  }

  async getUnits() {
    try {
      const result = await this.mds.get('selectedOption');
      this.unit = typeof result === 'string' ? result : 'metric';
    } catch (error) {
      console.error('Error fetching units:', error);
      this.unit = 'metric';
    }
  }
}
