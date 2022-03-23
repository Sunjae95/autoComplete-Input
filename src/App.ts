import AutoCompleteInput from './component/AutoComplete';
import Results from './component/Results';
import { AppState, Result } from './util/types';
import { BASE_URL, getNextFocus } from './util/index';

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

    if (this.timer !== null) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(async () => {
      if (!value) {
        this.setState({
          ...this.state,
          content: value,
          focusNumber: 0,
          results: [],
        });

        return;
      }

      let nextState: AppState;
      try {
        const res = await fetch(`${BASE_URL}${value}`, {
          cache: 'force-cache',
        });
        const results: Result[] = await res.json();

        nextState = {
          ...this.state,
          content: value,
          focusNumber: 0,
          results,
        };
      } catch {
        nextState = {
          ...this.state,
          content: value,
          focusNumber: 0,
          results: [],
        };
      }

      this.setState(nextState);
    }, 300);
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

  switchFocus(key: string): void {
    const { focusNumber, results } = this.state;
    const nextFocus = getNextFocus({
      key,
      nowFocus: focusNumber,
      maxLength: results.length,
    });

    if (nextFocus === null) return;

    const nextState = { ...this.state, focusNumber: nextFocus };

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
