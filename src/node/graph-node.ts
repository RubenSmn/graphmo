import { BaseNode } from './base-node';

export class GraphNode extends BaseNode {
  text: string;

  constructor(
    x: number,
    y: number,
    radius?: number,
    fillStyle?: string,
    strokeStyle?: string,
    activeStyle?: string,
    text?: string,
  ) {
    super(x, y, radius, fillStyle, strokeStyle, activeStyle);
    this.text = text;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.fillStyle = this.active ? this.activeStyle : this.fillStyle;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.strokeStyle = this.strokeStyle;
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = '#000';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.text, this.x, this.y);
  }
}
