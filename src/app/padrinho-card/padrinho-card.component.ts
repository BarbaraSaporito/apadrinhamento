import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  escolhas!: any[];
  bixo: any;
  fotoUrl!: string;
  padrinhoSelecionado: any;
  nomeBixo = sessionStorage.getItem("username");
  telefoneBixo = sessionStorage.getItem("telefone");
  usuario: any = sessionStorage.getItem("usuario");
  firstName = this.getNome(this.nomeBixo!);

  constructor(
    private padrinhosService: PadrinhosService,
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router

  ) {

  }

  ngOnInit(): void {
    this.getAllPadrinhos().then(res => console.log());
  }

  onSubmit() {

  }

  getAllPadrinhos() {
    return new Promise(resolve => {
      this.padrinhosService.getAllPadrinhos().subscribe(data => {
        this.padrinhos = data;
        resolve(data);
      });
    })
  }

  getAllEscolhas(padrinhoId: string) {
    return new Promise(resolve => {
      this.padrinhosService.getAllEscolhas(padrinhoId).subscribe(data => {
        this.escolhas = data || [];
        resolve(data);
      });
    })
  }

  findPadrinho(index: string) {
    return this.padrinhos.find((padrinho:any) => padrinho.code  === index)
  }

  openDialog(index: string): void {

    const data = {
    index: index,
    padrinhos: this.findPadrinho(index),
  }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '80%',
      data
  });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.enviarEscolha(result);
      }
    });
  }

  enviarEscolha(index: string): void {
    const parsedIndex = parseInt(index);
    const selectedPadrinho = this.findPadrinho(index);
    this.padrinhoSelecionado = selectedPadrinho;

    const padrinhosId = selectedPadrinho.code + '-' + selectedPadrinho.nome;

    this.getAllEscolhas(padrinhosId).then(res => {
      const zBixos = this.escolhas || [];
      zBixos.push({nome: this.nomeBixo, telefone: this.telefoneBixo});

      this.padrinhosService.addEscolha(padrinhosId, zBixos);

      this.deletePadrinho(parsedIndex);

      const obj = JSON.parse(this.usuario)
      this.padrinhosService.deleteBixos(obj.key);

      sessionStorage.clear();
      this.router.navigate(['pronto']);

    })

  }

  deletePadrinho(index: number) {

    this.padrinhoSelecionado.limit--;

    if (this.padrinhoSelecionado.limit === 0) {
      this.padrinhosService.delete(index);
    }  else{
      this.padrinhosService.updatePadrinhos(index, this.padrinhoSelecionado);
    }
  }

  /*
  logout(): void {
    this.router.navigate(['']);
    sessionStorage.clear();
    window.location.reload();
  }
  */


  getNome(nome: string): string {
    const names = nome?.split(' ');
    return names[0] || "";
  }

}
