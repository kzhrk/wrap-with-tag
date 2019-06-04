const getParents = (dom: ChildNode) => {
  let result: ParentNode[] = [];
  let currentDom: Node | null = dom;

  while (currentDom !== null && currentDom.parentNode) {
    result.push(currentDom.parentNode);
    currentDom = currentDom.parentNode;
  }

  return result;
};

export default function wrapWithTag(
  opt: {
    regexp?: RegExp;
    className?: string;
    tagName?: string;
    attr?: {
      [key: string]: string;
    };
  } = {
    regexp: /([a-zA-Z0-9,¥.-]+)/g,
    className: 'diff',
    tagName: 'span',
    attr: {}
  }
) {
  const { regexp, className, tagName, attr } = opt;

  // set params
  const options: {
    regexp: RegExp;
    tagName: string;
    attr: {
      [key: string]: any;
    };
  } = {
    regexp: regexp ? regexp : /([a-zA-Z0-9,¥.-]+)/g,
    tagName: tagName ? tagName.toLowerCase() : 'span',
    attr: attr ? attr : {}
  };

  if (className) {
    options.attr.class = className;
  } else if (
    typeof className === 'undefined' &&
    Object.keys(options.attr).length === 0
  ) {
    options.attr.class = 'diff';
  }

  const testMetaContents = /base|command|link|meta|noscript|script|style|title|svg/;

  const getTargets = () => {
    let nodes = document.querySelectorAll('*');
    let targets: any[] = [];

    [...nodes].forEach(node => {
      [...node.childNodes].forEach(childNode => {
        const parentsNode = getParents(childNode);

        // check
        const isTextNode = childNode.nodeType === Node.TEXT_NODE;
        const hasTextContent =
          childNode.textContent && !/^\s+$/.test(childNode.textContent);
        const matchParentTagName =
          childNode.parentNode instanceof HTMLElement &&
          childNode.parentNode.tagName &&
          !testMetaContents.test(childNode.parentNode.tagName.toLowerCase());
        const matchAttr =
          Object.keys(options.attr).filter(propName => {
            return (
              childNode.parentNode instanceof HTMLElement &&
              childNode.parentNode.getAttribute(propName) ===
                options.attr[propName] + ''
            );
          }).length === 0;
        const isntMetaContents =
          parentsNode.filter(node => {
            if (node instanceof Element && node.tagName) {
              return testMetaContents.test(node.tagName.toLowerCase());
            } else {
              return false;
            }
          }).length === 0;

        if (
          isTextNode &&
          hasTextContent &&
          matchParentTagName &&
          matchAttr &&
          isntMetaContents
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
