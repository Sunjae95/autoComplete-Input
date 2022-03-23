import { createDom } from '../util/index.js';
class Input {
    constructor({ $target, handleInput, switchFocus, focusInput, outFocusInput, }) {
        this.$input = createDom({
            tag: 'input',
            className: 'autoComplete__input',
        });
        this.state = { content: '' };
        this.$input.setAttribute('type', 'text');
        this.$input.setAttribute('placeholder', '제목, 감독, 배우로 검색');
        this.$input.addEventListener('keydown', (e) => {
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
        this.$input.addEventListener('keyup', (e) => {
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
    setState(nextState) {
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
//# sourceMappingURL=Input.js.map