import CustomElementRegistry from '../custom-element/CustomElementRegistry.js';
import Document from '../nodes/document/Document.js';
import HTMLDocument from '../nodes/html-document/HTMLDocument.js';
import XMLDocument from '../nodes/xml-document/XMLDocument.js';
import SVGDocument from '../nodes/svg-document/SVGDocument.js';
import Node from '../nodes/node/Node.js';
import NodeFilter from '../tree-walker/NodeFilter.js';
import Text from '../nodes/text/Text.js';
import Comment from '../nodes/comment/Comment.js';
import ShadowRoot from '../nodes/shadow-root/ShadowRoot.js';
import Element from '../nodes/element/Element.js';
import HTMLTemplateElement from '../nodes/html-template-element/HTMLTemplateElement.js';
import HTMLElement from '../nodes/html-element/HTMLElement.js';
import HTMLUnknownElement from '../nodes/html-unknown-element/HTMLUnknownElement.js';
import HTMLStyleElement from '../nodes/html-style-element/HTMLStyleElement.js';
import HTMLSlotElement from '../nodes/html-slot-element/HTMLSlotElement.js';
import HTMLMetaElement from '../nodes/html-meta-element/HTMLMetaElement.js';
import HTMLMediaElement from '../nodes/html-media-element/HTMLMediaElement.js';
import HTMLAudioElement from '../nodes/html-audio-element/HTMLAudioElement.js';
import AudioImplementation from '../nodes/html-audio-element/Audio.js';
import HTMLVideoElement from '../nodes/html-video-element/HTMLVideoElement.js';
import HTMLBaseElement from '../nodes/html-base-element/HTMLBaseElement.js';
import HTMLDialogElement from '../nodes/html-dialog-element/HTMLDialogElement.js';
import SVGSVGElement from '../nodes/svg-element/SVGSVGElement.js';
import SVGElement from '../nodes/svg-element/SVGElement.js';
import SVGGraphicsElement from '../nodes/svg-element/SVGGraphicsElement.js';
import HTMLImageElement from '../nodes/html-image-element/HTMLImageElement.js';
import ImageImplementation from '../nodes/html-image-element/Image.js';
import DocumentFragmentImplementation from '../nodes/document-fragment/DocumentFragment.js';
import CharacterData from '../nodes/character-data/CharacterData.js';
import NodeIterator from '../tree-walker/NodeIterator.js';
import TreeWalker from '../tree-walker/TreeWalker.js';
import Event from '../event/Event.js';
import CustomEvent from '../event/events/CustomEvent.js';
import AnimationEvent from '../event/events/AnimationEvent.js';
import KeyboardEvent from '../event/events/KeyboardEvent.js';
import MessageEvent from '../event/events/MessageEvent.js';
import ProgressEvent from '../event/events/ProgressEvent.js';
import MediaQueryListEvent from '../event/events/MediaQueryListEvent.js';
import EventTarget from '../event/EventTarget.js';
import MessagePort from '../event/MessagePort.js';
import MutationObserver from '../mutation-observer/MutationObserver.js';
import MutationRecord from '../mutation-observer/MutationRecord.js';
import DOMParserImplementation from '../dom-parser/DOMParser.js';
import XMLSerializer from '../xml-serializer/XMLSerializer.js';
import ResizeObserver from '../resize-observer/ResizeObserver.js';
import DOMException from '../exception/DOMException.js';
import History from '../history/History.js';
import CSSStyleSheet from '../css/CSSStyleSheet.js';
import CSSStyleDeclaration from '../css/declaration/CSSStyleDeclaration.js';
import CSS from '../css/CSS.js';
import CSSUnitValue from '../css/CSSUnitValue.js';
import CSSRule from '../css/CSSRule.js';
import CSSContainerRule from '../css/rules/CSSContainerRule.js';
import CSSFontFaceRule from '../css/rules/CSSFontFaceRule.js';
import CSSKeyframeRule from '../css/rules/CSSKeyframeRule.js';
import CSSKeyframesRule from '../css/rules/CSSKeyframesRule.js';
import CSSMediaRule from '../css/rules/CSSMediaRule.js';
import CSSStyleRule from '../css/rules/CSSStyleRule.js';
import CSSSupportsRule from '../css/rules/CSSSupportsRule.js';
import MouseEvent from '../event/events/MouseEvent.js';
import PointerEvent from '../event/events/PointerEvent.js';
import FocusEvent from '../event/events/FocusEvent.js';
import WheelEvent from '../event/events/WheelEvent.js';
import UIEvent from '../event/UIEvent.js';
import ErrorEvent from '../event/events/ErrorEvent.js';
import StorageEvent from '../event/events/StorageEvent.js';
import SubmitEvent from '../event/events/SubmitEvent.js';
import Screen from '../screen/Screen.js';
import Storage from '../storage/Storage.js';
import IWindow from './IWindow.js';
import HTMLCollection from '../nodes/element/HTMLCollection.js';
import NodeList from '../nodes/node/NodeList.js';
import MediaQueryList from '../match-media/MediaQueryList.js';
import Selection from '../selection/Selection.js';
import Navigator from '../navigator/Navigator.js';
import MimeType from '../navigator/MimeType.js';
import MimeTypeArray from '../navigator/MimeTypeArray.js';
import Plugin from '../navigator/Plugin.js';
import PluginArray from '../navigator/PluginArray.js';
import RangeImplementation from '../range/Range.js';
import DOMRect from '../nodes/element/DOMRect.js';
import Base64 from '../base64/Base64.js';
import IDocument from '../nodes/document/IDocument.js';
import Attr from '../nodes/attr/Attr.js';
import NamedNodeMap from '../named-node-map/NamedNodeMap.js';
import IElement from '../nodes/element/IElement.js';
import ProcessingInstruction from '../nodes/processing-instruction/ProcessingInstruction.js';
import IHappyDOMOptions from './IHappyDOMOptions.js';
import VirtualConsole from '../console/VirtualConsole.js';
import VirtualConsolePrinter from '../console/VirtualConsolePrinter.js';
import IHappyDOMSettings from './IHappyDOMSettings.js';
import PackageVersion from '../version.js';
import Permissions from '../permissions/Permissions.js';
import PermissionStatus from '../permissions/PermissionStatus.js';

