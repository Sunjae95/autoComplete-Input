import AutoCompleteInput from './component/AutoComplete';
import Results from './component/Results';
import { Result } from './util/types';
import { BASE_URL, getNextFocus } from './util/index';

interface AppState {
  content: string;
  isFocus: number;
  results: Result[];
}

class App {
  state: AppState;
  autoComplete: AutoCompleteInput;
  results: Results;
  timer: number | null;

  constructor($target: HTMLElement) {
    this.state = {
      content: '',
      isFocus: 0,
      results: [],
    };
    this.timer = null;
    this.autoComplete = new AutoCompleteInput({
      $target,
      content: this.state.content,
      handleInput: this.handleInput.bind(this),
      switchFocus: this.switchFocus.bind(this),
      clearInput: this.clearInput.bind(this),
    });
    this.results = new Results({
      $target,
      initialState: {
        results: this.state.results,
        isFocus: this.state.isFocus,
      },
    });
  }

  setState(nextState: AppState) {
    this.state = nextState;
    this.render();
  }

  render() {
    this.autoComplete.setState({ content: this.state.content });
    this.results.setState({
      results: this.state.results,
      isFocus: this.state.isFocus,
    });
  }

  handleInput(e: KeyboardEvent) {
    const { value } = e.target as HTMLInputElement;

    if (this.timer !== null) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(async () => {
      let nextState;

      try {
        const res = await fetch(`${BASE_URL}${value}`);
        const results: Result[] = await res.json();
        nextState = { content: value, isFocus: 0, results };
      } catch {
        nextState = { content: value, isFocus: 0, results: [] };
      }

      this.setState(nextState);
    }, 300);
  }

  clearInput(): void {
    const nextState = {
      content: '',
      isFocus: 0,
      results: [],
    };
    this.setState(nextState);
  }

  switchFocus(key: string): void {
    const { isFocus, results } = this.state;
    const nextFocus = getNextFocus({
      key,
      nowFocus: isFocus,
      maxLength: results.length,
    });

    if (nextFocus === null) return;

    const nextState = { ...this.state, isFocus: nextFocus };

    this.setState(nextState);
  }
}

export default App;
