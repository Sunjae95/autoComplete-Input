import { createDom } from '../util/index';

interface ClearBtnProps {
  $target: HTMLElement;
  content: string;
  clearInput: () => void;
}

interface ClearBtnState {
  content: string;
}

class ClearBtn {
  $button = createDom({
    tag: 'div',
    className: 'autoComplete__clear-btn disable',
  });
  state: ClearBtnState;

  constructor({ $target, content, clearInput }: ClearBtnProps) {
    this.state = { content };
    $target.appendChild(this.$button);
    this.$button.addEventListener('click', clearInput);
    this.$button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="css-1orrb02-IcClear"><path fill="currentColor" fill-rule="evenodd" d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm-8.12-3.96a.764.764 0 011.08 1.08L13.08 12l2.88 2.88a.764.764 0 01-1.08 1.08L12 13.08l-2.88 2.88a.764.764 0 01-1.08-1.08L10.92 12 8.04 9.12a.764.764 0 011.08-1.08L12 10.92l2.88-2.88z" clip-rule="evenodd"></path></svg>`;
  }

  setState(nextState: ClearBtnState) {
    this.state = nextState;
    this.render();
  }

  render() {
    if (this.state.content && this.$button.classList.contains('disable')) {
      this.$button.classList.remove('disable');
    } else if (
      !this.state.content &&
      !this.$button.classList.contains('disable')
    ) {
      this.$button.classList.add('disable');
    }
  }
}

export default ClearBtn;
