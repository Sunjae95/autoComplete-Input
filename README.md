## ๐์คํ๋ฐฉ๋ฒ

### ๋ฐ๋ชจ ํ์ธํ๊ธฐ

> ๐ [๋ฐ๋ชจํ์ธํ๊ธฐ](https://autocomplete-sunjae.netlify.app/)

### ํ๋ก์ ํธ ์์

> ๐ [๋ผ์ด๋ธ์๋ฒ ๋ค์ด๋ฐ๊ธฐ](https://github.com/ritwickdey/vscode-live-server-plus-plus)

### ํ์คํธ ์คํ

> $ npm run test

## ๐ ๊ธฐ์  ์คํ

โPure JavaScriptโ โTypeScriptโ โCSSโ๋ฅผ ํ์ฉํ์ฌ ๊ตฌํํ์ต๋๋ค.

โfilehoundโ๋ฅผ ์ฌ์ฉํ์ฌ ํธ๋์คํ์ผ๋ง ํ import ๊ตฌ๋ฌธ์ ํ์ฅ์๋ช์ ์ถ๊ฐํ์ต๋๋ค.

## ๐๊ตฌํ ๋ฆฌ์คํธ

- [x] UI์์๋ฅผ ์ปดํฌ๋ํธ๋ก ์ถ์ํํ์ฌ ๋์
- [x] ๋ฐฉํฅํค ์๋ ฅ ์ ์์ดํ ๋ณ๊ฒฝ
- [x] ํฌ์ปค์ฑ ์์ดํ ๊ตฌํ
- [x] focus out์ ์๋๊ฒ์์ฐฝ ์ฌ๋ผ์ง
- [x] clear๋ฒํผ ํด๋ฆญ ์ Input๊ฐ ์ญ์ 
- [x] input value๊ฐ ์๋ค๋ฉด API ํธ์ถ ๊ธ์ง
- [x] fetch๋ฅผ ์ฌ์ฉํ์ฌ API ํธ์ถ

## ๐์ถ๊ฐ ๊ตฌํ ์ฌํญ

- [x] ๋งํฌ์ ์น ํ์ค ์ค์
- [x] input value์ ๋ฐ๋ฅธ API ๊ฒฐ๊ณผ ์บ์ฑ
- [x] Input์ debounce ์ ์ฉ
- [x] TypeScript ์ฌ์ฉ
- [x] ํ์คํธ ์ถ๊ฐ

## ๐น๊ตฌํ ๋ด์ฉ

### UI ์ปดํฌ๋ํธ ์ถ์ํ

- class๋ฅผ ์ฌ์ฉํ์ฌ UI ์ปดํฌ๋ํธ๋ฅผ ๊ตฌํํ์ต๋๋ค.
- ์ปดํฌ๋ํธ๊ตฌ์กฐ๋ ์๋์ฝ๋์ ๊ฐ์ ๊ตฌ์กฐ๋ก setState, render๊ฐ ํฌํจ๋์ด ์์ต๋๋ค.

```tsx
class ClearBtn {
  state: State;

  constructor({ $target, content, clearInput }: Props) {
    // ...
  }

  setState(nextState: State) {
    this.state = nextState;
    this.render();
  }

  render() {
    // ...
  }
}
```

### ๋ฐฉํฅํค ์๋ ฅ ์ ์์ดํ ๋ณ๊ฒฝ

- ํ์ฌ ์์น(this.state.focusNumber)๋ฅผ ๋ณ๊ฒฝํ๋ ํจ์์๋๋ค.
- ์๋น์ค์ ๋น์ทํ ๊ตฌํ์ ์ํด ๋งจ์์์ ์๋ก ์ฌ๋ ธ์ ๋ ๊ฐ์ฅ ์๋๋ก ๊ฐ๋๊ฒ๋ ์ถ๊ฐ๊ตฌํ ํ์ต๋๋ค.

```tsx
function getNextFocus(key: Direction): AppState {
  const { focusNumber, results } = this.state;
  const maxLength = results.length;
  let nextFocus: number | null;

  switch (key) {
    case Direction.ArrowUp: {
      nextFocus = focusNumber - 1 >= 0 ? focusNumber - 1 : maxLength - 1;
      break;
    }
    case Direction.ArrowDown: {
      nextFocus = focusNumber + 1 >= maxLength ? 0 : focusNumber + 1;
      break;
    }
    default:
      nextFocus = null;
  }

  return { ...this.state, focusNumber: nextFocus };
}
```

### ํฌ์ปค์ฑ ์์ดํ ํํ & clear๋ฒํผ ํด๋ฆญ ์ Input๊ฐ ์ญ์ 

- Props๋ก ๋ฐ์ focusNumber์ ๋น๊ตํ์ฌ ํฌ์ปค์ฑ ์์ดํ์ ๊ตฌํํ์ต๋๋ค.
- Reflow, Repaint๋ฅผ ์ค์ด๊ธฐ ์ํด className์ display:none ์ถ๊ฐํ์ฌ ํฌ์ปค์ฑ์ ๊ตฌํํ์ต๋๋ค.
- clear๋ฒํผ์ content(๊ฒ์ ๊ฐ)์ ์ ๋ฌด์ ๋ฐ๋ผ ๊ตฌํํ์ต๋๋ค.

```tsx
// result.ts
class Results {
  // ...
  constructor({ $target, isFocus, results, focusNumber }: ResultsProps) {
    this.state = { isFocus, results, focusNumber };
    // ...
  }
  // ...
  render() {
    this.$result.innerHTML = `
        ${this.state.results
          .map(
            (result, i) =>
              `<li class="results__item ${
                i === this.state.focusNumber && 'isFocus'
              }"><span>${result.text}</span><li>`
          )
          .join('')}
      `;
  }
}
```

### focus out์ ์๋๊ฒ์์ฐฝ ์ฌ๋ผ์ง

- Props๋ก ๋ฐ์ isFocus์ ํ์ฌ ์์์ โdisableโ ํด๋์ค ๋ช์ ์ ๋ฌด๋ก ๋ถ๊ธฐ ์ฒ๋ฆฌํ์ฌ ์ฌ๋ผ์ง์ ๊ตฌํํ์ต๋๋ค.
- Input์ onfocus์ onblur๋ฅผ ํตํด isFocus ์ํ๋ฅผ ๋ณ๊ฒฝํ์ต๋๋ค.

```tsx
// input.ts
class Input {
  constructor({
    $target,
    handleInput,
    switchFocus,
    focusInput,
    outFocusInput,
  }: InputProps) {
    // ...
    this.$input.onfocus = focusInput;
    this.$input.onblur = outFocusInput;

    $target.appendChild(this.$input);
  }
  // ...
}

// result.ts
class Results {
  // ...
  render() {
    if (this.state.isFocus && this.$result.classList.contains(DISABLE)) {
      this.$result.classList.remove(DISABLE);
    } else if (
      !this.state.isFocus &&
      !this.$result.classList.contains(DISABLE)
    ) {
      this.$result.classList.add(DISABLE);
    }
    // ...
  }
}
```

### fetch๋ฅผ ์ฌ์ฉํ์ฌ API ํธ์ถ & input value๊ฐ ์๋ค๋ฉด API ํธ์ถ ๊ธ์ง

- ์ฐ์์๋ ฅ ์ ์ ์ ํ ๊ณต๋ฐฑ ์๊ฐ์ธ 0.3ms์ด๋ฅผ ์ ์ฉํ์ฌ debounce APIํธ์ถ ํ์ต๋๋ค.
- ๋ธ๋ผ์ฐ์ ์ HTTP ์บ์์ ์ผ์นํ๋ ์์ฒญ์ ์ฐพ๋ ์์ฑ์ธ โforce-cacheโ๋ฅผ ์ฌ์ฉํ์ฌ APIํธ์ถ์ ์ค์์ต๋๋ค.
- value์ ๊ฐ์ ๋ฐ๋ผ early return ํ์ฌ APIํธ์ถ์ ๊ธ์งํ์ต๋๋ค.

```tsx
function debounceInput(value): void {
  if (this.timer !== null) {
    clearTimeout(this.timer);
  }

  this.timer = setTimeout(async () => {
    // ์๋ ฅ๊ฐ์ด ์์ผ๋ฉด early return
    if (!value) {
      this.setState({
        ...this.state,
        content: value,
        focusNumber: 0,
        results: [],
      });

      return;
    }

    let nextState: AppState;
    try {
      const res = await fetch(`${BASE_URL}${value}`, {
        cache: 'force-cache',
      });
      const results: Result[] = await res.json();

      nextState = {
        ...this.state,
        content: value,
        focusNumber: 0,
        results,
      };
    } catch {
      nextState = {
        ...this.state,
        content: value,
        focusNumber: 0,
        results: [],
      };
    }

    this.setState(nextState);
  }, 300);
}
```

### ํ์คํธ ํ๊ธฐ

- "๊ฐ" ์๋ ฅ
- "ํ์ดํ" ์๋ ฅ
- focus In & Out
- Clear Button ํด๋ฆญ
- "๋" ์๋ ฅ
- "๊ฐ" ์ฌ ์๋ ฅ
- "๊ณต๋ฐฑ" ์๋ ฅ
- ์์ ๊ฐ์ ์๋๋ฆฌ์ค ๋๋ก ๊ฒฐ๊ณผ๊ฐ ์ ๋์ค๋์ง ํ์ธํ๊ธฐ ์ํด ์๋์ ๊ฐ์ ํ์คํธ์ฝ๋๋ฅผ ์์ฑํ์ต๋๋ค.

```tsx
describe('autoComplete Test', () => {
	// ...
	it('"๊ฐ" ์๋ ฅ', () => {
    cy.intercept(
      'GET',
      'url'
    ).as('getResult');
    cy.get('.autoComplete__input').type('๊ฐ');
    cy.wait('@getResult');
    cy.get('.results > .results__item').should(($list) => {
      expect($list).to.have.length(4);
      expect($list.eq(0)).to.contain('๊ฐํ์นด');
      expect($list.eq(1)).to.contain('๊ฐ์ฒ ๋น');
      expect($list.eq(2)).to.contain('๊ฐ์ฒ ๋น2');
      expect($list.eq(3)).to.contain('๊ธฐ์์ถฉ');
    });
  });
	// ...
}
```
