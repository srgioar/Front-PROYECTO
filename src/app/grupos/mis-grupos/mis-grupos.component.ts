import { Component, OnInit } from '@angular/core';
import { FetchService } from 'src/app/fetch.service';

@Component({
  selector: 'app-mis-grupos',
  templateUrl: './mis-grupos.component.html',
  styleUrls: ['./mis-grupos.component.css']
})
export class MisGruposComponent implements OnInit {

  listaGrupos:any;
  arrayGrupos:Array<any> = new Array();
  grupos:any;

  constructor(private fetchService:FetchService) { }

  ngOnInit(): void {

    this.fetchService.obtenerDatos("grupos").subscribe(
      result => {
        this.grupos = result;
        this.listaGrupos = Object.keys(this.grupos).map(key => ({type: key, value: this.grupos[key]}));
        this.arrayGrupos = this.arrayGrupos[1].value;
        console.log(this.grupos);
        return this.arrayGrupos;
      },
      error => {
        console.log("Problemas...");
      }
    )

  }

}
