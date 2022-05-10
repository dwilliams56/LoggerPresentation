import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogDashboardComponent } from './pages/log-dashboard/log-dashboard.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LogInfoCardComponent } from './components/log-info-card/log-info-card.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'dashboard', component: LogDashboardComponent },
  { path: 'info', component: LogInfoCardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
