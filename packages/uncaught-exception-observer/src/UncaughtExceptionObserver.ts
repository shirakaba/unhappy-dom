import IWindow from 'happy-dom/lib/window/IWindow.js';

/**
 * Listens for uncaught exceptions coming from Happy DOM on the running Node process and dispatches error events on the Window instance.
 */
export default class UncaughtExceptionObserver {
	private static listenerCount = 0;
	private window: IWindow | null = null;
	private uncaughtExceptionListener: (
		error: Error,
		origin: 'uncaughtException' | 'unhandledRejection'
	) => void | null = null;
	private uncaughtRejectionListener: (error: Error) => void | null = null;

	/**
	 * Observes the Node process for uncaught exceptions.
	 *
	 * @param window
	 */
	public observe(window: IWindow): void {
		if (this.window) {
			throw new Error('Already observing.');
		}

		this.window = window;

		(<typeof UncaughtExceptionObserver>this.constructor).listenerCount++;

		this.uncaughtExceptionListener = (
			error: unknown,
			origin: 'uncaughtException' | 'unhandledRejection'
		) => {
			if (origin === 'unhandledRejection') {
				return;
			}

			if (
				(error instanceof this.window.Error || error instanceof this.window.DOMException) &&
				error.stack?.includes('/happy-dom/')
			) {
				this.window.console.error(error);
				this.window.dispatchEvent(
					new this.window.ErrorEvent('error', { error, message: error.message })
				);
			} else if (
				process.listenerCount('uncaughtException') ===
				(<typeof UncaughtExceptionObserver>this.constructor).listenerCount
			) {
				// eslint-disable-next-line no-console
				console.error(error);
				// Exit if there are no other listeners handling the error.
				process.exit(1);
			}
		};

		// The "uncaughtException" event is not always triggered for unhandled rejections.
		// Therefore we want to use the "unhandledRejection" event as well.
		this.uncaughtRejectionListener = (error: unknown) => {
			if (
				(error instanceof this.window.Error || error instanceof this.window.DOMException) &&
				error.stack?.includes('/happy-dom/')
			) {
				this.window.console.error(error);
				this.window.dispatchEvent(
					new this.window.ErrorEvent('error', { error, message: error.message })
				);
			} else if (
				process.listenerCount('unhandledRejection') ===
				(<typeof UncaughtExceptionObserver>this.constructor).listenerCount
			) {
				// eslint-disable-next-line no-console
				console.error(error);
				// Exit if there are no other listeners handling the error.
				process.exit(1);
			}
		};

		process.on('uncaughtException', this.uncaughtExceptionListener);
		process.on('unhandledRejection', this.uncaughtRejectionListener);
	}

	/**
	 * Disconnects observer.
	 */
	public disconnect(): void {
		if (!this.window) {
			return;
		}

		(<typeof UncaughtExceptionObserver>this.constructor).listenerCount--;

		process.off('uncaughtException', this.uncaughtExceptionListener);
		process.off('unhandledRejection', this.uncaughtRejectionListener);

		this.uncaughtExceptionListener = null;
		this.uncaughtRejectionListener = null;
		this.window = null;
	}
}
