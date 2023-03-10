import { Padrinhos, Bixos, Escolha } from './../interfaces/padrinhos';
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

  addEscolha(padrinhoNome: string, escolha: any): void {
    const escolhasRef = this.db.list<any>('/escolhas');
    escolhasRef.set(padrinhoNome, escolha);
  }

  getAllEscolhas(padrinhoId: string): Observable<Padrinhos[]>{
    return this.padrinhos = this.db.list<Padrinhos>('/escolhas/' + padrinhoId).valueChanges();
  }

  updatePadrinhos(index: any, padrinho: any): void {
    let str = index.toString();
    const escolhasRef = this.db.list<any>('/padrinhos');
    escolhasRef.update(str, padrinho).catch((err) => console.log(err));
  }

  getAllPadrinhos(): Observable<Padrinhos[]>{
    return this.padrinhos = this.db.list<Padrinhos>('/padrinhos').valueChanges();
    ;
  }

  delete(positionId: any):void{
    let str = positionId.toString();
    this.db.list<any>('/padrinhos').remove(str);
 }

 deleteBixos(idUsuario: string):void{
  this.db.list<any>('/bixos').remove(idUsuario);
}

  getAllBixos(): Observable<Bixos[]> {
    return this.bixos = this.db.list<Bixos>('/bixos').valueChanges();
    ;
  }



}
