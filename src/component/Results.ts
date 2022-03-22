import { Result } from '../util/types';
import { createDom } from '../util/index';

interface ResultsProps {
  $target: HTMLElement;
  initialState: ResultsState;
}
interface ResultsState {
  isFocus: boolean;
  results: Result[];
  focusNumber: number;
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
    if (this.state.isFocus && this.$result.classList.contains('disable')) {
      this.$result.classList.remove('disable');
    } else if (
      !this.state.isFocus &&
      !this.$result.classList.contains('disable')
    ) {
      this.$result.classList.add('disable');
    }

    this.$result.innerHTML = `
        ${this.state.results
          .map(
            (result, i) =>
              `<li class="results__item ${
                i === this.state.focusNumber && 'isFocus'
              }"><span>${result.text}</span><li>`
          )
          .join('')}
      `;
  }
}

export default Results;
