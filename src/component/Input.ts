import { createDom } from '../util/index';
import { AutoCompleteState } from '../util/types';

interface InputProps extends AutoCompleteState {
  $target: HTMLElement;
  handleInput: (e: KeyboardEvent) => void;
  switchFocus: (key: string) => void;
  focusInput: () => void;
  outFocusInput: () => void;
}

class Input {
  $input = createDom({
    tag: 'input',
    className: 'autoComplete__input',
  }) as HTMLInputElement;
  state: AutoCompleteState = { content: '' };

  constructor({
    $target,
    handleInput,
    switchFocus,
    focusInput,
    outFocusInput,
  }: InputProps) {
    this.$input.setAttribute('type', 'text');
    this.$input.setAttribute('placeholder', '제목, 감독, 배우로 검색');
    this.$input.addEventListener('keydown', (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'ArrowDown':
        case 'Enter': {
          e.preventDefault();
          switchFocus(e.key);
          break;
        }
      }
    });
    this.$input.addEventListener('keyup', (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'ArrowRight':
        case 'ArrowLeft':
        case 'ArrowDown': {
          return;
        }
        default: {
          handleInput(e);
        }
      }
    });
    this.$input.onfocus = focusInput;
    this.$input.onblur = outFocusInput;

    $target.appendChild(this.$input);
  }

  setState(nextState: AutoCompleteState) {
    this.state = nextState;
    this.render();
  }

  render() {
    if (!this.state.content) {
      this.$input.value = '';
    }
  }
}

export default Input;
