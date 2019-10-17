import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { ReviewComponent } from './review/review.component';
import { SettingsComponent } from './settings/settings.component';

const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'review',
    component: ReviewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard]
  }
];
@NgModule({
  declarations: [AdminComponent, LoginComponent, ReviewComponent, SettingsComponent],
  imports: [CommonModule, RouterModule.forChild(adminRoutes)]
})
export class ManagementModule {}
