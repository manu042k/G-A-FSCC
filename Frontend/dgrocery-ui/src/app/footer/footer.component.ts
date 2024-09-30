import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
/**
 *
 *
 * @export
 * @class FooterComponent
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  email: string = 'support@example.com';
  phone: string = '+1 123-456-7890';
  year: string = '2024';
  company: string = 'dgrocery';
}
