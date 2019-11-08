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
    data: { title: 'Richie | Home' }
  },
  {
    path: 'about',
    component: AboutComponent,
    data: { title: 'Richie | About' }
  },
  {
    path: 'legal',
    component: LegalComponent,
    data: { title: 'Richie | Legal' }
  },
  {
    path: 'impressum',
    component: ImpressumComponent,
    data: { title: 'Richie | Impressum' }
  }
];
@NgModule({
  declarations: [HomeComponent, LegalComponent, AboutComponent, ImpressumComponent],
  imports: [CommonModule, RouterModule.forChild(commonRoutes), SharedModule]
})
export class InformationModule {}
