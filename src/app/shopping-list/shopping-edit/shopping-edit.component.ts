import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ShoppingListService} from "../../shared/shoppingListService";
import {NgForm} from "@angular/forms";
import {Ingredient} from "../../shared/ingredient.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('ingredientsForm') ingredientsForm!: NgForm;
  editingSubscription: Subscription = new Subscription();
  editMode: boolean = false;
  editedItemIndex: number = 0;
  editedItem: Ingredient = new Ingredient("", 0);

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit() {
    this.editingSubscription = this.shoppingListService.startedEditing.subscribe((id) => {
      this.editMode = true;
      this.editedItemIndex = id;
      this.editedItem = this.shoppingListService.getIngredient(id);
      this.ingredientsForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    });
  }

  ngOnDestroy() {
    this.editingSubscription.unsubscribe();
  }

  addIngredient(form: NgForm): void {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }

    this.resetForm();
  }

  resetForm() {
    this.ingredientsForm.reset();
    this.editMode = false;
  }

  removeIngredient() {
    this.shoppingListService.removeIngredient(this.editedItemIndex);
    this.resetForm();
  }
}
