import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit {

  cartProducts: Product[] = [];
  totatlPrice : number = 0;

  constructor(private cartService : CartService){}
  
  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(data => {
      this.cartProducts = data;
      this.totatlPrice = this.getTotalPrice();
    })
  }


  getTotalPrice(): number {
    let total =0;
    this.cartProducts.forEach(product =>{
      total += product.price;
    })

    return total;
  }

  clearCart() : void{
    this.cartService.clearCart().subscribe();
  }

  checkout() : void{
    this.cartService.checkout(this.cartProducts).subscribe();
  }
}
