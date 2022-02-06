import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGisfResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey      : string = 'GXsJw6cT6VVO3Avo1jsMzgV2Nl6QsnBS';
  private servicioUrl : string = 'https://api.giphy.com/v1/gifs/search';
  private _historial  : string[] = [];

  public resultados : Gif [] = []; 

  get historial(){
    return [...this._historial];
  }

  constructor (private http: HttpClient){
    
    this._historial = JSON.parse(localStorage.getItem('historial')!) || []; //version cortal
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || []; //version cortal
    /* 
    if(localStorage.getItem('historial')){
      this._historial = JSON.parse(localStorage.getItem('historial')!)
    }
    */
  }

  buscarGifs( query: string){
    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query); //inserta al inicio
      this._historial = this._historial.splice(0,9); //solo se mantenga los primeros 10

      localStorage.setItem('historial', JSON.stringify(this._historial))

    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit','10')
      .set('q',query);

    console.log(params);

    this.http.get<SearchGisfResponse>(this.servicioUrl,{params})
    .subscribe(( resp )=>{
      this.resultados = resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados))
    });
    
  }
}
