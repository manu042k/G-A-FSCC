import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AddBannerComponent } from './add-banner/add-banner.component';
import { FooterComponent } from './footer/footer.component';
import { ProductContainerComponent } from './product-container/product-container.component';
import { ProductItemComponent } from './product-container/product-item/product-item.component';
import { FeatureCategoriesComponent } from './feature-categories/feature-categories.component';

@Component({
  standalone: true,
  imports: [
    NxWelcomeComponent,
    RouterModule,
    NavBarComponent,
    AddBannerComponent,
    FooterComponent,
    ProductContainerComponent,
    ProductItemComponent,
    FeatureCategoriesComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'dgrocery-ui';
}
