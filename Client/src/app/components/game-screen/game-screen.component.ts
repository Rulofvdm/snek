import { Component, OnInit } from '@angular/core';
import { CanvasHandler } from './canvas_handler';
import { Piece } from './game_piece_model';
import { snek } from './snek';
import { get_position_facing, random } from './utilities';

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.css'],
})
export class GameScreenComponent implements OnInit {
  game_unit: number = 15;
  game_width_units: number = 40;
  game_height_units: number = 40;
  score: number;

  canvas?: CanvasHandler;
  boundX: {min:number, max: number} = {min: 0, max: this.game_unit * this.game_width_units};
  boundY: {min:number, max: number} = {min: 0, max: this.game_unit * this.game_height_units};

  snack: any;
  snek!: snek;

  last_update: Date = new Date();
  paused: boolean = true;

  lastCheatLetterNumber: number = 0;

  constructor() {
    this.restart();
    this.score = 0;
  }

  ngOnInit(): void {
    this.setControls();

    let canvas = document.getElementById('game_canvas') as HTMLCanvasElement;
    this.canvas = new CanvasHandler(canvas);
    this.canvas.setHeight(this.boundY.max);
    this.canvas.setWidth(this.boundX.max);

    window.requestAnimationFrame(this.loop.bind(this));
  }

  middleUnit(num: number) {
    return (num / 2) * this.game_unit;
  }

  random_snack() {
    let x = random(0, this.game_width_units - this.game_unit) * this.game_unit;
    let y = random(0, this.game_height_units - this.game_unit) * this.game_unit;
    return new Piece(
      x,
      y,
      'rgb(' +
        random(0, 255) +
        ',' +
        random(0, 255) +
        ',' +
        random(0, 255) +
        ')',
      this.game_unit
    );
  }

  draw() {
    this.canvas!.drawPiece(this.snack);
    for (let i = 0; i < this.snek.size(); i++) {
      this.canvas!.drawPiece(this.snek.getPiece(i));
    }
  }

  front_obstructed(piece: Piece) {
    var position = get_position_facing(
      {direction: piece.direction,
      x: piece.x,
      y: piece.y},
      this.game_unit,
      this.boundX,
      this.boundY);
    if (this.snack.x == position.x && this.snack.y == position.y) {
      this.snack = this.random_snack();
      this.snek.grow();
      this.snek.grow();
      this.score++;
      return false;
    }
    if (this.snek.length > 1) {
      for (let i = 1; i < this.snek.length; i++) {
        if (this.snek.getPiece(i).x == position.x && this.snek.getPiece(i).y == position.y) {
          return true;
        }
      }
    }
    return false;
  }

  restart() {
    this.snek = new snek(
      this.middleUnit(this.game_width_units), //x
      this.middleUnit(this.game_height_units),
      this.game_unit,
      this.boundX,
      this.boundY
      );
    this.snek.grow();
    this.snek.grow();
    this.snack = this.random_snack();
    this.score = 0;
    this.paused = true;
  }

  update() {
    let now = new Date;
    if (this.last_update > new Date(now.setMilliseconds(now.getMilliseconds() - 150)))
      return;
    this.last_update = new Date();

    if (this.front_obstructed(this.snek.getPiece(0))) {
      this.restart();
    } else {
      this.snek.move();
    }
  }

  loop() {
    if(!this.paused) window.requestAnimationFrame(this.loop.bind(this));
    this.canvas!.clearBackground(this.boundX.max, this.boundY.max);

    this.update();
    this.draw();
  }

  setControls() {
    document.addEventListener('keyup', (e) => {
      var new_direction;
      switch (e.key) {
        case 'ArrowUp':
          this.snek.turn(0);
          break;
        case 'ArrowRight':
          this.snek.turn(1);
          break;
        case 'ArrowDown':
          this.snek.turn(2);
          break;
        case 'ArrowLeft':
          this.snek.turn(3);
          break;
        case 'Escape':
        case ' ':
          this.handlePause();
          break;
        default:
          this.checkCheats(e.key);
          break;
      }
    });
  }

  handlePause() {
    this.paused = !this.paused;
    if(!this.paused) window.requestAnimationFrame(this.loop.bind(this));
  }

  checkCheats(key: string) {
    let fat = ['f','a','t'];
    if (key == fat[this.lastCheatLetterNumber]) {
      this.lastCheatLetterNumber++;
    }
    else {
      this.lastCheatLetterNumber = 0;
    }
    if(this.lastCheatLetterNumber == 3) {
      for (let index = 0; index < 20; index++) {
        this.snek.grow();

      }
    }

  }
}

