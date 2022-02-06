import { Component } from '@angular/core';
import { GifsService } from '../service/gifs.service';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styles: [
  ]
})
export class ResultadoComponent {

  get resultados(){
    return this.gifsService.resultados;
  }

  constructor( private gifsService: GifsService) { }



}
