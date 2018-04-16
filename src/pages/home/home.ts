import { Component } from "@angular/core";
import { NavController, Platform } from "ionic-angular";
import { PopoverController } from "ionic-angular";

import { AnimationState, AnimationController } from "./Animations";
import { Monster } from "../../models/monster";
import { FoodComponent } from "../../components/food/food";

class Zone {
  Height: number;
  Width: number;
  Src: string = "";

  constructor(h, w){
    this.Height = h
    this.Width = w
  }
}

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  MonsterZone: Zone = new Zone(0,0);
  ItemZone: Zone = new Zone(60,60);

  Food = [
    "assets/imgs/assets/apple/1.png",
  ]

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
      this.MonsterZone = new Zone(Plat.width(), Plat.height() * 0.57)
    });

    this.MonsterZone
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

  ShrinkAnimate(
    zone: Zone,
    asset: string,
    limit: number,
    idx: number = 0
  ) {
    if (limit == idx) {
        zone.Src = "";

      zone.Height = 60
      zone.Width = 60
      return;
    }
    zone.Src = asset;
    zone.Height -= (zone.Height / limit)
    zone.Width -= (zone.Width / limit)
    setTimeout(() => {
      this.ShrinkAnimate(zone, asset, limit, idx + 1);
    }, 1500 / limit);
  }

  Feed(Food: string) {
    if (this.Monster.Hungry.TryDo()) {
      this.AnimationController.Queue.Push(() => {
        this.Animate(this.MonsterZone, this.Monster.Hungry.Animation);
        this.ShrinkAnimate(this.ItemZone, this.Apple, 10);
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
    let popover = this.popoverCtrl.create(FoodComponent, {
      Food: this.Food,
      Callback: this.Feed,
      Context: this
    });

    popover.present({
      ev: ev
    });
  }
}
