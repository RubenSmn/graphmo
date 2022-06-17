import { BaseNode } from '../node';
import { BaseConn } from '../conn';

export class BaseState {
  protected _nodes: BaseNode[];
  protected _conns: BaseConn[];
  protected _selection: BaseNode | null;

  constructor() {
    this._nodes = [];
    this._conns = [];
    this._selection = null;
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
  public set selection(node: BaseNode) {
    this._selection = node;
  }
}
