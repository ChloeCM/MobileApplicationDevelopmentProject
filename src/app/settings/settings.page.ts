import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonRadioGroup,
  IonRadio,
  IonButtons,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { MyDataService } from '../services/my-data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonRadioGroup,
    IonRadio,
    IonButtons,
    IonButton,
    IonIcon,
    RouterLink,
    IonItem,
    IonLabel,
  ],
})
export class SettingsPage implements OnInit {
  constructor(private mds: MyDataService) {}
  // Default value will be set to 'Metric'
  selectedOption: string = 'Metric';

  async ngOnInit() {
    await this.loadSelectedOption();
  }

  // Load the saved option or default to 'Metric'
  async loadSelectedOption() {
    const savedOption = await this.mds.get('selectedOption');
    this.selectedOption = savedOption || 'Metric';
    console.log('Option Selected:', this.selectedOption);
  }

  // Save the selected option to local storage
  async optionSelected(option: string) {
    this.selectedOption = option;
    await this.mds.set('selectedOption', this.selectedOption);
    console.log('Saved Option:', this.selectedOption);
  }
}
