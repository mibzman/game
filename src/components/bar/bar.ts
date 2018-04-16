import { Component, Input } from "@angular/core";

@Component({
	selector: "bar",
	templateUrl: "bar.html"
})
export class BarComponent {
	@Input("progress") progress;

	color = "#488aff";

	constructor() {}

	ngOnChanges() {
		if (this.progress > 100) {
			this.progress = 100;
		}

		if (this.progress > 50) {
			this.color = "#488aff";
		}

		if (this.progress > 75) {
			this.color = "#32db64";
		}

		if (this.progress < 0) {
			this.progress = 0;
		}

		if (this.progress < 20) {
			this.color = "#fec907";
		}

		if (this.progress < 10) {
			this.color = "#f53d3d";
		}
	}
}
