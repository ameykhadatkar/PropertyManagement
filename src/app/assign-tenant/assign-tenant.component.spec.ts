import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTenantComponent } from './assign-tenant.component';

describe('AssignTenantComponent', () => {
  let component: AssignTenantComponent;
  let fixture: ComponentFixture<AssignTenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignTenantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
