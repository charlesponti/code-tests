var $ = function (selector) {
  /**
   * @desc This variable will hold the elements that match the selector query.
   * @type {Array}
   */
  var elements = [];

  if (selector[0] == '#') {
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
     * @param {number} i - Index to end slice
     */
    function pushName(start, end) {
      selectorNames.push(selector.slice(start, end));
    }

    /**
     * @desc Iterate through selector searching for classes and ids
     */
    for (var i = 0; i < length; i++) {
      if (selector[i] == '#' || selector[i] == '.' && i != 0) {
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
       * @param sel
       * @returns {*}
       */
      search: function(query) {
        if (query[0] == '#') {
          return document.getElementById(query);
        }
        else if (query[0] == '.') {
          return document.getElementsByClassName(query);
        }
        else {
          return  document.getElementsByTagName(query);
        }
      }
    };


    var base = DOM.search(selectorNames[0]);

    if (sel_names.length > 1) {
      var traverse_index = 1;
      while (traverse_index != selectorNames.length) {
        var sel = selectorNames[traverse_index];
        elements.push(DOM.search(sel.slice(1)));
        if (sel[0] == '#') stop = true;
        traverse_index++;
      }
    } else {
      elements = base;
    }

  }

  return elements;
};

