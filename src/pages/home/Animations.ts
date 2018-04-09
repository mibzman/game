export enum AnimationState {
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

export class AnimationController {
	State: AnimationState = AnimationState.Stopped
	Queue: Queue<() => void> = new Queue()

	Done() {
		if (this.State == AnimationState.Stopped){
			return
		}

		this.State = AnimationState.Ready
	}

  Start(): boolean {
    if (this.State == AnimationState.Stopped){
      this.State = AnimationState.Ready
      return true
    }
    return false
  }
}