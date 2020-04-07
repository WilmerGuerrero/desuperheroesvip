
import * as jspdf from 'jspdf';

import htmlToImage from 'html-to-image';
import { APIService } from './../../../Services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  proveedor:any=[];
  sumatoria:any;
  busqueda;
  categoria:FormGroup;
  constructor(private serv:APIService, private builder:FormBuilder) { }

  ngOnInit(): void {
    this.serv.getCliente().subscribe((e:any)=>{
     
      this.proveedor=e;

      
      
      console.log(e);
    })

    this.categoria=this.builder.group({
      categoria:['',[Validators.required]]
    })

   /* this.busqueda=this.builder.group({
      nombre:['']
    })*/
  }

  filtrarCategoria(){

    const categoria= String(this.categoria.controls.categoria.value);

    var filtrado= categoria;

    this.serv.getClientesCategoriaFiltro(filtrado).subscribe((e:any)=>{
      this.sumatoria=e;
      console.log(e);

    });
  }
  capturar(){
    htmlToImage.toPng(document.getElementById('imprimir'))
    .then(function (dataUrl){
      let pdf= new jspdf('p','cm','a4');
      pdf.addImage(dataUrl,'png',0,0,16.,15.0);
      pdf.save("impresion.pdf")
    })
  }
 /* conteo(){
    const categoria= String(this.categoria.controls.categoria.value);

    var filtrado= categoria;

    this.serv.getClientesCategoriaFiltro(filtrado).subscribe((e:any)=>{

      
      this.num=e;
   
    });
  }*/

}