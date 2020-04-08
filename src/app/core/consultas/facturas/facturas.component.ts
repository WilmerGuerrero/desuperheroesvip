
import { Builder } from 'protractor';
import { Router } from '@angular/router';
import { APIService } from './../../../Services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import htmlToImage from 'html-to-image';
import * as jspdf from 'jspdf';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {
  productos:any;
  sumatoria:any;
  filtro:FormGroup;
  entrada:FormGroup;
  cargando: boolean= false;
  valor:any;
  search:FormGroup
  busqueda;
  constructor(private serv:APIService, private router:Router, private builder:FormBuilder) { }

  ngOnInit(): void {
    this.serv.getFactura().subscribe((e:any)=>{
     
      this.productos=e;
      
      console.log(e);
    })

    this.filtro=this.builder.group({
      filtro:['']
    })
    this.entrada=this.builder.group({
      proveedor:[''],
      producto:['']
    })

    this.search=this.builder.group({
      search:['']
    })
  }

  capturar(){
    this.cargando=true;
    htmlToImage.toPng(document.getElementById('factura'))
    .then(function (dataUrl){
      let pdf= new jspdf('p','cm','a4');
      pdf.addImage(dataUrl,'png',0,0,18.0,18.0);
      pdf.save("factura.pdf")
    }).finally(()=>{
      this.cargando = false;
    })
  }

  decision(){
    const filtro=this.filtro.controls.filtro.value;


    var filtrado=filtro;
    let busqueda= this.search.get("search").value;
    let nombres;
    let proveedores;
    let fechas;

    for(let i = 0; i<this.productos.length; i++)
    {
      if(busqueda == this.productos[i].cliente.nombre)
      {
        nombres = this.productos[i].cliente.nombre;
      }else if(busqueda == this.productos[i].fecha)
      {
        fechas = this.productos[i].fecha;
      }
    }
     if(nombres==busqueda){

      if(filtrado=="suma"){
        this.sumaCliente(filtrado);
      }else if(filtrado=="conteo"){
        
        this.conteoCliente(filtrado);
      }else if(filtrado=="promedio"){
        this.promedioCliente(filtrado);

      }else if(filtrado=="maximo"){
        
        this.maximoCliente(filtrado);
      }else if(filtrado=="minimo"){
        this.minimoCliente(filtrado);
      }
    }else if(fechas==busqueda){
      if(filtrado=="suma"){
        this.sumaFecha(filtrado);
      }else if(filtrado=="conteo"){
        
        this.conteoFecha(filtrado);
      }else if(filtrado=="promedio"){
        this.promedioFecha(filtrado);
      }

      if(filtrado=="maximo"){
        this.maximoFecha(filtrado);
      }else if(filtrado=="minimo"){
        
        this.minimoFecha(filtrado);
      }
    }
  }

              sumaCliente(filtro:string){
                this.serv.getFacturaClienteFiltro(this.search.get('search').value,filtro).subscribe((e:any)=>{
                this.sumatoria=e;
                console.log(e);
                });

            }

            sumaFecha(filtro:string){
              this.serv.getFacturaFechaFiltro(this.search.get('search').value,filtro).subscribe((e:any)=>{
              this.sumatoria=e;
              console.log(e);
              });
            }
        



            promedioCliente(filtrado){
            this.serv.getFacturaClienteFiltro(this.search.get('search').value,filtrado).subscribe((e:any)=>{
            this.sumatoria=e;
            console.log(e);
            });
            }
            promedioFecha(filtrado){
            this.serv.getFacturaFechaFiltro(this.search.get('search').value,filtrado).subscribe((e:any)=>{
            this.sumatoria=e;
            console.log(e);
            });
            }
           

            conteoCliente(filtro:string){
            this.serv.getFacturaClienteFiltro(this.search.get('search').value,filtro).subscribe((e:any)=>{
            this.sumatoria=e;
            console.log(e);
            });
            }
            conteoFecha(filtro:string){
            this.serv.getFacturaFechaFiltro(this.search.get('search').value,filtro).subscribe((e:any)=>{
            this.sumatoria=e;
            console.log(e);
            });
            }
          
            minimoCliente(filtro:string){
              this.serv.getFacturaClienteFiltro(this.search.get('search').value,filtro).subscribe((e:any)=>{
              this.sumatoria=e;
              console.log(e);
              });
              }
              minimoFecha(filtro:string){
              this.serv.getFacturaFechaFiltro(this.search.get('search').value,filtro).subscribe((e:any)=>{
              this.sumatoria=e;
              console.log(e);
              });
              }
          
              maximoCliente(filtro:string){
                this.serv.getFacturaClienteFiltro(this.search.get('search').value,filtro).subscribe((e:any)=>{
                this.sumatoria=e;
                console.log(e);
                });
                }
                maximoFecha(filtro:string){
                this.serv.getFacturaFechaFiltro(this.search.get('search').value,filtro).subscribe((e:any)=>{
                this.sumatoria=e;
                console.log(e);
                });
                }
              



}
