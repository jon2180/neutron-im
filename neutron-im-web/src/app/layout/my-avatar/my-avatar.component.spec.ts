import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAvatarComponent } from './my-avatar.component';

describe('MyAvatarComponent', () => {
  let component: MyAvatarComponent;
  let fixture: ComponentFixture<MyAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAvatarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
