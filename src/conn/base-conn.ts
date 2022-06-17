import { BaseNode } from '../node';

export class BaseConn {
  protected _nodeA: BaseNode;
  protected _nodeB: BaseNode;
  protected _strokeStyle: string;

  constructor(nodeA: BaseNode, nodeB: BaseNode, strokeStyle: string) {
    this._nodeA = nodeA;
    this._nodeB = nodeB;
    this._strokeStyle = strokeStyle;
  }

  /**
   * Draw a line on the canvas
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.strokeStyle = this._strokeStyle;
    ctx.moveTo(this._nodeA.x, this._nodeA.y);
    ctx.lineTo(this._nodeB.x, this._nodeB.y);
    ctx.stroke();
  }

  public get nodeA() {
    return this._nodeA;
  }

  public get nodeB() {
    return this._nodeB;
  }
}
