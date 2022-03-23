## 🎊실행방법

### 데모 확인하기

> 👉 [데모확인하기](https://autocomplete-sunjae.netlify.app/)

### 프로젝트 시작

> 👉 [라이브서버 다운받기](https://github.com/ritwickdey/vscode-live-server-plus-plus)

### 테스트 실행

> $ npm run test

## 🛠기술 스택

“Pure JavaScript” “TypeScript” “CSS”를 활용하여 구현했습니다.

“filehound”를 사용하여 트랜스파일링 후 import 구문에 확장자명을 추가했습니다.

## 📗구현 리스트

- [x] UI요소를 컴포넌트로 추상화하여 동작
- [x] 방향키 입력 시 아이템 변경
- [x] 포커싱 아이템 구현
- [x] focus out시 자동검색창 사라짐
- [x] clear버튼 클릭 시 Input값 삭제
- [x] input value가 없다면 API 호출 금지
- [x] fetch를 사용하여 API 호출

## 📙추가 구현 사항

- [x] 마크업 웹 표준 준수
- [x] input value에 따른 API 결과 캐싱
- [x] Input에 debounce 적용
- [x] TypeScript 사용
- [x] 테스트 추가

## 🕹구현 내용

### UI 컴포넌트 추상화

- class를 사용하여 UI 컴포넌트를 구현했습니다.
- 컴포넌트구조는 아래코드와 같은 구조로 setState, render가 포함되어 있습니다.

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

### 방향키 입력 시 아이템 변경

- 현재 위치(this.state.focusNumber)를 변경하는 함수입니다.
- 서비스와 비슷한 구현을 위해 맨위에서 위로 올렸을 때 가장 아래로 가는것도 추가구현 했습니다.

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

### 포커싱 아이템 표현 & clear버튼 클릭 시 Input값 삭제

- Props로 받은 focusNumber와 비교하여 포커싱 아이템을 구현했습니다.
- Reflow, Repaint를 줄이기 위해 className에 display:none 추가하여 포커싱을 구현했습니다.
- clear버튼은 content(검색 값)의 유무에 따라 구현했습니다.

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

### focus out시 자동검색창 사라짐

- Props로 받은 isFocus와 현재 요소에 ‘disable’ 클래스 명의 유무로 분기 처리하여 사라짐을 구현했습니다.
- Input에 onfocus와 onblur를 통해 isFocus 상태를 변경했습니다.

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

### fetch를 사용하여 API 호출 & input value가 없다면 API 호출 금지

- 연속입력 시 적절한 공백 시간인 0.3ms초를 적용하여 debounce API호출 했습니다.
- 브라우저의 HTTP 캐시에 일치하는 요청을 찾는 속성인 ‘force-cache’를 사용하여 API호출을 줄였습니다.
- value의 값에 따라 early return 하여 API호출을 금지했습니다.

```tsx
function debounceInput(value): void {
  if (this.timer !== null) {
    clearTimeout(this.timer);
  }

  this.timer = setTimeout(async () => {
    // 입력값이 없으면 early return
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

### 테스트 하기

- "가" 입력
- "화살표" 입력
- focus In & Out
- Clear Button 클릭
- "나" 입력
- "가" 재 입력
- "공백" 입력
- 위와 같은 시나리오 대로 결과가 잘 나오는지 확인하기 위해 아래와 같은 테스트코드를 작성했습니다.

```tsx
describe('autoComplete Test', () => {
	// ...
	it('"가" 입력', () => {
    cy.intercept(
      'GET',
      'url'
    ).as('getResult');
    cy.get('.autoComplete__input').type('가');
    cy.wait('@getResult');
    cy.get('.results > .results__item').should(($list) => {
      expect($list).to.have.length(4);
      expect($list.eq(0)).to.contain('가타카');
      expect($list.eq(1)).to.contain('강철비');
      expect($list.eq(2)).to.contain('강철비2');
      expect($list.eq(3)).to.contain('기생충');
    });
  });
	// ...
}
```
