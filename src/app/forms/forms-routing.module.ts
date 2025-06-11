import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuilderComponent } from './builder/builder.component';
import { PreviewComponent } from './preview/preview.component';
import { FillComponent } from './fill/fill.component';
import { ViewSubmissionsComponent } from './view-submissions/view-submissions.component';
import { AuthGuard } from '../core/auth.guard';

const routes: Routes = [
  {
    path: 'builder',
    component: BuilderComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'preview',
    component: PreviewComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'fill',
    component: FillComponent,
    canActivate: [AuthGuard],
    data: { roles: ['user', 'admin'] }
  },
  {
    path: 'view-submissions',
    component: ViewSubmissionsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },
  { path: '', redirectTo: 'builder', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormsRoutingModule {}
