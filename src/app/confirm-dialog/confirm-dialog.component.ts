import { Escolha } from './../interfaces/padrinhos';
import { PadrinhosService } from './../services/padrinhos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  escolha: Escolha = {} as Escolha;

  constructor(private padrinhosService: PadrinhosService) { }

  ngOnInit(): void {
  }
  
  addEscolha() {
    
  }

  deletePadrinho() {
    const positionId = 'some-id-to-delete';
    this.padrinhosService.delete(positionId)
      .then(() => console.log('Position deleted successfully'))
      .catch((error) => console.error('Error deleting position:', error));
  }

}
