import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsNavigationComponent } from './buttons-navigation.component';

describe('ButtonsNavigationComponent', () => {
  let component: ButtonsNavigationComponent;
  let fixture: ComponentFixture<ButtonsNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonsNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonsNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
