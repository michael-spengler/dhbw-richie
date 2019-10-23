import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { LegalComponent } from './legal/legal.component';

const commonRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { animation: 'home' }
  },
  {
    path: 'about',
    component: AboutComponent,
    data: { animation: 'about' }
  },
  {
    path: 'legal',
    component: LegalComponent,
    data: { animation: 'legal' }
  },
  {
    path: 'impressum',
    component: ImpressumComponent,
    data: { animation: 'impressum' }
  }
];
@NgModule({
  declarations: [HomeComponent, LegalComponent, AboutComponent, ImpressumComponent],
  imports: [CommonModule, RouterModule.forChild(commonRoutes), SharedModule]
})
export class InformationModule {}
