import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

import { DialogEditarComponent } from './../dialog-editar/dialog-editar.component';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Tarefa } from './../../../models/agenda.model';
import { AgendaService } from './../../../agenda.service';
import { Observable } from 'rxjs';

import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';

const arrayTarefa = [
  { id: 1, tarefa: 'Aprender cajon', finalizado: false },
  { id: 1, tarefa: 'Aprender cajon', finalizado: false },
  { id: 1, tarefa: 'Aprender cajon', finalizado: false },
  { id: 1, tarefa: 'Aprender cajon', finalizado: false },
  { id: 1, tarefa: 'Aprender cajon', finalizado: false },
  { id: 1, tarefa: 'Aprender cajon', finalizado: false },
  { id: 1, tarefa: 'Aprender cajon', finalizado: false },
  { id: 1, tarefa: 'Aprender cajon', finalizado: false },
  { id: 1, tarefa: 'Aprender cajon', finalizado: false },
  { id: 1, tarefa: 'Aprender cajon', finalizado: false },
  { id: 1, tarefa: 'Aprender cajon', finalizado: false },
  { id: 1, tarefa: 'Aprender cajon', finalizado: false },
];

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
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    function buildTableBody(data, columns) {
      const body = [];
      body.push([{ text: 'Resumo', style: 'titulo', colSpan: 3 }, {}, {}]),
        body.push(columns);

      data.forEach(function (row) {
        const dataRow = [];

        columns.forEach(function (column) {
          dataRow.push(row[column]);
        });

        body.push(dataRow);
      });
      return body;
    }

    function table(data, columns) {
      return {
        style: 'tableExample',
        table: {
          headerRows: 2,
          widths: ['*', '*', '*'],
          body: buildTableBody(data, columns),
          layout: {
            hLineColor: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 'black' : '#666666';
            },
            vLineColor: function (i, node) {
              return (i === 0 || i === node.table.widths.length) ? '#333' : '#666666';
            },
          },
        }
      };
    }

    const dd = {
      pageOrientation: 'landscape',
      footer: function (page, pages) {
        return {
          columns: [
            { text: 'Way Data Solution S/A', bold: true },
            {
              alignment: 'right',
              text: [
                { text: page.toString(), italics: true },
                ' de ',
                { text: pages.toString(), italics: true }
              ]
            }
          ],
          margin: [10, 0, 10, 0]
        };
      },
      content: [
        {
          // tslint:disable-next-line:max-line-length
          image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGYAAABACAMAAADf9PJ7AAAC91BMVEVMaXGmvNaYw95cXKlgmNKF3Pq6ucLO5PBXcrqvsblzcbVRyfW/wcrc3eK3tLxdXaqn4/pbyvOEgr7Z1dSurcI6wvOW3vnLzM5weLqyr7VNTaJTx/ImuvKro87Fx8yh4Pp/frytr7JVyvVfXqvS1NWI2vh/fru0trk6xPXX4OTHycpvnNBFxPRPUKNqabCDfLpu0faC1/ihn86lp6q+vsAduvVWyfSLjKuh4vqko6V71PdzbrPCw8ZeX6uIg75GxfQsv/epq65z0PbCxMXOz9FiYay1t7pLTKFJxfR1dLdrz/YxvvKsrrG9vsBeX6pozfaBgr6/wcOrra9xcbRq0PZYVqaK2PewsrQ8vvNfyvUgtvFzdLa6vL9eYq2dm5zExcdSxPRVVaYsuvKrrbCztLaho6ZKS6BrZ64ftvA7PZkWtfE6v/Opq64oufK8vsFozvVeXquwsrVRw/NHSJ9hP5U8PpoWs/BUWKgpw/g8v/OrrbA0N5WytLYXtPGlp6qfoqVKTKG4urwLtfNXWKc5vPKrrbBBQpy4urszufGusLNMTqKipKgPtfI0NpUpt/FCRZ2mqKs8Ppk0N5UQquwmtvGsrrE5U6ifoaSnqaw4Opcbs/FOT6OusLMPr/A0N5WeoKQeIYmlp6osLI+qq640NpUTru8Ir+88IYYEqu8pdsSkpqkoKo4Hr/EwM5MRre+qrK8HrO8mKI4tMJIMqe4ErvCgoqUErO8KhtMGp+2lp6o4EXusr7IuMZIAru8Ar+8wM5MvMpIAqO4Aq+4Are8ArO8oK48Aou0AsO8Ape0lKI0Aqu6dn6MqLpEfIossL5GanKAQE4IcIIkAn+wAp+6ipKcjJoynqawZHYghJIwzNpU2G4IAwPwtM5QVGYUxJoqXmZ00IYYwLY8AsfMKDoAAxf6RlJcsNZYlRaIBuvcmEX4YYrcJn+MBtvQAy/8XccKUl5oA0v8sMpMPfMsWfckAuvkA2v8dBXYVCnsLlNwAq/CMj5IJLJUJSKgi24XDAAAAvHRSTlMAAgUHCQsMDw8SFRYWGhsdHSAhIiMlKSoqLCwvMDAzNDU4ODk5Pz9CRUVIS0xMTU1NT09QWFhYW1teX2BhYmNjZ2hpamtscXFycnN2eHp7e3yBgoKEhomLi4yNjY6Oj5KUlZeZnJ6fn5+hoqOkpaamqKmpqqqrrK2vsbKzs7S2uLq7vL6/wMDGx8jIysvMzs7S1dXV19fa297e4ODh4uPm5ufo6erq7O3w8fLy8/T09ff3+Pr7/Pz9/v7+/ouTvcAAAAspSURBVHja7Zh5WJTVGsAPI4sjiyIoThoJLiiXzGKsXNO8ot7QcqpLGmkGaaVYalaSIFaoBIGkJHBZRJRrbKI2NIPDDN9sfDPfLDALw76659a+3PvHPd853zffjHSr6/P4PPeP3kcf57znzPmd9z3vckbwp9yVLFy4bPmyZcuXr16+0IPVrXx90+ubNr2+a+f7O0ezukXHPoVSUFJy7Pj0u8BUGe0ae7tO0+4oGcGo7q8a0mmMRo3O3trKbslLG5IZNAaDQdaT430XmE80TTJZk6xJocthMc+2GBRNCkVTk8Jgf4hFn2ntkNErNY6X7sZp++0KGS1Nuk8YjE9uS4eMEeMy1mctCNLd3V4luBtMWjuLyWUwj7RAFRaFYzXWjUiD6IGB/s7Oq2l3FQI7OYwn1rw11CFzYjZi3dizdsgYuHzt5jeHP4CS8sa6p6J8eQA8wMqYO/b1YiemoeEmI4spGIkUwVUODtO6E5v4mKO/4fK3X13vunDhO0JJi15ffzIpCjyn/QKJ5CDPHfO0hJ1Aw40sRlMykrkFqHBi9mPluz90ftt1o2uw0UVUeoJ8YVoxiaik9mE3ik+hRYUmLI+i8fNOzIlR9Ngzt6eDw7QXIKXfP69+9f0VQqlqdBV5s0pbWKjCn7U73DAPk41yqG4mj3ih8WpjE4tBqTi91YQUjCdrxtLK+ZCiJBgj1Go1g4M7EfRHtF/teFfMbm0zmtc+icfL2mUMBu/4Fo5mVmmYTCvfvnZbradPN6gi6qsrquuVhBoOaXEaaPmbC2V8nR7Di5nQWGh3YibAYUANto5RmnR0fnp/Jr8CL16lH7yStTg8MHBc+BPvSNTNDAcDm7XZPhzmOS3DfplRzNKZ8JYYs7KHHnLSPh8qH/rydldX13eD17/7fIJzI4keU4qrkZ1yJTnNSfE4QiK09Ryrm6Ux4OMbaqbA4ccOxg7mHyOdn5v//c1PEhjM33/5NpcXR0hkhTJ7C9GIzdninJx9Dp9Bu5vVTNdoGMxZiHnE2N6EIDr4F0X0RuiznB87+3u7L1/75l+LOL+8YkU76Q+PP0Ii/xF1zhTdolUhzblHWc0Ekytm85AJD07UICMVxp3QZ0bjQC+sM50/HA/mMCkExhSDFVo5jumnmanAQivSkNnO3jK2RocTx3TmQRBc0oMGutyVNTpklnE/AC+2mBTd3Ze6DT9uxk3BN3zxa1n1+JLVp3wn1iJz5OQRZs8VJAoLlZYLvtElTIk2nJkFK4AGDRwvTdAhelN7LvD8GNaFry8N9F9t+IvXuKjF61KK6+oJvYoJtFOTwA4LvqZzs/ExPkLmya0nfThMQTtjjX0W70NcNQ3tk+87izG6E2CyrFVxSdbZ0Hv586SsOrWe0KvVdOYx1lRMAo9LCHR6EgfBNCvRjGJiLefiUblGBqObMtnU2oHq8j+gkVitOU63mku9Daabkq4LgySsN3IojWqYnwxmIuBlk434+CgI1lqQMQThUhdG7mcxZ8bOx1Wzo+UZSG9lMAEvtXT0Nly7cuPCFZWKRqigQYS6uIJxGrQGrJAo6Y3V2ufgjr4nSWSMZYeHCyatlcFULUrrQcbYzwTD3u9AasPxlbnGgc5vb3c1EkroKSVBKKuzkp6aEciki5rG8AqtONYOwkI5T4s+62G6cjJiJ4ORnc05a8LGvEWX/lZGW6L4uvPm7et0jWxWkhUpT0WN86V7SxKLGUd3Fy32k2Q2HQDYmI+8XDAem1iMTGOgPyk0LY/QfcjBFqGv+y9d6cJOkSQFOh2R4ooZU4duXQ5r2Hi9Uk6vtcwDrrLRiYH7ImNy/ejnjcPAFpzOmzcGVSgP3nT53ntWfDcI4/EyNoE86fOkRY7CrNC9bT/firbjivLQM7hyM9Whu7f/py4UVURtuEuvzyZdMGC8RI/WWJ/+iEBG4mjmZDW+BO6VUYVazIMyHYPp7/2qC9eVige4r820EHLWabQ5OyzNuM+pm3Fsj3fHLDOa3MxpeRe5f0qNXcFYw2LUlr87vxV4UNvM5g3OSRLfjlKNbITl+rcwCnvPIlxSS9iX1UDnlxdwbSTOzcPvF8+ow6ScTc9wpsJAc5yiZxoNJ/PbDa4YRwEfV4dP2xl1d8M1GAKYQ26ZMWncpCdS9ARbbdR1UXifJ7T4dtBCMhvcIbPsrhhTz2bmbZ4DuzXrNckNAtujsqqraxsJQtUst6rx3UhWME+mI6QLZt6dmOk6WJWdojtzP/vqdYbGpc7LF7qUzAb06ws+nfTW7GJco8ndbNu2qFmKtdDrTswUmc7l/dfzIZdPJjbGmxouXx9UsnvI6ZJTv853i1XF1EvGnJNWZkmzs9Fwch8KKXbHnkXOfNIZWG33QMNn7w1alfCBpqKfaUR9CryQh89ZlVAIy5tMZVgLWzN+adSOGY45wWE6Wk+MZPXL6UcCI4arz/NmvHa4orquvq66ImtduCd9ey+88wYtKa8wHhpTq8cYWHI44foahxl6kfu1yGGa8I15TpwxZ86cGePw4YfLtDo1ohCS8F/BwL7mTBpHKBeBVZw1jhzwB+SglrmZ3V7DJ0flOGtnR0sa9/NhwgkdFxjP/gHK4xY9bjRaLpqHtU/cAha54Avszig3Bf8+ZVot+47K9vqV6RH7ezQGjU6n0Wlajvu7NKICh0ZDz2hkQx8Puw5ume9ITyiBK07hR6Fc6R7NXF87VoKkoOCYm282fvI+Lbt27Xr/IfDfMUnFH6SkZJ0kCLmbMcNj4L6xo0fDP6NGjfIA/7u8Qir1MH3YzNRbZoN7ISuQGSxFbVkL7olE6V1+KlrJl8G9kXC9XoVF//PPhXPAPRLfrFN19VC+qC5OetQX3DPxgjVo8eI5EwO9fm+lQCRavz4uJsJV5ye4I+7CRMnJCdEert9awuNGQQEgev3c38TMlbadPy+lzFu5/8MKzXjVfc1fKaosnzJv435MLGkr49YLy+eCxPPbfhMTbSuNDAlbUH4x3gMeMkwAD7nX9ircwy8sjI+XhNjMkXy+UHprKf17OyyYPlxbJo/Hh2t5fBBQZpsLfELphyQ/TECnLZ/+tp87pi3fmz5Rny0oNLOsrCxjaqz5fGV6SHxpednReG+EKaPiI7xBsEAAQpLhksyp4DFpKkg8KgRg1dG4VNv50njh3ljgn1AKJ4VAkL81Lq+ydI2HO4Y+nuC0OXJDaVxwnDhPeKjtkCimLDkispISYqeVmm3STCEPBOX3pcds7zsdEmZLBfsoaN0GKjm2rG2vMP5WAjjQlxeTQIlnhlLSvJh46ILhmJDTZiHwDotOaMsHsVIRtFwQvaDItgQv8hal54vN5f5Lf9nnDbe+uCYUYvZQCwBYQyXyUtuiQZw4dqq5CF5eDJURKpYKgHeGeYE7JgD+M9VsDolIlRalS/OAqG09CBJVns7Ib0OYoMcioNsjDlBbE8z09URSeyOkECOmnUYl8jNpjG1VjHkbHT+20ojysgDgnU7dgYE35r/tlw3+lDQSBEjzgcgWCw5cjOPD8wqRz2610fZvMO9Zc3GfB23NqhBbKp7dRiXw08VhII6KDTUX+cHJvowQcXkw4LtbM1cqzUzPyL9Y5h9krly65BBVBkTmoq1i23bhVpt5Fb3Ef9/Fyj3JGRQ10yf/VkZiel+RfwSVCbaZi0Tb26hkfrr5wNLEvgSwry8/Ybu4MiSs77QA+OX1uWIiMjLKT1ceEgUB3tKj4sr4xMyQoHSqXJgortyzqnQNfobFHpVKbanQpKAEsdS2NQRE570KgrZTlXtiMuM8Zh4V74nJFwEfUWmbbe9UIDiUHgD4iaWR4E/5f5b/AGiKTWHeHV9lAAAAAElFTkSuQmCC',
          width: 80,
          height: 50
        },
        // { text: 'Way Data Solution S/A', style: 'header' },
        { text: 'Relatorio de rota por dia', style: 'header' },
        table(arrayTarefa, ['id', 'tarefa', 'finalizado']),
      ],
    styles: {
      table: {
        fillColor: 'red'
      },
      header: {
        fontSize: 16,
          bold: true,
            margin: [0, 0, 0, 0],
              alignment: 'center',
        },
      subheader: {
        fontSize: 12,
          bold: true,
            margin: [0, 10, 0, 5],
              alignment: 'center',
        },
      tableExample: {
        margin: [0, 5, 0, 15],
        },
      tableHeader: {
        bold: true,
          fontSize: 12,
            color: 'black',
              alignment: 'center'
      },
      titulo: {
        fontSize: 16,
          alignment: 'center',
            // #2e3192, 00aeef
            fillColor: '#157FCC',
              color: 'white',
                bold: true,
        },
    },
  };
  pdfMake.createPdf(dd).open();
  // pdfMake.createPdf(dd).download();
}
}
