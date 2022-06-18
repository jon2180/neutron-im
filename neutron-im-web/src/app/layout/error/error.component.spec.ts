import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorComponent } from './error.component';

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
