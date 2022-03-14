import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameScreenComponent } from './components/game-screen/game-screen.component';

const routes: Routes = [
  {path: '', component: GameScreenComponent },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
