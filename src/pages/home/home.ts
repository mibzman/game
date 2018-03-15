import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	Height: number;
	Width: number;

  constructor(
  	public navCtrl: NavController,
  	private Plat: Platform,
  	) {
  	Plat.ready().then((readySource) => {
  	      this.Width = Plat.width();
  	      this.Height = Plat.height() * .57 ;
  	    });
  }

}
