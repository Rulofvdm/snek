import { Piece } from "./game_piece_model";
import { get_position_facing, random } from "./utilities";

export class snek {
  segments: Piece[];
  length: number;
  game_unit: number;
  direction: number;
  head: Piece;
  turning: boolean = false;
  boundX: {min:number, max: number};
  boundY: {min:number, max: number};

  constructor(x: number, y: number, game_unit: number, boundX:{min: number, max: number}, boundY:{min: number, max: number}){
    this.segments =  [
      new Piece(
        x,
        y,
        this.randomColor(), //color
        game_unit//size
      ),
    ];
    this.length = 1;
    this.game_unit = game_unit;
    this.direction = 0;
    this.head = this.segments[0];
    this.boundX = boundX;
    this.boundY = boundY;
  }

  size(): number {
    return this.segments.length;
  }

  getPiece(index: number): Piece{
    return this.segments[index];
  }

  grow() {
    let tail = this.segments[this.length - 1];
    let position = get_position_facing(
      {direction: (tail.direction + 2) % 4,
      x: tail.x,
      y: tail.y},
      this.game_unit,
      this.boundX,
      this.boundY
    );
    let new_piece = new Piece(
      position.x,
      position.y,
      this.randomColor(), //color
      this.game_unit
    );
    this.segments.push(new_piece);
    this.length++;
  }

  move() {
    for (let i = this.length - 1; i > 0; i--) {
      let previous_piece = this.segments[i - 1];
      let current_piece = this.segments[i];
      current_piece.x = previous_piece.x;
      current_piece.y = previous_piece.y;
    }
    var new_head_position = get_position_facing(
      {direction: this.head.direction,
      x: this.head.x,
      y: this.head.y},
      this.game_unit,
      this.boundX,
      this.boundY
    );
    this.head.x = new_head_position.x;
    this.head.y = new_head_position.y;
    this.turning = false;
  }

  turn(direction: number): void {
    if (
      (direction + 2) % 4 == this.head.direction || //if new direction is behind
      direction == this.head.direction //if new direction is ahead
    ) return;

    this.head.direction = direction;
  }

  randomColor() {
    // 255, 140, 105
    return 'rgb(' +
        random(255 - 60, 255) +
        ',' +
        random(140 - 30, 140 + 30) +
        ',' +
        random(105 - 30, 105 + 30) +
        ')';
  }
}
