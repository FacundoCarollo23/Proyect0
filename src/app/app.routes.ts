import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {path: '', pathMatch:"full" , component: HomeComponent},
    {path: 'Home', pathMatch:"full" , component: HomeComponent},

];
