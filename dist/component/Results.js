import { createDom, DISABLE } from '../util/index.js';
class Results {
    constructor({ $target, isFocus, results, focusNumber }) {
        this.$result = createDom({ tag: 'ul', className: 'results' });
        this.state = { isFocus, results, focusNumber };
        $target.appendChild(this.$result);
    }
    setState(nextState) {
        this.state = nextState;
        this.render();
    }
    render() {
        if (this.state.isFocus && this.$result.classList.contains(DISABLE)) {
            this.$result.classList.remove(DISABLE);
        }
        else if (!this.state.isFocus &&
            !this.$result.classList.contains(DISABLE)) {
            this.$result.classList.add(DISABLE);
        }
        this.$result.innerHTML = `
        ${this.state.results
            .map((result, i) => `<li class="results__item ${i === this.state.focusNumber && 'isFocus'}"><span>${result.text}</span><li>`)
            .join('')}
      `;
    }
}
export default Results;
//# sourceMappingURL=Results.js.map