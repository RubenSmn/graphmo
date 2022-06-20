export interface BaseNodeConfig {
  x: number;
  y: number;
  radius?: number;
  fillStyle?: string;
  strokeStyle?: string;
  activeStyle?: string;
  active?: boolean;
}

export class BaseNode {
  protected _x: number;
  protected _y: number;
  protected _radius: number;
  protected _fillStyle: string;
  protected _strokeStyle: string;
  protected _activeStyle: string;
  protected _active: boolean;

  constructor({
    x,
    y,
    radius = 24,
    fillStyle = '#66ca4d',
    strokeStyle = '#000',
    activeStyle = '#3ed7e7',
    active = false,
  }: BaseNodeConfig) {
    this._x = x;
    this._y = y;
    this._radius = radius;
    this._fillStyle = fillStyle;
    this._strokeStyle = strokeStyle;
    this._activeStyle = activeStyle;
    this._active = active;
  }

  /**
   * Draw a cirlce on the canvas
   *
   * @param ctx the canvas context
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.fillStyle = this._fillStyle;
    ctx.arc(this._x, this._y, this._radius, 0, Math.PI * 2, true);
    ctx.strokeStyle = this._strokeStyle;
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }

  /**
   * Set a new position
   */
  public setPos(x: number, y: number): void {
    this._x = x;
    this._y = y;
  }

  /**
   * Check if x,y is in the radius of the node
   */
  public isInbounds(x: number, y: number): boolean {
    const xInbounds = this._x - this._radius <= x && x < this._x + this._radius;
    const yInbounds = this._y - this._radius <= y && y < this._y + this._radius;
    return xInbounds && yInbounds;
  }

  /**
   * Get y
   */
  public get y() {
    return this._y;
  }

  /**
   * Get x
   */
  public get x() {
    return this._x;
  }

  /**
   * Get active
   */
  public get active() {
    return this._active;
  }

  /**
   * Set active
   */
  public set active(isActive: boolean) {
    this._active = isActive;
  }
}
