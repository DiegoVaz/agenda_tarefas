import { Tarefa } from './../../../models/agenda.model';
import { AgendaService } from './../../../agenda.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-editar',
  templateUrl: './dialog-editar.component.html',
  styleUrls: ['./dialog-editar.component.scss']
})
export class DialogEditarComponent implements OnInit {

  novaTarefa = this.tarefa.tarefa;

  constructor(@Inject(MAT_DIALOG_DATA) public tarefa: Tarefa, private agendaService: AgendaService) {
  }

  ngOnInit() {}

  updateTarefa(tarefa: Tarefa): void {
    tarefa.tarefa = this.novaTarefa;
    this.agendaService.updateTarefa(tarefa);
  }
}
