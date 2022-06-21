import { GraphNode } from '../node';
import { BaseConn } from '../conn';

export interface BaseStateConfig {
  nodes?: GraphNode[];
  conns?: BaseConn[];
}

export class BaseState {
  protected _nodes: GraphNode[];
  protected _conns: BaseConn[];
  protected _selection: GraphNode | null;

  constructor({ nodes = [], conns = [] }: BaseStateConfig) {
    this._nodes = nodes;
    this._conns = conns;
    this._selection = null;
  }

  /**
   * Check if elm exists in state
   */
  public has(elm: GraphNode | BaseConn): boolean {
    if (elm instanceof GraphNode) return this._nodes.indexOf(elm) > -1;
    if (elm instanceof BaseConn) return this._conns.indexOf(elm) > -1;
    return false;
  }

  /**
   * Update every node pos by x,y
   */
  public addOffsetToNodes(x: number, y: number): void {
    for (const node of this._nodes) {
      const newX = node.x + x;
      const newY = node.y + y;
      node.setPos(newX, newY);
    }
  }

  /**
   * Get nodes
   */
  public get nodes() {
    return this._nodes;
  }

  /**
   * Get conns
   */
  public get conns() {
    return this._conns;
  }

  /**
   * Get selection
   */
  public get selection() {
    return this._selection;
  }

  /**
   * Set selection
   */
  public set selection(node: GraphNode) {
    this._selection = node;
  }
}
