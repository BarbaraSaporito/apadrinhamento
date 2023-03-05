import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './../confirm-dialog/confirm-dialog.component';
import { PadrinhosService } from './../services/padrinhos.service';




@Component({
  selector: 'app-padrinho-card',
  templateUrl: './padrinho-card.component.html',
  styleUrls: ['./padrinho-card.component.css']
})
export class PadrinhoCardComponent implements OnInit {
  public padrinhoForm: FormGroup;
  padrinhos!: any[];
  bixos!: any[];
  fotoUrl!: string;

  constructor(
    public formBuilder: FormBuilder,
    private padrinhosService: PadrinhosService,
    public dialog: MatDialog,

  ) {
    this.padrinhoForm = this.formBuilder.group(
      {

      }
    )
  }

  ngOnInit(): void {
    this.getAllPadrinhos();
  }

  onSubmit() {

  }

  getAllPadrinhos() {
    this.padrinhosService.getAllPadrinhos().subscribe(data => {
      this.padrinhos = data;
    });
  }

  openDialog(index: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '35vw',
      data: {
        index: index,
        padrinhos: this.padrinhos
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        console.log('The dialog was closed');
        console.log('Selected index: ', result);
        this.enviarEscolha(result);
      }
    });
  }

  enviarEscolha(index: number): void {
    const selectedPadrinho = this.padrinhos[index];
    const padrinhosId = selectedPadrinho.code + '-' + selectedPadrinho.nome;
    this.padrinhosService.addEscolha(padrinhosId, selectedPadrinho);

  }

  deletePadrinho(index: number) {
    this.padrinhos[index].limit -= 1;
    if (this.padrinhos[index].limit == 0) {
      const positionId = this.padrinhos[index];
      this.padrinhosService.delete(positionId);
    }
  }

}
