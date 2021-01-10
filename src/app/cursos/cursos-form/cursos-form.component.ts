import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { empty } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { CursosService } from '../cursos.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {

  form: FormGroup;
  submitted = false;



  constructor(
    private fb: FormBuilder,
    private cursosServe: CursosService,
    private alertModal: AlertModalService,
    private location: Location
  ) { }

  ngOnInit(): void {

    this.form = this.fb.group(
      {
        nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(70)]]
      }
    );



  }

  hasError(field: string) {
    return this.form.get(field).errors;

  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value)
      this.cursosServe.create(this.form.value).subscribe(
        success => {
          this.alertModal.showAlertSuccess('Curso criado com sucesso!');
          this.location.back();
        },
        error => this.alertModal.showAlertDanger('Erro ao criar curso. Tente novamente.'),
        () => console.log('request completado')
      );
      this.submitted = true;
      //console.log('onSubmit');
    }
  }

  onCancel() {

    this.submitted = false;
    //console.log('onCancel');
    this.form.reset();

  }

}
