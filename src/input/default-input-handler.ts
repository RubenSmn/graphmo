import { GraphView } from 'graph-view';
import { BaseInputHandler } from './base-input-handler';

export class DefaultInputHandler implements BaseInputHandler {
  private _isMouseDown = false;

  /**
   * Handle mouseup event
   */
  public onMouseUp = (_e: MouseEvent, view: GraphView): void => {
    this._isMouseDown = false;
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
    this._isMouseDown = true;
    if (node === null) return;

    view.state.selection = node;
    view.state.selection.active = true;
    view.state.selection.draw(view.ctx);
  };

  /**
   * Handle mousemove event
   */
  public onMouseMove = (e: MouseEvent, view: GraphView): void => {
    if (this._isMouseDown === true && view.state.selection === null) {
      view.state.addOffsetToNodes(e.movementX, e.movementY);
      view.updateCanvas();
      return;
    }

    if (view.state.selection === null) return;
    view.state.selection.setPos(e.x, e.y);
    view.updateCanvas();
  };
}
