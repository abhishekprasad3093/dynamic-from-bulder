import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropWrapperComponent } from './drag-drop-wrapper/drag-drop-wrapper.component';
import { FormFieldComponent } from './form-field/form-field.component';



@NgModule({
  declarations: [
    DragDropWrapperComponent,
    FormFieldComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
