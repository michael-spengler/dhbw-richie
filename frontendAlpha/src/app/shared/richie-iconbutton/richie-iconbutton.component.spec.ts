import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RichieIconbuttonComponent } from './richie-iconbutton.component';

describe('RichieIconbuttonComponent', () => {
  let component: RichieIconbuttonComponent;
  let fixture: ComponentFixture<RichieIconbuttonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RichieIconbuttonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RichieIconbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
