var $ = function (selector) {
  /**
   * @desc This array will hold the results to be returned.
   * @type {Array}
   */
  var elements = [];

  /**
   * @desc This array will hold the class names in the selector
   * @type {Array}
   */
  var classSelectors = [];

  /**
   * @desc This array will hold the id names in the selector
   * @type {Array}
   */
  var idSelectors = [];

  /**
   * @desc This variable will be assigned to the tag name in the selector
   * if one exists.
   * @type {String}
   */
  var tagName;

  /**
   * @desc This object holds Regular Expressions for testing selectors.
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
    search: {
      /**
       * @desc Search DOM by id
       * @param {String} query
       * @returns {HTMLElement}
       */
      id: function(query) {
        return document.getElementById(query);
      },
      /**
       * @desc Search DOM by class
       * @param {String} query
       * @returns {Array}
       */
      class: function(query) {
        return makeArray(document.getElementsByClassName(query));
      },
      /**
       * @desc Search DOM by tag name
       * @param {String} query
       * @returns {Array}
       */
      tag: function(query) {
        return makeArray(document.getElementsByTagName(query));
      }
    }
  };

  /**
   * @desc Index to begin slice. Set to 0 by default.
   * @type {Number}
   */
  var sliceStart = 0;

  /**
   * @desc This variable holds the length of the selector.
   * @type {Number}
   */
  var selectorLength = selector.length;

  /* Iterate through selector searching for classes and ids */
  for (var i = 1; i < selectorLength; i++) {
    if (matcher.id.test(selector[i]) || matcher.class.test(selector[i])) {
      pushName(sliceStart, i);
      sliceStart = i;
    } else if (i == selectorLength - 1) {
      /* Push last selector name in sel_names */
      pushName(sliceStart, i + 1);
    }
  }

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

  idSelectorsLength = idSelectors.length;
  classSelectorsLength = classSelectors.length;

  /**
   * @desc Return element
   */
  var base;


  function hasTagName(el) {
    return (tagName && el.tagName.toLowerCase() == tagName);
  }

  function hasClass(klass, base) {
    return (base && base.classList.contains(klass));
  }

  /**
   * Return empty elements array because one cannot define more than one id
   * to a HTMLElement
   */
  if (idSelectors.length > 1) {
    return elements;
  }

  /**
   * Return result of document.getElementById in array if only one id in
   * selector and no classes or tag name.
   */
  if (idSelectorsLength == 1 && !classSelectorsLength && !tagName) {
    elements.push(DOM.search.id(idSelectors[0]));
    return elements;
  }

  /**
   *
   */
  if (idSelectorsLength == 1 && !!tagName) {
    base = DOM.search.id(idSelectors[0]);
    if (hasTagName(base)) { elements.push(base); }
    return elements;
  }

  if (idSelectorsLength && classSelectorsLength) {
    /**
     * Check if base element has any
     */
    var hasClasses = classSelectors.map(function(klass) {
      return hasClass(klass, base);
    });

    if (!(hasClasses.indexOf(false) > -1)) elements.push(base);

    return elements
  }

  if (classSelectorsLength) {

    base = DOM.search.class(classSelectors[0]);

    for (var i = 0; i < base.length; i++) {
      var el = base[i];

      /* If base.tagName does not match tag name in selectorNames return empty array */
      if (!hasTagName(el)) return elements;

      for (var y = 1; i < classSelectors.length; i++) {
        if (!hasClass(classSelectors[i], el)) base.splice(i, 1);
      }
    }

  }

  if (tagName) elements = DOM.search.tag(tagName);

  return elements;
};

