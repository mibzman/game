import { NgModule } from "@angular/core";
import { IonicModule } from "ionic-angular";
import { BarComponent } from "./bar/bar";
import { FoodComponent } from "./food/food";
@NgModule({
	declarations: [BarComponent, FoodComponent],
	imports: [IonicModule],
	exports: [BarComponent, FoodComponent]
})
export class ComponentsModule {}
