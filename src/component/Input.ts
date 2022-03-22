import { createDom } from '../util/index';

interface InputProps {
  $target: HTMLElement;
  content: string;
  handleInput: (e: KeyboardEvent) => void;
  switchFocus: (key: string) => void;
}

interface InputState {
  content: string;
}

class Input {
  $input = createDom({
    tag: 'input',
    className: 'autoComplete__input',
  }) as HTMLInputElement;
  state: InputState = { content: '' };

  constructor({ $target, handleInput, switchFocus }: InputProps) {
    this.$input.setAttribute('type', 'text');
    this.$input.setAttribute('placeholder', '제목, 감독, 배우로 검색');
    this.$input.addEventListener('keydown', (e: KeyboardEvent) => {
      console.log('keydownEvent', e.key);
      switch (e.key) {
        case 'ArrowUp':
        case 'ArrowDown':
        case 'Enter': {
          console.log('keydownEvent switchFocus');
          e.preventDefault();

          switchFocus(e.key);
          break;
        }
      }
    });
    this.$input.addEventListener('keyup', (e: KeyboardEvent) => {
      console.log('keyUpEvent');
      switch (e.key) {
        case 'ArrowUp':
        case 'ArrowRight':
        case 'ArrowLeft':
        case 'ArrowDown': {
          return;
        }
        default: {
          console.log('keyUpEvent handleInput');
          handleInput(e);
        }
      }
    });

    $target.appendChild(this.$input);
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    this.$input.value = this.state.content;
  }
}

export default Input;
