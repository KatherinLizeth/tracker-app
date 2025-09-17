import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketLitsComponent } from './ticket-lits.component';

describe('TicketLitsComponent', () => {
  let component: TicketLitsComponent;
  let fixture: ComponentFixture<TicketLitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketLitsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketLitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
