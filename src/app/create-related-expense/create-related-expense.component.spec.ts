import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRelatedExpenseComponent } from './create-related-expense.component';

describe('CreateRelatedExpenseComponent', () => {
  let component: CreateRelatedExpenseComponent;
  let fixture: ComponentFixture<CreateRelatedExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRelatedExpenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRelatedExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
