import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ViewerComponent } from './viewer/viewer.component';
import { CommentsComponent } from './comments/comments.component';

import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: '', component: ViewerComponent }
];

@NgModule({
  declarations: [
    ViewerComponent,
    CommentsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ViewerModule { }
