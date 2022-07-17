import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationsHomeComponent } from './relations-home.component';

describe('RelationsHomeComponent', () => {
  let component: RelationsHomeComponent;
  let fixture: ComponentFixture<RelationsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelationsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
