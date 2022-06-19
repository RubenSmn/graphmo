import { BaseNode, BaseNodeConfig } from './base-node';

export interface GraphNodeConfig extends BaseNodeConfig {
  text?: string;
}

export class GraphNode extends BaseNode {
  protected _text: string;

  constructor({
    x,
    y,
    radius,
    fillStyle,
    strokeStyle,
    activeStyle,
    active,
    text = '',
  }: GraphNodeConfig) {
    super({ x, y, radius, fillStyle, strokeStyle, activeStyle, active });
    this._text = text;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.fillStyle = this._active ? this._activeStyle : this._fillStyle;
    ctx.arc(this._x, this._y, this._radius, 0, Math.PI * 2, true);
    ctx.strokeStyle = this._strokeStyle;
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = '#000';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this._text, this._x, this._y);
  }
}
