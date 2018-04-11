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
      this.BoredTimeout = new Date(Date.now() + 5 * 60000).getTime();
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

    // this.Sick = [
    //   "assets/imgs/characters/2/Sick/2.png",
    //   // "assets/imgs/characters/2/Sick/3.png"
    // ];
    
    this.Bad = [
      "assets/imgs/characters/2/UhOh/1.png",
      "assets/imgs/characters/2/UhOh/2.png",
      "assets/imgs/characters/2/UhOh/3.png",
      "assets/imgs/characters/2/UhOh/2.png",
    ];
  }

  Idle: string[];
  Bad: string[];

  Smart: Action;
  Hungry: Action;
  Active: Action;

  Happiness: number = 40;

  DegradeScores() {
    this.Hungry.Score -= 1;
    // this.Clean.Score -= 1;
    this.Smart.Score -= 1;

    this.Happiness =
      (this.Hungry.Score +
        this.Active.Score +
        this.Smart.Score) /
      3;
  }
}
