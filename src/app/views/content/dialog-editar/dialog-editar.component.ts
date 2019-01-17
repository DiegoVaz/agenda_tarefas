import { AgendaService } from './../../../agenda.service';
import { Tarefa } from 'src/app/models/agenda.model';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-editar',
  templateUrl: './dialog-editar.component.html',
  styleUrls: ['./dialog-editar.component.scss']
})
export class DialogEditarComponent implements OnInit {

  tarefa: Tarefa;
  tarefas: Observable<Tarefa[]>;

  constructor(private agendaService: AgendaService) { }

  ngOnInit() {
  }

  updateTarefa(tarefa: Tarefa): void {
    this.agendaService.updateTarefa(tarefa);
  }
}
