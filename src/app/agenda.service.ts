import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

import { Tarefa } from './models/agenda.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  tarefas: AngularFirestoreCollection<Tarefa>;

  constructor(private afs: AngularFirestore) {
    this.setTarefas();
   }

  setTarefas(): void {
    this.tarefas = this.afs.collection<Tarefa>('agenda');
  }

  createTarefa(tarefa: Tarefa): Promise<void> {
     const id = this.afs.createId();
     return this.tarefas.doc<Tarefa>(id).set({
       id,
       tarefa: tarefa.tarefa,
       finalizado: false
     });
  }

  updateTarefa(tarefa: Tarefa): Promise<void> {
    return this.tarefas.doc<Tarefa>(tarefa.id).update(tarefa);
  }

  deleteTarefa(tarefa: Tarefa): Promise<void> {
    return this.tarefas.doc<Tarefa>(tarefa.id).delete();
  }

  getTarefa(id: string): Observable<Tarefa> {
    return this.tarefas.doc<Tarefa>(id).valueChanges();
  }
}

