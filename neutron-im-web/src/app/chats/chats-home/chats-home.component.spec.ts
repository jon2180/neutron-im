import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatsHomeComponent } from './chats-home.component';

describe('ChatsHomeComponent', () => {
  let component: ChatsHomeComponent;
  let fixture: ComponentFixture<ChatsHomeComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatsHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
