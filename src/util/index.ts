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

export const BASE_URL =
  'https://5qfov74y3c.execute-api.ap-northeast-2.amazonaws.com/web-front/autocomplete?value=';
