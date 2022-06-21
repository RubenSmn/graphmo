import { CurveConn, GraphConn } from '../conn';
import { GraphNode } from '../node';
import { GraphState } from './graph-state';

export class DefaultState extends GraphState {
  constructor() {
    super({});
    for (let i = 0; i < 5; i++) {
      const node = new GraphNode({
        x: Math.floor(Math.random() * (700 - 30 + 1) + 30),
        y: Math.floor(Math.random() * (300 - 30 + 1) + 30),
        text: String(i),
      });
      this._nodes.push(node);
    }

    this._conns.push(
      new GraphConn({
        nodeA: this._nodes[0],
        nodeB: this._nodes[1],
      }),
    );
    this._conns.push(
      new GraphConn({
        nodeA: this._nodes[0],
        nodeB: this._nodes[4],
      }),
    );
    this._conns.push(
      new GraphConn({
        nodeA: this._nodes[1],
        nodeB: this._nodes[4],
      }),
    );
    this._conns.push(
      new CurveConn({
        nodeA: this._nodes[2],
        nodeB: this._nodes[3],
      }),
    );
  }
}