/**
 * Browser window.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/Window.
 */
export default class Window extends EventTarget implements IWindow {
	// Happy DOM property.
	public readonly happyDOM: {
		setWindowSize: (options: { width?: number; height?: number }) => void;
		virtualConsolePrinter: VirtualConsolePrinter | null;
		settings: IHappyDOMSettings;

		/**
		 * @deprecated
		 */
		setInnerWidth: (width: number) => void;

		/**
		 * @deprecated
		 */
		setInnerHeight: (height: number) => void;
	} = {
		setWindowSize: (options: { width?: number; height?: number }): void => {
			if (
				(options.width !== undefined && this.innerWidth !== options.width) ||
				(options.height !== undefined && this.innerHeight !== options.height)
			) {
				if (options.width !== undefined && this.innerWidth !== options.width) {
					(<number>this.innerWidth) = options.width;
					(<number>this.outerWidth) = options.width;
				}

				if (options.height !== undefined && this.innerHeight !== options.height) {
					(<number>this.innerHeight) = options.height;
					(<number>this.outerHeight) = options.height;
				}

				this.dispatchEvent(new Event('resize'));
			}
		},
		virtualConsolePrinter: null,
		settings: {
			disableJavaScriptEvaluation: false,
			disableJavaScriptFileLoading: false,
			disableCSSFileLoading: false,
			disableIframePageLoading: false,
			disableComputedStyleRendering: false,
			disableErrorCapturing: false,
			enableFileSystemHttpRequests: false,
			navigator: {
				userAgent: `Mozilla/5.0 (X11; AppleWebKit/537.36 (KHTML, like Gecko) HappyDOM/${PackageVersion.version}`
			},
			device: {
				prefersColorScheme: 'light',
				mediaType: 'screen'
			}
		},
		setInnerWidth: (width: number): void => this.happyDOM.setWindowSize({ width }),
		setInnerHeight: (height: number): void => this.happyDOM.setWindowSize({ height })
	};

