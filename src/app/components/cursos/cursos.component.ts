import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ICurso } from 'src/app/models/curso.model';
import { CursosService } from '../../services/cursos.service'

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.sass']
})
export class CursosComponent implements OnInit {
  loading: boolean = true;
  cursos: any[] = [];

  constructor(private cursosS: CursosService, 
              private router: Router) { }

  ngOnInit(): void {
    this.cursosS.obtenerCursos().subscribe(
      data => {
        this.cursos = data.map((element) => {
          let curso: ICurso = {
            id: element.payload.doc.id,
            ...JSON.parse(JSON.stringify(element.payload.doc.data())) 
          } 
          return curso
        }, {});
        this.loading = false
      }
    );
  }

  abrirCurso(id: number){
    this.router.navigateByUrl(`edicion/${id}`);
  }

}
