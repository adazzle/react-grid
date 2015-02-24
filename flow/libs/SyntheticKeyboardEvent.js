declare class SyntheticEvent {
  bubbles: boolean;
  cancelable: boolean;
  currentTarget: EventTarget;
  defaultPrevented: boolean;
  eventPhase: number;
  isTrusted: boolean;
  nativeEvent: Event;
  preventDefault(): void;
  stopPropagation(): void;
  target: EventTarget;
  timeStamp: number;
  type: string;
}


declare class SyntheticKeyboardEvent extends SyntheticEvent {
  altKey: boolean;
  charCode: number;
  ctrlKey: boolean;
  getModifierState: (key: string) => void;
  key: string;
  keyCode: number;
  locale: string;
  location: number;
  metaKey: boolean;
  repeat: boolean;
  shiftKey: boolean;
  which: number;
}


declare class SyntheticMouseEvent extends SyntheticEvent {
  button: number;
  buttons: number;
  clientX: number;
  clientY: number;
  pageX: number;
  pageY: number;
  screenX: number;
  screenY: number;
  relatedTarget: EventTarget;

  getModifierState: (key: string) => void;
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
}

declare class HTMLInputElement extends HTMLElement {
checked: boolean;
}