	// Nodes
	public readonly Node = Node;
	public readonly Attr = Attr;
	public readonly SVGSVGElement = SVGSVGElement;
	public readonly SVGElement = SVGElement;
	public readonly SVGGraphicsElement = SVGGraphicsElement;
	public readonly Text = Text;
	public readonly Comment = Comment;
	public readonly ShadowRoot = ShadowRoot;
	public readonly ProcessingInstruction = ProcessingInstruction;
	public readonly Element = Element;
	public readonly CharacterData = CharacterData;
	public readonly Document = Document;
	public readonly HTMLDocument = HTMLDocument;
	public readonly XMLDocument = XMLDocument;
	public readonly SVGDocument = SVGDocument;

	// Element classes
	public readonly HTMLElement = HTMLElement;
	public readonly HTMLUnknownElement = HTMLUnknownElement;
	public readonly HTMLTemplateElement = HTMLTemplateElement;
	public readonly HTMLImageElement = HTMLImageElement;
	public readonly HTMLStyleElement = HTMLStyleElement;
	public readonly HTMLSlotElement = HTMLSlotElement;
	public readonly HTMLMetaElement = HTMLMetaElement;
	public readonly HTMLMediaElement = HTMLMediaElement;
	public readonly HTMLAudioElement = HTMLAudioElement;
	public readonly HTMLVideoElement = HTMLVideoElement;
	public readonly HTMLBaseElement = HTMLBaseElement;
	public readonly HTMLDialogElement = HTMLDialogElement;

	// Non-implemented element classes
	public readonly HTMLHeadElement = HTMLElement;
	public readonly HTMLTitleElement = HTMLElement;
	public readonly HTMLBodyElement = HTMLElement;
	public readonly HTMLHeadingElement = HTMLElement;
	public readonly HTMLParagraphElement = HTMLElement;
	public readonly HTMLHRElement = HTMLElement;
	public readonly HTMLPreElement = HTMLElement;
	public readonly HTMLUListElement = HTMLElement;
	public readonly HTMLOListElement = HTMLElement;
	public readonly HTMLLIElement = HTMLElement;
	public readonly HTMLMenuElement = HTMLElement;
	public readonly HTMLDListElement = HTMLElement;
	public readonly HTMLDivElement = HTMLElement;
	public readonly HTMLAreaElement = HTMLElement;
	public readonly HTMLBRElement = HTMLElement;
	public readonly HTMLButtonElement = HTMLElement;
	public readonly HTMLCanvasElement = HTMLElement;
	public readonly HTMLDataElement = HTMLElement;
	public readonly HTMLDataListElement = HTMLElement;
	public readonly HTMLDetailsElement = HTMLElement;
	public readonly HTMLDirectoryElement = HTMLElement;
	public readonly HTMLFieldSetElement = HTMLElement;
	public readonly HTMLFontElement = HTMLElement;
	public readonly HTMLHtmlElement = HTMLElement;
	public readonly HTMLLegendElement = HTMLElement;
	public readonly HTMLMapElement = HTMLElement;
	public readonly HTMLMarqueeElement = HTMLElement;
	public readonly HTMLMeterElement = HTMLElement;
	public readonly HTMLModElement = HTMLElement;
	public readonly HTMLOutputElement = HTMLElement;
	public readonly HTMLPictureElement = HTMLElement;
	public readonly HTMLProgressElement = HTMLElement;
	public readonly HTMLQuoteElement = HTMLElement;
	public readonly HTMLSourceElement = HTMLElement;
	public readonly HTMLSpanElement = HTMLElement;
	public readonly HTMLTableCaptionElement = HTMLElement;
	public readonly HTMLTableCellElement = HTMLElement;
	public readonly HTMLTableColElement = HTMLElement;
	public readonly HTMLTableElement = HTMLElement;
	public readonly HTMLTimeElement = HTMLElement;
	public readonly HTMLTableRowElement = HTMLElement;
	public readonly HTMLTableSectionElement = HTMLElement;
	public readonly HTMLFrameElement = HTMLElement;
	public readonly HTMLFrameSetElement = HTMLElement;
	public readonly HTMLEmbedElement = HTMLElement;
	public readonly HTMLObjectElement = HTMLElement;
	public readonly HTMLParamElement = HTMLElement;
	public readonly HTMLTrackElement = HTMLElement;

