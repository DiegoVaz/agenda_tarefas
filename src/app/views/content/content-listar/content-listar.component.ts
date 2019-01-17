import { DialogEditarComponent } from './../dialog-editar/dialog-editar.component';
import { MatDialog } from '@angular/material';
import { Tarefa } from './../../../models/agenda.model';
import { AgendaService } from './../../../agenda.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-content-listar',
  templateUrl: './content-listar.component.html',
  styleUrls: ['./content-listar.component.scss']
})
export class ContentListarComponent implements OnInit {

  tarefa: Tarefa;
  tarefas: Observable<Tarefa[]>;

  constructor(
    private dialog: MatDialog,
    private agendaService: AgendaService
  ) { }

  ngOnInit(): void {
    this.tarefas = this.agendaService.tarefas.valueChanges();
  }

  showDialog(tarefa: Tarefa): void {
    this.dialog.open(DialogEditarComponent);
    console.log(tarefa.tarefa);
  }

  deleteTarefa(tarefa: Tarefa): void {
    this.agendaService.deleteTarefa(tarefa);
  }

  finalzarTarefa(tarefa: Tarefa): void {
    tarefa.finalizado = !tarefa.finalizado;
    this.agendaService.updateTarefa(tarefa);
  }
}
