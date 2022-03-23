import { CLEAR_ICON, createDom, DISABLE } from '../util/index.js';
class ClearBtn {
    constructor({ $target, content, clearInput }) {
        this.$button = createDom({
            tag: 'div',
            className: 'autoComplete__clear-btn disable',
        });
        this.state = { content };
        $target.appendChild(this.$button);
        this.$button.addEventListener('click', clearInput);
        this.$button.innerHTML = CLEAR_ICON;
    }
    setState(nextState) {
        this.state = nextState;
        this.render();
    }
    render() {
        if (this.state.content && this.$button.classList.contains(DISABLE)) {
            this.$button.classList.remove(DISABLE);
        }
        else if (!this.state.content &&
            !this.$button.classList.contains(DISABLE)) {
            this.$button.classList.add(DISABLE);
        }
    }
}
export default ClearBtn;
//# sourceMappingURL=ClearBtn.js.map