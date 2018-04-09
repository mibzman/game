import { Component } from "@angular/core";
import { NavController, Platform } from "ionic-angular";

import { AnimationState, AnimationController } from "./Animations";

class Monster {
  constructor() {
    this.Idle = [
      "assets/imgs/characters/1/neutral.png",
      "assets/imgs/characters/1/idle1.png",
      "assets/imgs/characters/1/neutral.png",
      "assets/imgs/characters/1/idle2.png",
      "assets/imgs/characters/1/neutral.png"
    ];
    this.Happy = [
      "assets/imgs/characters/1/happy1.png",
      "assets/imgs/characters/1/happy2.png",
      "assets/imgs/characters/1/happy3.png",
      "assets/imgs/characters/1/happy2.png",
      "assets/imgs/characters/1/happy1.png"
    ];
    this.Eating = [
      "assets/imgs/characters/1/eating1.png",
      "assets/imgs/characters/1/eating2.png",
      "assets/imgs/characters/1/eating3.png",
      "assets/imgs/characters/1/eating2.png",
      "assets/imgs/characters/1/eating3.png",
      "assets/imgs/characters/1/eating2.png"
    ];

    this.Looking = [
      "assets/imgs/characters/1/neutral.png",
      "assets/imgs/characters/1/neutral.png",
      "assets/imgs/characters/1/neutral.png",
      "assets/imgs/characters/1/neutral.png"
    ];

    this.Scores = {
      Hungry: 50,
      Happy: 50,
      Clean: 50,
      Smart: 50
    };
  }

  Idle: string[];
  Happy: string[];
  Eating: string[];
  Looking: string[]

  Scores: {
    Hungry: number;
    Happy: number;
    Clean: number;
    Smart: number;
  };

  // LastDegrade: number = Date.now()

  TryDegradeScores() {
    // if (this.LastDegrade > new Date(Date.now() - 6000) ) {
    //   return
    // }

    this.Scores.Hungry -= 1;
    this.Scores.Clean -= 1;
    this.Scores.Smart -= 1;

    this.Scores.Happy =
      (this.Scores.Hungry + this.Scores.Clean + this.Scores.Smart) / 3;

      // this.LastDegrade = Date.now()
  }
}

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  MonsterZoneHeight: number;
  MonsterZoneWidth: number;
  MonsterZoneSrc: string;

  Monster: Monster = new Monster();

  AnimationController: AnimationController = new AnimationController();

  TickCounter: number = 0;

  constructor(public navCtrl: NavController, private Plat: Platform) {
    Plat.ready().then(readySource => {
      this.MonsterZoneWidth = Plat.width();
      this.MonsterZoneHeight = Plat.height() * 0.57;
    });
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
        this.Animate(this.Monster.Idle);
      } else {
        this.AnimationController.Queue.Pop().call(this);
      }
    }

    if (this.TickCounter >= 14 * 3){
      this.Monster.TryDegradeScores();
      this.TickCounter = 0  
    }
    
    this.TickCounter++
    setTimeout(() => {
      this.Tick();
    }, 75);
  }

  Animate(arr: string[], idx: number = 0) {
    if (arr.length == idx) {
      this.AnimationController.Done();
      return;
    }
    this.MonsterZoneSrc = arr[idx];
    setTimeout(() => {
      this.Animate(arr, idx + 1);
    }, 1000 / arr.length);
  }

  HappyMonster() {
    this.Animate(this.Monster.Happy);
  }

  Feed() {
    this.AnimationController.Queue.Push(() => {
      this.Animate(this.Monster.Eating);
      setTimeout(() => {
        this.Monster.Scores.Hungry += 40
      }, 1000);
    });
  }

  Read() {
    this.AnimationController.Queue.Push(() => {
      this.Animate(this.Monster.Happy);
      setTimeout(() => {
        this.Monster.Scores.Smart += 40
      }, 1000);
    });
  }

  Clean() {
    this.AnimationController.Queue.Push(() => {
      this.Animate(this.Monster.Happy);
      setTimeout(() => {
        this.Monster.Scores.Clean += 40
      }, 1000);
    });
  }
}
