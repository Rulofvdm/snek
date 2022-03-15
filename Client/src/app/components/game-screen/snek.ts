import { Piece } from "./game_piece_model";
import { get_position_facing, random } from "./utilities";

export class snek {
  segments: Piece[];
  length: number;
  game_unit: number;
  direction: number;
  head: Piece;
  turning: boolean = false;

  constructor(x: number, y: number, game_unit: number){
    this.segments =  [
      new Piece(
        x,
        y,
        'rgb(' +
        random(0, 255) +
        ',' +
        random(0, 255) +
        ',' +
        random(0, 255) +
        ')', //color
        game_unit//size
      ),
    ];
    this.length = 1;
    this.game_unit = game_unit;
    this.direction = 0;
    this.head = this.segments[0];
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
      (tail.direction + 2) % 4,
      tail.x,
      tail.y,
      this.game_unit
    );
    let new_piece = new Piece(
      position.x,
      position.y,
      'rgb(' +
        random(0, 255) +
        ',' +
        random(0, 255) +
        ',' +
        random(0, 255) +
        ')', //color
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
      this.head.direction,
      this.head.x,
      this.head.y,
      this.game_unit
    );
    this.head.x = new_head_position.x;
    this.head.y = new_head_position.y;
    this.turning = false;
  }

  turn(direction: number): void {
    if (
      (direction + 2) % 4 == this.head.direction || //if new direction is behind
      direction == this.head.direction || //if new direction is ahead
      this.turning //if the snek is already turning
    ) return;

    this.turning = true;
    this.head.direction = direction;
  }
}
