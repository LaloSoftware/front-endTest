import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ICurso } from 'src/app/models/curso.model';
import { CursosService } from 'src/app/services/cursos.service';
import { ActivatedRoute, Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editar-curso',
  templateUrl: './editar-curso.component.html',
  styleUrls: ['./editar-curso.component.sass']
})
export class EditarCursoComponent implements OnInit {
  id: string;
  curso: ICurso = {
    nombre: '',
    duracion: null,
    calificacion: null,
    nombre_profesor: ''
  }
  constructor(private cursosS: CursosService,
              private activatedRouter: ActivatedRoute,
              private router: Router,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.obtenerParametros();
    if(this.id){
      this.cargarDatos();
    }
  }

  private openSnackBar(message: string) {
    this._snackBar.open(message, 'Cerrar', {
      duration: 2000,
    });
  }

  private cargarDatos(){
    this.cursosS.obtenerCurso(this.id).subscribe(
      data => {
        console.log(data.payload.data());
        this.curso = {
          ...JSON.parse(JSON.stringify(data.payload.data()))
        }
      }, err=>{
        this.openSnackBar('Ha ocurrido un error')
      }
    );
  }

  private obtenerParametros(){
    this.activatedRouter.params.subscribe(
      parametros => {
        if(parametros['id']){
          this.id = parametros['id'];
        }
      }, err=> {
        this.openSnackBar('Ha ocurrido un error');
      }
    );
  }

  onSubmit(form: NgForm){
    console.log(form)
    if(form.valid){
      if(this.id){
        this.editarCurso();
      } else {
        this.crearCurso(form);
      }
    }
  }

  crearCurso(form: NgForm){
    this.cursosS.crearCurso(form.value).then(()=>{
      this.openSnackBar('Curso guardado')
      this.router.navigateByUrl('/cursos')
    }).catch(err => {
      this.openSnackBar('Problemas al guardar, intentelo más tarde');
    });
  }

  editarCurso(){
    this.cursosS.editarCurso(this.id, this.curso).then(
      success => {
        this.openSnackBar('Cambios guardado')
        this.router.navigateByUrl('/cursos')
      }
    ).catch(
      err => {
        this.openSnackBar('Problemas al guardar')
      }
    );
  }

  eliminarCurso(){
    if(this.id){
      this.cursosS.eliminarCurso(this.id).then(
        success => {
          this.openSnackBar('Curso eliminado')
          this.router.navigateByUrl('/cursos')
        }
      ).catch(
        err => {
          this.openSnackBar('Problemas al eliminar')
        }
      );
    }
  }
}
