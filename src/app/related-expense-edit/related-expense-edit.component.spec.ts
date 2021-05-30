import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedExpenseEditComponent } from './related-expense-edit.component';

describe('RelatedExpenseEditComponent', () => {
  let component: RelatedExpenseEditComponent;
  let fixture: ComponentFixture<RelatedExpenseEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatedExpenseEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedExpenseEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
