import { GraphConn } from './graph-conn';

export class CurveConn extends GraphConn {
  public draw(ctx: CanvasRenderingContext2D): void {
    const cA = { x: this._nodeA.x, y: this._nodeB.y };
    const cB = { x: this._nodeB.x, y: this._nodeA.y };
    ctx.beginPath();
    ctx.strokeStyle = this._strokeStyle;
    ctx.moveTo(this._nodeA.x, this._nodeA.y);
    ctx.bezierCurveTo(cA.x, cA.y, cB.x, cB.y, this._nodeB.x, this._nodeB.y);
    ctx.stroke();
  }
}
