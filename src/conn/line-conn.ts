import { GraphNode } from '../node';
import { BaseConn } from './base-conn';

export class LineConn extends BaseConn {
  constructor(nodeA: GraphNode, nodeB: GraphNode, strokeStyle: string) {
    super(nodeA, nodeB, strokeStyle);
  }
}
