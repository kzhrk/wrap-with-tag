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
  className = 'diff',
  tagName = 'span'
} = {}) {
  // set params
  const options = {
    regexp,
    className,
    tagName: tagName.toLowerCase()
  };
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
          !childNode.parentNode.classList.contains(options.className) &&
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

    targets.forEach(target => {
      const tmpDiv = document.createElement('div');

      tmpDiv.innerHTML = target.text
        .cloneNode()
        .textContent.replace(
          options.regexp,
          `<${options.tagName} class="${options.className}">$1</${options.tagName}>`
        );

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