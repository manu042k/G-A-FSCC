import { Route } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ProductDisplayComponent } from './product-display/product-display.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './auth/profile/profile.component';

export const appRoutes: Route[] = [
  { path: '', component: LandingPageComponent },
  { path: 'product-list', component: ProductDisplayComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cart', component: CartComponent },
  { path: 'profile', component: ProfileComponent },
];
