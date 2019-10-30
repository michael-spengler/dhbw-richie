import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { ReviewComponent } from './review/review.component';
import { SettingsComponent } from './settings/settings.component';

const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { title: 'Richie | Admin' }
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard],
    data: { title: 'Richie | Settings' }
  },
  {
    path: 'review',
    component: ReviewComponent,
    canActivate: [AuthGuard],
    data: { title: 'Richie | Review' }
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: { title: 'Richie | Login' }
  }
];
@NgModule({
  declarations: [AdminComponent, LoginComponent, ReviewComponent, SettingsComponent],
  imports: [CommonModule, RouterModule.forChild(adminRoutes), SharedModule, FormsModule]
})
export class ManagementModule {}