	// Events classes
	public readonly Event = Event;
	public readonly UIEvent = UIEvent;
	public readonly CustomEvent = CustomEvent;
	public readonly AnimationEvent = AnimationEvent;
	public readonly KeyboardEvent = KeyboardEvent;
	public readonly MessageEvent = MessageEvent;
	public readonly MouseEvent = MouseEvent;
	public readonly PointerEvent = PointerEvent;
	public readonly FocusEvent = FocusEvent;
	public readonly WheelEvent = WheelEvent;
	public readonly ErrorEvent = ErrorEvent;
	public readonly StorageEvent = StorageEvent;
	public readonly SubmitEvent = SubmitEvent;
	public readonly ProgressEvent = ProgressEvent;
	public readonly MediaQueryListEvent = MediaQueryListEvent;

	// Non-implemented event classes
	public readonly AudioProcessingEvent = Event;
	public readonly BeforeInputEvent = Event;
	public readonly BeforeUnloadEvent = Event;
	public readonly BlobEvent = Event;
	public readonly CloseEvent = Event;
	public readonly CompositionEvent = Event;
	public readonly CSSFontFaceLoadEvent = Event;
	public readonly DeviceLightEvent = Event;
	public readonly DeviceMotionEvent = Event;
	public readonly DeviceOrientationEvent = Event;
	public readonly DeviceProximityEvent = Event;
	public readonly DOMTransactionEvent = Event;
	public readonly DragEvent = Event;
	public readonly EditingBeforeInputEvent = Event;
	public readonly FetchEvent = Event;
	public readonly GamepadEvent = Event;
	public readonly HashChangeEvent = Event;
	public readonly IDBVersionChangeEvent = Event;
	public readonly MediaStreamEvent = Event;
	public readonly MutationEvent = Event;
	public readonly OfflineAudioCompletionEvent = Event;
	public readonly OverconstrainedError = Event;
	public readonly PageTransitionEvent = Event;
	public readonly PaymentRequestUpdateEvent = Event;
	public readonly PopStateEvent = Event;
	public readonly RelatedEvent = Event;
	public readonly RTCDataChannelEvent = Event;
	public readonly RTCIdentityErrorEvent = Event;
	public readonly RTCIdentityEvent = Event;
	public readonly RTCPeerConnectionIceEvent = Event;
	public readonly SensorEvent = Event;
	public readonly SVGEvent = Event;
	public readonly SVGZoomEvent = Event;
	public readonly TimeEvent = Event;
	public readonly TouchEvent = Event;
	public readonly TrackEvent = Event;
	public readonly TransitionEvent = Event;
	public readonly UserProximityEvent = Event;
	public readonly WebGLContextEvent = Event;
	public readonly TextEvent = Event;

