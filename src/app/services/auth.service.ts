import { Bixos } from '../interfaces/padrinhos';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { PadrinhosService } from './padrinhos.service';

@Injectable({
  providedIn: 'root',

})
export class AuthService {
  constructor(
    private db: AngularFireDatabase,
    private padrinhosService: PadrinhosService,
    private subject: Subject<Bixos>

  ) { }

  ngOnInit(): void {
    
  }

  login(password: string): Observable<boolean> {
    return this.db.list('/bixos').snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() as Bixos })
        )
      ),
      tap(users => {
        const usuarioLogado = users.find(user => user.instagram === password); 
        if (usuarioLogado) {
          let user = users.find(user => user.instagram === password);
          sessionStorage.setItem("username", user!.nomeBixo );
          sessionStorage.setItem("telefone", user!.telefoneBixo );
        }
      }),
      map(users => users.some(user => user.instagram === password))
    );
  }

  autenticado(): Observable<boolean> {
    return this.login('password').pipe(
      map(result => {
        if (result) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

}

