# wrap-with-tag

[![Build Status](https://travis-ci.org/kzhrk/wrap-with-tag.svg?branch=master)](https://travis-ci.org/kzhrk/wrap-with-tag)
[![Coverage Status](https://coveralls.io/repos/github/kzhrk/wrap-with-tag/badge.svg?branch=master)](https://coveralls.io/github/kzhrk/wrap-with-tag?branch=master)
[![npm version](https://badge.fury.io/js/wrap-with-tag.svg)](https://badge.fury.io/js/wrap-with-tag)

Wrap-with-tag provides a simple function to wrap string with html.

## Description

Wrap-with-tag provides function wrapping specific word with html tag assigned with certain class.  
The use case is to wrap specific word, like a company name, with a span element assigned with class for applying font-family.

## Install

```
$ yarn add wrap-with-tag -d
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
  regexp: /Company Name/g,
  className: 'special-font',
  tagName: 'span'
});
```

Alternatively, you can use `script` tag with html file.

```html
<script src="node_modules/wrap-with-tag/dist/ariaset.js">
<script>
wrapWithTag({
  regexp: /Company Name/g,
  className: 'special-font',
  tagName: 'span'
});
</script>
```

## Licence

MIT

## Author

[kzhrk](https://github.com/kzhrk)
