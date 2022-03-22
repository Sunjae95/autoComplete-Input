import { Result } from '../util/types';
import { createDom } from '../util/index';

interface ResultsProps {
  $target: HTMLElement;
  results: Result[];
}

class Results {
  results: Result[];
  $result = createDom({ tag: 'ul', className: 'results' });

  constructor({ $target, results }: ResultsProps) {
    this.results = results;

    $target.appendChild(this.$result);
  }

  setState(nextState: Result[]) {
    this.results = nextState;
    this.render();
  }

  render() {
    this.$result.innerHTML = `
        ${this.results
          .map((result) => `<li>${result.text} ${result.id}<li>`)
          .join('')}
      `;
  }
}

export default Results;
