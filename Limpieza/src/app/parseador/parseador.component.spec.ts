import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParseadorComponent } from './parseador.component';

describe('ParseadorComponent', () => {
  let component: ParseadorComponent;
  let fixture: ComponentFixture<ParseadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParseadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParseadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
