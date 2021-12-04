export class TireSet {
    front: string;
    rear: string;

    static of(front: string, rear: string) {
        const tireSet = new TireSet()
        tireSet.front = front;
        tireSet.rear = rear;
        return tireSet;
    }

    getFront() {
        return this.front;
    }
    getRear() {
        return this.rear;
    }
}