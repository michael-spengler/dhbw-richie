import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RichieTextareaComponent } from './richie-textarea.component';

describe('RichieTextareaComponent', () => {
  let component: RichieTextareaComponent;
  let fixture: ComponentFixture<RichieTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RichieTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RichieTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
