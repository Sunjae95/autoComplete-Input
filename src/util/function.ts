import { BASE_URL } from './constant';
import { AppState, Direction, DomType, NextFocusType, Result } from './types';

export const createDom = ({ tag, className }: DomType): HTMLElement => {
  const $element = document.createElement(tag);
  $element.setAttribute('class', className);

  return $element;
};

export function getNextFocus(key: Direction): AppState {
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

export function debounceInput(value): void {
  if (this.timer !== null) {
    clearTimeout(this.timer);
  }

  this.timer = setTimeout(async () => {
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
