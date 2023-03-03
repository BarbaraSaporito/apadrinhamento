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

  addEscolha(data:any) {
    return this.db.list('/escolhas').push(data);

  }

  getAllPadrinhos() {
    return this.padrinhos = this.db.list('/padrinhos').valueChanges();
    ;
  }

  getAllBixos() {
    return this.bixos = this.db.list('/bixos').valueChanges();
    ;
  }

  delete(positionId: string) {
    return this.db.list('/padrinhos').remove(positionId);
  }

}
