var $ = function (selector) {
  /**
   * @desc This variable will hold the elements that match the selector query.
   * @type {Array}
   */
  var elements = [];

  if (/#/.test(selector[0])) {
    /* If selector is an id, return document.getElementById results */
    elements.push(document.getElementById(selector.slice(1)));
  } else {
    /**
     * @desc Index to begin slice. Set to 0 by default.
     * @type {number}
     */
    var sliceStart = 0;

    /**
     * @desc Holder for value of selector length
     * @type {number}
     */
    var length = selector.length;

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
     * @desc Iterate through selector searching for classes and ids
     */
    for (var i = 0; i < length; i++) {
      if (/#|\./.test(selector[i]) && i != 0) {
        pushName(sliceStart, i);
        sliceStart = i;
      } else if (i == length - 1) {
        /* Push last selector name in sel_names */
        pushName(sliceStart, i + 1);
      }
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
      search: function(query) {
        if (query[0] == '#') {
          return document.getElementById(query.slice(1));
        }
        else if (query[0] == '.') {
          return Array.prototype.slice
                    .call(document.getElementsByClassName(query.slice(1)));
        }
        else {
          return Array.prototype.slice
                    .call(document.getElementsByTagName(query));
        }
      }
    };

    if (selectorNames.length > 1) {
      var traverse_index = 0;
      while (traverse_index != selectorNames.length) {
        var selectorName = selectorNames[traverse_index];
        elements.push(DOM.search(selectorName));
        traverse_index++;
      }
    } else {
      elements.push(DOM.search(selectorNames[0]));
    }

    var baseSelector = selectorNames[0][0];

    elements.map(function(el, index) {
      if (/#|\./.test(baseSelector)) {
        if (el.tagName.toLowerCase() != baseSelector) elements.splice(index, 1);
      }
    });

  }

  return elements;
};

