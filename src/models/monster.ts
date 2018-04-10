export class Monster {
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
      "assets/imgs/characters/1/happy1.png",
      "assets/imgs/characters/1/happy1.png",
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

  TryDegradeScores() {

    this.Scores.Hungry -= 1;
    this.Scores.Clean -= 1;
    this.Scores.Smart -= 1;

    this.Scores.Happy =
      (this.Scores.Hungry + this.Scores.Clean + this.Scores.Smart) / 3;
  }
}