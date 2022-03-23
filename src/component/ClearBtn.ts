import { CLEAR_ICON, createDom, DISABLE } from '../util/index';
import { AutoCompleteState } from '../util/types';

interface ClearBtnProps extends AutoCompleteState {
  $target: HTMLElement;
  clearInput: () => void;
}

class ClearBtn {
  $button = createDom({
    tag: 'div',
    className: 'autoComplete__clear-btn disable',
  });
  state: AutoCompleteState;

  constructor({ $target, content, clearInput }: ClearBtnProps) {
    this.state = { content };
    $target.appendChild(this.$button);
    this.$button.addEventListener('click', clearInput);
    this.$button.innerHTML = CLEAR_ICON;
  }

  setState(nextState: AutoCompleteState) {
    this.state = nextState;
    this.render();
  }

  render() {
    if (this.state.content && this.$button.classList.contains(DISABLE)) {
      this.$button.classList.remove(DISABLE);
    } else if (
      !this.state.content &&
      !this.$button.classList.contains(DISABLE)
    ) {
      this.$button.classList.add(DISABLE);
    }
  }
}

export default ClearBtn;
