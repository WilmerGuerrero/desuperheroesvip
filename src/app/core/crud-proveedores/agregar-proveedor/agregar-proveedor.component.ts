import { Router } from '@angular/router';
import { APIService } from './../../../Services/api.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agregar-proveedor',
  templateUrl: './agregar-proveedor.component.html',
  styleUrls: ['./agregar-proveedor.component.css']
})
export class AgregarProveedorComponent implements OnInit {

  add:FormGroup;
  array:any;
  constructor(private serv:APIService,private builder:FormBuilder, private router:Router) { }

  ngOnInit(): void {
    this.add=this.builder.group({
      nombre:['',[Validators.required,Validators.minLength(3),Validators.maxLength(60)]],
      RNC:['',[Validators.required,Validators.minLength(11),Validators.maxLength(11)]],
      telefono:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      email:['',[Validators.required,Validators.email]]
    
    })



  }
  agregarProveedor(){
    
    const nombre=this.add.value.nombre;
    const RNC=String(this.add.value.RNC);
    const telefono= String(this.add.value.telefono);
    const email=this.add.value.email;
    
    let agregar=  {

      nombre:nombre,
      rnc:RNC,
      telefono:telefono,
      email:email,
    }
    console.log(agregar);
    
    this.serv.addProveedor(agregar).subscribe(()=>{
      console.log("agregar exitoso");
      this.ngOnInit();
      this.router.navigate(['home']);
      //this.reloadCurrentRoute();
    })
    
  }

}
