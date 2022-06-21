import { GraphNode } from '../node';

export class BaseConn {
  protected _nodeA: GraphNode;
  protected _nodeB: GraphNode;
  protected _strokeStyle: string;

  constructor(nodeA: GraphNode, nodeB: GraphNode, strokeStyle: string) {
    if (nodeA === nodeB)
      throw new Error('Can not create a connection if nodes are equal');
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
