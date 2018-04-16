import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'food',
  templateUrl: 'food.html'
})
export class FoodComponent {

  Food: string[]
  Callback
  SentContext

  constructor(
  	public navParams: NavParams,
  	) {
  	this.Food = this.navParams.get("Food");
  	console.log(this.navParams)
  	this.Callback = this.navParams.get("Callback");
  	this.SentContext = this.navParams.get("Context");
  }

  ngOnInit() {
    // if (this.navParams.data) {
      
    // }
  }

  ChangeGroup(idx: number){
    this.Callback.call(this.SentContext, this.Food[idx])
  }

}
