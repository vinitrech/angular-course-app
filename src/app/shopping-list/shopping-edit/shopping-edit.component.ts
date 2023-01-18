import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../../shared/ShoppingListService";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @ViewChild('nameInput') name: ElementRef | undefined
  @ViewChild('amountInput') amount: ElementRef | undefined

  constructor(private shoppingListService: ShoppingListService){

  }

  addIngredient(): void {
    if (this.name !== undefined && this.amount !== undefined && this.name.nativeElement.value !== '' && this.amount.nativeElement.value !== '') {
      this.shoppingListService.addIngredient({name: this.name.nativeElement.value, amount: this.amount.nativeElement.value})
    }
  }
}
