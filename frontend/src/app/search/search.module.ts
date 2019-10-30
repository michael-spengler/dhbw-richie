import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuestionService } from '../question/question.service';
import { SharedModule } from '../shared/shared.module';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [SearchComponent],
  imports: [CommonModule, SearchRoutingModule, SharedModule, FormsModule],
  providers: [QuestionService]
})
export class SearchModule {}
