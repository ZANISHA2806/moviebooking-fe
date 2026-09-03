import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-flow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-flow.html',
  styleUrl: './booking-flow.css'
})
export class BookingFlow {
  currentStep = 1;
}
