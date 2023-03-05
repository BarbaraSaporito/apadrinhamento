import { Bixos } from '../interfaces/padrinhos';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PadrinhosService } from './padrinhos.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private db: AngularFireDatabase,
    private padrinhosService: PadrinhosService,

  ) { }

  ngOnInit(): void {

  }


  login(password: string): Observable<boolean> {
    return this.db.list('bixos').snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() as Bixos })
        )
      ),
      map(users =>
        users.some(user => user.instagram === password)
      )
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

