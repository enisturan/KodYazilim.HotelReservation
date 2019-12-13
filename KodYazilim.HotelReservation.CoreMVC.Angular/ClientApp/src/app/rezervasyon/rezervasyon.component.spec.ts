import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RezervasyonComponent } from './rezervasyon.component';

describe('RezervasyonComponent', () => {
  let component: RezervasyonComponent;
  let fixture: ComponentFixture<RezervasyonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RezervasyonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RezervasyonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
