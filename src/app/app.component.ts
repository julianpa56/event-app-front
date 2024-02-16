import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, Event, NavigationEnd, RouterLink } from '@angular/router';
import { IStaticMethods } from 'preline/preline';
import { FormsModule } from '@angular/forms';
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  selectedMonth: number = 6; // July
  selectedYear: number = 2023;
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  years: number[] = [2023, 2024, 2025, 2026, 2027];

  title = 'Event app';

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          // @ts-ignore
          HSStaticMethods.autoInit();
        }, 100);
      }
    });
  }

  prevMonth() {
    if (this.selectedMonth === 0) {
      this.selectedMonth = 11; // December
      this.selectedYear--;
    } else {
      this.selectedMonth--;
    }
  }

  nextMonth() {
    if (this.selectedMonth === 11) {
      this.selectedMonth = 0; // January
      this.selectedYear++;
    } else {
      this.selectedMonth++;
    }
  }

  applySelection() {
    console.log('Selected Month:', this.months[this.selectedMonth]);
    console.log('Selected Year:', this.selectedYear);
    // Aquí puedes implementar la lógica para aplicar la selección de fecha
  }

  cancelSelection() {
    // Aquí puedes implementar la lógica para cancelar la selección de fecha
  }
}
