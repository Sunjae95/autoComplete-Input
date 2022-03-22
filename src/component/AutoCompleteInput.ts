import { createDom } from '../util/index';

interface AutoCompleteInputProps {
  $target: HTMLElement;
  handleInput: (e: Event) => void;
}

class AutoCompleteInput {
  $input = createDom({ tag: 'input', className: 'input' });

  constructor({ $target, handleInput }: AutoCompleteInputProps) {
    this.$input.setAttribute('type', 'text');
    this.$input.addEventListener('keyup', handleInput);

    $target.appendChild(this.$input);
  }
}

export default AutoCompleteInput;
