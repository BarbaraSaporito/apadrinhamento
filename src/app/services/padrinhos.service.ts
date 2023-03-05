import { Padrinhos, Bixos } from './../interfaces/padrinhos';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PadrinhosService {
  padrinhos!: Observable<any[]>;
  bixos!: Observable<any[]>;
  fotoUrl!: string;

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,

  ) { }

  addEscolha(padrinhoNome: string, escolha:any[]): void {
    const escolhasRef = this.db.list<any>('/escolhas');
    escolhasRef.set(padrinhoNome, escolha);
  }


  getAllPadrinhos(): Observable<Padrinhos[]>{
    return this.padrinhos = this.db.list<Padrinhos>('/padrinhos').valueChanges();
    ;
  }

  getAllBixos(): Observable<Bixos[]> {
    return this.bixos = this.db.list<Bixos>('/bixos').valueChanges();
    ;
  }

  delete(positionId: string):void{
     this.db.list<any>('/padrinhos').remove(positionId);
  }

}
