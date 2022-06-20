import { graphToNodeHash } from '../util';
import { BaseState, BaseStateConfig } from './base-state';
import { LineConn } from '../conn';

export interface GraphStateConfig extends BaseStateConfig {};

export class GraphState extends BaseState {
  constructor({ nodes, conns }: GraphStateConfig) {
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
}
