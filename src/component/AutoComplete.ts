import { createDom } from '../util/function';
import { AutoCompleteState } from '../util/types';
import ClearBtn from './ClearBtn';
import Input from './Input';
interface AutoCompleteProps extends AutoCompleteState {
  $target: HTMLElement;
  handleInput: (e: KeyboardEvent) => void;
  switchFocus: (key: string) => void;
  clearInput: () => void;
  focusInput: () => void;
  outFocusInput: () => void;
}

class AutoComplete {
  $input: Input;
  $clearBtn: ClearBtn;
  state: AutoCompleteState;
  $form = createDom({ tag: 'form', className: 'autoComplete' });

  constructor({
    $target,
    content,
    handleInput,
    switchFocus,
    clearInput,
    focusInput,
    outFocusInput,
  }: AutoCompleteProps) {
    this.state = { content };
    this.$input = new Input({
      $target: this.$form,
      content,
      handleInput,
      switchFocus,
      focusInput,
      outFocusInput,
    });
    this.$clearBtn = new ClearBtn({
      $target: this.$form,
      content,
      clearInput,
    });

    $target.appendChild(this.$form);
  }

  setState(nextState: AutoCompleteState) {
    this.state = nextState;
    this.render();
  }

  render() {
    this.$input.setState(this.state);
    this.$clearBtn.setState(this.state);
  }
}

export default AutoComplete;
