var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import AutoCompleteInput from './component/AutoComplete.js';
import Results from './component/Results.js';
import { BASE_URL, getNextFocus } from './util/index.js';
class App {
    constructor($target) {
        this.state = {
            content: '',
            isFocus: true,
            focusNumber: 0,
            results: [],
        };
        this.timer = null;
        this.autoComplete = new AutoCompleteInput({
            $target,
            content: this.state.content,
            handleInput: this.handleInput.bind(this),
            switchFocus: this.switchFocus.bind(this),
            clearInput: this.clearInput.bind(this),
            focusInput: this.focusInput.bind(this),
            outFocusInput: this.outFocusInput.bind(this),
        });
        this.results = new Results({
            $target,
            isFocus: this.state.isFocus,
            results: this.state.results,
            focusNumber: this.state.focusNumber,
        });
    }
    setState(nextState) {
        this.state = nextState;
        this.render();
    }
    render() {
        this.autoComplete.setState({ content: this.state.content });
        this.results.setState({
            isFocus: this.state.isFocus,
            results: this.state.results,
            focusNumber: this.state.focusNumber,
        });
    }
    handleInput(e) {
        const { value } = e.target;
        if (this.timer !== null) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            if (!value) {
                this.setState(Object.assign(Object.assign({}, this.state), { content: value, focusNumber: 0, results: [] }));
                return;
            }
            let nextState;
            try {
                const res = yield fetch(`${BASE_URL}${value}`, {
                    cache: 'force-cache',
                });
                const results = yield res.json();
                nextState = Object.assign(Object.assign({}, this.state), { content: value, focusNumber: 0, results });
            }
            catch (_a) {
                nextState = Object.assign(Object.assign({}, this.state), { content: value, focusNumber: 0, results: [] });
            }
            this.setState(nextState);
        }), 300);
    }
    clearInput() {
        const nextState = Object.assign(Object.assign({}, this.state), { content: '', focusNumber: 0, results: [] });
        this.setState(nextState);
    }
    switchFocus(key) {
        const { focusNumber, results } = this.state;
        const nextFocus = getNextFocus({
            key,
            nowFocus: focusNumber,
            maxLength: results.length,
        });
        if (nextFocus === null)
            return;
        const nextState = Object.assign(Object.assign({}, this.state), { focusNumber: nextFocus });
        this.setState(nextState);
    }
    focusInput() {
        const nextState = Object.assign(Object.assign({}, this.state), { isFocus: true });
        this.setState(nextState);
    }
    outFocusInput() {
        const nextState = Object.assign(Object.assign({}, this.state), { isFocus: false });
        this.setState(nextState);
    }
}
export default App;
//# sourceMappingURL=App.js.map