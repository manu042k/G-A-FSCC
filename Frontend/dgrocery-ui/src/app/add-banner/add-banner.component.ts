import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
/**
 *
 *
 * @export
 * @class AddBannerComponent
 */
@Component({
  selector: 'app-add-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-banner.component.html',
  styleUrl: './add-banner.component.scss',
})


export class AddBannerComponent {

  addsTitle:string = 'Fast Delivery to Your Doorstep!' 
  addsMessage:string = 'Order now and get your groceries delivered in just 15 minutes.'
  imagePath:string = 'deliver-man.jpg';

  private router = inject(Router);

  /**
   *
   *
   * @memberof AddBannerComponent
   */
  onOrderButtonClick():void{
    this.router.navigate(['product-list']);
  }

  
}
