import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import { ICurso } from '../models/curso.model';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private firestore: AngularFirestore) { }

  obtenerCursos(){
    return this.firestore.collection('cursos').snapshotChanges();
  }

  obtenerCurso(id: string){
    return this.firestore.collection('cursos').doc(id).snapshotChanges();
  }

  crearCurso(curso: ICurso){
    return this.firestore.collection('cursos').add(curso);
  }

  editarCurso(id: string, curso: ICurso){
    return this.firestore.collection('cursos').doc(id).update(curso);
  }

  eliminarCurso(id: string){
    return this.firestore.collection('cursos').doc(id).delete();
  }
}
