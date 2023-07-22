import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ColDef } from 'ag-grid-community';
import { AppService } from '../services/app.service';
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from '../popups/edit/edit.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})



export class CartComponent implements OnInit {

  displaytable = false;

  displayedColumns = ['name','price','quantity','edit','delete'];
  public elements: any[] = [];
  dataSource = new MatTableDataSource(this.elements);

  constructor(private myService: AppService, public dialog: MatDialog, private route: Router) { }

  ngOnInit() {
    let products: any[] = [];

    this.myService.appData.forEach((o) =>{
    
        o.subCategories.forEach((n: any) => {
    
            n.products.forEach((m: any) => {
                if(m.quantity){
                    products.push(m)
                }
            })
            
        })
        
    });

    products.forEach((o) => {
      let obj: any = {name: o.itemName, price: o.price * o.quantity, quantity:o.quantity, edit:'', delete: '', orgPrice: o.price, image: o.image};
      this.elements.push(obj);
    })
    this.dataSource = new MatTableDataSource(this.elements);
  }

  public edit(element:any):void {

    const dialogRef = this.dialog.open(EditComponent, {
      width: '400px',
      data: {...element}
    });

    dialogRef.afterClosed().subscribe(result => {
     
      let ind = this.elements.findIndex((o: any) => { return o.name === element.name; });
      if(ind !== -1) {
      
        this.elements[ind].quantity = result.quantity;
        this.elements[ind].price = result.orgPrice * result.quantity;

      }
      
    });

  }

  public deleteItem(element: any): void {
   let ind = this.elements.findIndex((o: any) => { return o.name === element.name; });
   if(ind !== -1) {
    this.elements.splice(ind, 1);
    this.dataSource = new MatTableDataSource(this.elements);
   }
  }

  public navigateHome(): void {
    this.route.navigate([''])
  }

}
