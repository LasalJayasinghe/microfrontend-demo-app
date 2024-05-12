import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mf3Component } from './mf3.component';

describe('Mf3Component', () => {
  let component: Mf3Component;
  let fixture: ComponentFixture<Mf3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mf3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Mf3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