	// Other classes
	public readonly NamedNodeMap = NamedNodeMap;
	public readonly NodeFilter = NodeFilter;
	public readonly NodeIterator = NodeIterator;
	public readonly TreeWalker = TreeWalker;
	public readonly MutationObserver = MutationObserver;
	public readonly MutationRecord = MutationRecord;
	public readonly EventTarget = EventTarget;
	public readonly MessagePort = MessagePort;
	public readonly CustomElementRegistry = CustomElementRegistry;
	public readonly Window = <typeof Window>this.constructor;
	public readonly XMLSerializer = XMLSerializer;
	public readonly ResizeObserver = ResizeObserver;
	public readonly CSSStyleSheet = CSSStyleSheet;
	public readonly DOMException = DOMException;
	public readonly History = History;
	public readonly Screen = Screen;
	public readonly Storage = Storage;
	public readonly HTMLCollection = HTMLCollection;
	public readonly NodeList = NodeList;
	public readonly CSSUnitValue = CSSUnitValue;
	public readonly CSSRule = CSSRule;
	public readonly CSSContainerRule = CSSContainerRule;
	public readonly CSSFontFaceRule = CSSFontFaceRule;
	public readonly CSSKeyframeRule = CSSKeyframeRule;
	public readonly CSSKeyframesRule = CSSKeyframesRule;
	public readonly CSSMediaRule = CSSMediaRule;
	public readonly CSSStyleRule = CSSStyleRule;
	public readonly CSSSupportsRule = CSSSupportsRule;
	public readonly Selection = Selection;
	public readonly Navigator = Navigator;
	public readonly MimeType = MimeType;
	public readonly MimeTypeArray = MimeTypeArray;
	public readonly Plugin = Plugin;
	public readonly PluginArray = PluginArray;
	public readonly DOMRect: typeof DOMRect;
	public readonly Permissions = Permissions;
	public readonly PermissionStatus = PermissionStatus;
	public readonly DOMParser: typeof DOMParserImplementation;
	public readonly Range;
	public readonly FileReader;
	public readonly Image;
	public readonly DocumentFragment;
	public readonly Audio;
	public readonly CSSStyleDeclaration = CSSStyleDeclaration;

	// Events
	public onload: (event: Event) => void = null;
	public onerror: (event: ErrorEvent) => void = null;

	// Public properties.
	public readonly document: Document;
	public readonly customElements: CustomElementRegistry;
	public readonly history: History;
	public readonly navigator: Navigator;
	public readonly console: Omit<Console, 'Console'>;
	public readonly self = this;
	public readonly top = this;
	public readonly parent = this;
	public readonly window = this;
	public readonly globalThis = this;
	public readonly screen: Screen;
	public readonly devicePixelRatio = 1;
	public readonly sessionStorage: Storage;
	public readonly localStorage: Storage;
	public readonly innerWidth: number = 1024;
	public readonly innerHeight: number = 768;
	public readonly outerWidth: number = 1024;
	public readonly outerHeight: number = 768;

	// Node.js Globals
	public Array: typeof Array;
	public ArrayBuffer: typeof ArrayBuffer;
	public Boolean: typeof Boolean;
	public DataView: typeof DataView;
	public Date: typeof Date;
	public Error: typeof Error;
	public EvalError: typeof EvalError;
	public Float32Array: typeof Float32Array;
	public Float64Array: typeof Float64Array;
	public Function: typeof Function;
	public Infinity: typeof Infinity;
	public Int16Array: typeof Int16Array;
	public Int32Array: typeof Int32Array;
	public Int8Array: typeof Int8Array;
	public Intl: typeof Intl;
	public JSON: typeof JSON;
	public Map: MapConstructor;
	public Math: typeof Math;
	public NaN: typeof NaN;
	public Number: typeof Number;
	public Object: typeof Object;
	public Promise: typeof Promise;
	public RangeError: typeof RangeError;
	public ReferenceError: typeof ReferenceError;
	public RegExp: typeof RegExp;
	public Set: SetConstructor;
	public String: typeof String;
	public Symbol: Function;
	public SyntaxError: typeof SyntaxError;
	public TypeError: typeof TypeError;
	public URIError: typeof URIError;
	public Uint16Array: typeof Uint16Array;
	public Uint32Array: typeof Uint32Array;
	public Uint8Array: typeof Uint8Array;
	public Uint8ClampedArray: typeof Uint8ClampedArray;
	public WeakMap: WeakMapConstructor;
	public WeakSet: WeakSetConstructor;
	public decodeURI: typeof decodeURI;
	public decodeURIComponent: typeof decodeURIComponent;
	public encodeURI: typeof encodeURI;
	public encodeURIComponent: typeof encodeURIComponent;
	public eval: typeof eval;
	/**
	 * @deprecated
	 */
	public escape: (str: string) => string;
	public global: typeof globalThis;
	public isFinite: typeof isFinite;
	public isNaN: typeof isNaN;
	public parseFloat: typeof parseFloat;
	public parseInt: typeof parseInt;
	public undefined: typeof undefined;
	/**
	 * @deprecated
	 */
	public unescape: (str: string) => string;
	public gc: () => void;
	public v8debug?: unknown;

