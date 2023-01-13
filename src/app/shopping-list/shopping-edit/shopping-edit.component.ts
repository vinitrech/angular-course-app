import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @ViewChild('nameInput') name: ElementRef | undefined
  @ViewChild('amountInput') amount: ElementRef | undefined
  @Output('addNewIngredient') sendIngredient: EventEmitter<Ingredient> = new EventEmitter<Ingredient>();

  addItems(): void {
    if (this.name !== undefined && this.amount !== undefined) {
      this.sendIngredient.emit(new Ingredient(this.name.nativeElement.value, this.amount.nativeElement.value));
      console.log(this.name.nativeElement)
    }
  }
}
