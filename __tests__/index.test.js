import SimpleTagWrapper from '../src/index';

describe('simple-tag-wrapper', () => {
  test('Wrap half-width alphanumeric characters with span.diff, ignoring multibyte characters.', () => {
    const paragraphNode = document.createElement('p');

    paragraphNode.textContent = '1234あいうえおabcd';

    document.body.append(paragraphNode);

    SimpleTagWrapper();

    expect(paragraphNode.innerHTML).toEqual(
      '<span class="diff">1234</span>あいうえお<span class="diff">abcd</span>'
    );
  });

  test('Wrap the half-width alphanumeric added later with span.diff.', () => {
    const paragraphNode = document.createElement('p');

    paragraphNode.textContent = '1234あいうえお';

    document.body.append(paragraphNode);

    const simpleTagWrapper = SimpleTagWrapper();

    paragraphNode.insertAdjacentHTML('beforeend', 'abcd');

    simpleTagWrapper.renew();

    expect(paragraphNode.innerHTML).toEqual(
      '<span class="diff">1234</span>あいうえお<span class="diff">abcd</span>'
    );
  });

  test("Don't wrap the half-width alphanumeric, that have wraped span.diff, with span.diff.", () => {
    const paragraphNode = document.createElement('p');

    paragraphNode.textContent = '1234あいうえおabcd';

    document.body.append(paragraphNode);

    const simpleTagWrapper = SimpleTagWrapper();

    simpleTagWrapper.renew();

    expect(paragraphNode.innerHTML).toEqual(
      '<span class="diff">1234</span>あいうえお<span class="diff">abcd</span>'
    );
  });

  test("Don't wrap the half-width alphanumeric that contain meta contents.", () => {
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="40" viewBox="0 0 500 40">
      <text x="0" y="35" font-family="Verdana" font-size="35">
        Hello, out there
      </text>
    </svg>`;

    const tmpDiv = document.createElement('div');

    tmpDiv.innerHTML = svgString;

    const svgNode = tmpDiv.firstChild;
    const prevSvgNode = svgNode.cloneNode(true);

    document.body.append(svgNode);

    const simpleTagWrapper = SimpleTagWrapper();

    simpleTagWrapper.renew();

    document.body.append(prevSvgNode);

    expect(svgNode).toEqual(prevSvgNode);
  });
});
