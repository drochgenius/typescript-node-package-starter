import { EventEmitter } from "events";

export interface Position {
    x: number;
    y: number;
}

export class MyClass extends EventEmitter {
    public title: string = "TypeScript is awesome!";
    private posX: number = 0;
    private posY: number = 0;

    public constructor(x: number = 0, y: number = 0) {
        super();
        this.posX = x;
        this.posY = y;
    }

    public getCoordinates(): Position {
        return { x: this.posX, y: this.posY };
    }
}
