import { BaseNode } from '../node';

export class BaseConn {
  nodeA: BaseNode;
  nodeB: BaseNode;
  strokeStyle: string;

  constructor(_nodeA: BaseNode, _nodeB: BaseNode, _strokeStyle: string) {
    this.nodeA = _nodeA;
    this.nodeB = _nodeB;
    this.strokeStyle = _strokeStyle;
  }

  /**
   * Draw a line on the canvas
   */
  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.strokeStyle = this.strokeStyle;
    ctx.moveTo(this.nodeA.x, this.nodeA.y);
    ctx.lineTo(this.nodeB.x, this.nodeB.y);
    ctx.stroke();
  }
}
