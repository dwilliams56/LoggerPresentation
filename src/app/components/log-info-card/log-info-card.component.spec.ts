import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInfoCardComponent } from './log-info-card.component';

describe('LogInfoCardComponent', () => {
  let component: LogInfoCardComponent;
  let fixture: ComponentFixture<LogInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogInfoCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
