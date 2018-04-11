export class Action {
  constructor(anim: string[]){
    this.Animation = anim
  }

  Animation: string[];
  Score: number = 50;
}

export class Monster {
  constructor() {
    this.Idle = [
      "assets/imgs/characters/2/Idle/1.png",
      "assets/imgs/characters/2/Idle/2.png",
      "assets/imgs/characters/2/Idle/3.png",
      // "assets/imgs/characters/2/Idle/2.png",
      "assets/imgs/characters/2/Idle/1.png",
      "assets/imgs/characters/2/Idle/1.png",
      "assets/imgs/characters/2/Idle/1.png",
      "assets/imgs/characters/2/Idle/1.png",
    ];

    this.Smart = new Action([
      "assets/imgs/characters/2/Dance/1.png",
      "assets/imgs/characters/2/Dance/2.png",
      "assets/imgs/characters/2/Dance/3.png",
    ]);
    this.Hungry = new Action([
      "assets/imgs/characters/2/Eating/1.png",
      "assets/imgs/characters/2/Eating/2.png",
      "assets/imgs/characters/2/Eating/1.png",
      "assets/imgs/characters/2/Eating/2.png",
      "assets/imgs/characters/2/Eating/1.png",
      "assets/imgs/characters/2/Eating/2.png",
      "assets/imgs/characters/2/Eating/1.png",
      "assets/imgs/characters/2/Eating/2.png",
    ]);

    
  }

  Idle: string[];

  Smart: Action;
  Hungry: Action;

  Happiness: number = 50;

  DegradeScores() {

    this.Hungry.Score -= 1;
    // this.Clean.Score -= 1;
    this.Smart.Score -= 1;

    this.Happiness =
      (this.Hungry.Score + 
        // this.Clean.Score + 
        this.Smart.Score) / 2;
  }
}