import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RichieSelectComponent } from './richie-select.component';

describe('RichieSelectComponent', () => {
  let component: RichieSelectComponent;
  let fixture: ComponentFixture<RichieSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RichieSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RichieSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
