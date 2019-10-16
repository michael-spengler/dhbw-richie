import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { LegalComponent } from './legal/legal.component';

const commonRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  }
];
@NgModule({
  declarations: [HomeComponent, LegalComponent, AboutComponent, ImpressumComponent],
  imports: [CommonModule, RouterModule.forChild(commonRoutes)]
})
export class InformationModule {}
