import { CurveConn, LineConn } from '../conn';
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
    this._conns.push(new LineConn(this._nodes[0], this._nodes[1], '#000'));
    this._conns.push(new LineConn(this._nodes[0], this._nodes[4], '#000'));
    this._conns.push(new LineConn(this._nodes[1], this._nodes[4], '#000'));
    this._conns.push(new CurveConn(this._nodes[2], this._nodes[3], '#00f'));
  }
}