	// Public internal properties

	// Used for tracking capture event listeners to improve performance when they are not used.
	// See EventTarget class.
	public _captureEventListenerCount: { [eventType: string]: number } = {};

	/**
	 * Constructor.
	 *
	 * @param [options] Options.
	 * @param [options.width] Window width. Defaults to "1024".
	 * @param [options.height] Window height. Defaults to "768".
	 * @param [options.innerWidth] Inner width. Deprecated. Defaults to "1024".
	 * @param [options.innerHeight] Inner height. Deprecated. Defaults to "768".
	 * @param [options.url] URL.
	 * @param [options.settings] Settings.
	 */
	constructor(options?: IHappyDOMOptions) {
		super();

		this.customElements = new CustomElementRegistry();
		this.navigator = new Navigator(this);
		this.history = new History();
		this.screen = new Screen();
		this.sessionStorage = new Storage();
		this.localStorage = new Storage();

		if (options) {
			if (options.width !== undefined) {
				this.innerWidth = options.width;
				this.outerWidth = options.width;
			} else if (options.innerWidth !== undefined) {
				this.innerWidth = options.innerWidth;
				this.outerWidth = options.innerWidth;
			}

			if (options.height !== undefined) {
				this.innerHeight = options.height;
				this.outerHeight = options.height;
			} else if (options.innerHeight !== undefined) {
				this.innerHeight = options.innerHeight;
				this.outerHeight = options.innerHeight;
			}

			if (options.settings) {
				this.happyDOM.settings = {
					...this.happyDOM.settings,
					...options.settings,
					navigator: {
						...this.happyDOM.settings.navigator,
						...options.settings.navigator
					},
					device: {
						...this.happyDOM.settings.device,
						...options.settings.device
					}
				};
			}
		}

		if (options && options.console) {
			this.console = options.console;
		} else {
			this.happyDOM.virtualConsolePrinter = new VirtualConsolePrinter();
			this.console = new VirtualConsole(this.happyDOM.virtualConsolePrinter);
		}

		// Binds all methods to "this", so that it will use the correct context when called globally.
		for (const key of Object.getOwnPropertyNames(Window.prototype).concat(
			Object.getOwnPropertyNames(EventTarget.prototype)
		)) {
			if (
				key !== 'constructor' &&
				key[0] !== '_' &&
				key[0] === key[0].toLowerCase() &&
				typeof this[key] === 'function'
			) {
				this[key] = this[key].bind(this);
			}
		}

		HTMLDocument._defaultView = this;
		HTMLDocument._windowClass = Window;

		const document = new HTMLDocument();

		this.document = document;

		// We need to set the correct owner document when the class is constructed.
		// To achieve this we will extend the original implementation with a class that sets the owner document.

		ImageImplementation._ownerDocument = document;
		DocumentFragmentImplementation._ownerDocument = document;
		DOMParserImplementation._ownerDocument = document;
		RangeImplementation._ownerDocument = document;

		/* eslint-disable jsdoc/require-jsdoc */
		class Image extends ImageImplementation {
			public static _ownerDocument: IDocument = document;
		}
		class DocumentFragment extends DocumentFragmentImplementation {
			public static _ownerDocument: IDocument = document;
		}
		class DOMParser extends DOMParserImplementation {
			public static _ownerDocument: IDocument = document;
		}
		class Range extends RangeImplementation {
			public static _ownerDocument: IDocument = document;
		}
		class Audio extends AudioImplementation {
			public static _ownerDocument: IDocument = document;
		}
		/* eslint-enable jsdoc/require-jsdoc */

		this.Image = Image;
		this.DocumentFragment = DocumentFragment;
		this.DOMParser = DOMParser;
		this.Range = Range;
		this.Audio = Audio;

		this.document._onWindowReady();
	}

