const getParents = dom => {
  let result = [];
  let currentDom = dom;

  if (currentDom) {
    while (currentDom.parentNode) {
      result.push(currentDom.parentNode);
      currentDom = currentDom.parentNode;
    }
  }

  return result;
};

function wrapWithTag({
  regexp = /([a-zA-Z0-9,¥.-]+)/g,
  className,
  tagName = 'span',
  attr = {}
} = {}) {
  // set params
  const options = {
    regexp,
    tagName: tagName.toLowerCase(),
    attr
  };

  if (className) {
    options.attr.class = className;
  } else if (
    typeof className === 'undefined' &&
    Object.keys(attr).length === 0
  ) {
    options.attr.class = 'diff';
  }

  const testMetaContents = /base|command|link|meta|noscript|script|style|title|svg/;

  const getTargets = () => {
    let nodes = document.querySelectorAll('*');
    let targets = [];

    [...nodes].forEach(node => {
      [...node.childNodes].forEach(childNode => {
        const parentsNode = getParents(childNode);

        if (
          childNode.nodeType === Node.TEXT_NODE &&
          !/^\s+$/.test(childNode.textContent) &&
          !testMetaContents.test(childNode.parentNode.tagName.toLowerCase()) &&
          Object.keys(options.attr).filter(propName => {
            return (
              childNode.parentNode.getAttribute(propName) ===
              options.attr[propName] + ''
            );
          }).length === 0 &&
          parentsNode.filter(node => {
            if (node.tagName) {
              return testMetaContents.test(node.tagName.toLowerCase());
            } else {
              return false;
            }
          }).length === 0
        ) {
          targets.push({
            parent: childNode.parentNode,
            text: childNode
          });
        }
      });
    });

    return targets;
  };

  const renew = () => {
    let targets = getTargets();
    const newText = (() => {
      const tmpTag = document.createElement(options.tagName);
      const tmpDiv = document.createElement('div');

      tmpDiv.appendChild(tmpTag);
      tmpTag.textContent = '$1';

      Object.keys(options.attr).forEach(propName => {
        tmpTag.setAttribute(propName, options.attr[propName]);
      });

      return tmpDiv.innerHTML;
    })();

    targets.forEach(target => {
      const tmpDiv = document.createElement('div');

      tmpDiv.innerHTML = target.text
        .cloneNode()
        .textContent.replace(options.regexp, newText);

      [...tmpDiv.childNodes].forEach(childNode => {
        target.parent.insertBefore(childNode, target.text);
      });

      target.parent.removeChild(target.text);
    });
  };

  renew();

  return {
    renew
  };
}

module.exports = wrapWithTag;
