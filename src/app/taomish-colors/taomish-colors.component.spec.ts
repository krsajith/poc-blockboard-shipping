import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaomishColorsComponent } from './taomish-colors.component';

describe('TaomishColorsComponent', () => {
  let component: TaomishColorsComponent;
  let fixture: ComponentFixture<TaomishColorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaomishColorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaomishColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
