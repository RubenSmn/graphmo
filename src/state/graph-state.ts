import { BaseState } from './base-state';

export class GraphState extends BaseState {
  constructor() {
    super();
  }

  /**
   * Create state from graph
   */
  public static fromGraph(graph: { [key: string]: string[] }) {
    const nodes = [];
    const conns = [];

    for (const key in graph) {
      nodes.push(key);
      for (const neighbor of graph[key]) {
        const conn = key + ',' + neighbor;
        if (
          conns.indexOf(conn) > -1 ||
          conns.indexOf(neighbor + ',' + key) > -1
        )
          continue;
        conns.push(conn);
      }
    }

    return { nodes, conns };
  }
}
