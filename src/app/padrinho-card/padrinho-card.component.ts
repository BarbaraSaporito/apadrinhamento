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
    this.getAllPadrinhos();
    this.getAllEscolhas()
  }

  onSubmit() {

  }

  getAllPadrinhos() {
    this.padrinhosService.getAllPadrinhos().subscribe(data => {
      this.padrinhos = data;
    });
  }

  getAllEscolhas() {
    this.padrinhosService.getAllEscolhas().subscribe(data => {
      this.escolhas = data;
    });
  }

  openDialog(index: number): void {
    const data = {
    index: index,
    padrinhos: this.padrinhos,
    limit: this.padrinhos[index].limit
  }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '35vw',
      data
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
    let selectedPadrinho = this.padrinhos[index];
    let zBixos = this.escolhas;
    
    const padrinhosId = selectedPadrinho.code + '-' + selectedPadrinho.nome;
    zBixos.push({nome: this.nomeBixo, telefone: this.telefoneBixo});
    
    this.padrinhosService.addEscolha(padrinhosId, zBixos);
    
    this.deletePadrinho(index)

    const obj = JSON.parse(this.usuario)
    this.padrinhosService.deleteBixos(obj.key);

    sessionStorage.clear();    
    this.router.navigate(['']);
    
    zBixos = [];
  }

  deletePadrinho(index: number) {
    this.padrinhos[index].limit -= 1;
    console.log(this.padrinhos[index]);
    if (this.padrinhos[index].limit == 0) {
      const positionId = this.padrinhos[index];
      this.padrinhosService.delete(index);
    }  else{
      this.padrinhosService.updatePadrinhos(index, this.padrinhos[index]);
    }
  }

  logout(): void {
    this.router.navigate(['']);
    sessionStorage.clear();
    window.location.reload();     
  }
 

  getNome(nome: string): string {
    const names = nome?.split(' ');
    return names[0] || "";
  }

}
