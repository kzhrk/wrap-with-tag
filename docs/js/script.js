!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.wrapWithTag=t():e.wrapWithTag=t()}(window,function(){return function(r){var n={};function o(e){if(n[e])return n[e].exports;var t=n[e]={i:e,l:!1,exports:{}};return r[e].call(t.exports,t,t.exports,o),t.l=!0,t.exports}return o.m=r,o.c=n,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)o.d(r,n,function(e){return t[e]}.bind(null,n));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,t){function d(e){return function(e){if(Array.isArray(e)){for(var t=0,r=new Array(e.length);t<e.length;t++)r[t]=e[t];return r}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}e.exports=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},t=e.regexp,r=void 0===t?/([a-zA-Z0-9,¥.-]+)/g:t,n=e.className,o=e.tagName,a=void 0===o?"span":o,i=e.attr,c=void 0===i?{}:i,u={regexp:r,tagName:a.toLowerCase(),attr:c};n?u.attr.class=n:void 0===n&&0===Object.keys(c).length&&(u.attr.class="diff");var f=/base|command|link|meta|noscript|script|style|title|svg/,l=function(){var e,r,t,n,o=(e=document.querySelectorAll("*"),r=[],d(e).forEach(function(e){d(e.childNodes).forEach(function(t){var e=function(e){var t=[],r=e;if(r)for(;r.parentNode;)t.push(r.parentNode),r=r.parentNode;return t}(t);t.nodeType!==Node.TEXT_NODE||/^\s+$/.test(t.textContent)||f.test(t.parentNode.tagName.toLowerCase())||0!==Object.keys(u.attr).filter(function(e){return t.parentNode.getAttribute(e)===u.attr[e]+""}).length||0!==e.filter(function(e){return!!e.tagName&&f.test(e.tagName.toLowerCase())}).length||r.push({parent:t.parentNode,text:t})})}),r),a=(t=document.createElement(u.tagName),(n=document.createElement("div")).appendChild(t),t.textContent="$1",Object.keys(u.attr).forEach(function(e){t.setAttribute(e,u.attr[e])}),n.innerHTML);o.forEach(function(t){var e=document.createElement("div");e.innerHTML=t.text.cloneNode().textContent.replace(u.regexp,a),d(e.childNodes).forEach(function(e){t.parent.insertBefore(e,t.text)}),t.parent.removeChild(t.text)})};return l(),{renew:l}}}])});