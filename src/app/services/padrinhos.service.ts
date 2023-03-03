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
    private angularFirestore: AngularFireDatabase,
    private storage: AngularFireStorage,

  ) { }

  addEscolha(data:any) {
    return this.angularFirestore.list('/escolhas').push(data);

  }

  getAllPadrinhos() {
    return this.padrinhos = this.angularFirestore.list('/padrinhos').valueChanges();
    ;
  }

  getAllBixos() {
    return this.bixos = this.angularFirestore.list('/bixos').valueChanges();
    ;
  }

  delete(positionId: string) {
    return this.angularFirestore.list('/padrinhos').remove(positionId);
  }

}
