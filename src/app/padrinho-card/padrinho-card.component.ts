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
  // padrinhos: Padrinhos [] = new Array<Padrinhos>();
  padrinhos!: any[];  
  bixos!: any[];
  fotoUrl!: string;

  constructor(
    public formBuilder: FormBuilder,
    private padrinhosService: PadrinhosService,
    public dialog: MatDialog,
    // @Inject(MAT_DIALOG_DATA) public data: Escolha,
    

  ) { 
    this.padrinhoForm = this.formBuilder .group(
      {
       
      }      
    )
  }

  ngOnInit(): void {
    this.getAllPadrinhos();
    console.log(this.padrinhos)

  }

  onSubmit() {
    // this.padrinhosService.addEscolha(this.data).then(() => {
    //   // Data added successfully
    //   this.dialogRef.close();
    // }).catch(error => {
    //   // Handle error
    // });
  }

  getAllPadrinhos(){
    this.padrinhosService.getAllPadrinhos().subscribe(data => {
      this.padrinhos = data;
    });
  }
  
  getAllBixos(){
    this.padrinhosService.getAllBixos().subscribe(data => {
      this.bixos = data;
  });
}

  openDialog(index: number): void {
    this.dialog.open(ConfirmDialogComponent, {
      width: '35vw',
      // data:{
      //   code: this.data.code,
      //   padrinho: this.data.nome,
      //   telefone: this.data.telefone,
      //   bixo: this.data.nomeBixo,
      //   telefoneBixo: this.data.telefoneBixo,
      // },

    });
  }
  
}