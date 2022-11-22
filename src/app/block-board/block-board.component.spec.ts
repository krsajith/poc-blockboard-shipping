import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockBoardComponent } from './block-board.component';

describe('BlockBoardComponent', () => {
  let component: BlockBoardComponent;
  let fixture: ComponentFixture<BlockBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
