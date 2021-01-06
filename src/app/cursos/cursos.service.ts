import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Curso } from './curso';
import { delay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class CursosService {
  constructor(private httpClient: HttpClient) { }

  private readonly API = `${environment.API}/cursos`

  list() {

    return this.httpClient.get<Curso[]>(this.API).pipe(delay(2000));
  }

}