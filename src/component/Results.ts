import { Result } from '../util/types';
import { createDom } from '../util/index';

interface ResultsState {
  results: Result[];
  isFocus: number;
}
interface ResultsProps {
  $target: HTMLElement;
  initialState: ResultsState;
}
class Results {
  state: ResultsState;
  $result = createDom({ tag: 'ul', className: 'results' });

  constructor({ $target, initialState }: ResultsProps) {
    this.state = initialState;
    $target.appendChild(this.$result);
  }

  setState(nextState: ResultsState) {
    this.state = nextState;
    this.render();
  }

  render() {
    this.$result.innerHTML = `
        ${this.state.results
          .map(
            (result, i) =>
              `<li class="results__item ${
                i === this.state.isFocus && 'isFocus'
              }"><span>${result.text}</span><li>`
          )
          .join('')}
      `;
  }
}

export default Results;
