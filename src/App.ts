import AutoCompleteInput from './component/AutoCompleteInput';
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
  input: AutoCompleteInput;
  results: Results;

  constructor($target: HTMLElement) {
    this.state = {
      content: '',
      isFocus: 0,
      results: [],
    };
    this.input = new AutoCompleteInput({
      $target,
      handleInput: this.handleInput.bind(this),
      switchFocus: this.switchFocus.bind(this),
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
    this.results.setState({
      results: this.state.results,
      isFocus: this.state.isFocus,
    });
  }

  async handleInput(e: KeyboardEvent): Promise<void> {
    const { value } = e.target as HTMLInputElement;
    const nextContentState = { ...this.state, content: value };

    this.setState(nextContentState);

    const { content } = this.state;
    try {
      const res = await fetch(`${BASE_URL}${content}`);
      const results: Result[] = await res.json();
      const nextResults = { ...this.state, isFocus: 0, results };

      this.setState(nextResults);
    } catch {
      const nextResults = { ...this.state, isFocus: 0, results: [] };
      this.setState(nextResults);
    }
  }

  switchFocus(key: string): void {
    const { isFocus, results } = this.state;
    const nextFocus = getNextFocus({
      key,
      nowFocus: isFocus,
      maxLength: results.length,
    });
    const nextState = { ...this.state, isFocus: nextFocus };

    this.setState(nextState);
  }
}

export default App;
