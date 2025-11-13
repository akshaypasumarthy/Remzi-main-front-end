import { Routes } from '@angular/router';
import { CustomerReviewComponent } from './customer-review/customer-review';
import { HomePageComponent } from './home-page-component/home-page-component';
import { AdminLogin } from './admin-login/admin-login';
import { AdminView } from './admin-view/admin-view';
import { MainPage } from './main-page/main-page';

export const routes: Routes = [
    {path: "",component:HomePageComponent},
    {path:'customer-review',component:CustomerReviewComponent},
    {path:'admin',component:AdminLogin},
    {path:'admin-home',component:AdminView}
];
