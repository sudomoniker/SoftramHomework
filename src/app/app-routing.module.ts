import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { RulesComponent } from './rules/rules.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  { path: 'viewer', loadChildren: () => import('./viewer/viewer.module').then(m => m.ViewerModule) },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'rules', component: RulesComponent },
  { path: 'create', component: CreateComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
