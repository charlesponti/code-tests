var $ = function (selector) {
  /**
   * @desc This object holder RegExp matchers
   * @type {Object}
   */
  var matcher = {
    id: new RegExp('^#'),
    class: new RegExp('^\\.')
  };

  /**
   * @desc Holder for individual selector names within selector argument
   * @type {Array}
   */
  var selectorNames = [];

  /**
   * @desc Push slice of selector into sel_names
   * @param {number} start - Index to start slice
   * @param {number} end - Index to end slice
   */
  function pushName(start, end) {
    selectorNames.push(selector.slice(start, end));
  }

  /**
   * @desc This function converts NodeLists into an Array.
   * @param els
   * @returns {Array}
   */
  function makeArray(els) {
    return Array.prototype.slice.call(els);
  }

  /**
   * @desc This object is meant to hold a library for
   * @type {Object}
   */
  var DOM = {
    /**
     * @desc This function is replaces the need to use
     * document.getElementById, document.getElementsByClassName, and
     * document.getElementsByTagName
     * @param query
     * @returns {HTMLElement|NodeList|HTMLCollection}
     */
    search: {
      id: function(query) {
        return document.getElementById(query);
      },
      class: function(query) {
        return makeArray(document.getElementsByClassName(query));
      },
      tag: function(query) {
        return makeArray(document.getElementsByTagName(query));
      }
    }
  };

  /**
   * @desc Index to begin slice. Set to 0 by default.
   * @type {number}
   */
  var sliceStart = 0;
  var selectorLength = selector.length;

  /**
   * @desc Iterate through selector searching for classes and ids
   */
  for (var i = 1; i < selectorLength; i++) {
    if (matcher.id.test(selector[i]) || matcher.class.test(selector[i])) {
      pushName(sliceStart, i);
      sliceStart = i;
    } else if (i == selectorLength - 1) {
      /* Push last selector name in sel_names */
      pushName(sliceStart, i + 1);
    }
  }

  var classSelectors = [];
  var idSelectors = [];
  var tagName;

  while (selectorNames.length > 0) {
    var sel = selectorNames[0];

    if (matcher.class.test(sel)) {
      classSelectors.push(sel.slice(1));
    } else if (matcher.id.test(sel)) {
      idSelectors.push(sel.slice(1));
    } else {
      tagName = selectorNames[0];
    }

    selectorNames.splice(0, 1);
  }

  /**
   * @desc Return element
   */
  var base;
  if (idSelectors.length == 1) {
    base = DOM.search.id(idSelectors[0]);
  } else if (idSelectors.length > 1) {
    return [];
  }

  if (base) {

    /* If base.tagName does not match tag name in selectorNames return empty array */
    if (tagName && base.tagName.toLowerCase() != tagName) {
      return [];
    }

    if (classSelectors.length) {
      /**
       * Check if base element has any
       */
      var hasClasses = classSelectors.map(function(klass) {
        return (base && base.classList.contains(klass));
      });

      if (hasClasses.indexOf(false) > -1) {
       return [];
      } else {
        return [base];
      }
    } else {
      return [base];
    }
  }

  return [];
};

