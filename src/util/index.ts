export const BASE_URL =
  'https://5qfov74y3c.execute-api.ap-northeast-2.amazonaws.com/web-front/autocomplete?value=';
export const CLEAR_ICON =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="css-1orrb02-IcClear"><path fill="currentColor" fill-rule="evenodd" d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11zm-8.12-3.96a.764.764 0 011.08 1.08L13.08 12l2.88 2.88a.764.764 0 01-1.08 1.08L12 13.08l-2.88 2.88a.764.764 0 01-1.08-1.08L10.92 12 8.04 9.12a.764.764 0 011.08-1.08L12 10.92l2.88-2.88z" clip-rule="evenodd"></path></svg>';
export const DISABLE = 'disable';
export const createDom = ({
  tag,
  className,
}: {
  tag: string;
  className: string;
}): HTMLElement => {
  const $element = document.createElement(tag);
  $element.setAttribute('class', className);

  return $element;
};

export const getNextFocus = ({
  key,
  nowFocus,
  maxLength,
}: {
  key: string;
  nowFocus: number;
  maxLength: number;
}) => {
  switch (key) {
    case 'ArrowUp':
      return nowFocus - 1 >= 0 ? nowFocus - 1 : maxLength - 1;
    case 'ArrowDown':
      return nowFocus + 1 >= maxLength ? 0 : nowFocus + 1;
    default:
      return null;
  }
};
