import { Component } from "@angular/core";
import { NavController, Platform } from "ionic-angular";

import { AnimationState, AnimationController } from "./Animations";
import { Monster } from "../../models/monster";

class Zone {
    Height: number;
    Width: number;
    Src: string;
  }

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {

  MonsterZone: Zone = new Zone();
  ItemZone: Zone = new Zone();

  Apple = [
    "assets/imgs/assets/apple/1.png",
    "assets/imgs/assets/apple/2.png",
    "assets/imgs/assets/apple/3.png",
    "assets/imgs/assets/apple/4.png",
    "assets/imgs/assets/apple/5.png",
    "assets/imgs/assets/apple/6.png",
    "assets/imgs/assets/apple/7.png",
    "assets/imgs/assets/apple/8.png",
  ];

  Book = [
    "assets/imgs/assets/book/1.gif",
  ];

  Monster: Monster = new Monster();

  AnimationController: AnimationController = new AnimationController();

  TickCounter: number = 0;

  constructor(public navCtrl: NavController, private Plat: Platform) {
    Plat.ready().then(readySource => {
      this.MonsterZone.Width = Plat.width();
      this.MonsterZone.Height = Plat.height() * 0.57;
    });

    this.ItemZone.Src = "";
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
        this.Animate(this.MonsterZone, this.Monster.Idle);
      } else {
        this.AnimationController.Queue.Pop().call(this);
      }
    }

    if (this.TickCounter >= 14 * 3){
      this.Monster.DegradeScores();
        this.TickCounter = 0  
    }
    
    this.TickCounter++
    setTimeout(() => {
      this.Tick();
    }, 75);
  }

  Animate(zone:Zone, arr: string[], emptyEnd: boolean = false, idx: number = 0) {
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

  Feed() {
    if (this.Monster.Hungry.TryDo()) {
      this.AnimationController.Queue.Push(() => {
        this.Animate(this.MonsterZone, this.Monster.Hungry.Animation);
        this.Animate(this.ItemZone, this.Apple, true);
      });
    } 
    else {
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
    }
    else {
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
    }
    else {
      this.AnimationController.Queue.Push(() => {
        this.Animate(this.MonsterZone, this.Monster.Bad);
      });
    }
  }
}
