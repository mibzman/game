export class Action {
  constructor(anim: string[]) {
    this.Animation = anim;
  }

  Animation: string[];
  Score: number = 40;
  RecentCount: number = 0;
  BoredTimeout: number;

  TryDo(): boolean {
    if (this.BoredTimeout > Date.now()) {
      return false;
    }

    if (this.RecentCount >= 3) {
      this.RecentCount = 0;
      this.BoredTimeout = new Date(Date.now() + 1 * 60000).getTime();
      return false;
    }

    this.RecentCount++;

    if (this.Score < 100) {
      setTimeout(() => {
        this.Score += 20;
      }, 2000);
    }
    return true;
  }

  DegradeScore(){
    if (this.Score < 1){
      return
    }

    this.Score -= 1
    return this.Score
  }
}

export class Monster {
  constructor() {
    this.Idle = [
      "assets/imgs/characters/2/Idle/1.png",
      "assets/imgs/characters/2/Idle/2.png",
      "assets/imgs/characters/2/Idle/3.png",
      "assets/imgs/characters/2/Idle/1.png",
      "assets/imgs/characters/2/Idle/1.png",
      "assets/imgs/characters/2/Idle/1.png",
      "assets/imgs/characters/2/Idle/1.png"
    ];

    this.Smart = new Action([
      "assets/imgs/characters/2/Dance/1.png",
      "assets/imgs/characters/2/Dance/2.png",
      "assets/imgs/characters/2/Dance/3.png"
    ]);
    this.Hungry = new Action([
      "assets/imgs/characters/2/Eating/1.png",
      "assets/imgs/characters/2/Eating/2.png",
      "assets/imgs/characters/2/Eating/1.png",
      "assets/imgs/characters/2/Eating/2.png",
      "assets/imgs/characters/2/Eating/1.png",
      "assets/imgs/characters/2/Eating/2.png",
      "assets/imgs/characters/2/Eating/1.png",
      "assets/imgs/characters/2/Eating/2.png"
    ]);
    this.Active = new Action([
      "assets/imgs/characters/2/FlyingAway/1.png",
      "assets/imgs/characters/2/FlyingAway/3.png",
      "assets/imgs/characters/2/FlyingAway/4.png",
      "assets/imgs/characters/2/FlyingAway/3.png",
      "assets/imgs/characters/2/FlyingAway/1.png"
    ]);

    this.Sick = ["assets/imgs/characters/2/Sick/2.png"];

    this.Bad = [
      "assets/imgs/characters/2/UhOh/1.png",
      "assets/imgs/characters/2/UhOh/2.png",
      "assets/imgs/characters/2/UhOh/3.png",
      "assets/imgs/characters/2/UhOh/2.png"
    ];

    this.Default = "assets/imgs/characters/2/Idle/1.png"

  }

  Default: string;

  Idle: string[];
  Bad: string[];
  Sick: string[];

  Smart: Action;
  Hungry: Action;
  Active: Action;

  Happiness: number = 40;

  DegradeScores() {
    var scores = [
    this.Hungry.DegradeScore(),
    this.Active.DegradeScore(),
    this.Smart.DegradeScore(),
    ];

    this.Happiness =
      scores.reduce((total, num) => {
        return total + num;
      }) / scores.length;
  }
}
