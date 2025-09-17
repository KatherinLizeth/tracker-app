import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCompanyComponent } from './test-company.component';

describe('TestCompanyComponent', () => {
  let component: TestCompanyComponent;
  let fixture: ComponentFixture<TestCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestCompanyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
