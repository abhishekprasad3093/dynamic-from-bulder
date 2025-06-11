import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropWrapperComponent } from './drag-drop-wrapper.component';

describe('DragDropWrapperComponent', () => {
  let component: DragDropWrapperComponent;
  let fixture: ComponentFixture<DragDropWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragDropWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragDropWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
