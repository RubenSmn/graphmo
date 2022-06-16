import { BaseNode, GraphNode } from './node';
import { BaseConn, LineConn } from './conn';

/**
 * Interface for the GraphView config
 */
export interface GraphViewConfig {
  parent: Element;
}

/**
 * GraphView handles the view of the graph
 */
export class GraphView {
  readonly canvas: HTMLCanvasElement;
  readonly root: Element;
  readonly dom: Element;
  readonly ctx: CanvasRenderingContext2D;
  nodes: BaseNode[] = [];
  conns: BaseConn[] = [];
  private _selection: BaseNode;

  constructor(config: GraphViewConfig) {
    this.root = config.parent;

    this.canvas = document.createElement('canvas');
    this.canvas.width = this.root.clientWidth;
    this.canvas.height = this.root.clientHeight;
    this.ctx = this.canvas.getContext('2d');

    this.dom = document.createElement('div');
    this.dom.appendChild(this.canvas);

    config.parent.appendChild(this.dom);

    this.dom.addEventListener('mousedown', this.onDownGraphNode);
    this.dom.addEventListener('mouseup', this.onUpGraphNode);
    this.dom.addEventListener('mousemove', this.onMoveGraphNode);

    this._selection = null;

    window.onresize = this.resizeCanvas;
  }

  /**
   * Add node to graph view
   */
  addNode(node: BaseNode): void {
    this.nodes.push(node);
    node.draw(this.ctx);
  }

  /**
   * Connect two nodes with a connection
   */
  connectNode(nodeA: BaseNode, nodeB: BaseNode): void {
    const conn = new LineConn(nodeA, nodeB, '#000'); // hardcoded for now
    this.conns.push(conn);
    this.updateCanvas();
  }

  /**
   * Set selection
   */
  public set selection(node: BaseNode) {
    this._selection = node;
  }

  /**
   * Get selection
   */
  public get selection() {
    return this._selection;
  }

  /**
   * Handle mouseup event
   */
  private onUpGraphNode = (e: MouseEvent): void => {
    if (this._selection === null || this._selection.isSelected === false) {
      const node = new GraphNode(
        e.x,
        e.y,
        24,
        '#2cc',
        '#099',
        '#8aa',
        String(this.nodes.length),
      );
      node.setSelected(true);
      this.addNode(node);
      this._selection = node;
    }
    this._selection.setSelected(false);
    this._selection.draw(this.ctx);
  };

  /**
   * Handle mousedown event
   */
  private onDownGraphNode = (e: MouseEvent): void => {
    const node = this.getNodeWithin(e.x, e.y);
    if (node === null) return;

    if (this._selection !== null && this._selection !== node) {
      this.connectNode(this._selection, node);
    } else {
      this._selection = node;
    }
    this._selection.setSelected(true);
    this._selection.draw(this.ctx);
  };

  /**
   * Handle mousemove event
   */
  private onMoveGraphNode = (e: MouseEvent): void => {
    if (this._selection === null || this._selection.isSelected === false) return;
    this._selection.setPos(e.x, e.y);
    this.updateCanvas();
  };

  /**
   * Return node where x,y are in bounds
   */
  private getNodeWithin(x: number, y: number): BaseNode | null {
    for (const node of this.nodes) {
      if (node.isInbounds(x, y)) return node;
    }
    return null;
  }

  private updateCanvas(): void {
    this.cleanCanvas();
    this.updateConns();
    this.updateNodes();
  }

  /**
   * Redraw nodes
   */
  private updateNodes(): void {
    for (const node of this.nodes) {
      node.draw(this.ctx);
    }
  }

  /**
   * Redraw nodes
   */
  private updateConns(): void {
    for (const conn of this.conns) {
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
  }
}
