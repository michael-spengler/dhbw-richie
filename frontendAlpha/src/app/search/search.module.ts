import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';

const searchRoutes: Routes = [
  {
    path: 'search',
    component: SearchComponent
  }
];
@NgModule({
  declarations: [SearchComponent],
  imports: [CommonModule, RouterModule.forChild(searchRoutes)]
})
export class SearchModule {}
