import AutoCompleteInput from './component/AutoComplete';
import Results from './component/Results';
import { AppState, Direction } from './util/types';
import { debounceInput, getNextFocus } from './util/function';

class App {
  state: AppState = {
    content: '',
    isFocus: true,
    focusNumber: 0,
    results: [],
  };
  autoComplete: AutoCompleteInput;
  results: Results;
  timer: null | ReturnType<typeof setTimeout> = null;

  constructor($target: HTMLElement) {
    this.autoComplete = new AutoCompleteInput({
      $target,
      content: this.state.content,
      handleInput: this.handleInput.bind(this),
      switchFocus: this.switchFocus.bind(this),
      clearInput: this.clearInput.bind(this),
      focusInput: this.focusInput.bind(this),
      outFocusInput: this.outFocusInput.bind(this),
    });
    this.results = new Results({
      $target,
      isFocus: this.state.isFocus,
      results: this.state.results,
      focusNumber: this.state.focusNumber,
    });
  }

  setState(nextState: AppState) {
    this.state = nextState;
    this.render();
  }

  render() {
    this.autoComplete.setState({ content: this.state.content });
    this.results.setState({
      isFocus: this.state.isFocus,
      results: this.state.results,
      focusNumber: this.state.focusNumber,
    });
  }

  handleInput(e: KeyboardEvent): void {
    const { value } = e.target as HTMLInputElement;
    debounceInput.call(this, value);
  }

  clearInput(): void {
    const nextState = {
      ...this.state,
      content: '',
      focusNumber: 0,
      results: [],
    };
    this.setState(nextState);
  }

  switchFocus(key: Direction): void {
    const nextState = getNextFocus.call(this, key);
    this.setState(nextState);
  }

  focusInput(): void {
    const nextState = { ...this.state, isFocus: true };
    this.setState(nextState);
  }

  outFocusInput(): void {
    const nextState = { ...this.state, isFocus: false };
    this.setState(nextState);
  }
}

export default App;
