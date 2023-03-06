import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { Bixos } from '../interfaces/padrinhos';
import { AuthService } from '../services/auth.service';
import { ConfirmDialogComponent } from './../confirm-dialog/confirm-dialog.component';
import { PadrinhosService } from './../services/padrinhos.service';

@Component({
  selector: 'app-padrinho-card',
  templateUrl: './padrinho-card.component.html',
  styleUrls: ['./padrinho-card.component.css']
})
export class PadrinhoCardComponent implements OnInit {
  padrinhos!: any[];
  bixo: any;
  fotoUrl!: string;
  nomeBixo = sessionStorage.getItem("username");
  telefoneBixo = sessionStorage.getItem("telefone");
  firstName = this.getNome(this.nomeBixo!);
  router: any;

  constructor(
    private padrinhosService: PadrinhosService,
    public dialog: MatDialog,
    private authService: AuthService,

  ) {

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
        padrinhos: this.padrinhos,
        bixoLogado: this.bixo
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
    selectedPadrinho.zBixos = [{nome: this.nomeBixo, telefone: this.telefoneBixo }] ;

    this.padrinhosService.addEscolha(padrinhosId, selectedPadrinho);

    sessionStorage.clear();    
    window.location.reload(); 
    this.router.navigate(['login']);       

  }

  deletePadrinho(index: number) {
    this.padrinhos[index].limit -= 1;
    if (this.padrinhos[index].limit == 0) {
      const positionId = this.padrinhos[index];
      this.padrinhosService.delete(positionId);
    }    
  }

  logout(): void {
    this.router.navigate(['']);
    sessionStorage.clear();
    window.location.reload();     
  }
 

  getNome(nome: string): string {
    const names = nome.split(' ');
    return names[0];
  }

}
