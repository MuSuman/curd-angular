import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Inject} from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  public save(): void {

    this.data.price = this.data.orgPrice * this.data.quantity;
    this.dialogRef.close(this.data);

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


}
