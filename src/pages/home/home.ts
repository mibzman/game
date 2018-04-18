import { Component } from "@angular/core";
import { NavController, Platform } from "ionic-angular";
import { PopoverController } from "ionic-angular";

import { AnimationState, AnimationController } from "./Animations";
import { Monster, Food } from "../../models/models";
import { FoodComponent } from "../../components/food/food";

class Zone {
  Height: number;
  Width: number;
  Src: string = "";

  constructor(h, w) {
    this.Height = h;
    this.Width = w;
  }
}

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  MonsterZone: Zone = new Zone(0, 0);
  ItemZone: Zone = new Zone(60, 60);

  Foods: Array<Food>;

  Book = ["assets/imgs/assets/book/1.gif"];

  Monster: Monster = new Monster();

  AnimationController: AnimationController = new AnimationController();

  TickCounter: number = 0;

  constructor(
    public navCtrl: NavController,
    private Plat: Platform,
    private popoverCtrl: PopoverController
  ) {
    Plat.ready().then(readySource => {
      this.MonsterZone = new Zone(Plat.width(), Plat.height() * 0.57);
    });

    this.Foods = [
      new Food("assets/imgs/assets/kale.png", [
        "Iron helps support healthy red blood cells.",
        "Iron helps transport oxygen throughout the body.",
        "Did you know: Super Salad Bar packs have 10% of your daily Iron?"
      ]),
      new Food("assets/imgs/assets/potato.jpg", [
        "Vitamin A helps support your eyes and your vision!",
        "Vitamin A also helps to develop strong bones, including the teeth.",
        "Did you know: Super Salad Bar packs have 60% of your daily Vitamin A?"
      ]),
      new Food("assets/imgs/assets/orange.png", [
        "Vitamin C can help prevent you from getting the common cold.",
        "Vitamin C can help your body absorb Iron.",
        "Vitamin C can help your bones become denser and stronger.",
        "Did you know: Super Salad Bar packs have 25% of your daily Vitamin C?"
      ]),
      new Food("assets/imgs/assets/Broccoli.png", [
        "Vitamin K may be helpful in bone health and recovering from injuries faster.",
        "Vitamin K typically comes from leafy greens, such as kale and spinach.",
        "Did you know: Super Salad Bar packs have 100% of your daily Vitamin K?"
      ]),
      new Food("assets/imgs/assets/nut.jpg", [
        "Copper, along with Iron, can help form healthy red blood cells.",
        "Did you know: Super Salad Bar packs have 35% of your daily Copper?"
      ]),
    ];

    this.MonsterZone;
    this.StartAnimating();
  }

  StartAnimating() {
    if (this.AnimationController.Start()) {
      this.Tick();
    }
  }

  Tick() {
    if (this.AnimationController.State == AnimationState.Ready) {
      this.AnimationController.State = AnimationState.Animating;

      if (this.AnimationController.Queue.Length() == 0) {
        if (this.Monster.Happiness < 10) {
          this.AnimationController.Queue.Push(() => {
            this.Animate(this.MonsterZone, this.Monster.Sick);
          });
        } else {
          this.AnimationController.Queue.Push(() => {
            this.Animate(this.MonsterZone, this.Monster.Idle);
          });
        }
      }

      this.AnimationController.Queue.Pop().call(this);
    }

    if (this.TickCounter >= 14 * 2) {
      this.Monster.DegradeScores();
      this.TickCounter = 0;
    }

    this.TickCounter++;
    setTimeout(() => {
      this.Tick();
    }, 75);
  }

  Animate(
    zone: Zone,
    arr: string[],
    emptyEnd: boolean = false,
    idx: number = 0
  ) {
    if (arr.length == idx) {
      if (emptyEnd) {
        zone.Src = "";
      }
      this.AnimationController.Done();
      return;
    }
    zone.Src = arr[idx];
    setTimeout(() => {
      this.Animate(zone, arr, emptyEnd, idx + 1);
    }, 1500 / arr.length);
  }

  ShrinkAnimate(zone: Zone, asset: string, limit: number, idx: number = 0) {
    if (limit == idx) {
      zone.Src = "";

      zone.Height = 60;
      zone.Width = 60;
      return;
    }
    zone.Src = asset;
    zone.Height -= zone.Height / limit;
    zone.Width -= zone.Width / limit;
    setTimeout(() => {
      this.ShrinkAnimate(zone, asset, limit, idx + 1);
    }, 1500 / limit);
  }

  Feed(Food: Food) {
    if (this.Monster.Hungry.TryDo()) {
      this.AnimationController.Queue.Push(() => {
        this.Animate(this.MonsterZone, this.Monster.Hungry.Animation);
        this.ShrinkAnimate(this.ItemZone, Food.Asset, 10);
      });
    } else {
      this.AnimationController.Queue.Push(() => {
        this.Animate(this.MonsterZone, this.Monster.Bad);
      });
    }
  }

  Read() {
    if (this.Monster.Smart.TryDo()) {
      this.AnimationController.Queue.Push(() => {
        this.Animate(this.MonsterZone, this.Monster.Smart.Animation);
        this.Animate(this.ItemZone, this.Book, true);
      });
    } else {
      this.AnimationController.Queue.Push(() => {
        this.Animate(this.MonsterZone, this.Monster.Bad);
      });
    }
  }

  Jump() {
    if (this.Monster.Active.TryDo()) {
      this.AnimationController.Queue.Push(() => {
        this.Animate(this.MonsterZone, this.Monster.Active.Animation);
      });
    } else {
      this.AnimationController.Queue.Push(() => {
        this.Animate(this.MonsterZone, this.Monster.Bad);
      });
    }
  }

  PresentPopover(ev: UIEvent) {
    // debugger;
    let popover = this.popoverCtrl.create(FoodComponent, {
      Foods: this.Foods,
      Callback: this.Feed,
      Context: this
    }, { cssClass: 'custom-popover'});

    popover.present({
      ev: ev
    });
  }
}
