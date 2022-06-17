export class BaseNode {
  x: number;
  y: number;
  radius: number;
  fillStyle: string;
  strokeStyle: string;
  activeStyle: string;
  _active = false;

  constructor(
    _x: number,
    _y: number,
    _radius: number,
    _fillStyle: string,
    _strokeStyle: string,
    _activeStyle: string,
  ) {
    this.x = _x;
    this.y = _y;
    this.radius = _radius;
    this.fillStyle = _fillStyle;
    this.strokeStyle = _strokeStyle;
    this.activeStyle = _activeStyle;
  }

  /**
   * Draw a cirlce on the canvas
   */
  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.fillStyle = this.fillStyle;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.strokeStyle = this.strokeStyle;
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }

  /**
   * Set a new position
   */
  setPos(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  /**
   * Check if x,y is in the radius of the node
   */
  isInbounds(x: number, y: number): boolean {
    const xInbounds = this.x - this.radius <= x && x < this.x + this.radius;
    const yInbounds = this.y - this.radius <= y && y < this.y + this.radius;
    return xInbounds && yInbounds;
  }

  /**
   * Set active
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
