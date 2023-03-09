import { FinalComponent } from './final/final.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { PadrinhoCardComponent } from './padrinho-card/padrinho-card.component';

const routes: Routes = [
  {path: 'pronto', component: FinalComponent,},
  {path: '/', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [AuthGuardService]},
  {path: 'padrinhos', component: PadrinhoCardComponent, }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
