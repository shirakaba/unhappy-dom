import IWindow from '../../window/IWindow.js';

/**
 * Document ready state manager.
 */
export default class DocumentReadyStateManager {
	/**
	 * Constructor.
	 *
	 * @param _window
	 */
	// eslint-disable-next-line no-useless-constructor
	constructor(_window: IWindow) {}

	/**
	 * Returns a promise that is fulfilled when ready state is complete.
	 *
	 * @returns Promise.
	 */
	public whenComplete(): Promise<void> {
		return Promise.resolve();
	}
}
