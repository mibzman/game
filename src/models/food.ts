export class Food {
  Asset: string;
  Message: string[];

  constructor(a: string, m: string[]) {
    this.Asset = a;
    this.Message = m;
  }
}