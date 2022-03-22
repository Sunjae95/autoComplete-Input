export const BASE_URL =
  'https://5qfov74y3c.execute-api.ap-northeast-2.amazonaws.com/web-front/autocomplete?value=';

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
