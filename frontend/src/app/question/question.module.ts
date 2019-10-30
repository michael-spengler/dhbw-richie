import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../management/auth.guard';
import { SharedModule } from '../shared/shared.module';
import { AddComponent } from './add/add.component';
import { QuestionComponent } from './question/question.component';

const questionRoutes: Routes = [
  {
    path: 'question/:id',
    component: QuestionComponent,
    data: { title: 'Richie | Question' }
  },
  {
    path: 'add',
    component: AddComponent,
    canActivate: [AuthGuard],
    data: { title: 'Richie | Add' }
  }
];

@NgModule({
  declarations: [QuestionComponent, AddComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(questionRoutes),
    SharedModule,
    FormsModule
  ]
})
export class QuestionModule {}
