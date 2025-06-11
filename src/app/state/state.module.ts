import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { formReducer } from './form/form.reducer';

@NgModule({
  imports: [
    StoreModule.forRoot({
      form: formReducer
    })
  ]
})
export class StateModule {}
