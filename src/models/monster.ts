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
    this.Smart = [
      "assets/imgs/characters/2/Dance/1.png",
      "assets/imgs/characters/2/Dance/2.png",
      "assets/imgs/characters/2/Dance/3.png",
      // "assets/imgs/characters/2/Dance/2.png",
      // "assets/imgs/characters/2/Dance/1.png",
      // "assets/imgs/characters/2/Dance/1.png",
      // "assets/imgs/characters/2/Dance/1.png",
      // "assets/imgs/characters/2/Dance/2.png",
      // "assets/imgs/characters/2/Dance/3.png",
      // "assets/imgs/characters/2/Dance/2.png",
      // "assets/imgs/characters/2/Dance/1.png"
    ];
    this.Eating = [
      "assets/imgs/characters/2/Eating/1.png",
      "assets/imgs/characters/2/Eating/2.png",
      "assets/imgs/characters/2/Eating/1.png",
      "assets/imgs/characters/2/Eating/2.png",
      "assets/imgs/characters/2/Eating/1.png",
      "assets/imgs/characters/2/Eating/2.png",
      "assets/imgs/characters/2/Eating/1.png",
      "assets/imgs/characters/2/Eating/2.png",
    ];

    this.Looking = [
      "assets/imgs/characters/2/neutral.png",
      "assets/imgs/characters/2/neutral.png",
      "assets/imgs/characters/2/neutral.png",
      "assets/imgs/characters/2/neutral.png"
    ];

    this.Scores = {
      Hungry: 50,
      Happy: 50,
      Clean: 50,
      Smart: 50
    };
  }

  Idle: string[];
  Smart: string[];
  Eating: string[];
  Looking: string[]

  Scores: {
    Hungry: number;
    Happy: number;
    Clean: number;
    Smart: number;
  };

  DegradeScores() {

    this.Scores.Hungry -= 1;
    this.Scores.Clean -= 1;
    this.Scores.Smart -= 1;

    this.Scores.Happy =
      (this.Scores.Hungry + this.Scores.Clean + this.Scores.Smart) / 3;
  }
}