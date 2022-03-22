import { createDom } from '../util/index';

interface AutoCompleteInputProps {
  $target: HTMLElement;
  handleInput: (e: KeyboardEvent) => void;
  switchFocus: (key: string) => void;
}

class AutoCompleteInput {
  $input = createDom({ tag: 'input', className: 'input' });

  constructor({ $target, handleInput, switchFocus }: AutoCompleteInputProps) {
    this.$input.setAttribute('type', 'text');
    this.$input.setAttribute('placeholder', '제목, 감독, 배우로 검색');
    this.$input.addEventListener('keydown', (e: KeyboardEvent) => {
      console.log('keydownEvent');
      switch (e.key) {
        case 'ArrowUp':
        case 'ArrowDown': {
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
}

export default AutoCompleteInput;
