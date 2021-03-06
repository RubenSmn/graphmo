import { GraphView } from 'graph-view';

export abstract class GraphInputHandler {
  public abstract onMouseUp(e: MouseEvent, view: GraphView): void;
  public abstract onMouseDown(e: MouseEvent, view: GraphView): void;
  public abstract onMouseMove(e: MouseEvent, view: GraphView): void;
}
