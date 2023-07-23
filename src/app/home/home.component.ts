import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public searchText: string = '';
  public selectedSearchType: string = 'Product';

  constructor(public myService:AppService, private router:Router) { }

  ngOnInit() {

    this.myService.getData().subscribe((result: any) => {
      this.myService.appData = result;
    })

  }

  public gotoCart():void {
    this.router.navigate(['cart']);
  }

  public updateQuantity(product: any, state: string): void{
    if(state === 'minus') {
      product.quantity--;

      if(product.quantity < 0) {
        product.quantity = 0;
      }

    } else {
      product.quantity++;
    }
  }


  public searchTypeChange(event: any): void {
    this.selectedSearchType = event.value;
  }

}
