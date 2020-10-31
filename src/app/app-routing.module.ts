import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CursosComponent } from './components/cursos/cursos.component';
import { EditarCursoComponent } from './components/editar-curso/editar-curso.component';

const routes: Routes = [
  {path: 'cursos', component: CursosComponent},
  {path: 'edicion', component: EditarCursoComponent},
  {path: 'edicion/:id', component: EditarCursoComponent},
  {path: '**', redirectTo: 'cursos'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
