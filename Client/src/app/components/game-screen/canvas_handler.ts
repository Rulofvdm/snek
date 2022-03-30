import { Piece } from "./game_piece_model";

export class CanvasHandler {
  canvas: HTMLCanvasElement;
  ctx: any;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    return this;
  }

  setHeight(height: number) {
    this.canvas.height = height;
  }

  setWidth(width: number) {
    this.canvas.width = width;
  }

  drawPiece(piece: Piece) {
    this.ctx!.fillStyle = piece.color;
    this.ctx!.fillRect(piece.x, piece.y, piece.size, piece.size);
  }

  clearBackground(width: number, height: number) {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    this.ctx.fillRect(0, 0, width, height);
  }
}
