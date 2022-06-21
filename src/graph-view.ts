import { GraphNode } from './node';
import { LineConn } from './conn';
import { BaseState, DefaultState } from './state';
import { BaseInputHandler, DefaultInputHandler } from './input';

/**
 * Interface for the GraphView config
 */
export interface GraphViewConfig {
  parent: Element;
  handler?: BaseInputHandler;
  state?: BaseState;
}

/**
 * GraphView handles the view of the graph
 */
export class GraphView {
  readonly canvas: HTMLCanvasElement;
  readonly root: Element;
  readonly dom: Element;
  readonly ctx: CanvasRenderingContext2D;
  readonly state: BaseState;
  readonly inputHandler: BaseInputHandler;

  constructor(config: GraphViewConfig) {
    this.root = config.parent;

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.dom = document.createElement('div');
    this.dom.appendChild(this.canvas);

    config.parent.appendChild(this.dom);

    this.state = config.state ? config.state : new DefaultState();
    this.inputHandler = config.handler ? config.handler : new DefaultInputHandler;

    this.dom.addEventListener(
      'mousedown', (e: MouseEvent) => this.inputHandler.onMouseDown(e, this)
    );
    this.dom.addEventListener(
      'mouseup', (e: MouseEvent) => this.inputHandler.onMouseUp(e, this)
    );
    this.dom.addEventListener(
      'mousemove', (e: MouseEvent) => this.inputHandler.onMouseMove(e, this)
    );

    this.resizeCanvas();

    window.onresize = this.resizeCanvas;
  }

  /**
   * Add node to graph view
   */
  public addNode(node: GraphNode): void {
    this.state.nodes.push(node);
    node.draw(this.ctx);
  }

  /**
   * Connect two nodes with a connection
   */
  public connectNode(nodeA: GraphNode, nodeB: GraphNode): void {
    if (!this.state.has(nodeA) || !this.state.has(nodeB))
      throw new Error("Node does not exists in the current state");
    if (this.state.conns.find(conn => conn.nodeA === nodeA && conn.nodeB === nodeB)) return;
    const conn = new LineConn(nodeA, nodeB, '#000'); // hardcoded for now
    this.state.conns.push(conn);
    this.updateCanvas();
  }

  /**
   * Return node where x,y are in bounds
   */
  public getNodeWithin(x: number, y: number): GraphNode | null {
    for (const node of this.state.nodes) {
      if (node.isInbounds(x, y)) return node;
    }
    return null;
  }

  /**
   * Update canvas
   */
  public updateCanvas(): void {
    this.cleanCanvas();
    this.updateConns();
    this.updateNodes();
  }

  /**
   * Redraw nodes
   */
  private updateNodes(): void {
    for (const node of this.state.nodes) {
      node.draw(this.ctx);
    }
  }

  /**
   * Redraw conns
   */
  private updateConns(): void {
    for (const conn of this.state.conns) {
      conn.draw(this.ctx);
    }
  }

  /**
   * Clean canvas
   */
  private cleanCanvas(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Resize canvas
   */
  private resizeCanvas = (): void => {
    this.canvas.width = this.root.clientWidth;
    this.canvas.height = this.root.clientHeight;
    this.updateCanvas();
  }
}
