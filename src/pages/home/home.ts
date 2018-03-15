import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

class Monster {
	Idle: string[]
	Happy: string[]
	Eating: string[]
}

enum AnimationState {
	Ready = 1,
	Stopped,
	Animating,
}

class Queue<T> {
  private _store: T[] = [];

  Length() {
  	return this._store.length
  }

  Push(val: T) {
    this._store.push(val);
  }
  Pop(): T | undefined {
    return this._store.shift();
  }
}

class AnimationController {
	State: AnimationState = AnimationState.Ready
	Queue: Queue<() => void> = new Queue()

	Done() {
		if (this.State == AnimationState.Stopped){
			return
		}

		this.State = AnimationState.Ready
	}
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	
	MonsterZoneHeight: number;
	MonsterZoneWidth: number;
	MonsterZoneSrc: string;

	Monster: Monster = new Monster()

	AnimationController: AnimationController = new AnimationController()

  constructor(
  	public navCtrl: NavController,
  	private Plat: Platform,
  	) {
	  	Plat.ready().then((readySource) => {
		      this.MonsterZoneWidth = Plat.width();
		      this.MonsterZoneHeight = Plat.height() * .57 ;
		    });
	  	this.Monster.Idle = ["assets/imgs/characters/1/neutral.png", "assets/imgs/characters/1/idle1.png", "assets/imgs/characters/1/neutral.png", "assets/imgs/characters/1/idle2.png", "assets/imgs/characters/1/neutral.png",]
	  	this.Monster.Happy = ["assets/imgs/characters/1/happy1.png", "assets/imgs/characters/1/happy2.png", "assets/imgs/characters/1/happy3.png", "assets/imgs/characters/1/happy2.png", "assets/imgs/characters/1/happy1.png"]

	  	this.StartAnimating()
  }

  StartAnimating() {
  	this.AnimationController.State = AnimationState.Ready
  	this.Tick()
  }

  Tick(){
  	console.log(this.AnimationController.State)
  		if (this.AnimationController.State == AnimationState.Ready) {
  			this.AnimationController.State = AnimationState.Animating

  			
  			if (this.AnimationController.Queue.Length() == 0){
  				this.Animate(this.Monster.Idle)
  			} else {
  				this.AnimationController.Queue.Pop().call(this)
  			}
  		}
  		
  	// }
  	setTimeout(() => {
  		this.Tick()
  	}, 75)
  }

  Animate(arr: string[], idx: number = 0){
  	if (arr.length == idx) {
  		this.AnimationController.Done()
  		return
  	}
  	this.MonsterZoneSrc = arr[idx]
  	setTimeout(() => {
  		this.Animate(arr, idx + 1)
  	}, 1000 / arr.length)
  }

  HappyMonster() {
  	this.Animate(this.Monster.Happy)
  }

  BeHappy() {
  	this.AnimationController.Queue.Push(this.HappyMonster)
  }

}
