import { EventEmitter } from 'events';

export class MyClass extends EventEmitter {
    public title: string = 'TypeScript is awesome!';
    private posX: number = 0;
    private posY: number = 0;

    constructor(x: number = 0, y: number = 0) {
        super();
        this.posX = x;
        this.posY = y;
    }

    public getCoordinates(): number[] {
        return [this.posX, this.posY];
    }
}
