export class Piece{
  x: number;
  y: number;
  color: any;
  size: number;
  direction: number = 0;

  constructor (x: number, y: number , color: any, size: number) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;
   }
}
