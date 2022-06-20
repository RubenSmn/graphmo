import { graphToNodeHash } from '../util';
import { BaseState } from './base-state';
import { LineConn } from '../conn';

export class GraphState extends BaseState {
  constructor() {
    super();
  }

  /**
   * Create state from graph
   *
   * @param graph the graph used to create the state
   */
  public static fromGraph(graph: { [key: string]: string[] }) {
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

    return { nodes, conns };
  }
}
