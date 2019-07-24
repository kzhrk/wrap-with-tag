# wrap-with-tag

[![Build Status](https://travis-ci.org/kzhrk/wrap-with-tag.svg?branch=master)](https://travis-ci.org/kzhrk/wrap-with-tag)
[![Coverage Status](https://coveralls.io/repos/github/kzhrk/wrap-with-tag/badge.svg?branch=master)](https://coveralls.io/github/kzhrk/wrap-with-tag?branch=master)
[![npm version](https://badge.fury.io/js/wrap-with-tag.svg)](https://badge.fury.io/js/wrap-with-tag)

Wrap-with-tag provides a simple function to wrap string with html.

## Description

Wrap-with-tag provides a function wrapping specific word with html tag assigned with certain class.  
The use case is to wrap specific word, like a company name, with a span element assigned with class for applying font-family.

[Docs](https://kzhrk.github.com/wrap-with-tag/)

## Install

```
$ yarn add wrap-with-tag
```

or

```
$ npm install wrap-with-tag -d
```

## Usage

The recommend use case is using `import` statements.  

```js
import wrapWithTag from 'wrap-with-tag';

wrapWithTag({
  regexp: /(Company Name)/g,
  className: 'special-font',
  tagName: 'span',
  attr: {
    tabindex: -1
  }
});
```

Alternatively, you can use `script` tag with html file.  
You can find all versions of the CDN at [UNPKG](https://unpkg.com/wrap-with-tag/dist/index.umd.js).

```html
<script src="https://unpkg.com/wrap-with-tag/dist/index.umd.js">
<script>
wrapWithTag({
  regexp: /(Company Name)/g,
  className: 'special-font',
  tagName: 'span',
  attr: {
    tabindex: -1
  }
});
</script>
```

### Options

| name | default | description |
|:-----|:------- |:------------|
| regexp | /([a-zA-Z0-9,¥.-]+)/g | The regular expression of string wrapped with html tag defined with tagName option. |
| className | diff | The string is added to html tag defined with tagName option. |
| tagName | span | The html tag wraps string. |
| attr | {} | The object is applied to html tag defined with tagName option. |

## Licence

[MIT](https://github.com/kzhrk/wrap-with-tag/blob/master/LICENSE)

## Author

[kzhrk](https://github.com/kzhrk)
