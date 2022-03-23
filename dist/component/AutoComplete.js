import { createDom } from '../util/index.js';
import ClearBtn from './ClearBtn.js';
import Input from './Input.js';
class AutoComplete {
    constructor({ $target, content, handleInput, switchFocus, clearInput, focusInput, outFocusInput, }) {
        this.$form = createDom({ tag: 'form', className: 'autoComplete' });
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
    setState(nextState) {
        this.state = nextState;
        this.render();
    }
    render() {
        this.$input.setState(this.state);
        this.$clearBtn.setState(this.state);
    }
}
export default AutoComplete;
//# sourceMappingURL=AutoComplete.js.map