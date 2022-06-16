import { BaseNode } from '../node';
import { BaseConn } from './base-conn';

export class LineConn extends BaseConn {
  constructor(nodeA: BaseNode, nodeB: BaseNode, strokeStyle: string) {
    super(nodeA, nodeB, strokeStyle);
  }
}
