import { AddItemComponent } from './add-item/add-item.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from '../app/user-profile/user-profile.component';
import { GuardService as AuthGuard } from '../../src/app/Service/guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditItemComponent } from './edit-item/edit-item.component';

const routes: Routes = [
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'login',
    component: UserProfileComponent,
  },
  {
    path: 'add',
    component: AddItemComponent,
  },
  {
    path: 'edit/:id',
    component: EditItemComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },

  // {
  //   path: '**',
  //   loadChildren: () =>
  //     import('./admin-layout/admin-layout.module').then(
  //       (m) => m.AdminLayoutModule
  //     ),
  // },

  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
