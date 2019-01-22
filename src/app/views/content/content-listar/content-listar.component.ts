import { Component, OnInit } from '@angular/core';

import { DialogEditarComponent } from './../dialog-editar/dialog-editar.component';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Tarefa } from './../../../models/agenda.model';
import { AgendaService } from './../../../agenda.service';
import { Observable } from 'rxjs';

import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';

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
    const tarefaDados = new MatDialogConfig();
    tarefaDados.data = tarefa;

    this.dialog.open(DialogEditarComponent, tarefaDados);
  }

  deleteTarefa(tarefa: Tarefa): void {
    this.agendaService.deleteTarefa(tarefa);
  }

  finalzarTarefa(tarefa: Tarefa): void {
    tarefa.finalizado = !tarefa.finalizado;
    this.agendaService.updateTarefa(tarefa);
  }

  gerarPDF(): void {
    // debugger
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const dd = { content: 'Testeeee' };
    pdfMake.createPdf(dd).open();
    // pdfMake.createPdf(dd).download();
  }
}
