import { GraphView } from 'graph-view';
import { BaseInput } from './base-input';

export class DefaultInput implements BaseInput {
  /**
   * Handle mouseup event
   */
  public onMouseUp = (_e: MouseEvent, view: GraphView): void => {
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
