import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { Food } from "../../models/models";

@Component({
  selector: 'food',
  templateUrl: 'food.html'
})
export class FoodComponent {

  Foods: Array<Food>
  Callback
  SentContext

  constructor(
  	public navParams: NavParams,
    public viewCtrl: ViewController,
  	) {
    // debugger;
  	this.Foods = this.navParams.get("Foods");
  	console.log(this.navParams)
  	this.Callback = this.navParams.get("Callback");
  	this.SentContext = this.navParams.get("Context");
  }

  ngOnInit() {
    // if (this.navParams.data) {
      
    // }

      // debugger;
      // this.Food = this.navParams.get("Food");
      // console.log(this.navParams)
      // this.Callback = this.navParams.get("Callback");
      // this.SentContext = this.navParams.get("Context");
  }

  Return(idx) {
    this.Callback.call(this.SentContext, this.Foods[idx])
    this.viewCtrl.dismiss();
  }

}
