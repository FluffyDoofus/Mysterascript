// Search `CE.` for the good stuff
//--------------------------------------------------------------------------------
//- Import: Lodash
//--------------------------------------------------------------------------------
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright JS Foundation and other contributors <https://js.foundation/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
;(function() {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /** Used as the semantic version number. */
  var VERSION = '4.17.4';

  /** Used as the size to enable large array optimizations. */
  var LARGE_ARRAY_SIZE = 200;

  /** Error message constants. */
  var CORE_ERROR_TEXT = 'Unsupported core-js use. Try https://npms.io/search?q=ponyfill.',
      FUNC_ERROR_TEXT = 'Expected a function';

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED = '__lodash_hash_undefined__';

  /** Used as the maximum memoize cache size. */
  var MAX_MEMOIZE_SIZE = 500;

  /** Used as the internal argument placeholder. */
  var PLACEHOLDER = '__lodash_placeholder__';

  /** Used to compose bitmasks for cloning. */
  var CLONE_DEEP_FLAG = 1,
      CLONE_FLAT_FLAG = 2,
      CLONE_SYMBOLS_FLAG = 4;

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG = 1,
      COMPARE_UNORDERED_FLAG = 2;

  /** Used to compose bitmasks for function metadata. */
  var WRAP_BIND_FLAG = 1,
      WRAP_BIND_KEY_FLAG = 2,
      WRAP_CURRY_BOUND_FLAG = 4,
      WRAP_CURRY_FLAG = 8,
      WRAP_CURRY_RIGHT_FLAG = 16,
      WRAP_PARTIAL_FLAG = 32,
      WRAP_PARTIAL_RIGHT_FLAG = 64,
      WRAP_ARY_FLAG = 128,
      WRAP_REARG_FLAG = 256,
      WRAP_FLIP_FLAG = 512;

  /** Used as default options for `_.truncate`. */
  var DEFAULT_TRUNC_LENGTH = 30,
      DEFAULT_TRUNC_OMISSION = '...';

  /** Used to detect hot functions by number of calls within a span of milliseconds. */
  var HOT_COUNT = 800,
      HOT_SPAN = 16;

  /** Used to indicate the type of lazy iteratees. */
  var LAZY_FILTER_FLAG = 1,
      LAZY_MAP_FLAG = 2,
      LAZY_WHILE_FLAG = 3;

  /** Used as references for various `Number` constants. */
  var INFINITY = 1 / 0,
      MAX_SAFE_INTEGER = 9007199254740991,
      MAX_INTEGER = 1.7976931348623157e+308,
      NAN = 0 / 0;

  /** Used as references for the maximum length and index of an array. */
  var MAX_ARRAY_LENGTH = 4294967295,
      MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1,
      HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;

  /** Used to associate wrap methods with their bit flags. */
  var wrapFlags = [
    ['ary', WRAP_ARY_FLAG],
    ['bind', WRAP_BIND_FLAG],
    ['bindKey', WRAP_BIND_KEY_FLAG],
    ['curry', WRAP_CURRY_FLAG],
    ['curryRight', WRAP_CURRY_RIGHT_FLAG],
    ['flip', WRAP_FLIP_FLAG],
    ['partial', WRAP_PARTIAL_FLAG],
    ['partialRight', WRAP_PARTIAL_RIGHT_FLAG],
    ['rearg', WRAP_REARG_FLAG]
  ];

  /** `Object#toString` result references. */
  var argsTag = '[object Arguments]',
      arrayTag = '[object Array]',
      asyncTag = '[object AsyncFunction]',
      boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      domExcTag = '[object DOMException]',
      errorTag = '[object Error]',
      funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      nullTag = '[object Null]',
      objectTag = '[object Object]',
      promiseTag = '[object Promise]',
      proxyTag = '[object Proxy]',
      regexpTag = '[object RegExp]',
      setTag = '[object Set]',
      stringTag = '[object String]',
      symbolTag = '[object Symbol]',
      undefinedTag = '[object Undefined]',
      weakMapTag = '[object WeakMap]',
      weakSetTag = '[object WeakSet]';

  var arrayBufferTag = '[object ArrayBuffer]',
      dataViewTag = '[object DataView]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';

  /** Used to match empty string literals in compiled template source. */
  var reEmptyStringLeading = /\b__p \+= '';/g,
      reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
      reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;

  /** Used to match HTML entities and HTML characters. */
  var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g,
      reUnescapedHtml = /[&<>"']/g,
      reHasEscapedHtml = RegExp(reEscapedHtml.source),
      reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

  /** Used to match template delimiters. */
  var reEscape = /<%-([\s\S]+?)%>/g,
      reEvaluate = /<%([\s\S]+?)%>/g,
      reInterpolate = /<%=([\s\S]+?)%>/g;

  /** Used to match property names within property paths. */
  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      reIsPlainProp = /^\w*$/,
      reLeadingDot = /^\./,
      rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

  /**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g,
      reHasRegExpChar = RegExp(reRegExpChar.source);

  /** Used to match leading and trailing whitespace. */
  var reTrim = /^\s+|\s+$/g,
      reTrimStart = /^\s+/,
      reTrimEnd = /\s+$/;

  /** Used to match wrap detail comments. */
  var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
      reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/,
      reSplitDetails = /,? & /;

  /** Used to match words composed of alphanumeric characters. */
  var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

  /** Used to match backslashes in property paths. */
  var reEscapeChar = /\\(\\)?/g;

  /**
   * Used to match
   * [ES template delimiters](http://ecma-international.org/ecma-262/7.0/#sec-template-literal-lexical-components).
   */
  var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

  /** Used to match `RegExp` flags from their coerced string values. */
  var reFlags = /\w*$/;

  /** Used to detect bad signed hexadecimal string values. */
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

  /** Used to detect binary string values. */
  var reIsBinary = /^0b[01]+$/i;

  /** Used to detect host constructors (Safari). */
  var reIsHostCtor = /^\[object .+?Constructor\]$/;

  /** Used to detect octal string values. */
  var reIsOctal = /^0o[0-7]+$/i;

  /** Used to detect unsigned integer values. */
  var reIsUint = /^(?:0|[1-9]\d*)$/;

  /** Used to match Latin Unicode letters (excluding mathematical operators). */
  var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

  /** Used to ensure capturing order of template delimiters. */
  var reNoMatch = /($^)/;

  /** Used to match unescaped characters in compiled string literals. */
  var reUnescapedString = /['\n\r\u2028\u2029\\]/g;

  /** Used to compose unicode character classes. */
  var rsAstralRange = '\\ud800-\\udfff',
      rsComboMarksRange = '\\u0300-\\u036f',
      reComboHalfMarksRange = '\\ufe20-\\ufe2f',
      rsComboSymbolsRange = '\\u20d0-\\u20ff',
      rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
      rsDingbatRange = '\\u2700-\\u27bf',
      rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
      rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
      rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
      rsPunctuationRange = '\\u2000-\\u206f',
      rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
      rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
      rsVarRange = '\\ufe0e\\ufe0f',
      rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

  /** Used to compose unicode capture groups. */
  var rsApos = "['\u2019]",
      rsAstral = '[' + rsAstralRange + ']',
      rsBreak = '[' + rsBreakRange + ']',
      rsCombo = '[' + rsComboRange + ']',
      rsDigits = '\\d+',
      rsDingbat = '[' + rsDingbatRange + ']',
      rsLower = '[' + rsLowerRange + ']',
      rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
      rsFitz = '\\ud83c[\\udffb-\\udfff]',
      rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
      rsNonAstral = '[^' + rsAstralRange + ']',
      rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
      rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
      rsUpper = '[' + rsUpperRange + ']',
      rsZWJ = '\\u200d';

  /** Used to compose unicode regexes. */
  var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
      rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
      rsOptContrLower = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
      rsOptContrUpper = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
      reOptMod = rsModifier + '?',
      rsOptVar = '[' + rsVarRange + ']?',
      rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
      rsOrdLower = '\\d*(?:(?:1st|2nd|3rd|(?![123])\\dth)\\b)',
      rsOrdUpper = '\\d*(?:(?:1ST|2ND|3RD|(?![123])\\dTH)\\b)',
      rsSeq = rsOptVar + reOptMod + rsOptJoin,
      rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq,
      rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

  /** Used to match apostrophes. */
  var reApos = RegExp(rsApos, 'g');

  /**
   * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
   * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
   */
  var reComboMark = RegExp(rsCombo, 'g');

  /** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
  var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

  /** Used to match complex or compound words. */
  var reUnicodeWord = RegExp([
    rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
    rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')',
    rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower,
    rsUpper + '+' + rsOptContrUpper,
    rsOrdUpper,
    rsOrdLower,
    rsDigits,
    rsEmoji
  ].join('|'), 'g');

  /** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
  var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboRange + rsVarRange + ']');

  /** Used to detect strings that need a more robust regexp to match words. */
  var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

  /** Used to assign default `context` object properties. */
  var contextProps = [
    'Array', 'Buffer', 'DataView', 'Date', 'Error', 'Float32Array', 'Float64Array',
    'Function', 'Int8Array', 'Int16Array', 'Int32Array', 'Map', 'Math', 'Object',
    'Promise', 'RegExp', 'Set', 'String', 'Symbol', 'TypeError', 'Uint8Array',
    'Uint8ClampedArray', 'Uint16Array', 'Uint32Array', 'WeakMap',
    '_', 'clearTimeout', 'isFinite', 'parseInt', 'setTimeout'
  ];

  /** Used to make template sourceURLs easier to identify. */
  var templateCounter = -1;

  /** Used to identify `toStringTag` values of typed arrays. */
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
  typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
  typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
  typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
  typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
  typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
  typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
  typedArrayTags[errorTag] = typedArrayTags[funcTag] =
  typedArrayTags[mapTag] = typedArrayTags[numberTag] =
  typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
  typedArrayTags[setTag] = typedArrayTags[stringTag] =
  typedArrayTags[weakMapTag] = false;

  /** Used to identify `toStringTag` values supported by `_.clone`. */
  var cloneableTags = {};
  cloneableTags[argsTag] = cloneableTags[arrayTag] =
  cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
  cloneableTags[boolTag] = cloneableTags[dateTag] =
  cloneableTags[float32Tag] = cloneableTags[float64Tag] =
  cloneableTags[int8Tag] = cloneableTags[int16Tag] =
  cloneableTags[int32Tag] = cloneableTags[mapTag] =
  cloneableTags[numberTag] = cloneableTags[objectTag] =
  cloneableTags[regexpTag] = cloneableTags[setTag] =
  cloneableTags[stringTag] = cloneableTags[symbolTag] =
  cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
  cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
  cloneableTags[errorTag] = cloneableTags[funcTag] =
  cloneableTags[weakMapTag] = false;

  /** Used to map Latin Unicode letters to basic Latin letters. */
  var deburredLetters = {
    // Latin-1 Supplement block.
    '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
    '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
    '\xc7': 'C',  '\xe7': 'c',
    '\xd0': 'D',  '\xf0': 'd',
    '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
    '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
    '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
    '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
    '\xd1': 'N',  '\xf1': 'n',
    '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
    '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
    '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
    '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
    '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
    '\xc6': 'Ae', '\xe6': 'ae',
    '\xde': 'Th', '\xfe': 'th',
    '\xdf': 'ss',
    // Latin Extended-A block.
    '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
    '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
    '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
    '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
    '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
    '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
    '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
    '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
    '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
    '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
    '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
    '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
    '\u0134': 'J',  '\u0135': 'j',
    '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
    '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
    '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
    '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
    '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
    '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
    '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
    '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
    '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
    '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
    '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
    '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
    '\u0163': 't',  '\u0165': 't', '\u0167': 't',
    '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
    '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
    '\u0174': 'W',  '\u0175': 'w',
    '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
    '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
    '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
    '\u0132': 'IJ', '\u0133': 'ij',
    '\u0152': 'Oe', '\u0153': 'oe',
    '\u0149': "'n", '\u017f': 's'
  };

  /** Used to map characters to HTML entities. */
  var htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };

  /** Used to map HTML entities to characters. */
  var htmlUnescapes = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'"
  };

  /** Used to escape characters for inclusion in compiled string literals. */
  var stringEscapes = {
    '\\': '\\',
    "'": "'",
    '\n': 'n',
    '\r': 'r',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  /** Built-in method references without a dependency on `root`. */
  var freeParseFloat = parseFloat,
      freeParseInt = parseInt;

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

  /** Detect free variable `self`. */
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = freeGlobal || freeSelf || Function('return this')();

  /** Detect free variable `exports`. */
  var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Detect free variable `process` from Node.js. */
  var freeProcess = moduleExports && freeGlobal.process;

  /** Used to access faster Node.js helpers. */
  var nodeUtil = (function() {
    try {
      return freeProcess && freeProcess.binding && freeProcess.binding('util');
    } catch (e) {}
  }());

  /* Node.js helper references. */
  var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer,
      nodeIsDate = nodeUtil && nodeUtil.isDate,
      nodeIsMap = nodeUtil && nodeUtil.isMap,
      nodeIsRegExp = nodeUtil && nodeUtil.isRegExp,
      nodeIsSet = nodeUtil && nodeUtil.isSet,
      nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

  /*--------------------------------------------------------------------------*/

  /**
   * Adds the key-value `pair` to `map`.
   *
   * @private
   * @param {Object} map The map to modify.
   * @param {Array} pair The key-value pair to add.
   * @returns {Object} Returns `map`.
   */
  function addMapEntry(map, pair) {
    // Don't return `map.set` because it's not chainable in IE 11.
    map.set(pair[0], pair[1]);
    return map;
  }

  /**
   * Adds `value` to `set`.
   *
   * @private
   * @param {Object} set The set to modify.
   * @param {*} value The value to add.
   * @returns {Object} Returns `set`.
   */
  function addSetEntry(set, value) {
    // Don't return `set.add` because it's not chainable in IE 11.
    set.add(value);
    return set;
  }

  /**
   * A faster alternative to `Function#apply`, this function invokes `func`
   * with the `this` binding of `thisArg` and the arguments of `args`.
   *
   * @private
   * @param {Function} func The function to invoke.
   * @param {*} thisArg The `this` binding of `func`.
   * @param {Array} args The arguments to invoke `func` with.
   * @returns {*} Returns the result of `func`.
   */
  function apply(func, thisArg, args) {
    switch (args.length) {
      case 0: return func.call(thisArg);
      case 1: return func.call(thisArg, args[0]);
      case 2: return func.call(thisArg, args[0], args[1]);
      case 3: return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
  }

  /**
   * A specialized version of `baseAggregator` for arrays.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} setter The function to set `accumulator` values.
   * @param {Function} iteratee The iteratee to transform keys.
   * @param {Object} accumulator The initial aggregated object.
   * @returns {Function} Returns `accumulator`.
   */
  function arrayAggregator(array, setter, iteratee, accumulator) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      var value = array[index];
      setter(accumulator, value, iteratee(value), array);
    }
    return accumulator;
  }

  /**
   * A specialized version of `_.forEach` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns `array`.
   */
  function arrayEach(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (iteratee(array[index], index, array) === false) {
        break;
      }
    }
    return array;
  }

  /**
   * A specialized version of `_.forEachRight` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns `array`.
   */
  function arrayEachRight(array, iteratee) {
    var length = array == null ? 0 : array.length;

    while (length--) {
      if (iteratee(array[length], length, array) === false) {
        break;
      }
    }
    return array;
  }

  /**
   * A specialized version of `_.every` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if all elements pass the predicate check,
   *  else `false`.
   */
  function arrayEvery(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (!predicate(array[index], index, array)) {
        return false;
      }
    }
    return true;
  }

  /**
   * A specialized version of `_.filter` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {Array} Returns the new filtered array.
   */
  function arrayFilter(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length,
        resIndex = 0,
        result = [];

    while (++index < length) {
      var value = array[index];
      if (predicate(value, index, array)) {
        result[resIndex++] = value;
      }
    }
    return result;
  }

  /**
   * A specialized version of `_.includes` for arrays without support for
   * specifying an index to search from.
   *
   * @private
   * @param {Array} [array] The array to inspect.
   * @param {*} target The value to search for.
   * @returns {boolean} Returns `true` if `target` is found, else `false`.
   */
  function arrayIncludes(array, value) {
    var length = array == null ? 0 : array.length;
    return !!length && baseIndexOf(array, value, 0) > -1;
  }

  /**
   * This function is like `arrayIncludes` except that it accepts a comparator.
   *
   * @private
   * @param {Array} [array] The array to inspect.
   * @param {*} target The value to search for.
   * @param {Function} comparator The comparator invoked per element.
   * @returns {boolean} Returns `true` if `target` is found, else `false`.
   */
  function arrayIncludesWith(array, value, comparator) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (comparator(value, array[index])) {
        return true;
      }
    }
    return false;
  }

  /**
   * A specialized version of `_.map` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */
  function arrayMap(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length,
        result = Array(length);

    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }
    return result;
  }

  /**
   * Appends the elements of `values` to `array`.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {Array} values The values to append.
   * @returns {Array} Returns `array`.
   */
  function arrayPush(array, values) {
    var index = -1,
        length = values.length,
        offset = array.length;

    while (++index < length) {
      array[offset + index] = values[index];
    }
    return array;
  }

  /**
   * A specialized version of `_.reduce` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {*} [accumulator] The initial value.
   * @param {boolean} [initAccum] Specify using the first element of `array` as
   *  the initial value.
   * @returns {*} Returns the accumulated value.
   */
  function arrayReduce(array, iteratee, accumulator, initAccum) {
    var index = -1,
        length = array == null ? 0 : array.length;

    if (initAccum && length) {
      accumulator = array[++index];
    }
    while (++index < length) {
      accumulator = iteratee(accumulator, array[index], index, array);
    }
    return accumulator;
  }

  /**
   * A specialized version of `_.reduceRight` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {*} [accumulator] The initial value.
   * @param {boolean} [initAccum] Specify using the last element of `array` as
   *  the initial value.
   * @returns {*} Returns the accumulated value.
   */
  function arrayReduceRight(array, iteratee, accumulator, initAccum) {
    var length = array == null ? 0 : array.length;
    if (initAccum && length) {
      accumulator = array[--length];
    }
    while (length--) {
      accumulator = iteratee(accumulator, array[length], length, array);
    }
    return accumulator;
  }

  /**
   * A specialized version of `_.some` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if any element passes the predicate check,
   *  else `false`.
   */
  function arraySome(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (predicate(array[index], index, array)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Gets the size of an ASCII `string`.
   *
   * @private
   * @param {string} string The string inspect.
   * @returns {number} Returns the string size.
   */
  var asciiSize = baseProperty('length');

  /**
   * Converts an ASCII `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */
  function asciiToArray(string) {
    return string.split('');
  }

  /**
   * Splits an ASCII `string` into an array of its words.
   *
   * @private
   * @param {string} The string to inspect.
   * @returns {Array} Returns the words of `string`.
   */
  function asciiWords(string) {
    return string.match(reAsciiWord) || [];
  }

  /**
   * The base implementation of methods like `_.findKey` and `_.findLastKey`,
   * without support for iteratee shorthands, which iterates over `collection`
   * using `eachFunc`.
   *
   * @private
   * @param {Array|Object} collection The collection to inspect.
   * @param {Function} predicate The function invoked per iteration.
   * @param {Function} eachFunc The function to iterate over `collection`.
   * @returns {*} Returns the found element or its key, else `undefined`.
   */
  function baseFindKey(collection, predicate, eachFunc) {
    var result;
    eachFunc(collection, function(value, key, collection) {
      if (predicate(value, key, collection)) {
        result = key;
        return false;
      }
    });
    return result;
  }

  /**
   * The base implementation of `_.findIndex` and `_.findLastIndex` without
   * support for iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {Function} predicate The function invoked per iteration.
   * @param {number} fromIndex The index to search from.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseFindIndex(array, predicate, fromIndex, fromRight) {
    var length = array.length,
        index = fromIndex + (fromRight ? 1 : -1);

    while ((fromRight ? index-- : ++index < length)) {
      if (predicate(array[index], index, array)) {
        return index;
      }
    }
    return -1;
  }

  /**
   * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseIndexOf(array, value, fromIndex) {
    return value === value
      ? strictIndexOf(array, value, fromIndex)
      : baseFindIndex(array, baseIsNaN, fromIndex);
  }

  /**
   * This function is like `baseIndexOf` except that it accepts a comparator.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @param {Function} comparator The comparator invoked per element.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseIndexOfWith(array, value, fromIndex, comparator) {
    var index = fromIndex - 1,
        length = array.length;

    while (++index < length) {
      if (comparator(array[index], value)) {
        return index;
      }
    }
    return -1;
  }

  /**
   * The base implementation of `_.isNaN` without support for number objects.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
   */
  function baseIsNaN(value) {
    return value !== value;
  }

  /**
   * The base implementation of `_.mean` and `_.meanBy` without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {number} Returns the mean.
   */
  function baseMean(array, iteratee) {
    var length = array == null ? 0 : array.length;
    return length ? (baseSum(array, iteratee) / length) : NAN;
  }

  /**
   * The base implementation of `_.property` without support for deep paths.
   *
   * @private
   * @param {string} key The key of the property to get.
   * @returns {Function} Returns the new accessor function.
   */
  function baseProperty(key) {
    return function(object) {
      return object == null ? undefined : object[key];
    };
  }

  /**
   * The base implementation of `_.propertyOf` without support for deep paths.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Function} Returns the new accessor function.
   */
  function basePropertyOf(object) {
    return function(key) {
      return object == null ? undefined : object[key];
    };
  }

  /**
   * The base implementation of `_.reduce` and `_.reduceRight`, without support
   * for iteratee shorthands, which iterates over `collection` using `eachFunc`.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {*} accumulator The initial value.
   * @param {boolean} initAccum Specify using the first or last element of
   *  `collection` as the initial value.
   * @param {Function} eachFunc The function to iterate over `collection`.
   * @returns {*} Returns the accumulated value.
   */
  function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
    eachFunc(collection, function(value, index, collection) {
      accumulator = initAccum
        ? (initAccum = false, value)
        : iteratee(accumulator, value, index, collection);
    });
    return accumulator;
  }

  /**
   * The base implementation of `_.sortBy` which uses `comparer` to define the
   * sort order of `array` and replaces criteria objects with their corresponding
   * values.
   *
   * @private
   * @param {Array} array The array to sort.
   * @param {Function} comparer The function to define sort order.
   * @returns {Array} Returns `array`.
   */
  function baseSortBy(array, comparer) {
    var length = array.length;

    array.sort(comparer);
    while (length--) {
      array[length] = array[length].value;
    }
    return array;
  }

  /**
   * The base implementation of `_.sum` and `_.sumBy` without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {number} Returns the sum.
   */
  function baseSum(array, iteratee) {
    var result,
        index = -1,
        length = array.length;

    while (++index < length) {
      var current = iteratee(array[index]);
      if (current !== undefined) {
        result = result === undefined ? current : (result + current);
      }
    }
    return result;
  }

  /**
   * The base implementation of `_.times` without support for iteratee shorthands
   * or max array length checks.
   *
   * @private
   * @param {number} n The number of times to invoke `iteratee`.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the array of results.
   */
  function baseTimes(n, iteratee) {
    var index = -1,
        result = Array(n);

    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }

  /**
   * The base implementation of `_.toPairs` and `_.toPairsIn` which creates an array
   * of key-value pairs for `object` corresponding to the property names of `props`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array} props The property names to get values for.
   * @returns {Object} Returns the key-value pairs.
   */
  function baseToPairs(object, props) {
    return arrayMap(props, function(key) {
      return [key, object[key]];
    });
  }

  /**
   * The base implementation of `_.unary` without support for storing metadata.
   *
   * @private
   * @param {Function} func The function to cap arguments for.
   * @returns {Function} Returns the new capped function.
   */
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }

  /**
   * The base implementation of `_.values` and `_.valuesIn` which creates an
   * array of `object` property values corresponding to the property names
   * of `props`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array} props The property names to get values for.
   * @returns {Object} Returns the array of property values.
   */
  function baseValues(object, props) {
    return arrayMap(props, function(key) {
      return object[key];
    });
  }

  /**
   * Checks if a `cache` value for `key` exists.
   *
   * @private
   * @param {Object} cache The cache to query.
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function cacheHas(cache, key) {
    return cache.has(key);
  }

  /**
   * Used by `_.trim` and `_.trimStart` to get the index of the first string symbol
   * that is not found in the character symbols.
   *
   * @private
   * @param {Array} strSymbols The string symbols to inspect.
   * @param {Array} chrSymbols The character symbols to find.
   * @returns {number} Returns the index of the first unmatched string symbol.
   */
  function charsStartIndex(strSymbols, chrSymbols) {
    var index = -1,
        length = strSymbols.length;

    while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
    return index;
  }

  /**
   * Used by `_.trim` and `_.trimEnd` to get the index of the last string symbol
   * that is not found in the character symbols.
   *
   * @private
   * @param {Array} strSymbols The string symbols to inspect.
   * @param {Array} chrSymbols The character symbols to find.
   * @returns {number} Returns the index of the last unmatched string symbol.
   */
  function charsEndIndex(strSymbols, chrSymbols) {
    var index = strSymbols.length;

    while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
    return index;
  }

  /**
   * Gets the number of `placeholder` occurrences in `array`.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} placeholder The placeholder to search for.
   * @returns {number} Returns the placeholder count.
   */
  function countHolders(array, placeholder) {
    var length = array.length,
        result = 0;

    while (length--) {
      if (array[length] === placeholder) {
        ++result;
      }
    }
    return result;
  }

  /**
   * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
   * letters to basic Latin letters.
   *
   * @private
   * @param {string} letter The matched letter to deburr.
   * @returns {string} Returns the deburred letter.
   */
  var deburrLetter = basePropertyOf(deburredLetters);

  /**
   * Used by `_.escape` to convert characters to HTML entities.
   *
   * @private
   * @param {string} chr The matched character to escape.
   * @returns {string} Returns the escaped character.
   */
  var escapeHtmlChar = basePropertyOf(htmlEscapes);

  /**
   * Used by `_.template` to escape characters for inclusion in compiled string literals.
   *
   * @private
   * @param {string} chr The matched character to escape.
   * @returns {string} Returns the escaped character.
   */
  function escapeStringChar(chr) {
    return '\\' + stringEscapes[chr];
  }

  /**
   * Gets the value at `key` of `object`.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function getValue(object, key) {
    return object == null ? undefined : object[key];
  }

  /**
   * Checks if `string` contains Unicode symbols.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {boolean} Returns `true` if a symbol is found, else `false`.
   */
  function hasUnicode(string) {
    return reHasUnicode.test(string);
  }

  /**
   * Checks if `string` contains a word composed of Unicode symbols.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {boolean} Returns `true` if a word is found, else `false`.
   */
  function hasUnicodeWord(string) {
    return reHasUnicodeWord.test(string);
  }

  /**
   * Converts `iterator` to an array.
   *
   * @private
   * @param {Object} iterator The iterator to convert.
   * @returns {Array} Returns the converted array.
   */
  function iteratorToArray(iterator) {
    var data,
        result = [];

    while (!(data = iterator.next()).done) {
      result.push(data.value);
    }
    return result;
  }

  /**
   * Converts `map` to its key-value pairs.
   *
   * @private
   * @param {Object} map The map to convert.
   * @returns {Array} Returns the key-value pairs.
   */
  function mapToArray(map) {
    var index = -1,
        result = Array(map.size);

    map.forEach(function(value, key) {
      result[++index] = [key, value];
    });
    return result;
  }

  /**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }

  /**
   * Replaces all `placeholder` elements in `array` with an internal placeholder
   * and returns an array of their indexes.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {*} placeholder The placeholder to replace.
   * @returns {Array} Returns the new array of placeholder indexes.
   */
  function replaceHolders(array, placeholder) {
    var index = -1,
        length = array.length,
        resIndex = 0,
        result = [];

    while (++index < length) {
      var value = array[index];
      if (value === placeholder || value === PLACEHOLDER) {
        array[index] = PLACEHOLDER;
        result[resIndex++] = index;
      }
    }
    return result;
  }

  /**
   * Converts `set` to an array of its values.
   *
   * @private
   * @param {Object} set The set to convert.
   * @returns {Array} Returns the values.
   */
  function setToArray(set) {
    var index = -1,
        result = Array(set.size);

    set.forEach(function(value) {
      result[++index] = value;
    });
    return result;
  }

  /**
   * Converts `set` to its value-value pairs.
   *
   * @private
   * @param {Object} set The set to convert.
   * @returns {Array} Returns the value-value pairs.
   */
  function setToPairs(set) {
    var index = -1,
        result = Array(set.size);

    set.forEach(function(value) {
      result[++index] = [value, value];
    });
    return result;
  }

  /**
   * A specialized version of `_.indexOf` which performs strict equality
   * comparisons of values, i.e. `===`.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function strictIndexOf(array, value, fromIndex) {
    var index = fromIndex - 1,
        length = array.length;

    while (++index < length) {
      if (array[index] === value) {
        return index;
      }
    }
    return -1;
  }

  /**
   * A specialized version of `_.lastIndexOf` which performs strict equality
   * comparisons of values, i.e. `===`.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function strictLastIndexOf(array, value, fromIndex) {
    var index = fromIndex + 1;
    while (index--) {
      if (array[index] === value) {
        return index;
      }
    }
    return index;
  }

  /**
   * Gets the number of symbols in `string`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {number} Returns the string size.
   */
  function stringSize(string) {
    return hasUnicode(string)
      ? unicodeSize(string)
      : asciiSize(string);
  }

  /**
   * Converts `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */
  function stringToArray(string) {
    return hasUnicode(string)
      ? unicodeToArray(string)
      : asciiToArray(string);
  }

  /**
   * Used by `_.unescape` to convert HTML entities to characters.
   *
   * @private
   * @param {string} chr The matched character to unescape.
   * @returns {string} Returns the unescaped character.
   */
  var unescapeHtmlChar = basePropertyOf(htmlUnescapes);

  /**
   * Gets the size of a Unicode `string`.
   *
   * @private
   * @param {string} string The string inspect.
   * @returns {number} Returns the string size.
   */
  function unicodeSize(string) {
    var result = reUnicode.lastIndex = 0;
    while (reUnicode.test(string)) {
      ++result;
    }
    return result;
  }

  /**
   * Converts a Unicode `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */
  function unicodeToArray(string) {
    return string.match(reUnicode) || [];
  }

  /**
   * Splits a Unicode `string` into an array of its words.
   *
   * @private
   * @param {string} The string to inspect.
   * @returns {Array} Returns the words of `string`.
   */
  function unicodeWords(string) {
    return string.match(reUnicodeWord) || [];
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Create a new pristine `lodash` function using the `context` object.
   *
   * @static
   * @memberOf _
   * @since 1.1.0
   * @category Util
   * @param {Object} [context=root] The context object.
   * @returns {Function} Returns a new `lodash` function.
   * @example
   *
   * _.mixin({ 'foo': _.constant('foo') });
   *
   * var lodash = _.runInContext();
   * lodash.mixin({ 'bar': lodash.constant('bar') });
   *
   * _.isFunction(_.foo);
   * // => true
   * _.isFunction(_.bar);
   * // => false
   *
   * lodash.isFunction(lodash.foo);
   * // => false
   * lodash.isFunction(lodash.bar);
   * // => true
   *
   * // Create a suped-up `defer` in Node.js.
   * var defer = _.runInContext({ 'setTimeout': setImmediate }).defer;
   */
  var runInContext = (function runInContext(context) {
    context = context == null ? root : _.defaults(root.Object(), context, _.pick(root, contextProps));

    /** Built-in constructor references. */
    var Array = context.Array,
        Date = context.Date,
        Error = context.Error,
        Function = context.Function,
        Math = context.Math,
        Object = context.Object,
        RegExp = context.RegExp,
        String = context.String,
        TypeError = context.TypeError;

    /** Used for built-in method references. */
    var arrayProto = Array.prototype,
        funcProto = Function.prototype,
        objectProto = Object.prototype;

    /** Used to detect overreaching core-js shims. */
    var coreJsData = context['__core-js_shared__'];

    /** Used to resolve the decompiled source of functions. */
    var funcToString = funcProto.toString;

    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;

    /** Used to generate unique IDs. */
    var idCounter = 0;

    /** Used to detect methods masquerading as native. */
    var maskSrcKey = (function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
      return uid ? ('Symbol(src)_1.' + uid) : '';
    }());

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var nativeObjectToString = objectProto.toString;

    /** Used to infer the `Object` constructor. */
    var objectCtorString = funcToString.call(Object);

    /** Used to restore the original `_` reference in `_.noConflict`. */
    var oldDash = root._;

    /** Used to detect if a method is native. */
    var reIsNative = RegExp('^' +
      funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
      .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
    );

    /** Built-in value references. */
    var Buffer = moduleExports ? context.Buffer : undefined,
        Symbol = context.Symbol,
        Uint8Array = context.Uint8Array,
        allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined,
        getPrototype = overArg(Object.getPrototypeOf, Object),
        objectCreate = Object.create,
        propertyIsEnumerable = objectProto.propertyIsEnumerable,
        splice = arrayProto.splice,
        spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined,
        symIterator = Symbol ? Symbol.iterator : undefined,
        symToStringTag = Symbol ? Symbol.toStringTag : undefined;

    var defineProperty = (function() {
      try {
        var func = getNative(Object, 'defineProperty');
        func({}, '', {});
        return func;
      } catch (e) {}
    }());

    /** Mocked built-ins. */
    var ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout,
        ctxNow = Date && Date.now !== root.Date.now && Date.now,
        ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout;

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeCeil = Math.ceil,
        nativeFloor = Math.floor,
        nativeGetSymbols = Object.getOwnPropertySymbols,
        nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
        nativeIsFinite = context.isFinite,
        nativeJoin = arrayProto.join,
        nativeKeys = overArg(Object.keys, Object),
        nativeMax = Math.max,
        nativeMin = Math.min,
        nativeNow = Date.now,
        nativeParseInt = context.parseInt,
        nativeRandom = Math.random,
        nativeReverse = arrayProto.reverse;

    /* Built-in method references that are verified to be native. */
    var DataView = getNative(context, 'DataView'),
        Map = getNative(context, 'Map'),
        Promise = getNative(context, 'Promise'),
        Set = getNative(context, 'Set'),
        WeakMap = getNative(context, 'WeakMap'),
        nativeCreate = getNative(Object, 'create');

    /** Used to store function metadata. */
    var metaMap = WeakMap && new WeakMap;

    /** Used to lookup unminified function names. */
    var realNames = {};

    /** Used to detect maps, sets, and weakmaps. */
    var dataViewCtorString = toSource(DataView),
        mapCtorString = toSource(Map),
        promiseCtorString = toSource(Promise),
        setCtorString = toSource(Set),
        weakMapCtorString = toSource(WeakMap);

    /** Used to convert symbols to primitives and strings. */
    var symbolProto = Symbol ? Symbol.prototype : undefined,
        symbolValueOf = symbolProto ? symbolProto.valueOf : undefined,
        symbolToString = symbolProto ? symbolProto.toString : undefined;

    /*------------------------------------------------------------------------*/

    /**
     * Creates a `lodash` object which wraps `value` to enable implicit method
     * chain sequences. Methods that operate on and return arrays, collections,
     * and functions can be chained together. Methods that retrieve a single value
     * or may return a primitive value will automatically end the chain sequence
     * and return the unwrapped value. Otherwise, the value must be unwrapped
     * with `_#value`.
     *
     * Explicit chain sequences, which must be unwrapped with `_#value`, may be
     * enabled using `_.chain`.
     *
     * The execution of chained methods is lazy, that is, it's deferred until
     * `_#value` is implicitly or explicitly called.
     *
     * Lazy evaluation allows several methods to support shortcut fusion.
     * Shortcut fusion is an optimization to merge iteratee calls; this avoids
     * the creation of intermediate arrays and can greatly reduce the number of
     * iteratee executions. Sections of a chain sequence qualify for shortcut
     * fusion if the section is applied to an array and iteratees accept only
     * one argument. The heuristic for whether a section qualifies for shortcut
     * fusion is subject to change.
     *
     * Chaining is supported in custom builds as long as the `_#value` method is
     * directly or indirectly included in the build.
     *
     * In addition to lodash methods, wrappers have `Array` and `String` methods.
     *
     * The wrapper `Array` methods are:
     * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`
     *
     * The wrapper `String` methods are:
     * `replace` and `split`
     *
     * The wrapper methods that support shortcut fusion are:
     * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,
     * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,
     * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`
     *
     * The chainable wrapper methods are:
     * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`, `at`,
     * `before`, `bind`, `bindAll`, `bindKey`, `castArray`, `chain`, `chunk`,
     * `commit`, `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`,
     * `curry`, `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`,
     * `difference`, `differenceBy`, `differenceWith`, `drop`, `dropRight`,
     * `dropRightWhile`, `dropWhile`, `extend`, `extendWith`, `fill`, `filter`,
     * `flatMap`, `flatMapDeep`, `flatMapDepth`, `flatten`, `flattenDeep`,
     * `flattenDepth`, `flip`, `flow`, `flowRight`, `fromPairs`, `functions`,
     * `functionsIn`, `groupBy`, `initial`, `intersection`, `intersectionBy`,
     * `intersectionWith`, `invert`, `invertBy`, `invokeMap`, `iteratee`, `keyBy`,
     * `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`,
     * `memoize`, `merge`, `mergeWith`, `method`, `methodOf`, `mixin`, `negate`,
     * `nthArg`, `omit`, `omitBy`, `once`, `orderBy`, `over`, `overArgs`,
     * `overEvery`, `overSome`, `partial`, `partialRight`, `partition`, `pick`,
     * `pickBy`, `plant`, `property`, `propertyOf`, `pull`, `pullAll`, `pullAllBy`,
     * `pullAllWith`, `pullAt`, `push`, `range`, `rangeRight`, `rearg`, `reject`,
     * `remove`, `rest`, `reverse`, `sampleSize`, `set`, `setWith`, `shuffle`,
     * `slice`, `sort`, `sortBy`, `splice`, `spread`, `tail`, `take`, `takeRight`,
     * `takeRightWhile`, `takeWhile`, `tap`, `throttle`, `thru`, `toArray`,
     * `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`, `transform`, `unary`,
     * `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`, `uniqWith`, `unset`,
     * `unshift`, `unzip`, `unzipWith`, `update`, `updateWith`, `values`,
     * `valuesIn`, `without`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`,
     * `zipObject`, `zipObjectDeep`, and `zipWith`
     *
     * The wrapper methods that are **not** chainable by default are:
     * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,
     * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `conformsTo`, `deburr`,
     * `defaultTo`, `divide`, `each`, `eachRight`, `endsWith`, `eq`, `escape`,
     * `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`, `findLast`,
     * `findLastIndex`, `findLastKey`, `first`, `floor`, `forEach`, `forEachRight`,
     * `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `get`, `gt`, `gte`, `has`,
     * `hasIn`, `head`, `identity`, `includes`, `indexOf`, `inRange`, `invoke`,
     * `isArguments`, `isArray`, `isArrayBuffer`, `isArrayLike`, `isArrayLikeObject`,
     * `isBoolean`, `isBuffer`, `isDate`, `isElement`, `isEmpty`, `isEqual`,
     * `isEqualWith`, `isError`, `isFinite`, `isFunction`, `isInteger`, `isLength`,
     * `isMap`, `isMatch`, `isMatchWith`, `isNaN`, `isNative`, `isNil`, `isNull`,
     * `isNumber`, `isObject`, `isObjectLike`, `isPlainObject`, `isRegExp`,
     * `isSafeInteger`, `isSet`, `isString`, `isUndefined`, `isTypedArray`,
     * `isWeakMap`, `isWeakSet`, `join`, `kebabCase`, `last`, `lastIndexOf`,
     * `lowerCase`, `lowerFirst`, `lt`, `lte`, `max`, `maxBy`, `mean`, `meanBy`,
     * `min`, `minBy`, `multiply`, `noConflict`, `noop`, `now`, `nth`, `pad`,
     * `padEnd`, `padStart`, `parseInt`, `pop`, `random`, `reduce`, `reduceRight`,
     * `repeat`, `result`, `round`, `runInContext`, `sample`, `shift`, `size`,
     * `snakeCase`, `some`, `sortedIndex`, `sortedIndexBy`, `sortedLastIndex`,
     * `sortedLastIndexBy`, `startCase`, `startsWith`, `stubArray`, `stubFalse`,
     * `stubObject`, `stubString`, `stubTrue`, `subtract`, `sum`, `sumBy`,
     * `template`, `times`, `toFinite`, `toInteger`, `toJSON`, `toLength`,
     * `toLower`, `toNumber`, `toSafeInteger`, `toString`, `toUpper`, `trim`,
     * `trimEnd`, `trimStart`, `truncate`, `unescape`, `uniqueId`, `upperCase`,
     * `upperFirst`, `value`, and `words`
     *
     * @name _
     * @constructor
     * @category Seq
     * @param {*} value The value to wrap in a `lodash` instance.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var wrapped = _([1, 2, 3]);
     *
     * // Returns an unwrapped value.
     * wrapped.reduce(_.add);
     * // => 6
     *
     * // Returns a wrapped value.
     * var squares = wrapped.map(square);
     *
     * _.isArray(squares);
     * // => false
     *
     * _.isArray(squares.value());
     * // => true
     */
    function lodash(value) {
      if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
        if (value instanceof LodashWrapper) {
          return value;
        }
        if (hasOwnProperty.call(value, '__wrapped__')) {
          return wrapperClone(value);
        }
      }
      return new LodashWrapper(value);
    }

    /**
     * The base implementation of `_.create` without support for assigning
     * properties to the created object.
     *
     * @private
     * @param {Object} proto The object to inherit from.
     * @returns {Object} Returns the new object.
     */
    var baseCreate = (function() {
      function object() {}
      return function(proto) {
        if (!isObject(proto)) {
          return {};
        }
        if (objectCreate) {
          return objectCreate(proto);
        }
        object.prototype = proto;
        var result = new object;
        object.prototype = undefined;
        return result;
      };
    }());

    /**
     * The function whose prototype chain sequence wrappers inherit from.
     *
     * @private
     */
    function baseLodash() {
      // No operation performed.
    }

    /**
     * The base constructor for creating `lodash` wrapper objects.
     *
     * @private
     * @param {*} value The value to wrap.
     * @param {boolean} [chainAll] Enable explicit method chain sequences.
     */
    function LodashWrapper(value, chainAll) {
      this.__wrapped__ = value;
      this.__actions__ = [];
      this.__chain__ = !!chainAll;
      this.__index__ = 0;
      this.__values__ = undefined;
    }

    /**
     * By default, the template delimiters used by lodash are like those in
     * embedded Ruby (ERB) as well as ES2015 template strings. Change the
     * following template settings to use alternative delimiters.
     *
     * @static
     * @memberOf _
     * @type {Object}
     */
    lodash.templateSettings = {

      /**
       * Used to detect `data` property values to be HTML-escaped.
       *
       * @memberOf _.templateSettings
       * @type {RegExp}
       */
      'escape': reEscape,

      /**
       * Used to detect code to be evaluated.
       *
       * @memberOf _.templateSettings
       * @type {RegExp}
       */
      'evaluate': reEvaluate,

      /**
       * Used to detect `data` property values to inject.
       *
       * @memberOf _.templateSettings
       * @type {RegExp}
       */
      'interpolate': reInterpolate,

      /**
       * Used to reference the data object in the template text.
       *
       * @memberOf _.templateSettings
       * @type {string}
       */
      'variable': '',

      /**
       * Used to import variables into the compiled template.
       *
       * @memberOf _.templateSettings
       * @type {Object}
       */
      'imports': {

        /**
         * A reference to the `lodash` function.
         *
         * @memberOf _.templateSettings.imports
         * @type {Function}
         */
        '_': lodash
      }
    };

    // Ensure wrappers are instances of `baseLodash`.
    lodash.prototype = baseLodash.prototype;
    lodash.prototype.constructor = lodash;

    LodashWrapper.prototype = baseCreate(baseLodash.prototype);
    LodashWrapper.prototype.constructor = LodashWrapper;

    /*------------------------------------------------------------------------*/

    /**
     * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
     *
     * @private
     * @constructor
     * @param {*} value The value to wrap.
     */
    function LazyWrapper(value) {
      this.__wrapped__ = value;
      this.__actions__ = [];
      this.__dir__ = 1;
      this.__filtered__ = false;
      this.__iteratees__ = [];
      this.__takeCount__ = MAX_ARRAY_LENGTH;
      this.__views__ = [];
    }

    /**
     * Creates a clone of the lazy wrapper object.
     *
     * @private
     * @name clone
     * @memberOf LazyWrapper
     * @returns {Object} Returns the cloned `LazyWrapper` object.
     */
    function lazyClone() {
      var result = new LazyWrapper(this.__wrapped__);
      result.__actions__ = copyArray(this.__actions__);
      result.__dir__ = this.__dir__;
      result.__filtered__ = this.__filtered__;
      result.__iteratees__ = copyArray(this.__iteratees__);
      result.__takeCount__ = this.__takeCount__;
      result.__views__ = copyArray(this.__views__);
      return result;
    }

    /**
     * Reverses the direction of lazy iteration.
     *
     * @private
     * @name reverse
     * @memberOf LazyWrapper
     * @returns {Object} Returns the new reversed `LazyWrapper` object.
     */
    function lazyReverse() {
      if (this.__filtered__) {
        var result = new LazyWrapper(this);
        result.__dir__ = -1;
        result.__filtered__ = true;
      } else {
        result = this.clone();
        result.__dir__ *= -1;
      }
      return result;
    }

    /**
     * Extracts the unwrapped value from its lazy wrapper.
     *
     * @private
     * @name value
     * @memberOf LazyWrapper
     * @returns {*} Returns the unwrapped value.
     */
    function lazyValue() {
      var array = this.__wrapped__.value(),
          dir = this.__dir__,
          isArr = isArray(array),
          isRight = dir < 0,
          arrLength = isArr ? array.length : 0,
          view = getView(0, arrLength, this.__views__),
          start = view.start,
          end = view.end,
          length = end - start,
          index = isRight ? end : (start - 1),
          iteratees = this.__iteratees__,
          iterLength = iteratees.length,
          resIndex = 0,
          takeCount = nativeMin(length, this.__takeCount__);

      if (!isArr || (!isRight && arrLength == length && takeCount == length)) {
        return baseWrapperValue(array, this.__actions__);
      }
      var result = [];

      outer:
      while (length-- && resIndex < takeCount) {
        index += dir;

        var iterIndex = -1,
            value = array[index];

        while (++iterIndex < iterLength) {
          var data = iteratees[iterIndex],
              iteratee = data.iteratee,
              type = data.type,
              computed = iteratee(value);

          if (type == LAZY_MAP_FLAG) {
            value = computed;
          } else if (!computed) {
            if (type == LAZY_FILTER_FLAG) {
              continue outer;
            } else {
              break outer;
            }
          }
        }
        result[resIndex++] = value;
      }
      return result;
    }

    // Ensure `LazyWrapper` is an instance of `baseLodash`.
    LazyWrapper.prototype = baseCreate(baseLodash.prototype);
    LazyWrapper.prototype.constructor = LazyWrapper;

    /*------------------------------------------------------------------------*/

    /**
     * Creates a hash object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function Hash(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    /**
     * Removes all key-value entries from the hash.
     *
     * @private
     * @name clear
     * @memberOf Hash
     */
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
      this.size = 0;
    }

    /**
     * Removes `key` and its value from the hash.
     *
     * @private
     * @name delete
     * @memberOf Hash
     * @param {Object} hash The hash to modify.
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function hashDelete(key) {
      var result = this.has(key) && delete this.__data__[key];
      this.size -= result ? 1 : 0;
      return result;
    }

    /**
     * Gets the hash value for `key`.
     *
     * @private
     * @name get
     * @memberOf Hash
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? undefined : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : undefined;
    }

    /**
     * Checks if a hash value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Hash
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
    }

    /**
     * Sets the hash `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Hash
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the hash instance.
     */
    function hashSet(key, value) {
      var data = this.__data__;
      this.size += this.has(key) ? 0 : 1;
      data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
      return this;
    }

    // Add methods to `Hash`.
    Hash.prototype.clear = hashClear;
    Hash.prototype['delete'] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;

    /*------------------------------------------------------------------------*/

    /**
     * Creates an list cache object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function ListCache(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    /**
     * Removes all key-value entries from the list cache.
     *
     * @private
     * @name clear
     * @memberOf ListCache
     */
    function listCacheClear() {
      this.__data__ = [];
      this.size = 0;
    }

    /**
     * Removes `key` and its value from the list cache.
     *
     * @private
     * @name delete
     * @memberOf ListCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function listCacheDelete(key) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      --this.size;
      return true;
    }

    /**
     * Gets the list cache value for `key`.
     *
     * @private
     * @name get
     * @memberOf ListCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function listCacheGet(key) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      return index < 0 ? undefined : data[index][1];
    }

    /**
     * Checks if a list cache value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf ListCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }

    /**
     * Sets the list cache `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf ListCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the list cache instance.
     */
    function listCacheSet(key, value) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      if (index < 0) {
        ++this.size;
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }

    // Add methods to `ListCache`.
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype['delete'] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;

    /*------------------------------------------------------------------------*/

    /**
     * Creates a map cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function MapCache(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    /**
     * Removes all key-value entries from the map.
     *
     * @private
     * @name clear
     * @memberOf MapCache
     */
    function mapCacheClear() {
      this.size = 0;
      this.__data__ = {
        'hash': new Hash,
        'map': new (Map || ListCache),
        'string': new Hash
      };
    }

    /**
     * Removes `key` and its value from the map.
     *
     * @private
     * @name delete
     * @memberOf MapCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function mapCacheDelete(key) {
      var result = getMapData(this, key)['delete'](key);
      this.size -= result ? 1 : 0;
      return result;
    }

    /**
     * Gets the map value for `key`.
     *
     * @private
     * @name get
     * @memberOf MapCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }

    /**
     * Checks if a map value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf MapCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }

    /**
     * Sets the map `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf MapCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the map cache instance.
     */
    function mapCacheSet(key, value) {
      var data = getMapData(this, key),
          size = data.size;

      data.set(key, value);
      this.size += data.size == size ? 0 : 1;
      return this;
    }

    // Add methods to `MapCache`.
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype['delete'] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;

    /*------------------------------------------------------------------------*/

    /**
     *
     * Creates an array cache object to store unique values.
     *
     * @private
     * @constructor
     * @param {Array} [values] The values to cache.
     */
    function SetCache(values) {
      var index = -1,
          length = values == null ? 0 : values.length;

      this.__data__ = new MapCache;
      while (++index < length) {
        this.add(values[index]);
      }
    }

    /**
     * Adds `value` to the array cache.
     *
     * @private
     * @name add
     * @memberOf SetCache
     * @alias push
     * @param {*} value The value to cache.
     * @returns {Object} Returns the cache instance.
     */
    function setCacheAdd(value) {
      this.__data__.set(value, HASH_UNDEFINED);
      return this;
    }

    /**
     * Checks if `value` is in the array cache.
     *
     * @private
     * @name has
     * @memberOf SetCache
     * @param {*} value The value to search for.
     * @returns {number} Returns `true` if `value` is found, else `false`.
     */
    function setCacheHas(value) {
      return this.__data__.has(value);
    }

    // Add methods to `SetCache`.
    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
    SetCache.prototype.has = setCacheHas;

    /*------------------------------------------------------------------------*/

    /**
     * Creates a stack cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function Stack(entries) {
      var data = this.__data__ = new ListCache(entries);
      this.size = data.size;
    }

    /**
     * Removes all key-value entries from the stack.
     *
     * @private
     * @name clear
     * @memberOf Stack
     */
    function stackClear() {
      this.__data__ = new ListCache;
      this.size = 0;
    }

    /**
     * Removes `key` and its value from the stack.
     *
     * @private
     * @name delete
     * @memberOf Stack
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function stackDelete(key) {
      var data = this.__data__,
          result = data['delete'](key);

      this.size = data.size;
      return result;
    }

    /**
     * Gets the stack value for `key`.
     *
     * @private
     * @name get
     * @memberOf Stack
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function stackGet(key) {
      return this.__data__.get(key);
    }

    /**
     * Checks if a stack value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Stack
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function stackHas(key) {
      return this.__data__.has(key);
    }

    /**
     * Sets the stack `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Stack
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the stack cache instance.
     */
    function stackSet(key, value) {
      var data = this.__data__;
      if (data instanceof ListCache) {
        var pairs = data.__data__;
        if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
          pairs.push([key, value]);
          this.size = ++data.size;
          return this;
        }
        data = this.__data__ = new MapCache(pairs);
      }
      data.set(key, value);
      this.size = data.size;
      return this;
    }

    // Add methods to `Stack`.
    Stack.prototype.clear = stackClear;
    Stack.prototype['delete'] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;

    /*------------------------------------------------------------------------*/

    /**
     * Creates an array of the enumerable property names of the array-like `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @param {boolean} inherited Specify returning inherited property names.
     * @returns {Array} Returns the array of property names.
     */
    function arrayLikeKeys(value, inherited) {
      var isArr = isArray(value),
          isArg = !isArr && isArguments(value),
          isBuff = !isArr && !isArg && isBuffer(value),
          isType = !isArr && !isArg && !isBuff && isTypedArray(value),
          skipIndexes = isArr || isArg || isBuff || isType,
          result = skipIndexes ? baseTimes(value.length, String) : [],
          length = result.length;

      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) &&
            !(skipIndexes && (
               // Safari 9 has enumerable `arguments.length` in strict mode.
               key == 'length' ||
               // Node.js 0.10 has enumerable non-index properties on buffers.
               (isBuff && (key == 'offset' || key == 'parent')) ||
               // PhantomJS 2 has enumerable non-index properties on typed arrays.
               (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
               // Skip index properties.
               isIndex(key, length)
            ))) {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * A specialized version of `_.sample` for arrays.
     *
     * @private
     * @param {Array} array The array to sample.
     * @returns {*} Returns the random element.
     */
    function arraySample(array) {
      var length = array.length;
      return length ? array[baseRandom(0, length - 1)] : undefined;
    }

    /**
     * A specialized version of `_.sampleSize` for arrays.
     *
     * @private
     * @param {Array} array The array to sample.
     * @param {number} n The number of elements to sample.
     * @returns {Array} Returns the random elements.
     */
    function arraySampleSize(array, n) {
      return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
    }

    /**
     * A specialized version of `_.shuffle` for arrays.
     *
     * @private
     * @param {Array} array The array to shuffle.
     * @returns {Array} Returns the new shuffled array.
     */
    function arrayShuffle(array) {
      return shuffleSelf(copyArray(array));
    }

    /**
     * This function is like `assignValue` except that it doesn't assign
     * `undefined` values.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */
    function assignMergeValue(object, key, value) {
      if ((value !== undefined && !eq(object[key], value)) ||
          (value === undefined && !(key in object))) {
        baseAssignValue(object, key, value);
      }
    }

    /**
     * Assigns `value` to `key` of `object` if the existing value is not equivalent
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */
    function assignValue(object, key, value) {
      var objValue = object[key];
      if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
          (value === undefined && !(key in object))) {
        baseAssignValue(object, key, value);
      }
    }

    /**
     * Gets the index at which the `key` is found in `array` of key-value pairs.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} key The key to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }

    /**
     * Aggregates elements of `collection` on `accumulator` with keys transformed
     * by `iteratee` and values set by `setter`.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} setter The function to set `accumulator` values.
     * @param {Function} iteratee The iteratee to transform keys.
     * @param {Object} accumulator The initial aggregated object.
     * @returns {Function} Returns `accumulator`.
     */
    function baseAggregator(collection, setter, iteratee, accumulator) {
      baseEach(collection, function(value, key, collection) {
        setter(accumulator, value, iteratee(value), collection);
      });
      return accumulator;
    }

    /**
     * The base implementation of `_.assign` without support for multiple sources
     * or `customizer` functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @returns {Object} Returns `object`.
     */
    function baseAssign(object, source) {
      return object && copyObject(source, keys(source), object);
    }

    /**
     * The base implementation of `_.assignIn` without support for multiple sources
     * or `customizer` functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @returns {Object} Returns `object`.
     */
    function baseAssignIn(object, source) {
      return object && copyObject(source, keysIn(source), object);
    }

    /**
     * The base implementation of `assignValue` and `assignMergeValue` without
     * value checks.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */
    function baseAssignValue(object, key, value) {
      if (key == '__proto__' && defineProperty) {
        defineProperty(object, key, {
          'configurable': true,
          'enumerable': true,
          'value': value,
          'writable': true
        });
      } else {
        object[key] = value;
      }
    }

    /**
     * The base implementation of `_.at` without support for individual paths.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {string[]} paths The property paths to pick.
     * @returns {Array} Returns the picked elements.
     */
    function baseAt(object, paths) {
      var index = -1,
          length = paths.length,
          result = Array(length),
          skip = object == null;

      while (++index < length) {
        result[index] = skip ? undefined : get(object, paths[index]);
      }
      return result;
    }

    /**
     * The base implementation of `_.clamp` which doesn't coerce arguments.
     *
     * @private
     * @param {number} number The number to clamp.
     * @param {number} [lower] The lower bound.
     * @param {number} upper The upper bound.
     * @returns {number} Returns the clamped number.
     */
    function baseClamp(number, lower, upper) {
      if (number === number) {
        if (upper !== undefined) {
          number = number <= upper ? number : upper;
        }
        if (lower !== undefined) {
          number = number >= lower ? number : lower;
        }
      }
      return number;
    }

    /**
     * The base implementation of `_.clone` and `_.cloneDeep` which tracks
     * traversed objects.
     *
     * @private
     * @param {*} value The value to clone.
     * @param {boolean} bitmask The bitmask flags.
     *  1 - Deep clone
     *  2 - Flatten inherited properties
     *  4 - Clone symbols
     * @param {Function} [customizer] The function to customize cloning.
     * @param {string} [key] The key of `value`.
     * @param {Object} [object] The parent object of `value`.
     * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
     * @returns {*} Returns the cloned value.
     */
    function baseClone(value, bitmask, customizer, key, object, stack) {
      var result,
          isDeep = bitmask & CLONE_DEEP_FLAG,
          isFlat = bitmask & CLONE_FLAT_FLAG,
          isFull = bitmask & CLONE_SYMBOLS_FLAG;

      if (customizer) {
        result = object ? customizer(value, key, object, stack) : customizer(value);
      }
      if (result !== undefined) {
        return result;
      }
      if (!isObject(value)) {
        return value;
      }
      var isArr = isArray(value);
      if (isArr) {
        result = initCloneArray(value);
        if (!isDeep) {
          return copyArray(value, result);
        }
      } else {
        var tag = getTag(value),
            isFunc = tag == funcTag || tag == genTag;

        if (isBuffer(value)) {
          return cloneBuffer(value, isDeep);
        }
        if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
          result = (isFlat || isFunc) ? {} : initCloneObject(value);
          if (!isDeep) {
            return isFlat
              ? copySymbolsIn(value, baseAssignIn(result, value))
              : copySymbols(value, baseAssign(result, value));
          }
        } else {
          if (!cloneableTags[tag]) {
            return object ? value : {};
          }
          result = initCloneByTag(value, tag, baseClone, isDeep);
        }
      }
      // Check for circular references and return its corresponding clone.
      stack || (stack = new Stack);
      var stacked = stack.get(value);
      if (stacked) {
        return stacked;
      }
      stack.set(value, result);

      var keysFunc = isFull
        ? (isFlat ? getAllKeysIn : getAllKeys)
        : (isFlat ? keysIn : keys);

      var props = isArr ? undefined : keysFunc(value);
      arrayEach(props || value, function(subValue, key) {
        if (props) {
          key = subValue;
          subValue = value[key];
        }
        // Recursively populate clone (susceptible to call stack limits).
        assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
      });
      return result;
    }

    /**
     * The base implementation of `_.conforms` which doesn't clone `source`.
     *
     * @private
     * @param {Object} source The object of property predicates to conform to.
     * @returns {Function} Returns the new spec function.
     */
    function baseConforms(source) {
      var props = keys(source);
      return function(object) {
        return baseConformsTo(object, source, props);
      };
    }

    /**
     * The base implementation of `_.conformsTo` which accepts `props` to check.
     *
     * @private
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property predicates to conform to.
     * @returns {boolean} Returns `true` if `object` conforms, else `false`.
     */
    function baseConformsTo(object, source, props) {
      var length = props.length;
      if (object == null) {
        return !length;
      }
      object = Object(object);
      while (length--) {
        var key = props[length],
            predicate = source[key],
            value = object[key];

        if ((value === undefined && !(key in object)) || !predicate(value)) {
          return false;
        }
      }
      return true;
    }

    /**
     * The base implementation of `_.delay` and `_.defer` which accepts `args`
     * to provide to `func`.
     *
     * @private
     * @param {Function} func The function to delay.
     * @param {number} wait The number of milliseconds to delay invocation.
     * @param {Array} args The arguments to provide to `func`.
     * @returns {number|Object} Returns the timer id or timeout object.
     */
    function baseDelay(func, wait, args) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      return setTimeout(function() { func.apply(undefined, args); }, wait);
    }

    /**
     * The base implementation of methods like `_.difference` without support
     * for excluding multiple arrays or iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Array} values The values to exclude.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of filtered values.
     */
    function baseDifference(array, values, iteratee, comparator) {
      var index = -1,
          includes = arrayIncludes,
          isCommon = true,
          length = array.length,
          result = [],
          valuesLength = values.length;

      if (!length) {
        return result;
      }
      if (iteratee) {
        values = arrayMap(values, baseUnary(iteratee));
      }
      if (comparator) {
        includes = arrayIncludesWith;
        isCommon = false;
      }
      else if (values.length >= LARGE_ARRAY_SIZE) {
        includes = cacheHas;
        isCommon = false;
        values = new SetCache(values);
      }
      outer:
      while (++index < length) {
        var value = array[index],
            computed = iteratee == null ? value : iteratee(value);

        value = (comparator || value !== 0) ? value : 0;
        if (isCommon && computed === computed) {
          var valuesIndex = valuesLength;
          while (valuesIndex--) {
            if (values[valuesIndex] === computed) {
              continue outer;
            }
          }
          result.push(value);
        }
        else if (!includes(values, computed, comparator)) {
          result.push(value);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.forEach` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array|Object} Returns `collection`.
     */
    var baseEach = createBaseEach(baseForOwn);

    /**
     * The base implementation of `_.forEachRight` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array|Object} Returns `collection`.
     */
    var baseEachRight = createBaseEach(baseForOwnRight, true);

    /**
     * The base implementation of `_.every` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if all elements pass the predicate check,
     *  else `false`
     */
    function baseEvery(collection, predicate) {
      var result = true;
      baseEach(collection, function(value, index, collection) {
        result = !!predicate(value, index, collection);
        return result;
      });
      return result;
    }

    /**
     * The base implementation of methods like `_.max` and `_.min` which accepts a
     * `comparator` to determine the extremum value.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The iteratee invoked per iteration.
     * @param {Function} comparator The comparator used to compare values.
     * @returns {*} Returns the extremum value.
     */
    function baseExtremum(array, iteratee, comparator) {
      var index = -1,
          length = array.length;

      while (++index < length) {
        var value = array[index],
            current = iteratee(value);

        if (current != null && (computed === undefined
              ? (current === current && !isSymbol(current))
              : comparator(current, computed)
            )) {
          var computed = current,
              result = value;
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.fill` without an iteratee call guard.
     *
     * @private
     * @param {Array} array The array to fill.
     * @param {*} value The value to fill `array` with.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns `array`.
     */
    function baseFill(array, value, start, end) {
      var length = array.length;

      start = toInteger(start);
      if (start < 0) {
        start = -start > length ? 0 : (length + start);
      }
      end = (end === undefined || end > length) ? length : toInteger(end);
      if (end < 0) {
        end += length;
      }
      end = start > end ? 0 : toLength(end);
      while (start < end) {
        array[start++] = value;
      }
      return array;
    }

    /**
     * The base implementation of `_.filter` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     */
    function baseFilter(collection, predicate) {
      var result = [];
      baseEach(collection, function(value, index, collection) {
        if (predicate(value, index, collection)) {
          result.push(value);
        }
      });
      return result;
    }

    /**
     * The base implementation of `_.flatten` with support for restricting flattening.
     *
     * @private
     * @param {Array} array The array to flatten.
     * @param {number} depth The maximum recursion depth.
     * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
     * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
     * @param {Array} [result=[]] The initial result value.
     * @returns {Array} Returns the new flattened array.
     */
    function baseFlatten(array, depth, predicate, isStrict, result) {
      var index = -1,
          length = array.length;

      predicate || (predicate = isFlattenable);
      result || (result = []);

      while (++index < length) {
        var value = array[index];
        if (depth > 0 && predicate(value)) {
          if (depth > 1) {
            // Recursively flatten arrays (susceptible to call stack limits).
            baseFlatten(value, depth - 1, predicate, isStrict, result);
          } else {
            arrayPush(result, value);
          }
        } else if (!isStrict) {
          result[result.length] = value;
        }
      }
      return result;
    }

    /**
     * The base implementation of `baseForOwn` which iterates over `object`
     * properties returned by `keysFunc` and invokes `iteratee` for each property.
     * Iteratee functions may exit iteration early by explicitly returning `false`.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @returns {Object} Returns `object`.
     */
    var baseFor = createBaseFor();

    /**
     * This function is like `baseFor` except that it iterates over properties
     * in the opposite order.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @returns {Object} Returns `object`.
     */
    var baseForRight = createBaseFor(true);

    /**
     * The base implementation of `_.forOwn` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Object} Returns `object`.
     */
    function baseForOwn(object, iteratee) {
      return object && baseFor(object, iteratee, keys);
    }

    /**
     * The base implementation of `_.forOwnRight` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Object} Returns `object`.
     */
    function baseForOwnRight(object, iteratee) {
      return object && baseForRight(object, iteratee, keys);
    }

    /**
     * The base implementation of `_.functions` which creates an array of
     * `object` function property names filtered from `props`.
     *
     * @private
     * @param {Object} object The object to inspect.
     * @param {Array} props The property names to filter.
     * @returns {Array} Returns the function names.
     */
    function baseFunctions(object, props) {
      return arrayFilter(props, function(key) {
        return isFunction(object[key]);
      });
    }

    /**
     * The base implementation of `_.get` without support for default values.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to get.
     * @returns {*} Returns the resolved value.
     */
    function baseGet(object, path) {
      path = castPath(path, object);

      var index = 0,
          length = path.length;

      while (object != null && index < length) {
        object = object[toKey(path[index++])];
      }
      return (index && index == length) ? object : undefined;
    }

    /**
     * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
     * `keysFunc` and `symbolsFunc` to get the enumerable property names and
     * symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @param {Function} symbolsFunc The function to get the symbols of `object`.
     * @returns {Array} Returns the array of property names and symbols.
     */
    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
      var result = keysFunc(object);
      return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
    }

    /**
     * The base implementation of `getTag` without fallbacks for buggy environments.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */
    function baseGetTag(value) {
      if (value == null) {
        return value === undefined ? undefinedTag : nullTag;
      }
      return (symToStringTag && symToStringTag in Object(value))
        ? getRawTag(value)
        : objectToString(value);
    }

    /**
     * The base implementation of `_.gt` which doesn't coerce arguments.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is greater than `other`,
     *  else `false`.
     */
    function baseGt(value, other) {
      return value > other;
    }

    /**
     * The base implementation of `_.has` without support for deep paths.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {Array|string} key The key to check.
     * @returns {boolean} Returns `true` if `key` exists, else `false`.
     */
    function baseHas(object, key) {
      return object != null && hasOwnProperty.call(object, key);
    }

    /**
     * The base implementation of `_.hasIn` without support for deep paths.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {Array|string} key The key to check.
     * @returns {boolean} Returns `true` if `key` exists, else `false`.
     */
    function baseHasIn(object, key) {
      return object != null && key in Object(object);
    }

    /**
     * The base implementation of `_.inRange` which doesn't coerce arguments.
     *
     * @private
     * @param {number} number The number to check.
     * @param {number} start The start of the range.
     * @param {number} end The end of the range.
     * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
     */
    function baseInRange(number, start, end) {
      return number >= nativeMin(start, end) && number < nativeMax(start, end);
    }

    /**
     * The base implementation of methods like `_.intersection`, without support
     * for iteratee shorthands, that accepts an array of arrays to inspect.
     *
     * @private
     * @param {Array} arrays The arrays to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of shared values.
     */
    function baseIntersection(arrays, iteratee, comparator) {
      var includes = comparator ? arrayIncludesWith : arrayIncludes,
          length = arrays[0].length,
          othLength = arrays.length,
          othIndex = othLength,
          caches = Array(othLength),
          maxLength = Infinity,
          result = [];

      while (othIndex--) {
        var array = arrays[othIndex];
        if (othIndex && iteratee) {
          array = arrayMap(array, baseUnary(iteratee));
        }
        maxLength = nativeMin(array.length, maxLength);
        caches[othIndex] = !comparator && (iteratee || (length >= 120 && array.length >= 120))
          ? new SetCache(othIndex && array)
          : undefined;
      }
      array = arrays[0];

      var index = -1,
          seen = caches[0];

      outer:
      while (++index < length && result.length < maxLength) {
        var value = array[index],
            computed = iteratee ? iteratee(value) : value;

        value = (comparator || value !== 0) ? value : 0;
        if (!(seen
              ? cacheHas(seen, computed)
              : includes(result, computed, comparator)
            )) {
          othIndex = othLength;
          while (--othIndex) {
            var cache = caches[othIndex];
            if (!(cache
                  ? cacheHas(cache, computed)
                  : includes(arrays[othIndex], computed, comparator))
                ) {
              continue outer;
            }
          }
          if (seen) {
            seen.push(computed);
          }
          result.push(value);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.invert` and `_.invertBy` which inverts
     * `object` with values transformed by `iteratee` and set by `setter`.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} setter The function to set `accumulator` values.
     * @param {Function} iteratee The iteratee to transform values.
     * @param {Object} accumulator The initial inverted object.
     * @returns {Function} Returns `accumulator`.
     */
    function baseInverter(object, setter, iteratee, accumulator) {
      baseForOwn(object, function(value, key, object) {
        setter(accumulator, iteratee(value), key, object);
      });
      return accumulator;
    }

    /**
     * The base implementation of `_.invoke` without support for individual
     * method arguments.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the method to invoke.
     * @param {Array} args The arguments to invoke the method with.
     * @returns {*} Returns the result of the invoked method.
     */
    function baseInvoke(object, path, args) {
      path = castPath(path, object);
      object = parent(object, path);
      var func = object == null ? object : object[toKey(last(path))];
      return func == null ? undefined : apply(func, object, args);
    }

    /**
     * The base implementation of `_.isArguments`.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     */
    function baseIsArguments(value) {
      return isObjectLike(value) && baseGetTag(value) == argsTag;
    }

    /**
     * The base implementation of `_.isArrayBuffer` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array buffer, else `false`.
     */
    function baseIsArrayBuffer(value) {
      return isObjectLike(value) && baseGetTag(value) == arrayBufferTag;
    }

    /**
     * The base implementation of `_.isDate` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
     */
    function baseIsDate(value) {
      return isObjectLike(value) && baseGetTag(value) == dateTag;
    }

    /**
     * The base implementation of `_.isEqual` which supports partial comparisons
     * and tracks traversed objects.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @param {boolean} bitmask The bitmask flags.
     *  1 - Unordered comparison
     *  2 - Partial comparison
     * @param {Function} [customizer] The function to customize comparisons.
     * @param {Object} [stack] Tracks traversed `value` and `other` objects.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     */
    function baseIsEqual(value, other, bitmask, customizer, stack) {
      if (value === other) {
        return true;
      }
      if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
        return value !== value && other !== other;
      }
      return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
    }

    /**
     * A specialized version of `baseIsEqual` for arrays and objects which performs
     * deep comparisons and tracks traversed objects enabling objects with circular
     * references to be compared.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} [stack] Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
      var objIsArr = isArray(object),
          othIsArr = isArray(other),
          objTag = objIsArr ? arrayTag : getTag(object),
          othTag = othIsArr ? arrayTag : getTag(other);

      objTag = objTag == argsTag ? objectTag : objTag;
      othTag = othTag == argsTag ? objectTag : othTag;

      var objIsObj = objTag == objectTag,
          othIsObj = othTag == objectTag,
          isSameTag = objTag == othTag;

      if (isSameTag && isBuffer(object)) {
        if (!isBuffer(other)) {
          return false;
        }
        objIsArr = true;
        objIsObj = false;
      }
      if (isSameTag && !objIsObj) {
        stack || (stack = new Stack);
        return (objIsArr || isTypedArray(object))
          ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
          : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
      }
      if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
        var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
            othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

        if (objIsWrapped || othIsWrapped) {
          var objUnwrapped = objIsWrapped ? object.value() : object,
              othUnwrapped = othIsWrapped ? other.value() : other;

          stack || (stack = new Stack);
          return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
        }
      }
      if (!isSameTag) {
        return false;
      }
      stack || (stack = new Stack);
      return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
    }

    /**
     * The base implementation of `_.isMap` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a map, else `false`.
     */
    function baseIsMap(value) {
      return isObjectLike(value) && getTag(value) == mapTag;
    }

    /**
     * The base implementation of `_.isMatch` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property values to match.
     * @param {Array} matchData The property names, values, and compare flags to match.
     * @param {Function} [customizer] The function to customize comparisons.
     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
     */
    function baseIsMatch(object, source, matchData, customizer) {
      var index = matchData.length,
          length = index,
          noCustomizer = !customizer;

      if (object == null) {
        return !length;
      }
      object = Object(object);
      while (index--) {
        var data = matchData[index];
        if ((noCustomizer && data[2])
              ? data[1] !== object[data[0]]
              : !(data[0] in object)
            ) {
          return false;
        }
      }
      while (++index < length) {
        data = matchData[index];
        var key = data[0],
            objValue = object[key],
            srcValue = data[1];

        if (noCustomizer && data[2]) {
          if (objValue === undefined && !(key in object)) {
            return false;
          }
        } else {
          var stack = new Stack;
          if (customizer) {
            var result = customizer(objValue, srcValue, key, object, source, stack);
          }
          if (!(result === undefined
                ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
                : result
              )) {
            return false;
          }
        }
      }
      return true;
    }

    /**
     * The base implementation of `_.isNative` without bad shim checks.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function,
     *  else `false`.
     */
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }

    /**
     * The base implementation of `_.isRegExp` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
     */
    function baseIsRegExp(value) {
      return isObjectLike(value) && baseGetTag(value) == regexpTag;
    }

    /**
     * The base implementation of `_.isSet` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a set, else `false`.
     */
    function baseIsSet(value) {
      return isObjectLike(value) && getTag(value) == setTag;
    }

    /**
     * The base implementation of `_.isTypedArray` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
     */
    function baseIsTypedArray(value) {
      return isObjectLike(value) &&
        isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
    }

    /**
     * The base implementation of `_.iteratee`.
     *
     * @private
     * @param {*} [value=_.identity] The value to convert to an iteratee.
     * @returns {Function} Returns the iteratee.
     */
    function baseIteratee(value) {
      // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
      // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
      if (typeof value == 'function') {
        return value;
      }
      if (value == null) {
        return identity;
      }
      if (typeof value == 'object') {
        return isArray(value)
          ? baseMatchesProperty(value[0], value[1])
          : baseMatches(value);
      }
      return property(value);
    }

    /**
     * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty.call(object, key) && key != 'constructor') {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function baseKeysIn(object) {
      if (!isObject(object)) {
        return nativeKeysIn(object);
      }
      var isProto = isPrototype(object),
          result = [];

      for (var key in object) {
        if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.lt` which doesn't coerce arguments.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is less than `other`,
     *  else `false`.
     */
    function baseLt(value, other) {
      return value < other;
    }

    /**
     * The base implementation of `_.map` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     */
    function baseMap(collection, iteratee) {
      var index = -1,
          result = isArrayLike(collection) ? Array(collection.length) : [];

      baseEach(collection, function(value, key, collection) {
        result[++index] = iteratee(value, key, collection);
      });
      return result;
    }

    /**
     * The base implementation of `_.matches` which doesn't clone `source`.
     *
     * @private
     * @param {Object} source The object of property values to match.
     * @returns {Function} Returns the new spec function.
     */
    function baseMatches(source) {
      var matchData = getMatchData(source);
      if (matchData.length == 1 && matchData[0][2]) {
        return matchesStrictComparable(matchData[0][0], matchData[0][1]);
      }
      return function(object) {
        return object === source || baseIsMatch(object, source, matchData);
      };
    }

    /**
     * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
     *
     * @private
     * @param {string} path The path of the property to get.
     * @param {*} srcValue The value to match.
     * @returns {Function} Returns the new spec function.
     */
    function baseMatchesProperty(path, srcValue) {
      if (isKey(path) && isStrictComparable(srcValue)) {
        return matchesStrictComparable(toKey(path), srcValue);
      }
      return function(object) {
        var objValue = get(object, path);
        return (objValue === undefined && objValue === srcValue)
          ? hasIn(object, path)
          : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
      };
    }

    /**
     * The base implementation of `_.merge` without support for multiple sources.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {number} srcIndex The index of `source`.
     * @param {Function} [customizer] The function to customize merged values.
     * @param {Object} [stack] Tracks traversed source values and their merged
     *  counterparts.
     */
    function baseMerge(object, source, srcIndex, customizer, stack) {
      if (object === source) {
        return;
      }
      baseFor(source, function(srcValue, key) {
        if (isObject(srcValue)) {
          stack || (stack = new Stack);
          baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
        }
        else {
          var newValue = customizer
            ? customizer(object[key], srcValue, (key + ''), object, source, stack)
            : undefined;

          if (newValue === undefined) {
            newValue = srcValue;
          }
          assignMergeValue(object, key, newValue);
        }
      }, keysIn);
    }

    /**
     * A specialized version of `baseMerge` for arrays and objects which performs
     * deep merges and tracks traversed objects enabling objects with circular
     * references to be merged.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {string} key The key of the value to merge.
     * @param {number} srcIndex The index of `source`.
     * @param {Function} mergeFunc The function to merge values.
     * @param {Function} [customizer] The function to customize assigned values.
     * @param {Object} [stack] Tracks traversed source values and their merged
     *  counterparts.
     */
    function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
      var objValue = object[key],
          srcValue = source[key],
          stacked = stack.get(srcValue);

      if (stacked) {
        assignMergeValue(object, key, stacked);
        return;
      }
      var newValue = customizer
        ? customizer(objValue, srcValue, (key + ''), object, source, stack)
        : undefined;

      var isCommon = newValue === undefined;

      if (isCommon) {
        var isArr = isArray(srcValue),
            isBuff = !isArr && isBuffer(srcValue),
            isTyped = !isArr && !isBuff && isTypedArray(srcValue);

        newValue = srcValue;
        if (isArr || isBuff || isTyped) {
          if (isArray(objValue)) {
            newValue = objValue;
          }
          else if (isArrayLikeObject(objValue)) {
            newValue = copyArray(objValue);
          }
          else if (isBuff) {
            isCommon = false;
            newValue = cloneBuffer(srcValue, true);
          }
          else if (isTyped) {
            isCommon = false;
            newValue = cloneTypedArray(srcValue, true);
          }
          else {
            newValue = [];
          }
        }
        else if (isPlainObject(srcValue) || isArguments(srcValue)) {
          newValue = objValue;
          if (isArguments(objValue)) {
            newValue = toPlainObject(objValue);
          }
          else if (!isObject(objValue) || (srcIndex && isFunction(objValue))) {
            newValue = initCloneObject(srcValue);
          }
        }
        else {
          isCommon = false;
        }
      }
      if (isCommon) {
        // Recursively merge objects and arrays (susceptible to call stack limits).
        stack.set(srcValue, newValue);
        mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
        stack['delete'](srcValue);
      }
      assignMergeValue(object, key, newValue);
    }

    /**
     * The base implementation of `_.nth` which doesn't coerce arguments.
     *
     * @private
     * @param {Array} array The array to query.
     * @param {number} n The index of the element to return.
     * @returns {*} Returns the nth element of `array`.
     */
    function baseNth(array, n) {
      var length = array.length;
      if (!length) {
        return;
      }
      n += n < 0 ? length : 0;
      return isIndex(n, length) ? array[n] : undefined;
    }

    /**
     * The base implementation of `_.orderBy` without param guards.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
     * @param {string[]} orders The sort orders of `iteratees`.
     * @returns {Array} Returns the new sorted array.
     */
    function baseOrderBy(collection, iteratees, orders) {
      var index = -1;
      iteratees = arrayMap(iteratees.length ? iteratees : [identity], baseUnary(getIteratee()));

      var result = baseMap(collection, function(value, key, collection) {
        var criteria = arrayMap(iteratees, function(iteratee) {
          return iteratee(value);
        });
        return { 'criteria': criteria, 'index': ++index, 'value': value };
      });

      return baseSortBy(result, function(object, other) {
        return compareMultiple(object, other, orders);
      });
    }

    /**
     * The base implementation of `_.pick` without support for individual
     * property identifiers.
     *
     * @private
     * @param {Object} object The source object.
     * @param {string[]} paths The property paths to pick.
     * @returns {Object} Returns the new object.
     */
    function basePick(object, paths) {
      return basePickBy(object, paths, function(value, path) {
        return hasIn(object, path);
      });
    }

    /**
     * The base implementation of  `_.pickBy` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The source object.
     * @param {string[]} paths The property paths to pick.
     * @param {Function} predicate The function invoked per property.
     * @returns {Object} Returns the new object.
     */
    function basePickBy(object, paths, predicate) {
      var index = -1,
          length = paths.length,
          result = {};

      while (++index < length) {
        var path = paths[index],
            value = baseGet(object, path);

        if (predicate(value, path)) {
          baseSet(result, castPath(path, object), value);
        }
      }
      return result;
    }

    /**
     * A specialized version of `baseProperty` which supports deep paths.
     *
     * @private
     * @param {Array|string} path The path of the property to get.
     * @returns {Function} Returns the new accessor function.
     */
    function basePropertyDeep(path) {
      return function(object) {
        return baseGet(object, path);
      };
    }

    /**
     * The base implementation of `_.pullAllBy` without support for iteratee
     * shorthands.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {Array} values The values to remove.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns `array`.
     */
    function basePullAll(array, values, iteratee, comparator) {
      var indexOf = comparator ? baseIndexOfWith : baseIndexOf,
          index = -1,
          length = values.length,
          seen = array;

      if (array === values) {
        values = copyArray(values);
      }
      if (iteratee) {
        seen = arrayMap(array, baseUnary(iteratee));
      }
      while (++index < length) {
        var fromIndex = 0,
            value = values[index],
            computed = iteratee ? iteratee(value) : value;

        while ((fromIndex = indexOf(seen, computed, fromIndex, comparator)) > -1) {
          if (seen !== array) {
            splice.call(seen, fromIndex, 1);
          }
          splice.call(array, fromIndex, 1);
        }
      }
      return array;
    }

    /**
     * The base implementation of `_.pullAt` without support for individual
     * indexes or capturing the removed elements.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {number[]} indexes The indexes of elements to remove.
     * @returns {Array} Returns `array`.
     */
    function basePullAt(array, indexes) {
      var length = array ? indexes.length : 0,
          lastIndex = length - 1;

      while (length--) {
        var index = indexes[length];
        if (length == lastIndex || index !== previous) {
          var previous = index;
          if (isIndex(index)) {
            splice.call(array, index, 1);
          } else {
            baseUnset(array, index);
          }
        }
      }
      return array;
    }

    /**
     * The base implementation of `_.random` without support for returning
     * floating-point numbers.
     *
     * @private
     * @param {number} lower The lower bound.
     * @param {number} upper The upper bound.
     * @returns {number} Returns the random number.
     */
    function baseRandom(lower, upper) {
      return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
    }

    /**
     * The base implementation of `_.range` and `_.rangeRight` which doesn't
     * coerce arguments.
     *
     * @private
     * @param {number} start The start of the range.
     * @param {number} end The end of the range.
     * @param {number} step The value to increment or decrement by.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Array} Returns the range of numbers.
     */
    function baseRange(start, end, step, fromRight) {
      var index = -1,
          length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
          result = Array(length);

      while (length--) {
        result[fromRight ? length : ++index] = start;
        start += step;
      }
      return result;
    }

    /**
     * The base implementation of `_.repeat` which doesn't coerce arguments.
     *
     * @private
     * @param {string} string The string to repeat.
     * @param {number} n The number of times to repeat the string.
     * @returns {string} Returns the repeated string.
     */
    function baseRepeat(string, n) {
      var result = '';
      if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
        return result;
      }
      // Leverage the exponentiation by squaring algorithm for a faster repeat.
      // See https://en.wikipedia.org/wiki/Exponentiation_by_squaring for more details.
      do {
        if (n % 2) {
          result += string;
        }
        n = nativeFloor(n / 2);
        if (n) {
          string += string;
        }
      } while (n);

      return result;
    }

    /**
     * The base implementation of `_.rest` which doesn't validate or coerce arguments.
     *
     * @private
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @returns {Function} Returns the new function.
     */
    function baseRest(func, start) {
      return setToString(overRest(func, start, identity), func + '');
    }

    /**
     * The base implementation of `_.sample`.
     *
     * @private
     * @param {Array|Object} collection The collection to sample.
     * @returns {*} Returns the random element.
     */
    function baseSample(collection) {
      return arraySample(values(collection));
    }

    /**
     * The base implementation of `_.sampleSize` without param guards.
     *
     * @private
     * @param {Array|Object} collection The collection to sample.
     * @param {number} n The number of elements to sample.
     * @returns {Array} Returns the random elements.
     */
    function baseSampleSize(collection, n) {
      var array = values(collection);
      return shuffleSelf(array, baseClamp(n, 0, array.length));
    }

    /**
     * The base implementation of `_.set`.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to set.
     * @param {*} value The value to set.
     * @param {Function} [customizer] The function to customize path creation.
     * @returns {Object} Returns `object`.
     */
    function baseSet(object, path, value, customizer) {
      if (!isObject(object)) {
        return object;
      }
      path = castPath(path, object);

      var index = -1,
          length = path.length,
          lastIndex = length - 1,
          nested = object;

      while (nested != null && ++index < length) {
        var key = toKey(path[index]),
            newValue = value;

        if (index != lastIndex) {
          var objValue = nested[key];
          newValue = customizer ? customizer(objValue, key, nested) : undefined;
          if (newValue === undefined) {
            newValue = isObject(objValue)
              ? objValue
              : (isIndex(path[index + 1]) ? [] : {});
          }
        }
        assignValue(nested, key, newValue);
        nested = nested[key];
      }
      return object;
    }

    /**
     * The base implementation of `setData` without support for hot loop shorting.
     *
     * @private
     * @param {Function} func The function to associate metadata with.
     * @param {*} data The metadata.
     * @returns {Function} Returns `func`.
     */
    var baseSetData = !metaMap ? identity : function(func, data) {
      metaMap.set(func, data);
      return func;
    };

    /**
     * The base implementation of `setToString` without support for hot loop shorting.
     *
     * @private
     * @param {Function} func The function to modify.
     * @param {Function} string The `toString` result.
     * @returns {Function} Returns `func`.
     */
    var baseSetToString = !defineProperty ? identity : function(func, string) {
      return defineProperty(func, 'toString', {
        'configurable': true,
        'enumerable': false,
        'value': constant(string),
        'writable': true
      });
    };

    /**
     * The base implementation of `_.shuffle`.
     *
     * @private
     * @param {Array|Object} collection The collection to shuffle.
     * @returns {Array} Returns the new shuffled array.
     */
    function baseShuffle(collection) {
      return shuffleSelf(values(collection));
    }

    /**
     * The base implementation of `_.slice` without an iteratee call guard.
     *
     * @private
     * @param {Array} array The array to slice.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the slice of `array`.
     */
    function baseSlice(array, start, end) {
      var index = -1,
          length = array.length;

      if (start < 0) {
        start = -start > length ? 0 : (length + start);
      }
      end = end > length ? length : end;
      if (end < 0) {
        end += length;
      }
      length = start > end ? 0 : ((end - start) >>> 0);
      start >>>= 0;

      var result = Array(length);
      while (++index < length) {
        result[index] = array[index + start];
      }
      return result;
    }

    /**
     * The base implementation of `_.some` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if any element passes the predicate check,
     *  else `false`.
     */
    function baseSome(collection, predicate) {
      var result;

      baseEach(collection, function(value, index, collection) {
        result = predicate(value, index, collection);
        return !result;
      });
      return !!result;
    }

    /**
     * The base implementation of `_.sortedIndex` and `_.sortedLastIndex` which
     * performs a binary search of `array` to determine the index at which `value`
     * should be inserted into `array` in order to maintain its sort order.
     *
     * @private
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {boolean} [retHighest] Specify returning the highest qualified index.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     */
    function baseSortedIndex(array, value, retHighest) {
      var low = 0,
          high = array == null ? low : array.length;

      if (typeof value == 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
        while (low < high) {
          var mid = (low + high) >>> 1,
              computed = array[mid];

          if (computed !== null && !isSymbol(computed) &&
              (retHighest ? (computed <= value) : (computed < value))) {
            low = mid + 1;
          } else {
            high = mid;
          }
        }
        return high;
      }
      return baseSortedIndexBy(array, value, identity, retHighest);
    }

    /**
     * The base implementation of `_.sortedIndexBy` and `_.sortedLastIndexBy`
     * which invokes `iteratee` for `value` and each element of `array` to compute
     * their sort ranking. The iteratee is invoked with one argument; (value).
     *
     * @private
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function} iteratee The iteratee invoked per element.
     * @param {boolean} [retHighest] Specify returning the highest qualified index.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     */
    function baseSortedIndexBy(array, value, iteratee, retHighest) {
      value = iteratee(value);

      var low = 0,
          high = array == null ? 0 : array.length,
          valIsNaN = value !== value,
          valIsNull = value === null,
          valIsSymbol = isSymbol(value),
          valIsUndefined = value === undefined;

      while (low < high) {
        var mid = nativeFloor((low + high) / 2),
            computed = iteratee(array[mid]),
            othIsDefined = computed !== undefined,
            othIsNull = computed === null,
            othIsReflexive = computed === computed,
            othIsSymbol = isSymbol(computed);

        if (valIsNaN) {
          var setLow = retHighest || othIsReflexive;
        } else if (valIsUndefined) {
          setLow = othIsReflexive && (retHighest || othIsDefined);
        } else if (valIsNull) {
          setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
        } else if (valIsSymbol) {
          setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
        } else if (othIsNull || othIsSymbol) {
          setLow = false;
        } else {
          setLow = retHighest ? (computed <= value) : (computed < value);
        }
        if (setLow) {
          low = mid + 1;
        } else {
          high = mid;
        }
      }
      return nativeMin(high, MAX_ARRAY_INDEX);
    }

    /**
     * The base implementation of `_.sortedUniq` and `_.sortedUniqBy` without
     * support for iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     */
    function baseSortedUniq(array, iteratee) {
      var index = -1,
          length = array.length,
          resIndex = 0,
          result = [];

      while (++index < length) {
        var value = array[index],
            computed = iteratee ? iteratee(value) : value;

        if (!index || !eq(computed, seen)) {
          var seen = computed;
          result[resIndex++] = value === 0 ? 0 : value;
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.toNumber` which doesn't ensure correct
     * conversions of binary, hexadecimal, or octal string values.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {number} Returns the number.
     */
    function baseToNumber(value) {
      if (typeof value == 'number') {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      return +value;
    }

    /**
     * The base implementation of `_.toString` which doesn't convert nullish
     * values to empty strings.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {string} Returns the string.
     */
    function baseToString(value) {
      // Exit early for strings to avoid a performance hit in some environments.
      if (typeof value == 'string') {
        return value;
      }
      if (isArray(value)) {
        // Recursively convert values (susceptible to call stack limits).
        return arrayMap(value, baseToString) + '';
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : '';
      }
      var result = (value + '');
      return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
    }

    /**
     * The base implementation of `_.uniqBy` without support for iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     */
    function baseUniq(array, iteratee, comparator) {
      var index = -1,
          includes = arrayIncludes,
          length = array.length,
          isCommon = true,
          result = [],
          seen = result;

      if (comparator) {
        isCommon = false;
        includes = arrayIncludesWith;
      }
      else if (length >= LARGE_ARRAY_SIZE) {
        var set = iteratee ? null : createSet(array);
        if (set) {
          return setToArray(set);
        }
        isCommon = false;
        includes = cacheHas;
        seen = new SetCache;
      }
      else {
        seen = iteratee ? [] : result;
      }
      outer:
      while (++index < length) {
        var value = array[index],
            computed = iteratee ? iteratee(value) : value;

        value = (comparator || value !== 0) ? value : 0;
        if (isCommon && computed === computed) {
          var seenIndex = seen.length;
          while (seenIndex--) {
            if (seen[seenIndex] === computed) {
              continue outer;
            }
          }
          if (iteratee) {
            seen.push(computed);
          }
          result.push(value);
        }
        else if (!includes(seen, computed, comparator)) {
          if (seen !== result) {
            seen.push(computed);
          }
          result.push(value);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.unset`.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {Array|string} path The property path to unset.
     * @returns {boolean} Returns `true` if the property is deleted, else `false`.
     */
    function baseUnset(object, path) {
      path = castPath(path, object);
      object = parent(object, path);
      return object == null || delete object[toKey(last(path))];
    }

    /**
     * The base implementation of `_.update`.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to update.
     * @param {Function} updater The function to produce the updated value.
     * @param {Function} [customizer] The function to customize path creation.
     * @returns {Object} Returns `object`.
     */
    function baseUpdate(object, path, updater, customizer) {
      return baseSet(object, path, updater(baseGet(object, path)), customizer);
    }

    /**
     * The base implementation of methods like `_.dropWhile` and `_.takeWhile`
     * without support for iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to query.
     * @param {Function} predicate The function invoked per iteration.
     * @param {boolean} [isDrop] Specify dropping elements instead of taking them.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Array} Returns the slice of `array`.
     */
    function baseWhile(array, predicate, isDrop, fromRight) {
      var length = array.length,
          index = fromRight ? length : -1;

      while ((fromRight ? index-- : ++index < length) &&
        predicate(array[index], index, array)) {}

      return isDrop
        ? baseSlice(array, (fromRight ? 0 : index), (fromRight ? index + 1 : length))
        : baseSlice(array, (fromRight ? index + 1 : 0), (fromRight ? length : index));
    }

    /**
     * The base implementation of `wrapperValue` which returns the result of
     * performing a sequence of actions on the unwrapped `value`, where each
     * successive action is supplied the return value of the previous.
     *
     * @private
     * @param {*} value The unwrapped value.
     * @param {Array} actions Actions to perform to resolve the unwrapped value.
     * @returns {*} Returns the resolved value.
     */
    function baseWrapperValue(value, actions) {
      var result = value;
      if (result instanceof LazyWrapper) {
        result = result.value();
      }
      return arrayReduce(actions, function(result, action) {
        return action.func.apply(action.thisArg, arrayPush([result], action.args));
      }, result);
    }

    /**
     * The base implementation of methods like `_.xor`, without support for
     * iteratee shorthands, that accepts an array of arrays to inspect.
     *
     * @private
     * @param {Array} arrays The arrays to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of values.
     */
    function baseXor(arrays, iteratee, comparator) {
      var length = arrays.length;
      if (length < 2) {
        return length ? baseUniq(arrays[0]) : [];
      }
      var index = -1,
          result = Array(length);

      while (++index < length) {
        var array = arrays[index],
            othIndex = -1;

        while (++othIndex < length) {
          if (othIndex != index) {
            result[index] = baseDifference(result[index] || array, arrays[othIndex], iteratee, comparator);
          }
        }
      }
      return baseUniq(baseFlatten(result, 1), iteratee, comparator);
    }

    /**
     * This base implementation of `_.zipObject` which assigns values using `assignFunc`.
     *
     * @private
     * @param {Array} props The property identifiers.
     * @param {Array} values The property values.
     * @param {Function} assignFunc The function to assign values.
     * @returns {Object} Returns the new object.
     */
    function baseZipObject(props, values, assignFunc) {
      var index = -1,
          length = props.length,
          valsLength = values.length,
          result = {};

      while (++index < length) {
        var value = index < valsLength ? values[index] : undefined;
        assignFunc(result, props[index], value);
      }
      return result;
    }

    /**
     * Casts `value` to an empty array if it's not an array like object.
     *
     * @private
     * @param {*} value The value to inspect.
     * @returns {Array|Object} Returns the cast array-like object.
     */
    function castArrayLikeObject(value) {
      return isArrayLikeObject(value) ? value : [];
    }

    /**
     * Casts `value` to `identity` if it's not a function.
     *
     * @private
     * @param {*} value The value to inspect.
     * @returns {Function} Returns cast function.
     */
    function castFunction(value) {
      return typeof value == 'function' ? value : identity;
    }

    /**
     * Casts `value` to a path array if it's not one.
     *
     * @private
     * @param {*} value The value to inspect.
     * @param {Object} [object] The object to query keys on.
     * @returns {Array} Returns the cast property path array.
     */
    function castPath(value, object) {
      if (isArray(value)) {
        return value;
      }
      return isKey(value, object) ? [value] : stringToPath(toString(value));
    }

    /**
     * A `baseRest` alias which can be replaced with `identity` by module
     * replacement plugins.
     *
     * @private
     * @type {Function}
     * @param {Function} func The function to apply a rest parameter to.
     * @returns {Function} Returns the new function.
     */
    var castRest = baseRest;

    /**
     * Casts `array` to a slice if it's needed.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {number} start The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the cast slice.
     */
    function castSlice(array, start, end) {
      var length = array.length;
      end = end === undefined ? length : end;
      return (!start && end >= length) ? array : baseSlice(array, start, end);
    }

    /**
     * A simple wrapper around the global [`clearTimeout`](https://mdn.io/clearTimeout).
     *
     * @private
     * @param {number|Object} id The timer id or timeout object of the timer to clear.
     */
    var clearTimeout = ctxClearTimeout || function(id) {
      return root.clearTimeout(id);
    };

    /**
     * Creates a clone of  `buffer`.
     *
     * @private
     * @param {Buffer} buffer The buffer to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Buffer} Returns the cloned buffer.
     */
    function cloneBuffer(buffer, isDeep) {
      if (isDeep) {
        return buffer.slice();
      }
      var length = buffer.length,
          result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

      buffer.copy(result);
      return result;
    }

    /**
     * Creates a clone of `arrayBuffer`.
     *
     * @private
     * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
     * @returns {ArrayBuffer} Returns the cloned array buffer.
     */
    function cloneArrayBuffer(arrayBuffer) {
      var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
      new Uint8Array(result).set(new Uint8Array(arrayBuffer));
      return result;
    }

    /**
     * Creates a clone of `dataView`.
     *
     * @private
     * @param {Object} dataView The data view to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned data view.
     */
    function cloneDataView(dataView, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
      return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
    }

    /**
     * Creates a clone of `map`.
     *
     * @private
     * @param {Object} map The map to clone.
     * @param {Function} cloneFunc The function to clone values.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned map.
     */
    function cloneMap(map, isDeep, cloneFunc) {
      var array = isDeep ? cloneFunc(mapToArray(map), CLONE_DEEP_FLAG) : mapToArray(map);
      return arrayReduce(array, addMapEntry, new map.constructor);
    }

    /**
     * Creates a clone of `regexp`.
     *
     * @private
     * @param {Object} regexp The regexp to clone.
     * @returns {Object} Returns the cloned regexp.
     */
    function cloneRegExp(regexp) {
      var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
      result.lastIndex = regexp.lastIndex;
      return result;
    }

    /**
     * Creates a clone of `set`.
     *
     * @private
     * @param {Object} set The set to clone.
     * @param {Function} cloneFunc The function to clone values.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned set.
     */
    function cloneSet(set, isDeep, cloneFunc) {
      var array = isDeep ? cloneFunc(setToArray(set), CLONE_DEEP_FLAG) : setToArray(set);
      return arrayReduce(array, addSetEntry, new set.constructor);
    }

    /**
     * Creates a clone of the `symbol` object.
     *
     * @private
     * @param {Object} symbol The symbol object to clone.
     * @returns {Object} Returns the cloned symbol object.
     */
    function cloneSymbol(symbol) {
      return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
    }

    /**
     * Creates a clone of `typedArray`.
     *
     * @private
     * @param {Object} typedArray The typed array to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned typed array.
     */
    function cloneTypedArray(typedArray, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
      return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
    }

    /**
     * Compares values to sort them in ascending order.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {number} Returns the sort order indicator for `value`.
     */
    function compareAscending(value, other) {
      if (value !== other) {
        var valIsDefined = value !== undefined,
            valIsNull = value === null,
            valIsReflexive = value === value,
            valIsSymbol = isSymbol(value);

        var othIsDefined = other !== undefined,
            othIsNull = other === null,
            othIsReflexive = other === other,
            othIsSymbol = isSymbol(other);

        if ((!othIsNull && !othIsSymbol && !valIsSymbol && value > other) ||
            (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) ||
            (valIsNull && othIsDefined && othIsReflexive) ||
            (!valIsDefined && othIsReflexive) ||
            !valIsReflexive) {
          return 1;
        }
        if ((!valIsNull && !valIsSymbol && !othIsSymbol && value < other) ||
            (othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol) ||
            (othIsNull && valIsDefined && valIsReflexive) ||
            (!othIsDefined && valIsReflexive) ||
            !othIsReflexive) {
          return -1;
        }
      }
      return 0;
    }

    /**
     * Used by `_.orderBy` to compare multiple properties of a value to another
     * and stable sort them.
     *
     * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
     * specify an order of "desc" for descending or "asc" for ascending sort order
     * of corresponding values.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {boolean[]|string[]} orders The order to sort by for each property.
     * @returns {number} Returns the sort order indicator for `object`.
     */
    function compareMultiple(object, other, orders) {
      var index = -1,
          objCriteria = object.criteria,
          othCriteria = other.criteria,
          length = objCriteria.length,
          ordersLength = orders.length;

      while (++index < length) {
        var result = compareAscending(objCriteria[index], othCriteria[index]);
        if (result) {
          if (index >= ordersLength) {
            return result;
          }
          var order = orders[index];
          return result * (order == 'desc' ? -1 : 1);
        }
      }
      // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
      // that causes it, under certain circumstances, to provide the same value for
      // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
      // for more details.
      //
      // This also ensures a stable sort in V8 and other engines.
      // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
      return object.index - other.index;
    }

    /**
     * Creates an array that is the composition of partially applied arguments,
     * placeholders, and provided arguments into a single array of arguments.
     *
     * @private
     * @param {Array} args The provided arguments.
     * @param {Array} partials The arguments to prepend to those provided.
     * @param {Array} holders The `partials` placeholder indexes.
     * @params {boolean} [isCurried] Specify composing for a curried function.
     * @returns {Array} Returns the new array of composed arguments.
     */
    function composeArgs(args, partials, holders, isCurried) {
      var argsIndex = -1,
          argsLength = args.length,
          holdersLength = holders.length,
          leftIndex = -1,
          leftLength = partials.length,
          rangeLength = nativeMax(argsLength - holdersLength, 0),
          result = Array(leftLength + rangeLength),
          isUncurried = !isCurried;

      while (++leftIndex < leftLength) {
        result[leftIndex] = partials[leftIndex];
      }
      while (++argsIndex < holdersLength) {
        if (isUncurried || argsIndex < argsLength) {
          result[holders[argsIndex]] = args[argsIndex];
        }
      }
      while (rangeLength--) {
        result[leftIndex++] = args[argsIndex++];
      }
      return result;
    }

    /**
     * This function is like `composeArgs` except that the arguments composition
     * is tailored for `_.partialRight`.
     *
     * @private
     * @param {Array} args The provided arguments.
     * @param {Array} partials The arguments to append to those provided.
     * @param {Array} holders The `partials` placeholder indexes.
     * @params {boolean} [isCurried] Specify composing for a curried function.
     * @returns {Array} Returns the new array of composed arguments.
     */
    function composeArgsRight(args, partials, holders, isCurried) {
      var argsIndex = -1,
          argsLength = args.length,
          holdersIndex = -1,
          holdersLength = holders.length,
          rightIndex = -1,
          rightLength = partials.length,
          rangeLength = nativeMax(argsLength - holdersLength, 0),
          result = Array(rangeLength + rightLength),
          isUncurried = !isCurried;

      while (++argsIndex < rangeLength) {
        result[argsIndex] = args[argsIndex];
      }
      var offset = argsIndex;
      while (++rightIndex < rightLength) {
        result[offset + rightIndex] = partials[rightIndex];
      }
      while (++holdersIndex < holdersLength) {
        if (isUncurried || argsIndex < argsLength) {
          result[offset + holders[holdersIndex]] = args[argsIndex++];
        }
      }
      return result;
    }

    /**
     * Copies the values of `source` to `array`.
     *
     * @private
     * @param {Array} source The array to copy values from.
     * @param {Array} [array=[]] The array to copy values to.
     * @returns {Array} Returns `array`.
     */
    function copyArray(source, array) {
      var index = -1,
          length = source.length;

      array || (array = Array(length));
      while (++index < length) {
        array[index] = source[index];
      }
      return array;
    }

    /**
     * Copies properties of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy properties from.
     * @param {Array} props The property identifiers to copy.
     * @param {Object} [object={}] The object to copy properties to.
     * @param {Function} [customizer] The function to customize copied values.
     * @returns {Object} Returns `object`.
     */
    function copyObject(source, props, object, customizer) {
      var isNew = !object;
      object || (object = {});

      var index = -1,
          length = props.length;

      while (++index < length) {
        var key = props[index];

        var newValue = customizer
          ? customizer(object[key], source[key], key, object, source)
          : undefined;

        if (newValue === undefined) {
          newValue = source[key];
        }
        if (isNew) {
          baseAssignValue(object, key, newValue);
        } else {
          assignValue(object, key, newValue);
        }
      }
      return object;
    }

    /**
     * Copies own symbols of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy symbols from.
     * @param {Object} [object={}] The object to copy symbols to.
     * @returns {Object} Returns `object`.
     */
    function copySymbols(source, object) {
      return copyObject(source, getSymbols(source), object);
    }

    /**
     * Copies own and inherited symbols of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy symbols from.
     * @param {Object} [object={}] The object to copy symbols to.
     * @returns {Object} Returns `object`.
     */
    function copySymbolsIn(source, object) {
      return copyObject(source, getSymbolsIn(source), object);
    }

    /**
     * Creates a function like `_.groupBy`.
     *
     * @private
     * @param {Function} setter The function to set accumulator values.
     * @param {Function} [initializer] The accumulator object initializer.
     * @returns {Function} Returns the new aggregator function.
     */
    function createAggregator(setter, initializer) {
      return function(collection, iteratee) {
        var func = isArray(collection) ? arrayAggregator : baseAggregator,
            accumulator = initializer ? initializer() : {};

        return func(collection, setter, getIteratee(iteratee, 2), accumulator);
      };
    }

    /**
     * Creates a function like `_.assign`.
     *
     * @private
     * @param {Function} assigner The function to assign values.
     * @returns {Function} Returns the new assigner function.
     */
    function createAssigner(assigner) {
      return baseRest(function(object, sources) {
        var index = -1,
            length = sources.length,
            customizer = length > 1 ? sources[length - 1] : undefined,
            guard = length > 2 ? sources[2] : undefined;

        customizer = (assigner.length > 3 && typeof customizer == 'function')
          ? (length--, customizer)
          : undefined;

        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
          customizer = length < 3 ? undefined : customizer;
          length = 1;
        }
        object = Object(object);
        while (++index < length) {
          var source = sources[index];
          if (source) {
            assigner(object, source, index, customizer);
          }
        }
        return object;
      });
    }

    /**
     * Creates a `baseEach` or `baseEachRight` function.
     *
     * @private
     * @param {Function} eachFunc The function to iterate over a collection.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new base function.
     */
    function createBaseEach(eachFunc, fromRight) {
      return function(collection, iteratee) {
        if (collection == null) {
          return collection;
        }
        if (!isArrayLike(collection)) {
          return eachFunc(collection, iteratee);
        }
        var length = collection.length,
            index = fromRight ? length : -1,
            iterable = Object(collection);

        while ((fromRight ? index-- : ++index < length)) {
          if (iteratee(iterable[index], index, iterable) === false) {
            break;
          }
        }
        return collection;
      };
    }

    /**
     * Creates a base function for methods like `_.forIn` and `_.forOwn`.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new base function.
     */
    function createBaseFor(fromRight) {
      return function(object, iteratee, keysFunc) {
        var index = -1,
            iterable = Object(object),
            props = keysFunc(object),
            length = props.length;

        while (length--) {
          var key = props[fromRight ? length : ++index];
          if (iteratee(iterable[key], key, iterable) === false) {
            break;
          }
        }
        return object;
      };
    }

    /**
     * Creates a function that wraps `func` to invoke it with the optional `this`
     * binding of `thisArg`.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
    function createBind(func, bitmask, thisArg) {
      var isBind = bitmask & WRAP_BIND_FLAG,
          Ctor = createCtor(func);

      function wrapper() {
        var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
        return fn.apply(isBind ? thisArg : this, arguments);
      }
      return wrapper;
    }

    /**
     * Creates a function like `_.lowerFirst`.
     *
     * @private
     * @param {string} methodName The name of the `String` case method to use.
     * @returns {Function} Returns the new case function.
     */
    function createCaseFirst(methodName) {
      return function(string) {
        string = toString(string);

        var strSymbols = hasUnicode(string)
          ? stringToArray(string)
          : undefined;

        var chr = strSymbols
          ? strSymbols[0]
          : string.charAt(0);

        var trailing = strSymbols
          ? castSlice(strSymbols, 1).join('')
          : string.slice(1);

        return chr[methodName]() + trailing;
      };
    }

    /**
     * Creates a function like `_.camelCase`.
     *
     * @private
     * @param {Function} callback The function to combine each word.
     * @returns {Function} Returns the new compounder function.
     */
    function createCompounder(callback) {
      return function(string) {
        return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
      };
    }

    /**
     * Creates a function that produces an instance of `Ctor` regardless of
     * whether it was invoked as part of a `new` expression or by `call` or `apply`.
     *
     * @private
     * @param {Function} Ctor The constructor to wrap.
     * @returns {Function} Returns the new wrapped function.
     */
    function createCtor(Ctor) {
      return function() {
        // Use a `switch` statement to work with class constructors. See
        // http://ecma-international.org/ecma-262/7.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
        // for more details.
        var args = arguments;
        switch (args.length) {
          case 0: return new Ctor;
          case 1: return new Ctor(args[0]);
          case 2: return new Ctor(args[0], args[1]);
          case 3: return new Ctor(args[0], args[1], args[2]);
          case 4: return new Ctor(args[0], args[1], args[2], args[3]);
          case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
          case 6: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
          case 7: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
        }
        var thisBinding = baseCreate(Ctor.prototype),
            result = Ctor.apply(thisBinding, args);

        // Mimic the constructor's `return` behavior.
        // See https://es5.github.io/#x13.2.2 for more details.
        return isObject(result) ? result : thisBinding;
      };
    }

    /**
     * Creates a function that wraps `func` to enable currying.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @param {number} arity The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
    function createCurry(func, bitmask, arity) {
      var Ctor = createCtor(func);

      function wrapper() {
        var length = arguments.length,
            args = Array(length),
            index = length,
            placeholder = getHolder(wrapper);

        while (index--) {
          args[index] = arguments[index];
        }
        var holders = (length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder)
          ? []
          : replaceHolders(args, placeholder);

        length -= holders.length;
        if (length < arity) {
          return createRecurry(
            func, bitmask, createHybrid, wrapper.placeholder, undefined,
            args, holders, undefined, undefined, arity - length);
        }
        var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
        return apply(fn, this, args);
      }
      return wrapper;
    }

    /**
     * Creates a `_.find` or `_.findLast` function.
     *
     * @private
     * @param {Function} findIndexFunc The function to find the collection index.
     * @returns {Function} Returns the new find function.
     */
    function createFind(findIndexFunc) {
      return function(collection, predicate, fromIndex) {
        var iterable = Object(collection);
        if (!isArrayLike(collection)) {
          var iteratee = getIteratee(predicate, 3);
          collection = keys(collection);
          predicate = function(key) { return iteratee(iterable[key], key, iterable); };
        }
        var index = findIndexFunc(collection, predicate, fromIndex);
        return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
      };
    }

    /**
     * Creates a `_.flow` or `_.flowRight` function.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new flow function.
     */
    function createFlow(fromRight) {
      return flatRest(function(funcs) {
        var length = funcs.length,
            index = length,
            prereq = LodashWrapper.prototype.thru;

        if (fromRight) {
          funcs.reverse();
        }
        while (index--) {
          var func = funcs[index];
          if (typeof func != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          if (prereq && !wrapper && getFuncName(func) == 'wrapper') {
            var wrapper = new LodashWrapper([], true);
          }
        }
        index = wrapper ? index : length;
        while (++index < length) {
          func = funcs[index];

          var funcName = getFuncName(func),
              data = funcName == 'wrapper' ? getData(func) : undefined;

          if (data && isLaziable(data[0]) &&
                data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) &&
                !data[4].length && data[9] == 1
              ) {
            wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
          } else {
            wrapper = (func.length == 1 && isLaziable(func))
              ? wrapper[funcName]()
              : wrapper.thru(func);
          }
        }
        return function() {
          var args = arguments,
              value = args[0];

          if (wrapper && args.length == 1 && isArray(value)) {
            return wrapper.plant(value).value();
          }
          var index = 0,
              result = length ? funcs[index].apply(this, args) : value;

          while (++index < length) {
            result = funcs[index].call(this, result);
          }
          return result;
        };
      });
    }

    /**
     * Creates a function that wraps `func` to invoke it with optional `this`
     * binding of `thisArg`, partial application, and currying.
     *
     * @private
     * @param {Function|string} func The function or method name to wrap.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {Array} [partials] The arguments to prepend to those provided to
     *  the new function.
     * @param {Array} [holders] The `partials` placeholder indexes.
     * @param {Array} [partialsRight] The arguments to append to those provided
     *  to the new function.
     * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
     * @param {Array} [argPos] The argument positions of the new function.
     * @param {number} [ary] The arity cap of `func`.
     * @param {number} [arity] The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
    function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
      var isAry = bitmask & WRAP_ARY_FLAG,
          isBind = bitmask & WRAP_BIND_FLAG,
          isBindKey = bitmask & WRAP_BIND_KEY_FLAG,
          isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG),
          isFlip = bitmask & WRAP_FLIP_FLAG,
          Ctor = isBindKey ? undefined : createCtor(func);

      function wrapper() {
        var length = arguments.length,
            args = Array(length),
            index = length;

        while (index--) {
          args[index] = arguments[index];
        }
        if (isCurried) {
          var placeholder = getHolder(wrapper),
              holdersCount = countHolders(args, placeholder);
        }
        if (partials) {
          args = composeArgs(args, partials, holders, isCurried);
        }
        if (partialsRight) {
          args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
        }
        length -= holdersCount;
        if (isCurried && length < arity) {
          var newHolders = replaceHolders(args, placeholder);
          return createRecurry(
            func, bitmask, createHybrid, wrapper.placeholder, thisArg,
            args, newHolders, argPos, ary, arity - length
          );
        }
        var thisBinding = isBind ? thisArg : this,
            fn = isBindKey ? thisBinding[func] : func;

        length = args.length;
        if (argPos) {
          args = reorder(args, argPos);
        } else if (isFlip && length > 1) {
          args.reverse();
        }
        if (isAry && ary < length) {
          args.length = ary;
        }
        if (this && this !== root && this instanceof wrapper) {
          fn = Ctor || createCtor(fn);
        }
        return fn.apply(thisBinding, args);
      }
      return wrapper;
    }

    /**
     * Creates a function like `_.invertBy`.
     *
     * @private
     * @param {Function} setter The function to set accumulator values.
     * @param {Function} toIteratee The function to resolve iteratees.
     * @returns {Function} Returns the new inverter function.
     */
    function createInverter(setter, toIteratee) {
      return function(object, iteratee) {
        return baseInverter(object, setter, toIteratee(iteratee), {});
      };
    }

    /**
     * Creates a function that performs a mathematical operation on two values.
     *
     * @private
     * @param {Function} operator The function to perform the operation.
     * @param {number} [defaultValue] The value used for `undefined` arguments.
     * @returns {Function} Returns the new mathematical operation function.
     */
    function createMathOperation(operator, defaultValue) {
      return function(value, other) {
        var result;
        if (value === undefined && other === undefined) {
          return defaultValue;
        }
        if (value !== undefined) {
          result = value;
        }
        if (other !== undefined) {
          if (result === undefined) {
            return other;
          }
          if (typeof value == 'string' || typeof other == 'string') {
            value = baseToString(value);
            other = baseToString(other);
          } else {
            value = baseToNumber(value);
            other = baseToNumber(other);
          }
          result = operator(value, other);
        }
        return result;
      };
    }

    /**
     * Creates a function like `_.over`.
     *
     * @private
     * @param {Function} arrayFunc The function to iterate over iteratees.
     * @returns {Function} Returns the new over function.
     */
    function createOver(arrayFunc) {
      return flatRest(function(iteratees) {
        iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
        return baseRest(function(args) {
          var thisArg = this;
          return arrayFunc(iteratees, function(iteratee) {
            return apply(iteratee, thisArg, args);
          });
        });
      });
    }

    /**
     * Creates the padding for `string` based on `length`. The `chars` string
     * is truncated if the number of characters exceeds `length`.
     *
     * @private
     * @param {number} length The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padding for `string`.
     */
    function createPadding(length, chars) {
      chars = chars === undefined ? ' ' : baseToString(chars);

      var charsLength = chars.length;
      if (charsLength < 2) {
        return charsLength ? baseRepeat(chars, length) : chars;
      }
      var result = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
      return hasUnicode(chars)
        ? castSlice(stringToArray(result), 0, length).join('')
        : result.slice(0, length);
    }

    /**
     * Creates a function that wraps `func` to invoke it with the `this` binding
     * of `thisArg` and `partials` prepended to the arguments it receives.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {Array} partials The arguments to prepend to those provided to
     *  the new function.
     * @returns {Function} Returns the new wrapped function.
     */
    function createPartial(func, bitmask, thisArg, partials) {
      var isBind = bitmask & WRAP_BIND_FLAG,
          Ctor = createCtor(func);

      function wrapper() {
        var argsIndex = -1,
            argsLength = arguments.length,
            leftIndex = -1,
            leftLength = partials.length,
            args = Array(leftLength + argsLength),
            fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;

        while (++leftIndex < leftLength) {
          args[leftIndex] = partials[leftIndex];
        }
        while (argsLength--) {
          args[leftIndex++] = arguments[++argsIndex];
        }
        return apply(fn, isBind ? thisArg : this, args);
      }
      return wrapper;
    }

    /**
     * Creates a `_.range` or `_.rangeRight` function.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new range function.
     */
    function createRange(fromRight) {
      return function(start, end, step) {
        if (step && typeof step != 'number' && isIterateeCall(start, end, step)) {
          end = step = undefined;
        }
        // Ensure the sign of `-0` is preserved.
        start = toFinite(start);
        if (end === undefined) {
          end = start;
          start = 0;
        } else {
          end = toFinite(end);
        }
        step = step === undefined ? (start < end ? 1 : -1) : toFinite(step);
        return baseRange(start, end, step, fromRight);
      };
    }

    /**
     * Creates a function that performs a relational operation on two values.
     *
     * @private
     * @param {Function} operator The function to perform the operation.
     * @returns {Function} Returns the new relational operation function.
     */
    function createRelationalOperation(operator) {
      return function(value, other) {
        if (!(typeof value == 'string' && typeof other == 'string')) {
          value = toNumber(value);
          other = toNumber(other);
        }
        return operator(value, other);
      };
    }

    /**
     * Creates a function that wraps `func` to continue currying.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @param {Function} wrapFunc The function to create the `func` wrapper.
     * @param {*} placeholder The placeholder value.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {Array} [partials] The arguments to prepend to those provided to
     *  the new function.
     * @param {Array} [holders] The `partials` placeholder indexes.
     * @param {Array} [argPos] The argument positions of the new function.
     * @param {number} [ary] The arity cap of `func`.
     * @param {number} [arity] The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
    function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
      var isCurry = bitmask & WRAP_CURRY_FLAG,
          newHolders = isCurry ? holders : undefined,
          newHoldersRight = isCurry ? undefined : holders,
          newPartials = isCurry ? partials : undefined,
          newPartialsRight = isCurry ? undefined : partials;

      bitmask |= (isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG);
      bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);

      if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
        bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
      }
      var newData = [
        func, bitmask, thisArg, newPartials, newHolders, newPartialsRight,
        newHoldersRight, argPos, ary, arity
      ];

      var result = wrapFunc.apply(undefined, newData);
      if (isLaziable(func)) {
        setData(result, newData);
      }
      result.placeholder = placeholder;
      return setWrapToString(result, func, bitmask);
    }

    /**
     * Creates a function like `_.round`.
     *
     * @private
     * @param {string} methodName The name of the `Math` method to use when rounding.
     * @returns {Function} Returns the new round function.
     */
    function createRound(methodName) {
      var func = Math[methodName];
      return function(number, precision) {
        number = toNumber(number);
        precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
        if (precision) {
          // Shift with exponential notation to avoid floating-point issues.
          // See [MDN](https://mdn.io/round#Examples) for more details.
          var pair = (toString(number) + 'e').split('e'),
              value = func(pair[0] + 'e' + (+pair[1] + precision));

          pair = (toString(value) + 'e').split('e');
          return +(pair[0] + 'e' + (+pair[1] - precision));
        }
        return func(number);
      };
    }

    /**
     * Creates a set object of `values`.
     *
     * @private
     * @param {Array} values The values to add to the set.
     * @returns {Object} Returns the new set.
     */
    var createSet = !(Set && (1 / setToArray(new Set([,-0]))[1]) == INFINITY) ? noop : function(values) {
      return new Set(values);
    };

    /**
     * Creates a `_.toPairs` or `_.toPairsIn` function.
     *
     * @private
     * @param {Function} keysFunc The function to get the keys of a given object.
     * @returns {Function} Returns the new pairs function.
     */
    function createToPairs(keysFunc) {
      return function(object) {
        var tag = getTag(object);
        if (tag == mapTag) {
          return mapToArray(object);
        }
        if (tag == setTag) {
          return setToPairs(object);
        }
        return baseToPairs(object, keysFunc(object));
      };
    }

    /**
     * Creates a function that either curries or invokes `func` with optional
     * `this` binding and partially applied arguments.
     *
     * @private
     * @param {Function|string} func The function or method name to wrap.
     * @param {number} bitmask The bitmask flags.
     *    1 - `_.bind`
     *    2 - `_.bindKey`
     *    4 - `_.curry` or `_.curryRight` of a bound function
     *    8 - `_.curry`
     *   16 - `_.curryRight`
     *   32 - `_.partial`
     *   64 - `_.partialRight`
     *  128 - `_.rearg`
     *  256 - `_.ary`
     *  512 - `_.flip`
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {Array} [partials] The arguments to be partially applied.
     * @param {Array} [holders] The `partials` placeholder indexes.
     * @param {Array} [argPos] The argument positions of the new function.
     * @param {number} [ary] The arity cap of `func`.
     * @param {number} [arity] The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
    function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
      var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
      if (!isBindKey && typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var length = partials ? partials.length : 0;
      if (!length) {
        bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
        partials = holders = undefined;
      }
      ary = ary === undefined ? ary : nativeMax(toInteger(ary), 0);
      arity = arity === undefined ? arity : toInteger(arity);
      length -= holders ? holders.length : 0;

      if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
        var partialsRight = partials,
            holdersRight = holders;

        partials = holders = undefined;
      }
      var data = isBindKey ? undefined : getData(func);

      var newData = [
        func, bitmask, thisArg, partials, holders, partialsRight, holdersRight,
        argPos, ary, arity
      ];

      if (data) {
        mergeData(newData, data);
      }
      func = newData[0];
      bitmask = newData[1];
      thisArg = newData[2];
      partials = newData[3];
      holders = newData[4];
      arity = newData[9] = newData[9] === undefined
        ? (isBindKey ? 0 : func.length)
        : nativeMax(newData[9] - length, 0);

      if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
        bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
      }
      if (!bitmask || bitmask == WRAP_BIND_FLAG) {
        var result = createBind(func, bitmask, thisArg);
      } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
        result = createCurry(func, bitmask, arity);
      } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
        result = createPartial(func, bitmask, thisArg, partials);
      } else {
        result = createHybrid.apply(undefined, newData);
      }
      var setter = data ? baseSetData : setData;
      return setWrapToString(setter(result, newData), func, bitmask);
    }

    /**
     * Used by `_.defaults` to customize its `_.assignIn` use to assign properties
     * of source objects to the destination object for all destination properties
     * that resolve to `undefined`.
     *
     * @private
     * @param {*} objValue The destination value.
     * @param {*} srcValue The source value.
     * @param {string} key The key of the property to assign.
     * @param {Object} object The parent object of `objValue`.
     * @returns {*} Returns the value to assign.
     */
    function customDefaultsAssignIn(objValue, srcValue, key, object) {
      if (objValue === undefined ||
          (eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key))) {
        return srcValue;
      }
      return objValue;
    }

    /**
     * Used by `_.defaultsDeep` to customize its `_.merge` use to merge source
     * objects into destination objects that are passed thru.
     *
     * @private
     * @param {*} objValue The destination value.
     * @param {*} srcValue The source value.
     * @param {string} key The key of the property to merge.
     * @param {Object} object The parent object of `objValue`.
     * @param {Object} source The parent object of `srcValue`.
     * @param {Object} [stack] Tracks traversed source values and their merged
     *  counterparts.
     * @returns {*} Returns the value to assign.
     */
    function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
      if (isObject(objValue) && isObject(srcValue)) {
        // Recursively merge objects and arrays (susceptible to call stack limits).
        stack.set(srcValue, objValue);
        baseMerge(objValue, srcValue, undefined, customDefaultsMerge, stack);
        stack['delete'](srcValue);
      }
      return objValue;
    }

    /**
     * Used by `_.omit` to customize its `_.cloneDeep` use to only clone plain
     * objects.
     *
     * @private
     * @param {*} value The value to inspect.
     * @param {string} key The key of the property to inspect.
     * @returns {*} Returns the uncloned value or `undefined` to defer cloning to `_.cloneDeep`.
     */
    function customOmitClone(value) {
      return isPlainObject(value) ? undefined : value;
    }

    /**
     * A specialized version of `baseIsEqualDeep` for arrays with support for
     * partial deep comparisons.
     *
     * @private
     * @param {Array} array The array to compare.
     * @param {Array} other The other array to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} stack Tracks traversed `array` and `other` objects.
     * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
     */
    function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
          arrLength = array.length,
          othLength = other.length;

      if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(array);
      if (stacked && stack.get(other)) {
        return stacked == other;
      }
      var index = -1,
          result = true,
          seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

      stack.set(array, other);
      stack.set(other, array);

      // Ignore non-index properties.
      while (++index < arrLength) {
        var arrValue = array[index],
            othValue = other[index];

        if (customizer) {
          var compared = isPartial
            ? customizer(othValue, arrValue, index, other, array, stack)
            : customizer(arrValue, othValue, index, array, other, stack);
        }
        if (compared !== undefined) {
          if (compared) {
            continue;
          }
          result = false;
          break;
        }
        // Recursively compare arrays (susceptible to call stack limits).
        if (seen) {
          if (!arraySome(other, function(othValue, othIndex) {
                if (!cacheHas(seen, othIndex) &&
                    (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
                  return seen.push(othIndex);
                }
              })) {
            result = false;
            break;
          }
        } else if (!(
              arrValue === othValue ||
                equalFunc(arrValue, othValue, bitmask, customizer, stack)
            )) {
          result = false;
          break;
        }
      }
      stack['delete'](array);
      stack['delete'](other);
      return result;
    }

    /**
     * A specialized version of `baseIsEqualDeep` for comparing objects of
     * the same `toStringTag`.
     *
     * **Note:** This function only supports comparing values with tags of
     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {string} tag The `toStringTag` of the objects to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} stack Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
      switch (tag) {
        case dataViewTag:
          if ((object.byteLength != other.byteLength) ||
              (object.byteOffset != other.byteOffset)) {
            return false;
          }
          object = object.buffer;
          other = other.buffer;

        case arrayBufferTag:
          if ((object.byteLength != other.byteLength) ||
              !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
            return false;
          }
          return true;

        case boolTag:
        case dateTag:
        case numberTag:
          // Coerce booleans to `1` or `0` and dates to milliseconds.
          // Invalid dates are coerced to `NaN`.
          return eq(+object, +other);

        case errorTag:
          return object.name == other.name && object.message == other.message;

        case regexpTag:
        case stringTag:
          // Coerce regexes to strings and treat strings, primitives and objects,
          // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
          // for more details.
          return object == (other + '');

        case mapTag:
          var convert = mapToArray;

        case setTag:
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
          convert || (convert = setToArray);

          if (object.size != other.size && !isPartial) {
            return false;
          }
          // Assume cyclic values are equal.
          var stacked = stack.get(object);
          if (stacked) {
            return stacked == other;
          }
          bitmask |= COMPARE_UNORDERED_FLAG;

          // Recursively compare objects (susceptible to call stack limits).
          stack.set(object, other);
          var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
          stack['delete'](object);
          return result;

        case symbolTag:
          if (symbolValueOf) {
            return symbolValueOf.call(object) == symbolValueOf.call(other);
          }
      }
      return false;
    }

    /**
     * A specialized version of `baseIsEqualDeep` for objects with support for
     * partial deep comparisons.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} stack Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
          objProps = getAllKeys(object),
          objLength = objProps.length,
          othProps = getAllKeys(other),
          othLength = othProps.length;

      if (objLength != othLength && !isPartial) {
        return false;
      }
      var index = objLength;
      while (index--) {
        var key = objProps[index];
        if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
          return false;
        }
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked && stack.get(other)) {
        return stacked == other;
      }
      var result = true;
      stack.set(object, other);
      stack.set(other, object);

      var skipCtor = isPartial;
      while (++index < objLength) {
        key = objProps[index];
        var objValue = object[key],
            othValue = other[key];

        if (customizer) {
          var compared = isPartial
            ? customizer(othValue, objValue, key, other, object, stack)
            : customizer(objValue, othValue, key, object, other, stack);
        }
        // Recursively compare objects (susceptible to call stack limits).
        if (!(compared === undefined
              ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
              : compared
            )) {
          result = false;
          break;
        }
        skipCtor || (skipCtor = key == 'constructor');
      }
      if (result && !skipCtor) {
        var objCtor = object.constructor,
            othCtor = other.constructor;

        // Non `Object` object instances with different constructors are not equal.
        if (objCtor != othCtor &&
            ('constructor' in object && 'constructor' in other) &&
            !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
              typeof othCtor == 'function' && othCtor instanceof othCtor)) {
          result = false;
        }
      }
      stack['delete'](object);
      stack['delete'](other);
      return result;
    }

    /**
     * A specialized version of `baseRest` which flattens the rest array.
     *
     * @private
     * @param {Function} func The function to apply a rest parameter to.
     * @returns {Function} Returns the new function.
     */
    function flatRest(func) {
      return setToString(overRest(func, undefined, flatten), func + '');
    }

    /**
     * Creates an array of own enumerable property names and symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names and symbols.
     */
    function getAllKeys(object) {
      return baseGetAllKeys(object, keys, getSymbols);
    }

    /**
     * Creates an array of own and inherited enumerable property names and
     * symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names and symbols.
     */
    function getAllKeysIn(object) {
      return baseGetAllKeys(object, keysIn, getSymbolsIn);
    }

    /**
     * Gets metadata for `func`.
     *
     * @private
     * @param {Function} func The function to query.
     * @returns {*} Returns the metadata for `func`.
     */
    var getData = !metaMap ? noop : function(func) {
      return metaMap.get(func);
    };

    /**
     * Gets the name of `func`.
     *
     * @private
     * @param {Function} func The function to query.
     * @returns {string} Returns the function name.
     */
    function getFuncName(func) {
      var result = (func.name + ''),
          array = realNames[result],
          length = hasOwnProperty.call(realNames, result) ? array.length : 0;

      while (length--) {
        var data = array[length],
            otherFunc = data.func;
        if (otherFunc == null || otherFunc == func) {
          return data.name;
        }
      }
      return result;
    }

    /**
     * Gets the argument placeholder value for `func`.
     *
     * @private
     * @param {Function} func The function to inspect.
     * @returns {*} Returns the placeholder value.
     */
    function getHolder(func) {
      var object = hasOwnProperty.call(lodash, 'placeholder') ? lodash : func;
      return object.placeholder;
    }

    /**
     * Gets the appropriate "iteratee" function. If `_.iteratee` is customized,
     * this function returns the custom method, otherwise it returns `baseIteratee`.
     * If arguments are provided, the chosen function is invoked with them and
     * its result is returned.
     *
     * @private
     * @param {*} [value] The value to convert to an iteratee.
     * @param {number} [arity] The arity of the created iteratee.
     * @returns {Function} Returns the chosen function or its result.
     */
    function getIteratee() {
      var result = lodash.iteratee || iteratee;
      result = result === iteratee ? baseIteratee : result;
      return arguments.length ? result(arguments[0], arguments[1]) : result;
    }

    /**
     * Gets the data for `map`.
     *
     * @private
     * @param {Object} map The map to query.
     * @param {string} key The reference key.
     * @returns {*} Returns the map data.
     */
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key)
        ? data[typeof key == 'string' ? 'string' : 'hash']
        : data.map;
    }

    /**
     * Gets the property names, values, and compare flags of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the match data of `object`.
     */
    function getMatchData(object) {
      var result = keys(object),
          length = result.length;

      while (length--) {
        var key = result[length],
            value = object[key];

        result[length] = [key, value, isStrictComparable(value)];
      }
      return result;
    }

    /**
     * Gets the native function at `key` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the method to get.
     * @returns {*} Returns the function if it's native, else `undefined`.
     */
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : undefined;
    }

    /**
     * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the raw `toStringTag`.
     */
    function getRawTag(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag),
          tag = value[symToStringTag];

      try {
        value[symToStringTag] = undefined;
        var unmasked = true;
      } catch (e) {}

      var result = nativeObjectToString.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag;
        } else {
          delete value[symToStringTag];
        }
      }
      return result;
    }

    /**
     * Creates an array of the own enumerable symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of symbols.
     */
    var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
      if (object == null) {
        return [];
      }
      object = Object(object);
      return arrayFilter(nativeGetSymbols(object), function(symbol) {
        return propertyIsEnumerable.call(object, symbol);
      });
    };

    /**
     * Creates an array of the own and inherited enumerable symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of symbols.
     */
    var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
      var result = [];
      while (object) {
        arrayPush(result, getSymbols(object));
        object = getPrototype(object);
      }
      return result;
    };

    /**
     * Gets the `toStringTag` of `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */
    var getTag = baseGetTag;

    // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
    if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
        (Map && getTag(new Map) != mapTag) ||
        (Promise && getTag(Promise.resolve()) != promiseTag) ||
        (Set && getTag(new Set) != setTag) ||
        (WeakMap && getTag(new WeakMap) != weakMapTag)) {
      getTag = function(value) {
        var result = baseGetTag(value),
            Ctor = result == objectTag ? value.constructor : undefined,
            ctorString = Ctor ? toSource(Ctor) : '';

        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString: return dataViewTag;
            case mapCtorString: return mapTag;
            case promiseCtorString: return promiseTag;
            case setCtorString: return setTag;
            case weakMapCtorString: return weakMapTag;
          }
        }
        return result;
      };
    }

    /**
     * Gets the view, applying any `transforms` to the `start` and `end` positions.
     *
     * @private
     * @param {number} start The start of the view.
     * @param {number} end The end of the view.
     * @param {Array} transforms The transformations to apply to the view.
     * @returns {Object} Returns an object containing the `start` and `end`
     *  positions of the view.
     */
    function getView(start, end, transforms) {
      var index = -1,
          length = transforms.length;

      while (++index < length) {
        var data = transforms[index],
            size = data.size;

        switch (data.type) {
          case 'drop':      start += size; break;
          case 'dropRight': end -= size; break;
          case 'take':      end = nativeMin(end, start + size); break;
          case 'takeRight': start = nativeMax(start, end - size); break;
        }
      }
      return { 'start': start, 'end': end };
    }

    /**
     * Extracts wrapper details from the `source` body comment.
     *
     * @private
     * @param {string} source The source to inspect.
     * @returns {Array} Returns the wrapper details.
     */
    function getWrapDetails(source) {
      var match = source.match(reWrapDetails);
      return match ? match[1].split(reSplitDetails) : [];
    }

    /**
     * Checks if `path` exists on `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @param {Function} hasFunc The function to check properties.
     * @returns {boolean} Returns `true` if `path` exists, else `false`.
     */
    function hasPath(object, path, hasFunc) {
      path = castPath(path, object);

      var index = -1,
          length = path.length,
          result = false;

      while (++index < length) {
        var key = toKey(path[index]);
        if (!(result = object != null && hasFunc(object, key))) {
          break;
        }
        object = object[key];
      }
      if (result || ++index != length) {
        return result;
      }
      length = object == null ? 0 : object.length;
      return !!length && isLength(length) && isIndex(key, length) &&
        (isArray(object) || isArguments(object));
    }

    /**
     * Initializes an array clone.
     *
     * @private
     * @param {Array} array The array to clone.
     * @returns {Array} Returns the initialized clone.
     */
    function initCloneArray(array) {
      var length = array.length,
          result = array.constructor(length);

      // Add properties assigned by `RegExp#exec`.
      if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
        result.index = array.index;
        result.input = array.input;
      }
      return result;
    }

    /**
     * Initializes an object clone.
     *
     * @private
     * @param {Object} object The object to clone.
     * @returns {Object} Returns the initialized clone.
     */
    function initCloneObject(object) {
      return (typeof object.constructor == 'function' && !isPrototype(object))
        ? baseCreate(getPrototype(object))
        : {};
    }

    /**
     * Initializes an object clone based on its `toStringTag`.
     *
     * **Note:** This function only supports cloning values with tags of
     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
     *
     * @private
     * @param {Object} object The object to clone.
     * @param {string} tag The `toStringTag` of the object to clone.
     * @param {Function} cloneFunc The function to clone values.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the initialized clone.
     */
    function initCloneByTag(object, tag, cloneFunc, isDeep) {
      var Ctor = object.constructor;
      switch (tag) {
        case arrayBufferTag:
          return cloneArrayBuffer(object);

        case boolTag:
        case dateTag:
          return new Ctor(+object);

        case dataViewTag:
          return cloneDataView(object, isDeep);

        case float32Tag: case float64Tag:
        case int8Tag: case int16Tag: case int32Tag:
        case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
          return cloneTypedArray(object, isDeep);

        case mapTag:
          return cloneMap(object, isDeep, cloneFunc);

        case numberTag:
        case stringTag:
          return new Ctor(object);

        case regexpTag:
          return cloneRegExp(object);

        case setTag:
          return cloneSet(object, isDeep, cloneFunc);

        case symbolTag:
          return cloneSymbol(object);
      }
    }

    /**
     * Inserts wrapper `details` in a comment at the top of the `source` body.
     *
     * @private
     * @param {string} source The source to modify.
     * @returns {Array} details The details to insert.
     * @returns {string} Returns the modified source.
     */
    function insertWrapDetails(source, details) {
      var length = details.length;
      if (!length) {
        return source;
      }
      var lastIndex = length - 1;
      details[lastIndex] = (length > 1 ? '& ' : '') + details[lastIndex];
      details = details.join(length > 2 ? ', ' : ' ');
      return source.replace(reWrapComment, '{\n/* [wrapped with ' + details + '] */\n');
    }

    /**
     * Checks if `value` is a flattenable `arguments` object or array.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
     */
    function isFlattenable(value) {
      return isArray(value) || isArguments(value) ||
        !!(spreadableSymbol && value && value[spreadableSymbol]);
    }

    /**
     * Checks if `value` is a valid array-like index.
     *
     * @private
     * @param {*} value The value to check.
     * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
     * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
     */
    function isIndex(value, length) {
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length &&
        (typeof value == 'number' || reIsUint.test(value)) &&
        (value > -1 && value % 1 == 0 && value < length);
    }

    /**
     * Checks if the given arguments are from an iteratee call.
     *
     * @private
     * @param {*} value The potential iteratee value argument.
     * @param {*} index The potential iteratee index or key argument.
     * @param {*} object The potential iteratee object argument.
     * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
     *  else `false`.
     */
    function isIterateeCall(value, index, object) {
      if (!isObject(object)) {
        return false;
      }
      var type = typeof index;
      if (type == 'number'
            ? (isArrayLike(object) && isIndex(index, object.length))
            : (type == 'string' && index in object)
          ) {
        return eq(object[index], value);
      }
      return false;
    }

    /**
     * Checks if `value` is a property name and not a property path.
     *
     * @private
     * @param {*} value The value to check.
     * @param {Object} [object] The object to query keys on.
     * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
     */
    function isKey(value, object) {
      if (isArray(value)) {
        return false;
      }
      var type = typeof value;
      if (type == 'number' || type == 'symbol' || type == 'boolean' ||
          value == null || isSymbol(value)) {
        return true;
      }
      return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
        (object != null && value in Object(object));
    }

    /**
     * Checks if `value` is suitable for use as unique object key.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
     */
    function isKeyable(value) {
      var type = typeof value;
      return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
        ? (value !== '__proto__')
        : (value === null);
    }

    /**
     * Checks if `func` has a lazy counterpart.
     *
     * @private
     * @param {Function} func The function to check.
     * @returns {boolean} Returns `true` if `func` has a lazy counterpart,
     *  else `false`.
     */
    function isLaziable(func) {
      var funcName = getFuncName(func),
          other = lodash[funcName];

      if (typeof other != 'function' || !(funcName in LazyWrapper.prototype)) {
        return false;
      }
      if (func === other) {
        return true;
      }
      var data = getData(other);
      return !!data && func === data[0];
    }

    /**
     * Checks if `func` has its source masked.
     *
     * @private
     * @param {Function} func The function to check.
     * @returns {boolean} Returns `true` if `func` is masked, else `false`.
     */
    function isMasked(func) {
      return !!maskSrcKey && (maskSrcKey in func);
    }

    /**
     * Checks if `func` is capable of being masked.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `func` is maskable, else `false`.
     */
    var isMaskable = coreJsData ? isFunction : stubFalse;

    /**
     * Checks if `value` is likely a prototype object.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
     */
    function isPrototype(value) {
      var Ctor = value && value.constructor,
          proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

      return value === proto;
    }

    /**
     * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` if suitable for strict
     *  equality comparisons, else `false`.
     */
    function isStrictComparable(value) {
      return value === value && !isObject(value);
    }

    /**
     * A specialized version of `matchesProperty` for source values suitable
     * for strict equality comparisons, i.e. `===`.
     *
     * @private
     * @param {string} key The key of the property to get.
     * @param {*} srcValue The value to match.
     * @returns {Function} Returns the new spec function.
     */
    function matchesStrictComparable(key, srcValue) {
      return function(object) {
        if (object == null) {
          return false;
        }
        return object[key] === srcValue &&
          (srcValue !== undefined || (key in Object(object)));
      };
    }

    /**
     * A specialized version of `_.memoize` which clears the memoized function's
     * cache when it exceeds `MAX_MEMOIZE_SIZE`.
     *
     * @private
     * @param {Function} func The function to have its output memoized.
     * @returns {Function} Returns the new memoized function.
     */
    function memoizeCapped(func) {
      var result = memoize(func, function(key) {
        if (cache.size === MAX_MEMOIZE_SIZE) {
          cache.clear();
        }
        return key;
      });

      var cache = result.cache;
      return result;
    }

    /**
     * Merges the function metadata of `source` into `data`.
     *
     * Merging metadata reduces the number of wrappers used to invoke a function.
     * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
     * may be applied regardless of execution order. Methods like `_.ary` and
     * `_.rearg` modify function arguments, making the order in which they are
     * executed important, preventing the merging of metadata. However, we make
     * an exception for a safe combined case where curried functions have `_.ary`
     * and or `_.rearg` applied.
     *
     * @private
     * @param {Array} data The destination metadata.
     * @param {Array} source The source metadata.
     * @returns {Array} Returns `data`.
     */
    function mergeData(data, source) {
      var bitmask = data[1],
          srcBitmask = source[1],
          newBitmask = bitmask | srcBitmask,
          isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);

      var isCombo =
        ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_CURRY_FLAG)) ||
        ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_REARG_FLAG) && (data[7].length <= source[8])) ||
        ((srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG)) && (source[7].length <= source[8]) && (bitmask == WRAP_CURRY_FLAG));

      // Exit early if metadata can't be merged.
      if (!(isCommon || isCombo)) {
        return data;
      }
      // Use source `thisArg` if available.
      if (srcBitmask & WRAP_BIND_FLAG) {
        data[2] = source[2];
        // Set when currying a bound function.
        newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
      }
      // Compose partial arguments.
      var value = source[3];
      if (value) {
        var partials = data[3];
        data[3] = partials ? composeArgs(partials, value, source[4]) : value;
        data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
      }
      // Compose partial right arguments.
      value = source[5];
      if (value) {
        partials = data[5];
        data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
        data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
      }
      // Use source `argPos` if available.
      value = source[7];
      if (value) {
        data[7] = value;
      }
      // Use source `ary` if it's smaller.
      if (srcBitmask & WRAP_ARY_FLAG) {
        data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
      }
      // Use source `arity` if one is not provided.
      if (data[9] == null) {
        data[9] = source[9];
      }
      // Use source `func` and merge bitmasks.
      data[0] = source[0];
      data[1] = newBitmask;

      return data;
    }

    /**
     * This function is like
     * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
     * except that it includes inherited enumerable properties.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function nativeKeysIn(object) {
      var result = [];
      if (object != null) {
        for (var key in Object(object)) {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * Converts `value` to a string using `Object.prototype.toString`.
     *
     * @private
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     */
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }

    /**
     * A specialized version of `baseRest` which transforms the rest array.
     *
     * @private
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @param {Function} transform The rest array transform.
     * @returns {Function} Returns the new function.
     */
    function overRest(func, start, transform) {
      start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
      return function() {
        var args = arguments,
            index = -1,
            length = nativeMax(args.length - start, 0),
            array = Array(length);

        while (++index < length) {
          array[index] = args[start + index];
        }
        index = -1;
        var otherArgs = Array(start + 1);
        while (++index < start) {
          otherArgs[index] = args[index];
        }
        otherArgs[start] = transform(array);
        return apply(func, this, otherArgs);
      };
    }

    /**
     * Gets the parent value at `path` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array} path The path to get the parent value of.
     * @returns {*} Returns the parent value.
     */
    function parent(object, path) {
      return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
    }

    /**
     * Reorder `array` according to the specified indexes where the element at
     * the first index is assigned as the first element, the element at
     * the second index is assigned as the second element, and so on.
     *
     * @private
     * @param {Array} array The array to reorder.
     * @param {Array} indexes The arranged array indexes.
     * @returns {Array} Returns `array`.
     */
    function reorder(array, indexes) {
      var arrLength = array.length,
          length = nativeMin(indexes.length, arrLength),
          oldArray = copyArray(array);

      while (length--) {
        var index = indexes[length];
        array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
      }
      return array;
    }

    /**
     * Sets metadata for `func`.
     *
     * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
     * period of time, it will trip its breaker and transition to an identity
     * function to avoid garbage collection pauses in V8. See
     * [V8 issue 2070](https://bugs.chromium.org/p/v8/issues/detail?id=2070)
     * for more details.
     *
     * @private
     * @param {Function} func The function to associate metadata with.
     * @param {*} data The metadata.
     * @returns {Function} Returns `func`.
     */
    var setData = shortOut(baseSetData);

    /**
     * A simple wrapper around the global [`setTimeout`](https://mdn.io/setTimeout).
     *
     * @private
     * @param {Function} func The function to delay.
     * @param {number} wait The number of milliseconds to delay invocation.
     * @returns {number|Object} Returns the timer id or timeout object.
     */
    var setTimeout = ctxSetTimeout || function(func, wait) {
      return root.setTimeout(func, wait);
    };

    /**
     * Sets the `toString` method of `func` to return `string`.
     *
     * @private
     * @param {Function} func The function to modify.
     * @param {Function} string The `toString` result.
     * @returns {Function} Returns `func`.
     */
    var setToString = shortOut(baseSetToString);

    /**
     * Sets the `toString` method of `wrapper` to mimic the source of `reference`
     * with wrapper details in a comment at the top of the source body.
     *
     * @private
     * @param {Function} wrapper The function to modify.
     * @param {Function} reference The reference function.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @returns {Function} Returns `wrapper`.
     */
    function setWrapToString(wrapper, reference, bitmask) {
      var source = (reference + '');
      return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
    }

    /**
     * Creates a function that'll short out and invoke `identity` instead
     * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
     * milliseconds.
     *
     * @private
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new shortable function.
     */
    function shortOut(func) {
      var count = 0,
          lastCalled = 0;

      return function() {
        var stamp = nativeNow(),
            remaining = HOT_SPAN - (stamp - lastCalled);

        lastCalled = stamp;
        if (remaining > 0) {
          if (++count >= HOT_COUNT) {
            return arguments[0];
          }
        } else {
          count = 0;
        }
        return func.apply(undefined, arguments);
      };
    }

    /**
     * A specialized version of `_.shuffle` which mutates and sets the size of `array`.
     *
     * @private
     * @param {Array} array The array to shuffle.
     * @param {number} [size=array.length] The size of `array`.
     * @returns {Array} Returns `array`.
     */
    function shuffleSelf(array, size) {
      var index = -1,
          length = array.length,
          lastIndex = length - 1;

      size = size === undefined ? length : size;
      while (++index < size) {
        var rand = baseRandom(index, lastIndex),
            value = array[rand];

        array[rand] = array[index];
        array[index] = value;
      }
      array.length = size;
      return array;
    }

    /**
     * Converts `string` to a property path array.
     *
     * @private
     * @param {string} string The string to convert.
     * @returns {Array} Returns the property path array.
     */
    var stringToPath = memoizeCapped(function(string) {
      var result = [];
      if (reLeadingDot.test(string)) {
        result.push('');
      }
      string.replace(rePropName, function(match, number, quote, string) {
        result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
      });
      return result;
    });

    /**
     * Converts `value` to a string key if it's not a string or symbol.
     *
     * @private
     * @param {*} value The value to inspect.
     * @returns {string|symbol} Returns the key.
     */
    function toKey(value) {
      if (typeof value == 'string' || isSymbol(value)) {
        return value;
      }
      var result = (value + '');
      return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
    }

    /**
     * Converts `func` to its source code.
     *
     * @private
     * @param {Function} func The function to convert.
     * @returns {string} Returns the source code.
     */
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {}
        try {
          return (func + '');
        } catch (e) {}
      }
      return '';
    }

    /**
     * Updates wrapper `details` based on `bitmask` flags.
     *
     * @private
     * @returns {Array} details The details to modify.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @returns {Array} Returns `details`.
     */
    function updateWrapDetails(details, bitmask) {
      arrayEach(wrapFlags, function(pair) {
        var value = '_.' + pair[0];
        if ((bitmask & pair[1]) && !arrayIncludes(details, value)) {
          details.push(value);
        }
      });
      return details.sort();
    }

    /**
     * Creates a clone of `wrapper`.
     *
     * @private
     * @param {Object} wrapper The wrapper to clone.
     * @returns {Object} Returns the cloned wrapper.
     */
    function wrapperClone(wrapper) {
      if (wrapper instanceof LazyWrapper) {
        return wrapper.clone();
      }
      var result = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
      result.__actions__ = copyArray(wrapper.__actions__);
      result.__index__  = wrapper.__index__;
      result.__values__ = wrapper.__values__;
      return result;
    }

    /*------------------------------------------------------------------------*/

    /**
     * Creates an array of elements split into groups the length of `size`.
     * If `array` can't be split evenly, the final chunk will be the remaining
     * elements.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to process.
     * @param {number} [size=1] The length of each chunk
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the new array of chunks.
     * @example
     *
     * _.chunk(['a', 'b', 'c', 'd'], 2);
     * // => [['a', 'b'], ['c', 'd']]
     *
     * _.chunk(['a', 'b', 'c', 'd'], 3);
     * // => [['a', 'b', 'c'], ['d']]
     */
    function chunk(array, size, guard) {
      if ((guard ? isIterateeCall(array, size, guard) : size === undefined)) {
        size = 1;
      } else {
        size = nativeMax(toInteger(size), 0);
      }
      var length = array == null ? 0 : array.length;
      if (!length || size < 1) {
        return [];
      }
      var index = 0,
          resIndex = 0,
          result = Array(nativeCeil(length / size));

      while (index < length) {
        result[resIndex++] = baseSlice(array, index, (index += size));
      }
      return result;
    }

    /**
     * Creates an array with all falsey values removed. The values `false`, `null`,
     * `0`, `""`, `undefined`, and `NaN` are falsey.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to compact.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * _.compact([0, 1, false, 2, '', 3]);
     * // => [1, 2, 3]
     */
    function compact(array) {
      var index = -1,
          length = array == null ? 0 : array.length,
          resIndex = 0,
          result = [];

      while (++index < length) {
        var value = array[index];
        if (value) {
          result[resIndex++] = value;
        }
      }
      return result;
    }

    /**
     * Creates a new array concatenating `array` with any additional arrays
     * and/or values.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to concatenate.
     * @param {...*} [values] The values to concatenate.
     * @returns {Array} Returns the new concatenated array.
     * @example
     *
     * var array = [1];
     * var other = _.concat(array, 2, [3], [[4]]);
     *
     * console.log(other);
     * // => [1, 2, 3, [4]]
     *
     * console.log(array);
     * // => [1]
     */
    function concat() {
      var length = arguments.length;
      if (!length) {
        return [];
      }
      var args = Array(length - 1),
          array = arguments[0],
          index = length;

      while (index--) {
        args[index - 1] = arguments[index];
      }
      return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
    }

    /**
     * Creates an array of `array` values not included in the other given arrays
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons. The order and references of result values are
     * determined by the first array.
     *
     * **Note:** Unlike `_.pullAll`, this method returns a new array.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {...Array} [values] The values to exclude.
     * @returns {Array} Returns the new array of filtered values.
     * @see _.without, _.xor
     * @example
     *
     * _.difference([2, 1], [2, 3]);
     * // => [1]
     */
    var difference = baseRest(function(array, values) {
      return isArrayLikeObject(array)
        ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true))
        : [];
    });

    /**
     * This method is like `_.difference` except that it accepts `iteratee` which
     * is invoked for each element of `array` and `values` to generate the criterion
     * by which they're compared. The order and references of result values are
     * determined by the first array. The iteratee is invoked with one argument:
     * (value).
     *
     * **Note:** Unlike `_.pullAllBy`, this method returns a new array.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {...Array} [values] The values to exclude.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * _.differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor);
     * // => [1.2]
     *
     * // The `_.property` iteratee shorthand.
     * _.differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x');
     * // => [{ 'x': 2 }]
     */
    var differenceBy = baseRest(function(array, values) {
      var iteratee = last(values);
      if (isArrayLikeObject(iteratee)) {
        iteratee = undefined;
      }
      return isArrayLikeObject(array)
        ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), getIteratee(iteratee, 2))
        : [];
    });

    /**
     * This method is like `_.difference` except that it accepts `comparator`
     * which is invoked to compare elements of `array` to `values`. The order and
     * references of result values are determined by the first array. The comparator
     * is invoked with two arguments: (arrVal, othVal).
     *
     * **Note:** Unlike `_.pullAllWith`, this method returns a new array.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {...Array} [values] The values to exclude.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
     *
     * _.differenceWith(objects, [{ 'x': 1, 'y': 2 }], _.isEqual);
     * // => [{ 'x': 2, 'y': 1 }]
     */
    var differenceWith = baseRest(function(array, values) {
      var comparator = last(values);
      if (isArrayLikeObject(comparator)) {
        comparator = undefined;
      }
      return isArrayLikeObject(array)
        ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), undefined, comparator)
        : [];
    });

    /**
     * Creates a slice of `array` with `n` elements dropped from the beginning.
     *
     * @static
     * @memberOf _
     * @since 0.5.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to drop.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.drop([1, 2, 3]);
     * // => [2, 3]
     *
     * _.drop([1, 2, 3], 2);
     * // => [3]
     *
     * _.drop([1, 2, 3], 5);
     * // => []
     *
     * _.drop([1, 2, 3], 0);
     * // => [1, 2, 3]
     */
    function drop(array, n, guard) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      n = (guard || n === undefined) ? 1 : toInteger(n);
      return baseSlice(array, n < 0 ? 0 : n, length);
    }

    /**
     * Creates a slice of `array` with `n` elements dropped from the end.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to drop.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.dropRight([1, 2, 3]);
     * // => [1, 2]
     *
     * _.dropRight([1, 2, 3], 2);
     * // => [1]
     *
     * _.dropRight([1, 2, 3], 5);
     * // => []
     *
     * _.dropRight([1, 2, 3], 0);
     * // => [1, 2, 3]
     */
    function dropRight(array, n, guard) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      n = (guard || n === undefined) ? 1 : toInteger(n);
      n = length - n;
      return baseSlice(array, 0, n < 0 ? 0 : n);
    }

    /**
     * Creates a slice of `array` excluding elements dropped from the end.
     * Elements are dropped until `predicate` returns falsey. The predicate is
     * invoked with three arguments: (value, index, array).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': true },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': false }
     * ];
     *
     * _.dropRightWhile(users, function(o) { return !o.active; });
     * // => objects for ['barney']
     *
     * // The `_.matches` iteratee shorthand.
     * _.dropRightWhile(users, { 'user': 'pebbles', 'active': false });
     * // => objects for ['barney', 'fred']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.dropRightWhile(users, ['active', false]);
     * // => objects for ['barney']
     *
     * // The `_.property` iteratee shorthand.
     * _.dropRightWhile(users, 'active');
     * // => objects for ['barney', 'fred', 'pebbles']
     */
    function dropRightWhile(array, predicate) {
      return (array && array.length)
        ? baseWhile(array, getIteratee(predicate, 3), true, true)
        : [];
    }

    /**
     * Creates a slice of `array` excluding elements dropped from the beginning.
     * Elements are dropped until `predicate` returns falsey. The predicate is
     * invoked with three arguments: (value, index, array).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': false },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': true }
     * ];
     *
     * _.dropWhile(users, function(o) { return !o.active; });
     * // => objects for ['pebbles']
     *
     * // The `_.matches` iteratee shorthand.
     * _.dropWhile(users, { 'user': 'barney', 'active': false });
     * // => objects for ['fred', 'pebbles']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.dropWhile(users, ['active', false]);
     * // => objects for ['pebbles']
     *
     * // The `_.property` iteratee shorthand.
     * _.dropWhile(users, 'active');
     * // => objects for ['barney', 'fred', 'pebbles']
     */
    function dropWhile(array, predicate) {
      return (array && array.length)
        ? baseWhile(array, getIteratee(predicate, 3), true)
        : [];
    }

    /**
     * Fills elements of `array` with `value` from `start` up to, but not
     * including, `end`.
     *
     * **Note:** This method mutates `array`.
     *
     * @static
     * @memberOf _
     * @since 3.2.0
     * @category Array
     * @param {Array} array The array to fill.
     * @param {*} value The value to fill `array` with.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [1, 2, 3];
     *
     * _.fill(array, 'a');
     * console.log(array);
     * // => ['a', 'a', 'a']
     *
     * _.fill(Array(3), 2);
     * // => [2, 2, 2]
     *
     * _.fill([4, 6, 8, 10], '*', 1, 3);
     * // => [4, '*', '*', 10]
     */
    function fill(array, value, start, end) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      if (start && typeof start != 'number' && isIterateeCall(array, value, start)) {
        start = 0;
        end = length;
      }
      return baseFill(array, value, start, end);
    }

    /**
     * This method is like `_.find` except that it returns the index of the first
     * element `predicate` returns truthy for instead of the element itself.
     *
     * @static
     * @memberOf _
     * @since 1.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param {number} [fromIndex=0] The index to search from.
     * @returns {number} Returns the index of the found element, else `-1`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': false },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': true }
     * ];
     *
     * _.findIndex(users, function(o) { return o.user == 'barney'; });
     * // => 0
     *
     * // The `_.matches` iteratee shorthand.
     * _.findIndex(users, { 'user': 'fred', 'active': false });
     * // => 1
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.findIndex(users, ['active', false]);
     * // => 0
     *
     * // The `_.property` iteratee shorthand.
     * _.findIndex(users, 'active');
     * // => 2
     */
    function findIndex(array, predicate, fromIndex) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return -1;
      }
      var index = fromIndex == null ? 0 : toInteger(fromIndex);
      if (index < 0) {
        index = nativeMax(length + index, 0);
      }
      return baseFindIndex(array, getIteratee(predicate, 3), index);
    }

    /**
     * This method is like `_.findIndex` except that it iterates over elements
     * of `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param {number} [fromIndex=array.length-1] The index to search from.
     * @returns {number} Returns the index of the found element, else `-1`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': true },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': false }
     * ];
     *
     * _.findLastIndex(users, function(o) { return o.user == 'pebbles'; });
     * // => 2
     *
     * // The `_.matches` iteratee shorthand.
     * _.findLastIndex(users, { 'user': 'barney', 'active': true });
     * // => 0
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.findLastIndex(users, ['active', false]);
     * // => 2
     *
     * // The `_.property` iteratee shorthand.
     * _.findLastIndex(users, 'active');
     * // => 0
     */
    function findLastIndex(array, predicate, fromIndex) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return -1;
      }
      var index = length - 1;
      if (fromIndex !== undefined) {
        index = toInteger(fromIndex);
        index = fromIndex < 0
          ? nativeMax(length + index, 0)
          : nativeMin(index, length - 1);
      }
      return baseFindIndex(array, getIteratee(predicate, 3), index, true);
    }

    /**
     * Flattens `array` a single level deep.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to flatten.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * _.flatten([1, [2, [3, [4]], 5]]);
     * // => [1, 2, [3, [4]], 5]
     */
    function flatten(array) {
      var length = array == null ? 0 : array.length;
      return length ? baseFlatten(array, 1) : [];
    }

    /**
     * Recursively flattens `array`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to flatten.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * _.flattenDeep([1, [2, [3, [4]], 5]]);
     * // => [1, 2, 3, 4, 5]
     */
    function flattenDeep(array) {
      var length = array == null ? 0 : array.length;
      return length ? baseFlatten(array, INFINITY) : [];
    }

    /**
     * Recursively flatten `array` up to `depth` times.
     *
     * @static
     * @memberOf _
     * @since 4.4.0
     * @category Array
     * @param {Array} array The array to flatten.
     * @param {number} [depth=1] The maximum recursion depth.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * var array = [1, [2, [3, [4]], 5]];
     *
     * _.flattenDepth(array, 1);
     * // => [1, 2, [3, [4]], 5]
     *
     * _.flattenDepth(array, 2);
     * // => [1, 2, 3, [4], 5]
     */
    function flattenDepth(array, depth) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      depth = depth === undefined ? 1 : toInteger(depth);
      return baseFlatten(array, depth);
    }

    /**
     * The inverse of `_.toPairs`; this method returns an object composed
     * from key-value `pairs`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} pairs The key-value pairs.
     * @returns {Object} Returns the new object.
     * @example
     *
     * _.fromPairs([['a', 1], ['b', 2]]);
     * // => { 'a': 1, 'b': 2 }
     */
    function fromPairs(pairs) {
      var index = -1,
          length = pairs == null ? 0 : pairs.length,
          result = {};

      while (++index < length) {
        var pair = pairs[index];
        result[pair[0]] = pair[1];
      }
      return result;
    }

    /**
     * Gets the first element of `array`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @alias first
     * @category Array
     * @param {Array} array The array to query.
     * @returns {*} Returns the first element of `array`.
     * @example
     *
     * _.head([1, 2, 3]);
     * // => 1
     *
     * _.head([]);
     * // => undefined
     */
    function head(array) {
      return (array && array.length) ? array[0] : undefined;
    }

    /**
     * Gets the index at which the first occurrence of `value` is found in `array`
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons. If `fromIndex` is negative, it's used as the
     * offset from the end of `array`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @param {number} [fromIndex=0] The index to search from.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.indexOf([1, 2, 1, 2], 2);
     * // => 1
     *
     * // Search from the `fromIndex`.
     * _.indexOf([1, 2, 1, 2], 2, 2);
     * // => 3
     */
    function indexOf(array, value, fromIndex) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return -1;
      }
      var index = fromIndex == null ? 0 : toInteger(fromIndex);
      if (index < 0) {
        index = nativeMax(length + index, 0);
      }
      return baseIndexOf(array, value, index);
    }

    /**
     * Gets all but the last element of `array`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to query.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.initial([1, 2, 3]);
     * // => [1, 2]
     */
    function initial(array) {
      var length = array == null ? 0 : array.length;
      return length ? baseSlice(array, 0, -1) : [];
    }

    /**
     * Creates an array of unique values that are included in all given arrays
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons. The order and references of result values are
     * determined by the first array.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @returns {Array} Returns the new array of intersecting values.
     * @example
     *
     * _.intersection([2, 1], [2, 3]);
     * // => [2]
     */
    var intersection = baseRest(function(arrays) {
      var mapped = arrayMap(arrays, castArrayLikeObject);
      return (mapped.length && mapped[0] === arrays[0])
        ? baseIntersection(mapped)
        : [];
    });

    /**
     * This method is like `_.intersection` except that it accepts `iteratee`
     * which is invoked for each element of each `arrays` to generate the criterion
     * by which they're compared. The order and references of result values are
     * determined by the first array. The iteratee is invoked with one argument:
     * (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns the new array of intersecting values.
     * @example
     *
     * _.intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor);
     * // => [2.1]
     *
     * // The `_.property` iteratee shorthand.
     * _.intersectionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 1 }]
     */
    var intersectionBy = baseRest(function(arrays) {
      var iteratee = last(arrays),
          mapped = arrayMap(arrays, castArrayLikeObject);

      if (iteratee === last(mapped)) {
        iteratee = undefined;
      } else {
        mapped.pop();
      }
      return (mapped.length && mapped[0] === arrays[0])
        ? baseIntersection(mapped, getIteratee(iteratee, 2))
        : [];
    });

    /**
     * This method is like `_.intersection` except that it accepts `comparator`
     * which is invoked to compare elements of `arrays`. The order and references
     * of result values are determined by the first array. The comparator is
     * invoked with two arguments: (arrVal, othVal).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of intersecting values.
     * @example
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
     * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
     *
     * _.intersectionWith(objects, others, _.isEqual);
     * // => [{ 'x': 1, 'y': 2 }]
     */
    var intersectionWith = baseRest(function(arrays) {
      var comparator = last(arrays),
          mapped = arrayMap(arrays, castArrayLikeObject);

      comparator = typeof comparator == 'function' ? comparator : undefined;
      if (comparator) {
        mapped.pop();
      }
      return (mapped.length && mapped[0] === arrays[0])
        ? baseIntersection(mapped, undefined, comparator)
        : [];
    });

    /**
     * Converts all elements in `array` into a string separated by `separator`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to convert.
     * @param {string} [separator=','] The element separator.
     * @returns {string} Returns the joined string.
     * @example
     *
     * _.join(['a', 'b', 'c'], '~');
     * // => 'a~b~c'
     */
    function join(array, separator) {
      return array == null ? '' : nativeJoin.call(array, separator);
    }

    /**
     * Gets the last element of `array`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to query.
     * @returns {*} Returns the last element of `array`.
     * @example
     *
     * _.last([1, 2, 3]);
     * // => 3
     */
    function last(array) {
      var length = array == null ? 0 : array.length;
      return length ? array[length - 1] : undefined;
    }

    /**
     * This method is like `_.indexOf` except that it iterates over elements of
     * `array` from right to left.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @param {number} [fromIndex=array.length-1] The index to search from.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.lastIndexOf([1, 2, 1, 2], 2);
     * // => 3
     *
     * // Search from the `fromIndex`.
     * _.lastIndexOf([1, 2, 1, 2], 2, 2);
     * // => 1
     */
    function lastIndexOf(array, value, fromIndex) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return -1;
      }
      var index = length;
      if (fromIndex !== undefined) {
        index = toInteger(fromIndex);
        index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
      }
      return value === value
        ? strictLastIndexOf(array, value, index)
        : baseFindIndex(array, baseIsNaN, index, true);
    }

    /**
     * Gets the element at index `n` of `array`. If `n` is negative, the nth
     * element from the end is returned.
     *
     * @static
     * @memberOf _
     * @since 4.11.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=0] The index of the element to return.
     * @returns {*} Returns the nth element of `array`.
     * @example
     *
     * var array = ['a', 'b', 'c', 'd'];
     *
     * _.nth(array, 1);
     * // => 'b'
     *
     * _.nth(array, -2);
     * // => 'c';
     */
    function nth(array, n) {
      return (array && array.length) ? baseNth(array, toInteger(n)) : undefined;
    }

    /**
     * Removes all given values from `array` using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * **Note:** Unlike `_.without`, this method mutates `array`. Use `_.remove`
     * to remove elements from an array by predicate.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {...*} [values] The values to remove.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = ['a', 'b', 'c', 'a', 'b', 'c'];
     *
     * _.pull(array, 'a', 'c');
     * console.log(array);
     * // => ['b', 'b']
     */
    var pull = baseRest(pullAll);

    /**
     * This method is like `_.pull` except that it accepts an array of values to remove.
     *
     * **Note:** Unlike `_.difference`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {Array} values The values to remove.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = ['a', 'b', 'c', 'a', 'b', 'c'];
     *
     * _.pullAll(array, ['a', 'c']);
     * console.log(array);
     * // => ['b', 'b']
     */
    function pullAll(array, values) {
      return (array && array.length && values && values.length)
        ? basePullAll(array, values)
        : array;
    }

    /**
     * This method is like `_.pullAll` except that it accepts `iteratee` which is
     * invoked for each element of `array` and `values` to generate the criterion
     * by which they're compared. The iteratee is invoked with one argument: (value).
     *
     * **Note:** Unlike `_.differenceBy`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {Array} values The values to remove.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }];
     *
     * _.pullAllBy(array, [{ 'x': 1 }, { 'x': 3 }], 'x');
     * console.log(array);
     * // => [{ 'x': 2 }]
     */
    function pullAllBy(array, values, iteratee) {
      return (array && array.length && values && values.length)
        ? basePullAll(array, values, getIteratee(iteratee, 2))
        : array;
    }

    /**
     * This method is like `_.pullAll` except that it accepts `comparator` which
     * is invoked to compare elements of `array` to `values`. The comparator is
     * invoked with two arguments: (arrVal, othVal).
     *
     * **Note:** Unlike `_.differenceWith`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @since 4.6.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {Array} values The values to remove.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [{ 'x': 1, 'y': 2 }, { 'x': 3, 'y': 4 }, { 'x': 5, 'y': 6 }];
     *
     * _.pullAllWith(array, [{ 'x': 3, 'y': 4 }], _.isEqual);
     * console.log(array);
     * // => [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]
     */
    function pullAllWith(array, values, comparator) {
      return (array && array.length && values && values.length)
        ? basePullAll(array, values, undefined, comparator)
        : array;
    }

    /**
     * Removes elements from `array` corresponding to `indexes` and returns an
     * array of removed elements.
     *
     * **Note:** Unlike `_.at`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {...(number|number[])} [indexes] The indexes of elements to remove.
     * @returns {Array} Returns the new array of removed elements.
     * @example
     *
     * var array = ['a', 'b', 'c', 'd'];
     * var pulled = _.pullAt(array, [1, 3]);
     *
     * console.log(array);
     * // => ['a', 'c']
     *
     * console.log(pulled);
     * // => ['b', 'd']
     */
    var pullAt = flatRest(function(array, indexes) {
      var length = array == null ? 0 : array.length,
          result = baseAt(array, indexes);

      basePullAt(array, arrayMap(indexes, function(index) {
        return isIndex(index, length) ? +index : index;
      }).sort(compareAscending));

      return result;
    });

    /**
     * Removes all elements from `array` that `predicate` returns truthy for
     * and returns an array of the removed elements. The predicate is invoked
     * with three arguments: (value, index, array).
     *
     * **Note:** Unlike `_.filter`, this method mutates `array`. Use `_.pull`
     * to pull elements from an array by value.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new array of removed elements.
     * @example
     *
     * var array = [1, 2, 3, 4];
     * var evens = _.remove(array, function(n) {
     *   return n % 2 == 0;
     * });
     *
     * console.log(array);
     * // => [1, 3]
     *
     * console.log(evens);
     * // => [2, 4]
     */
    function remove(array, predicate) {
      var result = [];
      if (!(array && array.length)) {
        return result;
      }
      var index = -1,
          indexes = [],
          length = array.length;

      predicate = getIteratee(predicate, 3);
      while (++index < length) {
        var value = array[index];
        if (predicate(value, index, array)) {
          result.push(value);
          indexes.push(index);
        }
      }
      basePullAt(array, indexes);
      return result;
    }

    /**
     * Reverses `array` so that the first element becomes the last, the second
     * element becomes the second to last, and so on.
     *
     * **Note:** This method mutates `array` and is based on
     * [`Array#reverse`](https://mdn.io/Array/reverse).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [1, 2, 3];
     *
     * _.reverse(array);
     * // => [3, 2, 1]
     *
     * console.log(array);
     * // => [3, 2, 1]
     */
    function reverse(array) {
      return array == null ? array : nativeReverse.call(array);
    }

    /**
     * Creates a slice of `array` from `start` up to, but not including, `end`.
     *
     * **Note:** This method is used instead of
     * [`Array#slice`](https://mdn.io/Array/slice) to ensure dense arrays are
     * returned.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to slice.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the slice of `array`.
     */
    function slice(array, start, end) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      if (end && typeof end != 'number' && isIterateeCall(array, start, end)) {
        start = 0;
        end = length;
      }
      else {
        start = start == null ? 0 : toInteger(start);
        end = end === undefined ? length : toInteger(end);
      }
      return baseSlice(array, start, end);
    }

    /**
     * Uses a binary search to determine the lowest index at which `value`
     * should be inserted into `array` in order to maintain its sort order.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * _.sortedIndex([30, 50], 40);
     * // => 1
     */
    function sortedIndex(array, value) {
      return baseSortedIndex(array, value);
    }

    /**
     * This method is like `_.sortedIndex` except that it accepts `iteratee`
     * which is invoked for `value` and each element of `array` to compute their
     * sort ranking. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * var objects = [{ 'x': 4 }, { 'x': 5 }];
     *
     * _.sortedIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
     * // => 0
     *
     * // The `_.property` iteratee shorthand.
     * _.sortedIndexBy(objects, { 'x': 4 }, 'x');
     * // => 0
     */
    function sortedIndexBy(array, value, iteratee) {
      return baseSortedIndexBy(array, value, getIteratee(iteratee, 2));
    }

    /**
     * This method is like `_.indexOf` except that it performs a binary
     * search on a sorted `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.sortedIndexOf([4, 5, 5, 5, 6], 5);
     * // => 1
     */
    function sortedIndexOf(array, value) {
      var length = array == null ? 0 : array.length;
      if (length) {
        var index = baseSortedIndex(array, value);
        if (index < length && eq(array[index], value)) {
          return index;
        }
      }
      return -1;
    }

    /**
     * This method is like `_.sortedIndex` except that it returns the highest
     * index at which `value` should be inserted into `array` in order to
     * maintain its sort order.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * _.sortedLastIndex([4, 5, 5, 5, 6], 5);
     * // => 4
     */
    function sortedLastIndex(array, value) {
      return baseSortedIndex(array, value, true);
    }

    /**
     * This method is like `_.sortedLastIndex` except that it accepts `iteratee`
     * which is invoked for `value` and each element of `array` to compute their
     * sort ranking. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * var objects = [{ 'x': 4 }, { 'x': 5 }];
     *
     * _.sortedLastIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
     * // => 1
     *
     * // The `_.property` iteratee shorthand.
     * _.sortedLastIndexBy(objects, { 'x': 4 }, 'x');
     * // => 1
     */
    function sortedLastIndexBy(array, value, iteratee) {
      return baseSortedIndexBy(array, value, getIteratee(iteratee, 2), true);
    }

    /**
     * This method is like `_.lastIndexOf` except that it performs a binary
     * search on a sorted `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.sortedLastIndexOf([4, 5, 5, 5, 6], 5);
     * // => 3
     */
    function sortedLastIndexOf(array, value) {
      var length = array == null ? 0 : array.length;
      if (length) {
        var index = baseSortedIndex(array, value, true) - 1;
        if (eq(array[index], value)) {
          return index;
        }
      }
      return -1;
    }

    /**
     * This method is like `_.uniq` except that it's designed and optimized
     * for sorted arrays.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * _.sortedUniq([1, 1, 2]);
     * // => [1, 2]
     */
    function sortedUniq(array) {
      return (array && array.length)
        ? baseSortedUniq(array)
        : [];
    }

    /**
     * This method is like `_.uniqBy` except that it's designed and optimized
     * for sorted arrays.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * _.sortedUniqBy([1.1, 1.2, 2.3, 2.4], Math.floor);
     * // => [1.1, 2.3]
     */
    function sortedUniqBy(array, iteratee) {
      return (array && array.length)
        ? baseSortedUniq(array, getIteratee(iteratee, 2))
        : [];
    }

    /**
     * Gets all but the first element of `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.tail([1, 2, 3]);
     * // => [2, 3]
     */
    function tail(array) {
      var length = array == null ? 0 : array.length;
      return length ? baseSlice(array, 1, length) : [];
    }

    /**
     * Creates a slice of `array` with `n` elements taken from the beginning.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to take.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.take([1, 2, 3]);
     * // => [1]
     *
     * _.take([1, 2, 3], 2);
     * // => [1, 2]
     *
     * _.take([1, 2, 3], 5);
     * // => [1, 2, 3]
     *
     * _.take([1, 2, 3], 0);
     * // => []
     */
    function take(array, n, guard) {
      if (!(array && array.length)) {
        return [];
      }
      n = (guard || n === undefined) ? 1 : toInteger(n);
      return baseSlice(array, 0, n < 0 ? 0 : n);
    }

    /**
     * Creates a slice of `array` with `n` elements taken from the end.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to take.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.takeRight([1, 2, 3]);
     * // => [3]
     *
     * _.takeRight([1, 2, 3], 2);
     * // => [2, 3]
     *
     * _.takeRight([1, 2, 3], 5);
     * // => [1, 2, 3]
     *
     * _.takeRight([1, 2, 3], 0);
     * // => []
     */
    function takeRight(array, n, guard) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      n = (guard || n === undefined) ? 1 : toInteger(n);
      n = length - n;
      return baseSlice(array, n < 0 ? 0 : n, length);
    }

    /**
     * Creates a slice of `array` with elements taken from the end. Elements are
     * taken until `predicate` returns falsey. The predicate is invoked with
     * three arguments: (value, index, array).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': true },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': false }
     * ];
     *
     * _.takeRightWhile(users, function(o) { return !o.active; });
     * // => objects for ['fred', 'pebbles']
     *
     * // The `_.matches` iteratee shorthand.
     * _.takeRightWhile(users, { 'user': 'pebbles', 'active': false });
     * // => objects for ['pebbles']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.takeRightWhile(users, ['active', false]);
     * // => objects for ['fred', 'pebbles']
     *
     * // The `_.property` iteratee shorthand.
     * _.takeRightWhile(users, 'active');
     * // => []
     */
    function takeRightWhile(array, predicate) {
      return (array && array.length)
        ? baseWhile(array, getIteratee(predicate, 3), false, true)
        : [];
    }

    /**
     * Creates a slice of `array` with elements taken from the beginning. Elements
     * are taken until `predicate` returns falsey. The predicate is invoked with
     * three arguments: (value, index, array).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': false },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': true }
     * ];
     *
     * _.takeWhile(users, function(o) { return !o.active; });
     * // => objects for ['barney', 'fred']
     *
     * // The `_.matches` iteratee shorthand.
     * _.takeWhile(users, { 'user': 'barney', 'active': false });
     * // => objects for ['barney']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.takeWhile(users, ['active', false]);
     * // => objects for ['barney', 'fred']
     *
     * // The `_.property` iteratee shorthand.
     * _.takeWhile(users, 'active');
     * // => []
     */
    function takeWhile(array, predicate) {
      return (array && array.length)
        ? baseWhile(array, getIteratee(predicate, 3))
        : [];
    }

    /**
     * Creates an array of unique values, in order, from all given arrays using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @returns {Array} Returns the new array of combined values.
     * @example
     *
     * _.union([2], [1, 2]);
     * // => [2, 1]
     */
    var union = baseRest(function(arrays) {
      return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
    });

    /**
     * This method is like `_.union` except that it accepts `iteratee` which is
     * invoked for each element of each `arrays` to generate the criterion by
     * which uniqueness is computed. Result values are chosen from the first
     * array in which the value occurs. The iteratee is invoked with one argument:
     * (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns the new array of combined values.
     * @example
     *
     * _.unionBy([2.1], [1.2, 2.3], Math.floor);
     * // => [2.1, 1.2]
     *
     * // The `_.property` iteratee shorthand.
     * _.unionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 1 }, { 'x': 2 }]
     */
    var unionBy = baseRest(function(arrays) {
      var iteratee = last(arrays);
      if (isArrayLikeObject(iteratee)) {
        iteratee = undefined;
      }
      return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee, 2));
    });

    /**
     * This method is like `_.union` except that it accepts `comparator` which
     * is invoked to compare elements of `arrays`. Result values are chosen from
     * the first array in which the value occurs. The comparator is invoked
     * with two arguments: (arrVal, othVal).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of combined values.
     * @example
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
     * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
     *
     * _.unionWith(objects, others, _.isEqual);
     * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
     */
    var unionWith = baseRest(function(arrays) {
      var comparator = last(arrays);
      comparator = typeof comparator == 'function' ? comparator : undefined;
      return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined, comparator);
    });

    /**
     * Creates a duplicate-free version of an array, using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons, in which only the first occurrence of each element
     * is kept. The order of result values is determined by the order they occur
     * in the array.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * _.uniq([2, 1, 2]);
     * // => [2, 1]
     */
    function uniq(array) {
      return (array && array.length) ? baseUniq(array) : [];
    }

    /**
     * This method is like `_.uniq` except that it accepts `iteratee` which is
     * invoked for each element in `array` to generate the criterion by which
     * uniqueness is computed. The order of result values is determined by the
     * order they occur in the array. The iteratee is invoked with one argument:
     * (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * _.uniqBy([2.1, 1.2, 2.3], Math.floor);
     * // => [2.1, 1.2]
     *
     * // The `_.property` iteratee shorthand.
     * _.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 1 }, { 'x': 2 }]
     */
    function uniqBy(array, iteratee) {
      return (array && array.length) ? baseUniq(array, getIteratee(iteratee, 2)) : [];
    }

    /**
     * This method is like `_.uniq` except that it accepts `comparator` which
     * is invoked to compare elements of `array`. The order of result values is
     * determined by the order they occur in the array.The comparator is invoked
     * with two arguments: (arrVal, othVal).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 2 }];
     *
     * _.uniqWith(objects, _.isEqual);
     * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
     */
    function uniqWith(array, comparator) {
      comparator = typeof comparator == 'function' ? comparator : undefined;
      return (array && array.length) ? baseUniq(array, undefined, comparator) : [];
    }

    /**
     * This method is like `_.zip` except that it accepts an array of grouped
     * elements and creates an array regrouping the elements to their pre-zip
     * configuration.
     *
     * @static
     * @memberOf _
     * @since 1.2.0
     * @category Array
     * @param {Array} array The array of grouped elements to process.
     * @returns {Array} Returns the new array of regrouped elements.
     * @example
     *
     * var zipped = _.zip(['a', 'b'], [1, 2], [true, false]);
     * // => [['a', 1, true], ['b', 2, false]]
     *
     * _.unzip(zipped);
     * // => [['a', 'b'], [1, 2], [true, false]]
     */
    function unzip(array) {
      if (!(array && array.length)) {
        return [];
      }
      var length = 0;
      array = arrayFilter(array, function(group) {
        if (isArrayLikeObject(group)) {
          length = nativeMax(group.length, length);
          return true;
        }
      });
      return baseTimes(length, function(index) {
        return arrayMap(array, baseProperty(index));
      });
    }

    /**
     * This method is like `_.unzip` except that it accepts `iteratee` to specify
     * how regrouped values should be combined. The iteratee is invoked with the
     * elements of each group: (...group).
     *
     * @static
     * @memberOf _
     * @since 3.8.0
     * @category Array
     * @param {Array} array The array of grouped elements to process.
     * @param {Function} [iteratee=_.identity] The function to combine
     *  regrouped values.
     * @returns {Array} Returns the new array of regrouped elements.
     * @example
     *
     * var zipped = _.zip([1, 2], [10, 20], [100, 200]);
     * // => [[1, 10, 100], [2, 20, 200]]
     *
     * _.unzipWith(zipped, _.add);
     * // => [3, 30, 300]
     */
    function unzipWith(array, iteratee) {
      if (!(array && array.length)) {
        return [];
      }
      var result = unzip(array);
      if (iteratee == null) {
        return result;
      }
      return arrayMap(result, function(group) {
        return apply(iteratee, undefined, group);
      });
    }

    /**
     * Creates an array excluding all given values using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * **Note:** Unlike `_.pull`, this method returns a new array.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {...*} [values] The values to exclude.
     * @returns {Array} Returns the new array of filtered values.
     * @see _.difference, _.xor
     * @example
     *
     * _.without([2, 1, 2, 3], 1, 2);
     * // => [3]
     */
    var without = baseRest(function(array, values) {
      return isArrayLikeObject(array)
        ? baseDifference(array, values)
        : [];
    });

    /**
     * Creates an array of unique values that is the
     * [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference)
     * of the given arrays. The order of result values is determined by the order
     * they occur in the arrays.
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @returns {Array} Returns the new array of filtered values.
     * @see _.difference, _.without
     * @example
     *
     * _.xor([2, 1], [2, 3]);
     * // => [1, 3]
     */
    var xor = baseRest(function(arrays) {
      return baseXor(arrayFilter(arrays, isArrayLikeObject));
    });

    /**
     * This method is like `_.xor` except that it accepts `iteratee` which is
     * invoked for each element of each `arrays` to generate the criterion by
     * which by which they're compared. The order of result values is determined
     * by the order they occur in the arrays. The iteratee is invoked with one
     * argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * _.xorBy([2.1, 1.2], [2.3, 3.4], Math.floor);
     * // => [1.2, 3.4]
     *
     * // The `_.property` iteratee shorthand.
     * _.xorBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 2 }]
     */
    var xorBy = baseRest(function(arrays) {
      var iteratee = last(arrays);
      if (isArrayLikeObject(iteratee)) {
        iteratee = undefined;
      }
      return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee, 2));
    });

    /**
     * This method is like `_.xor` except that it accepts `comparator` which is
     * invoked to compare elements of `arrays`. The order of result values is
     * determined by the order they occur in the arrays. The comparator is invoked
     * with two arguments: (arrVal, othVal).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
     * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
     *
     * _.xorWith(objects, others, _.isEqual);
     * // => [{ 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
     */
    var xorWith = baseRest(function(arrays) {
      var comparator = last(arrays);
      comparator = typeof comparator == 'function' ? comparator : undefined;
      return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined, comparator);
    });

    /**
     * Creates an array of grouped elements, the first of which contains the
     * first elements of the given arrays, the second of which contains the
     * second elements of the given arrays, and so on.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {...Array} [arrays] The arrays to process.
     * @returns {Array} Returns the new array of grouped elements.
     * @example
     *
     * _.zip(['a', 'b'], [1, 2], [true, false]);
     * // => [['a', 1, true], ['b', 2, false]]
     */
    var zip = baseRest(unzip);

    /**
     * This method is like `_.fromPairs` except that it accepts two arrays,
     * one of property identifiers and one of corresponding values.
     *
     * @static
     * @memberOf _
     * @since 0.4.0
     * @category Array
     * @param {Array} [props=[]] The property identifiers.
     * @param {Array} [values=[]] The property values.
     * @returns {Object} Returns the new object.
     * @example
     *
     * _.zipObject(['a', 'b'], [1, 2]);
     * // => { 'a': 1, 'b': 2 }
     */
    function zipObject(props, values) {
      return baseZipObject(props || [], values || [], assignValue);
    }

    /**
     * This method is like `_.zipObject` except that it supports property paths.
     *
     * @static
     * @memberOf _
     * @since 4.1.0
     * @category Array
     * @param {Array} [props=[]] The property identifiers.
     * @param {Array} [values=[]] The property values.
     * @returns {Object} Returns the new object.
     * @example
     *
     * _.zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [1, 2]);
     * // => { 'a': { 'b': [{ 'c': 1 }, { 'd': 2 }] } }
     */
    function zipObjectDeep(props, values) {
      return baseZipObject(props || [], values || [], baseSet);
    }

    /**
     * This method is like `_.zip` except that it accepts `iteratee` to specify
     * how grouped values should be combined. The iteratee is invoked with the
     * elements of each group: (...group).
     *
     * @static
     * @memberOf _
     * @since 3.8.0
     * @category Array
     * @param {...Array} [arrays] The arrays to process.
     * @param {Function} [iteratee=_.identity] The function to combine
     *  grouped values.
     * @returns {Array} Returns the new array of grouped elements.
     * @example
     *
     * _.zipWith([1, 2], [10, 20], [100, 200], function(a, b, c) {
     *   return a + b + c;
     * });
     * // => [111, 222]
     */
    var zipWith = baseRest(function(arrays) {
      var length = arrays.length,
          iteratee = length > 1 ? arrays[length - 1] : undefined;

      iteratee = typeof iteratee == 'function' ? (arrays.pop(), iteratee) : undefined;
      return unzipWith(arrays, iteratee);
    });

    /*------------------------------------------------------------------------*/

    /**
     * Creates a `lodash` wrapper instance that wraps `value` with explicit method
     * chain sequences enabled. The result of such sequences must be unwrapped
     * with `_#value`.
     *
     * @static
     * @memberOf _
     * @since 1.3.0
     * @category Seq
     * @param {*} value The value to wrap.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'age': 36 },
     *   { 'user': 'fred',    'age': 40 },
     *   { 'user': 'pebbles', 'age': 1 }
     * ];
     *
     * var youngest = _
     *   .chain(users)
     *   .sortBy('age')
     *   .map(function(o) {
     *     return o.user + ' is ' + o.age;
     *   })
     *   .head()
     *   .value();
     * // => 'pebbles is 1'
     */
    function chain(value) {
      var result = lodash(value);
      result.__chain__ = true;
      return result;
    }

    /**
     * This method invokes `interceptor` and returns `value`. The interceptor
     * is invoked with one argument; (value). The purpose of this method is to
     * "tap into" a method chain sequence in order to modify intermediate results.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Seq
     * @param {*} value The value to provide to `interceptor`.
     * @param {Function} interceptor The function to invoke.
     * @returns {*} Returns `value`.
     * @example
     *
     * _([1, 2, 3])
     *  .tap(function(array) {
     *    // Mutate input array.
     *    array.pop();
     *  })
     *  .reverse()
     *  .value();
     * // => [2, 1]
     */
    function tap(value, interceptor) {
      interceptor(value);
      return value;
    }

    /**
     * This method is like `_.tap` except that it returns the result of `interceptor`.
     * The purpose of this method is to "pass thru" values replacing intermediate
     * results in a method chain sequence.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Seq
     * @param {*} value The value to provide to `interceptor`.
     * @param {Function} interceptor The function to invoke.
     * @returns {*} Returns the result of `interceptor`.
     * @example
     *
     * _('  abc  ')
     *  .chain()
     *  .trim()
     *  .thru(function(value) {
     *    return [value];
     *  })
     *  .value();
     * // => ['abc']
     */
    function thru(value, interceptor) {
      return interceptor(value);
    }

    /**
     * This method is the wrapper version of `_.at`.
     *
     * @name at
     * @memberOf _
     * @since 1.0.0
     * @category Seq
     * @param {...(string|string[])} [paths] The property paths to pick.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
     *
     * _(object).at(['a[0].b.c', 'a[1]']).value();
     * // => [3, 4]
     */
    var wrapperAt = flatRest(function(paths) {
      var length = paths.length,
          start = length ? paths[0] : 0,
          value = this.__wrapped__,
          interceptor = function(object) { return baseAt(object, paths); };

      if (length > 1 || this.__actions__.length ||
          !(value instanceof LazyWrapper) || !isIndex(start)) {
        return this.thru(interceptor);
      }
      value = value.slice(start, +start + (length ? 1 : 0));
      value.__actions__.push({
        'func': thru,
        'args': [interceptor],
        'thisArg': undefined
      });
      return new LodashWrapper(value, this.__chain__).thru(function(array) {
        if (length && !array.length) {
          array.push(undefined);
        }
        return array;
      });
    });

    /**
     * Creates a `lodash` wrapper instance with explicit method chain sequences enabled.
     *
     * @name chain
     * @memberOf _
     * @since 0.1.0
     * @category Seq
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 40 }
     * ];
     *
     * // A sequence without explicit chaining.
     * _(users).head();
     * // => { 'user': 'barney', 'age': 36 }
     *
     * // A sequence with explicit chaining.
     * _(users)
     *   .chain()
     *   .head()
     *   .pick('user')
     *   .value();
     * // => { 'user': 'barney' }
     */
    function wrapperChain() {
      return chain(this);
    }

    /**
     * Executes the chain sequence and returns the wrapped result.
     *
     * @name commit
     * @memberOf _
     * @since 3.2.0
     * @category Seq
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var array = [1, 2];
     * var wrapped = _(array).push(3);
     *
     * console.log(array);
     * // => [1, 2]
     *
     * wrapped = wrapped.commit();
     * console.log(array);
     * // => [1, 2, 3]
     *
     * wrapped.last();
     * // => 3
     *
     * console.log(array);
     * // => [1, 2, 3]
     */
    function wrapperCommit() {
      return new LodashWrapper(this.value(), this.__chain__);
    }

    /**
     * Gets the next value on a wrapped object following the
     * [iterator protocol](https://mdn.io/iteration_protocols#iterator).
     *
     * @name next
     * @memberOf _
     * @since 4.0.0
     * @category Seq
     * @returns {Object} Returns the next iterator value.
     * @example
     *
     * var wrapped = _([1, 2]);
     *
     * wrapped.next();
     * // => { 'done': false, 'value': 1 }
     *
     * wrapped.next();
     * // => { 'done': false, 'value': 2 }
     *
     * wrapped.next();
     * // => { 'done': true, 'value': undefined }
     */
    function wrapperNext() {
      if (this.__values__ === undefined) {
        this.__values__ = toArray(this.value());
      }
      var done = this.__index__ >= this.__values__.length,
          value = done ? undefined : this.__values__[this.__index__++];

      return { 'done': done, 'value': value };
    }

    /**
     * Enables the wrapper to be iterable.
     *
     * @name Symbol.iterator
     * @memberOf _
     * @since 4.0.0
     * @category Seq
     * @returns {Object} Returns the wrapper object.
     * @example
     *
     * var wrapped = _([1, 2]);
     *
     * wrapped[Symbol.iterator]() === wrapped;
     * // => true
     *
     * Array.from(wrapped);
     * // => [1, 2]
     */
    function wrapperToIterator() {
      return this;
    }

    /**
     * Creates a clone of the chain sequence planting `value` as the wrapped value.
     *
     * @name plant
     * @memberOf _
     * @since 3.2.0
     * @category Seq
     * @param {*} value The value to plant.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var wrapped = _([1, 2]).map(square);
     * var other = wrapped.plant([3, 4]);
     *
     * other.value();
     * // => [9, 16]
     *
     * wrapped.value();
     * // => [1, 4]
     */
    function wrapperPlant(value) {
      var result,
          parent = this;

      while (parent instanceof baseLodash) {
        var clone = wrapperClone(parent);
        clone.__index__ = 0;
        clone.__values__ = undefined;
        if (result) {
          previous.__wrapped__ = clone;
        } else {
          result = clone;
        }
        var previous = clone;
        parent = parent.__wrapped__;
      }
      previous.__wrapped__ = value;
      return result;
    }

    /**
     * This method is the wrapper version of `_.reverse`.
     *
     * **Note:** This method mutates the wrapped array.
     *
     * @name reverse
     * @memberOf _
     * @since 0.1.0
     * @category Seq
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var array = [1, 2, 3];
     *
     * _(array).reverse().value()
     * // => [3, 2, 1]
     *
     * console.log(array);
     * // => [3, 2, 1]
     */
    function wrapperReverse() {
      var value = this.__wrapped__;
      if (value instanceof LazyWrapper) {
        var wrapped = value;
        if (this.__actions__.length) {
          wrapped = new LazyWrapper(this);
        }
        wrapped = wrapped.reverse();
        wrapped.__actions__.push({
          'func': thru,
          'args': [reverse],
          'thisArg': undefined
        });
        return new LodashWrapper(wrapped, this.__chain__);
      }
      return this.thru(reverse);
    }

    /**
     * Executes the chain sequence to resolve the unwrapped value.
     *
     * @name value
     * @memberOf _
     * @since 0.1.0
     * @alias toJSON, valueOf
     * @category Seq
     * @returns {*} Returns the resolved unwrapped value.
     * @example
     *
     * _([1, 2, 3]).value();
     * // => [1, 2, 3]
     */
    function wrapperValue() {
      return baseWrapperValue(this.__wrapped__, this.__actions__);
    }

    /*------------------------------------------------------------------------*/

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` thru `iteratee`. The corresponding value of
     * each key is the number of times the key was returned by `iteratee`. The
     * iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 0.5.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * _.countBy([6.1, 4.2, 6.3], Math.floor);
     * // => { '4': 1, '6': 2 }
     *
     * // The `_.property` iteratee shorthand.
     * _.countBy(['one', 'two', 'three'], 'length');
     * // => { '3': 2, '5': 1 }
     */
    var countBy = createAggregator(function(result, value, key) {
      if (hasOwnProperty.call(result, key)) {
        ++result[key];
      } else {
        baseAssignValue(result, key, 1);
      }
    });

    /**
     * Checks if `predicate` returns truthy for **all** elements of `collection`.
     * Iteration is stopped once `predicate` returns falsey. The predicate is
     * invoked with three arguments: (value, index|key, collection).
     *
     * **Note:** This method returns `true` for
     * [empty collections](https://en.wikipedia.org/wiki/Empty_set) because
     * [everything is true](https://en.wikipedia.org/wiki/Vacuous_truth) of
     * elements of empty collections.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {boolean} Returns `true` if all elements pass the predicate check,
     *  else `false`.
     * @example
     *
     * _.every([true, 1, null, 'yes'], Boolean);
     * // => false
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': false },
     *   { 'user': 'fred',   'age': 40, 'active': false }
     * ];
     *
     * // The `_.matches` iteratee shorthand.
     * _.every(users, { 'user': 'barney', 'active': false });
     * // => false
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.every(users, ['active', false]);
     * // => true
     *
     * // The `_.property` iteratee shorthand.
     * _.every(users, 'active');
     * // => false
     */
    function every(collection, predicate, guard) {
      var func = isArray(collection) ? arrayEvery : baseEvery;
      if (guard && isIterateeCall(collection, predicate, guard)) {
        predicate = undefined;
      }
      return func(collection, getIteratee(predicate, 3));
    }

    /**
     * Iterates over elements of `collection`, returning an array of all elements
     * `predicate` returns truthy for. The predicate is invoked with three
     * arguments: (value, index|key, collection).
     *
     * **Note:** Unlike `_.remove`, this method returns a new array.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     * @see _.reject
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': true },
     *   { 'user': 'fred',   'age': 40, 'active': false }
     * ];
     *
     * _.filter(users, function(o) { return !o.active; });
     * // => objects for ['fred']
     *
     * // The `_.matches` iteratee shorthand.
     * _.filter(users, { 'age': 36, 'active': true });
     * // => objects for ['barney']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.filter(users, ['active', false]);
     * // => objects for ['fred']
     *
     * // The `_.property` iteratee shorthand.
     * _.filter(users, 'active');
     * // => objects for ['barney']
     */
    function filter(collection, predicate) {
      var func = isArray(collection) ? arrayFilter : baseFilter;
      return func(collection, getIteratee(predicate, 3));
    }

    /**
     * Iterates over elements of `collection`, returning the first element
     * `predicate` returns truthy for. The predicate is invoked with three
     * arguments: (value, index|key, collection).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param {number} [fromIndex=0] The index to search from.
     * @returns {*} Returns the matched element, else `undefined`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'age': 36, 'active': true },
     *   { 'user': 'fred',    'age': 40, 'active': false },
     *   { 'user': 'pebbles', 'age': 1,  'active': true }
     * ];
     *
     * _.find(users, function(o) { return o.age < 40; });
     * // => object for 'barney'
     *
     * // The `_.matches` iteratee shorthand.
     * _.find(users, { 'age': 1, 'active': true });
     * // => object for 'pebbles'
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.find(users, ['active', false]);
     * // => object for 'fred'
     *
     * // The `_.property` iteratee shorthand.
     * _.find(users, 'active');
     * // => object for 'barney'
     */
    var find = createFind(findIndex);

    /**
     * This method is like `_.find` except that it iterates over elements of
     * `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param {number} [fromIndex=collection.length-1] The index to search from.
     * @returns {*} Returns the matched element, else `undefined`.
     * @example
     *
     * _.findLast([1, 2, 3, 4], function(n) {
     *   return n % 2 == 1;
     * });
     * // => 3
     */
    var findLast = createFind(findLastIndex);

    /**
     * Creates a flattened array of values by running each element in `collection`
     * thru `iteratee` and flattening the mapped results. The iteratee is invoked
     * with three arguments: (value, index|key, collection).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * function duplicate(n) {
     *   return [n, n];
     * }
     *
     * _.flatMap([1, 2], duplicate);
     * // => [1, 1, 2, 2]
     */
    function flatMap(collection, iteratee) {
      return baseFlatten(map(collection, iteratee), 1);
    }

    /**
     * This method is like `_.flatMap` except that it recursively flattens the
     * mapped results.
     *
     * @static
     * @memberOf _
     * @since 4.7.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * function duplicate(n) {
     *   return [[[n, n]]];
     * }
     *
     * _.flatMapDeep([1, 2], duplicate);
     * // => [1, 1, 2, 2]
     */
    function flatMapDeep(collection, iteratee) {
      return baseFlatten(map(collection, iteratee), INFINITY);
    }

    /**
     * This method is like `_.flatMap` except that it recursively flattens the
     * mapped results up to `depth` times.
     *
     * @static
     * @memberOf _
     * @since 4.7.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {number} [depth=1] The maximum recursion depth.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * function duplicate(n) {
     *   return [[[n, n]]];
     * }
     *
     * _.flatMapDepth([1, 2], duplicate, 2);
     * // => [[1, 1], [2, 2]]
     */
    function flatMapDepth(collection, iteratee, depth) {
      depth = depth === undefined ? 1 : toInteger(depth);
      return baseFlatten(map(collection, iteratee), depth);
    }

    /**
     * Iterates over elements of `collection` and invokes `iteratee` for each element.
     * The iteratee is invoked with three arguments: (value, index|key, collection).
     * Iteratee functions may exit iteration early by explicitly returning `false`.
     *
     * **Note:** As with other "Collections" methods, objects with a "length"
     * property are iterated like arrays. To avoid this behavior use `_.forIn`
     * or `_.forOwn` for object iteration.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @alias each
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array|Object} Returns `collection`.
     * @see _.forEachRight
     * @example
     *
     * _.forEach([1, 2], function(value) {
     *   console.log(value);
     * });
     * // => Logs `1` then `2`.
     *
     * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
     *   console.log(key);
     * });
     * // => Logs 'a' then 'b' (iteration order is not guaranteed).
     */
    function forEach(collection, iteratee) {
      var func = isArray(collection) ? arrayEach : baseEach;
      return func(collection, getIteratee(iteratee, 3));
    }

    /**
     * This method is like `_.forEach` except that it iterates over elements of
     * `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @alias eachRight
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array|Object} Returns `collection`.
     * @see _.forEach
     * @example
     *
     * _.forEachRight([1, 2], function(value) {
     *   console.log(value);
     * });
     * // => Logs `2` then `1`.
     */
    function forEachRight(collection, iteratee) {
      var func = isArray(collection) ? arrayEachRight : baseEachRight;
      return func(collection, getIteratee(iteratee, 3));
    }

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` thru `iteratee`. The order of grouped values
     * is determined by the order they occur in `collection`. The corresponding
     * value of each key is an array of elements responsible for generating the
     * key. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * _.groupBy([6.1, 4.2, 6.3], Math.floor);
     * // => { '4': [4.2], '6': [6.1, 6.3] }
     *
     * // The `_.property` iteratee shorthand.
     * _.groupBy(['one', 'two', 'three'], 'length');
     * // => { '3': ['one', 'two'], '5': ['three'] }
     */
    var groupBy = createAggregator(function(result, value, key) {
      if (hasOwnProperty.call(result, key)) {
        result[key].push(value);
      } else {
        baseAssignValue(result, key, [value]);
      }
    });

    /**
     * Checks if `value` is in `collection`. If `collection` is a string, it's
     * checked for a substring of `value`, otherwise
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * is used for equality comparisons. If `fromIndex` is negative, it's used as
     * the offset from the end of `collection`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object|string} collection The collection to inspect.
     * @param {*} value The value to search for.
     * @param {number} [fromIndex=0] The index to search from.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
     * @returns {boolean} Returns `true` if `value` is found, else `false`.
     * @example
     *
     * _.includes([1, 2, 3], 1);
     * // => true
     *
     * _.includes([1, 2, 3], 1, 2);
     * // => false
     *
     * _.includes({ 'a': 1, 'b': 2 }, 1);
     * // => true
     *
     * _.includes('abcd', 'bc');
     * // => true
     */
    function includes(collection, value, fromIndex, guard) {
      collection = isArrayLike(collection) ? collection : values(collection);
      fromIndex = (fromIndex && !guard) ? toInteger(fromIndex) : 0;

      var length = collection.length;
      if (fromIndex < 0) {
        fromIndex = nativeMax(length + fromIndex, 0);
      }
      return isString(collection)
        ? (fromIndex <= length && collection.indexOf(value, fromIndex) > -1)
        : (!!length && baseIndexOf(collection, value, fromIndex) > -1);
    }

    /**
     * Invokes the method at `path` of each element in `collection`, returning
     * an array of the results of each invoked method. Any additional arguments
     * are provided to each invoked method. If `path` is a function, it's invoked
     * for, and `this` bound to, each element in `collection`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Array|Function|string} path The path of the method to invoke or
     *  the function invoked per iteration.
     * @param {...*} [args] The arguments to invoke each method with.
     * @returns {Array} Returns the array of results.
     * @example
     *
     * _.invokeMap([[5, 1, 7], [3, 2, 1]], 'sort');
     * // => [[1, 5, 7], [1, 2, 3]]
     *
     * _.invokeMap([123, 456], String.prototype.split, '');
     * // => [['1', '2', '3'], ['4', '5', '6']]
     */
    var invokeMap = baseRest(function(collection, path, args) {
      var index = -1,
          isFunc = typeof path == 'function',
          result = isArrayLike(collection) ? Array(collection.length) : [];

      baseEach(collection, function(value) {
        result[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
      });
      return result;
    });

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` thru `iteratee`. The corresponding value of
     * each key is the last element responsible for generating the key. The
     * iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * var array = [
     *   { 'dir': 'left', 'code': 97 },
     *   { 'dir': 'right', 'code': 100 }
     * ];
     *
     * _.keyBy(array, function(o) {
     *   return String.fromCharCode(o.code);
     * });
     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
     *
     * _.keyBy(array, 'dir');
     * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
     */
    var keyBy = createAggregator(function(result, value, key) {
      baseAssignValue(result, key, value);
    });

    /**
     * Creates an array of values by running each element in `collection` thru
     * `iteratee`. The iteratee is invoked with three arguments:
     * (value, index|key, collection).
     *
     * Many lodash methods are guarded to work as iteratees for methods like
     * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
     *
     * The guarded methods are:
     * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
     * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
     * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
     * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * _.map([4, 8], square);
     * // => [16, 64]
     *
     * _.map({ 'a': 4, 'b': 8 }, square);
     * // => [16, 64] (iteration order is not guaranteed)
     *
     * var users = [
     *   { 'user': 'barney' },
     *   { 'user': 'fred' }
     * ];
     *
     * // The `_.property` iteratee shorthand.
     * _.map(users, 'user');
     * // => ['barney', 'fred']
     */
    function map(collection, iteratee) {
      var func = isArray(collection) ? arrayMap : baseMap;
      return func(collection, getIteratee(iteratee, 3));
    }

    /**
     * This method is like `_.sortBy` except that it allows specifying the sort
     * orders of the iteratees to sort by. If `orders` is unspecified, all values
     * are sorted in ascending order. Otherwise, specify an order of "desc" for
     * descending or "asc" for ascending sort order of corresponding values.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Array[]|Function[]|Object[]|string[]} [iteratees=[_.identity]]
     *  The iteratees to sort by.
     * @param {string[]} [orders] The sort orders of `iteratees`.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
     * @returns {Array} Returns the new sorted array.
     * @example
     *
     * var users = [
     *   { 'user': 'fred',   'age': 48 },
     *   { 'user': 'barney', 'age': 34 },
     *   { 'user': 'fred',   'age': 40 },
     *   { 'user': 'barney', 'age': 36 }
     * ];
     *
     * // Sort by `user` in ascending order and by `age` in descending order.
     * _.orderBy(users, ['user', 'age'], ['asc', 'desc']);
     * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
     */
    function orderBy(collection, iteratees, orders, guard) {
      if (collection == null) {
        return [];
      }
      if (!isArray(iteratees)) {
        iteratees = iteratees == null ? [] : [iteratees];
      }
      orders = guard ? undefined : orders;
      if (!isArray(orders)) {
        orders = orders == null ? [] : [orders];
      }
      return baseOrderBy(collection, iteratees, orders);
    }

    /**
     * Creates an array of elements split into two groups, the first of which
     * contains elements `predicate` returns truthy for, the second of which
     * contains elements `predicate` returns falsey for. The predicate is
     * invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the array of grouped elements.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'age': 36, 'active': false },
     *   { 'user': 'fred',    'age': 40, 'active': true },
     *   { 'user': 'pebbles', 'age': 1,  'active': false }
     * ];
     *
     * _.partition(users, function(o) { return o.active; });
     * // => objects for [['fred'], ['barney', 'pebbles']]
     *
     * // The `_.matches` iteratee shorthand.
     * _.partition(users, { 'age': 1, 'active': false });
     * // => objects for [['pebbles'], ['barney', 'fred']]
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.partition(users, ['active', false]);
     * // => objects for [['barney', 'pebbles'], ['fred']]
     *
     * // The `_.property` iteratee shorthand.
     * _.partition(users, 'active');
     * // => objects for [['fred'], ['barney', 'pebbles']]
     */
    var partition = createAggregator(function(result, value, key) {
      result[key ? 0 : 1].push(value);
    }, function() { return [[], []]; });

    /**
     * Reduces `collection` to a value which is the accumulated result of running
     * each element in `collection` thru `iteratee`, where each successive
     * invocation is supplied the return value of the previous. If `accumulator`
     * is not given, the first element of `collection` is used as the initial
     * value. The iteratee is invoked with four arguments:
     * (accumulator, value, index|key, collection).
     *
     * Many lodash methods are guarded to work as iteratees for methods like
     * `_.reduce`, `_.reduceRight`, and `_.transform`.
     *
     * The guarded methods are:
     * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
     * and `sortBy`
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @returns {*} Returns the accumulated value.
     * @see _.reduceRight
     * @example
     *
     * _.reduce([1, 2], function(sum, n) {
     *   return sum + n;
     * }, 0);
     * // => 3
     *
     * _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
     *   (result[value] || (result[value] = [])).push(key);
     *   return result;
     * }, {});
     * // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
     */
    function reduce(collection, iteratee, accumulator) {
      var func = isArray(collection) ? arrayReduce : baseReduce,
          initAccum = arguments.length < 3;

      return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEach);
    }

    /**
     * This method is like `_.reduce` except that it iterates over elements of
     * `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @returns {*} Returns the accumulated value.
     * @see _.reduce
     * @example
     *
     * var array = [[0, 1], [2, 3], [4, 5]];
     *
     * _.reduceRight(array, function(flattened, other) {
     *   return flattened.concat(other);
     * }, []);
     * // => [4, 5, 2, 3, 0, 1]
     */
    function reduceRight(collection, iteratee, accumulator) {
      var func = isArray(collection) ? arrayReduceRight : baseReduce,
          initAccum = arguments.length < 3;

      return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEachRight);
    }

    /**
     * The opposite of `_.filter`; this method returns the elements of `collection`
     * that `predicate` does **not** return truthy for.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     * @see _.filter
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': false },
     *   { 'user': 'fred',   'age': 40, 'active': true }
     * ];
     *
     * _.reject(users, function(o) { return !o.active; });
     * // => objects for ['fred']
     *
     * // The `_.matches` iteratee shorthand.
     * _.reject(users, { 'age': 40, 'active': true });
     * // => objects for ['barney']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.reject(users, ['active', false]);
     * // => objects for ['fred']
     *
     * // The `_.property` iteratee shorthand.
     * _.reject(users, 'active');
     * // => objects for ['barney']
     */
    function reject(collection, predicate) {
      var func = isArray(collection) ? arrayFilter : baseFilter;
      return func(collection, negate(getIteratee(predicate, 3)));
    }

    /**
     * Gets a random element from `collection`.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to sample.
     * @returns {*} Returns the random element.
     * @example
     *
     * _.sample([1, 2, 3, 4]);
     * // => 2
     */
    function sample(collection) {
      var func = isArray(collection) ? arraySample : baseSample;
      return func(collection);
    }

    /**
     * Gets `n` random elements at unique keys from `collection` up to the
     * size of `collection`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to sample.
     * @param {number} [n=1] The number of elements to sample.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the random elements.
     * @example
     *
     * _.sampleSize([1, 2, 3], 2);
     * // => [3, 1]
     *
     * _.sampleSize([1, 2, 3], 4);
     * // => [2, 3, 1]
     */
    function sampleSize(collection, n, guard) {
      if ((guard ? isIterateeCall(collection, n, guard) : n === undefined)) {
        n = 1;
      } else {
        n = toInteger(n);
      }
      var func = isArray(collection) ? arraySampleSize : baseSampleSize;
      return func(collection, n);
    }

    /**
     * Creates an array of shuffled values, using a version of the
     * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to shuffle.
     * @returns {Array} Returns the new shuffled array.
     * @example
     *
     * _.shuffle([1, 2, 3, 4]);
     * // => [4, 1, 3, 2]
     */
    function shuffle(collection) {
      var func = isArray(collection) ? arrayShuffle : baseShuffle;
      return func(collection);
    }

    /**
     * Gets the size of `collection` by returning its length for array-like
     * values or the number of own enumerable string keyed properties for objects.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object|string} collection The collection to inspect.
     * @returns {number} Returns the collection size.
     * @example
     *
     * _.size([1, 2, 3]);
     * // => 3
     *
     * _.size({ 'a': 1, 'b': 2 });
     * // => 2
     *
     * _.size('pebbles');
     * // => 7
     */
    function size(collection) {
      if (collection == null) {
        return 0;
      }
      if (isArrayLike(collection)) {
        return isString(collection) ? stringSize(collection) : collection.length;
      }
      var tag = getTag(collection);
      if (tag == mapTag || tag == setTag) {
        return collection.size;
      }
      return baseKeys(collection).length;
    }

    /**
     * Checks if `predicate` returns truthy for **any** element of `collection`.
     * Iteration is stopped once `predicate` returns truthy. The predicate is
     * invoked with three arguments: (value, index|key, collection).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {boolean} Returns `true` if any element passes the predicate check,
     *  else `false`.
     * @example
     *
     * _.some([null, 0, 'yes', false], Boolean);
     * // => true
     *
     * var users = [
     *   { 'user': 'barney', 'active': true },
     *   { 'user': 'fred',   'active': false }
     * ];
     *
     * // The `_.matches` iteratee shorthand.
     * _.some(users, { 'user': 'barney', 'active': false });
     * // => false
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.some(users, ['active', false]);
     * // => true
     *
     * // The `_.property` iteratee shorthand.
     * _.some(users, 'active');
     * // => true
     */
    function some(collection, predicate, guard) {
      var func = isArray(collection) ? arraySome : baseSome;
      if (guard && isIterateeCall(collection, predicate, guard)) {
        predicate = undefined;
      }
      return func(collection, getIteratee(predicate, 3));
    }

    /**
     * Creates an array of elements, sorted in ascending order by the results of
     * running each element in a collection thru each iteratee. This method
     * performs a stable sort, that is, it preserves the original sort order of
     * equal elements. The iteratees are invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {...(Function|Function[])} [iteratees=[_.identity]]
     *  The iteratees to sort by.
     * @returns {Array} Returns the new sorted array.
     * @example
     *
     * var users = [
     *   { 'user': 'fred',   'age': 48 },
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 40 },
     *   { 'user': 'barney', 'age': 34 }
     * ];
     *
     * _.sortBy(users, [function(o) { return o.user; }]);
     * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
     *
     * _.sortBy(users, ['user', 'age']);
     * // => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]
     */
    var sortBy = baseRest(function(collection, iteratees) {
      if (collection == null) {
        return [];
      }
      var length = iteratees.length;
      if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
        iteratees = [];
      } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
        iteratees = [iteratees[0]];
      }
      return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
    });

    /*------------------------------------------------------------------------*/

    /**
     * Gets the timestamp of the number of milliseconds that have elapsed since
     * the Unix epoch (1 January 1970 00:00:00 UTC).
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Date
     * @returns {number} Returns the timestamp.
     * @example
     *
     * _.defer(function(stamp) {
     *   console.log(_.now() - stamp);
     * }, _.now());
     * // => Logs the number of milliseconds it took for the deferred invocation.
     */
    var now = ctxNow || function() {
      return root.Date.now();
    };

    /*------------------------------------------------------------------------*/

    /**
     * The opposite of `_.before`; this method creates a function that invokes
     * `func` once it's called `n` or more times.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {number} n The number of calls before `func` is invoked.
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * var saves = ['profile', 'settings'];
     *
     * var done = _.after(saves.length, function() {
     *   console.log('done saving!');
     * });
     *
     * _.forEach(saves, function(type) {
     *   asyncSave({ 'type': type, 'complete': done });
     * });
     * // => Logs 'done saving!' after the two async saves have completed.
     */
    function after(n, func) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      n = toInteger(n);
      return function() {
        if (--n < 1) {
          return func.apply(this, arguments);
        }
      };
    }

    /**
     * Creates a function that invokes `func`, with up to `n` arguments,
     * ignoring any additional arguments.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Function
     * @param {Function} func The function to cap arguments for.
     * @param {number} [n=func.length] The arity cap.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Function} Returns the new capped function.
     * @example
     *
     * _.map(['6', '8', '10'], _.ary(parseInt, 1));
     * // => [6, 8, 10]
     */
    function ary(func, n, guard) {
      n = guard ? undefined : n;
      n = (func && n == null) ? func.length : n;
      return createWrap(func, WRAP_ARY_FLAG, undefined, undefined, undefined, undefined, n);
    }

    /**
     * Creates a function that invokes `func`, with the `this` binding and arguments
     * of the created function, while it's called less than `n` times. Subsequent
     * calls to the created function return the result of the last `func` invocation.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Function
     * @param {number} n The number of calls at which `func` is no longer invoked.
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * jQuery(element).on('click', _.before(5, addContactToList));
     * // => Allows adding up to 4 contacts to the list.
     */
    function before(n, func) {
      var result;
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      n = toInteger(n);
      return function() {
        if (--n > 0) {
          result = func.apply(this, arguments);
        }
        if (n <= 1) {
          func = undefined;
        }
        return result;
      };
    }

    /**
     * Creates a function that invokes `func` with the `this` binding of `thisArg`
     * and `partials` prepended to the arguments it receives.
     *
     * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
     * may be used as a placeholder for partially applied arguments.
     *
     * **Note:** Unlike native `Function#bind`, this method doesn't set the "length"
     * property of bound functions.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to bind.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new bound function.
     * @example
     *
     * function greet(greeting, punctuation) {
     *   return greeting + ' ' + this.user + punctuation;
     * }
     *
     * var object = { 'user': 'fred' };
     *
     * var bound = _.bind(greet, object, 'hi');
     * bound('!');
     * // => 'hi fred!'
     *
     * // Bound with placeholders.
     * var bound = _.bind(greet, object, _, '!');
     * bound('hi');
     * // => 'hi fred!'
     */
    var bind = baseRest(function(func, thisArg, partials) {
      var bitmask = WRAP_BIND_FLAG;
      if (partials.length) {
        var holders = replaceHolders(partials, getHolder(bind));
        bitmask |= WRAP_PARTIAL_FLAG;
      }
      return createWrap(func, bitmask, thisArg, partials, holders);
    });

    /**
     * Creates a function that invokes the method at `object[key]` with `partials`
     * prepended to the arguments it receives.
     *
     * This method differs from `_.bind` by allowing bound functions to reference
     * methods that may be redefined or don't yet exist. See
     * [Peter Michaux's article](http://peter.michaux.ca/articles/lazy-function-definition-pattern)
     * for more details.
     *
     * The `_.bindKey.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for partially applied arguments.
     *
     * @static
     * @memberOf _
     * @since 0.10.0
     * @category Function
     * @param {Object} object The object to invoke the method on.
     * @param {string} key The key of the method.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new bound function.
     * @example
     *
     * var object = {
     *   'user': 'fred',
     *   'greet': function(greeting, punctuation) {
     *     return greeting + ' ' + this.user + punctuation;
     *   }
     * };
     *
     * var bound = _.bindKey(object, 'greet', 'hi');
     * bound('!');
     * // => 'hi fred!'
     *
     * object.greet = function(greeting, punctuation) {
     *   return greeting + 'ya ' + this.user + punctuation;
     * };
     *
     * bound('!');
     * // => 'hiya fred!'
     *
     * // Bound with placeholders.
     * var bound = _.bindKey(object, 'greet', _, '!');
     * bound('hi');
     * // => 'hiya fred!'
     */
    var bindKey = baseRest(function(object, key, partials) {
      var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
      if (partials.length) {
        var holders = replaceHolders(partials, getHolder(bindKey));
        bitmask |= WRAP_PARTIAL_FLAG;
      }
      return createWrap(key, bitmask, object, partials, holders);
    });

    /**
     * Creates a function that accepts arguments of `func` and either invokes
     * `func` returning its result, if at least `arity` number of arguments have
     * been provided, or returns a function that accepts the remaining `func`
     * arguments, and so on. The arity of `func` may be specified if `func.length`
     * is not sufficient.
     *
     * The `_.curry.placeholder` value, which defaults to `_` in monolithic builds,
     * may be used as a placeholder for provided arguments.
     *
     * **Note:** This method doesn't set the "length" property of curried functions.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Function
     * @param {Function} func The function to curry.
     * @param {number} [arity=func.length] The arity of `func`.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Function} Returns the new curried function.
     * @example
     *
     * var abc = function(a, b, c) {
     *   return [a, b, c];
     * };
     *
     * var curried = _.curry(abc);
     *
     * curried(1)(2)(3);
     * // => [1, 2, 3]
     *
     * curried(1, 2)(3);
     * // => [1, 2, 3]
     *
     * curried(1, 2, 3);
     * // => [1, 2, 3]
     *
     * // Curried with placeholders.
     * curried(1)(_, 3)(2);
     * // => [1, 2, 3]
     */
    function curry(func, arity, guard) {
      arity = guard ? undefined : arity;
      var result = createWrap(func, WRAP_CURRY_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
      result.placeholder = curry.placeholder;
      return result;
    }

    /**
     * This method is like `_.curry` except that arguments are applied to `func`
     * in the manner of `_.partialRight` instead of `_.partial`.
     *
     * The `_.curryRight.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for provided arguments.
     *
     * **Note:** This method doesn't set the "length" property of curried functions.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Function
     * @param {Function} func The function to curry.
     * @param {number} [arity=func.length] The arity of `func`.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Function} Returns the new curried function.
     * @example
     *
     * var abc = function(a, b, c) {
     *   return [a, b, c];
     * };
     *
     * var curried = _.curryRight(abc);
     *
     * curried(3)(2)(1);
     * // => [1, 2, 3]
     *
     * curried(2, 3)(1);
     * // => [1, 2, 3]
     *
     * curried(1, 2, 3);
     * // => [1, 2, 3]
     *
     * // Curried with placeholders.
     * curried(3)(1, _)(2);
     * // => [1, 2, 3]
     */
    function curryRight(func, arity, guard) {
      arity = guard ? undefined : arity;
      var result = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
      result.placeholder = curryRight.placeholder;
      return result;
    }

    /**
     * Creates a debounced function that delays invoking `func` until after `wait`
     * milliseconds have elapsed since the last time the debounced function was
     * invoked. The debounced function comes with a `cancel` method to cancel
     * delayed `func` invocations and a `flush` method to immediately invoke them.
     * Provide `options` to indicate whether `func` should be invoked on the
     * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
     * with the last arguments provided to the debounced function. Subsequent
     * calls to the debounced function return the result of the last `func`
     * invocation.
     *
     * **Note:** If `leading` and `trailing` options are `true`, `func` is
     * invoked on the trailing edge of the timeout only if the debounced function
     * is invoked more than once during the `wait` timeout.
     *
     * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
     * until to the next tick, similar to `setTimeout` with a timeout of `0`.
     *
     * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
     * for details over the differences between `_.debounce` and `_.throttle`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to debounce.
     * @param {number} [wait=0] The number of milliseconds to delay.
     * @param {Object} [options={}] The options object.
     * @param {boolean} [options.leading=false]
     *  Specify invoking on the leading edge of the timeout.
     * @param {number} [options.maxWait]
     *  The maximum time `func` is allowed to be delayed before it's invoked.
     * @param {boolean} [options.trailing=true]
     *  Specify invoking on the trailing edge of the timeout.
     * @returns {Function} Returns the new debounced function.
     * @example
     *
     * // Avoid costly calculations while the window size is in flux.
     * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
     *
     * // Invoke `sendMail` when clicked, debouncing subsequent calls.
     * jQuery(element).on('click', _.debounce(sendMail, 300, {
     *   'leading': true,
     *   'trailing': false
     * }));
     *
     * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
     * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
     * var source = new EventSource('/stream');
     * jQuery(source).on('message', debounced);
     *
     * // Cancel the trailing debounced invocation.
     * jQuery(window).on('popstate', debounced.cancel);
     */
    function debounce(func, wait, options) {
      var lastArgs,
          lastThis,
          maxWait,
          result,
          timerId,
          lastCallTime,
          lastInvokeTime = 0,
          leading = false,
          maxing = false,
          trailing = true;

      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      wait = toNumber(wait) || 0;
      if (isObject(options)) {
        leading = !!options.leading;
        maxing = 'maxWait' in options;
        maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
      }

      function invokeFunc(time) {
        var args = lastArgs,
            thisArg = lastThis;

        lastArgs = lastThis = undefined;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
      }

      function leadingEdge(time) {
        // Reset any `maxWait` timer.
        lastInvokeTime = time;
        // Start the timer for the trailing edge.
        timerId = setTimeout(timerExpired, wait);
        // Invoke the leading edge.
        return leading ? invokeFunc(time) : result;
      }

      function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime,
            timeSinceLastInvoke = time - lastInvokeTime,
            result = wait - timeSinceLastCall;

        return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
      }

      function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime,
            timeSinceLastInvoke = time - lastInvokeTime;

        // Either this is the first call, activity has stopped and we're at the
        // trailing edge, the system time has gone backwards and we're treating
        // it as the trailing edge, or we've hit the `maxWait` limit.
        return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
          (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
      }

      function timerExpired() {
        var time = now();
        if (shouldInvoke(time)) {
          return trailingEdge(time);
        }
        // Restart the timer.
        timerId = setTimeout(timerExpired, remainingWait(time));
      }

      function trailingEdge(time) {
        timerId = undefined;

        // Only invoke if we have `lastArgs` which means `func` has been
        // debounced at least once.
        if (trailing && lastArgs) {
          return invokeFunc(time);
        }
        lastArgs = lastThis = undefined;
        return result;
      }

      function cancel() {
        if (timerId !== undefined) {
          clearTimeout(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = undefined;
      }

      function flush() {
        return timerId === undefined ? result : trailingEdge(now());
      }

      function debounced() {
        var time = now(),
            isInvoking = shouldInvoke(time);

        lastArgs = arguments;
        lastThis = this;
        lastCallTime = time;

        if (isInvoking) {
          if (timerId === undefined) {
            return leadingEdge(lastCallTime);
          }
          if (maxing) {
            // Handle invocations in a tight loop.
            timerId = setTimeout(timerExpired, wait);
            return invokeFunc(lastCallTime);
          }
        }
        if (timerId === undefined) {
          timerId = setTimeout(timerExpired, wait);
        }
        return result;
      }
      debounced.cancel = cancel;
      debounced.flush = flush;
      return debounced;
    }

    /**
     * Defers invoking the `func` until the current call stack has cleared. Any
     * additional arguments are provided to `func` when it's invoked.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to defer.
     * @param {...*} [args] The arguments to invoke `func` with.
     * @returns {number} Returns the timer id.
     * @example
     *
     * _.defer(function(text) {
     *   console.log(text);
     * }, 'deferred');
     * // => Logs 'deferred' after one millisecond.
     */
    var defer = baseRest(function(func, args) {
      return baseDelay(func, 1, args);
    });

    /**
     * Invokes `func` after `wait` milliseconds. Any additional arguments are
     * provided to `func` when it's invoked.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to delay.
     * @param {number} wait The number of milliseconds to delay invocation.
     * @param {...*} [args] The arguments to invoke `func` with.
     * @returns {number} Returns the timer id.
     * @example
     *
     * _.delay(function(text) {
     *   console.log(text);
     * }, 1000, 'later');
     * // => Logs 'later' after one second.
     */
    var delay = baseRest(function(func, wait, args) {
      return baseDelay(func, toNumber(wait) || 0, args);
    });

    /**
     * Creates a function that invokes `func` with arguments reversed.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Function
     * @param {Function} func The function to flip arguments for.
     * @returns {Function} Returns the new flipped function.
     * @example
     *
     * var flipped = _.flip(function() {
     *   return _.toArray(arguments);
     * });
     *
     * flipped('a', 'b', 'c', 'd');
     * // => ['d', 'c', 'b', 'a']
     */
    function flip(func) {
      return createWrap(func, WRAP_FLIP_FLAG);
    }

    /**
     * Creates a function that memoizes the result of `func`. If `resolver` is
     * provided, it determines the cache key for storing the result based on the
     * arguments provided to the memoized function. By default, the first argument
     * provided to the memoized function is used as the map cache key. The `func`
     * is invoked with the `this` binding of the memoized function.
     *
     * **Note:** The cache is exposed as the `cache` property on the memoized
     * function. Its creation may be customized by replacing the `_.memoize.Cache`
     * constructor with one whose instances implement the
     * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
     * method interface of `clear`, `delete`, `get`, `has`, and `set`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to have its output memoized.
     * @param {Function} [resolver] The function to resolve the cache key.
     * @returns {Function} Returns the new memoized function.
     * @example
     *
     * var object = { 'a': 1, 'b': 2 };
     * var other = { 'c': 3, 'd': 4 };
     *
     * var values = _.memoize(_.values);
     * values(object);
     * // => [1, 2]
     *
     * values(other);
     * // => [3, 4]
     *
     * object.a = 2;
     * values(object);
     * // => [1, 2]
     *
     * // Modify the result cache.
     * values.cache.set(object, ['a', 'b']);
     * values(object);
     * // => ['a', 'b']
     *
     * // Replace `_.memoize.Cache`.
     * _.memoize.Cache = WeakMap;
     */
    function memoize(func, resolver) {
      if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var memoized = function() {
        var args = arguments,
            key = resolver ? resolver.apply(this, args) : args[0],
            cache = memoized.cache;

        if (cache.has(key)) {
          return cache.get(key);
        }
        var result = func.apply(this, args);
        memoized.cache = cache.set(key, result) || cache;
        return result;
      };
      memoized.cache = new (memoize.Cache || MapCache);
      return memoized;
    }

    // Expose `MapCache`.
    memoize.Cache = MapCache;

    /**
     * Creates a function that negates the result of the predicate `func`. The
     * `func` predicate is invoked with the `this` binding and arguments of the
     * created function.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Function
     * @param {Function} predicate The predicate to negate.
     * @returns {Function} Returns the new negated function.
     * @example
     *
     * function isEven(n) {
     *   return n % 2 == 0;
     * }
     *
     * _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
     * // => [1, 3, 5]
     */
    function negate(predicate) {
      if (typeof predicate != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      return function() {
        var args = arguments;
        switch (args.length) {
          case 0: return !predicate.call(this);
          case 1: return !predicate.call(this, args[0]);
          case 2: return !predicate.call(this, args[0], args[1]);
          case 3: return !predicate.call(this, args[0], args[1], args[2]);
        }
        return !predicate.apply(this, args);
      };
    }

    /**
     * Creates a function that is restricted to invoking `func` once. Repeat calls
     * to the function return the value of the first invocation. The `func` is
     * invoked with the `this` binding and arguments of the created function.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * var initialize = _.once(createApplication);
     * initialize();
     * initialize();
     * // => `createApplication` is invoked once
     */
    function once(func) {
      return before(2, func);
    }

    /**
     * Creates a function that invokes `func` with its arguments transformed.
     *
     * @static
     * @since 4.0.0
     * @memberOf _
     * @category Function
     * @param {Function} func The function to wrap.
     * @param {...(Function|Function[])} [transforms=[_.identity]]
     *  The argument transforms.
     * @returns {Function} Returns the new function.
     * @example
     *
     * function doubled(n) {
     *   return n * 2;
     * }
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var func = _.overArgs(function(x, y) {
     *   return [x, y];
     * }, [square, doubled]);
     *
     * func(9, 3);
     * // => [81, 6]
     *
     * func(10, 5);
     * // => [100, 10]
     */
    var overArgs = castRest(function(func, transforms) {
      transforms = (transforms.length == 1 && isArray(transforms[0]))
        ? arrayMap(transforms[0], baseUnary(getIteratee()))
        : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));

      var funcsLength = transforms.length;
      return baseRest(function(args) {
        var index = -1,
            length = nativeMin(args.length, funcsLength);

        while (++index < length) {
          args[index] = transforms[index].call(this, args[index]);
        }
        return apply(func, this, args);
      });
    });

    /**
     * Creates a function that invokes `func` with `partials` prepended to the
     * arguments it receives. This method is like `_.bind` except it does **not**
     * alter the `this` binding.
     *
     * The `_.partial.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for partially applied arguments.
     *
     * **Note:** This method doesn't set the "length" property of partially
     * applied functions.
     *
     * @static
     * @memberOf _
     * @since 0.2.0
     * @category Function
     * @param {Function} func The function to partially apply arguments to.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new partially applied function.
     * @example
     *
     * function greet(greeting, name) {
     *   return greeting + ' ' + name;
     * }
     *
     * var sayHelloTo = _.partial(greet, 'hello');
     * sayHelloTo('fred');
     * // => 'hello fred'
     *
     * // Partially applied with placeholders.
     * var greetFred = _.partial(greet, _, 'fred');
     * greetFred('hi');
     * // => 'hi fred'
     */
    var partial = baseRest(function(func, partials) {
      var holders = replaceHolders(partials, getHolder(partial));
      return createWrap(func, WRAP_PARTIAL_FLAG, undefined, partials, holders);
    });

    /**
     * This method is like `_.partial` except that partially applied arguments
     * are appended to the arguments it receives.
     *
     * The `_.partialRight.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for partially applied arguments.
     *
     * **Note:** This method doesn't set the "length" property of partially
     * applied functions.
     *
     * @static
     * @memberOf _
     * @since 1.0.0
     * @category Function
     * @param {Function} func The function to partially apply arguments to.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new partially applied function.
     * @example
     *
     * function greet(greeting, name) {
     *   return greeting + ' ' + name;
     * }
     *
     * var greetFred = _.partialRight(greet, 'fred');
     * greetFred('hi');
     * // => 'hi fred'
     *
     * // Partially applied with placeholders.
     * var sayHelloTo = _.partialRight(greet, 'hello', _);
     * sayHelloTo('fred');
     * // => 'hello fred'
     */
    var partialRight = baseRest(function(func, partials) {
      var holders = replaceHolders(partials, getHolder(partialRight));
      return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined, partials, holders);
    });

    /**
     * Creates a function that invokes `func` with arguments arranged according
     * to the specified `indexes` where the argument value at the first index is
     * provided as the first argument, the argument value at the second index is
     * provided as the second argument, and so on.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Function
     * @param {Function} func The function to rearrange arguments for.
     * @param {...(number|number[])} indexes The arranged argument indexes.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var rearged = _.rearg(function(a, b, c) {
     *   return [a, b, c];
     * }, [2, 0, 1]);
     *
     * rearged('b', 'c', 'a')
     * // => ['a', 'b', 'c']
     */
    var rearg = flatRest(function(func, indexes) {
      return createWrap(func, WRAP_REARG_FLAG, undefined, undefined, undefined, indexes);
    });

    /**
     * Creates a function that invokes `func` with the `this` binding of the
     * created function and arguments from `start` and beyond provided as
     * an array.
     *
     * **Note:** This method is based on the
     * [rest parameter](https://mdn.io/rest_parameters).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Function
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var say = _.rest(function(what, names) {
     *   return what + ' ' + _.initial(names).join(', ') +
     *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
     * });
     *
     * say('hello', 'fred', 'barney', 'pebbles');
     * // => 'hello fred, barney, & pebbles'
     */
    function rest(func, start) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      start = start === undefined ? start : toInteger(start);
      return baseRest(func, start);
    }

    /**
     * Creates a function that invokes `func` with the `this` binding of the
     * create function and an array of arguments much like
     * [`Function#apply`](http://www.ecma-international.org/ecma-262/7.0/#sec-function.prototype.apply).
     *
     * **Note:** This method is based on the
     * [spread operator](https://mdn.io/spread_operator).
     *
     * @static
     * @memberOf _
     * @since 3.2.0
     * @category Function
     * @param {Function} func The function to spread arguments over.
     * @param {number} [start=0] The start position of the spread.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var say = _.spread(function(who, what) {
     *   return who + ' says ' + what;
     * });
     *
     * say(['fred', 'hello']);
     * // => 'fred says hello'
     *
     * var numbers = Promise.all([
     *   Promise.resolve(40),
     *   Promise.resolve(36)
     * ]);
     *
     * numbers.then(_.spread(function(x, y) {
     *   return x + y;
     * }));
     * // => a Promise of 76
     */
    function spread(func, start) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      start = start == null ? 0 : nativeMax(toInteger(start), 0);
      return baseRest(function(args) {
        var array = args[start],
            otherArgs = castSlice(args, 0, start);

        if (array) {
          arrayPush(otherArgs, array);
        }
        return apply(func, this, otherArgs);
      });
    }

    /**
     * Creates a throttled function that only invokes `func` at most once per
     * every `wait` milliseconds. The throttled function comes with a `cancel`
     * method to cancel delayed `func` invocations and a `flush` method to
     * immediately invoke them. Provide `options` to indicate whether `func`
     * should be invoked on the leading and/or trailing edge of the `wait`
     * timeout. The `func` is invoked with the last arguments provided to the
     * throttled function. Subsequent calls to the throttled function return the
     * result of the last `func` invocation.
     *
     * **Note:** If `leading` and `trailing` options are `true`, `func` is
     * invoked on the trailing edge of the timeout only if the throttled function
     * is invoked more than once during the `wait` timeout.
     *
     * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
     * until to the next tick, similar to `setTimeout` with a timeout of `0`.
     *
     * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
     * for details over the differences between `_.throttle` and `_.debounce`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to throttle.
     * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
     * @param {Object} [options={}] The options object.
     * @param {boolean} [options.leading=true]
     *  Specify invoking on the leading edge of the timeout.
     * @param {boolean} [options.trailing=true]
     *  Specify invoking on the trailing edge of the timeout.
     * @returns {Function} Returns the new throttled function.
     * @example
     *
     * // Avoid excessively updating the position while scrolling.
     * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
     *
     * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
     * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
     * jQuery(element).on('click', throttled);
     *
     * // Cancel the trailing throttled invocation.
     * jQuery(window).on('popstate', throttled.cancel);
     */
    function throttle(func, wait, options) {
      var leading = true,
          trailing = true;

      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      if (isObject(options)) {
        leading = 'leading' in options ? !!options.leading : leading;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
      }
      return debounce(func, wait, {
        'leading': leading,
        'maxWait': wait,
        'trailing': trailing
      });
    }

    /**
     * Creates a function that accepts up to one argument, ignoring any
     * additional arguments.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Function
     * @param {Function} func The function to cap arguments for.
     * @returns {Function} Returns the new capped function.
     * @example
     *
     * _.map(['6', '8', '10'], _.unary(parseInt));
     * // => [6, 8, 10]
     */
    function unary(func) {
      return ary(func, 1);
    }

    /**
     * Creates a function that provides `value` to `wrapper` as its first
     * argument. Any additional arguments provided to the function are appended
     * to those provided to the `wrapper`. The wrapper is invoked with the `this`
     * binding of the created function.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {*} value The value to wrap.
     * @param {Function} [wrapper=identity] The wrapper function.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var p = _.wrap(_.escape, function(func, text) {
     *   return '<p>' + func(text) + '</p>';
     * });
     *
     * p('fred, barney, & pebbles');
     * // => '<p>fred, barney, &amp; pebbles</p>'
     */
    function wrap(value, wrapper) {
      return partial(castFunction(wrapper), value);
    }

    /*------------------------------------------------------------------------*/

    /**
     * Casts `value` as an array if it's not one.
     *
     * @static
     * @memberOf _
     * @since 4.4.0
     * @category Lang
     * @param {*} value The value to inspect.
     * @returns {Array} Returns the cast array.
     * @example
     *
     * _.castArray(1);
     * // => [1]
     *
     * _.castArray({ 'a': 1 });
     * // => [{ 'a': 1 }]
     *
     * _.castArray('abc');
     * // => ['abc']
     *
     * _.castArray(null);
     * // => [null]
     *
     * _.castArray(undefined);
     * // => [undefined]
     *
     * _.castArray();
     * // => []
     *
     * var array = [1, 2, 3];
     * console.log(_.castArray(array) === array);
     * // => true
     */
    function castArray() {
      if (!arguments.length) {
        return [];
      }
      var value = arguments[0];
      return isArray(value) ? value : [value];
    }

    /**
     * Creates a shallow clone of `value`.
     *
     * **Note:** This method is loosely based on the
     * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
     * and supports cloning arrays, array buffers, booleans, date objects, maps,
     * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
     * arrays. The own enumerable properties of `arguments` objects are cloned
     * as plain objects. An empty object is returned for uncloneable values such
     * as error objects, functions, DOM nodes, and WeakMaps.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to clone.
     * @returns {*} Returns the cloned value.
     * @see _.cloneDeep
     * @example
     *
     * var objects = [{ 'a': 1 }, { 'b': 2 }];
     *
     * var shallow = _.clone(objects);
     * console.log(shallow[0] === objects[0]);
     * // => true
     */
    function clone(value) {
      return baseClone(value, CLONE_SYMBOLS_FLAG);
    }

    /**
     * This method is like `_.clone` except that it accepts `customizer` which
     * is invoked to produce the cloned value. If `customizer` returns `undefined`,
     * cloning is handled by the method instead. The `customizer` is invoked with
     * up to four arguments; (value [, index|key, object, stack]).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to clone.
     * @param {Function} [customizer] The function to customize cloning.
     * @returns {*} Returns the cloned value.
     * @see _.cloneDeepWith
     * @example
     *
     * function customizer(value) {
     *   if (_.isElement(value)) {
     *     return value.cloneNode(false);
     *   }
     * }
     *
     * var el = _.cloneWith(document.body, customizer);
     *
     * console.log(el === document.body);
     * // => false
     * console.log(el.nodeName);
     * // => 'BODY'
     * console.log(el.childNodes.length);
     * // => 0
     */
    function cloneWith(value, customizer) {
      customizer = typeof customizer == 'function' ? customizer : undefined;
      return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
    }

    /**
     * This method is like `_.clone` except that it recursively clones `value`.
     *
     * @static
     * @memberOf _
     * @since 1.0.0
     * @category Lang
     * @param {*} value The value to recursively clone.
     * @returns {*} Returns the deep cloned value.
     * @see _.clone
     * @example
     *
     * var objects = [{ 'a': 1 }, { 'b': 2 }];
     *
     * var deep = _.cloneDeep(objects);
     * console.log(deep[0] === objects[0]);
     * // => false
     */
    function cloneDeep(value) {
      return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
    }

    /**
     * This method is like `_.cloneWith` except that it recursively clones `value`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to recursively clone.
     * @param {Function} [customizer] The function to customize cloning.
     * @returns {*} Returns the deep cloned value.
     * @see _.cloneWith
     * @example
     *
     * function customizer(value) {
     *   if (_.isElement(value)) {
     *     return value.cloneNode(true);
     *   }
     * }
     *
     * var el = _.cloneDeepWith(document.body, customizer);
     *
     * console.log(el === document.body);
     * // => false
     * console.log(el.nodeName);
     * // => 'BODY'
     * console.log(el.childNodes.length);
     * // => 20
     */
    function cloneDeepWith(value, customizer) {
      customizer = typeof customizer == 'function' ? customizer : undefined;
      return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
    }

    /**
     * Checks if `object` conforms to `source` by invoking the predicate
     * properties of `source` with the corresponding property values of `object`.
     *
     * **Note:** This method is equivalent to `_.conforms` when `source` is
     * partially applied.
     *
     * @static
     * @memberOf _
     * @since 4.14.0
     * @category Lang
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property predicates to conform to.
     * @returns {boolean} Returns `true` if `object` conforms, else `false`.
     * @example
     *
     * var object = { 'a': 1, 'b': 2 };
     *
     * _.conformsTo(object, { 'b': function(n) { return n > 1; } });
     * // => true
     *
     * _.conformsTo(object, { 'b': function(n) { return n > 2; } });
     * // => false
     */
    function conformsTo(object, source) {
      return source == null || baseConformsTo(object, source, keys(source));
    }

    /**
     * Performs a
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * comparison between two values to determine if they are equivalent.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'a': 1 };
     * var other = { 'a': 1 };
     *
     * _.eq(object, object);
     * // => true
     *
     * _.eq(object, other);
     * // => false
     *
     * _.eq('a', 'a');
     * // => true
     *
     * _.eq('a', Object('a'));
     * // => false
     *
     * _.eq(NaN, NaN);
     * // => true
     */
    function eq(value, other) {
      return value === other || (value !== value && other !== other);
    }

    /**
     * Checks if `value` is greater than `other`.
     *
     * @static
     * @memberOf _
     * @since 3.9.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is greater than `other`,
     *  else `false`.
     * @see _.lt
     * @example
     *
     * _.gt(3, 1);
     * // => true
     *
     * _.gt(3, 3);
     * // => false
     *
     * _.gt(1, 3);
     * // => false
     */
    var gt = createRelationalOperation(baseGt);

    /**
     * Checks if `value` is greater than or equal to `other`.
     *
     * @static
     * @memberOf _
     * @since 3.9.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is greater than or equal to
     *  `other`, else `false`.
     * @see _.lte
     * @example
     *
     * _.gte(3, 1);
     * // => true
     *
     * _.gte(3, 3);
     * // => true
     *
     * _.gte(1, 3);
     * // => false
     */
    var gte = createRelationalOperation(function(value, other) {
      return value >= other;
    });

    /**
     * Checks if `value` is likely an `arguments` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     *  else `false`.
     * @example
     *
     * _.isArguments(function() { return arguments; }());
     * // => true
     *
     * _.isArguments([1, 2, 3]);
     * // => false
     */
    var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
      return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
        !propertyIsEnumerable.call(value, 'callee');
    };

    /**
     * Checks if `value` is classified as an `Array` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array, else `false`.
     * @example
     *
     * _.isArray([1, 2, 3]);
     * // => true
     *
     * _.isArray(document.body.children);
     * // => false
     *
     * _.isArray('abc');
     * // => false
     *
     * _.isArray(_.noop);
     * // => false
     */
    var isArray = Array.isArray;

    /**
     * Checks if `value` is classified as an `ArrayBuffer` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array buffer, else `false`.
     * @example
     *
     * _.isArrayBuffer(new ArrayBuffer(2));
     * // => true
     *
     * _.isArrayBuffer(new Array(2));
     * // => false
     */
    var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;

    /**
     * Checks if `value` is array-like. A value is considered array-like if it's
     * not a function and has a `value.length` that's an integer greater than or
     * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
     * @example
     *
     * _.isArrayLike([1, 2, 3]);
     * // => true
     *
     * _.isArrayLike(document.body.children);
     * // => true
     *
     * _.isArrayLike('abc');
     * // => true
     *
     * _.isArrayLike(_.noop);
     * // => false
     */
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }

    /**
     * This method is like `_.isArrayLike` except that it also checks if `value`
     * is an object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array-like object,
     *  else `false`.
     * @example
     *
     * _.isArrayLikeObject([1, 2, 3]);
     * // => true
     *
     * _.isArrayLikeObject(document.body.children);
     * // => true
     *
     * _.isArrayLikeObject('abc');
     * // => false
     *
     * _.isArrayLikeObject(_.noop);
     * // => false
     */
    function isArrayLikeObject(value) {
      return isObjectLike(value) && isArrayLike(value);
    }

    /**
     * Checks if `value` is classified as a boolean primitive or object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
     * @example
     *
     * _.isBoolean(false);
     * // => true
     *
     * _.isBoolean(null);
     * // => false
     */
    function isBoolean(value) {
      return value === true || value === false ||
        (isObjectLike(value) && baseGetTag(value) == boolTag);
    }

    /**
     * Checks if `value` is a buffer.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
     * @example
     *
     * _.isBuffer(new Buffer(2));
     * // => true
     *
     * _.isBuffer(new Uint8Array(2));
     * // => false
     */
    var isBuffer = nativeIsBuffer || stubFalse;

    /**
     * Checks if `value` is classified as a `Date` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
     * @example
     *
     * _.isDate(new Date);
     * // => true
     *
     * _.isDate('Mon April 23 2012');
     * // => false
     */
    var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;

    /**
     * Checks if `value` is likely a DOM element.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
     * @example
     *
     * _.isElement(document.body);
     * // => true
     *
     * _.isElement('<body>');
     * // => false
     */
    function isElement(value) {
      return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
    }

    /**
     * Checks if `value` is an empty object, collection, map, or set.
     *
     * Objects are considered empty if they have no own enumerable string keyed
     * properties.
     *
     * Array-like values such as `arguments` objects, arrays, buffers, strings, or
     * jQuery-like collections are considered empty if they have a `length` of `0`.
     * Similarly, maps and sets are considered empty if they have a `size` of `0`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is empty, else `false`.
     * @example
     *
     * _.isEmpty(null);
     * // => true
     *
     * _.isEmpty(true);
     * // => true
     *
     * _.isEmpty(1);
     * // => true
     *
     * _.isEmpty([1, 2, 3]);
     * // => false
     *
     * _.isEmpty({ 'a': 1 });
     * // => false
     */
    function isEmpty(value) {
      if (value == null) {
        return true;
      }
      if (isArrayLike(value) &&
          (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' ||
            isBuffer(value) || isTypedArray(value) || isArguments(value))) {
        return !value.length;
      }
      var tag = getTag(value);
      if (tag == mapTag || tag == setTag) {
        return !value.size;
      }
      if (isPrototype(value)) {
        return !baseKeys(value).length;
      }
      for (var key in value) {
        if (hasOwnProperty.call(value, key)) {
          return false;
        }
      }
      return true;
    }

    /**
     * Performs a deep comparison between two values to determine if they are
     * equivalent.
     *
     * **Note:** This method supports comparing arrays, array buffers, booleans,
     * date objects, error objects, maps, numbers, `Object` objects, regexes,
     * sets, strings, symbols, and typed arrays. `Object` objects are compared
     * by their own, not inherited, enumerable properties. Functions and DOM
     * nodes are compared by strict equality, i.e. `===`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'a': 1 };
     * var other = { 'a': 1 };
     *
     * _.isEqual(object, other);
     * // => true
     *
     * object === other;
     * // => false
     */
    function isEqual(value, other) {
      return baseIsEqual(value, other);
    }

    /**
     * This method is like `_.isEqual` except that it accepts `customizer` which
     * is invoked to compare values. If `customizer` returns `undefined`, comparisons
     * are handled by the method instead. The `customizer` is invoked with up to
     * six arguments: (objValue, othValue [, index|key, object, other, stack]).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @param {Function} [customizer] The function to customize comparisons.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * function isGreeting(value) {
     *   return /^h(?:i|ello)$/.test(value);
     * }
     *
     * function customizer(objValue, othValue) {
     *   if (isGreeting(objValue) && isGreeting(othValue)) {
     *     return true;
     *   }
     * }
     *
     * var array = ['hello', 'goodbye'];
     * var other = ['hi', 'goodbye'];
     *
     * _.isEqualWith(array, other, customizer);
     * // => true
     */
    function isEqualWith(value, other, customizer) {
      customizer = typeof customizer == 'function' ? customizer : undefined;
      var result = customizer ? customizer(value, other) : undefined;
      return result === undefined ? baseIsEqual(value, other, undefined, customizer) : !!result;
    }

    /**
     * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
     * `SyntaxError`, `TypeError`, or `URIError` object.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
     * @example
     *
     * _.isError(new Error);
     * // => true
     *
     * _.isError(Error);
     * // => false
     */
    function isError(value) {
      if (!isObjectLike(value)) {
        return false;
      }
      var tag = baseGetTag(value);
      return tag == errorTag || tag == domExcTag ||
        (typeof value.message == 'string' && typeof value.name == 'string' && !isPlainObject(value));
    }

    /**
     * Checks if `value` is a finite primitive number.
     *
     * **Note:** This method is based on
     * [`Number.isFinite`](https://mdn.io/Number/isFinite).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a finite number, else `false`.
     * @example
     *
     * _.isFinite(3);
     * // => true
     *
     * _.isFinite(Number.MIN_VALUE);
     * // => true
     *
     * _.isFinite(Infinity);
     * // => false
     *
     * _.isFinite('3');
     * // => false
     */
    function isFinite(value) {
      return typeof value == 'number' && nativeIsFinite(value);
    }

    /**
     * Checks if `value` is classified as a `Function` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a function, else `false`.
     * @example
     *
     * _.isFunction(_);
     * // => true
     *
     * _.isFunction(/abc/);
     * // => false
     */
    function isFunction(value) {
      if (!isObject(value)) {
        return false;
      }
      // The use of `Object#toString` avoids issues with the `typeof` operator
      // in Safari 9 which returns 'object' for typed arrays and other constructors.
      var tag = baseGetTag(value);
      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }

    /**
     * Checks if `value` is an integer.
     *
     * **Note:** This method is based on
     * [`Number.isInteger`](https://mdn.io/Number/isInteger).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an integer, else `false`.
     * @example
     *
     * _.isInteger(3);
     * // => true
     *
     * _.isInteger(Number.MIN_VALUE);
     * // => false
     *
     * _.isInteger(Infinity);
     * // => false
     *
     * _.isInteger('3');
     * // => false
     */
    function isInteger(value) {
      return typeof value == 'number' && value == toInteger(value);
    }

    /**
     * Checks if `value` is a valid array-like length.
     *
     * **Note:** This method is loosely based on
     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
     * @example
     *
     * _.isLength(3);
     * // => true
     *
     * _.isLength(Number.MIN_VALUE);
     * // => false
     *
     * _.isLength(Infinity);
     * // => false
     *
     * _.isLength('3');
     * // => false
     */
    function isLength(value) {
      return typeof value == 'number' &&
        value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }

    /**
     * Checks if `value` is the
     * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
     * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(_.noop);
     * // => true
     *
     * _.isObject(null);
     * // => false
     */
    function isObject(value) {
      var type = typeof value;
      return value != null && (type == 'object' || type == 'function');
    }

    /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */
    function isObjectLike(value) {
      return value != null && typeof value == 'object';
    }

    /**
     * Checks if `value` is classified as a `Map` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a map, else `false`.
     * @example
     *
     * _.isMap(new Map);
     * // => true
     *
     * _.isMap(new WeakMap);
     * // => false
     */
    var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;

    /**
     * Performs a partial deep comparison between `object` and `source` to
     * determine if `object` contains equivalent property values.
     *
     * **Note:** This method is equivalent to `_.matches` when `source` is
     * partially applied.
     *
     * Partial comparisons will match empty array and empty object `source`
     * values against any array or object value, respectively. See `_.isEqual`
     * for a list of supported value comparisons.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property values to match.
     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
     * @example
     *
     * var object = { 'a': 1, 'b': 2 };
     *
     * _.isMatch(object, { 'b': 2 });
     * // => true
     *
     * _.isMatch(object, { 'b': 1 });
     * // => false
     */
    function isMatch(object, source) {
      return object === source || baseIsMatch(object, source, getMatchData(source));
    }

    /**
     * This method is like `_.isMatch` except that it accepts `customizer` which
     * is invoked to compare values. If `customizer` returns `undefined`, comparisons
     * are handled by the method instead. The `customizer` is invoked with five
     * arguments: (objValue, srcValue, index|key, object, source).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property values to match.
     * @param {Function} [customizer] The function to customize comparisons.
     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
     * @example
     *
     * function isGreeting(value) {
     *   return /^h(?:i|ello)$/.test(value);
     * }
     *
     * function customizer(objValue, srcValue) {
     *   if (isGreeting(objValue) && isGreeting(srcValue)) {
     *     return true;
     *   }
     * }
     *
     * var object = { 'greeting': 'hello' };
     * var source = { 'greeting': 'hi' };
     *
     * _.isMatchWith(object, source, customizer);
     * // => true
     */
    function isMatchWith(object, source, customizer) {
      customizer = typeof customizer == 'function' ? customizer : undefined;
      return baseIsMatch(object, source, getMatchData(source), customizer);
    }

    /**
     * Checks if `value` is `NaN`.
     *
     * **Note:** This method is based on
     * [`Number.isNaN`](https://mdn.io/Number/isNaN) and is not the same as
     * global [`isNaN`](https://mdn.io/isNaN) which returns `true` for
     * `undefined` and other non-number values.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
     * @example
     *
     * _.isNaN(NaN);
     * // => true
     *
     * _.isNaN(new Number(NaN));
     * // => true
     *
     * isNaN(undefined);
     * // => true
     *
     * _.isNaN(undefined);
     * // => false
     */
    function isNaN(value) {
      // An `NaN` primitive is the only value that is not equal to itself.
      // Perform the `toStringTag` check first to avoid errors with some
      // ActiveX objects in IE.
      return isNumber(value) && value != +value;
    }

    /**
     * Checks if `value` is a pristine native function.
     *
     * **Note:** This method can't reliably detect native functions in the presence
     * of the core-js package because core-js circumvents this kind of detection.
     * Despite multiple requests, the core-js maintainer has made it clear: any
     * attempt to fix the detection will be obstructed. As a result, we're left
     * with little choice but to throw an error. Unfortunately, this also affects
     * packages, like [babel-polyfill](https://www.npmjs.com/package/babel-polyfill),
     * which rely on core-js.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function,
     *  else `false`.
     * @example
     *
     * _.isNative(Array.prototype.push);
     * // => true
     *
     * _.isNative(_);
     * // => false
     */
    function isNative(value) {
      if (isMaskable(value)) {
        throw new Error(CORE_ERROR_TEXT);
      }
      return baseIsNative(value);
    }

    /**
     * Checks if `value` is `null`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
     * @example
     *
     * _.isNull(null);
     * // => true
     *
     * _.isNull(void 0);
     * // => false
     */
    function isNull(value) {
      return value === null;
    }

    /**
     * Checks if `value` is `null` or `undefined`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
     * @example
     *
     * _.isNil(null);
     * // => true
     *
     * _.isNil(void 0);
     * // => true
     *
     * _.isNil(NaN);
     * // => false
     */
    function isNil(value) {
      return value == null;
    }

    /**
     * Checks if `value` is classified as a `Number` primitive or object.
     *
     * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
     * classified as numbers, use the `_.isFinite` method.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a number, else `false`.
     * @example
     *
     * _.isNumber(3);
     * // => true
     *
     * _.isNumber(Number.MIN_VALUE);
     * // => true
     *
     * _.isNumber(Infinity);
     * // => true
     *
     * _.isNumber('3');
     * // => false
     */
    function isNumber(value) {
      return typeof value == 'number' ||
        (isObjectLike(value) && baseGetTag(value) == numberTag);
    }

    /**
     * Checks if `value` is a plain object, that is, an object created by the
     * `Object` constructor or one with a `[[Prototype]]` of `null`.
     *
     * @static
     * @memberOf _
     * @since 0.8.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * _.isPlainObject(new Foo);
     * // => false
     *
     * _.isPlainObject([1, 2, 3]);
     * // => false
     *
     * _.isPlainObject({ 'x': 0, 'y': 0 });
     * // => true
     *
     * _.isPlainObject(Object.create(null));
     * // => true
     */
    function isPlainObject(value) {
      if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
        return false;
      }
      var proto = getPrototype(value);
      if (proto === null) {
        return true;
      }
      var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
      return typeof Ctor == 'function' && Ctor instanceof Ctor &&
        funcToString.call(Ctor) == objectCtorString;
    }

    /**
     * Checks if `value` is classified as a `RegExp` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
     * @example
     *
     * _.isRegExp(/abc/);
     * // => true
     *
     * _.isRegExp('/abc/');
     * // => false
     */
    var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;

    /**
     * Checks if `value` is a safe integer. An integer is safe if it's an IEEE-754
     * double precision number which isn't the result of a rounded unsafe integer.
     *
     * **Note:** This method is based on
     * [`Number.isSafeInteger`](https://mdn.io/Number/isSafeInteger).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a safe integer, else `false`.
     * @example
     *
     * _.isSafeInteger(3);
     * // => true
     *
     * _.isSafeInteger(Number.MIN_VALUE);
     * // => false
     *
     * _.isSafeInteger(Infinity);
     * // => false
     *
     * _.isSafeInteger('3');
     * // => false
     */
    function isSafeInteger(value) {
      return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
    }

    /**
     * Checks if `value` is classified as a `Set` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a set, else `false`.
     * @example
     *
     * _.isSet(new Set);
     * // => true
     *
     * _.isSet(new WeakSet);
     * // => false
     */
    var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

    /**
     * Checks if `value` is classified as a `String` primitive or object.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a string, else `false`.
     * @example
     *
     * _.isString('abc');
     * // => true
     *
     * _.isString(1);
     * // => false
     */
    function isString(value) {
      return typeof value == 'string' ||
        (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag);
    }

    /**
     * Checks if `value` is classified as a `Symbol` primitive or object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
     * @example
     *
     * _.isSymbol(Symbol.iterator);
     * // => true
     *
     * _.isSymbol('abc');
     * // => false
     */
    function isSymbol(value) {
      return typeof value == 'symbol' ||
        (isObjectLike(value) && baseGetTag(value) == symbolTag);
    }

    /**
     * Checks if `value` is classified as a typed array.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
     * @example
     *
     * _.isTypedArray(new Uint8Array);
     * // => true
     *
     * _.isTypedArray([]);
     * // => false
     */
    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

    /**
     * Checks if `value` is `undefined`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
     * @example
     *
     * _.isUndefined(void 0);
     * // => true
     *
     * _.isUndefined(null);
     * // => false
     */
    function isUndefined(value) {
      return value === undefined;
    }

    /**
     * Checks if `value` is classified as a `WeakMap` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a weak map, else `false`.
     * @example
     *
     * _.isWeakMap(new WeakMap);
     * // => true
     *
     * _.isWeakMap(new Map);
     * // => false
     */
    function isWeakMap(value) {
      return isObjectLike(value) && getTag(value) == weakMapTag;
    }

    /**
     * Checks if `value` is classified as a `WeakSet` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a weak set, else `false`.
     * @example
     *
     * _.isWeakSet(new WeakSet);
     * // => true
     *
     * _.isWeakSet(new Set);
     * // => false
     */
    function isWeakSet(value) {
      return isObjectLike(value) && baseGetTag(value) == weakSetTag;
    }

    /**
     * Checks if `value` is less than `other`.
     *
     * @static
     * @memberOf _
     * @since 3.9.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is less than `other`,
     *  else `false`.
     * @see _.gt
     * @example
     *
     * _.lt(1, 3);
     * // => true
     *
     * _.lt(3, 3);
     * // => false
     *
     * _.lt(3, 1);
     * // => false
     */
    var lt = createRelationalOperation(baseLt);

    /**
     * Checks if `value` is less than or equal to `other`.
     *
     * @static
     * @memberOf _
     * @since 3.9.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is less than or equal to
     *  `other`, else `false`.
     * @see _.gte
     * @example
     *
     * _.lte(1, 3);
     * // => true
     *
     * _.lte(3, 3);
     * // => true
     *
     * _.lte(3, 1);
     * // => false
     */
    var lte = createRelationalOperation(function(value, other) {
      return value <= other;
    });

    /**
     * Converts `value` to an array.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {Array} Returns the converted array.
     * @example
     *
     * _.toArray({ 'a': 1, 'b': 2 });
     * // => [1, 2]
     *
     * _.toArray('abc');
     * // => ['a', 'b', 'c']
     *
     * _.toArray(1);
     * // => []
     *
     * _.toArray(null);
     * // => []
     */
    function toArray(value) {
      if (!value) {
        return [];
      }
      if (isArrayLike(value)) {
        return isString(value) ? stringToArray(value) : copyArray(value);
      }
      if (symIterator && value[symIterator]) {
        return iteratorToArray(value[symIterator]());
      }
      var tag = getTag(value),
          func = tag == mapTag ? mapToArray : (tag == setTag ? setToArray : values);

      return func(value);
    }

    /**
     * Converts `value` to a finite number.
     *
     * @static
     * @memberOf _
     * @since 4.12.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted number.
     * @example
     *
     * _.toFinite(3.2);
     * // => 3.2
     *
     * _.toFinite(Number.MIN_VALUE);
     * // => 5e-324
     *
     * _.toFinite(Infinity);
     * // => 1.7976931348623157e+308
     *
     * _.toFinite('3.2');
     * // => 3.2
     */
    function toFinite(value) {
      if (!value) {
        return value === 0 ? value : 0;
      }
      value = toNumber(value);
      if (value === INFINITY || value === -INFINITY) {
        var sign = (value < 0 ? -1 : 1);
        return sign * MAX_INTEGER;
      }
      return value === value ? value : 0;
    }

    /**
     * Converts `value` to an integer.
     *
     * **Note:** This method is loosely based on
     * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.toInteger(3.2);
     * // => 3
     *
     * _.toInteger(Number.MIN_VALUE);
     * // => 0
     *
     * _.toInteger(Infinity);
     * // => 1.7976931348623157e+308
     *
     * _.toInteger('3.2');
     * // => 3
     */
    function toInteger(value) {
      var result = toFinite(value),
          remainder = result % 1;

      return result === result ? (remainder ? result - remainder : result) : 0;
    }

    /**
     * Converts `value` to an integer suitable for use as the length of an
     * array-like object.
     *
     * **Note:** This method is based on
     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.toLength(3.2);
     * // => 3
     *
     * _.toLength(Number.MIN_VALUE);
     * // => 0
     *
     * _.toLength(Infinity);
     * // => 4294967295
     *
     * _.toLength('3.2');
     * // => 3
     */
    function toLength(value) {
      return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
    }

    /**
     * Converts `value` to a number.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to process.
     * @returns {number} Returns the number.
     * @example
     *
     * _.toNumber(3.2);
     * // => 3.2
     *
     * _.toNumber(Number.MIN_VALUE);
     * // => 5e-324
     *
     * _.toNumber(Infinity);
     * // => Infinity
     *
     * _.toNumber('3.2');
     * // => 3.2
     */
    function toNumber(value) {
      if (typeof value == 'number') {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
        value = isObject(other) ? (other + '') : other;
      }
      if (typeof value != 'string') {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, '');
      var isBinary = reIsBinary.test(value);
      return (isBinary || reIsOctal.test(value))
        ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
        : (reIsBadHex.test(value) ? NAN : +value);
    }

    /**
     * Converts `value` to a plain object flattening inherited enumerable string
     * keyed properties of `value` to own properties of the plain object.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {Object} Returns the converted plain object.
     * @example
     *
     * function Foo() {
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.assign({ 'a': 1 }, new Foo);
     * // => { 'a': 1, 'b': 2 }
     *
     * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
     * // => { 'a': 1, 'b': 2, 'c': 3 }
     */
    function toPlainObject(value) {
      return copyObject(value, keysIn(value));
    }

    /**
     * Converts `value` to a safe integer. A safe integer can be compared and
     * represented correctly.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.toSafeInteger(3.2);
     * // => 3
     *
     * _.toSafeInteger(Number.MIN_VALUE);
     * // => 0
     *
     * _.toSafeInteger(Infinity);
     * // => 9007199254740991
     *
     * _.toSafeInteger('3.2');
     * // => 3
     */
    function toSafeInteger(value) {
      return value
        ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER)
        : (value === 0 ? value : 0);
    }

    /**
     * Converts `value` to a string. An empty string is returned for `null`
     * and `undefined` values. The sign of `-0` is preserved.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     * @example
     *
     * _.toString(null);
     * // => ''
     *
     * _.toString(-0);
     * // => '-0'
     *
     * _.toString([1, 2, 3]);
     * // => '1,2,3'
     */
    function toString(value) {
      return value == null ? '' : baseToString(value);
    }

    /*------------------------------------------------------------------------*/

    /**
     * Assigns own enumerable string keyed properties of source objects to the
     * destination object. Source objects are applied from left to right.
     * Subsequent sources overwrite property assignments of previous sources.
     *
     * **Note:** This method mutates `object` and is loosely based on
     * [`Object.assign`](https://mdn.io/Object/assign).
     *
     * @static
     * @memberOf _
     * @since 0.10.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @see _.assignIn
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * function Bar() {
     *   this.c = 3;
     * }
     *
     * Foo.prototype.b = 2;
     * Bar.prototype.d = 4;
     *
     * _.assign({ 'a': 0 }, new Foo, new Bar);
     * // => { 'a': 1, 'c': 3 }
     */
    var assign = createAssigner(function(object, source) {
      if (isPrototype(source) || isArrayLike(source)) {
        copyObject(source, keys(source), object);
        return;
      }
      for (var key in source) {
        if (hasOwnProperty.call(source, key)) {
          assignValue(object, key, source[key]);
        }
      }
    });

    /**
     * This method is like `_.assign` except that it iterates over own and
     * inherited source properties.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @alias extend
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @see _.assign
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * function Bar() {
     *   this.c = 3;
     * }
     *
     * Foo.prototype.b = 2;
     * Bar.prototype.d = 4;
     *
     * _.assignIn({ 'a': 0 }, new Foo, new Bar);
     * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4 }
     */
    var assignIn = createAssigner(function(object, source) {
      copyObject(source, keysIn(source), object);
    });

    /**
     * This method is like `_.assignIn` except that it accepts `customizer`
     * which is invoked to produce the assigned values. If `customizer` returns
     * `undefined`, assignment is handled by the method instead. The `customizer`
     * is invoked with five arguments: (objValue, srcValue, key, object, source).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @alias extendWith
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} sources The source objects.
     * @param {Function} [customizer] The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @see _.assignWith
     * @example
     *
     * function customizer(objValue, srcValue) {
     *   return _.isUndefined(objValue) ? srcValue : objValue;
     * }
     *
     * var defaults = _.partialRight(_.assignInWith, customizer);
     *
     * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
     * // => { 'a': 1, 'b': 2 }
     */
    var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
      copyObject(source, keysIn(source), object, customizer);
    });

    /**
     * This method is like `_.assign` except that it accepts `customizer`
     * which is invoked to produce the assigned values. If `customizer` returns
     * `undefined`, assignment is handled by the method instead. The `customizer`
     * is invoked with five arguments: (objValue, srcValue, key, object, source).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} sources The source objects.
     * @param {Function} [customizer] The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @see _.assignInWith
     * @example
     *
     * function customizer(objValue, srcValue) {
     *   return _.isUndefined(objValue) ? srcValue : objValue;
     * }
     *
     * var defaults = _.partialRight(_.assignWith, customizer);
     *
     * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
     * // => { 'a': 1, 'b': 2 }
     */
    var assignWith = createAssigner(function(object, source, srcIndex, customizer) {
      copyObject(source, keys(source), object, customizer);
    });

    /**
     * Creates an array of values corresponding to `paths` of `object`.
     *
     * @static
     * @memberOf _
     * @since 1.0.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {...(string|string[])} [paths] The property paths to pick.
     * @returns {Array} Returns the picked values.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
     *
     * _.at(object, ['a[0].b.c', 'a[1]']);
     * // => [3, 4]
     */
    var at = flatRest(baseAt);

    /**
     * Creates an object that inherits from the `prototype` object. If a
     * `properties` object is given, its own enumerable string keyed properties
     * are assigned to the created object.
     *
     * @static
     * @memberOf _
     * @since 2.3.0
     * @category Object
     * @param {Object} prototype The object to inherit from.
     * @param {Object} [properties] The properties to assign to the object.
     * @returns {Object} Returns the new object.
     * @example
     *
     * function Shape() {
     *   this.x = 0;
     *   this.y = 0;
     * }
     *
     * function Circle() {
     *   Shape.call(this);
     * }
     *
     * Circle.prototype = _.create(Shape.prototype, {
     *   'constructor': Circle
     * });
     *
     * var circle = new Circle;
     * circle instanceof Circle;
     * // => true
     *
     * circle instanceof Shape;
     * // => true
     */
    function create(prototype, properties) {
      var result = baseCreate(prototype);
      return properties == null ? result : baseAssign(result, properties);
    }

    /**
     * Assigns own and inherited enumerable string keyed properties of source
     * objects to the destination object for all destination properties that
     * resolve to `undefined`. Source objects are applied from left to right.
     * Once a property is set, additional values of the same property are ignored.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @see _.defaultsDeep
     * @example
     *
     * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
     * // => { 'a': 1, 'b': 2 }
     */
    var defaults = baseRest(function(args) {
      args.push(undefined, customDefaultsAssignIn);
      return apply(assignInWith, undefined, args);
    });

    /**
     * This method is like `_.defaults` except that it recursively assigns
     * default properties.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 3.10.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @see _.defaults
     * @example
     *
     * _.defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } });
     * // => { 'a': { 'b': 2, 'c': 3 } }
     */
    var defaultsDeep = baseRest(function(args) {
      args.push(undefined, customDefaultsMerge);
      return apply(mergeWith, undefined, args);
    });

    /**
     * This method is like `_.find` except that it returns the key of the first
     * element `predicate` returns truthy for instead of the element itself.
     *
     * @static
     * @memberOf _
     * @since 1.1.0
     * @category Object
     * @param {Object} object The object to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {string|undefined} Returns the key of the matched element,
     *  else `undefined`.
     * @example
     *
     * var users = {
     *   'barney':  { 'age': 36, 'active': true },
     *   'fred':    { 'age': 40, 'active': false },
     *   'pebbles': { 'age': 1,  'active': true }
     * };
     *
     * _.findKey(users, function(o) { return o.age < 40; });
     * // => 'barney' (iteration order is not guaranteed)
     *
     * // The `_.matches` iteratee shorthand.
     * _.findKey(users, { 'age': 1, 'active': true });
     * // => 'pebbles'
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.findKey(users, ['active', false]);
     * // => 'fred'
     *
     * // The `_.property` iteratee shorthand.
     * _.findKey(users, 'active');
     * // => 'barney'
     */
    function findKey(object, predicate) {
      return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
    }

    /**
     * This method is like `_.findKey` except that it iterates over elements of
     * a collection in the opposite order.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Object
     * @param {Object} object The object to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {string|undefined} Returns the key of the matched element,
     *  else `undefined`.
     * @example
     *
     * var users = {
     *   'barney':  { 'age': 36, 'active': true },
     *   'fred':    { 'age': 40, 'active': false },
     *   'pebbles': { 'age': 1,  'active': true }
     * };
     *
     * _.findLastKey(users, function(o) { return o.age < 40; });
     * // => returns 'pebbles' assuming `_.findKey` returns 'barney'
     *
     * // The `_.matches` iteratee shorthand.
     * _.findLastKey(users, { 'age': 36, 'active': true });
     * // => 'barney'
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.findLastKey(users, ['active', false]);
     * // => 'fred'
     *
     * // The `_.property` iteratee shorthand.
     * _.findLastKey(users, 'active');
     * // => 'pebbles'
     */
    function findLastKey(object, predicate) {
      return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
    }

    /**
     * Iterates over own and inherited enumerable string keyed properties of an
     * object and invokes `iteratee` for each property. The iteratee is invoked
     * with three arguments: (value, key, object). Iteratee functions may exit
     * iteration early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @since 0.3.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns `object`.
     * @see _.forInRight
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forIn(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => Logs 'a', 'b', then 'c' (iteration order is not guaranteed).
     */
    function forIn(object, iteratee) {
      return object == null
        ? object
        : baseFor(object, getIteratee(iteratee, 3), keysIn);
    }

    /**
     * This method is like `_.forIn` except that it iterates over properties of
     * `object` in the opposite order.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns `object`.
     * @see _.forIn
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forInRight(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => Logs 'c', 'b', then 'a' assuming `_.forIn` logs 'a', 'b', then 'c'.
     */
    function forInRight(object, iteratee) {
      return object == null
        ? object
        : baseForRight(object, getIteratee(iteratee, 3), keysIn);
    }

    /**
     * Iterates over own enumerable string keyed properties of an object and
     * invokes `iteratee` for each property. The iteratee is invoked with three
     * arguments: (value, key, object). Iteratee functions may exit iteration
     * early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @since 0.3.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns `object`.
     * @see _.forOwnRight
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forOwn(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => Logs 'a' then 'b' (iteration order is not guaranteed).
     */
    function forOwn(object, iteratee) {
      return object && baseForOwn(object, getIteratee(iteratee, 3));
    }

    /**
     * This method is like `_.forOwn` except that it iterates over properties of
     * `object` in the opposite order.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns `object`.
     * @see _.forOwn
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forOwnRight(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => Logs 'b' then 'a' assuming `_.forOwn` logs 'a' then 'b'.
     */
    function forOwnRight(object, iteratee) {
      return object && baseForOwnRight(object, getIteratee(iteratee, 3));
    }

    /**
     * Creates an array of function property names from own enumerable properties
     * of `object`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns the function names.
     * @see _.functionsIn
     * @example
     *
     * function Foo() {
     *   this.a = _.constant('a');
     *   this.b = _.constant('b');
     * }
     *
     * Foo.prototype.c = _.constant('c');
     *
     * _.functions(new Foo);
     * // => ['a', 'b']
     */
    function functions(object) {
      return object == null ? [] : baseFunctions(object, keys(object));
    }

    /**
     * Creates an array of function property names from own and inherited
     * enumerable properties of `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns the function names.
     * @see _.functions
     * @example
     *
     * function Foo() {
     *   this.a = _.constant('a');
     *   this.b = _.constant('b');
     * }
     *
     * Foo.prototype.c = _.constant('c');
     *
     * _.functionsIn(new Foo);
     * // => ['a', 'b', 'c']
     */
    function functionsIn(object) {
      return object == null ? [] : baseFunctions(object, keysIn(object));
    }

    /**
     * Gets the value at `path` of `object`. If the resolved value is
     * `undefined`, the `defaultValue` is returned in its place.
     *
     * @static
     * @memberOf _
     * @since 3.7.0
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to get.
     * @param {*} [defaultValue] The value returned for `undefined` resolved values.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.get(object, 'a[0].b.c');
     * // => 3
     *
     * _.get(object, ['a', '0', 'b', 'c']);
     * // => 3
     *
     * _.get(object, 'a.b.c', 'default');
     * // => 'default'
     */
    function get(object, path, defaultValue) {
      var result = object == null ? undefined : baseGet(object, path);
      return result === undefined ? defaultValue : result;
    }

    /**
     * Checks if `path` is a direct property of `object`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @returns {boolean} Returns `true` if `path` exists, else `false`.
     * @example
     *
     * var object = { 'a': { 'b': 2 } };
     * var other = _.create({ 'a': _.create({ 'b': 2 }) });
     *
     * _.has(object, 'a');
     * // => true
     *
     * _.has(object, 'a.b');
     * // => true
     *
     * _.has(object, ['a', 'b']);
     * // => true
     *
     * _.has(other, 'a');
     * // => false
     */
    function has(object, path) {
      return object != null && hasPath(object, path, baseHas);
    }

    /**
     * Checks if `path` is a direct or inherited property of `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @returns {boolean} Returns `true` if `path` exists, else `false`.
     * @example
     *
     * var object = _.create({ 'a': _.create({ 'b': 2 }) });
     *
     * _.hasIn(object, 'a');
     * // => true
     *
     * _.hasIn(object, 'a.b');
     * // => true
     *
     * _.hasIn(object, ['a', 'b']);
     * // => true
     *
     * _.hasIn(object, 'b');
     * // => false
     */
    function hasIn(object, path) {
      return object != null && hasPath(object, path, baseHasIn);
    }

    /**
     * Creates an object composed of the inverted keys and values of `object`.
     * If `object` contains duplicate values, subsequent values overwrite
     * property assignments of previous values.
     *
     * @static
     * @memberOf _
     * @since 0.7.0
     * @category Object
     * @param {Object} object The object to invert.
     * @returns {Object} Returns the new inverted object.
     * @example
     *
     * var object = { 'a': 1, 'b': 2, 'c': 1 };
     *
     * _.invert(object);
     * // => { '1': 'c', '2': 'b' }
     */
    var invert = createInverter(function(result, value, key) {
      result[value] = key;
    }, constant(identity));

    /**
     * This method is like `_.invert` except that the inverted object is generated
     * from the results of running each element of `object` thru `iteratee`. The
     * corresponding inverted value of each inverted key is an array of keys
     * responsible for generating the inverted value. The iteratee is invoked
     * with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.1.0
     * @category Object
     * @param {Object} object The object to invert.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Object} Returns the new inverted object.
     * @example
     *
     * var object = { 'a': 1, 'b': 2, 'c': 1 };
     *
     * _.invertBy(object);
     * // => { '1': ['a', 'c'], '2': ['b'] }
     *
     * _.invertBy(object, function(value) {
     *   return 'group' + value;
     * });
     * // => { 'group1': ['a', 'c'], 'group2': ['b'] }
     */
    var invertBy = createInverter(function(result, value, key) {
      if (hasOwnProperty.call(result, value)) {
        result[value].push(key);
      } else {
        result[value] = [key];
      }
    }, getIteratee);

    /**
     * Invokes the method at `path` of `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the method to invoke.
     * @param {...*} [args] The arguments to invoke the method with.
     * @returns {*} Returns the result of the invoked method.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': [1, 2, 3, 4] } }] };
     *
     * _.invoke(object, 'a[0].b.c.slice', 1, 3);
     * // => [2, 3]
     */
    var invoke = baseRest(baseInvoke);

    /**
     * Creates an array of the own enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects. See the
     * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
     * for more details.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keys(new Foo);
     * // => ['a', 'b'] (iteration order is not guaranteed)
     *
     * _.keys('hi');
     * // => ['0', '1']
     */
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }

    /**
     * Creates an array of the own and inherited enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keysIn(new Foo);
     * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
     */
    function keysIn(object) {
      return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
    }

    /**
     * The opposite of `_.mapValues`; this method creates an object with the
     * same values as `object` and keys generated by running each own enumerable
     * string keyed property of `object` thru `iteratee`. The iteratee is invoked
     * with three arguments: (value, key, object).
     *
     * @static
     * @memberOf _
     * @since 3.8.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns the new mapped object.
     * @see _.mapValues
     * @example
     *
     * _.mapKeys({ 'a': 1, 'b': 2 }, function(value, key) {
     *   return key + value;
     * });
     * // => { 'a1': 1, 'b2': 2 }
     */
    function mapKeys(object, iteratee) {
      var result = {};
      iteratee = getIteratee(iteratee, 3);

      baseForOwn(object, function(value, key, object) {
        baseAssignValue(result, iteratee(value, key, object), value);
      });
      return result;
    }

    /**
     * Creates an object with the same keys as `object` and values generated
     * by running each own enumerable string keyed property of `object` thru
     * `iteratee`. The iteratee is invoked with three arguments:
     * (value, key, object).
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns the new mapped object.
     * @see _.mapKeys
     * @example
     *
     * var users = {
     *   'fred':    { 'user': 'fred',    'age': 40 },
     *   'pebbles': { 'user': 'pebbles', 'age': 1 }
     * };
     *
     * _.mapValues(users, function(o) { return o.age; });
     * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
     *
     * // The `_.property` iteratee shorthand.
     * _.mapValues(users, 'age');
     * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
     */
    function mapValues(object, iteratee) {
      var result = {};
      iteratee = getIteratee(iteratee, 3);

      baseForOwn(object, function(value, key, object) {
        baseAssignValue(result, key, iteratee(value, key, object));
      });
      return result;
    }

    /**
     * This method is like `_.assign` except that it recursively merges own and
     * inherited enumerable string keyed properties of source objects into the
     * destination object. Source properties that resolve to `undefined` are
     * skipped if a destination value exists. Array and plain object properties
     * are merged recursively. Other objects and value types are overridden by
     * assignment. Source objects are applied from left to right. Subsequent
     * sources overwrite property assignments of previous sources.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 0.5.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = {
     *   'a': [{ 'b': 2 }, { 'd': 4 }]
     * };
     *
     * var other = {
     *   'a': [{ 'c': 3 }, { 'e': 5 }]
     * };
     *
     * _.merge(object, other);
     * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
     */
    var merge = createAssigner(function(object, source, srcIndex) {
      baseMerge(object, source, srcIndex);
    });

    /**
     * This method is like `_.merge` except that it accepts `customizer` which
     * is invoked to produce the merged values of the destination and source
     * properties. If `customizer` returns `undefined`, merging is handled by the
     * method instead. The `customizer` is invoked with six arguments:
     * (objValue, srcValue, key, object, source, stack).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} sources The source objects.
     * @param {Function} customizer The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @example
     *
     * function customizer(objValue, srcValue) {
     *   if (_.isArray(objValue)) {
     *     return objValue.concat(srcValue);
     *   }
     * }
     *
     * var object = { 'a': [1], 'b': [2] };
     * var other = { 'a': [3], 'b': [4] };
     *
     * _.mergeWith(object, other, customizer);
     * // => { 'a': [1, 3], 'b': [2, 4] }
     */
    var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
      baseMerge(object, source, srcIndex, customizer);
    });

    /**
     * The opposite of `_.pick`; this method creates an object composed of the
     * own and inherited enumerable property paths of `object` that are not omitted.
     *
     * **Note:** This method is considerably slower than `_.pick`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The source object.
     * @param {...(string|string[])} [paths] The property paths to omit.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'a': 1, 'b': '2', 'c': 3 };
     *
     * _.omit(object, ['a', 'c']);
     * // => { 'b': '2' }
     */
    var omit = flatRest(function(object, paths) {
      var result = {};
      if (object == null) {
        return result;
      }
      var isDeep = false;
      paths = arrayMap(paths, function(path) {
        path = castPath(path, object);
        isDeep || (isDeep = path.length > 1);
        return path;
      });
      copyObject(object, getAllKeysIn(object), result);
      if (isDeep) {
        result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
      }
      var length = paths.length;
      while (length--) {
        baseUnset(result, paths[length]);
      }
      return result;
    });

    /**
     * The opposite of `_.pickBy`; this method creates an object composed of
     * the own and inherited enumerable string keyed properties of `object` that
     * `predicate` doesn't return truthy for. The predicate is invoked with two
     * arguments: (value, key).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The source object.
     * @param {Function} [predicate=_.identity] The function invoked per property.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'a': 1, 'b': '2', 'c': 3 };
     *
     * _.omitBy(object, _.isNumber);
     * // => { 'b': '2' }
     */
    function omitBy(object, predicate) {
      return pickBy(object, negate(getIteratee(predicate)));
    }

    /**
     * Creates an object composed of the picked `object` properties.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The source object.
     * @param {...(string|string[])} [paths] The property paths to pick.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'a': 1, 'b': '2', 'c': 3 };
     *
     * _.pick(object, ['a', 'c']);
     * // => { 'a': 1, 'c': 3 }
     */
    var pick = flatRest(function(object, paths) {
      return object == null ? {} : basePick(object, paths);
    });

    /**
     * Creates an object composed of the `object` properties `predicate` returns
     * truthy for. The predicate is invoked with two arguments: (value, key).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The source object.
     * @param {Function} [predicate=_.identity] The function invoked per property.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'a': 1, 'b': '2', 'c': 3 };
     *
     * _.pickBy(object, _.isNumber);
     * // => { 'a': 1, 'c': 3 }
     */
    function pickBy(object, predicate) {
      if (object == null) {
        return {};
      }
      var props = arrayMap(getAllKeysIn(object), function(prop) {
        return [prop];
      });
      predicate = getIteratee(predicate);
      return basePickBy(object, props, function(value, path) {
        return predicate(value, path[0]);
      });
    }

    /**
     * This method is like `_.get` except that if the resolved value is a
     * function it's invoked with the `this` binding of its parent object and
     * its result is returned.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to resolve.
     * @param {*} [defaultValue] The value returned for `undefined` resolved values.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c1': 3, 'c2': _.constant(4) } }] };
     *
     * _.result(object, 'a[0].b.c1');
     * // => 3
     *
     * _.result(object, 'a[0].b.c2');
     * // => 4
     *
     * _.result(object, 'a[0].b.c3', 'default');
     * // => 'default'
     *
     * _.result(object, 'a[0].b.c3', _.constant('default'));
     * // => 'default'
     */
    function result(object, path, defaultValue) {
      path = castPath(path, object);

      var index = -1,
          length = path.length;

      // Ensure the loop is entered when path is empty.
      if (!length) {
        length = 1;
        object = undefined;
      }
      while (++index < length) {
        var value = object == null ? undefined : object[toKey(path[index])];
        if (value === undefined) {
          index = length;
          value = defaultValue;
        }
        object = isFunction(value) ? value.call(object) : value;
      }
      return object;
    }

    /**
     * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
     * it's created. Arrays are created for missing index properties while objects
     * are created for all other missing properties. Use `_.setWith` to customize
     * `path` creation.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 3.7.0
     * @category Object
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.set(object, 'a[0].b.c', 4);
     * console.log(object.a[0].b.c);
     * // => 4
     *
     * _.set(object, ['x', '0', 'y', 'z'], 5);
     * console.log(object.x[0].y.z);
     * // => 5
     */
    function set(object, path, value) {
      return object == null ? object : baseSet(object, path, value);
    }

    /**
     * This method is like `_.set` except that it accepts `customizer` which is
     * invoked to produce the objects of `path`.  If `customizer` returns `undefined`
     * path creation is handled by the method instead. The `customizer` is invoked
     * with three arguments: (nsValue, key, nsObject).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to set.
     * @param {*} value The value to set.
     * @param {Function} [customizer] The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = {};
     *
     * _.setWith(object, '[0][1]', 'a', Object);
     * // => { '0': { '1': 'a' } }
     */
    function setWith(object, path, value, customizer) {
      customizer = typeof customizer == 'function' ? customizer : undefined;
      return object == null ? object : baseSet(object, path, value, customizer);
    }

    /**
     * Creates an array of own enumerable string keyed-value pairs for `object`
     * which can be consumed by `_.fromPairs`. If `object` is a map or set, its
     * entries are returned.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @alias entries
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the key-value pairs.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.toPairs(new Foo);
     * // => [['a', 1], ['b', 2]] (iteration order is not guaranteed)
     */
    var toPairs = createToPairs(keys);

    /**
     * Creates an array of own and inherited enumerable string keyed-value pairs
     * for `object` which can be consumed by `_.fromPairs`. If `object` is a map
     * or set, its entries are returned.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @alias entriesIn
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the key-value pairs.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.toPairsIn(new Foo);
     * // => [['a', 1], ['b', 2], ['c', 3]] (iteration order is not guaranteed)
     */
    var toPairsIn = createToPairs(keysIn);

    /**
     * An alternative to `_.reduce`; this method transforms `object` to a new
     * `accumulator` object which is the result of running each of its own
     * enumerable string keyed properties thru `iteratee`, with each invocation
     * potentially mutating the `accumulator` object. If `accumulator` is not
     * provided, a new object with the same `[[Prototype]]` will be used. The
     * iteratee is invoked with four arguments: (accumulator, value, key, object).
     * Iteratee functions may exit iteration early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @since 1.3.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [accumulator] The custom accumulator value.
     * @returns {*} Returns the accumulated value.
     * @example
     *
     * _.transform([2, 3, 4], function(result, n) {
     *   result.push(n *= n);
     *   return n % 2 == 0;
     * }, []);
     * // => [4, 9]
     *
     * _.transform({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
     *   (result[value] || (result[value] = [])).push(key);
     * }, {});
     * // => { '1': ['a', 'c'], '2': ['b'] }
     */
    function transform(object, iteratee, accumulator) {
      var isArr = isArray(object),
          isArrLike = isArr || isBuffer(object) || isTypedArray(object);

      iteratee = getIteratee(iteratee, 4);
      if (accumulator == null) {
        var Ctor = object && object.constructor;
        if (isArrLike) {
          accumulator = isArr ? new Ctor : [];
        }
        else if (isObject(object)) {
          accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
        }
        else {
          accumulator = {};
        }
      }
      (isArrLike ? arrayEach : baseForOwn)(object, function(value, index, object) {
        return iteratee(accumulator, value, index, object);
      });
      return accumulator;
    }

    /**
     * Removes the property at `path` of `object`.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to unset.
     * @returns {boolean} Returns `true` if the property is deleted, else `false`.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 7 } }] };
     * _.unset(object, 'a[0].b.c');
     * // => true
     *
     * console.log(object);
     * // => { 'a': [{ 'b': {} }] };
     *
     * _.unset(object, ['a', '0', 'b', 'c']);
     * // => true
     *
     * console.log(object);
     * // => { 'a': [{ 'b': {} }] };
     */
    function unset(object, path) {
      return object == null ? true : baseUnset(object, path);
    }

    /**
     * This method is like `_.set` except that accepts `updater` to produce the
     * value to set. Use `_.updateWith` to customize `path` creation. The `updater`
     * is invoked with one argument: (value).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.6.0
     * @category Object
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to set.
     * @param {Function} updater The function to produce the updated value.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.update(object, 'a[0].b.c', function(n) { return n * n; });
     * console.log(object.a[0].b.c);
     * // => 9
     *
     * _.update(object, 'x[0].y.z', function(n) { return n ? n + 1 : 0; });
     * console.log(object.x[0].y.z);
     * // => 0
     */
    function update(object, path, updater) {
      return object == null ? object : baseUpdate(object, path, castFunction(updater));
    }

    /**
     * This method is like `_.update` except that it accepts `customizer` which is
     * invoked to produce the objects of `path`.  If `customizer` returns `undefined`
     * path creation is handled by the method instead. The `customizer` is invoked
     * with three arguments: (nsValue, key, nsObject).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.6.0
     * @category Object
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to set.
     * @param {Function} updater The function to produce the updated value.
     * @param {Function} [customizer] The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = {};
     *
     * _.updateWith(object, '[0][1]', _.constant('a'), Object);
     * // => { '0': { '1': 'a' } }
     */
    function updateWith(object, path, updater, customizer) {
      customizer = typeof customizer == 'function' ? customizer : undefined;
      return object == null ? object : baseUpdate(object, path, castFunction(updater), customizer);
    }

    /**
     * Creates an array of the own enumerable string keyed property values of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property values.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.values(new Foo);
     * // => [1, 2] (iteration order is not guaranteed)
     *
     * _.values('hi');
     * // => ['h', 'i']
     */
    function values(object) {
      return object == null ? [] : baseValues(object, keys(object));
    }

    /**
     * Creates an array of the own and inherited enumerable string keyed property
     * values of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property values.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.valuesIn(new Foo);
     * // => [1, 2, 3] (iteration order is not guaranteed)
     */
    function valuesIn(object) {
      return object == null ? [] : baseValues(object, keysIn(object));
    }

    /*------------------------------------------------------------------------*/

    /**
     * Clamps `number` within the inclusive `lower` and `upper` bounds.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Number
     * @param {number} number The number to clamp.
     * @param {number} [lower] The lower bound.
     * @param {number} upper The upper bound.
     * @returns {number} Returns the clamped number.
     * @example
     *
     * _.clamp(-10, -5, 5);
     * // => -5
     *
     * _.clamp(10, -5, 5);
     * // => 5
     */
    function clamp(number, lower, upper) {
      if (upper === undefined) {
        upper = lower;
        lower = undefined;
      }
      if (upper !== undefined) {
        upper = toNumber(upper);
        upper = upper === upper ? upper : 0;
      }
      if (lower !== undefined) {
        lower = toNumber(lower);
        lower = lower === lower ? lower : 0;
      }
      return baseClamp(toNumber(number), lower, upper);
    }

    /**
     * Checks if `n` is between `start` and up to, but not including, `end`. If
     * `end` is not specified, it's set to `start` with `start` then set to `0`.
     * If `start` is greater than `end` the params are swapped to support
     * negative ranges.
     *
     * @static
     * @memberOf _
     * @since 3.3.0
     * @category Number
     * @param {number} number The number to check.
     * @param {number} [start=0] The start of the range.
     * @param {number} end The end of the range.
     * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
     * @see _.range, _.rangeRight
     * @example
     *
     * _.inRange(3, 2, 4);
     * // => true
     *
     * _.inRange(4, 8);
     * // => true
     *
     * _.inRange(4, 2);
     * // => false
     *
     * _.inRange(2, 2);
     * // => false
     *
     * _.inRange(1.2, 2);
     * // => true
     *
     * _.inRange(5.2, 4);
     * // => false
     *
     * _.inRange(-3, -2, -6);
     * // => true
     */
    function inRange(number, start, end) {
      start = toFinite(start);
      if (end === undefined) {
        end = start;
        start = 0;
      } else {
        end = toFinite(end);
      }
      number = toNumber(number);
      return baseInRange(number, start, end);
    }

    /**
     * Produces a random number between the inclusive `lower` and `upper` bounds.
     * If only one argument is provided a number between `0` and the given number
     * is returned. If `floating` is `true`, or either `lower` or `upper` are
     * floats, a floating-point number is returned instead of an integer.
     *
     * **Note:** JavaScript follows the IEEE-754 standard for resolving
     * floating-point values which can produce unexpected results.
     *
     * @static
     * @memberOf _
     * @since 0.7.0
     * @category Number
     * @param {number} [lower=0] The lower bound.
     * @param {number} [upper=1] The upper bound.
     * @param {boolean} [floating] Specify returning a floating-point number.
     * @returns {number} Returns the random number.
     * @example
     *
     * _.random(0, 5);
     * // => an integer between 0 and 5
     *
     * _.random(5);
     * // => also an integer between 0 and 5
     *
     * _.random(5, true);
     * // => a floating-point number between 0 and 5
     *
     * _.random(1.2, 5.2);
     * // => a floating-point number between 1.2 and 5.2
     */
    function random(lower, upper, floating) {
      if (floating && typeof floating != 'boolean' && isIterateeCall(lower, upper, floating)) {
        upper = floating = undefined;
      }
      if (floating === undefined) {
        if (typeof upper == 'boolean') {
          floating = upper;
          upper = undefined;
        }
        else if (typeof lower == 'boolean') {
          floating = lower;
          lower = undefined;
        }
      }
      if (lower === undefined && upper === undefined) {
        lower = 0;
        upper = 1;
      }
      else {
        lower = toFinite(lower);
        if (upper === undefined) {
          upper = lower;
          lower = 0;
        } else {
          upper = toFinite(upper);
        }
      }
      if (lower > upper) {
        var temp = lower;
        lower = upper;
        upper = temp;
      }
      if (floating || lower % 1 || upper % 1) {
        var rand = nativeRandom();
        return nativeMin(lower + (rand * (upper - lower + freeParseFloat('1e-' + ((rand + '').length - 1)))), upper);
      }
      return baseRandom(lower, upper);
    }

    /*------------------------------------------------------------------------*/

    /**
     * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the camel cased string.
     * @example
     *
     * _.camelCase('Foo Bar');
     * // => 'fooBar'
     *
     * _.camelCase('--foo-bar--');
     * // => 'fooBar'
     *
     * _.camelCase('__FOO_BAR__');
     * // => 'fooBar'
     */
    var camelCase = createCompounder(function(result, word, index) {
      word = word.toLowerCase();
      return result + (index ? capitalize(word) : word);
    });

    /**
     * Converts the first character of `string` to upper case and the remaining
     * to lower case.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to capitalize.
     * @returns {string} Returns the capitalized string.
     * @example
     *
     * _.capitalize('FRED');
     * // => 'Fred'
     */
    function capitalize(string) {
      return upperFirst(toString(string).toLowerCase());
    }

    /**
     * Deburrs `string` by converting
     * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
     * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
     * letters to basic Latin letters and removing
     * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to deburr.
     * @returns {string} Returns the deburred string.
     * @example
     *
     * _.deburr('déjà vu');
     * // => 'deja vu'
     */
    function deburr(string) {
      string = toString(string);
      return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
    }

    /**
     * Checks if `string` ends with the given target string.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to inspect.
     * @param {string} [target] The string to search for.
     * @param {number} [position=string.length] The position to search up to.
     * @returns {boolean} Returns `true` if `string` ends with `target`,
     *  else `false`.
     * @example
     *
     * _.endsWith('abc', 'c');
     * // => true
     *
     * _.endsWith('abc', 'b');
     * // => false
     *
     * _.endsWith('abc', 'b', 2);
     * // => true
     */
    function endsWith(string, target, position) {
      string = toString(string);
      target = baseToString(target);

      var length = string.length;
      position = position === undefined
        ? length
        : baseClamp(toInteger(position), 0, length);

      var end = position;
      position -= target.length;
      return position >= 0 && string.slice(position, end) == target;
    }

    /**
     * Converts the characters "&", "<", ">", '"', and "'" in `string` to their
     * corresponding HTML entities.
     *
     * **Note:** No other characters are escaped. To escape additional
     * characters use a third-party library like [_he_](https://mths.be/he).
     *
     * Though the ">" character is escaped for symmetry, characters like
     * ">" and "/" don't need escaping in HTML and have no special meaning
     * unless they're part of a tag or unquoted attribute value. See
     * [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
     * (under "semi-related fun fact") for more details.
     *
     * When working with HTML you should always
     * [quote attribute values](http://wonko.com/post/html-escaping) to reduce
     * XSS vectors.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to escape.
     * @returns {string} Returns the escaped string.
     * @example
     *
     * _.escape('fred, barney, & pebbles');
     * // => 'fred, barney, &amp; pebbles'
     */
    function escape(string) {
      string = toString(string);
      return (string && reHasUnescapedHtml.test(string))
        ? string.replace(reUnescapedHtml, escapeHtmlChar)
        : string;
    }

    /**
     * Escapes the `RegExp` special characters "^", "$", "\", ".", "*", "+",
     * "?", "(", ")", "[", "]", "{", "}", and "|" in `string`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to escape.
     * @returns {string} Returns the escaped string.
     * @example
     *
     * _.escapeRegExp('[lodash](https://lodash.com/)');
     * // => '\[lodash\]\(https://lodash\.com/\)'
     */
    function escapeRegExp(string) {
      string = toString(string);
      return (string && reHasRegExpChar.test(string))
        ? string.replace(reRegExpChar, '\\$&')
        : string;
    }

    /**
     * Converts `string` to
     * [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the kebab cased string.
     * @example
     *
     * _.kebabCase('Foo Bar');
     * // => 'foo-bar'
     *
     * _.kebabCase('fooBar');
     * // => 'foo-bar'
     *
     * _.kebabCase('__FOO_BAR__');
     * // => 'foo-bar'
     */
    var kebabCase = createCompounder(function(result, word, index) {
      return result + (index ? '-' : '') + word.toLowerCase();
    });

    /**
     * Converts `string`, as space separated words, to lower case.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the lower cased string.
     * @example
     *
     * _.lowerCase('--Foo-Bar--');
     * // => 'foo bar'
     *
     * _.lowerCase('fooBar');
     * // => 'foo bar'
     *
     * _.lowerCase('__FOO_BAR__');
     * // => 'foo bar'
     */
    var lowerCase = createCompounder(function(result, word, index) {
      return result + (index ? ' ' : '') + word.toLowerCase();
    });

    /**
     * Converts the first character of `string` to lower case.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the converted string.
     * @example
     *
     * _.lowerFirst('Fred');
     * // => 'fred'
     *
     * _.lowerFirst('FRED');
     * // => 'fRED'
     */
    var lowerFirst = createCaseFirst('toLowerCase');

    /**
     * Pads `string` on the left and right sides if it's shorter than `length`.
     * Padding characters are truncated if they can't be evenly divided by `length`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.pad('abc', 8);
     * // => '  abc   '
     *
     * _.pad('abc', 8, '_-');
     * // => '_-abc_-_'
     *
     * _.pad('abc', 3);
     * // => 'abc'
     */
    function pad(string, length, chars) {
      string = toString(string);
      length = toInteger(length);

      var strLength = length ? stringSize(string) : 0;
      if (!length || strLength >= length) {
        return string;
      }
      var mid = (length - strLength) / 2;
      return (
        createPadding(nativeFloor(mid), chars) +
        string +
        createPadding(nativeCeil(mid), chars)
      );
    }

    /**
     * Pads `string` on the right side if it's shorter than `length`. Padding
     * characters are truncated if they exceed `length`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.padEnd('abc', 6);
     * // => 'abc   '
     *
     * _.padEnd('abc', 6, '_-');
     * // => 'abc_-_'
     *
     * _.padEnd('abc', 3);
     * // => 'abc'
     */
    function padEnd(string, length, chars) {
      string = toString(string);
      length = toInteger(length);

      var strLength = length ? stringSize(string) : 0;
      return (length && strLength < length)
        ? (string + createPadding(length - strLength, chars))
        : string;
    }

    /**
     * Pads `string` on the left side if it's shorter than `length`. Padding
     * characters are truncated if they exceed `length`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.padStart('abc', 6);
     * // => '   abc'
     *
     * _.padStart('abc', 6, '_-');
     * // => '_-_abc'
     *
     * _.padStart('abc', 3);
     * // => 'abc'
     */
    function padStart(string, length, chars) {
      string = toString(string);
      length = toInteger(length);

      var strLength = length ? stringSize(string) : 0;
      return (length && strLength < length)
        ? (createPadding(length - strLength, chars) + string)
        : string;
    }

    /**
     * Converts `string` to an integer of the specified radix. If `radix` is
     * `undefined` or `0`, a `radix` of `10` is used unless `value` is a
     * hexadecimal, in which case a `radix` of `16` is used.
     *
     * **Note:** This method aligns with the
     * [ES5 implementation](https://es5.github.io/#x15.1.2.2) of `parseInt`.
     *
     * @static
     * @memberOf _
     * @since 1.1.0
     * @category String
     * @param {string} string The string to convert.
     * @param {number} [radix=10] The radix to interpret `value` by.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.parseInt('08');
     * // => 8
     *
     * _.map(['6', '08', '10'], _.parseInt);
     * // => [6, 8, 10]
     */
    function parseInt(string, radix, guard) {
      if (guard || radix == null) {
        radix = 0;
      } else if (radix) {
        radix = +radix;
      }
      return nativeParseInt(toString(string).replace(reTrimStart, ''), radix || 0);
    }

    /**
     * Repeats the given string `n` times.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to repeat.
     * @param {number} [n=1] The number of times to repeat the string.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {string} Returns the repeated string.
     * @example
     *
     * _.repeat('*', 3);
     * // => '***'
     *
     * _.repeat('abc', 2);
     * // => 'abcabc'
     *
     * _.repeat('abc', 0);
     * // => ''
     */
    function repeat(string, n, guard) {
      if ((guard ? isIterateeCall(string, n, guard) : n === undefined)) {
        n = 1;
      } else {
        n = toInteger(n);
      }
      return baseRepeat(toString(string), n);
    }

    /**
     * Replaces matches for `pattern` in `string` with `replacement`.
     *
     * **Note:** This method is based on
     * [`String#replace`](https://mdn.io/String/replace).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to modify.
     * @param {RegExp|string} pattern The pattern to replace.
     * @param {Function|string} replacement The match replacement.
     * @returns {string} Returns the modified string.
     * @example
     *
     * _.replace('Hi Fred', 'Fred', 'Barney');
     * // => 'Hi Barney'
     */
    function replace() {
      var args = arguments,
          string = toString(args[0]);

      return args.length < 3 ? string : string.replace(args[1], args[2]);
    }

    /**
     * Converts `string` to
     * [snake case](https://en.wikipedia.org/wiki/Snake_case).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the snake cased string.
     * @example
     *
     * _.snakeCase('Foo Bar');
     * // => 'foo_bar'
     *
     * _.snakeCase('fooBar');
     * // => 'foo_bar'
     *
     * _.snakeCase('--FOO-BAR--');
     * // => 'foo_bar'
     */
    var snakeCase = createCompounder(function(result, word, index) {
      return result + (index ? '_' : '') + word.toLowerCase();
    });

    /**
     * Splits `string` by `separator`.
     *
     * **Note:** This method is based on
     * [`String#split`](https://mdn.io/String/split).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to split.
     * @param {RegExp|string} separator The separator pattern to split by.
     * @param {number} [limit] The length to truncate results to.
     * @returns {Array} Returns the string segments.
     * @example
     *
     * _.split('a-b-c', '-', 2);
     * // => ['a', 'b']
     */
    function split(string, separator, limit) {
      if (limit && typeof limit != 'number' && isIterateeCall(string, separator, limit)) {
        separator = limit = undefined;
      }
      limit = limit === undefined ? MAX_ARRAY_LENGTH : limit >>> 0;
      if (!limit) {
        return [];
      }
      string = toString(string);
      if (string && (
            typeof separator == 'string' ||
            (separator != null && !isRegExp(separator))
          )) {
        separator = baseToString(separator);
        if (!separator && hasUnicode(string)) {
          return castSlice(stringToArray(string), 0, limit);
        }
      }
      return string.split(separator, limit);
    }

    /**
     * Converts `string` to
     * [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
     *
     * @static
     * @memberOf _
     * @since 3.1.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the start cased string.
     * @example
     *
     * _.startCase('--foo-bar--');
     * // => 'Foo Bar'
     *
     * _.startCase('fooBar');
     * // => 'Foo Bar'
     *
     * _.startCase('__FOO_BAR__');
     * // => 'FOO BAR'
     */
    var startCase = createCompounder(function(result, word, index) {
      return result + (index ? ' ' : '') + upperFirst(word);
    });

    /**
     * Checks if `string` starts with the given target string.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to inspect.
     * @param {string} [target] The string to search for.
     * @param {number} [position=0] The position to search from.
     * @returns {boolean} Returns `true` if `string` starts with `target`,
     *  else `false`.
     * @example
     *
     * _.startsWith('abc', 'a');
     * // => true
     *
     * _.startsWith('abc', 'b');
     * // => false
     *
     * _.startsWith('abc', 'b', 1);
     * // => true
     */
    function startsWith(string, target, position) {
      string = toString(string);
      position = position == null
        ? 0
        : baseClamp(toInteger(position), 0, string.length);

      target = baseToString(target);
      return string.slice(position, position + target.length) == target;
    }

    /**
     * Creates a compiled template function that can interpolate data properties
     * in "interpolate" delimiters, HTML-escape interpolated data properties in
     * "escape" delimiters, and execute JavaScript in "evaluate" delimiters. Data
     * properties may be accessed as free variables in the template. If a setting
     * object is given, it takes precedence over `_.templateSettings` values.
     *
     * **Note:** In the development build `_.template` utilizes
     * [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)
     * for easier debugging.
     *
     * For more information on precompiling templates see
     * [lodash's custom builds documentation](https://lodash.com/custom-builds).
     *
     * For more information on Chrome extension sandboxes see
     * [Chrome's extensions documentation](https://developer.chrome.com/extensions/sandboxingEval).
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category String
     * @param {string} [string=''] The template string.
     * @param {Object} [options={}] The options object.
     * @param {RegExp} [options.escape=_.templateSettings.escape]
     *  The HTML "escape" delimiter.
     * @param {RegExp} [options.evaluate=_.templateSettings.evaluate]
     *  The "evaluate" delimiter.
     * @param {Object} [options.imports=_.templateSettings.imports]
     *  An object to import into the template as free variables.
     * @param {RegExp} [options.interpolate=_.templateSettings.interpolate]
     *  The "interpolate" delimiter.
     * @param {string} [options.sourceURL='lodash.templateSources[n]']
     *  The sourceURL of the compiled template.
     * @param {string} [options.variable='obj']
     *  The data object variable name.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Function} Returns the compiled template function.
     * @example
     *
     * // Use the "interpolate" delimiter to create a compiled template.
     * var compiled = _.template('hello <%= user %>!');
     * compiled({ 'user': 'fred' });
     * // => 'hello fred!'
     *
     * // Use the HTML "escape" delimiter to escape data property values.
     * var compiled = _.template('<b><%- value %></b>');
     * compiled({ 'value': '<script>' });
     * // => '<b>&lt;script&gt;</b>'
     *
     * // Use the "evaluate" delimiter to execute JavaScript and generate HTML.
     * var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
     * compiled({ 'users': ['fred', 'barney'] });
     * // => '<li>fred</li><li>barney</li>'
     *
     * // Use the internal `print` function in "evaluate" delimiters.
     * var compiled = _.template('<% print("hello " + user); %>!');
     * compiled({ 'user': 'barney' });
     * // => 'hello barney!'
     *
     * // Use the ES template literal delimiter as an "interpolate" delimiter.
     * // Disable support by replacing the "interpolate" delimiter.
     * var compiled = _.template('hello ${ user }!');
     * compiled({ 'user': 'pebbles' });
     * // => 'hello pebbles!'
     *
     * // Use backslashes to treat delimiters as plain text.
     * var compiled = _.template('<%= "\\<%- value %\\>" %>');
     * compiled({ 'value': 'ignored' });
     * // => '<%- value %>'
     *
     * // Use the `imports` option to import `jQuery` as `jq`.
     * var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
     * var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
     * compiled({ 'users': ['fred', 'barney'] });
     * // => '<li>fred</li><li>barney</li>'
     *
     * // Use the `sourceURL` option to specify a custom sourceURL for the template.
     * var compiled = _.template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' });
     * compiled(data);
     * // => Find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector.
     *
     * // Use the `variable` option to ensure a with-statement isn't used in the compiled template.
     * var compiled = _.template('hi <%= data.user %>!', { 'variable': 'data' });
     * compiled.source;
     * // => function(data) {
     * //   var __t, __p = '';
     * //   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
     * //   return __p;
     * // }
     *
     * // Use custom template delimiters.
     * _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
     * var compiled = _.template('hello {{ user }}!');
     * compiled({ 'user': 'mustache' });
     * // => 'hello mustache!'
     *
     * // Use the `source` property to inline compiled templates for meaningful
     * // line numbers in error messages and stack traces.
     * fs.writeFileSync(path.join(process.cwd(), 'jst.js'), '\
     *   var JST = {\
     *     "main": ' + _.template(mainText).source + '\
     *   };\
     * ');
     */
    function template(string, options, guard) {
      // Based on John Resig's `tmpl` implementation
      // (http://ejohn.org/blog/javascript-micro-templating/)
      // and Laura Doktorova's doT.js (https://github.com/olado/doT).
      var settings = lodash.templateSettings;

      if (guard && isIterateeCall(string, options, guard)) {
        options = undefined;
      }
      string = toString(string);
      options = assignInWith({}, options, settings, customDefaultsAssignIn);

      var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn),
          importsKeys = keys(imports),
          importsValues = baseValues(imports, importsKeys);

      var isEscaping,
          isEvaluating,
          index = 0,
          interpolate = options.interpolate || reNoMatch,
          source = "__p += '";

      // Compile the regexp to match each delimiter.
      var reDelimiters = RegExp(
        (options.escape || reNoMatch).source + '|' +
        interpolate.source + '|' +
        (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
        (options.evaluate || reNoMatch).source + '|$'
      , 'g');

      // Use a sourceURL for easier debugging.
      var sourceURL = '//# sourceURL=' +
        ('sourceURL' in options
          ? options.sourceURL
          : ('lodash.templateSources[' + (++templateCounter) + ']')
        ) + '\n';

      string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
        interpolateValue || (interpolateValue = esTemplateValue);

        // Escape characters that can't be included in string literals.
        source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);

        // Replace delimiters with snippets.
        if (escapeValue) {
          isEscaping = true;
          source += "' +\n__e(" + escapeValue + ") +\n'";
        }
        if (evaluateValue) {
          isEvaluating = true;
          source += "';\n" + evaluateValue + ";\n__p += '";
        }
        if (interpolateValue) {
          source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
        }
        index = offset + match.length;

        // The JS engine embedded in Adobe products needs `match` returned in
        // order to produce the correct `offset` value.
        return match;
      });

      source += "';\n";

      // If `variable` is not specified wrap a with-statement around the generated
      // code to add the data object to the top of the scope chain.
      var variable = options.variable;
      if (!variable) {
        source = 'with (obj) {\n' + source + '\n}\n';
      }
      // Cleanup code by stripping empty strings.
      source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
        .replace(reEmptyStringMiddle, '$1')
        .replace(reEmptyStringTrailing, '$1;');

      // Frame code as the function body.
      source = 'function(' + (variable || 'obj') + ') {\n' +
        (variable
          ? ''
          : 'obj || (obj = {});\n'
        ) +
        "var __t, __p = ''" +
        (isEscaping
           ? ', __e = _.escape'
           : ''
        ) +
        (isEvaluating
          ? ', __j = Array.prototype.join;\n' +
            "function print() { __p += __j.call(arguments, '') }\n"
          : ';\n'
        ) +
        source +
        'return __p\n}';

      var result = attempt(function() {
        return Function(importsKeys, sourceURL + 'return ' + source)
          .apply(undefined, importsValues);
      });

      // Provide the compiled function's source by its `toString` method or
      // the `source` property as a convenience for inlining compiled templates.
      result.source = source;
      if (isError(result)) {
        throw result;
      }
      return result;
    }

    /**
     * Converts `string`, as a whole, to lower case just like
     * [String#toLowerCase](https://mdn.io/toLowerCase).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the lower cased string.
     * @example
     *
     * _.toLower('--Foo-Bar--');
     * // => '--foo-bar--'
     *
     * _.toLower('fooBar');
     * // => 'foobar'
     *
     * _.toLower('__FOO_BAR__');
     * // => '__foo_bar__'
     */
    function toLower(value) {
      return toString(value).toLowerCase();
    }

    /**
     * Converts `string`, as a whole, to upper case just like
     * [String#toUpperCase](https://mdn.io/toUpperCase).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the upper cased string.
     * @example
     *
     * _.toUpper('--foo-bar--');
     * // => '--FOO-BAR--'
     *
     * _.toUpper('fooBar');
     * // => 'FOOBAR'
     *
     * _.toUpper('__foo_bar__');
     * // => '__FOO_BAR__'
     */
    function toUpper(value) {
      return toString(value).toUpperCase();
    }

    /**
     * Removes leading and trailing whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trim('  abc  ');
     * // => 'abc'
     *
     * _.trim('-_-abc-_-', '_-');
     * // => 'abc'
     *
     * _.map(['  foo  ', '  bar  '], _.trim);
     * // => ['foo', 'bar']
     */
    function trim(string, chars, guard) {
      string = toString(string);
      if (string && (guard || chars === undefined)) {
        return string.replace(reTrim, '');
      }
      if (!string || !(chars = baseToString(chars))) {
        return string;
      }
      var strSymbols = stringToArray(string),
          chrSymbols = stringToArray(chars),
          start = charsStartIndex(strSymbols, chrSymbols),
          end = charsEndIndex(strSymbols, chrSymbols) + 1;

      return castSlice(strSymbols, start, end).join('');
    }

    /**
     * Removes trailing whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trimEnd('  abc  ');
     * // => '  abc'
     *
     * _.trimEnd('-_-abc-_-', '_-');
     * // => '-_-abc'
     */
    function trimEnd(string, chars, guard) {
      string = toString(string);
      if (string && (guard || chars === undefined)) {
        return string.replace(reTrimEnd, '');
      }
      if (!string || !(chars = baseToString(chars))) {
        return string;
      }
      var strSymbols = stringToArray(string),
          end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;

      return castSlice(strSymbols, 0, end).join('');
    }

    /**
     * Removes leading whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trimStart('  abc  ');
     * // => 'abc  '
     *
     * _.trimStart('-_-abc-_-', '_-');
     * // => 'abc-_-'
     */
    function trimStart(string, chars, guard) {
      string = toString(string);
      if (string && (guard || chars === undefined)) {
        return string.replace(reTrimStart, '');
      }
      if (!string || !(chars = baseToString(chars))) {
        return string;
      }
      var strSymbols = stringToArray(string),
          start = charsStartIndex(strSymbols, stringToArray(chars));

      return castSlice(strSymbols, start).join('');
    }

    /**
     * Truncates `string` if it's longer than the given maximum string length.
     * The last characters of the truncated string are replaced with the omission
     * string which defaults to "...".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to truncate.
     * @param {Object} [options={}] The options object.
     * @param {number} [options.length=30] The maximum string length.
     * @param {string} [options.omission='...'] The string to indicate text is omitted.
     * @param {RegExp|string} [options.separator] The separator pattern to truncate to.
     * @returns {string} Returns the truncated string.
     * @example
     *
     * _.truncate('hi-diddly-ho there, neighborino');
     * // => 'hi-diddly-ho there, neighbo...'
     *
     * _.truncate('hi-diddly-ho there, neighborino', {
     *   'length': 24,
     *   'separator': ' '
     * });
     * // => 'hi-diddly-ho there,...'
     *
     * _.truncate('hi-diddly-ho there, neighborino', {
     *   'length': 24,
     *   'separator': /,? +/
     * });
     * // => 'hi-diddly-ho there...'
     *
     * _.truncate('hi-diddly-ho there, neighborino', {
     *   'omission': ' [...]'
     * });
     * // => 'hi-diddly-ho there, neig [...]'
     */
    function truncate(string, options) {
      var length = DEFAULT_TRUNC_LENGTH,
          omission = DEFAULT_TRUNC_OMISSION;

      if (isObject(options)) {
        var separator = 'separator' in options ? options.separator : separator;
        length = 'length' in options ? toInteger(options.length) : length;
        omission = 'omission' in options ? baseToString(options.omission) : omission;
      }
      string = toString(string);

      var strLength = string.length;
      if (hasUnicode(string)) {
        var strSymbols = stringToArray(string);
        strLength = strSymbols.length;
      }
      if (length >= strLength) {
        return string;
      }
      var end = length - stringSize(omission);
      if (end < 1) {
        return omission;
      }
      var result = strSymbols
        ? castSlice(strSymbols, 0, end).join('')
        : string.slice(0, end);

      if (separator === undefined) {
        return result + omission;
      }
      if (strSymbols) {
        end += (result.length - end);
      }
      if (isRegExp(separator)) {
        if (string.slice(end).search(separator)) {
          var match,
              substring = result;

          if (!separator.global) {
            separator = RegExp(separator.source, toString(reFlags.exec(separator)) + 'g');
          }
          separator.lastIndex = 0;
          while ((match = separator.exec(substring))) {
            var newEnd = match.index;
          }
          result = result.slice(0, newEnd === undefined ? end : newEnd);
        }
      } else if (string.indexOf(baseToString(separator), end) != end) {
        var index = result.lastIndexOf(separator);
        if (index > -1) {
          result = result.slice(0, index);
        }
      }
      return result + omission;
    }

    /**
     * The inverse of `_.escape`; this method converts the HTML entities
     * `&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&#39;` in `string` to
     * their corresponding characters.
     *
     * **Note:** No other HTML entities are unescaped. To unescape additional
     * HTML entities use a third-party library like [_he_](https://mths.be/he).
     *
     * @static
     * @memberOf _
     * @since 0.6.0
     * @category String
     * @param {string} [string=''] The string to unescape.
     * @returns {string} Returns the unescaped string.
     * @example
     *
     * _.unescape('fred, barney, &amp; pebbles');
     * // => 'fred, barney, & pebbles'
     */
    function unescape(string) {
      string = toString(string);
      return (string && reHasEscapedHtml.test(string))
        ? string.replace(reEscapedHtml, unescapeHtmlChar)
        : string;
    }

    /**
     * Converts `string`, as space separated words, to upper case.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the upper cased string.
     * @example
     *
     * _.upperCase('--foo-bar');
     * // => 'FOO BAR'
     *
     * _.upperCase('fooBar');
     * // => 'FOO BAR'
     *
     * _.upperCase('__foo_bar__');
     * // => 'FOO BAR'
     */
    var upperCase = createCompounder(function(result, word, index) {
      return result + (index ? ' ' : '') + word.toUpperCase();
    });

    /**
     * Converts the first character of `string` to upper case.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the converted string.
     * @example
     *
     * _.upperFirst('fred');
     * // => 'Fred'
     *
     * _.upperFirst('FRED');
     * // => 'FRED'
     */
    var upperFirst = createCaseFirst('toUpperCase');

    /**
     * Splits `string` into an array of its words.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to inspect.
     * @param {RegExp|string} [pattern] The pattern to match words.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the words of `string`.
     * @example
     *
     * _.words('fred, barney, & pebbles');
     * // => ['fred', 'barney', 'pebbles']
     *
     * _.words('fred, barney, & pebbles', /[^, ]+/g);
     * // => ['fred', 'barney', '&', 'pebbles']
     */
    function words(string, pattern, guard) {
      string = toString(string);
      pattern = guard ? undefined : pattern;

      if (pattern === undefined) {
        return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
      }
      return string.match(pattern) || [];
    }

    /*------------------------------------------------------------------------*/

    /**
     * Attempts to invoke `func`, returning either the result or the caught error
     * object. Any additional arguments are provided to `func` when it's invoked.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Util
     * @param {Function} func The function to attempt.
     * @param {...*} [args] The arguments to invoke `func` with.
     * @returns {*} Returns the `func` result or error object.
     * @example
     *
     * // Avoid throwing errors for invalid selectors.
     * var elements = _.attempt(function(selector) {
     *   return document.querySelectorAll(selector);
     * }, '>_>');
     *
     * if (_.isError(elements)) {
     *   elements = [];
     * }
     */
    var attempt = baseRest(function(func, args) {
      try {
        return apply(func, undefined, args);
      } catch (e) {
        return isError(e) ? e : new Error(e);
      }
    });

    /**
     * Binds methods of an object to the object itself, overwriting the existing
     * method.
     *
     * **Note:** This method doesn't set the "length" property of bound functions.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {Object} object The object to bind and assign the bound methods to.
     * @param {...(string|string[])} methodNames The object method names to bind.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var view = {
     *   'label': 'docs',
     *   'click': function() {
     *     console.log('clicked ' + this.label);
     *   }
     * };
     *
     * _.bindAll(view, ['click']);
     * jQuery(element).on('click', view.click);
     * // => Logs 'clicked docs' when clicked.
     */
    var bindAll = flatRest(function(object, methodNames) {
      arrayEach(methodNames, function(key) {
        key = toKey(key);
        baseAssignValue(object, key, bind(object[key], object));
      });
      return object;
    });

    /**
     * Creates a function that iterates over `pairs` and invokes the corresponding
     * function of the first predicate to return truthy. The predicate-function
     * pairs are invoked with the `this` binding and arguments of the created
     * function.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {Array} pairs The predicate-function pairs.
     * @returns {Function} Returns the new composite function.
     * @example
     *
     * var func = _.cond([
     *   [_.matches({ 'a': 1 }),           _.constant('matches A')],
     *   [_.conforms({ 'b': _.isNumber }), _.constant('matches B')],
     *   [_.stubTrue,                      _.constant('no match')]
     * ]);
     *
     * func({ 'a': 1, 'b': 2 });
     * // => 'matches A'
     *
     * func({ 'a': 0, 'b': 1 });
     * // => 'matches B'
     *
     * func({ 'a': '1', 'b': '2' });
     * // => 'no match'
     */
    function cond(pairs) {
      var length = pairs == null ? 0 : pairs.length,
          toIteratee = getIteratee();

      pairs = !length ? [] : arrayMap(pairs, function(pair) {
        if (typeof pair[1] != 'function') {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        return [toIteratee(pair[0]), pair[1]];
      });

      return baseRest(function(args) {
        var index = -1;
        while (++index < length) {
          var pair = pairs[index];
          if (apply(pair[0], this, args)) {
            return apply(pair[1], this, args);
          }
        }
      });
    }

    /**
     * Creates a function that invokes the predicate properties of `source` with
     * the corresponding property values of a given object, returning `true` if
     * all predicates return truthy, else `false`.
     *
     * **Note:** The created function is equivalent to `_.conformsTo` with
     * `source` partially applied.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {Object} source The object of property predicates to conform to.
     * @returns {Function} Returns the new spec function.
     * @example
     *
     * var objects = [
     *   { 'a': 2, 'b': 1 },
     *   { 'a': 1, 'b': 2 }
     * ];
     *
     * _.filter(objects, _.conforms({ 'b': function(n) { return n > 1; } }));
     * // => [{ 'a': 1, 'b': 2 }]
     */
    function conforms(source) {
      return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
    }

    /**
     * Creates a function that returns `value`.
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Util
     * @param {*} value The value to return from the new function.
     * @returns {Function} Returns the new constant function.
     * @example
     *
     * var objects = _.times(2, _.constant({ 'a': 1 }));
     *
     * console.log(objects);
     * // => [{ 'a': 1 }, { 'a': 1 }]
     *
     * console.log(objects[0] === objects[1]);
     * // => true
     */
    function constant(value) {
      return function() {
        return value;
      };
    }

    /**
     * Checks `value` to determine whether a default value should be returned in
     * its place. The `defaultValue` is returned if `value` is `NaN`, `null`,
     * or `undefined`.
     *
     * @static
     * @memberOf _
     * @since 4.14.0
     * @category Util
     * @param {*} value The value to check.
     * @param {*} defaultValue The default value.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * _.defaultTo(1, 10);
     * // => 1
     *
     * _.defaultTo(undefined, 10);
     * // => 10
     */
    function defaultTo(value, defaultValue) {
      return (value == null || value !== value) ? defaultValue : value;
    }

    /**
     * Creates a function that returns the result of invoking the given functions
     * with the `this` binding of the created function, where each successive
     * invocation is supplied the return value of the previous.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Util
     * @param {...(Function|Function[])} [funcs] The functions to invoke.
     * @returns {Function} Returns the new composite function.
     * @see _.flowRight
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var addSquare = _.flow([_.add, square]);
     * addSquare(1, 2);
     * // => 9
     */
    var flow = createFlow();

    /**
     * This method is like `_.flow` except that it creates a function that
     * invokes the given functions from right to left.
     *
     * @static
     * @since 3.0.0
     * @memberOf _
     * @category Util
     * @param {...(Function|Function[])} [funcs] The functions to invoke.
     * @returns {Function} Returns the new composite function.
     * @see _.flow
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var addSquare = _.flowRight([square, _.add]);
     * addSquare(1, 2);
     * // => 9
     */
    var flowRight = createFlow(true);

    /**
     * This method returns the first argument it receives.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {*} value Any value.
     * @returns {*} Returns `value`.
     * @example
     *
     * var object = { 'a': 1 };
     *
     * console.log(_.identity(object) === object);
     * // => true
     */
    function identity(value) {
      return value;
    }

    /**
     * Creates a function that invokes `func` with the arguments of the created
     * function. If `func` is a property name, the created function returns the
     * property value for a given element. If `func` is an array or object, the
     * created function returns `true` for elements that contain the equivalent
     * source properties, otherwise it returns `false`.
     *
     * @static
     * @since 4.0.0
     * @memberOf _
     * @category Util
     * @param {*} [func=_.identity] The value to convert to a callback.
     * @returns {Function} Returns the callback.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': true },
     *   { 'user': 'fred',   'age': 40, 'active': false }
     * ];
     *
     * // The `_.matches` iteratee shorthand.
     * _.filter(users, _.iteratee({ 'user': 'barney', 'active': true }));
     * // => [{ 'user': 'barney', 'age': 36, 'active': true }]
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.filter(users, _.iteratee(['user', 'fred']));
     * // => [{ 'user': 'fred', 'age': 40 }]
     *
     * // The `_.property` iteratee shorthand.
     * _.map(users, _.iteratee('user'));
     * // => ['barney', 'fred']
     *
     * // Create custom iteratee shorthands.
     * _.iteratee = _.wrap(_.iteratee, function(iteratee, func) {
     *   return !_.isRegExp(func) ? iteratee(func) : function(string) {
     *     return func.test(string);
     *   };
     * });
     *
     * _.filter(['abc', 'def'], /ef/);
     * // => ['def']
     */
    function iteratee(func) {
      return baseIteratee(typeof func == 'function' ? func : baseClone(func, CLONE_DEEP_FLAG));
    }

    /**
     * Creates a function that performs a partial deep comparison between a given
     * object and `source`, returning `true` if the given object has equivalent
     * property values, else `false`.
     *
     * **Note:** The created function is equivalent to `_.isMatch` with `source`
     * partially applied.
     *
     * Partial comparisons will match empty array and empty object `source`
     * values against any array or object value, respectively. See `_.isEqual`
     * for a list of supported value comparisons.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Util
     * @param {Object} source The object of property values to match.
     * @returns {Function} Returns the new spec function.
     * @example
     *
     * var objects = [
     *   { 'a': 1, 'b': 2, 'c': 3 },
     *   { 'a': 4, 'b': 5, 'c': 6 }
     * ];
     *
     * _.filter(objects, _.matches({ 'a': 4, 'c': 6 }));
     * // => [{ 'a': 4, 'b': 5, 'c': 6 }]
     */
    function matches(source) {
      return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
    }

    /**
     * Creates a function that performs a partial deep comparison between the
     * value at `path` of a given object to `srcValue`, returning `true` if the
     * object value is equivalent, else `false`.
     *
     * **Note:** Partial comparisons will match empty array and empty object
     * `srcValue` values against any array or object value, respectively. See
     * `_.isEqual` for a list of supported value comparisons.
     *
     * @static
     * @memberOf _
     * @since 3.2.0
     * @category Util
     * @param {Array|string} path The path of the property to get.
     * @param {*} srcValue The value to match.
     * @returns {Function} Returns the new spec function.
     * @example
     *
     * var objects = [
     *   { 'a': 1, 'b': 2, 'c': 3 },
     *   { 'a': 4, 'b': 5, 'c': 6 }
     * ];
     *
     * _.find(objects, _.matchesProperty('a', 4));
     * // => { 'a': 4, 'b': 5, 'c': 6 }
     */
    function matchesProperty(path, srcValue) {
      return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG));
    }

    /**
     * Creates a function that invokes the method at `path` of a given object.
     * Any additional arguments are provided to the invoked method.
     *
     * @static
     * @memberOf _
     * @since 3.7.0
     * @category Util
     * @param {Array|string} path The path of the method to invoke.
     * @param {...*} [args] The arguments to invoke the method with.
     * @returns {Function} Returns the new invoker function.
     * @example
     *
     * var objects = [
     *   { 'a': { 'b': _.constant(2) } },
     *   { 'a': { 'b': _.constant(1) } }
     * ];
     *
     * _.map(objects, _.method('a.b'));
     * // => [2, 1]
     *
     * _.map(objects, _.method(['a', 'b']));
     * // => [2, 1]
     */
    var method = baseRest(function(path, args) {
      return function(object) {
        return baseInvoke(object, path, args);
      };
    });

    /**
     * The opposite of `_.method`; this method creates a function that invokes
     * the method at a given path of `object`. Any additional arguments are
     * provided to the invoked method.
     *
     * @static
     * @memberOf _
     * @since 3.7.0
     * @category Util
     * @param {Object} object The object to query.
     * @param {...*} [args] The arguments to invoke the method with.
     * @returns {Function} Returns the new invoker function.
     * @example
     *
     * var array = _.times(3, _.constant),
     *     object = { 'a': array, 'b': array, 'c': array };
     *
     * _.map(['a[2]', 'c[0]'], _.methodOf(object));
     * // => [2, 0]
     *
     * _.map([['a', '2'], ['c', '0']], _.methodOf(object));
     * // => [2, 0]
     */
    var methodOf = baseRest(function(object, args) {
      return function(path) {
        return baseInvoke(object, path, args);
      };
    });

    /**
     * Adds all own enumerable string keyed function properties of a source
     * object to the destination object. If `object` is a function, then methods
     * are added to its prototype as well.
     *
     * **Note:** Use `_.runInContext` to create a pristine `lodash` function to
     * avoid conflicts caused by modifying the original.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {Function|Object} [object=lodash] The destination object.
     * @param {Object} source The object of functions to add.
     * @param {Object} [options={}] The options object.
     * @param {boolean} [options.chain=true] Specify whether mixins are chainable.
     * @returns {Function|Object} Returns `object`.
     * @example
     *
     * function vowels(string) {
     *   return _.filter(string, function(v) {
     *     return /[aeiou]/i.test(v);
     *   });
     * }
     *
     * _.mixin({ 'vowels': vowels });
     * _.vowels('fred');
     * // => ['e']
     *
     * _('fred').vowels().value();
     * // => ['e']
     *
     * _.mixin({ 'vowels': vowels }, { 'chain': false });
     * _('fred').vowels();
     * // => ['e']
     */
    function mixin(object, source, options) {
      var props = keys(source),
          methodNames = baseFunctions(source, props);

      if (options == null &&
          !(isObject(source) && (methodNames.length || !props.length))) {
        options = source;
        source = object;
        object = this;
        methodNames = baseFunctions(source, keys(source));
      }
      var chain = !(isObject(options) && 'chain' in options) || !!options.chain,
          isFunc = isFunction(object);

      arrayEach(methodNames, function(methodName) {
        var func = source[methodName];
        object[methodName] = func;
        if (isFunc) {
          object.prototype[methodName] = function() {
            var chainAll = this.__chain__;
            if (chain || chainAll) {
              var result = object(this.__wrapped__),
                  actions = result.__actions__ = copyArray(this.__actions__);

              actions.push({ 'func': func, 'args': arguments, 'thisArg': object });
              result.__chain__ = chainAll;
              return result;
            }
            return func.apply(object, arrayPush([this.value()], arguments));
          };
        }
      });

      return object;
    }

    /**
     * Reverts the `_` variable to its previous value and returns a reference to
     * the `lodash` function.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @returns {Function} Returns the `lodash` function.
     * @example
     *
     * var lodash = _.noConflict();
     */
    function noConflict() {
      if (root._ === this) {
        root._ = oldDash;
      }
      return this;
    }

    /**
     * This method returns `undefined`.
     *
     * @static
     * @memberOf _
     * @since 2.3.0
     * @category Util
     * @example
     *
     * _.times(2, _.noop);
     * // => [undefined, undefined]
     */
    function noop() {
      // No operation performed.
    }

    /**
     * Creates a function that gets the argument at index `n`. If `n` is negative,
     * the nth argument from the end is returned.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {number} [n=0] The index of the argument to return.
     * @returns {Function} Returns the new pass-thru function.
     * @example
     *
     * var func = _.nthArg(1);
     * func('a', 'b', 'c', 'd');
     * // => 'b'
     *
     * var func = _.nthArg(-2);
     * func('a', 'b', 'c', 'd');
     * // => 'c'
     */
    function nthArg(n) {
      n = toInteger(n);
      return baseRest(function(args) {
        return baseNth(args, n);
      });
    }

    /**
     * Creates a function that invokes `iteratees` with the arguments it receives
     * and returns their results.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {...(Function|Function[])} [iteratees=[_.identity]]
     *  The iteratees to invoke.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var func = _.over([Math.max, Math.min]);
     *
     * func(1, 2, 3, 4);
     * // => [4, 1]
     */
    var over = createOver(arrayMap);

    /**
     * Creates a function that checks if **all** of the `predicates` return
     * truthy when invoked with the arguments it receives.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {...(Function|Function[])} [predicates=[_.identity]]
     *  The predicates to check.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var func = _.overEvery([Boolean, isFinite]);
     *
     * func('1');
     * // => true
     *
     * func(null);
     * // => false
     *
     * func(NaN);
     * // => false
     */
    var overEvery = createOver(arrayEvery);

    /**
     * Creates a function that checks if **any** of the `predicates` return
     * truthy when invoked with the arguments it receives.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {...(Function|Function[])} [predicates=[_.identity]]
     *  The predicates to check.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var func = _.overSome([Boolean, isFinite]);
     *
     * func('1');
     * // => true
     *
     * func(null);
     * // => true
     *
     * func(NaN);
     * // => false
     */
    var overSome = createOver(arraySome);

    /**
     * Creates a function that returns the value at `path` of a given object.
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Util
     * @param {Array|string} path The path of the property to get.
     * @returns {Function} Returns the new accessor function.
     * @example
     *
     * var objects = [
     *   { 'a': { 'b': 2 } },
     *   { 'a': { 'b': 1 } }
     * ];
     *
     * _.map(objects, _.property('a.b'));
     * // => [2, 1]
     *
     * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
     * // => [1, 2]
     */
    function property(path) {
      return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
    }

    /**
     * The opposite of `_.property`; this method creates a function that returns
     * the value at a given path of `object`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Util
     * @param {Object} object The object to query.
     * @returns {Function} Returns the new accessor function.
     * @example
     *
     * var array = [0, 1, 2],
     *     object = { 'a': array, 'b': array, 'c': array };
     *
     * _.map(['a[2]', 'c[0]'], _.propertyOf(object));
     * // => [2, 0]
     *
     * _.map([['a', '2'], ['c', '0']], _.propertyOf(object));
     * // => [2, 0]
     */
    function propertyOf(object) {
      return function(path) {
        return object == null ? undefined : baseGet(object, path);
      };
    }

    /**
     * Creates an array of numbers (positive and/or negative) progressing from
     * `start` up to, but not including, `end`. A step of `-1` is used if a negative
     * `start` is specified without an `end` or `step`. If `end` is not specified,
     * it's set to `start` with `start` then set to `0`.
     *
     * **Note:** JavaScript follows the IEEE-754 standard for resolving
     * floating-point values which can produce unexpected results.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {number} [start=0] The start of the range.
     * @param {number} end The end of the range.
     * @param {number} [step=1] The value to increment or decrement by.
     * @returns {Array} Returns the range of numbers.
     * @see _.inRange, _.rangeRight
     * @example
     *
     * _.range(4);
     * // => [0, 1, 2, 3]
     *
     * _.range(-4);
     * // => [0, -1, -2, -3]
     *
     * _.range(1, 5);
     * // => [1, 2, 3, 4]
     *
     * _.range(0, 20, 5);
     * // => [0, 5, 10, 15]
     *
     * _.range(0, -4, -1);
     * // => [0, -1, -2, -3]
     *
     * _.range(1, 4, 0);
     * // => [1, 1, 1]
     *
     * _.range(0);
     * // => []
     */
    var range = createRange();

    /**
     * This method is like `_.range` except that it populates values in
     * descending order.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {number} [start=0] The start of the range.
     * @param {number} end The end of the range.
     * @param {number} [step=1] The value to increment or decrement by.
     * @returns {Array} Returns the range of numbers.
     * @see _.inRange, _.range
     * @example
     *
     * _.rangeRight(4);
     * // => [3, 2, 1, 0]
     *
     * _.rangeRight(-4);
     * // => [-3, -2, -1, 0]
     *
     * _.rangeRight(1, 5);
     * // => [4, 3, 2, 1]
     *
     * _.rangeRight(0, 20, 5);
     * // => [15, 10, 5, 0]
     *
     * _.rangeRight(0, -4, -1);
     * // => [-3, -2, -1, 0]
     *
     * _.rangeRight(1, 4, 0);
     * // => [1, 1, 1]
     *
     * _.rangeRight(0);
     * // => []
     */
    var rangeRight = createRange(true);

    /**
     * This method returns a new empty array.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {Array} Returns the new empty array.
     * @example
     *
     * var arrays = _.times(2, _.stubArray);
     *
     * console.log(arrays);
     * // => [[], []]
     *
     * console.log(arrays[0] === arrays[1]);
     * // => false
     */
    function stubArray() {
      return [];
    }

    /**
     * This method returns `false`.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {boolean} Returns `false`.
     * @example
     *
     * _.times(2, _.stubFalse);
     * // => [false, false]
     */
    function stubFalse() {
      return false;
    }

    /**
     * This method returns a new empty object.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {Object} Returns the new empty object.
     * @example
     *
     * var objects = _.times(2, _.stubObject);
     *
     * console.log(objects);
     * // => [{}, {}]
     *
     * console.log(objects[0] === objects[1]);
     * // => false
     */
    function stubObject() {
      return {};
    }

    /**
     * This method returns an empty string.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {string} Returns the empty string.
     * @example
     *
     * _.times(2, _.stubString);
     * // => ['', '']
     */
    function stubString() {
      return '';
    }

    /**
     * This method returns `true`.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {boolean} Returns `true`.
     * @example
     *
     * _.times(2, _.stubTrue);
     * // => [true, true]
     */
    function stubTrue() {
      return true;
    }

    /**
     * Invokes the iteratee `n` times, returning an array of the results of
     * each invocation. The iteratee is invoked with one argument; (index).
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {number} n The number of times to invoke `iteratee`.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the array of results.
     * @example
     *
     * _.times(3, String);
     * // => ['0', '1', '2']
     *
     *  _.times(4, _.constant(0));
     * // => [0, 0, 0, 0]
     */
    function times(n, iteratee) {
      n = toInteger(n);
      if (n < 1 || n > MAX_SAFE_INTEGER) {
        return [];
      }
      var index = MAX_ARRAY_LENGTH,
          length = nativeMin(n, MAX_ARRAY_LENGTH);

      iteratee = getIteratee(iteratee);
      n -= MAX_ARRAY_LENGTH;

      var result = baseTimes(length, iteratee);
      while (++index < n) {
        iteratee(index);
      }
      return result;
    }

    /**
     * Converts `value` to a property path array.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {*} value The value to convert.
     * @returns {Array} Returns the new property path array.
     * @example
     *
     * _.toPath('a.b.c');
     * // => ['a', 'b', 'c']
     *
     * _.toPath('a[0].b.c');
     * // => ['a', '0', 'b', 'c']
     */
    function toPath(value) {
      if (isArray(value)) {
        return arrayMap(value, toKey);
      }
      return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));
    }

    /**
     * Generates a unique ID. If `prefix` is given, the ID is appended to it.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {string} [prefix=''] The value to prefix the ID with.
     * @returns {string} Returns the unique ID.
     * @example
     *
     * _.uniqueId('contact_');
     * // => 'contact_104'
     *
     * _.uniqueId();
     * // => '105'
     */
    function uniqueId(prefix) {
      var id = ++idCounter;
      return toString(prefix) + id;
    }

    /*------------------------------------------------------------------------*/

    /**
     * Adds two numbers.
     *
     * @static
     * @memberOf _
     * @since 3.4.0
     * @category Math
     * @param {number} augend The first number in an addition.
     * @param {number} addend The second number in an addition.
     * @returns {number} Returns the total.
     * @example
     *
     * _.add(6, 4);
     * // => 10
     */
    var add = createMathOperation(function(augend, addend) {
      return augend + addend;
    }, 0);

    /**
     * Computes `number` rounded up to `precision`.
     *
     * @static
     * @memberOf _
     * @since 3.10.0
     * @category Math
     * @param {number} number The number to round up.
     * @param {number} [precision=0] The precision to round up to.
     * @returns {number} Returns the rounded up number.
     * @example
     *
     * _.ceil(4.006);
     * // => 5
     *
     * _.ceil(6.004, 2);
     * // => 6.01
     *
     * _.ceil(6040, -2);
     * // => 6100
     */
    var ceil = createRound('ceil');

    /**
     * Divide two numbers.
     *
     * @static
     * @memberOf _
     * @since 4.7.0
     * @category Math
     * @param {number} dividend The first number in a division.
     * @param {number} divisor The second number in a division.
     * @returns {number} Returns the quotient.
     * @example
     *
     * _.divide(6, 4);
     * // => 1.5
     */
    var divide = createMathOperation(function(dividend, divisor) {
      return dividend / divisor;
    }, 1);

    /**
     * Computes `number` rounded down to `precision`.
     *
     * @static
     * @memberOf _
     * @since 3.10.0
     * @category Math
     * @param {number} number The number to round down.
     * @param {number} [precision=0] The precision to round down to.
     * @returns {number} Returns the rounded down number.
     * @example
     *
     * _.floor(4.006);
     * // => 4
     *
     * _.floor(0.046, 2);
     * // => 0.04
     *
     * _.floor(4060, -2);
     * // => 4000
     */
    var floor = createRound('floor');

    /**
     * Computes the maximum value of `array`. If `array` is empty or falsey,
     * `undefined` is returned.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Math
     * @param {Array} array The array to iterate over.
     * @returns {*} Returns the maximum value.
     * @example
     *
     * _.max([4, 2, 8, 6]);
     * // => 8
     *
     * _.max([]);
     * // => undefined
     */
    function max(array) {
      return (array && array.length)
        ? baseExtremum(array, identity, baseGt)
        : undefined;
    }

    /**
     * This method is like `_.max` except that it accepts `iteratee` which is
     * invoked for each element in `array` to generate the criterion by which
     * the value is ranked. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {*} Returns the maximum value.
     * @example
     *
     * var objects = [{ 'n': 1 }, { 'n': 2 }];
     *
     * _.maxBy(objects, function(o) { return o.n; });
     * // => { 'n': 2 }
     *
     * // The `_.property` iteratee shorthand.
     * _.maxBy(objects, 'n');
     * // => { 'n': 2 }
     */
    function maxBy(array, iteratee) {
      return (array && array.length)
        ? baseExtremum(array, getIteratee(iteratee, 2), baseGt)
        : undefined;
    }

    /**
     * Computes the mean of the values in `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @returns {number} Returns the mean.
     * @example
     *
     * _.mean([4, 2, 8, 6]);
     * // => 5
     */
    function mean(array) {
      return baseMean(array, identity);
    }

    /**
     * This method is like `_.mean` except that it accepts `iteratee` which is
     * invoked for each element in `array` to generate the value to be averaged.
     * The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.7.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {number} Returns the mean.
     * @example
     *
     * var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
     *
     * _.meanBy(objects, function(o) { return o.n; });
     * // => 5
     *
     * // The `_.property` iteratee shorthand.
     * _.meanBy(objects, 'n');
     * // => 5
     */
    function meanBy(array, iteratee) {
      return baseMean(array, getIteratee(iteratee, 2));
    }

    /**
     * Computes the minimum value of `array`. If `array` is empty or falsey,
     * `undefined` is returned.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Math
     * @param {Array} array The array to iterate over.
     * @returns {*} Returns the minimum value.
     * @example
     *
     * _.min([4, 2, 8, 6]);
     * // => 2
     *
     * _.min([]);
     * // => undefined
     */
    function min(array) {
      return (array && array.length)
        ? baseExtremum(array, identity, baseLt)
        : undefined;
    }

    /**
     * This method is like `_.min` except that it accepts `iteratee` which is
     * invoked for each element in `array` to generate the criterion by which
     * the value is ranked. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {*} Returns the minimum value.
     * @example
     *
     * var objects = [{ 'n': 1 }, { 'n': 2 }];
     *
     * _.minBy(objects, function(o) { return o.n; });
     * // => { 'n': 1 }
     *
     * // The `_.property` iteratee shorthand.
     * _.minBy(objects, 'n');
     * // => { 'n': 1 }
     */
    function minBy(array, iteratee) {
      return (array && array.length)
        ? baseExtremum(array, getIteratee(iteratee, 2), baseLt)
        : undefined;
    }

    /**
     * Multiply two numbers.
     *
     * @static
     * @memberOf _
     * @since 4.7.0
     * @category Math
     * @param {number} multiplier The first number in a multiplication.
     * @param {number} multiplicand The second number in a multiplication.
     * @returns {number} Returns the product.
     * @example
     *
     * _.multiply(6, 4);
     * // => 24
     */
    var multiply = createMathOperation(function(multiplier, multiplicand) {
      return multiplier * multiplicand;
    }, 1);

    /**
     * Computes `number` rounded to `precision`.
     *
     * @static
     * @memberOf _
     * @since 3.10.0
     * @category Math
     * @param {number} number The number to round.
     * @param {number} [precision=0] The precision to round to.
     * @returns {number} Returns the rounded number.
     * @example
     *
     * _.round(4.006);
     * // => 4
     *
     * _.round(4.006, 2);
     * // => 4.01
     *
     * _.round(4060, -2);
     * // => 4100
     */
    var round = createRound('round');

    /**
     * Subtract two numbers.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Math
     * @param {number} minuend The first number in a subtraction.
     * @param {number} subtrahend The second number in a subtraction.
     * @returns {number} Returns the difference.
     * @example
     *
     * _.subtract(6, 4);
     * // => 2
     */
    var subtract = createMathOperation(function(minuend, subtrahend) {
      return minuend - subtrahend;
    }, 0);

    /**
     * Computes the sum of the values in `array`.
     *
     * @static
     * @memberOf _
     * @since 3.4.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @returns {number} Returns the sum.
     * @example
     *
     * _.sum([4, 2, 8, 6]);
     * // => 20
     */
    function sum(array) {
      return (array && array.length)
        ? baseSum(array, identity)
        : 0;
    }

    /**
     * This method is like `_.sum` except that it accepts `iteratee` which is
     * invoked for each element in `array` to generate the value to be summed.
     * The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {number} Returns the sum.
     * @example
     *
     * var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
     *
     * _.sumBy(objects, function(o) { return o.n; });
     * // => 20
     *
     * // The `_.property` iteratee shorthand.
     * _.sumBy(objects, 'n');
     * // => 20
     */
    function sumBy(array, iteratee) {
      return (array && array.length)
        ? baseSum(array, getIteratee(iteratee, 2))
        : 0;
    }

    /*------------------------------------------------------------------------*/

    // Add methods that return wrapped values in chain sequences.
    lodash.after = after;
    lodash.ary = ary;
    lodash.assign = assign;
    lodash.assignIn = assignIn;
    lodash.assignInWith = assignInWith;
    lodash.assignWith = assignWith;
    lodash.at = at;
    lodash.before = before;
    lodash.bind = bind;
    lodash.bindAll = bindAll;
    lodash.bindKey = bindKey;
    lodash.castArray = castArray;
    lodash.chain = chain;
    lodash.chunk = chunk;
    lodash.compact = compact;
    lodash.concat = concat;
    lodash.cond = cond;
    lodash.conforms = conforms;
    lodash.constant = constant;
    lodash.countBy = countBy;
    lodash.create = create;
    lodash.curry = curry;
    lodash.curryRight = curryRight;
    lodash.debounce = debounce;
    lodash.defaults = defaults;
    lodash.defaultsDeep = defaultsDeep;
    lodash.defer = defer;
    lodash.delay = delay;
    lodash.difference = difference;
    lodash.differenceBy = differenceBy;
    lodash.differenceWith = differenceWith;
    lodash.drop = drop;
    lodash.dropRight = dropRight;
    lodash.dropRightWhile = dropRightWhile;
    lodash.dropWhile = dropWhile;
    lodash.fill = fill;
    lodash.filter = filter;
    lodash.flatMap = flatMap;
    lodash.flatMapDeep = flatMapDeep;
    lodash.flatMapDepth = flatMapDepth;
    lodash.flatten = flatten;
    lodash.flattenDeep = flattenDeep;
    lodash.flattenDepth = flattenDepth;
    lodash.flip = flip;
    lodash.flow = flow;
    lodash.flowRight = flowRight;
    lodash.fromPairs = fromPairs;
    lodash.functions = functions;
    lodash.functionsIn = functionsIn;
    lodash.groupBy = groupBy;
    lodash.initial = initial;
    lodash.intersection = intersection;
    lodash.intersectionBy = intersectionBy;
    lodash.intersectionWith = intersectionWith;
    lodash.invert = invert;
    lodash.invertBy = invertBy;
    lodash.invokeMap = invokeMap;
    lodash.iteratee = iteratee;
    lodash.keyBy = keyBy;
    lodash.keys = keys;
    lodash.keysIn = keysIn;
    lodash.map = map;
    lodash.mapKeys = mapKeys;
    lodash.mapValues = mapValues;
    lodash.matches = matches;
    lodash.matchesProperty = matchesProperty;
    lodash.memoize = memoize;
    lodash.merge = merge;
    lodash.mergeWith = mergeWith;
    lodash.method = method;
    lodash.methodOf = methodOf;
    lodash.mixin = mixin;
    lodash.negate = negate;
    lodash.nthArg = nthArg;
    lodash.omit = omit;
    lodash.omitBy = omitBy;
    lodash.once = once;
    lodash.orderBy = orderBy;
    lodash.over = over;
    lodash.overArgs = overArgs;
    lodash.overEvery = overEvery;
    lodash.overSome = overSome;
    lodash.partial = partial;
    lodash.partialRight = partialRight;
    lodash.partition = partition;
    lodash.pick = pick;
    lodash.pickBy = pickBy;
    lodash.property = property;
    lodash.propertyOf = propertyOf;
    lodash.pull = pull;
    lodash.pullAll = pullAll;
    lodash.pullAllBy = pullAllBy;
    lodash.pullAllWith = pullAllWith;
    lodash.pullAt = pullAt;
    lodash.range = range;
    lodash.rangeRight = rangeRight;
    lodash.rearg = rearg;
    lodash.reject = reject;
    lodash.remove = remove;
    lodash.rest = rest;
    lodash.reverse = reverse;
    lodash.sampleSize = sampleSize;
    lodash.set = set;
    lodash.setWith = setWith;
    lodash.shuffle = shuffle;
    lodash.slice = slice;
    lodash.sortBy = sortBy;
    lodash.sortedUniq = sortedUniq;
    lodash.sortedUniqBy = sortedUniqBy;
    lodash.split = split;
    lodash.spread = spread;
    lodash.tail = tail;
    lodash.take = take;
    lodash.takeRight = takeRight;
    lodash.takeRightWhile = takeRightWhile;
    lodash.takeWhile = takeWhile;
    lodash.tap = tap;
    lodash.throttle = throttle;
    lodash.thru = thru;
    lodash.toArray = toArray;
    lodash.toPairs = toPairs;
    lodash.toPairsIn = toPairsIn;
    lodash.toPath = toPath;
    lodash.toPlainObject = toPlainObject;
    lodash.transform = transform;
    lodash.unary = unary;
    lodash.union = union;
    lodash.unionBy = unionBy;
    lodash.unionWith = unionWith;
    lodash.uniq = uniq;
    lodash.uniqBy = uniqBy;
    lodash.uniqWith = uniqWith;
    lodash.unset = unset;
    lodash.unzip = unzip;
    lodash.unzipWith = unzipWith;
    lodash.update = update;
    lodash.updateWith = updateWith;
    lodash.values = values;
    lodash.valuesIn = valuesIn;
    lodash.without = without;
    lodash.words = words;
    lodash.wrap = wrap;
    lodash.xor = xor;
    lodash.xorBy = xorBy;
    lodash.xorWith = xorWith;
    lodash.zip = zip;
    lodash.zipObject = zipObject;
    lodash.zipObjectDeep = zipObjectDeep;
    lodash.zipWith = zipWith;

    // Add aliases.
    lodash.entries = toPairs;
    lodash.entriesIn = toPairsIn;
    lodash.extend = assignIn;
    lodash.extendWith = assignInWith;

    // Add methods to `lodash.prototype`.
    mixin(lodash, lodash);

    /*------------------------------------------------------------------------*/

    // Add methods that return unwrapped values in chain sequences.
    lodash.add = add;
    lodash.attempt = attempt;
    lodash.camelCase = camelCase;
    lodash.capitalize = capitalize;
    lodash.ceil = ceil;
    lodash.clamp = clamp;
    lodash.clone = clone;
    lodash.cloneDeep = cloneDeep;
    lodash.cloneDeepWith = cloneDeepWith;
    lodash.cloneWith = cloneWith;
    lodash.conformsTo = conformsTo;
    lodash.deburr = deburr;
    lodash.defaultTo = defaultTo;
    lodash.divide = divide;
    lodash.endsWith = endsWith;
    lodash.eq = eq;
    lodash.escape = escape;
    lodash.escapeRegExp = escapeRegExp;
    lodash.every = every;
    lodash.find = find;
    lodash.findIndex = findIndex;
    lodash.findKey = findKey;
    lodash.findLast = findLast;
    lodash.findLastIndex = findLastIndex;
    lodash.findLastKey = findLastKey;
    lodash.floor = floor;
    lodash.forEach = forEach;
    lodash.forEachRight = forEachRight;
    lodash.forIn = forIn;
    lodash.forInRight = forInRight;
    lodash.forOwn = forOwn;
    lodash.forOwnRight = forOwnRight;
    lodash.get = get;
    lodash.gt = gt;
    lodash.gte = gte;
    lodash.has = has;
    lodash.hasIn = hasIn;
    lodash.head = head;
    lodash.identity = identity;
    lodash.includes = includes;
    lodash.indexOf = indexOf;
    lodash.inRange = inRange;
    lodash.invoke = invoke;
    lodash.isArguments = isArguments;
    lodash.isArray = isArray;
    lodash.isArrayBuffer = isArrayBuffer;
    lodash.isArrayLike = isArrayLike;
    lodash.isArrayLikeObject = isArrayLikeObject;
    lodash.isBoolean = isBoolean;
    lodash.isBuffer = isBuffer;
    lodash.isDate = isDate;
    lodash.isElement = isElement;
    lodash.isEmpty = isEmpty;
    lodash.isEqual = isEqual;
    lodash.isEqualWith = isEqualWith;
    lodash.isError = isError;
    lodash.isFinite = isFinite;
    lodash.isFunction = isFunction;
    lodash.isInteger = isInteger;
    lodash.isLength = isLength;
    lodash.isMap = isMap;
    lodash.isMatch = isMatch;
    lodash.isMatchWith = isMatchWith;
    lodash.isNaN = isNaN;
    lodash.isNative = isNative;
    lodash.isNil = isNil;
    lodash.isNull = isNull;
    lodash.isNumber = isNumber;
    lodash.isObject = isObject;
    lodash.isObjectLike = isObjectLike;
    lodash.isPlainObject = isPlainObject;
    lodash.isRegExp = isRegExp;
    lodash.isSafeInteger = isSafeInteger;
    lodash.isSet = isSet;
    lodash.isString = isString;
    lodash.isSymbol = isSymbol;
    lodash.isTypedArray = isTypedArray;
    lodash.isUndefined = isUndefined;
    lodash.isWeakMap = isWeakMap;
    lodash.isWeakSet = isWeakSet;
    lodash.join = join;
    lodash.kebabCase = kebabCase;
    lodash.last = last;
    lodash.lastIndexOf = lastIndexOf;
    lodash.lowerCase = lowerCase;
    lodash.lowerFirst = lowerFirst;
    lodash.lt = lt;
    lodash.lte = lte;
    lodash.max = max;
    lodash.maxBy = maxBy;
    lodash.mean = mean;
    lodash.meanBy = meanBy;
    lodash.min = min;
    lodash.minBy = minBy;
    lodash.stubArray = stubArray;
    lodash.stubFalse = stubFalse;
    lodash.stubObject = stubObject;
    lodash.stubString = stubString;
    lodash.stubTrue = stubTrue;
    lodash.multiply = multiply;
    lodash.nth = nth;
    lodash.noConflict = noConflict;
    lodash.noop = noop;
    lodash.now = now;
    lodash.pad = pad;
    lodash.padEnd = padEnd;
    lodash.padStart = padStart;
    lodash.parseInt = parseInt;
    lodash.random = random;
    lodash.reduce = reduce;
    lodash.reduceRight = reduceRight;
    lodash.repeat = repeat;
    lodash.replace = replace;
    lodash.result = result;
    lodash.round = round;
    lodash.runInContext = runInContext;
    lodash.sample = sample;
    lodash.size = size;
    lodash.snakeCase = snakeCase;
    lodash.some = some;
    lodash.sortedIndex = sortedIndex;
    lodash.sortedIndexBy = sortedIndexBy;
    lodash.sortedIndexOf = sortedIndexOf;
    lodash.sortedLastIndex = sortedLastIndex;
    lodash.sortedLastIndexBy = sortedLastIndexBy;
    lodash.sortedLastIndexOf = sortedLastIndexOf;
    lodash.startCase = startCase;
    lodash.startsWith = startsWith;
    lodash.subtract = subtract;
    lodash.sum = sum;
    lodash.sumBy = sumBy;
    lodash.template = template;
    lodash.times = times;
    lodash.toFinite = toFinite;
    lodash.toInteger = toInteger;
    lodash.toLength = toLength;
    lodash.toLower = toLower;
    lodash.toNumber = toNumber;
    lodash.toSafeInteger = toSafeInteger;
    lodash.toString = toString;
    lodash.toUpper = toUpper;
    lodash.trim = trim;
    lodash.trimEnd = trimEnd;
    lodash.trimStart = trimStart;
    lodash.truncate = truncate;
    lodash.unescape = unescape;
    lodash.uniqueId = uniqueId;
    lodash.upperCase = upperCase;
    lodash.upperFirst = upperFirst;

    // Add aliases.
    lodash.each = forEach;
    lodash.eachRight = forEachRight;
    lodash.first = head;

    mixin(lodash, (function() {
      var source = {};
      baseForOwn(lodash, function(func, methodName) {
        if (!hasOwnProperty.call(lodash.prototype, methodName)) {
          source[methodName] = func;
        }
      });
      return source;
    }()), { 'chain': false });

    /*------------------------------------------------------------------------*/

    /**
     * The semantic version number.
     *
     * @static
     * @memberOf _
     * @type {string}
     */
    lodash.VERSION = VERSION;

    // Assign default placeholders.
    arrayEach(['bind', 'bindKey', 'curry', 'curryRight', 'partial', 'partialRight'], function(methodName) {
      lodash[methodName].placeholder = lodash;
    });

    // Add `LazyWrapper` methods for `_.drop` and `_.take` variants.
    arrayEach(['drop', 'take'], function(methodName, index) {
      LazyWrapper.prototype[methodName] = function(n) {
        n = n === undefined ? 1 : nativeMax(toInteger(n), 0);

        var result = (this.__filtered__ && !index)
          ? new LazyWrapper(this)
          : this.clone();

        if (result.__filtered__) {
          result.__takeCount__ = nativeMin(n, result.__takeCount__);
        } else {
          result.__views__.push({
            'size': nativeMin(n, MAX_ARRAY_LENGTH),
            'type': methodName + (result.__dir__ < 0 ? 'Right' : '')
          });
        }
        return result;
      };

      LazyWrapper.prototype[methodName + 'Right'] = function(n) {
        return this.reverse()[methodName](n).reverse();
      };
    });

    // Add `LazyWrapper` methods that accept an `iteratee` value.
    arrayEach(['filter', 'map', 'takeWhile'], function(methodName, index) {
      var type = index + 1,
          isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;

      LazyWrapper.prototype[methodName] = function(iteratee) {
        var result = this.clone();
        result.__iteratees__.push({
          'iteratee': getIteratee(iteratee, 3),
          'type': type
        });
        result.__filtered__ = result.__filtered__ || isFilter;
        return result;
      };
    });

    // Add `LazyWrapper` methods for `_.head` and `_.last`.
    arrayEach(['head', 'last'], function(methodName, index) {
      var takeName = 'take' + (index ? 'Right' : '');

      LazyWrapper.prototype[methodName] = function() {
        return this[takeName](1).value()[0];
      };
    });

    // Add `LazyWrapper` methods for `_.initial` and `_.tail`.
    arrayEach(['initial', 'tail'], function(methodName, index) {
      var dropName = 'drop' + (index ? '' : 'Right');

      LazyWrapper.prototype[methodName] = function() {
        return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
      };
    });

    LazyWrapper.prototype.compact = function() {
      return this.filter(identity);
    };

    LazyWrapper.prototype.find = function(predicate) {
      return this.filter(predicate).head();
    };

    LazyWrapper.prototype.findLast = function(predicate) {
      return this.reverse().find(predicate);
    };

    LazyWrapper.prototype.invokeMap = baseRest(function(path, args) {
      if (typeof path == 'function') {
        return new LazyWrapper(this);
      }
      return this.map(function(value) {
        return baseInvoke(value, path, args);
      });
    });

    LazyWrapper.prototype.reject = function(predicate) {
      return this.filter(negate(getIteratee(predicate)));
    };

    LazyWrapper.prototype.slice = function(start, end) {
      start = toInteger(start);

      var result = this;
      if (result.__filtered__ && (start > 0 || end < 0)) {
        return new LazyWrapper(result);
      }
      if (start < 0) {
        result = result.takeRight(-start);
      } else if (start) {
        result = result.drop(start);
      }
      if (end !== undefined) {
        end = toInteger(end);
        result = end < 0 ? result.dropRight(-end) : result.take(end - start);
      }
      return result;
    };

    LazyWrapper.prototype.takeRightWhile = function(predicate) {
      return this.reverse().takeWhile(predicate).reverse();
    };

    LazyWrapper.prototype.toArray = function() {
      return this.take(MAX_ARRAY_LENGTH);
    };

    // Add `LazyWrapper` methods to `lodash.prototype`.
    baseForOwn(LazyWrapper.prototype, function(func, methodName) {
      var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName),
          isTaker = /^(?:head|last)$/.test(methodName),
          lodashFunc = lodash[isTaker ? ('take' + (methodName == 'last' ? 'Right' : '')) : methodName],
          retUnwrapped = isTaker || /^find/.test(methodName);

      if (!lodashFunc) {
        return;
      }
      lodash.prototype[methodName] = function() {
        var value = this.__wrapped__,
            args = isTaker ? [1] : arguments,
            isLazy = value instanceof LazyWrapper,
            iteratee = args[0],
            useLazy = isLazy || isArray(value);

        var interceptor = function(value) {
          var result = lodashFunc.apply(lodash, arrayPush([value], args));
          return (isTaker && chainAll) ? result[0] : result;
        };

        if (useLazy && checkIteratee && typeof iteratee == 'function' && iteratee.length != 1) {
          // Avoid lazy use if the iteratee has a "length" value other than `1`.
          isLazy = useLazy = false;
        }
        var chainAll = this.__chain__,
            isHybrid = !!this.__actions__.length,
            isUnwrapped = retUnwrapped && !chainAll,
            onlyLazy = isLazy && !isHybrid;

        if (!retUnwrapped && useLazy) {
          value = onlyLazy ? value : new LazyWrapper(this);
          var result = func.apply(value, args);
          result.__actions__.push({ 'func': thru, 'args': [interceptor], 'thisArg': undefined });
          return new LodashWrapper(result, chainAll);
        }
        if (isUnwrapped && onlyLazy) {
          return func.apply(this, args);
        }
        result = this.thru(interceptor);
        return isUnwrapped ? (isTaker ? result.value()[0] : result.value()) : result;
      };
    });

    // Add `Array` methods to `lodash.prototype`.
    arrayEach(['pop', 'push', 'shift', 'sort', 'splice', 'unshift'], function(methodName) {
      var func = arrayProto[methodName],
          chainName = /^(?:push|sort|unshift)$/.test(methodName) ? 'tap' : 'thru',
          retUnwrapped = /^(?:pop|shift)$/.test(methodName);

      lodash.prototype[methodName] = function() {
        var args = arguments;
        if (retUnwrapped && !this.__chain__) {
          var value = this.value();
          return func.apply(isArray(value) ? value : [], args);
        }
        return this[chainName](function(value) {
          return func.apply(isArray(value) ? value : [], args);
        });
      };
    });

    // Map minified method names to their real names.
    baseForOwn(LazyWrapper.prototype, function(func, methodName) {
      var lodashFunc = lodash[methodName];
      if (lodashFunc) {
        var key = (lodashFunc.name + ''),
            names = realNames[key] || (realNames[key] = []);

        names.push({ 'name': methodName, 'func': lodashFunc });
      }
    });

    realNames[createHybrid(undefined, WRAP_BIND_KEY_FLAG).name] = [{
      'name': 'wrapper',
      'func': undefined
    }];

    // Add methods to `LazyWrapper`.
    LazyWrapper.prototype.clone = lazyClone;
    LazyWrapper.prototype.reverse = lazyReverse;
    LazyWrapper.prototype.value = lazyValue;

    // Add chain sequence methods to the `lodash` wrapper.
    lodash.prototype.at = wrapperAt;
    lodash.prototype.chain = wrapperChain;
    lodash.prototype.commit = wrapperCommit;
    lodash.prototype.next = wrapperNext;
    lodash.prototype.plant = wrapperPlant;
    lodash.prototype.reverse = wrapperReverse;
    lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;

    // Add lazy aliases.
    lodash.prototype.first = lodash.prototype.head;

    if (symIterator) {
      lodash.prototype[symIterator] = wrapperToIterator;
    }
    return lodash;
  });

  /*--------------------------------------------------------------------------*/

  // Export lodash.
  var _ = runInContext();

  // Some AMD build optimizers, like r.js, check for condition patterns like:
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    // Expose Lodash on the global object to prevent errors when Lodash is
    // loaded by a script tag in the presence of an AMD loader.
    // See http://requirejs.org/docs/errors.html#mismatch for more details.
    // Use `_.noConflict` to remove Lodash from the global object.
    root._ = _;

    // Define as an anonymous module so, through path mapping, it can be
    // referenced as the "underscore" module.
    define(function() {
      return _;
    });
  }
  // Check for `exports` after `define` in case a build optimizer adds it.
  else if (freeModule) {
    // Export for Node.js.
    (freeModule.exports = _)._ = _;
    // Export for CommonJS support.
    freeExports._ = _;
  }
  else {
    // Export to the global object.
    root._ = _;
  }
}.call(this));

//--------------------------------------------------------------------------------
//- Custom Stuff
//--------------------------------------------------------------------------------

// Namespace for all custom edits to this script
var CE = {};

// Load Cache
CE.config = JSON.parse(localStorage.getItem("CEConfig")) || {};
CE.mapCache = JSON.parse(localStorage.getItem("CEMap")) || {};
CE.nameCache = JSON.parse(localStorage.getItem("CENames")) || {};
CE.deathCache = JSON.parse(localStorage.getItem("CEDeath")) || {};

// key==spriteId, data=={can_stack} --dumbest initialization we have but game's data doesn't know this...
CE.itemCache = JSON.parse(localStorage.getItem("CEItems")) || {"0":{"can_stack":0},"1":{"can_stack":1},"25":{"can_stack":0},"29":{"can_stack":1},"69":{"can_stack":0},"74":{"can_stack":1},"75":{"can_stack":1},"77":{"can_stack":1},"243":{"can_stack":0},"248":{"can_stack":0},"249":{"can_stack":1},"257":{"can_stack":0},"258":{"can_stack":0},"260":{"can_stack":0},"261":{"can_stack":0},"277":{"can_stack":0},"285":{"can_stack":0},"288":{"can_stack":0},"290":{"can_stack":0},"293":{"can_stack":0},"294":{"can_stack":0},"307":{"can_stack":0},"308":{"can_stack":0},"309":{"can_stack":0},"311":{"can_stack":0},"314":{"can_stack":0},"316":{"can_stack":1},"321":{"can_stack":1},"325":{"can_stack":0},"326":{"can_stack":0},"328":{"can_stack":0},"337":{"can_stack":0},"338":{"can_stack":0},"342":{"can_stack":0},"344":{"can_stack":0},"346":{"can_stack":0},"353":{"can_stack":0},"430":{"can_stack":1},"459":{"can_stack":0},"464":{"can_stack":0},"466":{"can_stack":0},"472":{"can_stack":0},"474":{"can_stack":1},"480":{"can_stack":0},"482":{"can_stack":0},"483":{"can_stack":0},"484":{"can_stack":0},"486":{"can_stack":1},"494":{"can_stack":1},"498":{"can_stack":1},"500":{"can_stack":1},"507":{"can_stack":0},"513":{"can_stack":0},"517":{"can_stack":1},"518":{"can_stack":0},"520":{"can_stack":0},"529":{"can_stack":0},"530":{"can_stack":0},"537":{"can_stack":1},"538":{"can_stack":1},"539":{"can_stack":1},"556":{"can_stack":0},"557":{"can_stack":0},"562":{"can_stack":1},"564":{"can_stack":1},"566":{"can_stack":1},"580":{"can_stack":0},"587":{"can_stack":1},"588":{"can_stack":1},"589":{"can_stack":1},"592":{"can_stack":1},"593":{"can_stack":1},"594":{"can_stack":1},"608":{"can_stack":1},"610":{"can_stack":1},"611":{"can_stack":1},"612":{"can_stack":1},"614":{"can_stack":1},"616":{"can_stack":1},"618":{"can_stack":1},"629":{"can_stack":0},"633":{"can_stack":1},"665":{"can_stack":1},"673":{"can_stack":0},"675":{"can_stack":0},"677":{"can_stack":0},"680":{"can_stack":0},"681":{"can_stack":0},"683":{"can_stack":0},"685":{"can_stack":0},"686":{"can_stack":0},"687":{"can_stack":0},"689":{"can_stack":0},"690":{"can_stack":0},"694":{"can_stack":0},"696":{"can_stack":0},"697":{"can_stack":0},"698":{"can_stack":1},"699":{"can_stack":1},"700":{"can_stack":1},"701":{"can_stack":1},"703":{"can_stack":0},"704":{"can_stack":0},"705":{"can_stack":0},"706":{"can_stack":0},"707":{"can_stack":0},"708":{"can_stack":0},"711":{"can_stack":0},"713":{"can_stack":0},"714":{"can_stack":0},"715":{"can_stack":0},"716":{"can_stack":0},"717":{"can_stack":0},"718":{"can_stack":0},"719":{"can_stack":0},"720":{"can_stack":0},"722":{"can_stack":1},"723":{"can_stack":1},"726":{"can_stack":0},"729":{"can_stack":0},"731":{"can_stack":1},"732":{"can_stack":0},"733":{"can_stack":0},"734":{"can_stack":0},"735":{"can_stack":0},"736":{"can_stack":1},"737":{"can_stack":1},"738":{"can_stack":0},"739":{"can_stack":0},"740":{"can_stack":0},"741":{"can_stack":0},"742":{"can_stack":0},"748":{"can_stack":0},"749":{"can_stack":0},"750":{"can_stack":0},"751":{"can_stack":0},"752":{"can_stack":0},"753":{"can_stack":0},"754":{"can_stack":0},"755":{"can_stack":0},"756":{"can_stack":0},"757":{"can_stack":1},"758":{"can_stack":1},"759":{"can_stack":1},"760":{"can_stack":1},"761":{"can_stack":1},"762":{"can_stack":1},"763":{"can_stack":1},"764":{"can_stack":1},"765":{"can_stack":1},"766":{"can_stack":1},"767":{"can_stack":1},"776":{"can_stack":1},"786":{"can_stack":0},"787":{"can_stack":0},"788":{"can_stack":1},"789":{"can_stack":0},"790":{"can_stack":0},"796":{"can_stack":1},"806":{"can_stack":1},"809":{"can_stack":1},"823":{"can_stack":1},"824":{"can_stack":1},"825":{"can_stack":1},"833":{"can_stack":0},"849":{"can_stack":0},"850":{"can_stack":0},"890":{"can_stack":0},"919":{"can_stack":1},"928":{"can_stack":0},"929":{"can_stack":0},"931":{"can_stack":0},"937":{"can_stack":1},"941":{"can_stack":0},"945":{"can_stack":0},"961":{"can_stack":0},"984":{"can_stack":0},"-526":{"can_stack":1},"-486":{"can_stack":0},"-356":{"can_stack":0},"-177":{"can_stack":1},"-577":{"can_stack":1},"-576":{"can_stack":1},"-989":{"can_stack":1},"-1016":{"can_stack":1},"-246":{"can_stack":1},"-965":{"can_stack":1},"-97":{"can_stack":1},"-99":{"can_stack":1},"-82":{"can_stack":1},"-81":{"can_stack":1},"-103":{"can_stack":1},"-608":{"can_stack":1},"-104":{"can_stack":1},"-120":{"can_stack":1},"-115":{"can_stack":1},"-83":{"can_stack":1},"-113":{"can_stack":1},"-119":{"can_stack":1},"-114":{"can_stack":1},"-1000":{"can_stack":1},"-38":{"can_stack":1}};


CE.toggleConfig = function(configName) {
    let v = !CE.config[configName]
    CE.config[configName] = v
    let log = "Set " + configName + ": " + v + ""
    console.log(log)
    append(log)
}

CE.configToggle = (configName) => () => CE.toggleConfig(configName)


// Initialize Configuration
CE.initConfig = function(){
    let c = CE.config;
    
    if (c.debugTiles == null) c.debugTiles = true;
    if (c.onlyDebugStyledTiles == null) c.onlyDebugStyledTiles = true;
    if (c.debugKeys == null) c.debugKeys = false;
    if (c.autoHeal == null) c.autoHeal = true;
    if (c.autoUpgrade == null) c.autoUpgrade = false;
    if (c.autoTarget == null) c.autoTarget = true;
    
    if (c.filters == null) c.filters = ["Aloe Seed", "Animal Gate", "Arrow Tower", "Bed", "Bellows", "Berry Bush", "Black Rock", "Blank Paper", "Blue Dye", "Bone", "Bronze", "Bronze Hammer", "Caraway", "Carrot Seed", "Cassiterite", "Charcoal", "Clay", "Clay Bowl", "Clay Floor Kit", "Compass", "Copper", "Copper Dagger", "Copper Dagger", "Coriander", "Dirt", "Dye Bush", "Dye Seed", "Fishing Rod", "Flint", "Grass Band", "Hematite", "Hoe", "Holly Bush", "Holly Seed", "Iron", "Iron Axe", "Iron Dagger", "Iron Spear", "Iron Spear", "Iron Sword", "Lettuce Seed", "Lock", "Mace", "Malachite", "Mud", "Noble Jacket", "Obsidian", "Old Meat", "Old Raw Meat", "Pelt Armor", "Personal Gate", "Plain Rock", "Red Dye", "Rented Gate", "Repair Kit", "Salmonberry Seed", "Shears", "Sign", "Signpost", "Silver", "Spindle", "Stone", "Stone Anvil", "Stone Hammer", "Stone Wall", "Strange Device", "Sweat Catcher", "Tin", "Tinder", "Trading Counter", "Training Dummy", "Tribe Gate", "Tribe Relic", "Water Bucket", "Weld", "Woad", "Wood", "Wood Wall", "Wooden Bucket", "Wooden Buckler", "Wooden Chair", "Wooden Mallet", "Wooden Table", "Worms", "Yellow Dye"];

    if (c.styleRules == null) c.styleRules = {
    	"Altar": "background:red; color: white;",
    	"Bone Pile": "background:green; color: white;",
    	"Crystal Rock": "background:blue; color:white;",
    	"Deep Recall": "background:pink; color: white;",
    	"Hole": "background:grey; color: white;",
    	"Odd Chest": "background:purple; color: white;",
    	"Shiny Rock": "background:orange; color: white;",
    	"Stairway": "background:black; color: white;",
    	"Treasure Chest": "background:maroon; color: white;",
	"Spawn": "background:yellow; color: black;",
	"Warp": "",
	"Stairs Up": ""
    }

    // Client Server Communications
    if (c.debugReceived == null) c.debugReceived = false;
    if (c.debugSent == null) c.debugSent = false;

    if (c.updateItemCache == null) c.updateItemCache = false;
    
    // When Fishing, aim for minimum cast rating
    if (c.minCastRating == null) c.minCastRating = "C"

    if (c.unequipBreaking == null) c.unequipBreaking = false
    if (c.autoLoot == null) c.autoLoot = false

    if (c.autoCook == null) c.autoCook = true
    if (c.skipFuelCount == null) c.skipFuelCount = 3

    if (c.spriteOverrides == null) c.spriteOverrides = {
    	"Mud Trap": 768,
    	"Shard Trap": 768,
    	"Hole": 709,
    	"Spawn": 25,
    	"Warp": 833
    }

    if (c.hotKeys == null) c.hotKeys = {
	70: CE.mergeWithFloorPile, // F
	71: CE.lootAll, // G
	72: CE.altarDrop, // H

	// Numpad 1 to 9
	97: CE.configToggle("autoLoot"),
	98: CE.configToggle("unequipBreaking"),
	99: CE.configToggle("autoUpgrade"),
	100: CE.configToggle("autoCaraway"),
	101: CE.configToggle("autoTarget"),
	102: CE.configToggle("autoHeal"),
	103: CE.configToggle("debugSent"),
	104: CE.configToggle("debugReceived"),
	105: CE.configToggle("debugTiles"),
	
	78: CE.glitchSouth, //N
	77: CE.glitchEast //M
    }

    if (c.autoEat == null) c.autoEat = true
    if (c.autoCaraway == null) c.autoCaraway = true


    console.log("config initialized")
}

CE.glitchSouth = function() {
    myself.move(myself.x+1, ""+myself.y)
    myself.move(myself.x, Number(myself.y)+1)
}

CE.glitchEast = function() {
    myself.move(""+myself.x, myself.y+1)
    myself.move(Number(myself.x)+1, myself.y)
}

CE.skills = {
    "archery": "↣",
    "assassin": "💀",
    "axe": "a",
    "chopping": "🌴",
    "clubbing": "🍢",
    "construction": "🏠",
    "cooking": "🍴",
    "crafting": "🔩",
    "dagger": "🔪",
    "destruction": "💣",
    "digging": "d",
    "exploration": "👣",
    "farming": "🌱",
    "fishing": "🐟",
    "foraging": "🌾",
    "hammer": "🔨",
    "healing": "💉",
    "heavy armor": "👔",
    "hunting": "🐰",
    "knitting": "✂️",
    "light armor": "👗",
    "medium armor": "👖",
    "mining": "m",
    "pickaxe": "p",
    "questing": "🌟",
    "repairing": "🔧",
    "research": "📖",
    "shield block": "🏥",
    "smelting": "🔥",
    "smithing": "💎",
    "spear": "s",
    "sword": "⚔",
    "tilling": "t",
    "unarmed": "👊",
    "unarmored": "👙",
    "defense": "D",
    "damage": "X"
}


CE.getPath = function(cachedMap, start, end, maxDist) {
	let unexplored = []
	let explored = {}
	unexplored.push({
		next: "end",
		x: Number(end.x),
		y: Number(end.y),
		dist: 0
	})
	
	while(unexplored.length > 0) {
		let exploring = unexplored[0]
		if(exploring.dist > maxDist) return [null, explored];
		unexplored = unexplored.slice(1)
		let cname = exploring.x+","+exploring.y
		explored[cname] = exploring
		
		if(exploring.x == start.x && exploring.y == start.y)
			return [exploring, explored]
		
		for(dir = 0; dir < 4; dir++) {
			let next = CE.coordAdj(exploring, dir, 1)
			let tname = next.x+","+next.y
			if(explored[tname]) continue;
			let sprite = (tile = map[loc2tile(next.x,next.y)]) != null && tile.spr
			let block = inbounds(next.x, next.y) || (t=map_index[tname]) && t.block ||
				(sprite ? (325 == sprite || cur_wall && sprite == cur_wall) : (cachedMap && (tile = cachedMap[tname]) ? tile.block : true))

			if(!block) {
				unexplored.push({next: cname, x: Number(next.x), y: Number(next.y), dist: exploring.dist+1})
				explored[tname] = true
			}
		}
	}
	
	return [null, explored]
}

CE.farming = false
CE.farmingSeed = "aloe_seed"

CE.getTileInfo = function(coords) {
	if(coords == null) coords = myself
	let indexed = map_index[coords.x+","+coords.y]
	let tile = map[loc2tile(coords.x,coords.y)]
	let spr = tile.spr
	let objects = _.map(indexed.o,(o)=>o && o.name)
		
	return {
		coords: {x:coords.x, y:coords.y},
		indexed: indexed,
		sprite: spr,
		objects: objects,
		tile: tile
	}
}

CE.getSurroundingTilesInfo = function(coords) {
	if(coords == null) coords = myself
	let surroundings = []
	for(dir=0; dir<4; ++dir) {
		surroundings.push(CE.getTileInfo(CE.coordAdj(coords, dir, 1)))
	}
	return surroundings
}

CE.GrassSprites = [21,36] // Grass
CE.ShallowWaterSprites = [121,122,247] // Shallow Water
CE.DeepWaterSprites = [105,106,325,326] // Deep Water
CE.DirtSprites = [22] // dirt
CE.WaterSprites = _.concat(CE.ShallowWaterSprites,CE.DeepWaterSprites)
CE.Plants = [
	"Carrot Seed",
	"Aloe Seed"
]

CE.useToolToward = function(dir, tool) {
	if(myself.dir != dir) {
		console.log("face target")
		send({type: "m", x:myself.x, y:myself.y, d:dir})
	} else if(_.find(item_data, it => it && it.tpl == tool && it.eqp > 0)) {
		console.log("act with " + tool)
		send({type: "A"})
		send({type: "a"})
	} else {
		console.log("equip " + tool)
		// Equip a shovel
		CE.useItem(it => it.tpl == tool)
	}
}

CE.farm = function() {
	if(!CE.farming) return
	
	let surroundings = CE.getSurroundingTilesInfo()
	let selfTile = CE.getTileInfo()
	
	if(CE.DirtSprites.indexOf(selfTile.sprite) != -1 && selfTile.objects.length > 0 &&
	_.findIndex(selfTile.indexed.o, o => o && o.can_pickup) != -1) {
		// loot all items below
		console.log("loot")
		CE.lootAll()
	} else if(CE.DirtSprites.indexOf(selfTile.sprite) != -1 && selfTile.objects.length == 0) {
		// Plant if standing on dirt
		console.log("plant")
		CE.useItem((it) => it.tpl == CE.farmingSeed)
	} else if ((dir = _.findIndex(surroundings, 
		(tileInfo) => 
			(CE.ShallowWaterSprites.indexOf(tileInfo.sprite) != -1 || (CE.DirtSprites.indexOf(tileInfo.sprite) != -1 &&
				_.sumBy(CE.getSurroundingTilesInfo(tileInfo.coords), (tileInfo2) => CE.WaterSprites.indexOf(tileInfo2.sprite) != -1) > 1
			) &&
			_.find(CE.getSurroundingTilesInfo(tileInfo.coords), 
				(tileInfo2) => 
					CE.DeepWaterSprites.indexOf(tileInfo2.sprite) != -1)
		))) != -1) {
		CE.useToolToward(dir, "shovel")
	} else if((dir = _.findIndex(surroundings, 
		(tileInfo) => 
			CE.GrassSprites.indexOf(tileInfo.sprite) != -1
		)) != -1) {
		CE.useToolToward(dir, "hoe")
		
	} else if((dest = _.find(surroundings, 
		(tileInfo) => 
			CE.DirtSprites.indexOf(tileInfo.sprite) != -1 && 
			tileInfo.indexed.block == 0 &&
			_.findIndex(tileInfo.indexed.o, o => o && o.can_pickup == 0 && (o.name.match(/Seed/) || o.name.match(/Pinecone/))) == -1
		))) {
		// Move on empty Dirt or lootable plant, then lootAll
		console.log("move")
		myself.move(dest.coords.x, dest.coords.y)
	} else if((dir = _.findIndex(surroundings, 
		(tileInfo) => 
			CE.DirtSprites.indexOf(tileInfo.sprite) != -1 && 
			tileInfo.indexed.block == 1 &&
			_.findIndex(tileInfo.indexed.o, o => o && o.can_pickup == 0 && o.name.match(/Bush/)) != -1
		)) != -1) {
		CE.useToolToward(dir, "hoe")
	} else if((dir = _.findIndex(surroundings, 
		(tileInfo) => 
			tileInfo.indexed.block == 1 &&
			_.findIndex(tileInfo.indexed.o, o => o && o.can_pickup == 0 && o.name.match(/Tree/)) != -1
		)) != -1) {
			
		if(myself.dir != dir) {
			console.log("face target")
			send({type: "m", x:myself.x, y:myself.y, d:dir})
		} else if(_.find(item_data, it => it.tpl && it.tpl.match(/_axe/) && it.eqp > 0)) {
			console.log("chop")
			send({type: "A"})
			send({type: "a"})
		} else {
			console.log("equip axe")
			// Equip a shovel
			CE.useItem(it => it.tpl && it.tpl.match(/_axe/))
		}
	} 
	
	if(CE.farming)
		setTimeout(CE.farm, 1000)
}

CE.moveToward = () => (t=CE.path[myself.x+","+myself.y].next) && (t = t.split(",")) && myself.move(t[0], t[1])


CE.afterMoving = (f) => {
	setTimeout(() => f(), Date.now()+700 - last_dest)
}

CE.iterPath = (done) => {
	if (done == null) done = () => {}
	
	let a = CE.path[myself.x+","+myself.y]
	let keepGoing = a && (t = a.next) && t != "end"
	if(!keepGoing) {
		return done()
	}

	let c = t.split(',')
	myself.move(Number(c[0]),Number(c[1]))
	
	CE.afterMoving(() => {
		CE.iterPath(done)
	})
}

CE.moveN = function(dir, n) {
  if(n == 0) return;
  c = CE.coordAdj(myself, dir, 1)
  myself.move(c.x, c.y)
  CE.afterMoving(()=>CE.moveN(dir, n-1))
}

CE.doN = function(fn, n, delay, done) {
    if(n == 0) return done();
    if(done == null) done = () => {}
    fn( () => setTimeout(() => CE.doN(fn, n-1, delay, done), delay))
}

CE.snakeWaypoints = [
//x,y,sec
[10,10,5],
[10,18,0],
[11,25,5],
[12,31,2],
[13,38,5],
[20,38,2],
[25,38,2],
[33,38,2],
[40,38,5],
[33,38,2],
[25,38,5],
[25,31,2],
[30,25,2],
[40,25,5],
[40,18,2],
[39,10,5],
[32,10,2],
[25,10,5]
]

CE.waypoints = CE.snakeWaypoints

CE.bot = function(waypoints){
	nearestWaypoint = 
		_.indexOf(waypoints, 
			_.orderBy(waypoints, 
				(point) => 
					Math.abs(point[0]-myself.x)+Math.abs(point[1]-myself.y))[0])
	
	CE.waypoints = waypoints
	CE.iterWaypoints(nearestWaypoint, 1, CE.iterDown)
}

CE.path = null
CE.iterWaypoints = (i,step,done) => {
	if(i == null) i = 0
	if(step == null) step = 1
	if(i >= CE.waypoints.length || i < 0) return done();
	let waypoint = CE.waypoints[i]
	CE.path = CE.getPath(CE.mapCache[jv.map_title.text], myself, {x:waypoint[0], y:waypoint[1]}, 50)[1]; 
	CE.iterPath(() => setTimeout(() => CE.iterWaypoints(i + step, step, done), waypoint[2] * 1000))
}

CE.iterUp = () => CE.iterWaypoints(0, 1, CE.iterDown)
CE.iterDown = () => CE.iterWaypoints(CE.waypoints.length - 1, -1, CE.iterUp)

CE.storeConfig = function() {
    localStorage.setItem("CEConfig", JSON.stringify(CE.config))
}

CE.hookKeys = function() {
    // Debug Logs for keys to figure what you're pressing when choosing shortcuts
    for(let i = 0; i<127; i++) {
	let j = i;
	jv.keyboard(j).press = function() {
	    if(CE.config.debugKeys)
		console.log("key pressed: " + i);
	}
    }
    
    for(let i in CE.config.hotKeys) {
	let key = Number(i)
	let f = CE.config.hotKeys[i]
	jv.keyboard(key).press = function() {
	    input_field.hasFocus || editing || me !== -1 && f();
	}
    }
}

// Loot all items at your feet
CE.lootAll = function(i, done) {
    if(i == null) i = map_index[myself.x+","+myself.y].o.length
    if(done == null) done = () => {}
    if(i < 0) return done();
    
    setTimeout(() => {send({type:"g"}); CE.lootAll(--i, done)}, 500)
}

CE.altarDrop = function(i, done) {
    if(i == null) i = item_data.length
    if(done == null) done = () => {}
    if(i < 0) return done();

    if(i != info_pane.slot && // not the currently selected inventory slot
       (it = item_data[i]) && // there's something in that slot
       (((a=CE.itemCache[it.spr]) && a.can_stack) || it.qty > 1)) // item is stackable
    {
	send({type: "d", slot: it.slot, amt: "all"}) // Drop whole stack
	setTimeout(() => CE.altarDrop(--i, done), 500)
    } else setTimeout(() => CE.altarDrop(--i, done), 2)
}

CE.spriteOverride = function(name) {
    return CE.config.spriteOverrides[name] || 0;
}

CE.tileDebugFilter = function(tileName) {
    if(CE.config.onlyDebugStyledTiles) return CE.config.styleRules[tileName] != null
    for (var avoidIndex in CE.config.filters) {
        if (tileName == CE.config.filters[avoidIndex]) return false;
    }
    return true;
}

CE.getPlayerId = function (name) {
    for(var key in player_dict)
    {
        if (name.toLowerCase() === player_dict[key].name.replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '').toLowerCase()) {
            return key;
        }
    }
}

CE.mergeWithFloorPile = function(){
    let spriteId = map_index[myself.x+","+myself.y].o[0].sprite
    CE.lootAll()
    setTimeout(() => CE.dropBySpriteId(spriteId), 500)
}

CE.dropBySpriteId = function(spriteId) {
    item_data.find(it => it && it.spr == spriteId && send({type: "d", slot: it.slot, amt: "all"}))
}

CE.lastItemUse = Date.now()
CE.useItem = function(pred, n) {
    if(n == null) n = 1
    if(Date.now() - CE.lastItemUse < 500) return;
    
    let it = item_data.find(item => item && pred(item))
    if(it != null) {
	_.times(n, () => send({type: "u", slot: it.slot}));
	CE.lastItemUse = Date.now()
    }
}

CE.eatFood = function() {
    CE.useItem(
	item =>
	    item.spr == 487 || item.spr == 594 || item.spr == 725 || item.tpl == "berry" // Cooked Meat, Cooked Fish, Cooked Carrot
    )
}

CE.toRename = []
CE.renameInv = function() {
    CE.toRename = []
    for(var i = item_data.length; i >=0; i--)
	if((it = item_data[i]) && // there's something in that slot
	   ((a=CE.itemCache[it.spr]) && !a.can_stack) && it.qty == 1 && // item is stackable
	   it.tpl != "lens" // item isnt the lens we need to use to rename
	  ) { 
	    CE.toRename.push(it.slot);
	}
    CE.renameGear()
}

CE.renameGear = function() {
    if(CE.toRename.length <= 0) return

    let slot = CE.toRename[0]
    CE.toRename = CE.toRename.slice(1)
    setTimeout(() => {
	send({type: "d", slot: slot, amt: "all"})
	setTimeout(() => {
	    CE.useItem(item => item.tpl == "lens")
	}, 2000)
    }, 2000)
}

// target.id
CE.onMobMove = function(json) {
    let id = json.id
    let mob = getMob(id)
    if(mob == null || myself == null) return;
    let distX = mob.x - myself.x
    let distY = mob.y - myself.y
    let dist = Math.abs(distX)+Math.abs(distY)
    let data = player_dict[mob.template]

    if(mob.id == mob.template) { // player
	if(mob.id != myself.id)
	    console.log(mob.id + "-player: " + distX + "," + distY + "("+dist+") " + mob.name + " from " + mob.tribe + " Lvl: "+data.level+" p:"+data.premium)
    } else {
	currentTarget = getMob(target.id)
	if(dist < 5 &&
	   (currentTarget == null || target.id == myself.id ||
	    Math.abs(currentTarget.x-myself.x)+Math.abs(currentTarget.y-myself.y) > dist)
	  ) {
	    CE.target(mob)
	}
    }
}

CE.onMove = function() {
    if(CE.config.autoCaraway) {
	jv.buffbar.map(
	    buff => buff &&
		(match = buff.t.match(/^Slowed -/)) &&
		CE.useItem(
		    item => item.tpl == "caraway",
		    Math.floor(Number(buff.t.substr(match[0].length))/100 + 1))
	)
    }
    
    if(CE.config.autoLoot)
	CE.lootAll();

    if(jv.coords && myself) jv.coords.text = myself.x + "," + myself.y + " " + jv.map_title._text    
}

CE.reTarget = function(idToIgnore) {
    let bestTarget = null
    let closest = 5
    for(i in mobs.items) {
	let mob = mobs.items[i];
	if(mob == null || mob.id == mob.template || mob.id == idToIgnore) continue;
	let distX = mob.x-myself.x
	let distY = mob.y-myself.y
	let dist = Math.abs(distX)+Math.abs(distY)
	let data = player_dict[mob.template]
	if(data && dist < closest) {
	    bestTarget = mob	 
	}
    }
    if(bestTarget != null) {
	CE.target(bestTarget)
    }
}

CE.target = function(e) {
    if(CE.config.autoTarget)
	info_pane.set_info(e);
}

CE.nextMystUpgrade = null
CE.nextMystUpgradeCost = 0
CE.onStatusUpdate = function(json) {
    if(CE.config.autoHeal && json.h < 50)
	CE.useItem(it => it.tpl == "aloe_potion")
    if(CE.config.autoHeal && json.h < 75 && !jv.buffbar.find(buff => buff && buff.t.match(/^Regen/)))
	CE.useItem(it => it.tpl == "coriander")

    
    if(CE.config.autoEat && json.f == 0)
	CE.useItem(it => it.tpl == "raw_meat")
    if(CE.config.autoEat && json.f < 75)
	CE.eatFood()

	
    if(CE.config.autoUpgrade && jv.upgrades != null) {
	if(CE.nextMystUpgrade == null) {
	    for(i in jv.upgrades) {
		let up = jv.upgrades[i]
		if(up.n == "cap" || up.n == "refund" || up.n == "weight" || up.n == "hp" || up.n == "precision" || up.n == "ability") continue;
		if(CE.nextMystUpgrade == null || up.c < CE.nextMystUpgradeCost) {
		    CE.nextMystUpgrade = i
		    CE.nextMystUpgradeCost = up.c
		}
	    }
	}
	
	let upgr = jv.upgrades[CE.nextMystUpgrade]
	if(upgr.c <= json.p) {
	    send({type: "c", r: "ub", u: upgr.n})
	    CE.nextMystUpgrade = null
	}
    }
}

CE.onMonsterHealthChange = function(json) {
    if(myself == null) return;
    if(target.id == null || target.id == myself.id || json.n < 0 && json.id == target.id) {
	CE.reTarget(target.id)
    }
}

CE.coordAdj = function(coords,dir,dist) {
    coords = _.clone(coords)
    if(dist==null) dist=1;
    switch(dir) {
    case 0: // UP
	coords.y -= dist
	break
    case 1: // RIGHT
	coords.x += dist
	break
    case 2: // DOWN
	coords.y += dist
	break
    case 3: // LEFT
	coords.x -= dist
	break
    }
    return coords;
}

CE.getFacingTile = function() {
    return CE.coordAdj({x:myself.x,y:myself.y}, myself.dir, 1)
}

CE.moveForward = function() {
    let tile = CE.getFacingTile();
    send({type: "h", x: tile.x, y: tile.y, dir: myself.dir})
    send({type: "h", x: tile.x, y: tile.y})
    myself.x = tile.x;
    myself.y = tile.y;
}

CE.moveBackward = function() {
    let tile = CE.coordAdj({x:myself.x,y:myself.y}, myself.dir, -1)
    send({type: "h", x: tile.x, y: tile.y, dir: myself.dir})
    send({type: "h", x: tile.x, y: tile.y})
    myself.x = tile.x;
    myself.y = tile.y;
}

CE.toEquip = [];
CE.repairing = 0;
CE.equippedItems = [];
CE.lastEquipped = 0;

CE.reEquip = function() {
    _.map(_.uniq(CE.toEquip), (slot) => {
	if(item_data[slot].eqp == 0)
	    send({type: "u", slot: slot})
    })
    CE.toEquip = [];
}

CE.checkDummy = function(data) {
    if (data.n <= 50) {
        CE.repairDummy();
    };
}

CE.repairEquipment = function() {
    let repairKit = item_data.find(item => item && item.tpl == "repair_kit")
    if(repairKit == null) // Stop if no repairKit
	return;

    CE.toEquip = []
    _.map(item_data, (it) => it && it.eqp > 0 && CE.toEquip.push(it.slot))
    
    let toRepair = _.sortedUniq(CE.repairList);
    for(let i = toRepair.length-1; i>=0; i--) {
	let slot = toRepair[i]
	if(item_data[slot].eqp == 1 || item_data[slot].eqp == 2) {
	    CE.toEquip.push(slot);
	}
	send({type: "d", slot: slot, amt: "1"})
    }
    CE.repairing = toRepair.length;
    CE.repairList = [];
    
    send({type: "u", slot: repairKit.slot})

    CE.moveBackward();

    setTimeout(function() {
	send({type: "A"})
    }, 500);
}

CE.repairDummy = function() {
    let repairKit = item_data.find(item => item && item.tpl == "repair_kit")
    if(repairKit == null) // Stop if no repairKit
    return;

    if(item_data[CE.lastEquipped].eqp == 1 || item_data[CE.lastEquipped].eqp == 2) {
        CE.toEquip.push(CE.lastEquipped);
    };
    
    CE.repairing = 1;

    send({type: "u", slot: repairKit.slot})

    setTimeout(function() {
    send({type: "A"})
    }, 500);
}

CE.onTileUpdate = function(x,y) {
    if(myself == null || jv.map_title == null || jv.map_title == "") return;

    let t = map[loc2tile(x,y)]
    if(t == null) return;
    let sprite = t.spr
    let block = inbounds(x,y) ||
	!sprite ||
	325 == sprite ||
	cur_wall && sprite == cur_wall ||
	map_index[x+","+y].block
    
    if(jv.map_title && jv.map_title != "") {
	let mapCache = (CE.mapCache[jv.map_title.text] = CE.mapCache[jv.map_title.text] || {})
	mapCache[x+","+y] = {
	    block: block,
	    sprite: sprite,
	    x: x,
	    y: y
	}
    }
}

CE.onTileObjectUpdate = function(object) {
    if (CE.config.updateItemCache) {
	CE.itemCache = JSON.parse(localStorage.getItem("CEItems")) || {}; // key==spriteId, data=={can_stack}
	for(var i in map_index) {tile=map_index[i];for(var j in tile.o) {
	    var o = (tile.o[j]);
	    (CE.itemCache[o.sprite] = CE.itemCache[o.sprite] || {}).can_stack = o.can_stack;
	}}
	localStorage.setItem("CEItems", JSON.stringify(CE.itemCache))
    }


    if (CE.config.debugTiles && object &&
	object.alreadyLogged != true &&
	(object.owner != -1 ||
	 object.name == "Stairway" ||
	 object.name == "Hole" ||
	 CE.tileDebugFilter(object.name))) {
        console.log(object.x + ',' + object.y + '\t%c' + object.name, CE.config.styleRules[object.name] || "color:black;");
        object.alreadyLogged = true;
    }
}

CE.consecutiveCooking = -1
CE.onObjectUpdate = function(json,x,y) {
    if(myself == null) return;
    
    let facing = CE.getFacingTile()
    // If update in front
    if(x == facing.x && y == facing.y) {
	let facedObj = map_index[""+facing.x+","+facing.y+""].template.split('|')[1]
	if(CE.config.autoCook && facedObj && object_dict[facedObj].name == "Cooked Fish") {
	    CE.consecutiveCooking++
	    send({type: "A"})
	    send({type: "a"})
	    let fish = item_data.find(item => item && item.tpl == "fish_meat")
	    let wood = item_data.find(item => item && item.tpl == "wood")
	    if(fish && wood) {
		setTimeout( () => {
		    send({type: "d", slot: fish.slot, amt: "1"})
		}, 1000)
		if(CE.consecutiveCooking >= CE.config.skipFuelCount)
		    CE.consecutiveCooking = 0
		else
		    setTimeout( () => {
			send({type: "d", slot: wood.slot, amt: "1"})
		    }, 2500)
	    }
	}
    }
}


CE.repairList = []
CE.onItemUpdate = function(data) {
    if(myself == null) return;
    
    let item = item_data[data.slot]
    
    // Facing a training dummy
    let facing = CE.getFacingTile()
    let facedTile = map_index[""+facing.x+","+facing.y+""]
    let facedObj = facedTile && facedTile.template.split('_')[1]
    if(data.eqp == 2 && data.t != "repair_kit") {
    	if(CE.config.unequipBreaking || (facedObj && object_dict[facedObj].name == "Training Dummy")) {
    	    CE.repairList.push(data.slot);
            send({type: "a"});
    	    setTimeout(CE.repairEquipment, 1000);
    	};
    };

    if(data.eqp == 1 && data.t != "repair_kit") {
        // Record all equipped items in an array
        if (CE.equippedItems.includes(data.slot) == false) {
            CE.equippedItems.push(data.slot);
        };
    };

    // If an item was unequipped since the last check, then record it and remove it from the array
    if(data.eqp == 0 && CE.equippedItems.includes(data.slot)) {
        if (CE.equippedItems.indexOf(data.slot) > -1) {
            CE.equippedItems.splice(data.slot, 1);
        };
        CE.lastEquipped = data.slot;
    }
    
}

CE.onSend = function(e) {
    // DIRECTIONS UP=0|RIGHT=1|DOWN=2|LEFT=3
    // h: movement
    // m: facing
    // P: ping
    // A: action
    // a: stop action
    // g: pickup
    if(CE.config.debugSent) console.log(e);
    if(e.type == "h") CE.onMove();
}

CE.onReceive = function(json) {
    if (CE.config.debugReceived) console.log(json)
}

CE.onMessage = function(json) {
    if (json.text == "<em>A bite!</em>") {
	// Auto Capture Fish
        send({
            type: "A"
        });
        send({
            type: "a"
        });
    } else if (json.text.match(/^You land a .*/) || (json.text.match(/<span style='color:#FFFF88;'>You cast your line and wait.. \[Cast rating: .*\]/) && json.text[73] > CE.config.minCastRating)) {
	// Auto Cast Line until minCastRating
        setTimeout(function() {
            send({
                type: "A"
            });
            send({
                type: "a"
            });
        }, 2000);
    } else if (json.text.match(/^<span style='color:#339966'>All hail .*, a new adventurer in this land.*/)) {
	// Extract Names of alts
	
	// New Character.
	let name = json.text.substr(37, json.text.indexOf(',')-37);

	// new alt of someone, record in nameCache.
	if(json.text.match(/.*(same IP as .*)<\/span>/)) {
	    let start = json.text.indexOf('.')+14;
	    let oldName = json.text.substr(start,json.text.lastIndexOf(')')-start);

	    // Reload nameCache
	    CE.nameCache = JSON.parse(localStorage.getItem("CENames")) || {};
	    
	    let names = _.uniq([].concat(CE.nameCache[name],CE.nameCache[oldName],name,oldName))
	    for(let i in names) {
		CE.nameCache[names[i]] = names;
	    }
		
	    // Save nameCache
	    localStorage.getItem("CENames", JSON.stringify(CE.nameCache))
	}
    } else if(json.text.match(/^The Training Dummy is in perfect condition./)) {
	setTimeout(CE.reEquip, 1500);
    } else if(json.text.match(/^The .* is in perfect condition./)) {
	CE.repairing--;
	if(CE.repairing == 0) {
	    CE.moveForward();
	    setTimeout(function() {
		CE.lootAll()
	    }, 1500);
	}	
    } else if(json.text == "<span style='color:#ff6633'><strong>FIGHT!!</strong></span>") {
	if(CE.breakFight) {
	    setTimeout( () => {
		send({type: "A"})
		send({type: "a"})
	    }, 60000)
	}
    } else if(json.text.match(/^<span style='color:#ff6633'>The battle is over and/) || json.text == "<span style='color:#ff6633'>Battle cancelled: Not enough participants.</span>") {
	send({type: "A"})
	send({type: "a"})
    } else if(json.text == "The repair kit breaks!") {
	setTimeout(function() {
	    let repairKit = item_data.find(item => item && item.tpl == "repair_kit")	    
	    if(repairKit != null) {
		console.log("Swap repair kit")
		send({type: "u", slot: repairKit.slot})
	    } else {
		send({type: "a"})
		console.log("Out of repair kits!");
	    }
	}, 500)
    } else if(json.text.match(/^<span style='color:#d9b3ff'>Name: /)) {
	let msg = json.text
	let runes = {
	    Ancient: "A",
	    Radiant: "R",
	    Stained: "S",
	    Humming: "H",
	    Glowing: "G"
	}
	let newName = ""
	for(var rune in runes) {
	    let lookupText = "Rune: "+rune
	    let match = msg.match(new RegExp(lookupText + "\\(\\d"))
	    if(match) {
		newName += runes[rune] + match[0][match[0].length-1]
	    }
	}
	
	match = msg.match(/\+\d/)
	if(match)
	    newName += (match[0])

	match = msg.match(/Level: \d+/)
	newName += "L" + (match ? match[0].substr("Level: ".length) : 0) +""

	bonusMatch = msg.match(/Bonus \w*: \d/g)
	for(i in bonusMatch) {
	    match = bonusMatch[i]
	    newName += CE.skills[match.substr(6, match.length - 9)] + match[match.length-1]
	}

	let log = "Identified: "+newName
	
	console.log(log);append(log)

	let tile = CE.getFacingTile()
	if((topObj = map_index[tile.x + "," + tile.y].o[0]) && topObj.sprite == 781) {
	    send({type: "chat", data: "/name " + newName})
	    setTimeout(() => {
		send({type: "A"})
		send({type: "a"})
		CE.renameGear();
	    }, 2000)
	}
    } else if(json.text.match(/^\w* presents these items: <span style='color:#ff9933'>/)) {
	json.text = json.text.replace(':',',').split(',').map(txt => {
	    if(txt.match(/.*L\d+.*\(/)) {
		let points = {
		    train: {
			A: 20,
			R: 0,
			S: 0,
			G: 0,
			H: 0
		    },pve: {
			A: 0.2,
			R: 10,
			S: 6,
			G: 2,
			H: 1.8
		    },pvp: {
			A: 0.2,
			R: 0,
			S: 12,
			G: 6,
			H: 1.8
		    }
		}

		let scores = {}
		for(t in points) {
		    let score = 0;
		    for(prefix in points[t]){
			let match = txt.match(new RegExp(prefix+"\\d"))
			if(match) score += match[0][1] * points[t][prefix]
		    }
		    scores[t] = score
		}
		return scores.pve+"|"+scores.pvp+"|"+scores.train+" "+txt+"\n"
	    } else return txt
	}).join('\n')
    } else if(json.text == "<span style='color:#ff6633'><strong>FIGHT!!</strong></span>") {
    if(CE.breakFight) {
        setTimeout( () => {
        send({type: "A"})
        send({type: "a"})
        }, 60000)
    }
    } else if(json.text.match(/^<span style='color:#ff6633'>The battle is over and/) || json.text == "<span style='color:#ff6633'>Battle cancelled: Not enough participants.</span>") {
    send({type: "A"})
    send({type: "a"})
    }
}


CE.chatCommands = function(input) {
    // Custom commands that can be entered through the chat box
    i = input.split(" ")
    if (i[0].toLowerCase() == "//ping") {append("Pong!")}; 
    if (i[0].toLowerCase() == "//compass") {
        append("You are at "+myself.x+","+myself.y+". Your location is "+jv.map_title._text+".");
    };
    if (i[0].toLowerCase() == "//swap" && i[1] && i[2]) {send({"type":"sw","slot":i[1]-1,"swap":i[2]-1})};
    if (i[0].toLowerCase() == "//recipe" && i[1]) {send({"type":"nfo","tpl":i[1]})};
    if (i[0].toLowerCase() == "//info" && i[1]) {send({"type":"t","t":i[1]}); send({"type":"c","r":"rp","id":i[1]})};
    if (i[0].toLowerCase() == "//id") {
        if (i[1]) {
            append("The player ID of "+player_dict[CE.getPlayerId(i[1])].name+" is "+player_dict[CE.getPlayerId(i[1])].id+".");
        } else {
            append("Your player ID is "+myself.id+".");
        }
    }
    if (i[0].toLowerCase() == "//chatbox") {
        if (jv.chat_box.visible) {
            jv.chat_box.visible = false
        } else {
            jv.chat_box.visible = true
        }
    };
    if (i[0].toLowerCase() == "//ui") {
        if (ui_container.visible) {
            ui_container.visible = false
        } else {
            ui_container.visible = true
        }
    };
    if (i[0].toLowerCase() == "//premium" && i[1]) {append(player_dict[CE.getPlayerId(i[1])].name+" has "+player_dict[CE.getPlayerId(i[1])].premium+" days of premium remaining.")};
    if (i[0].toLowerCase() == "//droppage" && i[1]) {
        var slots = [];
        var slot_amount = 14;
        while (slot_amount > -1) {
            slots.push(slot_amount+(15*i[1]-15));
            slot_amount = slot_amount-1;
        };
        slots.forEach(function(entry){
            send({"type":"d","slot":entry,"amt":"all"});
        });
    };
    if (i[0].toLowerCase() == "//toggle" && i[1]) {
        // i[1] is the property to change, i[2] is the value to set it to
        if (CE.config[i[1]] == true || CE.config[i[1]] == false) {
            if (CE.config[i[1]] == true) {
                CE.config[i[1]] = false;
                append("'"+i[1]+"' set to false.")
            } else {
                CE.config[i[1]] = true;
                append("'"+i[1]+"' set to true.")
            };
            CE.storeConfig();
        } else if (CE.config[i[1]]) {
            append("This option cannot be toggled.")
        } else {
            append("This option does not exist.")
        };
    };
}

CE.addCustomUI = function() {
    // Show coords on screen
    jv.coords = jv.text("", {
        font: "12px Verdana",
        fill: 16777215,
        lineJoin: "round",
        stroke: jv.color_dark,
        strokeThickness: 4,
        align: "right"
    }),
    jv.coords.x = 170,
    jv.coords.y = 40,
    jv.coords.visible = true,
    ui_container.addChild(jv.coords);

    // Add "Mapping" button to Character stats
    jv.stat_dialog.quest.x = jv.stat_dialog.skill.x
    jv.stat_dialog.appearance.x = jv.stat_dialog.upgrades.x
    jv.stat_dialog.mapping = jv.Button.create(0, 0, 96, "Mapping", jv.stat_dialog),
    jv.stat_dialog.add(jv.stat_dialog.mapping),
    jv.stat_dialog.mapping.right(10),
    jv.stat_dialog.mapping.bottom(38)
    jv.stat_dialog.mapping.y = jv.stat_dialog.appearance.y
    jv.stat_dialog.mapping.on_click = function() {
        jv.mapping_dialog.page = 0,
        jv.mapping_dialog.visible = 1
    };

    // Custom command override
    input_field.onSubmit = function() {
	if (this.chars.substring(0,2) == "//") {
	    "" !== this.chars && CE.chatCommands(this.chars);
	} else {
	    "" !== this.chars && jv.command(this.chars);
	};
	this.chars = "",
	jv.hidden_input.value = "",
	this.pos = 0,
	this.blur()
    };

    ui_container.children[2].alpha = 1 // Myst Obtained
    ui_container.children[5].alpha = 0 // useless grey bottom left
    ui_container.children[6].alpha = 0.5 // inventory background
    ui_container.children[33].alpha = 0.9 // touch controls...
    jv.chat_box.alpha = 0.9

    // hide dpad properly on load because it looks ugly with our changes
    compass.visible = 0,
    compass2.visible = 0,
    dpad_back.visible = 0,
    ph_dpad.visible = 0,
    jv.chat_box.h = 416,
    jv.chat_box.gfx.height = 418,
    jv.chat_box.m.height = 416,
    jv.chat_box.mask.height = 416,
    jv.chat_box.resume.y = jv.chat_box.h - 35
}

CE.init = function() {
    if(!CE.initialized) {
	send({type:"chat", data:"/ignore Kohai"})
    }
    CE.initialized = true
}

CE.onDeath = function(json) {
    if(myself == null) return;
    // keep last death info, save in cache

    // reload death cache
    CE.deathCache = JSON.parse(localStorage.getItem("CEDeath")) || {};
    
    CE.deathCache[myself.name] = {
        "x": myself.x,
        "y": myself.y,
        "location": jv.map_title._text,
	"time": new Date()
    }
    localStorage.setItem("CEDeath", JSON.stringify(CE.deathCache));
    
    CE.showLastDeath()
}

CE.showLastDeath = function(name) {
    if(name == null) name = myself.name
    let a = CE.deathCache[name]
    let msg =
	name + " died at " + a.x + "," + a.y + " " +
	a.location + " " +
	CE.timeSince(new Date(a.time)) + " ago";
    console.log(msg)
    append(msg)
}

CE.timeSince = function(date) {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 0) {
	return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 0) {
	return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 0) {
	return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 0) {
	return interval + " hours " + CE.timeSince(interval*3600000+date.getTime())
    }
    interval = Math.floor(seconds / 60);
    if (interval > 0) {
	return interval + " minutes " + CE.timeSince(interval*60000+date.getTime())
    }
    return Math.floor(seconds) + " seconds";
}

//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------

//var version = '4.63.8';
function loadScript(e, t) {
    var i = document.createElement("script");
    i.type = "text/javascript",
    i.readyState ? i.onreadystatechange = function() {
        "loaded" != i.readyState && "complete" != i.readyState || (i.onreadystatechange = null,
        t())
    }
    : i.onload = function() {
        t()
    }
    ,
    i.src = e,
    document.getElementsByTagName("head")[0].appendChild(i)
}
function depthCompare(e, t) {
    if (void 0 == e.base || void 0 == t.base)
        return 0;
    if (e.base.y < t.base.y)
        return -1;
    if (e.base.y > t.base.y)
        return 1;
    if (e.base.y == t.base.y) {
        if (e.ordering < t.ordering)
            return -1;
        if (e.ordering > t.ordering)
            return 1
    }
    return 0
}
function sortCompare(e, t) {
    return e.visible && void 0 != e.ry && void 0 != t.ry ? e.ry < t.ry ? -1 : e.ry > t.ry ? 1 : 0 : 0
}
function vertCompare(e, t) {
    return e.y + e.height < t.y + t.height ? -1 : e.y + e.height > t.y + t.height ? 1 : 0
}
function zCompare(e, t) {
    return void 0 == e || void 0 == t ? 0 : e.z < t.z ? -1 : e.z > t.z ? 1 : 0
}
!function() {
    "use strict";
    var e = function() {
        this.init()
    };
    e.prototype = {
        init: function() {
            var e = this || t;
            return e._counter = 1e3,
            e._codecs = {},
            e._howls = [],
            e._muted = !1,
            e._volume = 1,
            e._canPlayEvent = "canplaythrough",
            e._navigator = "undefined" != typeof window && window.navigator ? window.navigator : null,
            e.masterGain = null,
            e.noAudio = !1,
            e.usingWebAudio = !0,
            e.autoSuspend = !0,
            e.ctx = null,
            e.mobileAutoEnable = !0,
            e._setup(),
            e
        },
        volume: function(e) {
            var i = this || t;
            if (e = parseFloat(e),
            i.ctx || d(),
            void 0 !== e && e >= 0 && e <= 1) {
                if (i._volume = e,
                i._muted)
                    return i;
                i.usingWebAudio && (i.masterGain.gain.value = e);
                for (var o = 0; o < i._howls.length; o++)
                    if (!i._howls[o]._webAudio)
                        for (var n = i._howls[o]._getSoundIds(), a = 0; a < n.length; a++) {
                            var r = i._howls[o]._soundById(n[a]);
                            r && r._node && (r._node.volume = r._volume * e)
                        }
                return i
            }
            return i._volume
        },
        mute: function(e) {
            var i = this || t;
            i.ctx || d(),
            i._muted = e,
            i.usingWebAudio && (i.masterGain.gain.value = e ? 0 : i._volume);
            for (var o = 0; o < i._howls.length; o++)
                if (!i._howls[o]._webAudio)
                    for (var n = i._howls[o]._getSoundIds(), a = 0; a < n.length; a++) {
                        var r = i._howls[o]._soundById(n[a]);
                        r && r._node && (r._node.muted = !!e || r._muted)
                    }
            return i
        },
        unload: function() {
            for (var e = this || t, i = e._howls.length - 1; i >= 0; i--)
                e._howls[i].unload();
            return e.usingWebAudio && e.ctx && void 0 !== e.ctx.close && (e.ctx.close(),
            e.ctx = null,
            d()),
            e
        },
        codecs: function(e) {
            return (this || t)._codecs[e.replace(/^x-/, "")]
        },
        _setup: function() {
            var e = this || t;
            if (e.state = e.ctx ? e.ctx.state || "running" : "running",
            e._autoSuspend(),
            !e.usingWebAudio)
                if ("undefined" != typeof Audio)
                    try {
                        var i = new Audio;
                        void 0 === i.oncanplaythrough && (e._canPlayEvent = "canplay")
                    } catch (t) {
                        e.noAudio = !0
                    }
                else
                    e.noAudio = !0;
            try {
                var i = new Audio;
                i.muted && (e.noAudio = !0)
            } catch (e) {}
            return e.noAudio || e._setupCodecs(),
            e
        },
        _setupCodecs: function() {
            var e = this || t
              , i = null;
            try {
                i = "undefined" != typeof Audio ? new Audio : null
            } catch (t) {
                return e
            }
            if (!i || "function" != typeof i.canPlayType)
                return e;
            var o = i.canPlayType("audio/mpeg;").replace(/^no$/, "")
              , n = e._navigator && e._navigator.userAgent.match(/OPR\/([0-6].)/g)
              , a = n && parseInt(n[0].split("/")[1], 10) < 33;
            return e._codecs = {
                mp3: !(a || !o && !i.canPlayType("audio/mp3;").replace(/^no$/, "")),
                mpeg: !!o,
                opus: !!i.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
                ogg: !!i.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
                oga: !!i.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
                wav: !!i.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""),
                aac: !!i.canPlayType("audio/aac;").replace(/^no$/, ""),
                caf: !!i.canPlayType("audio/x-caf;").replace(/^no$/, ""),
                m4a: !!(i.canPlayType("audio/x-m4a;") || i.canPlayType("audio/m4a;") || i.canPlayType("audio/aac;")).replace(/^no$/, ""),
                mp4: !!(i.canPlayType("audio/x-mp4;") || i.canPlayType("audio/mp4;") || i.canPlayType("audio/aac;")).replace(/^no$/, ""),
                weba: !!i.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, ""),
                webm: !!i.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, ""),
                dolby: !!i.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/, ""),
                flac: !!(i.canPlayType("audio/x-flac;") || i.canPlayType("audio/flac;")).replace(/^no$/, "")
            },
            e
        },
        _enableMobileAudio: function() {
            var e = this || t
              , i = /iPhone|iPad|iPod|Android|BlackBerry|BB10|Silk|Mobi/i.test(e._navigator && e._navigator.userAgent)
              , o = !!("ontouchend"in window || e._navigator && e._navigator.maxTouchPoints > 0 || e._navigator && e._navigator.msMaxTouchPoints > 0);
            if (!e._mobileEnabled && e.ctx && (i || o)) {
                e._mobileEnabled = !1,
                e._mobileUnloaded || 44100 === e.ctx.sampleRate || (e._mobileUnloaded = !0,
                e.unload()),
                e._scratchBuffer = e.ctx.createBuffer(1, 1, 22050);
                var n = function() {
                    t._autoResume();
                    var i = e.ctx.createBufferSource();
                    i.buffer = e._scratchBuffer,
                    i.connect(e.ctx.destination),
                    void 0 === i.start ? i.noteOn(0) : i.start(0),
                    "function" == typeof e.ctx.resume && e.ctx.resume(),
                    i.onended = function() {
                        i.disconnect(0),
                        e._mobileEnabled = !0,
                        e.mobileAutoEnable = !1,
                        document.removeEventListener("touchstart", n, !0),
                        document.removeEventListener("touchend", n, !0)
                    }
                };
                return document.addEventListener("touchstart", n, !0),
                document.addEventListener("touchend", n, !0),
                e
            }
        },
        _autoSuspend: function() {
            var e = this;
            if (e.autoSuspend && e.ctx && void 0 !== e.ctx.suspend && t.usingWebAudio) {
                for (var i = 0; i < e._howls.length; i++)
                    if (e._howls[i]._webAudio)
                        for (var o = 0; o < e._howls[i]._sounds.length; o++)
                            if (!e._howls[i]._sounds[o]._paused)
                                return e;
                return e._suspendTimer && clearTimeout(e._suspendTimer),
                e._suspendTimer = setTimeout(function() {
                    e.autoSuspend && (e._suspendTimer = null,
                    e.state = "suspending",
                    e.ctx.suspend().then(function() {
                        e.state = "suspended",
                        e._resumeAfterSuspend && (delete e._resumeAfterSuspend,
                        e._autoResume())
                    }))
                }, 3e4),
                e
            }
        },
        _autoResume: function() {
            var e = this;
            if (e.ctx && void 0 !== e.ctx.resume && t.usingWebAudio)
                return "running" === e.state && e._suspendTimer ? (clearTimeout(e._suspendTimer),
                e._suspendTimer = null) : "suspended" === e.state ? (e.ctx.resume().then(function() {
                    e.state = "running";
                    for (var t = 0; t < e._howls.length; t++)
                        e._howls[t]._emit("resume")
                }),
                e._suspendTimer && (clearTimeout(e._suspendTimer),
                e._suspendTimer = null)) : "suspending" === e.state && (e._resumeAfterSuspend = !0),
                e
        }
    };
    var t = new e
      , i = function(e) {
        var t = this;
        return e.src && 0 !== e.src.length ? void t.init(e) : void console.error("An array of source files must be passed with any new Howl.")
    };
    i.prototype = {
        init: function(e) {
            var i = this;
            return t.ctx || d(),
            i._autoplay = e.autoplay || !1,
            i._format = "string" != typeof e.format ? e.format : [e.format],
            i._html5 = e.html5 || !1,
            i._muted = e.mute || !1,
            i._loop = e.loop || !1,
            i._pool = e.pool || 5,
            i._preload = "boolean" != typeof e.preload || e.preload,
            i._rate = e.rate || 1,
            i._sprite = e.sprite || {},
            i._src = "string" != typeof e.src ? e.src : [e.src],
            i._volume = void 0 !== e.volume ? e.volume : 1,
            i._xhrWithCredentials = e.xhrWithCredentials || !1,
            i._duration = 0,
            i._state = "unloaded",
            i._sounds = [],
            i._endTimers = {},
            i._queue = [],
            i._onend = e.onend ? [{
                fn: e.onend
            }] : [],
            i._onfade = e.onfade ? [{
                fn: e.onfade
            }] : [],
            i._onload = e.onload ? [{
                fn: e.onload
            }] : [],
            i._onloaderror = e.onloaderror ? [{
                fn: e.onloaderror
            }] : [],
            i._onplayerror = e.onplayerror ? [{
                fn: e.onplayerror
            }] : [],
            i._onpause = e.onpause ? [{
                fn: e.onpause
            }] : [],
            i._onplay = e.onplay ? [{
                fn: e.onplay
            }] : [],
            i._onstop = e.onstop ? [{
                fn: e.onstop
            }] : [],
            i._onmute = e.onmute ? [{
                fn: e.onmute
            }] : [],
            i._onvolume = e.onvolume ? [{
                fn: e.onvolume
            }] : [],
            i._onrate = e.onrate ? [{
                fn: e.onrate
            }] : [],
            i._onseek = e.onseek ? [{
                fn: e.onseek
            }] : [],
            i._onresume = [],
            i._webAudio = t.usingWebAudio && !i._html5,
            void 0 !== t.ctx && t.ctx && t.mobileAutoEnable && t._enableMobileAudio(),
            t._howls.push(i),
            i._autoplay && i._queue.push({
                event: "play",
                action: function() {
                    i.play()
                }
            }),
            i._preload && i.load(),
            i
        },
        load: function() {
            var e = this
              , i = null;
            if (t.noAudio)
                return void e._emit("loaderror", null, "No audio support.");
            "string" == typeof e._src && (e._src = [e._src]);
            for (var n = 0; n < e._src.length; n++) {
                var r, s;
                if (e._format && e._format[n])
                    r = e._format[n];
                else {
                    if ("string" != typeof (s = e._src[n])) {
                        e._emit("loaderror", null, "Non-string found in selected audio sources - ignoring.");
                        continue
                    }
                    r = /^data:audio\/([^;,]+);/i.exec(s),
                    r || (r = /\.([^.]+)$/.exec(s.split("?", 1)[0])),
                    r && (r = r[1].toLowerCase())
                }
                if (r || console.warn('No file extension was found. Consider using the "format" property or specify an extension.'),
                r && t.codecs(r)) {
                    i = e._src[n];
                    break
                }
            }
            return i ? (e._src = i,
            e._state = "loading",
            "https:" === window.location.protocol && "http:" === i.slice(0, 5) && (e._html5 = !0,
            e._webAudio = !1),
            new o(e),
            e._webAudio && a(e),
            e) : void e._emit("loaderror", null, "No codec support for selected audio sources.")
        },
        play: function(e, i) {
            var o = this
              , n = null;
            if ("number" == typeof e)
                n = e,
                e = null;
            else {
                if ("string" == typeof e && "loaded" === o._state && !o._sprite[e])
                    return null;
                if (void 0 === e) {
                    e = "__default";
                    for (var a = 0, r = 0; r < o._sounds.length; r++)
                        o._sounds[r]._paused && !o._sounds[r]._ended && (a++,
                        n = o._sounds[r]._id);
                    1 === a ? e = null : n = null
                }
            }
            var s = n ? o._soundById(n) : o._inactiveSound();
            if (!s)
                return null;
            if (n && !e && (e = s._sprite || "__default"),
            "loaded" !== o._state) {
                s._sprite = e,
                s._ended = !1;
                var l = s._id;
                return o._queue.push({
                    event: "play",
                    action: function() {
                        o.play(l)
                    }
                }),
                l
            }
            if (n && !s._paused)
                return i || setTimeout(function() {
                    o._emit("play", s._id)
                }, 0),
                s._id;
            o._webAudio && t._autoResume();
            var d = Math.max(0, s._seek > 0 ? s._seek : o._sprite[e][0] / 1e3)
              , c = Math.max(0, (o._sprite[e][0] + o._sprite[e][1]) / 1e3 - d)
              , _ = 1e3 * c / Math.abs(s._rate);
            s._paused = !1,
            s._ended = !1,
            s._sprite = e,
            s._seek = d,
            s._start = o._sprite[e][0] / 1e3,
            s._stop = (o._sprite[e][0] + o._sprite[e][1]) / 1e3,
            s._loop = !(!s._loop && !o._sprite[e][2]);
            var p = s._node;
            if (o._webAudio) {
                var u = function() {
                    o._refreshBuffer(s);
                    var e = s._muted || o._muted ? 0 : s._volume;
                    p.gain.setValueAtTime(e, t.ctx.currentTime),
                    s._playStart = t.ctx.currentTime,
                    void 0 === p.bufferSource.start ? s._loop ? p.bufferSource.noteGrainOn(0, d, 86400) : p.bufferSource.noteGrainOn(0, d, c) : s._loop ? p.bufferSource.start(0, d, 86400) : p.bufferSource.start(0, d, c),
                    _ !== 1 / 0 && (o._endTimers[s._id] = setTimeout(o._ended.bind(o, s), _)),
                    i || setTimeout(function() {
                        o._emit("play", s._id)
                    }, 0)
                };
                "running" === t.state ? u() : (o.once("resume", u),
                o._clearTimer(s._id))
            } else {
                var h = function() {
                    p.currentTime = d,
                    p.muted = s._muted || o._muted || t._muted || p.muted,
                    p.volume = s._volume * t.volume(),
                    p.playbackRate = s._rate;
                    try {
                        if (p.play(),
                        p.paused)
                            return void o._emit("playerror", s._id, "Playback was unable to start. This is most commonly an issue on mobile devices where playback was not within a user interaction.");
                        _ !== 1 / 0 && (o._endTimers[s._id] = setTimeout(o._ended.bind(o, s), _)),
                        i || o._emit("play", s._id)
                    } catch (e) {
                        o._emit("playerror", s._id, e)
                    }
                }
                  , v = window && window.ejecta || !p.readyState && t._navigator.isCocoonJS;
                if (4 === p.readyState || v)
                    h();
                else {
                    var g = function() {
                        h(),
                        p.removeEventListener(t._canPlayEvent, g, !1)
                    };
                    p.addEventListener(t._canPlayEvent, g, !1),
                    o._clearTimer(s._id)
                }
            }
            return s._id
        },
        pause: function(e) {
            var t = this;
            if ("loaded" !== t._state)
                return t._queue.push({
                    event: "pause",
                    action: function() {
                        t.pause(e)
                    }
                }),
                t;
            for (var i = t._getSoundIds(e), o = 0; o < i.length; o++) {
                t._clearTimer(i[o]);
                var n = t._soundById(i[o]);
                if (n && !n._paused && (n._seek = t.seek(i[o]),
                n._rateSeek = 0,
                n._paused = !0,
                t._stopFade(i[o]),
                n._node))
                    if (t._webAudio) {
                        if (!n._node.bufferSource)
                            continue;
                        void 0 === n._node.bufferSource.stop ? n._node.bufferSource.noteOff(0) : n._node.bufferSource.stop(0),
                        t._cleanBuffer(n._node)
                    } else
                        isNaN(n._node.duration) && n._node.duration !== 1 / 0 || n._node.pause();
                arguments[1] || t._emit("pause", n ? n._id : null)
            }
            return t
        },
        stop: function(e, t) {
            var i = this;
            if ("loaded" !== i._state)
                return i._queue.push({
                    event: "stop",
                    action: function() {
                        i.stop(e)
                    }
                }),
                i;
            for (var o = i._getSoundIds(e), n = 0; n < o.length; n++) {
                i._clearTimer(o[n]);
                var a = i._soundById(o[n]);
                a && (a._seek = a._start || 0,
                a._rateSeek = 0,
                a._paused = !0,
                a._ended = !0,
                i._stopFade(o[n]),
                a._node && (i._webAudio ? a._node.bufferSource && (void 0 === a._node.bufferSource.stop ? a._node.bufferSource.noteOff(0) : a._node.bufferSource.stop(0),
                i._cleanBuffer(a._node)) : isNaN(a._node.duration) && a._node.duration !== 1 / 0 || (a._node.currentTime = a._start || 0,
                a._node.pause())),
                t || i._emit("stop", a._id))
            }
            return i
        },
        mute: function(e, i) {
            var o = this;
            if ("loaded" !== o._state)
                return o._queue.push({
                    event: "mute",
                    action: function() {
                        o.mute(e, i)
                    }
                }),
                o;
            if (void 0 === i) {
                if ("boolean" != typeof e)
                    return o._muted;
                o._muted = e
            }
            for (var n = o._getSoundIds(i), a = 0; a < n.length; a++) {
                var r = o._soundById(n[a]);
                r && (r._muted = e,
                o._webAudio && r._node ? r._node.gain.setValueAtTime(e ? 0 : r._volume, t.ctx.currentTime) : r._node && (r._node.muted = !!t._muted || e),
                o._emit("mute", r._id))
            }
            return o
        },
        volume: function() {
            var e, i, o = this, n = arguments;
            if (0 === n.length)
                return o._volume;
            1 === n.length || 2 === n.length && void 0 === n[1] ? o._getSoundIds().indexOf(n[0]) >= 0 ? i = parseInt(n[0], 10) : e = parseFloat(n[0]) : n.length >= 2 && (e = parseFloat(n[0]),
            i = parseInt(n[1], 10));
            var a;
            if (!(void 0 !== e && e >= 0 && e <= 1))
                return a = i ? o._soundById(i) : o._sounds[0],
                a ? a._volume : 0;
            if ("loaded" !== o._state)
                return o._queue.push({
                    event: "volume",
                    action: function() {
                        o.volume.apply(o, n)
                    }
                }),
                o;
            void 0 === i && (o._volume = e),
            i = o._getSoundIds(i);
            for (var r = 0; r < i.length; r++)
                (a = o._soundById(i[r])) && (a._volume = e,
                n[2] || o._stopFade(i[r]),
                o._webAudio && a._node && !a._muted ? a._node.gain.setValueAtTime(e, t.ctx.currentTime) : a._node && !a._muted && (a._node.volume = e * t.volume()),
                o._emit("volume", a._id));
            return o
        },
        fade: function(e, i, o, n) {
            var a = this;
            if ("loaded" !== a._state)
                return a._queue.push({
                    event: "fade",
                    action: function() {
                        a.fade(e, i, o, n)
                    }
                }),
                a;
            a.volume(e, n);
            for (var r = a._getSoundIds(n), s = 0; s < r.length; s++) {
                var l = a._soundById(r[s]);
                if (l) {
                    if (n || a._stopFade(r[s]),
                    a._webAudio && !l._muted) {
                        var d = t.ctx.currentTime
                          , c = d + o / 1e3;
                        l._volume = e,
                        l._node.gain.setValueAtTime(e, d),
                        l._node.gain.linearRampToValueAtTime(i, c)
                    }
                    a._startFadeInterval(l, e, i, o, r[s])
                }
            }
            return a
        },
        _startFadeInterval: function(e, t, i, o, n) {
            var a = this
              , r = t
              , s = t > i ? "out" : "in"
              , l = Math.abs(t - i)
              , d = l / .01
              , c = d > 0 ? o / d : o;
            c < 4 && (d = Math.ceil(d / (4 / c)),
            c = 4),
            e._interval = setInterval(function() {
                d > 0 && (r += "in" === s ? .01 : -.01),
                r = Math.max(0, r),
                r = Math.min(1, r),
                r = Math.round(100 * r) / 100,
                a._webAudio ? (void 0 === n && (a._volume = r),
                e._volume = r) : a.volume(r, e._id, !0),
                (i < t && r <= i || i > t && r >= i) && (clearInterval(e._interval),
                e._interval = null,
                a.volume(i, e._id),
                a._emit("fade", e._id))
            }, c)
        },
        _stopFade: function(e) {
            var i = this
              , o = i._soundById(e);
            return o && o._interval && (i._webAudio && o._node.gain.cancelScheduledValues(t.ctx.currentTime),
            clearInterval(o._interval),
            o._interval = null,
            i._emit("fade", e)),
            i
        },
        loop: function() {
            var e, t, i, o = this, n = arguments;
            if (0 === n.length)
                return o._loop;
            if (1 === n.length) {
                if ("boolean" != typeof n[0])
                    return !!(i = o._soundById(parseInt(n[0], 10))) && i._loop;
                e = n[0],
                o._loop = e
            } else
                2 === n.length && (e = n[0],
                t = parseInt(n[1], 10));
            for (var a = o._getSoundIds(t), r = 0; r < a.length; r++)
                (i = o._soundById(a[r])) && (i._loop = e,
                o._webAudio && i._node && i._node.bufferSource && (i._node.bufferSource.loop = e,
                e && (i._node.bufferSource.loopStart = i._start || 0,
                i._node.bufferSource.loopEnd = i._stop)));
            return o
        },
        rate: function() {
            var e, i, o = this, n = arguments;
            if (0 === n.length)
                i = o._sounds[0]._id;
            else if (1 === n.length) {
                var a = o._getSoundIds()
                  , r = a.indexOf(n[0]);
                r >= 0 ? i = parseInt(n[0], 10) : e = parseFloat(n[0])
            } else
                2 === n.length && (e = parseFloat(n[0]),
                i = parseInt(n[1], 10));
            var s;
            if ("number" != typeof e)
                return s = o._soundById(i),
                s ? s._rate : o._rate;
            if ("loaded" !== o._state)
                return o._queue.push({
                    event: "rate",
                    action: function() {
                        o.rate.apply(o, n)
                    }
                }),
                o;
            void 0 === i && (o._rate = e),
            i = o._getSoundIds(i);
            for (var l = 0; l < i.length; l++)
                if (s = o._soundById(i[l])) {
                    s._rateSeek = o.seek(i[l]),
                    s._playStart = o._webAudio ? t.ctx.currentTime : s._playStart,
                    s._rate = e,
                    o._webAudio && s._node && s._node.bufferSource ? s._node.bufferSource.playbackRate.value = e : s._node && (s._node.playbackRate = e);
                    var d = o.seek(i[l])
                      , c = (o._sprite[s._sprite][0] + o._sprite[s._sprite][1]) / 1e3 - d
                      , _ = 1e3 * c / Math.abs(s._rate);
                    !o._endTimers[i[l]] && s._paused || (o._clearTimer(i[l]),
                    o._endTimers[i[l]] = setTimeout(o._ended.bind(o, s), _)),
                    o._emit("rate", s._id)
                }
            return o
        },
        seek: function() {
            var e, i, o = this, n = arguments;
            if (0 === n.length)
                i = o._sounds[0]._id;
            else if (1 === n.length) {
                var a = o._getSoundIds()
                  , r = a.indexOf(n[0]);
                r >= 0 ? i = parseInt(n[0], 10) : o._sounds.length && (i = o._sounds[0]._id,
                e = parseFloat(n[0]))
            } else
                2 === n.length && (e = parseFloat(n[0]),
                i = parseInt(n[1], 10));
            if (void 0 === i)
                return o;
            if ("loaded" !== o._state)
                return o._queue.push({
                    event: "seek",
                    action: function() {
                        o.seek.apply(o, n)
                    }
                }),
                o;
            var s = o._soundById(i);
            if (s) {
                if (!("number" == typeof e && e >= 0)) {
                    if (o._webAudio) {
                        var l = o.playing(i) ? t.ctx.currentTime - s._playStart : 0
                          , d = s._rateSeek ? s._rateSeek - s._seek : 0;
                        return s._seek + (d + l * Math.abs(s._rate))
                    }
                    return s._node.currentTime
                }
                var c = o.playing(i);
                c && o.pause(i, !0),
                s._seek = e,
                s._ended = !1,
                o._clearTimer(i),
                c && o.play(i, !0),
                !o._webAudio && s._node && (s._node.currentTime = e),
                o._emit("seek", i)
            }
            return o
        },
        playing: function(e) {
            var t = this;
            if ("number" == typeof e) {
                var i = t._soundById(e);
                return !!i && !i._paused
            }
            for (var o = 0; o < t._sounds.length; o++)
                if (!t._sounds[o]._paused)
                    return !0;
            return !1
        },
        duration: function(e) {
            var t = this
              , i = t._duration
              , o = t._soundById(e);
            return o && (i = t._sprite[o._sprite][1] / 1e3),
            i
        },
        state: function() {
            return this._state
        },
        unload: function() {
            for (var e = this, i = e._sounds, o = 0; o < i.length; o++) {
                i[o]._paused || e.stop(i[o]._id),
                e._webAudio || (/MSIE |Trident\//.test(t._navigator && t._navigator.userAgent) || (i[o]._node.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA"),
                i[o]._node.removeEventListener("error", i[o]._errorFn, !1),
                i[o]._node.removeEventListener(t._canPlayEvent, i[o]._loadFn, !1)),
                delete i[o]._node,
                e._clearTimer(i[o]._id);
                var a = t._howls.indexOf(e);
                a >= 0 && t._howls.splice(a, 1)
            }
            var r = !0;
            for (o = 0; o < t._howls.length; o++)
                if (t._howls[o]._src === e._src) {
                    r = !1;
                    break
                }
            return n && r && delete n[e._src],
            t.noAudio = !1,
            e._state = "unloaded",
            e._sounds = [],
            e = null,
            null
        },
        on: function(e, t, i, o) {
            var n = this
              , a = n["_on" + e];
            return "function" == typeof t && a.push(o ? {
                id: i,
                fn: t,
                once: o
            } : {
                id: i,
                fn: t
            }),
            n
        },
        off: function(e, t, i) {
            var o = this
              , n = o["_on" + e]
              , a = 0;
            if ("number" == typeof t && (i = t,
            t = null),
            t || i)
                for (a = 0; a < n.length; a++) {
                    var r = i === n[a].id;
                    if (t === n[a].fn && r || !t && r) {
                        n.splice(a, 1);
                        break
                    }
                }
            else if (e)
                o["_on" + e] = [];
            else {
                var s = Object.keys(o);
                for (a = 0; a < s.length; a++)
                    0 === s[a].indexOf("_on") && Array.isArray(o[s[a]]) && (o[s[a]] = [])
            }
            return o
        },
        once: function(e, t, i) {
            var o = this;
            return o.on(e, t, i, 1),
            o
        },
        _emit: function(e, t, i) {
            for (var o = this, n = o["_on" + e], a = n.length - 1; a >= 0; a--)
                n[a].id && n[a].id !== t && "load" !== e || (setTimeout(function(e) {
                    e.call(this, t, i)
                }
                .bind(o, n[a].fn), 0),
                n[a].once && o.off(e, n[a].fn, n[a].id));
            return o
        },
        _loadQueue: function() {
            var e = this;
            if (e._queue.length > 0) {
                var t = e._queue[0];
                e.once(t.event, function() {
                    e._queue.shift(),
                    e._loadQueue()
                }),
                t.action()
            }
            return e
        },
        _ended: function(e) {
            var i = this
              , o = e._sprite;
            if (!i._webAudio && e._node && !e._node.paused)
                return setTimeout(i._ended.bind(i, e), 100),
                i;
            var n = !(!e._loop && !i._sprite[o][2]);
            if (i._emit("end", e._id),
            !i._webAudio && n && i.stop(e._id, !0).play(e._id),
            i._webAudio && n) {
                i._emit("play", e._id),
                e._seek = e._start || 0,
                e._rateSeek = 0,
                e._playStart = t.ctx.currentTime;
                var a = 1e3 * (e._stop - e._start) / Math.abs(e._rate);
                i._endTimers[e._id] = setTimeout(i._ended.bind(i, e), a)
            }
            return i._webAudio && !n && (e._paused = !0,
            e._ended = !0,
            e._seek = e._start || 0,
            e._rateSeek = 0,
            i._clearTimer(e._id),
            i._cleanBuffer(e._node),
            t._autoSuspend()),
            i._webAudio || n || i.stop(e._id),
            i
        },
        _clearTimer: function(e) {
            var t = this;
            return t._endTimers[e] && (clearTimeout(t._endTimers[e]),
            delete t._endTimers[e]),
            t
        },
        _soundById: function(e) {
            for (var t = this, i = 0; i < t._sounds.length; i++)
                if (e === t._sounds[i]._id)
                    return t._sounds[i];
            return null
        },
        _inactiveSound: function() {
            var e = this;
            e._drain();
            for (var t = 0; t < e._sounds.length; t++)
                if (e._sounds[t]._ended)
                    return e._sounds[t].reset();
            return new o(e)
        },
        _drain: function() {
            var e = this
              , t = e._pool
              , i = 0
              , o = 0;
            if (!(e._sounds.length < t)) {
                for (o = 0; o < e._sounds.length; o++)
                    e._sounds[o]._ended && i++;
                for (o = e._sounds.length - 1; o >= 0; o--) {
                    if (i <= t)
                        return;
                    e._sounds[o]._ended && (e._webAudio && e._sounds[o]._node && e._sounds[o]._node.disconnect(0),
                    e._sounds.splice(o, 1),
                    i--)
                }
            }
        },
        _getSoundIds: function(e) {
            var t = this;
            if (void 0 === e) {
                for (var i = [], o = 0; o < t._sounds.length; o++)
                    i.push(t._sounds[o]._id);
                return i
            }
            return [e]
        },
        _refreshBuffer: function(e) {
            var i = this;
            return e._node.bufferSource = t.ctx.createBufferSource(),
            e._node.bufferSource.buffer = n[i._src],
            e._panner ? e._node.bufferSource.connect(e._panner) : e._node.bufferSource.connect(e._node),
            e._node.bufferSource.loop = e._loop,
            e._loop && (e._node.bufferSource.loopStart = e._start || 0,
            e._node.bufferSource.loopEnd = e._stop),
            e._node.bufferSource.playbackRate.value = e._rate,
            i
        },
        _cleanBuffer: function(e) {
            var t = this;
            if (t._scratchBuffer) {
                e.bufferSource.onended = null,
                e.bufferSource.disconnect(0);
                try {
                    e.bufferSource.buffer = t._scratchBuffer
                } catch (e) {}
            }
            return e.bufferSource = null,
            t
        }
    };
    var o = function(e) {
        this._parent = e,
        this.init()
    };
    o.prototype = {
        init: function() {
            var e = this
              , i = e._parent;
            return e._muted = i._muted,
            e._loop = i._loop,
            e._volume = i._volume,
            e._rate = i._rate,
            e._seek = 0,
            e._paused = !0,
            e._ended = !0,
            e._sprite = "__default",
            e._id = ++t._counter,
            i._sounds.push(e),
            e.create(),
            e
        },
        create: function() {
            var e = this
              , i = e._parent
              , o = t._muted || e._muted || e._parent._muted ? 0 : e._volume;
            return i._webAudio ? (e._node = void 0 === t.ctx.createGain ? t.ctx.createGainNode() : t.ctx.createGain(),
            e._node.gain.setValueAtTime(o, t.ctx.currentTime),
            e._node.paused = !0,
            e._node.connect(t.masterGain)) : (e._node = new Audio,
            e._errorFn = e._errorListener.bind(e),
            e._node.addEventListener("error", e._errorFn, !1),
            e._loadFn = e._loadListener.bind(e),
            e._node.addEventListener(t._canPlayEvent, e._loadFn, !1),
            e._node.src = i._src,
            e._node.preload = "auto",
            e._node.volume = o * t.volume(),
            e._node.load()),
            e
        },
        reset: function() {
            var e = this
              , i = e._parent;
            return e._muted = i._muted,
            e._loop = i._loop,
            e._volume = i._volume,
            e._rate = i._rate,
            e._seek = 0,
            e._rateSeek = 0,
            e._paused = !0,
            e._ended = !0,
            e._sprite = "__default",
            e._id = ++t._counter,
            e
        },
        _errorListener: function() {
            var e = this;
            e._parent._emit("loaderror", e._id, e._node.error ? e._node.error.code : 0),
            e._node.removeEventListener("error", e._errorFn, !1)
        },
        _loadListener: function() {
            var e = this
              , i = e._parent;
            i._duration = Math.ceil(10 * e._node.duration) / 10,
            0 === Object.keys(i._sprite).length && (i._sprite = {
                __default: [0, 1e3 * i._duration]
            }),
            "loaded" !== i._state && (i._state = "loaded",
            i._emit("load"),
            i._loadQueue()),
            e._node.removeEventListener(t._canPlayEvent, e._loadFn, !1)
        }
    };
    var n = {}
      , a = function(e) {
        var t = e._src;
        if (n[t])
            return e._duration = n[t].duration,
            void l(e);
        if (/^data:[^;]+;base64,/.test(t)) {
            for (var i = atob(t.split(",")[1]), o = new Uint8Array(i.length), a = 0; a < i.length; ++a)
                o[a] = i.charCodeAt(a);
            s(o.buffer, e)
        } else {
            var d = new XMLHttpRequest;
            d.open("GET", t, !0),
            d.withCredentials = e._xhrWithCredentials,
            d.responseType = "arraybuffer",
            d.onload = function() {
                var t = (d.status + "")[0];
                return "0" !== t && "2" !== t && "3" !== t ? void e._emit("loaderror", null, "Failed loading audio file with status: " + d.status + ".") : void s(d.response, e)
            }
            ,
            d.onerror = function() {
                e._webAudio && (e._html5 = !0,
                e._webAudio = !1,
                e._sounds = [],
                delete n[t],
                e.load())
            }
            ,
            r(d)
        }
    }
      , r = function(e) {
        try {
            e.send()
        } catch (t) {
            e.onerror()
        }
    }
      , s = function(e, i) {
        t.ctx.decodeAudioData(e, function(e) {
            e && i._sounds.length > 0 && (n[i._src] = e,
            l(i, e))
        }, function() {
            i._emit("loaderror", null, "Decoding audio data failed.")
        })
    }
      , l = function(e, t) {
        t && !e._duration && (e._duration = t.duration),
        0 === Object.keys(e._sprite).length && (e._sprite = {
            __default: [0, 1e3 * e._duration]
        }),
        "loaded" !== e._state && (e._state = "loaded",
        e._emit("load"),
        e._loadQueue())
    }
      , d = function() {
        try {
            "undefined" != typeof AudioContext ? t.ctx = new AudioContext : "undefined" != typeof webkitAudioContext ? t.ctx = new webkitAudioContext : t.usingWebAudio = !1
        } catch (e) {
            t.usingWebAudio = !1
        }
        var e = /iP(hone|od|ad)/.test(t._navigator && t._navigator.platform)
          , i = t._navigator && t._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)
          , o = i ? parseInt(i[1], 10) : null;
        if (e && o && o < 9) {
            var n = /safari/.test(t._navigator && t._navigator.userAgent.toLowerCase());
            (t._navigator && t._navigator.standalone && !n || t._navigator && !t._navigator.standalone && !n) && (t.usingWebAudio = !1)
        }
        t.usingWebAudio && (t.masterGain = void 0 === t.ctx.createGain ? t.ctx.createGainNode() : t.ctx.createGain(),
        t.masterGain.gain.value = t._muted ? 0 : 1,
        t.masterGain.connect(t.ctx.destination)),
        t._setup()
    };
    "function" == typeof define && define.amd && define([], function() {
        return {
            Howler: t,
            Howl: i
        }
    }),
    "undefined" != typeof exports && (exports.Howler = t,
    exports.Howl = i),
    "undefined" != typeof window ? (window.HowlerGlobal = e,
    window.Howler = t,
    window.Howl = i,
    window.Sound = o) : "undefined" != typeof global && (global.HowlerGlobal = e,
    global.Howler = t,
    global.Howl = i,
    global.Sound = o)
}(),
!function() {
    "use strict";
    HowlerGlobal.prototype._pos = [0, 0, 0],
    HowlerGlobal.prototype._orientation = [0, 0, -1, 0, 1, 0],
    HowlerGlobal.prototype.stereo = function(e) {
        var t = this;
        if (!t.ctx || !t.ctx.listener)
            return t;
        for (var i = t._howls.length - 1; i >= 0; i--)
            t._howls[i].stereo(e);
        return t
    }
    ,
    HowlerGlobal.prototype.pos = function(e, t, i) {
        var o = this;
        return o.ctx && o.ctx.listener ? (t = "number" != typeof t ? o._pos[1] : t,
        i = "number" != typeof i ? o._pos[2] : i,
        "number" != typeof e ? o._pos : (o._pos = [e, t, i],
        o.ctx.listener.setPosition(o._pos[0], o._pos[1], o._pos[2]),
        o)) : o
    }
    ,
    HowlerGlobal.prototype.orientation = function(e, t, i, o, n, a) {
        var r = this;
        if (!r.ctx || !r.ctx.listener)
            return r;
        var s = r._orientation;
        return t = "number" != typeof t ? s[1] : t,
        i = "number" != typeof i ? s[2] : i,
        o = "number" != typeof o ? s[3] : o,
        n = "number" != typeof n ? s[4] : n,
        a = "number" != typeof a ? s[5] : a,
        "number" != typeof e ? s : (r._orientation = [e, t, i, o, n, a],
        r.ctx.listener.setOrientation(e, t, i, o, n, a),
        r)
    }
    ,
    Howl.prototype.init = function(e) {
        return function(t) {
            var i = this;
            return i._orientation = t.orientation || [1, 0, 0],
            i._stereo = t.stereo || null,
            i._pos = t.pos || null,
            i._pannerAttr = {
                coneInnerAngle: void 0 !== t.coneInnerAngle ? t.coneInnerAngle : 360,
                coneOuterAngle: void 0 !== t.coneOuterAngle ? t.coneOuterAngle : 360,
                coneOuterGain: void 0 !== t.coneOuterGain ? t.coneOuterGain : 0,
                distanceModel: void 0 !== t.distanceModel ? t.distanceModel : "inverse",
                maxDistance: void 0 !== t.maxDistance ? t.maxDistance : 1e4,
                panningModel: void 0 !== t.panningModel ? t.panningModel : "HRTF",
                refDistance: void 0 !== t.refDistance ? t.refDistance : 1,
                rolloffFactor: void 0 !== t.rolloffFactor ? t.rolloffFactor : 1
            },
            i._onstereo = t.onstereo ? [{
                fn: t.onstereo
            }] : [],
            i._onpos = t.onpos ? [{
                fn: t.onpos
            }] : [],
            i._onorientation = t.onorientation ? [{
                fn: t.onorientation
            }] : [],
            e.call(this, t)
        }
    }(Howl.prototype.init),
    Howl.prototype.stereo = function(t, i) {
        var o = this;
        if (!o._webAudio)
            return o;
        if ("loaded" !== o._state)
            return o._queue.push({
                event: "stereo",
                action: function() {
                    o.stereo(t, i)
                }
            }),
            o;
        var n = void 0 === Howler.ctx.createStereoPanner ? "spatial" : "stereo";
        if (void 0 === i) {
            if ("number" != typeof t)
                return o._stereo;
            o._stereo = t,
            o._pos = [t, 0, 0]
        }
        for (var a = o._getSoundIds(i), r = 0; r < a.length; r++) {
            var s = o._soundById(a[r]);
            if (s) {
                if ("number" != typeof t)
                    return s._stereo;
                s._stereo = t,
                s._pos = [t, 0, 0],
                s._node && (s._pannerAttr.panningModel = "equalpower",
                s._panner && s._panner.pan || e(s, n),
                "spatial" === n ? s._panner.setPosition(t, 0, 0) : s._panner.pan.value = t),
                o._emit("stereo", s._id)
            }
        }
        return o
    }
    ,
    Howl.prototype.pos = function(t, i, o, n) {
        var a = this;
        if (!a._webAudio)
            return a;
        if ("loaded" !== a._state)
            return a._queue.push({
                event: "pos",
                action: function() {
                    a.pos(t, i, o, n)
                }
            }),
            a;
        if (i = "number" != typeof i ? 0 : i,
        o = "number" != typeof o ? -.5 : o,
        void 0 === n) {
            if ("number" != typeof t)
                return a._pos;
            a._pos = [t, i, o]
        }
        for (var r = a._getSoundIds(n), s = 0; s < r.length; s++) {
            var l = a._soundById(r[s]);
            if (l) {
                if ("number" != typeof t)
                    return l._pos;
                l._pos = [t, i, o],
                l._node && (l._panner && !l._panner.pan || e(l, "spatial"),
                l._panner.setPosition(t, i, o)),
                a._emit("pos", l._id)
            }
        }
        return a
    }
    ,
    Howl.prototype.orientation = function(t, i, o, n) {
        var a = this;
        if (!a._webAudio)
            return a;
        if ("loaded" !== a._state)
            return a._queue.push({
                event: "orientation",
                action: function() {
                    a.orientation(t, i, o, n)
                }
            }),
            a;
        if (i = "number" != typeof i ? a._orientation[1] : i,
        o = "number" != typeof o ? a._orientation[2] : o,
        void 0 === n) {
            if ("number" != typeof t)
                return a._orientation;
            a._orientation = [t, i, o]
        }
        for (var r = a._getSoundIds(n), s = 0; s < r.length; s++) {
            var l = a._soundById(r[s]);
            if (l) {
                if ("number" != typeof t)
                    return l._orientation;
                l._orientation = [t, i, o],
                l._node && (l._panner || (l._pos || (l._pos = a._pos || [0, 0, -.5]),
                e(l, "spatial")),
                l._panner.setOrientation(t, i, o)),
                a._emit("orientation", l._id)
            }
        }
        return a
    }
    ,
    Howl.prototype.pannerAttr = function() {
        var t, i, o, n = this, a = arguments;
        if (!n._webAudio)
            return n;
        if (0 === a.length)
            return n._pannerAttr;
        if (1 === a.length) {
            if ("object" != typeof a[0])
                return o = n._soundById(parseInt(a[0], 10)),
                o ? o._pannerAttr : n._pannerAttr;
            t = a[0],
            void 0 === i && (t.pannerAttr || (t.pannerAttr = {
                coneInnerAngle: t.coneInnerAngle,
                coneOuterAngle: t.coneOuterAngle,
                coneOuterGain: t.coneOuterGain,
                distanceModel: t.distanceModel,
                maxDistance: t.maxDistance,
                refDistance: t.refDistance,
                rolloffFactor: t.rolloffFactor,
                panningModel: t.panningModel
            }),
            n._pannerAttr = {
                coneInnerAngle: void 0 !== t.pannerAttr.coneInnerAngle ? t.pannerAttr.coneInnerAngle : n._coneInnerAngle,
                coneOuterAngle: void 0 !== t.pannerAttr.coneOuterAngle ? t.pannerAttr.coneOuterAngle : n._coneOuterAngle,
                coneOuterGain: void 0 !== t.pannerAttr.coneOuterGain ? t.pannerAttr.coneOuterGain : n._coneOuterGain,
                distanceModel: void 0 !== t.pannerAttr.distanceModel ? t.pannerAttr.distanceModel : n._distanceModel,
                maxDistance: void 0 !== t.pannerAttr.maxDistance ? t.pannerAttr.maxDistance : n._maxDistance,
                refDistance: void 0 !== t.pannerAttr.refDistance ? t.pannerAttr.refDistance : n._refDistance,
                rolloffFactor: void 0 !== t.pannerAttr.rolloffFactor ? t.pannerAttr.rolloffFactor : n._rolloffFactor,
                panningModel: void 0 !== t.pannerAttr.panningModel ? t.pannerAttr.panningModel : n._panningModel
            })
        } else
            2 === a.length && (t = a[0],
            i = parseInt(a[1], 10));
        for (var r = n._getSoundIds(i), s = 0; s < r.length; s++)
            if (o = n._soundById(r[s])) {
                var l = o._pannerAttr;
                l = {
                    coneInnerAngle: void 0 !== t.coneInnerAngle ? t.coneInnerAngle : l.coneInnerAngle,
                    coneOuterAngle: void 0 !== t.coneOuterAngle ? t.coneOuterAngle : l.coneOuterAngle,
                    coneOuterGain: void 0 !== t.coneOuterGain ? t.coneOuterGain : l.coneOuterGain,
                    distanceModel: void 0 !== t.distanceModel ? t.distanceModel : l.distanceModel,
                    maxDistance: void 0 !== t.maxDistance ? t.maxDistance : l.maxDistance,
                    refDistance: void 0 !== t.refDistance ? t.refDistance : l.refDistance,
                    rolloffFactor: void 0 !== t.rolloffFactor ? t.rolloffFactor : l.rolloffFactor,
                    panningModel: void 0 !== t.panningModel ? t.panningModel : l.panningModel
                };
                var d = o._panner;
                d ? (d.coneInnerAngle = l.coneInnerAngle,
                d.coneOuterAngle = l.coneOuterAngle,
                d.coneOuterGain = l.coneOuterGain,
                d.distanceModel = l.distanceModel,
                d.maxDistance = l.maxDistance,
                d.refDistance = l.refDistance,
                d.rolloffFactor = l.rolloffFactor,
                d.panningModel = l.panningModel) : (o._pos || (o._pos = n._pos || [0, 0, -.5]),
                e(o, "spatial"))
            }
        return n
    }
    ,
    Sound.prototype.init = function(e) {
        return function() {
            var t = this
              , i = t._parent;
            t._orientation = i._orientation,
            t._stereo = i._stereo,
            t._pos = i._pos,
            t._pannerAttr = i._pannerAttr,
            e.call(this),
            t._stereo ? i.stereo(t._stereo) : t._pos && i.pos(t._pos[0], t._pos[1], t._pos[2], t._id)
        }
    }(Sound.prototype.init),
    Sound.prototype.reset = function(e) {
        return function() {
            var t = this
              , i = t._parent;
            return t._orientation = i._orientation,
            t._pos = i._pos,
            t._pannerAttr = i._pannerAttr,
            e.call(this)
        }
    }(Sound.prototype.reset);
    var e = function(e, t) {
        t = t || "spatial",
        "spatial" === t ? (e._panner = Howler.ctx.createPanner(),
        e._panner.coneInnerAngle = e._pannerAttr.coneInnerAngle,
        e._panner.coneOuterAngle = e._pannerAttr.coneOuterAngle,
        e._panner.coneOuterGain = e._pannerAttr.coneOuterGain,
        e._panner.distanceModel = e._pannerAttr.distanceModel,
        e._panner.maxDistance = e._pannerAttr.maxDistance,
        e._panner.refDistance = e._pannerAttr.refDistance,
        e._panner.rolloffFactor = e._pannerAttr.rolloffFactor,
        e._panner.panningModel = e._pannerAttr.panningModel,
        e._panner.setPosition(e._pos[0], e._pos[1], e._pos[2]),
        e._panner.setOrientation(e._orientation[0], e._orientation[1], e._orientation[2])) : (e._panner = Howler.ctx.createStereoPanner(),
        e._panner.pan.value = e._stereo),
        e._panner.connect(e._node),
        e._paused || e._parent.pause(e._id, !0).play(e._id)
    }
}(),
function(e) {
    var t = !1;
    if ("function" == typeof define && define.amd && (define(e),
    t = !0),
    "object" == typeof exports && (module.exports = e(),
    t = !0),
    !t) {
        var i = window.Cookies
          , o = window.Cookies = e();
        o.noConflict = function() {
            return window.Cookies = i,
            o
        }
    }
}(function() {
    function e() {
        for (var e = 0, t = {}; e < arguments.length; e++) {
            var i = arguments[e];
            for (var o in i)
                t[o] = i[o]
        }
        return t
    }
    function t(i) {
        function o(t, n, a) {
            var r;
            if ("undefined" != typeof document) {
                if (arguments.length > 1) {
                    if (a = e({
                        path: "/"
                    }, o.defaults, a),
                    "number" == typeof a.expires) {
                        var s = new Date;
                        s.setMilliseconds(s.getMilliseconds() + 864e5 * a.expires),
                        a.expires = s
                    }
                    a.expires = a.expires ? a.expires.toUTCString() : "";
                    try {
                        r = JSON.stringify(n),
                        /^[\{\[]/.test(r) && (n = r)
                    } catch (e) {}
                    n = i.write ? i.write(n, t) : encodeURIComponent(String(n)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent),
                    t = encodeURIComponent(String(t)),
                    t = t.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent),
                    t = t.replace(/[\(\)]/g, escape);
                    var l = "";
                    for (var d in a)
                        a[d] && (l += "; " + d,
                        a[d] !== !0 && (l += "=" + a[d]));
                    return document.cookie = t + "=" + n + l
                }
                t || (r = {});
                for (var c = document.cookie ? document.cookie.split("; ") : [], _ = /(%[0-9A-Z]{2})+/g, p = 0; p < c.length; p++) {
                    var u = c[p].split("=")
                      , h = u.slice(1).join("=");
                    '"' === h.charAt(0) && (h = h.slice(1, -1));
                    try {
                        var v = u[0].replace(_, decodeURIComponent);
                        if (h = i.read ? i.read(h, v) : i(h, v) || h.replace(_, decodeURIComponent),
                        this.json)
                            try {
                                h = JSON.parse(h)
                            } catch (e) {}
                        if (t === v) {
                            r = h;
                            break
                        }
                        t || (r[v] = h)
                    } catch (e) {}
                }
                return r
            }
        }
        return o.set = o,
        o.get = function(e) {
            return o.call(o, e);
        }
        ,
        o.getJSON = function() {
            return o.apply({
                json: !0
            }, [].slice.call(arguments))
        }
        ,
        o.defaults = {},
        o.remove = function(t, i) {
            o(t, "", e(i, {
                expires: -1
            }))
        }
        ,
        o.withConverter = t,
        o
    }
    return t(function() {})
}),
function() {
    "use strict";
    var e = "undefined" != typeof module && module.exports
      , t = "undefined" != typeof Element && "ALLOW_KEYBOARD_INPUT"in Element
      , i = function() {
        for (var e, t, i = [["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"], ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"], ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"], ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"], ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]], o = 0, n = i.length, a = {}; o < n; o++)
            if (e = i[o],
            e && e[1]in document) {
                for (o = 0,
                t = e.length; o < t; o++)
                    a[i[0][o]] = e[o];
                return a
            }
        return !1
    }()
      , o = {
        request: function(e) {
            var o = i.requestFullscreen;
            e = e || document.documentElement,
            /5\.1[\.\d]* Safari/.test(navigator.userAgent) ? e[o]() : e[o](t && Element.ALLOW_KEYBOARD_INPUT)
        },
        exit: function() {
            document[i.exitFullscreen]()
        },
        toggle: function(e) {
            this.isFullscreen ? this.exit() : this.request(e)
        },
        raw: i
    };
    return i ? (Object.defineProperties(o, {
        isFullscreen: {
            get: function() {
                return Boolean(document[i.fullscreenElement])
            }
        },
        element: {
            enumerable: !0,
            get: function() {
                return document[i.fullscreenElement]
            }
        },
        enabled: {
            enumerable: !0,
            get: function() {
                return Boolean(document[i.fullscreenEnabled])
            }
        }
    }),
    void (e ? module.exports = o : window.screenfull = o)) : void (e ? module.exports = !1 : window.screenfull = !1)
}();
var jv = {};
jv.assets = [],
jv.state = "init",
jv.pixiver = 4,
jv.fps = 0,
jv.load = function(e) {
    jv.assets.push(e)
}
,
jv.include = function(e) {
    jv.includes += 1,
    loadScript(e, jv.include_loaded)
}
,
jv.include_loaded = function() {
    jv.includes -= 1
}
,
jv.fps_obj = {
    startTime: 0,
    frameNumber: 0,
    getFPS: function() {
        this.frameNumber++;
        var e = (new Date).getTime()
          , t = (e - this.startTime) / 1e3
          , i = Math.round(this.frameNumber / t);
        return t > 1 && (this.startTime = e,
        this.frameNumber = 0),
        i
    }
},
jv.frame = function() {
    requestAnimationFrame(jv.frame),
    jv.fps_num = jv.fps_obj.getFPS()
    try {
	jv.loop()
    } catch (err) {
	console.log(err,"during jv.loop")
    }
    jv.renderer.render(jv.stage)
}
,
jv.add = jv.addChild = function(e) {
    jv.stage.addChild(e)
}
,
jv.gpu_detect = function(e) {
    var t, i, o, n, a = document.createElement("canvas");
    try {
        t = a.getContext("webgl") || a.getContext("experimental-webgl")
    } catch (e) {}
    return !(!t || (i = t.getExtension("WEBGL_debug_renderer_info"),
    o = t.getParameter(i.UNMASKED_VENDOR_WEBGL),
    n = t.getParameter(i.UNMASKED_RENDERER_WEBGL),
    o.indexOf(e) === -1 && n.indexOf(e) === -1))
}
,
jv.screen = function(e, t) {
    var i = jv.gpu_detect("Mali-4");
    jv.renderer = new PIXI.autoDetectRenderer(e,t,{
        antialias: !1,
        view: document.getElementById("jv"),
        preserveDrawingBuffer: i,
        roundPixels: !0
    }),
    PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST,
    jv.stage = new PIXI.Container,
    jv.stage.scaleMode = PIXI.SCALE_MODES.NEAREST,
    jv.stage.interactive = !0,
    jv.stage.hitArea = new PIXI.Rectangle(0,0,e,t),
    jv.mouseDown = !1,
    jv.stage.mousedown = function() {
        jv.mouseDown = !0
    }
    ,
    jv.stage.mouseup = function() {
        jv.mouseDown = !1
    }
    ,
    jv.mouse = jv.renderer.plugins.interaction.mouse.global
}
,
jv.image = function(e) {
    var t = PIXI.Texture.fromImage(e);
    return t
}
,
jv.scene = function() {
    return new PIXI.Container
}
,
jv.text = function(e, t) {
    return "undefined" == typeof t && (t = {
        font: "24px Verdana",
        fill: "white"
    }),
    new PIXI.Text(e,t)
}
,
jv.spritesheet = function(e, t, i, o) {
    var n = "string" == typeof e ? PIXI.TextureCache[e] : e
      , a = n.baseTexture;
    if (24 == t && 32 == i && 128 != a.width && (t = Math.floor(a.width / 3),
    i = Math.floor(a.height / 4),
    o = 2),
    a.scaleMode = n.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST,
    o)
        if (4 == jv.pixiver) {
            var r = new PIXI.BaseRenderTexture(a.width * o,a.height * o,PIXI.SCALE_MODES.NEAREST,1)
              , s = new PIXI.RenderTexture(r)
              , l = new PIXI.Sprite.from(a);
            l.scale.x = o,
            l.scale.y = o,
            jv.renderer.render(l, s),
            a = s.baseTexture,
            t *= o,
            i *= o
        } else {
            var s = new PIXI.RenderTexture(jv.renderer,a.width * o,a.height * o,PIXI.SCALE_MODES.NEAREST,1)
              , l = new PIXI.Sprite(n)
              , d = new PIXI.Container;
            l.scale.x = o,
            l.scale.y = o,
            d.addChild(l),
            s.render(d),
            a = s.baseTexture,
            t *= o,
            i *= o
        }
    var c, _, p = [];
    for (c = 0; c < Math.floor(a.width / t); c++)
        for (void 0 == p[c] && (p[c] = []),
        _ = 0; _ < Math.floor(a.height / i); _++)
            p[c][_] = new PIXI.Texture(a,new PIXI.Rectangle(c * t,_ * i,t,i));
    return p
}
,
jv.sprite = function(e) {
    return "string" == typeof e ? new PIXI.Sprite.fromImage(e) : new PIXI.Sprite(e)
}
,
jv.bringToFront = function(e) {
    if (e.parent) {
        var t = e.parent;
        t.removeChild(e),
        t.addChild(e)
    }
}
,
jv.prevent = function(e) {
    return e.preventDefault(),
    1
}
,
jv.key_array = [],
jv.keyboard = function(e) {
    var t = {};
    return jv.key_array.push(t),
    t.code = e,
    t.isDown = !1,
    t.isUp = !0,
    t.press = void 0,
    t.release = void 0,
    t.downHandler = function(e) {
        jv.prevent(e) && e.keyCode === t.code && (t.isUp && t.press && t.press(),
        t.isDown = !0,
        t.isUp = !1)
    }
    ,
    t.upHandler = function(e) {
        jv.prevent(e) && e.keyCode === t.code && (t.isDown && t.release && t.release(),
        t.isDown = !1,
        t.isUp = !0)
    }
    ,
    window.addEventListener("keydown", t.downHandler.bind(t), !1),
    window.addEventListener("keyup", t.upHandler.bind(t), !1),
    t
}
,
jv.unzip = function(e) {
    for (var t, i = {}, o = (e + "").split(""), n = o[0], a = n, r = [n], s = 57344, l = 1; l < o.length; l++) {
        var d = o[l].charCodeAt(0);
        t = d < 57344 ? o[l] : i[d] ? i[d] : a + n,
        r.push(t),
        n = t.charAt(0),
        i[s] = a + n,
        s++,
        a = t
    }
    return r.join("")
}
,
jv.zip = function(e) {
    for (var t, i = {}, o = (e + "").split(""), n = [], a = o[0], r = 57344, s = 1; s < o.length; s++)
        t = o[s],
        null != i[a + t] ? a += t : (n.push(a.length > 1 ? i[a] : a.charCodeAt(0)),
        i[a + t] = r,
        r++,
        a = t);
    n.push(a.length > 1 ? i[a] : a.charCodeAt(0));
    for (var s = 0; s < n.length; s++)
        n[s] = String.fromCharCode(n[s]);
    return n.join("")
}
,
jv.random = function(e, t) {
    return Math.floor(Math.random() * t + e)
}
,
jv.toString = function(e) {
    return JSON.stringify(e)
}
,
jv.fromString = function(e) {
    return JSON.parse(e)
}
,
jv.hit = function(e, t) {
    var i, o, n, a, r;
    return i = !1,
    e.centerX = e.x + e.width / 2,
    e.centerY = e.y + e.height / 2,
    t.centerX = t.x + t.width / 2,
    t.centerY = t.y + t.height / 2,
    e.halfWidth = e.width / 2,
    e.halfHeight = e.height / 2,
    t.halfWidth = t.width / 2,
    t.halfHeight = t.height / 2,
    a = e.centerX - t.centerX,
    r = e.centerY - t.centerY,
    o = e.halfWidth + t.halfWidth,
    n = e.halfHeight + t.halfHeight,
    i = Math.abs(a) < o && Math.abs(r) < n
}
;
var Warehouse = {
    create: function(e) {
        "undefined" == typeof e && (e = "wid");
        var t = {};
        return t.items = [],
        t.next_id = 0,
        t.index = e,
        t.add = function(e) {
            e[this.index] = this.next_id++,
            e.array_obj = this,
            e.remove = function() {
                this.ref && (this.ref[this.id] = null),
                this.array_obj.items[this.array_index] = null
            }
            ;
            var t, i = this.items.length;
            for (t = 0; t < i; t++)
                if (!this.items[t])
                    return e.array_index = t,
                    void (this.items[t] = e);
            e.array_index = this.items.length,
            this.items.push(e)
        }
        ,
        t.fetch = function(e, t) {
            "undefined" == typeof t && (t = this.index);
            var i, o = this.items.length;
            for (i = 0; i < o; i++)
                if (this.items[i] && this.items[i][t] == e)
                    return this.items[i];
            return o && null === this.items[o - 1] && (this.items.length = o - 1),
            null
        }
        ,
        t.process = function(e) {
            var t, i = this.items.length;
            for (t = 0; t < i; t++)
                this.items[t] && e(this.items[t]);
            i && null === this.items[i - 1] && (this.items.length = i - 1)
        }
        ,
        t
    }
}
  , Effect = {
    create: function(e, t) {
        var i = {};
        return i.x = Math.floor(e / 32),
        i.y = Math.floor(t / 32),
        i.life = 5,
        i.sprite = 155,
        i.draw = function() {}
        ,
        i.update = function() {
            this.life--,
            this.life <= 0 && this.destroy()
        }
        ,
        i
    }
}
  , Tile = {
    sprite: 0,
    x: 0,
    y: 0
}
  , Map = {
    create: function(e, t, i) {
        var o = {};
        return o.map = [[]],
        o.container = e,
        o.sheet = t,
        o.sheet_width = i,
        o.get = function(e, t) {
            return void 0 == this.map[e] && (this.map[e] = []),
            this.map[e][t]
        }
        ,
        o.set = function(e, t, i, o) {
            var n = jv.sprite(this.sheet[i][o]);
            return n.sprite = i + o * this.sheet_width,
            void 0 == this.map[e] && (this.map[e] = []),
            void 0 != n.x && (void 0 != this.map[e][t] && void 0 != this.map[e][t].x && this.map[e][t].parent.removeChild(this.map[e][t]),
            n.x = e * n.width,
            n.y = t * n.height),
            this.map[e][t] = n,
            this.container.addChild(n),
            n
        }
        ,
        o.clear = function() {
            this.process(function(e, t, i) {
                void 0 != i && void 0 != i.x && i.parent.removeChild(i),
                i = null
            }),
            this.map = [[]]
        }
        ,
        o.load = function(e) {
            this.clear(),
            "string" == typeof e && (e = jv.fromString(e));
            for (var t in e)
                for (var i in e[t])
                    void 0 != e[t][i] && null != e[t][i] && this.set(t, i, e[t][i] % this.sheet_width, Math.floor(e[t][i] / this.sheet_width))
        }
        ,
        o.raw = function() {
            var e = [];
            for (var t in this.map) {
                void 0 == this.map[t] && (this.map[t] = []),
                e[t] = [];
                for (var i in this.map[t])
                    e[t][i] = this.map[t][i].sprite
            }
            return e
        }
        ,
        o.process = function(e) {
            for (var t in this.map) {
                void 0 == this.map[t] && (this.map[t] = []);
                for (var i in this.map[t])
                    void 0 != this.map[t][i] && e(t, i, this.map[t][i])
            }
        }
        ,
        o.draw = function() {}
        ,
        o
    }
};
jv.base64_encode = function(e) {
    if ("undefined" == typeof window)
        return new Buffer(e).toString("base64");
    if ("undefined" != typeof window.btoa)
        return window.btoa(decodeURIComponent(encodeURIComponent(e)));
    var t, i, o, n, a, r, s, l, d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", c = 0, _ = 0, p = "", u = [];
    if (!e)
        return e;
    e = decodeURIComponent(encodeURIComponent(e));
    do
        t = e.charCodeAt(c++),
        i = e.charCodeAt(c++),
        o = e.charCodeAt(c++),
        l = t << 16 | i << 8 | o,
        n = l >> 18 & 63,
        a = l >> 12 & 63,
        r = l >> 6 & 63,
        s = 63 & l,
        u[_++] = d.charAt(n) + d.charAt(a) + d.charAt(r) + d.charAt(s);
    while (c < e.length);p = u.join("");
    var h = e.length % 3;
    return (h ? p.slice(0, h - 3) : p) + "===".slice(h || 3)
}
,
jv.base64_decode = function(e) {
    if ("undefined" == typeof window)
        return new Buffer(e,"base64").toString("utf-8");
    if ("undefined" != typeof window.atob)
        return decodeURIComponent(encodeURIComponent(window.atob(e)));
    var t, i, o, n, a, r, s, l, d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", c = 0, _ = 0, p = "", u = [];
    if (!e)
        return e;
    e += "";
    do
        n = d.indexOf(e.charAt(c++)),
        a = d.indexOf(e.charAt(c++)),
        r = d.indexOf(e.charAt(c++)),
        s = d.indexOf(e.charAt(c++)),
        l = n << 18 | a << 12 | r << 6 | s,
        t = l >> 16 & 255,
        i = l >> 8 & 255,
        o = 255 & l,
        64 === r ? u[_++] = String.fromCharCode(t) : 64 === s ? u[_++] = String.fromCharCode(t, i) : u[_++] = String.fromCharCode(t, i, o);
    while (c < e.length);return p = u.join(""),
    decodeURIComponent(encodeURIComponent(p.replace(/\0+$/, "")))
}
;
var game_load = function() {
    "init" === jv.state && (jv.state = "scripts",
    jv.init && jv.init(),
    jv.loop && jv.frame(),
    jv.state = "loading",
    PIXI.loader.add(jv.assets).load(jv.ready),
    void 0 !== load_progress && PIXI.loader.on("progress", load_progress))
}
  , version = "4.63.8"
  , vt = "?v=" + version
  , path = "/"
  , res = []
  , debugging = 0
  , clothes_fixed = [1, 2, 3, 4, 6, 8, 9, 10, 11]
  , clothes_hooded = [5, 9]
  , hair_fixed = [6, 11, 12, 15, 16]
  , hair_front = [10, 14]
  , max_clothes = 11
  , max_body = 9
  , max_hair = 16;
jv.selected_ip = "173.255.234.46";
var phone = !!window.cordova;
phone ? (path = "",
Howler.mobileAutoEnable = !0,
document.addEventListener("deviceready", game_load)) : window.onload = game_load,
res.push(path + "data/body/e1.png" + vt);
for (var i = 1; i <= max_body; i++)
    res.push(path + "data/body/b" + i + ".png" + vt);
for (var i = 1; i <= max_clothes; i++)
    res.push(path + "data/clothes/c" + i + "_a.png" + vt),
    clothes_fixed.indexOf(i) != -1 && res.push(path + "data/clothes/c" + i + "_b.png" + vt);
for (var i = 1; i <= max_hair; i++)
    res.push(path + "data/hair/h" + i + "_a.png" + vt),
    hair_fixed.indexOf(i) != -1 && res.push(path + "data/hair/h" + i + "_b.png" + vt),
    hair_front.indexOf(i) != -1 && res.push(path + "data/hair/h" + i + "_c.png" + vt);
for (var i = 1; i <= 127; i++)
    res.push(path + "data/monsters/" + i + ".png" + vt);
res = res.concat([path + "data/misc/splash_screen.jpg" + vt, path + "data/misc/mapfont.fnt" + vt, path + "data/misc/tile16.png" + vt, path + "data/misc/item16.png" + vt, path + "data/misc/compass.png" + vt, path + "data/misc/star.png" + vt, path + "data/misc/edges.png" + vt, path + "data/misc/chat_say.png" + vt, path + "data/misc/chat_tell.png" + vt, path + "data/misc/chat_global.png" + vt, path + "data/misc/chat_tribe.png" + vt, path + "data/misc/sound_icon.png" + vt, path + "data/misc/music_icon.png" + vt, path + "data/misc/color.png" + vt, path + "data/misc/buffs.png" + vt]),
jv.load(res);
var sound = []
  , load_sounds = function() {
    sound.swish = [new Howl({
        src: [path + "sounds/swish.mp3"]
    }), new Howl({
        src: [path + "sounds/swish2.mp3"]
    })],
    sound.pickaxe = [new Howl({
        src: [path + "sounds/pickaxe1.mp3"]
    }), new Howl({
        src: [path + "sounds/pickaxe2.mp3"]
    })],
    sound.shovel = [new Howl({
        src: [path + "sounds/shovel1.mp3"]
    }), new Howl({
        src: [path + "sounds/shovel2.mp3"]
    })],
    sound.chop = [new Howl({
        src: [path + "sounds/chop.mp3"]
    })],
    sound.drop = [new Howl({
        src: [path + "sounds/drop.mp3"]
    })],
    sound.bush = [new Howl({
        src: [path + "sounds/berry.mp3"]
    })],
    sound.hammer = [new Howl({
        src: [path + "sounds/hammer_wall.mp3"]
    })],
    sound.blood = [new Howl({
        src: [path + "sounds/slap.mp3"]
    })],
    sound.hit = [new Howl({
        src: [path + "sounds/punch.mp3"]
    })],
    sound.crit = [new Howl({
        src: [path + "sounds/splatter.mp3"]
    })],
    sound.stab = [new Howl({
        src: [path + "sounds/stab.mp3"]
    })],
    sound.sword_equip = [new Howl({
        src: [path + "sounds/sword_equip.mp3"]
    })],
    sound.chicken = [new Howl({
        src: [path + "sounds/chicken.mp3"]
    })],
    sound.chick = [new Howl({
        src: [path + "sounds/chick.mp3"]
    })],
    sound.water = [new Howl({
        src: [path + "sounds/water.mp3"]
    })],
    sound.water_pour = [new Howl({
        src: [path + "sounds/water_pour.mp3"]
    })],
    sound.cow = [new Howl({
        src: [path + "sounds/cow1.mp3"]
    }), new Howl({
        src: [path + "sounds/cow2.mp3"]
    })],
    sound.sheep = [new Howl({
        src: [path + "sounds/sheep.mp3"]
    })],
    sound.door_open = [new Howl({
        src: [path + "sounds/door_open.mp3"]
    })],
    sound.door_close = [new Howl({
        src: [path + "sounds/door_close.mp3"]
    })],
    sound.cooking = [new Howl({
        src: [path + "sounds/cooking.mp3"]
    })],
    sound.shield_block = [new Howl({
        src: [path + "sounds/shieldblock1.mp3"]
    }), new Howl({
        src: [path + "sounds/shieldblock2.mp3"]
    })],
    sound.death = [new Howl({
        src: [path + "sounds/death_animal.mp3"]
    })],
    sound.arrow = [new Howl({
        src: [path + "sounds/arrow.mp3"]
    })],
    sound.knitting = [new Howl({
        src: [path + "sounds/knitting.mp3"]
    })],
    sound.thud = [new Howl({
        src: [path + "sounds/thud.mp3"]
    })],
    sound.building = [new Howl({
        src: [path + "sounds/building.mp3"]
    })],
    sound.twinkle = [new Howl({
        src: [path + "sounds/twinkle.mp3"]
    })],
    sound.woosh = [new Howl({
        src: [path + "sounds/woosh.mp3"]
    })],
    sound.swoosh = [new Howl({
        src: [path + "sounds/swoosh.mp3"]
    })],
    sound.restore = [new Howl({
        src: [path + "sounds/restore.mp3"]
    })],
    sound.level = [new Howl({
        src: [path + "sounds/level.mp3"]
    })],
    sound.fireball = [new Howl({
        src: [path + "sounds/fireball.mp3"]
    })],
    sound.whip = [new Howl({
        src: [path + "sounds/whip.mp3"]
    })],
    sound.steps = [new Howl({
        src: [path + "sounds/steps.mp3"]
    })],
    sound.eat = [new Howl({
        src: [path + "sounds/eating1.mp3"]
    }), new Howl({
        src: [path + "sounds/eating2.mp3"]
    })],
    sound.click = [new Howl({
        src: [path + "sounds/click.mp3"]
    })],
    sound.myst = [new Howl({
        src: [path + "sounds/myst1.mp3"]
    }), new Howl({
        src: [path + "sounds/myst2.mp3"]
    })],
    sound.rain = [new Howl({
        src: [path + "sounds/rain.mp3"]
    })],
    sound.dash = [new Howl({
        src: [path + "sounds/dash.mp3"]
    })],
    sound.barrier = [new Howl({
        src: [path + "sounds/barrier.mp3"]
    })],
    sound.pages = [new Howl({
        src: [path + "sounds/pages.mp3"]
    })],
    sound.skill_up = [new Howl({
        src: [path + "sounds/skill_up.mp3"]
    })],
    sound.swap = [new Howl({
        src: [path + "sounds/swap.mp3"]
    })]
}
  , music = [];
jv.current_song = null,
jv.music_volume = .4,
jv.sound_volume = .5,
Howler.volume(.75);
var show_fps = 0;
debugging && (show_fps = 1);
var GAME_INIT = 0, GAME_TITLE = 1, GAME_PLAYING = 2, me = -1, myself, family, fps, fps_time, fps_frames = 0, game_state = GAME_INIT, editor, editing = 0, inputting = 0, action = 0, dest = -1, last_ping = Date.now(), ping_count = 0, ping = 100, dlevel = "", cur_wall = 0, cur_cover = 0, last_dest = 0, has_focus = 1, has_quit = 0, drag = void 0, sound_on = 1, select = 0, build_type = "", build_page = 0, cave_wall = 175, cave_floor = 73, keyRight = jv.keyboard(39), keyLeft = jv.keyboard(37), keyUp = jv.keyboard(38), keyDown = jv.keyboard(40), keyCtrl = jv.keyboard(17), keyShift = jv.keyboard(16), keySpace = jv.keyboard(32), keyEnter = jv.keyboard(13), keyEscape = jv.keyboard(27), keyQ = jv.keyboard(81), keyE = jv.keyboard(69), keyR = jv.keyboard(82), keyT = jv.keyboard(84), keyF = jv.keyboard(70), keyW = jv.keyboard(87), keyA = jv.keyboard(65), keyS = jv.keyboard(83), keyD = jv.keyboard(68), keyC = jv.keyboard(67), keyB = jv.keyboard(66), keyI = jv.keyboard(73), keyK = jv.keyboard(75), keyU = jv.keyboard(85), keyM = jv.keyboard(77), key1 = jv.keyboard(49), key2 = jv.keyboard(50), key3 = jv.keyboard(51), key4 = jv.keyboard(52), key5 = jv.keyboard(53), key6 = jv.keyboard(54), key7 = jv.keyboard(55), key8 = jv.keyboard(56), key9 = jv.keyboard(57), keyComma = jv.keyboard(188), keyPeriod = jv.keyboard(190), keySlash = jv.keyboard(191), keyBackslash = jv.keyboard(220), keyBracket = jv.keyboard(221), keyQuote = jv.keyboard(222), connection, theme, myName = !1, mobs = Warehouse.create(), objects = Warehouse.create(), effects = Warehouse.create(), hp_status, skill_status, exp_status, hunger_status, object_dict = [], player_dict = [], effect_dict = [], obj_ref = [], mob_ref = [], map = [], MAP_WIDTH = 100, MAP_HEIGHT = 100, item_length = 15, build_length = 15, view_width = 13, view_height = 13, hero_x = 224, hero_y = 224, mx = 0, my = 0, center_x, center_y, last_status, now = Date.now(), animation_timer = Date.now(), heading = "", drop_amt = "all", last_tell = "", master_container, map_container, object_container, player_container, anim_map_container, edge_container, effect_container, hover_container, ui_container, cover = [], map_index = {}, item_page = 0, item_data = [], inv = [], bld = [], build_data = [];
tile_speed = {};
var space_timer = Date.now(), space_toggle = 0, update_sort = 1, last_sort = 0, is_chatting = 0, monster = [], chars = [], clothes = [], hair = [], tiles, items, edges, wall_sprite, compass, inventory, graphics, ph_pickup, ph_action, input_field, touching = 0, touchx, touchy, target, map_fade, game_fade, fade_to = 1;
jv.game_width = 740,
jv.game_height = 416,
jv.color_bright = 7834252,
jv.color_light = 6583413,
jv.color_medium = 5005152,
jv.color_base = 3686992,
jv.color_dark = 2699322,
jv.initializeStore = function() {
    jv.store_initialized = 1,
    store.verbosity = store.INFO,
    store.register({
        id: "diamond10usd",
        alias: "30 Diamonds",
        type: store.CONSUMABLE
    }),
    store.register({
        id: "android.test.purchased",
        alias: "Test Product",
        type: store.CONSUMABLE
    }),
    store.ready(function() {}),
    store.when("product").approved(function(e) {
        e.finish(),
        alert("Approved/Finished")
    }),
    store.error(function(e) {
        console.log("ERROR " + e.code + ": " + e.message)
    }),
    store.refresh()
}
,
jv.purchase = function(e) {
    e || (e = "diamond10usd"),
    store.order(e).then(function() {
        alert("Waiting on approval..")
    })
}
,
jv.init = function() {
    function e(e) {
        return e.preventDefault(),
        keyEscape.press && keyEscape.press(),
        !1
    }
    phone && (StatusBar.hide(),
    screen.orientation.lock("landscape"),
    document.addEventListener("backbutton", e, !1)),
    jv.screen(jv.game_width, jv.game_height),
    "undefined" != typeof do_resize && do_resize();
    var t = new PIXI.Graphics;
    t.beginFill(4473924, 1),
    t.drawRect(0, 0, jv.game_width / 2, 40),
    t.endFill(),
    t.beginFill(5592405, 1),
    t.drawRect(4, 4, jv.game_width / 2 - 8, 32),
    t.endFill(),
    t.beginFill(6710886, 1),
    t.drawRect(8, 8, jv.game_width / 2 - 16, 24),
    t.endFill(),
    jv.loading_bar = new PIXI.Graphics,
    jv.loading_text = jv.text("Loading 0%", {
        font: "10px Verdana",
        fill: 16777215,
        lineJoin: "round",
        stroke: 6710886,
        strokeThickness: 1
    }),
    jv.loading_text.y = -16,
    jv.loading_text_sprite = new PIXI.Sprite,
    jv.loading_text_sprite.addChild(jv.loading_text),
    jv.loading_text_sprite.scale.x = 2,
    jv.loading_text_sprite.scale.y = 2,
    jv.loading_container = new PIXI.Container,
    jv.loading_container.addChild(t),
    jv.loading_container.addChild(jv.loading_bar),
    jv.loading_container.addChild(jv.loading_text_sprite),
    jv.loading_container.x = jv.game_width / 2 - jv.loading_container.width / 2,
    jv.loading_container.y = jv.game_height / 2 - jv.loading_container.height / 2,
    jv.add(jv.loading_container),
    player_container = jv.scene(),
    phone && (AndroidFullScreen.showUnderStatusBar(),
    AndroidFullScreen.showUnderSystemUI(),
    AndroidFullScreen.immersiveMode()),
    load_sounds()
}
;
var load_progress = function(e, t) {
    var i = Math.ceil(e.progress);
    e.progress >= 99 && (i = 100),
    jv.loading_text.text = "Loading " + i + "%";
    var o = e.progress * Math.abs(jv.loading_container.width - 8) / 100;
    jv.loading_bar.beginFill(43520, 1),
    jv.loading_bar.drawRect(4, 4, o, 32),
    jv.loading_bar.endFill(),
    jv.loading_bar.beginFill(56576, 1),
    jv.loading_bar.drawRect(8, 8, Math.abs(o - 8), 24),
    jv.loading_bar.endFill(),
    jv.loading_bar.beginFill(13434828, 1),
    jv.loading_bar.drawRect(8, 8, Math.abs(o - 8), 4),
    jv.loading_bar.endFill()
}
  , dist = function(e, t) {
    return Math.sqrt(e * e + t * t)
}
  , send = function(e) {
      CE.onSend(e);
    connection.send(JSON.stringify(e))
}
  , show_console = function() {
    jv.stage.addChild(jv.chat_box),
    jv.chat_box.gfx.alpha = 0
}
  , build_doll = function(e, t, i, o, n, a) {
    var r = new PIXI.Container
      , s = jv.sprite(path + "data/body/b" + e + ".png" + vt)
      , l = jv.sprite(path + "data/body/e1.png" + vt)
      , d = jv.sprite(path + "data/clothes/c" + t + "_a.png" + vt);
    if (clothes_fixed.indexOf(t) != -1)
        var c = jv.sprite(path + "data/clothes/c" + t + "_b.png" + vt);
    var _ = jv.sprite(path + "data/hair/h" + o + "_a.png" + vt);
    if (hair_fixed.indexOf(o) != -1)
        var p = jv.sprite(path + "data/hair/h" + o + "_b.png" + vt);
    if (hair_front.indexOf(Number(o)) != -1)
        var u = jv.sprite(path + "data/hair/h" + o + "_c.png" + vt);
    return r.addChild(s),
    l.tint = a,
    r.addChild(l),
    d.tint = i,
    r.addChild(d),
    c && r.addChild(c),
    clothes_hooded.indexOf(Number(t)) == -1 && (_.tint = n,
    r.addChild(_),
    p && r.addChild(p)),
    u && (u.tint = n,
    r.addChild(u)),
    jv.spritesheet(jv.renderer.generateTexture(r), 18, 26)
}
  , update_inventory = function() {
    var e, t;
    for (e in inv)
        inv[e].clear_item();
    for (e in item_data)
        e >= item_page * item_length && e < (item_page + 1) * item_length && "undefined" != typeof item_data[e].slot && (t = item_data[e].slot - item_page * item_length,
        inv[t].draw_item(item_data[e].n, item_data[e].qty, item_data[e].spr, item_data[e].eqp, "#" + item_data[e].col),
        "undefined" != typeof info_pane.slot && e == info_pane.slot && info_pane.set_info(inv[t])),
        "undefined" != typeof info_pane.slot && "undefined" == typeof item_data[e].slot && e == info_pane.slot && info_pane.set_info();
    update_recipes(),
    update_build()
}
  , update_recipes = function() {
    build_data = JSON.parse(jv.raw_build_data);
    for (o in build_data) {
        build_data[o].total = 0;
        for (a in build_data[o].r)
            build_data[o].total += build_data[o].r[a]
    }
    var e, t, i, o, n, a, r = [], s = [], l = ["fire", "stone_axe", "stone_pickaxe", "bone_dagger", "grass_band"];
    for (o in build_data) {
        t = 1,
        i = 0;
        for (a in build_data[o].r) {
            e = build_data[o].r[a] <= 10 ? 1 : 0;
            for (n in item_data)
                item_data[n].tpl == a && (i = 1,
                e = item_data[n].qty >= build_data[o].r[a] ? 2 : 1);
            if (0 == e) {
                t = -1;
                break
            }
            1 == e && (t = 0)
        }
        i || (t = -1),
        t == -1 && l.indexOf(build_data[o].t) !== -1 && (t = 0),
        0 == t ? r.push(build_data[o]) : 1 == t && (build_data[o].can_make = 1,
        s.push(build_data[o]))
    }
    r.sort(function(e, t) {
        return e.total - t.total
    }),
    s.sort(function(e, t) {
        return e.total - t.total
    }),
    build_data = s.concat(r)
}
  , update_build = function() {
    var e, t = build_data;
    build_data.length <= build_page * build_length && (build_page = 0);
    for (e in bld)
        bld[e].clear_item();
    var i = 0;
    for (e in t)
        e >= build_page * build_length && e < (build_page + 1) * build_length && (bld[e - build_page * build_length].template = t[e].t,
        bld[e - build_page * build_length].build_type = t[e].c,
        bld[e - build_page * build_length].can_pickup = t[e].p,
        t[e].can_make ? bld[e - build_page * build_length].draw_item(t[e].n, 1, t[e].s, 0, "#" + t[e].col) : bld[e - build_page * build_length].draw_item(t[e].n, 0, t[e].s, 0, "#" + t[e].col)),
        jv.build_dialog.info.obj && jv.build_dialog.info.template == t[e].t && t[e].can_make && (i = 1);
    !i && jv.build_dialog.info.obj && jv.build_dialog.info.obj.build && jv.build_dialog.info.set_info(),
    0 == build_page ? build_pane.prev.visible = !1 : build_pane.prev.visible = !0,
    build_data.length <= (build_page + 1) * build_length ? build_pane.next.visible = !1 : build_pane.next.visible = !0
}
  , romanize = function(e) {
    var t, i = {
        M: 1e3,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1
    }, o = "";
    for (t in i)
        for (; e >= i[t]; )
            o += t,
            e -= i[t];
    return o
}
  , inbounds = function(e, t) {
    return e < -1 || e > MAP_WIDTH || t < -1 || t > MAP_HEIGHT
}
  , occupied = function(e, t, i) {
    if (inbounds(e, t))
        return 1;
    var o = map[loc2tile(e, t)];
    if (void 0 == o || void 0 == o.spr)
        return 1;
    if (325 == o.spr || cur_wall && o.spr == cur_wall)
        return 1;
    var n = 0;
    if (mobs.process(function(o) {
        if (o.id !== i && o.x === e && o.y === t)
            return void (n = 1)
    }),
    n)
        return 1;
    var a = map_index[e + "," + t];
    return a && a.block ? 1 : 0
}
  , do_mob_title = function(e) {
    e.title = jv.text(e.name.toString(), {
        font: "12px Verdana",
        fill: 14540253,
        stroke: 6710886,
        lineJoin: "round",
        strokeThickness: 2,
        align: "center"
    }),
    e.title.yoff = -5,
    e.title.xoff = e.title.width / 2,
    e.title.alpha = 0,
    e.monster_sprite.interactive = !0,
    e.monster_sprite.mouseover = function(t) {
        e.title.alpha = 1
    }
    ,
    e.monster_sprite.mouseout = function(t) {
        e.title.alpha = 0
    }
    ,
    hover_container.addChild(e.title),
    player_container.addChild(e.monster_sprite),
    e.monster_sprite.do_click = function() {
        info_pane.set_info(e),
        select = 0
    }
    ,
    e.monster_sprite.on("mouseup", e.monster_sprite.do_click),
    e.monster_sprite.on("touchend", e.monster_sprite.do_click),
    e.monster_sprite.on("mousedown", function() {
        select = 1
    }),
    e.monster_sprite.on("touchstart", function() {
        select = 1
    }),
    e.monster_sprite.on("mouseupoutside", function() {
        select = 0
    }),
    e.monster_sprite.on("touchendoutside", function() {
        select = 0
    })
}
  , hex_to_int = function(e) {
    var t = e.substr(0, 2) + e.substr(2, 2) + e.substr(4, 2);
    return parseInt(t, 16)
}
  , rgb_to_int = function(e, t, i) {
    return (e << 16) + (t << 8) + i
}
  , color_limit = function(e, t) {
    if (void 0 !== e) {
        t = t || 50;
        var i = e >> 16 & 255
          , o = e >> 8 & 255
          , n = 255 & e
          , a = Math.floor(t - (Math.min(i, o, n) + Math.max(i, o, n)) / 2);
        return a > 0 && (i = Math.min(i + a, 255),
        o = Math.min(o + a, 255),
        n = Math.min(n + a, 255)),
        rgb_to_int(i, o, n)
    }
}
  , do_player_title = function(e) {
    e.title = jv.text(e.name.toString(), {
        font: "12px Verdana",
        fill: e.title_color,
        lineJoin: "round",
        stroke: 2236962,
        strokeThickness: 4,
        align: "center"
    }),
    e.title.xoff = e.title.width / 2,
    e.title.yoff = -10;
    var t = e.body_sprite;
    t || (t = e.monster_sprite),
    t.interactive = !0,
    t.mouseover = function(t) {
        var i = e.name + " Lvl " + e.level;
        "" !== e.tribe && (i += "\n" + e.tribe + " Tribe "),
        e.title.text = i.trim(),
        e.title.xoff = e.title.width / 2,
        e.title.yoff = -18,
        e.title.x = e.spr.x - e.title.xoff + e.halfx,
        e.title.y = e.spr.y + e.title.yoff
    }
    ,
    t.mouseout = function(t) {
        e.title.text = e.name.toString().trim(),
        e.title.xoff = e.title.width / 2,
        e.title.yoff = -10,
        e.title.x = e.spr.x - e.title.xoff + e.halfx,
        e.title.y = e.spr.y + e.title.yoff
    }
    ,
    hover_container.addChild(e.title),
    player_container.addChild(t),
    t.do_click = function() {
        info_pane.set_info(e),
        select = 0
    }
    ,
    t.on("mouseup", t.do_click),
    t.on("touchend", t.do_click),
    t.on("mousedown", function() {
        select = 1
    }),
    t.on("touchstart", function() {
        select = 1
    }),
    t.on("mouseupoutside", function() {
        select = 0,
        e.id == me && (jv.mouse.y < 140 ? (e.dir = 0,
        send({
            type: "m",
            x: e.x,
            y: e.y,
            d: e.dir
        })) : jv.mouse.x > 440 ? (e.dir = 1,
        send({
            type: "m",
            x: e.x,
            y: e.y,
            d: e.dir
        })) : jv.mouse.y > 276 ? (e.dir = 2,
        send({
            type: "m",
            x: e.x,
            y: e.y,
            d: e.dir
        })) : jv.mouse.x < 310 && (e.dir = 3,
        send({
            type: "m",
            x: e.x,
            y: e.y,
            d: e.dir
        })))
    }),
    t.on("touchendoutside", function(t) {
        select = 0;
        var i = t.data.global.x
          , o = t.data.global.y;
        e.id == me && (o < 130 ? (e.dir = 0,
        send({
            type: "m",
            x: e.x,
            y: e.y,
            d: e.dir
        })) : i > 420 ? (e.dir = 1,
        send({
            type: "m",
            x: e.x,
            y: e.y,
            d: e.dir
        })) : o > 240 ? (e.dir = 2,
        send({
            type: "m",
            x: e.x,
            y: e.y,
            d: e.dir
        })) : i < 320 && (e.dir = 3,
        send({
            type: "m",
            x: e.x,
            y: e.y,
            d: e.dir
        })))
    })
}
  , tile_sprite = function(e, t) {
    for (var i = 0, o = -13; o < 13; o++)
        for (var n = -13; n < 13; n++) {
            if (o == e && n == t)
                return 218 == map[i].spr ? 3 : 215 == map[i].spr || 248 == map[i].spr ? 2 : 36 == map[i].spr || 21 == map[i].spr ? 1 : 0;
            i += 1
        }
    return 0
}
  , get_edge = function(e, t, i) {
    var o = tile_sprite(e, t)
      , n = tile_sprite(e, t - 1)
      , a = tile_sprite(e + 1, t)
      , r = tile_sprite(e, t + 1)
      , s = tile_sprite(e - 1, t);
    if (1 == o)
        return edges[0][1];
    var l = 0;
    return o || 2 != n && 2 != a && 2 != r && 2 != s ? o || 3 != n && 3 != a && 3 != r && 3 != s || (l = 4) : l = 2,
    o == n && (n = 0),
    o == a && (a = 0),
    o == r && (r = 0),
    o == s && (s = 0),
    n && a && r && s ? edges[15][l] : n && a && r ? edges[14][l] : n && a && s ? edges[7][l] : n && r && s ? edges[11][l] : a && r && s ? edges[13][l] : n && r ? edges[10][l] : n && a ? edges[6][l] : n && s ? edges[3][l] : a && s ? edges[5][l] : a && r ? edges[12][l] : s && r ? edges[9][l] : n ? edges[1][l] : a ? edges[4][l] : r ? edges[8][l] : s ? edges[2][l] : edges[0][1]
}
  , make_covers = function() {
    wall_sprite.texture = tiles[cur_wall % 16][Math.floor(cur_wall / 16)],
    wall_sprite.tint = 16777215;
    var e = new PIXI.Graphics;
    e.beginFill(16777215),
    e.drawRect(0, 0, 32, 32),
    e.endFill(),
    wall_sprite.mask = e,
    4 == jv.pixiver ? (cover[0] = jv.renderer.generateTexture(wall_sprite),
    cover[1] = jv.renderer.generateTexture(wall_sprite),
    cover[2] = jv.renderer.generateTexture(wall_sprite),
    cover[4] = jv.renderer.generateTexture(wall_sprite),
    cover[5] = jv.renderer.generateTexture(wall_sprite),
    cover[8] = jv.renderer.generateTexture(wall_sprite),
    cover[10] = jv.renderer.generateTexture(wall_sprite)) : (cover[0] = wall_sprite.generateTexture(jv.renderer),
    cover[1] = wall_sprite.generateTexture(jv.renderer),
    cover[2] = wall_sprite.generateTexture(jv.renderer),
    cover[4] = wall_sprite.generateTexture(jv.renderer),
    cover[5] = wall_sprite.generateTexture(jv.renderer),
    cover[8] = wall_sprite.generateTexture(jv.renderer),
    cover[10] = wall_sprite.generateTexture(jv.renderer)),
    e.destroy(),
    e = null;
    var e = new PIXI.Graphics;
    e.beginFill(16777215),
    e.drawRoundedRect(0, 0, 32, 32, 6),
    e.drawRect(0, 0, 16, 16),
    e.drawRect(0, 16, 16, 16),
    e.drawRect(16, 0, 16, 16),
    e.endFill(),
    wall_sprite.mask = jv.sprite(jv.renderer.generateTexture(e)),
    3 == jv.pixiver ? cover[6] = wall_sprite.generateTexture(jv.renderer) : cover[6] = jv.renderer.generateTexture(wall_sprite),
    e.destroy(),
    e = null;
    var e = new PIXI.Graphics;
    e.beginFill(16777215),
    e.drawRoundedRect(0, 0, 32, 32, 6),
    e.drawRect(0, 0, 16, 16),
    e.drawRect(0, 16, 16, 16),
    e.drawRect(16, 16, 16, 16),
    e.endFill(),
    wall_sprite.mask = jv.sprite(jv.renderer.generateTexture(e)),
    3 == jv.pixiver ? cover[3] = wall_sprite.generateTexture(jv.renderer) : cover[3] = jv.renderer.generateTexture(wall_sprite),
    e.destroy(),
    e = null;
    var e = new PIXI.Graphics;
    e.beginFill(16777215, 1),
    e.drawRoundedRect(0, 0, 32, 32, 6),
    e.drawRect(16, 0, 16, 16),
    e.drawRect(0, 16, 16, 16),
    e.drawRect(16, 16, 16, 16),
    e.endFill(),
    wall_sprite.mask = jv.sprite(jv.renderer.generateTexture(e)),
    3 == jv.pixiver ? cover[9] = wall_sprite.generateTexture(jv.renderer) : cover[9] = jv.renderer.generateTexture(wall_sprite),
    e.destroy(),
    e = null;
    var e = new PIXI.Graphics;
    e.beginFill(16777215),
    e.drawRoundedRect(0, 0, 32, 32, 6),
    e.drawRect(16, 0, 16, 16),
    e.drawRect(0, 0, 16, 16),
    e.drawRect(16, 16, 16, 16),
    e.endFill(),
    wall_sprite.mask = jv.sprite(jv.renderer.generateTexture(e)),
    3 == jv.pixiver ? cover[12] = wall_sprite.generateTexture(jv.renderer) : cover[12] = jv.renderer.generateTexture(wall_sprite),
    e.destroy(),
    e = null;
    var e = new PIXI.Graphics;
    e.beginFill(16777215),
    e.drawRoundedRect(0, 0, 32, 32, 6),
    e.drawRect(0, 16, 16, 16),
    e.drawRect(16, 16, 16, 16),
    e.endFill(),
    wall_sprite.mask = jv.sprite(jv.renderer.generateTexture(e)),
    3 == jv.pixiver ? cover[11] = wall_sprite.generateTexture(jv.renderer) : cover[11] = jv.renderer.generateTexture(wall_sprite),
    e.destroy(),
    e = null;
    var e = new PIXI.Graphics;
    e.beginFill(16777215),
    e.drawRoundedRect(0, 0, 32, 32, 6),
    e.drawRect(0, 0, 16, 16),
    e.drawRect(16, 0, 16, 16),
    e.endFill(),
    wall_sprite.mask = jv.sprite(jv.renderer.generateTexture(e)),
    3 == jv.pixiver ? cover[14] = wall_sprite.generateTexture(jv.renderer) : cover[14] = jv.renderer.generateTexture(wall_sprite),
    e.destroy(),
    e = null;
    var e = new PIXI.Graphics;
    e.beginFill(16777215),
    e.drawRoundedRect(0, 0, 32, 32, 6),
    e.drawRect(0, 0, 16, 16),
    e.drawRect(0, 16, 16, 16),
    e.endFill(),
    wall_sprite.mask = jv.sprite(jv.renderer.generateTexture(e)),
    3 == jv.pixiver ? cover[7] = wall_sprite.generateTexture(jv.renderer) : cover[7] = jv.renderer.generateTexture(wall_sprite),
    e.destroy(),
    e = null;
    var e = new PIXI.Graphics;
    e.beginFill(16777215),
    e.drawRoundedRect(0, 0, 32, 32, 6),
    e.drawRect(16, 0, 16, 16),
    e.drawRect(16, 16, 16, 16),
    e.endFill(),
    wall_sprite.mask = jv.sprite(jv.renderer.generateTexture(e)),
    3 == jv.pixiver ? cover[13] = wall_sprite.generateTexture(jv.renderer) : cover[13] = jv.renderer.generateTexture(wall_sprite),
    e.destroy(),
    e = null;
    var e = new PIXI.Graphics;
    e.beginFill(16777215),
    e.drawRoundedRect(0, 0, 32, 32, 6),
    e.endFill(),
    wall_sprite.mask = jv.sprite(jv.renderer.generateTexture(e)),
    3 == jv.pixiver ? cover[15] = wall_sprite.generateTexture(jv.renderer) : cover[15] = jv.renderer.generateTexture(wall_sprite),
    e.destroy(),
    e = null
}
  , update_edges = function() {
    edge_container.cacheAsBitmap && (edge_container.cacheAsBitmap = !1),
    edge_container.edges = 0;
    for (var e = 0, t = -13; t < 13; t++)
        for (var i = -13; i < 13; i++) {
            if (map[e].edge.texture = get_edge(t, i, map[e].spr),
            map[e].edge.texture == edges[0][1] ? map[e].edge.visible = 0 : (edge_container.edges++,
            map[e].edge.visible = 1),
            "" !== dlevel)
                if (cur_wall && map[e].spr == cur_wall) {
                    map[e].tint = 5592422;
                    var o = 0
                      , n = map[e + 1];
                    n && n.spr != map[e].spr && (o += 4,
                    n.tint = 11184810);
                    var n = map[e - 1];
                    n && n.spr != map[e].spr && (o += 1);
                    var n = map[e + 26];
                    n && n.spr != map[e].spr && (o += 2);
                    var n = map[e - 26];
                    n && n.spr != map[e].spr && (o += 8),
                    map[e].cover.texture = cover[o],
                    map[e].cover.visible = 1
                } else {
                    map[e].cover.visible = 0;
                    var n = map[e - 1];
                    n && n.spr !== cur_wall && (map[e].tint = 16777215)
                }
            else
                map[e].cover.texture != tiles[0][0] && (map[e].cover.visible = 0);
            e += 1
        }
};
recheck_caches = function() {
    object_container.cacheAsBitmap || (object_container.children.length && (object_container.cacheAsBitmap = !0),
    anim1_container.children.length && (anim1_container.cacheAsBitmap = !0),
    anim2_container.children.length && (anim2_container.cacheAsBitmap = !0)),
    map_container.cacheAsBitmap || (map_container.cacheAsBitmap = !0,
    anim_map_container.animations && (anim_map_container.cacheAsBitmap = !0)),
    !edge_container.cacheAsBitmap && edge_container.edges && (edge_container.cacheAsBitmap = !0)
}
,
update_container = function() {
    master_container.x = hero_x + 132 - myself.spr.x + myself.xoffset,
    master_container.y = hero_y + -32 - myself.spr.y + myself.yoffset
}
;
var playSound = function(e) {
    var t = Math.floor(Math.random() * sound[e].length);
    sound[e][t].volume(jv.sound_volume),
    sound[e][t].play()
}
  , fadeSong = function(e) {
    if (e.playing()) {
        e.fade(option_dialog.music_slider.percent / 100, 0, 2e3);
        var t = e;
        setTimeout(function() {
            t.playing() && jv.current_song != t && (t.stop(),
            t.volume(option_dialog.music_slider.percent / 100));
        }, 3e3)
    }
};
jv.songEnd = function(e) {}
,
jv.songFade = function(e) {}
,
jv.songStop = function(e) {}
,
jv.songLoaded = function(e) {}
,
jv.songError = function(e, t) {}
;
var playMusic = function(e, t, i) {
    if (!(i && jv.current_song && jv.current_song.playing() || i && jv.last_song == e || music[e] && music[e].playing())) {
        if (e && "undefined" == typeof music[e] && (music[e] = new Howl({
            src: ["http://www.mysteralegacy.com/music/" + e + ".webm", "http://www.mysteralegacy.com/music/" + e + ".mp3"],
            autoplay: !1,
            loop: !1,
            html5: !0,
            preload: !0,
            xhrWithCredentials: !0,
            volume: jv.music_volume,
            onload: jv.songLoaded,
            onloaderror: jv.songError,
            onstop: jv.songStop,
            onend: jv.songEnd,
            onfade: jv.songFade
        }),
        music[e].on("load", function() {
            i || this.loop(!0)
        }),
        music[e].on("play", function() {
            "rpgtitle" == e && (game_state == GAME_PLAYING || jv.current_song && jv.current_song != music[e]) ? music[e].stop() : "rpgtitle" != e && music.rpgtitle.playing() && music.rpgtitle.stop()
        })),
        !e || "undefined" == typeof music[e])
            return jv.playlist = null,
            jv.current_song && fadeSong(jv.current_song),
            void (jv.current_song = null);
        jv.current_song && fadeSong(jv.current_song),
        jv.current_song = music[e],
        jv.last_song = e,
        jv.current_song.stop();
        var o = jv.current_song.play();
        i && jv.current_song.loop(!1, o),
        t || jv.current_song.fade(0, option_dialog.music_slider.percent / 100, 2e3)
    }
};
String.prototype.capitalize = function() {
    return this.replace(/\w\S*/g, function(e) {
        return e.charAt(0).toUpperCase() + e.substr(1).toLowerCase()
    })
}
,
String.prototype.replaceAll = function(e, t) {
    var i = this;
    return i.split(e).join(t)
}
,
confirmLeave = function(e) {
    return jv.before_blur(),
    has_focus = 1,
    "Really close this page?"
}
,
getMob = function(e) {
    return mob_ref[e] || (mob_ref[e] = mobs.fetch(e, "id"),
    mob_ref[e] && (mob_ref[e].ref = mob_ref)),
    mob_ref[e]
}
,
getObj = function(e) {
    return obj_ref[e] || (obj_ref[e] = objects.fetch(e, "id"),
    obj_ref[e] && (obj_ref[e].ref = obj_ref)),
    obj_ref[e]
}
,
mob_x = function(e) {
    return -effect_container.x + e.sx + e.halfx
}
,
mob_y = function(e) {
    return -effect_container.y + e.sy + e.halfy
}
,
jv.before_blur = function() {
    has_focus = 0;
    var e;
    for (e in jv.key_array)
        jv.key_array[e].isDown && (jv.key_array[e].release && jv.key_array[e].release(),
        jv.key_array[e].isDown = 0,
        jv.key_array[e].isUp = 1);
    action && !space_toggle && (action = 0,
    space_timer = now,
    send({
        type: "a"
    })),
    dest != -1 && (send({
        type: "h",
        x: this.x,
        y: this.y
    }),
    dest = -1)
}
,
jv.prevent = function(e) {
    return editing || jv.current_input && jv.current_input.hasFocus ? 0 : (e.preventDefault(),
    1)
}
;
var loc2tile = function(e, t) {
    return 26 * (e - mx) + 1 * (t - my)
}
  , tile2x = function(e) {}
  , append = function(e) {
    jv.chat_box.append(e)
};
jv.ChatBubble = {
    create: function(e, t) {
        var i = jv.sprite();
        return e = e.replace(/&quot;/g, '"'),
        e = e.replace(/&amp;/g, "&"),
        e = e.replace(/&lt;/g, "<"),
        e = e.replace(/&gt;/g, ">"),
        i.x = t.spr.x + t.halfx,
        i.y = t.spr.y - 6,
        t.bubble = this,
        i.talker = t,
        i.life = Date.now(),
        i.max_life = 50 * e.length,
        i.max_life < 3e3 ? i.max_life = 3e3 : i.max_life > 8e3 && (i.max_life = 8e3),
        i.gfx = new PIXI.Graphics,
        i.gfx.x = 0,
        i.gfx.y = 0,
        i.addChild(i.gfx),
        i.title = jv.text(e, {
            font: "12px Verdana",
            fill: 16777215,
            stroke: 6710886,
            strokeThickness: 2,
            lineJoin: "round",
            wordWrap: !0,
            wordWrapWidth: 200,
            padding: 5
        }),
        i.title.x = 4 - i.title.width / 2 - 4,
        i.title.y = 3 - i.title.height - 8,
        i.gfx.x = 0 - i.title.width / 2 - 6,
        i.gfx.y = 0 - i.title.height - 8,
        i.addChild(i.title),
        hover_container.addChild(i),
        i.check = setInterval(function() {
            return i.talker && (i.talker.monster_sprite || i.talker.body_sprite) ? (i.talker.bubble !== this && (i.x = i.talker.spr.x + i.talker.halfx,
            i.y = i.talker.spr.y - 6),
            void (now - i.life > i.max_life && i.cleanup())) : void i.cleanup()
        }, 20),
        i.draw = function() {
            var e = this.title.width + 13
              , t = this.title.height + 6
              , i = [0, 0, e, 0, e, t, e / 2 + 4, t, e / 2, t + 4, e / 2 - 4, t, 0, t, 0, 0];
            this.gfx.clear(),
            this.gfx.beginFill(3355460, .3),
            this.gfx.lineStyle(3, 7829384, .5),
            this.gfx.drawPolygon(i),
            this.gfx.lineStyle(1, 15658751, .5),
            this.gfx.drawPolygon(i),
            this.gfx.endFill()
        }
        ,
        i.cleanup = function() {
            null !== this.title && this.title.parent.removeChild(this.title),
            this.title = null,
            this.gfx.parent.removeChild(this.gfx),
            this.gfx = null,
            clearInterval(this.check),
            this.talker.bubble == this && (this.talker.bubble = null),
            delete this
        }
        ,
        i.draw(),
        i
    }
},
jv.StatusBar = {
    create: function(e, t) {
        var i = jv.sprite();
        return i.max = 100,
        i.val = 75,
        i.color = t,
        i.x = jv.game_width - 140,
        i.y = 320,
        i.gfx = new PIXI.Graphics,
        i.gfx.x = 0,
        i.gfx.y = 0,
        i.addChild(i.gfx),
        i.title = jv.text(e, {
            font: "10px Verdana",
            fill: 16777215,
            lineJoin: "round",
            stroke: jv.color_dark,
            strokeThickness: 4
        }),
        i.title.x = 4,
        i.title.y = -8,
        i.addChild(i.title),
        ui_container.addChild(i),
        i.draw = function() {
            this.gfx.clear(),
            this.gfx.lineStyle(2, jv.color_dark, 0),
            this.gfx.beginFill(jv.color_base, 1),
            this.gfx.drawRect(0, 0, 100, 10),
            this.gfx.endFill(),
            this.gfx.beginFill(this.color, 1),
            this.gfx.drawRect(0, 0, 100 * this.val / 100, 10),
            this.gfx.endFill(),
            this.gfx.beginFill(15658734, .2),
            this.gfx.drawRect(0, 0, 100 * this.val / 100, 5),
            this.gfx.endFill()
        }
        ,
        i.set = function(e) {
            this.val = e,
            this.draw()
        }
        ,
        i.cleanup = function() {}
        ,
        i
    }
},
jv.HPBar = {
    create: function(e, t) {
        var i = jv.sprite();
        return i.player = e,
        e.hpbar = this,
        e.spr ? (i.x = e.spr.x + 2,
        i.y = e.spr.y + 0,
        i.w = e.spr.width - 4) : (i.x = i.player.obj_sprite.x + 2,
        i.x = i.player.obj_sprite.y + 7,
        i.w = 28),
        i.life = Date.now(),
        i.max_life = 4e3,
        i.max = 1e3,
        i.val = t,
        i.chaser = t,
        i.color = 65280,
        i.gfx = new PIXI.Graphics,
        i.gfx.x = 0,
        i.gfx.y = 0,
        i.addChild(i.gfx),
        hover_container.addChild(i),
        i.check = setInterval(function() {
            return i.player && (i.player.monster_sprite || i.player.body_sprite || i.player.obj_sprite) ? (i.player.spr || (i.x = i.player.obj_sprite.x + 2,
            i.y = i.player.obj_sprite.y + 7),
            i.chaser !== i.val && (i.chaser < i.val && (i.chaser += 12,
            i.chaser > i.val && (i.chaser = i.val)),
            i.chaser > i.val && (i.chaser -= 12,
            i.chaser < i.val && (i.chaser = i.val)),
            i.draw()),
            void (Date.now() - i.life > i.max_life && i.chaser == i.val && (i.alpha -= .05,
            i.alpha <= 0 && i.cleanup()))) : void i.cleanup()
        }, 20),
        i.draw = function() {
            this.gfx.clear(),
            this.gfx.beginFill(0, .6),
            this.gfx.drawRect(0, 0, this.w, 6),
            this.gfx.endFill(),
            this.chaser > this.val && (this.gfx.beginFill(16711680, 1),
            this.gfx.lineStyle(0, 16777215),
            this.gfx.drawRect(this.val * this.w / 1e3, 0, this.chaser * this.w / 1e3 - this.val * this.w / 1e3, 6),
            this.gfx.endFill()),
            this.gfx.beginFill(this.color, 1),
            this.gfx.lineStyle(0, 16777215),
            this.gfx.drawRect(0, 0, this.val * this.w / 1e3, 6),
            this.gfx.endFill(),
            this.gfx.beginFill(15658734, .5),
            this.gfx.lineStyle(0, 16777215),
            this.gfx.drawRect(0, 0, this.val * this.w / 1e3, 3),
            this.gfx.endFill(),
            this.chaser < this.val && (this.gfx.beginFill(16777215, 1),
            this.gfx.lineStyle(0, 16777215),
            this.gfx.drawRect(this.val * this.w / 1e3, 0, this.chaser * this.w / 1e3 - this.val * this.w / 1e3, 6),
            this.gfx.endFill()),
            this.gfx.lineStyle(2, 12303291, 1),
            this.gfx.drawRect(0, 0, this.w, 6)
        }
        ,
        i.set = function(e) {
            this.val = e,
            this.alpha = 1,
            this.life = Date.now(),
            this.draw()
        }
        ,
        i.cleanup = function() {
            this.player && this.player.hpbar == this && (this.player.hpbar = null),
            this.gfx.parent.removeChild(this.gfx),
            this.gfx = null,
            clearInterval(this.check),
            this.player.hpbar == this && (this.player.hpbar = null),
            delete this
        }
        ,
        i.draw(),
        i
    }
},
jv.Entity = {
    create: function() {
        var e = {};
        return e.x = 0,
        e.y = 0,
        e.dx = 0,
        e.dy = 0,
        e.fromx = 0,
        e.fromy = 0,
        e.sx = 0,
        e.sy = 0,
        e.flip = 0,
        e.dir = 0,
        e.last_dir = -1,
        e.frame = 0,
        e.foot = 1,
        e.body = 0,
        e.body_sprite = null,
        e.hair = 0,
        e.hair_sprite = null,
        e.clothes = 0,
        e.clothes_sprite = null,
        e.name = "",
        e.title = null,
        e.chat_sprite = null,
        e.chat_dots = null,
        e.sprite = 0,
        e.spr = null,
        e.monster_sprite = null,
        e.walking = 0,
        e.speed = 750,
        e.tile_speed = 0,
        e.net_tile_speed = 0,
        e.bonus = 0,
        e.cur_speed = e.speed,
        e.traveled = 0,
        e.travel_start = 0,
        e.last_check = new Date,
        e.now = e.last_check,
        e.updated = 0,
        e.tweenx = 0,
        e.tweeny = 0,
        e.xoffset = 4,
        e.yoffset = -16,
        e.still = function() {
            return this.fromx == this.x && this.fromy == this.y
        }
        ,
        e.move = function(e, t) {
            return this.fromx = this.x,
            this.fromy = this.y,
            this.x > e ? this.dir = 3 : this.x < e ? this.dir = 1 : this.y > t ? this.dir = 0 : this.y < t && (this.dir = 2),
            this.id == me && (space_toggle && (space_toggle = 0,
            ph_action.gfx.tint = 16777215,
            space_timer = now),
            keyCtrl.isDown) ? void (this.last_dir !== this.dir && (send({
                type: "m",
                x: this.x,
                y: this.y,
                d: this.dir
            }),
            this.last_dir = this.dir)) : (this.id !== me && (this.traveled = 0),
            this.id == me && occupied(e, t, this.id) ? void (this.last_dir !== this.dir && (send({
                type: "m",
                x: this.x,
                y: this.y,
                d: this.dir
            }),
            this.last_dir = this.dir,
            dest !== -1 && (send({
                type: "h",
                x: this.x,
                y: this.y
            }),
            dest = -1))) : (this.x = e,
            this.y = t,
            this.last_dir = this.dir,
            void (this.id == me && (dest == -1 || this.dir !== dest || Date.now() - last_dest >= 1e3) && (send({
                type: "h",
                x: this.fromx,
                y: this.fromy,
                d: this.dir
            }),
            last_ping = Date.now(),
            dest = this.dir,
													  last_dest = Date.now()))))
        }
        ,
        e.set_sprite = function() {
            null !== this.monster_sprite ? this.spr = this.monster_sprite : this.spr = this.body_sprite
        }
        ,
        e.update_pos = function() {
            this.spr.x = 32 * this.fromx + this.tweenx + this.xoffset,
            this.spr.y = 32 * this.fromy + this.tweeny + this.yoffset,
            this.title.x = this.spr.x - this.title.xoff + this.halfx,
            this.title.y = this.spr.y + this.title.yoff,
            this.chat_sprite.x = this.spr.x + this.halfx - 8,
            this.chat_sprite.y = this.spr.y + this.title.yoff - 12,
            this.id == target.id && (target.x = this.spr.x + this.halfx,
            target.y = this.spr.y + this.spr.height - 2),
            this.bubble && (this.bubble.x = this.spr.x + this.halfx,
            this.bubble.y = this.spr.y - 6),
            this.hpbar && (this.hpbar.x = this.spr.x + 2,
            this.hpbar.y = this.spr.y + 0),
            this.sy != this.spr.y && (this.spr.ry = this.spr.y + this.spr.height,
            update_sort = 1),
            this.sx = this.spr.x,
            this.sy = this.spr.y
        }
        ,
        e.check_chat_indicator = function() {
            this.chat_sprite.visible && (this.chat_dots.alpha = Math.floor(now / 400) % 2)
        }
        ,
        e.update = function() {
            this.still() ? (this.check_chat_indicator(),
            this.id == me && (jv.transition || (keyRight.isDown || keyD.isDown ? this.move(this.x + 1, this.y) : keyLeft.isDown || keyA.isDown ? this.move(this.x - 1, this.y) : keyDown.isDown || keyS.isDown ? this.move(this.x, this.y + 1) : keyUp.isDown || keyW.isDown ? this.move(this.x, this.y - 1) : dest != -1 && (send({
                type: "h",
                x: this.x,
                y: this.y
            }),
            dest = -1)),
            keyShift.isDown ? ph_pickup.is_pressed || (ph_pickup.clear_item(),
            ph_pickup.draw_item(1),
            ph_pickup.is_pressed = 1,
            ph_pickup.key_press = 1) : ph_pickup.is_pressed && ph_pickup.key_press && (ph_pickup.clear_item(),
            ph_pickup.draw_item(),
            ph_pickup.is_pressed = 0,
            ph_pickup.key_press = 0),
            keySpace.isDown ? (action ? space_toggle && (space_toggle = 0,
            ph_action.gfx.tint = 16777215,
            space_timer = now) : (space_timer = now,
            space_toggle = 0,
            ph_action.clear_item(),
            ph_action.draw_item(1),
            ph_action.gfx.tint = 16777215,
            action = 1,
            send({
                type: "A"
            })),
            now - space_timer >= 2500 && 13434879 !== ph_action.gfx.tint && (ph_action.gfx.tint = 13434879,
            ph_action.clear_item(),
            ph_action.draw_item(1))) : action && !space_toggle && (now - space_timer < 2500 ? (action = 0,
            space_timer = now,
            send({
                type: "a"
            }),
            ph_action.clear_item(),
            ph_action.draw_item()) : (space_toggle = 1,
            space_timer = now))),
            this.moved = 0) : (this.traveled += Date.now() - this.last_check,
            this.traveled >= this.cur_speed && (this.traveled -= this.cur_speed,
            this.traveled >= this.cur_speed && (this.traveled = 0),
            this.travel_start = this.traveled,
            this.fromx = this.x,
            this.fromy = this.y,
            this.frame = 1,
            this.foot = -this.foot),
            this.traveled >= (this.cur_speed - this.travel_start) / 2 + this.travel_start ? this.frame = 1 + this.foot : this.frame = 1,
            this.tweenx = Math.floor((this.x - this.fromx) * (this.traveled / this.cur_speed) * 32),
            this.tweeny = Math.floor((this.y - this.fromy) * (this.traveled / this.cur_speed) * 32),
            this.traveled == this.cur_speed && (this.traveled = 0),
            this.update_pos(),
            this.moved = 1),
            (this.dir < 0 || this.dir > 3) && (this.dir = 0),
            null !== this.monster_sprite && monster[this.sprite][this.frame][this.dir] != this.spr.texture ? this.spr.texture = monster[this.sprite][this.frame][this.dir] : null !== this.body_sprite && this.sheet[this.frame][this.dir] != this.body_sprite.texture && (this.body_sprite.texture = this.sheet[this.frame][this.dir]),
            this.last_check = Date.now()
        }
        ,
        e.cleanup = function() {
            mob_ref[this.id] = null,
            target.id == this.id && (target.id = me,
            target.visible = !1,
            info_pane.set_info()),
            null !== this.monster_sprite && (null !== this.title && this.title.parent.removeChild(this.title),
            this.title = null,
            this.monster_sprite.parent.removeChild(this.monster_sprite),
            this.monster_sprite = null),
            null !== this.body_sprite && (null !== this.title && this.title.parent.removeChild(this.title),
            this.title = null,
            this.body_sprite.parent.removeChild(this.body_sprite),
            this.clothes_sprite = null,
            this.hair_sprite = null,
            this.body_sprite = null),
            null !== this.chat_sprite && (null !== this.chat_dots && this.chat_dots.parent.removeChild(this.chat_dots),
            this.chat_sprite.parent.removeChild(this.chat_sprite)),
            this.chat_sprite = null,
            this.chat_dots = null,
            this.remove()
        }
        ,
        e
    }
},
jv.Object = {
    create: function(e, t) {
        var o = {};
        return o.template = "",
        o.name = "",
        o.owner = -1,
        o.x = -1,
        o.y = -1,
        o.sprite = 8,
        o.obj_sprite = null,
        o.other = [],
        o.can_block = 0,
        o.update = function() {}
        ,
        o.buildup = function() {
            if (void 0 == this.build || 0 == this.build.length)
                return 0;
            null !== this.obj_sprite && (this.obj_sprite.parent.removeChild(this.obj_sprite),
            this.obj_sprite = null);
            for (i in this.other)
                null !== this.other[i] && (this.other[i].parent.removeChild(this.other[i]),
                this.other[i] = null);
            this.other = [];
            var e, t, o, n, a, r = this.build.indexOf("a") !== -1, s = this.build.split(","), l = this.x, d = this.y, c = 0, _ = 0, p = 0;
            for (i in s)
                if (e = 0,
                t = 0,
                "n" == s[i])
                    d--;
                else if ("s" == s[i])
                    d++;
                else if ("w" == s[i])
                    l--;
                else if ("e" == s[i])
                    l++;
                else {
                    if (s[i].indexOf("b") !== -1 && (this.can_block = 1,
                    s[i] = s[i].replace("b", "")),
                    s[i].indexOf("f") !== -1 && (e = 1,
                    s[i] = s[i].replace("f", "")),
                    s[i].indexOf("a") !== -1 && (t = 1,
                    s[i] = s[i].replace("a", "")),
                    s[i].indexOf("o") !== -1) {
                        var u = s[i].split("")
                          , h = u.indexOf("o")
                          , v = u.indexOf("|", h);
                        _ = u.splice(h, v - h + 1),
                        _.pop(),
                        _.shift(),
                        _ = Number(_.join("")),
                        s[i] = u.join("")
                    }
                    if (s[i].indexOf("t") !== -1) {
                        var u = s[i].split("")
                          , h = u.indexOf("t")
                          , v = u.indexOf("|", h);
                        o = u.splice(h, v - h + 1),
                        o.pop(),
                        o.shift(),
                        o = Number("0x" + o.join("")),
                        s[i] = u.join("")
                    }
                    if (s[i].indexOf("q") !== -1) {
                        var u = s[i].split("")
                          , h = u.indexOf("q")
                          , v = u.indexOf("|", h);
                        n = u.splice(h, v - h + 1),
                        n.pop(),
                        n.shift(),
                        n = Number(n.join("")),
                        s[i] = u.join("")
                    }
                    s[i] = Number(s[i]),
                    isNaN(s[i]) && (s[i] = 858),
                    a = s[i] < 0 ? jv.sprite(tiles[-s[i] % 16][Math.floor(-s[i] / 16)]) : jv.sprite(items[s[i] % 16][Math.floor(s[i] / 16)]),
                    a.x = 32 * l,
                    a.y = 32 * d + _,
                    a.ordering = p,
                    _ && (_ = 0),
                    o && (a.tint = o,
                    o = void 0),
                    n && (a.alpha = n,
                    n = void 0),
                    0 == p ? (this.sprite = s[i],
                    this.obj_sprite = a,
                    e ? (c++,
                    a.ry = a.y + 32,
                    player_container.addChild(a),
                    update_sort = 1) : r ? t ? anim2_container.addChild(a) : anim1_container.addChild(a) : object_container.addChild(a)) : (a.base = this.obj_sprite,
                    this.other.push(a),
                    e ? (a.foreground = !0,
                    c++,
                    a.ry = (a.base.y > a.y ? a.base.y : a.y) + 32,
                    c > 1 && (a.ry += c),
                    player_container.addChild(a),
                    update_sort = 1) : r ? t ? anim2_container.addChild(a) : anim1_container.addChild(a) : object_container.addChild(a)),
                    p += 1
                }
            return 1
        }
        ,
        o.cleanup = function() {
            obj_ref[this.id] = null,
            delete obj_ref[this.id],
            object_container.cacheAsBitmap = !1,
            null !== this.obj_sprite && this.obj_sprite.parent.removeChild(this.obj_sprite);
            for (i in this.other)
                null !== this.other[i] && this.other[i].parent.removeChild(this.other[i]);
            this.hpbar && this.hpbar.cleanup(),
            this.remove()
        }
        ,
        o
    }
},
jv.Effect = {
    create: function(e, t) {
        var i = {};
        return i.template = "",
        i.x = e,
        i.y = t,
        i.life = 100,
        i.frame = 0,
        i.started = 0,
        i.created = Date.now(),
        i.p = [],
        i.start = function() {}
        ,
        i.particle = function() {
            var e = new PIXI.Graphics;
            return e.created = Date.now(),
            e.move = function() {}
            ,
            e.life = 50,
            e.frame = 0,
            e.x = this.x,
            e.y = this.y,
            effect_container.addChild(e),
            this.p.push(e),
            e
        }
        ,
        i.circle = function(e, t) {
            var i = this.particle();
            return i.lineStyle(0),
            i.beginFill(e, .4),
            i.drawCircle(0, 0, t),
            i.beginFill(e, .9),
            i.drawCircle(0, 0, t - 1),
            i.endFill(),
            i
        }
        ,
        i.text = function(e, t) {
            void 0 == t && (t = {
                font: "12px Verdana",
                lineJoin: "round",
                fill: 15658734
            });
            var i = jv.text(e, t);
            return i.created = Date.now(),
            i.move = function() {}
            ,
            i.life = 50,
            i.frame = 0,
            i.x = this.x,
            i.y = this.y,
            effect_container.addChild(i),
            this.p.push(i),
            i
        }
        ,
        i.sprite = function(e) {
            if (e < 0)
                var t = jv.sprite(tiles[-e % 16][Math.floor(-e / 16)]);
            else
                var t = jv.sprite(items[e % 16][Math.floor(e / 16)]);
            return t.created = Date.now(),
            t.move = function() {}
            ,
            t.life = 50,
            t.frame = 0,
            t.position.x -= 16,
            t.position.y -= 16,
            t.x = this.x,
            t.y = this.y,
            t.anchor.x = .5,
            t.anchor.y = .5,
            effect_container.addChild(t),
            this.p.push(t),
            t
        }
        ,
        i.run = function() {}
        ,
        i.update = function() {
            this.started || (this.start(),
            this.started = 1),
            this.run(this.p[e]);
            for (var e in this.p)
                this.p[e].x += this.p[e].dx,
                this.p[e].y += this.p[e].dy,
                this.move(this.p[e]),
                this.p[e].frame++,
                this.p[e].frame >= this.p[e].life && (void 0 !== this.p[e].clear && this.p[e].clear(),
                this.p[e].parent.removeChild(this.p[e]),
                delete this.p[e]);
            this.frame++,
            this.frame > this.life && this.cleanup()
        }
        ,
        i.cleanup = function() {
            for (var e in this.p)
                void 0 !== this.p[e].clear && this.p[e].clear(),
                this.p[e].parent.removeChild(this.p[e]),
                delete this.p[e];
            this.remove()
        }
        ,
        i
    }
},
jv.InventorySlot = {
    create: function(e, t, i, o) {
        var n = jv.sprite();
        return o || (o = ui_container),
        n.slot = i,
        n.z = i + 50,
        n.interactive = !0,
        n.do_touch = function(e) {
            this.build || this.texture == tiles[0][0] || (this.scale.x = 2,
            this.scale.y = 2,
            this.do_drag(),
            this.do_touch_move(e))
        }
        ,
        n.do_touch_move = function(e) {
            touching += 1,
            touchx = e.data.getLocalPosition(this.parent).x,
            touchy = e.data.getLocalPosition(this.parent).y,
            drag == this && (drag.x = touchx - 32,
            drag.y = touchy - 42)
        }
        ,
        n.do_click = function() {
            if (this.texture != tiles[0][0]) {
                if (drag) {
                    var e, t = 0, i = 16, o = 16;
                    touching && (i = 32,
                    o = 42);
                    for (var n = 0; n < item_length; n++)
                        if (this.slot != n && this.x + i > inv[n].x + t && this.x + i < inv[n].x + 32 + t && this.y + o > inv[n].y && this.y + o < inv[n].y + 32) {
                            e = n;
                            break
                        }
                    if (this.x < -32 && this.x > -1e3)
                        send({
                            type: "d",
                            slot: this.slot + item_page * item_length,
                            amt: drop_amt
                        });
                    else if (void 0 !== e && e !== this.slot && (!touching || touching > 100)) {
                        send({
                            type: "sw",
                            slot: this.slot + item_page * item_length,
                            swap: e + item_page * item_length
                        });
                        var a = this.title.text
                          , r = this.quantity
                          , s = this.sprite
                          , l = this.equip;
                        this.clear_item(),
                        void 0 !== inv[e].sprite && this.draw_item(inv[e].title.text, inv[e].quantity, inv[e].sprite, inv[e].equip),
                        inv[e].clear_item(),
                        void 0 !== s && inv[e].draw_item(a, r, s, l);
                        var d = inv[e]
                    }
                    drag.reset_drag(),
                    drag = void 0
                }
                if (this.build)
                    return void jv.build_dialog.info.set_info(this);
                this.texture != tiles[0][0] && info_pane.set_info(this),
                d && info_pane.set_info(d),
                touching = 0
            }
        }
        ,
        n.do_drag = function() {
            this.build || this.texture == tiles[0][0] || (drag && drag.reset_drag(),
            drag = this,
            this.qty_text.visible = !1,
            this.title.visible = !1,
            this.z = 100,
            this.parent.children.sort(zCompare))
        }
        ,
        n.reset_drag = function() {
            this.scale.x = 1,
            this.scale.y = 1,
            this.x = this.ox,
            this.y = this.oy,
            this.z = this.slot + 50,
            this.qty_text.visible = !0,
            this.title.visible = !0
        }
        ,
        n.mouse_over = function(e) {
            this.title.alpha = 1,
            this.scale.x = 1.1,
            this.scale.y = 1.1
        }
        ,
        n.mouse_out = function(e) {
            this.title.alpha = 0,
            this.scale.x = 1,
            this.scale.y = 1
        }
        ,
        n.on("mouseover", n.mouse_over),
        n.on("mouseout", n.mouse_out),
        n.on("mouseup", n.do_click),
        n.on("mouseupoutside", n.do_click),
        n.on("touchend", n.do_click),
        n.on("touchendoutside", n.do_click),
        n.on("mousedown", n.do_drag),
        n.on("touchstart", n.do_touch),
        n.on("touchmove", n.do_touch_move),
        n.x = e,
        n.y = t,
        n.ox = e,
        n.oy = t,
        n.quantity = 0,
        n.qty_text = jv.text("", {
            font: "10px Verdana",
            fill: 16777215,
            lineJoin: "round",
            stroke: jv.color_medium,
            strokeThickness: 4
        }),
        n.qty_text.x = 0,
        n.qty_text.y = 22,
        n.addChild(n.qty_text),
        n.title = jv.text("", {
            font: "9px Verdana",
            fill: 16777215,
            lineJoin: "round",
            stroke: jv.color_medium,
            strokeThickness: 3
        }),
        n.title.x = 16 - n.title.width / 2,
        n.title.y = -8,
        n.title.alpha = 0,
        n.equip = 0,
        n.sprite = void 0,
        n.gfx = new PIXI.Graphics,
        n.gfx.x = n.x - 1,
        n.gfx.y = n.y - 1,
        n.gfx.z = n.slot,
        n.clear_item = function() {
            this.texture = tiles[0][0],
            this.tint = 16777215,
            this.sprite = void 0,
            this.qty_text.text = "",
            this.title.text = "",
            this.gfx.clear(),
            this.gfx.beginFill(jv.color_light, 1),
            this.gfx.drawRect(0, 0, 32, 32, 1),
            this.gfx.endFill(),
            this.gfx.lineStyle(2, jv.color_bright, 1),
            this.gfx.beginFill(jv.color_light, 0),
            this.gfx.moveTo(32, 32),
            this.gfx.lineTo(32, 0),
            this.gfx.moveTo(32, 32),
            this.gfx.lineTo(0, 32),
            this.gfx.lineStyle(2, jv.color_dark, 1),
            this.gfx.moveTo(0, 0),
            this.gfx.lineTo(32, 0),
            this.gfx.moveTo(0, 0),
            this.gfx.lineTo(0, 32),
            this.gfx.endFill()
        }
        ,
        n.draw_item = function(e, t, i, o, n) {
            e && (i < 0 ? this.texture = tiles[-i % 16][Math.floor(-i / 16)] : this.texture = items[i % 16][Math.floor(i / 16)],
            this.quantity = t,
            this.quantity > 1 && (this.qty_text.text = this.quantity),
            this.quantity || (this.tint = 5592405),
            this.title.text = e,
            this.title.x = 16 - this.title.width / 2,
            this.equip = o,
            this.sprite = i,
            1 != o && 2 != o || (1 == o && (this.gfx.lineStyle(0, 7829384, 0),
            this.gfx.beginFill(65535, .1),
            this.gfx.drawRoundedRect(1, 1, 31, 31, 2),
            this.gfx.endFill(),
            this.gfx.beginFill(4521983, .2),
            this.gfx.drawCircle(16, 16, 12),
            this.gfx.endFill()),
            1 == o ? this.gfx.lineStyle(2, 7454404, .9) : this.gfx.lineStyle(2, 10027008, .8),
            this.gfx.drawRoundedRect(1, 0, 31, 32, 2)))
        }
        ,
        o.addChild(n.gfx),
        o.addChild(n),
        n.addChild(n.title),
        n.parent.children.sort(zCompare),
        n
    }
},
jv.loop = function() {
    if (now = Date.now(),
    "ready" == jv.state) {
        if (show_fps && (jv.fps.text = "FPS: " + Math.round(jv.fps_num)),
        jv.mouseDown && jv.mouse.y < 416 && (inputting || editing) && editor.blur(),
        jv.transition && (1 === jv.transition ? (map_fade.alpha += .03,
        map_fade.visible = 1,
        map_fade.alpha >= 1 && (map_fade.alpha = 1)) : (map_fade.alpha -= .02,
        map_fade.alpha <= 0 && (jv.map_title.alpha = .8,
        jv.map_title.timer = now,
        map_fade.alpha = 0,
        map_fade.visible = 0,
        jv.transition = 0))),
        jv.map_title.alpha > 0 && now - jv.map_title.timer > 1e3 && (jv.map_title.alpha -= .01,
        jv.map_title.alpha <= 0 && (jv.map_title.alpha = 0)),
        game_fade.alpha < fade_to ? (game_fade.alpha += .01,
        game_fade.alpha >= fade_to && (game_fade.alpha = fade_to)) : game_fade.alpha > fade_to && (game_fade.alpha -= .01,
        game_fade.alpha <= fade_to && (game_fade.alpha = fade_to)),
        skill_status.alpha && now - skill_status.timer > 2600 && (skill_status.alpha -= .02,
        skill_status.alpha <= 0 && (skill_status.interactive = !1)),
        drag && !touching && (drag.x = jv.mouse.x - 596,
        drag.y = jv.mouse.y - 16),
        jv.upgrade_number !== jv.upgrade_current) {
            0 == jv.upgrade_add.alpha && jv.upgrade_number > jv.upgrade_current && (jv.upgrade_add.text = "+" + (jv.upgrade_number - jv.upgrade_current),
            jv.upgrade_add.x = 569 - jv.upgrade_add.width,
            jv.upgrade_add.alpha = .8,
            jv.upgrade_timer = now),
            jv.upgrade_number > jv.upgrade_current + 1e4 ? jv.upgrade_current += 1e3 : jv.upgrade_number > jv.upgrade_current + 1e3 ? jv.upgrade_current += 100 : jv.upgrade_number > jv.upgrade_current + 100 ? jv.upgrade_current += 10 : jv.upgrade_number > jv.upgrade_current ? jv.upgrade_current++ : jv.upgrade_number < jv.upgrade_current - 1e4 ? jv.upgrade_current -= 1e3 : jv.upgrade_number < jv.upgrade_current - 1e3 ? jv.upgrade_current -= 100 : jv.upgrade_number < jv.upgrade_current - 100 ? jv.upgrade_current -= 10 : jv.upgrade_number < jv.upgrade_current && jv.upgrade_current--;
            var e = "00000000" + String(jv.upgrade_current);
            jv.upgrade_counter.text = e.substr(e.length - 8),
            jv.upgrade_counter.x = 569 - jv.upgrade_counter.width
        } else
            now - jv.upgrade_timer > 2e3 && jv.upgrade_add.alpha > 0 && (jv.upgrade_add.alpha -= .04,
            jv.upgrade_add.alpha < 0 && (jv.upgrade_add.alpha = 0));
        effects.process(function(e) {
            e.update()
        }),
        mobs.process(function(e) {
            e.update()
        }),
        myself && myself.moved && update_container(),
        update_sort && now - last_sort > 500 && (player_container.children.sort(sortCompare),
        update_sort = 0,
        last_sort = now),
        now - animation_timer > 500 && (animation_timer = now,
        anim_map_container.visible = !anim_map_container.visible,
        anim1_container.visible = !anim1_container.visible,
        anim2_container.visible = !anim2_container.visible),
        is_chatting ? input_field.hasFocus && "say" === jv.toggle_chat.mode && "/" != input_field.chars[0] || (is_chatting = 0,
        send({
            type: "c",
            r: "c0"
        })) : input_field.hasFocus && "say" == jv.toggle_chat.mode && "/" !== input_field.chars[0] && (is_chatting = 1,
        send({
            type: "c",
            r: "c1"
        }))
    }
}
;
var parse = function(json) {
    try {
	parseOrig(json)
    } catch (err) {
	console.log(err, "while parsing", json)
    }
}
var parseOrig = function(json) {
    CE.onReceive(json)

    if ("zip" === json.type) {
        var i, packets = JSON.parse(jv.unzip(json.data));
        for (i = 0; i < packets.length; i++)
            parse(JSON.parse(packets[i]))
    } else if ("pkg" === json.type) {
        var i, packets = JSON.parse(json.data);
        for (i = 0; i < packets.length; i++)
            parse(JSON.parse(packets[i]))
    } else if ("logmsg" === json.type)
        jv.login_dialog.notice.text = json.text,
        jv.login_dialog.notice.w = 0,
        jv.login_dialog.notice.center(),
        jv.login_dialog.okay.enable(1),
        jv.login_dialog.create.enable(1),
        jv.login_dialog.worlds.enable(1);
    else if ("crtmsg" === json.type)
        jv.create_dialog.notice.text = json.text,
        jv.create_dialog.notice.w = 0,
        jv.create_dialog.notice.center(),
        jv.create_dialog.okay.enable(1),
        jv.create_dialog.login.enable(1);
    else if ("mload" === json.type)
        ;
    else if ("music" === json.type)
        playMusic(json.m, 0, json.s);
    else if ("P" === json.type)
        ;
    else if ("accepted" === json.type) {
        jv.login_dialog.visible && jv.login_dialog.username.chars ? (Cookies.set("ml_user", jv.base64_encode(jv.login_dialog.username.chars), {
            expires: 730
        }),
        Cookies.set("ml_pass", jv.base64_encode(jv.login_dialog.password.chars), {
            expires: 730
        })) : jv.create_dialog.visible && jv.create_dialog.username.chars && (Cookies.set("ml_user", jv.base64_encode(jv.create_dialog.username.chars), {
            expires: 730
        }),
        Cookies.set("ml_pass", jv.base64_encode(jv.create_dialog.password.chars), {
            expires: 730
        })),
        splash.visible = 0,
        jv.login_dialog.hide(),
        jv.create_dialog.hide(),
        me = json.id,
        ui_container.visible = 1,
        static_container.visible = 1,
        game_fade.visible = 1,
        game_state = GAME_PLAYING,
        jv.login_dialog.username.blur(),
        jv.login_dialog.password.blur(),
        window.onbeforeunload = confirmLeave,
        MAP_WIDTH = json.mw,
        MAP_HEIGHT = json.mh,
        tile_speed = JSON.parse(JSON.stringify(json.tile)),
        myName = json.name;
        var input_field = document.getElementById("input_field");
        input_field && input_field.blur(),
        fade_to = 0,
        fadeSong(music.rpgtitle)
    } else if ("death" === json.type) {
        // [modification]
        if (myself) {CE.onDeath(json)};
        myName = "",
        family = "",
        me = -1,
        window.onbeforeunload = null,
        myself = void 0,
        game_fade.visible = 1,
        fade_to = 1,
        splash.visible = 0,
        jv.login_dialog.hide(),
        jv.spawn_dialog.death.text = json.death.replace(/(<([^>]+)>)/gi, ""),
        jv.spawn_dialog.dust.text = json.angel_dust,
        jv.spawn_dialog.show();
    } else if ("quit" === json.type)
        has_quit = 1,
        connection.close(),
        show_reconnect("");
    else if ("fade" === json.type)
        fade_to = json.f;
    else if ("pass" === json.type)
        ;
    else if ("message" === json.type) {
        if (json.text = unescape(json.text),
        void 0 !== json.id) {
            var talker = getMob(json.id);
            talker && (talker.bubble = jv.ChatBubble.create(json.text, talker),
            json.text = talker.name + ": <span style='color:#e8e87d'>" + json.text + "</span>")
        }

	CE.onMessage(json);
	
	append(json.text),
        void 0 !== json.error && (jv.disconnect_error = json.error)
    } else if ("script" === json.type)
        document.getElementById("script_code").style.display = "",
        document.getElementById("script_name").style.display = "",
        document.getElementById("script_name").value = json.name,
        editor.setValue(json.script),
        editor.clearSelection();
    else if ("mt" === json.type)
        jv.transition = 1,
        map_fade.alpha = 1,
        json.s ? jv.map_title.tint = 8978312 : jv.map_title.tint = 16777215,
        jv.map_title.alpha = 0,
        dest = -1,
        last_dest = Date.now(),
        json.m ? playMusic(json.m) : playMusic(),
        json.w && (MAP_WIDTH = json.w),
        json.h && (MAP_HEIGHT = json.h),
        jv.map_title.text = json.t,
        jv.map_title.x = Math.floor(378 - jv.map_title.width / 2),
        dlevel = json.n,
        cave_wall != json.c && (cave_wall = json.c,
        cur_wall = cur_cover = cave_wall,
        make_covers()),
        cave_floor = json.f;
    else if ("mi" === json.type)
        ;
    else if ("obj_tpl" === json.type) {
        var tpl = {};
        tpl.name = json.name,
        tpl.description = json.desc,
        tpl.can_stack = json.stack,
        tpl.can_pickup = json.pickup,
        tpl.can_block = json.block,
        tpl.sprite = json.spr,
        tpl.build = json.build,
        object_dict[json.tpl] = tpl,
        objects.process(function(e) {
            e.template == json.tpl && e.cleanup()
        })
    } else if ("plr_tpl" === json.type) {
        var tpl = {};
        tpl.name = json.n,
        tpl.tribe = json.t,
        tpl.level = json.l,
        void 0 == json.p ? tpl.title_color = 15724527 : tpl.title_color = json.p,
        tpl.premium = json.pr,
        tpl.premium && myself && json.id == myself.id && (jv.premium = 1),
        tpl.sprite = json.s,
        tpl.body = json.b,
        tpl.hair = json.h,
        tpl.hair_color = json.hc,
        tpl.clothes = json.c,
        tpl.clothes_color = json.cc,
        tpl.eye_color = json.ec,
        tpl.id = json.id,
        tpl.body && tpl.body != -1 && (tpl.sheet = build_doll(tpl.body, tpl.clothes, tpl.clothes_color, tpl.hair, tpl.hair_color, tpl.eye_color)),
        player_dict[json.id] = tpl,
        mobs.process(function(e) {
            e.template == json.id && e.cleanup()
        })
    } else if ("fx_tpl" === json.type)
        eval("var ob = " + json.code),
        effect_dict[json.tpl] = ob;
    else if ("fx" === json.type) {
        var ef = jv.Effect.create()
          , ob = effect_dict[json.tpl];
        ef.sound = json.s,
        ef.x = 32 * json.x + 16,
        ef.y = 32 * json.y,
        ef.dir = json.d,
        ef.start = ob.start,
        ef.run = ob.run,
        ef.move = ob.move,
        has_focus && effects.add(ef),
        void 0 !== sound[ef.sound] && playSound(ef.sound)
    } else if ("obj" === json.type) {
        object_container.cacheAsBitmap && (object_container.cacheAsBitmap = !1,
        anim1_container.cacheAsBitmap = !1,
        anim2_container.cacheAsBitmap = !1),
        objects.process(function(e) {
            e.updated = 0
        });
        for (var i = 0; i < json.data.length; i++)
            parse(JSON.parse(json.data[i]));
        var to_cleanup = [];
        objects.process(function(e) {
            0 === e.updated && to_cleanup.push(e)
        });
        for (var len = to_cleanup.length, i = 0; i < len; i++)
            to_cleanup[i].cleanup()
    } else if ("pl" === json.type) {
        mobs.process(function(e) {
            e.updated = 0
        });
        for (var i = 0; i < json.data.length; i++)
            parse(JSON.parse(json.data[i]));
        var to_cleanup = [];
        mobs.process(function(e) {
            0 == e.updated && to_cleanup.push(e)
        });
        for (var len = to_cleanup.length, i = 0; i < len; i++)
            to_cleanup[i].cleanup()
    } else if ("o" === json.type) {
        object_container.cacheAsBitmap && (object_container.cacheAsBitmap = !1,
        anim1_container.cacheAsBitmap = !1,
        anim2_container.cacheAsBitmap = !1);
        var key = json.x + "," + json.y;
        delete map_index[key],
        map_index[key] = {};
        var tile_index = map_index[key];
        tile_index.o = [],
        tile_index.update = now,
        tile_index.template = json.d,
        tile_index.block = 0;
        var to_cleanup = [];
        objects.process(function(e) {
            e.x == json.x && e.y == json.y && to_cleanup.push(e)
        });
        var i, len = to_cleanup.length;
        for (i = 0; i < len; i++)
            to_cleanup[i].cleanup();
        var obj = json.d.split("|");
        "" == obj[0] && (obj = []);
	var x = Number(json.x)
	var y = Number(json.y)

	CE.onObjectUpdate(json,x,y)
	    
        for (i in obj) {
            object = jv.Object.create(),
            object.template = obj[i],
            object.x = x,
            object.y = y,
            object.name = object_dict[object.template].name,
            object.description = object_dict[object.template].description,
            object.build = object_dict[object.template].build,
            object.buildup() || (object.sprite = object_dict[object.template].sprite,
            object.sprite < 0 ? object.obj_sprite = jv.sprite(tiles[-object.sprite % 16][Math.floor(-object.sprite / 16)]) : object.obj_sprite = jv.sprite(items[object.sprite % 16][Math.floor(object.sprite / 16)]),
            object.obj_sprite.x = 32 * object.x,
            object.obj_sprite.y = 32 * object.y,
            object_container.addChild(object.obj_sprite)),
            object.can_block = object_dict[object.template].can_block,
            object.can_stack = object_dict[object.template].can_stack,
            object.can_pickup = object_dict[object.template].can_pickup,
            object.can_block && (tile_index.block = 1),
            tile_index.o.push(object),
            objects.add(object)
	}
    } else if ("mp" === json.type)
        jv.mapping_dialog.show();
    else if ("stat" === json.type) {
        var i;
        for (i in json.obj)
            jv.stat_dialog[i] && (jv.stat_dialog[i].text = json.obj[i])
    } else if ("upg" === json.type)
        jv.upgrades = JSON.parse(JSON.stringify(json.obj)),
        jv.upgrade_dialog.do_update(),
        jv.upgrade_dialog.show();
    else if ("reinc" === json.type)
        jv.reinc = JSON.parse(JSON.stringify(json.obj)),
        jv.reincarnate_dialog.do_update();
    else if ("abc" === json.type) {
        if (!jv.ability[json.i])
            return;
        jv.ability[json.i].activate()
    } else if ("abl" === json.type) {
        jv.abl = JSON.parse(JSON.stringify(json.obj));
        var i;
        for (i = 0; i < jv.abl.length || i < jv.ability.length; i++)
            jv.abl[i] ? (jv.ability[i] ? jv.ability[i].spr !== jv.abl[i].spr && (jv.ability[i].icon.texture = items[jv.abl[i].spr % 16][Math.floor(jv.abl[i].spr / 16)]) : jv.ability[i] = jv.AbilityButton.create(524, 362 - 50 * i, jv.abl[i].spr, static_container),
            jv.ability[i].cooldown = 1e3 * jv.abl[i].cd,
            jv.ability[i].last_click = jv.abl[i].c,
            jv.ability[i].spr = jv.abl[i].spr,
            jv.ability[i].ind = i,
            jv.ability[i].visible = 1) : jv.ability[i] && (jv.ability[i].visible = 0)
    } else if ("quest" === json.type)
        jv.quest = JSON.parse(JSON.stringify(json.obj)),
        jv.quest_dialog.do_update(),
        jv.quest_dialog.show();
    else if ("skill" === json.type) {
        var i;
        jv.skills = JSON.parse(JSON.stringify(json.obj)),
        jv.skill_tier = json.tier,
        jv.skill_order = [];
        for (i in jv.skills)
            jv.skill_order.push(i);
        jv.skill_order.sort(function(e, t) {
            return jv.skills[t][2] - jv.skills[e][2]
        }),
        jv.skill_dialog.do_update(),
        jv.skill_dialog.show()
    } else if ("game" === json.type)
        jv.lock_body = json.lb,
        jv.lock_hair = json.lh,
        jv.lock_clothes = json.lc,
        jv.premium = json.pr;
    else if ("ping" === json.type)
        json.c == ping_count && (ping = Date.now() - last_ping,
        ping_count++);
    else if ("pos" === json.type) {
        var mob = getMob(me);
        json.t ? (jv.transition = 1,
        map_fade.alpha = 1,
        jv.map_title.alpha = 0,
        dest = -1,
        last_dest = Date.now()) : inbounds(mob.x, mob.y) && (dest = -1),
        mob.x = json.x,
        mob.y = json.y,
        mob.fromx = json.x,
        mob.fromy = json.y,
        mob.tweenx = 0,
        mob.tweeny = 0,
        mob.traveled = 0,
        mob.last_check = Date.now(),
        mob.update_pos(),
        update_container()
    } else if ("hpp" === json.type) {
	CE.onMonsterHealthChange(json)
        var mob = getMob(json.id);
        mob && (mob.hpbar || (mob.hpbar = jv.HPBar.create(mob, json.o)),
        mob.hpbar.set(json.n))
    } else if ("hpo" === json.type) {
        var object;
        objects.process(function(e) {
            object || e.x != json.x || e.y != json.y || (object = e)
        }),
        object && (object.hpbar || (object.hpbar = jv.HPBar.create(object, json.o)),
        object.hpbar.set(json.n))
        //CE.checkDummy(json)
    } else if ("p" === json.type) {
        var mob = getMob(json.id);
        if (null !== mob)
            mob.speed = json.s,
            mob.cur_speed = json.s,
            (json.id !== me || json.x == mob.x && json.y == mob.y) && (mob.last_dir = json.d,
            mob.dir = json.d),
            mob.chat_sprite.visible ? json.ch || (mob.chat_sprite.visible = 0) : json.ch && (mob.chat_sprite.visible = 1),
            (Math.abs(mob.x - json.x) > 1 || Math.abs(mob.y - json.y) > 1) && (json.id === me && dest != -1 || (mob.fromx = mob.x,
            mob.fromy = mob.y,
            mob.x = json.x,
            mob.y = json.y,
            json.id == me && (mob.fromx = mob.x,
            mob.fromy = mob.y,
            mob.tweenx = 0,
            mob.tweeny = 0,
            mob.traveled = 0,
            mob.last_check = Date.now(),
            mob.update_pos(),
            update_container())),
            (Math.abs(mob.x - json.x) > 4 || Math.abs(mob.y - json.y) > 4) && (mob.fromx = json.x,
            mob.fromy = json.y,
            mob.x = json.x,
            mob.y = json.y,
            mob.traveled = 0,
            json.id == me && (mob.fromx = mob.x,
            mob.fromy = mob.y,
            mob.tweenx = 0,
            mob.tweeny = 0,
            mob.traveled = 0,
            mob.last_check = Date.now(),
            mob.update_pos(),
            update_container()))),
            mob.x === json.x && mob.y === json.y || json.id !== me && (mob.fromx = mob.x,
            mob.fromy = mob.y,
            mob.move(json.x, json.y));
        else {
            if (void 0 == player_dict[json.tpl])
                return;
            if (mob = jv.Entity.create(),
            mob.id = json.id,
            mob.x = json.x,
            mob.y = json.y,
            mob.template = json.tpl,
            mob.traveling = 0,
            mob.fromx = mob.x,
            mob.fromy = mob.y,
            mob.dx = json.dx,
            mob.dy = json.dy,
            mob.speed = json.s,
            mob.cur_speed = json.s,
            mob.dir = json.d,
            mob.name = player_dict[json.tpl].name,
            mob.tribe = player_dict[json.tpl].tribe,
            mob.level = player_dict[json.tpl].level,
            mob.sprite = player_dict[json.tpl].sprite,
            mob.body = player_dict[json.tpl].body,
            mob.hair = player_dict[json.tpl].hair,
            mob.clothes = player_dict[json.tpl].clothes,
            mob.title_color = player_dict[json.tpl].title_color,
            mob.hair_color = player_dict[json.tpl].hair_color,
            mob.clothes_color = player_dict[json.tpl].clothes_color,
            mob.eye_color = player_dict[json.tpl].eye_color,
		mob.id == me && (myself = mob) && CE.init(),
            mob.moved = 1,
            mob.sprite !== -1) {
                if (mob.monster_sprite = jv.sprite(monster[mob.sprite][0][0]),
                mob.monster_sprite.width < 32 && (mob.monster_sprite.scale.x = 32 / mob.monster_sprite.width),
                mob.monster_sprite.height < 32 && (mob.monster_sprite.scale.y = 32 / mob.monster_sprite.height),
                mob.halfx = Math.floor(mob.monster_sprite.width / 2),
                mob.halfy = Math.floor(mob.monster_sprite.height / 2),
                mob.xoffset = 16 - mob.halfx,
                mob.yoffset = 16 - Math.floor(mob.monster_sprite.height),
                mob.body >= 0 ? do_player_title(mob) : do_mob_title(mob),
                mob.monster_sprite.width <= 48) {
                    var lb = mob.monster_sprite.getLocalBounds();
                    mob.monster_sprite.hitArea = new PIXI.Rectangle(lb.x - 8,lb.y - 8,lb.width + 16,lb.height + 16)
                }
            } else {
		try {
                    mob.sheet = player_dict[json.tpl].sheet
		    if(mob.sheet) CE.lastMobSheet = mob.sheet
		    else mob.sheet = CE.lastMobSheet
                    mob.body_sprite = jv.sprite(mob.sheet[0][0])
		} catch (err) {
		    console.log(err)
		}
                mob.body_sprite.scale.x = 2,
                mob.body_sprite.scale.y = 2,
                mob.halfx = Math.floor(mob.body_sprite.width / 2),
                mob.halfy = Math.floor(mob.body_sprite.height / 2),
                mob.xoffset = 16 - mob.halfx,
                mob.yoffset = 18 - Math.floor(mob.body_sprite.height),
		do_player_title(mob);
	    }
            mob.set_sprite(),
            mob.chat_sprite || (mob.chat_sprite = jv.sprite(),
            mob.chat_sprite.texture = jv.chat_say.texture,
            mob.chat_sprite.scale.x = 2,
            mob.chat_sprite.scale.y = 2,
            mob.chat_sprite.visible = 0,
            hover_container.addChild(mob.chat_sprite),
            mob.chat_dots = new PIXI.Graphics,
            mob.chat_dots.lineStyle(0, 1),
            mob.chat_dots.beginFill(3355443, 1),
            mob.chat_dots.drawRect(1.5, 3, 1, 1),
            mob.chat_dots.drawRect(3.5, 3, 1, 1),
            mob.chat_dots.drawRect(5.5, 3, 1, 1),
            mob.chat_dots.endFill(),
            mob.chat_sprite.addChild(mob.chat_dots)),
            mob.update_pos(),
            mob.id == me && update_container(),
            mobs.add(mob)
        }
        mob.updated = 1
	CE.onMobMove(json)
    } else if ("inv" === json.type) {
        var data = json.data, i;
        for (i in item_data)
            item_data[i] = {};
        for (i in data) {
            item_data[data[i].slot] = {},
            item_data[data[i].slot].slot = data[i].slot,
            item_data[data[i].slot].n = data[i].n,
            item_data[data[i].slot].tpl = data[i].t,
            item_data[data[i].slot].spr = data[i].spr,
            item_data[data[i].slot].qty = data[i].qty,
            item_data[data[i].slot].eqp = data[i].eqp,
            item_data[data[i].slot].col = data[i].col;
	    CE.onItemUpdate(data[i]);
	}
        update_inventory()
    } else if ("bld" === json.type)
        json.data && (jv.raw_build_data = json.data),
        update_recipes(),
        update_build();
    else if ("remove" === json.type) {
        var mob = getMob(json.id);
        mob && mob.cleanup()
    } else if ("object" === json.type)
        ;
    else if ("tile" === json.type) {
        var c = loc2tile(json.x, json.y);
        if (!map[c])
            return;
        map_container.cacheAsBitmap && (map_container.cacheAsBitmap = !1,
        anim_map_container.cacheAsBitmap = !1),
        map[c].texture = tiles[json.tile % 16][Math.floor(json.tile / 16)],
        map[c].spr = json.tile,
        325 == json.tile ? (map[c].anim.visible = 1,
        anim_map_container.animations++) : map[c].anim.visible = 0,
        16777215 != map[c].tint && (map[c].tint = 16777215),
        update_edges(),
        update_sort = 1
    } else if ("map" === json.type) {
        var diffx = json.x - 13 - mx
          , diffy = json.y - 13 - my;
        mx = json.x - 13,
        my = json.y - 13,
        map_container.x = 32 * mx + 416,
        map_container.y = 32 * my + 416,
        edge_container.x = map_container.x,
        edge_container.y = map_container.y,
        anim_map_container.x = map_container.x,
        anim_map_container.y = map_container.y,
        object_container.cacheAsBitmap && (object_container.cacheAsBitmap = !1,
        anim1_container.cacheAsBitmap = !1,
        anim2_container.cacheAsBitmap = !1),
        map_container.cacheAsBitmap && (map_container.cacheAsBitmap = !1,
        anim_map_container.cacheAsBitmap = !1),
        anim_map_container.animations = 0;
        var nmap = json.tiles.split(":"), c = 0, to_clean = [], tile = [], obj, x, y, i, object, old_build, tile_index, key;
        for (x = -13; x < 13; x++)
            for (y = -13; y < 13; y++) {
                if (nmap[c] ? (obj = nmap[c].split("_"),
                tile[c] = Number(obj.shift())) : (tile[c] = 0,
                obj = []),
                325 == tile[c] ? (map[c].anim.visible = 1,
                anim_map_container.animations++) : map[c].anim.visible = 0,
                19 == tile[c] && (tile[c] = cave_floor),
                112 == tile[c] && (tile[c] = cave_wall),
                map[c].texture = tiles[tile[c] % 16][Math.floor(tile[c] / 16)],
                map[c].tint = 16777215,
                map[c].spr = tile[c],
                map[c].cover.x = 32 * x + map_container.x,
                map[c].cover.y = 32 * y + map_container.y - 20,
                map[c].cover.ry = map[c].cover.y + 32,
                key = json.x + x + "," + (json.y + y),
                tile_index = map_index[key]) {
                    if (tile_index.template == nmap[c]) {
                        tile_index.update = now,
                        c += 1;
                        continue
                    }
                    for (i in tile_index.o)
                        to_clean.push(tile_index.o[i])
                } else
                    map_index[key] = {},
                    tile_index = map_index[key];
                tile_index.o = [],
                tile_index.update = now,
                tile_index.template = nmap[c],
                tile_index.block = 0;
                for (i in obj) {
                    object = jv.Object.create(),
                    object.template = obj[i],
                    object.x = json.x + x,
                    object.y = json.y + y,
                    object.name = object_dict[object.template].name,
                    object.description = object_dict[object.template].description,
                    object.build = object_dict[object.template].build,
                    object.buildup() || (object.sprite = object_dict[object.template].sprite || CE.spriteOverride(object.name),
                    object.sprite < 0 ? object.obj_sprite = jv.sprite(tiles[-object.sprite % 16][Math.floor(-object.sprite / 16)]) : object.obj_sprite = jv.sprite(items[object.sprite % 16][Math.floor(object.sprite / 16)]),
                    object.obj_sprite.x = 32 * object.x,
                    object.obj_sprite.y = 32 * object.y,
                    object_container.addChild(object.obj_sprite)),
                    object.can_block = object_dict[object.template].can_block,
                    object.can_stack = object_dict[object.template].can_stack,
                    object.can_pickup = object_dict[object.template].can_pickup,
                    object.can_block && (tile_index.block = 1),
                    tile_index.o.push(object),
                    objects.add(object);

		    CE.onTileObjectUpdate(object);
		}
                c += 1
		CE.onTileUpdate(json.x+x, json.y+y);
            }
        for (i in map_index)
            if (map_index[i].update != now) {
                for (c in map_index[i].o)
                    to_clean.push(map_index[i].o[c]);
                delete map_index[i]
            }
        var len = to_clean.length;
        for (i = 0; i < len; i++)
            to_clean[i].cleanup();
        update_edges(),
        jv.transition && (jv.transition = 2),
        update_sort = 1
    } else if ("s" === json.type) {
	CE.onStatusUpdate(json)
        json.t && last_status !== json.t + json.k && (skill_status.timer = Date.now(),
        skill_status.interactive = !0,
        skill_status.alpha = .6,
        last_status = json.t + json.k),
        void 0 !== json.h && hp_status.set(json.h),
        void 0 !== json.k && skill_status.set(json.k),
        void 0 !== json.t && (skill_status.title.text = json.t.charAt(0).toUpperCase() + json.t.slice(1) + " ("+json.k+"%)"),
        void 0 !== json.f && hunger_status.set(json.f),
        void 0 !== json.e && exp_status.set(json.e),
        void 0 !== json.p && (jv.upgrade_number = Math.floor(Number(json.p)));
        var i;
        for (i in jv.buffbar)
            jv.buffbar[i].visible = 0,
            jv.buffbar[i].gfx.visible = 0,
            jv.buffbar[i].t = "";
        if (void 0 !== json.b && json.b.length)
            for (i in json.b)
                jv.buffbar[i] || (jv.buffbar[i] = jv.sprite(jv.buffs[0][0]),
                jv.buffbar[i].gfx = new PIXI.Graphics,
                jv.buffbar[i].gfx.beginFill(12303291, .1),
                jv.buffbar[i].gfx.drawCircle(4, 4, 9),
                jv.buffbar[i].gfx.beginFill(13421772, .2),
                jv.buffbar[i].gfx.drawCircle(4, 4, 7),
                jv.buffbar[i].gfx.beginFill(16777215, .3),
                jv.buffbar[i].gfx.drawCircle(4, 4, 5),
                jv.buffbar[i].gfx.endFill(),
                jv.buffbar[i].visible = 0,
                jv.buffbar[i].x = 12 * i,
                jv.buffbar[i].gfx.x = jv.buffbar[i].x,
                jv.buffbar[i].gfx.y = jv.buffbar[i].y,
                jv.buff_container.addChild(jv.buffbar[i].gfx),
                jv.buff_container.addChild(jv.buffbar[i]),
                jv.buffbar[i].interactive = !0,
                jv.buffbar[i].buttonMode = !0,
                jv.buffbar[i].do_click = function() {
                    var e, t = [];
                    for (e in jv.buffbar)
                        "" !== jv.buffbar[e].t && t.push(jv.buffbar[e].t);
                    append("<color:#AAAAAA>" + t.join("\n"))
                }
                ,
                jv.buffbar[i].on("mouseup", jv.buffbar[i].do_click),
                jv.buffbar[i].on("touchend", jv.buffbar[i].do_click)),
                jv.buffbar[i].t = json.b[i].t,
                jv.buffbar[i].texture = jv.buffs[json.b[i].s][0],
                jv.buffbar[i].visible = 1,
                jv.buffbar[i].gfx.visible = 1
    } else
        "effect" === json.type || ("move" === json.type ? getMob(json.id).set_dest(json.x, json.y) : console.log("Message parsing error", json))
}
  , show_reconnect = function(e) {
    var t = [];
    objects.process(function(e) {
        t.push(e)
    });
    var i, o = t.length;
    for (i = 0; i < o; i++)
        t[i].cleanup();
    for (o = jv.ability.length,
    i = 0; i < o; i++)
        jv.ability[i].visible = 0;
    map_index = {},
    item_page = 0,
    item_data = [],
    build_data = [],
    tile_speed = {},
    item_length = 15,
    build_length = 15,
    build_page = 0,
    myName = "",
    family = "",
    me = -1,
    myself = void 0,
    window.onbeforeunload = null,
    clearInterval(jv.net_timer),
    clearInterval(jv.ping_timer),
    ui_container.visible = 0,
    static_container.visible = 0,
    game_fade.visible = 0,
    game_state = GAME_TITLE,
    splash.visible = 1,
    playMusic("rpgtitle"),
    jv.reconnect_dialog.show(),
    jv.disconnect_error && (e = jv.disconnect_error,
    jv.disconnect_error = null),
    e && (jv.reconnect_dialog.notice.text = e,
    jv.reconnect_dialog.notice.w = 0,
    jv.reconnect_dialog.notice.center())
}
  , do_connect = function() {
    jv.reconnect_dialog.hide(),
    init_network()
}
  , init_network = function() {
    window.WebSocket = window.WebSocket || window.MozWebSocket,
    !window.WebSocket;
    var e = {};
    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function() {
        function t(e) {
            return decodeURIComponent(e.split("+").join(" "))
        }
        e[t(arguments[1])] = t(arguments[2])
    }),
    e.ip && "" !== e.ip || (e.ip = jv.selected_ip),
    debugging && (e.ip = "192.168.1.80"),
    connection = new WebSocket("ws://" + e.ip + ":8080"),
    connection.onopen = function() {
        jv.login_dialog.show(),
        game_state = GAME_TITLE,
        jv.login_dialog.okay.enable(1),
        jv.login_dialog.create.enable(1),
        jv.login_dialog.worlds.enable(1),
        jv.ping_timer = setInterval(function() {
            send({
                type: "P"
            })
        }, 25e3),
        send({
            type: "client",
            ver: version,
            mobile: phone,
            agent: navigator.userAgent
        })
    }
    ,
    connection.onerror = function(e) {
        jv.login_dialog.hide(),
        jv.create_dialog.hide(),
        show_reconnect(has_quit ? "Couldn't connect to server." : "Lost connection to server.")
    }
    ,
    connection.onmessage = function(e) {
        try {
            var t = JSON.parse(e.data)
        } catch (t) {
            return void console.log("This doesn't look like valid JSON: ", e.data)
        }
        parse(t),
        recheck_caches()
    }
    ,
    jv.net_timer = setInterval(jv.net_timer_function, 3e3)
};
jv.net_timer_function = function() {
    1 !== connection.readyState && (jv.login_dialog.hide(),
    jv.create_dialog.hide(),
    show_reconnect("Lost connection to server."))
}
,
jv.command = function(e) {
    if (!editing) {
        var t = e
          , i = t.split(" ");
        if (me == -1)
            return void send({
                type: "login",
                data: t
            });
        if ("/sound" == i[0] && (sound_on = Math.abs(sound_on - 1),
        append(sound_on ? "<em>Sounds are now on.</em>" : "<em>Sounds are now off.</em>")),
        "/showfps" == i[0] && (show_fps = Number(!show_fps),
        jv.fps.visible = show_fps),
        "/fontsize" == i[0]) {
            var o = Number(i[1]);
            if (isNaN(o))
                return;
            o > 16 ? o = 16 : o < 9 && (o = 9),
            jv.chat_box.text_style.font = o + "px Verdana"
        }
        "/dpad" == i[0] && (dpad_back.visible ? (compass.visible = 0,
        compass2.visible = 0,
        dpad_back.visible = 0,
        ph_dpad.visible = 0,
        jv.chat_box.h = 416,
        jv.chat_box.gfx.height = 418,
        jv.chat_box.m.height = 416,
        jv.chat_box.mask.height = 416,
        jv.chat_box.resume.y = jv.chat_box.h - 35) : (compass.visible = 1,
        compass2.visible = 1,
        dpad_back.visible = 1,
        ph_dpad.visible = 1,
        jv.chat_box.h = 294,
        jv.chat_box.gfx.height = 296,
        jv.chat_box.m.height = 294,
        jv.chat_box.mask.height = 294,
        jv.chat_box.resume.y = jv.chat_box.h - 35),
        append("Dpad toggled.")),
        "/upload" == t ? send({
            type: "script",
            name: document.getElementById("script_name").value,
            script: editor.getValue()
        }) : "/t" == i[0] ? (last_tell = i[1],
        send({
            type: "chat",
            data: t
        })) : "/drop" == i[0] ? (amt = 1,
        void 0 === i[1] || isNaN(i[1]) && "all" != i[1] || (amt = i[1]),
        drop_amt = amt,
        amt > 0 && amt < 1e3 ? ui_container.drop.set_text("Drop: " + amt) : ui_container.drop.set_text("Drop: #"),
        append("Drop amount set to " + amt + ".")) : 0 === t.indexOf("/") ? send({
            type: "chat",
            data: t
        }) : "say" == jv.toggle_chat.mode ? send({
            type: "chat",
            data: t
        }) : "global" == jv.toggle_chat.mode ? send(0 === t.indexOf("/b ") ? {
            type: "chat",
            data: t
        } : {
            type: "chat",
            data: "/b " + t
        }) : "tribe" == jv.toggle_chat.mode ? send(0 === t.indexOf("/tc ") ? {
            type: "chat",
            data: t
        } : {
            type: "chat",
            data: "/tc " + t
        }) : "tell" == jv.toggle_chat.mode && (0 === t.indexOf("/t ") ? (last_tell = i[1],
        send({
            type: "chat",
            data: t
        })) : (last_tell = i[0],
        send({
            type: "chat",
            data: "/t " + t
        })))
    }
}
,
jv.current_input = null,
jv.hidden_input = null,
jv.stars = "************************************************************************************",
jv.TextInput = {
    create: function(e, t, i, o, n) {
        var a = jv.sprite();
        return n || (n = ui_container),
        a.interactive = !0,
        a.hasFocus = 0,
        a.h = o,
        a.w = i,
        a.x = e,
        a.y = t,
        a.pos = 0,
        a.mobile = 0,
        a.password = 0,
        a.maxChars = 300,
        a.chars = "",
        a.text_style = {
            font: "12px Verdana",
            align: "left",
            fill: 16777215,
            lineJoin: "round"
        },
        a.placeholder_style = JSON.parse(JSON.stringify(a.text_style)),
        a.placeholder_style.fill = 11184810,
        a.str = jv.text(" ", a.text_style),
        a.str.x += 2,
        a.str.y += 4,
        a.placeholder = jv.text("", a.placeholder_style),
        a.placeholder.x += 4,
        a.placeholder.y += 4,
        a.placeholder.alpha = .8,
        a.hidden_str = jv.text(" ", a.text_style),
        a.hidden_str.x += 2,
        a.hidden_str.y += 4,
        a.cursor = jv.text("|", a.text_style),
        a.cursor.y += 3,
        a.container = new PIXI.Container,
        a.gfx = new PIXI.Graphics,
        a.gfx.beginFill(jv.color_dark, .4),
        a.gfx.lineStyle(2, 7829367, .2),
        a.gfx.drawRoundedRect(0, 0, i, o, 4),
        a.gfx.endFill(),
        a.m = new PIXI.Graphics,
        a.m.beginFill(1118481, 0),
        a.m.drawRect(0, 0, i, o),
        a.m.endFill(),
        a.mask = a.m,
	a.onSubmit = function() {
	    "" !== this.chars && jv.command(this.chars),
	    this.chars = "",
	    jv.hidden_input.value = "",
	    this.pos = 0,
	    this.blur()
	}
        ,
        a.onFocus = function() {
            jv.current_input = this,
            jv.hidden_input.style.display = "block",
            jv.hidden_input.focus(),
            this.hasFocus = 1,
            this.placeholder.text.indexOf("Tell") === -1 || this.chars.length || (last_tell && "" != last_tell ? (this.chars = last_tell + " ",
            jv.hidden_input.value = last_tell + " ") : (this.chars = "",
            jv.hidden_input.value = ""),
            this.pos = this.chars.length),
            this.update(),
            phone && Keyboard.show()
        }
        ,
        a.setText = function(e) {
            this.chars = e,
            this.hasFocus && (jv.hidden_input.value = e),
            this.pos = this.chars.length,
            this.update()
        }
        ,
        a.onBlur = function() {
            this.hasFocus = 0,
            jv.hidden_input.style.display = "none",
            jv.hidden_input.blur(),
            this.update()
        }
        ,
        a.focus = function() {
            this.onFocus()
        }
        ,
        a.blur = function() {
            this.onBlur()
        }
        ,
        a.update = function() {
            jv.hidden_input && (phone && jv.login_dialog && game_state == GAME_TITLE && (document.activeElement == jv.hidden_input ? (jv.login_dialog.y = 12,
            jv.login_dialog.okay.left(40),
            jv.login_dialog.create.right(40),
            jv.login_dialog.create.bottom(20),
            jv.create_dialog.y = 12,
            jv.create_dialog.login.right(32),
            jv.create_dialog.login.bottom(20)) : jv.checkFocus = setTimeout(function() {
                document.activeElement != jv.hidden_input && (jv.login_dialog.y = 200,
                jv.login_dialog.okay.center(),
                jv.login_dialog.create.left(32),
                jv.login_dialog.create.bottom(-40),
                jv.create_dialog.y = 200,
                jv.create_dialog.login.center(),
                jv.create_dialog.login.bottom(-40))
            }, 200)),
            this.mobile || (jv.hidden_input.value = this.chars,
            jv.hidden_input.selectionStart = this.pos,
            jv.hidden_input.selectionEnd = this.pos)),
            this.cursor.visible = this.hasFocus,
            this.placeholder.visible = !this.hasFocus && !this.chars.length,
            this.password ? (this.str.text = jv.stars.slice(0, this.chars.length),
            this.hidden_str.text = this.str.text.slice(0, this.pos)) : (this.str.text = this.chars,
            this.hidden_str.text = this.chars.slice(0, this.pos)),
            this.pos < 1 ? this.cursor.x = 0 : this.cursor.x = this.hidden_str.width - 1,
            this.cursor.x > this.w - 6 ? this.container.x = this.w - 6 - this.cursor.x : this.container.x = 0
        }
        ,
        a.moveCursorLeft = function() {
            this.pos > 0 && this.pos--,
            this.update()
        }
        ,
        a.moveCursorRight = function() {
            this.pos < this.chars.length && this.pos++,
            this.update()
        }
        ,
        a.onClick = function(e) {
            var t = e.data.global.x - this.x - this.container.x - this.parent.x
              , i = this.cursor.x;
            if (t < this.cursor.x) {
                for (; this.pos > 0 && Math.floor(t) <= this.cursor.x; )
                    i = this.cursor.x,
                    this.moveCursorLeft();
                Math.abs(this.cursor.x - t) > Math.abs(i - t) && this.moveCursorRight()
            } else {
                for (; this.pos < this.chars.length && Math.floor(t) >= this.cursor.x; )
                    i = this.cursor.x,
                    this.moveCursorRight();
                Math.abs(this.cursor.x - t) > Math.abs(i - t) && this.moveCursorLeft()
            }
            this.onFocus()
        }
        ,
        a.deleteText = function(e, t) {
            1 == this.chars.length ? this.chars = "" : this.chars = this.chars.slice(0, e) + this.chars.slice(t, this.chars.length),
            this.update()
        }
        ,
        a.onKey = function(e) {
            if (this.hasFocus) {
                var t = e.key;
                if ("WakeUp" !== t && "CapsLock" !== t && "Shift" !== t && "Control" !== t && "Alt" !== t && "AltGraph" !== t && !t.match(/^F\d{1,2}$/) && "Insert" !== t && "NumLock" !== t && "Meta" !== t && "Win" !== t && "Dead" !== t && "Unidentified" !== t && "AudioVolumeDown" !== t && "AudioVolumeUp" !== t && "AudioVolumeMute" !== t) {
                    if ("Tab" === t)
                        return void (this.tab_next && (this.mobile = 1,
                        this.tab_next.mobile = 1,
                        this.hasFocus = 0,
                        this.update(),
                        this.pos = this.chars.length,
                        jv.hidden_input.value = this.tab_next.chars,
                        this.tab_next.pos = this.tab_next.chars.length,
                        this.tab_next.focus(),
                        jv.hidden_input.selectionStart = this.tab_next.pos,
                        jv.hidden_input.selectionEnd = this.tab_next.pos,
                        this.mobile = 0,
                        this.tab_next.mobile = 0));
                    if ("Enter" === t || 13 == e.keyCode)
                        return this.onSubmit(),
                        void (phone && Keyboard.hide());
                    switch (t) {
                    case "Left":
                    case "ArrowLeft":
                        this.moveCursorLeft();
                        break;
                    case "Escape":
                        this.chars = "",
                        this.pos = 0,
                        jv.hidden_input.value = "",
                        this.blur();
                        break;
                    case "Right":
                    case "ArrowRight":
                        this.moveCursorRight();
                        break;
                    case "PageDown":
                    case "PageUp":
                    case "Home":
                    case "End":
                        break;
                    case "Up":
                    case "ArrowUp":
                        break;
                    case "Down":
                    case "ArrowDown":
                        break;
                    case "Backspace":
                        this.pos > 0 && (this.moveCursorLeft(),
                        this.deleteText(this.pos, this.pos + 1)),
                        e.preventDefault();
                        break;
                    case "Del":
                    case "Delete":
                        this.pos < this.chars.length && this.deleteText(this.pos, this.pos + 1);
                        break;
                    default:
                        if (e.ctrlKey && ("j" === t.toLowerCase() || "r" === t.toLowerCase()))
                            return;
                        if ("Spacebar" === t && (t = " "),
                        " " === t && e.preventDefault(),
                        1 !== t.length,
                        this.maxChars > 0 && this.chars.length >= this.maxChars)
                            return
                    }
                }
            }
        }
        ,
        a.sync = function() {
            this.chars = jv.hidden_input.value,
            this.pos = this.chars.length,
            this.update()
        }
        ,
        a.blink = function() {
            this.hasFocus && (this.cursor.alpha ? this.cursor.alpha = 0 : this.cursor.alpha = 1)
        }
        ,
        a.blink_timer = setInterval(function() {
            a.blink()
        }, 250),
        jv.stage.on("mousedown", function() {
            a.blur()
        }),
        jv.stage.on("touchstart", function() {
            a.blur()
        }),
        a.on("mouseup", a.onClick),
        a.on("touchend", a.onClick),
        a.addChild(a.gfx),
        a.addChild(a.m),
        a.addChild(a.container),
        a.container.addChild(a.str),
        a.container.addChild(a.placeholder),
        a.container.addChild(a.cursor),
        n.addChild(a),
        a.update(),
        a
    }

};
var setup_mobile_input = function() {
    var e = document.createElement("input");
    e.type = "text",
    e.style.display = "none",
    e.style.position = "fixed",
    e.style.opacity = 0,
    e.style.pointerEvents = "none",
    e.style.left = "0px",
    e.style.bottom = "0px",
    e.style.left = "-100px",
    e.style.top = "-100px",
    e.style.zIndex = 10,
    e.autocapitalize = "off",
    e.addEventListener("blur", function() {
        jv.current_input && (jv.current_input.blur(),
        phone && setTimeout(function() {
            jv.current_input || Keyboard.hide()
        }, 5))
    }, !1),
    e.addEventListener("keydown", function(e) {
        9 === e.keyCode && e.preventDefault(),
        jv.current_input && (e = e || window.event,
        jv.current_input.hasFocus && (jv.current_input.mobile = 1,
        jv.current_input.chars = jv.hidden_input.value,
        jv.current_input.pos = jv.hidden_input.selectionStart,
        jv.current_input.update(),
        jv.current_input.mobile = 0))
    }),
    e.addEventListener("keypress", function(e) {
        phone && jv.current_input && (e = e || window.event,
        13 == e.keyCode && (jv.current_input.onSubmit(),
        Keyboard.hide()))
    }),
    e.addEventListener("input", function(e) {
        setTimeout(function() {
            phone && jv.current_input && jv.current_input.hasFocus && jv.current_input.chars != jv.hidden_input.value && (jv.current_input.mobile = 1,
            jv.current_input.chars = jv.hidden_input.value,
            jv.current_input.pos = jv.hidden_input.selectionStart,
            jv.current_input.update(),
            jv.current_input.mobile = 0)
        }, 5)
    }),
    e.addEventListener("keyup", function(e) {
        return jv.current_input && (e = e || window.event,
        jv.current_input.hasFocus && (jv.current_input.mobile = 1,
        jv.current_input.onKey(e),
        jv.current_input.chars = jv.hidden_input.value,
        jv.current_input.pos = jv.hidden_input.selectionStart,
        jv.current_input.update(),
        jv.current_input.mobile = 0)),
        !1
    }),
    jv.hidden_input = e,
    document.body.appendChild(jv.hidden_input)
};
jv.ChatBox = {
    create: function(e, t, i, o, n) {
        var a = jv.sprite();
        n || (n = ui_container),
        a.interactive = !0,
        a.h = o,
        a.w = i,
        a.x = e,
        a.y = t,
        a.line_limit = 500,
        a.drag = 0,
        a.dragy = 0,
        a.padding = 4,
        a.offset = 0,
        a.line_space = 2,
        a.text_style = {
            font: "11px Verdana",
            align: "left",
            wordWrap: !0,
            wordWrapWidth: i - 2 * a.padding,
            breakWords: !0,
            fill: 16777215,
            lineJoin: "round"
        },
        phone && (a.text_style.font = "13px Verdana"),
        a.lines = [],
        a.gfx = new PIXI.Graphics,
        a.gfx.beginFill(1580828),
        a.gfx.lineStyle(2, 3686992, 1),
        a.gfx.drawRect(0, 0, i, o),
        a.gfx.endFill(),
        a.gfx.cacheAsBitmap = !0,
        a.m = new PIXI.Graphics,
        a.m.beginFill(1118481),
        a.m.drawRect(0, 0, i, o),
        a.m.endFill(),
        a.m.alpha = 0,
        a.mask = a.m,
        a.addChild(a.mask),
        a.resume = new PIXI.Graphics;
        var r = [0, 0, 60, 0, 30, 30, 0, 0];
        return a.resume.beginFill(4473907, .3),
        a.resume.lineStyle(5, 4473924, .6),
        a.resume.drawPolygon(r),
        a.resume.lineStyle(3, 8947848, .6),
        a.resume.drawPolygon(r),
        a.resume.lineStyle(1, 13421772, .6),
        a.resume.drawPolygon(r),
        a.resume.endFill(),
        a.resume.x = 52,
        a.resume.y = a.h - 35,
        a.resume.cacheAsBitmap = !0,
        a.resume.interactive = !0,
        a.resume.visible = 0,
        a.line_container = new PIXI.Container,
        a.line_container.x = a.padding,
        a.append = function(e, t) {
            var i = e.indexOf("color:#");
            if (i !== -1 && (i = e.substring(i + 7, i + 13),
            /^[a-z0-9]+$/i.test(i)))
                var t = "#" + i;
            t ? 3 == jv.pixiver ? this.text_style.fill = t : this.text_style.fill = ["#FFFFFF", "#DDDDDD", "#AAAAAA"] : 3 == jv.pixiver ? this.text_style.fill = 16777215 : this.text_style.fill = ["#FFFFFF", "#DDDDDD", "#AAAAAA"],
            e = e.replace(/<br>/g, "\n"),
            e = e.replace(/(<([^>]+)>)/gi, ""),
            e = e.replace(/&quot;/g, '"'),
            e = e.replace(/&amp;/g, "&"),
            e = e.replace(/&lt;/g, "<"),
            e = e.replace(/&gt;/g, ">");
            var o = jv.text(e, this.text_style);
            if (4 == jv.pixiver && t && (o.tint = hex_to_int(t.substr(1))),
            this.lines.length ? o.y = this.lines[this.lines.length - 1].y + this.lines[this.lines.length - 1].height + this.line_space : o.y = 0,
            this.lines.push(o),
            this.line_container.addChild(o),
            this.resume.visible || this.line_container.height + this.offset + 2 * this.padding > this.h && (this.line_container.y = this.h - this.offset - this.line_container.height - 2 * this.padding),
            this.lines.length == this.line_limit) {
                var n = this.lines.shift();
                this.line_container.removeChild(n),
                this.offset += n.height + this.line_space,
                n = null
            }
        }
        ,
        a.on_up = function(e) {
            var t = e.data.getLocalPosition(this.parent).y;
            !this.drag && t > this.y + this.h - 60 && (this.resume.visible = 0,
            this.line_container.y = this.h - this.line_container.height - this.padding - this.offset),
            this.drag = 0
        }
        ,
        a.on_down = function(e) {
            if (!(this.line_container.height < this.h - this.padding)) {
                var t = e.data.getLocalPosition(this.parent).y;
                t > this.y + this.h - 60 || (this.drag = 1,
                this.dragy = t,
                this.origy = this.line_container.y,
                this.resume.visible = 1)
            }
        }
        ,
        a.do_move = function(e) {
            var t = e.data.getLocalPosition(this.parent).y;
            this.cur_y = t,
            this.drag && (this.line_container.y = this.origy + t - this.dragy,
            this.line_container.y < this.h - this.offset - this.line_container.height - this.padding ? (this.line_container.y = this.h - this.offset - this.line_container.height - this.padding,
            t < this.dragy - 5 && (this.drag = 0,
            this.resume.visible = 0)) : this.line_container.y > -this.offset && (this.line_container.y = -this.offset))
        }
        ,
        a.on("mouseup", a.on_up),
        a.on("mouseupoutside", a.on_up),
        a.on("touchend", a.on_up),
        a.on("touchendoutside", a.on_up),
        a.on("mousedown", a.on_down),
        a.on("touchstart", a.on_down),
        a.on("mousemove", a.do_move),
        a.on("touchmove", a.do_move),
        a.addChild(a.gfx),
        a.addChild(a.line_container),
        a.addChild(a.resume),
        n.addChild(a),
        a
    }
},
jv.init_dialogs = function() {
    var e = {
        font: "12px Verdana",
        fill: 15658734,
        lineJoin: "round",
        stroke: 4473924,
        strokeThickness: 4,
        align: "center"
    };
    quit_dialog = jv.Dialog.create(170, 70),
    quit_dialog.heading = jv.text("Do you want to log out?", e),
    quit_dialog.add(quit_dialog.heading),
    quit_dialog.heading.center(),
    quit_dialog.heading.top(8),
    quit_dialog.yes = jv.Button.create(0, 0, 34, "Yes", quit_dialog),
    quit_dialog.add(quit_dialog.yes),
    quit_dialog.yes.left(32),
    quit_dialog.yes.bottom(12),
    quit_dialog.yes.on_click = function() {
        send({
            type: "chat",
            data: "/quit"
        }),
        quit_dialog.hide()
    }
    ,
    quit_dialog.no = jv.Button.create(0, 0, 34, "No", quit_dialog),
    quit_dialog.add(quit_dialog.no),
    quit_dialog.no.right(32),
    quit_dialog.no.bottom(12),
    quit_dialog.no.on_click = function() {
        quit_dialog.hide()
    }
    ,
    jv.reincarnate_dialog = jv.Dialog.create(320, 220),
    jv.reincarnate_dialog.heading = jv.text("Reincarnation", e),
    jv.reincarnate_dialog.add(jv.reincarnate_dialog.heading),
    jv.reincarnate_dialog.heading.center(),
    jv.reincarnate_dialog.heading.top(8),
    jv.reincarnate_dialog.info = jv.text("", {
        font: "10px Verdana",
        fill: 11783372,
        lineJoin: "round",
        stroke: jv.color_dark,
        strokeThickness: 2,
        align: "left",
        wordWrap: !0,
        wordWrapWidth: 280,
        breakWords: !0
    }),
    jv.reincarnate_dialog.add(jv.reincarnate_dialog.info),
    jv.reincarnate_dialog.info.left(20),
    jv.reincarnate_dialog.info.top(44),
    jv.reincarnate_dialog.gain = jv.text("Exp: Myst: Top skill: ", {
        font: "10px Verdana",
        fill: 13434879,
        lineJoin: "round",
        stroke: jv.color_dark,
        strokeThickness: 2,
        align: "left"
    }),
    jv.reincarnate_dialog.add(jv.reincarnate_dialog.gain),
    jv.reincarnate_dialog.gain.left(36),
    jv.reincarnate_dialog.gain.bottom(52),
    jv.reincarnate_dialog.yes = jv.Button.create(0, 0, 100, "Level 60 Required", jv.reincarnate_dialog),
    jv.reincarnate_dialog.add(jv.reincarnate_dialog.yes),
    jv.reincarnate_dialog.yes.center(),
    jv.reincarnate_dialog.yes.bottom(16),
    jv.reincarnate_dialog.yes.on_click = function() {
        send({
            type: "c",
            r: "re"
        }),
        jv.reincarnate_dialog.hide()
    }
    ,
    jv.reincarnate_dialog.yes.enable(0),
    jv.reincarnate_dialog.okay = jv.Button.create(0, 0, 24, "X", jv.reincarnate_dialog),
    jv.reincarnate_dialog.add(jv.reincarnate_dialog.okay),
    jv.reincarnate_dialog.okay.right(8),
    jv.reincarnate_dialog.okay.top(8),
    jv.reincarnate_dialog.okay.on_click = function() {
        jv.reincarnate_dialog.hide()
    }
    ,
    jv.reincarnate_dialog.do_update = function() {
        jv.reincarnate_dialog.info.text = jv.reinc.desc,
        jv.reinc.able ? (jv.reincarnate_dialog.yes.set_text("My Body Is Ready"),
        jv.reincarnate_dialog.yes.enable(1)) : (jv.reincarnate_dialog.yes.set_text("Level " + jv.reinc.req + " Required"),
        jv.reincarnate_dialog.yes.enable(0)),
        jv.reincarnate_dialog.gain.text = "Exp: +" + jv.reinc.exp + "%  Myst: +" + jv.reinc.myst + "%  Top skill: " + jv.reinc.skill.capitalize()
    }
    ,
    jv.upgrade_dialog = jv.Dialog.create(320, 280),
    jv.upgrade_dialog.heading = jv.text("Myst Upgrades", e),
    jv.upgrade_dialog.add(jv.upgrade_dialog.heading),
    jv.upgrade_dialog.heading.center(),
    jv.upgrade_dialog.heading.top(8);
    var t, i = 48;
    for (jv.upgrade_dialog.btn = [],
    jv.upgrade_dialog.page = 0,
    jv.upgrade_dialog.per = 8,
    t = 0; t < jv.upgrade_dialog.per; t++)
        jv.upgrade_dialog.btn[t] = jv.Button.create(0, 0, 140, ""),
        jv.upgrade_dialog.btn[t].on_click = function() {
            jv.upgrade_dialog.info.text = this.title.text + ": " + this.desc,
            jv.upgrade_dialog.cost.text = "Cost: " + this.cost,
            jv.upgrade_dialog.buy.enable(this.afford),
            jv.upgrade_dialog.buy.name = this.name,
            jv.upgrade_dialog.trigger = this
        }
        ,
        jv.upgrade_dialog.add(jv.upgrade_dialog.btn[t]),
        t && t % 2 == 0 && (i += 32),
        t % 2 ? jv.upgrade_dialog.btn[t].right(16) : jv.upgrade_dialog.btn[t].left(16),
        jv.upgrade_dialog.btn[t].top(i),
        jv.upgrade_dialog.btn[t].icon = jv.sprite(items[0][Math.floor(0)]),
        jv.upgrade_dialog.btn[t].icon.scale.x = .5,
        jv.upgrade_dialog.btn[t].icon.scale.y = .5,
        jv.upgrade_dialog.btn[t].icon.x = 6,
        jv.upgrade_dialog.btn[t].icon.y = 6,
        jv.upgrade_dialog.btn[t].addChild(jv.upgrade_dialog.btn[t].icon);
    jv.upgrade_dialog.do_update = function() {
        var e, t = jv.upgrade_dialog.page * jv.upgrade_dialog.per;
        for (e = 0; e < jv.upgrade_dialog.btn.length; e++)
            jv.upgrades[t + e] ? (jv.upgrade_dialog.btn[e].visible = 1,
            jv.upgrade_dialog.btn[e].set_text(jv.upgrades[t + e].t + " " + romanize(jv.upgrades[t + e].l)),
            jv.upgrade_dialog.btn[e].icon.texture = items[Number(jv.upgrades[t + e].s) % 16][Math.floor(Number(jv.upgrades[t + e].s) / 16)],
            jv.upgrade_dialog.btn[e].cost = jv.upgrades[t + e].c,
            jv.upgrade_dialog.btn[e].desc = jv.upgrades[t + e].d,
            jv.upgrade_dialog.btn[e].name = jv.upgrades[t + e].n,
            jv.upgrade_dialog.btn[e].afford = jv.upgrades[t + e].a,
            jv.upgrade_dialog.btn[e] == jv.upgrade_dialog.trigger && jv.upgrade_dialog.btn[e].on_click()) : jv.upgrade_dialog.btn[e].visible = 0;
        jv.upgrades[(jv.upgrade_dialog.page + 1) * jv.upgrade_dialog.per] ? jv.upgrade_dialog.next.enable(1) : jv.upgrade_dialog.next.enable(0),
        jv.upgrade_dialog.page > 0 ? jv.upgrade_dialog.prev.enable(1) : jv.upgrade_dialog.prev.enable(0)
    }
    ,
    jv.upgrade_dialog.next = jv.Button.create(30, 32, 40, "Next", jv.upgrade_dialog),
    jv.upgrade_dialog.add(jv.upgrade_dialog.next),
    jv.upgrade_dialog.next.right(16),
    jv.upgrade_dialog.next.bottom(76),
    jv.upgrade_dialog.next.on_click = function() {
        jv.upgrade_dialog.page++,
        jv.upgrade_dialog.do_update()
    }
    ,
    jv.upgrade_dialog.prev = jv.Button.create(30, 32, 40, "Prev", jv.upgrade_dialog),
    jv.upgrade_dialog.add(jv.upgrade_dialog.prev),
    jv.upgrade_dialog.prev.left(16),
    jv.upgrade_dialog.prev.bottom(76),
    jv.upgrade_dialog.prev.on_click = function() {
        jv.upgrade_dialog.page--,
        jv.upgrade_dialog.do_update()
    }
    ,
    jv.upgrade_dialog.buy = jv.Button.create(0, 0, 80, "Buy Upgrade", jv.upgrade_dialog),
    jv.upgrade_dialog.add(jv.upgrade_dialog.buy),
    jv.upgrade_dialog.buy.right(16),
    jv.upgrade_dialog.buy.bottom(16),
    jv.upgrade_dialog.buy.on_click = function() {
        send({
            type: "c",
            r: "ub",
            u: this.name
        })
    }
    ,
    jv.upgrade_dialog.buy.enable(0),
    jv.upgrade_dialog.info = jv.text("Select an upgrade above to read more about it.", {
        font: "10px Verdana",
        fill: 11783372,
        lineJoin: "round",
        stroke: jv.color_dark,
        strokeThickness: 2,
        align: "left",
        wordWrap: !0,
        wordWrapWidth: 200,
        breakWords: !0
    }),
    jv.upgrade_dialog.add(jv.upgrade_dialog.info),
    jv.upgrade_dialog.info.x = 16,
    jv.upgrade_dialog.info.y = jv.upgrade_dialog.buy.y - 22,
    jv.upgrade_dialog.cost = jv.text("", {
        font: "10px Verdana",
        fill: 16777147,
        lineJoin: "round",
        stroke: jv.color_dark,
        strokeThickness: 2,
        align: "left"
    }),
    jv.upgrade_dialog.add(jv.upgrade_dialog.cost),
    jv.upgrade_dialog.cost.x = jv.upgrade_dialog.buy.x + 4,
    jv.upgrade_dialog.cost.y = jv.upgrade_dialog.buy.y - 22,
    jv.upgrade_dialog.okay = jv.Button.create(0, 0, 24, "X", jv.upgrade_dialog),
    jv.upgrade_dialog.add(jv.upgrade_dialog.okay),
    jv.upgrade_dialog.okay.right(8),
    jv.upgrade_dialog.okay.top(8),
    jv.upgrade_dialog.okay.on_click = function() {
        jv.upgrade_dialog.hide()
    }
    ,
    option_dialog = jv.Dialog.create(200, 280);
    var i = 16;
    option_dialog.heading = jv.text("Menu", e),
    option_dialog.add(option_dialog.heading),
    option_dialog.heading.center(),
    option_dialog.heading.top(8),
    option_dialog.sound_label = jv.text("Sound Volume", {
        font: "10px Verdana",
        fill: 16777215,
        lineJoin: "round",
        stroke: jv.color_dark,
        strokeThickness: 2,
        align: "left"
    }),
    option_dialog.add(option_dialog.sound_label),
    option_dialog.sound_label.center(),
    option_dialog.sound_label.top(i += 32),
    option_dialog.sound_slider = jv.Slider.create(100),
    option_dialog.add(option_dialog.sound_slider),
    option_dialog.sound_slider.center(),
    option_dialog.sound_slider.top(i += 16),
    option_dialog.sound_slider.onChange = function() {
        jv.sound_volume = this.percent / 100
    }
    ,
    option_dialog.music_label = jv.text("Music Volume", {
        font: "10px Verdana",
        fill: 16777215,
        lineJoin: "round",
        stroke: jv.color_dark,
        strokeThickness: 2,
        align: "left"
    }),
    option_dialog.add(option_dialog.music_label),
    option_dialog.music_label.center(),
    option_dialog.music_label.top(i += 32),
    option_dialog.music_slider = jv.Slider.create(100),
    option_dialog.add(option_dialog.music_slider),
    option_dialog.music_slider.center(),
    option_dialog.music_slider.top(i += 16),
    option_dialog.music_slider.onChange = function() {
        var e;
        for (e in music)
            music[e].volume(this.percent / 100)
    }
    ,
    option_dialog.music_slider.set_percent(40),
    option_dialog.help = jv.Button.create(0, 0, 80, "Help"),
    option_dialog.help.on_click = function() {
        send({
            type: "c",
            r: "hl"
        }),
        option_dialog.hide()
    }
    ,
    option_dialog.add(option_dialog.help),
    option_dialog.help.center(),
    option_dialog.help.top(i += 32),
    option_dialog.credits = jv.Button.create(0, 0, 80, "Credits"),
    option_dialog.credits.on_click = function() {
        send({
            type: "c",
            r: "cr"
        }),
        option_dialog.hide()
    }
    ,
    option_dialog.add(option_dialog.credits),
    option_dialog.credits.center(),
    option_dialog.credits.top(i += 32),
    option_dialog.fullscreen = jv.Button.create(0, 0, 80, "Fullscreen: Off"),
    option_dialog.fullscreen.on_click = function() {
        if (screenfull.enabled) {
            var e = document.getElementById("all_container");
            screenfull.toggle(e),
            screenfull.isFullscreen,
            screenfull.isFullscreen ? this.set_text("Fullscreen: On") : this.set_text("Fullscreen: Off")
        }
    }
    ,
    screenfull.enabled && document.addEventListener(screenfull.raw.fullscreenchange, function() {
        screenfull.isFullscreen ? option_dialog.fullscreen.set_text("Fullscreen: On") : option_dialog.fullscreen.set_text("Fullscreen: Off")
    }),
    option_dialog.add(option_dialog.fullscreen),
    option_dialog.fullscreen.center(),
    option_dialog.fullscreen.top(i += 32),
    option_dialog.log = jv.Button.create(0, 0, 80, "Log Out", option_dialog),
    option_dialog.add(option_dialog.log),
    option_dialog.log.center(),
    option_dialog.log.top(i += 32),
    option_dialog.log.on_click = function() {
        quit_dialog.show()
    }
    ,
    option_dialog.okay = jv.Button.create(0, 0, 24, "X", option_dialog),
    option_dialog.add(option_dialog.okay),
    option_dialog.okay.right(8),
    option_dialog.okay.top(8),
    option_dialog.okay.on_click = function() {
        Cookies.set("ml_sound", option_dialog.sound_slider.percent, {
            expires: 730
        }),
        Cookies.set("ml_music", option_dialog.music_slider.percent, {
            expires: 730
        }),
        option_dialog.hide()
    }
    ,
    jv.build_dialog = jv.Dialog.create(160, 320),
    jv.build_dialog.right(160),
    jv.build_dialog.top(0),
    jv.build_dialog.heading = jv.text("Build & Craft", {
        font: "12px Verdana",
        fill: 15658734,
        lineJoin: "round",
        stroke: 4473924,
        strokeThickness: 4,
        align: "left"
    }),
    jv.build_dialog.add(jv.build_dialog.heading),
    jv.build_dialog.heading.left(12),
    jv.build_dialog.heading.top(8),
    jv.build_dialog.add(build_pane),
    build_pane.left(0),
    build_pane.top(0),
    c = 0;
    for (var o = 0; o < 5; o++)
        for (var n = 0; n < 3; n++)
            bld[c] = jv.InventorySlot.create(16 + 47 * n, 40 + 38 * o, c, build_pane),
            bld[c].build = 1,
            c += 1;
    build_pane.next = jv.Button.create(0, 232, 38, "Next", build_pane),
    jv.build_dialog.add(build_pane.next),
    build_pane.next.right(16),
    build_pane.next.on_click = function() {
        build_page++,
        update_build()
    }
    ,
    build_pane.prev = jv.Button.create(0, 232, 38, "Prev", build_pane),
    jv.build_dialog.add(build_pane.prev),
    build_pane.prev.left(14),
    build_pane.prev.on_click = function() {
        build_page--,
        update_build()
    }
    ,
    jv.build_dialog.okay = jv.Button.create(30, 32, 24, "X", jv.build_dialog),
    jv.build_dialog.add(jv.build_dialog.okay),
    jv.build_dialog.okay.right(8),
    jv.build_dialog.okay.top(8),
    jv.build_dialog.okay.on_click = function() {
        jv.build_dialog.visible = !1
    }
    ,
    jv.build_dialog.info = jv.scene(),
    jv.build_dialog.add(jv.build_dialog.info),
    jv.build_dialog.info.left(0),
    jv.build_dialog.info.bottom(60),
    jv.build_dialog.info.heading = jv.text("", {
        font: "10px Verdana",
        fill: jv.color_bright,
        lineJoin: "round",
        stroke: jv.color_dark,
        strokeThickness: 4,
        align: "left"
    }),
    jv.build_dialog.info.heading.x = 60,
    jv.build_dialog.info.heading.y = 0,
    jv.build_dialog.info.addChild(jv.build_dialog.info.heading),
    jv.build_dialog.info.sprite = jv.sprite(),
    jv.build_dialog.info.sprite.x = 16,
    jv.build_dialog.info.sprite.y = 4,
    jv.build_dialog.info.addChild(jv.build_dialog.info.sprite),
    jv.build_dialog.info.use = jv.Button.create(60, 21, 36, "Build", jv.build_dialog.info, 26),
    jv.build_dialog.info.use.on_click = function() {
        this.parent.obj && send({
            type: "bld",
            tpl: this.parent.template
        })
    }
    ,
    jv.build_dialog.info.detail = jv.Button.create(103, 21, 36, "Info", jv.build_dialog.info, 26),
    jv.build_dialog.info.detail.on_click = function() {
        this.parent.obj && send({
            type: "nfo",
            tpl: this.parent.template
        })
    }
    ,
    jv.build_dialog.info.set_info = function(e) {
        if (me != -1) {
            if (this.obj = e,
            !e)
                return void (this.visible = !1);
            this.visible = !0,
            0 == e.quantity ? this.use.enable(0) : this.use.enable(1),
            e.build_type ? this.use.set_text(e.build_type.capitalize()) : this.obj.can_pickup ? this.use.set_text("Craft") : this.use.set_text("Build"),
            this.slot = e.slot,
            void 0 !== e.template && (this.template = e.template),
            e.quantity > 1 ? this.heading.text = e.title.text + "  ( " + e.quantity + " )" : this.heading.text = e.title.text,
            this.sprite.texture = e.texture,
            this.use.visible = !0,
            this.detail.visible = !0
        }
    }
    ,
    jv.build_dialog.info.use.visible = !1,
    jv.build_dialog.info.detail.visible = !1,
    jv.stat_dialog = jv.Dialog.create(318, 270),
    jv.stat_dialog.heading = jv.text("Character Stats", {
        font: "12px Verdana",
        fill: 15658734,
        lineJoin: "round",
        stroke: 4473924,
        strokeThickness: 4,
        align: "left"
    }),
    jv.stat_dialog.add(jv.stat_dialog.heading),
    jv.stat_dialog.heading.center(),
    jv.stat_dialog.heading.top(8);
    var t, a = {
        font: "10px Verdana",
        fill: 15658734,
        lineJoin: "round",
        stroke: 4473924,
        strokeThickness: 1,
        align: "center"
    }, r = {
        font: "10px Verdana",
        fill: 61166,
        lineJoin: "round",
        align: "left",
        wordWrap: !0,
        wordWrapWidth: 184,
        breakWords: !0,
        stroke: 4473924,
        strokeThickness: 1
    }, s = 24, l = ["level", "hp", "attack", "defense", "speed", "crit_chance", "exp_bonus", "myst_bonus", "exp_to_level", "myst_refund", "daily_bonus", "weight", "time_alive", "steps", "angel_dust", "dust_earned", "traits"];
    for (t in l)
        jv.stat_dialog[l[t] + "_label"] = jv.text(l[t].capitalize().replaceAll("_", " ") + ": ", a),
        jv.stat_dialog.add(jv.stat_dialog[l[t] + "_label"]),
        t % 2 != 0 && "traits" !== l[t] ? (jv.stat_dialog[l[t] + "_label"].right(80),
        jv.stat_dialog[l[t] + "_label"].top(s)) : (jv.stat_dialog[l[t] + "_label"].right(230),
        jv.stat_dialog[l[t] + "_label"].top(s += 16)),
        jv.stat_dialog[l[t]] = jv.text("", r),
        jv.stat_dialog.add(jv.stat_dialog[l[t]]),
        jv.stat_dialog[l[t]].x = jv.stat_dialog[l[t] + "_label"].x + jv.stat_dialog[l[t] + "_label"].width + 2,
        jv.stat_dialog[l[t]].y = jv.stat_dialog[l[t] + "_label"].y;
    jv.stat_dialog.okay = jv.Button.create(30, 32, 24, "X", jv.stat_dialog),
    jv.stat_dialog.add(jv.stat_dialog.okay),
    jv.stat_dialog.okay.right(8),
    jv.stat_dialog.okay.top(8),
    jv.stat_dialog.okay.on_click = function() {
        jv.stat_dialog.visible = !1
    }
    ,
    jv.stat_dialog.skill = jv.Button.create(0, 0, 96, "Skills", jv.stat_dialog),
    jv.stat_dialog.add(jv.stat_dialog.skill),
    jv.stat_dialog.skill.left(10),
    jv.stat_dialog.skill.bottom(38),
    jv.stat_dialog.skill.on_click = function() {
        send({
            type: "c",
            r: "sk"
        }),
        jv.skill_dialog.show()
    }
    ,
    jv.stat_dialog.upgrades = jv.Button.create(0, 0, 96, "Upgrades", jv.stat_dialog),
    jv.stat_dialog.add(jv.stat_dialog.upgrades),
    jv.stat_dialog.upgrades.left(111),
    jv.stat_dialog.upgrades.bottom(38),
    jv.stat_dialog.upgrades.on_click = function() {
        send({
            type: "c",
            r: "up"
        }),
        jv.upgrade_dialog.show()
    }
    ,
    jv.stat_dialog.reincarnate = jv.Button.create(0, 0, 96, "Reincarnate", jv.stat_dialog),
    jv.stat_dialog.add(jv.stat_dialog.reincarnate),
    jv.stat_dialog.reincarnate.right(10),
    jv.stat_dialog.reincarnate.bottom(38),
    jv.stat_dialog.reincarnate.on_click = function() {
        send({
            type: "c",
            r: "rn"
        }),
        jv.reincarnate_dialog.show()
    }
    ,
    jv.stat_dialog.reincarnate.enable(1),
    jv.stat_dialog.quest = jv.Button.create(0, 0, 96, "Quests", jv.stat_dialog),
    jv.stat_dialog.add(jv.stat_dialog.quest),
    jv.stat_dialog.quest.left(61),
    jv.stat_dialog.quest.bottom(8),
    jv.stat_dialog.quest.on_click = function() {
        send({
            type: "c",
            r: "qs"
        })
    }
    ,
    jv.stat_dialog.appearance = jv.Button.create(0, 0, 96, "Appearance", jv.stat_dialog),
    jv.stat_dialog.add(jv.stat_dialog.appearance),
    jv.stat_dialog.appearance.right(61),
    jv.stat_dialog.appearance.bottom(8),
    jv.stat_dialog.appearance.enable(1),
    jv.stat_dialog.appearance.on_click = function() {
        jv.appearance_dialog.show()
    }
    ,
    jv.skill_dialog = jv.Dialog.create(320, 250),
    jv.skill_dialog.heading = jv.text("Character Skills", {
        font: "12px Verdana",
        fill: 15658734,
        lineJoin: "round",
        stroke: 4473924,
        strokeThickness: 4,
        align: "left"
    }),
    jv.skill_dialog.add(jv.skill_dialog.heading),
    jv.skill_dialog.heading.center(),
    jv.skill_dialog.heading.top(8),
    jv.skill_dialog.slot = [],
    jv.skill_dialog.page = 0,
    jv.skill_dialog.do_update = function() {
        var e = jv.skill_dialog.page;
        if (jv.skills) {
            var t, i, o = 0, n = 16;
            for (t = 0; t < jv.skill_dialog.slot.length; t++)
                jv.skill_dialog.slot[t] && (jv.skill_dialog.slot[t].label.visible = 0,
                jv.skill_dialog.slot[t].stars.visible = 0);
            for (i in jv.skill_order)
                if (t = jv.skill_order[i],
                o < 10 * e)
                    o++;
                else {
                    if (o >= 10 * (e + 1))
                        break;
                    jv.skill_dialog.slot[o] || (n = 40 + i % 10 * 16,
                    jv.skill_dialog.slot[o] = {},
                    jv.skill_dialog.slot[o].stars = new PIXI.Container,
                    jv.skill_dialog.add(jv.skill_dialog.slot[o].stars),
                    jv.skill_dialog.slot[o].stars.row = [],
                    jv.skill_dialog.slot[o].stars.right(172),
                    jv.skill_dialog.slot[o].stars.top(n),
                    jv.skill_dialog.slot[o].label = jv.text("", a),
                    jv.skill_dialog.add(jv.skill_dialog.slot[o].label),
                    jv.skill_dialog.slot[o].label.right(298),
                    jv.skill_dialog.slot[o].label.top(n));
                    var r, s = Math.floor(jv.skills[t][3] / 10), l = jv.skills[t][0];
                    for (r = 0; r < jv.skill_dialog.slot[o].stars.row.length; r++)
                        jv.skill_dialog.slot[o].stars.row[r] && (jv.skill_dialog.slot[o].stars.row[r].visible = 0);
                    for (r = 0; r < s || r < jv.skill_tier; r++)
                        jv.skill_dialog.slot[o].stars.row[r] || (jv.skill_dialog.slot[o].stars.row[r] = jv.sprite(jv.star.texture),
                        jv.skill_dialog.slot[o].stars.addChild(jv.skill_dialog.slot[o].stars.row[r]),
                        jv.skill_dialog.slot[o].stars.row[r].x = 16 * r,
                        jv.skill_dialog.slot[o].stars.row[r].scale.x = 1,
                        jv.skill_dialog.slot[o].stars.row[r].scale.y = 1),
                        r >= s ? (jv.skill_dialog.slot[o].stars.row[r].alpha = .8,
                        jv.skill_dialog.slot[o].stars.row[r].tint = 3355494) : (jv.skill_dialog.slot[o].stars.row[r].alpha = 1,
                        l ? (jv.skill_dialog.slot[o].stars.row[r].tint = 43775,
                        l--) : (jv.skill_dialog.slot[o].stars.row[r].tint = 16776994,
                        r >= jv.skill_tier && (jv.skill_dialog.slot[o].stars.row[r].alpha = .4))),
                        jv.skill_dialog.slot[o].stars.row[r].visible = 1;
                    jv.skill_dialog.slot[o].label.visible = 1,
                    jv.skill_dialog.slot[o].stars.visible = 1,
                    jv.skill_dialog.slot[o].label.text = t.capitalize() + ": " + (jv.skills[t][0] >= jv.skill_tier ? 10 * jv.skills[t][0] : jv.skills[t][2]),
                    jv.skills[t][2] != jv.skills[t][1] && (jv.skill_dialog.slot[o].label.text = jv.skill_dialog.slot[o].label.text + " (+" + (jv.skills[t][2] - jv.skills[t][1]) + ")"),
                    jv.skill_dialog.slot[o].label.right(298),
                    o++
                }
            o >= jv.skill_order.length ? jv.skill_dialog.next.visible = 0 : jv.skill_dialog.next.visible = 1,
            e > 0 ? jv.skill_dialog.prev.visible = 1 : jv.skill_dialog.prev.visible = 0
        }
    }
    ,
    jv.skill_dialog.next = jv.Button.create(30, 32, 40, "Next", jv.skill_dialog),
    jv.skill_dialog.add(jv.skill_dialog.next),
    jv.skill_dialog.next.right(36),
    jv.skill_dialog.next.bottom(16),
    jv.skill_dialog.next.on_click = function() {
        jv.skill_dialog.page++,
        jv.skill_dialog.do_update()
    }
    ,
    jv.skill_dialog.prev = jv.Button.create(30, 32, 40, "Prev", jv.skill_dialog),
    jv.skill_dialog.add(jv.skill_dialog.prev),
    jv.skill_dialog.prev.left(36),
    jv.skill_dialog.prev.bottom(16),
    jv.skill_dialog.prev.on_click = function() {
        jv.skill_dialog.page--,
        jv.skill_dialog.do_update()
    }
    ,
    jv.skill_dialog.okay = jv.Button.create(30, 32, 24, "X", jv.skill_dialog),
    jv.skill_dialog.add(jv.skill_dialog.okay),
    jv.skill_dialog.okay.right(8),
    jv.skill_dialog.okay.top(8),
    jv.skill_dialog.okay.on_click = function() {
        jv.skill_dialog.page = 0,
        jv.skill_dialog.visible = !1
    }
    ,
    jv.spawn_dialog = jv.Dialog.create(260, 180, jv.stage),
    jv.spawn_dialog.left(240),
    jv.spawn_dialog.top(118),
    jv.spawn_dialog.modal = 1,
    jv.spawn_dialog.heading = jv.text("Just a Scratch..", e),
    jv.spawn_dialog.add(jv.spawn_dialog.heading),
    jv.spawn_dialog.heading.center(),
    jv.spawn_dialog.heading.top(8),
    a = {
        font: "10px Verdana",
        fill: 15658734,
        lineJoin: "round",
        stroke: 4473924,
        strokeThickness: 1,
        align: "center"
    },
    r = {
        font: "11px Verdana",
        fill: 16776960,
        lineJoin: "round",
        align: "left",
        wordWrap: !0,
        wordWrapWidth: 180,
        breakWords: !0,
        stroke: 4473924,
        strokeThickness: 1
    };
    var d = {
        font: "11px Verdana",
        fill: 11783372,
        lineJoin: "round",
        align: "center",
        wordWrap: !0,
        wordWrapWidth: 180,
        breakWords: !0,
        stroke: jv.color_dark,
        strokeThickness: 2
    };
    s = 16,
    jv.spawn_dialog.death = jv.text("Hero has fallen! They were level 10 and skilled at dagger. Killed by a wolf.", d),
    jv.spawn_dialog.add(jv.spawn_dialog.death),
    jv.spawn_dialog.death.center(),
    jv.spawn_dialog.death.top(s += 16),
    jv.spawn_dialog.dust_label = jv.text("Angel Dust Gained:", a),
    jv.spawn_dialog.add(jv.spawn_dialog.dust_label),
    jv.spawn_dialog.dust_label.right(90),
    jv.spawn_dialog.dust_label.top(s += 78),
    jv.spawn_dialog.dust = jv.text("120", r),
    jv.spawn_dialog.add(jv.spawn_dialog.dust),
    jv.spawn_dialog.dust.x = jv.spawn_dialog.dust_label.x + jv.spawn_dialog.dust_label.width + 2,
    jv.spawn_dialog.dust.y = jv.spawn_dialog.dust_label.y,
    jv.spawn_dialog.yes = jv.Button.create(0, 0, 80, "Respawn", jv.spawn_dialog),
    jv.spawn_dialog.add(jv.spawn_dialog.yes),
    jv.spawn_dialog.yes.center(),
    jv.spawn_dialog.yes.bottom(16),
    jv.spawn_dialog.yes.on_click = function() {
        send({
            type: "login",
            data: "/me"
        }),
        jv.spawn_dialog.hide()
    }
    ,
    jv.quest_dialog = jv.Dialog.create(320, 260),
    jv.quest_dialog.heading = jv.text("Current Quests", e),
    jv.quest_dialog.add(jv.quest_dialog.heading),
    jv.quest_dialog.heading.center(),
    jv.quest_dialog.heading.top(8),
    jv.quest_dialog.task = [],
    jv.quest_dialog.task[0] = {},
    jv.quest_dialog.task[1] = {},
    jv.quest_dialog.task[0].name = jv.text("Safe Keeping", {
        font: "12px Verdana",
        fill: 15658683,
        lineJoin: "round",
        stroke: 4473924,
        strokeThickness: 1,
        align: "center"
    }),
    jv.quest_dialog.add(jv.quest_dialog.task[0].name),
    jv.quest_dialog.task[0].name.left(32),
    jv.quest_dialog.task[0].name.top(36),
    jv.quest_dialog.task[0].desc = jv.text("Make a floor tile with wood, clay, or stone. Build one in your inventory then use it to create a floor under you. Floor tiles keep your items safe so they don't decay.", {
        font: "11px Verdana",
        fill: 11783372,
        lineJoin: "round",
        align: "left",
        wordWrap: !0,
        wordWrapWidth: 260,
        breakWords: !0,
        stroke: jv.color_dark,
        strokeThickness: 2
    }),
    jv.quest_dialog.add(jv.quest_dialog.task[0].desc),
    jv.quest_dialog.task[0].desc.left(32),
    jv.quest_dialog.task[0].desc.top(56),
    jv.quest_dialog.task[1].name = jv.text("Safe Keeping", {
        font: "12px Verdana",
        fill: 15658683,
        lineJoin: "round",
        stroke: 4473924,
        strokeThickness: 1,
        align: "center"
    }),
    jv.quest_dialog.add(jv.quest_dialog.task[1].name),
    jv.quest_dialog.task[1].name.left(32),
    jv.quest_dialog.task[1].name.top(142),
    jv.quest_dialog.task[1].desc = jv.text("Make a floor tile with wood, clay, or stone. Build one in your inventory then use it to create a floor under you. Floor tiles keep your items safe so they don't decay.", {
        font: "11px Verdana",
        fill: 11783372,
        lineJoin: "round",
        align: "left",
        wordWrap: !0,
        wordWrapWidth: 260,
        breakWords: !0,
        stroke: jv.color_dark,
        strokeThickness: 2
    }),
    jv.quest_dialog.add(jv.quest_dialog.task[1].desc),
    jv.quest_dialog.task[1].desc.left(32),
    jv.quest_dialog.task[1].desc.top(162),
    jv.quest_dialog.okay = jv.Button.create(30, 32, 24, "X", jv.quest_dialog),
    jv.quest_dialog.add(jv.quest_dialog.okay),
    jv.quest_dialog.okay.right(8),
    jv.quest_dialog.okay.top(8),
    jv.quest_dialog.okay.on_click = function() {
        jv.quest_dialog.page = 0,
        jv.quest_dialog.visible = !1
    }
    ,
    jv.quest_dialog.do_update = function() {
        jv.quest_dialog.task[0].name.text = "",
        jv.quest_dialog.task[0].desc.text = "",
        jv.quest_dialog.task[1].name.text = "",
        jv.quest_dialog.task[1].desc.text = "";
        var e, t, i = 0;
        for (e in jv.quest)
            t = jv.quest[e].name,
            jv.quest[e].prog && (t += " [" + jv.quest[e].prog + "]"),
            jv.quest_dialog.task[i].name.text = t,
            jv.quest_dialog.task[i].desc.text = jv.quest[e].desc,
            i++
    }
    ,
    jv.mapping_dialog = jv.Dialog.create(380, 340),
    jv.mapping_dialog.page = 0,
    jv.preview_tile = jv.sprite(tiles[0][Math.floor(0)]),
    jv.preview_tile.tile = 0,
    jv.mapping_dialog.add(jv.preview_tile),
    jv.preview_tile.left(300),
    jv.preview_tile.top(16),
    jv.mapping_dialog.tile_label = jv.text("", {
        font: "12px Verdana",
        fill: 15658734,
        lineJoin: "round",
        stroke: 4473924,
        strokeThickness: 4,
        align: "left"
    }),
    jv.mapping_dialog.add(jv.mapping_dialog.tile_label),
    jv.mapping_dialog.tile_label.left(300),
    jv.mapping_dialog.tile_label.top(48),
    jv.map_tile = [],
    jv.itm_tile = [],
    jv.mapping_dialog.update = function() {
        var e, t, i = 0;
        for (t = 0; t < 8; t++)
            for (e = 0; e < 16; e++)
                jv.map_tile[i] ? (jv.map_tile[i].texture = tiles[(i + 128 * jv.mapping_dialog.page) % 16][Math.floor((i + 128 * jv.mapping_dialog.page) / 16)],
                jv.map_tile[i].tile = i + 128 * jv.mapping_dialog.page) : (jv.map_tile[i] = jv.sprite(tiles[(i + 128 * jv.mapping_dialog.page) % 16][Math.floor((i + 128 * jv.mapping_dialog.page) / 16)]),
                jv.map_tile[i].tile = i + 128 * jv.mapping_dialog.page,
                jv.map_tile[i].interactive = !0,
                jv.map_tile[i].scale.x = .5,
                jv.map_tile[i].scale.y = .5,
                jv.map_tile[i].mouseover = function() {
                    jv.preview_tile.texture = tiles[this.tile % 16][Math.floor(this.tile / 16)]
                }
                ,
                jv.map_tile[i].mouseout = function() {
                    jv.preview_tile.texture = tiles[jv.preview_tile.tile % 16][Math.floor(jv.preview_tile.tile / 16)]
                }
                ,
                jv.map_tile[i].do_click = function() {
                    jv.preview_tile.tile = this.tile,
                    jv.mapping_dialog.tile_label.text = "" + this.tile,
                    jv.preview_tile.texture = tiles[jv.preview_tile.tile % 16][Math.floor(jv.preview_tile.tile / 16)],
                    playSound("click"),
                    send({
                        type: "c",
                        r: "mp",
                        s: this.tile
                    })
                }
                ,
                jv.map_tile[i].on("mouseup", jv.map_tile[i].do_click),
                jv.map_tile[i].on("touchend", jv.map_tile[i].do_click),
                jv.mapping_dialog.add(jv.map_tile[i]),
                jv.map_tile[i].top(17 * t + 16),
                jv.map_tile[i].left(17 * e + 16)),
                jv.itm_tile[i] ? (jv.itm_tile[i].texture = items[(i + 128 * jv.mapping_dialog.page) % 16][Math.floor((i + 128 * jv.mapping_dialog.page) / 16)],
                jv.itm_tile[i].tile = i + 128 * jv.mapping_dialog.page) : (jv.itm_tile[i] = jv.sprite(items[(i + 128 * jv.mapping_dialog.page) % 16][Math.floor((i + 128 * jv.mapping_dialog.page) / 16)]),
                jv.itm_tile[i].tile = i + 128 * jv.mapping_dialog.page,
                jv.itm_tile[i].interactive = !0,
                jv.itm_tile[i].scale.x = .5,
                jv.itm_tile[i].scale.y = .5,
                jv.itm_tile[i].mouseover = function() {
                    jv.preview_tile.texture = items[this.tile % 16][Math.floor(this.tile / 16)]
                }
                ,
                jv.itm_tile[i].mouseout = function() {
                    jv.preview_tile.texture = items[jv.preview_tile.tile % 16][Math.floor(jv.preview_tile.tile / 16)]
                }
                ,
                jv.itm_tile[i].do_click = function() {
                    jv.preview_tile.tile = this.tile,
                    jv.mapping_dialog.tile_label.text = "" + this.tile,
                    jv.preview_tile.texture = items[jv.preview_tile.tile % 16][Math.floor(jv.preview_tile.tile / 16)]
                }
                ,
                jv.itm_tile[i].on("mouseup", jv.itm_tile[i].do_click),
                jv.itm_tile[i].on("touchend", jv.itm_tile[i].do_click),
                jv.mapping_dialog.add(jv.itm_tile[i]),
                jv.itm_tile[i].top(17 * t + 160),
                jv.itm_tile[i].left(17 * e + 16)),
                i++;
        jv.mapping_dialog.page <= 0 ? jv.mapping_dialog.prev.enable(0) : jv.mapping_dialog.prev.enable(1),
        jv.mapping_dialog.page >= 7 ? jv.mapping_dialog.next.enable(0) : jv.mapping_dialog.next.enable(1)
    }
    ,
    jv.mapping_dialog.next = jv.Button.create(30, 32, 32, ">", jv.mapping_dialog),
    jv.mapping_dialog.add(jv.mapping_dialog.next),
    jv.mapping_dialog.next.left(266),
    jv.mapping_dialog.next.bottom(16),
    jv.mapping_dialog.next.on_click = function() {
        jv.mapping_dialog.page++,
        jv.mapping_dialog.update()
    }
    ,
    jv.mapping_dialog.prev = jv.Button.create(30, 32, 32, "<", jv.mapping_dialog),
    jv.mapping_dialog.add(jv.mapping_dialog.prev),
    jv.mapping_dialog.prev.left(16),
    jv.mapping_dialog.prev.bottom(16),
    jv.mapping_dialog.prev.on_click = function() {
        jv.mapping_dialog.page--,
        jv.mapping_dialog.update()
    }
    ,
    jv.mapping_dialog.okay = jv.Button.create(30, 32, 24, "X", jv.mapping_dialog),
    jv.mapping_dialog.add(jv.mapping_dialog.okay),
    jv.mapping_dialog.okay.right(8),
    jv.mapping_dialog.okay.top(8),
    jv.mapping_dialog.okay.on_click = function() {
        jv.mapping_dialog.visible = !1
    }
    ,
    jv.mapping_dialog.update(),
    jv.stage.addChild(splash),
    jv.login_dialog = jv.Dialog.create(260, 160, jv.stage),
    jv.login_dialog.left(Math.floor(jv.game_width / 2) - 128),
    jv.login_dialog.top(200),
    jv.login_dialog.modal = 1,
    jv.login_dialog.heading = jv.text("Character Login", e),
    jv.login_dialog.add(jv.login_dialog.heading),
    jv.login_dialog.heading.center(),
    jv.login_dialog.heading.top(8),
    jv.login_dialog.notice = jv.text("", {
        font: "9px Verdana",
        fill: 13413034,
        lineJoin: "round",
        stroke: 4473924,
        strokeThickness: 1,
        align: "center"
    }),
    jv.login_dialog.add(jv.login_dialog.notice),
    jv.login_dialog.notice.center(),
    jv.login_dialog.notice.top(26),
    jv.login_dialog.username = jv.TextInput.create(0, 0, 180, 24, jv.login_dialog),
    jv.login_dialog.username.placeholder.text = "Username",
    jv.login_dialog.add(jv.login_dialog.username),
    jv.login_dialog.username.center(),
    jv.login_dialog.username.bottom(90),
    jv.login_dialog.password = jv.TextInput.create(0, 0, 180, 24, jv.login_dialog),
    jv.login_dialog.password.placeholder.text = "Password",
    jv.login_dialog.password.password = !0,
    jv.login_dialog.add(jv.login_dialog.password),
    jv.login_dialog.password.center(),
    jv.login_dialog.password.bottom(58),
    jv.login_dialog.username.tab_next = jv.login_dialog.password,
    jv.login_dialog.password.tab_next = jv.login_dialog.username,
    jv.login_dialog.username.onSubmit = function() {
        jv.login_dialog.okay.on_click()
    }
    ,
    jv.login_dialog.password.onSubmit = jv.login_dialog.username.onSubmit,
    jv.login_dialog.okay = jv.Button.create(30, 32, 60, "Login", jv.login_dialog),
    jv.login_dialog.add(jv.login_dialog.okay),
    jv.login_dialog.okay.center(),
    jv.login_dialog.okay.bottom(20),
    jv.login_dialog.okay.on_click = function() {
        "" != jv.login_dialog.username.chars && "" != jv.login_dialog.password.chars && (jv.login_dialog.okay.enable(0),
        jv.login_dialog.create.enable(0),
        jv.login_dialog.worlds.enable(0),
        jv.login_dialog.notice.text = "",
        send({
            type: "login",
            user: jv.base64_encode(jv.login_dialog.username.chars.trim()),
            pass: jv.base64_encode(jv.login_dialog.password.chars.trim())
        }))
    }
    ,
    jv.login_dialog.create = jv.Button.create(30, 32, 80, "Create New", jv.login_dialog),
    jv.login_dialog.add(jv.login_dialog.create),
    jv.login_dialog.create.left(32),
    jv.login_dialog.create.bottom(-40),
    jv.login_dialog.create.on_click = function() {
        jv.login_dialog.hide(),
        jv.create_dialog.show()
    }
    ,
    jv.login_dialog.worlds = jv.Button.create(30, 32, 80, "Worlds", jv.login_dialog),
    jv.login_dialog.add(jv.login_dialog.worlds),
    jv.login_dialog.worlds.right(32),
    jv.login_dialog.worlds.bottom(-40),
    jv.login_dialog.worlds.on_click = function() {
        jv.login_dialog.hide(),
        jv.create_dialog.hide(),
        connection.close(),
        show_reconnect(" ")
    }
    ,
    jv.login_dialog.okay.enable(0),
    jv.login_dialog.create.enable(0),
    jv.reconnect_dialog = jv.Dialog.create(340, 190, jv.stage),
    jv.reconnect_dialog.left(Math.floor(jv.game_width / 2) - 170),
    jv.reconnect_dialog.top(192),
    jv.reconnect_dialog.modal = 1,
    jv.reconnect_dialog.heading = jv.text("- Choose a World -", e),
    jv.reconnect_dialog.add(jv.reconnect_dialog.heading),
    jv.reconnect_dialog.heading.center(),
    jv.reconnect_dialog.heading.top(8),
    jv.reconnect_dialog.notice = jv.text("", {
        font: "9px Verdana",
        fill: 13413034,
        lineJoin: "round",
        stroke: 4473924,
        strokeThickness: 1,
        align: "center"
    }),
    jv.reconnect_dialog.add(jv.reconnect_dialog.notice),
    jv.reconnect_dialog.notice.center(),
    jv.reconnect_dialog.notice.top(82);
    var _ = 1;
    jv.reconnect_dialog["connect" + _] = jv.Button.create(40, 40, 156, "USTexas", jv.reconnect_dialog, 34),
    jv.reconnect_dialog["connect" + _].ip = "45.33.4.254",
    jv.reconnect_dialog.add(jv.reconnect_dialog["connect" + _]),
    jv.reconnect_dialog["connect" + _].left(12),
    jv.reconnect_dialog["connect" + _].top(75),
    jv.reconnect_dialog["connect" + _].on_click = function() {
        jv.selected_ip = this.ip,
        do_connect()
    }
    ,
    _++,
    jv.reconnect_dialog["connect" + _] = jv.Button.create(40, 40, 156, "USWest", jv.reconnect_dialog, 34),
    jv.reconnect_dialog["connect" + _].ip = "45.33.111.16",
    jv.reconnect_dialog.add(jv.reconnect_dialog["connect" + _]),
    jv.reconnect_dialog["connect" + _].left(12),
    jv.reconnect_dialog["connect" + _].top(35),
    jv.reconnect_dialog["connect" + _].on_click = function() {
        jv.selected_ip = this.ip,
        do_connect()
    }
    ,
    _++,
    jv.reconnect_dialog["connect" + _] = jv.Button.create(40, 40, 156, "USEast", jv.reconnect_dialog, 34),
    jv.reconnect_dialog["connect" + _].ip = "173.255.234.46",
    jv.reconnect_dialog.add(jv.reconnect_dialog["connect" + _]),
    jv.reconnect_dialog["connect" + _].right(12),
    jv.reconnect_dialog["connect" + _].top(35),
    jv.reconnect_dialog["connect" + _].on_click = function() {
        jv.selected_ip = this.ip,
        do_connect()
    }
    ,
    _++,
    jv.reconnect_dialog["connect" + _] = jv.Button.create(40, 40, 156, "Europe", jv.reconnect_dialog, 34),
    jv.reconnect_dialog["connect" + _].ip = "139.162.179.186",
    jv.reconnect_dialog.add(jv.reconnect_dialog["connect" + _]),
    jv.reconnect_dialog["connect" + _].right(12),
    jv.reconnect_dialog["connect" + _].top(75),
    jv.reconnect_dialog["connect" + _].on_click = function() {
        jv.selected_ip = this.ip,
        do_connect()
    }
    ,
    _++,
    jv.reconnect_dialog["connect" + _] = jv.Button.create(40, 40, 156, "Brazil", jv.reconnect_dialog, 34),
    jv.reconnect_dialog["connect" + _].ip = "177.71.197.57",
    jv.reconnect_dialog.add(jv.reconnect_dialog["connect" + _]),
    jv.reconnect_dialog["connect" + _].left(12),
    jv.reconnect_dialog["connect" + _].top(115),
    jv.reconnect_dialog["connect" + _].on_click = function() {
        jv.selected_ip = this.ip,
        do_connect()
    }
    ,
    _++,
    jv.reconnect_dialog["connect" + _] = jv.Button.create(40, 40, 156, "Seasonal", jv.reconnect_dialog, 34),
    jv.reconnect_dialog["connect" + _].ip = "172.104.27.26",
    jv.reconnect_dialog.add(jv.reconnect_dialog["connect" + _]),
    jv.reconnect_dialog["connect" + _].right(12),
    jv.reconnect_dialog["connect" + _].top(115),
    jv.reconnect_dialog["connect" + _].on_click = function() {
        jv.selected_ip = this.ip,
        do_connect()
    }
    ,
    jv.reconnect_dialog.info = jv.text("Account names are shared across servers\nStats and items are different on each world", {
        font: "10px Verdana",
        fill: 11783372,
        lineJoin: "round",
        stroke: jv.color_dark,
        strokeThickness: 2,
        align: "center",
        wordWrap: !0,
        wordWrapWidth: 280,
        breakWords: !0
    }),
    jv.reconnect_dialog.add(jv.reconnect_dialog.info),
    jv.reconnect_dialog.info.center(),
    jv.reconnect_dialog.info.bottom(8),
    jv.reconnect_dialog.news = jv.text("Latest News:\nLots of new people! Working to increase capacity. You can also play from the website at www.mysteralegacy.com.", {
        font: "11px Verdana",
        fill: 12307694,
        lineJoin: "round",
        dropShadow: !1,
        stroke: 5592405,
        strokeThickness: 4,
        align: "center",
        wordWrap: !0,
        wordWrapWidth: 160,
        breakWords: !1
    }),
    jv.reconnect_dialog.add(jv.reconnect_dialog.news),
    jv.reconnect_dialog.news.left(355),
    jv.reconnect_dialog.news.bottom(48),
    jv.reconnect_dialog.news.alpha = .8,
    jv.reconnect_dialog.tip = jv.text("Tip: If you hold down the action button for a few seconds it will stay pressed!", {
        font: "12px Verdana",
        fill: 13413119,
        lineJoin: "round",
        stroke: jv.color_dark,
        strokeThickness: 4,
        align: "right",
        wordWrap: !0,
        wordWrapWidth: 700,
        breakWords: !0
    }),
    jv.reconnect_dialog.add(jv.reconnect_dialog.tip),
    jv.reconnect_dialog.tip.center(),
    jv.reconnect_dialog.tip.bottom(-20),
    jv.reconnect_dialog.tip.alpha = .6,
    "undefined" != typeof fetch && fetch("http://www.mysteralegacy.com/metaconfig_test.php", {
        method: "GET",
        headers: {
            Accept: "application/json"
        }
    }).then(function(e) {
        e.json().then(function(e) {
            if (jv.metaconfig = e,
            jv.metaconfig.servers && jv.metaconfig.servers.length) {
                var t, i, o;
                for (t = 0; t < jv.metaconfig.servers.length; t++)
                    o = jv.metaconfig.servers[t],
                    i = jv.reconnect_dialog["connect" + (t + 1)],
                    i.set_text(o.title),
                    i.ip = o.ip
            }
            jv.metaconfig.tip && (jv.reconnect_dialog.tip.text = jv.metaconfig.tip,
            jv.reconnect_dialog.tip.x = 160 - jv.reconnect_dialog.tip.width / 2 + 1),
            jv.metaconfig.news && (jv.reconnect_dialog.news.text = jv.metaconfig.news),
            jv.metaconfig.music && playMusic(jv.metaconfig.music)
        })
    }).catch(function(e) {}),
    jv.create_dialog = jv.Dialog.create(460, 160, jv.stage),
    jv.create_dialog.left(Math.floor(jv.game_width / 2) - 230),
    jv.create_dialog.top(200),
    jv.create_dialog.modal = 1,
    jv.create_dialog.heading = jv.text("Create New Character", e),
    jv.create_dialog.add(jv.create_dialog.heading),
    jv.create_dialog.heading.center(),
    jv.create_dialog.heading.top(8),
    jv.create_dialog.notice = jv.text("", {
        font: "9px Verdana",
        fill: 13413034,
        lineJoin: "round",
        stroke: 4473924,
        strokeThickness: 1,
        align: "center"
    }),
    jv.create_dialog.add(jv.create_dialog.notice),
    jv.create_dialog.notice.center(),
    jv.create_dialog.notice.top(26),
    jv.create_dialog.username = jv.TextInput.create(0, 0, 180, 24, jv.create_dialog),
    jv.create_dialog.username.placeholder.text = "Player name",
    jv.create_dialog.add(jv.create_dialog.username),
    jv.create_dialog.username.left(32),
    jv.create_dialog.username.bottom(90),
    jv.create_dialog.email = jv.TextInput.create(0, 0, 180, 24, jv.create_dialog),
    jv.create_dialog.email.placeholder.text = "Email (for lost passwords)",
    jv.create_dialog.add(jv.create_dialog.email),
    jv.create_dialog.email.right(32),
    jv.create_dialog.email.bottom(90),
    jv.create_dialog.password = jv.TextInput.create(0, 0, 180, 24, jv.create_dialog),
    jv.create_dialog.password.placeholder.text = "Password",
    jv.create_dialog.password.password = !0,
    jv.create_dialog.add(jv.create_dialog.password),
    jv.create_dialog.password.left(32),
    jv.create_dialog.password.bottom(58),
    jv.create_dialog.confirm = jv.TextInput.create(0, 0, 180, 24, jv.create_dialog),
    jv.create_dialog.confirm.placeholder.text = "Confirm password",
    jv.create_dialog.confirm.password = !0,
    jv.create_dialog.add(jv.create_dialog.confirm),
    jv.create_dialog.confirm.right(32),
    jv.create_dialog.confirm.bottom(58),
    jv.create_dialog.username.tab_next = jv.create_dialog.email,
    jv.create_dialog.email.tab_next = jv.create_dialog.password,
    jv.create_dialog.password.tab_next = jv.create_dialog.confirm,
    jv.create_dialog.confirm.tab_next = jv.create_dialog.username,
    jv.create_dialog.username.onSubmit = function() {
        jv.create_dialog.okay.on_click()
    }
    ,
    jv.create_dialog.password.onSubmit = jv.create_dialog.username.onSubmit,
    jv.create_dialog.email.onSubmit = jv.create_dialog.username.onSubmit,
    jv.create_dialog.confirm.onSubmit = jv.create_dialog.username.onSubmit,
    jv.create_dialog.okay = jv.Button.create(30, 32, 60, "Create", jv.create_dialog),
    jv.create_dialog.add(jv.create_dialog.okay),
    jv.create_dialog.okay.center(),
    jv.create_dialog.okay.bottom(20),
    jv.create_dialog.okay.on_click = function() {
        if ("" != jv.create_dialog.username.chars && "" != jv.create_dialog.password.chars) {
            if ("" == jv.create_dialog.email.chars)
                return jv.create_dialog.notice.text = "Email required.",
                jv.create_dialog.notice.w = 0,
                void jv.create_dialog.notice.center();
            if (jv.create_dialog.password.chars != jv.create_dialog.confirm.chars)
                return jv.create_dialog.notice.text = "Password and confirmation don't match.",
                jv.create_dialog.notice.w = 0,
                void jv.create_dialog.notice.center();
            jv.create_dialog.okay.enable(0),
            jv.create_dialog.login.enable(0),
            jv.create_dialog.notice.text = "",
            send({
                type: "login",
                user: jv.base64_encode(jv.create_dialog.username.chars.trim()),
                email: jv.base64_encode(jv.create_dialog.email.chars.trim()),
                pass: jv.base64_encode(jv.create_dialog.password.chars.trim())
            })
        }
    }
    ,
    jv.create_dialog.login = jv.Button.create(30, 32, 40, "Back", jv.create_dialog),
    jv.create_dialog.add(jv.create_dialog.login),
    jv.create_dialog.login.center(),
    jv.create_dialog.login.bottom(-40),
    jv.create_dialog.login.on_click = function() {
        jv.create_dialog.hide(),
        jv.login_dialog.show()
    }
    ;
    var p, u = jv.appearance_dialog = make_dialog(300, 300, "Character Appearance");
    u.frame = 0,
    u.foot = 1,
    u.sheet = jv.spritesheet(path + "data/body/b1.png" + vt, 18, 26),
    u.update_doll = function() {
        var e;
        e = u.hair_color.get_selected() ? u.hair_color.get_selected().block_color : u.hair_color_custom.block_color || 16711680;
        var t;
        t = u.clothes_color.get_selected() ? u.clothes_color.get_selected().block_color : u.clothes_color_custom.block_color || 16711680;
        var i;
        i = u.eye_color.get_selected() ? u.eye_color.get_selected().block_color : u.eye_color_custom.block_color || 255,
        u.sheet = build_doll(u.body.value, u.clothes.value, t, u.hair.value, e, i),
        u.locked.visible = 0,
        u.doll_left.alpha = 1,
        u.doll_back.alpha = 1,
        u.doll_face.alpha = 1,
        u.apply.enable(1),
        jv.lock_body.indexOf(u.body.value) === -1 && jv.lock_hair.indexOf(u.hair.value) === -1 && jv.lock_clothes.indexOf(u.clothes.value) === -1 || (jv.premium || (u.doll_left.alpha = .7,
        u.doll_back.alpha = .7,
        u.doll_face.alpha = .7,
        u.apply.enable(0)),
        u.locked.visible = 1)
    }
    ,
    u.on_open = function() {
        var e = this;
        e.body.choose(myself.body),
        e.hair.choose(myself.hair),
        e.clothes.choose(myself.clothes),
        e.hair_color.choose(myself.hair_color) || (e.hair_color.unselect_all(),
        e.hair_color_custom.select(myself.hair_color)),
        e.clothes_color.choose(myself.clothes_color) || (e.clothes_color.unselect_all(),
        e.clothes_color_custom.select(myself.clothes_color)),
        e.eye_color.choose(myself.eye_color) || (e.eye_color.unselect_all(),
        e.eye_color_custom.select(myself.eye_color)),
        jv.premium ? (e.special_color_custom.select(myself.title_color),
        e.hair_color_custom.set_lock(0),
        e.clothes_color_custom.set_lock(0),
        e.special_color_custom.set_lock(0),
        e.eye_color_custom.set_lock(0)) : (e.hair_color_custom.set_lock(1),
        e.clothes_color_custom.set_lock(1),
        e.special_color_custom.set_lock(1),
        e.eye_color_custom.set_lock(1)),
        e.doll_left || (p = e.doll_left = make_sprite(e.sheet[0][3]),
        p.top(30),
        p.left(25),
        p.scale.x = 2,
        p.scale.y = 2,
        p = e.doll_face = make_sprite(e.sheet[0][2]),
        p.top(30),
        p.left(70),
        p.scale.x = 2,
        p.scale.y = 2,
        p = e.doll_back = make_sprite(e.sheet[0][0]),
        p.top(30),
        p.left(115),
        p.scale.x = 2,
        p.scale.y = 2,
        p = e.locked = make_label("-supporter style-"),
        p.alpha = .3,
        p.top(78),
        p.left(37),
        p.visible = 0),
        e.update_doll(),
        e.animate = setInterval(function() {
            e.visible || clearInterval(e.animate),
            e.frame += e.foot,
            2 != e.frame && 0 != e.frame || (e.foot = -e.foot),
            e.doll_left.texture = e.sheet[e.frame][3],
            e.doll_face.texture = e.sheet[e.frame][2],
            e.doll_back.texture = e.sheet[e.frame][0]
        }, 200)
    }
    ,
    p = make_label("Choose Body"),
    p.top(32),
    p.left(180),
    p = u.body = make_range(["1", "2", "3", "4", "5", "6", "7", "8", "9"]),
    p.top(50),
    p.left(185),
    p.on_change = function() {
        u.update_doll()
    }
    ,
    p = make_label("Hair Style"),
    p.top(96),
    p.left(49),
    p = u.hair = make_range(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"]),
    p.top(120),
    p.left(40),
    p.on_change = function() {
        u.update_doll()
    }
    ,
    p = make_label("Hair Color"),
    p.top(96),
    p.left(175),
    p = u.hair_color = make_option(6504471, "hair_color", {
        selected: 1
    }),
    p.top(120),
    p.left(150),
    p = make_option(2960169, "hair_color"),
    p.top(120),
    p.left(180),
    p = make_option(16772694, "hair_color"),
    p.top(120),
    p.left(210),
    p.on_change = function() {
        u.hair_color_custom.unselect(),
        u.update_doll()
    }
    ,
    p = u.hair_color_custom = make_color_picker(),
    p.top(120),
    p.left(240),
    p.low = 40,
    p.on_change = function() {
        u.hair_color.unselect_all(),
        u.update_doll()
    }
    ,
    p = make_label("Clothing Style"),
    p.top(160),
    p.left(38),
    p = u.clothes = make_range(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]),
    p.top(184),
    p.left(40),
    p.on_change = function() {
        u.update_doll()
    }
    ,
    p = make_label("Clothing Color"),
    p.top(160),
    p.left(165),
    p = u.clothes_color = make_option(14540253, "clothes_color", {
        selected: 1
    }),
    p.top(184),
    p.left(150),
    p = make_option(4958277, "clothes_color"),
    p.top(184),
    p.left(180),
    p = make_option(7059967, "clothes_color"),
    p.top(184),
    p.left(210),
    p.on_change = function() {
        u.clothes_color_custom.unselect(),
        u.update_doll()
    }
    ,
    p = u.clothes_color_custom = make_color_picker(),
    p.top(184),
    p.left(240),
    p.low = 30,
    p.on_change = function() {
        u.clothes_color.unselect_all(),
        u.update_doll()
    }
    ,
    p = make_label("Eye Color"),
    p.top(224),
    p.left(46),
    p = u.eye_color = make_option(9682175, "eye_color", {
        selected: 1
    }),
    p.top(248),
    p.left(20),
    p = make_option(11700288, "eye_color"),
    p.top(248),
    p.left(50),
    p = make_option(8843904, "eye_color"),
    p.top(248),
    p.left(80),
    p.on_change = function() {
        u.eye_color_custom.unselect(),
        u.update_doll()
    }
    ,
    p = u.eye_color_custom = make_color_picker(),
    p.top(248),
    p.left(110),
    p.low = 120,
    p.on_change = function() {
        u.eye_color.unselect_all(),
        u.update_doll()
    }
    ,
    p = make_label("Name Color"),
    p.top(224),
    p.left(151),
    p = u.special_color_custom = make_color_picker(),
    p.top(248),
    p.left(174),
    p.low = 100,
    p = u.apply = make_button("Apply"),
    p.bottom(12),
    p.right(12),
    p.on_click = function() {
        var e;
        e = u.hair_color.get_selected() ? u.hair_color.get_selected().block_color : u.hair_color_custom.block_color || 16711680;
        var t;
        t = u.clothes_color.get_selected() ? u.clothes_color.get_selected().block_color : u.clothes_color_custom.block_color || 16711680;
        var i;
        i = u.eye_color.get_selected() ? u.eye_color.get_selected().block_color : u.eye_color_custom.block_color || 255,
        send({
            type: "c",
            r: "ap",
            c: u.clothes.value,
            b: u.body.value,
            h: u.hair.value,
            cc: t,
            hc: e,
            ec: i,
            nc: u.special_color_custom.block_color || 16777215
        }),
        u.hide()
    }
    ,
    phone && (jv.app_exit = jv.Button.create(splash.width - 74, splash.height - 60, 40, "Exit", splash),
    jv.app_exit.alpha = .6,
    jv.app_exit.on_click = function() {
        navigator.app.exitApp()
    })
}
;
var heading_style = {
    font: "12px Verdana",
    fill: 15658734,
    lineJoin: "round",
    stroke: 4473924,
    strokeThickness: 4,
    align: "left"
}
  , label_style = {
    font: "11px Verdana",
    fill: 14540253,
    lineJoin: "round",
    stroke: 3355443,
    strokeThickness: 3,
    align: "left"
}
  , plain_style = {
    font: "10px Verdana",
    fill: 16777215,
    lineJoin: "round",
    stroke: 4473924,
    strokeThickness: 1,
    align: "left"
}
  , make_dialog = function(e, t, i, o) {
    o || (o = {}),
    o.parent || (o.parent = ui_container);
    var n = jv.Dialog.create(e, t, o.parent);
    return i && (n.heading = jv.text(i, heading_style),
    n.add(n.heading),
    n.heading.center(),
    n.heading.top(8)),
    o.modal && (n.modal = 1),
    o.no_close || (n.close = jv.Button.create(30, 32, 24, "X", n),
    n.add(n.close),
    n.close.right(8),
    n.close.top(8),
    n.close.on_click = function() {
        n.visible = !1
    }
    ),
    n
}
  , make_button = function(e, t) {
    t || (t = {}),
    t.parent || (t.parent = jv.dialog_construction || ui_container);
    var i = jv.Button.create(0, 0, t.width || Math.max(24, 7 * e.length + 14), e, t.parent);
    return t.parent.add(i),
    i.center(),
    i.middle(),
    i
}
  , make_option = function(e, t, i) {
    i || (i = {}),
    i.parent || (i.parent = jv.dialog_construction || ui_container);
    var o = jv.OptionButton.create(0, 0, i.width || Math.max(24, 7 * (e.length || 0) + 7), e, t, i.parent);
    return i.parent.add(o),
    o.center(),
    o.middle(),
    i.selected && o.select(),
    o
}
  , make_color_picker = function(e) {
    e || (e = {}),
    e.parent || (e.parent = jv.dialog_construction || ui_container);
    var t = jv.ColorPicker.create(0, 0, e.parent);
    return e.parent.add(t),
    t.center(),
    t.middle(),
    t
}
  , make_label = function(e, t) {
    t || (t = {}),
    t.parent || (t.parent = jv.dialog_construction || ui_container);
    var i = jv.text(e || "Label", t.style || label_style);
    return t.parent.add(i),
    i.center(),
    i.middle(),
    i
}
  , make_text_field = function(e) {
    e || (e = {}),
    e.parent || (e.parent = jv.dialog_construction || ui_container);
    var t = jv.TextInput.create(0, 0, 120, 24, e.parent);
    return e.placeholder && (t.email.placeholder.text = e.placeholder),
    e.parent.add(t),
    t.center(),
    t.middle(),
    t.on_submit = function(e) {
        t.onSubmit(e)
    }
    ,
    t
}
  , make_sprite = function(e, t) {
    t || (t = {}),
    t.parent || (t.parent = jv.dialog_construction || ui_container);
    var i = jv.sprite(e);
    return t.parent.add(i),
    i.center(),
    i.middle(),
    i
}
  , make_range = function(e, t) {
    t || (t = {}),
    t.parent || (t.parent = jv.dialog_construction || ui_container);
    var i = new PIXI.Container;
    i.add = function(e) {
        this.addChild(e),
        e.w = e.w || e.width,
        e.h = e.h || e.height;
        var t = function() {};
        e.center = t,
        e.middle = t,
        e.left = t,
        e.right = t,
        e.top = t,
        e.bottom = t
    }
    ,
    i.list = e,
    i.index = 0,
    i.label = make_label(e[0], {
        style: plain_style,
        parent: i
    }),
    i.label.x = 32,
    i.label.y = 8,
    i.less = make_button("<", {
        parent: i
    }),
    i.less.on_click = function() {
        this.parent.index > 0 ? this.parent.index-- : this.parent.index = this.parent.list.length - 1,
        this.parent.label.text = this.parent.list[this.parent.index],
        this.parent.value = isNaN(Number(this.parent.label.text)) ? this.parent.label.text : Number(this.parent.label.text),
        this.parent.on_change && this.parent.on_change()
    }
    ,
    i.more = make_button(">", {
        parent: i
    }),
    i.more.on_click = function() {
        this.parent.index >= this.parent.list.length - 1 ? this.parent.index = 0 : this.parent.index++,
        this.parent.label.text = this.parent.list[this.parent.index],
        this.parent.value = isNaN(Number(this.parent.label.text)) ? this.parent.label.text : Number(this.parent.label.text),
        this.parent.on_change && this.parent.on_change()
    }
    ,
    i.value = isNaN(Number(i.label.text)) ? i.label.text : Number(i.label.text),
    i.choose = function(e) {
        var t;
        for (t in this.list)
            if (this.list[t] == String(e))
                return this.index = t,
                this.label.text = this.list[this.index],
                this.value = isNaN(Number(this.label.text)) ? this.label.text : Number(this.label.text),
                1;
        return 0
    }
    ;
    var o, n = 0;
    for (o in e)
        e[o].length > n && (n = e[o].length);
    return i.more.x = 40 + 6 * n,
    t.parent.add(i),
    i.center(),
    i.middle(),
    i
};
jv.Button = {
    create: function(e, t, i, o, n, a) {
        var r = jv.sprite();
        return n || (n = ui_container),
        r.interactive = !0,
        r.h = a || 26,
        r.w = i,
        r.hitArea = new PIXI.Rectangle(0,0,i,r.h),
        r.do_click = function() {
            this.is_enabled && (this.on_up(),
            this.silent || playSound("click"),
            this.on_click && this.on_click())
        }
        ,
        r.on_up = function() {
            this.is_enabled && (this.is_pressed = 0,
            this.clear_item(),
            this.draw_item())
        }
        ,
        r.on_down = function() {
            this.is_enabled && (this.clear_item(),
            this.draw_item(1),
            this.is_pressed = 1,
            this.on_press && this.on_press())
        }
        ,
        r.buttonMode = !0,
        r.on("mouseup", r.do_click),
        r.on("mouseupoutside", r.on_up),
        r.on("touchend", r.do_click),
        r.on("touchendoutside", r.on_up),
        r.on("mousedown", r.on_down),
        r.on("touchstart", r.on_down),
        r.down = 0,
        r.is_pressed = 0,
        r.is_enabled = 1,
        r.x = e,
        r.y = t,
        r.z = -10,
        r.title = jv.text(o, {
            font: "9px Verdana",
            fill: [13421772, 16777215, 11184810],
            lineJoin: "round",
            dropShadow: !0,
            dropShadowColor: jv.color_base,
            dropShadowDistance: 2,
            dropShadowAngle: 1
        }),
        r.title.x = i / 2 - r.title.width / 2 + 1,
        r.title.y = r.h / 2 - r.title.height / 2 + 1,
        r.title.oy = r.title.y,
        r.set_text = function(e) {
            this.title.text = e,
            this.title.x = this.w / 2 - this.title.width / 2 + 1,
            this.title.y = this.h / 2 - this.title.height / 2 + 1,
            this.title.oy = this.title.y
        }
        ,
        r.gfx = new PIXI.Graphics,
        r.enable = function(e) {
            this.is_enabled = e,
            this.buttonMode = e,
            this.clear_item(),
            e ? (this.title.style = {
                font: "9px Verdana",
                fill: [13421772, 16777215, 11184810],
                lineJoin: "round",
                dropShadow: !0,
                dropShadowColor: jv.color_base,
                dropShadowDistance: 2,
                dropShadowAngle: 1
            },
            this.draw_item()) : (this.title.style = {
                font: "9px Verdana",
                fill: jv.color_dark,
                lineJoin: "round",
                dropShadow: !1
            },
            this.draw_item(1))
        }
        ,
        r.clear_item = function() {
            this.gfx.clear()
        }
        ,
        r.draw_item = function(e) {
            this.gfx.cacheAsBitmap = !1,
            this.down = e || 0,
            this.gfx.beginFill(jv.color_dark),
            this.gfx.drawRect(0, 0, i, 2),
            this.gfx.drawRect(0, 0, 2, this.h),
            this.gfx.drawRect(0, this.h - 2, i, 2),
            this.gfx.drawRect(i - 2, 0, 2, this.h),
            this.gfx.beginFill(jv.color_light),
            e ? (this.gfx.drawRect(2, 2, i - 4, this.h - 4),
            this.is_enabled && (this.gfx.beginFill(jv.color_dark, .6),
            this.gfx.drawRect(2, 2, i - 4, 2),
            this.gfx.drawRect(i - 4, 2, 2, this.h - 6),
            this.gfx.beginFill(16777215, .2),
            this.gfx.drawRect(2, this.h - 4, i - 4, 2),
            this.gfx.drawRect(2, 4, 2, this.h - 6),
            this.gfx.endFill(),
            this.title.y = this.title.oy + 1)) : (this.gfx.drawRect(2, 2, i - 4, this.h - 4),
            this.gfx.beginFill(16777215, .2),
            this.gfx.drawRect(2, 2, i - 4, 2),
            this.gfx.drawRect(i - 4, 2, 2, this.h - 6),
            this.gfx.beginFill(jv.color_dark, .6),
            this.gfx.drawRect(2, this.h - 4, i - 4, 2),
            this.gfx.drawRect(2, 4, 2, this.h - 6),
            this.gfx.endFill(),
            this.title.y = this.title.oy),
            this.gfx.cacheAsBitmap = !0
        }
        ,
        r.draw_item(),
        r.addChild(r.gfx),
        r.addChild(r.title),
        n.addChild(r),
        r
    }
},
jv.OptionButton = {
    create: function(e, t, i, o, n, a, r) {
        var s = jv.sprite();
        return a || (a = ui_container),
        s.interactive = !0,
        s.h = r || 24,
        s.w = i,
        s.selected = 0,
        s.series = n,
        jv.option_container || (jv.option_container = []),
        jv.option_container[n] || (jv.option_container[n] = []),
        jv.option_container[n].push(s),
        s.hitArea = new PIXI.Rectangle(0,0,i,s.h),
        s.do_click = function() {
            if (this.is_enabled) {
                this.on_up(),
                this.silent || playSound("click"),
                this.on_click && this.on_click();
                var e, t;
                for (e in jv.option_container[this.series])
                    jv.option_container[this.series][e].selected = 0,
                    jv.option_container[this.series][e].draw_item(),
                    !t && jv.option_container[this.series][e].on_change && (t = jv.option_container[this.series][e].on_change);
                this.selected = 1,
                this.draw_item(),
                t && t()
            }
        }
        ,
        s.get_selected = function() {
            var e;
            for (e in jv.option_container[this.series])
                if (jv.option_container[this.series][e].selected)
                    return jv.option_container[this.series][e]
        }
        ,
        s.unselect_all = function() {
            var e;
            for (e in jv.option_container[this.series])
                jv.option_container[this.series][e].selected = 0,
                jv.option_container[this.series][e].draw_item()
        }
        ,
        s.choose = function(e) {
            var t;
            for (t in jv.option_container[this.series])
                if (jv.option_container[this.series][t].block_color == e || jv.option_container[this.series][t].label && jv.option_container[this.series][t].label.text == String(e))
                    return jv.option_container[this.series][t].select(),
                    1;
            return 0
        }
        ,
        s.select = function(e) {
            this.unselect_all(),
            this.selected = 1,
            this.draw_item()
        }
        ,
        s.on_up = function() {
            this.is_enabled && (this.is_pressed = 0,
            this.clear_item(),
            this.draw_item())
        }
        ,
        s.on_down = function() {
            this.is_enabled && (this.clear_item(),
            this.draw_item(1),
            this.is_pressed = 1,
            this.on_press && this.on_press())
        }
        ,
        s.buttonMode = !0,
        s.on("mouseup", s.do_click),
        s.on("mouseupoutside", s.on_up),
        s.on("touchend", s.do_click),
        s.on("touchendoutside", s.on_up),
        s.on("mousedown", s.on_down),
        s.on("touchstart", s.on_down),
        s.down = 0,
        s.is_pressed = 0,
        s.is_enabled = 1,
        s.x = e,
        s.y = t,
        s.z = -10,
        "number" == typeof o ? s.block_color = o : (s.label = jv.text(o, {
            font: "9px Verdana",
            fill: 16777215,
            lineJoin: "round",
            dropShadow: !0,
            dropShadowColor: jv.color_base,
            dropShadowDistance: 2,
            dropShadowAngle: 1
        }),
        s.label.x = i / 2 - s.label.width / 2 + 1,
        s.label.y = s.h / 2 - s.label.height / 2 + 1,
        s.label.oy = s.label.y,
        s.set_text = function(e) {
            this.label.text = e,
            this.label.x = this.w / 2 - this.label.width / 2 + 1,
            this.label.y = this.h / 2 - this.label.height / 2 + 1,
            this.label.oy = this.label.y
        }
        ),
        s.gfx = new PIXI.Graphics,
        s.enable = function(e) {
            this.is_enabled = e,
            this.buttonMode = e,
            this.clear_item(),
            e ? (this.label.style = {
                font: "9px Verdana",
                fill: 16777215,
                lineJoin: "round",
                dropShadow: !0,
                dropShadowColor: jv.color_base,
                dropShadowDistance: 2,
                dropShadowAngle: 1
            },
            this.draw_item()) : (this.label.style = {
                font: "9px Verdana",
                fill: jv.color_base,
                lineJoin: "round",
                dropShadow: !1
            },
            this.draw_item(1))
        }
        ,
        s.clear_item = function() {
            this.gfx.clear()
        }
        ,
        s.draw_item = function(e) {
            this.clear_item(),
            this.down = e || 0,
            this.selected ? (this.gfx.lineStyle(2, 2236962),
            this.gfx.drawRect(3, 3, this.w - 6, this.h - 6)) : (this.gfx.lineStyle(2, 5592405, .3),
            this.gfx.drawRect(3, 3, this.w - 6, this.h - 6)),
            this.block_color && (this.gfx.lineStyle(0, 0),
            this.gfx.beginFill(this.block_color, 1),
            this.gfx.drawRect(4, 4, this.w - 8, this.h - 8),
            this.gfx.endFill())
        }
        ,
        s.draw_item(),
        s.addChild(s.gfx),
        s.label && s.addChild(s.label),
        a.addChild(s),
        s
    }
},
jv.ColorPicker = {
    create: function(e, t, i) {
        var o = jv.sprite();
        if (i || (i = ui_container),
        o.interactive = !0,
        o.h = 24,
        o.w = 24,
        o.hitArea = new PIXI.Rectangle(0,0,o.w,o.h),
        o.do_click = function(e) {
            this.silent || playSound("click"),
            this.is_enabled && !this.locked && (this.on_up(),
            this.on_click && this.on_click(),
            this.active ? (touchx = e.data.getLocalPosition(this.picker).x,
            touchy = e.data.getLocalPosition(this.picker).y,
            touchx > 490 && (touchx = 490),
            this.block_color = this.get_color(Math.floor(touchx), Math.floor(touchy)),
            this.low && (this.block_color = color_limit(this.block_color, this.low)),
            this.active = 0,
            this.picker.width = 16,
            this.picker.height = 5,
            this.picker.x = 4,
            this.picker.y = 16,
            this.selected = 1,
            this.on_change && this.on_change()) : (this.active = 1,
            this.picker.width = 128,
            this.picker.height = 128,
            this.picker.x = -64,
            this.picker.y = -64,
            this.picker.visible = 1,
            jv.bringToFront(this)),
            this.draw_item())
        }
        ,
        o.set_lock = function(e) {
            this.locked = e || 0,
            this.draw_item()
        }
        ,
        o.unselect = function() {
            this.active = 0,
            this.picker.width = 16,
            this.picker.height = 16,
            this.picker.x = 4,
            this.picker.y = 5,
            this.selected = 0,
            delete this.block_color,
            this.draw_item()
        }
        ,
        o.select = function(e, t) {
            this.block_color = e,
            this.picker.width = 16,
            this.picker.height = 5,
            this.picker.x = 4,
            this.picker.y = 16,
            this.active = 0,
            this.selected = 1,
            t && this.on_change && this.on_change(),
            this.draw_item()
        }
        ,
        o.on_up = function() {
            this.is_enabled && (this.is_pressed = 0,
            this.clear_item(),
            this.draw_item())
        }
        ,
        o.on_down = function() {
            this.is_enabled && (this.clear_item(),
            this.draw_item(1),
            this.is_pressed = 1,
            this.on_press && this.on_press())
        }
        ,
        o.buttonMode = !0,
        o.on("mouseup", o.do_click),
        o.on("mouseupoutside", o.on_up),
        o.on("touchend", o.do_click),
        o.on("touchendoutside", o.on_up),
        o.on("mousedown", o.on_down),
        o.on("touchstart", o.on_down),
        o.down = 0,
        o.is_pressed = 0,
        o.is_enabled = 1,
        o.x = e,
        o.y = t,
        o.z = -10,
        o.lock = jv.sprite(items[9][55]),
        o.lock.visible = 0,
        o.lock.alpha = .8,
        o.lock.scale.x = .5,
        o.lock.scale.y = .5,
        o.lock.x = 4,
        o.lock.y = 4,
        o.picker = jv.sprite(jv.color_picker.texture),
        o.picker.interactive = !0,
        o.picker.buttonMode = !0,
        o.picker.x = 4,
        o.picker.y = 5,
        o.picker.width = 16,
        o.picker.height = 16,
        o.picker.alpha = 1,
        o.active = 0,
        o.gfx = new PIXI.Graphics,
        4 == jv.pixiver) {
            var n = new PIXI.Sprite(jv.color_picker.texture);
            o.pixels = jv.renderer.extract.pixels(n)
        } else {
            var a = new PIXI.RenderTexture(jv.renderer,128,128,PIXI.SCALE_MODES.NEAREST,1)
              , n = new PIXI.Sprite(jv.color_picker.texture)
              , r = new PIXI.Container;
            r.addChild(n),
            a.render(r),
            o.pixels = a.getPixels()
        }
        return o.get_color = function(e, t) {
            var i = this.pixels[512 * t + 4 * e + 0]
              , o = this.pixels[512 * t + 4 * e + 1]
              , n = this.pixels[512 * t + 4 * e + 2]
              , a = i;
            return a = (a << 8) + o,
            a = (a << 8) + n
        }
        ,
        o.enable = function(e) {
            this.is_enabled = e,
            this.buttonMode = e,
            this.clear_item(),
            e ? this.draw_item() : this.draw_item(1)
        }
        ,
        o.clear_item = function() {
            this.gfx.clear()
        }
        ,
        o.draw_item = function() {
            this.clear_item(),
            this.lock.visible = this.locked,
            this.selected ? this.gfx.lineStyle(2, 2236962) : this.gfx.lineStyle(2, 5592405, .4),
            this.gfx.drawRect(3, 3, this.w - 6, this.h - 6),
            this.block_color && (this.gfx.lineStyle(0, 0),
            this.gfx.beginFill(this.block_color, 1),
            this.gfx.drawRect(4, 4, this.w - 8, this.h - 8),
            this.gfx.endFill())
        }
        ,
        o.draw_item(),
        o.addChild(o.gfx),
        o.addChild(o.picker),
        o.addChild(o.lock),
        i.addChild(o),
        o
    }
},
jv.AbilityButton = {
    create: function(e, t, i, o) {
        var n = jv.sprite();
        return o || (o = ui_container),
        n.interactive = !0,
        n.h = 42,
        n.w = 42,
        n.last_click = 0,
        n.cooldown = 5e3,
        n.spr = i,
        n.ready = 1,
        n.progress = 1,
        n.draw_timer = null,
        n.hitArea = new PIXI.Rectangle(0,0,n.w,n.h),
        n.do_update = function() {
            this.progress = (Date.now() - this.last_click) / this.cooldown,
            this.cdcover.scale.y = Math.max(this.progress, 0),
            this.cdcover.y = this.h - 2 - this.progress * (this.h - 2),
            this.progress >= 1 && (clearInterval(this.draw_timer),
            this.ready = 1,
            this.icon.tint = 16777215,
            this.cdcover.visible = 0,
            this.cdcover.scale.y = .01)
        }
        ,
        n.activate = function() {
            this.clear_item(),
            this.draw_item(),
            this.last_click = Date.now(),
            this.draw_timer = setInterval(this.do_update.bind(this), 100),
            this.ready = 0,
            this.cdcover.visible = 1,
            this.icon.tint = 4473924
        }
        ,
        n.do_click = function() {
            this.is_enabled && this.ready && (this.on_up(),
            this.silent || playSound("click"),
            this.on_click && this.on_click(),
            send({
                type: "c",
                r: "ab",
                a: this.ind
            }))
        }
        ,
        n.on_up = function() {
            this.is_enabled && this.ready && (this.is_pressed = 0,
            this.clear_item(),
            this.draw_item())
        }
        ,
        n.on_down = function() {
            this.is_enabled && this.ready && (this.clear_item(),
            this.draw_item(1),
            this.is_pressed = 1,
            this.on_press && this.on_press())
        }
        ,
        n.buttonMode = !0,
        n.on("mouseup", n.do_click),
        n.on("mouseupoutside", n.on_up),
        n.on("touchend", n.do_click),
        n.on("touchendoutside", n.on_up),
        n.on("mousedown", n.on_down),
        n.on("touchstart", n.on_down),
        n.down = 0,
        n.is_pressed = 0,
        n.is_enabled = 1,
        n.x = e,
        n.y = t,
        n.z = -10,
        n.icon = jv.sprite(items[i % 16][Math.floor(i / 16)]),
        n.icon.x = n.w / 2 - n.icon.width / 2 + 0,
        n.icon.y = n.h / 2 - n.icon.height / 2 + 0,
        n.icon.oy = n.icon.y,
        n.set_text = function(e) {}
        ,
        n.gfx = new PIXI.Graphics,
        n.cdcover = new PIXI.Graphics,
        n.enable = function(e) {
            this.is_enabled = e,
            this.buttonMode = e,
            this.clear_item(),
            e ? this.draw_item() : this.draw_item(1)
        }
        ,
        n.clear_item = function() {
            this.gfx.clear()
        }
        ,
        n.draw_item = function(e) {
            this.down = e || 0,
            this.gfx.beginFill(3355443, 1),
            this.gfx.drawRect(0, 0, 2, this.h),
            this.gfx.drawRect(0, 0, this.w, 2),
            this.gfx.drawRect(0, this.h - 2, this.w, 2),
            this.gfx.drawRect(this.w - 2, 0, 2, this.h),
            e ? (this.gfx.beginFill(65535, .6),
            this.gfx.drawRect(2, 2, this.w - 4, this.h - 4),
            this.gfx.endFill(),
            this.icon.y = this.icon.oy) : (this.gfx.beginFill(0, .8),
            this.gfx.drawRect(2, 2, this.w - 4, this.h - 4),
            this.gfx.endFill(),
            this.icon.y = this.icon.oy),
            this.gfx.alpha = .6
        }
        ,
        n.cdcover.beginFill(65535, .6),
        n.cdcover.drawRect(2, 2, n.w - 4, n.h - 4),
        n.cdcover.endFill(),
        n.cdcover.visible = 0,
        n.draw_item(),
        n.addChild(n.gfx),
        n.addChild(n.cdcover),
        n.addChild(n.icon),
        o.addChild(n),
        n
    }
},
jv.Slider = {
    create: function(e, t) {
        var i = jv.sprite();
        return t || (t = ui_container),
        i.interactive = !0,
        i.h = 20,
        i.w = e,
        i.x = 0,
        i.y = 0,
        i.buttonMode = !0,
        i.on_move = function(e) {
            if (this.drag) {
                var t = e.data.global.x - this.x - this.parent.x - this.knob.w / 2;
                this.parent.parent && (t -= this.parent.parent.x),
                t < 0 ? t = 0 : t > this.w - this.knob.w && (t = this.w - this.knob.w),
                this.knob.x = t,
                this.percent = Math.round(this.knob.x / (this.w - this.knob.w) * 100),
                this.onChange && this.onChange()
            }
        }
        ,
        i.on_up = function() {
            this.drag = 0
        }
        ,
        i.on_down = function() {
            this.drag = 1
        }
        ,
        i.on("mouseup", i.on_up),
        i.on("mouseupoutside", i.on_up),
        i.on("touchend", i.on_up),
        i.on("touchendoutside", i.on_up),
        i.on("mousedown", i.on_down),
        i.on("touchstart", i.on_down),
        i.on("mousemove", i.on_move),
        i.on("touchmove", i.on_move),
        i.percent = 50,
        i.gfx = new PIXI.Graphics,
        i.knob = new PIXI.Graphics,
        i.knob.w = 12,
        i.set_percent = function(e) {
            e < 0 ? e = 0 : e > 100 && (e = 100),
            this.percent = e,
            this.knob.x = e / 100 * (this.w - this.knob.w)
        }
        ,
        i.set_percent(50),
        i.draw_item = function() {
            this.gfx.beginFill(jv.color_dark),
            this.gfx.drawRect(2, this.h / 2, this.w - 4, 3),
            this.gfx.endFill(),
            this.knob.beginFill(jv.color_dark, 0),
            this.knob.drawRect(-8, -8, this.knob.w + 16, this.h + 16),
            this.knob.endFill(),
            this.knob.beginFill(jv.color_dark),
            this.knob.drawRect(0, 0, this.knob.w, this.h),
            this.knob.beginFill(jv.color_bright),
            this.knob.drawRect(2, 2, this.knob.w - 4, this.h - 4),
            this.knob.beginFill(jv.color_medium),
            this.knob.drawRect(2, 4, this.knob.w - 4, this.h - 6),
            this.knob.endFill()
        }
        ,
        i.draw_item(),
        i.addChild(i.gfx),
        i.addChild(i.knob),
        t.addChild(i),
        i
    }
},
jv.Dialog = {
    list: [],
    create: function(e, t, i) {
        var o = jv.sprite();
        return o.w = e,
        o.h = t,
        i || (i = ui_container),
        jv.theme(o, e, t, .9),
        jv.Dialog.list.push(o),
        jv.dialog_construction = o,
        o.visible = !1,
        o.show = function() {
            var e;
            for (e in jv.Dialog.list) {
                if (jv.Dialog.list[e].visible && jv.Dialog.list[e].modal)
                    return;
                jv.Dialog.list[e].visible = !1
            }
            this.visible = !0,
            this.on_open && this.on_open()
        }
        ,
        o.hide = function() {
            this.visible = !1
        }
        ,
        o.center = function() {
            jv.center(this)
        }
        ,
        o.middle = function() {
            jv.middle(this)
        }
        ,
        o.left = function(e) {
            jv.left(this, e)
        }
        ,
        o.right = function(e) {
            jv.right(this, e)
        }
        ,
        o.top = function(e) {
            jv.top(this, e)
        }
        ,
        o.bottom = function(e) {
            jv.bottom(this, e)
        }
        ,
        o.add = function(e) {
            e.parent !== this && this.addChild(e),
            e.w = e.w || e.width,
            e.h = e.h || e.height,
            e.center = this.center,
            e.middle = this.middle,
            e.left = this.left,
            e.right = this.right,
            e.top = this.top,
            e.bottom = this.bottom
        }
        ,
        i.addChild(o),
        o.center(),
        o.middle(),
        o
    }
},
jv.center = function(e, t) {
    t || (t = e.parent || ui_container),
    e.x = (t.w || t.width) / 2 - (e.w || e.width) / 2
}
,
jv.middle = function(e, t) {
    t || (t = e.parent || ui_container),
    e.y = (t.h || t.height) / 2 - (e.h || e.height) / 2
}
,
jv.left = function(e, t, i) {
    i || (i = e.parent || ui_container),
    e.x = t
}
,
jv.right = function(e, t, i) {
    i || (i = e.parent || ui_container),
    e.x = (i.w || i.width) - (e.w || e.width) - t
}
,
jv.top = function(e, t, i) {
    i || (i = e.parent || ui_container),
    e.y = t
}
,
jv.bottom = function(e, t, i) {
    i || (i = e.parent || ui_container),
    e.y = (i.h || i.height) - (e.h || e.height) - t
}
,
jv.theme = function(e, t, i, o) {
    e.background = new PIXI.Graphics,
    e.background.beginFill(jv.color_base, o || 1),
    e.background.drawRect(0, 0, t, i);
    var n, a, r, s;
    for (n = 0; n < t; n += 16)
        for (a = 0; a < i; a += 16)
            Math.random() * i <= a && (2 * Math.random() > 1.7 ? e.background.beginFill(jv.color_bright, .12) : e.background.beginFill(jv.color_dark, .4),
            s = 16,
            r = 16,
            n + s > t && (s = t - n),
            a + r > i && (r = i - a),
            e.background.drawRect(n, a, s, r));
    e.frame = new PIXI.Graphics,
    e.frame.beginFill(16777215, .4),
    e.frame.drawRect(0, 0, t - 4, 4),
    e.frame.beginFill(jv.color_dark, .5),
    e.frame.drawRect(0, 0, 4, i - 4),
    e.frame.beginFill(16777215, .2),
    e.frame.drawRect(t - 4, 0, 4, i),
    e.frame.beginFill(jv.color_dark, .6),
    e.frame.drawRect(0, i - 4, t, 4),
    e.frame.lineStyle(2, jv.color_dark),
    e.frame.drawRect(1, 1, t - 2, i - 2),
    e.background.cacheAsBitmap = !0,
    e.frame.cacheAsBitmap = !0,
    e.addChild(e.background),
    e.addChild(e.frame)
}
;
var init_ui = function() {
    jv.upgrade_sprite = jv.sprite(items[13][Math.floor(237 / 16)]),
    jv.upgrade_sprite.x = 548,
    jv.upgrade_sprite.y = -5,
    jv.upgrade_sprite.alpha = .4,
    ui_container.addChild(jv.upgrade_sprite),
    jv.upgrade_number = 0,
    jv.upgrade_current = 0,
    jv.upgrade_timer = 0,
    jv.upgrade_counter = new PIXI.extras.BitmapText("",{
        font: "20px mapfont",
        align: "center"
    }),
    jv.upgrade_counter.interactive = !0,
    jv.upgrade_counter.buttonMode = !0,
    jv.upgrade_counter.on("mouseup", function() {
        send({
            type: "c",
            r: "up"
        }),
        jv.upgrade_dialog.show()
    }),
    jv.upgrade_counter.on("touchend", function() {
        send({
            type: "c",
            r: "up"
        }),
        jv.upgrade_dialog.show()
    }),
    jv.upgrade_counter.alpha = .7,
    jv.upgrade_counter.x = 502,
    jv.upgrade_counter.y = 3,
    ui_container.addChild(jv.upgrade_counter),
    jv.upgrade_add = new PIXI.extras.BitmapText("",{
        font: "20px mapfont",
        align: "right"
    }),
    jv.upgrade_add.x = 518,
    jv.upgrade_add.y = 24,
    jv.upgrade_add.alpha = 0,
    jv.add_number = 0,
    ui_container.addChild(jv.upgrade_add),
    jv.ver_text = jv.text("Ver. " + version, {
        font: "10px Verdana",
        fill: 12311995,
        lineJoin: "round",
        stroke: jv.color_dark,
        strokeThickness: 2,
        align: "right"
    }),
    jv.ver_text.x = 665,
    jv.ver_text.y = 390,
    splash.addChild(jv.ver_text),
    jv.map_title = new PIXI.extras.BitmapText("",{
        font: "24px mapfont",
        align: "center"
    }),
    jv.map_title.x = 170,
    jv.map_title.y = 318,
    jv.map_title.alpha = 0,
    ui_container.addChild(jv.map_title),
    dpad_back = jv.sprite(),
    dpad_back.x = 0,
    dpad_back.y = 294,
    jv.theme(dpad_back, 164, 122),
    ui_container.addChild(dpad_back),
    ph_dpad = jv.sprite(),
    ph_dpad.choose_dir = function(e) {
        if (!jv.chat_box.drag && (e || jv.mouseDown)) {
            var t = jv.mouse.x
              , i = jv.mouse.y;
            e && (t = touchx,
            i = touchy),
            t < this.x || t > this.x + this.width || i < this.y || i > this.y + this.height || (jv.glow.x = t,
            jv.glow.y = i,
            this.stop_move(),
            jv.glow.visible = 1,
            Math.abs(t - this.cx) > Math.abs(i - this.cy) ? t < this.cx ? keyLeft.isDown = 1 : keyRight.isDown = 1 : i < this.cy ? keyUp.isDown = 1 : keyDown.isDown = 1)
        }
    }
    ,
    ph_dpad.stop_move = function() {
        keyDown.isDown = 0,
        keyUp.isDown = 0,
        keyLeft.isDown = 0,
        keyRight.isDown = 0,
        jv.glow.visible = 0
    }
    ,
    ph_dpad.do_touch_move = function(e) {
        touchx = e.data.getLocalPosition(this.parent).x,
        touchy = e.data.getLocalPosition(this.parent).y,
        this.choose_dir(1)
    }
    ,
    ph_dpad.do_mouse_move = function(e) {
        this.choose_dir(0)
    }
    ,
    ph_dpad.interactive = !0,
    compass.x = 40,
    compass.y = 300,
    compass.scale.x = 2,
    compass.scale.y = 2,
    ph_dpad.x = 26,
    ph_dpad.y = 300,
    ph_dpad.width = 138,
    ph_dpad.height = 122,
    ph_dpad.cx = -1 + ph_dpad.x + ph_dpad.width / 2,
    ph_dpad.cy = -5 + ph_dpad.y + ph_dpad.height / 2,
    ph_dpad.alpha = 0,
    ph_dpad.on("mousedown", function() {
        jv.mouseDown = 1,
        ph_dpad.choose_dir()
    }),
    ph_dpad.on("touchstart", ph_dpad.do_touch_move),
    ph_dpad.on("mouseup", function() {
        jv.mouseDown = 0,
        this.stop_move()
    }),
    ph_dpad.on("mouseupoutside", function() {
        jv.mouseDown = 0,
        this.stop_move()
    }),
    ph_dpad.on("touchend", function() {
        this.stop_move()
    }),
    ph_dpad.on("touchendoutside", function() {
        this.stop_move()
    }),
    ph_dpad.on("touchmove", ph_dpad.do_touch_move),
    ph_dpad.on("mousemove", ph_dpad.do_mouse_move),
    compass2 = new PIXI.Sprite(compass.texture),
    compass2.x = 40,
    compass2.y = 300,
    compass2.scale.x = 2,
    compass2.scale.y = 2,
    compass2.alpha = .5,
    compass2.tint = 8947848,
    jv.glow = new PIXI.Graphics,
    jv.glow.beginFill(21845, .3),
    jv.glow.drawCircle(0, 0, 28),
    jv.glow.beginFill(26214, .6),
    jv.glow.drawCircle(0, 0, 20),
    jv.glow.beginFill(30583, .8),
    jv.glow.drawCircle(0, 0, 16),
    jv.glow.beginFill(34952, 1),
    jv.glow.drawCircle(0, 0, 12),
    jv.glow.beginFill(39321),
    jv.glow.drawCircle(0, 0, 10),
    jv.glow.beginFill(48059),
    jv.glow.drawCircle(0, 0, 8),
    jv.glow.beginFill(56797),
    jv.glow.drawCircle(0, 0, 6),
    jv.glow.beginFill(65535),
    jv.glow.drawCircle(0, 0, 4),
    jv.glow.endFill(),
    jv.glow.x = 37,
    jv.glow.y = 318,
    jv.glow.mask = compass,
    jv.glow.visible = 0,
    target_container = jv.scene(),
    master_container.addChild(target_container),
    player_container.x = 0,
    player_container.y = 0,
    master_container.addChild(player_container),
    target_container.addChildAt(target, 0),
    effect_container = jv.scene(),
    effect_container.x = 0,
    effect_container.y = 0,
    jv.add(master_container),
    hover_container = jv.scene(),
    inventory.x = jv.game_width - 160,
    inventory.y = 0,
    ui_container.addChild(inventory),
    ph_pickup = jv.Button.create(jv.game_width - 78, 332, 60, "Pickup", ui_container, 42),
    ph_pickup.title.style = {
        font: "12px Verdana",
        fill: 16777215,
        lineJoin: "round",
        dropShadow: !0,
        dropShadowColor: jv.color_base,
        dropShadowDistance: 2,
        dropShadowAngle: 1
    },
    ph_pickup.set_text("Pickup"),
    ph_pickup.on_press = function() {
        keyShift.press()
    }
    ,
    ph_action = jv.Button.create(jv.game_width - 144, 332, 60, "Action", ui_container, 42),
    ph_action.title.style = {
        font: "12px Verdana",
        fill: 16777215,
        lineJoin: "round",
        dropShadow: !0,
        dropShadowColor: jv.color_base,
        dropShadowDistance: 2,
        dropShadowAngle: 1
    },
    ph_action.set_text("Action"),
    ph_action.silent = 1,
    ph_action.on_click = function() {
        this.clear_item(),
        this.draw_item(),
        keySpace.isDown = 0
    }
    ,
    ph_action.on_press = function() {
        keySpace.isDown = 1
    }
    ,
    info_pane = jv.scene(),
    info_pane.x = jv.game_width - 160,
    info_pane.y = 265,
    info_pane.heading = jv.text("", {
        font: "10px Verdana",
        fill: jv.color_bright,
        lineJoin: "round",
        stroke: jv.color_dark,
        strokeThickness: 4,
        align: "left"
    }),
    info_pane.heading.x = 60,
    info_pane.heading.y = 0,
    info_pane.addChild(info_pane.heading),
    info_pane.sprite = jv.sprite(),
    info_pane.sprite.x = 16,
    info_pane.sprite.y = 4,
    info_pane.addChild(info_pane.sprite),
    info_pane.use = jv.Button.create(60, 21, 39, "Use", info_pane, 32),
    info_pane.use.on_click = function() {
        this.parent.obj && send(this.parent.obj.id ? {
            type: "c",
            r: "rp",
            id: this.parent.obj.id
        } : {
            type: "u",
            slot: this.parent.slot
        })
    }
    ,
    info_pane.drop = jv.Button.create(102, 21, 39, "Drop", info_pane, 32),
    info_pane.drop.on_click = function() {
        this.parent.obj && send({
            type: "d",
            slot: this.parent.slot,
            amt: drop_amt
        })
    }
    ,
    info_pane.use.visible = !1,
    info_pane.drop.visible = !1,
    info_pane.set_info = function(e) {
        if (me != -1) {
            if (this.obj = e,
            !e)
                return this.visible = !1,
                void (this.slot = void 0);
            this.visible = !0,
            "undefined" != typeof e.quantity ? (this.sprite.scale.x = 1,
            this.sprite.scale.y = 1,
            this.slot = e.slot + item_page * item_length,
            void 0 !== e.template && (this.template = e.template),
            e.quantity > 1 ? this.heading.text = e.title.text + "[" + e.quantity + "]" : this.heading.text = e.title.text,
            this.sprite.texture = e.texture,
            this.use.set_text("Use"),
            this.use.y = 21,
            this.use.visible = !0,
            this.drop.visible = !0) : ("" != e.tribe ? this.heading.text = e.name + " (" + e.level + ")\r\n" + e.tribe : "undefined" != typeof e.level ? this.heading.text = e.name + " (" + e.level + ")" : this.heading.text = e.name,
            e.monster_sprite ? this.sprite.texture = e.monster_sprite.texture : (e.title.visible = !1,
            this.sprite.texture = e.spr.texture,
            e.title.visible = !0),
            26 == e.spr.texture.height && 18 == e.spr.texture.width ? (this.sprite.scale.y = 2,
            this.sprite.scale.x = 2) : (this.sprite.scale.y = 32 / e.spr.texture.height,
            this.sprite.scale.x = this.sprite.scale.y),
            myself && myself == e ? this.use.visible = !1 : this.use.visible = !0,
            this.use.set_text("Info"),
            this.use.y = 32,
            this.drop.visible = !1,
            target.id = e.id,
            target.redraw(e.spr.width),
            target.x = e.spr.x + e.halfx,
            target.y = e.spr.y + e.spr.height - 2,
            send({
                type: "t",
                t: target.id
            }),
            target.id == me ? target.visible = !1 : target.visible = !0)
        }
    }
    ,
    ui_container.addChild(info_pane),
    build_pane = jv.scene(),
    build_pane.x = 16,
    build_pane.visible = !0,
    jv.init_dialogs(),
    master_container.addChild(hover_container),
    master_container.addChild(effect_container),
    map_fade = new PIXI.Graphics,
    map_fade.beginFill(0),
    map_fade.lineStyle(1, 0),
    map_fade.drawRect(0, 0, jv.game_width, jv.game_height),
    map_fade.endFill(),
    map_fade.alpha = 0,
    static_container = jv.scene(),
    jv.add(static_container),
    jv.add(map_fade),
    jv.add(ui_container),
    skill_status = jv.StatusBar.create("Exploration", 3381759),
    skill_status.set(0),
    skill_status.alpha = 0,
    skill_status.x = 278,
    skill_status.y = jv.game_height - 16,
    hp_status = jv.StatusBar.create("Health", 2271778),
    hp_status.x = 172,
    hp_status.y = jv.game_height - 48,
    hp_status.alpha = .8,
    hp_status.set(100),
    hunger_status = jv.StatusBar.create("Hunger", 11149858),
    hunger_status.x = 172,
    hunger_status.y = jv.game_height - 32,
    hunger_status.alpha = .8,
    hunger_status.set(50),
    exp_status = jv.StatusBar.create("Experience", 2237098),
    exp_status.x = 172,
    exp_status.y = jv.game_height - 16,
    exp_status.alpha = .8,
    exp_status.set(0),
    inv_pane = jv.scene(),
    inv_pane.x = jv.game_width - 160,
    ui_container.addChild(inv_pane),
    c = 0;
    for (var e = 0; e < 5; e++)
        for (var t = 0; t < 3; t++)
            inv[c] = jv.InventorySlot.create(16 + 47 * t, 44 + 38 * e, c, inv_pane),
            c += 1;
    ui_container.interactive = !0,
    game_fade = new PIXI.Graphics,
    game_fade.beginFill(0),
    game_fade.lineStyle(1, 0),
    game_fade.drawRect(0, 0, jv.game_width, jv.game_height),
    game_fade.endFill(),
    jv.add(game_fade),
    ui_container.cur_page = jv.text("1", {
        font: "12px Verdana",
        fill: jv.color_light,
        lineJoin: "round",
        stroke: jv.color_dark,
        strokeThickness: 4,
        align: "center"
    }),
    ui_container.cur_page.x = jv.game_width - 87,
    ui_container.cur_page.y = 239,
    ui_container.addChild(ui_container.cur_page),
    ui_container.inv_next = jv.Button.create(jv.game_width - 49, 236, 32, ">"),
    ui_container.inv_next.on_click = function() {
        item_page < 4 && (item_page++,
        ui_container.cur_page.text = String(item_page + 1),
        update_inventory())
    }
    ,
    ui_container.inv_prev = jv.Button.create(jv.game_width - 146, 236, 32, "<"),
    ui_container.inv_prev.on_click = function() {
        item_page > 0 && (item_page--,
        ui_container.cur_page.text = String(item_page + 1),
        update_inventory())
    }
    ;
    var i = jv.game_width - 144
      , o = 8;
    ui_container.stats = jv.Button.create(i, o, 60, "Character"),
    ui_container.stats.on_click = function() {
        jv.stat_dialog.show(),
        send({
            type: "c",
            r: "st"
        })
    }
    ,
    i += 66,
    ui_container.options = jv.Button.create(i, o, 60, "Menu"),
    ui_container.options.on_click = function() {
        option_dialog.show()
    }
    ,
    i = jv.game_width - 144,
    o = 380,
    ui_container.drop = jv.Button.create(i, o, 60, "Drop: all"),
    ui_container.drop.on_click = function() {
        var e = 0;
        "all" !== drop_amt && "1" !== drop_amt && "10" !== drop_amt && (e = 1),
        drop_amt = "all" == drop_amt ? "1" : "1" == drop_amt ? "10" : "all",
        this.set_text("Drop: " + drop_amt),
        e && append("Drop amount set to " + drop_amt + ".")
    }
    ,
    i += 66,
    ui_container.build = jv.Button.create(i, o, 60, "Build"),
    ui_container.build.on_click = function() {
        jv.build_dialog.visible ? jv.build_dialog.hide() : jv.build_dialog.show(),
        build_type && "" != build_type ? jv.build_dialog.info.use.set_text(build_type) : jv.build_dialog.info.use.set_text("Build"),
        jv.build_dialog.info.obj && (void 0 !== jv.build_dialog.info.obj.quantity || jv.build_dialog.info.obj.build) && jv.build_dialog.info.set_info(),
        update_build()
    }
    ,
    i += 38,
    jv.chat_box = jv.ChatBox.create(0, 0, 164, 294),
    ui_container.addChild(compass2),
    ui_container.addChild(compass),
    ui_container.addChild(jv.glow),
    ui_container.addChild(ph_dpad),
    jv.fps = jv.text("FPS: ", {
        font: "12px Verdana",
        fill: 16777215,
        lineJoin: "round",
        stroke: jv.color_dark,
        strokeThickness: 4,
        align: "right"
    }),
    jv.fps.x = 505,
    jv.fps.y = 48,
    jv.fps.visible = show_fps,
    ui_container.addChild(jv.fps),
    jv.toggle_chat = new PIXI.Sprite,
    jv.toggle_chat.interactive = !0,
    jv.toggle_chat.scale.x = 2,
    jv.toggle_chat.scale.y = 2,
    jv.toggle_chat.x = 174,
    jv.toggle_chat.y = 14,
    jv.toggle_chat.alpha = .6,
    jv.toggle_chat.texture = jv.chat_say.texture,
    jv.toggle_chat.mode = "say",
    jv.toggle_chat.buttonMode = !0,
    jv.toggle_chat.hitArea = new PIXI.Polygon(new PIXI.Point(-5,-9),new PIXI.Point(18,-9),new PIXI.Point(18,12),new PIXI.Point(-5,12)),
    jv.toggle_chat.onClick = function() {
        "say" == this.mode ? (this.mode = "global",
        this.texture = jv.chat_global.texture,
        input_field.placeholder.text = "Global chat..") : "global" == this.mode ? (this.mode = "tribe",
        this.texture = jv.chat_tribe.texture,
        input_field.placeholder.text = "Tribe chat..") : "tribe" == this.mode ? (this.mode = "tell",
        this.texture = jv.chat_tell.texture,
        input_field.placeholder.text = "Tell..") : "tell" == this.mode && (this.mode = "say",
        this.texture = jv.chat_say.texture,
        input_field.placeholder.text = "Chat..")
    }
    ,
    jv.toggle_chat.on("mouseup", jv.toggle_chat.onClick),
    jv.toggle_chat.on("touchend", jv.toggle_chat.onClick),
    ui_container.addChild(jv.toggle_chat),
    jv.ability = [],
    input_field = jv.TextInput.create(195, 10, 180, 24),
    input_field.placeholder.text = "Chat..",
    setup_mobile_input(),
    jv.bringToFront(jv.spawn_dialog)
};
jv.ready = function() {
    jv.state = "ready",
    splash = jv.sprite(path + "data/misc/splash_screen.jpg" + vt),
    jv.color_picker = jv.sprite(path + "data/misc/color.png" + vt),
    jv.sound_icon = jv.sprite(path + "data/misc/sound_icon.png" + vt),
    jv.music_icon = jv.sprite(path + "data/misc/music_icon.png" + vt),
    jv.music_icon.x = 12,
    jv.music_icon.y = 320,
    jv.music_icon.scale.x = .75,
    jv.music_icon.scale.y = .75,
    jv.music_icon.tint = 2237149,
    jv.music_icon.alpha = .7,
    jv.music_icon.interactive = !0,
    jv.music_icon.buttonMode = !0,
    jv.music_icon.onClick = function() {
        if (.7 == this.alpha) {
            this.alpha = .3,
            jv.music_volume = 0;
            var e;
            for (e in music)
                music[e].volume(0);
            option_dialog.music_slider.set_percent(0)
        } else {
            this.alpha = .7,
            jv.music_volume = .4;
            var e;
            for (e in music)
                music[e].volume(jv.music_volume);
            option_dialog.music_slider.set_percent(40)
        }
    }
    ,
    jv.music_icon.on("mouseup", jv.music_icon.onClick),
    jv.music_icon.on("touchend", jv.music_icon.onClick),
    splash.addChild(jv.music_icon),
    jv.sound_icon.x = 15,
    jv.sound_icon.y = 360,
    jv.sound_icon.scale.x = .75,
    jv.sound_icon.scale.y = .75,
    jv.sound_icon.tint = 2237149,
    jv.sound_icon.alpha = .7,
    jv.sound_icon.interactive = !0,
    jv.sound_icon.buttonMode = !0,
    jv.sound_icon.onClick = function() {
        .7 == this.alpha ? (this.alpha = .3,
        jv.sound_volume = 0,
        option_dialog.sound_slider.set_percent(0)) : (this.alpha = .7,
        jv.sound_volume = .4,
        option_dialog.sound_slider.set_percent(40))
    }
    ,
    jv.sound_icon.on("mouseup", jv.sound_icon.onClick),
    jv.sound_icon.on("touchend", jv.sound_icon.onClick),
    splash.addChild(jv.sound_icon);
    for (var e = 1; e <= 127; e++)
        monster[e] = jv.spritesheet(path + "data/monsters/" + e + ".png" + vt, 24, 32);
    
    tiles = jv.spritesheet(path + "data/misc/tile16.png" + vt, 16, 16, 2),
    items = jv.spritesheet(path + "data/misc/item16.png" + vt, 16, 16, 2),
    edges = jv.spritesheet(path + "data/misc/edges.png" + vt, 32, 32),
    compass = jv.sprite(path + "data/misc/compass.png" + vt),
    jv.chat_say = jv.sprite(path + "data/misc/chat_say.png" + vt),
    jv.chat_tell = jv.sprite(path + "data/misc/chat_tell.png" + vt),
    jv.chat_tribe = jv.sprite(path + "data/misc/chat_tribe.png" + vt),
    jv.chat_global = jv.sprite(path + "data/misc/chat_global.png" + vt),
    jv.buffs = jv.spritesheet(path + "data/misc/buffs.png" + vt, 8, 8),
    ui_container = jv.scene(),
    inventory = jv.sprite(),
    jv.theme(inventory, 160, 416),
    jv.star = jv.sprite(path + "data/misc/star.png" + vt),
    jv.star.x = 200,
    jv.star.y = 200,
    jv.buffbar = [],
    jv.buff_container = jv.scene(),
    jv.buff_container.scale.x = 2,
    jv.buff_container.scale.y = 2,
    ui_container.addChild(jv.buff_container),
    jv.buff_container.x = 178,
    jv.buff_container.y = 336,
    keyEnter.release = function() {
        input_field.hasFocus || input_field.focus()
    }
    ,
    keyShift.press = function() {
        input_field.hasFocus || editing || me !== -1 && send({
            type: "g"
        })
    }
    ,
    keyC.press = function() {
        input_field.hasFocus || editing || me !== -1 && jv.toggle_chat.onClick()
    }
    ,
    keyB.press = function() {
        input_field.hasFocus || editing || me !== -1 && ui_container.build.on_click()
    }
    ,
    keyI.press = function() {
        input_field.hasFocus || editing || me !== -1 && (jv.stat_dialog.visible ? jv.stat_dialog.hide() : ui_container.stats.on_click())
    }
    ,
    keyK.press = function() {
        input_field.hasFocus || editing || me !== -1 && (jv.skill_dialog.visible ? jv.skill_dialog.hide() : jv.stat_dialog.skill.on_click())
    }
    ,
    keyU.press = function() {
        input_field.hasFocus || editing || me !== -1 && (jv.upgrade_dialog.visible ? jv.upgrade_dialog.hide() : jv.stat_dialog.upgrades.on_click())
    }
    ,
    keyM.press = function() {
        input_field.hasFocus || editing || me !== -1 && (jv.mapping_dialog.visible ? jv.mapping_dialog.hide() : send({
            type: "c",
            r: "mp"
        }))
    }
    ,
    keyQ.press = function() {
        input_field.hasFocus || editing || me !== -1 && jv.ability[0] && jv.ability[0].do_click()
    }
    ,
    keyE.press = function() {
        input_field.hasFocus || editing || me !== -1 && jv.ability[1] && jv.ability[1].do_click()
    }
    ,
    keyR.press = function() {
        input_field.hasFocus || editing || me !== -1 && jv.ability[2] && jv.ability[2].do_click()
    }
    ,
    keyT.press = function() {
        input_field.hasFocus || editing || me !== -1 && jv.ability[3] && jv.ability[3].do_click()
    }
    ,
    keyF.press = function() {
        input_field.hasFocus || editing || me !== -1 && jv.ability[4] && jv.ability[4].do_click()
    }
    ,
    keyEscape.press = function() {
        if (!input_field.hasFocus && !editing && me !== -1) {
            var e;
            for (e in jv.Dialog.list) {
                if (jv.Dialog.list[e].visible && jv.Dialog.list[e].modal)
                    return;
                jv.Dialog.list[e].visible = !1
            }
        }
    }
    ,
    keyComma.press = function() {
        input_field.hasFocus || editing || me !== -1 && ui_container.inv_prev.on_click()
    }
    ,
    keyPeriod.press = function() {
        input_field.hasFocus || editing || me !== -1 && ui_container.inv_next.on_click()
    }
    ,
    keySlash.press = function() {
        input_field.hasFocus || editing || me !== -1 && "" == input_field.chars && (input_field.chars = "/",
        input_field.pos = 1,
        input_field.focus(),
        setTimeout(function() {
            keySlash.isUp = !0
        }, 100))
    }
    ,
    keyBackslash.press = function() {
        input_field.hasFocus || editing || me !== -1 && "" == input_field.chars && (input_field.chars = "/b ",
        input_field.pos = 3,
        input_field.focus(),
        setTimeout(function() {
            keyBackslash.isUp = !0
        }, 100))
    }
    ,
    keyBracket.press = function() {
        input_field.hasFocus || editing || me !== -1 && "" == input_field.chars && (last_tell && "" != last_tell ? input_field.chars = "/t " + last_tell + " " : input_field.chars = "/t ",
        input_field.pos = input_field.chars.length,
        input_field.focus(),
        setTimeout(function() {
            keyBracket.isUp = !0
        }, 100))
    }
    ,
    keyQuote.press = function() {
        input_field.hasFocus || editing || me !== -1 && "" == input_field.chars && (input_field.chars = "/tc ",
        input_field.pos = input_field.chars.length,
        input_field.focus(),
        setTimeout(function() {
            keyQuote.isUp = !0
        }, 100))
    }
    ,
    key1.press = function() {
        input_field.hasFocus || editing || me !== -1 && send({
            type: "u",
            slot: 0
        })
    }
    ,
    key2.press = function() {
        input_field.hasFocus || editing || me !== -1 && send({
            type: "u",
            slot: 1
        })
    }
    ,
    key3.press = function() {
        input_field.hasFocus || editing || me !== -1 && send({
            type: "u",
            slot: 2
        })
    }
    ,
    key4.press = function() {
        input_field.hasFocus || editing || me !== -1 && send({
            type: "u",
            slot: 3
        })
    }
    ,
    key5.press = function() {
        input_field.hasFocus || editing || me !== -1 && send({
            type: "u",
            slot: 4
        })
    }
    ,
    key6.press = function() {
        input_field.hasFocus || editing || me !== -1 && send({
            type: "u",
            slot: 5
        })
    }
    ,
    key7.press = function() {
        input_field.hasFocus || editing || me !== -1 && send({
            type: "u",
            slot: 6
        })
    }
    ,
    key8.press = function() {
        input_field.hasFocus || editing || me !== -1 && send({
            type: "u",
            slot: 7
        })
    }
    ,
    key9.press = function() {
        input_field.hasFocus || editing || me !== -1 && send({
            type: "u",
            slot: 8
        })
    }
    ,
    CE.hookKeys();

    var t = document.getElementById("jv");
    t.oncontextmenu = function(e) {
        e.preventDefault();
        for (var t = 580, i = 0; i < item_length; i++)
            jv.mouse.x > inv[i].x + t && jv.mouse.x < inv[i].x + 32 + t && jv.mouse.y > inv[i].y && jv.mouse.y < inv[i].y + 32 && inv[i].texture != tiles[0][0] && send({
                type: "d",
                slot: i + item_page * item_length,
                amt: drop_amt
            })
    }
    ,
    document.querySelector("canvas").onfocusout = function() {
        input_field.blur()
    }
    ,
    master_container = jv.scene(),
    master_container.x = 0,
    master_container.y = 0,
    map_container = jv.scene(),
    map_container.x = 0,
    map_container.y = 0,
    anim_map_container = jv.scene(),
    edge_container = jv.scene(),
    edge_container.x = 0,
    edge_container.y = 0;
    var i, o, n = 0;
    for (i = -13; i < 13; i++)
        for (o = -13; o < 13; o++)
            map[n] = new PIXI.Sprite,
            map[n].x = 32 * i,
            map[n].y = 32 * o,
            map_container.addChild(map[n]),
            map[n].anim = jv.sprite(tiles[6][Math.floor(20.375)]),
            map[n].anim.x = 32 * i,
            map[n].anim.y = 32 * o,
            map[n].anim.visible = 0,
            anim_map_container.addChild(map[n].anim),
            map[n].edge = jv.sprite(edges[0][1]),
            map[n].edge.x = 32 * i,
            map[n].edge.y = 32 * o,
            map[n].edge.spr = 16,
            map[n].edge.visible = 0,
            edge_container.addChild(map[n].edge),
            map[n].cover = jv.sprite(edges[0][1]),
            map[n].cover.x = 32 * i,
            map[n].cover.y = 32 * o - 20,
            map[n].cover.ry = map[n].cover.y,
            map[n].cover.visible = 0,
            player_container.addChild(map[n].cover),
            map[n].cover_mask = jv.sprite(edges[0][1]),
            map[n].cover_mask.x = 0,
            map[n].cover_mask.y = 0,
            map[n].cover_mask.visible = 0,
            map[n].cover.addChild(map[n].cover_mask),
            n += 1;
    anim_map_container.animations = 0,
    master_container.addChild(map_container),
    master_container.addChild(anim_map_container),
    master_container.addChild(edge_container),
    anim1_container = jv.scene(),
    master_container.addChild(anim1_container),
    anim2_container = jv.scene(),
    master_container.addChild(anim2_container),
    anim2_container.visible = 0,
    object_container = jv.scene(),
    object_container.x = 0,
    object_container.y = 0,
    master_container.addChild(object_container),
    target = jv.sprite(),
    target.gfx = new PIXI.Graphics,
    target.addChild(target.gfx),
    target.redraw = function(e) {
        this.gfx.clear(),
        this.gfx.lineStyle(2, 16777062, .8),
        this.gfx.beginFill(16777028, .4),
        this.gfx.drawEllipse(0, 0, e / 2, 8),
        this.gfx.endFill()
    }
    ,
    target.redraw(16),
    target.visible = !1,
    init_ui(),
    jv.ml_sound = Cookies.get("ml_sound"),
    jv.ml_sound && (jv.sound_volume = Number(jv.ml_sound),
    option_dialog.sound_slider.set_percent(jv.sound_volume)),
    jv.ml_music = Cookies.get("ml_music"),
    jv.ml_music && (option_dialog.music_slider.set_percent(Number(jv.ml_music)),
    option_dialog.music_slider.onChange());
    var a = Cookies.get("ml_user")
      , r = Cookies.get("ml_pass");
    a && r && (jv.login_dialog.username.setText(jv.base64_decode(a)),
    jv.login_dialog.password.setText(jv.base64_decode(r))),
    jv.loading_container.visible = 0,
    playMusic("rpgtitle", 1),
    append("<strong><span style='color:#99ff66'>Mystera</span> <span style='color:#66ffff'>Legacy</span> <span style='color:#ffff66'>" + version + "</span></strong>"),
    wall_sprite = new PIXI.Sprite,
    make_covers(),
    jv.reconnect_dialog.show(),
    game_fade.visible = 0,
    ui_container.visible = 0,
    "undefined" != typeof ace && (editor = ace.edit("script_code"),
    editor.setTheme("ace/theme/monokai"),
    editor.getSession().setMode("ace/mode/javascript"),
    editor.on("blur", function() {
        editing = 0
    }),
    editor.on("focus", function() {
        editing = 1
    })),
    phone || (document.getElementById("script_name").style.display = "none",
    document.getElementById("script_code").style.display = "none"),
    document.addEventListener("visibilitychange", function() {
        document.hidden ? jv.before_blur() : has_focus = 1
    })

    CE.addCustomUI()
};
//# sourceMappingURL=ml.min.js.map

CE.initConfig()
