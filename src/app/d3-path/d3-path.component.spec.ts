import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3PathComponent } from './d3-path.component';

describe('D3PathComponent', () => {
  let component: D3PathComponent;
  let fixture: ComponentFixture<D3PathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ D3PathComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(D3PathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
