import { Component, Input } from '@angular/core';


@Component({
  selector: 'bar',
  templateUrl: 'bar.html'
})
export class BarComponent {

  @Input('progress') progress;

  constructor() {
  }

  ngOnInit(){
  	if (this.progress > 100) {
  		this.progress = 100
  	}
  }

}
