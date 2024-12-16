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
  IonItem,
  IonInput,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyDataService } from '../services/my-data.service';
import { Router } from '@angular/router';

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
    IonItem,
    CommonModule,
    FormsModule,
    IonInput,
  ],
})
export class HomePage {
  newCountry: string = '';

  constructor(private mds: MyDataService, private router: Router) {}

  async setCountry() {
    await this.mds.set('country', this.newCountry);
    this.router.navigate(['/countries']);
  }
}
