import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsRoutingModule } from './forms-routing.module';
import { BuilderComponent } from './builder/builder.component';
import { PreviewComponent } from './preview/preview.component';
import { FillComponent } from './fill/fill.component';
import { ViewSubmissionsComponent } from './view-submissions/view-submissions.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BuilderComponent,
    PreviewComponent,
    FillComponent,
    ViewSubmissionsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    FormsRoutingModule,
  ],
})
export class DynamicFormsModule {}
