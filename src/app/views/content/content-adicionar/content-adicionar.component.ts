import { AgendaService } from './../../../agenda.service';
import { Component, OnInit } from '@angular/core';

import { Tarefa } from 'src/app/models/agenda.model';

@Component({
  selector: 'app-content-adicionar',
  templateUrl: './content-adicionar.component.html',
  styleUrls: ['./content-adicionar.component.scss']
})
export class ContentAdicionarComponent implements OnInit {

  tarefa: Tarefa = {tarefa: ''};

  constructor(private agendaService: AgendaService) { }

  ngOnInit() {
  }

  salvarTarefa(): void {
    this.agendaService.createTarefa(this.tarefa).then(() => {
      this.tarefa = {tarefa: ''};
    });
  }
}
