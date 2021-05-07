import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortByPipe } from './pipes/sort-by.pipe';
import { SafePipe } from './pipes/safe.pipe';
import { InViewDirective } from './directives/in-view.directive';

@NgModule({
  declarations: [
    SortByPipe,
    SafePipe,
    InViewDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SortByPipe,
    SafePipe,
    InViewDirective
  ]
})
export class SharedModule { }
