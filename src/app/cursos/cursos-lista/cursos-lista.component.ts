import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { empty, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss']
})
export class CursosListaComponent implements OnInit {

  //cursos: Curso[];

  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  bsModalRef: BsModalRef;


  constructor(
    private service: CursosService,
    //private modalService: BsModalService
    private alertService: AlertModalService
  ) { }

  ngOnInit(): void {
    //esse dados, é o retorno da chamada da função subscribe
    //this.service.list().subscribe(dados => this.cursos = dados);

    this.onRefresh();

  }

  onRefresh() {
    this.cursos$ = this.service.list().pipe(
      catchError(
        error => {
          console.log(error);
          // this.error$.next(true);
          this.handleError();
          return empty();
        }
      )
    );

    /*

    this.service.list()
      .pipe(
        //map()
        //tap()
        //switchmap()
        catchError(error => empty())
      )
      .subscribe(
        dados => { console.log(dados) }
        // error => console.error(error),
        // () => console.log("Observable completo")
      );

      */
  }

  handleError() {
    this.alertService.showAlertDanger('Erro ao carregar cursos. Contrate o suporte');
  }
}
