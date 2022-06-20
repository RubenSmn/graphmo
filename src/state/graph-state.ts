import { graphToNodeHash } from '../util';
import { BaseState, BaseStateConfig } from './base-state';
import { LineConn } from '../conn';

export class GraphState extends BaseState {
  constructor({ nodes, conns }: BaseStateConfig) {
    super({ nodes, conns });
  }

  /**
   * Create state from graph
   *
   * @param graph the graph used to create the state
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
        const conn = new LineConn(node, neighbor, '#000');
        conns.push(conn);
      }
    }

    return new GraphState({ nodes, conns });
  }

  /**
   * Create state from edges
   *
   * @param edges the edges used to create the state
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
}
