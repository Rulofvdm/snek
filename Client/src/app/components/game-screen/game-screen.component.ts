import { Component, OnInit } from '@angular/core';
import { CanvasHandler } from './canvas_handler';
import { Piece } from './game_piece_model';

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.css'],
})
export class GameScreenComponent implements OnInit {
  game_unit: number = 10;
  game_width_units: number = 40;
  game_height_units: number = 40;
  should_continue: boolean = true;

  canvas?: CanvasHandler;
  width: any = this.game_unit * this.game_height_units;
  height: any = this.game_unit * this.game_height_units;

  snek = this.new_snek();
  snack = this.random_snack();

  last_update: Date = new Date();

  constructor() {}

  ngOnInit(): void {
    this.setControls();

    let canvas = document.getElementById('game_canvas') as HTMLCanvasElement;
    this.canvas = new CanvasHandler(canvas);
    this.canvas.setHeight(this.height);
    this.canvas.setWidth(this.width);

    window.requestAnimationFrame(this.loop.bind(this));
  }

  random(min: number, max: number) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
  }

  middleX() {
    return (this.game_width_units / 2) * this.game_unit;
  }

  middleY() {
    return (this.game_height_units / 2) * this.game_unit;
  }

  new_snek() {
    return [
      new Piece(
        this.middleX(), //x
        this.middleY(), //y
        'rgb(' +
          this.random(0, 255) +
          ',' +
          this.random(0, 255) +
          ',' +
          this.random(0, 255) +
          ')', //color
        this.game_unit //size
      ),
    ];
  }

  random_snack() {
    let x = this.random(0, this.game_width_units) * this.game_unit;
    let y = this.random(0, this.game_height_units) * this.game_unit;
    console.log(x + " " + y);
    return new Piece(
      x,
      y,
      'rgb(' +
        this.random(0, 255) +
        ',' +
        this.random(0, 255) +
        ',' +
        this.random(0, 255) +
        ')',
      this.game_unit
    );
  }

  draw() {
    this.canvas!.drawPiece(this.snack);
    for (let i = 0; i < this.snek.length; i++) {
      this.canvas!.drawPiece(this.snek[i]);
    }
  }

  get_position_facing(direction: number, x: number, y: number) {
    var new_position;
    switch (direction) {
      case 0:
        new_position = { x: x, y: y - this.game_unit };
        break;
      case 1:
        new_position = { x: x + this.game_unit, y: y };
        break;
      case 2:
        new_position = { x: x, y: y + this.game_unit };
        break;
      case 3:
        new_position = { x: x - this.game_unit, y: y };
        break;
      default:
        new_position = { x: x, y: y };
        break;
    }
    return new_position;
  }

  add_piece() {
    let tail = this.snek[this.snek.length - 1];
    let position = this.get_position_facing(
      (tail.direction + 2) % 4,
      tail.x,
      tail.y
    );
    let new_piece = new Piece(
      position.x,
      position.y,
      'rgb(' +
        this.random(0, 255) +
        ',' +
        this.random(0, 255) +
        ',' +
        this.random(0, 255) +
        ')', //color
      this.game_unit
    );
    this.snek.push(new_piece);
  }

  front_obstructed(piece: Piece) {
    var position = this.get_position_facing(piece.direction, piece.x, piece.y);
    if (this.snack.x == position.x && this.snack.y == position.y) {
      this.snack = this.random_snack();
      this.add_piece();
      return false;
    }
    if (this.snek.length > 1) {
      for (let i = 1; i < this.snek.length; i++) {
        if (this.snek[i].x == position.x && this.snek[i].y == position.y) {
          return true;
        }
      }
    }
    return false;
  }

  restart() {
    this.snek = this.new_snek();
    this.snack = this.random_snack();
  }

  update() {
    console.log(this.snek[0].x + " " + this.snek[0].y);
    let now = new Date;
    if (this.last_update > new Date(now.setMilliseconds(now.getMilliseconds() - 200)))
      return;

    if (this.front_obstructed(this.snek[0])) {
      this.restart();
    } else {
      for (let i = this.snek.length - 1; i > 0; i--) {
        this.snek[i].x = this.snek[i - 1].x;
        this.snek[i].y = this.snek[i - 1].y;
        this.snek[i].direction = this.snek[i - 1].direction;
      }
      var new_head_position = this.get_position_facing(
        this.snek[0].direction,
        this.snek[0].x,
        this.snek[0].y
      );
      this.snek[0].x = new_head_position.x;
      this.snek[0].y = new_head_position.y;
    }
    this.last_update = new Date();
  }

  loop() {
    window.requestAnimationFrame(this.loop.bind(this));
    this.canvas!.clearBackground(this.width, this.height);

    this.draw();
    this.update();
  }

  setControls() {
    document.addEventListener('keyup', (e) => {
      var new_direction;
      switch (e.key) {
        case 'ArrowUp':
          new_direction = 0;
          break;
        case 'ArrowRight':
          new_direction = 1;
          break;
        case 'ArrowDown':
          new_direction = 2;
          break;
        case 'ArrowLeft':
          new_direction = 3;
          break;
        default:
          new_direction = this.snek[0].direction;
          break;
      }
      if (
        (new_direction + 2) % 4 != this.snek[0].direction &&
        new_direction != this.snek[0].direction
      ) {
        this.snek[0].direction = new_direction;
      }
    });
  }
}
