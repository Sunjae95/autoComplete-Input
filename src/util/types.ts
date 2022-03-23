export interface Result {
  text: string;
  id: number;
}
export interface AppState {
  content: string;
  focusNumber: number;
  results: Result[];
  isFocus: boolean;
}

export enum Direction {
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight',
}

export type DomType = {
  tag: string;
  className: string;
};

export type NextFocusType = {
  key: keyof typeof Direction;
  nowFocus: number;
  maxLength: number;
};

export type AutoCompleteState = Pick<AppState, 'content'>;

export type ResultsState = Omit<AppState, 'content'>;
