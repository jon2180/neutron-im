import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationsAccountProfileComponent } from './relations-account-profile.component';

describe('RelationsAccountProfileComponent', () => {
  let component: RelationsAccountProfileComponent;
  let fixture: ComponentFixture<RelationsAccountProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelationsAccountProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationsAccountProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
