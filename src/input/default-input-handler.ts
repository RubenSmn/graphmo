import { GraphView } from 'graph-view';
import { BaseInputHandler } from './base-input-handler';

export class DefaultInputHandler implements BaseInputHandler {
  /**
   * Handle mouseup event
   */
  public onMouseUp = (_e: MouseEvent, view: GraphView): void => {
    if (view.state.selection === null) return;
    view.state.selection.active = false;
    view.state.selection.draw(view.ctx);
    view.state.selection = null;
  };

  /**
   * Handle mousedown event
   */
  public onMouseDown = (e: MouseEvent, view: GraphView): void => {
    const node = view.getNodeWithin(e.x, e.y);
    if (node === null) return;

    view.state.selection = node;
    view.state.selection.active = true;
    view.state.selection.draw(view.ctx);
  };

  /**
   * Handle mousemove event
   */
  public onMouseMove = (e: MouseEvent, view: GraphView): void => {
    if (view.state.selection === null) return;
    view.state.selection.setPos(e.x, e.y);
    view.updateCanvas();
  };
}
