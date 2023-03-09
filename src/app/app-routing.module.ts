import { FinalComponent } from './final/final.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { PadrinhoCardComponent } from './padrinho-card/padrinho-card.component';

const routes: Routes = [
  // {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '', component: LoginComponent, },
  {path: 'padrinhos', component: PadrinhoCardComponent, canActivate: [AuthGuardService] },
  {path: 'pronto', component: FinalComponent,},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
