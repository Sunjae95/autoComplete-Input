import AutoCompleteInput from './component/AutoCompleteInput';
import Results from './component/Results';
import { Result } from './util/types';
import { BASE_URL } from './util/index';

interface AppState {
  content: string;
  results: Result[];
}

class App {
  state: AppState;
  input: AutoCompleteInput;
  results: Results;

  constructor($target: HTMLElement) {
    this.state = {
      content: '',
      results: [],
    };
    this.input = new AutoCompleteInput({
      $target,
      handleInput: this.handleInput.bind(this),
    });
    this.results = new Results({ $target, results: this.state.results });
  }

  setState(nextState: AppState) {
    this.state = nextState;
    this.render();
  }

  render() {
    this.results.setState(this.state.results);
  }

  async handleInput(e: Event): Promise<void> {
    const { value } = e.target as HTMLInputElement;
    const nextContentState = { ...this.state, content: value };

    this.setState(nextContentState);

    const { content } = this.state;
    try {
      const res = await fetch(`${BASE_URL}${content}`);
      const results: Result[] = await res.json();
      const nextResults = { ...this.state, results };

      this.setState(nextResults);
    } catch {
      const nextResults = { ...this.state, results: [] };
      this.setState(nextResults);
    }

    console.log(this.state);
  }
}

export default App;
