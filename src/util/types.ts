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

export interface AutoCompleteState extends Pick<AppState, 'content'> {}

export interface ResultsState extends Omit<AppState, 'content'> {}
