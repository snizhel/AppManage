import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from '../app/user-profile/user-profile.component';
import { GuardService as AuthGuard } from '../../src/app/Service/guard.service';
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
    path: 'admin-layout',
    loadChildren: () =>
      import('./admin-layout/admin-layout.module').then(
        (m) => m.AdminLayoutModule
      ),
  },
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
