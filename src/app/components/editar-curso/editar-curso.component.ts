import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ICurso } from 'src/app/models/curso.model';
import { CursosService } from 'src/app/services/cursos.service';
import { ActivatedRoute, Router } from '@angular/router'

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
              private router: Router) { }

  ngOnInit(): void {
    this.obtenerParametros();
    if(this.id){
      this.cargarDatos();
    }
  }

  private cargarDatos(){
    this.cursosS.obtenerCurso(this.id).subscribe(
      data => {
        console.log(data.payload.data());
        this.curso = {
          ...JSON.parse(JSON.stringify(data.payload.data()))
        }
      }, err=>{
        console.log(err);
      }
    );
  }

  private obtenerParametros(){
    this.activatedRouter.params.subscribe(
      parametros => {
        if(parametros['id']){
          this.id = parametros['id'];
        }
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
      console.log('Guardado');
      this.router.navigateByUrl('/cursos')
    }).catch(err => {
      console.log('error');
    });
  }

  editarCurso(){
    this.cursosS.editarCurso(this.id, this.curso).then(
      success => {
        console.log('registrado');
        this.router.navigateByUrl('/cursos')
      }
    ).catch(
      err => {
        console.log(err);
      }
    );
  }

  eliminarCurso(){
    if(this.id){
      this.cursosS.eliminarCurso(this.id).then(
        success => {
          console.log('eliminado');
          this.router.navigateByUrl('/cursos')
        }
      ).catch(
        err => {
          console.log(err);
        }
      );
    }
  }
}
