import { ResultsState } from '../util/types';
import { DISABLE } from '../util/constant';
import { createDom } from '../util/function';

interface ResultsProps extends ResultsState {
  $target: HTMLElement;
}
class Results {
  state: ResultsState;
  $result = createDom({ tag: 'ul', className: 'results' });

  constructor({ $target, isFocus, results, focusNumber }: ResultsProps) {
    this.state = { isFocus, results, focusNumber };
    $target.appendChild(this.$result);
  }

  setState(nextState: ResultsState) {
    this.state = nextState;
    this.render();
  }

  render() {
    if (this.state.isFocus && this.$result.classList.contains(DISABLE)) {
      this.$result.classList.remove(DISABLE);
    } else if (
      !this.state.isFocus &&
      !this.$result.classList.contains(DISABLE)
    ) {
      this.$result.classList.add(DISABLE);
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