	/**
	 * The number of pixels that the document is currently scrolled horizontally
	 *
	 * @returns number
	 */
	public get scrollX(): number {
		return this.document?.documentElement?.scrollLeft ?? 0;
	}

	/**
	 * The read-only Window property pageXOffset is an alias for scrollX.
	 *
	 * @returns number
	 */
	public get pageXOffset(): number {
		return this.scrollX;
	}

	/**
	 * The number of pixels that the document is currently scrolled vertically
	 *
	 * @returns number
	 */
	public get scrollY(): number {
		return this.document?.documentElement?.scrollTop ?? 0;
	}

	/**
	 * The read-only Window property pageYOffset is an alias for scrollY.
	 *
	 * @returns number
	 */
	public get pageYOffset(): number {
		return this.scrollY;
	}

	/**
	 * The CSS interface holds useful CSS-related methods.
	 *
	 * @returns CSS interface.
	 */
	public get CSS(): CSS {
		return new CSS();
	}

	/**
	 * Returns an object containing the values of all CSS properties of an element.
	 *
	 * @param element Element.
	 * @returns CSS style declaration.
	 */
	public getComputedStyle(element: IElement): CSSStyleDeclaration {
		element['_computedStyle'] = element['_computedStyle'] || new CSSStyleDeclaration(element, true);
		return element['_computedStyle'];
	}

	/**
	 * Returns selection.
	 *
	 * @returns Selection.
	 */
	public getSelection(): Selection {
		return this.document.getSelection();
	}

	/**
	 * Scrolls to a particular set of coordinates.
	 *
	 * @param x X position or options object.
	 * @param y Y position.
	 */
	public scroll(x: { top?: number; left?: number; behavior?: string } | number, y?: number): void {
		if (typeof x === 'object') {
			if (x.behavior === 'smooth') {
				throw new Error("Scroll behavior 'smooth' is not supported.");
			} else {
				if (x.top !== undefined) {
					(<number>this.document.documentElement.scrollTop) = x.top;
				}
				if (x.left !== undefined) {
					(<number>this.document.documentElement.scrollLeft) = x.left;
				}
			}
		} else if (x !== undefined && y !== undefined) {
			(<number>this.document.documentElement.scrollLeft) = x;
			(<number>this.document.documentElement.scrollTop) = y;
		}
	}

	/**
	 * Scrolls to a particular set of coordinates.
	 *
	 * @param x X position or options object.
	 * @param y Y position.
	 */
	public scrollTo(
		x: { top?: number; left?: number; behavior?: string } | number,
		y?: number
	): void {
		this.scroll(x, y);
	}

	/**
	 * Returns a new MediaQueryList object that can then be used to determine if the document matches the media query string.
	 *
	 * @param mediaQueryString A string specifying the media query to parse into a MediaQueryList.
	 * @returns A new MediaQueryList.
	 */
	public matchMedia(mediaQueryString: string): MediaQueryList {
		return new MediaQueryList({ ownerWindow: this, media: mediaQueryString });
	}

	/**
	 * Creates a Base64-encoded ASCII string from a binary string (i.e., a string in which each character in the string is treated as a byte of binary data).
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/btoa
	 * @param data Binay data.
	 * @returns Base64-encoded string.
	 */
	public btoa(data: unknown): string {
		return Base64.btoa(data);
	}

	/**
	 * Decodes a string of data which has been encoded using Base64 encoding.
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/atob
	 * @see https://infra.spec.whatwg.org/#forgiving-base64-encode.
	 * @see Https://html.spec.whatwg.org/multipage/webappapis.html#btoa.
	 * @param data Binay string.
	 * @returns An ASCII string containing decoded data from encodedData.
	 */
	public atob(data: unknown): string {
		return Base64.atob(data);
	}
}
