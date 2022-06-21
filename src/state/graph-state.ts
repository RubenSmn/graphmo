import { graphToNodeHash } from '../util';
import { GraphNode } from '../node';
import { GraphConn } from '../conn';

export interface GraphStateConfig {
  nodes?: GraphNode[];
  conns?: GraphConn[];
}

export class GraphState {
  protected _nodes: GraphNode[];
  protected _conns: GraphConn[];
  protected _selection: GraphNode | null;

  constructor({ nodes = [], conns = [] }: GraphStateConfig) {
    this._nodes = nodes;
    this._conns = conns;
    this._selection = null;
  }

  /**
   * Check if elm exists in state
   *
   * @param elm - element to check
   */
  public has(elm: GraphNode | GraphConn): boolean {
    if (elm instanceof GraphNode) return this._nodes.indexOf(elm) > -1;
    if (elm instanceof GraphConn) return this._conns.indexOf(elm) > -1;
    return false;
  }

  /**
   * Update every node pos by x,y
   *
   * @param x - value that moves nodes over the x axis
   * @param y - value that moves nodes over the y axis
   */
  public addOffsetToNodes(x: number, y: number): void {
    for (const node of this._nodes) {
      const newX = node.x + x;
      const newY = node.y + y;
      node.setPos(newX, newY);
    }
  }

  /**
   * Create state from graph
   *
   * @param graph - the graph used to create the state
   *
   * @returns GraphState
   */
  public static fromGraph(graph: { [key: string]: string[] }): GraphState {
    const nodes = [];
    const conns = [];

    const nodeHash = graphToNodeHash(graph);

    for (const key in graph) {
      const node = nodeHash[key];
      nodes.push(node);

      for (const neighborKey of graph[key]) {
        const neighbor = nodeHash[neighborKey];
        const conn = new GraphConn(node, neighbor, '#000');
        conns.push(conn);
      }
    }

    return new GraphState({ nodes, conns });
  }

  /**
   * Create state from edges
   *
   * @param edges - the edges used to create the state
   *
   * @returns GraphState
   */
  public static fromEdges(edges: string[][]): GraphState {
    const graph = {};
    for (const nodes of edges) {
      const [a, b] = nodes;
      if (!(a in graph)) graph[a] = [];
      if (!(b in graph)) graph[b] = [];
      graph[a].push(b);
      graph[b].push(a);
    }
    return this.fromGraph(graph);
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
