import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_slots, e as element, t as text, a as space, c as claim_element, b as children, f as claim_text, g as detach_dev, h as claim_space, j as add_location, k as attr_dev, l as insert_dev, m as append_dev, n as set_data_dev, o as noop, p as create_component, q as claim_component, r as mount_component, u as transition_in, w as transition_out, x as destroy_component } from './client.b57958d0.js';

var bind = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

var utils = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
var buildURL = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

var InterceptorManager_1 = InterceptorManager;

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
var transformData = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};

var isCancel = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

var normalizeHeaderName = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
var enhanceError = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
var createError = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
var settle = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
var isAbsoluteURL = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
var combineURLs = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
var buildFullPath = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
var parseHeaders = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};

var isURLSameOrigin = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);

var cookies = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);

var xhr = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies$1 = cookies;

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies$1.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = xhr;
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = xhr;
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

var defaults_1 = defaults;

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
var dispatchRequest = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults_1.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
var mergeConfig = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'params', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy'];
  var defaultToConfig2Keys = [
    'baseURL', 'url', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress',
    'maxContentLength', 'validateStatus', 'maxRedirects', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath'
  ];

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys);

  var otherKeys = Object
    .keys(config2)
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, function otherKeysDefaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager_1(),
    response: new InterceptorManager_1()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

var Axios_1 = Axios;

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

var Cancel_1 = Cancel;

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel_1(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

var CancelToken_1 = CancelToken;

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
var spread = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios_1(defaultConfig);
  var instance = bind(Axios_1.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios_1.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults_1);

// Expose Axios class to allow class inheritance
axios.Axios = Axios_1;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = Cancel_1;
axios.CancelToken = CancelToken_1;
axios.isCancel = isCancel;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = spread;

var axios_1 = axios;

// Allow use of default import syntax in TypeScript
var default_1 = axios;
axios_1.default = default_1;

var axios$1 = axios_1;

function number(num) {
  if (num === null || num === undefined) {
    return 'unknown';
  }

  return num.toLocaleString();
}

function string(str) {
  if (str === null || str === undefined) {
    return "";
  }
  return str;
}

var format = {
  number,
  string
};

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var moment = createCommonjsModule(function (module, exports) {
(function (global, factory) {
     module.exports = factory() ;
}(commonjsGlobal, (function () {
    var hookCallback;

    function hooks () {
        return hookCallback.apply(null, arguments);
    }

    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback (callback) {
        hookCallback = callback;
    }

    function isArray(input) {
        return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
    }

    function isObject(input) {
        // IE8 will treat undefined and null as object if it wasn't for
        // input != null
        return input != null && Object.prototype.toString.call(input) === '[object Object]';
    }

    function isObjectEmpty(obj) {
        if (Object.getOwnPropertyNames) {
            return (Object.getOwnPropertyNames(obj).length === 0);
        } else {
            var k;
            for (k in obj) {
                if (obj.hasOwnProperty(k)) {
                    return false;
                }
            }
            return true;
        }
    }

    function isUndefined(input) {
        return input === void 0;
    }

    function isNumber(input) {
        return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
    }

    function isDate(input) {
        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
    }

    function map(arr, fn) {
        var res = [], i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function createUTC (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
    }

    function defaultParsingFlags() {
        // We need to deep clone this object.
        return {
            empty           : false,
            unusedTokens    : [],
            unusedInput     : [],
            overflow        : -2,
            charsLeftOver   : 0,
            nullInput       : false,
            invalidMonth    : null,
            invalidFormat   : false,
            userInvalidated : false,
            iso             : false,
            parsedDateParts : [],
            meridiem        : null,
            rfc2822         : false,
            weekdayMismatch : false
        };
    }

    function getParsingFlags(m) {
        if (m._pf == null) {
            m._pf = defaultParsingFlags();
        }
        return m._pf;
    }

    var some;
    if (Array.prototype.some) {
        some = Array.prototype.some;
    } else {
        some = function (fun) {
            var t = Object(this);
            var len = t.length >>> 0;

            for (var i = 0; i < len; i++) {
                if (i in t && fun.call(this, t[i], i, t)) {
                    return true;
                }
            }

            return false;
        };
    }

    function isValid(m) {
        if (m._isValid == null) {
            var flags = getParsingFlags(m);
            var parsedParts = some.call(flags.parsedDateParts, function (i) {
                return i != null;
            });
            var isNowValid = !isNaN(m._d.getTime()) &&
                flags.overflow < 0 &&
                !flags.empty &&
                !flags.invalidMonth &&
                !flags.invalidWeekday &&
                !flags.weekdayMismatch &&
                !flags.nullInput &&
                !flags.invalidFormat &&
                !flags.userInvalidated &&
                (!flags.meridiem || (flags.meridiem && parsedParts));

            if (m._strict) {
                isNowValid = isNowValid &&
                    flags.charsLeftOver === 0 &&
                    flags.unusedTokens.length === 0 &&
                    flags.bigHour === undefined;
            }

            if (Object.isFrozen == null || !Object.isFrozen(m)) {
                m._isValid = isNowValid;
            }
            else {
                return isNowValid;
            }
        }
        return m._isValid;
    }

    function createInvalid (flags) {
        var m = createUTC(NaN);
        if (flags != null) {
            extend(getParsingFlags(m), flags);
        }
        else {
            getParsingFlags(m).userInvalidated = true;
        }

        return m;
    }

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    var momentProperties = hooks.momentProperties = [];

    function copyConfig(to, from) {
        var i, prop, val;

        if (!isUndefined(from._isAMomentObject)) {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (!isUndefined(from._i)) {
            to._i = from._i;
        }
        if (!isUndefined(from._f)) {
            to._f = from._f;
        }
        if (!isUndefined(from._l)) {
            to._l = from._l;
        }
        if (!isUndefined(from._strict)) {
            to._strict = from._strict;
        }
        if (!isUndefined(from._tzm)) {
            to._tzm = from._tzm;
        }
        if (!isUndefined(from._isUTC)) {
            to._isUTC = from._isUTC;
        }
        if (!isUndefined(from._offset)) {
            to._offset = from._offset;
        }
        if (!isUndefined(from._pf)) {
            to._pf = getParsingFlags(from);
        }
        if (!isUndefined(from._locale)) {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i = 0; i < momentProperties.length; i++) {
                prop = momentProperties[i];
                val = from[prop];
                if (!isUndefined(val)) {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    var updateInProgress = false;

    // Moment prototype object
    function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        if (!this.isValid()) {
            this._d = new Date(NaN);
        }
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            hooks.updateOffset(this);
            updateInProgress = false;
        }
    }

    function isMoment (obj) {
        return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
    }

    function absFloor (number) {
        if (number < 0) {
            // -0 -> 0
            return Math.ceil(number) || 0;
        } else {
            return Math.floor(number);
        }
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
        }

        return value;
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function warn(msg) {
        if (hooks.suppressDeprecationWarnings === false &&
                (typeof console !==  'undefined') && console.warn) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;

        return extend(function () {
            if (hooks.deprecationHandler != null) {
                hooks.deprecationHandler(null, msg);
            }
            if (firstTime) {
                var args = [];
                var arg;
                for (var i = 0; i < arguments.length; i++) {
                    arg = '';
                    if (typeof arguments[i] === 'object') {
                        arg += '\n[' + i + '] ';
                        for (var key in arguments[0]) {
                            arg += key + ': ' + arguments[0][key] + ', ';
                        }
                        arg = arg.slice(0, -2); // Remove trailing comma and space
                    } else {
                        arg = arguments[i];
                    }
                    args.push(arg);
                }
                warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + (new Error()).stack);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    var deprecations = {};

    function deprecateSimple(name, msg) {
        if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(name, msg);
        }
        if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
        }
    }

    hooks.suppressDeprecationWarnings = false;
    hooks.deprecationHandler = null;

    function isFunction(input) {
        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
    }

    function set (config) {
        var prop, i;
        for (i in config) {
            prop = config[i];
            if (isFunction(prop)) {
                this[i] = prop;
            } else {
                this['_' + i] = prop;
            }
        }
        this._config = config;
        // Lenient ordinal parsing accepts just a number in addition to
        // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
        // TODO: Remove "ordinalParse" fallback in next major release.
        this._dayOfMonthOrdinalParseLenient = new RegExp(
            (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
                '|' + (/\d{1,2}/).source);
    }

    function mergeConfigs(parentConfig, childConfig) {
        var res = extend({}, parentConfig), prop;
        for (prop in childConfig) {
            if (hasOwnProp(childConfig, prop)) {
                if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                    res[prop] = {};
                    extend(res[prop], parentConfig[prop]);
                    extend(res[prop], childConfig[prop]);
                } else if (childConfig[prop] != null) {
                    res[prop] = childConfig[prop];
                } else {
                    delete res[prop];
                }
            }
        }
        for (prop in parentConfig) {
            if (hasOwnProp(parentConfig, prop) &&
                    !hasOwnProp(childConfig, prop) &&
                    isObject(parentConfig[prop])) {
                // make sure changes to properties don't modify parent config
                res[prop] = extend({}, res[prop]);
            }
        }
        return res;
    }

    function Locale(config) {
        if (config != null) {
            this.set(config);
        }
    }

    var keys;

    if (Object.keys) {
        keys = Object.keys;
    } else {
        keys = function (obj) {
            var i, res = [];
            for (i in obj) {
                if (hasOwnProp(obj, i)) {
                    res.push(i);
                }
            }
            return res;
        };
    }

    var defaultCalendar = {
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        nextWeek : 'dddd [at] LT',
        lastDay : '[Yesterday at] LT',
        lastWeek : '[Last] dddd [at] LT',
        sameElse : 'L'
    };

    function calendar (key, mom, now) {
        var output = this._calendar[key] || this._calendar['sameElse'];
        return isFunction(output) ? output.call(mom, now) : output;
    }

    var defaultLongDateFormat = {
        LTS  : 'h:mm:ss A',
        LT   : 'h:mm A',
        L    : 'MM/DD/YYYY',
        LL   : 'MMMM D, YYYY',
        LLL  : 'MMMM D, YYYY h:mm A',
        LLLL : 'dddd, MMMM D, YYYY h:mm A'
    };

    function longDateFormat (key) {
        var format = this._longDateFormat[key],
            formatUpper = this._longDateFormat[key.toUpperCase()];

        if (format || !formatUpper) {
            return format;
        }

        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
            return val.slice(1);
        });

        return this._longDateFormat[key];
    }

    var defaultInvalidDate = 'Invalid date';

    function invalidDate () {
        return this._invalidDate;
    }

    var defaultOrdinal = '%d';
    var defaultDayOfMonthOrdinalParse = /\d{1,2}/;

    function ordinal (number) {
        return this._ordinal.replace('%d', number);
    }

    var defaultRelativeTime = {
        future : 'in %s',
        past   : '%s ago',
        s  : 'a few seconds',
        ss : '%d seconds',
        m  : 'a minute',
        mm : '%d minutes',
        h  : 'an hour',
        hh : '%d hours',
        d  : 'a day',
        dd : '%d days',
        M  : 'a month',
        MM : '%d months',
        y  : 'a year',
        yy : '%d years'
    };

    function relativeTime (number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return (isFunction(output)) ?
            output(number, withoutSuffix, string, isFuture) :
            output.replace(/%d/i, number);
    }

    function pastFuture (diff, output) {
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
    }

    var aliases = {};

    function addUnitAlias (unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
    }

    function normalizeUnits(units) {
        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    var priorities = {};

    function addUnitPriority(unit, priority) {
        priorities[unit] = priority;
    }

    function getPrioritizedUnits(unitsObj) {
        var units = [];
        for (var u in unitsObj) {
            units.push({unit: u, priority: priorities[u]});
        }
        units.sort(function (a, b) {
            return a.priority - b.priority;
        });
        return units;
    }

    function zeroFill(number, targetLength, forceSign) {
        var absNumber = '' + Math.abs(number),
            zerosToFill = targetLength - absNumber.length,
            sign = number >= 0;
        return (sign ? (forceSign ? '+' : '') : '-') +
            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
    }

    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

    var formatFunctions = {};

    var formatTokenFunctions = {};

    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken (token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') {
            func = function () {
                return this[callback]();
            };
        }
        if (token) {
            formatTokenFunctions[token] = func;
        }
        if (padded) {
            formatTokenFunctions[padded[0]] = function () {
                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
        }
        if (ordinal) {
            formatTokenFunctions[ordinal] = function () {
                return this.localeData().ordinal(func.apply(this, arguments), token);
            };
        }
    }

    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '', i;
            for (i = 0; i < length; i++) {
                output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());
        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }

    var match1         = /\d/;            //       0 - 9
    var match2         = /\d\d/;          //      00 - 99
    var match3         = /\d{3}/;         //     000 - 999
    var match4         = /\d{4}/;         //    0000 - 9999
    var match6         = /[+-]?\d{6}/;    // -999999 - 999999
    var match1to2      = /\d\d?/;         //       0 - 99
    var match3to4      = /\d\d\d\d?/;     //     999 - 9999
    var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
    var match1to3      = /\d{1,3}/;       //       0 - 999
    var match1to4      = /\d{1,4}/;       //       0 - 9999
    var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

    var matchUnsigned  = /\d+/;           //       0 - inf
    var matchSigned    = /[+-]?\d+/;      //    -inf - inf

    var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
    var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

    // any word (or two) characters or numbers including two/three word month in arabic.
    // includes scottish gaelic two word and hyphenated months
    var matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i;

    var regexes = {};

    function addRegexToken (token, regex, strictRegex) {
        regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
            return (isStrict && strictRegex) ? strictRegex : regex;
        };
    }

    function getParseRegexForToken (token, config) {
        if (!hasOwnProp(regexes, token)) {
            return new RegExp(unescapeFormat(token));
        }

        return regexes[token](config._strict, config._locale);
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
        return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        }));
    }

    function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    var tokens = {};

    function addParseToken (token, callback) {
        var i, func = callback;
        if (typeof token === 'string') {
            token = [token];
        }
        if (isNumber(callback)) {
            func = function (input, array) {
                array[callback] = toInt(input);
            };
        }
        for (i = 0; i < token.length; i++) {
            tokens[token[i]] = func;
        }
    }

    function addWeekParseToken (token, callback) {
        addParseToken(token, function (input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
        });
    }

    function addTimeToArrayFromToken(token, input, config) {
        if (input != null && hasOwnProp(tokens, token)) {
            tokens[token](input, config._a, config, token);
        }
    }

    var YEAR = 0;
    var MONTH = 1;
    var DATE = 2;
    var HOUR = 3;
    var MINUTE = 4;
    var SECOND = 5;
    var MILLISECOND = 6;
    var WEEK = 7;
    var WEEKDAY = 8;

    // FORMATTING

    addFormatToken('Y', 0, 0, function () {
        var y = this.year();
        return y <= 9999 ? '' + y : '+' + y;
    });

    addFormatToken(0, ['YY', 2], 0, function () {
        return this.year() % 100;
    });

    addFormatToken(0, ['YYYY',   4],       0, 'year');
    addFormatToken(0, ['YYYYY',  5],       0, 'year');
    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

    // ALIASES

    addUnitAlias('year', 'y');

    // PRIORITIES

    addUnitPriority('year', 1);

    // PARSING

    addRegexToken('Y',      matchSigned);
    addRegexToken('YY',     match1to2, match2);
    addRegexToken('YYYY',   match1to4, match4);
    addRegexToken('YYYYY',  match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);

    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YYYY', function (input, array) {
        array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken('YY', function (input, array) {
        array[YEAR] = hooks.parseTwoDigitYear(input);
    });
    addParseToken('Y', function (input, array) {
        array[YEAR] = parseInt(input, 10);
    });

    // HELPERS

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    // HOOKS

    hooks.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    // MOMENTS

    var getSetYear = makeGetSet('FullYear', true);

    function getIsLeapYear () {
        return isLeapYear(this.year());
    }

    function makeGetSet (unit, keepTime) {
        return function (value) {
            if (value != null) {
                set$1(this, unit, value);
                hooks.updateOffset(this, keepTime);
                return this;
            } else {
                return get(this, unit);
            }
        };
    }

    function get (mom, unit) {
        return mom.isValid() ?
            mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
    }

    function set$1 (mom, unit, value) {
        if (mom.isValid() && !isNaN(value)) {
            if (unit === 'FullYear' && isLeapYear(mom.year()) && mom.month() === 1 && mom.date() === 29) {
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value, mom.month(), daysInMonth(value, mom.month()));
            }
            else {
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
            }
        }
    }

    // MOMENTS

    function stringGet (units) {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units]();
        }
        return this;
    }


    function stringSet (units, value) {
        if (typeof units === 'object') {
            units = normalizeObjectUnits(units);
            var prioritized = getPrioritizedUnits(units);
            for (var i = 0; i < prioritized.length; i++) {
                this[prioritized[i].unit](units[prioritized[i].unit]);
            }
        } else {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
                return this[units](value);
            }
        }
        return this;
    }

    function mod(n, x) {
        return ((n % x) + x) % x;
    }

    var indexOf;

    if (Array.prototype.indexOf) {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function (o) {
            // I know
            var i;
            for (i = 0; i < this.length; ++i) {
                if (this[i] === o) {
                    return i;
                }
            }
            return -1;
        };
    }

    function daysInMonth(year, month) {
        if (isNaN(year) || isNaN(month)) {
            return NaN;
        }
        var modMonth = mod(month, 12);
        year += (month - modMonth) / 12;
        return modMonth === 1 ? (isLeapYear(year) ? 29 : 28) : (31 - modMonth % 7 % 2);
    }

    // FORMATTING

    addFormatToken('M', ['MM', 2], 'Mo', function () {
        return this.month() + 1;
    });

    addFormatToken('MMM', 0, 0, function (format) {
        return this.localeData().monthsShort(this, format);
    });

    addFormatToken('MMMM', 0, 0, function (format) {
        return this.localeData().months(this, format);
    });

    // ALIASES

    addUnitAlias('month', 'M');

    // PRIORITY

    addUnitPriority('month', 8);

    // PARSING

    addRegexToken('M',    match1to2);
    addRegexToken('MM',   match1to2, match2);
    addRegexToken('MMM',  function (isStrict, locale) {
        return locale.monthsShortRegex(isStrict);
    });
    addRegexToken('MMMM', function (isStrict, locale) {
        return locale.monthsRegex(isStrict);
    });

    addParseToken(['M', 'MM'], function (input, array) {
        array[MONTH] = toInt(input) - 1;
    });

    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) {
            array[MONTH] = month;
        } else {
            getParsingFlags(config).invalidMonth = input;
        }
    });

    // LOCALES

    var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
    function localeMonths (m, format) {
        if (!m) {
            return isArray(this._months) ? this._months :
                this._months['standalone'];
        }
        return isArray(this._months) ? this._months[m.month()] :
            this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
    }

    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
    function localeMonthsShort (m, format) {
        if (!m) {
            return isArray(this._monthsShort) ? this._monthsShort :
                this._monthsShort['standalone'];
        }
        return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
            this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
    }

    function handleStrictParse(monthName, format, strict) {
        var i, ii, mom, llc = monthName.toLocaleLowerCase();
        if (!this._monthsParse) {
            // this is not used
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
            for (i = 0; i < 12; ++i) {
                mom = createUTC([2000, i]);
                this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
                this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeMonthsParse (monthName, format, strict) {
        var i, mom, regex;

        if (this._monthsParseExact) {
            return handleStrictParse.call(this, monthName, format, strict);
        }

        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        // TODO: add sorting
        // Sorting makes sure if one month (or abbr) is a prefix of another
        // see sorting in computeMonthsParse
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            if (strict && !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
            }
            if (!strict && !this._monthsParse[i]) {
                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
                return i;
            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
                return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function setMonth (mom, value) {
        var dayOfMonth;

        if (!mom.isValid()) {
            // No op
            return mom;
        }

        if (typeof value === 'string') {
            if (/^\d+$/.test(value)) {
                value = toInt(value);
            } else {
                value = mom.localeData().monthsParse(value);
                // TODO: Another silent failure?
                if (!isNumber(value)) {
                    return mom;
                }
            }
        }

        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function getSetMonth (value) {
        if (value != null) {
            setMonth(this, value);
            hooks.updateOffset(this, true);
            return this;
        } else {
            return get(this, 'Month');
        }
    }

    function getDaysInMonth () {
        return daysInMonth(this.year(), this.month());
    }

    var defaultMonthsShortRegex = matchWord;
    function monthsShortRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsShortStrictRegex;
            } else {
                return this._monthsShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsShortRegex')) {
                this._monthsShortRegex = defaultMonthsShortRegex;
            }
            return this._monthsShortStrictRegex && isStrict ?
                this._monthsShortStrictRegex : this._monthsShortRegex;
        }
    }

    var defaultMonthsRegex = matchWord;
    function monthsRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsStrictRegex;
            } else {
                return this._monthsRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsRegex')) {
                this._monthsRegex = defaultMonthsRegex;
            }
            return this._monthsStrictRegex && isStrict ?
                this._monthsStrictRegex : this._monthsRegex;
        }
    }

    function computeMonthsParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom;
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            shortPieces.push(this.monthsShort(mom, ''));
            longPieces.push(this.months(mom, ''));
            mixedPieces.push(this.months(mom, ''));
            mixedPieces.push(this.monthsShort(mom, ''));
        }
        // Sorting makes sure if one month (or abbr) is a prefix of another it
        // will match the longer piece.
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 12; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
        }
        for (i = 0; i < 24; i++) {
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    }

    function createDate (y, m, d, h, M, s, ms) {
        // can't just apply() to create a date:
        // https://stackoverflow.com/q/181348
        var date;
        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            date = new Date(y + 400, m, d, h, M, s, ms);
            if (isFinite(date.getFullYear())) {
                date.setFullYear(y);
            }
        } else {
            date = new Date(y, m, d, h, M, s, ms);
        }

        return date;
    }

    function createUTCDate (y) {
        var date;
        // the Date.UTC function remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            var args = Array.prototype.slice.call(arguments);
            // preserve leap years using a full 400 year cycle, then reset
            args[0] = y + 400;
            date = new Date(Date.UTC.apply(null, args));
            if (isFinite(date.getUTCFullYear())) {
                date.setUTCFullYear(y);
            }
        } else {
            date = new Date(Date.UTC.apply(null, arguments));
        }

        return date;
    }

    // start-of-first-week - start-of-year
    function firstWeekOffset(year, dow, doy) {
        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
            fwd = 7 + dow - doy,
            // first-week day local weekday -- which local weekday is fwd
            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

        return -fwdlw + fwd - 1;
    }

    // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7,
            weekOffset = firstWeekOffset(year, dow, doy),
            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
            resYear, resDayOfYear;

        if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
        } else {
            resYear = year;
            resDayOfYear = dayOfYear;
        }

        return {
            year: resYear,
            dayOfYear: resDayOfYear
        };
    }

    function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
            resWeek, resYear;

        if (week < 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
        } else {
            resYear = mom.year();
            resWeek = week;
        }

        return {
            week: resWeek,
            year: resYear
        };
    }

    function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy),
            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    }

    // FORMATTING

    addFormatToken('w', ['ww', 2], 'wo', 'week');
    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

    // ALIASES

    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');

    // PRIORITIES

    addUnitPriority('week', 5);
    addUnitPriority('isoWeek', 5);

    // PARSING

    addRegexToken('w',  match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W',  match1to2);
    addRegexToken('WW', match1to2, match2);

    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
        week[token.substr(0, 1)] = toInt(input);
    });

    // HELPERS

    // LOCALES

    function localeWeek (mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }

    var defaultLocaleWeek = {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 6th is the first week of the year.
    };

    function localeFirstDayOfWeek () {
        return this._week.dow;
    }

    function localeFirstDayOfYear () {
        return this._week.doy;
    }

    // MOMENTS

    function getSetWeek (input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    function getSetISOWeek (input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    // FORMATTING

    addFormatToken('d', 0, 'do', 'day');

    addFormatToken('dd', 0, 0, function (format) {
        return this.localeData().weekdaysMin(this, format);
    });

    addFormatToken('ddd', 0, 0, function (format) {
        return this.localeData().weekdaysShort(this, format);
    });

    addFormatToken('dddd', 0, 0, function (format) {
        return this.localeData().weekdays(this, format);
    });

    addFormatToken('e', 0, 0, 'weekday');
    addFormatToken('E', 0, 0, 'isoWeekday');

    // ALIASES

    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');

    // PRIORITY
    addUnitPriority('day', 11);
    addUnitPriority('weekday', 11);
    addUnitPriority('isoWeekday', 11);

    // PARSING

    addRegexToken('d',    match1to2);
    addRegexToken('e',    match1to2);
    addRegexToken('E',    match1to2);
    addRegexToken('dd',   function (isStrict, locale) {
        return locale.weekdaysMinRegex(isStrict);
    });
    addRegexToken('ddd',   function (isStrict, locale) {
        return locale.weekdaysShortRegex(isStrict);
    });
    addRegexToken('dddd',   function (isStrict, locale) {
        return locale.weekdaysRegex(isStrict);
    });

    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
        var weekday = config._locale.weekdaysParse(input, token, config._strict);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) {
            week.d = weekday;
        } else {
            getParsingFlags(config).invalidWeekday = input;
        }
    });

    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
        week[token] = toInt(input);
    });

    // HELPERS

    function parseWeekday(input, locale) {
        if (typeof input !== 'string') {
            return input;
        }

        if (!isNaN(input)) {
            return parseInt(input, 10);
        }

        input = locale.weekdaysParse(input);
        if (typeof input === 'number') {
            return input;
        }

        return null;
    }

    function parseIsoWeekday(input, locale) {
        if (typeof input === 'string') {
            return locale.weekdaysParse(input) % 7 || 7;
        }
        return isNaN(input) ? null : input;
    }

    // LOCALES
    function shiftWeekdays (ws, n) {
        return ws.slice(n, 7).concat(ws.slice(0, n));
    }

    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
    function localeWeekdays (m, format) {
        var weekdays = isArray(this._weekdays) ? this._weekdays :
            this._weekdays[(m && m !== true && this._weekdays.isFormat.test(format)) ? 'format' : 'standalone'];
        return (m === true) ? shiftWeekdays(weekdays, this._week.dow)
            : (m) ? weekdays[m.day()] : weekdays;
    }

    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
    function localeWeekdaysShort (m) {
        return (m === true) ? shiftWeekdays(this._weekdaysShort, this._week.dow)
            : (m) ? this._weekdaysShort[m.day()] : this._weekdaysShort;
    }

    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
    function localeWeekdaysMin (m) {
        return (m === true) ? shiftWeekdays(this._weekdaysMin, this._week.dow)
            : (m) ? this._weekdaysMin[m.day()] : this._weekdaysMin;
    }

    function handleStrictParse$1(weekdayName, format, strict) {
        var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];

            for (i = 0; i < 7; ++i) {
                mom = createUTC([2000, 1]).day(i);
                this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
                this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
                this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeWeekdaysParse (weekdayName, format, strict) {
        var i, mom, regex;

        if (this._weekdaysParseExact) {
            return handleStrictParse$1.call(this, weekdayName, format, strict);
        }

        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
        }

        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already

            mom = createUTC([2000, 1]).day(i);
            if (strict && !this._fullWeekdaysParse[i]) {
                this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\\.?') + '$', 'i');
                this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\\.?') + '$', 'i');
                this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\\.?') + '$', 'i');
            }
            if (!this._weekdaysParse[i]) {
                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function getSetDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, 'd');
        } else {
            return day;
        }
    }

    function getSetLocaleDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, 'd');
    }

    function getSetISODayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }

        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.

        if (input != null) {
            var weekday = parseIsoWeekday(input, this.localeData());
            return this.day(this.day() % 7 ? weekday : weekday - 7);
        } else {
            return this.day() || 7;
        }
    }

    var defaultWeekdaysRegex = matchWord;
    function weekdaysRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysStrictRegex;
            } else {
                return this._weekdaysRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                this._weekdaysRegex = defaultWeekdaysRegex;
            }
            return this._weekdaysStrictRegex && isStrict ?
                this._weekdaysStrictRegex : this._weekdaysRegex;
        }
    }

    var defaultWeekdaysShortRegex = matchWord;
    function weekdaysShortRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysShortStrictRegex;
            } else {
                return this._weekdaysShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysShortRegex')) {
                this._weekdaysShortRegex = defaultWeekdaysShortRegex;
            }
            return this._weekdaysShortStrictRegex && isStrict ?
                this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
        }
    }

    var defaultWeekdaysMinRegex = matchWord;
    function weekdaysMinRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysMinStrictRegex;
            } else {
                return this._weekdaysMinRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysMinRegex')) {
                this._weekdaysMinRegex = defaultWeekdaysMinRegex;
            }
            return this._weekdaysMinStrictRegex && isStrict ?
                this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
        }
    }


    function computeWeekdaysParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom, minp, shortp, longp;
        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, 1]).day(i);
            minp = this.weekdaysMin(mom, '');
            shortp = this.weekdaysShort(mom, '');
            longp = this.weekdays(mom, '');
            minPieces.push(minp);
            shortPieces.push(shortp);
            longPieces.push(longp);
            mixedPieces.push(minp);
            mixedPieces.push(shortp);
            mixedPieces.push(longp);
        }
        // Sorting makes sure if one weekday (or abbr) is a prefix of another it
        // will match the longer piece.
        minPieces.sort(cmpLenRev);
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 7; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;

        this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
        this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
    }

    // FORMATTING

    function hFormat() {
        return this.hours() % 12 || 12;
    }

    function kFormat() {
        return this.hours() || 24;
    }

    addFormatToken('H', ['HH', 2], 0, 'hour');
    addFormatToken('h', ['hh', 2], 0, hFormat);
    addFormatToken('k', ['kk', 2], 0, kFormat);

    addFormatToken('hmm', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
    });

    addFormatToken('hmmss', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    addFormatToken('Hmm', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2);
    });

    addFormatToken('Hmmss', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    function meridiem (token, lowercase) {
        addFormatToken(token, 0, 0, function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
        });
    }

    meridiem('a', true);
    meridiem('A', false);

    // ALIASES

    addUnitAlias('hour', 'h');

    // PRIORITY
    addUnitPriority('hour', 13);

    // PARSING

    function matchMeridiem (isStrict, locale) {
        return locale._meridiemParse;
    }

    addRegexToken('a',  matchMeridiem);
    addRegexToken('A',  matchMeridiem);
    addRegexToken('H',  match1to2);
    addRegexToken('h',  match1to2);
    addRegexToken('k',  match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);
    addRegexToken('kk', match1to2, match2);

    addRegexToken('hmm', match3to4);
    addRegexToken('hmmss', match5to6);
    addRegexToken('Hmm', match3to4);
    addRegexToken('Hmmss', match5to6);

    addParseToken(['H', 'HH'], HOUR);
    addParseToken(['k', 'kk'], function (input, array, config) {
        var kInput = toInt(input);
        array[HOUR] = kInput === 24 ? 0 : kInput;
    });
    addParseToken(['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
    });
    addParseToken(['h', 'hh'], function (input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('Hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
    });
    addParseToken('Hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
    });

    // LOCALES

    function localeIsPM (input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return ((input + '').toLowerCase().charAt(0) === 'p');
    }

    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
    function localeMeridiem (hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'pm' : 'PM';
        } else {
            return isLower ? 'am' : 'AM';
        }
    }


    // MOMENTS

    // Setting the hour should keep the time, because the user explicitly
    // specified which hour they want. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    var getSetHour = makeGetSet('Hours', true);

    var baseConfig = {
        calendar: defaultCalendar,
        longDateFormat: defaultLongDateFormat,
        invalidDate: defaultInvalidDate,
        ordinal: defaultOrdinal,
        dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
        relativeTime: defaultRelativeTime,

        months: defaultLocaleMonths,
        monthsShort: defaultLocaleMonthsShort,

        week: defaultLocaleWeek,

        weekdays: defaultLocaleWeekdays,
        weekdaysMin: defaultLocaleWeekdaysMin,
        weekdaysShort: defaultLocaleWeekdaysShort,

        meridiemParse: defaultLocaleMeridiemParse
    };

    // internal storage for locale config files
    var locales = {};
    var localeFamilies = {};
    var globalLocale;

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0, j, next, locale, split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return globalLocale;
    }

    function loadLocale(name) {
        var oldLocale = null;
        // TODO: Find a better way to register and load all the locales in Node
        if (!locales[name] && ('object' !== 'undefined') &&
                module && module.exports) {
            try {
                oldLocale = globalLocale._abbr;
                var aliasedRequire = commonjsRequire;
                aliasedRequire('./locale/' + name);
                getSetGlobalLocale(oldLocale);
            } catch (e) {}
        }
        return locales[name];
    }

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function getSetGlobalLocale (key, values) {
        var data;
        if (key) {
            if (isUndefined(values)) {
                data = getLocale(key);
            }
            else {
                data = defineLocale(key, values);
            }

            if (data) {
                // moment.duration._locale = moment._locale = data;
                globalLocale = data;
            }
            else {
                if ((typeof console !==  'undefined') && console.warn) {
                    //warn user if arguments are passed but the locale could not be set
                    console.warn('Locale ' + key +  ' not found. Did you forget to load it?');
                }
            }
        }

        return globalLocale._abbr;
    }

    function defineLocale (name, config) {
        if (config !== null) {
            var locale, parentConfig = baseConfig;
            config.abbr = name;
            if (locales[name] != null) {
                deprecateSimple('defineLocaleOverride',
                        'use moment.updateLocale(localeName, config) to change ' +
                        'an existing locale. moment.defineLocale(localeName, ' +
                        'config) should only be used for creating a new locale ' +
                        'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
                parentConfig = locales[name]._config;
            } else if (config.parentLocale != null) {
                if (locales[config.parentLocale] != null) {
                    parentConfig = locales[config.parentLocale]._config;
                } else {
                    locale = loadLocale(config.parentLocale);
                    if (locale != null) {
                        parentConfig = locale._config;
                    } else {
                        if (!localeFamilies[config.parentLocale]) {
                            localeFamilies[config.parentLocale] = [];
                        }
                        localeFamilies[config.parentLocale].push({
                            name: name,
                            config: config
                        });
                        return null;
                    }
                }
            }
            locales[name] = new Locale(mergeConfigs(parentConfig, config));

            if (localeFamilies[name]) {
                localeFamilies[name].forEach(function (x) {
                    defineLocale(x.name, x.config);
                });
            }

            // backwards compat for now: also set the locale
            // make sure we set the locale AFTER all child locales have been
            // created, so we won't end up with the child locale set.
            getSetGlobalLocale(name);


            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    }

    function updateLocale(name, config) {
        if (config != null) {
            var locale, tmpLocale, parentConfig = baseConfig;
            // MERGE
            tmpLocale = loadLocale(name);
            if (tmpLocale != null) {
                parentConfig = tmpLocale._config;
            }
            config = mergeConfigs(parentConfig, config);
            locale = new Locale(config);
            locale.parentLocale = locales[name];
            locales[name] = locale;

            // backwards compat for now: also set the locale
            getSetGlobalLocale(name);
        } else {
            // pass null for config to unupdate, useful for tests
            if (locales[name] != null) {
                if (locales[name].parentLocale != null) {
                    locales[name] = locales[name].parentLocale;
                } else if (locales[name] != null) {
                    delete locales[name];
                }
            }
        }
        return locales[name];
    }

    // returns locale data
    function getLocale (key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return globalLocale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    }

    function listLocales() {
        return keys(locales);
    }

    function checkOverflow (m) {
        var overflow;
        var a = m._a;

        if (a && getParsingFlags(m).overflow === -2) {
            overflow =
                a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
                a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
                a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
                a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
                a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
                a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
                -1;

            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }
            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
                overflow = WEEK;
            }
            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
                overflow = WEEKDAY;
            }

            getParsingFlags(m).overflow = overflow;
        }

        return m;
    }

    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function currentDateArray(config) {
        // hooks is actually the exported moment object
        var nowValue = new Date(hooks.now());
        if (config._useUTC) {
            return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
        }
        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray (config) {
        var i, date, input = [], currentDate, expectedWeekday, yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear != null) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

            if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
                getParsingFlags(config)._overflowDayOfYear = true;
            }

            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // Check for 24:00:00.000
        if (config._a[HOUR] === 24 &&
                config._a[MINUTE] === 0 &&
                config._a[SECOND] === 0 &&
                config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
        expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();

        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }

        // check for mismatching day of week
        if (config._w && typeof config._w.d !== 'undefined' && config._w.d !== expectedWeekday) {
            getParsingFlags(config).weekdayMismatch = true;
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday < 1 || weekday > 7) {
                weekdayOverflow = true;
            }
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            var curWeek = weekOfYear(createLocal(), dow, doy);

            weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

            // Default to current week.
            week = defaults(w.w, curWeek.week);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < 0 || weekday > 6) {
                    weekdayOverflow = true;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from beginning of week
                weekday = w.e + dow;
                if (w.e < 0 || w.e > 6) {
                    weekdayOverflow = true;
                }
            } else {
                // default to beginning of week
                weekday = dow;
            }
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
            getParsingFlags(config)._overflowWeeks = true;
        } else if (weekdayOverflow != null) {
            getParsingFlags(config)._overflowWeekday = true;
        } else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }
    }

    // iso 8601 regex
    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
    var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

    var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

    var isoDates = [
        ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
        ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
        ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
        ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
        ['YYYY-DDD', /\d{4}-\d{3}/],
        ['YYYY-MM', /\d{4}-\d\d/, false],
        ['YYYYYYMMDD', /[+-]\d{10}/],
        ['YYYYMMDD', /\d{8}/],
        // YYYYMM is NOT allowed by the standard
        ['GGGG[W]WWE', /\d{4}W\d{3}/],
        ['GGGG[W]WW', /\d{4}W\d{2}/, false],
        ['YYYYDDD', /\d{7}/]
    ];

    // iso time formats and regexes
    var isoTimes = [
        ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
        ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
        ['HH:mm:ss', /\d\d:\d\d:\d\d/],
        ['HH:mm', /\d\d:\d\d/],
        ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
        ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
        ['HHmmss', /\d\d\d\d\d\d/],
        ['HHmm', /\d\d\d\d/],
        ['HH', /\d\d/]
    ];

    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

    // date from iso format
    function configFromISO(config) {
        var i, l,
            string = config._i,
            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
            allowTime, dateFormat, timeFormat, tzFormat;

        if (match) {
            getParsingFlags(config).iso = true;

            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(match[1])) {
                    dateFormat = isoDates[i][0];
                    allowTime = isoDates[i][2] !== false;
                    break;
                }
            }
            if (dateFormat == null) {
                config._isValid = false;
                return;
            }
            if (match[3]) {
                for (i = 0, l = isoTimes.length; i < l; i++) {
                    if (isoTimes[i][1].exec(match[3])) {
                        // match[2] should be 'T' or space
                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
                        break;
                    }
                }
                if (timeFormat == null) {
                    config._isValid = false;
                    return;
                }
            }
            if (!allowTime && timeFormat != null) {
                config._isValid = false;
                return;
            }
            if (match[4]) {
                if (tzRegex.exec(match[4])) {
                    tzFormat = 'Z';
                } else {
                    config._isValid = false;
                    return;
                }
            }
            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
            configFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    // RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
    var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;

    function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
        var result = [
            untruncateYear(yearStr),
            defaultLocaleMonthsShort.indexOf(monthStr),
            parseInt(dayStr, 10),
            parseInt(hourStr, 10),
            parseInt(minuteStr, 10)
        ];

        if (secondStr) {
            result.push(parseInt(secondStr, 10));
        }

        return result;
    }

    function untruncateYear(yearStr) {
        var year = parseInt(yearStr, 10);
        if (year <= 49) {
            return 2000 + year;
        } else if (year <= 999) {
            return 1900 + year;
        }
        return year;
    }

    function preprocessRFC2822(s) {
        // Remove comments and folding whitespace and replace multiple-spaces with a single space
        return s.replace(/\([^)]*\)|[\n\t]/g, ' ').replace(/(\s\s+)/g, ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    }

    function checkWeekday(weekdayStr, parsedInput, config) {
        if (weekdayStr) {
            // TODO: Replace the vanilla JS Date object with an indepentent day-of-week check.
            var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
                weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();
            if (weekdayProvided !== weekdayActual) {
                getParsingFlags(config).weekdayMismatch = true;
                config._isValid = false;
                return false;
            }
        }
        return true;
    }

    var obsOffsets = {
        UT: 0,
        GMT: 0,
        EDT: -4 * 60,
        EST: -5 * 60,
        CDT: -5 * 60,
        CST: -6 * 60,
        MDT: -6 * 60,
        MST: -7 * 60,
        PDT: -7 * 60,
        PST: -8 * 60
    };

    function calculateOffset(obsOffset, militaryOffset, numOffset) {
        if (obsOffset) {
            return obsOffsets[obsOffset];
        } else if (militaryOffset) {
            // the only allowed military tz is Z
            return 0;
        } else {
            var hm = parseInt(numOffset, 10);
            var m = hm % 100, h = (hm - m) / 100;
            return h * 60 + m;
        }
    }

    // date and time from ref 2822 format
    function configFromRFC2822(config) {
        var match = rfc2822.exec(preprocessRFC2822(config._i));
        if (match) {
            var parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);
            if (!checkWeekday(match[1], parsedArray, config)) {
                return;
            }

            config._a = parsedArray;
            config._tzm = calculateOffset(match[8], match[9], match[10]);

            config._d = createUTCDate.apply(null, config._a);
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

            getParsingFlags(config).rfc2822 = true;
        } else {
            config._isValid = false;
        }
    }

    // date from iso format or fallback
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);

        if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
        }

        configFromISO(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        configFromRFC2822(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        // Final attempt, use Input Fallback
        hooks.createFromInputFallback(config);
    }

    hooks.createFromInputFallback = deprecate(
        'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
        'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
        'discouraged and will be removed in an upcoming major release. Please refer to ' +
        'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
        function (config) {
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        }
    );

    // constant that refers to the ISO standard
    hooks.ISO_8601 = function () {};

    // constant that refers to the RFC 2822 form
    hooks.RFC_2822 = function () {};

    // date from string and format string
    function configFromStringAndFormat(config) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (config._f === hooks.ISO_8601) {
            configFromISO(config);
            return;
        }
        if (config._f === hooks.RFC_2822) {
            configFromRFC2822(config);
            return;
        }
        config._a = [];
        getParsingFlags(config).empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            // console.log('token', token, 'parsedInput', parsedInput,
            //         'regex', getParseRegexForToken(token, config));
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    getParsingFlags(config).unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    getParsingFlags(config).empty = false;
                }
                else {
                    getParsingFlags(config).unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                getParsingFlags(config).unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (config._a[HOUR] <= 12 &&
            getParsingFlags(config).bigHour === true &&
            config._a[HOUR] > 0) {
            getParsingFlags(config).bigHour = undefined;
        }

        getParsingFlags(config).parsedDateParts = config._a.slice(0);
        getParsingFlags(config).meridiem = config._meridiem;
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

        configFromArray(config);
        checkOverflow(config);
    }


    function meridiemFixWrap (locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // this is not supposed to happen
            return hour;
        }
    }

    // date from string and array of format strings
    function configFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);

            if (!isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += getParsingFlags(tempConfig).charsLeftOver;

            //or tokens
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

            getParsingFlags(tempConfig).score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    function configFromObject(config) {
        if (config._d) {
            return;
        }

        var i = normalizeObjectUnits(config._i);
        config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
            return obj && parseInt(obj, 10);
        });

        configFromArray(config);
    }

    function createFromConfig (config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    function prepareConfig (config) {
        var input = config._i,
            format = config._f;

        config._locale = config._locale || getLocale(config._l);

        if (input === null || (format === undefined && input === '')) {
            return createInvalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (isMoment(input)) {
            return new Moment(checkOverflow(input));
        } else if (isDate(input)) {
            config._d = input;
        } else if (isArray(format)) {
            configFromStringAndArray(config);
        } else if (format) {
            configFromStringAndFormat(config);
        }  else {
            configFromInput(config);
        }

        if (!isValid(config)) {
            config._d = null;
        }

        return config;
    }

    function configFromInput(config) {
        var input = config._i;
        if (isUndefined(input)) {
            config._d = new Date(hooks.now());
        } else if (isDate(input)) {
            config._d = new Date(input.valueOf());
        } else if (typeof input === 'string') {
            configFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            configFromArray(config);
        } else if (isObject(input)) {
            configFromObject(config);
        } else if (isNumber(input)) {
            // from milliseconds
            config._d = new Date(input);
        } else {
            hooks.createFromInputFallback(config);
        }
    }

    function createLocalOrUTC (input, format, locale, strict, isUTC) {
        var c = {};

        if (locale === true || locale === false) {
            strict = locale;
            locale = undefined;
        }

        if ((isObject(input) && isObjectEmpty(input)) ||
                (isArray(input) && input.length === 0)) {
            input = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;

        return createFromConfig(c);
    }

    function createLocal (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
    }

    var prototypeMin = deprecate(
        'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
        function () {
            var other = createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
                return other < this ? this : other;
            } else {
                return createInvalid();
            }
        }
    );

    var prototypeMax = deprecate(
        'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
        function () {
            var other = createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
                return other > this ? this : other;
            } else {
                return createInvalid();
            }
        }
    );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    // TODO: Use [].sort instead?
    function min () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    }

    function max () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    }

    var now = function () {
        return Date.now ? Date.now() : +(new Date());
    };

    var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

    function isDurationValid(m) {
        for (var key in m) {
            if (!(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
                return false;
            }
        }

        var unitHasDecimal = false;
        for (var i = 0; i < ordering.length; ++i) {
            if (m[ordering[i]]) {
                if (unitHasDecimal) {
                    return false; // only allow non-integers for smallest unit
                }
                if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                    unitHasDecimal = true;
                }
            }
        }

        return true;
    }

    function isValid$1() {
        return this._isValid;
    }

    function createInvalid$1() {
        return createDuration(NaN);
    }

    function Duration (duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || normalizedInput.isoWeek || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        this._isValid = isDurationValid(normalizedInput);

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible to translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            quarters * 3 +
            years * 12;

        this._data = {};

        this._locale = getLocale();

        this._bubble();
    }

    function isDuration (obj) {
        return obj instanceof Duration;
    }

    function absRound (number) {
        if (number < 0) {
            return Math.round(-1 * number) * -1;
        } else {
            return Math.round(number);
        }
    }

    // FORMATTING

    function offset (token, separator) {
        addFormatToken(token, 0, 0, function () {
            var offset = this.utcOffset();
            var sign = '+';
            if (offset < 0) {
                offset = -offset;
                sign = '-';
            }
            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
        });
    }

    offset('Z', ':');
    offset('ZZ', '');

    // PARSING

    addRegexToken('Z',  matchShortOffset);
    addRegexToken('ZZ', matchShortOffset);
    addParseToken(['Z', 'ZZ'], function (input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
    });

    // HELPERS

    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;

    function offsetFromString(matcher, string) {
        var matches = (string || '').match(matcher);

        if (matches === null) {
            return null;
        }

        var chunk   = matches[matches.length - 1] || [];
        var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
        var minutes = +(parts[1] * 60) + toInt(parts[2]);

        return minutes === 0 ?
          0 :
          parts[0] === '+' ? minutes : -minutes;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(res._d.valueOf() + diff);
            hooks.updateOffset(res, false);
            return res;
        } else {
            return createLocal(input).local();
        }
    }

    function getDateOffset (m) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
    }

    // HOOKS

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    hooks.updateOffset = function () {};

    // MOMENTS

    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset (input, keepLocalTime, keepMinutes) {
        var offset = this._offset || 0,
            localAdjust;
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        if (input != null) {
            if (typeof input === 'string') {
                input = offsetFromString(matchShortOffset, input);
                if (input === null) {
                    return this;
                }
            } else if (Math.abs(input) < 16 && !keepMinutes) {
                input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
                localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
                this.add(localAdjust, 'm');
            }
            if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) {
                    addSubtract(this, createDuration(input - offset, 'm'), 1, false);
                } else if (!this._changeInProgress) {
                    this._changeInProgress = true;
                    hooks.updateOffset(this, true);
                    this._changeInProgress = null;
                }
            }
            return this;
        } else {
            return this._isUTC ? offset : getDateOffset(this);
        }
    }

    function getSetZone (input, keepLocalTime) {
        if (input != null) {
            if (typeof input !== 'string') {
                input = -input;
            }

            this.utcOffset(input, keepLocalTime);

            return this;
        } else {
            return -this.utcOffset();
        }
    }

    function setOffsetToUTC (keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }

    function setOffsetToLocal (keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;

            if (keepLocalTime) {
                this.subtract(getDateOffset(this), 'm');
            }
        }
        return this;
    }

    function setOffsetToParsedOffset () {
        if (this._tzm != null) {
            this.utcOffset(this._tzm, false, true);
        } else if (typeof this._i === 'string') {
            var tZone = offsetFromString(matchOffset, this._i);
            if (tZone != null) {
                this.utcOffset(tZone);
            }
            else {
                this.utcOffset(0, true);
            }
        }
        return this;
    }

    function hasAlignedHourOffset (input) {
        if (!this.isValid()) {
            return false;
        }
        input = input ? createLocal(input).utcOffset() : 0;

        return (this.utcOffset() - input) % 60 === 0;
    }

    function isDaylightSavingTime () {
        return (
            this.utcOffset() > this.clone().month(0).utcOffset() ||
            this.utcOffset() > this.clone().month(5).utcOffset()
        );
    }

    function isDaylightSavingTimeShifted () {
        if (!isUndefined(this._isDSTShifted)) {
            return this._isDSTShifted;
        }

        var c = {};

        copyConfig(c, this);
        c = prepareConfig(c);

        if (c._a) {
            var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
            this._isDSTShifted = this.isValid() &&
                compareArrays(c._a, other.toArray()) > 0;
        } else {
            this._isDSTShifted = false;
        }

        return this._isDSTShifted;
    }

    function isLocal () {
        return this.isValid() ? !this._isUTC : false;
    }

    function isUtcOffset () {
        return this.isValid() ? this._isUTC : false;
    }

    function isUtc () {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
    }

    // ASP.NET json date format regex
    var aspNetRegex = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;

    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
    // and further modified to allow for strings containing both week and day
    var isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

    function createDuration (input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            diffRes;

        if (isDuration(input)) {
            duration = {
                ms : input._milliseconds,
                d  : input._days,
                M  : input._months
            };
        } else if (isNumber(input)) {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y  : 0,
                d  : toInt(match[DATE])                         * sign,
                h  : toInt(match[HOUR])                         * sign,
                m  : toInt(match[MINUTE])                       * sign,
                s  : toInt(match[SECOND])                       * sign,
                ms : toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
            };
        } else if (!!(match = isoRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y : parseIso(match[2], sign),
                M : parseIso(match[3], sign),
                w : parseIso(match[4], sign),
                d : parseIso(match[5], sign),
                h : parseIso(match[6], sign),
                m : parseIso(match[7], sign),
                s : parseIso(match[8], sign)
            };
        } else if (duration == null) {// checks for null or undefined
            duration = {};
        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        return ret;
    }

    createDuration.fn = Duration.prototype;
    createDuration.invalid = createInvalid$1;

    function parseIso (inp, sign) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var res = inp && parseFloat(inp.replace(',', '.'));
        // apply sign while we're at it
        return (isNaN(res) ? 0 : res) * sign;
    }

    function positiveMomentsDifference(base, other) {
        var res = {};

        res.months = other.month() - base.month() +
            (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) {
            return {milliseconds: 0, months: 0};
        }

        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' +
                'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
                tmp = val; val = period; period = tmp;
            }

            val = typeof val === 'string' ? +val : val;
            dur = createDuration(val, period);
            addSubtract(this, dur, direction);
            return this;
        };
    }

    function addSubtract (mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = absRound(duration._days),
            months = absRound(duration._months);

        if (!mom.isValid()) {
            // No op
            return;
        }

        updateOffset = updateOffset == null ? true : updateOffset;

        if (months) {
            setMonth(mom, get(mom, 'Month') + months * isAdding);
        }
        if (days) {
            set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
        }
        if (milliseconds) {
            mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
        }
        if (updateOffset) {
            hooks.updateOffset(mom, days || months);
        }
    }

    var add      = createAdder(1, 'add');
    var subtract = createAdder(-1, 'subtract');

    function getCalendarFormat(myMoment, now) {
        var diff = myMoment.diff(now, 'days', true);
        return diff < -6 ? 'sameElse' :
                diff < -1 ? 'lastWeek' :
                diff < 0 ? 'lastDay' :
                diff < 1 ? 'sameDay' :
                diff < 2 ? 'nextDay' :
                diff < 7 ? 'nextWeek' : 'sameElse';
    }

    function calendar$1 (time, formats) {
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var now = time || createLocal(),
            sod = cloneWithOffset(now, this).startOf('day'),
            format = hooks.calendarFormat(this, sod) || 'sameElse';

        var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);

        return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
    }

    function clone () {
        return new Moment(this);
    }

    function isAfter (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() > localInput.valueOf();
        } else {
            return localInput.valueOf() < this.clone().startOf(units).valueOf();
        }
    }

    function isBefore (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() < localInput.valueOf();
        } else {
            return this.clone().endOf(units).valueOf() < localInput.valueOf();
        }
    }

    function isBetween (from, to, units, inclusivity) {
        var localFrom = isMoment(from) ? from : createLocal(from),
            localTo = isMoment(to) ? to : createLocal(to);
        if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
            return false;
        }
        inclusivity = inclusivity || '()';
        return (inclusivity[0] === '(' ? this.isAfter(localFrom, units) : !this.isBefore(localFrom, units)) &&
            (inclusivity[1] === ')' ? this.isBefore(localTo, units) : !this.isAfter(localTo, units));
    }

    function isSame (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input),
            inputMs;
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() === localInput.valueOf();
        } else {
            inputMs = localInput.valueOf();
            return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
        }
    }

    function isSameOrAfter (input, units) {
        return this.isSame(input, units) || this.isAfter(input, units);
    }

    function isSameOrBefore (input, units) {
        return this.isSame(input, units) || this.isBefore(input, units);
    }

    function diff (input, units, asFloat) {
        var that,
            zoneDelta,
            output;

        if (!this.isValid()) {
            return NaN;
        }

        that = cloneWithOffset(input, this);

        if (!that.isValid()) {
            return NaN;
        }

        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

        units = normalizeUnits(units);

        switch (units) {
            case 'year': output = monthDiff(this, that) / 12; break;
            case 'month': output = monthDiff(this, that); break;
            case 'quarter': output = monthDiff(this, that) / 3; break;
            case 'second': output = (this - that) / 1e3; break; // 1000
            case 'minute': output = (this - that) / 6e4; break; // 1000 * 60
            case 'hour': output = (this - that) / 36e5; break; // 1000 * 60 * 60
            case 'day': output = (this - that - zoneDelta) / 864e5; break; // 1000 * 60 * 60 * 24, negate dst
            case 'week': output = (this - that - zoneDelta) / 6048e5; break; // 1000 * 60 * 60 * 24 * 7, negate dst
            default: output = this - that;
        }

        return asFloat ? output : absFloor(output);
    }

    function monthDiff (a, b) {
        // difference in months
        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
            // b is in (anchor - 1 month, anchor + 1 month)
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2, adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        //check for negative zero, return zero if negative zero
        return -(wholeMonthDiff + adjust) || 0;
    }

    hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
    hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

    function toString () {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }

    function toISOString(keepOffset) {
        if (!this.isValid()) {
            return null;
        }
        var utc = keepOffset !== true;
        var m = utc ? this.clone().utc() : this;
        if (m.year() < 0 || m.year() > 9999) {
            return formatMoment(m, utc ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ');
        }
        if (isFunction(Date.prototype.toISOString)) {
            // native implementation is ~50x faster, use it when we can
            if (utc) {
                return this.toDate().toISOString();
            } else {
                return new Date(this.valueOf() + this.utcOffset() * 60 * 1000).toISOString().replace('Z', formatMoment(m, 'Z'));
            }
        }
        return formatMoment(m, utc ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ');
    }

    /**
     * Return a human readable representation of a moment that can
     * also be evaluated to get a new moment which is the same
     *
     * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
     */
    function inspect () {
        if (!this.isValid()) {
            return 'moment.invalid(/* ' + this._i + ' */)';
        }
        var func = 'moment';
        var zone = '';
        if (!this.isLocal()) {
            func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
            zone = 'Z';
        }
        var prefix = '[' + func + '("]';
        var year = (0 <= this.year() && this.year() <= 9999) ? 'YYYY' : 'YYYYYY';
        var datetime = '-MM-DD[T]HH:mm:ss.SSS';
        var suffix = zone + '[")]';

        return this.format(prefix + year + datetime + suffix);
    }

    function format (inputString) {
        if (!inputString) {
            inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
        }
        var output = formatMoment(this, inputString);
        return this.localeData().postformat(output);
    }

    function from (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 createLocal(time).isValid())) {
            return createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function fromNow (withoutSuffix) {
        return this.from(createLocal(), withoutSuffix);
    }

    function to (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 createLocal(time).isValid())) {
            return createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function toNow (withoutSuffix) {
        return this.to(createLocal(), withoutSuffix);
    }

    // If passed a locale key, it will set the locale for this
    // instance.  Otherwise, it will return the locale configuration
    // variables for this instance.
    function locale (key) {
        var newLocaleData;

        if (key === undefined) {
            return this._locale._abbr;
        } else {
            newLocaleData = getLocale(key);
            if (newLocaleData != null) {
                this._locale = newLocaleData;
            }
            return this;
        }
    }

    var lang = deprecate(
        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
        function (key) {
            if (key === undefined) {
                return this.localeData();
            } else {
                return this.locale(key);
            }
        }
    );

    function localeData () {
        return this._locale;
    }

    var MS_PER_SECOND = 1000;
    var MS_PER_MINUTE = 60 * MS_PER_SECOND;
    var MS_PER_HOUR = 60 * MS_PER_MINUTE;
    var MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;

    // actual modulo - handles negative numbers (for dates before 1970):
    function mod$1(dividend, divisor) {
        return (dividend % divisor + divisor) % divisor;
    }

    function localStartOfDate(y, m, d) {
        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            return new Date(y + 400, m, d) - MS_PER_400_YEARS;
        } else {
            return new Date(y, m, d).valueOf();
        }
    }

    function utcStartOfDate(y, m, d) {
        // Date.UTC remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
        } else {
            return Date.UTC(y, m, d);
        }
    }

    function startOf (units) {
        var time;
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond' || !this.isValid()) {
            return this;
        }

        var startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

        switch (units) {
            case 'year':
                time = startOfDate(this.year(), 0, 1);
                break;
            case 'quarter':
                time = startOfDate(this.year(), this.month() - this.month() % 3, 1);
                break;
            case 'month':
                time = startOfDate(this.year(), this.month(), 1);
                break;
            case 'week':
                time = startOfDate(this.year(), this.month(), this.date() - this.weekday());
                break;
            case 'isoWeek':
                time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
                break;
            case 'day':
            case 'date':
                time = startOfDate(this.year(), this.month(), this.date());
                break;
            case 'hour':
                time = this._d.valueOf();
                time -= mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR);
                break;
            case 'minute':
                time = this._d.valueOf();
                time -= mod$1(time, MS_PER_MINUTE);
                break;
            case 'second':
                time = this._d.valueOf();
                time -= mod$1(time, MS_PER_SECOND);
                break;
        }

        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
    }

    function endOf (units) {
        var time;
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond' || !this.isValid()) {
            return this;
        }

        var startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

        switch (units) {
            case 'year':
                time = startOfDate(this.year() + 1, 0, 1) - 1;
                break;
            case 'quarter':
                time = startOfDate(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
                break;
            case 'month':
                time = startOfDate(this.year(), this.month() + 1, 1) - 1;
                break;
            case 'week':
                time = startOfDate(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
                break;
            case 'isoWeek':
                time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
                break;
            case 'day':
            case 'date':
                time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
                break;
            case 'hour':
                time = this._d.valueOf();
                time += MS_PER_HOUR - mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR) - 1;
                break;
            case 'minute':
                time = this._d.valueOf();
                time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
                break;
            case 'second':
                time = this._d.valueOf();
                time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
                break;
        }

        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
    }

    function valueOf () {
        return this._d.valueOf() - ((this._offset || 0) * 60000);
    }

    function unix () {
        return Math.floor(this.valueOf() / 1000);
    }

    function toDate () {
        return new Date(this.valueOf());
    }

    function toArray () {
        var m = this;
        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
    }

    function toObject () {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds()
        };
    }

    function toJSON () {
        // new Date(NaN).toJSON() === null
        return this.isValid() ? this.toISOString() : null;
    }

    function isValid$2 () {
        return isValid(this);
    }

    function parsingFlags () {
        return extend({}, getParsingFlags(this));
    }

    function invalidAt () {
        return getParsingFlags(this).overflow;
    }

    function creationData() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
        };
    }

    // FORMATTING

    addFormatToken(0, ['gg', 2], 0, function () {
        return this.weekYear() % 100;
    });

    addFormatToken(0, ['GG', 2], 0, function () {
        return this.isoWeekYear() % 100;
    });

    function addWeekYearFormatToken (token, getter) {
        addFormatToken(0, [token, token.length], 0, getter);
    }

    addWeekYearFormatToken('gggg',     'weekYear');
    addWeekYearFormatToken('ggggg',    'weekYear');
    addWeekYearFormatToken('GGGG',  'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

    // ALIASES

    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');

    // PRIORITY

    addUnitPriority('weekYear', 1);
    addUnitPriority('isoWeekYear', 1);


    // PARSING

    addRegexToken('G',      matchSigned);
    addRegexToken('g',      matchSigned);
    addRegexToken('GG',     match1to2, match2);
    addRegexToken('gg',     match1to2, match2);
    addRegexToken('GGGG',   match1to4, match4);
    addRegexToken('gggg',   match1to4, match4);
    addRegexToken('GGGGG',  match1to6, match6);
    addRegexToken('ggggg',  match1to6, match6);

    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
        week[token.substr(0, 2)] = toInt(input);
    });

    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = hooks.parseTwoDigitYear(input);
    });

    // MOMENTS

    function getSetWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input,
                this.week(),
                this.weekday(),
                this.localeData()._week.dow,
                this.localeData()._week.doy);
    }

    function getSetISOWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input, this.isoWeek(), this.isoWeekday(), 1, 4);
    }

    function getISOWeeksInYear () {
        return weeksInYear(this.year(), 1, 4);
    }

    function getWeeksInYear () {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }

    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) {
            return weekOfYear(this, dow, doy).year;
        } else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) {
                week = weeksTarget;
            }
            return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
    }

    function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
    }

    // FORMATTING

    addFormatToken('Q', 0, 'Qo', 'quarter');

    // ALIASES

    addUnitAlias('quarter', 'Q');

    // PRIORITY

    addUnitPriority('quarter', 7);

    // PARSING

    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });

    // MOMENTS

    function getSetQuarter (input) {
        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
    }

    // FORMATTING

    addFormatToken('D', ['DD', 2], 'Do', 'date');

    // ALIASES

    addUnitAlias('date', 'D');

    // PRIORITY
    addUnitPriority('date', 9);

    // PARSING

    addRegexToken('D',  match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function (isStrict, locale) {
        // TODO: Remove "ordinalParse" fallback in next major release.
        return isStrict ?
          (locale._dayOfMonthOrdinalParse || locale._ordinalParse) :
          locale._dayOfMonthOrdinalParseLenient;
    });

    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0]);
    });

    // MOMENTS

    var getSetDayOfMonth = makeGetSet('Date', true);

    // FORMATTING

    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

    // ALIASES

    addUnitAlias('dayOfYear', 'DDD');

    // PRIORITY
    addUnitPriority('dayOfYear', 4);

    // PARSING

    addRegexToken('DDD',  match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
    });

    // HELPERS

    // MOMENTS

    function getSetDayOfYear (input) {
        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
        return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
    }

    // FORMATTING

    addFormatToken('m', ['mm', 2], 0, 'minute');

    // ALIASES

    addUnitAlias('minute', 'm');

    // PRIORITY

    addUnitPriority('minute', 14);

    // PARSING

    addRegexToken('m',  match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);

    // MOMENTS

    var getSetMinute = makeGetSet('Minutes', false);

    // FORMATTING

    addFormatToken('s', ['ss', 2], 0, 'second');

    // ALIASES

    addUnitAlias('second', 's');

    // PRIORITY

    addUnitPriority('second', 15);

    // PARSING

    addRegexToken('s',  match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);

    // MOMENTS

    var getSetSecond = makeGetSet('Seconds', false);

    // FORMATTING

    addFormatToken('S', 0, 0, function () {
        return ~~(this.millisecond() / 100);
    });

    addFormatToken(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
    });

    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
    addFormatToken(0, ['SSSS', 4], 0, function () {
        return this.millisecond() * 10;
    });
    addFormatToken(0, ['SSSSS', 5], 0, function () {
        return this.millisecond() * 100;
    });
    addFormatToken(0, ['SSSSSS', 6], 0, function () {
        return this.millisecond() * 1000;
    });
    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
        return this.millisecond() * 10000;
    });
    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
        return this.millisecond() * 100000;
    });
    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
        return this.millisecond() * 1000000;
    });


    // ALIASES

    addUnitAlias('millisecond', 'ms');

    // PRIORITY

    addUnitPriority('millisecond', 16);

    // PARSING

    addRegexToken('S',    match1to3, match1);
    addRegexToken('SS',   match1to3, match2);
    addRegexToken('SSS',  match1to3, match3);

    var token;
    for (token = 'SSSS'; token.length <= 9; token += 'S') {
        addRegexToken(token, matchUnsigned);
    }

    function parseMs(input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
    }

    for (token = 'S'; token.length <= 9; token += 'S') {
        addParseToken(token, parseMs);
    }
    // MOMENTS

    var getSetMillisecond = makeGetSet('Milliseconds', false);

    // FORMATTING

    addFormatToken('z',  0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');

    // MOMENTS

    function getZoneAbbr () {
        return this._isUTC ? 'UTC' : '';
    }

    function getZoneName () {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }

    var proto = Moment.prototype;

    proto.add               = add;
    proto.calendar          = calendar$1;
    proto.clone             = clone;
    proto.diff              = diff;
    proto.endOf             = endOf;
    proto.format            = format;
    proto.from              = from;
    proto.fromNow           = fromNow;
    proto.to                = to;
    proto.toNow             = toNow;
    proto.get               = stringGet;
    proto.invalidAt         = invalidAt;
    proto.isAfter           = isAfter;
    proto.isBefore          = isBefore;
    proto.isBetween         = isBetween;
    proto.isSame            = isSame;
    proto.isSameOrAfter     = isSameOrAfter;
    proto.isSameOrBefore    = isSameOrBefore;
    proto.isValid           = isValid$2;
    proto.lang              = lang;
    proto.locale            = locale;
    proto.localeData        = localeData;
    proto.max               = prototypeMax;
    proto.min               = prototypeMin;
    proto.parsingFlags      = parsingFlags;
    proto.set               = stringSet;
    proto.startOf           = startOf;
    proto.subtract          = subtract;
    proto.toArray           = toArray;
    proto.toObject          = toObject;
    proto.toDate            = toDate;
    proto.toISOString       = toISOString;
    proto.inspect           = inspect;
    proto.toJSON            = toJSON;
    proto.toString          = toString;
    proto.unix              = unix;
    proto.valueOf           = valueOf;
    proto.creationData      = creationData;
    proto.year       = getSetYear;
    proto.isLeapYear = getIsLeapYear;
    proto.weekYear    = getSetWeekYear;
    proto.isoWeekYear = getSetISOWeekYear;
    proto.quarter = proto.quarters = getSetQuarter;
    proto.month       = getSetMonth;
    proto.daysInMonth = getDaysInMonth;
    proto.week           = proto.weeks        = getSetWeek;
    proto.isoWeek        = proto.isoWeeks     = getSetISOWeek;
    proto.weeksInYear    = getWeeksInYear;
    proto.isoWeeksInYear = getISOWeeksInYear;
    proto.date       = getSetDayOfMonth;
    proto.day        = proto.days             = getSetDayOfWeek;
    proto.weekday    = getSetLocaleDayOfWeek;
    proto.isoWeekday = getSetISODayOfWeek;
    proto.dayOfYear  = getSetDayOfYear;
    proto.hour = proto.hours = getSetHour;
    proto.minute = proto.minutes = getSetMinute;
    proto.second = proto.seconds = getSetSecond;
    proto.millisecond = proto.milliseconds = getSetMillisecond;
    proto.utcOffset            = getSetOffset;
    proto.utc                  = setOffsetToUTC;
    proto.local                = setOffsetToLocal;
    proto.parseZone            = setOffsetToParsedOffset;
    proto.hasAlignedHourOffset = hasAlignedHourOffset;
    proto.isDST                = isDaylightSavingTime;
    proto.isLocal              = isLocal;
    proto.isUtcOffset          = isUtcOffset;
    proto.isUtc                = isUtc;
    proto.isUTC                = isUtc;
    proto.zoneAbbr = getZoneAbbr;
    proto.zoneName = getZoneName;
    proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
    proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
    proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
    proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
    proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

    function createUnix (input) {
        return createLocal(input * 1000);
    }

    function createInZone () {
        return createLocal.apply(null, arguments).parseZone();
    }

    function preParsePostFormat (string) {
        return string;
    }

    var proto$1 = Locale.prototype;

    proto$1.calendar        = calendar;
    proto$1.longDateFormat  = longDateFormat;
    proto$1.invalidDate     = invalidDate;
    proto$1.ordinal         = ordinal;
    proto$1.preparse        = preParsePostFormat;
    proto$1.postformat      = preParsePostFormat;
    proto$1.relativeTime    = relativeTime;
    proto$1.pastFuture      = pastFuture;
    proto$1.set             = set;

    proto$1.months            =        localeMonths;
    proto$1.monthsShort       =        localeMonthsShort;
    proto$1.monthsParse       =        localeMonthsParse;
    proto$1.monthsRegex       = monthsRegex;
    proto$1.monthsShortRegex  = monthsShortRegex;
    proto$1.week = localeWeek;
    proto$1.firstDayOfYear = localeFirstDayOfYear;
    proto$1.firstDayOfWeek = localeFirstDayOfWeek;

    proto$1.weekdays       =        localeWeekdays;
    proto$1.weekdaysMin    =        localeWeekdaysMin;
    proto$1.weekdaysShort  =        localeWeekdaysShort;
    proto$1.weekdaysParse  =        localeWeekdaysParse;

    proto$1.weekdaysRegex       =        weekdaysRegex;
    proto$1.weekdaysShortRegex  =        weekdaysShortRegex;
    proto$1.weekdaysMinRegex    =        weekdaysMinRegex;

    proto$1.isPM = localeIsPM;
    proto$1.meridiem = localeMeridiem;

    function get$1 (format, index, field, setter) {
        var locale = getLocale();
        var utc = createUTC().set(setter, index);
        return locale[field](utc, format);
    }

    function listMonthsImpl (format, index, field) {
        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';

        if (index != null) {
            return get$1(format, index, field, 'month');
        }

        var i;
        var out = [];
        for (i = 0; i < 12; i++) {
            out[i] = get$1(format, i, field, 'month');
        }
        return out;
    }

    // ()
    // (5)
    // (fmt, 5)
    // (fmt)
    // (true)
    // (true, 5)
    // (true, fmt, 5)
    // (true, fmt)
    function listWeekdaysImpl (localeSorted, format, index, field) {
        if (typeof localeSorted === 'boolean') {
            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        } else {
            format = localeSorted;
            index = format;
            localeSorted = false;

            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        }

        var locale = getLocale(),
            shift = localeSorted ? locale._week.dow : 0;

        if (index != null) {
            return get$1(format, (index + shift) % 7, field, 'day');
        }

        var i;
        var out = [];
        for (i = 0; i < 7; i++) {
            out[i] = get$1(format, (i + shift) % 7, field, 'day');
        }
        return out;
    }

    function listMonths (format, index) {
        return listMonthsImpl(format, index, 'months');
    }

    function listMonthsShort (format, index) {
        return listMonthsImpl(format, index, 'monthsShort');
    }

    function listWeekdays (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
    }

    function listWeekdaysShort (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
    }

    function listWeekdaysMin (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
    }

    getSetGlobalLocale('en', {
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    // Side effect imports

    hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
    hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);

    var mathAbs = Math.abs;

    function abs () {
        var data           = this._data;

        this._milliseconds = mathAbs(this._milliseconds);
        this._days         = mathAbs(this._days);
        this._months       = mathAbs(this._months);

        data.milliseconds  = mathAbs(data.milliseconds);
        data.seconds       = mathAbs(data.seconds);
        data.minutes       = mathAbs(data.minutes);
        data.hours         = mathAbs(data.hours);
        data.months        = mathAbs(data.months);
        data.years         = mathAbs(data.years);

        return this;
    }

    function addSubtract$1 (duration, input, value, direction) {
        var other = createDuration(input, value);

        duration._milliseconds += direction * other._milliseconds;
        duration._days         += direction * other._days;
        duration._months       += direction * other._months;

        return duration._bubble();
    }

    // supports only 2.0-style add(1, 's') or add(duration)
    function add$1 (input, value) {
        return addSubtract$1(this, input, value, 1);
    }

    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function subtract$1 (input, value) {
        return addSubtract$1(this, input, value, -1);
    }

    function absCeil (number) {
        if (number < 0) {
            return Math.floor(number);
        } else {
            return Math.ceil(number);
        }
    }

    function bubble () {
        var milliseconds = this._milliseconds;
        var days         = this._days;
        var months       = this._months;
        var data         = this._data;
        var seconds, minutes, hours, years, monthsFromDays;

        // if we have a mix of positive and negative values, bubble down first
        // check: https://github.com/moment/moment/issues/2166
        if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
                (milliseconds <= 0 && days <= 0 && months <= 0))) {
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
            days = 0;
            months = 0;
        }

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;

        seconds           = absFloor(milliseconds / 1000);
        data.seconds      = seconds % 60;

        minutes           = absFloor(seconds / 60);
        data.minutes      = minutes % 60;

        hours             = absFloor(minutes / 60);
        data.hours        = hours % 24;

        days += absFloor(hours / 24);

        // convert days to months
        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        data.days   = days;
        data.months = months;
        data.years  = years;

        return this;
    }

    function daysToMonths (days) {
        // 400 years have 146097 days (taking into account leap year rules)
        // 400 years have 12 months === 4800
        return days * 4800 / 146097;
    }

    function monthsToDays (months) {
        // the reverse of daysToMonths
        return months * 146097 / 4800;
    }

    function as (units) {
        if (!this.isValid()) {
            return NaN;
        }
        var days;
        var months;
        var milliseconds = this._milliseconds;

        units = normalizeUnits(units);

        if (units === 'month' || units === 'quarter' || units === 'year') {
            days = this._days + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            switch (units) {
                case 'month':   return months;
                case 'quarter': return months / 3;
                case 'year':    return months / 12;
            }
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
                case 'week'   : return days / 7     + milliseconds / 6048e5;
                case 'day'    : return days         + milliseconds / 864e5;
                case 'hour'   : return days * 24    + milliseconds / 36e5;
                case 'minute' : return days * 1440  + milliseconds / 6e4;
                case 'second' : return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
                default: throw new Error('Unknown unit ' + units);
            }
        }
    }

    // TODO: Use this.as('ms')?
    function valueOf$1 () {
        if (!this.isValid()) {
            return NaN;
        }
        return (
            this._milliseconds +
            this._days * 864e5 +
            (this._months % 12) * 2592e6 +
            toInt(this._months / 12) * 31536e6
        );
    }

    function makeAs (alias) {
        return function () {
            return this.as(alias);
        };
    }

    var asMilliseconds = makeAs('ms');
    var asSeconds      = makeAs('s');
    var asMinutes      = makeAs('m');
    var asHours        = makeAs('h');
    var asDays         = makeAs('d');
    var asWeeks        = makeAs('w');
    var asMonths       = makeAs('M');
    var asQuarters     = makeAs('Q');
    var asYears        = makeAs('y');

    function clone$1 () {
        return createDuration(this);
    }

    function get$2 (units) {
        units = normalizeUnits(units);
        return this.isValid() ? this[units + 's']() : NaN;
    }

    function makeGetter(name) {
        return function () {
            return this.isValid() ? this._data[name] : NaN;
        };
    }

    var milliseconds = makeGetter('milliseconds');
    var seconds      = makeGetter('seconds');
    var minutes      = makeGetter('minutes');
    var hours        = makeGetter('hours');
    var days         = makeGetter('days');
    var months       = makeGetter('months');
    var years        = makeGetter('years');

    function weeks () {
        return absFloor(this.days() / 7);
    }

    var round = Math.round;
    var thresholds = {
        ss: 44,         // a few seconds to seconds
        s : 45,         // seconds to minute
        m : 45,         // minutes to hour
        h : 22,         // hours to day
        d : 26,         // days to month
        M : 11          // months to year
    };

    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime$1 (posNegDuration, withoutSuffix, locale) {
        var duration = createDuration(posNegDuration).abs();
        var seconds  = round(duration.as('s'));
        var minutes  = round(duration.as('m'));
        var hours    = round(duration.as('h'));
        var days     = round(duration.as('d'));
        var months   = round(duration.as('M'));
        var years    = round(duration.as('y'));

        var a = seconds <= thresholds.ss && ['s', seconds]  ||
                seconds < thresholds.s   && ['ss', seconds] ||
                minutes <= 1             && ['m']           ||
                minutes < thresholds.m   && ['mm', minutes] ||
                hours   <= 1             && ['h']           ||
                hours   < thresholds.h   && ['hh', hours]   ||
                days    <= 1             && ['d']           ||
                days    < thresholds.d   && ['dd', days]    ||
                months  <= 1             && ['M']           ||
                months  < thresholds.M   && ['MM', months]  ||
                years   <= 1             && ['y']           || ['yy', years];

        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }

    // This function allows you to set the rounding function for relative time strings
    function getSetRelativeTimeRounding (roundingFunction) {
        if (roundingFunction === undefined) {
            return round;
        }
        if (typeof(roundingFunction) === 'function') {
            round = roundingFunction;
            return true;
        }
        return false;
    }

    // This function allows you to set a threshold for relative time strings
    function getSetRelativeTimeThreshold (threshold, limit) {
        if (thresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        if (threshold === 's') {
            thresholds.ss = limit - 1;
        }
        return true;
    }

    function humanize (withSuffix) {
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var locale = this.localeData();
        var output = relativeTime$1(this, !withSuffix, locale);

        if (withSuffix) {
            output = locale.pastFuture(+this, output);
        }

        return locale.postformat(output);
    }

    var abs$1 = Math.abs;

    function sign(x) {
        return ((x > 0) - (x < 0)) || +x;
    }

    function toISOString$1() {
        // for ISO strings we do not use the normal bubbling rules:
        //  * milliseconds bubble up until they become hours
        //  * days do not bubble at all
        //  * months bubble up until they become years
        // This is because there is no context-free conversion between hours and days
        // (think of clock changes)
        // and also not between days and months (28-31 days per month)
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var seconds = abs$1(this._milliseconds) / 1000;
        var days         = abs$1(this._days);
        var months       = abs$1(this._months);
        var minutes, hours, years;

        // 3600 seconds -> 60 minutes -> 1 hour
        minutes           = absFloor(seconds / 60);
        hours             = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;

        // 12 months -> 1 year
        years  = absFloor(months / 12);
        months %= 12;


        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        var Y = years;
        var M = months;
        var D = days;
        var h = hours;
        var m = minutes;
        var s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';
        var total = this.asSeconds();

        if (!total) {
            // this is the same as C#'s (Noda) and python (isodate)...
            // but not other JS (goog.date)
            return 'P0D';
        }

        var totalSign = total < 0 ? '-' : '';
        var ymSign = sign(this._months) !== sign(total) ? '-' : '';
        var daysSign = sign(this._days) !== sign(total) ? '-' : '';
        var hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';

        return totalSign + 'P' +
            (Y ? ymSign + Y + 'Y' : '') +
            (M ? ymSign + M + 'M' : '') +
            (D ? daysSign + D + 'D' : '') +
            ((h || m || s) ? 'T' : '') +
            (h ? hmsSign + h + 'H' : '') +
            (m ? hmsSign + m + 'M' : '') +
            (s ? hmsSign + s + 'S' : '');
    }

    var proto$2 = Duration.prototype;

    proto$2.isValid        = isValid$1;
    proto$2.abs            = abs;
    proto$2.add            = add$1;
    proto$2.subtract       = subtract$1;
    proto$2.as             = as;
    proto$2.asMilliseconds = asMilliseconds;
    proto$2.asSeconds      = asSeconds;
    proto$2.asMinutes      = asMinutes;
    proto$2.asHours        = asHours;
    proto$2.asDays         = asDays;
    proto$2.asWeeks        = asWeeks;
    proto$2.asMonths       = asMonths;
    proto$2.asQuarters     = asQuarters;
    proto$2.asYears        = asYears;
    proto$2.valueOf        = valueOf$1;
    proto$2._bubble        = bubble;
    proto$2.clone          = clone$1;
    proto$2.get            = get$2;
    proto$2.milliseconds   = milliseconds;
    proto$2.seconds        = seconds;
    proto$2.minutes        = minutes;
    proto$2.hours          = hours;
    proto$2.days           = days;
    proto$2.weeks          = weeks;
    proto$2.months         = months;
    proto$2.years          = years;
    proto$2.humanize       = humanize;
    proto$2.toISOString    = toISOString$1;
    proto$2.toString       = toISOString$1;
    proto$2.toJSON         = toISOString$1;
    proto$2.locale         = locale;
    proto$2.localeData     = localeData;

    proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
    proto$2.lang = lang;

    // Side effect imports

    // FORMATTING

    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');

    // PARSING

    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input, 10) * 1000);
    });
    addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
    });

    // Side effect imports


    hooks.version = '2.24.0';

    setHookCallback(createLocal);

    hooks.fn                    = proto;
    hooks.min                   = min;
    hooks.max                   = max;
    hooks.now                   = now;
    hooks.utc                   = createUTC;
    hooks.unix                  = createUnix;
    hooks.months                = listMonths;
    hooks.isDate                = isDate;
    hooks.locale                = getSetGlobalLocale;
    hooks.invalid               = createInvalid;
    hooks.duration              = createDuration;
    hooks.isMoment              = isMoment;
    hooks.weekdays              = listWeekdays;
    hooks.parseZone             = createInZone;
    hooks.localeData            = getLocale;
    hooks.isDuration            = isDuration;
    hooks.monthsShort           = listMonthsShort;
    hooks.weekdaysMin           = listWeekdaysMin;
    hooks.defineLocale          = defineLocale;
    hooks.updateLocale          = updateLocale;
    hooks.locales               = listLocales;
    hooks.weekdaysShort         = listWeekdaysShort;
    hooks.normalizeUnits        = normalizeUnits;
    hooks.relativeTimeRounding  = getSetRelativeTimeRounding;
    hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
    hooks.calendarFormat        = getCalendarFormat;
    hooks.prototype             = proto;

    // currently HTML5 input type only supports 24-hour formats
    hooks.HTML5_FMT = {
        DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm',             // <input type="datetime-local" />
        DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss',  // <input type="datetime-local" step="1" />
        DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS',   // <input type="datetime-local" step="0.001" />
        DATE: 'YYYY-MM-DD',                             // <input type="date" />
        TIME: 'HH:mm',                                  // <input type="time" />
        TIME_SECONDS: 'HH:mm:ss',                       // <input type="time" step="1" />
        TIME_MS: 'HH:mm:ss.SSS',                        // <input type="time" step="0.001" />
        WEEK: 'GGGG-[W]WW',                             // <input type="week" />
        MONTH: 'YYYY-MM'                                // <input type="month" />
    };

    return hooks;

})));
});

function usStats(data) {
  return parseStats(data.data[0]);
}

function stateStats(state, data) {
  const stateRawData = data.data.find((d) => d.State === state);
  console.log(stateRawData);

  return parseStats(stateRawData);
}

function parseStats(rawStats) {
  return {
    idNation: format.string(rawStats["ID Nation"]),
    nation: format.string(rawStats.Nation),
    idYear: format.string(rawStats["ID Year"]),
    year: rawStats.Year,
    population: format.number(rawStats.Population),
    slugNation: format.string(rawStats["Slug Nation"])
  };
}

var parsers = {
  usStats,
  stateStats,
};

async function usStats$1() {
  const response = await axios$1.get(
    'https://datausa.io/api/data?drilldowns=Nation&measures=Population&year=latest'
  );

  return parsers.usStats(response.data);
}

async function stateStats$1(state) {
  const response = await axios$1.get(
    'https://datausa.io/api/data?drilldowns=State&measures=Population&year=latest'
  );

  return parsers.stateStats(state, response.data);
}

var requests = {
  usStats: usStats$1,
  stateStats: stateStats$1,
};

/* src/components/PopulationStat.svelte generated by Svelte v3.20.1 */

const file = "src/components/PopulationStat.svelte";

function create_fragment(ctx) {
	let div2;
	let div1;
	let div0;
	let h20;
	let b0;
	let t0;
	let t1;
	let t2;
	let t3;
	let h21;
	let b1;
	let t4;
	let t5;
	let t6;
	let t7;
	let h22;
	let b2;
	let t8;
	let t9;
	let t10;
	let t11;
	let h23;
	let b3;
	let t12;
	let t13;
	let t14;
	let t15;
	let h24;
	let b4;
	let t16;
	let t17;
	let t18;
	let t19;
	let h25;
	let b5;
	let t20;
	let t21;
	let t22;

	const block = {
		c: function create() {
			div2 = element("div");
			div1 = element("div");
			div0 = element("div");
			h20 = element("h2");
			b0 = element("b");
			t0 = text("ID Nation:");
			t1 = space();
			t2 = text(/*idNation*/ ctx[0]);
			t3 = space();
			h21 = element("h2");
			b1 = element("b");
			t4 = text("Nation:");
			t5 = space();
			t6 = text(/*nation*/ ctx[1]);
			t7 = space();
			h22 = element("h2");
			b2 = element("b");
			t8 = text("ID Year:");
			t9 = space();
			t10 = text(/*idYear*/ ctx[2]);
			t11 = space();
			h23 = element("h2");
			b3 = element("b");
			t12 = text("Year:");
			t13 = space();
			t14 = text(/*year*/ ctx[3]);
			t15 = space();
			h24 = element("h2");
			b4 = element("b");
			t16 = text("Population:");
			t17 = space();
			t18 = text(/*population*/ ctx[4]);
			t19 = space();
			h25 = element("h2");
			b5 = element("b");
			t20 = text("Slug Nation:");
			t21 = space();
			t22 = text(/*slugNation*/ ctx[5]);
			this.h();
		},
		l: function claim(nodes) {
			div2 = claim_element(nodes, "DIV", { class: true });
			var div2_nodes = children(div2);
			div1 = claim_element(div2_nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			div0 = claim_element(div1_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			h20 = claim_element(div0_nodes, "H2", { class: true });
			var h20_nodes = children(h20);
			b0 = claim_element(h20_nodes, "B", {});
			var b0_nodes = children(b0);
			t0 = claim_text(b0_nodes, "ID Nation:");
			b0_nodes.forEach(detach_dev);
			t1 = claim_space(h20_nodes);
			t2 = claim_text(h20_nodes, /*idNation*/ ctx[0]);
			h20_nodes.forEach(detach_dev);
			t3 = claim_space(div0_nodes);
			h21 = claim_element(div0_nodes, "H2", { class: true });
			var h21_nodes = children(h21);
			b1 = claim_element(h21_nodes, "B", {});
			var b1_nodes = children(b1);
			t4 = claim_text(b1_nodes, "Nation:");
			b1_nodes.forEach(detach_dev);
			t5 = claim_space(h21_nodes);
			t6 = claim_text(h21_nodes, /*nation*/ ctx[1]);
			h21_nodes.forEach(detach_dev);
			t7 = claim_space(div0_nodes);
			h22 = claim_element(div0_nodes, "H2", { class: true });
			var h22_nodes = children(h22);
			b2 = claim_element(h22_nodes, "B", {});
			var b2_nodes = children(b2);
			t8 = claim_text(b2_nodes, "ID Year:");
			b2_nodes.forEach(detach_dev);
			t9 = claim_space(h22_nodes);
			t10 = claim_text(h22_nodes, /*idYear*/ ctx[2]);
			h22_nodes.forEach(detach_dev);
			t11 = claim_space(div0_nodes);
			h23 = claim_element(div0_nodes, "H2", { class: true });
			var h23_nodes = children(h23);
			b3 = claim_element(h23_nodes, "B", {});
			var b3_nodes = children(b3);
			t12 = claim_text(b3_nodes, "Year:");
			b3_nodes.forEach(detach_dev);
			t13 = claim_space(h23_nodes);
			t14 = claim_text(h23_nodes, /*year*/ ctx[3]);
			h23_nodes.forEach(detach_dev);
			t15 = claim_space(div0_nodes);
			h24 = claim_element(div0_nodes, "H2", { class: true });
			var h24_nodes = children(h24);
			b4 = claim_element(h24_nodes, "B", {});
			var b4_nodes = children(b4);
			t16 = claim_text(b4_nodes, "Population:");
			b4_nodes.forEach(detach_dev);
			t17 = claim_space(h24_nodes);
			t18 = claim_text(h24_nodes, /*population*/ ctx[4]);
			h24_nodes.forEach(detach_dev);
			t19 = claim_space(div0_nodes);
			h25 = claim_element(div0_nodes, "H2", { class: true });
			var h25_nodes = children(h25);
			b5 = claim_element(h25_nodes, "B", {});
			var b5_nodes = children(b5);
			t20 = claim_text(b5_nodes, "Slug Nation:");
			b5_nodes.forEach(detach_dev);
			t21 = claim_space(h25_nodes);
			t22 = claim_text(h25_nodes, /*slugNation*/ ctx[5]);
			h25_nodes.forEach(detach_dev);
			div0_nodes.forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			div2_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(b0, file, 18, 30, 322);
			attr_dev(h20, "class", "is-2 column");
			add_location(h20, file, 18, 6, 298);
			add_location(b1, file, 19, 30, 386);
			attr_dev(h21, "class", "is-2 column");
			add_location(h21, file, 19, 6, 362);
			add_location(b2, file, 20, 30, 445);
			attr_dev(h22, "class", "is-2 column");
			add_location(h22, file, 20, 6, 421);
			add_location(b3, file, 21, 30, 505);
			attr_dev(h23, "class", "is-2 column");
			add_location(h23, file, 21, 6, 481);
			add_location(b4, file, 22, 30, 560);
			attr_dev(h24, "class", "is-2 column");
			add_location(h24, file, 22, 6, 536);
			add_location(b5, file, 23, 30, 627);
			attr_dev(h25, "class", "is-2 column");
			add_location(h25, file, 23, 6, 603);
			attr_dev(div0, "class", "columns svelte-adsnw4");
			add_location(div0, file, 17, 4, 270);
			attr_dev(div1, "class", "container");
			add_location(div1, file, 16, 2, 242);
			attr_dev(div2, "class", "section");
			add_location(div2, file, 15, 0, 218);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div2, anchor);
			append_dev(div2, div1);
			append_dev(div1, div0);
			append_dev(div0, h20);
			append_dev(h20, b0);
			append_dev(b0, t0);
			append_dev(h20, t1);
			append_dev(h20, t2);
			append_dev(div0, t3);
			append_dev(div0, h21);
			append_dev(h21, b1);
			append_dev(b1, t4);
			append_dev(h21, t5);
			append_dev(h21, t6);
			append_dev(div0, t7);
			append_dev(div0, h22);
			append_dev(h22, b2);
			append_dev(b2, t8);
			append_dev(h22, t9);
			append_dev(h22, t10);
			append_dev(div0, t11);
			append_dev(div0, h23);
			append_dev(h23, b3);
			append_dev(b3, t12);
			append_dev(h23, t13);
			append_dev(h23, t14);
			append_dev(div0, t15);
			append_dev(div0, h24);
			append_dev(h24, b4);
			append_dev(b4, t16);
			append_dev(h24, t17);
			append_dev(h24, t18);
			append_dev(div0, t19);
			append_dev(div0, h25);
			append_dev(h25, b5);
			append_dev(b5, t20);
			append_dev(h25, t21);
			append_dev(h25, t22);
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*idNation*/ 1) set_data_dev(t2, /*idNation*/ ctx[0]);
			if (dirty & /*nation*/ 2) set_data_dev(t6, /*nation*/ ctx[1]);
			if (dirty & /*idYear*/ 4) set_data_dev(t10, /*idYear*/ ctx[2]);
			if (dirty & /*year*/ 8) set_data_dev(t14, /*year*/ ctx[3]);
			if (dirty & /*population*/ 16) set_data_dev(t18, /*population*/ ctx[4]);
			if (dirty & /*slugNation*/ 32) set_data_dev(t22, /*slugNation*/ ctx[5]);
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div2);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { idNation } = $$props;
	let { nation } = $$props;
	let { idYear } = $$props;
	let { year } = $$props;
	let { population } = $$props;
	let { slugNation } = $$props;
	const writable_props = ["idNation", "nation", "idYear", "year", "population", "slugNation"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<PopulationStat> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("PopulationStat", $$slots, []);

	$$self.$set = $$props => {
		if ("idNation" in $$props) $$invalidate(0, idNation = $$props.idNation);
		if ("nation" in $$props) $$invalidate(1, nation = $$props.nation);
		if ("idYear" in $$props) $$invalidate(2, idYear = $$props.idYear);
		if ("year" in $$props) $$invalidate(3, year = $$props.year);
		if ("population" in $$props) $$invalidate(4, population = $$props.population);
		if ("slugNation" in $$props) $$invalidate(5, slugNation = $$props.slugNation);
	};

	$$self.$capture_state = () => ({
		idNation,
		nation,
		idYear,
		year,
		population,
		slugNation
	});

	$$self.$inject_state = $$props => {
		if ("idNation" in $$props) $$invalidate(0, idNation = $$props.idNation);
		if ("nation" in $$props) $$invalidate(1, nation = $$props.nation);
		if ("idYear" in $$props) $$invalidate(2, idYear = $$props.idYear);
		if ("year" in $$props) $$invalidate(3, year = $$props.year);
		if ("population" in $$props) $$invalidate(4, population = $$props.population);
		if ("slugNation" in $$props) $$invalidate(5, slugNation = $$props.slugNation);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [idNation, nation, idYear, year, population, slugNation];
}

class PopulationStat extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance, create_fragment, safe_not_equal, {
			idNation: 0,
			nation: 1,
			idYear: 2,
			year: 3,
			population: 4,
			slugNation: 5
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "PopulationStat",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*idNation*/ ctx[0] === undefined && !("idNation" in props)) {
			console.warn("<PopulationStat> was created without expected prop 'idNation'");
		}

		if (/*nation*/ ctx[1] === undefined && !("nation" in props)) {
			console.warn("<PopulationStat> was created without expected prop 'nation'");
		}

		if (/*idYear*/ ctx[2] === undefined && !("idYear" in props)) {
			console.warn("<PopulationStat> was created without expected prop 'idYear'");
		}

		if (/*year*/ ctx[3] === undefined && !("year" in props)) {
			console.warn("<PopulationStat> was created without expected prop 'year'");
		}

		if (/*population*/ ctx[4] === undefined && !("population" in props)) {
			console.warn("<PopulationStat> was created without expected prop 'population'");
		}

		if (/*slugNation*/ ctx[5] === undefined && !("slugNation" in props)) {
			console.warn("<PopulationStat> was created without expected prop 'slugNation'");
		}
	}

	get idNation() {
		throw new Error("<PopulationStat>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set idNation(value) {
		throw new Error("<PopulationStat>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get nation() {
		throw new Error("<PopulationStat>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set nation(value) {
		throw new Error("<PopulationStat>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get idYear() {
		throw new Error("<PopulationStat>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set idYear(value) {
		throw new Error("<PopulationStat>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get year() {
		throw new Error("<PopulationStat>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set year(value) {
		throw new Error("<PopulationStat>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get population() {
		throw new Error("<PopulationStat>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set population(value) {
		throw new Error("<PopulationStat>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get slugNation() {
		throw new Error("<PopulationStat>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set slugNation(value) {
		throw new Error("<PopulationStat>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/components/TableFilter.svelte generated by Svelte v3.20.1 */

const file$1 = "src/components/TableFilter.svelte";

function create_fragment$1(ctx) {
	let h1;
	let t;

	const block = {
		c: function create() {
			h1 = element("h1");
			t = text("Table Filter");
			this.h();
		},
		l: function claim(nodes) {
			h1 = claim_element(nodes, "H1", {});
			var h1_nodes = children(h1);
			t = claim_text(h1_nodes, "Table Filter");
			h1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(h1, file$1, 0, 0, 0);
		},
		m: function mount(target, anchor) {
			insert_dev(target, h1, anchor);
			append_dev(h1, t);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(h1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1($$self, $$props) {
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<TableFilter> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("TableFilter", $$slots, []);
	return [];
}

class TableFilter extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "TableFilter",
			options,
			id: create_fragment$1.name
		});
	}
}

/* src/components/Table.svelte generated by Svelte v3.20.1 */

const file$2 = "src/components/Table.svelte";

function create_fragment$2(ctx) {
	let h1;
	let t;

	const block = {
		c: function create() {
			h1 = element("h1");
			t = text("Table");
			this.h();
		},
		l: function claim(nodes) {
			h1 = claim_element(nodes, "H1", {});
			var h1_nodes = children(h1);
			t = claim_text(h1_nodes, "Table");
			h1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(h1, file$2, 0, 0, 0);
		},
		m: function mount(target, anchor) {
			insert_dev(target, h1, anchor);
			append_dev(h1, t);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(h1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2($$self, $$props) {
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Table> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("Table", $$slots, []);
	return [];
}

class Table extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Table",
			options,
			id: create_fragment$2.name
		});
	}
}

/* src/components/TableContainer.svelte generated by Svelte v3.20.1 */
const file$3 = "src/components/TableContainer.svelte";

function create_fragment$3(ctx) {
	let h1;
	let t0;
	let t1;
	let t2;
	let current;
	const tablefilter = new TableFilter({ $$inline: true });
	const table = new Table({ $$inline: true });

	const block = {
		c: function create() {
			h1 = element("h1");
			t0 = text("Table Container");
			t1 = space();
			create_component(tablefilter.$$.fragment);
			t2 = space();
			create_component(table.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			h1 = claim_element(nodes, "H1", {});
			var h1_nodes = children(h1);
			t0 = claim_text(h1_nodes, "Table Container");
			h1_nodes.forEach(detach_dev);
			t1 = claim_space(nodes);
			claim_component(tablefilter.$$.fragment, nodes);
			t2 = claim_space(nodes);
			claim_component(table.$$.fragment, nodes);
			this.h();
		},
		h: function hydrate() {
			add_location(h1, file$3, 5, 0, 108);
		},
		m: function mount(target, anchor) {
			insert_dev(target, h1, anchor);
			append_dev(h1, t0);
			insert_dev(target, t1, anchor);
			mount_component(tablefilter, target, anchor);
			insert_dev(target, t2, anchor);
			mount_component(table, target, anchor);
			current = true;
		},
		p: noop,
		i: function intro(local) {
			if (current) return;
			transition_in(tablefilter.$$.fragment, local);
			transition_in(table.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(tablefilter.$$.fragment, local);
			transition_out(table.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(h1);
			if (detaching) detach_dev(t1);
			destroy_component(tablefilter, detaching);
			if (detaching) detach_dev(t2);
			destroy_component(table, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3($$self, $$props, $$invalidate) {
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<TableContainer> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("TableContainer", $$slots, []);
	$$self.$capture_state = () => ({ TableFilter, Table });
	return [];
}

class TableContainer extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "TableContainer",
			options,
			id: create_fragment$3.name
		});
	}
}

export { PopulationStat as P, TableContainer as T, requests as r };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFibGVDb250YWluZXIuZGYwMjk1YmIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9iaW5kLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi91dGlscy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idWlsZFVSTC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvdHJhbnNmb3JtRGF0YS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZW5oYW5jZUVycm9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2NyZWF0ZUVycm9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3NldHRsZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2J1aWxkRnVsbFBhdGguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VIZWFkZXJzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2Rpc3BhdGNoUmVxdWVzdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9tZXJnZUNvbmZpZy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvcy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvaW5kZXguanMiLCIuLi8uLi8uLi9zcmMvZGF0YS9mb3JtYXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbW9tZW50L21vbWVudC5qcyIsIi4uLy4uLy4uL3NyYy9kYXRhL3BhcnNlcnMuanMiLCIuLi8uLi8uLi9zcmMvZGF0YS9yZXF1ZXN0cy5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1BvcHVsYXRpb25TdGF0LnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcCgpIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcblxuLypnbG9iYWwgdG9TdHJpbmc6dHJ1ZSovXG5cbi8vIHV0aWxzIGlzIGEgbGlicmFyeSBvZiBnZW5lcmljIGhlbHBlciBmdW5jdGlvbnMgbm9uLXNwZWNpZmljIHRvIGF4aW9zXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXkodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgdW5kZWZpbmVkXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIHVuZGVmaW5lZCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQnVmZmVyKHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmICFpc1VuZGVmaW5lZCh2YWwpICYmIHZhbC5jb25zdHJ1Y3RvciAhPT0gbnVsbCAmJiAhaXNVbmRlZmluZWQodmFsLmNvbnN0cnVjdG9yKVxuICAgICYmIHR5cGVvZiB2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIgPT09ICdmdW5jdGlvbicgJiYgdmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyKHZhbCk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXIodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5QnVmZmVyXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEZvcm1EYXRhLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGb3JtRGF0YSh2YWwpIHtcbiAgcmV0dXJuICh0eXBlb2YgRm9ybURhdGEgIT09ICd1bmRlZmluZWQnKSAmJiAodmFsIGluc3RhbmNlb2YgRm9ybURhdGEpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXJWaWV3KHZhbCkge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcpICYmIChBcnJheUJ1ZmZlci5pc1ZpZXcpKSB7XG4gICAgcmVzdWx0ID0gQXJyYXlCdWZmZXIuaXNWaWV3KHZhbCk7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gKHZhbCkgJiYgKHZhbC5idWZmZXIpICYmICh2YWwuYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJpbmdcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmluZywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaW5nKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZyc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBOdW1iZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIE51bWJlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTnVtYmVyKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ251bWJlcic7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBEYXRlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBEYXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNEYXRlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBEYXRlXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGaWxlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGaWxlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGaWxlXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCbG9iXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCbG9iLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNCbG9iKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBCbG9iXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRnVuY3Rpb24sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyZWFtXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJlYW0sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmVhbSh2YWwpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHZhbCkgJiYgaXNGdW5jdGlvbih2YWwucGlwZSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNVUkxTZWFyY2hQYXJhbXModmFsKSB7XG4gIHJldHVybiB0eXBlb2YgVVJMU2VhcmNoUGFyYW1zICE9PSAndW5kZWZpbmVkJyAmJiB2YWwgaW5zdGFuY2VvZiBVUkxTZWFyY2hQYXJhbXM7XG59XG5cbi8qKlxuICogVHJpbSBleGNlc3Mgd2hpdGVzcGFjZSBvZmYgdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgU3RyaW5nIHRvIHRyaW1cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBTdHJpbmcgZnJlZWQgb2YgZXhjZXNzIHdoaXRlc3BhY2VcbiAqL1xuZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzKi8sICcnKS5yZXBsYWNlKC9cXHMqJC8sICcnKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgd2UncmUgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnRcbiAqXG4gKiBUaGlzIGFsbG93cyBheGlvcyB0byBydW4gaW4gYSB3ZWIgd29ya2VyLCBhbmQgcmVhY3QtbmF0aXZlLlxuICogQm90aCBlbnZpcm9ubWVudHMgc3VwcG9ydCBYTUxIdHRwUmVxdWVzdCwgYnV0IG5vdCBmdWxseSBzdGFuZGFyZCBnbG9iYWxzLlxuICpcbiAqIHdlYiB3b3JrZXJzOlxuICogIHR5cGVvZiB3aW5kb3cgLT4gdW5kZWZpbmVkXG4gKiAgdHlwZW9mIGRvY3VtZW50IC0+IHVuZGVmaW5lZFxuICpcbiAqIHJlYWN0LW5hdGl2ZTpcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnUmVhY3ROYXRpdmUnXG4gKiBuYXRpdmVzY3JpcHRcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnTmF0aXZlU2NyaXB0JyBvciAnTlMnXG4gKi9cbmZ1bmN0aW9uIGlzU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgKG5hdmlnYXRvci5wcm9kdWN0ID09PSAnUmVhY3ROYXRpdmUnIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdOYXRpdmVTY3JpcHQnIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdOUycpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnXG4gICk7XG59XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFuIEFycmF5IG9yIGFuIE9iamVjdCBpbnZva2luZyBhIGZ1bmN0aW9uIGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgYG9iamAgaXMgYW4gQXJyYXkgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBpbmRleCwgYW5kIGNvbXBsZXRlIGFycmF5IGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgJ29iaicgaXMgYW4gT2JqZWN0IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwga2V5LCBhbmQgY29tcGxldGUgb2JqZWN0IGZvciBlYWNoIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBvYmogVGhlIG9iamVjdCB0byBpdGVyYXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgY2FsbGJhY2sgdG8gaW52b2tlIGZvciBlYWNoIGl0ZW1cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaChvYmosIGZuKSB7XG4gIC8vIERvbid0IGJvdGhlciBpZiBubyB2YWx1ZSBwcm92aWRlZFxuICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gRm9yY2UgYW4gYXJyYXkgaWYgbm90IGFscmVhZHkgc29tZXRoaW5nIGl0ZXJhYmxlXG4gIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIG9iaiA9IFtvYmpdO1xuICB9XG5cbiAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBhcnJheSB2YWx1ZXNcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2ldLCBpLCBvYmopO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgb2JqZWN0IGtleXNcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICBmbi5jYWxsKG51bGwsIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQWNjZXB0cyB2YXJhcmdzIGV4cGVjdGluZyBlYWNoIGFyZ3VtZW50IHRvIGJlIGFuIG9iamVjdCwgdGhlblxuICogaW1tdXRhYmx5IG1lcmdlcyB0aGUgcHJvcGVydGllcyBvZiBlYWNoIG9iamVjdCBhbmQgcmV0dXJucyByZXN1bHQuXG4gKlxuICogV2hlbiBtdWx0aXBsZSBvYmplY3RzIGNvbnRhaW4gdGhlIHNhbWUga2V5IHRoZSBsYXRlciBvYmplY3QgaW5cbiAqIHRoZSBhcmd1bWVudHMgbGlzdCB3aWxsIHRha2UgcHJlY2VkZW5jZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcmVzdWx0ID0gbWVyZ2Uoe2ZvbzogMTIzfSwge2ZvbzogNDU2fSk7XG4gKiBjb25zb2xlLmxvZyhyZXN1bHQuZm9vKTsgLy8gb3V0cHV0cyA0NTZcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIE9iamVjdCB0byBtZXJnZVxuICogQHJldHVybnMge09iamVjdH0gUmVzdWx0IG9mIGFsbCBtZXJnZSBwcm9wZXJ0aWVzXG4gKi9cbmZ1bmN0aW9uIG1lcmdlKC8qIG9iajEsIG9iajIsIG9iajMsIC4uLiAqLykge1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHR5cGVvZiByZXN1bHRba2V5XSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gbWVyZ2UocmVzdWx0W2tleV0sIHZhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGZvckVhY2goYXJndW1lbnRzW2ldLCBhc3NpZ25WYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBGdW5jdGlvbiBlcXVhbCB0byBtZXJnZSB3aXRoIHRoZSBkaWZmZXJlbmNlIGJlaW5nIHRoYXQgbm8gcmVmZXJlbmNlXG4gKiB0byBvcmlnaW5hbCBvYmplY3RzIGlzIGtlcHQuXG4gKlxuICogQHNlZSBtZXJnZVxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG1lcmdlXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gZGVlcE1lcmdlKC8qIG9iajEsIG9iajIsIG9iajMsIC4uLiAqLykge1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHR5cGVvZiByZXN1bHRba2V5XSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gZGVlcE1lcmdlKHJlc3VsdFtrZXldLCB2YWwpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gZGVlcE1lcmdlKHt9LCB2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBmb3JFYWNoKGFyZ3VtZW50c1tpXSwgYXNzaWduVmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRXh0ZW5kcyBvYmplY3QgYSBieSBtdXRhYmx5IGFkZGluZyB0byBpdCB0aGUgcHJvcGVydGllcyBvZiBvYmplY3QgYi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYSBUaGUgb2JqZWN0IHRvIGJlIGV4dGVuZGVkXG4gKiBAcGFyYW0ge09iamVjdH0gYiBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tXG4gKiBAcGFyYW0ge09iamVjdH0gdGhpc0FyZyBUaGUgb2JqZWN0IHRvIGJpbmQgZnVuY3Rpb24gdG9cbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIHJlc3VsdGluZyB2YWx1ZSBvZiBvYmplY3QgYVxuICovXG5mdW5jdGlvbiBleHRlbmQoYSwgYiwgdGhpc0FyZykge1xuICBmb3JFYWNoKGIsIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHRoaXNBcmcgJiYgdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYVtrZXldID0gYmluZCh2YWwsIHRoaXNBcmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2tleV0gPSB2YWw7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpc0FycmF5OiBpc0FycmF5LFxuICBpc0FycmF5QnVmZmVyOiBpc0FycmF5QnVmZmVyLFxuICBpc0J1ZmZlcjogaXNCdWZmZXIsXG4gIGlzRm9ybURhdGE6IGlzRm9ybURhdGEsXG4gIGlzQXJyYXlCdWZmZXJWaWV3OiBpc0FycmF5QnVmZmVyVmlldyxcbiAgaXNTdHJpbmc6IGlzU3RyaW5nLFxuICBpc051bWJlcjogaXNOdW1iZXIsXG4gIGlzT2JqZWN0OiBpc09iamVjdCxcbiAgaXNVbmRlZmluZWQ6IGlzVW5kZWZpbmVkLFxuICBpc0RhdGU6IGlzRGF0ZSxcbiAgaXNGaWxlOiBpc0ZpbGUsXG4gIGlzQmxvYjogaXNCbG9iLFxuICBpc0Z1bmN0aW9uOiBpc0Z1bmN0aW9uLFxuICBpc1N0cmVhbTogaXNTdHJlYW0sXG4gIGlzVVJMU2VhcmNoUGFyYW1zOiBpc1VSTFNlYXJjaFBhcmFtcyxcbiAgaXNTdGFuZGFyZEJyb3dzZXJFbnY6IGlzU3RhbmRhcmRCcm93c2VyRW52LFxuICBmb3JFYWNoOiBmb3JFYWNoLFxuICBtZXJnZTogbWVyZ2UsXG4gIGRlZXBNZXJnZTogZGVlcE1lcmdlLFxuICBleHRlbmQ6IGV4dGVuZCxcbiAgdHJpbTogdHJpbVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBlbmNvZGUodmFsKSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsKS5cbiAgICByZXBsYWNlKC8lNDAvZ2ksICdAJykuXG4gICAgcmVwbGFjZSgvJTNBL2dpLCAnOicpLlxuICAgIHJlcGxhY2UoLyUyNC9nLCAnJCcpLlxuICAgIHJlcGxhY2UoLyUyQy9naSwgJywnKS5cbiAgICByZXBsYWNlKC8lMjAvZywgJysnKS5cbiAgICByZXBsYWNlKC8lNUIvZ2ksICdbJykuXG4gICAgcmVwbGFjZSgvJTVEL2dpLCAnXScpO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgVVJMIGJ5IGFwcGVuZGluZyBwYXJhbXMgdG8gdGhlIGVuZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIGJhc2Ugb2YgdGhlIHVybCAoZS5nLiwgaHR0cDovL3d3dy5nb29nbGUuY29tKVxuICogQHBhcmFtIHtvYmplY3R9IFtwYXJhbXNdIFRoZSBwYXJhbXMgdG8gYmUgYXBwZW5kZWRcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgdXJsXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRVUkwodXJsLCBwYXJhbXMsIHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIGlmICghcGFyYW1zKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHZhciBzZXJpYWxpemVkUGFyYW1zO1xuICBpZiAocGFyYW1zU2VyaWFsaXplcikge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXNTZXJpYWxpemVyKHBhcmFtcyk7XG4gIH0gZWxzZSBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKSkge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXMudG9TdHJpbmcoKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcGFydHMgPSBbXTtcblxuICAgIHV0aWxzLmZvckVhY2gocGFyYW1zLCBmdW5jdGlvbiBzZXJpYWxpemUodmFsLCBrZXkpIHtcbiAgICAgIGlmICh2YWwgPT09IG51bGwgfHwgdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodXRpbHMuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgIGtleSA9IGtleSArICdbXSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWwgPSBbdmFsXTtcbiAgICAgIH1cblxuICAgICAgdXRpbHMuZm9yRWFjaCh2YWwsIGZ1bmN0aW9uIHBhcnNlVmFsdWUodikge1xuICAgICAgICBpZiAodXRpbHMuaXNEYXRlKHYpKSB7XG4gICAgICAgICAgdiA9IHYudG9JU09TdHJpbmcoKTtcbiAgICAgICAgfSBlbHNlIGlmICh1dGlscy5pc09iamVjdCh2KSkge1xuICAgICAgICAgIHYgPSBKU09OLnN0cmluZ2lmeSh2KTtcbiAgICAgICAgfVxuICAgICAgICBwYXJ0cy5wdXNoKGVuY29kZShrZXkpICsgJz0nICsgZW5jb2RlKHYpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcnRzLmpvaW4oJyYnKTtcbiAgfVxuXG4gIGlmIChzZXJpYWxpemVkUGFyYW1zKSB7XG4gICAgdmFyIGhhc2htYXJrSW5kZXggPSB1cmwuaW5kZXhPZignIycpO1xuICAgIGlmIChoYXNobWFya0luZGV4ICE9PSAtMSkge1xuICAgICAgdXJsID0gdXJsLnNsaWNlKDAsIGhhc2htYXJrSW5kZXgpO1xuICAgIH1cblxuICAgIHVybCArPSAodXJsLmluZGV4T2YoJz8nKSA9PT0gLTEgPyAnPycgOiAnJicpICsgc2VyaWFsaXplZFBhcmFtcztcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIEludGVyY2VwdG9yTWFuYWdlcigpIHtcbiAgdGhpcy5oYW5kbGVycyA9IFtdO1xufVxuXG4vKipcbiAqIEFkZCBhIG5ldyBpbnRlcmNlcHRvciB0byB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdWxmaWxsZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgdGhlbmAgZm9yIGEgYFByb21pc2VgXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3RlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGByZWplY3RgIGZvciBhIGBQcm9taXNlYFxuICpcbiAqIEByZXR1cm4ge051bWJlcn0gQW4gSUQgdXNlZCB0byByZW1vdmUgaW50ZXJjZXB0b3IgbGF0ZXJcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiB1c2UoZnVsZmlsbGVkLCByZWplY3RlZCkge1xuICB0aGlzLmhhbmRsZXJzLnB1c2goe1xuICAgIGZ1bGZpbGxlZDogZnVsZmlsbGVkLFxuICAgIHJlamVjdGVkOiByZWplY3RlZFxuICB9KTtcbiAgcmV0dXJuIHRoaXMuaGFuZGxlcnMubGVuZ3RoIC0gMTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGFuIGludGVyY2VwdG9yIGZyb20gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGlkIFRoZSBJRCB0aGF0IHdhcyByZXR1cm5lZCBieSBgdXNlYFxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmVqZWN0ID0gZnVuY3Rpb24gZWplY3QoaWQpIHtcbiAgaWYgKHRoaXMuaGFuZGxlcnNbaWRdKSB7XG4gICAgdGhpcy5oYW5kbGVyc1tpZF0gPSBudWxsO1xuICB9XG59O1xuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbGwgdGhlIHJlZ2lzdGVyZWQgaW50ZXJjZXB0b3JzXG4gKlxuICogVGhpcyBtZXRob2QgaXMgcGFydGljdWxhcmx5IHVzZWZ1bCBmb3Igc2tpcHBpbmcgb3ZlciBhbnlcbiAqIGludGVyY2VwdG9ycyB0aGF0IG1heSBoYXZlIGJlY29tZSBgbnVsbGAgY2FsbGluZyBgZWplY3RgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGludGVyY2VwdG9yXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIGZvckVhY2goZm4pIHtcbiAgdXRpbHMuZm9yRWFjaCh0aGlzLmhhbmRsZXJzLCBmdW5jdGlvbiBmb3JFYWNoSGFuZGxlcihoKSB7XG4gICAgaWYgKGggIT09IG51bGwpIHtcbiAgICAgIGZuKGgpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEludGVyY2VwdG9yTWFuYWdlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vKipcbiAqIFRyYW5zZm9ybSB0aGUgZGF0YSBmb3IgYSByZXF1ZXN0IG9yIGEgcmVzcG9uc2VcbiAqXG4gKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IGRhdGEgVGhlIGRhdGEgdG8gYmUgdHJhbnNmb3JtZWRcbiAqIEBwYXJhbSB7QXJyYXl9IGhlYWRlcnMgVGhlIGhlYWRlcnMgZm9yIHRoZSByZXF1ZXN0IG9yIHJlc3BvbnNlXG4gKiBAcGFyYW0ge0FycmF5fEZ1bmN0aW9ufSBmbnMgQSBzaW5nbGUgZnVuY3Rpb24gb3IgQXJyYXkgb2YgZnVuY3Rpb25zXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHJlc3VsdGluZyB0cmFuc2Zvcm1lZCBkYXRhXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdHJhbnNmb3JtRGF0YShkYXRhLCBoZWFkZXJzLCBmbnMpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIHV0aWxzLmZvckVhY2goZm5zLCBmdW5jdGlvbiB0cmFuc2Zvcm0oZm4pIHtcbiAgICBkYXRhID0gZm4oZGF0YSwgaGVhZGVycyk7XG4gIH0pO1xuXG4gIHJldHVybiBkYXRhO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0NhbmNlbCh2YWx1ZSkge1xuICByZXR1cm4gISEodmFsdWUgJiYgdmFsdWUuX19DQU5DRUxfXyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgbm9ybWFsaXplZE5hbWUpIHtcbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLCBmdW5jdGlvbiBwcm9jZXNzSGVhZGVyKHZhbHVlLCBuYW1lKSB7XG4gICAgaWYgKG5hbWUgIT09IG5vcm1hbGl6ZWROYW1lICYmIG5hbWUudG9VcHBlckNhc2UoKSA9PT0gbm9ybWFsaXplZE5hbWUudG9VcHBlckNhc2UoKSkge1xuICAgICAgaGVhZGVyc1tub3JtYWxpemVkTmFtZV0gPSB2YWx1ZTtcbiAgICAgIGRlbGV0ZSBoZWFkZXJzW25hbWVdO1xuICAgIH1cbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFVwZGF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgY29uZmlnLCBlcnJvciBjb2RlLCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyb3IgVGhlIGVycm9yIHRvIHVwZGF0ZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgZXJyb3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIGVycm9yLmNvbmZpZyA9IGNvbmZpZztcbiAgaWYgKGNvZGUpIHtcbiAgICBlcnJvci5jb2RlID0gY29kZTtcbiAgfVxuXG4gIGVycm9yLnJlcXVlc3QgPSByZXF1ZXN0O1xuICBlcnJvci5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICBlcnJvci5pc0F4aW9zRXJyb3IgPSB0cnVlO1xuXG4gIGVycm9yLnRvSlNPTiA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICAvLyBTdGFuZGFyZFxuICAgICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlLFxuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgLy8gTWljcm9zb2Z0XG4gICAgICBkZXNjcmlwdGlvbjogdGhpcy5kZXNjcmlwdGlvbixcbiAgICAgIG51bWJlcjogdGhpcy5udW1iZXIsXG4gICAgICAvLyBNb3ppbGxhXG4gICAgICBmaWxlTmFtZTogdGhpcy5maWxlTmFtZSxcbiAgICAgIGxpbmVOdW1iZXI6IHRoaXMubGluZU51bWJlcixcbiAgICAgIGNvbHVtbk51bWJlcjogdGhpcy5jb2x1bW5OdW1iZXIsXG4gICAgICBzdGFjazogdGhpcy5zdGFjayxcbiAgICAgIC8vIEF4aW9zXG4gICAgICBjb25maWc6IHRoaXMuY29uZmlnLFxuICAgICAgY29kZTogdGhpcy5jb2RlXG4gICAgfTtcbiAgfTtcbiAgcmV0dXJuIGVycm9yO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGVuaGFuY2VFcnJvciA9IHJlcXVpcmUoJy4vZW5oYW5jZUVycm9yJyk7XG5cbi8qKlxuICogQ3JlYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBtZXNzYWdlLCBjb25maWcsIGVycm9yIGNvZGUsIHJlcXVlc3QgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBjcmVhdGVkIGVycm9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZUVycm9yKG1lc3NhZ2UsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgdmFyIGVycm9yID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuICByZXR1cm4gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4vY3JlYXRlRXJyb3InKTtcblxuLyoqXG4gKiBSZXNvbHZlIG9yIHJlamVjdCBhIFByb21pc2UgYmFzZWQgb24gcmVzcG9uc2Ugc3RhdHVzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmUgQSBmdW5jdGlvbiB0aGF0IHJlc29sdmVzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0IEEgZnVuY3Rpb24gdGhhdCByZWplY3RzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtvYmplY3R9IHJlc3BvbnNlIFRoZSByZXNwb25zZS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSkge1xuICB2YXIgdmFsaWRhdGVTdGF0dXMgPSByZXNwb25zZS5jb25maWcudmFsaWRhdGVTdGF0dXM7XG4gIGlmICghdmFsaWRhdGVTdGF0dXMgfHwgdmFsaWRhdGVTdGF0dXMocmVzcG9uc2Uuc3RhdHVzKSkge1xuICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICB9IGVsc2Uge1xuICAgIHJlamVjdChjcmVhdGVFcnJvcihcbiAgICAgICdSZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyBjb2RlICcgKyByZXNwb25zZS5zdGF0dXMsXG4gICAgICByZXNwb25zZS5jb25maWcsXG4gICAgICBudWxsLFxuICAgICAgcmVzcG9uc2UucmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlXG4gICAgKSk7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0Fic29sdXRlVVJMKHVybCkge1xuICAvLyBBIFVSTCBpcyBjb25zaWRlcmVkIGFic29sdXRlIGlmIGl0IGJlZ2lucyB3aXRoIFwiPHNjaGVtZT46Ly9cIiBvciBcIi8vXCIgKHByb3RvY29sLXJlbGF0aXZlIFVSTCkuXG4gIC8vIFJGQyAzOTg2IGRlZmluZXMgc2NoZW1lIG5hbWUgYXMgYSBzZXF1ZW5jZSBvZiBjaGFyYWN0ZXJzIGJlZ2lubmluZyB3aXRoIGEgbGV0dGVyIGFuZCBmb2xsb3dlZFxuICAvLyBieSBhbnkgY29tYmluYXRpb24gb2YgbGV0dGVycywgZGlnaXRzLCBwbHVzLCBwZXJpb2QsIG9yIGh5cGhlbi5cbiAgcmV0dXJuIC9eKFthLXpdW2EtelxcZFxcK1xcLVxcLl0qOik/XFwvXFwvL2kudGVzdCh1cmwpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIHNwZWNpZmllZCBVUkxzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpdmVVUkwgVGhlIHJlbGF0aXZlIFVSTFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIFVSTFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlbGF0aXZlVVJMKSB7XG4gIHJldHVybiByZWxhdGl2ZVVSTFxuICAgID8gYmFzZVVSTC5yZXBsYWNlKC9cXC8rJC8sICcnKSArICcvJyArIHJlbGF0aXZlVVJMLnJlcGxhY2UoL15cXC8rLywgJycpXG4gICAgOiBiYXNlVVJMO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGlzQWJzb2x1dGVVUkwgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwnKTtcbnZhciBjb21iaW5lVVJMcyA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvY29tYmluZVVSTHMnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIGJhc2VVUkwgd2l0aCB0aGUgcmVxdWVzdGVkVVJMLFxuICogb25seSB3aGVuIHRoZSByZXF1ZXN0ZWRVUkwgaXMgbm90IGFscmVhZHkgYW4gYWJzb2x1dGUgVVJMLlxuICogSWYgdGhlIHJlcXVlc3RVUkwgaXMgYWJzb2x1dGUsIHRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgcmVxdWVzdGVkVVJMIHVudG91Y2hlZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZXF1ZXN0ZWRVUkwgQWJzb2x1dGUgb3IgcmVsYXRpdmUgVVJMIHRvIGNvbWJpbmVcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBmdWxsIHBhdGhcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWlsZEZ1bGxQYXRoKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCkge1xuICBpZiAoYmFzZVVSTCAmJiAhaXNBYnNvbHV0ZVVSTChyZXF1ZXN0ZWRVUkwpKSB7XG4gICAgcmV0dXJuIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCk7XG4gIH1cbiAgcmV0dXJuIHJlcXVlc3RlZFVSTDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLy8gSGVhZGVycyB3aG9zZSBkdXBsaWNhdGVzIGFyZSBpZ25vcmVkIGJ5IG5vZGVcbi8vIGMuZi4gaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9odHRwLmh0bWwjaHR0cF9tZXNzYWdlX2hlYWRlcnNcbnZhciBpZ25vcmVEdXBsaWNhdGVPZiA9IFtcbiAgJ2FnZScsICdhdXRob3JpemF0aW9uJywgJ2NvbnRlbnQtbGVuZ3RoJywgJ2NvbnRlbnQtdHlwZScsICdldGFnJyxcbiAgJ2V4cGlyZXMnLCAnZnJvbScsICdob3N0JywgJ2lmLW1vZGlmaWVkLXNpbmNlJywgJ2lmLXVubW9kaWZpZWQtc2luY2UnLFxuICAnbGFzdC1tb2RpZmllZCcsICdsb2NhdGlvbicsICdtYXgtZm9yd2FyZHMnLCAncHJveHktYXV0aG9yaXphdGlvbicsXG4gICdyZWZlcmVyJywgJ3JldHJ5LWFmdGVyJywgJ3VzZXItYWdlbnQnXG5dO1xuXG4vKipcbiAqIFBhcnNlIGhlYWRlcnMgaW50byBhbiBvYmplY3RcbiAqXG4gKiBgYGBcbiAqIERhdGU6IFdlZCwgMjcgQXVnIDIwMTQgMDg6NTg6NDkgR01UXG4gKiBDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cbiAqIENvbm5lY3Rpb246IGtlZXAtYWxpdmVcbiAqIFRyYW5zZmVyLUVuY29kaW5nOiBjaHVua2VkXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVycyBIZWFkZXJzIG5lZWRpbmcgdG8gYmUgcGFyc2VkXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBIZWFkZXJzIHBhcnNlZCBpbnRvIGFuIG9iamVjdFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNlSGVhZGVycyhoZWFkZXJzKSB7XG4gIHZhciBwYXJzZWQgPSB7fTtcbiAgdmFyIGtleTtcbiAgdmFyIHZhbDtcbiAgdmFyIGk7XG5cbiAgaWYgKCFoZWFkZXJzKSB7IHJldHVybiBwYXJzZWQ7IH1cblxuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMuc3BsaXQoJ1xcbicpLCBmdW5jdGlvbiBwYXJzZXIobGluZSkge1xuICAgIGkgPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBrZXkgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKDAsIGkpKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbCA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoaSArIDEpKTtcblxuICAgIGlmIChrZXkpIHtcbiAgICAgIGlmIChwYXJzZWRba2V5XSAmJiBpZ25vcmVEdXBsaWNhdGVPZi5pbmRleE9mKGtleSkgPj0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoa2V5ID09PSAnc2V0LWNvb2tpZScpIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSAocGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSA6IFtdKS5jb25jYXQoW3ZhbF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgaGF2ZSBmdWxsIHN1cHBvcnQgb2YgdGhlIEFQSXMgbmVlZGVkIHRvIHRlc3RcbiAgLy8gd2hldGhlciB0aGUgcmVxdWVzdCBVUkwgaXMgb2YgdGhlIHNhbWUgb3JpZ2luIGFzIGN1cnJlbnQgbG9jYXRpb24uXG4gICAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICAgIHZhciBtc2llID0gLyhtc2llfHRyaWRlbnQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICAgIHZhciB1cmxQYXJzaW5nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgIHZhciBvcmlnaW5VUkw7XG5cbiAgICAgIC8qKlxuICAgICogUGFyc2UgYSBVUkwgdG8gZGlzY292ZXIgaXQncyBjb21wb25lbnRzXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHVybCBUaGUgVVJMIHRvIGJlIHBhcnNlZFxuICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAqL1xuICAgICAgZnVuY3Rpb24gcmVzb2x2ZVVSTCh1cmwpIHtcbiAgICAgICAgdmFyIGhyZWYgPSB1cmw7XG5cbiAgICAgICAgaWYgKG1zaWUpIHtcbiAgICAgICAgLy8gSUUgbmVlZHMgYXR0cmlidXRlIHNldCB0d2ljZSB0byBub3JtYWxpemUgcHJvcGVydGllc1xuICAgICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuICAgICAgICAgIGhyZWYgPSB1cmxQYXJzaW5nTm9kZS5ocmVmO1xuICAgICAgICB9XG5cbiAgICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG5cbiAgICAgICAgLy8gdXJsUGFyc2luZ05vZGUgcHJvdmlkZXMgdGhlIFVybFV0aWxzIGludGVyZmFjZSAtIGh0dHA6Ly91cmwuc3BlYy53aGF0d2cub3JnLyN1cmx1dGlsc1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGhyZWY6IHVybFBhcnNpbmdOb2RlLmhyZWYsXG4gICAgICAgICAgcHJvdG9jb2w6IHVybFBhcnNpbmdOb2RlLnByb3RvY29sID8gdXJsUGFyc2luZ05vZGUucHJvdG9jb2wucmVwbGFjZSgvOiQvLCAnJykgOiAnJyxcbiAgICAgICAgICBob3N0OiB1cmxQYXJzaW5nTm9kZS5ob3N0LFxuICAgICAgICAgIHNlYXJjaDogdXJsUGFyc2luZ05vZGUuc2VhcmNoID8gdXJsUGFyc2luZ05vZGUuc2VhcmNoLnJlcGxhY2UoL15cXD8vLCAnJykgOiAnJyxcbiAgICAgICAgICBoYXNoOiB1cmxQYXJzaW5nTm9kZS5oYXNoID8gdXJsUGFyc2luZ05vZGUuaGFzaC5yZXBsYWNlKC9eIy8sICcnKSA6ICcnLFxuICAgICAgICAgIGhvc3RuYW1lOiB1cmxQYXJzaW5nTm9kZS5ob3N0bmFtZSxcbiAgICAgICAgICBwb3J0OiB1cmxQYXJzaW5nTm9kZS5wb3J0LFxuICAgICAgICAgIHBhdGhuYW1lOiAodXJsUGFyc2luZ05vZGUucGF0aG5hbWUuY2hhckF0KDApID09PSAnLycpID9cbiAgICAgICAgICAgIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lIDpcbiAgICAgICAgICAgICcvJyArIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIG9yaWdpblVSTCA9IHJlc29sdmVVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuXG4gICAgICAvKipcbiAgICAqIERldGVybWluZSBpZiBhIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luIGFzIHRoZSBjdXJyZW50IGxvY2F0aW9uXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHJlcXVlc3RVUkwgVGhlIFVSTCB0byB0ZXN0XG4gICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiwgb3RoZXJ3aXNlIGZhbHNlXG4gICAgKi9cbiAgICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4ocmVxdWVzdFVSTCkge1xuICAgICAgICB2YXIgcGFyc2VkID0gKHV0aWxzLmlzU3RyaW5nKHJlcXVlc3RVUkwpKSA/IHJlc29sdmVVUkwocmVxdWVzdFVSTCkgOiByZXF1ZXN0VVJMO1xuICAgICAgICByZXR1cm4gKHBhcnNlZC5wcm90b2NvbCA9PT0gb3JpZ2luVVJMLnByb3RvY29sICYmXG4gICAgICAgICAgICBwYXJzZWQuaG9zdCA9PT0gb3JpZ2luVVJMLmhvc3QpO1xuICAgICAgfTtcbiAgICB9KSgpIDpcblxuICAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnZzICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAgIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH07XG4gICAgfSkoKVxuKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIHN1cHBvcnQgZG9jdW1lbnQuY29va2llXG4gICAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShuYW1lLCB2YWx1ZSwgZXhwaXJlcywgcGF0aCwgZG9tYWluLCBzZWN1cmUpIHtcbiAgICAgICAgICB2YXIgY29va2llID0gW107XG4gICAgICAgICAgY29va2llLnB1c2gobmFtZSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpO1xuXG4gICAgICAgICAgaWYgKHV0aWxzLmlzTnVtYmVyKGV4cGlyZXMpKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgnZXhwaXJlcz0nICsgbmV3IERhdGUoZXhwaXJlcykudG9HTVRTdHJpbmcoKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKHBhdGgpKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgncGF0aD0nICsgcGF0aCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKGRvbWFpbikpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdkb21haW49JyArIGRvbWFpbik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHNlY3VyZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ3NlY3VyZScpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZS5qb2luKCc7ICcpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQobmFtZSkge1xuICAgICAgICAgIHZhciBtYXRjaCA9IGRvY3VtZW50LmNvb2tpZS5tYXRjaChuZXcgUmVnRXhwKCcoXnw7XFxcXHMqKSgnICsgbmFtZSArICcpPShbXjtdKiknKSk7XG4gICAgICAgICAgcmV0dXJuIChtYXRjaCA/IGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFszXSkgOiBudWxsKTtcbiAgICAgICAgfSxcblxuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZShuYW1lKSB7XG4gICAgICAgICAgdGhpcy53cml0ZShuYW1lLCAnJywgRGF0ZS5ub3coKSAtIDg2NDAwMDAwKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KSgpIDpcblxuICAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnYgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gICAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZSgpIHt9LFxuICAgICAgICByZWFkOiBmdW5jdGlvbiByZWFkKCkgeyByZXR1cm4gbnVsbDsgfSxcbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgICAgfTtcbiAgICB9KSgpXG4pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgc2V0dGxlID0gcmVxdWlyZSgnLi8uLi9jb3JlL3NldHRsZScpO1xudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG52YXIgYnVpbGRGdWxsUGF0aCA9IHJlcXVpcmUoJy4uL2NvcmUvYnVpbGRGdWxsUGF0aCcpO1xudmFyIHBhcnNlSGVhZGVycyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9wYXJzZUhlYWRlcnMnKTtcbnZhciBpc1VSTFNhbWVPcmlnaW4gPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luJyk7XG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuLi9jb3JlL2NyZWF0ZUVycm9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24geGhyQWRhcHRlcihjb25maWcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGRpc3BhdGNoWGhyUmVxdWVzdChyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgcmVxdWVzdERhdGEgPSBjb25maWcuZGF0YTtcbiAgICB2YXIgcmVxdWVzdEhlYWRlcnMgPSBjb25maWcuaGVhZGVycztcblxuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKHJlcXVlc3REYXRhKSkge1xuICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzWydDb250ZW50LVR5cGUnXTsgLy8gTGV0IHRoZSBicm93c2VyIHNldCBpdFxuICAgIH1cblxuICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAvLyBIVFRQIGJhc2ljIGF1dGhlbnRpY2F0aW9uXG4gICAgaWYgKGNvbmZpZy5hdXRoKSB7XG4gICAgICB2YXIgdXNlcm5hbWUgPSBjb25maWcuYXV0aC51c2VybmFtZSB8fCAnJztcbiAgICAgIHZhciBwYXNzd29yZCA9IGNvbmZpZy5hdXRoLnBhc3N3b3JkIHx8ICcnO1xuICAgICAgcmVxdWVzdEhlYWRlcnMuQXV0aG9yaXphdGlvbiA9ICdCYXNpYyAnICsgYnRvYSh1c2VybmFtZSArICc6JyArIHBhc3N3b3JkKTtcbiAgICB9XG5cbiAgICB2YXIgZnVsbFBhdGggPSBidWlsZEZ1bGxQYXRoKGNvbmZpZy5iYXNlVVJMLCBjb25maWcudXJsKTtcbiAgICByZXF1ZXN0Lm9wZW4oY29uZmlnLm1ldGhvZC50b1VwcGVyQ2FzZSgpLCBidWlsZFVSTChmdWxsUGF0aCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpLCB0cnVlKTtcblxuICAgIC8vIFNldCB0aGUgcmVxdWVzdCB0aW1lb3V0IGluIE1TXG4gICAgcmVxdWVzdC50aW1lb3V0ID0gY29uZmlnLnRpbWVvdXQ7XG5cbiAgICAvLyBMaXN0ZW4gZm9yIHJlYWR5IHN0YXRlXG4gICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiBoYW5kbGVMb2FkKCkge1xuICAgICAgaWYgKCFyZXF1ZXN0IHx8IHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSByZXF1ZXN0IGVycm9yZWQgb3V0IGFuZCB3ZSBkaWRuJ3QgZ2V0IGEgcmVzcG9uc2UsIHRoaXMgd2lsbCBiZVxuICAgICAgLy8gaGFuZGxlZCBieSBvbmVycm9yIGluc3RlYWRcbiAgICAgIC8vIFdpdGggb25lIGV4Y2VwdGlvbjogcmVxdWVzdCB0aGF0IHVzaW5nIGZpbGU6IHByb3RvY29sLCBtb3N0IGJyb3dzZXJzXG4gICAgICAvLyB3aWxsIHJldHVybiBzdGF0dXMgYXMgMCBldmVuIHRob3VnaCBpdCdzIGEgc3VjY2Vzc2Z1bCByZXF1ZXN0XG4gICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDAgJiYgIShyZXF1ZXN0LnJlc3BvbnNlVVJMICYmIHJlcXVlc3QucmVzcG9uc2VVUkwuaW5kZXhPZignZmlsZTonKSA9PT0gMCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBQcmVwYXJlIHRoZSByZXNwb25zZVxuICAgICAgdmFyIHJlc3BvbnNlSGVhZGVycyA9ICdnZXRBbGxSZXNwb25zZUhlYWRlcnMnIGluIHJlcXVlc3QgPyBwYXJzZUhlYWRlcnMocmVxdWVzdC5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSkgOiBudWxsO1xuICAgICAgdmFyIHJlc3BvbnNlRGF0YSA9ICFjb25maWcucmVzcG9uc2VUeXBlIHx8IGNvbmZpZy5yZXNwb25zZVR5cGUgPT09ICd0ZXh0JyA/IHJlcXVlc3QucmVzcG9uc2VUZXh0IDogcmVxdWVzdC5yZXNwb25zZTtcbiAgICAgIHZhciByZXNwb25zZSA9IHtcbiAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLFxuICAgICAgICBzdGF0dXM6IHJlcXVlc3Quc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiByZXF1ZXN0LnN0YXR1c1RleHQsXG4gICAgICAgIGhlYWRlcnM6IHJlc3BvbnNlSGVhZGVycyxcbiAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgIHJlcXVlc3Q6IHJlcXVlc3RcbiAgICAgIH07XG5cbiAgICAgIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBicm93c2VyIHJlcXVlc3QgY2FuY2VsbGF0aW9uIChhcyBvcHBvc2VkIHRvIGEgbWFudWFsIGNhbmNlbGxhdGlvbilcbiAgICByZXF1ZXN0Lm9uYWJvcnQgPSBmdW5jdGlvbiBoYW5kbGVBYm9ydCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcignUmVxdWVzdCBhYm9ydGVkJywgY29uZmlnLCAnRUNPTk5BQk9SVEVEJywgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIGxvdyBsZXZlbCBuZXR3b3JrIGVycm9yc1xuICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uIGhhbmRsZUVycm9yKCkge1xuICAgICAgLy8gUmVhbCBlcnJvcnMgYXJlIGhpZGRlbiBmcm9tIHVzIGJ5IHRoZSBicm93c2VyXG4gICAgICAvLyBvbmVycm9yIHNob3VsZCBvbmx5IGZpcmUgaWYgaXQncyBhIG5ldHdvcmsgZXJyb3JcbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcignTmV0d29yayBFcnJvcicsIGNvbmZpZywgbnVsbCwgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIHRpbWVvdXRcbiAgICByZXF1ZXN0Lm9udGltZW91dCA9IGZ1bmN0aW9uIGhhbmRsZVRpbWVvdXQoKSB7XG4gICAgICB2YXIgdGltZW91dEVycm9yTWVzc2FnZSA9ICd0aW1lb3V0IG9mICcgKyBjb25maWcudGltZW91dCArICdtcyBleGNlZWRlZCc7XG4gICAgICBpZiAoY29uZmlnLnRpbWVvdXRFcnJvck1lc3NhZ2UpIHtcbiAgICAgICAgdGltZW91dEVycm9yTWVzc2FnZSA9IGNvbmZpZy50aW1lb3V0RXJyb3JNZXNzYWdlO1xuICAgICAgfVxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKHRpbWVvdXRFcnJvck1lc3NhZ2UsIGNvbmZpZywgJ0VDT05OQUJPUlRFRCcsXG4gICAgICAgIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgIC8vIFRoaXMgaXMgb25seSBkb25lIGlmIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50LlxuICAgIC8vIFNwZWNpZmljYWxseSBub3QgaWYgd2UncmUgaW4gYSB3ZWIgd29ya2VyLCBvciByZWFjdC1uYXRpdmUuXG4gICAgaWYgKHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkpIHtcbiAgICAgIHZhciBjb29raWVzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2Nvb2tpZXMnKTtcblxuICAgICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgICB2YXIgeHNyZlZhbHVlID0gKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMgfHwgaXNVUkxTYW1lT3JpZ2luKGZ1bGxQYXRoKSkgJiYgY29uZmlnLnhzcmZDb29raWVOYW1lID9cbiAgICAgICAgY29va2llcy5yZWFkKGNvbmZpZy54c3JmQ29va2llTmFtZSkgOlxuICAgICAgICB1bmRlZmluZWQ7XG5cbiAgICAgIGlmICh4c3JmVmFsdWUpIHtcbiAgICAgICAgcmVxdWVzdEhlYWRlcnNbY29uZmlnLnhzcmZIZWFkZXJOYW1lXSA9IHhzcmZWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBZGQgaGVhZGVycyB0byB0aGUgcmVxdWVzdFxuICAgIGlmICgnc2V0UmVxdWVzdEhlYWRlcicgaW4gcmVxdWVzdCkge1xuICAgICAgdXRpbHMuZm9yRWFjaChyZXF1ZXN0SGVhZGVycywgZnVuY3Rpb24gc2V0UmVxdWVzdEhlYWRlcih2YWwsIGtleSkge1xuICAgICAgICBpZiAodHlwZW9mIHJlcXVlc3REYXRhID09PSAndW5kZWZpbmVkJyAmJiBrZXkudG9Mb3dlckNhc2UoKSA9PT0gJ2NvbnRlbnQtdHlwZScpIHtcbiAgICAgICAgICAvLyBSZW1vdmUgQ29udGVudC1UeXBlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gICAgICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzW2tleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gT3RoZXJ3aXNlIGFkZCBoZWFkZXIgdG8gdGhlIHJlcXVlc3RcbiAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoa2V5LCB2YWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgd2l0aENyZWRlbnRpYWxzIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcud2l0aENyZWRlbnRpYWxzKSkge1xuICAgICAgcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSAhIWNvbmZpZy53aXRoQ3JlZGVudGlhbHM7XG4gICAgfVxuXG4gICAgLy8gQWRkIHJlc3BvbnNlVHlwZSB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IGNvbmZpZy5yZXNwb25zZVR5cGU7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIEV4cGVjdGVkIERPTUV4Y2VwdGlvbiB0aHJvd24gYnkgYnJvd3NlcnMgbm90IGNvbXBhdGlibGUgWE1MSHR0cFJlcXVlc3QgTGV2ZWwgMi5cbiAgICAgICAgLy8gQnV0LCB0aGlzIGNhbiBiZSBzdXBwcmVzc2VkIGZvciAnanNvbicgdHlwZSBhcyBpdCBjYW4gYmUgcGFyc2VkIGJ5IGRlZmF1bHQgJ3RyYW5zZm9ybVJlc3BvbnNlJyBmdW5jdGlvbi5cbiAgICAgICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUgIT09ICdqc29uJykge1xuICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgcHJvZ3Jlc3MgaWYgbmVlZGVkXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25Eb3dubG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgLy8gTm90IGFsbCBicm93c2VycyBzdXBwb3J0IHVwbG9hZCBldmVudHNcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nICYmIHJlcXVlc3QudXBsb2FkKSB7XG4gICAgICByZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgICAvLyBIYW5kbGUgY2FuY2VsbGF0aW9uXG4gICAgICBjb25maWcuY2FuY2VsVG9rZW4ucHJvbWlzZS50aGVuKGZ1bmN0aW9uIG9uQ2FuY2VsZWQoY2FuY2VsKSB7XG4gICAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgcmVqZWN0KGNhbmNlbCk7XG4gICAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocmVxdWVzdERhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmVxdWVzdERhdGEgPSBudWxsO1xuICAgIH1cblxuICAgIC8vIFNlbmQgdGhlIHJlcXVlc3RcbiAgICByZXF1ZXN0LnNlbmQocmVxdWVzdERhdGEpO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBub3JtYWxpemVIZWFkZXJOYW1lID0gcmVxdWlyZSgnLi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUnKTtcblxudmFyIERFRkFVTFRfQ09OVEVOVF9UWVBFID0ge1xuICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbn07XG5cbmZ1bmN0aW9uIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCB2YWx1ZSkge1xuICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnMpICYmIHV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddKSkge1xuICAgIGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gdmFsdWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdEFkYXB0ZXIoKSB7XG4gIHZhciBhZGFwdGVyO1xuICBpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIEZvciBicm93c2VycyB1c2UgWEhSIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy94aHInKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHByb2Nlc3MpID09PSAnW29iamVjdCBwcm9jZXNzXScpIHtcbiAgICAvLyBGb3Igbm9kZSB1c2UgSFRUUCBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMvaHR0cCcpO1xuICB9XG4gIHJldHVybiBhZGFwdGVyO1xufVxuXG52YXIgZGVmYXVsdHMgPSB7XG4gIGFkYXB0ZXI6IGdldERlZmF1bHRBZGFwdGVyKCksXG5cbiAgdHJhbnNmb3JtUmVxdWVzdDogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlcXVlc3QoZGF0YSwgaGVhZGVycykge1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0FjY2VwdCcpO1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0NvbnRlbnQtVHlwZScpO1xuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0FycmF5QnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0J1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNTdHJlYW0oZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzRmlsZShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCbG9iKGRhdGEpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXJWaWV3KGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YS5idWZmZXI7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIGRhdGEudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzT2JqZWN0KGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgdHJhbnNmb3JtUmVzcG9uc2U6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXNwb25zZShkYXRhKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7IC8qIElnbm9yZSAqLyB9XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICAvKipcbiAgICogQSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byBhYm9ydCBhIHJlcXVlc3QuIElmIHNldCB0byAwIChkZWZhdWx0KSBhXG4gICAqIHRpbWVvdXQgaXMgbm90IGNyZWF0ZWQuXG4gICAqL1xuICB0aW1lb3V0OiAwLFxuXG4gIHhzcmZDb29raWVOYW1lOiAnWFNSRi1UT0tFTicsXG4gIHhzcmZIZWFkZXJOYW1lOiAnWC1YU1JGLVRPS0VOJyxcblxuICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcblxuICB2YWxpZGF0ZVN0YXR1czogZnVuY3Rpb24gdmFsaWRhdGVTdGF0dXMoc3RhdHVzKSB7XG4gICAgcmV0dXJuIHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwO1xuICB9XG59O1xuXG5kZWZhdWx0cy5oZWFkZXJzID0ge1xuICBjb21tb246IHtcbiAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKidcbiAgfVxufTtcblxudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB7fTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB1dGlscy5tZXJnZShERUZBVUxUX0NPTlRFTlRfVFlQRSk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZhdWx0cztcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHRyYW5zZm9ybURhdGEgPSByZXF1aXJlKCcuL3RyYW5zZm9ybURhdGEnKTtcbnZhciBpc0NhbmNlbCA9IHJlcXVpcmUoJy4uL2NhbmNlbC9pc0NhbmNlbCcpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi4vZGVmYXVsdHMnKTtcblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5mdW5jdGlvbiB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZykge1xuICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgY29uZmlnLmNhbmNlbFRva2VuLnRocm93SWZSZXF1ZXN0ZWQoKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdCB0byB0aGUgc2VydmVyIHVzaW5nIHRoZSBjb25maWd1cmVkIGFkYXB0ZXIuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkaXNwYXRjaFJlcXVlc3QoY29uZmlnKSB7XG4gIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAvLyBFbnN1cmUgaGVhZGVycyBleGlzdFxuICBjb25maWcuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzIHx8IHt9O1xuXG4gIC8vIFRyYW5zZm9ybSByZXF1ZXN0IGRhdGFcbiAgY29uZmlnLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgIGNvbmZpZy5kYXRhLFxuICAgIGNvbmZpZy5oZWFkZXJzLFxuICAgIGNvbmZpZy50cmFuc2Zvcm1SZXF1ZXN0XG4gICk7XG5cbiAgLy8gRmxhdHRlbiBoZWFkZXJzXG4gIGNvbmZpZy5oZWFkZXJzID0gdXRpbHMubWVyZ2UoXG4gICAgY29uZmlnLmhlYWRlcnMuY29tbW9uIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzW2NvbmZpZy5tZXRob2RdIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzXG4gICk7XG5cbiAgdXRpbHMuZm9yRWFjaChcbiAgICBbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdwb3N0JywgJ3B1dCcsICdwYXRjaCcsICdjb21tb24nXSxcbiAgICBmdW5jdGlvbiBjbGVhbkhlYWRlckNvbmZpZyhtZXRob2QpIHtcbiAgICAgIGRlbGV0ZSBjb25maWcuaGVhZGVyc1ttZXRob2RdO1xuICAgIH1cbiAgKTtcblxuICB2YXIgYWRhcHRlciA9IGNvbmZpZy5hZGFwdGVyIHx8IGRlZmF1bHRzLmFkYXB0ZXI7XG5cbiAgcmV0dXJuIGFkYXB0ZXIoY29uZmlnKS50aGVuKGZ1bmN0aW9uIG9uQWRhcHRlclJlc29sdXRpb24ocmVzcG9uc2UpIHtcbiAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgIHJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgICAgcmVzcG9uc2UuZGF0YSxcbiAgICAgIHJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcbiAgICApO1xuXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9LCBmdW5jdGlvbiBvbkFkYXB0ZXJSZWplY3Rpb24ocmVhc29uKSB7XG4gICAgaWYgKCFpc0NhbmNlbChyZWFzb24pKSB7XG4gICAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgICBpZiAocmVhc29uICYmIHJlYXNvbi5yZXNwb25zZSkge1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEsXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxuLyoqXG4gKiBDb25maWctc3BlY2lmaWMgbWVyZ2UtZnVuY3Rpb24gd2hpY2ggY3JlYXRlcyBhIG5ldyBjb25maWctb2JqZWN0XG4gKiBieSBtZXJnaW5nIHR3byBjb25maWd1cmF0aW9uIG9iamVjdHMgdG9nZXRoZXIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzFcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcyXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBOZXcgb2JqZWN0IHJlc3VsdGluZyBmcm9tIG1lcmdpbmcgY29uZmlnMiB0byBjb25maWcxXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbWVyZ2VDb25maWcoY29uZmlnMSwgY29uZmlnMikge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgY29uZmlnMiA9IGNvbmZpZzIgfHwge307XG4gIHZhciBjb25maWcgPSB7fTtcblxuICB2YXIgdmFsdWVGcm9tQ29uZmlnMktleXMgPSBbJ3VybCcsICdtZXRob2QnLCAncGFyYW1zJywgJ2RhdGEnXTtcbiAgdmFyIG1lcmdlRGVlcFByb3BlcnRpZXNLZXlzID0gWydoZWFkZXJzJywgJ2F1dGgnLCAncHJveHknXTtcbiAgdmFyIGRlZmF1bHRUb0NvbmZpZzJLZXlzID0gW1xuICAgICdiYXNlVVJMJywgJ3VybCcsICd0cmFuc2Zvcm1SZXF1ZXN0JywgJ3RyYW5zZm9ybVJlc3BvbnNlJywgJ3BhcmFtc1NlcmlhbGl6ZXInLFxuICAgICd0aW1lb3V0JywgJ3dpdGhDcmVkZW50aWFscycsICdhZGFwdGVyJywgJ3Jlc3BvbnNlVHlwZScsICd4c3JmQ29va2llTmFtZScsXG4gICAgJ3hzcmZIZWFkZXJOYW1lJywgJ29uVXBsb2FkUHJvZ3Jlc3MnLCAnb25Eb3dubG9hZFByb2dyZXNzJyxcbiAgICAnbWF4Q29udGVudExlbmd0aCcsICd2YWxpZGF0ZVN0YXR1cycsICdtYXhSZWRpcmVjdHMnLCAnaHR0cEFnZW50JyxcbiAgICAnaHR0cHNBZ2VudCcsICdjYW5jZWxUb2tlbicsICdzb2NrZXRQYXRoJ1xuICBdO1xuXG4gIHV0aWxzLmZvckVhY2godmFsdWVGcm9tQ29uZmlnMktleXMsIGZ1bmN0aW9uIHZhbHVlRnJvbUNvbmZpZzIocHJvcCkge1xuICAgIGlmICh0eXBlb2YgY29uZmlnMltwcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGNvbmZpZzJbcHJvcF07XG4gICAgfVxuICB9KTtcblxuICB1dGlscy5mb3JFYWNoKG1lcmdlRGVlcFByb3BlcnRpZXNLZXlzLCBmdW5jdGlvbiBtZXJnZURlZXBQcm9wZXJ0aWVzKHByb3ApIHtcbiAgICBpZiAodXRpbHMuaXNPYmplY3QoY29uZmlnMltwcm9wXSkpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IHV0aWxzLmRlZXBNZXJnZShjb25maWcxW3Byb3BdLCBjb25maWcyW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb25maWcyW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMltwcm9wXTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzT2JqZWN0KGNvbmZpZzFbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSB1dGlscy5kZWVwTWVyZ2UoY29uZmlnMVtwcm9wXSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgY29uZmlnMVtwcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGNvbmZpZzFbcHJvcF07XG4gICAgfVxuICB9KTtcblxuICB1dGlscy5mb3JFYWNoKGRlZmF1bHRUb0NvbmZpZzJLZXlzLCBmdW5jdGlvbiBkZWZhdWx0VG9Db25maWcyKHByb3ApIHtcbiAgICBpZiAodHlwZW9mIGNvbmZpZzJbcHJvcF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBjb25maWcyW3Byb3BdO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGNvbmZpZzFbcHJvcF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBjb25maWcxW3Byb3BdO1xuICAgIH1cbiAgfSk7XG5cbiAgdmFyIGF4aW9zS2V5cyA9IHZhbHVlRnJvbUNvbmZpZzJLZXlzXG4gICAgLmNvbmNhdChtZXJnZURlZXBQcm9wZXJ0aWVzS2V5cylcbiAgICAuY29uY2F0KGRlZmF1bHRUb0NvbmZpZzJLZXlzKTtcblxuICB2YXIgb3RoZXJLZXlzID0gT2JqZWN0XG4gICAgLmtleXMoY29uZmlnMilcbiAgICAuZmlsdGVyKGZ1bmN0aW9uIGZpbHRlckF4aW9zS2V5cyhrZXkpIHtcbiAgICAgIHJldHVybiBheGlvc0tleXMuaW5kZXhPZihrZXkpID09PSAtMTtcbiAgICB9KTtcblxuICB1dGlscy5mb3JFYWNoKG90aGVyS2V5cywgZnVuY3Rpb24gb3RoZXJLZXlzRGVmYXVsdFRvQ29uZmlnMihwcm9wKSB7XG4gICAgaWYgKHR5cGVvZiBjb25maWcyW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMltwcm9wXTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb25maWcxW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMVtwcm9wXTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBjb25maWc7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgYnVpbGRVUkwgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG52YXIgSW50ZXJjZXB0b3JNYW5hZ2VyID0gcmVxdWlyZSgnLi9JbnRlcmNlcHRvck1hbmFnZXInKTtcbnZhciBkaXNwYXRjaFJlcXVlc3QgPSByZXF1aXJlKCcuL2Rpc3BhdGNoUmVxdWVzdCcpO1xudmFyIG1lcmdlQ29uZmlnID0gcmVxdWlyZSgnLi9tZXJnZUNvbmZpZycpO1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZUNvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICovXG5mdW5jdGlvbiBBeGlvcyhpbnN0YW5jZUNvbmZpZykge1xuICB0aGlzLmRlZmF1bHRzID0gaW5zdGFuY2VDb25maWc7XG4gIHRoaXMuaW50ZXJjZXB0b3JzID0ge1xuICAgIHJlcXVlc3Q6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKSxcbiAgICByZXNwb25zZTogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpXG4gIH07XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHNwZWNpZmljIGZvciB0aGlzIHJlcXVlc3QgKG1lcmdlZCB3aXRoIHRoaXMuZGVmYXVsdHMpXG4gKi9cbkF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0ID0gZnVuY3Rpb24gcmVxdWVzdChjb25maWcpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIC8vIEFsbG93IGZvciBheGlvcygnZXhhbXBsZS91cmwnWywgY29uZmlnXSkgYSBsYSBmZXRjaCBBUElcbiAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uZmlnID0gYXJndW1lbnRzWzFdIHx8IHt9O1xuICAgIGNvbmZpZy51cmwgPSBhcmd1bWVudHNbMF07XG4gIH0gZWxzZSB7XG4gICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xuICB9XG5cbiAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcblxuICAvLyBTZXQgY29uZmlnLm1ldGhvZFxuICBpZiAoY29uZmlnLm1ldGhvZCkge1xuICAgIGNvbmZpZy5tZXRob2QgPSBjb25maWcubWV0aG9kLnRvTG93ZXJDYXNlKCk7XG4gIH0gZWxzZSBpZiAodGhpcy5kZWZhdWx0cy5tZXRob2QpIHtcbiAgICBjb25maWcubWV0aG9kID0gdGhpcy5kZWZhdWx0cy5tZXRob2QudG9Mb3dlckNhc2UoKTtcbiAgfSBlbHNlIHtcbiAgICBjb25maWcubWV0aG9kID0gJ2dldCc7XG4gIH1cblxuICAvLyBIb29rIHVwIGludGVyY2VwdG9ycyBtaWRkbGV3YXJlXG4gIHZhciBjaGFpbiA9IFtkaXNwYXRjaFJlcXVlc3QsIHVuZGVmaW5lZF07XG4gIHZhciBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKGNvbmZpZyk7XG5cbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVxdWVzdC5mb3JFYWNoKGZ1bmN0aW9uIHVuc2hpZnRSZXF1ZXN0SW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4udW5zaGlmdChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UuZm9yRWFjaChmdW5jdGlvbiBwdXNoUmVzcG9uc2VJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi5wdXNoKGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB3aGlsZSAoY2hhaW4ubGVuZ3RoKSB7XG4gICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihjaGFpbi5zaGlmdCgpLCBjaGFpbi5zaGlmdCgpKTtcbiAgfVxuXG4gIHJldHVybiBwcm9taXNlO1xufTtcblxuQXhpb3MucHJvdG90eXBlLmdldFVyaSA9IGZ1bmN0aW9uIGdldFVyaShjb25maWcpIHtcbiAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcbiAgcmV0dXJuIGJ1aWxkVVJMKGNvbmZpZy51cmwsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKS5yZXBsYWNlKC9eXFw/LywgJycpO1xufTtcblxuLy8gUHJvdmlkZSBhbGlhc2VzIGZvciBzdXBwb3J0ZWQgcmVxdWVzdCBtZXRob2RzXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ29wdGlvbnMnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXRpbHMubWVyZ2UoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBkYXRhLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHV0aWxzLm1lcmdlKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybCxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9KSk7XG4gIH07XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBeGlvcztcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBBIGBDYW5jZWxgIGlzIGFuIG9iamVjdCB0aGF0IGlzIHRocm93biB3aGVuIGFuIG9wZXJhdGlvbiBpcyBjYW5jZWxlZC5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7c3RyaW5nPX0gbWVzc2FnZSBUaGUgbWVzc2FnZS5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsKG1lc3NhZ2UpIHtcbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbn1cblxuQ2FuY2VsLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gJ0NhbmNlbCcgKyAodGhpcy5tZXNzYWdlID8gJzogJyArIHRoaXMubWVzc2FnZSA6ICcnKTtcbn07XG5cbkNhbmNlbC5wcm90b3R5cGUuX19DQU5DRUxfXyA9IHRydWU7XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2FuY2VsID0gcmVxdWlyZSgnLi9DYW5jZWwnKTtcblxuLyoqXG4gKiBBIGBDYW5jZWxUb2tlbmAgaXMgYW4gb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVxdWVzdCBjYW5jZWxsYXRpb24gb2YgYW4gb3BlcmF0aW9uLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZXhlY3V0b3IgVGhlIGV4ZWN1dG9yIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBDYW5jZWxUb2tlbihleGVjdXRvcikge1xuICBpZiAodHlwZW9mIGV4ZWN1dG9yICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZXhlY3V0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICB9XG5cbiAgdmFyIHJlc29sdmVQcm9taXNlO1xuICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiBwcm9taXNlRXhlY3V0b3IocmVzb2x2ZSkge1xuICAgIHJlc29sdmVQcm9taXNlID0gcmVzb2x2ZTtcbiAgfSk7XG5cbiAgdmFyIHRva2VuID0gdGhpcztcbiAgZXhlY3V0b3IoZnVuY3Rpb24gY2FuY2VsKG1lc3NhZ2UpIHtcbiAgICBpZiAodG9rZW4ucmVhc29uKSB7XG4gICAgICAvLyBDYW5jZWxsYXRpb24gaGFzIGFscmVhZHkgYmVlbiByZXF1ZXN0ZWRcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0b2tlbi5yZWFzb24gPSBuZXcgQ2FuY2VsKG1lc3NhZ2UpO1xuICAgIHJlc29sdmVQcm9taXNlKHRva2VuLnJlYXNvbik7XG4gIH0pO1xufVxuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbkNhbmNlbFRva2VuLnByb3RvdHlwZS50aHJvd0lmUmVxdWVzdGVkID0gZnVuY3Rpb24gdGhyb3dJZlJlcXVlc3RlZCgpIHtcbiAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgdGhyb3cgdGhpcy5yZWFzb247XG4gIH1cbn07XG5cbi8qKlxuICogUmV0dXJucyBhbiBvYmplY3QgdGhhdCBjb250YWlucyBhIG5ldyBgQ2FuY2VsVG9rZW5gIGFuZCBhIGZ1bmN0aW9uIHRoYXQsIHdoZW4gY2FsbGVkLFxuICogY2FuY2VscyB0aGUgYENhbmNlbFRva2VuYC5cbiAqL1xuQ2FuY2VsVG9rZW4uc291cmNlID0gZnVuY3Rpb24gc291cmNlKCkge1xuICB2YXIgY2FuY2VsO1xuICB2YXIgdG9rZW4gPSBuZXcgQ2FuY2VsVG9rZW4oZnVuY3Rpb24gZXhlY3V0b3IoYykge1xuICAgIGNhbmNlbCA9IGM7XG4gIH0pO1xuICByZXR1cm4ge1xuICAgIHRva2VuOiB0b2tlbixcbiAgICBjYW5jZWw6IGNhbmNlbFxuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWxUb2tlbjtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBTeW50YWN0aWMgc3VnYXIgZm9yIGludm9raW5nIGEgZnVuY3Rpb24gYW5kIGV4cGFuZGluZyBhbiBhcnJheSBmb3IgYXJndW1lbnRzLlxuICpcbiAqIENvbW1vbiB1c2UgY2FzZSB3b3VsZCBiZSB0byB1c2UgYEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseWAuXG4gKlxuICogIGBgYGpzXG4gKiAgZnVuY3Rpb24gZih4LCB5LCB6KSB7fVxuICogIHZhciBhcmdzID0gWzEsIDIsIDNdO1xuICogIGYuYXBwbHkobnVsbCwgYXJncyk7XG4gKiAgYGBgXG4gKlxuICogV2l0aCBgc3ByZWFkYCB0aGlzIGV4YW1wbGUgY2FuIGJlIHJlLXdyaXR0ZW4uXG4gKlxuICogIGBgYGpzXG4gKiAgc3ByZWFkKGZ1bmN0aW9uKHgsIHksIHopIHt9KShbMSwgMiwgM10pO1xuICogIGBgYFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3ByZWFkKGNhbGxiYWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKGFycikge1xuICAgIHJldHVybiBjYWxsYmFjay5hcHBseShudWxsLCBhcnIpO1xuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xudmFyIEF4aW9zID0gcmVxdWlyZSgnLi9jb3JlL0F4aW9zJyk7XG52YXIgbWVyZ2VDb25maWcgPSByZXF1aXJlKCcuL2NvcmUvbWVyZ2VDb25maWcnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vZGVmYXVsdHMnKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGVmYXVsdENvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICogQHJldHVybiB7QXhpb3N9IEEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRDb25maWcpIHtcbiAgdmFyIGNvbnRleHQgPSBuZXcgQXhpb3MoZGVmYXVsdENvbmZpZyk7XG4gIHZhciBpbnN0YW5jZSA9IGJpbmQoQXhpb3MucHJvdG90eXBlLnJlcXVlc3QsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgYXhpb3MucHJvdG90eXBlIHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgQXhpb3MucHJvdG90eXBlLCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGNvbnRleHQgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBjb250ZXh0KTtcblxuICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbi8vIENyZWF0ZSB0aGUgZGVmYXVsdCBpbnN0YW5jZSB0byBiZSBleHBvcnRlZFxudmFyIGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMpO1xuXG4vLyBFeHBvc2UgQXhpb3MgY2xhc3MgdG8gYWxsb3cgY2xhc3MgaW5oZXJpdGFuY2VcbmF4aW9zLkF4aW9zID0gQXhpb3M7XG5cbi8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIG5ldyBpbnN0YW5jZXNcbmF4aW9zLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpbnN0YW5jZUNvbmZpZykge1xuICByZXR1cm4gY3JlYXRlSW5zdGFuY2UobWVyZ2VDb25maWcoYXhpb3MuZGVmYXVsdHMsIGluc3RhbmNlQ29uZmlnKSk7XG59O1xuXG4vLyBFeHBvc2UgQ2FuY2VsICYgQ2FuY2VsVG9rZW5cbmF4aW9zLkNhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbCcpO1xuYXhpb3MuQ2FuY2VsVG9rZW4gPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWxUb2tlbicpO1xuYXhpb3MuaXNDYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9pc0NhbmNlbCcpO1xuXG4vLyBFeHBvc2UgYWxsL3NwcmVhZFxuYXhpb3MuYWxsID0gZnVuY3Rpb24gYWxsKHByb21pc2VzKSB7XG4gIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG59O1xuYXhpb3Muc3ByZWFkID0gcmVxdWlyZSgnLi9oZWxwZXJzL3NwcmVhZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGF4aW9zO1xuXG4vLyBBbGxvdyB1c2Ugb2YgZGVmYXVsdCBpbXBvcnQgc3ludGF4IGluIFR5cGVTY3JpcHRcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBheGlvcztcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvYXhpb3MnKTsiLCJmdW5jdGlvbiBudW1iZXIobnVtKSB7XG4gIGlmIChudW0gPT09IG51bGwgfHwgbnVtID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gJ3Vua25vd24nO1xuICB9XG5cbiAgcmV0dXJuIG51bS50b0xvY2FsZVN0cmluZygpO1xufVxuXG5mdW5jdGlvbiBzdHJpbmcoc3RyKSB7XG4gIGlmIChzdHIgPT09IG51bGwgfHwgc3RyID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfVxuICByZXR1cm4gc3RyO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG51bWJlcixcbiAgc3RyaW5nXG59O1xuIiwiLy8hIG1vbWVudC5qc1xuXG47KGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6XG4gICAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGZhY3RvcnkpIDpcbiAgICBnbG9iYWwubW9tZW50ID0gZmFjdG9yeSgpXG59KHRoaXMsIChmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcblxuICAgIHZhciBob29rQ2FsbGJhY2s7XG5cbiAgICBmdW5jdGlvbiBob29rcyAoKSB7XG4gICAgICAgIHJldHVybiBob29rQ2FsbGJhY2suYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICB9XG5cbiAgICAvLyBUaGlzIGlzIGRvbmUgdG8gcmVnaXN0ZXIgdGhlIG1ldGhvZCBjYWxsZWQgd2l0aCBtb21lbnQoKVxuICAgIC8vIHdpdGhvdXQgY3JlYXRpbmcgY2lyY3VsYXIgZGVwZW5kZW5jaWVzLlxuICAgIGZ1bmN0aW9uIHNldEhvb2tDYWxsYmFjayAoY2FsbGJhY2spIHtcbiAgICAgICAgaG9va0NhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNBcnJheShpbnB1dCkge1xuICAgICAgICByZXR1cm4gaW5wdXQgaW5zdGFuY2VvZiBBcnJheSB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaW5wdXQpID09PSAnW29iamVjdCBBcnJheV0nO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzT2JqZWN0KGlucHV0KSB7XG4gICAgICAgIC8vIElFOCB3aWxsIHRyZWF0IHVuZGVmaW5lZCBhbmQgbnVsbCBhcyBvYmplY3QgaWYgaXQgd2Fzbid0IGZvclxuICAgICAgICAvLyBpbnB1dCAhPSBudWxsXG4gICAgICAgIHJldHVybiBpbnB1dCAhPSBudWxsICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpbnB1dCkgPT09ICdbb2JqZWN0IE9iamVjdF0nO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzT2JqZWN0RW1wdHkob2JqKSB7XG4gICAgICAgIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcykge1xuICAgICAgICAgICAgcmV0dXJuIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopLmxlbmd0aCA9PT0gMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgaztcbiAgICAgICAgICAgIGZvciAoayBpbiBvYmopIHtcbiAgICAgICAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGspKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzVW5kZWZpbmVkKGlucHV0KSB7XG4gICAgICAgIHJldHVybiBpbnB1dCA9PT0gdm9pZCAwO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzTnVtYmVyKGlucHV0KSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgaW5wdXQgPT09ICdudW1iZXInIHx8IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpbnB1dCkgPT09ICdbb2JqZWN0IE51bWJlcl0nO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzRGF0ZShpbnB1dCkge1xuICAgICAgICByZXR1cm4gaW5wdXQgaW5zdGFuY2VvZiBEYXRlIHx8IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpbnB1dCkgPT09ICdbb2JqZWN0IERhdGVdJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYXAoYXJyLCBmbikge1xuICAgICAgICB2YXIgcmVzID0gW10sIGk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHJlcy5wdXNoKGZuKGFycltpXSwgaSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFzT3duUHJvcChhLCBiKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYSwgYik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXh0ZW5kKGEsIGIpIHtcbiAgICAgICAgZm9yICh2YXIgaSBpbiBiKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duUHJvcChiLCBpKSkge1xuICAgICAgICAgICAgICAgIGFbaV0gPSBiW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhhc093blByb3AoYiwgJ3RvU3RyaW5nJykpIHtcbiAgICAgICAgICAgIGEudG9TdHJpbmcgPSBiLnRvU3RyaW5nO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhhc093blByb3AoYiwgJ3ZhbHVlT2YnKSkge1xuICAgICAgICAgICAgYS52YWx1ZU9mID0gYi52YWx1ZU9mO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlVVRDIChpbnB1dCwgZm9ybWF0LCBsb2NhbGUsIHN0cmljdCkge1xuICAgICAgICByZXR1cm4gY3JlYXRlTG9jYWxPclVUQyhpbnB1dCwgZm9ybWF0LCBsb2NhbGUsIHN0cmljdCwgdHJ1ZSkudXRjKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVmYXVsdFBhcnNpbmdGbGFncygpIHtcbiAgICAgICAgLy8gV2UgbmVlZCB0byBkZWVwIGNsb25lIHRoaXMgb2JqZWN0LlxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZW1wdHkgICAgICAgICAgIDogZmFsc2UsXG4gICAgICAgICAgICB1bnVzZWRUb2tlbnMgICAgOiBbXSxcbiAgICAgICAgICAgIHVudXNlZElucHV0ICAgICA6IFtdLFxuICAgICAgICAgICAgb3ZlcmZsb3cgICAgICAgIDogLTIsXG4gICAgICAgICAgICBjaGFyc0xlZnRPdmVyICAgOiAwLFxuICAgICAgICAgICAgbnVsbElucHV0ICAgICAgIDogZmFsc2UsXG4gICAgICAgICAgICBpbnZhbGlkTW9udGggICAgOiBudWxsLFxuICAgICAgICAgICAgaW52YWxpZEZvcm1hdCAgIDogZmFsc2UsXG4gICAgICAgICAgICB1c2VySW52YWxpZGF0ZWQgOiBmYWxzZSxcbiAgICAgICAgICAgIGlzbyAgICAgICAgICAgICA6IGZhbHNlLFxuICAgICAgICAgICAgcGFyc2VkRGF0ZVBhcnRzIDogW10sXG4gICAgICAgICAgICBtZXJpZGllbSAgICAgICAgOiBudWxsLFxuICAgICAgICAgICAgcmZjMjgyMiAgICAgICAgIDogZmFsc2UsXG4gICAgICAgICAgICB3ZWVrZGF5TWlzbWF0Y2ggOiBmYWxzZVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFBhcnNpbmdGbGFncyhtKSB7XG4gICAgICAgIGlmIChtLl9wZiA9PSBudWxsKSB7XG4gICAgICAgICAgICBtLl9wZiA9IGRlZmF1bHRQYXJzaW5nRmxhZ3MoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbS5fcGY7XG4gICAgfVxuXG4gICAgdmFyIHNvbWU7XG4gICAgaWYgKEFycmF5LnByb3RvdHlwZS5zb21lKSB7XG4gICAgICAgIHNvbWUgPSBBcnJheS5wcm90b3R5cGUuc29tZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzb21lID0gZnVuY3Rpb24gKGZ1bikge1xuICAgICAgICAgICAgdmFyIHQgPSBPYmplY3QodGhpcyk7XG4gICAgICAgICAgICB2YXIgbGVuID0gdC5sZW5ndGggPj4+IDA7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoaSBpbiB0ICYmIGZ1bi5jYWxsKHRoaXMsIHRbaV0sIGksIHQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzVmFsaWQobSkge1xuICAgICAgICBpZiAobS5faXNWYWxpZCA9PSBudWxsKSB7XG4gICAgICAgICAgICB2YXIgZmxhZ3MgPSBnZXRQYXJzaW5nRmxhZ3MobSk7XG4gICAgICAgICAgICB2YXIgcGFyc2VkUGFydHMgPSBzb21lLmNhbGwoZmxhZ3MucGFyc2VkRGF0ZVBhcnRzLCBmdW5jdGlvbiAoaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpICE9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciBpc05vd1ZhbGlkID0gIWlzTmFOKG0uX2QuZ2V0VGltZSgpKSAmJlxuICAgICAgICAgICAgICAgIGZsYWdzLm92ZXJmbG93IDwgMCAmJlxuICAgICAgICAgICAgICAgICFmbGFncy5lbXB0eSAmJlxuICAgICAgICAgICAgICAgICFmbGFncy5pbnZhbGlkTW9udGggJiZcbiAgICAgICAgICAgICAgICAhZmxhZ3MuaW52YWxpZFdlZWtkYXkgJiZcbiAgICAgICAgICAgICAgICAhZmxhZ3Mud2Vla2RheU1pc21hdGNoICYmXG4gICAgICAgICAgICAgICAgIWZsYWdzLm51bGxJbnB1dCAmJlxuICAgICAgICAgICAgICAgICFmbGFncy5pbnZhbGlkRm9ybWF0ICYmXG4gICAgICAgICAgICAgICAgIWZsYWdzLnVzZXJJbnZhbGlkYXRlZCAmJlxuICAgICAgICAgICAgICAgICghZmxhZ3MubWVyaWRpZW0gfHwgKGZsYWdzLm1lcmlkaWVtICYmIHBhcnNlZFBhcnRzKSk7XG5cbiAgICAgICAgICAgIGlmIChtLl9zdHJpY3QpIHtcbiAgICAgICAgICAgICAgICBpc05vd1ZhbGlkID0gaXNOb3dWYWxpZCAmJlxuICAgICAgICAgICAgICAgICAgICBmbGFncy5jaGFyc0xlZnRPdmVyID09PSAwICYmXG4gICAgICAgICAgICAgICAgICAgIGZsYWdzLnVudXNlZFRva2Vucy5sZW5ndGggPT09IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgZmxhZ3MuYmlnSG91ciA9PT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoT2JqZWN0LmlzRnJvemVuID09IG51bGwgfHwgIU9iamVjdC5pc0Zyb3plbihtKSkge1xuICAgICAgICAgICAgICAgIG0uX2lzVmFsaWQgPSBpc05vd1ZhbGlkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzTm93VmFsaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG0uX2lzVmFsaWQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlSW52YWxpZCAoZmxhZ3MpIHtcbiAgICAgICAgdmFyIG0gPSBjcmVhdGVVVEMoTmFOKTtcbiAgICAgICAgaWYgKGZsYWdzICE9IG51bGwpIHtcbiAgICAgICAgICAgIGV4dGVuZChnZXRQYXJzaW5nRmxhZ3MobSksIGZsYWdzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhtKS51c2VySW52YWxpZGF0ZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG07XG4gICAgfVxuXG4gICAgLy8gUGx1Z2lucyB0aGF0IGFkZCBwcm9wZXJ0aWVzIHNob3VsZCBhbHNvIGFkZCB0aGUga2V5IGhlcmUgKG51bGwgdmFsdWUpLFxuICAgIC8vIHNvIHdlIGNhbiBwcm9wZXJseSBjbG9uZSBvdXJzZWx2ZXMuXG4gICAgdmFyIG1vbWVudFByb3BlcnRpZXMgPSBob29rcy5tb21lbnRQcm9wZXJ0aWVzID0gW107XG5cbiAgICBmdW5jdGlvbiBjb3B5Q29uZmlnKHRvLCBmcm9tKSB7XG4gICAgICAgIHZhciBpLCBwcm9wLCB2YWw7XG5cbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChmcm9tLl9pc0FNb21lbnRPYmplY3QpKSB7XG4gICAgICAgICAgICB0by5faXNBTW9tZW50T2JqZWN0ID0gZnJvbS5faXNBTW9tZW50T2JqZWN0O1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5faSkpIHtcbiAgICAgICAgICAgIHRvLl9pID0gZnJvbS5faTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKGZyb20uX2YpKSB7XG4gICAgICAgICAgICB0by5fZiA9IGZyb20uX2Y7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChmcm9tLl9sKSkge1xuICAgICAgICAgICAgdG8uX2wgPSBmcm9tLl9sO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5fc3RyaWN0KSkge1xuICAgICAgICAgICAgdG8uX3N0cmljdCA9IGZyb20uX3N0cmljdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKGZyb20uX3R6bSkpIHtcbiAgICAgICAgICAgIHRvLl90em0gPSBmcm9tLl90em07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChmcm9tLl9pc1VUQykpIHtcbiAgICAgICAgICAgIHRvLl9pc1VUQyA9IGZyb20uX2lzVVRDO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5fb2Zmc2V0KSkge1xuICAgICAgICAgICAgdG8uX29mZnNldCA9IGZyb20uX29mZnNldDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKGZyb20uX3BmKSkge1xuICAgICAgICAgICAgdG8uX3BmID0gZ2V0UGFyc2luZ0ZsYWdzKGZyb20pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5fbG9jYWxlKSkge1xuICAgICAgICAgICAgdG8uX2xvY2FsZSA9IGZyb20uX2xvY2FsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtb21lbnRQcm9wZXJ0aWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBtb21lbnRQcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcHJvcCA9IG1vbWVudFByb3BlcnRpZXNbaV07XG4gICAgICAgICAgICAgICAgdmFsID0gZnJvbVtwcm9wXTtcbiAgICAgICAgICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKHZhbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9bcHJvcF0gPSB2YWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRvO1xuICAgIH1cblxuICAgIHZhciB1cGRhdGVJblByb2dyZXNzID0gZmFsc2U7XG5cbiAgICAvLyBNb21lbnQgcHJvdG90eXBlIG9iamVjdFxuICAgIGZ1bmN0aW9uIE1vbWVudChjb25maWcpIHtcbiAgICAgICAgY29weUNvbmZpZyh0aGlzLCBjb25maWcpO1xuICAgICAgICB0aGlzLl9kID0gbmV3IERhdGUoY29uZmlnLl9kICE9IG51bGwgPyBjb25maWcuX2QuZ2V0VGltZSgpIDogTmFOKTtcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgdGhpcy5fZCA9IG5ldyBEYXRlKE5hTik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gUHJldmVudCBpbmZpbml0ZSBsb29wIGluIGNhc2UgdXBkYXRlT2Zmc2V0IGNyZWF0ZXMgbmV3IG1vbWVudFxuICAgICAgICAvLyBvYmplY3RzLlxuICAgICAgICBpZiAodXBkYXRlSW5Qcm9ncmVzcyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHVwZGF0ZUluUHJvZ3Jlc3MgPSB0cnVlO1xuICAgICAgICAgICAgaG9va3MudXBkYXRlT2Zmc2V0KHRoaXMpO1xuICAgICAgICAgICAgdXBkYXRlSW5Qcm9ncmVzcyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNNb21lbnQgKG9iaikge1xuICAgICAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgTW9tZW50IHx8IChvYmogIT0gbnVsbCAmJiBvYmouX2lzQU1vbWVudE9iamVjdCAhPSBudWxsKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhYnNGbG9vciAobnVtYmVyKSB7XG4gICAgICAgIGlmIChudW1iZXIgPCAwKSB7XG4gICAgICAgICAgICAvLyAtMCAtPiAwXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5jZWlsKG51bWJlcikgfHwgMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKG51bWJlcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b0ludChhcmd1bWVudEZvckNvZXJjaW9uKSB7XG4gICAgICAgIHZhciBjb2VyY2VkTnVtYmVyID0gK2FyZ3VtZW50Rm9yQ29lcmNpb24sXG4gICAgICAgICAgICB2YWx1ZSA9IDA7XG5cbiAgICAgICAgaWYgKGNvZXJjZWROdW1iZXIgIT09IDAgJiYgaXNGaW5pdGUoY29lcmNlZE51bWJlcikpIHtcbiAgICAgICAgICAgIHZhbHVlID0gYWJzRmxvb3IoY29lcmNlZE51bWJlcik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgLy8gY29tcGFyZSB0d28gYXJyYXlzLCByZXR1cm4gdGhlIG51bWJlciBvZiBkaWZmZXJlbmNlc1xuICAgIGZ1bmN0aW9uIGNvbXBhcmVBcnJheXMoYXJyYXkxLCBhcnJheTIsIGRvbnRDb252ZXJ0KSB7XG4gICAgICAgIHZhciBsZW4gPSBNYXRoLm1pbihhcnJheTEubGVuZ3RoLCBhcnJheTIubGVuZ3RoKSxcbiAgICAgICAgICAgIGxlbmd0aERpZmYgPSBNYXRoLmFicyhhcnJheTEubGVuZ3RoIC0gYXJyYXkyLmxlbmd0aCksXG4gICAgICAgICAgICBkaWZmcyA9IDAsXG4gICAgICAgICAgICBpO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGlmICgoZG9udENvbnZlcnQgJiYgYXJyYXkxW2ldICE9PSBhcnJheTJbaV0pIHx8XG4gICAgICAgICAgICAgICAgKCFkb250Q29udmVydCAmJiB0b0ludChhcnJheTFbaV0pICE9PSB0b0ludChhcnJheTJbaV0pKSkge1xuICAgICAgICAgICAgICAgIGRpZmZzKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRpZmZzICsgbGVuZ3RoRGlmZjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB3YXJuKG1zZykge1xuICAgICAgICBpZiAoaG9va3Muc3VwcHJlc3NEZXByZWNhdGlvbldhcm5pbmdzID09PSBmYWxzZSAmJlxuICAgICAgICAgICAgICAgICh0eXBlb2YgY29uc29sZSAhPT0gICd1bmRlZmluZWQnKSAmJiBjb25zb2xlLndhcm4pIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignRGVwcmVjYXRpb24gd2FybmluZzogJyArIG1zZyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZXByZWNhdGUobXNnLCBmbikge1xuICAgICAgICB2YXIgZmlyc3RUaW1lID0gdHJ1ZTtcblxuICAgICAgICByZXR1cm4gZXh0ZW5kKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChob29rcy5kZXByZWNhdGlvbkhhbmRsZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGhvb2tzLmRlcHJlY2F0aW9uSGFuZGxlcihudWxsLCBtc2cpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZpcnN0VGltZSkge1xuICAgICAgICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgICAgICAgdmFyIGFyZztcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBhcmcgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhcmd1bWVudHNbaV0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgKz0gJ1xcblsnICsgaSArICddICc7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gYXJndW1lbnRzWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJnICs9IGtleSArICc6ICcgKyBhcmd1bWVudHNbMF1ba2V5XSArICcsICc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgPSBhcmcuc2xpY2UoMCwgLTIpOyAvLyBSZW1vdmUgdHJhaWxpbmcgY29tbWEgYW5kIHNwYWNlXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGFyZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHdhcm4obXNnICsgJ1xcbkFyZ3VtZW50czogJyArIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MpLmpvaW4oJycpICsgJ1xcbicgKyAobmV3IEVycm9yKCkpLnN0YWNrKTtcbiAgICAgICAgICAgICAgICBmaXJzdFRpbWUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9LCBmbik7XG4gICAgfVxuXG4gICAgdmFyIGRlcHJlY2F0aW9ucyA9IHt9O1xuXG4gICAgZnVuY3Rpb24gZGVwcmVjYXRlU2ltcGxlKG5hbWUsIG1zZykge1xuICAgICAgICBpZiAoaG9va3MuZGVwcmVjYXRpb25IYW5kbGVyICE9IG51bGwpIHtcbiAgICAgICAgICAgIGhvb2tzLmRlcHJlY2F0aW9uSGFuZGxlcihuYW1lLCBtc2cpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZGVwcmVjYXRpb25zW25hbWVdKSB7XG4gICAgICAgICAgICB3YXJuKG1zZyk7XG4gICAgICAgICAgICBkZXByZWNhdGlvbnNbbmFtZV0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaG9va3Muc3VwcHJlc3NEZXByZWNhdGlvbldhcm5pbmdzID0gZmFsc2U7XG4gICAgaG9va3MuZGVwcmVjYXRpb25IYW5kbGVyID0gbnVsbDtcblxuICAgIGZ1bmN0aW9uIGlzRnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIGlucHV0IGluc3RhbmNlb2YgRnVuY3Rpb24gfHwgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGlucHV0KSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXQgKGNvbmZpZykge1xuICAgICAgICB2YXIgcHJvcCwgaTtcbiAgICAgICAgZm9yIChpIGluIGNvbmZpZykge1xuICAgICAgICAgICAgcHJvcCA9IGNvbmZpZ1tpXTtcbiAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKHByb3ApKSB7XG4gICAgICAgICAgICAgICAgdGhpc1tpXSA9IHByb3A7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXNbJ18nICsgaV0gPSBwcm9wO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZztcbiAgICAgICAgLy8gTGVuaWVudCBvcmRpbmFsIHBhcnNpbmcgYWNjZXB0cyBqdXN0IGEgbnVtYmVyIGluIGFkZGl0aW9uIHRvXG4gICAgICAgIC8vIG51bWJlciArIChwb3NzaWJseSkgc3R1ZmYgY29taW5nIGZyb20gX2RheU9mTW9udGhPcmRpbmFsUGFyc2UuXG4gICAgICAgIC8vIFRPRE86IFJlbW92ZSBcIm9yZGluYWxQYXJzZVwiIGZhbGxiYWNrIGluIG5leHQgbWFqb3IgcmVsZWFzZS5cbiAgICAgICAgdGhpcy5fZGF5T2ZNb250aE9yZGluYWxQYXJzZUxlbmllbnQgPSBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgKHRoaXMuX2RheU9mTW9udGhPcmRpbmFsUGFyc2Uuc291cmNlIHx8IHRoaXMuX29yZGluYWxQYXJzZS5zb3VyY2UpICtcbiAgICAgICAgICAgICAgICAnfCcgKyAoL1xcZHsxLDJ9Lykuc291cmNlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtZXJnZUNvbmZpZ3MocGFyZW50Q29uZmlnLCBjaGlsZENvbmZpZykge1xuICAgICAgICB2YXIgcmVzID0gZXh0ZW5kKHt9LCBwYXJlbnRDb25maWcpLCBwcm9wO1xuICAgICAgICBmb3IgKHByb3AgaW4gY2hpbGRDb25maWcpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd25Qcm9wKGNoaWxkQ29uZmlnLCBwcm9wKSkge1xuICAgICAgICAgICAgICAgIGlmIChpc09iamVjdChwYXJlbnRDb25maWdbcHJvcF0pICYmIGlzT2JqZWN0KGNoaWxkQ29uZmlnW3Byb3BdKSkge1xuICAgICAgICAgICAgICAgICAgICByZXNbcHJvcF0gPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgZXh0ZW5kKHJlc1twcm9wXSwgcGFyZW50Q29uZmlnW3Byb3BdKTtcbiAgICAgICAgICAgICAgICAgICAgZXh0ZW5kKHJlc1twcm9wXSwgY2hpbGRDb25maWdbcHJvcF0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hpbGRDb25maWdbcHJvcF0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICByZXNbcHJvcF0gPSBjaGlsZENvbmZpZ1twcm9wXTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgcmVzW3Byb3BdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKHByb3AgaW4gcGFyZW50Q29uZmlnKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duUHJvcChwYXJlbnRDb25maWcsIHByb3ApICYmXG4gICAgICAgICAgICAgICAgICAgICFoYXNPd25Qcm9wKGNoaWxkQ29uZmlnLCBwcm9wKSAmJlxuICAgICAgICAgICAgICAgICAgICBpc09iamVjdChwYXJlbnRDb25maWdbcHJvcF0pKSB7XG4gICAgICAgICAgICAgICAgLy8gbWFrZSBzdXJlIGNoYW5nZXMgdG8gcHJvcGVydGllcyBkb24ndCBtb2RpZnkgcGFyZW50IGNvbmZpZ1xuICAgICAgICAgICAgICAgIHJlc1twcm9wXSA9IGV4dGVuZCh7fSwgcmVzW3Byb3BdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIExvY2FsZShjb25maWcpIHtcbiAgICAgICAgaWYgKGNvbmZpZyAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnNldChjb25maWcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGtleXM7XG5cbiAgICBpZiAoT2JqZWN0LmtleXMpIHtcbiAgICAgICAga2V5cyA9IE9iamVjdC5rZXlzO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGtleXMgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICB2YXIgaSwgcmVzID0gW107XG4gICAgICAgICAgICBmb3IgKGkgaW4gb2JqKSB7XG4gICAgICAgICAgICAgICAgaWYgKGhhc093blByb3Aob2JqLCBpKSkge1xuICAgICAgICAgICAgICAgICAgICByZXMucHVzaChpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHZhciBkZWZhdWx0Q2FsZW5kYXIgPSB7XG4gICAgICAgIHNhbWVEYXkgOiAnW1RvZGF5IGF0XSBMVCcsXG4gICAgICAgIG5leHREYXkgOiAnW1RvbW9ycm93IGF0XSBMVCcsXG4gICAgICAgIG5leHRXZWVrIDogJ2RkZGQgW2F0XSBMVCcsXG4gICAgICAgIGxhc3REYXkgOiAnW1llc3RlcmRheSBhdF0gTFQnLFxuICAgICAgICBsYXN0V2VlayA6ICdbTGFzdF0gZGRkZCBbYXRdIExUJyxcbiAgICAgICAgc2FtZUVsc2UgOiAnTCdcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gY2FsZW5kYXIgKGtleSwgbW9tLCBub3cpIHtcbiAgICAgICAgdmFyIG91dHB1dCA9IHRoaXMuX2NhbGVuZGFyW2tleV0gfHwgdGhpcy5fY2FsZW5kYXJbJ3NhbWVFbHNlJ107XG4gICAgICAgIHJldHVybiBpc0Z1bmN0aW9uKG91dHB1dCkgPyBvdXRwdXQuY2FsbChtb20sIG5vdykgOiBvdXRwdXQ7XG4gICAgfVxuXG4gICAgdmFyIGRlZmF1bHRMb25nRGF0ZUZvcm1hdCA9IHtcbiAgICAgICAgTFRTICA6ICdoOm1tOnNzIEEnLFxuICAgICAgICBMVCAgIDogJ2g6bW0gQScsXG4gICAgICAgIEwgICAgOiAnTU0vREQvWVlZWScsXG4gICAgICAgIExMICAgOiAnTU1NTSBELCBZWVlZJyxcbiAgICAgICAgTExMICA6ICdNTU1NIEQsIFlZWVkgaDptbSBBJyxcbiAgICAgICAgTExMTCA6ICdkZGRkLCBNTU1NIEQsIFlZWVkgaDptbSBBJ1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBsb25nRGF0ZUZvcm1hdCAoa2V5KSB7XG4gICAgICAgIHZhciBmb3JtYXQgPSB0aGlzLl9sb25nRGF0ZUZvcm1hdFtrZXldLFxuICAgICAgICAgICAgZm9ybWF0VXBwZXIgPSB0aGlzLl9sb25nRGF0ZUZvcm1hdFtrZXkudG9VcHBlckNhc2UoKV07XG5cbiAgICAgICAgaWYgKGZvcm1hdCB8fCAhZm9ybWF0VXBwZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBmb3JtYXQ7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9sb25nRGF0ZUZvcm1hdFtrZXldID0gZm9ybWF0VXBwZXIucmVwbGFjZSgvTU1NTXxNTXxERHxkZGRkL2csIGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWwuc2xpY2UoMSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9sb25nRGF0ZUZvcm1hdFtrZXldO1xuICAgIH1cblxuICAgIHZhciBkZWZhdWx0SW52YWxpZERhdGUgPSAnSW52YWxpZCBkYXRlJztcblxuICAgIGZ1bmN0aW9uIGludmFsaWREYXRlICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludmFsaWREYXRlO1xuICAgIH1cblxuICAgIHZhciBkZWZhdWx0T3JkaW5hbCA9ICclZCc7XG4gICAgdmFyIGRlZmF1bHREYXlPZk1vbnRoT3JkaW5hbFBhcnNlID0gL1xcZHsxLDJ9LztcblxuICAgIGZ1bmN0aW9uIG9yZGluYWwgKG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3JkaW5hbC5yZXBsYWNlKCclZCcsIG51bWJlcik7XG4gICAgfVxuXG4gICAgdmFyIGRlZmF1bHRSZWxhdGl2ZVRpbWUgPSB7XG4gICAgICAgIGZ1dHVyZSA6ICdpbiAlcycsXG4gICAgICAgIHBhc3QgICA6ICclcyBhZ28nLFxuICAgICAgICBzICA6ICdhIGZldyBzZWNvbmRzJyxcbiAgICAgICAgc3MgOiAnJWQgc2Vjb25kcycsXG4gICAgICAgIG0gIDogJ2EgbWludXRlJyxcbiAgICAgICAgbW0gOiAnJWQgbWludXRlcycsXG4gICAgICAgIGggIDogJ2FuIGhvdXInLFxuICAgICAgICBoaCA6ICclZCBob3VycycsXG4gICAgICAgIGQgIDogJ2EgZGF5JyxcbiAgICAgICAgZGQgOiAnJWQgZGF5cycsXG4gICAgICAgIE0gIDogJ2EgbW9udGgnLFxuICAgICAgICBNTSA6ICclZCBtb250aHMnLFxuICAgICAgICB5ICA6ICdhIHllYXInLFxuICAgICAgICB5eSA6ICclZCB5ZWFycydcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gcmVsYXRpdmVUaW1lIChudW1iZXIsIHdpdGhvdXRTdWZmaXgsIHN0cmluZywgaXNGdXR1cmUpIHtcbiAgICAgICAgdmFyIG91dHB1dCA9IHRoaXMuX3JlbGF0aXZlVGltZVtzdHJpbmddO1xuICAgICAgICByZXR1cm4gKGlzRnVuY3Rpb24ob3V0cHV0KSkgP1xuICAgICAgICAgICAgb3V0cHV0KG51bWJlciwgd2l0aG91dFN1ZmZpeCwgc3RyaW5nLCBpc0Z1dHVyZSkgOlxuICAgICAgICAgICAgb3V0cHV0LnJlcGxhY2UoLyVkL2ksIG51bWJlcik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFzdEZ1dHVyZSAoZGlmZiwgb3V0cHV0KSB7XG4gICAgICAgIHZhciBmb3JtYXQgPSB0aGlzLl9yZWxhdGl2ZVRpbWVbZGlmZiA+IDAgPyAnZnV0dXJlJyA6ICdwYXN0J107XG4gICAgICAgIHJldHVybiBpc0Z1bmN0aW9uKGZvcm1hdCkgPyBmb3JtYXQob3V0cHV0KSA6IGZvcm1hdC5yZXBsYWNlKC8lcy9pLCBvdXRwdXQpO1xuICAgIH1cblxuICAgIHZhciBhbGlhc2VzID0ge307XG5cbiAgICBmdW5jdGlvbiBhZGRVbml0QWxpYXMgKHVuaXQsIHNob3J0aGFuZCkge1xuICAgICAgICB2YXIgbG93ZXJDYXNlID0gdW5pdC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBhbGlhc2VzW2xvd2VyQ2FzZV0gPSBhbGlhc2VzW2xvd2VyQ2FzZSArICdzJ10gPSBhbGlhc2VzW3Nob3J0aGFuZF0gPSB1bml0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG5vcm1hbGl6ZVVuaXRzKHVuaXRzKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdW5pdHMgPT09ICdzdHJpbmcnID8gYWxpYXNlc1t1bml0c10gfHwgYWxpYXNlc1t1bml0cy50b0xvd2VyQ2FzZSgpXSA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBub3JtYWxpemVPYmplY3RVbml0cyhpbnB1dE9iamVjdCkge1xuICAgICAgICB2YXIgbm9ybWFsaXplZElucHV0ID0ge30sXG4gICAgICAgICAgICBub3JtYWxpemVkUHJvcCxcbiAgICAgICAgICAgIHByb3A7XG5cbiAgICAgICAgZm9yIChwcm9wIGluIGlucHV0T2JqZWN0KSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duUHJvcChpbnB1dE9iamVjdCwgcHJvcCkpIHtcbiAgICAgICAgICAgICAgICBub3JtYWxpemVkUHJvcCA9IG5vcm1hbGl6ZVVuaXRzKHByb3ApO1xuICAgICAgICAgICAgICAgIGlmIChub3JtYWxpemVkUHJvcCkge1xuICAgICAgICAgICAgICAgICAgICBub3JtYWxpemVkSW5wdXRbbm9ybWFsaXplZFByb3BdID0gaW5wdXRPYmplY3RbcHJvcF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5vcm1hbGl6ZWRJbnB1dDtcbiAgICB9XG5cbiAgICB2YXIgcHJpb3JpdGllcyA9IHt9O1xuXG4gICAgZnVuY3Rpb24gYWRkVW5pdFByaW9yaXR5KHVuaXQsIHByaW9yaXR5KSB7XG4gICAgICAgIHByaW9yaXRpZXNbdW5pdF0gPSBwcmlvcml0eTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQcmlvcml0aXplZFVuaXRzKHVuaXRzT2JqKSB7XG4gICAgICAgIHZhciB1bml0cyA9IFtdO1xuICAgICAgICBmb3IgKHZhciB1IGluIHVuaXRzT2JqKSB7XG4gICAgICAgICAgICB1bml0cy5wdXNoKHt1bml0OiB1LCBwcmlvcml0eTogcHJpb3JpdGllc1t1XX0pO1xuICAgICAgICB9XG4gICAgICAgIHVuaXRzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgIHJldHVybiBhLnByaW9yaXR5IC0gYi5wcmlvcml0eTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB1bml0cztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB6ZXJvRmlsbChudW1iZXIsIHRhcmdldExlbmd0aCwgZm9yY2VTaWduKSB7XG4gICAgICAgIHZhciBhYnNOdW1iZXIgPSAnJyArIE1hdGguYWJzKG51bWJlciksXG4gICAgICAgICAgICB6ZXJvc1RvRmlsbCA9IHRhcmdldExlbmd0aCAtIGFic051bWJlci5sZW5ndGgsXG4gICAgICAgICAgICBzaWduID0gbnVtYmVyID49IDA7XG4gICAgICAgIHJldHVybiAoc2lnbiA/IChmb3JjZVNpZ24gPyAnKycgOiAnJykgOiAnLScpICtcbiAgICAgICAgICAgIE1hdGgucG93KDEwLCBNYXRoLm1heCgwLCB6ZXJvc1RvRmlsbCkpLnRvU3RyaW5nKCkuc3Vic3RyKDEpICsgYWJzTnVtYmVyO1xuICAgIH1cblxuICAgIHZhciBmb3JtYXR0aW5nVG9rZW5zID0gLyhcXFtbXlxcW10qXFxdKXwoXFxcXCk/KFtIaF1tbShzcyk/fE1vfE1NP00/TT98RG98REREb3xERD9EP0Q/fGRkZD9kP3xkbz98d1tvfHddP3xXW298V10/fFFvP3xZWVlZWVl8WVlZWVl8WVlZWXxZWXxnZyhnZ2c/KT98R0coR0dHPyk/fGV8RXxhfEF8aGg/fEhIP3xraz98bW0/fHNzP3xTezEsOX18eHxYfHp6P3xaWj98LikvZztcblxuICAgIHZhciBsb2NhbEZvcm1hdHRpbmdUb2tlbnMgPSAvKFxcW1teXFxbXSpcXF0pfChcXFxcKT8oTFRTfExUfExMP0w/TD98bHsxLDR9KS9nO1xuXG4gICAgdmFyIGZvcm1hdEZ1bmN0aW9ucyA9IHt9O1xuXG4gICAgdmFyIGZvcm1hdFRva2VuRnVuY3Rpb25zID0ge307XG5cbiAgICAvLyB0b2tlbjogICAgJ00nXG4gICAgLy8gcGFkZGVkOiAgIFsnTU0nLCAyXVxuICAgIC8vIG9yZGluYWw6ICAnTW8nXG4gICAgLy8gY2FsbGJhY2s6IGZ1bmN0aW9uICgpIHsgdGhpcy5tb250aCgpICsgMSB9XG4gICAgZnVuY3Rpb24gYWRkRm9ybWF0VG9rZW4gKHRva2VuLCBwYWRkZWQsIG9yZGluYWwsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBmdW5jID0gY2FsbGJhY2s7XG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBmdW5jID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzW2NhbGxiYWNrXSgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgICAgIGZvcm1hdFRva2VuRnVuY3Rpb25zW3Rva2VuXSA9IGZ1bmM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhZGRlZCkge1xuICAgICAgICAgICAgZm9ybWF0VG9rZW5GdW5jdGlvbnNbcGFkZGVkWzBdXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gemVyb0ZpbGwoZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpLCBwYWRkZWRbMV0sIHBhZGRlZFsyXSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcmRpbmFsKSB7XG4gICAgICAgICAgICBmb3JtYXRUb2tlbkZ1bmN0aW9uc1tvcmRpbmFsXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkub3JkaW5hbChmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyksIHRva2VuKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVGb3JtYXR0aW5nVG9rZW5zKGlucHV0KSB7XG4gICAgICAgIGlmIChpbnB1dC5tYXRjaCgvXFxbW1xcc1xcU10vKSkge1xuICAgICAgICAgICAgcmV0dXJuIGlucHV0LnJlcGxhY2UoL15cXFt8XFxdJC9nLCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlucHV0LnJlcGxhY2UoL1xcXFwvZywgJycpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1ha2VGb3JtYXRGdW5jdGlvbihmb3JtYXQpIHtcbiAgICAgICAgdmFyIGFycmF5ID0gZm9ybWF0Lm1hdGNoKGZvcm1hdHRpbmdUb2tlbnMpLCBpLCBsZW5ndGg7XG5cbiAgICAgICAgZm9yIChpID0gMCwgbGVuZ3RoID0gYXJyYXkubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChmb3JtYXRUb2tlbkZ1bmN0aW9uc1thcnJheVtpXV0pIHtcbiAgICAgICAgICAgICAgICBhcnJheVtpXSA9IGZvcm1hdFRva2VuRnVuY3Rpb25zW2FycmF5W2ldXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYXJyYXlbaV0gPSByZW1vdmVGb3JtYXR0aW5nVG9rZW5zKGFycmF5W2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAobW9tKSB7XG4gICAgICAgICAgICB2YXIgb3V0cHV0ID0gJycsIGk7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBvdXRwdXQgKz0gaXNGdW5jdGlvbihhcnJheVtpXSkgPyBhcnJheVtpXS5jYWxsKG1vbSwgZm9ybWF0KSA6IGFycmF5W2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBmb3JtYXQgZGF0ZSB1c2luZyBuYXRpdmUgZGF0ZSBvYmplY3RcbiAgICBmdW5jdGlvbiBmb3JtYXRNb21lbnQobSwgZm9ybWF0KSB7XG4gICAgICAgIGlmICghbS5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBtLmxvY2FsZURhdGEoKS5pbnZhbGlkRGF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9ybWF0ID0gZXhwYW5kRm9ybWF0KGZvcm1hdCwgbS5sb2NhbGVEYXRhKCkpO1xuICAgICAgICBmb3JtYXRGdW5jdGlvbnNbZm9ybWF0XSA9IGZvcm1hdEZ1bmN0aW9uc1tmb3JtYXRdIHx8IG1ha2VGb3JtYXRGdW5jdGlvbihmb3JtYXQpO1xuXG4gICAgICAgIHJldHVybiBmb3JtYXRGdW5jdGlvbnNbZm9ybWF0XShtKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBleHBhbmRGb3JtYXQoZm9ybWF0LCBsb2NhbGUpIHtcbiAgICAgICAgdmFyIGkgPSA1O1xuXG4gICAgICAgIGZ1bmN0aW9uIHJlcGxhY2VMb25nRGF0ZUZvcm1hdFRva2VucyhpbnB1dCkge1xuICAgICAgICAgICAgcmV0dXJuIGxvY2FsZS5sb25nRGF0ZUZvcm1hdChpbnB1dCkgfHwgaW5wdXQ7XG4gICAgICAgIH1cblxuICAgICAgICBsb2NhbEZvcm1hdHRpbmdUb2tlbnMubGFzdEluZGV4ID0gMDtcbiAgICAgICAgd2hpbGUgKGkgPj0gMCAmJiBsb2NhbEZvcm1hdHRpbmdUb2tlbnMudGVzdChmb3JtYXQpKSB7XG4gICAgICAgICAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZShsb2NhbEZvcm1hdHRpbmdUb2tlbnMsIHJlcGxhY2VMb25nRGF0ZUZvcm1hdFRva2Vucyk7XG4gICAgICAgICAgICBsb2NhbEZvcm1hdHRpbmdUb2tlbnMubGFzdEluZGV4ID0gMDtcbiAgICAgICAgICAgIGkgLT0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmb3JtYXQ7XG4gICAgfVxuXG4gICAgdmFyIG1hdGNoMSAgICAgICAgID0gL1xcZC87ICAgICAgICAgICAgLy8gICAgICAgMCAtIDlcbiAgICB2YXIgbWF0Y2gyICAgICAgICAgPSAvXFxkXFxkLzsgICAgICAgICAgLy8gICAgICAwMCAtIDk5XG4gICAgdmFyIG1hdGNoMyAgICAgICAgID0gL1xcZHszfS87ICAgICAgICAgLy8gICAgIDAwMCAtIDk5OVxuICAgIHZhciBtYXRjaDQgICAgICAgICA9IC9cXGR7NH0vOyAgICAgICAgIC8vICAgIDAwMDAgLSA5OTk5XG4gICAgdmFyIG1hdGNoNiAgICAgICAgID0gL1srLV0/XFxkezZ9LzsgICAgLy8gLTk5OTk5OSAtIDk5OTk5OVxuICAgIHZhciBtYXRjaDF0bzIgICAgICA9IC9cXGRcXGQ/LzsgICAgICAgICAvLyAgICAgICAwIC0gOTlcbiAgICB2YXIgbWF0Y2gzdG80ICAgICAgPSAvXFxkXFxkXFxkXFxkPy87ICAgICAvLyAgICAgOTk5IC0gOTk5OVxuICAgIHZhciBtYXRjaDV0bzYgICAgICA9IC9cXGRcXGRcXGRcXGRcXGRcXGQ/LzsgLy8gICA5OTk5OSAtIDk5OTk5OVxuICAgIHZhciBtYXRjaDF0bzMgICAgICA9IC9cXGR7MSwzfS87ICAgICAgIC8vICAgICAgIDAgLSA5OTlcbiAgICB2YXIgbWF0Y2gxdG80ICAgICAgPSAvXFxkezEsNH0vOyAgICAgICAvLyAgICAgICAwIC0gOTk5OVxuICAgIHZhciBtYXRjaDF0bzYgICAgICA9IC9bKy1dP1xcZHsxLDZ9LzsgIC8vIC05OTk5OTkgLSA5OTk5OTlcblxuICAgIHZhciBtYXRjaFVuc2lnbmVkICA9IC9cXGQrLzsgICAgICAgICAgIC8vICAgICAgIDAgLSBpbmZcbiAgICB2YXIgbWF0Y2hTaWduZWQgICAgPSAvWystXT9cXGQrLzsgICAgICAvLyAgICAtaW5mIC0gaW5mXG5cbiAgICB2YXIgbWF0Y2hPZmZzZXQgICAgPSAvWnxbKy1dXFxkXFxkOj9cXGRcXGQvZ2k7IC8vICswMDowMCAtMDA6MDAgKzAwMDAgLTAwMDAgb3IgWlxuICAgIHZhciBtYXRjaFNob3J0T2Zmc2V0ID0gL1p8WystXVxcZFxcZCg/Ojo/XFxkXFxkKT8vZ2k7IC8vICswMCAtMDAgKzAwOjAwIC0wMDowMCArMDAwMCAtMDAwMCBvciBaXG5cbiAgICB2YXIgbWF0Y2hUaW1lc3RhbXAgPSAvWystXT9cXGQrKFxcLlxcZHsxLDN9KT8vOyAvLyAxMjM0NTY3ODkgMTIzNDU2Nzg5LjEyM1xuXG4gICAgLy8gYW55IHdvcmQgKG9yIHR3bykgY2hhcmFjdGVycyBvciBudW1iZXJzIGluY2x1ZGluZyB0d28vdGhyZWUgd29yZCBtb250aCBpbiBhcmFiaWMuXG4gICAgLy8gaW5jbHVkZXMgc2NvdHRpc2ggZ2FlbGljIHR3byB3b3JkIGFuZCBoeXBoZW5hdGVkIG1vbnRoc1xuICAgIHZhciBtYXRjaFdvcmQgPSAvWzAtOV17MCwyNTZ9WydhLXpcXHUwMEEwLVxcdTA1RkZcXHUwNzAwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGMDdcXHVGRjEwLVxcdUZGRUZdezEsMjU2fXxbXFx1MDYwMC1cXHUwNkZGXFwvXXsxLDI1Nn0oXFxzKj9bXFx1MDYwMC1cXHUwNkZGXXsxLDI1Nn0pezEsMn0vaTtcblxuICAgIHZhciByZWdleGVzID0ge307XG5cbiAgICBmdW5jdGlvbiBhZGRSZWdleFRva2VuICh0b2tlbiwgcmVnZXgsIHN0cmljdFJlZ2V4KSB7XG4gICAgICAgIHJlZ2V4ZXNbdG9rZW5dID0gaXNGdW5jdGlvbihyZWdleCkgPyByZWdleCA6IGZ1bmN0aW9uIChpc1N0cmljdCwgbG9jYWxlRGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuIChpc1N0cmljdCAmJiBzdHJpY3RSZWdleCkgPyBzdHJpY3RSZWdleCA6IHJlZ2V4O1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFBhcnNlUmVnZXhGb3JUb2tlbiAodG9rZW4sIGNvbmZpZykge1xuICAgICAgICBpZiAoIWhhc093blByb3AocmVnZXhlcywgdG9rZW4pKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cCh1bmVzY2FwZUZvcm1hdCh0b2tlbikpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlZ2V4ZXNbdG9rZW5dKGNvbmZpZy5fc3RyaWN0LCBjb25maWcuX2xvY2FsZSk7XG4gICAgfVxuXG4gICAgLy8gQ29kZSBmcm9tIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzU2MTQ5My9pcy10aGVyZS1hLXJlZ2V4cC1lc2NhcGUtZnVuY3Rpb24taW4tamF2YXNjcmlwdFxuICAgIGZ1bmN0aW9uIHVuZXNjYXBlRm9ybWF0KHMpIHtcbiAgICAgICAgcmV0dXJuIHJlZ2V4RXNjYXBlKHMucmVwbGFjZSgnXFxcXCcsICcnKS5yZXBsYWNlKC9cXFxcKFxcWyl8XFxcXChcXF0pfFxcWyhbXlxcXVxcW10qKVxcXXxcXFxcKC4pL2csIGZ1bmN0aW9uIChtYXRjaGVkLCBwMSwgcDIsIHAzLCBwNCkge1xuICAgICAgICAgICAgcmV0dXJuIHAxIHx8IHAyIHx8IHAzIHx8IHA0O1xuICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVnZXhFc2NhcGUocykge1xuICAgICAgICByZXR1cm4gcy5yZXBsYWNlKC9bLVxcL1xcXFxeJCorPy4oKXxbXFxde31dL2csICdcXFxcJCYnKTtcbiAgICB9XG5cbiAgICB2YXIgdG9rZW5zID0ge307XG5cbiAgICBmdW5jdGlvbiBhZGRQYXJzZVRva2VuICh0b2tlbiwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGksIGZ1bmMgPSBjYWxsYmFjaztcbiAgICAgICAgaWYgKHR5cGVvZiB0b2tlbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRva2VuID0gW3Rva2VuXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNOdW1iZXIoY2FsbGJhY2spKSB7XG4gICAgICAgICAgICBmdW5jID0gZnVuY3Rpb24gKGlucHV0LCBhcnJheSkge1xuICAgICAgICAgICAgICAgIGFycmF5W2NhbGxiYWNrXSA9IHRvSW50KGlucHV0KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHRva2VuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0b2tlbnNbdG9rZW5baV1dID0gZnVuYztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZFdlZWtQYXJzZVRva2VuICh0b2tlbiwgY2FsbGJhY2spIHtcbiAgICAgICAgYWRkUGFyc2VUb2tlbih0b2tlbiwgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnLCB0b2tlbikge1xuICAgICAgICAgICAgY29uZmlnLl93ID0gY29uZmlnLl93IHx8IHt9O1xuICAgICAgICAgICAgY2FsbGJhY2soaW5wdXQsIGNvbmZpZy5fdywgY29uZmlnLCB0b2tlbik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZFRpbWVUb0FycmF5RnJvbVRva2VuKHRva2VuLCBpbnB1dCwgY29uZmlnKSB7XG4gICAgICAgIGlmIChpbnB1dCAhPSBudWxsICYmIGhhc093blByb3AodG9rZW5zLCB0b2tlbikpIHtcbiAgICAgICAgICAgIHRva2Vuc1t0b2tlbl0oaW5wdXQsIGNvbmZpZy5fYSwgY29uZmlnLCB0b2tlbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgWUVBUiA9IDA7XG4gICAgdmFyIE1PTlRIID0gMTtcbiAgICB2YXIgREFURSA9IDI7XG4gICAgdmFyIEhPVVIgPSAzO1xuICAgIHZhciBNSU5VVEUgPSA0O1xuICAgIHZhciBTRUNPTkQgPSA1O1xuICAgIHZhciBNSUxMSVNFQ09ORCA9IDY7XG4gICAgdmFyIFdFRUsgPSA3O1xuICAgIHZhciBXRUVLREFZID0gODtcblxuICAgIC8vIEZPUk1BVFRJTkdcblxuICAgIGFkZEZvcm1hdFRva2VuKCdZJywgMCwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgeSA9IHRoaXMueWVhcigpO1xuICAgICAgICByZXR1cm4geSA8PSA5OTk5ID8gJycgKyB5IDogJysnICsgeTtcbiAgICB9KTtcblxuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnWVknLCAyXSwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy55ZWFyKCkgJSAxMDA7XG4gICAgfSk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1lZWVknLCAgIDRdLCAgICAgICAwLCAneWVhcicpO1xuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnWVlZWVknLCAgNV0sICAgICAgIDAsICd5ZWFyJyk7XG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydZWVlZWVknLCA2LCB0cnVlXSwgMCwgJ3llYXInKTtcblxuICAgIC8vIEFMSUFTRVNcblxuICAgIGFkZFVuaXRBbGlhcygneWVhcicsICd5Jyk7XG5cbiAgICAvLyBQUklPUklUSUVTXG5cbiAgICBhZGRVbml0UHJpb3JpdHkoJ3llYXInLCAxKTtcblxuICAgIC8vIFBBUlNJTkdcblxuICAgIGFkZFJlZ2V4VG9rZW4oJ1knLCAgICAgIG1hdGNoU2lnbmVkKTtcbiAgICBhZGRSZWdleFRva2VuKCdZWScsICAgICBtYXRjaDF0bzIsIG1hdGNoMik7XG4gICAgYWRkUmVnZXhUb2tlbignWVlZWScsICAgbWF0Y2gxdG80LCBtYXRjaDQpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ1lZWVlZJywgIG1hdGNoMXRvNiwgbWF0Y2g2KTtcbiAgICBhZGRSZWdleFRva2VuKCdZWVlZWVknLCBtYXRjaDF0bzYsIG1hdGNoNik7XG5cbiAgICBhZGRQYXJzZVRva2VuKFsnWVlZWVknLCAnWVlZWVlZJ10sIFlFQVIpO1xuICAgIGFkZFBhcnNlVG9rZW4oJ1lZWVknLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5KSB7XG4gICAgICAgIGFycmF5W1lFQVJdID0gaW5wdXQubGVuZ3RoID09PSAyID8gaG9va3MucGFyc2VUd29EaWdpdFllYXIoaW5wdXQpIDogdG9JbnQoaW5wdXQpO1xuICAgIH0pO1xuICAgIGFkZFBhcnNlVG9rZW4oJ1lZJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSkge1xuICAgICAgICBhcnJheVtZRUFSXSA9IGhvb2tzLnBhcnNlVHdvRGlnaXRZZWFyKGlucHV0KTtcbiAgICB9KTtcbiAgICBhZGRQYXJzZVRva2VuKCdZJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSkge1xuICAgICAgICBhcnJheVtZRUFSXSA9IHBhcnNlSW50KGlucHV0LCAxMCk7XG4gICAgfSk7XG5cbiAgICAvLyBIRUxQRVJTXG5cbiAgICBmdW5jdGlvbiBkYXlzSW5ZZWFyKHllYXIpIHtcbiAgICAgICAgcmV0dXJuIGlzTGVhcFllYXIoeWVhcikgPyAzNjYgOiAzNjU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNMZWFwWWVhcih5ZWFyKSB7XG4gICAgICAgIHJldHVybiAoeWVhciAlIDQgPT09IDAgJiYgeWVhciAlIDEwMCAhPT0gMCkgfHwgeWVhciAlIDQwMCA9PT0gMDtcbiAgICB9XG5cbiAgICAvLyBIT09LU1xuXG4gICAgaG9va3MucGFyc2VUd29EaWdpdFllYXIgPSBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRvSW50KGlucHV0KSArICh0b0ludChpbnB1dCkgPiA2OCA/IDE5MDAgOiAyMDAwKTtcbiAgICB9O1xuXG4gICAgLy8gTU9NRU5UU1xuXG4gICAgdmFyIGdldFNldFllYXIgPSBtYWtlR2V0U2V0KCdGdWxsWWVhcicsIHRydWUpO1xuXG4gICAgZnVuY3Rpb24gZ2V0SXNMZWFwWWVhciAoKSB7XG4gICAgICAgIHJldHVybiBpc0xlYXBZZWFyKHRoaXMueWVhcigpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYWtlR2V0U2V0ICh1bml0LCBrZWVwVGltZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHNldCQxKHRoaXMsIHVuaXQsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICBob29rcy51cGRhdGVPZmZzZXQodGhpcywga2VlcFRpbWUpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0KHRoaXMsIHVuaXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldCAobW9tLCB1bml0KSB7XG4gICAgICAgIHJldHVybiBtb20uaXNWYWxpZCgpID9cbiAgICAgICAgICAgIG1vbS5fZFsnZ2V0JyArIChtb20uX2lzVVRDID8gJ1VUQycgOiAnJykgKyB1bml0XSgpIDogTmFOO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldCQxIChtb20sIHVuaXQsIHZhbHVlKSB7XG4gICAgICAgIGlmIChtb20uaXNWYWxpZCgpICYmICFpc05hTih2YWx1ZSkpIHtcbiAgICAgICAgICAgIGlmICh1bml0ID09PSAnRnVsbFllYXInICYmIGlzTGVhcFllYXIobW9tLnllYXIoKSkgJiYgbW9tLm1vbnRoKCkgPT09IDEgJiYgbW9tLmRhdGUoKSA9PT0gMjkpIHtcbiAgICAgICAgICAgICAgICBtb20uX2RbJ3NldCcgKyAobW9tLl9pc1VUQyA/ICdVVEMnIDogJycpICsgdW5pdF0odmFsdWUsIG1vbS5tb250aCgpLCBkYXlzSW5Nb250aCh2YWx1ZSwgbW9tLm1vbnRoKCkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG1vbS5fZFsnc2V0JyArIChtb20uX2lzVVRDID8gJ1VUQycgOiAnJykgKyB1bml0XSh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBNT01FTlRTXG5cbiAgICBmdW5jdGlvbiBzdHJpbmdHZXQgKHVuaXRzKSB7XG4gICAgICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMpO1xuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzW3VuaXRzXSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzW3VuaXRzXSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gc3RyaW5nU2V0ICh1bml0cywgdmFsdWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB1bml0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHVuaXRzID0gbm9ybWFsaXplT2JqZWN0VW5pdHModW5pdHMpO1xuICAgICAgICAgICAgdmFyIHByaW9yaXRpemVkID0gZ2V0UHJpb3JpdGl6ZWRVbml0cyh1bml0cyk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByaW9yaXRpemVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpc1twcmlvcml0aXplZFtpXS51bml0XSh1bml0c1twcmlvcml0aXplZFtpXS51bml0XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKHVuaXRzKTtcbiAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKHRoaXNbdW5pdHNdKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzW3VuaXRzXSh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW9kKG4sIHgpIHtcbiAgICAgICAgcmV0dXJuICgobiAlIHgpICsgeCkgJSB4O1xuICAgIH1cblxuICAgIHZhciBpbmRleE9mO1xuXG4gICAgaWYgKEFycmF5LnByb3RvdHlwZS5pbmRleE9mKSB7XG4gICAgICAgIGluZGV4T2YgPSBBcnJheS5wcm90b3R5cGUuaW5kZXhPZjtcbiAgICB9IGVsc2Uge1xuICAgICAgICBpbmRleE9mID0gZnVuY3Rpb24gKG8pIHtcbiAgICAgICAgICAgIC8vIEkga25vd1xuICAgICAgICAgICAgdmFyIGk7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzW2ldID09PSBvKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkYXlzSW5Nb250aCh5ZWFyLCBtb250aCkge1xuICAgICAgICBpZiAoaXNOYU4oeWVhcikgfHwgaXNOYU4obW9udGgpKSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG4gICAgICAgIHZhciBtb2RNb250aCA9IG1vZChtb250aCwgMTIpO1xuICAgICAgICB5ZWFyICs9IChtb250aCAtIG1vZE1vbnRoKSAvIDEyO1xuICAgICAgICByZXR1cm4gbW9kTW9udGggPT09IDEgPyAoaXNMZWFwWWVhcih5ZWFyKSA/IDI5IDogMjgpIDogKDMxIC0gbW9kTW9udGggJSA3ICUgMik7XG4gICAgfVxuXG4gICAgLy8gRk9STUFUVElOR1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ00nLCBbJ01NJywgMl0sICdNbycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9udGgoKSArIDE7XG4gICAgfSk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbignTU1NJywgMCwgMCwgZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkubW9udGhzU2hvcnQodGhpcywgZm9ybWF0KTtcbiAgICB9KTtcblxuICAgIGFkZEZvcm1hdFRva2VuKCdNTU1NJywgMCwgMCwgZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkubW9udGhzKHRoaXMsIGZvcm1hdCk7XG4gICAgfSk7XG5cbiAgICAvLyBBTElBU0VTXG5cbiAgICBhZGRVbml0QWxpYXMoJ21vbnRoJywgJ00nKTtcblxuICAgIC8vIFBSSU9SSVRZXG5cbiAgICBhZGRVbml0UHJpb3JpdHkoJ21vbnRoJywgOCk7XG5cbiAgICAvLyBQQVJTSU5HXG5cbiAgICBhZGRSZWdleFRva2VuKCdNJywgICAgbWF0Y2gxdG8yKTtcbiAgICBhZGRSZWdleFRva2VuKCdNTScsICAgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ01NTScsICBmdW5jdGlvbiAoaXNTdHJpY3QsIGxvY2FsZSkge1xuICAgICAgICByZXR1cm4gbG9jYWxlLm1vbnRoc1Nob3J0UmVnZXgoaXNTdHJpY3QpO1xuICAgIH0pO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ01NTU0nLCBmdW5jdGlvbiAoaXNTdHJpY3QsIGxvY2FsZSkge1xuICAgICAgICByZXR1cm4gbG9jYWxlLm1vbnRoc1JlZ2V4KGlzU3RyaWN0KTtcbiAgICB9KTtcblxuICAgIGFkZFBhcnNlVG9rZW4oWydNJywgJ01NJ10sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXkpIHtcbiAgICAgICAgYXJyYXlbTU9OVEhdID0gdG9JbnQoaW5wdXQpIC0gMTtcbiAgICB9KTtcblxuICAgIGFkZFBhcnNlVG9rZW4oWydNTU0nLCAnTU1NTSddLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcsIHRva2VuKSB7XG4gICAgICAgIHZhciBtb250aCA9IGNvbmZpZy5fbG9jYWxlLm1vbnRoc1BhcnNlKGlucHV0LCB0b2tlbiwgY29uZmlnLl9zdHJpY3QpO1xuICAgICAgICAvLyBpZiB3ZSBkaWRuJ3QgZmluZCBhIG1vbnRoIG5hbWUsIG1hcmsgdGhlIGRhdGUgYXMgaW52YWxpZC5cbiAgICAgICAgaWYgKG1vbnRoICE9IG51bGwpIHtcbiAgICAgICAgICAgIGFycmF5W01PTlRIXSA9IG1vbnRoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuaW52YWxpZE1vbnRoID0gaW5wdXQ7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIExPQ0FMRVNcblxuICAgIHZhciBNT05USFNfSU5fRk9STUFUID0gL0Rbb0RdPyhcXFtbXlxcW1xcXV0qXFxdfFxccykrTU1NTT8vO1xuICAgIHZhciBkZWZhdWx0TG9jYWxlTW9udGhzID0gJ0phbnVhcnlfRmVicnVhcnlfTWFyY2hfQXByaWxfTWF5X0p1bmVfSnVseV9BdWd1c3RfU2VwdGVtYmVyX09jdG9iZXJfTm92ZW1iZXJfRGVjZW1iZXInLnNwbGl0KCdfJyk7XG4gICAgZnVuY3Rpb24gbG9jYWxlTW9udGhzIChtLCBmb3JtYXQpIHtcbiAgICAgICAgaWYgKCFtKSB7XG4gICAgICAgICAgICByZXR1cm4gaXNBcnJheSh0aGlzLl9tb250aHMpID8gdGhpcy5fbW9udGhzIDpcbiAgICAgICAgICAgICAgICB0aGlzLl9tb250aHNbJ3N0YW5kYWxvbmUnXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXNBcnJheSh0aGlzLl9tb250aHMpID8gdGhpcy5fbW9udGhzW20ubW9udGgoKV0gOlxuICAgICAgICAgICAgdGhpcy5fbW9udGhzWyh0aGlzLl9tb250aHMuaXNGb3JtYXQgfHwgTU9OVEhTX0lOX0ZPUk1BVCkudGVzdChmb3JtYXQpID8gJ2Zvcm1hdCcgOiAnc3RhbmRhbG9uZSddW20ubW9udGgoKV07XG4gICAgfVxuXG4gICAgdmFyIGRlZmF1bHRMb2NhbGVNb250aHNTaG9ydCA9ICdKYW5fRmViX01hcl9BcHJfTWF5X0p1bl9KdWxfQXVnX1NlcF9PY3RfTm92X0RlYycuc3BsaXQoJ18nKTtcbiAgICBmdW5jdGlvbiBsb2NhbGVNb250aHNTaG9ydCAobSwgZm9ybWF0KSB7XG4gICAgICAgIGlmICghbSkge1xuICAgICAgICAgICAgcmV0dXJuIGlzQXJyYXkodGhpcy5fbW9udGhzU2hvcnQpID8gdGhpcy5fbW9udGhzU2hvcnQgOlxuICAgICAgICAgICAgICAgIHRoaXMuX21vbnRoc1Nob3J0WydzdGFuZGFsb25lJ107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlzQXJyYXkodGhpcy5fbW9udGhzU2hvcnQpID8gdGhpcy5fbW9udGhzU2hvcnRbbS5tb250aCgpXSA6XG4gICAgICAgICAgICB0aGlzLl9tb250aHNTaG9ydFtNT05USFNfSU5fRk9STUFULnRlc3QoZm9ybWF0KSA/ICdmb3JtYXQnIDogJ3N0YW5kYWxvbmUnXVttLm1vbnRoKCldO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZVN0cmljdFBhcnNlKG1vbnRoTmFtZSwgZm9ybWF0LCBzdHJpY3QpIHtcbiAgICAgICAgdmFyIGksIGlpLCBtb20sIGxsYyA9IG1vbnRoTmFtZS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuICAgICAgICBpZiAoIXRoaXMuX21vbnRoc1BhcnNlKSB7XG4gICAgICAgICAgICAvLyB0aGlzIGlzIG5vdCB1c2VkXG4gICAgICAgICAgICB0aGlzLl9tb250aHNQYXJzZSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fbG9uZ01vbnRoc1BhcnNlID0gW107XG4gICAgICAgICAgICB0aGlzLl9zaG9ydE1vbnRoc1BhcnNlID0gW107XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgMTI7ICsraSkge1xuICAgICAgICAgICAgICAgIG1vbSA9IGNyZWF0ZVVUQyhbMjAwMCwgaV0pO1xuICAgICAgICAgICAgICAgIHRoaXMuX3Nob3J0TW9udGhzUGFyc2VbaV0gPSB0aGlzLm1vbnRoc1Nob3J0KG1vbSwgJycpLnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9uZ01vbnRoc1BhcnNlW2ldID0gdGhpcy5tb250aHMobW9tLCAnJykudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdHJpY3QpIHtcbiAgICAgICAgICAgIGlmIChmb3JtYXQgPT09ICdNTU0nKSB7XG4gICAgICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fc2hvcnRNb250aHNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaWkgIT09IC0xID8gaWkgOiBudWxsO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9sb25nTW9udGhzUGFyc2UsIGxsYyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlpICE9PSAtMSA/IGlpIDogbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChmb3JtYXQgPT09ICdNTU0nKSB7XG4gICAgICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fc2hvcnRNb250aHNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgICAgICBpZiAoaWkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpaTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fbG9uZ01vbnRoc1BhcnNlLCBsbGMpO1xuICAgICAgICAgICAgICAgIHJldHVybiBpaSAhPT0gLTEgPyBpaSA6IG51bGw7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX2xvbmdNb250aHNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgICAgICBpZiAoaWkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpaTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fc2hvcnRNb250aHNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaWkgIT09IC0xID8gaWkgOiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9jYWxlTW9udGhzUGFyc2UgKG1vbnRoTmFtZSwgZm9ybWF0LCBzdHJpY3QpIHtcbiAgICAgICAgdmFyIGksIG1vbSwgcmVnZXg7XG5cbiAgICAgICAgaWYgKHRoaXMuX21vbnRoc1BhcnNlRXhhY3QpIHtcbiAgICAgICAgICAgIHJldHVybiBoYW5kbGVTdHJpY3RQYXJzZS5jYWxsKHRoaXMsIG1vbnRoTmFtZSwgZm9ybWF0LCBzdHJpY3QpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLl9tb250aHNQYXJzZSkge1xuICAgICAgICAgICAgdGhpcy5fbW9udGhzUGFyc2UgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX2xvbmdNb250aHNQYXJzZSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fc2hvcnRNb250aHNQYXJzZSA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVE9ETzogYWRkIHNvcnRpbmdcbiAgICAgICAgLy8gU29ydGluZyBtYWtlcyBzdXJlIGlmIG9uZSBtb250aCAob3IgYWJicikgaXMgYSBwcmVmaXggb2YgYW5vdGhlclxuICAgICAgICAvLyBzZWUgc29ydGluZyBpbiBjb21wdXRlTW9udGhzUGFyc2VcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDEyOyBpKyspIHtcbiAgICAgICAgICAgIC8vIG1ha2UgdGhlIHJlZ2V4IGlmIHdlIGRvbid0IGhhdmUgaXQgYWxyZWFkeVxuICAgICAgICAgICAgbW9tID0gY3JlYXRlVVRDKFsyMDAwLCBpXSk7XG4gICAgICAgICAgICBpZiAoc3RyaWN0ICYmICF0aGlzLl9sb25nTW9udGhzUGFyc2VbaV0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb25nTW9udGhzUGFyc2VbaV0gPSBuZXcgUmVnRXhwKCdeJyArIHRoaXMubW9udGhzKG1vbSwgJycpLnJlcGxhY2UoJy4nLCAnJykgKyAnJCcsICdpJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvcnRNb250aHNQYXJzZVtpXSA9IG5ldyBSZWdFeHAoJ14nICsgdGhpcy5tb250aHNTaG9ydChtb20sICcnKS5yZXBsYWNlKCcuJywgJycpICsgJyQnLCAnaScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFzdHJpY3QgJiYgIXRoaXMuX21vbnRoc1BhcnNlW2ldKSB7XG4gICAgICAgICAgICAgICAgcmVnZXggPSAnXicgKyB0aGlzLm1vbnRocyhtb20sICcnKSArICd8XicgKyB0aGlzLm1vbnRoc1Nob3J0KG1vbSwgJycpO1xuICAgICAgICAgICAgICAgIHRoaXMuX21vbnRoc1BhcnNlW2ldID0gbmV3IFJlZ0V4cChyZWdleC5yZXBsYWNlKCcuJywgJycpLCAnaScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gdGVzdCB0aGUgcmVnZXhcbiAgICAgICAgICAgIGlmIChzdHJpY3QgJiYgZm9ybWF0ID09PSAnTU1NTScgJiYgdGhpcy5fbG9uZ01vbnRoc1BhcnNlW2ldLnRlc3QobW9udGhOYW1lKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdHJpY3QgJiYgZm9ybWF0ID09PSAnTU1NJyAmJiB0aGlzLl9zaG9ydE1vbnRoc1BhcnNlW2ldLnRlc3QobW9udGhOYW1lKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghc3RyaWN0ICYmIHRoaXMuX21vbnRoc1BhcnNlW2ldLnRlc3QobW9udGhOYW1lKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gTU9NRU5UU1xuXG4gICAgZnVuY3Rpb24gc2V0TW9udGggKG1vbSwgdmFsdWUpIHtcbiAgICAgICAgdmFyIGRheU9mTW9udGg7XG5cbiAgICAgICAgaWYgKCFtb20uaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICAvLyBObyBvcFxuICAgICAgICAgICAgcmV0dXJuIG1vbTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAoL15cXGQrJC8udGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHRvSW50KHZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBtb20ubG9jYWxlRGF0YSgpLm1vbnRoc1BhcnNlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBBbm90aGVyIHNpbGVudCBmYWlsdXJlP1xuICAgICAgICAgICAgICAgIGlmICghaXNOdW1iZXIodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtb207XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZGF5T2ZNb250aCA9IE1hdGgubWluKG1vbS5kYXRlKCksIGRheXNJbk1vbnRoKG1vbS55ZWFyKCksIHZhbHVlKSk7XG4gICAgICAgIG1vbS5fZFsnc2V0JyArIChtb20uX2lzVVRDID8gJ1VUQycgOiAnJykgKyAnTW9udGgnXSh2YWx1ZSwgZGF5T2ZNb250aCk7XG4gICAgICAgIHJldHVybiBtb207XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U2V0TW9udGggKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBzZXRNb250aCh0aGlzLCB2YWx1ZSk7XG4gICAgICAgICAgICBob29rcy51cGRhdGVPZmZzZXQodGhpcywgdHJ1ZSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBnZXQodGhpcywgJ01vbnRoJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXREYXlzSW5Nb250aCAoKSB7XG4gICAgICAgIHJldHVybiBkYXlzSW5Nb250aCh0aGlzLnllYXIoKSwgdGhpcy5tb250aCgpKTtcbiAgICB9XG5cbiAgICB2YXIgZGVmYXVsdE1vbnRoc1Nob3J0UmVnZXggPSBtYXRjaFdvcmQ7XG4gICAgZnVuY3Rpb24gbW9udGhzU2hvcnRSZWdleCAoaXNTdHJpY3QpIHtcbiAgICAgICAgaWYgKHRoaXMuX21vbnRoc1BhcnNlRXhhY3QpIHtcbiAgICAgICAgICAgIGlmICghaGFzT3duUHJvcCh0aGlzLCAnX21vbnRoc1JlZ2V4JykpIHtcbiAgICAgICAgICAgICAgICBjb21wdXRlTW9udGhzUGFyc2UuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc1N0cmljdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tb250aHNTaG9ydFN0cmljdFJlZ2V4O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbW9udGhzU2hvcnRSZWdleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghaGFzT3duUHJvcCh0aGlzLCAnX21vbnRoc1Nob3J0UmVnZXgnKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX21vbnRoc1Nob3J0UmVnZXggPSBkZWZhdWx0TW9udGhzU2hvcnRSZWdleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tb250aHNTaG9ydFN0cmljdFJlZ2V4ICYmIGlzU3RyaWN0ID9cbiAgICAgICAgICAgICAgICB0aGlzLl9tb250aHNTaG9ydFN0cmljdFJlZ2V4IDogdGhpcy5fbW9udGhzU2hvcnRSZWdleDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBkZWZhdWx0TW9udGhzUmVnZXggPSBtYXRjaFdvcmQ7XG4gICAgZnVuY3Rpb24gbW9udGhzUmVnZXggKGlzU3RyaWN0KSB7XG4gICAgICAgIGlmICh0aGlzLl9tb250aHNQYXJzZUV4YWN0KSB7XG4gICAgICAgICAgICBpZiAoIWhhc093blByb3AodGhpcywgJ19tb250aHNSZWdleCcpKSB7XG4gICAgICAgICAgICAgICAgY29tcHV0ZU1vbnRoc1BhcnNlLmNhbGwodGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNTdHJpY3QpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbW9udGhzU3RyaWN0UmVnZXg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tb250aHNSZWdleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghaGFzT3duUHJvcCh0aGlzLCAnX21vbnRoc1JlZ2V4JykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tb250aHNSZWdleCA9IGRlZmF1bHRNb250aHNSZWdleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tb250aHNTdHJpY3RSZWdleCAmJiBpc1N0cmljdCA/XG4gICAgICAgICAgICAgICAgdGhpcy5fbW9udGhzU3RyaWN0UmVnZXggOiB0aGlzLl9tb250aHNSZWdleDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbXB1dGVNb250aHNQYXJzZSAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIGNtcExlblJldihhLCBiKSB7XG4gICAgICAgICAgICByZXR1cm4gYi5sZW5ndGggLSBhLmxlbmd0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzaG9ydFBpZWNlcyA9IFtdLCBsb25nUGllY2VzID0gW10sIG1peGVkUGllY2VzID0gW10sXG4gICAgICAgICAgICBpLCBtb207XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCAxMjsgaSsrKSB7XG4gICAgICAgICAgICAvLyBtYWtlIHRoZSByZWdleCBpZiB3ZSBkb24ndCBoYXZlIGl0IGFscmVhZHlcbiAgICAgICAgICAgIG1vbSA9IGNyZWF0ZVVUQyhbMjAwMCwgaV0pO1xuICAgICAgICAgICAgc2hvcnRQaWVjZXMucHVzaCh0aGlzLm1vbnRoc1Nob3J0KG1vbSwgJycpKTtcbiAgICAgICAgICAgIGxvbmdQaWVjZXMucHVzaCh0aGlzLm1vbnRocyhtb20sICcnKSk7XG4gICAgICAgICAgICBtaXhlZFBpZWNlcy5wdXNoKHRoaXMubW9udGhzKG1vbSwgJycpKTtcbiAgICAgICAgICAgIG1peGVkUGllY2VzLnB1c2godGhpcy5tb250aHNTaG9ydChtb20sICcnKSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gU29ydGluZyBtYWtlcyBzdXJlIGlmIG9uZSBtb250aCAob3IgYWJicikgaXMgYSBwcmVmaXggb2YgYW5vdGhlciBpdFxuICAgICAgICAvLyB3aWxsIG1hdGNoIHRoZSBsb25nZXIgcGllY2UuXG4gICAgICAgIHNob3J0UGllY2VzLnNvcnQoY21wTGVuUmV2KTtcbiAgICAgICAgbG9uZ1BpZWNlcy5zb3J0KGNtcExlblJldik7XG4gICAgICAgIG1peGVkUGllY2VzLnNvcnQoY21wTGVuUmV2KTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDEyOyBpKyspIHtcbiAgICAgICAgICAgIHNob3J0UGllY2VzW2ldID0gcmVnZXhFc2NhcGUoc2hvcnRQaWVjZXNbaV0pO1xuICAgICAgICAgICAgbG9uZ1BpZWNlc1tpXSA9IHJlZ2V4RXNjYXBlKGxvbmdQaWVjZXNbaV0pO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCAyNDsgaSsrKSB7XG4gICAgICAgICAgICBtaXhlZFBpZWNlc1tpXSA9IHJlZ2V4RXNjYXBlKG1peGVkUGllY2VzW2ldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX21vbnRoc1JlZ2V4ID0gbmV3IFJlZ0V4cCgnXignICsgbWl4ZWRQaWVjZXMuam9pbignfCcpICsgJyknLCAnaScpO1xuICAgICAgICB0aGlzLl9tb250aHNTaG9ydFJlZ2V4ID0gdGhpcy5fbW9udGhzUmVnZXg7XG4gICAgICAgIHRoaXMuX21vbnRoc1N0cmljdFJlZ2V4ID0gbmV3IFJlZ0V4cCgnXignICsgbG9uZ1BpZWNlcy5qb2luKCd8JykgKyAnKScsICdpJyk7XG4gICAgICAgIHRoaXMuX21vbnRoc1Nob3J0U3RyaWN0UmVnZXggPSBuZXcgUmVnRXhwKCdeKCcgKyBzaG9ydFBpZWNlcy5qb2luKCd8JykgKyAnKScsICdpJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlRGF0ZSAoeSwgbSwgZCwgaCwgTSwgcywgbXMpIHtcbiAgICAgICAgLy8gY2FuJ3QganVzdCBhcHBseSgpIHRvIGNyZWF0ZSBhIGRhdGU6XG4gICAgICAgIC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcS8xODEzNDhcbiAgICAgICAgdmFyIGRhdGU7XG4gICAgICAgIC8vIHRoZSBkYXRlIGNvbnN0cnVjdG9yIHJlbWFwcyB5ZWFycyAwLTk5IHRvIDE5MDAtMTk5OVxuICAgICAgICBpZiAoeSA8IDEwMCAmJiB5ID49IDApIHtcbiAgICAgICAgICAgIC8vIHByZXNlcnZlIGxlYXAgeWVhcnMgdXNpbmcgYSBmdWxsIDQwMCB5ZWFyIGN5Y2xlLCB0aGVuIHJlc2V0XG4gICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoeSArIDQwMCwgbSwgZCwgaCwgTSwgcywgbXMpO1xuICAgICAgICAgICAgaWYgKGlzRmluaXRlKGRhdGUuZ2V0RnVsbFllYXIoKSkpIHtcbiAgICAgICAgICAgICAgICBkYXRlLnNldEZ1bGxZZWFyKHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKHksIG0sIGQsIGgsIE0sIHMsIG1zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkYXRlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVVUQ0RhdGUgKHkpIHtcbiAgICAgICAgdmFyIGRhdGU7XG4gICAgICAgIC8vIHRoZSBEYXRlLlVUQyBmdW5jdGlvbiByZW1hcHMgeWVhcnMgMC05OSB0byAxOTAwLTE5OTlcbiAgICAgICAgaWYgKHkgPCAxMDAgJiYgeSA+PSAwKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAvLyBwcmVzZXJ2ZSBsZWFwIHllYXJzIHVzaW5nIGEgZnVsbCA0MDAgeWVhciBjeWNsZSwgdGhlbiByZXNldFxuICAgICAgICAgICAgYXJnc1swXSA9IHkgKyA0MDA7XG4gICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoRGF0ZS5VVEMuYXBwbHkobnVsbCwgYXJncykpO1xuICAgICAgICAgICAgaWYgKGlzRmluaXRlKGRhdGUuZ2V0VVRDRnVsbFllYXIoKSkpIHtcbiAgICAgICAgICAgICAgICBkYXRlLnNldFVUQ0Z1bGxZZWFyKHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKERhdGUuVVRDLmFwcGx5KG51bGwsIGFyZ3VtZW50cykpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgfVxuXG4gICAgLy8gc3RhcnQtb2YtZmlyc3Qtd2VlayAtIHN0YXJ0LW9mLXllYXJcbiAgICBmdW5jdGlvbiBmaXJzdFdlZWtPZmZzZXQoeWVhciwgZG93LCBkb3kpIHtcbiAgICAgICAgdmFyIC8vIGZpcnN0LXdlZWsgZGF5IC0tIHdoaWNoIGphbnVhcnkgaXMgYWx3YXlzIGluIHRoZSBmaXJzdCB3ZWVrICg0IGZvciBpc28sIDEgZm9yIG90aGVyKVxuICAgICAgICAgICAgZndkID0gNyArIGRvdyAtIGRveSxcbiAgICAgICAgICAgIC8vIGZpcnN0LXdlZWsgZGF5IGxvY2FsIHdlZWtkYXkgLS0gd2hpY2ggbG9jYWwgd2Vla2RheSBpcyBmd2RcbiAgICAgICAgICAgIGZ3ZGx3ID0gKDcgKyBjcmVhdGVVVENEYXRlKHllYXIsIDAsIGZ3ZCkuZ2V0VVRDRGF5KCkgLSBkb3cpICUgNztcblxuICAgICAgICByZXR1cm4gLWZ3ZGx3ICsgZndkIC0gMTtcbiAgICB9XG5cbiAgICAvLyBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fd2Vla19kYXRlI0NhbGN1bGF0aW5nX2FfZGF0ZV9naXZlbl90aGVfeWVhci4yQ193ZWVrX251bWJlcl9hbmRfd2Vla2RheVxuICAgIGZ1bmN0aW9uIGRheU9mWWVhckZyb21XZWVrcyh5ZWFyLCB3ZWVrLCB3ZWVrZGF5LCBkb3csIGRveSkge1xuICAgICAgICB2YXIgbG9jYWxXZWVrZGF5ID0gKDcgKyB3ZWVrZGF5IC0gZG93KSAlIDcsXG4gICAgICAgICAgICB3ZWVrT2Zmc2V0ID0gZmlyc3RXZWVrT2Zmc2V0KHllYXIsIGRvdywgZG95KSxcbiAgICAgICAgICAgIGRheU9mWWVhciA9IDEgKyA3ICogKHdlZWsgLSAxKSArIGxvY2FsV2Vla2RheSArIHdlZWtPZmZzZXQsXG4gICAgICAgICAgICByZXNZZWFyLCByZXNEYXlPZlllYXI7XG5cbiAgICAgICAgaWYgKGRheU9mWWVhciA8PSAwKSB7XG4gICAgICAgICAgICByZXNZZWFyID0geWVhciAtIDE7XG4gICAgICAgICAgICByZXNEYXlPZlllYXIgPSBkYXlzSW5ZZWFyKHJlc1llYXIpICsgZGF5T2ZZZWFyO1xuICAgICAgICB9IGVsc2UgaWYgKGRheU9mWWVhciA+IGRheXNJblllYXIoeWVhcikpIHtcbiAgICAgICAgICAgIHJlc1llYXIgPSB5ZWFyICsgMTtcbiAgICAgICAgICAgIHJlc0RheU9mWWVhciA9IGRheU9mWWVhciAtIGRheXNJblllYXIoeWVhcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNZZWFyID0geWVhcjtcbiAgICAgICAgICAgIHJlc0RheU9mWWVhciA9IGRheU9mWWVhcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB5ZWFyOiByZXNZZWFyLFxuICAgICAgICAgICAgZGF5T2ZZZWFyOiByZXNEYXlPZlllYXJcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB3ZWVrT2ZZZWFyKG1vbSwgZG93LCBkb3kpIHtcbiAgICAgICAgdmFyIHdlZWtPZmZzZXQgPSBmaXJzdFdlZWtPZmZzZXQobW9tLnllYXIoKSwgZG93LCBkb3kpLFxuICAgICAgICAgICAgd2VlayA9IE1hdGguZmxvb3IoKG1vbS5kYXlPZlllYXIoKSAtIHdlZWtPZmZzZXQgLSAxKSAvIDcpICsgMSxcbiAgICAgICAgICAgIHJlc1dlZWssIHJlc1llYXI7XG5cbiAgICAgICAgaWYgKHdlZWsgPCAxKSB7XG4gICAgICAgICAgICByZXNZZWFyID0gbW9tLnllYXIoKSAtIDE7XG4gICAgICAgICAgICByZXNXZWVrID0gd2VlayArIHdlZWtzSW5ZZWFyKHJlc1llYXIsIGRvdywgZG95KTtcbiAgICAgICAgfSBlbHNlIGlmICh3ZWVrID4gd2Vla3NJblllYXIobW9tLnllYXIoKSwgZG93LCBkb3kpKSB7XG4gICAgICAgICAgICByZXNXZWVrID0gd2VlayAtIHdlZWtzSW5ZZWFyKG1vbS55ZWFyKCksIGRvdywgZG95KTtcbiAgICAgICAgICAgIHJlc1llYXIgPSBtb20ueWVhcigpICsgMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc1llYXIgPSBtb20ueWVhcigpO1xuICAgICAgICAgICAgcmVzV2VlayA9IHdlZWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2VlazogcmVzV2VlayxcbiAgICAgICAgICAgIHllYXI6IHJlc1llYXJcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB3ZWVrc0luWWVhcih5ZWFyLCBkb3csIGRveSkge1xuICAgICAgICB2YXIgd2Vla09mZnNldCA9IGZpcnN0V2Vla09mZnNldCh5ZWFyLCBkb3csIGRveSksXG4gICAgICAgICAgICB3ZWVrT2Zmc2V0TmV4dCA9IGZpcnN0V2Vla09mZnNldCh5ZWFyICsgMSwgZG93LCBkb3kpO1xuICAgICAgICByZXR1cm4gKGRheXNJblllYXIoeWVhcikgLSB3ZWVrT2Zmc2V0ICsgd2Vla09mZnNldE5leHQpIC8gNztcbiAgICB9XG5cbiAgICAvLyBGT1JNQVRUSU5HXG5cbiAgICBhZGRGb3JtYXRUb2tlbigndycsIFsnd3cnLCAyXSwgJ3dvJywgJ3dlZWsnKTtcbiAgICBhZGRGb3JtYXRUb2tlbignVycsIFsnV1cnLCAyXSwgJ1dvJywgJ2lzb1dlZWsnKTtcblxuICAgIC8vIEFMSUFTRVNcblxuICAgIGFkZFVuaXRBbGlhcygnd2VlaycsICd3Jyk7XG4gICAgYWRkVW5pdEFsaWFzKCdpc29XZWVrJywgJ1cnKTtcblxuICAgIC8vIFBSSU9SSVRJRVNcblxuICAgIGFkZFVuaXRQcmlvcml0eSgnd2VlaycsIDUpO1xuICAgIGFkZFVuaXRQcmlvcml0eSgnaXNvV2VlaycsIDUpO1xuXG4gICAgLy8gUEFSU0lOR1xuXG4gICAgYWRkUmVnZXhUb2tlbigndycsICBtYXRjaDF0bzIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ3d3JywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ1cnLCAgbWF0Y2gxdG8yKTtcbiAgICBhZGRSZWdleFRva2VuKCdXVycsIG1hdGNoMXRvMiwgbWF0Y2gyKTtcblxuICAgIGFkZFdlZWtQYXJzZVRva2VuKFsndycsICd3dycsICdXJywgJ1dXJ10sIGZ1bmN0aW9uIChpbnB1dCwgd2VlaywgY29uZmlnLCB0b2tlbikge1xuICAgICAgICB3ZWVrW3Rva2VuLnN1YnN0cigwLCAxKV0gPSB0b0ludChpbnB1dCk7XG4gICAgfSk7XG5cbiAgICAvLyBIRUxQRVJTXG5cbiAgICAvLyBMT0NBTEVTXG5cbiAgICBmdW5jdGlvbiBsb2NhbGVXZWVrIChtb20pIHtcbiAgICAgICAgcmV0dXJuIHdlZWtPZlllYXIobW9tLCB0aGlzLl93ZWVrLmRvdywgdGhpcy5fd2Vlay5kb3kpLndlZWs7XG4gICAgfVxuXG4gICAgdmFyIGRlZmF1bHRMb2NhbGVXZWVrID0ge1xuICAgICAgICBkb3cgOiAwLCAvLyBTdW5kYXkgaXMgdGhlIGZpcnN0IGRheSBvZiB0aGUgd2Vlay5cbiAgICAgICAgZG95IDogNiAgLy8gVGhlIHdlZWsgdGhhdCBjb250YWlucyBKYW4gNnRoIGlzIHRoZSBmaXJzdCB3ZWVrIG9mIHRoZSB5ZWFyLlxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBsb2NhbGVGaXJzdERheU9mV2VlayAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl93ZWVrLmRvdztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2NhbGVGaXJzdERheU9mWWVhciAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl93ZWVrLmRveTtcbiAgICB9XG5cbiAgICAvLyBNT01FTlRTXG5cbiAgICBmdW5jdGlvbiBnZXRTZXRXZWVrIChpbnB1dCkge1xuICAgICAgICB2YXIgd2VlayA9IHRoaXMubG9jYWxlRGF0YSgpLndlZWsodGhpcyk7XG4gICAgICAgIHJldHVybiBpbnB1dCA9PSBudWxsID8gd2VlayA6IHRoaXMuYWRkKChpbnB1dCAtIHdlZWspICogNywgJ2QnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRTZXRJU09XZWVrIChpbnB1dCkge1xuICAgICAgICB2YXIgd2VlayA9IHdlZWtPZlllYXIodGhpcywgMSwgNCkud2VlaztcbiAgICAgICAgcmV0dXJuIGlucHV0ID09IG51bGwgPyB3ZWVrIDogdGhpcy5hZGQoKGlucHV0IC0gd2VlaykgKiA3LCAnZCcpO1xuICAgIH1cblxuICAgIC8vIEZPUk1BVFRJTkdcblxuICAgIGFkZEZvcm1hdFRva2VuKCdkJywgMCwgJ2RvJywgJ2RheScpO1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ2RkJywgMCwgMCwgZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkud2Vla2RheXNNaW4odGhpcywgZm9ybWF0KTtcbiAgICB9KTtcblxuICAgIGFkZEZvcm1hdFRva2VuKCdkZGQnLCAwLCAwLCBmdW5jdGlvbiAoZm9ybWF0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS53ZWVrZGF5c1Nob3J0KHRoaXMsIGZvcm1hdCk7XG4gICAgfSk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbignZGRkZCcsIDAsIDAsIGZ1bmN0aW9uIChmb3JtYXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLndlZWtkYXlzKHRoaXMsIGZvcm1hdCk7XG4gICAgfSk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbignZScsIDAsIDAsICd3ZWVrZGF5Jyk7XG4gICAgYWRkRm9ybWF0VG9rZW4oJ0UnLCAwLCAwLCAnaXNvV2Vla2RheScpO1xuXG4gICAgLy8gQUxJQVNFU1xuXG4gICAgYWRkVW5pdEFsaWFzKCdkYXknLCAnZCcpO1xuICAgIGFkZFVuaXRBbGlhcygnd2Vla2RheScsICdlJyk7XG4gICAgYWRkVW5pdEFsaWFzKCdpc29XZWVrZGF5JywgJ0UnKTtcblxuICAgIC8vIFBSSU9SSVRZXG4gICAgYWRkVW5pdFByaW9yaXR5KCdkYXknLCAxMSk7XG4gICAgYWRkVW5pdFByaW9yaXR5KCd3ZWVrZGF5JywgMTEpO1xuICAgIGFkZFVuaXRQcmlvcml0eSgnaXNvV2Vla2RheScsIDExKTtcblxuICAgIC8vIFBBUlNJTkdcblxuICAgIGFkZFJlZ2V4VG9rZW4oJ2QnLCAgICBtYXRjaDF0bzIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2UnLCAgICBtYXRjaDF0bzIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ0UnLCAgICBtYXRjaDF0bzIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2RkJywgICBmdW5jdGlvbiAoaXNTdHJpY3QsIGxvY2FsZSkge1xuICAgICAgICByZXR1cm4gbG9jYWxlLndlZWtkYXlzTWluUmVnZXgoaXNTdHJpY3QpO1xuICAgIH0pO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2RkZCcsICAgZnVuY3Rpb24gKGlzU3RyaWN0LCBsb2NhbGUpIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsZS53ZWVrZGF5c1Nob3J0UmVnZXgoaXNTdHJpY3QpO1xuICAgIH0pO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2RkZGQnLCAgIGZ1bmN0aW9uIChpc1N0cmljdCwgbG9jYWxlKSB7XG4gICAgICAgIHJldHVybiBsb2NhbGUud2Vla2RheXNSZWdleChpc1N0cmljdCk7XG4gICAgfSk7XG5cbiAgICBhZGRXZWVrUGFyc2VUb2tlbihbJ2RkJywgJ2RkZCcsICdkZGRkJ10sIGZ1bmN0aW9uIChpbnB1dCwgd2VlaywgY29uZmlnLCB0b2tlbikge1xuICAgICAgICB2YXIgd2Vla2RheSA9IGNvbmZpZy5fbG9jYWxlLndlZWtkYXlzUGFyc2UoaW5wdXQsIHRva2VuLCBjb25maWcuX3N0cmljdCk7XG4gICAgICAgIC8vIGlmIHdlIGRpZG4ndCBnZXQgYSB3ZWVrZGF5IG5hbWUsIG1hcmsgdGhlIGRhdGUgYXMgaW52YWxpZFxuICAgICAgICBpZiAod2Vla2RheSAhPSBudWxsKSB7XG4gICAgICAgICAgICB3ZWVrLmQgPSB3ZWVrZGF5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuaW52YWxpZFdlZWtkYXkgPSBpbnB1dDtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWRkV2Vla1BhcnNlVG9rZW4oWydkJywgJ2UnLCAnRSddLCBmdW5jdGlvbiAoaW5wdXQsIHdlZWssIGNvbmZpZywgdG9rZW4pIHtcbiAgICAgICAgd2Vla1t0b2tlbl0gPSB0b0ludChpbnB1dCk7XG4gICAgfSk7XG5cbiAgICAvLyBIRUxQRVJTXG5cbiAgICBmdW5jdGlvbiBwYXJzZVdlZWtkYXkoaW5wdXQsIGxvY2FsZSkge1xuICAgICAgICBpZiAodHlwZW9mIGlucHV0ICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIGlucHV0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpc05hTihpbnB1dCkpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUludChpbnB1dCwgMTApO1xuICAgICAgICB9XG5cbiAgICAgICAgaW5wdXQgPSBsb2NhbGUud2Vla2RheXNQYXJzZShpbnB1dCk7XG4gICAgICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5wdXQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZUlzb1dlZWtkYXkoaW5wdXQsIGxvY2FsZSkge1xuICAgICAgICBpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIGxvY2FsZS53ZWVrZGF5c1BhcnNlKGlucHV0KSAlIDcgfHwgNztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXNOYU4oaW5wdXQpID8gbnVsbCA6IGlucHV0O1xuICAgIH1cblxuICAgIC8vIExPQ0FMRVNcbiAgICBmdW5jdGlvbiBzaGlmdFdlZWtkYXlzICh3cywgbikge1xuICAgICAgICByZXR1cm4gd3Muc2xpY2UobiwgNykuY29uY2F0KHdzLnNsaWNlKDAsIG4pKTtcbiAgICB9XG5cbiAgICB2YXIgZGVmYXVsdExvY2FsZVdlZWtkYXlzID0gJ1N1bmRheV9Nb25kYXlfVHVlc2RheV9XZWRuZXNkYXlfVGh1cnNkYXlfRnJpZGF5X1NhdHVyZGF5Jy5zcGxpdCgnXycpO1xuICAgIGZ1bmN0aW9uIGxvY2FsZVdlZWtkYXlzIChtLCBmb3JtYXQpIHtcbiAgICAgICAgdmFyIHdlZWtkYXlzID0gaXNBcnJheSh0aGlzLl93ZWVrZGF5cykgPyB0aGlzLl93ZWVrZGF5cyA6XG4gICAgICAgICAgICB0aGlzLl93ZWVrZGF5c1sobSAmJiBtICE9PSB0cnVlICYmIHRoaXMuX3dlZWtkYXlzLmlzRm9ybWF0LnRlc3QoZm9ybWF0KSkgPyAnZm9ybWF0JyA6ICdzdGFuZGFsb25lJ107XG4gICAgICAgIHJldHVybiAobSA9PT0gdHJ1ZSkgPyBzaGlmdFdlZWtkYXlzKHdlZWtkYXlzLCB0aGlzLl93ZWVrLmRvdylcbiAgICAgICAgICAgIDogKG0pID8gd2Vla2RheXNbbS5kYXkoKV0gOiB3ZWVrZGF5cztcbiAgICB9XG5cbiAgICB2YXIgZGVmYXVsdExvY2FsZVdlZWtkYXlzU2hvcnQgPSAnU3VuX01vbl9UdWVfV2VkX1RodV9GcmlfU2F0Jy5zcGxpdCgnXycpO1xuICAgIGZ1bmN0aW9uIGxvY2FsZVdlZWtkYXlzU2hvcnQgKG0pIHtcbiAgICAgICAgcmV0dXJuIChtID09PSB0cnVlKSA/IHNoaWZ0V2Vla2RheXModGhpcy5fd2Vla2RheXNTaG9ydCwgdGhpcy5fd2Vlay5kb3cpXG4gICAgICAgICAgICA6IChtKSA/IHRoaXMuX3dlZWtkYXlzU2hvcnRbbS5kYXkoKV0gOiB0aGlzLl93ZWVrZGF5c1Nob3J0O1xuICAgIH1cblxuICAgIHZhciBkZWZhdWx0TG9jYWxlV2Vla2RheXNNaW4gPSAnU3VfTW9fVHVfV2VfVGhfRnJfU2EnLnNwbGl0KCdfJyk7XG4gICAgZnVuY3Rpb24gbG9jYWxlV2Vla2RheXNNaW4gKG0pIHtcbiAgICAgICAgcmV0dXJuIChtID09PSB0cnVlKSA/IHNoaWZ0V2Vla2RheXModGhpcy5fd2Vla2RheXNNaW4sIHRoaXMuX3dlZWsuZG93KVxuICAgICAgICAgICAgOiAobSkgPyB0aGlzLl93ZWVrZGF5c01pblttLmRheSgpXSA6IHRoaXMuX3dlZWtkYXlzTWluO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZVN0cmljdFBhcnNlJDEod2Vla2RheU5hbWUsIGZvcm1hdCwgc3RyaWN0KSB7XG4gICAgICAgIHZhciBpLCBpaSwgbW9tLCBsbGMgPSB3ZWVrZGF5TmFtZS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuICAgICAgICBpZiAoIXRoaXMuX3dlZWtkYXlzUGFyc2UpIHtcbiAgICAgICAgICAgIHRoaXMuX3dlZWtkYXlzUGFyc2UgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX3Nob3J0V2Vla2RheXNQYXJzZSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fbWluV2Vla2RheXNQYXJzZSA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgNzsgKytpKSB7XG4gICAgICAgICAgICAgICAgbW9tID0gY3JlYXRlVVRDKFsyMDAwLCAxXSkuZGF5KGkpO1xuICAgICAgICAgICAgICAgIHRoaXMuX21pbldlZWtkYXlzUGFyc2VbaV0gPSB0aGlzLndlZWtkYXlzTWluKG1vbSwgJycpLnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvcnRXZWVrZGF5c1BhcnNlW2ldID0gdGhpcy53ZWVrZGF5c1Nob3J0KG1vbSwgJycpLnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fd2Vla2RheXNQYXJzZVtpXSA9IHRoaXMud2Vla2RheXMobW9tLCAnJykudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdHJpY3QpIHtcbiAgICAgICAgICAgIGlmIChmb3JtYXQgPT09ICdkZGRkJykge1xuICAgICAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX3dlZWtkYXlzUGFyc2UsIGxsYyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlpICE9PSAtMSA/IGlpIDogbnVsbDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZm9ybWF0ID09PSAnZGRkJykge1xuICAgICAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX3Nob3J0V2Vla2RheXNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaWkgIT09IC0xID8gaWkgOiBudWxsO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9taW5XZWVrZGF5c1BhcnNlLCBsbGMpO1xuICAgICAgICAgICAgICAgIHJldHVybiBpaSAhPT0gLTEgPyBpaSA6IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoZm9ybWF0ID09PSAnZGRkZCcpIHtcbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl93ZWVrZGF5c1BhcnNlLCBsbGMpO1xuICAgICAgICAgICAgICAgIGlmIChpaSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9zaG9ydFdlZWtkYXlzUGFyc2UsIGxsYyk7XG4gICAgICAgICAgICAgICAgaWYgKGlpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaWk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX21pbldlZWtkYXlzUGFyc2UsIGxsYyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlpICE9PSAtMSA/IGlpIDogbnVsbDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZm9ybWF0ID09PSAnZGRkJykge1xuICAgICAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX3Nob3J0V2Vla2RheXNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgICAgICBpZiAoaWkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpaTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fd2Vla2RheXNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgICAgICBpZiAoaWkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpaTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fbWluV2Vla2RheXNQYXJzZSwgbGxjKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaWkgIT09IC0xID8gaWkgOiBudWxsO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9taW5XZWVrZGF5c1BhcnNlLCBsbGMpO1xuICAgICAgICAgICAgICAgIGlmIChpaSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl93ZWVrZGF5c1BhcnNlLCBsbGMpO1xuICAgICAgICAgICAgICAgIGlmIChpaSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9zaG9ydFdlZWtkYXlzUGFyc2UsIGxsYyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlpICE9PSAtMSA/IGlpIDogbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvY2FsZVdlZWtkYXlzUGFyc2UgKHdlZWtkYXlOYW1lLCBmb3JtYXQsIHN0cmljdCkge1xuICAgICAgICB2YXIgaSwgbW9tLCByZWdleDtcblxuICAgICAgICBpZiAodGhpcy5fd2Vla2RheXNQYXJzZUV4YWN0KSB7XG4gICAgICAgICAgICByZXR1cm4gaGFuZGxlU3RyaWN0UGFyc2UkMS5jYWxsKHRoaXMsIHdlZWtkYXlOYW1lLCBmb3JtYXQsIHN0cmljdCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuX3dlZWtkYXlzUGFyc2UpIHtcbiAgICAgICAgICAgIHRoaXMuX3dlZWtkYXlzUGFyc2UgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX21pbldlZWtkYXlzUGFyc2UgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX3Nob3J0V2Vla2RheXNQYXJzZSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fZnVsbFdlZWtkYXlzUGFyc2UgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCA3OyBpKyspIHtcbiAgICAgICAgICAgIC8vIG1ha2UgdGhlIHJlZ2V4IGlmIHdlIGRvbid0IGhhdmUgaXQgYWxyZWFkeVxuXG4gICAgICAgICAgICBtb20gPSBjcmVhdGVVVEMoWzIwMDAsIDFdKS5kYXkoaSk7XG4gICAgICAgICAgICBpZiAoc3RyaWN0ICYmICF0aGlzLl9mdWxsV2Vla2RheXNQYXJzZVtpXSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2Z1bGxXZWVrZGF5c1BhcnNlW2ldID0gbmV3IFJlZ0V4cCgnXicgKyB0aGlzLndlZWtkYXlzKG1vbSwgJycpLnJlcGxhY2UoJy4nLCAnXFxcXC4/JykgKyAnJCcsICdpJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvcnRXZWVrZGF5c1BhcnNlW2ldID0gbmV3IFJlZ0V4cCgnXicgKyB0aGlzLndlZWtkYXlzU2hvcnQobW9tLCAnJykucmVwbGFjZSgnLicsICdcXFxcLj8nKSArICckJywgJ2knKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9taW5XZWVrZGF5c1BhcnNlW2ldID0gbmV3IFJlZ0V4cCgnXicgKyB0aGlzLndlZWtkYXlzTWluKG1vbSwgJycpLnJlcGxhY2UoJy4nLCAnXFxcXC4/JykgKyAnJCcsICdpJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRoaXMuX3dlZWtkYXlzUGFyc2VbaV0pIHtcbiAgICAgICAgICAgICAgICByZWdleCA9ICdeJyArIHRoaXMud2Vla2RheXMobW9tLCAnJykgKyAnfF4nICsgdGhpcy53ZWVrZGF5c1Nob3J0KG1vbSwgJycpICsgJ3xeJyArIHRoaXMud2Vla2RheXNNaW4obW9tLCAnJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fd2Vla2RheXNQYXJzZVtpXSA9IG5ldyBSZWdFeHAocmVnZXgucmVwbGFjZSgnLicsICcnKSwgJ2knKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHRlc3QgdGhlIHJlZ2V4XG4gICAgICAgICAgICBpZiAoc3RyaWN0ICYmIGZvcm1hdCA9PT0gJ2RkZGQnICYmIHRoaXMuX2Z1bGxXZWVrZGF5c1BhcnNlW2ldLnRlc3Qod2Vla2RheU5hbWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0cmljdCAmJiBmb3JtYXQgPT09ICdkZGQnICYmIHRoaXMuX3Nob3J0V2Vla2RheXNQYXJzZVtpXS50ZXN0KHdlZWtkYXlOYW1lKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdHJpY3QgJiYgZm9ybWF0ID09PSAnZGQnICYmIHRoaXMuX21pbldlZWtkYXlzUGFyc2VbaV0udGVzdCh3ZWVrZGF5TmFtZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIXN0cmljdCAmJiB0aGlzLl93ZWVrZGF5c1BhcnNlW2ldLnRlc3Qod2Vla2RheU5hbWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBNT01FTlRTXG5cbiAgICBmdW5jdGlvbiBnZXRTZXREYXlPZldlZWsgKGlucHV0KSB7XG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBpbnB1dCAhPSBudWxsID8gdGhpcyA6IE5hTjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGF5ID0gdGhpcy5faXNVVEMgPyB0aGlzLl9kLmdldFVUQ0RheSgpIDogdGhpcy5fZC5nZXREYXkoKTtcbiAgICAgICAgaWYgKGlucHV0ICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlucHV0ID0gcGFyc2VXZWVrZGF5KGlucHV0LCB0aGlzLmxvY2FsZURhdGEoKSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hZGQoaW5wdXQgLSBkYXksICdkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZGF5O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U2V0TG9jYWxlRGF5T2ZXZWVrIChpbnB1dCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5wdXQgIT0gbnVsbCA/IHRoaXMgOiBOYU47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHdlZWtkYXkgPSAodGhpcy5kYXkoKSArIDcgLSB0aGlzLmxvY2FsZURhdGEoKS5fd2Vlay5kb3cpICUgNztcbiAgICAgICAgcmV0dXJuIGlucHV0ID09IG51bGwgPyB3ZWVrZGF5IDogdGhpcy5hZGQoaW5wdXQgLSB3ZWVrZGF5LCAnZCcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFNldElTT0RheU9mV2VlayAoaW5wdXQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGlucHV0ICE9IG51bGwgPyB0aGlzIDogTmFOO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYmVoYXZlcyB0aGUgc2FtZSBhcyBtb21lbnQjZGF5IGV4Y2VwdFxuICAgICAgICAvLyBhcyBhIGdldHRlciwgcmV0dXJucyA3IGluc3RlYWQgb2YgMCAoMS03IHJhbmdlIGluc3RlYWQgb2YgMC02KVxuICAgICAgICAvLyBhcyBhIHNldHRlciwgc3VuZGF5IHNob3VsZCBiZWxvbmcgdG8gdGhlIHByZXZpb3VzIHdlZWsuXG5cbiAgICAgICAgaWYgKGlucHV0ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHZhciB3ZWVrZGF5ID0gcGFyc2VJc29XZWVrZGF5KGlucHV0LCB0aGlzLmxvY2FsZURhdGEoKSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXkodGhpcy5kYXkoKSAlIDcgPyB3ZWVrZGF5IDogd2Vla2RheSAtIDcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF5KCkgfHwgNztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBkZWZhdWx0V2Vla2RheXNSZWdleCA9IG1hdGNoV29yZDtcbiAgICBmdW5jdGlvbiB3ZWVrZGF5c1JlZ2V4IChpc1N0cmljdCkge1xuICAgICAgICBpZiAodGhpcy5fd2Vla2RheXNQYXJzZUV4YWN0KSB7XG4gICAgICAgICAgICBpZiAoIWhhc093blByb3AodGhpcywgJ193ZWVrZGF5c1JlZ2V4JykpIHtcbiAgICAgICAgICAgICAgICBjb21wdXRlV2Vla2RheXNQYXJzZS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzU3RyaWN0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzU3RyaWN0UmVnZXg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c1JlZ2V4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCFoYXNPd25Qcm9wKHRoaXMsICdfd2Vla2RheXNSZWdleCcpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fd2Vla2RheXNSZWdleCA9IGRlZmF1bHRXZWVrZGF5c1JlZ2V4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzU3RyaWN0UmVnZXggJiYgaXNTdHJpY3QgP1xuICAgICAgICAgICAgICAgIHRoaXMuX3dlZWtkYXlzU3RyaWN0UmVnZXggOiB0aGlzLl93ZWVrZGF5c1JlZ2V4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGRlZmF1bHRXZWVrZGF5c1Nob3J0UmVnZXggPSBtYXRjaFdvcmQ7XG4gICAgZnVuY3Rpb24gd2Vla2RheXNTaG9ydFJlZ2V4IChpc1N0cmljdCkge1xuICAgICAgICBpZiAodGhpcy5fd2Vla2RheXNQYXJzZUV4YWN0KSB7XG4gICAgICAgICAgICBpZiAoIWhhc093blByb3AodGhpcywgJ193ZWVrZGF5c1JlZ2V4JykpIHtcbiAgICAgICAgICAgICAgICBjb21wdXRlV2Vla2RheXNQYXJzZS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzU3RyaWN0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzU2hvcnRTdHJpY3RSZWdleDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzU2hvcnRSZWdleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghaGFzT3duUHJvcCh0aGlzLCAnX3dlZWtkYXlzU2hvcnRSZWdleCcpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fd2Vla2RheXNTaG9ydFJlZ2V4ID0gZGVmYXVsdFdlZWtkYXlzU2hvcnRSZWdleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c1Nob3J0U3RyaWN0UmVnZXggJiYgaXNTdHJpY3QgP1xuICAgICAgICAgICAgICAgIHRoaXMuX3dlZWtkYXlzU2hvcnRTdHJpY3RSZWdleCA6IHRoaXMuX3dlZWtkYXlzU2hvcnRSZWdleDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBkZWZhdWx0V2Vla2RheXNNaW5SZWdleCA9IG1hdGNoV29yZDtcbiAgICBmdW5jdGlvbiB3ZWVrZGF5c01pblJlZ2V4IChpc1N0cmljdCkge1xuICAgICAgICBpZiAodGhpcy5fd2Vla2RheXNQYXJzZUV4YWN0KSB7XG4gICAgICAgICAgICBpZiAoIWhhc093blByb3AodGhpcywgJ193ZWVrZGF5c1JlZ2V4JykpIHtcbiAgICAgICAgICAgICAgICBjb21wdXRlV2Vla2RheXNQYXJzZS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzU3RyaWN0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzTWluU3RyaWN0UmVnZXg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c01pblJlZ2V4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCFoYXNPd25Qcm9wKHRoaXMsICdfd2Vla2RheXNNaW5SZWdleCcpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fd2Vla2RheXNNaW5SZWdleCA9IGRlZmF1bHRXZWVrZGF5c01pblJlZ2V4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzTWluU3RyaWN0UmVnZXggJiYgaXNTdHJpY3QgP1xuICAgICAgICAgICAgICAgIHRoaXMuX3dlZWtkYXlzTWluU3RyaWN0UmVnZXggOiB0aGlzLl93ZWVrZGF5c01pblJlZ2V4O1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiBjb21wdXRlV2Vla2RheXNQYXJzZSAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIGNtcExlblJldihhLCBiKSB7XG4gICAgICAgICAgICByZXR1cm4gYi5sZW5ndGggLSBhLmxlbmd0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBtaW5QaWVjZXMgPSBbXSwgc2hvcnRQaWVjZXMgPSBbXSwgbG9uZ1BpZWNlcyA9IFtdLCBtaXhlZFBpZWNlcyA9IFtdLFxuICAgICAgICAgICAgaSwgbW9tLCBtaW5wLCBzaG9ydHAsIGxvbmdwO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgNzsgaSsrKSB7XG4gICAgICAgICAgICAvLyBtYWtlIHRoZSByZWdleCBpZiB3ZSBkb24ndCBoYXZlIGl0IGFscmVhZHlcbiAgICAgICAgICAgIG1vbSA9IGNyZWF0ZVVUQyhbMjAwMCwgMV0pLmRheShpKTtcbiAgICAgICAgICAgIG1pbnAgPSB0aGlzLndlZWtkYXlzTWluKG1vbSwgJycpO1xuICAgICAgICAgICAgc2hvcnRwID0gdGhpcy53ZWVrZGF5c1Nob3J0KG1vbSwgJycpO1xuICAgICAgICAgICAgbG9uZ3AgPSB0aGlzLndlZWtkYXlzKG1vbSwgJycpO1xuICAgICAgICAgICAgbWluUGllY2VzLnB1c2gobWlucCk7XG4gICAgICAgICAgICBzaG9ydFBpZWNlcy5wdXNoKHNob3J0cCk7XG4gICAgICAgICAgICBsb25nUGllY2VzLnB1c2gobG9uZ3ApO1xuICAgICAgICAgICAgbWl4ZWRQaWVjZXMucHVzaChtaW5wKTtcbiAgICAgICAgICAgIG1peGVkUGllY2VzLnB1c2goc2hvcnRwKTtcbiAgICAgICAgICAgIG1peGVkUGllY2VzLnB1c2gobG9uZ3ApO1xuICAgICAgICB9XG4gICAgICAgIC8vIFNvcnRpbmcgbWFrZXMgc3VyZSBpZiBvbmUgd2Vla2RheSAob3IgYWJicikgaXMgYSBwcmVmaXggb2YgYW5vdGhlciBpdFxuICAgICAgICAvLyB3aWxsIG1hdGNoIHRoZSBsb25nZXIgcGllY2UuXG4gICAgICAgIG1pblBpZWNlcy5zb3J0KGNtcExlblJldik7XG4gICAgICAgIHNob3J0UGllY2VzLnNvcnQoY21wTGVuUmV2KTtcbiAgICAgICAgbG9uZ1BpZWNlcy5zb3J0KGNtcExlblJldik7XG4gICAgICAgIG1peGVkUGllY2VzLnNvcnQoY21wTGVuUmV2KTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDc7IGkrKykge1xuICAgICAgICAgICAgc2hvcnRQaWVjZXNbaV0gPSByZWdleEVzY2FwZShzaG9ydFBpZWNlc1tpXSk7XG4gICAgICAgICAgICBsb25nUGllY2VzW2ldID0gcmVnZXhFc2NhcGUobG9uZ1BpZWNlc1tpXSk7XG4gICAgICAgICAgICBtaXhlZFBpZWNlc1tpXSA9IHJlZ2V4RXNjYXBlKG1peGVkUGllY2VzW2ldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3dlZWtkYXlzUmVnZXggPSBuZXcgUmVnRXhwKCdeKCcgKyBtaXhlZFBpZWNlcy5qb2luKCd8JykgKyAnKScsICdpJyk7XG4gICAgICAgIHRoaXMuX3dlZWtkYXlzU2hvcnRSZWdleCA9IHRoaXMuX3dlZWtkYXlzUmVnZXg7XG4gICAgICAgIHRoaXMuX3dlZWtkYXlzTWluUmVnZXggPSB0aGlzLl93ZWVrZGF5c1JlZ2V4O1xuXG4gICAgICAgIHRoaXMuX3dlZWtkYXlzU3RyaWN0UmVnZXggPSBuZXcgUmVnRXhwKCdeKCcgKyBsb25nUGllY2VzLmpvaW4oJ3wnKSArICcpJywgJ2knKTtcbiAgICAgICAgdGhpcy5fd2Vla2RheXNTaG9ydFN0cmljdFJlZ2V4ID0gbmV3IFJlZ0V4cCgnXignICsgc2hvcnRQaWVjZXMuam9pbignfCcpICsgJyknLCAnaScpO1xuICAgICAgICB0aGlzLl93ZWVrZGF5c01pblN0cmljdFJlZ2V4ID0gbmV3IFJlZ0V4cCgnXignICsgbWluUGllY2VzLmpvaW4oJ3wnKSArICcpJywgJ2knKTtcbiAgICB9XG5cbiAgICAvLyBGT1JNQVRUSU5HXG5cbiAgICBmdW5jdGlvbiBoRm9ybWF0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ob3VycygpICUgMTIgfHwgMTI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24ga0Zvcm1hdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaG91cnMoKSB8fCAyNDtcbiAgICB9XG5cbiAgICBhZGRGb3JtYXRUb2tlbignSCcsIFsnSEgnLCAyXSwgMCwgJ2hvdXInKTtcbiAgICBhZGRGb3JtYXRUb2tlbignaCcsIFsnaGgnLCAyXSwgMCwgaEZvcm1hdCk7XG4gICAgYWRkRm9ybWF0VG9rZW4oJ2snLCBbJ2trJywgMl0sIDAsIGtGb3JtYXQpO1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ2htbScsIDAsIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICcnICsgaEZvcm1hdC5hcHBseSh0aGlzKSArIHplcm9GaWxsKHRoaXMubWludXRlcygpLCAyKTtcbiAgICB9KTtcblxuICAgIGFkZEZvcm1hdFRva2VuKCdobW1zcycsIDAsIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICcnICsgaEZvcm1hdC5hcHBseSh0aGlzKSArIHplcm9GaWxsKHRoaXMubWludXRlcygpLCAyKSArXG4gICAgICAgICAgICB6ZXJvRmlsbCh0aGlzLnNlY29uZHMoKSwgMik7XG4gICAgfSk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbignSG1tJywgMCwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gJycgKyB0aGlzLmhvdXJzKCkgKyB6ZXJvRmlsbCh0aGlzLm1pbnV0ZXMoKSwgMik7XG4gICAgfSk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbignSG1tc3MnLCAwLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAnJyArIHRoaXMuaG91cnMoKSArIHplcm9GaWxsKHRoaXMubWludXRlcygpLCAyKSArXG4gICAgICAgICAgICB6ZXJvRmlsbCh0aGlzLnNlY29uZHMoKSwgMik7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBtZXJpZGllbSAodG9rZW4sIGxvd2VyY2FzZSkge1xuICAgICAgICBhZGRGb3JtYXRUb2tlbih0b2tlbiwgMCwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLm1lcmlkaWVtKHRoaXMuaG91cnMoKSwgdGhpcy5taW51dGVzKCksIGxvd2VyY2FzZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG1lcmlkaWVtKCdhJywgdHJ1ZSk7XG4gICAgbWVyaWRpZW0oJ0EnLCBmYWxzZSk7XG5cbiAgICAvLyBBTElBU0VTXG5cbiAgICBhZGRVbml0QWxpYXMoJ2hvdXInLCAnaCcpO1xuXG4gICAgLy8gUFJJT1JJVFlcbiAgICBhZGRVbml0UHJpb3JpdHkoJ2hvdXInLCAxMyk7XG5cbiAgICAvLyBQQVJTSU5HXG5cbiAgICBmdW5jdGlvbiBtYXRjaE1lcmlkaWVtIChpc1N0cmljdCwgbG9jYWxlKSB7XG4gICAgICAgIHJldHVybiBsb2NhbGUuX21lcmlkaWVtUGFyc2U7XG4gICAgfVxuXG4gICAgYWRkUmVnZXhUb2tlbignYScsICBtYXRjaE1lcmlkaWVtKTtcbiAgICBhZGRSZWdleFRva2VuKCdBJywgIG1hdGNoTWVyaWRpZW0pO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ0gnLCAgbWF0Y2gxdG8yKTtcbiAgICBhZGRSZWdleFRva2VuKCdoJywgIG1hdGNoMXRvMik7XG4gICAgYWRkUmVnZXhUb2tlbignaycsICBtYXRjaDF0bzIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ0hIJywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2hoJywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2trJywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuXG4gICAgYWRkUmVnZXhUb2tlbignaG1tJywgbWF0Y2gzdG80KTtcbiAgICBhZGRSZWdleFRva2VuKCdobW1zcycsIG1hdGNoNXRvNik7XG4gICAgYWRkUmVnZXhUb2tlbignSG1tJywgbWF0Y2gzdG80KTtcbiAgICBhZGRSZWdleFRva2VuKCdIbW1zcycsIG1hdGNoNXRvNik7XG5cbiAgICBhZGRQYXJzZVRva2VuKFsnSCcsICdISCddLCBIT1VSKTtcbiAgICBhZGRQYXJzZVRva2VuKFsnaycsICdrayddLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcbiAgICAgICAgdmFyIGtJbnB1dCA9IHRvSW50KGlucHV0KTtcbiAgICAgICAgYXJyYXlbSE9VUl0gPSBrSW5wdXQgPT09IDI0ID8gMCA6IGtJbnB1dDtcbiAgICB9KTtcbiAgICBhZGRQYXJzZVRva2VuKFsnYScsICdBJ10sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xuICAgICAgICBjb25maWcuX2lzUG0gPSBjb25maWcuX2xvY2FsZS5pc1BNKGlucHV0KTtcbiAgICAgICAgY29uZmlnLl9tZXJpZGllbSA9IGlucHV0O1xuICAgIH0pO1xuICAgIGFkZFBhcnNlVG9rZW4oWydoJywgJ2hoJ10sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xuICAgICAgICBhcnJheVtIT1VSXSA9IHRvSW50KGlucHV0KTtcbiAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuYmlnSG91ciA9IHRydWU7XG4gICAgfSk7XG4gICAgYWRkUGFyc2VUb2tlbignaG1tJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XG4gICAgICAgIHZhciBwb3MgPSBpbnB1dC5sZW5ndGggLSAyO1xuICAgICAgICBhcnJheVtIT1VSXSA9IHRvSW50KGlucHV0LnN1YnN0cigwLCBwb3MpKTtcbiAgICAgICAgYXJyYXlbTUlOVVRFXSA9IHRvSW50KGlucHV0LnN1YnN0cihwb3MpKTtcbiAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuYmlnSG91ciA9IHRydWU7XG4gICAgfSk7XG4gICAgYWRkUGFyc2VUb2tlbignaG1tc3MnLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcbiAgICAgICAgdmFyIHBvczEgPSBpbnB1dC5sZW5ndGggLSA0O1xuICAgICAgICB2YXIgcG9zMiA9IGlucHV0Lmxlbmd0aCAtIDI7XG4gICAgICAgIGFycmF5W0hPVVJdID0gdG9JbnQoaW5wdXQuc3Vic3RyKDAsIHBvczEpKTtcbiAgICAgICAgYXJyYXlbTUlOVVRFXSA9IHRvSW50KGlucHV0LnN1YnN0cihwb3MxLCAyKSk7XG4gICAgICAgIGFycmF5W1NFQ09ORF0gPSB0b0ludChpbnB1dC5zdWJzdHIocG9zMikpO1xuICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5iaWdIb3VyID0gdHJ1ZTtcbiAgICB9KTtcbiAgICBhZGRQYXJzZVRva2VuKCdIbW0nLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcbiAgICAgICAgdmFyIHBvcyA9IGlucHV0Lmxlbmd0aCAtIDI7XG4gICAgICAgIGFycmF5W0hPVVJdID0gdG9JbnQoaW5wdXQuc3Vic3RyKDAsIHBvcykpO1xuICAgICAgICBhcnJheVtNSU5VVEVdID0gdG9JbnQoaW5wdXQuc3Vic3RyKHBvcykpO1xuICAgIH0pO1xuICAgIGFkZFBhcnNlVG9rZW4oJ0htbXNzJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XG4gICAgICAgIHZhciBwb3MxID0gaW5wdXQubGVuZ3RoIC0gNDtcbiAgICAgICAgdmFyIHBvczIgPSBpbnB1dC5sZW5ndGggLSAyO1xuICAgICAgICBhcnJheVtIT1VSXSA9IHRvSW50KGlucHV0LnN1YnN0cigwLCBwb3MxKSk7XG4gICAgICAgIGFycmF5W01JTlVURV0gPSB0b0ludChpbnB1dC5zdWJzdHIocG9zMSwgMikpO1xuICAgICAgICBhcnJheVtTRUNPTkRdID0gdG9JbnQoaW5wdXQuc3Vic3RyKHBvczIpKTtcbiAgICB9KTtcblxuICAgIC8vIExPQ0FMRVNcblxuICAgIGZ1bmN0aW9uIGxvY2FsZUlzUE0gKGlucHV0KSB7XG4gICAgICAgIC8vIElFOCBRdWlya3MgTW9kZSAmIElFNyBTdGFuZGFyZHMgTW9kZSBkbyBub3QgYWxsb3cgYWNjZXNzaW5nIHN0cmluZ3MgbGlrZSBhcnJheXNcbiAgICAgICAgLy8gVXNpbmcgY2hhckF0IHNob3VsZCBiZSBtb3JlIGNvbXBhdGlibGUuXG4gICAgICAgIHJldHVybiAoKGlucHV0ICsgJycpLnRvTG93ZXJDYXNlKCkuY2hhckF0KDApID09PSAncCcpO1xuICAgIH1cblxuICAgIHZhciBkZWZhdWx0TG9jYWxlTWVyaWRpZW1QYXJzZSA9IC9bYXBdXFwuP20/XFwuPy9pO1xuICAgIGZ1bmN0aW9uIGxvY2FsZU1lcmlkaWVtIChob3VycywgbWludXRlcywgaXNMb3dlcikge1xuICAgICAgICBpZiAoaG91cnMgPiAxMSkge1xuICAgICAgICAgICAgcmV0dXJuIGlzTG93ZXIgPyAncG0nIDogJ1BNJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBpc0xvd2VyID8gJ2FtJyA6ICdBTSc7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vIE1PTUVOVFNcblxuICAgIC8vIFNldHRpbmcgdGhlIGhvdXIgc2hvdWxkIGtlZXAgdGhlIHRpbWUsIGJlY2F1c2UgdGhlIHVzZXIgZXhwbGljaXRseVxuICAgIC8vIHNwZWNpZmllZCB3aGljaCBob3VyIHRoZXkgd2FudC4gU28gdHJ5aW5nIHRvIG1haW50YWluIHRoZSBzYW1lIGhvdXIgKGluXG4gICAgLy8gYSBuZXcgdGltZXpvbmUpIG1ha2VzIHNlbnNlLiBBZGRpbmcvc3VidHJhY3RpbmcgaG91cnMgZG9lcyBub3QgZm9sbG93XG4gICAgLy8gdGhpcyBydWxlLlxuICAgIHZhciBnZXRTZXRIb3VyID0gbWFrZUdldFNldCgnSG91cnMnLCB0cnVlKTtcblxuICAgIHZhciBiYXNlQ29uZmlnID0ge1xuICAgICAgICBjYWxlbmRhcjogZGVmYXVsdENhbGVuZGFyLFxuICAgICAgICBsb25nRGF0ZUZvcm1hdDogZGVmYXVsdExvbmdEYXRlRm9ybWF0LFxuICAgICAgICBpbnZhbGlkRGF0ZTogZGVmYXVsdEludmFsaWREYXRlLFxuICAgICAgICBvcmRpbmFsOiBkZWZhdWx0T3JkaW5hbCxcbiAgICAgICAgZGF5T2ZNb250aE9yZGluYWxQYXJzZTogZGVmYXVsdERheU9mTW9udGhPcmRpbmFsUGFyc2UsXG4gICAgICAgIHJlbGF0aXZlVGltZTogZGVmYXVsdFJlbGF0aXZlVGltZSxcblxuICAgICAgICBtb250aHM6IGRlZmF1bHRMb2NhbGVNb250aHMsXG4gICAgICAgIG1vbnRoc1Nob3J0OiBkZWZhdWx0TG9jYWxlTW9udGhzU2hvcnQsXG5cbiAgICAgICAgd2VlazogZGVmYXVsdExvY2FsZVdlZWssXG5cbiAgICAgICAgd2Vla2RheXM6IGRlZmF1bHRMb2NhbGVXZWVrZGF5cyxcbiAgICAgICAgd2Vla2RheXNNaW46IGRlZmF1bHRMb2NhbGVXZWVrZGF5c01pbixcbiAgICAgICAgd2Vla2RheXNTaG9ydDogZGVmYXVsdExvY2FsZVdlZWtkYXlzU2hvcnQsXG5cbiAgICAgICAgbWVyaWRpZW1QYXJzZTogZGVmYXVsdExvY2FsZU1lcmlkaWVtUGFyc2VcbiAgICB9O1xuXG4gICAgLy8gaW50ZXJuYWwgc3RvcmFnZSBmb3IgbG9jYWxlIGNvbmZpZyBmaWxlc1xuICAgIHZhciBsb2NhbGVzID0ge307XG4gICAgdmFyIGxvY2FsZUZhbWlsaWVzID0ge307XG4gICAgdmFyIGdsb2JhbExvY2FsZTtcblxuICAgIGZ1bmN0aW9uIG5vcm1hbGl6ZUxvY2FsZShrZXkpIHtcbiAgICAgICAgcmV0dXJuIGtleSA/IGtleS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoJ18nLCAnLScpIDoga2V5O1xuICAgIH1cblxuICAgIC8vIHBpY2sgdGhlIGxvY2FsZSBmcm9tIHRoZSBhcnJheVxuICAgIC8vIHRyeSBbJ2VuLWF1JywgJ2VuLWdiJ10gYXMgJ2VuLWF1JywgJ2VuLWdiJywgJ2VuJywgYXMgaW4gbW92ZSB0aHJvdWdoIHRoZSBsaXN0IHRyeWluZyBlYWNoXG4gICAgLy8gc3Vic3RyaW5nIGZyb20gbW9zdCBzcGVjaWZpYyB0byBsZWFzdCwgYnV0IG1vdmUgdG8gdGhlIG5leHQgYXJyYXkgaXRlbSBpZiBpdCdzIGEgbW9yZSBzcGVjaWZpYyB2YXJpYW50IHRoYW4gdGhlIGN1cnJlbnQgcm9vdFxuICAgIGZ1bmN0aW9uIGNob29zZUxvY2FsZShuYW1lcykge1xuICAgICAgICB2YXIgaSA9IDAsIGosIG5leHQsIGxvY2FsZSwgc3BsaXQ7XG5cbiAgICAgICAgd2hpbGUgKGkgPCBuYW1lcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHNwbGl0ID0gbm9ybWFsaXplTG9jYWxlKG5hbWVzW2ldKS5zcGxpdCgnLScpO1xuICAgICAgICAgICAgaiA9IHNwbGl0Lmxlbmd0aDtcbiAgICAgICAgICAgIG5leHQgPSBub3JtYWxpemVMb2NhbGUobmFtZXNbaSArIDFdKTtcbiAgICAgICAgICAgIG5leHQgPSBuZXh0ID8gbmV4dC5zcGxpdCgnLScpIDogbnVsbDtcbiAgICAgICAgICAgIHdoaWxlIChqID4gMCkge1xuICAgICAgICAgICAgICAgIGxvY2FsZSA9IGxvYWRMb2NhbGUoc3BsaXQuc2xpY2UoMCwgaikuam9pbignLScpKTtcbiAgICAgICAgICAgICAgICBpZiAobG9jYWxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBsb2NhbGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChuZXh0ICYmIG5leHQubGVuZ3RoID49IGogJiYgY29tcGFyZUFycmF5cyhzcGxpdCwgbmV4dCwgdHJ1ZSkgPj0gaiAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy90aGUgbmV4dCBhcnJheSBpdGVtIGlzIGJldHRlciB0aGFuIGEgc2hhbGxvd2VyIHN1YnN0cmluZyBvZiB0aGlzIG9uZVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgai0tO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBnbG9iYWxMb2NhbGU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9hZExvY2FsZShuYW1lKSB7XG4gICAgICAgIHZhciBvbGRMb2NhbGUgPSBudWxsO1xuICAgICAgICAvLyBUT0RPOiBGaW5kIGEgYmV0dGVyIHdheSB0byByZWdpc3RlciBhbmQgbG9hZCBhbGwgdGhlIGxvY2FsZXMgaW4gTm9kZVxuICAgICAgICBpZiAoIWxvY2FsZXNbbmFtZV0gJiYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSAmJlxuICAgICAgICAgICAgICAgIG1vZHVsZSAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBvbGRMb2NhbGUgPSBnbG9iYWxMb2NhbGUuX2FiYnI7XG4gICAgICAgICAgICAgICAgdmFyIGFsaWFzZWRSZXF1aXJlID0gcmVxdWlyZTtcbiAgICAgICAgICAgICAgICBhbGlhc2VkUmVxdWlyZSgnLi9sb2NhbGUvJyArIG5hbWUpO1xuICAgICAgICAgICAgICAgIGdldFNldEdsb2JhbExvY2FsZShvbGRMb2NhbGUpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbG9jYWxlc1tuYW1lXTtcbiAgICB9XG5cbiAgICAvLyBUaGlzIGZ1bmN0aW9uIHdpbGwgbG9hZCBsb2NhbGUgYW5kIHRoZW4gc2V0IHRoZSBnbG9iYWwgbG9jYWxlLiAgSWZcbiAgICAvLyBubyBhcmd1bWVudHMgYXJlIHBhc3NlZCBpbiwgaXQgd2lsbCBzaW1wbHkgcmV0dXJuIHRoZSBjdXJyZW50IGdsb2JhbFxuICAgIC8vIGxvY2FsZSBrZXkuXG4gICAgZnVuY3Rpb24gZ2V0U2V0R2xvYmFsTG9jYWxlIChrZXksIHZhbHVlcykge1xuICAgICAgICB2YXIgZGF0YTtcbiAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgICAgaWYgKGlzVW5kZWZpbmVkKHZhbHVlcykpIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gZ2V0TG9jYWxlKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gZGVmaW5lTG9jYWxlKGtleSwgdmFsdWVzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAvLyBtb21lbnQuZHVyYXRpb24uX2xvY2FsZSA9IG1vbWVudC5fbG9jYWxlID0gZGF0YTtcbiAgICAgICAgICAgICAgICBnbG9iYWxMb2NhbGUgPSBkYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCh0eXBlb2YgY29uc29sZSAhPT0gICd1bmRlZmluZWQnKSAmJiBjb25zb2xlLndhcm4pIHtcbiAgICAgICAgICAgICAgICAgICAgLy93YXJuIHVzZXIgaWYgYXJndW1lbnRzIGFyZSBwYXNzZWQgYnV0IHRoZSBsb2NhbGUgY291bGQgbm90IGJlIHNldFxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ0xvY2FsZSAnICsga2V5ICsgICcgbm90IGZvdW5kLiBEaWQgeW91IGZvcmdldCB0byBsb2FkIGl0PycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBnbG9iYWxMb2NhbGUuX2FiYnI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVmaW5lTG9jYWxlIChuYW1lLCBjb25maWcpIHtcbiAgICAgICAgaWYgKGNvbmZpZyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdmFyIGxvY2FsZSwgcGFyZW50Q29uZmlnID0gYmFzZUNvbmZpZztcbiAgICAgICAgICAgIGNvbmZpZy5hYmJyID0gbmFtZTtcbiAgICAgICAgICAgIGlmIChsb2NhbGVzW25hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBkZXByZWNhdGVTaW1wbGUoJ2RlZmluZUxvY2FsZU92ZXJyaWRlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICd1c2UgbW9tZW50LnVwZGF0ZUxvY2FsZShsb2NhbGVOYW1lLCBjb25maWcpIHRvIGNoYW5nZSAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdhbiBleGlzdGluZyBsb2NhbGUuIG1vbWVudC5kZWZpbmVMb2NhbGUobG9jYWxlTmFtZSwgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnY29uZmlnKSBzaG91bGQgb25seSBiZSB1c2VkIGZvciBjcmVhdGluZyBhIG5ldyBsb2NhbGUgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnU2VlIGh0dHA6Ly9tb21lbnRqcy5jb20vZ3VpZGVzLyMvd2FybmluZ3MvZGVmaW5lLWxvY2FsZS8gZm9yIG1vcmUgaW5mby4nKTtcbiAgICAgICAgICAgICAgICBwYXJlbnRDb25maWcgPSBsb2NhbGVzW25hbWVdLl9jb25maWc7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy5wYXJlbnRMb2NhbGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmIChsb2NhbGVzW2NvbmZpZy5wYXJlbnRMb2NhbGVdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50Q29uZmlnID0gbG9jYWxlc1tjb25maWcucGFyZW50TG9jYWxlXS5fY29uZmlnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsZSA9IGxvYWRMb2NhbGUoY29uZmlnLnBhcmVudExvY2FsZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2NhbGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50Q29uZmlnID0gbG9jYWxlLl9jb25maWc7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWxvY2FsZUZhbWlsaWVzW2NvbmZpZy5wYXJlbnRMb2NhbGVdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxlRmFtaWxpZXNbY29uZmlnLnBhcmVudExvY2FsZV0gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsZUZhbWlsaWVzW2NvbmZpZy5wYXJlbnRMb2NhbGVdLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnOiBjb25maWdcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsb2NhbGVzW25hbWVdID0gbmV3IExvY2FsZShtZXJnZUNvbmZpZ3MocGFyZW50Q29uZmlnLCBjb25maWcpKTtcblxuICAgICAgICAgICAgaWYgKGxvY2FsZUZhbWlsaWVzW25hbWVdKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxlRmFtaWxpZXNbbmFtZV0uZm9yRWFjaChmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgICBkZWZpbmVMb2NhbGUoeC5uYW1lLCB4LmNvbmZpZyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGJhY2t3YXJkcyBjb21wYXQgZm9yIG5vdzogYWxzbyBzZXQgdGhlIGxvY2FsZVxuICAgICAgICAgICAgLy8gbWFrZSBzdXJlIHdlIHNldCB0aGUgbG9jYWxlIEFGVEVSIGFsbCBjaGlsZCBsb2NhbGVzIGhhdmUgYmVlblxuICAgICAgICAgICAgLy8gY3JlYXRlZCwgc28gd2Ugd29uJ3QgZW5kIHVwIHdpdGggdGhlIGNoaWxkIGxvY2FsZSBzZXQuXG4gICAgICAgICAgICBnZXRTZXRHbG9iYWxMb2NhbGUobmFtZSk7XG5cblxuICAgICAgICAgICAgcmV0dXJuIGxvY2FsZXNbbmFtZV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB1c2VmdWwgZm9yIHRlc3RpbmdcbiAgICAgICAgICAgIGRlbGV0ZSBsb2NhbGVzW25hbWVdO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVMb2NhbGUobmFtZSwgY29uZmlnKSB7XG4gICAgICAgIGlmIChjb25maWcgIT0gbnVsbCkge1xuICAgICAgICAgICAgdmFyIGxvY2FsZSwgdG1wTG9jYWxlLCBwYXJlbnRDb25maWcgPSBiYXNlQ29uZmlnO1xuICAgICAgICAgICAgLy8gTUVSR0VcbiAgICAgICAgICAgIHRtcExvY2FsZSA9IGxvYWRMb2NhbGUobmFtZSk7XG4gICAgICAgICAgICBpZiAodG1wTG9jYWxlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBwYXJlbnRDb25maWcgPSB0bXBMb2NhbGUuX2NvbmZpZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbmZpZyA9IG1lcmdlQ29uZmlncyhwYXJlbnRDb25maWcsIGNvbmZpZyk7XG4gICAgICAgICAgICBsb2NhbGUgPSBuZXcgTG9jYWxlKGNvbmZpZyk7XG4gICAgICAgICAgICBsb2NhbGUucGFyZW50TG9jYWxlID0gbG9jYWxlc1tuYW1lXTtcbiAgICAgICAgICAgIGxvY2FsZXNbbmFtZV0gPSBsb2NhbGU7XG5cbiAgICAgICAgICAgIC8vIGJhY2t3YXJkcyBjb21wYXQgZm9yIG5vdzogYWxzbyBzZXQgdGhlIGxvY2FsZVxuICAgICAgICAgICAgZ2V0U2V0R2xvYmFsTG9jYWxlKG5hbWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gcGFzcyBudWxsIGZvciBjb25maWcgdG8gdW51cGRhdGUsIHVzZWZ1bCBmb3IgdGVzdHNcbiAgICAgICAgICAgIGlmIChsb2NhbGVzW25hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAobG9jYWxlc1tuYW1lXS5wYXJlbnRMb2NhbGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBsb2NhbGVzW25hbWVdID0gbG9jYWxlc1tuYW1lXS5wYXJlbnRMb2NhbGU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChsb2NhbGVzW25hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGxvY2FsZXNbbmFtZV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsb2NhbGVzW25hbWVdO1xuICAgIH1cblxuICAgIC8vIHJldHVybnMgbG9jYWxlIGRhdGFcbiAgICBmdW5jdGlvbiBnZXRMb2NhbGUgKGtleSkge1xuICAgICAgICB2YXIgbG9jYWxlO1xuXG4gICAgICAgIGlmIChrZXkgJiYga2V5Ll9sb2NhbGUgJiYga2V5Ll9sb2NhbGUuX2FiYnIpIHtcbiAgICAgICAgICAgIGtleSA9IGtleS5fbG9jYWxlLl9hYmJyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBnbG9iYWxMb2NhbGU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWlzQXJyYXkoa2V5KSkge1xuICAgICAgICAgICAgLy9zaG9ydC1jaXJjdWl0IGV2ZXJ5dGhpbmcgZWxzZVxuICAgICAgICAgICAgbG9jYWxlID0gbG9hZExvY2FsZShrZXkpO1xuICAgICAgICAgICAgaWYgKGxvY2FsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBsb2NhbGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBrZXkgPSBba2V5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjaG9vc2VMb2NhbGUoa2V5KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaXN0TG9jYWxlcygpIHtcbiAgICAgICAgcmV0dXJuIGtleXMobG9jYWxlcyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tPdmVyZmxvdyAobSkge1xuICAgICAgICB2YXIgb3ZlcmZsb3c7XG4gICAgICAgIHZhciBhID0gbS5fYTtcblxuICAgICAgICBpZiAoYSAmJiBnZXRQYXJzaW5nRmxhZ3MobSkub3ZlcmZsb3cgPT09IC0yKSB7XG4gICAgICAgICAgICBvdmVyZmxvdyA9XG4gICAgICAgICAgICAgICAgYVtNT05USF0gICAgICAgPCAwIHx8IGFbTU9OVEhdICAgICAgID4gMTEgID8gTU9OVEggOlxuICAgICAgICAgICAgICAgIGFbREFURV0gICAgICAgIDwgMSB8fCBhW0RBVEVdICAgICAgICA+IGRheXNJbk1vbnRoKGFbWUVBUl0sIGFbTU9OVEhdKSA/IERBVEUgOlxuICAgICAgICAgICAgICAgIGFbSE9VUl0gICAgICAgIDwgMCB8fCBhW0hPVVJdICAgICAgICA+IDI0IHx8IChhW0hPVVJdID09PSAyNCAmJiAoYVtNSU5VVEVdICE9PSAwIHx8IGFbU0VDT05EXSAhPT0gMCB8fCBhW01JTExJU0VDT05EXSAhPT0gMCkpID8gSE9VUiA6XG4gICAgICAgICAgICAgICAgYVtNSU5VVEVdICAgICAgPCAwIHx8IGFbTUlOVVRFXSAgICAgID4gNTkgID8gTUlOVVRFIDpcbiAgICAgICAgICAgICAgICBhW1NFQ09ORF0gICAgICA8IDAgfHwgYVtTRUNPTkRdICAgICAgPiA1OSAgPyBTRUNPTkQgOlxuICAgICAgICAgICAgICAgIGFbTUlMTElTRUNPTkRdIDwgMCB8fCBhW01JTExJU0VDT05EXSA+IDk5OSA/IE1JTExJU0VDT05EIDpcbiAgICAgICAgICAgICAgICAtMTtcblxuICAgICAgICAgICAgaWYgKGdldFBhcnNpbmdGbGFncyhtKS5fb3ZlcmZsb3dEYXlPZlllYXIgJiYgKG92ZXJmbG93IDwgWUVBUiB8fCBvdmVyZmxvdyA+IERBVEUpKSB7XG4gICAgICAgICAgICAgICAgb3ZlcmZsb3cgPSBEQVRFO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGdldFBhcnNpbmdGbGFncyhtKS5fb3ZlcmZsb3dXZWVrcyAmJiBvdmVyZmxvdyA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBvdmVyZmxvdyA9IFdFRUs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZ2V0UGFyc2luZ0ZsYWdzKG0pLl9vdmVyZmxvd1dlZWtkYXkgJiYgb3ZlcmZsb3cgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgb3ZlcmZsb3cgPSBXRUVLREFZO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MobSkub3ZlcmZsb3cgPSBvdmVyZmxvdztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtO1xuICAgIH1cblxuICAgIC8vIFBpY2sgdGhlIGZpcnN0IGRlZmluZWQgb2YgdHdvIG9yIHRocmVlIGFyZ3VtZW50cy5cbiAgICBmdW5jdGlvbiBkZWZhdWx0cyhhLCBiLCBjKSB7XG4gICAgICAgIGlmIChhICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBhO1xuICAgICAgICB9XG4gICAgICAgIGlmIChiICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGN1cnJlbnREYXRlQXJyYXkoY29uZmlnKSB7XG4gICAgICAgIC8vIGhvb2tzIGlzIGFjdHVhbGx5IHRoZSBleHBvcnRlZCBtb21lbnQgb2JqZWN0XG4gICAgICAgIHZhciBub3dWYWx1ZSA9IG5ldyBEYXRlKGhvb2tzLm5vdygpKTtcbiAgICAgICAgaWYgKGNvbmZpZy5fdXNlVVRDKSB7XG4gICAgICAgICAgICByZXR1cm4gW25vd1ZhbHVlLmdldFVUQ0Z1bGxZZWFyKCksIG5vd1ZhbHVlLmdldFVUQ01vbnRoKCksIG5vd1ZhbHVlLmdldFVUQ0RhdGUoKV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtub3dWYWx1ZS5nZXRGdWxsWWVhcigpLCBub3dWYWx1ZS5nZXRNb250aCgpLCBub3dWYWx1ZS5nZXREYXRlKCldO1xuICAgIH1cblxuICAgIC8vIGNvbnZlcnQgYW4gYXJyYXkgdG8gYSBkYXRlLlxuICAgIC8vIHRoZSBhcnJheSBzaG91bGQgbWlycm9yIHRoZSBwYXJhbWV0ZXJzIGJlbG93XG4gICAgLy8gbm90ZTogYWxsIHZhbHVlcyBwYXN0IHRoZSB5ZWFyIGFyZSBvcHRpb25hbCBhbmQgd2lsbCBkZWZhdWx0IHRvIHRoZSBsb3dlc3QgcG9zc2libGUgdmFsdWUuXG4gICAgLy8gW3llYXIsIG1vbnRoLCBkYXkgLCBob3VyLCBtaW51dGUsIHNlY29uZCwgbWlsbGlzZWNvbmRdXG4gICAgZnVuY3Rpb24gY29uZmlnRnJvbUFycmF5IChjb25maWcpIHtcbiAgICAgICAgdmFyIGksIGRhdGUsIGlucHV0ID0gW10sIGN1cnJlbnREYXRlLCBleHBlY3RlZFdlZWtkYXksIHllYXJUb1VzZTtcblxuICAgICAgICBpZiAoY29uZmlnLl9kKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjdXJyZW50RGF0ZSA9IGN1cnJlbnREYXRlQXJyYXkoY29uZmlnKTtcblxuICAgICAgICAvL2NvbXB1dGUgZGF5IG9mIHRoZSB5ZWFyIGZyb20gd2Vla3MgYW5kIHdlZWtkYXlzXG4gICAgICAgIGlmIChjb25maWcuX3cgJiYgY29uZmlnLl9hW0RBVEVdID09IG51bGwgJiYgY29uZmlnLl9hW01PTlRIXSA9PSBudWxsKSB7XG4gICAgICAgICAgICBkYXlPZlllYXJGcm9tV2Vla0luZm8oY29uZmlnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vaWYgdGhlIGRheSBvZiB0aGUgeWVhciBpcyBzZXQsIGZpZ3VyZSBvdXQgd2hhdCBpdCBpc1xuICAgICAgICBpZiAoY29uZmlnLl9kYXlPZlllYXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgeWVhclRvVXNlID0gZGVmYXVsdHMoY29uZmlnLl9hW1lFQVJdLCBjdXJyZW50RGF0ZVtZRUFSXSk7XG5cbiAgICAgICAgICAgIGlmIChjb25maWcuX2RheU9mWWVhciA+IGRheXNJblllYXIoeWVhclRvVXNlKSB8fCBjb25maWcuX2RheU9mWWVhciA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLl9vdmVyZmxvd0RheU9mWWVhciA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRhdGUgPSBjcmVhdGVVVENEYXRlKHllYXJUb1VzZSwgMCwgY29uZmlnLl9kYXlPZlllYXIpO1xuICAgICAgICAgICAgY29uZmlnLl9hW01PTlRIXSA9IGRhdGUuZ2V0VVRDTW9udGgoKTtcbiAgICAgICAgICAgIGNvbmZpZy5fYVtEQVRFXSA9IGRhdGUuZ2V0VVRDRGF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRGVmYXVsdCB0byBjdXJyZW50IGRhdGUuXG4gICAgICAgIC8vICogaWYgbm8geWVhciwgbW9udGgsIGRheSBvZiBtb250aCBhcmUgZ2l2ZW4sIGRlZmF1bHQgdG8gdG9kYXlcbiAgICAgICAgLy8gKiBpZiBkYXkgb2YgbW9udGggaXMgZ2l2ZW4sIGRlZmF1bHQgbW9udGggYW5kIHllYXJcbiAgICAgICAgLy8gKiBpZiBtb250aCBpcyBnaXZlbiwgZGVmYXVsdCBvbmx5IHllYXJcbiAgICAgICAgLy8gKiBpZiB5ZWFyIGlzIGdpdmVuLCBkb24ndCBkZWZhdWx0IGFueXRoaW5nXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCAzICYmIGNvbmZpZy5fYVtpXSA9PSBudWxsOyArK2kpIHtcbiAgICAgICAgICAgIGNvbmZpZy5fYVtpXSA9IGlucHV0W2ldID0gY3VycmVudERhdGVbaV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBaZXJvIG91dCB3aGF0ZXZlciB3YXMgbm90IGRlZmF1bHRlZCwgaW5jbHVkaW5nIHRpbWVcbiAgICAgICAgZm9yICg7IGkgPCA3OyBpKyspIHtcbiAgICAgICAgICAgIGNvbmZpZy5fYVtpXSA9IGlucHV0W2ldID0gKGNvbmZpZy5fYVtpXSA9PSBudWxsKSA/IChpID09PSAyID8gMSA6IDApIDogY29uZmlnLl9hW2ldO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2hlY2sgZm9yIDI0OjAwOjAwLjAwMFxuICAgICAgICBpZiAoY29uZmlnLl9hW0hPVVJdID09PSAyNCAmJlxuICAgICAgICAgICAgICAgIGNvbmZpZy5fYVtNSU5VVEVdID09PSAwICYmXG4gICAgICAgICAgICAgICAgY29uZmlnLl9hW1NFQ09ORF0gPT09IDAgJiZcbiAgICAgICAgICAgICAgICBjb25maWcuX2FbTUlMTElTRUNPTkRdID09PSAwKSB7XG4gICAgICAgICAgICBjb25maWcuX25leHREYXkgPSB0cnVlO1xuICAgICAgICAgICAgY29uZmlnLl9hW0hPVVJdID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbmZpZy5fZCA9IChjb25maWcuX3VzZVVUQyA/IGNyZWF0ZVVUQ0RhdGUgOiBjcmVhdGVEYXRlKS5hcHBseShudWxsLCBpbnB1dCk7XG4gICAgICAgIGV4cGVjdGVkV2Vla2RheSA9IGNvbmZpZy5fdXNlVVRDID8gY29uZmlnLl9kLmdldFVUQ0RheSgpIDogY29uZmlnLl9kLmdldERheSgpO1xuXG4gICAgICAgIC8vIEFwcGx5IHRpbWV6b25lIG9mZnNldCBmcm9tIGlucHV0LiBUaGUgYWN0dWFsIHV0Y09mZnNldCBjYW4gYmUgY2hhbmdlZFxuICAgICAgICAvLyB3aXRoIHBhcnNlWm9uZS5cbiAgICAgICAgaWYgKGNvbmZpZy5fdHptICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbmZpZy5fZC5zZXRVVENNaW51dGVzKGNvbmZpZy5fZC5nZXRVVENNaW51dGVzKCkgLSBjb25maWcuX3R6bSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29uZmlnLl9uZXh0RGF5KSB7XG4gICAgICAgICAgICBjb25maWcuX2FbSE9VUl0gPSAyNDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNoZWNrIGZvciBtaXNtYXRjaGluZyBkYXkgb2Ygd2Vla1xuICAgICAgICBpZiAoY29uZmlnLl93ICYmIHR5cGVvZiBjb25maWcuX3cuZCAhPT0gJ3VuZGVmaW5lZCcgJiYgY29uZmlnLl93LmQgIT09IGV4cGVjdGVkV2Vla2RheSkge1xuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykud2Vla2RheU1pc21hdGNoID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRheU9mWWVhckZyb21XZWVrSW5mbyhjb25maWcpIHtcbiAgICAgICAgdmFyIHcsIHdlZWtZZWFyLCB3ZWVrLCB3ZWVrZGF5LCBkb3csIGRveSwgdGVtcCwgd2Vla2RheU92ZXJmbG93O1xuXG4gICAgICAgIHcgPSBjb25maWcuX3c7XG4gICAgICAgIGlmICh3LkdHICE9IG51bGwgfHwgdy5XICE9IG51bGwgfHwgdy5FICE9IG51bGwpIHtcbiAgICAgICAgICAgIGRvdyA9IDE7XG4gICAgICAgICAgICBkb3kgPSA0O1xuXG4gICAgICAgICAgICAvLyBUT0RPOiBXZSBuZWVkIHRvIHRha2UgdGhlIGN1cnJlbnQgaXNvV2Vla1llYXIsIGJ1dCB0aGF0IGRlcGVuZHMgb25cbiAgICAgICAgICAgIC8vIGhvdyB3ZSBpbnRlcnByZXQgbm93IChsb2NhbCwgdXRjLCBmaXhlZCBvZmZzZXQpLiBTbyBjcmVhdGVcbiAgICAgICAgICAgIC8vIGEgbm93IHZlcnNpb24gb2YgY3VycmVudCBjb25maWcgKHRha2UgbG9jYWwvdXRjL29mZnNldCBmbGFncywgYW5kXG4gICAgICAgICAgICAvLyBjcmVhdGUgbm93KS5cbiAgICAgICAgICAgIHdlZWtZZWFyID0gZGVmYXVsdHMody5HRywgY29uZmlnLl9hW1lFQVJdLCB3ZWVrT2ZZZWFyKGNyZWF0ZUxvY2FsKCksIDEsIDQpLnllYXIpO1xuICAgICAgICAgICAgd2VlayA9IGRlZmF1bHRzKHcuVywgMSk7XG4gICAgICAgICAgICB3ZWVrZGF5ID0gZGVmYXVsdHMody5FLCAxKTtcbiAgICAgICAgICAgIGlmICh3ZWVrZGF5IDwgMSB8fCB3ZWVrZGF5ID4gNykge1xuICAgICAgICAgICAgICAgIHdlZWtkYXlPdmVyZmxvdyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkb3cgPSBjb25maWcuX2xvY2FsZS5fd2Vlay5kb3c7XG4gICAgICAgICAgICBkb3kgPSBjb25maWcuX2xvY2FsZS5fd2Vlay5kb3k7XG5cbiAgICAgICAgICAgIHZhciBjdXJXZWVrID0gd2Vla09mWWVhcihjcmVhdGVMb2NhbCgpLCBkb3csIGRveSk7XG5cbiAgICAgICAgICAgIHdlZWtZZWFyID0gZGVmYXVsdHMody5nZywgY29uZmlnLl9hW1lFQVJdLCBjdXJXZWVrLnllYXIpO1xuXG4gICAgICAgICAgICAvLyBEZWZhdWx0IHRvIGN1cnJlbnQgd2Vlay5cbiAgICAgICAgICAgIHdlZWsgPSBkZWZhdWx0cyh3LncsIGN1cldlZWsud2Vlayk7XG5cbiAgICAgICAgICAgIGlmICh3LmQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIC8vIHdlZWtkYXkgLS0gbG93IGRheSBudW1iZXJzIGFyZSBjb25zaWRlcmVkIG5leHQgd2Vla1xuICAgICAgICAgICAgICAgIHdlZWtkYXkgPSB3LmQ7XG4gICAgICAgICAgICAgICAgaWYgKHdlZWtkYXkgPCAwIHx8IHdlZWtkYXkgPiA2KSB7XG4gICAgICAgICAgICAgICAgICAgIHdlZWtkYXlPdmVyZmxvdyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICh3LmUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIC8vIGxvY2FsIHdlZWtkYXkgLS0gY291bnRpbmcgc3RhcnRzIGZyb20gYmVnaW5uaW5nIG9mIHdlZWtcbiAgICAgICAgICAgICAgICB3ZWVrZGF5ID0gdy5lICsgZG93O1xuICAgICAgICAgICAgICAgIGlmICh3LmUgPCAwIHx8IHcuZSA+IDYpIHtcbiAgICAgICAgICAgICAgICAgICAgd2Vla2RheU92ZXJmbG93ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGRlZmF1bHQgdG8gYmVnaW5uaW5nIG9mIHdlZWtcbiAgICAgICAgICAgICAgICB3ZWVrZGF5ID0gZG93O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh3ZWVrIDwgMSB8fCB3ZWVrID4gd2Vla3NJblllYXIod2Vla1llYXIsIGRvdywgZG95KSkge1xuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuX292ZXJmbG93V2Vla3MgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKHdlZWtkYXlPdmVyZmxvdyAhPSBudWxsKSB7XG4gICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5fb3ZlcmZsb3dXZWVrZGF5ID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRlbXAgPSBkYXlPZlllYXJGcm9tV2Vla3Mod2Vla1llYXIsIHdlZWssIHdlZWtkYXksIGRvdywgZG95KTtcbiAgICAgICAgICAgIGNvbmZpZy5fYVtZRUFSXSA9IHRlbXAueWVhcjtcbiAgICAgICAgICAgIGNvbmZpZy5fZGF5T2ZZZWFyID0gdGVtcC5kYXlPZlllYXI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBpc28gODYwMSByZWdleFxuICAgIC8vIDAwMDAtMDAtMDAgMDAwMC1XMDAgb3IgMDAwMC1XMDAtMCArIFQgKyAwMCBvciAwMDowMCBvciAwMDowMDowMCBvciAwMDowMDowMC4wMDAgKyArMDA6MDAgb3IgKzAwMDAgb3IgKzAwKVxuICAgIHZhciBleHRlbmRlZElzb1JlZ2V4ID0gL15cXHMqKCg/OlsrLV1cXGR7Nn18XFxkezR9KS0oPzpcXGRcXGQtXFxkXFxkfFdcXGRcXGQtXFxkfFdcXGRcXGR8XFxkXFxkXFxkfFxcZFxcZCkpKD86KFR8ICkoXFxkXFxkKD86OlxcZFxcZCg/OjpcXGRcXGQoPzpbLixdXFxkKyk/KT8pPykoW1xcK1xcLV1cXGRcXGQoPzo6P1xcZFxcZCk/fFxccypaKT8pPyQvO1xuICAgIHZhciBiYXNpY0lzb1JlZ2V4ID0gL15cXHMqKCg/OlsrLV1cXGR7Nn18XFxkezR9KSg/OlxcZFxcZFxcZFxcZHxXXFxkXFxkXFxkfFdcXGRcXGR8XFxkXFxkXFxkfFxcZFxcZCkpKD86KFR8ICkoXFxkXFxkKD86XFxkXFxkKD86XFxkXFxkKD86Wy4sXVxcZCspPyk/KT8pKFtcXCtcXC1dXFxkXFxkKD86Oj9cXGRcXGQpP3xcXHMqWik/KT8kLztcblxuICAgIHZhciB0elJlZ2V4ID0gL1p8WystXVxcZFxcZCg/Ojo/XFxkXFxkKT8vO1xuXG4gICAgdmFyIGlzb0RhdGVzID0gW1xuICAgICAgICBbJ1lZWVlZWS1NTS1ERCcsIC9bKy1dXFxkezZ9LVxcZFxcZC1cXGRcXGQvXSxcbiAgICAgICAgWydZWVlZLU1NLUREJywgL1xcZHs0fS1cXGRcXGQtXFxkXFxkL10sXG4gICAgICAgIFsnR0dHRy1bV11XVy1FJywgL1xcZHs0fS1XXFxkXFxkLVxcZC9dLFxuICAgICAgICBbJ0dHR0ctW1ddV1cnLCAvXFxkezR9LVdcXGRcXGQvLCBmYWxzZV0sXG4gICAgICAgIFsnWVlZWS1EREQnLCAvXFxkezR9LVxcZHszfS9dLFxuICAgICAgICBbJ1lZWVktTU0nLCAvXFxkezR9LVxcZFxcZC8sIGZhbHNlXSxcbiAgICAgICAgWydZWVlZWVlNTUREJywgL1srLV1cXGR7MTB9L10sXG4gICAgICAgIFsnWVlZWU1NREQnLCAvXFxkezh9L10sXG4gICAgICAgIC8vIFlZWVlNTSBpcyBOT1QgYWxsb3dlZCBieSB0aGUgc3RhbmRhcmRcbiAgICAgICAgWydHR0dHW1ddV1dFJywgL1xcZHs0fVdcXGR7M30vXSxcbiAgICAgICAgWydHR0dHW1ddV1cnLCAvXFxkezR9V1xcZHsyfS8sIGZhbHNlXSxcbiAgICAgICAgWydZWVlZREREJywgL1xcZHs3fS9dXG4gICAgXTtcblxuICAgIC8vIGlzbyB0aW1lIGZvcm1hdHMgYW5kIHJlZ2V4ZXNcbiAgICB2YXIgaXNvVGltZXMgPSBbXG4gICAgICAgIFsnSEg6bW06c3MuU1NTUycsIC9cXGRcXGQ6XFxkXFxkOlxcZFxcZFxcLlxcZCsvXSxcbiAgICAgICAgWydISDptbTpzcyxTU1NTJywgL1xcZFxcZDpcXGRcXGQ6XFxkXFxkLFxcZCsvXSxcbiAgICAgICAgWydISDptbTpzcycsIC9cXGRcXGQ6XFxkXFxkOlxcZFxcZC9dLFxuICAgICAgICBbJ0hIOm1tJywgL1xcZFxcZDpcXGRcXGQvXSxcbiAgICAgICAgWydISG1tc3MuU1NTUycsIC9cXGRcXGRcXGRcXGRcXGRcXGRcXC5cXGQrL10sXG4gICAgICAgIFsnSEhtbXNzLFNTU1MnLCAvXFxkXFxkXFxkXFxkXFxkXFxkLFxcZCsvXSxcbiAgICAgICAgWydISG1tc3MnLCAvXFxkXFxkXFxkXFxkXFxkXFxkL10sXG4gICAgICAgIFsnSEhtbScsIC9cXGRcXGRcXGRcXGQvXSxcbiAgICAgICAgWydISCcsIC9cXGRcXGQvXVxuICAgIF07XG5cbiAgICB2YXIgYXNwTmV0SnNvblJlZ2V4ID0gL15cXC8/RGF0ZVxcKChcXC0/XFxkKykvaTtcblxuICAgIC8vIGRhdGUgZnJvbSBpc28gZm9ybWF0XG4gICAgZnVuY3Rpb24gY29uZmlnRnJvbUlTTyhjb25maWcpIHtcbiAgICAgICAgdmFyIGksIGwsXG4gICAgICAgICAgICBzdHJpbmcgPSBjb25maWcuX2ksXG4gICAgICAgICAgICBtYXRjaCA9IGV4dGVuZGVkSXNvUmVnZXguZXhlYyhzdHJpbmcpIHx8IGJhc2ljSXNvUmVnZXguZXhlYyhzdHJpbmcpLFxuICAgICAgICAgICAgYWxsb3dUaW1lLCBkYXRlRm9ybWF0LCB0aW1lRm9ybWF0LCB0ekZvcm1hdDtcblxuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmlzbyA9IHRydWU7XG5cbiAgICAgICAgICAgIGZvciAoaSA9IDAsIGwgPSBpc29EYXRlcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNvRGF0ZXNbaV1bMV0uZXhlYyhtYXRjaFsxXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0ZUZvcm1hdCA9IGlzb0RhdGVzW2ldWzBdO1xuICAgICAgICAgICAgICAgICAgICBhbGxvd1RpbWUgPSBpc29EYXRlc1tpXVsyXSAhPT0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRlRm9ybWF0ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjb25maWcuX2lzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobWF0Y2hbM10pIHtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwLCBsID0gaXNvVGltZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc29UaW1lc1tpXVsxXS5leGVjKG1hdGNoWzNdKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbWF0Y2hbMl0gc2hvdWxkIGJlICdUJyBvciBzcGFjZVxuICAgICAgICAgICAgICAgICAgICAgICAgdGltZUZvcm1hdCA9IChtYXRjaFsyXSB8fCAnICcpICsgaXNvVGltZXNbaV1bMF07XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGltZUZvcm1hdCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZy5faXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFhbGxvd1RpbWUgJiYgdGltZUZvcm1hdCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY29uZmlnLl9pc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1hdGNoWzRdKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR6UmVnZXguZXhlYyhtYXRjaFs0XSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdHpGb3JtYXQgPSAnWic7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnLl9pc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25maWcuX2YgPSBkYXRlRm9ybWF0ICsgKHRpbWVGb3JtYXQgfHwgJycpICsgKHR6Rm9ybWF0IHx8ICcnKTtcbiAgICAgICAgICAgIGNvbmZpZ0Zyb21TdHJpbmdBbmRGb3JtYXQoY29uZmlnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbmZpZy5faXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gUkZDIDI4MjIgcmVnZXg6IEZvciBkZXRhaWxzIHNlZSBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMjgyMiNzZWN0aW9uLTMuM1xuICAgIHZhciByZmMyODIyID0gL14oPzooTW9ufFR1ZXxXZWR8VGh1fEZyaXxTYXR8U3VuKSw/XFxzKT8oXFxkezEsMn0pXFxzKEphbnxGZWJ8TWFyfEFwcnxNYXl8SnVufEp1bHxBdWd8U2VwfE9jdHxOb3Z8RGVjKVxccyhcXGR7Miw0fSlcXHMoXFxkXFxkKTooXFxkXFxkKSg/OjooXFxkXFxkKSk/XFxzKD86KFVUfEdNVHxbRUNNUF1bU0RdVCl8KFtael0pfChbKy1dXFxkezR9KSkkLztcblxuICAgIGZ1bmN0aW9uIGV4dHJhY3RGcm9tUkZDMjgyMlN0cmluZ3MoeWVhclN0ciwgbW9udGhTdHIsIGRheVN0ciwgaG91clN0ciwgbWludXRlU3RyLCBzZWNvbmRTdHIpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IFtcbiAgICAgICAgICAgIHVudHJ1bmNhdGVZZWFyKHllYXJTdHIpLFxuICAgICAgICAgICAgZGVmYXVsdExvY2FsZU1vbnRoc1Nob3J0LmluZGV4T2YobW9udGhTdHIpLFxuICAgICAgICAgICAgcGFyc2VJbnQoZGF5U3RyLCAxMCksXG4gICAgICAgICAgICBwYXJzZUludChob3VyU3RyLCAxMCksXG4gICAgICAgICAgICBwYXJzZUludChtaW51dGVTdHIsIDEwKVxuICAgICAgICBdO1xuXG4gICAgICAgIGlmIChzZWNvbmRTdHIpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHBhcnNlSW50KHNlY29uZFN0ciwgMTApKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdW50cnVuY2F0ZVllYXIoeWVhclN0cikge1xuICAgICAgICB2YXIgeWVhciA9IHBhcnNlSW50KHllYXJTdHIsIDEwKTtcbiAgICAgICAgaWYgKHllYXIgPD0gNDkpIHtcbiAgICAgICAgICAgIHJldHVybiAyMDAwICsgeWVhcjtcbiAgICAgICAgfSBlbHNlIGlmICh5ZWFyIDw9IDk5OSkge1xuICAgICAgICAgICAgcmV0dXJuIDE5MDAgKyB5ZWFyO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB5ZWFyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHByZXByb2Nlc3NSRkMyODIyKHMpIHtcbiAgICAgICAgLy8gUmVtb3ZlIGNvbW1lbnRzIGFuZCBmb2xkaW5nIHdoaXRlc3BhY2UgYW5kIHJlcGxhY2UgbXVsdGlwbGUtc3BhY2VzIHdpdGggYSBzaW5nbGUgc3BhY2VcbiAgICAgICAgcmV0dXJuIHMucmVwbGFjZSgvXFwoW14pXSpcXCl8W1xcblxcdF0vZywgJyAnKS5yZXBsYWNlKC8oXFxzXFxzKykvZywgJyAnKS5yZXBsYWNlKC9eXFxzXFxzKi8sICcnKS5yZXBsYWNlKC9cXHNcXHMqJC8sICcnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja1dlZWtkYXkod2Vla2RheVN0ciwgcGFyc2VkSW5wdXQsIGNvbmZpZykge1xuICAgICAgICBpZiAod2Vla2RheVN0cikge1xuICAgICAgICAgICAgLy8gVE9ETzogUmVwbGFjZSB0aGUgdmFuaWxsYSBKUyBEYXRlIG9iamVjdCB3aXRoIGFuIGluZGVwZW50ZW50IGRheS1vZi13ZWVrIGNoZWNrLlxuICAgICAgICAgICAgdmFyIHdlZWtkYXlQcm92aWRlZCA9IGRlZmF1bHRMb2NhbGVXZWVrZGF5c1Nob3J0LmluZGV4T2Yod2Vla2RheVN0ciksXG4gICAgICAgICAgICAgICAgd2Vla2RheUFjdHVhbCA9IG5ldyBEYXRlKHBhcnNlZElucHV0WzBdLCBwYXJzZWRJbnB1dFsxXSwgcGFyc2VkSW5wdXRbMl0pLmdldERheSgpO1xuICAgICAgICAgICAgaWYgKHdlZWtkYXlQcm92aWRlZCAhPT0gd2Vla2RheUFjdHVhbCkge1xuICAgICAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLndlZWtkYXlNaXNtYXRjaCA9IHRydWU7XG4gICAgICAgICAgICAgICAgY29uZmlnLl9pc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHZhciBvYnNPZmZzZXRzID0ge1xuICAgICAgICBVVDogMCxcbiAgICAgICAgR01UOiAwLFxuICAgICAgICBFRFQ6IC00ICogNjAsXG4gICAgICAgIEVTVDogLTUgKiA2MCxcbiAgICAgICAgQ0RUOiAtNSAqIDYwLFxuICAgICAgICBDU1Q6IC02ICogNjAsXG4gICAgICAgIE1EVDogLTYgKiA2MCxcbiAgICAgICAgTVNUOiAtNyAqIDYwLFxuICAgICAgICBQRFQ6IC03ICogNjAsXG4gICAgICAgIFBTVDogLTggKiA2MFxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBjYWxjdWxhdGVPZmZzZXQob2JzT2Zmc2V0LCBtaWxpdGFyeU9mZnNldCwgbnVtT2Zmc2V0KSB7XG4gICAgICAgIGlmIChvYnNPZmZzZXQpIHtcbiAgICAgICAgICAgIHJldHVybiBvYnNPZmZzZXRzW29ic09mZnNldF07XG4gICAgICAgIH0gZWxzZSBpZiAobWlsaXRhcnlPZmZzZXQpIHtcbiAgICAgICAgICAgIC8vIHRoZSBvbmx5IGFsbG93ZWQgbWlsaXRhcnkgdHogaXMgWlxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgaG0gPSBwYXJzZUludChudW1PZmZzZXQsIDEwKTtcbiAgICAgICAgICAgIHZhciBtID0gaG0gJSAxMDAsIGggPSAoaG0gLSBtKSAvIDEwMDtcbiAgICAgICAgICAgIHJldHVybiBoICogNjAgKyBtO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gZGF0ZSBhbmQgdGltZSBmcm9tIHJlZiAyODIyIGZvcm1hdFxuICAgIGZ1bmN0aW9uIGNvbmZpZ0Zyb21SRkMyODIyKGNvbmZpZykge1xuICAgICAgICB2YXIgbWF0Y2ggPSByZmMyODIyLmV4ZWMocHJlcHJvY2Vzc1JGQzI4MjIoY29uZmlnLl9pKSk7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgdmFyIHBhcnNlZEFycmF5ID0gZXh0cmFjdEZyb21SRkMyODIyU3RyaW5ncyhtYXRjaFs0XSwgbWF0Y2hbM10sIG1hdGNoWzJdLCBtYXRjaFs1XSwgbWF0Y2hbNl0sIG1hdGNoWzddKTtcbiAgICAgICAgICAgIGlmICghY2hlY2tXZWVrZGF5KG1hdGNoWzFdLCBwYXJzZWRBcnJheSwgY29uZmlnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uZmlnLl9hID0gcGFyc2VkQXJyYXk7XG4gICAgICAgICAgICBjb25maWcuX3R6bSA9IGNhbGN1bGF0ZU9mZnNldChtYXRjaFs4XSwgbWF0Y2hbOV0sIG1hdGNoWzEwXSk7XG5cbiAgICAgICAgICAgIGNvbmZpZy5fZCA9IGNyZWF0ZVVUQ0RhdGUuYXBwbHkobnVsbCwgY29uZmlnLl9hKTtcbiAgICAgICAgICAgIGNvbmZpZy5fZC5zZXRVVENNaW51dGVzKGNvbmZpZy5fZC5nZXRVVENNaW51dGVzKCkgLSBjb25maWcuX3R6bSk7XG5cbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLnJmYzI4MjIgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uZmlnLl9pc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBkYXRlIGZyb20gaXNvIGZvcm1hdCBvciBmYWxsYmFja1xuICAgIGZ1bmN0aW9uIGNvbmZpZ0Zyb21TdHJpbmcoY29uZmlnKSB7XG4gICAgICAgIHZhciBtYXRjaGVkID0gYXNwTmV0SnNvblJlZ2V4LmV4ZWMoY29uZmlnLl9pKTtcblxuICAgICAgICBpZiAobWF0Y2hlZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUoK21hdGNoZWRbMV0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uZmlnRnJvbUlTTyhjb25maWcpO1xuICAgICAgICBpZiAoY29uZmlnLl9pc1ZhbGlkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgZGVsZXRlIGNvbmZpZy5faXNWYWxpZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbmZpZ0Zyb21SRkMyODIyKGNvbmZpZyk7XG4gICAgICAgIGlmIChjb25maWcuX2lzVmFsaWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBkZWxldGUgY29uZmlnLl9pc1ZhbGlkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRmluYWwgYXR0ZW1wdCwgdXNlIElucHV0IEZhbGxiYWNrXG4gICAgICAgIGhvb2tzLmNyZWF0ZUZyb21JbnB1dEZhbGxiYWNrKGNvbmZpZyk7XG4gICAgfVxuXG4gICAgaG9va3MuY3JlYXRlRnJvbUlucHV0RmFsbGJhY2sgPSBkZXByZWNhdGUoXG4gICAgICAgICd2YWx1ZSBwcm92aWRlZCBpcyBub3QgaW4gYSByZWNvZ25pemVkIFJGQzI4MjIgb3IgSVNPIGZvcm1hdC4gbW9tZW50IGNvbnN0cnVjdGlvbiBmYWxscyBiYWNrIHRvIGpzIERhdGUoKSwgJyArXG4gICAgICAgICd3aGljaCBpcyBub3QgcmVsaWFibGUgYWNyb3NzIGFsbCBicm93c2VycyBhbmQgdmVyc2lvbnMuIE5vbiBSRkMyODIyL0lTTyBkYXRlIGZvcm1hdHMgYXJlICcgK1xuICAgICAgICAnZGlzY291cmFnZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiBhbiB1cGNvbWluZyBtYWpvciByZWxlYXNlLiBQbGVhc2UgcmVmZXIgdG8gJyArXG4gICAgICAgICdodHRwOi8vbW9tZW50anMuY29tL2d1aWRlcy8jL3dhcm5pbmdzL2pzLWRhdGUvIGZvciBtb3JlIGluZm8uJyxcbiAgICAgICAgZnVuY3Rpb24gKGNvbmZpZykge1xuICAgICAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUoY29uZmlnLl9pICsgKGNvbmZpZy5fdXNlVVRDID8gJyBVVEMnIDogJycpKTtcbiAgICAgICAgfVxuICAgICk7XG5cbiAgICAvLyBjb25zdGFudCB0aGF0IHJlZmVycyB0byB0aGUgSVNPIHN0YW5kYXJkXG4gICAgaG9va3MuSVNPXzg2MDEgPSBmdW5jdGlvbiAoKSB7fTtcblxuICAgIC8vIGNvbnN0YW50IHRoYXQgcmVmZXJzIHRvIHRoZSBSRkMgMjgyMiBmb3JtXG4gICAgaG9va3MuUkZDXzI4MjIgPSBmdW5jdGlvbiAoKSB7fTtcblxuICAgIC8vIGRhdGUgZnJvbSBzdHJpbmcgYW5kIGZvcm1hdCBzdHJpbmdcbiAgICBmdW5jdGlvbiBjb25maWdGcm9tU3RyaW5nQW5kRm9ybWF0KGNvbmZpZykge1xuICAgICAgICAvLyBUT0RPOiBNb3ZlIHRoaXMgdG8gYW5vdGhlciBwYXJ0IG9mIHRoZSBjcmVhdGlvbiBmbG93IHRvIHByZXZlbnQgY2lyY3VsYXIgZGVwc1xuICAgICAgICBpZiAoY29uZmlnLl9mID09PSBob29rcy5JU09fODYwMSkge1xuICAgICAgICAgICAgY29uZmlnRnJvbUlTTyhjb25maWcpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb25maWcuX2YgPT09IGhvb2tzLlJGQ18yODIyKSB7XG4gICAgICAgICAgICBjb25maWdGcm9tUkZDMjgyMihjb25maWcpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbmZpZy5fYSA9IFtdO1xuICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5lbXB0eSA9IHRydWU7XG5cbiAgICAgICAgLy8gVGhpcyBhcnJheSBpcyB1c2VkIHRvIG1ha2UgYSBEYXRlLCBlaXRoZXIgd2l0aCBgbmV3IERhdGVgIG9yIGBEYXRlLlVUQ2BcbiAgICAgICAgdmFyIHN0cmluZyA9ICcnICsgY29uZmlnLl9pLFxuICAgICAgICAgICAgaSwgcGFyc2VkSW5wdXQsIHRva2VucywgdG9rZW4sIHNraXBwZWQsXG4gICAgICAgICAgICBzdHJpbmdMZW5ndGggPSBzdHJpbmcubGVuZ3RoLFxuICAgICAgICAgICAgdG90YWxQYXJzZWRJbnB1dExlbmd0aCA9IDA7XG5cbiAgICAgICAgdG9rZW5zID0gZXhwYW5kRm9ybWF0KGNvbmZpZy5fZiwgY29uZmlnLl9sb2NhbGUpLm1hdGNoKGZvcm1hdHRpbmdUb2tlbnMpIHx8IFtdO1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRva2VuID0gdG9rZW5zW2ldO1xuICAgICAgICAgICAgcGFyc2VkSW5wdXQgPSAoc3RyaW5nLm1hdGNoKGdldFBhcnNlUmVnZXhGb3JUb2tlbih0b2tlbiwgY29uZmlnKSkgfHwgW10pWzBdO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3Rva2VuJywgdG9rZW4sICdwYXJzZWRJbnB1dCcsIHBhcnNlZElucHV0LFxuICAgICAgICAgICAgLy8gICAgICAgICAncmVnZXgnLCBnZXRQYXJzZVJlZ2V4Rm9yVG9rZW4odG9rZW4sIGNvbmZpZykpO1xuICAgICAgICAgICAgaWYgKHBhcnNlZElucHV0KSB7XG4gICAgICAgICAgICAgICAgc2tpcHBlZCA9IHN0cmluZy5zdWJzdHIoMCwgc3RyaW5nLmluZGV4T2YocGFyc2VkSW5wdXQpKTtcbiAgICAgICAgICAgICAgICBpZiAoc2tpcHBlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLnVudXNlZElucHV0LnB1c2goc2tpcHBlZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN0cmluZyA9IHN0cmluZy5zbGljZShzdHJpbmcuaW5kZXhPZihwYXJzZWRJbnB1dCkgKyBwYXJzZWRJbnB1dC5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIHRvdGFsUGFyc2VkSW5wdXRMZW5ndGggKz0gcGFyc2VkSW5wdXQubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gZG9uJ3QgcGFyc2UgaWYgaXQncyBub3QgYSBrbm93biB0b2tlblxuICAgICAgICAgICAgaWYgKGZvcm1hdFRva2VuRnVuY3Rpb25zW3Rva2VuXSkge1xuICAgICAgICAgICAgICAgIGlmIChwYXJzZWRJbnB1dCkge1xuICAgICAgICAgICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5lbXB0eSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykudW51c2VkVG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhZGRUaW1lVG9BcnJheUZyb21Ub2tlbih0b2tlbiwgcGFyc2VkSW5wdXQsIGNvbmZpZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjb25maWcuX3N0cmljdCAmJiAhcGFyc2VkSW5wdXQpIHtcbiAgICAgICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS51bnVzZWRUb2tlbnMucHVzaCh0b2tlbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhZGQgcmVtYWluaW5nIHVucGFyc2VkIGlucHV0IGxlbmd0aCB0byB0aGUgc3RyaW5nXG4gICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmNoYXJzTGVmdE92ZXIgPSBzdHJpbmdMZW5ndGggLSB0b3RhbFBhcnNlZElucHV0TGVuZ3RoO1xuICAgICAgICBpZiAoc3RyaW5nLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLnVudXNlZElucHV0LnB1c2goc3RyaW5nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNsZWFyIF8xMmggZmxhZyBpZiBob3VyIGlzIDw9IDEyXG4gICAgICAgIGlmIChjb25maWcuX2FbSE9VUl0gPD0gMTIgJiZcbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmJpZ0hvdXIgPT09IHRydWUgJiZcbiAgICAgICAgICAgIGNvbmZpZy5fYVtIT1VSXSA+IDApIHtcbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmJpZ0hvdXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5wYXJzZWREYXRlUGFydHMgPSBjb25maWcuX2Euc2xpY2UoMCk7XG4gICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLm1lcmlkaWVtID0gY29uZmlnLl9tZXJpZGllbTtcbiAgICAgICAgLy8gaGFuZGxlIG1lcmlkaWVtXG4gICAgICAgIGNvbmZpZy5fYVtIT1VSXSA9IG1lcmlkaWVtRml4V3JhcChjb25maWcuX2xvY2FsZSwgY29uZmlnLl9hW0hPVVJdLCBjb25maWcuX21lcmlkaWVtKTtcblxuICAgICAgICBjb25maWdGcm9tQXJyYXkoY29uZmlnKTtcbiAgICAgICAgY2hlY2tPdmVyZmxvdyhjb25maWcpO1xuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gbWVyaWRpZW1GaXhXcmFwIChsb2NhbGUsIGhvdXIsIG1lcmlkaWVtKSB7XG4gICAgICAgIHZhciBpc1BtO1xuXG4gICAgICAgIGlmIChtZXJpZGllbSA9PSBudWxsKSB7XG4gICAgICAgICAgICAvLyBub3RoaW5nIHRvIGRvXG4gICAgICAgICAgICByZXR1cm4gaG91cjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobG9jYWxlLm1lcmlkaWVtSG91ciAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbG9jYWxlLm1lcmlkaWVtSG91cihob3VyLCBtZXJpZGllbSk7XG4gICAgICAgIH0gZWxzZSBpZiAobG9jYWxlLmlzUE0gIT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gRmFsbGJhY2tcbiAgICAgICAgICAgIGlzUG0gPSBsb2NhbGUuaXNQTShtZXJpZGllbSk7XG4gICAgICAgICAgICBpZiAoaXNQbSAmJiBob3VyIDwgMTIpIHtcbiAgICAgICAgICAgICAgICBob3VyICs9IDEyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFpc1BtICYmIGhvdXIgPT09IDEyKSB7XG4gICAgICAgICAgICAgICAgaG91ciA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaG91cjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHRoaXMgaXMgbm90IHN1cHBvc2VkIHRvIGhhcHBlblxuICAgICAgICAgICAgcmV0dXJuIGhvdXI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBkYXRlIGZyb20gc3RyaW5nIGFuZCBhcnJheSBvZiBmb3JtYXQgc3RyaW5nc1xuICAgIGZ1bmN0aW9uIGNvbmZpZ0Zyb21TdHJpbmdBbmRBcnJheShjb25maWcpIHtcbiAgICAgICAgdmFyIHRlbXBDb25maWcsXG4gICAgICAgICAgICBiZXN0TW9tZW50LFxuXG4gICAgICAgICAgICBzY29yZVRvQmVhdCxcbiAgICAgICAgICAgIGksXG4gICAgICAgICAgICBjdXJyZW50U2NvcmU7XG5cbiAgICAgICAgaWYgKGNvbmZpZy5fZi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmludmFsaWRGb3JtYXQgPSB0cnVlO1xuICAgICAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUoTmFOKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjb25maWcuX2YubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGN1cnJlbnRTY29yZSA9IDA7XG4gICAgICAgICAgICB0ZW1wQ29uZmlnID0gY29weUNvbmZpZyh7fSwgY29uZmlnKTtcbiAgICAgICAgICAgIGlmIChjb25maWcuX3VzZVVUQyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGVtcENvbmZpZy5fdXNlVVRDID0gY29uZmlnLl91c2VVVEM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0ZW1wQ29uZmlnLl9mID0gY29uZmlnLl9mW2ldO1xuICAgICAgICAgICAgY29uZmlnRnJvbVN0cmluZ0FuZEZvcm1hdCh0ZW1wQ29uZmlnKTtcblxuICAgICAgICAgICAgaWYgKCFpc1ZhbGlkKHRlbXBDb25maWcpKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIGFueSBpbnB1dCB0aGF0IHdhcyBub3QgcGFyc2VkIGFkZCBhIHBlbmFsdHkgZm9yIHRoYXQgZm9ybWF0XG4gICAgICAgICAgICBjdXJyZW50U2NvcmUgKz0gZ2V0UGFyc2luZ0ZsYWdzKHRlbXBDb25maWcpLmNoYXJzTGVmdE92ZXI7XG5cbiAgICAgICAgICAgIC8vb3IgdG9rZW5zXG4gICAgICAgICAgICBjdXJyZW50U2NvcmUgKz0gZ2V0UGFyc2luZ0ZsYWdzKHRlbXBDb25maWcpLnVudXNlZFRva2Vucy5sZW5ndGggKiAxMDtcblxuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKHRlbXBDb25maWcpLnNjb3JlID0gY3VycmVudFNjb3JlO1xuXG4gICAgICAgICAgICBpZiAoc2NvcmVUb0JlYXQgPT0gbnVsbCB8fCBjdXJyZW50U2NvcmUgPCBzY29yZVRvQmVhdCkge1xuICAgICAgICAgICAgICAgIHNjb3JlVG9CZWF0ID0gY3VycmVudFNjb3JlO1xuICAgICAgICAgICAgICAgIGJlc3RNb21lbnQgPSB0ZW1wQ29uZmlnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZXh0ZW5kKGNvbmZpZywgYmVzdE1vbWVudCB8fCB0ZW1wQ29uZmlnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb25maWdGcm9tT2JqZWN0KGNvbmZpZykge1xuICAgICAgICBpZiAoY29uZmlnLl9kKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaSA9IG5vcm1hbGl6ZU9iamVjdFVuaXRzKGNvbmZpZy5faSk7XG4gICAgICAgIGNvbmZpZy5fYSA9IG1hcChbaS55ZWFyLCBpLm1vbnRoLCBpLmRheSB8fCBpLmRhdGUsIGkuaG91ciwgaS5taW51dGUsIGkuc2Vjb25kLCBpLm1pbGxpc2Vjb25kXSwgZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgcmV0dXJuIG9iaiAmJiBwYXJzZUludChvYmosIDEwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uZmlnRnJvbUFycmF5KGNvbmZpZyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlRnJvbUNvbmZpZyAoY29uZmlnKSB7XG4gICAgICAgIHZhciByZXMgPSBuZXcgTW9tZW50KGNoZWNrT3ZlcmZsb3cocHJlcGFyZUNvbmZpZyhjb25maWcpKSk7XG4gICAgICAgIGlmIChyZXMuX25leHREYXkpIHtcbiAgICAgICAgICAgIC8vIEFkZGluZyBpcyBzbWFydCBlbm91Z2ggYXJvdW5kIERTVFxuICAgICAgICAgICAgcmVzLmFkZCgxLCAnZCcpO1xuICAgICAgICAgICAgcmVzLl9uZXh0RGF5ID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwcmVwYXJlQ29uZmlnIChjb25maWcpIHtcbiAgICAgICAgdmFyIGlucHV0ID0gY29uZmlnLl9pLFxuICAgICAgICAgICAgZm9ybWF0ID0gY29uZmlnLl9mO1xuXG4gICAgICAgIGNvbmZpZy5fbG9jYWxlID0gY29uZmlnLl9sb2NhbGUgfHwgZ2V0TG9jYWxlKGNvbmZpZy5fbCk7XG5cbiAgICAgICAgaWYgKGlucHV0ID09PSBudWxsIHx8IChmb3JtYXQgPT09IHVuZGVmaW5lZCAmJiBpbnB1dCA9PT0gJycpKSB7XG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlSW52YWxpZCh7bnVsbElucHV0OiB0cnVlfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgY29uZmlnLl9pID0gaW5wdXQgPSBjb25maWcuX2xvY2FsZS5wcmVwYXJzZShpbnB1dCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNNb21lbnQoaW5wdXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IE1vbWVudChjaGVja092ZXJmbG93KGlucHV0KSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNEYXRlKGlucHV0KSkge1xuICAgICAgICAgICAgY29uZmlnLl9kID0gaW5wdXQ7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheShmb3JtYXQpKSB7XG4gICAgICAgICAgICBjb25maWdGcm9tU3RyaW5nQW5kQXJyYXkoY29uZmlnKTtcbiAgICAgICAgfSBlbHNlIGlmIChmb3JtYXQpIHtcbiAgICAgICAgICAgIGNvbmZpZ0Zyb21TdHJpbmdBbmRGb3JtYXQoY29uZmlnKTtcbiAgICAgICAgfSAgZWxzZSB7XG4gICAgICAgICAgICBjb25maWdGcm9tSW5wdXQoY29uZmlnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaXNWYWxpZChjb25maWcpKSB7XG4gICAgICAgICAgICBjb25maWcuX2QgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb25maWdGcm9tSW5wdXQoY29uZmlnKSB7XG4gICAgICAgIHZhciBpbnB1dCA9IGNvbmZpZy5faTtcbiAgICAgICAgaWYgKGlzVW5kZWZpbmVkKGlucHV0KSkge1xuICAgICAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUoaG9va3Mubm93KCkpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzRGF0ZShpbnB1dCkpIHtcbiAgICAgICAgICAgIGNvbmZpZy5fZCA9IG5ldyBEYXRlKGlucHV0LnZhbHVlT2YoKSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgY29uZmlnRnJvbVN0cmluZyhjb25maWcpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzQXJyYXkoaW5wdXQpKSB7XG4gICAgICAgICAgICBjb25maWcuX2EgPSBtYXAoaW5wdXQuc2xpY2UoMCksIGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQob2JqLCAxMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbmZpZ0Zyb21BcnJheShjb25maWcpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KGlucHV0KSkge1xuICAgICAgICAgICAgY29uZmlnRnJvbU9iamVjdChjb25maWcpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzTnVtYmVyKGlucHV0KSkge1xuICAgICAgICAgICAgLy8gZnJvbSBtaWxsaXNlY29uZHNcbiAgICAgICAgICAgIGNvbmZpZy5fZCA9IG5ldyBEYXRlKGlucHV0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGhvb2tzLmNyZWF0ZUZyb21JbnB1dEZhbGxiYWNrKGNvbmZpZyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVMb2NhbE9yVVRDIChpbnB1dCwgZm9ybWF0LCBsb2NhbGUsIHN0cmljdCwgaXNVVEMpIHtcbiAgICAgICAgdmFyIGMgPSB7fTtcblxuICAgICAgICBpZiAobG9jYWxlID09PSB0cnVlIHx8IGxvY2FsZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHN0cmljdCA9IGxvY2FsZTtcbiAgICAgICAgICAgIGxvY2FsZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgoaXNPYmplY3QoaW5wdXQpICYmIGlzT2JqZWN0RW1wdHkoaW5wdXQpKSB8fFxuICAgICAgICAgICAgICAgIChpc0FycmF5KGlucHV0KSAmJiBpbnB1dC5sZW5ndGggPT09IDApKSB7XG4gICAgICAgICAgICBpbnB1dCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICAvLyBvYmplY3QgY29uc3RydWN0aW9uIG11c3QgYmUgZG9uZSB0aGlzIHdheS5cbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21vbWVudC9tb21lbnQvaXNzdWVzLzE0MjNcbiAgICAgICAgYy5faXNBTW9tZW50T2JqZWN0ID0gdHJ1ZTtcbiAgICAgICAgYy5fdXNlVVRDID0gYy5faXNVVEMgPSBpc1VUQztcbiAgICAgICAgYy5fbCA9IGxvY2FsZTtcbiAgICAgICAgYy5faSA9IGlucHV0O1xuICAgICAgICBjLl9mID0gZm9ybWF0O1xuICAgICAgICBjLl9zdHJpY3QgPSBzdHJpY3Q7XG5cbiAgICAgICAgcmV0dXJuIGNyZWF0ZUZyb21Db25maWcoYyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlTG9jYWwgKGlucHV0LCBmb3JtYXQsIGxvY2FsZSwgc3RyaWN0KSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVMb2NhbE9yVVRDKGlucHV0LCBmb3JtYXQsIGxvY2FsZSwgc3RyaWN0LCBmYWxzZSk7XG4gICAgfVxuXG4gICAgdmFyIHByb3RvdHlwZU1pbiA9IGRlcHJlY2F0ZShcbiAgICAgICAgJ21vbWVudCgpLm1pbiBpcyBkZXByZWNhdGVkLCB1c2UgbW9tZW50Lm1heCBpbnN0ZWFkLiBodHRwOi8vbW9tZW50anMuY29tL2d1aWRlcy8jL3dhcm5pbmdzL21pbi1tYXgvJyxcbiAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG90aGVyID0gY3JlYXRlTG9jYWwuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzVmFsaWQoKSAmJiBvdGhlci5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb3RoZXIgPCB0aGlzID8gdGhpcyA6IG90aGVyO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY3JlYXRlSW52YWxpZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgKTtcblxuICAgIHZhciBwcm90b3R5cGVNYXggPSBkZXByZWNhdGUoXG4gICAgICAgICdtb21lbnQoKS5tYXggaXMgZGVwcmVjYXRlZCwgdXNlIG1vbWVudC5taW4gaW5zdGVhZC4gaHR0cDovL21vbWVudGpzLmNvbS9ndWlkZXMvIy93YXJuaW5ncy9taW4tbWF4LycsXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBvdGhlciA9IGNyZWF0ZUxvY2FsLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1ZhbGlkKCkgJiYgb3RoZXIuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG90aGVyID4gdGhpcyA/IHRoaXMgOiBvdGhlcjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZUludmFsaWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICk7XG5cbiAgICAvLyBQaWNrIGEgbW9tZW50IG0gZnJvbSBtb21lbnRzIHNvIHRoYXQgbVtmbl0ob3RoZXIpIGlzIHRydWUgZm9yIGFsbFxuICAgIC8vIG90aGVyLiBUaGlzIHJlbGllcyBvbiB0aGUgZnVuY3Rpb24gZm4gdG8gYmUgdHJhbnNpdGl2ZS5cbiAgICAvL1xuICAgIC8vIG1vbWVudHMgc2hvdWxkIGVpdGhlciBiZSBhbiBhcnJheSBvZiBtb21lbnQgb2JqZWN0cyBvciBhbiBhcnJheSwgd2hvc2VcbiAgICAvLyBmaXJzdCBlbGVtZW50IGlzIGFuIGFycmF5IG9mIG1vbWVudCBvYmplY3RzLlxuICAgIGZ1bmN0aW9uIHBpY2tCeShmbiwgbW9tZW50cykge1xuICAgICAgICB2YXIgcmVzLCBpO1xuICAgICAgICBpZiAobW9tZW50cy5sZW5ndGggPT09IDEgJiYgaXNBcnJheShtb21lbnRzWzBdKSkge1xuICAgICAgICAgICAgbW9tZW50cyA9IG1vbWVudHNbMF07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFtb21lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZUxvY2FsKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzID0gbW9tZW50c1swXTtcbiAgICAgICAgZm9yIChpID0gMTsgaSA8IG1vbWVudHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGlmICghbW9tZW50c1tpXS5pc1ZhbGlkKCkgfHwgbW9tZW50c1tpXVtmbl0ocmVzKSkge1xuICAgICAgICAgICAgICAgIHJlcyA9IG1vbWVudHNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBVc2UgW10uc29ydCBpbnN0ZWFkP1xuICAgIGZ1bmN0aW9uIG1pbiAoKSB7XG4gICAgICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuXG4gICAgICAgIHJldHVybiBwaWNrQnkoJ2lzQmVmb3JlJywgYXJncyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWF4ICgpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG5cbiAgICAgICAgcmV0dXJuIHBpY2tCeSgnaXNBZnRlcicsIGFyZ3MpO1xuICAgIH1cblxuICAgIHZhciBub3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBEYXRlLm5vdyA/IERhdGUubm93KCkgOiArKG5ldyBEYXRlKCkpO1xuICAgIH07XG5cbiAgICB2YXIgb3JkZXJpbmcgPSBbJ3llYXInLCAncXVhcnRlcicsICdtb250aCcsICd3ZWVrJywgJ2RheScsICdob3VyJywgJ21pbnV0ZScsICdzZWNvbmQnLCAnbWlsbGlzZWNvbmQnXTtcblxuICAgIGZ1bmN0aW9uIGlzRHVyYXRpb25WYWxpZChtKSB7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBtKSB7XG4gICAgICAgICAgICBpZiAoIShpbmRleE9mLmNhbGwob3JkZXJpbmcsIGtleSkgIT09IC0xICYmIChtW2tleV0gPT0gbnVsbCB8fCAhaXNOYU4obVtrZXldKSkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHVuaXRIYXNEZWNpbWFsID0gZmFsc2U7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb3JkZXJpbmcubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGlmIChtW29yZGVyaW5nW2ldXSkge1xuICAgICAgICAgICAgICAgIGlmICh1bml0SGFzRGVjaW1hbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vIG9ubHkgYWxsb3cgbm9uLWludGVnZXJzIGZvciBzbWFsbGVzdCB1bml0XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwYXJzZUZsb2F0KG1bb3JkZXJpbmdbaV1dKSAhPT0gdG9JbnQobVtvcmRlcmluZ1tpXV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHVuaXRIYXNEZWNpbWFsID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc1ZhbGlkJDEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc1ZhbGlkO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUludmFsaWQkMSgpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUR1cmF0aW9uKE5hTik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gRHVyYXRpb24gKGR1cmF0aW9uKSB7XG4gICAgICAgIHZhciBub3JtYWxpemVkSW5wdXQgPSBub3JtYWxpemVPYmplY3RVbml0cyhkdXJhdGlvbiksXG4gICAgICAgICAgICB5ZWFycyA9IG5vcm1hbGl6ZWRJbnB1dC55ZWFyIHx8IDAsXG4gICAgICAgICAgICBxdWFydGVycyA9IG5vcm1hbGl6ZWRJbnB1dC5xdWFydGVyIHx8IDAsXG4gICAgICAgICAgICBtb250aHMgPSBub3JtYWxpemVkSW5wdXQubW9udGggfHwgMCxcbiAgICAgICAgICAgIHdlZWtzID0gbm9ybWFsaXplZElucHV0LndlZWsgfHwgbm9ybWFsaXplZElucHV0Lmlzb1dlZWsgfHwgMCxcbiAgICAgICAgICAgIGRheXMgPSBub3JtYWxpemVkSW5wdXQuZGF5IHx8IDAsXG4gICAgICAgICAgICBob3VycyA9IG5vcm1hbGl6ZWRJbnB1dC5ob3VyIHx8IDAsXG4gICAgICAgICAgICBtaW51dGVzID0gbm9ybWFsaXplZElucHV0Lm1pbnV0ZSB8fCAwLFxuICAgICAgICAgICAgc2Vjb25kcyA9IG5vcm1hbGl6ZWRJbnB1dC5zZWNvbmQgfHwgMCxcbiAgICAgICAgICAgIG1pbGxpc2Vjb25kcyA9IG5vcm1hbGl6ZWRJbnB1dC5taWxsaXNlY29uZCB8fCAwO1xuXG4gICAgICAgIHRoaXMuX2lzVmFsaWQgPSBpc0R1cmF0aW9uVmFsaWQobm9ybWFsaXplZElucHV0KTtcblxuICAgICAgICAvLyByZXByZXNlbnRhdGlvbiBmb3IgZGF0ZUFkZFJlbW92ZVxuICAgICAgICB0aGlzLl9taWxsaXNlY29uZHMgPSArbWlsbGlzZWNvbmRzICtcbiAgICAgICAgICAgIHNlY29uZHMgKiAxZTMgKyAvLyAxMDAwXG4gICAgICAgICAgICBtaW51dGVzICogNmU0ICsgLy8gMTAwMCAqIDYwXG4gICAgICAgICAgICBob3VycyAqIDEwMDAgKiA2MCAqIDYwOyAvL3VzaW5nIDEwMDAgKiA2MCAqIDYwIGluc3RlYWQgb2YgMzZlNSB0byBhdm9pZCBmbG9hdGluZyBwb2ludCByb3VuZGluZyBlcnJvcnMgaHR0cHM6Ly9naXRodWIuY29tL21vbWVudC9tb21lbnQvaXNzdWVzLzI5NzhcbiAgICAgICAgLy8gQmVjYXVzZSBvZiBkYXRlQWRkUmVtb3ZlIHRyZWF0cyAyNCBob3VycyBhcyBkaWZmZXJlbnQgZnJvbSBhXG4gICAgICAgIC8vIGRheSB3aGVuIHdvcmtpbmcgYXJvdW5kIERTVCwgd2UgbmVlZCB0byBzdG9yZSB0aGVtIHNlcGFyYXRlbHlcbiAgICAgICAgdGhpcy5fZGF5cyA9ICtkYXlzICtcbiAgICAgICAgICAgIHdlZWtzICogNztcbiAgICAgICAgLy8gSXQgaXMgaW1wb3NzaWJsZSB0byB0cmFuc2xhdGUgbW9udGhzIGludG8gZGF5cyB3aXRob3V0IGtub3dpbmdcbiAgICAgICAgLy8gd2hpY2ggbW9udGhzIHlvdSBhcmUgYXJlIHRhbGtpbmcgYWJvdXQsIHNvIHdlIGhhdmUgdG8gc3RvcmVcbiAgICAgICAgLy8gaXQgc2VwYXJhdGVseS5cbiAgICAgICAgdGhpcy5fbW9udGhzID0gK21vbnRocyArXG4gICAgICAgICAgICBxdWFydGVycyAqIDMgK1xuICAgICAgICAgICAgeWVhcnMgKiAxMjtcblxuICAgICAgICB0aGlzLl9kYXRhID0ge307XG5cbiAgICAgICAgdGhpcy5fbG9jYWxlID0gZ2V0TG9jYWxlKCk7XG5cbiAgICAgICAgdGhpcy5fYnViYmxlKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNEdXJhdGlvbiAob2JqKSB7XG4gICAgICAgIHJldHVybiBvYmogaW5zdGFuY2VvZiBEdXJhdGlvbjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhYnNSb3VuZCAobnVtYmVyKSB7XG4gICAgICAgIGlmIChudW1iZXIgPCAwKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCgtMSAqIG51bWJlcikgKiAtMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKG51bWJlcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBGT1JNQVRUSU5HXG5cbiAgICBmdW5jdGlvbiBvZmZzZXQgKHRva2VuLCBzZXBhcmF0b3IpIHtcbiAgICAgICAgYWRkRm9ybWF0VG9rZW4odG9rZW4sIDAsIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBvZmZzZXQgPSB0aGlzLnV0Y09mZnNldCgpO1xuICAgICAgICAgICAgdmFyIHNpZ24gPSAnKyc7XG4gICAgICAgICAgICBpZiAob2Zmc2V0IDwgMCkge1xuICAgICAgICAgICAgICAgIG9mZnNldCA9IC1vZmZzZXQ7XG4gICAgICAgICAgICAgICAgc2lnbiA9ICctJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzaWduICsgemVyb0ZpbGwofn4ob2Zmc2V0IC8gNjApLCAyKSArIHNlcGFyYXRvciArIHplcm9GaWxsKH5+KG9mZnNldCkgJSA2MCwgMik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9mZnNldCgnWicsICc6Jyk7XG4gICAgb2Zmc2V0KCdaWicsICcnKTtcblxuICAgIC8vIFBBUlNJTkdcblxuICAgIGFkZFJlZ2V4VG9rZW4oJ1onLCAgbWF0Y2hTaG9ydE9mZnNldCk7XG4gICAgYWRkUmVnZXhUb2tlbignWlonLCBtYXRjaFNob3J0T2Zmc2V0KTtcbiAgICBhZGRQYXJzZVRva2VuKFsnWicsICdaWiddLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcbiAgICAgICAgY29uZmlnLl91c2VVVEMgPSB0cnVlO1xuICAgICAgICBjb25maWcuX3R6bSA9IG9mZnNldEZyb21TdHJpbmcobWF0Y2hTaG9ydE9mZnNldCwgaW5wdXQpO1xuICAgIH0pO1xuXG4gICAgLy8gSEVMUEVSU1xuXG4gICAgLy8gdGltZXpvbmUgY2h1bmtlclxuICAgIC8vICcrMTA6MDAnID4gWycxMCcsICAnMDAnXVxuICAgIC8vICctMTUzMCcgID4gWyctMTUnLCAnMzAnXVxuICAgIHZhciBjaHVua09mZnNldCA9IC8oW1xcK1xcLV18XFxkXFxkKS9naTtcblxuICAgIGZ1bmN0aW9uIG9mZnNldEZyb21TdHJpbmcobWF0Y2hlciwgc3RyaW5nKSB7XG4gICAgICAgIHZhciBtYXRjaGVzID0gKHN0cmluZyB8fCAnJykubWF0Y2gobWF0Y2hlcik7XG5cbiAgICAgICAgaWYgKG1hdGNoZXMgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGNodW5rICAgPSBtYXRjaGVzW21hdGNoZXMubGVuZ3RoIC0gMV0gfHwgW107XG4gICAgICAgIHZhciBwYXJ0cyAgID0gKGNodW5rICsgJycpLm1hdGNoKGNodW5rT2Zmc2V0KSB8fCBbJy0nLCAwLCAwXTtcbiAgICAgICAgdmFyIG1pbnV0ZXMgPSArKHBhcnRzWzFdICogNjApICsgdG9JbnQocGFydHNbMl0pO1xuXG4gICAgICAgIHJldHVybiBtaW51dGVzID09PSAwID9cbiAgICAgICAgICAwIDpcbiAgICAgICAgICBwYXJ0c1swXSA9PT0gJysnID8gbWludXRlcyA6IC1taW51dGVzO1xuICAgIH1cblxuICAgIC8vIFJldHVybiBhIG1vbWVudCBmcm9tIGlucHV0LCB0aGF0IGlzIGxvY2FsL3V0Yy96b25lIGVxdWl2YWxlbnQgdG8gbW9kZWwuXG4gICAgZnVuY3Rpb24gY2xvbmVXaXRoT2Zmc2V0KGlucHV0LCBtb2RlbCkge1xuICAgICAgICB2YXIgcmVzLCBkaWZmO1xuICAgICAgICBpZiAobW9kZWwuX2lzVVRDKSB7XG4gICAgICAgICAgICByZXMgPSBtb2RlbC5jbG9uZSgpO1xuICAgICAgICAgICAgZGlmZiA9IChpc01vbWVudChpbnB1dCkgfHwgaXNEYXRlKGlucHV0KSA/IGlucHV0LnZhbHVlT2YoKSA6IGNyZWF0ZUxvY2FsKGlucHV0KS52YWx1ZU9mKCkpIC0gcmVzLnZhbHVlT2YoKTtcbiAgICAgICAgICAgIC8vIFVzZSBsb3ctbGV2ZWwgYXBpLCBiZWNhdXNlIHRoaXMgZm4gaXMgbG93LWxldmVsIGFwaS5cbiAgICAgICAgICAgIHJlcy5fZC5zZXRUaW1lKHJlcy5fZC52YWx1ZU9mKCkgKyBkaWZmKTtcbiAgICAgICAgICAgIGhvb2tzLnVwZGF0ZU9mZnNldChyZXMsIGZhbHNlKTtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlTG9jYWwoaW5wdXQpLmxvY2FsKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXREYXRlT2Zmc2V0IChtKSB7XG4gICAgICAgIC8vIE9uIEZpcmVmb3guMjQgRGF0ZSNnZXRUaW1lem9uZU9mZnNldCByZXR1cm5zIGEgZmxvYXRpbmcgcG9pbnQuXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tb21lbnQvbW9tZW50L3B1bGwvMTg3MVxuICAgICAgICByZXR1cm4gLU1hdGgucm91bmQobS5fZC5nZXRUaW1lem9uZU9mZnNldCgpIC8gMTUpICogMTU7XG4gICAgfVxuXG4gICAgLy8gSE9PS1NcblxuICAgIC8vIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgd2hlbmV2ZXIgYSBtb21lbnQgaXMgbXV0YXRlZC5cbiAgICAvLyBJdCBpcyBpbnRlbmRlZCB0byBrZWVwIHRoZSBvZmZzZXQgaW4gc3luYyB3aXRoIHRoZSB0aW1lem9uZS5cbiAgICBob29rcy51cGRhdGVPZmZzZXQgPSBmdW5jdGlvbiAoKSB7fTtcblxuICAgIC8vIE1PTUVOVFNcblxuICAgIC8vIGtlZXBMb2NhbFRpbWUgPSB0cnVlIG1lYW5zIG9ubHkgY2hhbmdlIHRoZSB0aW1lem9uZSwgd2l0aG91dFxuICAgIC8vIGFmZmVjdGluZyB0aGUgbG9jYWwgaG91ci4gU28gNTozMToyNiArMDMwMCAtLVt1dGNPZmZzZXQoMiwgdHJ1ZSldLS0+XG4gICAgLy8gNTozMToyNiArMDIwMCBJdCBpcyBwb3NzaWJsZSB0aGF0IDU6MzE6MjYgZG9lc24ndCBleGlzdCB3aXRoIG9mZnNldFxuICAgIC8vICswMjAwLCBzbyB3ZSBhZGp1c3QgdGhlIHRpbWUgYXMgbmVlZGVkLCB0byBiZSB2YWxpZC5cbiAgICAvL1xuICAgIC8vIEtlZXBpbmcgdGhlIHRpbWUgYWN0dWFsbHkgYWRkcy9zdWJ0cmFjdHMgKG9uZSBob3VyKVxuICAgIC8vIGZyb20gdGhlIGFjdHVhbCByZXByZXNlbnRlZCB0aW1lLiBUaGF0IGlzIHdoeSB3ZSBjYWxsIHVwZGF0ZU9mZnNldFxuICAgIC8vIGEgc2Vjb25kIHRpbWUuIEluIGNhc2UgaXQgd2FudHMgdXMgdG8gY2hhbmdlIHRoZSBvZmZzZXQgYWdhaW5cbiAgICAvLyBfY2hhbmdlSW5Qcm9ncmVzcyA9PSB0cnVlIGNhc2UsIHRoZW4gd2UgaGF2ZSB0byBhZGp1c3QsIGJlY2F1c2VcbiAgICAvLyB0aGVyZSBpcyBubyBzdWNoIHRpbWUgaW4gdGhlIGdpdmVuIHRpbWV6b25lLlxuICAgIGZ1bmN0aW9uIGdldFNldE9mZnNldCAoaW5wdXQsIGtlZXBMb2NhbFRpbWUsIGtlZXBNaW51dGVzKSB7XG4gICAgICAgIHZhciBvZmZzZXQgPSB0aGlzLl9vZmZzZXQgfHwgMCxcbiAgICAgICAgICAgIGxvY2FsQWRqdXN0O1xuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5wdXQgIT0gbnVsbCA/IHRoaXMgOiBOYU47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlucHV0ICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgaW5wdXQgPSBvZmZzZXRGcm9tU3RyaW5nKG1hdGNoU2hvcnRPZmZzZXQsIGlucHV0KTtcbiAgICAgICAgICAgICAgICBpZiAoaW5wdXQgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChNYXRoLmFicyhpbnB1dCkgPCAxNiAmJiAha2VlcE1pbnV0ZXMpIHtcbiAgICAgICAgICAgICAgICBpbnB1dCA9IGlucHV0ICogNjA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2lzVVRDICYmIGtlZXBMb2NhbFRpbWUpIHtcbiAgICAgICAgICAgICAgICBsb2NhbEFkanVzdCA9IGdldERhdGVPZmZzZXQodGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9vZmZzZXQgPSBpbnB1dDtcbiAgICAgICAgICAgIHRoaXMuX2lzVVRDID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChsb2NhbEFkanVzdCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGQobG9jYWxBZGp1c3QsICdtJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob2Zmc2V0ICE9PSBpbnB1dCkge1xuICAgICAgICAgICAgICAgIGlmICgha2VlcExvY2FsVGltZSB8fCB0aGlzLl9jaGFuZ2VJblByb2dyZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZFN1YnRyYWN0KHRoaXMsIGNyZWF0ZUR1cmF0aW9uKGlucHV0IC0gb2Zmc2V0LCAnbScpLCAxLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy5fY2hhbmdlSW5Qcm9ncmVzcykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VJblByb2dyZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgaG9va3MudXBkYXRlT2Zmc2V0KHRoaXMsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VJblByb2dyZXNzID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pc1VUQyA/IG9mZnNldCA6IGdldERhdGVPZmZzZXQodGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRTZXRab25lIChpbnB1dCwga2VlcExvY2FsVGltZSkge1xuICAgICAgICBpZiAoaW5wdXQgIT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBpbnB1dCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBpbnB1dCA9IC1pbnB1dDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy51dGNPZmZzZXQoaW5wdXQsIGtlZXBMb2NhbFRpbWUpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAtdGhpcy51dGNPZmZzZXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldE9mZnNldFRvVVRDIChrZWVwTG9jYWxUaW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnV0Y09mZnNldCgwLCBrZWVwTG9jYWxUaW1lKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRPZmZzZXRUb0xvY2FsIChrZWVwTG9jYWxUaW1lKSB7XG4gICAgICAgIGlmICh0aGlzLl9pc1VUQykge1xuICAgICAgICAgICAgdGhpcy51dGNPZmZzZXQoMCwga2VlcExvY2FsVGltZSk7XG4gICAgICAgICAgICB0aGlzLl9pc1VUQyA9IGZhbHNlO1xuXG4gICAgICAgICAgICBpZiAoa2VlcExvY2FsVGltZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3VidHJhY3QoZ2V0RGF0ZU9mZnNldCh0aGlzKSwgJ20nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRPZmZzZXRUb1BhcnNlZE9mZnNldCAoKSB7XG4gICAgICAgIGlmICh0aGlzLl90em0gIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy51dGNPZmZzZXQodGhpcy5fdHptLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuX2kgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB2YXIgdFpvbmUgPSBvZmZzZXRGcm9tU3RyaW5nKG1hdGNoT2Zmc2V0LCB0aGlzLl9pKTtcbiAgICAgICAgICAgIGlmICh0Wm9uZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51dGNPZmZzZXQodFpvbmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy51dGNPZmZzZXQoMCwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFzQWxpZ25lZEhvdXJPZmZzZXQgKGlucHV0KSB7XG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpbnB1dCA9IGlucHV0ID8gY3JlYXRlTG9jYWwoaW5wdXQpLnV0Y09mZnNldCgpIDogMDtcblxuICAgICAgICByZXR1cm4gKHRoaXMudXRjT2Zmc2V0KCkgLSBpbnB1dCkgJSA2MCA9PT0gMDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0RheWxpZ2h0U2F2aW5nVGltZSAoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB0aGlzLnV0Y09mZnNldCgpID4gdGhpcy5jbG9uZSgpLm1vbnRoKDApLnV0Y09mZnNldCgpIHx8XG4gICAgICAgICAgICB0aGlzLnV0Y09mZnNldCgpID4gdGhpcy5jbG9uZSgpLm1vbnRoKDUpLnV0Y09mZnNldCgpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNEYXlsaWdodFNhdmluZ1RpbWVTaGlmdGVkICgpIHtcbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZCh0aGlzLl9pc0RTVFNoaWZ0ZWQpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faXNEU1RTaGlmdGVkO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGMgPSB7fTtcblxuICAgICAgICBjb3B5Q29uZmlnKGMsIHRoaXMpO1xuICAgICAgICBjID0gcHJlcGFyZUNvbmZpZyhjKTtcblxuICAgICAgICBpZiAoYy5fYSkge1xuICAgICAgICAgICAgdmFyIG90aGVyID0gYy5faXNVVEMgPyBjcmVhdGVVVEMoYy5fYSkgOiBjcmVhdGVMb2NhbChjLl9hKTtcbiAgICAgICAgICAgIHRoaXMuX2lzRFNUU2hpZnRlZCA9IHRoaXMuaXNWYWxpZCgpICYmXG4gICAgICAgICAgICAgICAgY29tcGFyZUFycmF5cyhjLl9hLCBvdGhlci50b0FycmF5KCkpID4gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2lzRFNUU2hpZnRlZCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzRFNUU2hpZnRlZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0xvY2FsICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNWYWxpZCgpID8gIXRoaXMuX2lzVVRDIDogZmFsc2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNVdGNPZmZzZXQgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1ZhbGlkKCkgPyB0aGlzLl9pc1VUQyA6IGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzVXRjICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNWYWxpZCgpID8gdGhpcy5faXNVVEMgJiYgdGhpcy5fb2Zmc2V0ID09PSAwIDogZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gQVNQLk5FVCBqc29uIGRhdGUgZm9ybWF0IHJlZ2V4XG4gICAgdmFyIGFzcE5ldFJlZ2V4ID0gL14oXFwtfFxcKyk/KD86KFxcZCopWy4gXSk/KFxcZCspXFw6KFxcZCspKD86XFw6KFxcZCspKFxcLlxcZCopPyk/JC87XG5cbiAgICAvLyBmcm9tIGh0dHA6Ly9kb2NzLmNsb3N1cmUtbGlicmFyeS5nb29nbGVjb2RlLmNvbS9naXQvY2xvc3VyZV9nb29nX2RhdGVfZGF0ZS5qcy5zb3VyY2UuaHRtbFxuICAgIC8vIHNvbWV3aGF0IG1vcmUgaW4gbGluZSB3aXRoIDQuNC4zLjIgMjAwNCBzcGVjLCBidXQgYWxsb3dzIGRlY2ltYWwgYW55d2hlcmVcbiAgICAvLyBhbmQgZnVydGhlciBtb2RpZmllZCB0byBhbGxvdyBmb3Igc3RyaW5ncyBjb250YWluaW5nIGJvdGggd2VlayBhbmQgZGF5XG4gICAgdmFyIGlzb1JlZ2V4ID0gL14oLXxcXCspP1AoPzooWy0rXT9bMC05LC5dKilZKT8oPzooWy0rXT9bMC05LC5dKilNKT8oPzooWy0rXT9bMC05LC5dKilXKT8oPzooWy0rXT9bMC05LC5dKilEKT8oPzpUKD86KFstK10/WzAtOSwuXSopSCk/KD86KFstK10/WzAtOSwuXSopTSk/KD86KFstK10/WzAtOSwuXSopUyk/KT8kLztcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUR1cmF0aW9uIChpbnB1dCwga2V5KSB7XG4gICAgICAgIHZhciBkdXJhdGlvbiA9IGlucHV0LFxuICAgICAgICAgICAgLy8gbWF0Y2hpbmcgYWdhaW5zdCByZWdleHAgaXMgZXhwZW5zaXZlLCBkbyBpdCBvbiBkZW1hbmRcbiAgICAgICAgICAgIG1hdGNoID0gbnVsbCxcbiAgICAgICAgICAgIHNpZ24sXG4gICAgICAgICAgICByZXQsXG4gICAgICAgICAgICBkaWZmUmVzO1xuXG4gICAgICAgIGlmIChpc0R1cmF0aW9uKGlucHV0KSkge1xuICAgICAgICAgICAgZHVyYXRpb24gPSB7XG4gICAgICAgICAgICAgICAgbXMgOiBpbnB1dC5fbWlsbGlzZWNvbmRzLFxuICAgICAgICAgICAgICAgIGQgIDogaW5wdXQuX2RheXMsXG4gICAgICAgICAgICAgICAgTSAgOiBpbnB1dC5fbW9udGhzXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKGlzTnVtYmVyKGlucHV0KSkge1xuICAgICAgICAgICAgZHVyYXRpb24gPSB7fTtcbiAgICAgICAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgICAgICAgICBkdXJhdGlvbltrZXldID0gaW5wdXQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGR1cmF0aW9uLm1pbGxpc2Vjb25kcyA9IGlucHV0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKCEhKG1hdGNoID0gYXNwTmV0UmVnZXguZXhlYyhpbnB1dCkpKSB7XG4gICAgICAgICAgICBzaWduID0gKG1hdGNoWzFdID09PSAnLScpID8gLTEgOiAxO1xuICAgICAgICAgICAgZHVyYXRpb24gPSB7XG4gICAgICAgICAgICAgICAgeSAgOiAwLFxuICAgICAgICAgICAgICAgIGQgIDogdG9JbnQobWF0Y2hbREFURV0pICAgICAgICAgICAgICAgICAgICAgICAgICogc2lnbixcbiAgICAgICAgICAgICAgICBoICA6IHRvSW50KG1hdGNoW0hPVVJdKSAgICAgICAgICAgICAgICAgICAgICAgICAqIHNpZ24sXG4gICAgICAgICAgICAgICAgbSAgOiB0b0ludChtYXRjaFtNSU5VVEVdKSAgICAgICAgICAgICAgICAgICAgICAgKiBzaWduLFxuICAgICAgICAgICAgICAgIHMgIDogdG9JbnQobWF0Y2hbU0VDT05EXSkgICAgICAgICAgICAgICAgICAgICAgICogc2lnbixcbiAgICAgICAgICAgICAgICBtcyA6IHRvSW50KGFic1JvdW5kKG1hdGNoW01JTExJU0VDT05EXSAqIDEwMDApKSAqIHNpZ24gLy8gdGhlIG1pbGxpc2Vjb25kIGRlY2ltYWwgcG9pbnQgaXMgaW5jbHVkZWQgaW4gdGhlIG1hdGNoXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKCEhKG1hdGNoID0gaXNvUmVnZXguZXhlYyhpbnB1dCkpKSB7XG4gICAgICAgICAgICBzaWduID0gKG1hdGNoWzFdID09PSAnLScpID8gLTEgOiAxO1xuICAgICAgICAgICAgZHVyYXRpb24gPSB7XG4gICAgICAgICAgICAgICAgeSA6IHBhcnNlSXNvKG1hdGNoWzJdLCBzaWduKSxcbiAgICAgICAgICAgICAgICBNIDogcGFyc2VJc28obWF0Y2hbM10sIHNpZ24pLFxuICAgICAgICAgICAgICAgIHcgOiBwYXJzZUlzbyhtYXRjaFs0XSwgc2lnbiksXG4gICAgICAgICAgICAgICAgZCA6IHBhcnNlSXNvKG1hdGNoWzVdLCBzaWduKSxcbiAgICAgICAgICAgICAgICBoIDogcGFyc2VJc28obWF0Y2hbNl0sIHNpZ24pLFxuICAgICAgICAgICAgICAgIG0gOiBwYXJzZUlzbyhtYXRjaFs3XSwgc2lnbiksXG4gICAgICAgICAgICAgICAgcyA6IHBhcnNlSXNvKG1hdGNoWzhdLCBzaWduKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmIChkdXJhdGlvbiA9PSBudWxsKSB7Ly8gY2hlY2tzIGZvciBudWxsIG9yIHVuZGVmaW5lZFxuICAgICAgICAgICAgZHVyYXRpb24gPSB7fTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZHVyYXRpb24gPT09ICdvYmplY3QnICYmICgnZnJvbScgaW4gZHVyYXRpb24gfHwgJ3RvJyBpbiBkdXJhdGlvbikpIHtcbiAgICAgICAgICAgIGRpZmZSZXMgPSBtb21lbnRzRGlmZmVyZW5jZShjcmVhdGVMb2NhbChkdXJhdGlvbi5mcm9tKSwgY3JlYXRlTG9jYWwoZHVyYXRpb24udG8pKTtcblxuICAgICAgICAgICAgZHVyYXRpb24gPSB7fTtcbiAgICAgICAgICAgIGR1cmF0aW9uLm1zID0gZGlmZlJlcy5taWxsaXNlY29uZHM7XG4gICAgICAgICAgICBkdXJhdGlvbi5NID0gZGlmZlJlcy5tb250aHM7XG4gICAgICAgIH1cblxuICAgICAgICByZXQgPSBuZXcgRHVyYXRpb24oZHVyYXRpb24pO1xuXG4gICAgICAgIGlmIChpc0R1cmF0aW9uKGlucHV0KSAmJiBoYXNPd25Qcm9wKGlucHV0LCAnX2xvY2FsZScpKSB7XG4gICAgICAgICAgICByZXQuX2xvY2FsZSA9IGlucHV0Ll9sb2NhbGU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH1cblxuICAgIGNyZWF0ZUR1cmF0aW9uLmZuID0gRHVyYXRpb24ucHJvdG90eXBlO1xuICAgIGNyZWF0ZUR1cmF0aW9uLmludmFsaWQgPSBjcmVhdGVJbnZhbGlkJDE7XG5cbiAgICBmdW5jdGlvbiBwYXJzZUlzbyAoaW5wLCBzaWduKSB7XG4gICAgICAgIC8vIFdlJ2Qgbm9ybWFsbHkgdXNlIH5+aW5wIGZvciB0aGlzLCBidXQgdW5mb3J0dW5hdGVseSBpdCBhbHNvXG4gICAgICAgIC8vIGNvbnZlcnRzIGZsb2F0cyB0byBpbnRzLlxuICAgICAgICAvLyBpbnAgbWF5IGJlIHVuZGVmaW5lZCwgc28gY2FyZWZ1bCBjYWxsaW5nIHJlcGxhY2Ugb24gaXQuXG4gICAgICAgIHZhciByZXMgPSBpbnAgJiYgcGFyc2VGbG9hdChpbnAucmVwbGFjZSgnLCcsICcuJykpO1xuICAgICAgICAvLyBhcHBseSBzaWduIHdoaWxlIHdlJ3JlIGF0IGl0XG4gICAgICAgIHJldHVybiAoaXNOYU4ocmVzKSA/IDAgOiByZXMpICogc2lnbjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwb3NpdGl2ZU1vbWVudHNEaWZmZXJlbmNlKGJhc2UsIG90aGVyKSB7XG4gICAgICAgIHZhciByZXMgPSB7fTtcblxuICAgICAgICByZXMubW9udGhzID0gb3RoZXIubW9udGgoKSAtIGJhc2UubW9udGgoKSArXG4gICAgICAgICAgICAob3RoZXIueWVhcigpIC0gYmFzZS55ZWFyKCkpICogMTI7XG4gICAgICAgIGlmIChiYXNlLmNsb25lKCkuYWRkKHJlcy5tb250aHMsICdNJykuaXNBZnRlcihvdGhlcikpIHtcbiAgICAgICAgICAgIC0tcmVzLm1vbnRocztcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcy5taWxsaXNlY29uZHMgPSArb3RoZXIgLSArKGJhc2UuY2xvbmUoKS5hZGQocmVzLm1vbnRocywgJ00nKSk7XG5cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb21lbnRzRGlmZmVyZW5jZShiYXNlLCBvdGhlcikge1xuICAgICAgICB2YXIgcmVzO1xuICAgICAgICBpZiAoIShiYXNlLmlzVmFsaWQoKSAmJiBvdGhlci5pc1ZhbGlkKCkpKSB7XG4gICAgICAgICAgICByZXR1cm4ge21pbGxpc2Vjb25kczogMCwgbW9udGhzOiAwfTtcbiAgICAgICAgfVxuXG4gICAgICAgIG90aGVyID0gY2xvbmVXaXRoT2Zmc2V0KG90aGVyLCBiYXNlKTtcbiAgICAgICAgaWYgKGJhc2UuaXNCZWZvcmUob3RoZXIpKSB7XG4gICAgICAgICAgICByZXMgPSBwb3NpdGl2ZU1vbWVudHNEaWZmZXJlbmNlKGJhc2UsIG90aGVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlcyA9IHBvc2l0aXZlTW9tZW50c0RpZmZlcmVuY2Uob3RoZXIsIGJhc2UpO1xuICAgICAgICAgICAgcmVzLm1pbGxpc2Vjb25kcyA9IC1yZXMubWlsbGlzZWNvbmRzO1xuICAgICAgICAgICAgcmVzLm1vbnRocyA9IC1yZXMubW9udGhzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG5cbiAgICAvLyBUT0RPOiByZW1vdmUgJ25hbWUnIGFyZyBhZnRlciBkZXByZWNhdGlvbiBpcyByZW1vdmVkXG4gICAgZnVuY3Rpb24gY3JlYXRlQWRkZXIoZGlyZWN0aW9uLCBuYW1lKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsLCBwZXJpb2QpIHtcbiAgICAgICAgICAgIHZhciBkdXIsIHRtcDtcbiAgICAgICAgICAgIC8vaW52ZXJ0IHRoZSBhcmd1bWVudHMsIGJ1dCBjb21wbGFpbiBhYm91dCBpdFxuICAgICAgICAgICAgaWYgKHBlcmlvZCAhPT0gbnVsbCAmJiAhaXNOYU4oK3BlcmlvZCkpIHtcbiAgICAgICAgICAgICAgICBkZXByZWNhdGVTaW1wbGUobmFtZSwgJ21vbWVudCgpLicgKyBuYW1lICArICcocGVyaW9kLCBudW1iZXIpIGlzIGRlcHJlY2F0ZWQuIFBsZWFzZSB1c2UgbW9tZW50KCkuJyArIG5hbWUgKyAnKG51bWJlciwgcGVyaW9kKS4gJyArXG4gICAgICAgICAgICAgICAgJ1NlZSBodHRwOi8vbW9tZW50anMuY29tL2d1aWRlcy8jL3dhcm5pbmdzL2FkZC1pbnZlcnRlZC1wYXJhbS8gZm9yIG1vcmUgaW5mby4nKTtcbiAgICAgICAgICAgICAgICB0bXAgPSB2YWw7IHZhbCA9IHBlcmlvZDsgcGVyaW9kID0gdG1wO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YWwgPSB0eXBlb2YgdmFsID09PSAnc3RyaW5nJyA/ICt2YWwgOiB2YWw7XG4gICAgICAgICAgICBkdXIgPSBjcmVhdGVEdXJhdGlvbih2YWwsIHBlcmlvZCk7XG4gICAgICAgICAgICBhZGRTdWJ0cmFjdCh0aGlzLCBkdXIsIGRpcmVjdGlvbik7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRTdWJ0cmFjdCAobW9tLCBkdXJhdGlvbiwgaXNBZGRpbmcsIHVwZGF0ZU9mZnNldCkge1xuICAgICAgICB2YXIgbWlsbGlzZWNvbmRzID0gZHVyYXRpb24uX21pbGxpc2Vjb25kcyxcbiAgICAgICAgICAgIGRheXMgPSBhYnNSb3VuZChkdXJhdGlvbi5fZGF5cyksXG4gICAgICAgICAgICBtb250aHMgPSBhYnNSb3VuZChkdXJhdGlvbi5fbW9udGhzKTtcblxuICAgICAgICBpZiAoIW1vbS5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIC8vIE5vIG9wXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGVPZmZzZXQgPSB1cGRhdGVPZmZzZXQgPT0gbnVsbCA/IHRydWUgOiB1cGRhdGVPZmZzZXQ7XG5cbiAgICAgICAgaWYgKG1vbnRocykge1xuICAgICAgICAgICAgc2V0TW9udGgobW9tLCBnZXQobW9tLCAnTW9udGgnKSArIG1vbnRocyAqIGlzQWRkaW5nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF5cykge1xuICAgICAgICAgICAgc2V0JDEobW9tLCAnRGF0ZScsIGdldChtb20sICdEYXRlJykgKyBkYXlzICogaXNBZGRpbmcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtaWxsaXNlY29uZHMpIHtcbiAgICAgICAgICAgIG1vbS5fZC5zZXRUaW1lKG1vbS5fZC52YWx1ZU9mKCkgKyBtaWxsaXNlY29uZHMgKiBpc0FkZGluZyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVwZGF0ZU9mZnNldCkge1xuICAgICAgICAgICAgaG9va3MudXBkYXRlT2Zmc2V0KG1vbSwgZGF5cyB8fCBtb250aHMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGFkZCAgICAgID0gY3JlYXRlQWRkZXIoMSwgJ2FkZCcpO1xuICAgIHZhciBzdWJ0cmFjdCA9IGNyZWF0ZUFkZGVyKC0xLCAnc3VidHJhY3QnKTtcblxuICAgIGZ1bmN0aW9uIGdldENhbGVuZGFyRm9ybWF0KG15TW9tZW50LCBub3cpIHtcbiAgICAgICAgdmFyIGRpZmYgPSBteU1vbWVudC5kaWZmKG5vdywgJ2RheXMnLCB0cnVlKTtcbiAgICAgICAgcmV0dXJuIGRpZmYgPCAtNiA/ICdzYW1lRWxzZScgOlxuICAgICAgICAgICAgICAgIGRpZmYgPCAtMSA/ICdsYXN0V2VlaycgOlxuICAgICAgICAgICAgICAgIGRpZmYgPCAwID8gJ2xhc3REYXknIDpcbiAgICAgICAgICAgICAgICBkaWZmIDwgMSA/ICdzYW1lRGF5JyA6XG4gICAgICAgICAgICAgICAgZGlmZiA8IDIgPyAnbmV4dERheScgOlxuICAgICAgICAgICAgICAgIGRpZmYgPCA3ID8gJ25leHRXZWVrJyA6ICdzYW1lRWxzZSc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FsZW5kYXIkMSAodGltZSwgZm9ybWF0cykge1xuICAgICAgICAvLyBXZSB3YW50IHRvIGNvbXBhcmUgdGhlIHN0YXJ0IG9mIHRvZGF5LCB2cyB0aGlzLlxuICAgICAgICAvLyBHZXR0aW5nIHN0YXJ0LW9mLXRvZGF5IGRlcGVuZHMgb24gd2hldGhlciB3ZSdyZSBsb2NhbC91dGMvb2Zmc2V0IG9yIG5vdC5cbiAgICAgICAgdmFyIG5vdyA9IHRpbWUgfHwgY3JlYXRlTG9jYWwoKSxcbiAgICAgICAgICAgIHNvZCA9IGNsb25lV2l0aE9mZnNldChub3csIHRoaXMpLnN0YXJ0T2YoJ2RheScpLFxuICAgICAgICAgICAgZm9ybWF0ID0gaG9va3MuY2FsZW5kYXJGb3JtYXQodGhpcywgc29kKSB8fCAnc2FtZUVsc2UnO1xuXG4gICAgICAgIHZhciBvdXRwdXQgPSBmb3JtYXRzICYmIChpc0Z1bmN0aW9uKGZvcm1hdHNbZm9ybWF0XSkgPyBmb3JtYXRzW2Zvcm1hdF0uY2FsbCh0aGlzLCBub3cpIDogZm9ybWF0c1tmb3JtYXRdKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXQob3V0cHV0IHx8IHRoaXMubG9jYWxlRGF0YSgpLmNhbGVuZGFyKGZvcm1hdCwgdGhpcywgY3JlYXRlTG9jYWwobm93KSkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsb25lICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBNb21lbnQodGhpcyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNBZnRlciAoaW5wdXQsIHVuaXRzKSB7XG4gICAgICAgIHZhciBsb2NhbElucHV0ID0gaXNNb21lbnQoaW5wdXQpID8gaW5wdXQgOiBjcmVhdGVMb2NhbChpbnB1dCk7XG4gICAgICAgIGlmICghKHRoaXMuaXNWYWxpZCgpICYmIGxvY2FsSW5wdXQuaXNWYWxpZCgpKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMpIHx8ICdtaWxsaXNlY29uZCc7XG4gICAgICAgIGlmICh1bml0cyA9PT0gJ21pbGxpc2Vjb25kJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVPZigpID4gbG9jYWxJbnB1dC52YWx1ZU9mKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbG9jYWxJbnB1dC52YWx1ZU9mKCkgPCB0aGlzLmNsb25lKCkuc3RhcnRPZih1bml0cykudmFsdWVPZigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNCZWZvcmUgKGlucHV0LCB1bml0cykge1xuICAgICAgICB2YXIgbG9jYWxJbnB1dCA9IGlzTW9tZW50KGlucHV0KSA/IGlucHV0IDogY3JlYXRlTG9jYWwoaW5wdXQpO1xuICAgICAgICBpZiAoISh0aGlzLmlzVmFsaWQoKSAmJiBsb2NhbElucHV0LmlzVmFsaWQoKSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKHVuaXRzKSB8fCAnbWlsbGlzZWNvbmQnO1xuICAgICAgICBpZiAodW5pdHMgPT09ICdtaWxsaXNlY29uZCcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlT2YoKSA8IGxvY2FsSW5wdXQudmFsdWVPZigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoKS5lbmRPZih1bml0cykudmFsdWVPZigpIDwgbG9jYWxJbnB1dC52YWx1ZU9mKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0JldHdlZW4gKGZyb20sIHRvLCB1bml0cywgaW5jbHVzaXZpdHkpIHtcbiAgICAgICAgdmFyIGxvY2FsRnJvbSA9IGlzTW9tZW50KGZyb20pID8gZnJvbSA6IGNyZWF0ZUxvY2FsKGZyb20pLFxuICAgICAgICAgICAgbG9jYWxUbyA9IGlzTW9tZW50KHRvKSA/IHRvIDogY3JlYXRlTG9jYWwodG8pO1xuICAgICAgICBpZiAoISh0aGlzLmlzVmFsaWQoKSAmJiBsb2NhbEZyb20uaXNWYWxpZCgpICYmIGxvY2FsVG8uaXNWYWxpZCgpKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGluY2x1c2l2aXR5ID0gaW5jbHVzaXZpdHkgfHwgJygpJztcbiAgICAgICAgcmV0dXJuIChpbmNsdXNpdml0eVswXSA9PT0gJygnID8gdGhpcy5pc0FmdGVyKGxvY2FsRnJvbSwgdW5pdHMpIDogIXRoaXMuaXNCZWZvcmUobG9jYWxGcm9tLCB1bml0cykpICYmXG4gICAgICAgICAgICAoaW5jbHVzaXZpdHlbMV0gPT09ICcpJyA/IHRoaXMuaXNCZWZvcmUobG9jYWxUbywgdW5pdHMpIDogIXRoaXMuaXNBZnRlcihsb2NhbFRvLCB1bml0cykpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzU2FtZSAoaW5wdXQsIHVuaXRzKSB7XG4gICAgICAgIHZhciBsb2NhbElucHV0ID0gaXNNb21lbnQoaW5wdXQpID8gaW5wdXQgOiBjcmVhdGVMb2NhbChpbnB1dCksXG4gICAgICAgICAgICBpbnB1dE1zO1xuICAgICAgICBpZiAoISh0aGlzLmlzVmFsaWQoKSAmJiBsb2NhbElucHV0LmlzVmFsaWQoKSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKHVuaXRzKSB8fCAnbWlsbGlzZWNvbmQnO1xuICAgICAgICBpZiAodW5pdHMgPT09ICdtaWxsaXNlY29uZCcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlT2YoKSA9PT0gbG9jYWxJbnB1dC52YWx1ZU9mKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpbnB1dE1zID0gbG9jYWxJbnB1dC52YWx1ZU9mKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jbG9uZSgpLnN0YXJ0T2YodW5pdHMpLnZhbHVlT2YoKSA8PSBpbnB1dE1zICYmIGlucHV0TXMgPD0gdGhpcy5jbG9uZSgpLmVuZE9mKHVuaXRzKS52YWx1ZU9mKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc1NhbWVPckFmdGVyIChpbnB1dCwgdW5pdHMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNTYW1lKGlucHV0LCB1bml0cykgfHwgdGhpcy5pc0FmdGVyKGlucHV0LCB1bml0cyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNTYW1lT3JCZWZvcmUgKGlucHV0LCB1bml0cykge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1NhbWUoaW5wdXQsIHVuaXRzKSB8fCB0aGlzLmlzQmVmb3JlKGlucHV0LCB1bml0cyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGlmZiAoaW5wdXQsIHVuaXRzLCBhc0Zsb2F0KSB7XG4gICAgICAgIHZhciB0aGF0LFxuICAgICAgICAgICAgem9uZURlbHRhLFxuICAgICAgICAgICAgb3V0cHV0O1xuXG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgIH1cblxuICAgICAgICB0aGF0ID0gY2xvbmVXaXRoT2Zmc2V0KGlucHV0LCB0aGlzKTtcblxuICAgICAgICBpZiAoIXRoYXQuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG5cbiAgICAgICAgem9uZURlbHRhID0gKHRoYXQudXRjT2Zmc2V0KCkgLSB0aGlzLnV0Y09mZnNldCgpKSAqIDZlNDtcblxuICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKHVuaXRzKTtcblxuICAgICAgICBzd2l0Y2ggKHVuaXRzKSB7XG4gICAgICAgICAgICBjYXNlICd5ZWFyJzogb3V0cHV0ID0gbW9udGhEaWZmKHRoaXMsIHRoYXQpIC8gMTI7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbW9udGgnOiBvdXRwdXQgPSBtb250aERpZmYodGhpcywgdGhhdCk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncXVhcnRlcic6IG91dHB1dCA9IG1vbnRoRGlmZih0aGlzLCB0aGF0KSAvIDM7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnc2Vjb25kJzogb3V0cHV0ID0gKHRoaXMgLSB0aGF0KSAvIDFlMzsgYnJlYWs7IC8vIDEwMDBcbiAgICAgICAgICAgIGNhc2UgJ21pbnV0ZSc6IG91dHB1dCA9ICh0aGlzIC0gdGhhdCkgLyA2ZTQ7IGJyZWFrOyAvLyAxMDAwICogNjBcbiAgICAgICAgICAgIGNhc2UgJ2hvdXInOiBvdXRwdXQgPSAodGhpcyAtIHRoYXQpIC8gMzZlNTsgYnJlYWs7IC8vIDEwMDAgKiA2MCAqIDYwXG4gICAgICAgICAgICBjYXNlICdkYXknOiBvdXRwdXQgPSAodGhpcyAtIHRoYXQgLSB6b25lRGVsdGEpIC8gODY0ZTU7IGJyZWFrOyAvLyAxMDAwICogNjAgKiA2MCAqIDI0LCBuZWdhdGUgZHN0XG4gICAgICAgICAgICBjYXNlICd3ZWVrJzogb3V0cHV0ID0gKHRoaXMgLSB0aGF0IC0gem9uZURlbHRhKSAvIDYwNDhlNTsgYnJlYWs7IC8vIDEwMDAgKiA2MCAqIDYwICogMjQgKiA3LCBuZWdhdGUgZHN0XG4gICAgICAgICAgICBkZWZhdWx0OiBvdXRwdXQgPSB0aGlzIC0gdGhhdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhc0Zsb2F0ID8gb3V0cHV0IDogYWJzRmxvb3Iob3V0cHV0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb250aERpZmYgKGEsIGIpIHtcbiAgICAgICAgLy8gZGlmZmVyZW5jZSBpbiBtb250aHNcbiAgICAgICAgdmFyIHdob2xlTW9udGhEaWZmID0gKChiLnllYXIoKSAtIGEueWVhcigpKSAqIDEyKSArIChiLm1vbnRoKCkgLSBhLm1vbnRoKCkpLFxuICAgICAgICAgICAgLy8gYiBpcyBpbiAoYW5jaG9yIC0gMSBtb250aCwgYW5jaG9yICsgMSBtb250aClcbiAgICAgICAgICAgIGFuY2hvciA9IGEuY2xvbmUoKS5hZGQod2hvbGVNb250aERpZmYsICdtb250aHMnKSxcbiAgICAgICAgICAgIGFuY2hvcjIsIGFkanVzdDtcblxuICAgICAgICBpZiAoYiAtIGFuY2hvciA8IDApIHtcbiAgICAgICAgICAgIGFuY2hvcjIgPSBhLmNsb25lKCkuYWRkKHdob2xlTW9udGhEaWZmIC0gMSwgJ21vbnRocycpO1xuICAgICAgICAgICAgLy8gbGluZWFyIGFjcm9zcyB0aGUgbW9udGhcbiAgICAgICAgICAgIGFkanVzdCA9IChiIC0gYW5jaG9yKSAvIChhbmNob3IgLSBhbmNob3IyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFuY2hvcjIgPSBhLmNsb25lKCkuYWRkKHdob2xlTW9udGhEaWZmICsgMSwgJ21vbnRocycpO1xuICAgICAgICAgICAgLy8gbGluZWFyIGFjcm9zcyB0aGUgbW9udGhcbiAgICAgICAgICAgIGFkanVzdCA9IChiIC0gYW5jaG9yKSAvIChhbmNob3IyIC0gYW5jaG9yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vY2hlY2sgZm9yIG5lZ2F0aXZlIHplcm8sIHJldHVybiB6ZXJvIGlmIG5lZ2F0aXZlIHplcm9cbiAgICAgICAgcmV0dXJuIC0od2hvbGVNb250aERpZmYgKyBhZGp1c3QpIHx8IDA7XG4gICAgfVxuXG4gICAgaG9va3MuZGVmYXVsdEZvcm1hdCA9ICdZWVlZLU1NLUREVEhIOm1tOnNzWic7XG4gICAgaG9va3MuZGVmYXVsdEZvcm1hdFV0YyA9ICdZWVlZLU1NLUREVEhIOm1tOnNzW1pdJztcblxuICAgIGZ1bmN0aW9uIHRvU3RyaW5nICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoKS5sb2NhbGUoJ2VuJykuZm9ybWF0KCdkZGQgTU1NIEREIFlZWVkgSEg6bW06c3MgW0dNVF1aWicpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvSVNPU3RyaW5nKGtlZXBPZmZzZXQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHV0YyA9IGtlZXBPZmZzZXQgIT09IHRydWU7XG4gICAgICAgIHZhciBtID0gdXRjID8gdGhpcy5jbG9uZSgpLnV0YygpIDogdGhpcztcbiAgICAgICAgaWYgKG0ueWVhcigpIDwgMCB8fCBtLnllYXIoKSA+IDk5OTkpIHtcbiAgICAgICAgICAgIHJldHVybiBmb3JtYXRNb21lbnQobSwgdXRjID8gJ1lZWVlZWS1NTS1ERFtUXUhIOm1tOnNzLlNTU1taXScgOiAnWVlZWVlZLU1NLUREW1RdSEg6bW06c3MuU1NTWicpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKERhdGUucHJvdG90eXBlLnRvSVNPU3RyaW5nKSkge1xuICAgICAgICAgICAgLy8gbmF0aXZlIGltcGxlbWVudGF0aW9uIGlzIH41MHggZmFzdGVyLCB1c2UgaXQgd2hlbiB3ZSBjYW5cbiAgICAgICAgICAgIGlmICh1dGMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50b0RhdGUoKS50b0lTT1N0cmluZygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGUodGhpcy52YWx1ZU9mKCkgKyB0aGlzLnV0Y09mZnNldCgpICogNjAgKiAxMDAwKS50b0lTT1N0cmluZygpLnJlcGxhY2UoJ1onLCBmb3JtYXRNb21lbnQobSwgJ1onKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvcm1hdE1vbWVudChtLCB1dGMgPyAnWVlZWS1NTS1ERFtUXUhIOm1tOnNzLlNTU1taXScgOiAnWVlZWS1NTS1ERFtUXUhIOm1tOnNzLlNTU1onKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYSBodW1hbiByZWFkYWJsZSByZXByZXNlbnRhdGlvbiBvZiBhIG1vbWVudCB0aGF0IGNhblxuICAgICAqIGFsc28gYmUgZXZhbHVhdGVkIHRvIGdldCBhIG5ldyBtb21lbnQgd2hpY2ggaXMgdGhlIHNhbWVcbiAgICAgKlxuICAgICAqIEBsaW5rIGh0dHBzOi8vbm9kZWpzLm9yZy9kaXN0L2xhdGVzdC9kb2NzL2FwaS91dGlsLmh0bWwjdXRpbF9jdXN0b21faW5zcGVjdF9mdW5jdGlvbl9vbl9vYmplY3RzXG4gICAgICovXG4gICAgZnVuY3Rpb24gaW5zcGVjdCAoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiAnbW9tZW50LmludmFsaWQoLyogJyArIHRoaXMuX2kgKyAnICovKSc7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGZ1bmMgPSAnbW9tZW50JztcbiAgICAgICAgdmFyIHpvbmUgPSAnJztcbiAgICAgICAgaWYgKCF0aGlzLmlzTG9jYWwoKSkge1xuICAgICAgICAgICAgZnVuYyA9IHRoaXMudXRjT2Zmc2V0KCkgPT09IDAgPyAnbW9tZW50LnV0YycgOiAnbW9tZW50LnBhcnNlWm9uZSc7XG4gICAgICAgICAgICB6b25lID0gJ1onO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwcmVmaXggPSAnWycgKyBmdW5jICsgJyhcIl0nO1xuICAgICAgICB2YXIgeWVhciA9ICgwIDw9IHRoaXMueWVhcigpICYmIHRoaXMueWVhcigpIDw9IDk5OTkpID8gJ1lZWVknIDogJ1lZWVlZWSc7XG4gICAgICAgIHZhciBkYXRldGltZSA9ICctTU0tRERbVF1ISDptbTpzcy5TU1MnO1xuICAgICAgICB2YXIgc3VmZml4ID0gem9uZSArICdbXCIpXSc7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0KHByZWZpeCArIHllYXIgKyBkYXRldGltZSArIHN1ZmZpeCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9ybWF0IChpbnB1dFN0cmluZykge1xuICAgICAgICBpZiAoIWlucHV0U3RyaW5nKSB7XG4gICAgICAgICAgICBpbnB1dFN0cmluZyA9IHRoaXMuaXNVdGMoKSA/IGhvb2tzLmRlZmF1bHRGb3JtYXRVdGMgOiBob29rcy5kZWZhdWx0Rm9ybWF0O1xuICAgICAgICB9XG4gICAgICAgIHZhciBvdXRwdXQgPSBmb3JtYXRNb21lbnQodGhpcywgaW5wdXRTdHJpbmcpO1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkucG9zdGZvcm1hdChvdXRwdXQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZyb20gKHRpbWUsIHdpdGhvdXRTdWZmaXgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZCgpICYmXG4gICAgICAgICAgICAgICAgKChpc01vbWVudCh0aW1lKSAmJiB0aW1lLmlzVmFsaWQoKSkgfHxcbiAgICAgICAgICAgICAgICAgY3JlYXRlTG9jYWwodGltZSkuaXNWYWxpZCgpKSkge1xuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZUR1cmF0aW9uKHt0bzogdGhpcywgZnJvbTogdGltZX0pLmxvY2FsZSh0aGlzLmxvY2FsZSgpKS5odW1hbml6ZSghd2l0aG91dFN1ZmZpeCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkuaW52YWxpZERhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZyb21Ob3cgKHdpdGhvdXRTdWZmaXgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZnJvbShjcmVhdGVMb2NhbCgpLCB3aXRob3V0U3VmZml4KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0byAodGltZSwgd2l0aG91dFN1ZmZpeCkge1xuICAgICAgICBpZiAodGhpcy5pc1ZhbGlkKCkgJiZcbiAgICAgICAgICAgICAgICAoKGlzTW9tZW50KHRpbWUpICYmIHRpbWUuaXNWYWxpZCgpKSB8fFxuICAgICAgICAgICAgICAgICBjcmVhdGVMb2NhbCh0aW1lKS5pc1ZhbGlkKCkpKSB7XG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlRHVyYXRpb24oe2Zyb206IHRoaXMsIHRvOiB0aW1lfSkubG9jYWxlKHRoaXMubG9jYWxlKCkpLmh1bWFuaXplKCF3aXRob3V0U3VmZml4KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS5pbnZhbGlkRGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9Ob3cgKHdpdGhvdXRTdWZmaXgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudG8oY3JlYXRlTG9jYWwoKSwgd2l0aG91dFN1ZmZpeCk7XG4gICAgfVxuXG4gICAgLy8gSWYgcGFzc2VkIGEgbG9jYWxlIGtleSwgaXQgd2lsbCBzZXQgdGhlIGxvY2FsZSBmb3IgdGhpc1xuICAgIC8vIGluc3RhbmNlLiAgT3RoZXJ3aXNlLCBpdCB3aWxsIHJldHVybiB0aGUgbG9jYWxlIGNvbmZpZ3VyYXRpb25cbiAgICAvLyB2YXJpYWJsZXMgZm9yIHRoaXMgaW5zdGFuY2UuXG4gICAgZnVuY3Rpb24gbG9jYWxlIChrZXkpIHtcbiAgICAgICAgdmFyIG5ld0xvY2FsZURhdGE7XG5cbiAgICAgICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxlLl9hYmJyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3TG9jYWxlRGF0YSA9IGdldExvY2FsZShrZXkpO1xuICAgICAgICAgICAgaWYgKG5ld0xvY2FsZURhdGEgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvY2FsZSA9IG5ld0xvY2FsZURhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBsYW5nID0gZGVwcmVjYXRlKFxuICAgICAgICAnbW9tZW50KCkubGFuZygpIGlzIGRlcHJlY2F0ZWQuIEluc3RlYWQsIHVzZSBtb21lbnQoKS5sb2NhbGVEYXRhKCkgdG8gZ2V0IHRoZSBsYW5ndWFnZSBjb25maWd1cmF0aW9uLiBVc2UgbW9tZW50KCkubG9jYWxlKCkgdG8gY2hhbmdlIGxhbmd1YWdlcy4nLFxuICAgICAgICBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICBpZiAoa2V5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxvY2FsZShrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgKTtcblxuICAgIGZ1bmN0aW9uIGxvY2FsZURhdGEgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxlO1xuICAgIH1cblxuICAgIHZhciBNU19QRVJfU0VDT05EID0gMTAwMDtcbiAgICB2YXIgTVNfUEVSX01JTlVURSA9IDYwICogTVNfUEVSX1NFQ09ORDtcbiAgICB2YXIgTVNfUEVSX0hPVVIgPSA2MCAqIE1TX1BFUl9NSU5VVEU7XG4gICAgdmFyIE1TX1BFUl80MDBfWUVBUlMgPSAoMzY1ICogNDAwICsgOTcpICogMjQgKiBNU19QRVJfSE9VUjtcblxuICAgIC8vIGFjdHVhbCBtb2R1bG8gLSBoYW5kbGVzIG5lZ2F0aXZlIG51bWJlcnMgKGZvciBkYXRlcyBiZWZvcmUgMTk3MCk6XG4gICAgZnVuY3Rpb24gbW9kJDEoZGl2aWRlbmQsIGRpdmlzb3IpIHtcbiAgICAgICAgcmV0dXJuIChkaXZpZGVuZCAlIGRpdmlzb3IgKyBkaXZpc29yKSAlIGRpdmlzb3I7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9jYWxTdGFydE9mRGF0ZSh5LCBtLCBkKSB7XG4gICAgICAgIC8vIHRoZSBkYXRlIGNvbnN0cnVjdG9yIHJlbWFwcyB5ZWFycyAwLTk5IHRvIDE5MDAtMTk5OVxuICAgICAgICBpZiAoeSA8IDEwMCAmJiB5ID49IDApIHtcbiAgICAgICAgICAgIC8vIHByZXNlcnZlIGxlYXAgeWVhcnMgdXNpbmcgYSBmdWxsIDQwMCB5ZWFyIGN5Y2xlLCB0aGVuIHJlc2V0XG4gICAgICAgICAgICByZXR1cm4gbmV3IERhdGUoeSArIDQwMCwgbSwgZCkgLSBNU19QRVJfNDAwX1lFQVJTO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKHksIG0sIGQpLnZhbHVlT2YoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHV0Y1N0YXJ0T2ZEYXRlKHksIG0sIGQpIHtcbiAgICAgICAgLy8gRGF0ZS5VVEMgcmVtYXBzIHllYXJzIDAtOTkgdG8gMTkwMC0xOTk5XG4gICAgICAgIGlmICh5IDwgMTAwICYmIHkgPj0gMCkge1xuICAgICAgICAgICAgLy8gcHJlc2VydmUgbGVhcCB5ZWFycyB1c2luZyBhIGZ1bGwgNDAwIHllYXIgY3ljbGUsIHRoZW4gcmVzZXRcbiAgICAgICAgICAgIHJldHVybiBEYXRlLlVUQyh5ICsgNDAwLCBtLCBkKSAtIE1TX1BFUl80MDBfWUVBUlM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gRGF0ZS5VVEMoeSwgbSwgZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdGFydE9mICh1bml0cykge1xuICAgICAgICB2YXIgdGltZTtcbiAgICAgICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyh1bml0cyk7XG4gICAgICAgIGlmICh1bml0cyA9PT0gdW5kZWZpbmVkIHx8IHVuaXRzID09PSAnbWlsbGlzZWNvbmQnIHx8ICF0aGlzLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc3RhcnRPZkRhdGUgPSB0aGlzLl9pc1VUQyA/IHV0Y1N0YXJ0T2ZEYXRlIDogbG9jYWxTdGFydE9mRGF0ZTtcblxuICAgICAgICBzd2l0Y2ggKHVuaXRzKSB7XG4gICAgICAgICAgICBjYXNlICd5ZWFyJzpcbiAgICAgICAgICAgICAgICB0aW1lID0gc3RhcnRPZkRhdGUodGhpcy55ZWFyKCksIDAsIDEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncXVhcnRlcic6XG4gICAgICAgICAgICAgICAgdGltZSA9IHN0YXJ0T2ZEYXRlKHRoaXMueWVhcigpLCB0aGlzLm1vbnRoKCkgLSB0aGlzLm1vbnRoKCkgJSAzLCAxKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ21vbnRoJzpcbiAgICAgICAgICAgICAgICB0aW1lID0gc3RhcnRPZkRhdGUodGhpcy55ZWFyKCksIHRoaXMubW9udGgoKSwgMSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd3ZWVrJzpcbiAgICAgICAgICAgICAgICB0aW1lID0gc3RhcnRPZkRhdGUodGhpcy55ZWFyKCksIHRoaXMubW9udGgoKSwgdGhpcy5kYXRlKCkgLSB0aGlzLndlZWtkYXkoKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdpc29XZWVrJzpcbiAgICAgICAgICAgICAgICB0aW1lID0gc3RhcnRPZkRhdGUodGhpcy55ZWFyKCksIHRoaXMubW9udGgoKSwgdGhpcy5kYXRlKCkgLSAodGhpcy5pc29XZWVrZGF5KCkgLSAxKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdkYXknOlxuICAgICAgICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgICAgICAgICAgdGltZSA9IHN0YXJ0T2ZEYXRlKHRoaXMueWVhcigpLCB0aGlzLm1vbnRoKCksIHRoaXMuZGF0ZSgpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2hvdXInOlxuICAgICAgICAgICAgICAgIHRpbWUgPSB0aGlzLl9kLnZhbHVlT2YoKTtcbiAgICAgICAgICAgICAgICB0aW1lIC09IG1vZCQxKHRpbWUgKyAodGhpcy5faXNVVEMgPyAwIDogdGhpcy51dGNPZmZzZXQoKSAqIE1TX1BFUl9NSU5VVEUpLCBNU19QRVJfSE9VUik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdtaW51dGUnOlxuICAgICAgICAgICAgICAgIHRpbWUgPSB0aGlzLl9kLnZhbHVlT2YoKTtcbiAgICAgICAgICAgICAgICB0aW1lIC09IG1vZCQxKHRpbWUsIE1TX1BFUl9NSU5VVEUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgICAgICAgICAgICB0aW1lID0gdGhpcy5fZC52YWx1ZU9mKCk7XG4gICAgICAgICAgICAgICAgdGltZSAtPSBtb2QkMSh0aW1lLCBNU19QRVJfU0VDT05EKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2Quc2V0VGltZSh0aW1lKTtcbiAgICAgICAgaG9va3MudXBkYXRlT2Zmc2V0KHRoaXMsIHRydWUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlbmRPZiAodW5pdHMpIHtcbiAgICAgICAgdmFyIHRpbWU7XG4gICAgICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMpO1xuICAgICAgICBpZiAodW5pdHMgPT09IHVuZGVmaW5lZCB8fCB1bml0cyA9PT0gJ21pbGxpc2Vjb25kJyB8fCAhdGhpcy5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHN0YXJ0T2ZEYXRlID0gdGhpcy5faXNVVEMgPyB1dGNTdGFydE9mRGF0ZSA6IGxvY2FsU3RhcnRPZkRhdGU7XG5cbiAgICAgICAgc3dpdGNoICh1bml0cykge1xuICAgICAgICAgICAgY2FzZSAneWVhcic6XG4gICAgICAgICAgICAgICAgdGltZSA9IHN0YXJ0T2ZEYXRlKHRoaXMueWVhcigpICsgMSwgMCwgMSkgLSAxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncXVhcnRlcic6XG4gICAgICAgICAgICAgICAgdGltZSA9IHN0YXJ0T2ZEYXRlKHRoaXMueWVhcigpLCB0aGlzLm1vbnRoKCkgLSB0aGlzLm1vbnRoKCkgJSAzICsgMywgMSkgLSAxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbW9udGgnOlxuICAgICAgICAgICAgICAgIHRpbWUgPSBzdGFydE9mRGF0ZSh0aGlzLnllYXIoKSwgdGhpcy5tb250aCgpICsgMSwgMSkgLSAxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnd2Vlayc6XG4gICAgICAgICAgICAgICAgdGltZSA9IHN0YXJ0T2ZEYXRlKHRoaXMueWVhcigpLCB0aGlzLm1vbnRoKCksIHRoaXMuZGF0ZSgpIC0gdGhpcy53ZWVrZGF5KCkgKyA3KSAtIDE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdpc29XZWVrJzpcbiAgICAgICAgICAgICAgICB0aW1lID0gc3RhcnRPZkRhdGUodGhpcy55ZWFyKCksIHRoaXMubW9udGgoKSwgdGhpcy5kYXRlKCkgLSAodGhpcy5pc29XZWVrZGF5KCkgLSAxKSArIDcpIC0gMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2RheSc6XG4gICAgICAgICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgICAgICAgICB0aW1lID0gc3RhcnRPZkRhdGUodGhpcy55ZWFyKCksIHRoaXMubW9udGgoKSwgdGhpcy5kYXRlKCkgKyAxKSAtIDE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdob3VyJzpcbiAgICAgICAgICAgICAgICB0aW1lID0gdGhpcy5fZC52YWx1ZU9mKCk7XG4gICAgICAgICAgICAgICAgdGltZSArPSBNU19QRVJfSE9VUiAtIG1vZCQxKHRpbWUgKyAodGhpcy5faXNVVEMgPyAwIDogdGhpcy51dGNPZmZzZXQoKSAqIE1TX1BFUl9NSU5VVEUpLCBNU19QRVJfSE9VUikgLSAxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbWludXRlJzpcbiAgICAgICAgICAgICAgICB0aW1lID0gdGhpcy5fZC52YWx1ZU9mKCk7XG4gICAgICAgICAgICAgICAgdGltZSArPSBNU19QRVJfTUlOVVRFIC0gbW9kJDEodGltZSwgTVNfUEVSX01JTlVURSkgLSAxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgICAgICAgICAgICB0aW1lID0gdGhpcy5fZC52YWx1ZU9mKCk7XG4gICAgICAgICAgICAgICAgdGltZSArPSBNU19QRVJfU0VDT05EIC0gbW9kJDEodGltZSwgTVNfUEVSX1NFQ09ORCkgLSAxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZC5zZXRUaW1lKHRpbWUpO1xuICAgICAgICBob29rcy51cGRhdGVPZmZzZXQodGhpcywgdHJ1ZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZhbHVlT2YgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZC52YWx1ZU9mKCkgLSAoKHRoaXMuX29mZnNldCB8fCAwKSAqIDYwMDAwKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1bml4ICgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IodGhpcy52YWx1ZU9mKCkgLyAxMDAwKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b0RhdGUgKCkge1xuICAgICAgICByZXR1cm4gbmV3IERhdGUodGhpcy52YWx1ZU9mKCkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvQXJyYXkgKCkge1xuICAgICAgICB2YXIgbSA9IHRoaXM7XG4gICAgICAgIHJldHVybiBbbS55ZWFyKCksIG0ubW9udGgoKSwgbS5kYXRlKCksIG0uaG91cigpLCBtLm1pbnV0ZSgpLCBtLnNlY29uZCgpLCBtLm1pbGxpc2Vjb25kKCldO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvT2JqZWN0ICgpIHtcbiAgICAgICAgdmFyIG0gPSB0aGlzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeWVhcnM6IG0ueWVhcigpLFxuICAgICAgICAgICAgbW9udGhzOiBtLm1vbnRoKCksXG4gICAgICAgICAgICBkYXRlOiBtLmRhdGUoKSxcbiAgICAgICAgICAgIGhvdXJzOiBtLmhvdXJzKCksXG4gICAgICAgICAgICBtaW51dGVzOiBtLm1pbnV0ZXMoKSxcbiAgICAgICAgICAgIHNlY29uZHM6IG0uc2Vjb25kcygpLFxuICAgICAgICAgICAgbWlsbGlzZWNvbmRzOiBtLm1pbGxpc2Vjb25kcygpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9KU09OICgpIHtcbiAgICAgICAgLy8gbmV3IERhdGUoTmFOKS50b0pTT04oKSA9PT0gbnVsbFxuICAgICAgICByZXR1cm4gdGhpcy5pc1ZhbGlkKCkgPyB0aGlzLnRvSVNPU3RyaW5nKCkgOiBudWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzVmFsaWQkMiAoKSB7XG4gICAgICAgIHJldHVybiBpc1ZhbGlkKHRoaXMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNpbmdGbGFncyAoKSB7XG4gICAgICAgIHJldHVybiBleHRlbmQoe30sIGdldFBhcnNpbmdGbGFncyh0aGlzKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW52YWxpZEF0ICgpIHtcbiAgICAgICAgcmV0dXJuIGdldFBhcnNpbmdGbGFncyh0aGlzKS5vdmVyZmxvdztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGlvbkRhdGEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbnB1dDogdGhpcy5faSxcbiAgICAgICAgICAgIGZvcm1hdDogdGhpcy5fZixcbiAgICAgICAgICAgIGxvY2FsZTogdGhpcy5fbG9jYWxlLFxuICAgICAgICAgICAgaXNVVEM6IHRoaXMuX2lzVVRDLFxuICAgICAgICAgICAgc3RyaWN0OiB0aGlzLl9zdHJpY3RcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBGT1JNQVRUSU5HXG5cbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ2dnJywgMl0sIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud2Vla1llYXIoKSAlIDEwMDtcbiAgICB9KTtcblxuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnR0cnLCAyXSwgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc29XZWVrWWVhcigpICUgMTAwO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gYWRkV2Vla1llYXJGb3JtYXRUb2tlbiAodG9rZW4sIGdldHRlcikge1xuICAgICAgICBhZGRGb3JtYXRUb2tlbigwLCBbdG9rZW4sIHRva2VuLmxlbmd0aF0sIDAsIGdldHRlcik7XG4gICAgfVxuXG4gICAgYWRkV2Vla1llYXJGb3JtYXRUb2tlbignZ2dnZycsICAgICAnd2Vla1llYXInKTtcbiAgICBhZGRXZWVrWWVhckZvcm1hdFRva2VuKCdnZ2dnZycsICAgICd3ZWVrWWVhcicpO1xuICAgIGFkZFdlZWtZZWFyRm9ybWF0VG9rZW4oJ0dHR0cnLCAgJ2lzb1dlZWtZZWFyJyk7XG4gICAgYWRkV2Vla1llYXJGb3JtYXRUb2tlbignR0dHR0cnLCAnaXNvV2Vla1llYXInKTtcblxuICAgIC8vIEFMSUFTRVNcblxuICAgIGFkZFVuaXRBbGlhcygnd2Vla1llYXInLCAnZ2cnKTtcbiAgICBhZGRVbml0QWxpYXMoJ2lzb1dlZWtZZWFyJywgJ0dHJyk7XG5cbiAgICAvLyBQUklPUklUWVxuXG4gICAgYWRkVW5pdFByaW9yaXR5KCd3ZWVrWWVhcicsIDEpO1xuICAgIGFkZFVuaXRQcmlvcml0eSgnaXNvV2Vla1llYXInLCAxKTtcblxuXG4gICAgLy8gUEFSU0lOR1xuXG4gICAgYWRkUmVnZXhUb2tlbignRycsICAgICAgbWF0Y2hTaWduZWQpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2cnLCAgICAgIG1hdGNoU2lnbmVkKTtcbiAgICBhZGRSZWdleFRva2VuKCdHRycsICAgICBtYXRjaDF0bzIsIG1hdGNoMik7XG4gICAgYWRkUmVnZXhUb2tlbignZ2cnLCAgICAgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ0dHR0cnLCAgIG1hdGNoMXRvNCwgbWF0Y2g0KTtcbiAgICBhZGRSZWdleFRva2VuKCdnZ2dnJywgICBtYXRjaDF0bzQsIG1hdGNoNCk7XG4gICAgYWRkUmVnZXhUb2tlbignR0dHR0cnLCAgbWF0Y2gxdG82LCBtYXRjaDYpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ2dnZ2dnJywgIG1hdGNoMXRvNiwgbWF0Y2g2KTtcblxuICAgIGFkZFdlZWtQYXJzZVRva2VuKFsnZ2dnZycsICdnZ2dnZycsICdHR0dHJywgJ0dHR0dHJ10sIGZ1bmN0aW9uIChpbnB1dCwgd2VlaywgY29uZmlnLCB0b2tlbikge1xuICAgICAgICB3ZWVrW3Rva2VuLnN1YnN0cigwLCAyKV0gPSB0b0ludChpbnB1dCk7XG4gICAgfSk7XG5cbiAgICBhZGRXZWVrUGFyc2VUb2tlbihbJ2dnJywgJ0dHJ10sIGZ1bmN0aW9uIChpbnB1dCwgd2VlaywgY29uZmlnLCB0b2tlbikge1xuICAgICAgICB3ZWVrW3Rva2VuXSA9IGhvb2tzLnBhcnNlVHdvRGlnaXRZZWFyKGlucHV0KTtcbiAgICB9KTtcblxuICAgIC8vIE1PTUVOVFNcblxuICAgIGZ1bmN0aW9uIGdldFNldFdlZWtZZWFyIChpbnB1dCkge1xuICAgICAgICByZXR1cm4gZ2V0U2V0V2Vla1llYXJIZWxwZXIuY2FsbCh0aGlzLFxuICAgICAgICAgICAgICAgIGlucHV0LFxuICAgICAgICAgICAgICAgIHRoaXMud2VlaygpLFxuICAgICAgICAgICAgICAgIHRoaXMud2Vla2RheSgpLFxuICAgICAgICAgICAgICAgIHRoaXMubG9jYWxlRGF0YSgpLl93ZWVrLmRvdyxcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2FsZURhdGEoKS5fd2Vlay5kb3kpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFNldElTT1dlZWtZZWFyIChpbnB1dCkge1xuICAgICAgICByZXR1cm4gZ2V0U2V0V2Vla1llYXJIZWxwZXIuY2FsbCh0aGlzLFxuICAgICAgICAgICAgICAgIGlucHV0LCB0aGlzLmlzb1dlZWsoKSwgdGhpcy5pc29XZWVrZGF5KCksIDEsIDQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldElTT1dlZWtzSW5ZZWFyICgpIHtcbiAgICAgICAgcmV0dXJuIHdlZWtzSW5ZZWFyKHRoaXMueWVhcigpLCAxLCA0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRXZWVrc0luWWVhciAoKSB7XG4gICAgICAgIHZhciB3ZWVrSW5mbyA9IHRoaXMubG9jYWxlRGF0YSgpLl93ZWVrO1xuICAgICAgICByZXR1cm4gd2Vla3NJblllYXIodGhpcy55ZWFyKCksIHdlZWtJbmZvLmRvdywgd2Vla0luZm8uZG95KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRTZXRXZWVrWWVhckhlbHBlcihpbnB1dCwgd2Vlaywgd2Vla2RheSwgZG93LCBkb3kpIHtcbiAgICAgICAgdmFyIHdlZWtzVGFyZ2V0O1xuICAgICAgICBpZiAoaW5wdXQgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHdlZWtPZlllYXIodGhpcywgZG93LCBkb3kpLnllYXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3ZWVrc1RhcmdldCA9IHdlZWtzSW5ZZWFyKGlucHV0LCBkb3csIGRveSk7XG4gICAgICAgICAgICBpZiAod2VlayA+IHdlZWtzVGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgd2VlayA9IHdlZWtzVGFyZ2V0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNldFdlZWtBbGwuY2FsbCh0aGlzLCBpbnB1dCwgd2Vlaywgd2Vla2RheSwgZG93LCBkb3kpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0V2Vla0FsbCh3ZWVrWWVhciwgd2Vlaywgd2Vla2RheSwgZG93LCBkb3kpIHtcbiAgICAgICAgdmFyIGRheU9mWWVhckRhdGEgPSBkYXlPZlllYXJGcm9tV2Vla3Mod2Vla1llYXIsIHdlZWssIHdlZWtkYXksIGRvdywgZG95KSxcbiAgICAgICAgICAgIGRhdGUgPSBjcmVhdGVVVENEYXRlKGRheU9mWWVhckRhdGEueWVhciwgMCwgZGF5T2ZZZWFyRGF0YS5kYXlPZlllYXIpO1xuXG4gICAgICAgIHRoaXMueWVhcihkYXRlLmdldFVUQ0Z1bGxZZWFyKCkpO1xuICAgICAgICB0aGlzLm1vbnRoKGRhdGUuZ2V0VVRDTW9udGgoKSk7XG4gICAgICAgIHRoaXMuZGF0ZShkYXRlLmdldFVUQ0RhdGUoKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8vIEZPUk1BVFRJTkdcblxuICAgIGFkZEZvcm1hdFRva2VuKCdRJywgMCwgJ1FvJywgJ3F1YXJ0ZXInKTtcblxuICAgIC8vIEFMSUFTRVNcblxuICAgIGFkZFVuaXRBbGlhcygncXVhcnRlcicsICdRJyk7XG5cbiAgICAvLyBQUklPUklUWVxuXG4gICAgYWRkVW5pdFByaW9yaXR5KCdxdWFydGVyJywgNyk7XG5cbiAgICAvLyBQQVJTSU5HXG5cbiAgICBhZGRSZWdleFRva2VuKCdRJywgbWF0Y2gxKTtcbiAgICBhZGRQYXJzZVRva2VuKCdRJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSkge1xuICAgICAgICBhcnJheVtNT05USF0gPSAodG9JbnQoaW5wdXQpIC0gMSkgKiAzO1xuICAgIH0pO1xuXG4gICAgLy8gTU9NRU5UU1xuXG4gICAgZnVuY3Rpb24gZ2V0U2V0UXVhcnRlciAoaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIGlucHV0ID09IG51bGwgPyBNYXRoLmNlaWwoKHRoaXMubW9udGgoKSArIDEpIC8gMykgOiB0aGlzLm1vbnRoKChpbnB1dCAtIDEpICogMyArIHRoaXMubW9udGgoKSAlIDMpO1xuICAgIH1cblxuICAgIC8vIEZPUk1BVFRJTkdcblxuICAgIGFkZEZvcm1hdFRva2VuKCdEJywgWydERCcsIDJdLCAnRG8nLCAnZGF0ZScpO1xuXG4gICAgLy8gQUxJQVNFU1xuXG4gICAgYWRkVW5pdEFsaWFzKCdkYXRlJywgJ0QnKTtcblxuICAgIC8vIFBSSU9SSVRZXG4gICAgYWRkVW5pdFByaW9yaXR5KCdkYXRlJywgOSk7XG5cbiAgICAvLyBQQVJTSU5HXG5cbiAgICBhZGRSZWdleFRva2VuKCdEJywgIG1hdGNoMXRvMik7XG4gICAgYWRkUmVnZXhUb2tlbignREQnLCBtYXRjaDF0bzIsIG1hdGNoMik7XG4gICAgYWRkUmVnZXhUb2tlbignRG8nLCBmdW5jdGlvbiAoaXNTdHJpY3QsIGxvY2FsZSkge1xuICAgICAgICAvLyBUT0RPOiBSZW1vdmUgXCJvcmRpbmFsUGFyc2VcIiBmYWxsYmFjayBpbiBuZXh0IG1ham9yIHJlbGVhc2UuXG4gICAgICAgIHJldHVybiBpc1N0cmljdCA/XG4gICAgICAgICAgKGxvY2FsZS5fZGF5T2ZNb250aE9yZGluYWxQYXJzZSB8fCBsb2NhbGUuX29yZGluYWxQYXJzZSkgOlxuICAgICAgICAgIGxvY2FsZS5fZGF5T2ZNb250aE9yZGluYWxQYXJzZUxlbmllbnQ7XG4gICAgfSk7XG5cbiAgICBhZGRQYXJzZVRva2VuKFsnRCcsICdERCddLCBEQVRFKTtcbiAgICBhZGRQYXJzZVRva2VuKCdEbycsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXkpIHtcbiAgICAgICAgYXJyYXlbREFURV0gPSB0b0ludChpbnB1dC5tYXRjaChtYXRjaDF0bzIpWzBdKTtcbiAgICB9KTtcblxuICAgIC8vIE1PTUVOVFNcblxuICAgIHZhciBnZXRTZXREYXlPZk1vbnRoID0gbWFrZUdldFNldCgnRGF0ZScsIHRydWUpO1xuXG4gICAgLy8gRk9STUFUVElOR1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ0RERCcsIFsnRERERCcsIDNdLCAnREREbycsICdkYXlPZlllYXInKTtcblxuICAgIC8vIEFMSUFTRVNcblxuICAgIGFkZFVuaXRBbGlhcygnZGF5T2ZZZWFyJywgJ0RERCcpO1xuXG4gICAgLy8gUFJJT1JJVFlcbiAgICBhZGRVbml0UHJpb3JpdHkoJ2RheU9mWWVhcicsIDQpO1xuXG4gICAgLy8gUEFSU0lOR1xuXG4gICAgYWRkUmVnZXhUb2tlbignREREJywgIG1hdGNoMXRvMyk7XG4gICAgYWRkUmVnZXhUb2tlbignRERERCcsIG1hdGNoMyk7XG4gICAgYWRkUGFyc2VUb2tlbihbJ0RERCcsICdEREREJ10sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xuICAgICAgICBjb25maWcuX2RheU9mWWVhciA9IHRvSW50KGlucHV0KTtcbiAgICB9KTtcblxuICAgIC8vIEhFTFBFUlNcblxuICAgIC8vIE1PTUVOVFNcblxuICAgIGZ1bmN0aW9uIGdldFNldERheU9mWWVhciAoaW5wdXQpIHtcbiAgICAgICAgdmFyIGRheU9mWWVhciA9IE1hdGgucm91bmQoKHRoaXMuY2xvbmUoKS5zdGFydE9mKCdkYXknKSAtIHRoaXMuY2xvbmUoKS5zdGFydE9mKCd5ZWFyJykpIC8gODY0ZTUpICsgMTtcbiAgICAgICAgcmV0dXJuIGlucHV0ID09IG51bGwgPyBkYXlPZlllYXIgOiB0aGlzLmFkZCgoaW5wdXQgLSBkYXlPZlllYXIpLCAnZCcpO1xuICAgIH1cblxuICAgIC8vIEZPUk1BVFRJTkdcblxuICAgIGFkZEZvcm1hdFRva2VuKCdtJywgWydtbScsIDJdLCAwLCAnbWludXRlJyk7XG5cbiAgICAvLyBBTElBU0VTXG5cbiAgICBhZGRVbml0QWxpYXMoJ21pbnV0ZScsICdtJyk7XG5cbiAgICAvLyBQUklPUklUWVxuXG4gICAgYWRkVW5pdFByaW9yaXR5KCdtaW51dGUnLCAxNCk7XG5cbiAgICAvLyBQQVJTSU5HXG5cbiAgICBhZGRSZWdleFRva2VuKCdtJywgIG1hdGNoMXRvMik7XG4gICAgYWRkUmVnZXhUb2tlbignbW0nLCBtYXRjaDF0bzIsIG1hdGNoMik7XG4gICAgYWRkUGFyc2VUb2tlbihbJ20nLCAnbW0nXSwgTUlOVVRFKTtcblxuICAgIC8vIE1PTUVOVFNcblxuICAgIHZhciBnZXRTZXRNaW51dGUgPSBtYWtlR2V0U2V0KCdNaW51dGVzJywgZmFsc2UpO1xuXG4gICAgLy8gRk9STUFUVElOR1xuXG4gICAgYWRkRm9ybWF0VG9rZW4oJ3MnLCBbJ3NzJywgMl0sIDAsICdzZWNvbmQnKTtcblxuICAgIC8vIEFMSUFTRVNcblxuICAgIGFkZFVuaXRBbGlhcygnc2Vjb25kJywgJ3MnKTtcblxuICAgIC8vIFBSSU9SSVRZXG5cbiAgICBhZGRVbml0UHJpb3JpdHkoJ3NlY29uZCcsIDE1KTtcblxuICAgIC8vIFBBUlNJTkdcblxuICAgIGFkZFJlZ2V4VG9rZW4oJ3MnLCAgbWF0Y2gxdG8yKTtcbiAgICBhZGRSZWdleFRva2VuKCdzcycsIG1hdGNoMXRvMiwgbWF0Y2gyKTtcbiAgICBhZGRQYXJzZVRva2VuKFsncycsICdzcyddLCBTRUNPTkQpO1xuXG4gICAgLy8gTU9NRU5UU1xuXG4gICAgdmFyIGdldFNldFNlY29uZCA9IG1ha2VHZXRTZXQoJ1NlY29uZHMnLCBmYWxzZSk7XG5cbiAgICAvLyBGT1JNQVRUSU5HXG5cbiAgICBhZGRGb3JtYXRUb2tlbignUycsIDAsIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIH5+KHRoaXMubWlsbGlzZWNvbmQoKSAvIDEwMCk7XG4gICAgfSk7XG5cbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1NTJywgMl0sIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIH5+KHRoaXMubWlsbGlzZWNvbmQoKSAvIDEwKTtcbiAgICB9KTtcblxuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnU1NTJywgM10sIDAsICdtaWxsaXNlY29uZCcpO1xuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnU1NTUycsIDRdLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1pbGxpc2Vjb25kKCkgKiAxMDtcbiAgICB9KTtcbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1NTU1NTJywgNV0sIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWlsbGlzZWNvbmQoKSAqIDEwMDtcbiAgICB9KTtcbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1NTU1NTUycsIDZdLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1pbGxpc2Vjb25kKCkgKiAxMDAwO1xuICAgIH0pO1xuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnU1NTU1NTUycsIDddLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1pbGxpc2Vjb25kKCkgKiAxMDAwMDtcbiAgICB9KTtcbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1NTU1NTU1NTJywgOF0sIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWlsbGlzZWNvbmQoKSAqIDEwMDAwMDtcbiAgICB9KTtcbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1NTU1NTU1NTUycsIDldLCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1pbGxpc2Vjb25kKCkgKiAxMDAwMDAwO1xuICAgIH0pO1xuXG5cbiAgICAvLyBBTElBU0VTXG5cbiAgICBhZGRVbml0QWxpYXMoJ21pbGxpc2Vjb25kJywgJ21zJyk7XG5cbiAgICAvLyBQUklPUklUWVxuXG4gICAgYWRkVW5pdFByaW9yaXR5KCdtaWxsaXNlY29uZCcsIDE2KTtcblxuICAgIC8vIFBBUlNJTkdcblxuICAgIGFkZFJlZ2V4VG9rZW4oJ1MnLCAgICBtYXRjaDF0bzMsIG1hdGNoMSk7XG4gICAgYWRkUmVnZXhUb2tlbignU1MnLCAgIG1hdGNoMXRvMywgbWF0Y2gyKTtcbiAgICBhZGRSZWdleFRva2VuKCdTU1MnLCAgbWF0Y2gxdG8zLCBtYXRjaDMpO1xuXG4gICAgdmFyIHRva2VuO1xuICAgIGZvciAodG9rZW4gPSAnU1NTUyc7IHRva2VuLmxlbmd0aCA8PSA5OyB0b2tlbiArPSAnUycpIHtcbiAgICAgICAgYWRkUmVnZXhUb2tlbih0b2tlbiwgbWF0Y2hVbnNpZ25lZCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VNcyhpbnB1dCwgYXJyYXkpIHtcbiAgICAgICAgYXJyYXlbTUlMTElTRUNPTkRdID0gdG9JbnQoKCcwLicgKyBpbnB1dCkgKiAxMDAwKTtcbiAgICB9XG5cbiAgICBmb3IgKHRva2VuID0gJ1MnOyB0b2tlbi5sZW5ndGggPD0gOTsgdG9rZW4gKz0gJ1MnKSB7XG4gICAgICAgIGFkZFBhcnNlVG9rZW4odG9rZW4sIHBhcnNlTXMpO1xuICAgIH1cbiAgICAvLyBNT01FTlRTXG5cbiAgICB2YXIgZ2V0U2V0TWlsbGlzZWNvbmQgPSBtYWtlR2V0U2V0KCdNaWxsaXNlY29uZHMnLCBmYWxzZSk7XG5cbiAgICAvLyBGT1JNQVRUSU5HXG5cbiAgICBhZGRGb3JtYXRUb2tlbigneicsICAwLCAwLCAnem9uZUFiYnInKTtcbiAgICBhZGRGb3JtYXRUb2tlbignenonLCAwLCAwLCAnem9uZU5hbWUnKTtcblxuICAgIC8vIE1PTUVOVFNcblxuICAgIGZ1bmN0aW9uIGdldFpvbmVBYmJyICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzVVRDID8gJ1VUQycgOiAnJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRab25lTmFtZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc1VUQyA/ICdDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZScgOiAnJztcbiAgICB9XG5cbiAgICB2YXIgcHJvdG8gPSBNb21lbnQucHJvdG90eXBlO1xuXG4gICAgcHJvdG8uYWRkICAgICAgICAgICAgICAgPSBhZGQ7XG4gICAgcHJvdG8uY2FsZW5kYXIgICAgICAgICAgPSBjYWxlbmRhciQxO1xuICAgIHByb3RvLmNsb25lICAgICAgICAgICAgID0gY2xvbmU7XG4gICAgcHJvdG8uZGlmZiAgICAgICAgICAgICAgPSBkaWZmO1xuICAgIHByb3RvLmVuZE9mICAgICAgICAgICAgID0gZW5kT2Y7XG4gICAgcHJvdG8uZm9ybWF0ICAgICAgICAgICAgPSBmb3JtYXQ7XG4gICAgcHJvdG8uZnJvbSAgICAgICAgICAgICAgPSBmcm9tO1xuICAgIHByb3RvLmZyb21Ob3cgICAgICAgICAgID0gZnJvbU5vdztcbiAgICBwcm90by50byAgICAgICAgICAgICAgICA9IHRvO1xuICAgIHByb3RvLnRvTm93ICAgICAgICAgICAgID0gdG9Ob3c7XG4gICAgcHJvdG8uZ2V0ICAgICAgICAgICAgICAgPSBzdHJpbmdHZXQ7XG4gICAgcHJvdG8uaW52YWxpZEF0ICAgICAgICAgPSBpbnZhbGlkQXQ7XG4gICAgcHJvdG8uaXNBZnRlciAgICAgICAgICAgPSBpc0FmdGVyO1xuICAgIHByb3RvLmlzQmVmb3JlICAgICAgICAgID0gaXNCZWZvcmU7XG4gICAgcHJvdG8uaXNCZXR3ZWVuICAgICAgICAgPSBpc0JldHdlZW47XG4gICAgcHJvdG8uaXNTYW1lICAgICAgICAgICAgPSBpc1NhbWU7XG4gICAgcHJvdG8uaXNTYW1lT3JBZnRlciAgICAgPSBpc1NhbWVPckFmdGVyO1xuICAgIHByb3RvLmlzU2FtZU9yQmVmb3JlICAgID0gaXNTYW1lT3JCZWZvcmU7XG4gICAgcHJvdG8uaXNWYWxpZCAgICAgICAgICAgPSBpc1ZhbGlkJDI7XG4gICAgcHJvdG8ubGFuZyAgICAgICAgICAgICAgPSBsYW5nO1xuICAgIHByb3RvLmxvY2FsZSAgICAgICAgICAgID0gbG9jYWxlO1xuICAgIHByb3RvLmxvY2FsZURhdGEgICAgICAgID0gbG9jYWxlRGF0YTtcbiAgICBwcm90by5tYXggICAgICAgICAgICAgICA9IHByb3RvdHlwZU1heDtcbiAgICBwcm90by5taW4gICAgICAgICAgICAgICA9IHByb3RvdHlwZU1pbjtcbiAgICBwcm90by5wYXJzaW5nRmxhZ3MgICAgICA9IHBhcnNpbmdGbGFncztcbiAgICBwcm90by5zZXQgICAgICAgICAgICAgICA9IHN0cmluZ1NldDtcbiAgICBwcm90by5zdGFydE9mICAgICAgICAgICA9IHN0YXJ0T2Y7XG4gICAgcHJvdG8uc3VidHJhY3QgICAgICAgICAgPSBzdWJ0cmFjdDtcbiAgICBwcm90by50b0FycmF5ICAgICAgICAgICA9IHRvQXJyYXk7XG4gICAgcHJvdG8udG9PYmplY3QgICAgICAgICAgPSB0b09iamVjdDtcbiAgICBwcm90by50b0RhdGUgICAgICAgICAgICA9IHRvRGF0ZTtcbiAgICBwcm90by50b0lTT1N0cmluZyAgICAgICA9IHRvSVNPU3RyaW5nO1xuICAgIHByb3RvLmluc3BlY3QgICAgICAgICAgID0gaW5zcGVjdDtcbiAgICBwcm90by50b0pTT04gICAgICAgICAgICA9IHRvSlNPTjtcbiAgICBwcm90by50b1N0cmluZyAgICAgICAgICA9IHRvU3RyaW5nO1xuICAgIHByb3RvLnVuaXggICAgICAgICAgICAgID0gdW5peDtcbiAgICBwcm90by52YWx1ZU9mICAgICAgICAgICA9IHZhbHVlT2Y7XG4gICAgcHJvdG8uY3JlYXRpb25EYXRhICAgICAgPSBjcmVhdGlvbkRhdGE7XG4gICAgcHJvdG8ueWVhciAgICAgICA9IGdldFNldFllYXI7XG4gICAgcHJvdG8uaXNMZWFwWWVhciA9IGdldElzTGVhcFllYXI7XG4gICAgcHJvdG8ud2Vla1llYXIgICAgPSBnZXRTZXRXZWVrWWVhcjtcbiAgICBwcm90by5pc29XZWVrWWVhciA9IGdldFNldElTT1dlZWtZZWFyO1xuICAgIHByb3RvLnF1YXJ0ZXIgPSBwcm90by5xdWFydGVycyA9IGdldFNldFF1YXJ0ZXI7XG4gICAgcHJvdG8ubW9udGggICAgICAgPSBnZXRTZXRNb250aDtcbiAgICBwcm90by5kYXlzSW5Nb250aCA9IGdldERheXNJbk1vbnRoO1xuICAgIHByb3RvLndlZWsgICAgICAgICAgID0gcHJvdG8ud2Vla3MgICAgICAgID0gZ2V0U2V0V2VlaztcbiAgICBwcm90by5pc29XZWVrICAgICAgICA9IHByb3RvLmlzb1dlZWtzICAgICA9IGdldFNldElTT1dlZWs7XG4gICAgcHJvdG8ud2Vla3NJblllYXIgICAgPSBnZXRXZWVrc0luWWVhcjtcbiAgICBwcm90by5pc29XZWVrc0luWWVhciA9IGdldElTT1dlZWtzSW5ZZWFyO1xuICAgIHByb3RvLmRhdGUgICAgICAgPSBnZXRTZXREYXlPZk1vbnRoO1xuICAgIHByb3RvLmRheSAgICAgICAgPSBwcm90by5kYXlzICAgICAgICAgICAgID0gZ2V0U2V0RGF5T2ZXZWVrO1xuICAgIHByb3RvLndlZWtkYXkgICAgPSBnZXRTZXRMb2NhbGVEYXlPZldlZWs7XG4gICAgcHJvdG8uaXNvV2Vla2RheSA9IGdldFNldElTT0RheU9mV2VlaztcbiAgICBwcm90by5kYXlPZlllYXIgID0gZ2V0U2V0RGF5T2ZZZWFyO1xuICAgIHByb3RvLmhvdXIgPSBwcm90by5ob3VycyA9IGdldFNldEhvdXI7XG4gICAgcHJvdG8ubWludXRlID0gcHJvdG8ubWludXRlcyA9IGdldFNldE1pbnV0ZTtcbiAgICBwcm90by5zZWNvbmQgPSBwcm90by5zZWNvbmRzID0gZ2V0U2V0U2Vjb25kO1xuICAgIHByb3RvLm1pbGxpc2Vjb25kID0gcHJvdG8ubWlsbGlzZWNvbmRzID0gZ2V0U2V0TWlsbGlzZWNvbmQ7XG4gICAgcHJvdG8udXRjT2Zmc2V0ICAgICAgICAgICAgPSBnZXRTZXRPZmZzZXQ7XG4gICAgcHJvdG8udXRjICAgICAgICAgICAgICAgICAgPSBzZXRPZmZzZXRUb1VUQztcbiAgICBwcm90by5sb2NhbCAgICAgICAgICAgICAgICA9IHNldE9mZnNldFRvTG9jYWw7XG4gICAgcHJvdG8ucGFyc2Vab25lICAgICAgICAgICAgPSBzZXRPZmZzZXRUb1BhcnNlZE9mZnNldDtcbiAgICBwcm90by5oYXNBbGlnbmVkSG91ck9mZnNldCA9IGhhc0FsaWduZWRIb3VyT2Zmc2V0O1xuICAgIHByb3RvLmlzRFNUICAgICAgICAgICAgICAgID0gaXNEYXlsaWdodFNhdmluZ1RpbWU7XG4gICAgcHJvdG8uaXNMb2NhbCAgICAgICAgICAgICAgPSBpc0xvY2FsO1xuICAgIHByb3RvLmlzVXRjT2Zmc2V0ICAgICAgICAgID0gaXNVdGNPZmZzZXQ7XG4gICAgcHJvdG8uaXNVdGMgICAgICAgICAgICAgICAgPSBpc1V0YztcbiAgICBwcm90by5pc1VUQyAgICAgICAgICAgICAgICA9IGlzVXRjO1xuICAgIHByb3RvLnpvbmVBYmJyID0gZ2V0Wm9uZUFiYnI7XG4gICAgcHJvdG8uem9uZU5hbWUgPSBnZXRab25lTmFtZTtcbiAgICBwcm90by5kYXRlcyAgPSBkZXByZWNhdGUoJ2RhdGVzIGFjY2Vzc29yIGlzIGRlcHJlY2F0ZWQuIFVzZSBkYXRlIGluc3RlYWQuJywgZ2V0U2V0RGF5T2ZNb250aCk7XG4gICAgcHJvdG8ubW9udGhzID0gZGVwcmVjYXRlKCdtb250aHMgYWNjZXNzb3IgaXMgZGVwcmVjYXRlZC4gVXNlIG1vbnRoIGluc3RlYWQnLCBnZXRTZXRNb250aCk7XG4gICAgcHJvdG8ueWVhcnMgID0gZGVwcmVjYXRlKCd5ZWFycyBhY2Nlc3NvciBpcyBkZXByZWNhdGVkLiBVc2UgeWVhciBpbnN0ZWFkJywgZ2V0U2V0WWVhcik7XG4gICAgcHJvdG8uem9uZSAgID0gZGVwcmVjYXRlKCdtb21lbnQoKS56b25lIGlzIGRlcHJlY2F0ZWQsIHVzZSBtb21lbnQoKS51dGNPZmZzZXQgaW5zdGVhZC4gaHR0cDovL21vbWVudGpzLmNvbS9ndWlkZXMvIy93YXJuaW5ncy96b25lLycsIGdldFNldFpvbmUpO1xuICAgIHByb3RvLmlzRFNUU2hpZnRlZCA9IGRlcHJlY2F0ZSgnaXNEU1RTaGlmdGVkIGlzIGRlcHJlY2F0ZWQuIFNlZSBodHRwOi8vbW9tZW50anMuY29tL2d1aWRlcy8jL3dhcm5pbmdzL2RzdC1zaGlmdGVkLyBmb3IgbW9yZSBpbmZvcm1hdGlvbicsIGlzRGF5bGlnaHRTYXZpbmdUaW1lU2hpZnRlZCk7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVVbml4IChpbnB1dCkge1xuICAgICAgICByZXR1cm4gY3JlYXRlTG9jYWwoaW5wdXQgKiAxMDAwKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVJblpvbmUgKCkge1xuICAgICAgICByZXR1cm4gY3JlYXRlTG9jYWwuYXBwbHkobnVsbCwgYXJndW1lbnRzKS5wYXJzZVpvbmUoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwcmVQYXJzZVBvc3RGb3JtYXQgKHN0cmluZykge1xuICAgICAgICByZXR1cm4gc3RyaW5nO1xuICAgIH1cblxuICAgIHZhciBwcm90byQxID0gTG9jYWxlLnByb3RvdHlwZTtcblxuICAgIHByb3RvJDEuY2FsZW5kYXIgICAgICAgID0gY2FsZW5kYXI7XG4gICAgcHJvdG8kMS5sb25nRGF0ZUZvcm1hdCAgPSBsb25nRGF0ZUZvcm1hdDtcbiAgICBwcm90byQxLmludmFsaWREYXRlICAgICA9IGludmFsaWREYXRlO1xuICAgIHByb3RvJDEub3JkaW5hbCAgICAgICAgID0gb3JkaW5hbDtcbiAgICBwcm90byQxLnByZXBhcnNlICAgICAgICA9IHByZVBhcnNlUG9zdEZvcm1hdDtcbiAgICBwcm90byQxLnBvc3Rmb3JtYXQgICAgICA9IHByZVBhcnNlUG9zdEZvcm1hdDtcbiAgICBwcm90byQxLnJlbGF0aXZlVGltZSAgICA9IHJlbGF0aXZlVGltZTtcbiAgICBwcm90byQxLnBhc3RGdXR1cmUgICAgICA9IHBhc3RGdXR1cmU7XG4gICAgcHJvdG8kMS5zZXQgICAgICAgICAgICAgPSBzZXQ7XG5cbiAgICBwcm90byQxLm1vbnRocyAgICAgICAgICAgID0gICAgICAgIGxvY2FsZU1vbnRocztcbiAgICBwcm90byQxLm1vbnRoc1Nob3J0ICAgICAgID0gICAgICAgIGxvY2FsZU1vbnRoc1Nob3J0O1xuICAgIHByb3RvJDEubW9udGhzUGFyc2UgICAgICAgPSAgICAgICAgbG9jYWxlTW9udGhzUGFyc2U7XG4gICAgcHJvdG8kMS5tb250aHNSZWdleCAgICAgICA9IG1vbnRoc1JlZ2V4O1xuICAgIHByb3RvJDEubW9udGhzU2hvcnRSZWdleCAgPSBtb250aHNTaG9ydFJlZ2V4O1xuICAgIHByb3RvJDEud2VlayA9IGxvY2FsZVdlZWs7XG4gICAgcHJvdG8kMS5maXJzdERheU9mWWVhciA9IGxvY2FsZUZpcnN0RGF5T2ZZZWFyO1xuICAgIHByb3RvJDEuZmlyc3REYXlPZldlZWsgPSBsb2NhbGVGaXJzdERheU9mV2VlaztcblxuICAgIHByb3RvJDEud2Vla2RheXMgICAgICAgPSAgICAgICAgbG9jYWxlV2Vla2RheXM7XG4gICAgcHJvdG8kMS53ZWVrZGF5c01pbiAgICA9ICAgICAgICBsb2NhbGVXZWVrZGF5c01pbjtcbiAgICBwcm90byQxLndlZWtkYXlzU2hvcnQgID0gICAgICAgIGxvY2FsZVdlZWtkYXlzU2hvcnQ7XG4gICAgcHJvdG8kMS53ZWVrZGF5c1BhcnNlICA9ICAgICAgICBsb2NhbGVXZWVrZGF5c1BhcnNlO1xuXG4gICAgcHJvdG8kMS53ZWVrZGF5c1JlZ2V4ICAgICAgID0gICAgICAgIHdlZWtkYXlzUmVnZXg7XG4gICAgcHJvdG8kMS53ZWVrZGF5c1Nob3J0UmVnZXggID0gICAgICAgIHdlZWtkYXlzU2hvcnRSZWdleDtcbiAgICBwcm90byQxLndlZWtkYXlzTWluUmVnZXggICAgPSAgICAgICAgd2Vla2RheXNNaW5SZWdleDtcblxuICAgIHByb3RvJDEuaXNQTSA9IGxvY2FsZUlzUE07XG4gICAgcHJvdG8kMS5tZXJpZGllbSA9IGxvY2FsZU1lcmlkaWVtO1xuXG4gICAgZnVuY3Rpb24gZ2V0JDEgKGZvcm1hdCwgaW5kZXgsIGZpZWxkLCBzZXR0ZXIpIHtcbiAgICAgICAgdmFyIGxvY2FsZSA9IGdldExvY2FsZSgpO1xuICAgICAgICB2YXIgdXRjID0gY3JlYXRlVVRDKCkuc2V0KHNldHRlciwgaW5kZXgpO1xuICAgICAgICByZXR1cm4gbG9jYWxlW2ZpZWxkXSh1dGMsIGZvcm1hdCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGlzdE1vbnRoc0ltcGwgKGZvcm1hdCwgaW5kZXgsIGZpZWxkKSB7XG4gICAgICAgIGlmIChpc051bWJlcihmb3JtYXQpKSB7XG4gICAgICAgICAgICBpbmRleCA9IGZvcm1hdDtcbiAgICAgICAgICAgIGZvcm1hdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvcm1hdCA9IGZvcm1hdCB8fCAnJztcblxuICAgICAgICBpZiAoaW5kZXggIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGdldCQxKGZvcm1hdCwgaW5kZXgsIGZpZWxkLCAnbW9udGgnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpO1xuICAgICAgICB2YXIgb3V0ID0gW107XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCAxMjsgaSsrKSB7XG4gICAgICAgICAgICBvdXRbaV0gPSBnZXQkMShmb3JtYXQsIGksIGZpZWxkLCAnbW9udGgnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8vICgpXG4gICAgLy8gKDUpXG4gICAgLy8gKGZtdCwgNSlcbiAgICAvLyAoZm10KVxuICAgIC8vICh0cnVlKVxuICAgIC8vICh0cnVlLCA1KVxuICAgIC8vICh0cnVlLCBmbXQsIDUpXG4gICAgLy8gKHRydWUsIGZtdClcbiAgICBmdW5jdGlvbiBsaXN0V2Vla2RheXNJbXBsIChsb2NhbGVTb3J0ZWQsIGZvcm1hdCwgaW5kZXgsIGZpZWxkKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbG9jYWxlU29ydGVkID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgIGlmIChpc051bWJlcihmb3JtYXQpKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSBmb3JtYXQ7XG4gICAgICAgICAgICAgICAgZm9ybWF0ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3JtYXQgPSBmb3JtYXQgfHwgJyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3JtYXQgPSBsb2NhbGVTb3J0ZWQ7XG4gICAgICAgICAgICBpbmRleCA9IGZvcm1hdDtcbiAgICAgICAgICAgIGxvY2FsZVNvcnRlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICBpZiAoaXNOdW1iZXIoZm9ybWF0KSkge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gZm9ybWF0O1xuICAgICAgICAgICAgICAgIGZvcm1hdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9ybWF0ID0gZm9ybWF0IHx8ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGxvY2FsZSA9IGdldExvY2FsZSgpLFxuICAgICAgICAgICAgc2hpZnQgPSBsb2NhbGVTb3J0ZWQgPyBsb2NhbGUuX3dlZWsuZG93IDogMDtcblxuICAgICAgICBpZiAoaW5kZXggIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGdldCQxKGZvcm1hdCwgKGluZGV4ICsgc2hpZnQpICUgNywgZmllbGQsICdkYXknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpO1xuICAgICAgICB2YXIgb3V0ID0gW107XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCA3OyBpKyspIHtcbiAgICAgICAgICAgIG91dFtpXSA9IGdldCQxKGZvcm1hdCwgKGkgKyBzaGlmdCkgJSA3LCBmaWVsZCwgJ2RheScpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGlzdE1vbnRocyAoZm9ybWF0LCBpbmRleCkge1xuICAgICAgICByZXR1cm4gbGlzdE1vbnRoc0ltcGwoZm9ybWF0LCBpbmRleCwgJ21vbnRocycpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpc3RNb250aHNTaG9ydCAoZm9ybWF0LCBpbmRleCkge1xuICAgICAgICByZXR1cm4gbGlzdE1vbnRoc0ltcGwoZm9ybWF0LCBpbmRleCwgJ21vbnRoc1Nob3J0Jyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGlzdFdlZWtkYXlzIChsb2NhbGVTb3J0ZWQsIGZvcm1hdCwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIGxpc3RXZWVrZGF5c0ltcGwobG9jYWxlU29ydGVkLCBmb3JtYXQsIGluZGV4LCAnd2Vla2RheXMnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaXN0V2Vla2RheXNTaG9ydCAobG9jYWxlU29ydGVkLCBmb3JtYXQsIGluZGV4KSB7XG4gICAgICAgIHJldHVybiBsaXN0V2Vla2RheXNJbXBsKGxvY2FsZVNvcnRlZCwgZm9ybWF0LCBpbmRleCwgJ3dlZWtkYXlzU2hvcnQnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaXN0V2Vla2RheXNNaW4gKGxvY2FsZVNvcnRlZCwgZm9ybWF0LCBpbmRleCkge1xuICAgICAgICByZXR1cm4gbGlzdFdlZWtkYXlzSW1wbChsb2NhbGVTb3J0ZWQsIGZvcm1hdCwgaW5kZXgsICd3ZWVrZGF5c01pbicpO1xuICAgIH1cblxuICAgIGdldFNldEdsb2JhbExvY2FsZSgnZW4nLCB7XG4gICAgICAgIGRheU9mTW9udGhPcmRpbmFsUGFyc2U6IC9cXGR7MSwyfSh0aHxzdHxuZHxyZCkvLFxuICAgICAgICBvcmRpbmFsIDogZnVuY3Rpb24gKG51bWJlcikge1xuICAgICAgICAgICAgdmFyIGIgPSBudW1iZXIgJSAxMCxcbiAgICAgICAgICAgICAgICBvdXRwdXQgPSAodG9JbnQobnVtYmVyICUgMTAwIC8gMTApID09PSAxKSA/ICd0aCcgOlxuICAgICAgICAgICAgICAgIChiID09PSAxKSA/ICdzdCcgOlxuICAgICAgICAgICAgICAgIChiID09PSAyKSA/ICduZCcgOlxuICAgICAgICAgICAgICAgIChiID09PSAzKSA/ICdyZCcgOiAndGgnO1xuICAgICAgICAgICAgcmV0dXJuIG51bWJlciArIG91dHB1dDtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gU2lkZSBlZmZlY3QgaW1wb3J0c1xuXG4gICAgaG9va3MubGFuZyA9IGRlcHJlY2F0ZSgnbW9tZW50LmxhbmcgaXMgZGVwcmVjYXRlZC4gVXNlIG1vbWVudC5sb2NhbGUgaW5zdGVhZC4nLCBnZXRTZXRHbG9iYWxMb2NhbGUpO1xuICAgIGhvb2tzLmxhbmdEYXRhID0gZGVwcmVjYXRlKCdtb21lbnQubGFuZ0RhdGEgaXMgZGVwcmVjYXRlZC4gVXNlIG1vbWVudC5sb2NhbGVEYXRhIGluc3RlYWQuJywgZ2V0TG9jYWxlKTtcblxuICAgIHZhciBtYXRoQWJzID0gTWF0aC5hYnM7XG5cbiAgICBmdW5jdGlvbiBhYnMgKCkge1xuICAgICAgICB2YXIgZGF0YSAgICAgICAgICAgPSB0aGlzLl9kYXRhO1xuXG4gICAgICAgIHRoaXMuX21pbGxpc2Vjb25kcyA9IG1hdGhBYnModGhpcy5fbWlsbGlzZWNvbmRzKTtcbiAgICAgICAgdGhpcy5fZGF5cyAgICAgICAgID0gbWF0aEFicyh0aGlzLl9kYXlzKTtcbiAgICAgICAgdGhpcy5fbW9udGhzICAgICAgID0gbWF0aEFicyh0aGlzLl9tb250aHMpO1xuXG4gICAgICAgIGRhdGEubWlsbGlzZWNvbmRzICA9IG1hdGhBYnMoZGF0YS5taWxsaXNlY29uZHMpO1xuICAgICAgICBkYXRhLnNlY29uZHMgICAgICAgPSBtYXRoQWJzKGRhdGEuc2Vjb25kcyk7XG4gICAgICAgIGRhdGEubWludXRlcyAgICAgICA9IG1hdGhBYnMoZGF0YS5taW51dGVzKTtcbiAgICAgICAgZGF0YS5ob3VycyAgICAgICAgID0gbWF0aEFicyhkYXRhLmhvdXJzKTtcbiAgICAgICAgZGF0YS5tb250aHMgICAgICAgID0gbWF0aEFicyhkYXRhLm1vbnRocyk7XG4gICAgICAgIGRhdGEueWVhcnMgICAgICAgICA9IG1hdGhBYnMoZGF0YS55ZWFycyk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkU3VidHJhY3QkMSAoZHVyYXRpb24sIGlucHV0LCB2YWx1ZSwgZGlyZWN0aW9uKSB7XG4gICAgICAgIHZhciBvdGhlciA9IGNyZWF0ZUR1cmF0aW9uKGlucHV0LCB2YWx1ZSk7XG5cbiAgICAgICAgZHVyYXRpb24uX21pbGxpc2Vjb25kcyArPSBkaXJlY3Rpb24gKiBvdGhlci5fbWlsbGlzZWNvbmRzO1xuICAgICAgICBkdXJhdGlvbi5fZGF5cyAgICAgICAgICs9IGRpcmVjdGlvbiAqIG90aGVyLl9kYXlzO1xuICAgICAgICBkdXJhdGlvbi5fbW9udGhzICAgICAgICs9IGRpcmVjdGlvbiAqIG90aGVyLl9tb250aHM7XG5cbiAgICAgICAgcmV0dXJuIGR1cmF0aW9uLl9idWJibGUoKTtcbiAgICB9XG5cbiAgICAvLyBzdXBwb3J0cyBvbmx5IDIuMC1zdHlsZSBhZGQoMSwgJ3MnKSBvciBhZGQoZHVyYXRpb24pXG4gICAgZnVuY3Rpb24gYWRkJDEgKGlucHV0LCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gYWRkU3VidHJhY3QkMSh0aGlzLCBpbnB1dCwgdmFsdWUsIDEpO1xuICAgIH1cblxuICAgIC8vIHN1cHBvcnRzIG9ubHkgMi4wLXN0eWxlIHN1YnRyYWN0KDEsICdzJykgb3Igc3VidHJhY3QoZHVyYXRpb24pXG4gICAgZnVuY3Rpb24gc3VidHJhY3QkMSAoaW5wdXQsIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBhZGRTdWJ0cmFjdCQxKHRoaXMsIGlucHV0LCB2YWx1ZSwgLTEpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFic0NlaWwgKG51bWJlcikge1xuICAgICAgICBpZiAobnVtYmVyIDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IobnVtYmVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmNlaWwobnVtYmVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJ1YmJsZSAoKSB7XG4gICAgICAgIHZhciBtaWxsaXNlY29uZHMgPSB0aGlzLl9taWxsaXNlY29uZHM7XG4gICAgICAgIHZhciBkYXlzICAgICAgICAgPSB0aGlzLl9kYXlzO1xuICAgICAgICB2YXIgbW9udGhzICAgICAgID0gdGhpcy5fbW9udGhzO1xuICAgICAgICB2YXIgZGF0YSAgICAgICAgID0gdGhpcy5fZGF0YTtcbiAgICAgICAgdmFyIHNlY29uZHMsIG1pbnV0ZXMsIGhvdXJzLCB5ZWFycywgbW9udGhzRnJvbURheXM7XG5cbiAgICAgICAgLy8gaWYgd2UgaGF2ZSBhIG1peCBvZiBwb3NpdGl2ZSBhbmQgbmVnYXRpdmUgdmFsdWVzLCBidWJibGUgZG93biBmaXJzdFxuICAgICAgICAvLyBjaGVjazogaHR0cHM6Ly9naXRodWIuY29tL21vbWVudC9tb21lbnQvaXNzdWVzLzIxNjZcbiAgICAgICAgaWYgKCEoKG1pbGxpc2Vjb25kcyA+PSAwICYmIGRheXMgPj0gMCAmJiBtb250aHMgPj0gMCkgfHxcbiAgICAgICAgICAgICAgICAobWlsbGlzZWNvbmRzIDw9IDAgJiYgZGF5cyA8PSAwICYmIG1vbnRocyA8PSAwKSkpIHtcbiAgICAgICAgICAgIG1pbGxpc2Vjb25kcyArPSBhYnNDZWlsKG1vbnRoc1RvRGF5cyhtb250aHMpICsgZGF5cykgKiA4NjRlNTtcbiAgICAgICAgICAgIGRheXMgPSAwO1xuICAgICAgICAgICAgbW9udGhzID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRoZSBmb2xsb3dpbmcgY29kZSBidWJibGVzIHVwIHZhbHVlcywgc2VlIHRoZSB0ZXN0cyBmb3JcbiAgICAgICAgLy8gZXhhbXBsZXMgb2Ygd2hhdCB0aGF0IG1lYW5zLlxuICAgICAgICBkYXRhLm1pbGxpc2Vjb25kcyA9IG1pbGxpc2Vjb25kcyAlIDEwMDA7XG5cbiAgICAgICAgc2Vjb25kcyAgICAgICAgICAgPSBhYnNGbG9vcihtaWxsaXNlY29uZHMgLyAxMDAwKTtcbiAgICAgICAgZGF0YS5zZWNvbmRzICAgICAgPSBzZWNvbmRzICUgNjA7XG5cbiAgICAgICAgbWludXRlcyAgICAgICAgICAgPSBhYnNGbG9vcihzZWNvbmRzIC8gNjApO1xuICAgICAgICBkYXRhLm1pbnV0ZXMgICAgICA9IG1pbnV0ZXMgJSA2MDtcblxuICAgICAgICBob3VycyAgICAgICAgICAgICA9IGFic0Zsb29yKG1pbnV0ZXMgLyA2MCk7XG4gICAgICAgIGRhdGEuaG91cnMgICAgICAgID0gaG91cnMgJSAyNDtcblxuICAgICAgICBkYXlzICs9IGFic0Zsb29yKGhvdXJzIC8gMjQpO1xuXG4gICAgICAgIC8vIGNvbnZlcnQgZGF5cyB0byBtb250aHNcbiAgICAgICAgbW9udGhzRnJvbURheXMgPSBhYnNGbG9vcihkYXlzVG9Nb250aHMoZGF5cykpO1xuICAgICAgICBtb250aHMgKz0gbW9udGhzRnJvbURheXM7XG4gICAgICAgIGRheXMgLT0gYWJzQ2VpbChtb250aHNUb0RheXMobW9udGhzRnJvbURheXMpKTtcblxuICAgICAgICAvLyAxMiBtb250aHMgLT4gMSB5ZWFyXG4gICAgICAgIHllYXJzID0gYWJzRmxvb3IobW9udGhzIC8gMTIpO1xuICAgICAgICBtb250aHMgJT0gMTI7XG5cbiAgICAgICAgZGF0YS5kYXlzICAgPSBkYXlzO1xuICAgICAgICBkYXRhLm1vbnRocyA9IG1vbnRocztcbiAgICAgICAgZGF0YS55ZWFycyAgPSB5ZWFycztcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkYXlzVG9Nb250aHMgKGRheXMpIHtcbiAgICAgICAgLy8gNDAwIHllYXJzIGhhdmUgMTQ2MDk3IGRheXMgKHRha2luZyBpbnRvIGFjY291bnQgbGVhcCB5ZWFyIHJ1bGVzKVxuICAgICAgICAvLyA0MDAgeWVhcnMgaGF2ZSAxMiBtb250aHMgPT09IDQ4MDBcbiAgICAgICAgcmV0dXJuIGRheXMgKiA0ODAwIC8gMTQ2MDk3O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vbnRoc1RvRGF5cyAobW9udGhzKSB7XG4gICAgICAgIC8vIHRoZSByZXZlcnNlIG9mIGRheXNUb01vbnRoc1xuICAgICAgICByZXR1cm4gbW9udGhzICogMTQ2MDk3IC8gNDgwMDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhcyAodW5pdHMpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGF5cztcbiAgICAgICAgdmFyIG1vbnRocztcbiAgICAgICAgdmFyIG1pbGxpc2Vjb25kcyA9IHRoaXMuX21pbGxpc2Vjb25kcztcblxuICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKHVuaXRzKTtcblxuICAgICAgICBpZiAodW5pdHMgPT09ICdtb250aCcgfHwgdW5pdHMgPT09ICdxdWFydGVyJyB8fCB1bml0cyA9PT0gJ3llYXInKSB7XG4gICAgICAgICAgICBkYXlzID0gdGhpcy5fZGF5cyArIG1pbGxpc2Vjb25kcyAvIDg2NGU1O1xuICAgICAgICAgICAgbW9udGhzID0gdGhpcy5fbW9udGhzICsgZGF5c1RvTW9udGhzKGRheXMpO1xuICAgICAgICAgICAgc3dpdGNoICh1bml0cykge1xuICAgICAgICAgICAgICAgIGNhc2UgJ21vbnRoJzogICByZXR1cm4gbW9udGhzO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3F1YXJ0ZXInOiByZXR1cm4gbW9udGhzIC8gMztcbiAgICAgICAgICAgICAgICBjYXNlICd5ZWFyJzogICAgcmV0dXJuIG1vbnRocyAvIDEyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gaGFuZGxlIG1pbGxpc2Vjb25kcyBzZXBhcmF0ZWx5IGJlY2F1c2Ugb2YgZmxvYXRpbmcgcG9pbnQgbWF0aCBlcnJvcnMgKGlzc3VlICMxODY3KVxuICAgICAgICAgICAgZGF5cyA9IHRoaXMuX2RheXMgKyBNYXRoLnJvdW5kKG1vbnRoc1RvRGF5cyh0aGlzLl9tb250aHMpKTtcbiAgICAgICAgICAgIHN3aXRjaCAodW5pdHMpIHtcbiAgICAgICAgICAgICAgICBjYXNlICd3ZWVrJyAgIDogcmV0dXJuIGRheXMgLyA3ICAgICArIG1pbGxpc2Vjb25kcyAvIDYwNDhlNTtcbiAgICAgICAgICAgICAgICBjYXNlICdkYXknICAgIDogcmV0dXJuIGRheXMgICAgICAgICArIG1pbGxpc2Vjb25kcyAvIDg2NGU1O1xuICAgICAgICAgICAgICAgIGNhc2UgJ2hvdXInICAgOiByZXR1cm4gZGF5cyAqIDI0ICAgICsgbWlsbGlzZWNvbmRzIC8gMzZlNTtcbiAgICAgICAgICAgICAgICBjYXNlICdtaW51dGUnIDogcmV0dXJuIGRheXMgKiAxNDQwICArIG1pbGxpc2Vjb25kcyAvIDZlNDtcbiAgICAgICAgICAgICAgICBjYXNlICdzZWNvbmQnIDogcmV0dXJuIGRheXMgKiA4NjQwMCArIG1pbGxpc2Vjb25kcyAvIDEwMDA7XG4gICAgICAgICAgICAgICAgLy8gTWF0aC5mbG9vciBwcmV2ZW50cyBmbG9hdGluZyBwb2ludCBtYXRoIGVycm9ycyBoZXJlXG4gICAgICAgICAgICAgICAgY2FzZSAnbWlsbGlzZWNvbmQnOiByZXR1cm4gTWF0aC5mbG9vcihkYXlzICogODY0ZTUpICsgbWlsbGlzZWNvbmRzO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcignVW5rbm93biB1bml0ICcgKyB1bml0cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBUT0RPOiBVc2UgdGhpcy5hcygnbXMnKT9cbiAgICBmdW5jdGlvbiB2YWx1ZU9mJDEgKCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB0aGlzLl9taWxsaXNlY29uZHMgK1xuICAgICAgICAgICAgdGhpcy5fZGF5cyAqIDg2NGU1ICtcbiAgICAgICAgICAgICh0aGlzLl9tb250aHMgJSAxMikgKiAyNTkyZTYgK1xuICAgICAgICAgICAgdG9JbnQodGhpcy5fbW9udGhzIC8gMTIpICogMzE1MzZlNlxuICAgICAgICApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1ha2VBcyAoYWxpYXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFzKGFsaWFzKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICB2YXIgYXNNaWxsaXNlY29uZHMgPSBtYWtlQXMoJ21zJyk7XG4gICAgdmFyIGFzU2Vjb25kcyAgICAgID0gbWFrZUFzKCdzJyk7XG4gICAgdmFyIGFzTWludXRlcyAgICAgID0gbWFrZUFzKCdtJyk7XG4gICAgdmFyIGFzSG91cnMgICAgICAgID0gbWFrZUFzKCdoJyk7XG4gICAgdmFyIGFzRGF5cyAgICAgICAgID0gbWFrZUFzKCdkJyk7XG4gICAgdmFyIGFzV2Vla3MgICAgICAgID0gbWFrZUFzKCd3Jyk7XG4gICAgdmFyIGFzTW9udGhzICAgICAgID0gbWFrZUFzKCdNJyk7XG4gICAgdmFyIGFzUXVhcnRlcnMgICAgID0gbWFrZUFzKCdRJyk7XG4gICAgdmFyIGFzWWVhcnMgICAgICAgID0gbWFrZUFzKCd5Jyk7XG5cbiAgICBmdW5jdGlvbiBjbG9uZSQxICgpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUR1cmF0aW9uKHRoaXMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldCQyICh1bml0cykge1xuICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKHVuaXRzKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNWYWxpZCgpID8gdGhpc1t1bml0cyArICdzJ10oKSA6IE5hTjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYWtlR2V0dGVyKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlzVmFsaWQoKSA/IHRoaXMuX2RhdGFbbmFtZV0gOiBOYU47XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdmFyIG1pbGxpc2Vjb25kcyA9IG1ha2VHZXR0ZXIoJ21pbGxpc2Vjb25kcycpO1xuICAgIHZhciBzZWNvbmRzICAgICAgPSBtYWtlR2V0dGVyKCdzZWNvbmRzJyk7XG4gICAgdmFyIG1pbnV0ZXMgICAgICA9IG1ha2VHZXR0ZXIoJ21pbnV0ZXMnKTtcbiAgICB2YXIgaG91cnMgICAgICAgID0gbWFrZUdldHRlcignaG91cnMnKTtcbiAgICB2YXIgZGF5cyAgICAgICAgID0gbWFrZUdldHRlcignZGF5cycpO1xuICAgIHZhciBtb250aHMgICAgICAgPSBtYWtlR2V0dGVyKCdtb250aHMnKTtcbiAgICB2YXIgeWVhcnMgICAgICAgID0gbWFrZUdldHRlcigneWVhcnMnKTtcblxuICAgIGZ1bmN0aW9uIHdlZWtzICgpIHtcbiAgICAgICAgcmV0dXJuIGFic0Zsb29yKHRoaXMuZGF5cygpIC8gNyk7XG4gICAgfVxuXG4gICAgdmFyIHJvdW5kID0gTWF0aC5yb3VuZDtcbiAgICB2YXIgdGhyZXNob2xkcyA9IHtcbiAgICAgICAgc3M6IDQ0LCAgICAgICAgIC8vIGEgZmV3IHNlY29uZHMgdG8gc2Vjb25kc1xuICAgICAgICBzIDogNDUsICAgICAgICAgLy8gc2Vjb25kcyB0byBtaW51dGVcbiAgICAgICAgbSA6IDQ1LCAgICAgICAgIC8vIG1pbnV0ZXMgdG8gaG91clxuICAgICAgICBoIDogMjIsICAgICAgICAgLy8gaG91cnMgdG8gZGF5XG4gICAgICAgIGQgOiAyNiwgICAgICAgICAvLyBkYXlzIHRvIG1vbnRoXG4gICAgICAgIE0gOiAxMSAgICAgICAgICAvLyBtb250aHMgdG8geWVhclxuICAgIH07XG5cbiAgICAvLyBoZWxwZXIgZnVuY3Rpb24gZm9yIG1vbWVudC5mbi5mcm9tLCBtb21lbnQuZm4uZnJvbU5vdywgYW5kIG1vbWVudC5kdXJhdGlvbi5mbi5odW1hbml6ZVxuICAgIGZ1bmN0aW9uIHN1YnN0aXR1dGVUaW1lQWdvKHN0cmluZywgbnVtYmVyLCB3aXRob3V0U3VmZml4LCBpc0Z1dHVyZSwgbG9jYWxlKSB7XG4gICAgICAgIHJldHVybiBsb2NhbGUucmVsYXRpdmVUaW1lKG51bWJlciB8fCAxLCAhIXdpdGhvdXRTdWZmaXgsIHN0cmluZywgaXNGdXR1cmUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbGF0aXZlVGltZSQxIChwb3NOZWdEdXJhdGlvbiwgd2l0aG91dFN1ZmZpeCwgbG9jYWxlKSB7XG4gICAgICAgIHZhciBkdXJhdGlvbiA9IGNyZWF0ZUR1cmF0aW9uKHBvc05lZ0R1cmF0aW9uKS5hYnMoKTtcbiAgICAgICAgdmFyIHNlY29uZHMgID0gcm91bmQoZHVyYXRpb24uYXMoJ3MnKSk7XG4gICAgICAgIHZhciBtaW51dGVzICA9IHJvdW5kKGR1cmF0aW9uLmFzKCdtJykpO1xuICAgICAgICB2YXIgaG91cnMgICAgPSByb3VuZChkdXJhdGlvbi5hcygnaCcpKTtcbiAgICAgICAgdmFyIGRheXMgICAgID0gcm91bmQoZHVyYXRpb24uYXMoJ2QnKSk7XG4gICAgICAgIHZhciBtb250aHMgICA9IHJvdW5kKGR1cmF0aW9uLmFzKCdNJykpO1xuICAgICAgICB2YXIgeWVhcnMgICAgPSByb3VuZChkdXJhdGlvbi5hcygneScpKTtcblxuICAgICAgICB2YXIgYSA9IHNlY29uZHMgPD0gdGhyZXNob2xkcy5zcyAmJiBbJ3MnLCBzZWNvbmRzXSAgfHxcbiAgICAgICAgICAgICAgICBzZWNvbmRzIDwgdGhyZXNob2xkcy5zICAgJiYgWydzcycsIHNlY29uZHNdIHx8XG4gICAgICAgICAgICAgICAgbWludXRlcyA8PSAxICAgICAgICAgICAgICYmIFsnbSddICAgICAgICAgICB8fFxuICAgICAgICAgICAgICAgIG1pbnV0ZXMgPCB0aHJlc2hvbGRzLm0gICAmJiBbJ21tJywgbWludXRlc10gfHxcbiAgICAgICAgICAgICAgICBob3VycyAgIDw9IDEgICAgICAgICAgICAgJiYgWydoJ10gICAgICAgICAgIHx8XG4gICAgICAgICAgICAgICAgaG91cnMgICA8IHRocmVzaG9sZHMuaCAgICYmIFsnaGgnLCBob3Vyc10gICB8fFxuICAgICAgICAgICAgICAgIGRheXMgICAgPD0gMSAgICAgICAgICAgICAmJiBbJ2QnXSAgICAgICAgICAgfHxcbiAgICAgICAgICAgICAgICBkYXlzICAgIDwgdGhyZXNob2xkcy5kICAgJiYgWydkZCcsIGRheXNdICAgIHx8XG4gICAgICAgICAgICAgICAgbW9udGhzICA8PSAxICAgICAgICAgICAgICYmIFsnTSddICAgICAgICAgICB8fFxuICAgICAgICAgICAgICAgIG1vbnRocyAgPCB0aHJlc2hvbGRzLk0gICAmJiBbJ01NJywgbW9udGhzXSAgfHxcbiAgICAgICAgICAgICAgICB5ZWFycyAgIDw9IDEgICAgICAgICAgICAgJiYgWyd5J10gICAgICAgICAgIHx8IFsneXknLCB5ZWFyc107XG5cbiAgICAgICAgYVsyXSA9IHdpdGhvdXRTdWZmaXg7XG4gICAgICAgIGFbM10gPSArcG9zTmVnRHVyYXRpb24gPiAwO1xuICAgICAgICBhWzRdID0gbG9jYWxlO1xuICAgICAgICByZXR1cm4gc3Vic3RpdHV0ZVRpbWVBZ28uYXBwbHkobnVsbCwgYSk7XG4gICAgfVxuXG4gICAgLy8gVGhpcyBmdW5jdGlvbiBhbGxvd3MgeW91IHRvIHNldCB0aGUgcm91bmRpbmcgZnVuY3Rpb24gZm9yIHJlbGF0aXZlIHRpbWUgc3RyaW5nc1xuICAgIGZ1bmN0aW9uIGdldFNldFJlbGF0aXZlVGltZVJvdW5kaW5nIChyb3VuZGluZ0Z1bmN0aW9uKSB7XG4gICAgICAgIGlmIChyb3VuZGluZ0Z1bmN0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiByb3VuZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mKHJvdW5kaW5nRnVuY3Rpb24pID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByb3VuZCA9IHJvdW5kaW5nRnVuY3Rpb247XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gVGhpcyBmdW5jdGlvbiBhbGxvd3MgeW91IHRvIHNldCBhIHRocmVzaG9sZCBmb3IgcmVsYXRpdmUgdGltZSBzdHJpbmdzXG4gICAgZnVuY3Rpb24gZ2V0U2V0UmVsYXRpdmVUaW1lVGhyZXNob2xkICh0aHJlc2hvbGQsIGxpbWl0KSB7XG4gICAgICAgIGlmICh0aHJlc2hvbGRzW3RocmVzaG9sZF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsaW1pdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhyZXNob2xkc1t0aHJlc2hvbGRdO1xuICAgICAgICB9XG4gICAgICAgIHRocmVzaG9sZHNbdGhyZXNob2xkXSA9IGxpbWl0O1xuICAgICAgICBpZiAodGhyZXNob2xkID09PSAncycpIHtcbiAgICAgICAgICAgIHRocmVzaG9sZHMuc3MgPSBsaW1pdCAtIDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaHVtYW5pemUgKHdpdGhTdWZmaXgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLmludmFsaWREYXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbG9jYWxlID0gdGhpcy5sb2NhbGVEYXRhKCk7XG4gICAgICAgIHZhciBvdXRwdXQgPSByZWxhdGl2ZVRpbWUkMSh0aGlzLCAhd2l0aFN1ZmZpeCwgbG9jYWxlKTtcblxuICAgICAgICBpZiAod2l0aFN1ZmZpeCkge1xuICAgICAgICAgICAgb3V0cHV0ID0gbG9jYWxlLnBhc3RGdXR1cmUoK3RoaXMsIG91dHB1dCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbG9jYWxlLnBvc3Rmb3JtYXQob3V0cHV0KTtcbiAgICB9XG5cbiAgICB2YXIgYWJzJDEgPSBNYXRoLmFicztcblxuICAgIGZ1bmN0aW9uIHNpZ24oeCkge1xuICAgICAgICByZXR1cm4gKCh4ID4gMCkgLSAoeCA8IDApKSB8fCAreDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b0lTT1N0cmluZyQxKCkge1xuICAgICAgICAvLyBmb3IgSVNPIHN0cmluZ3Mgd2UgZG8gbm90IHVzZSB0aGUgbm9ybWFsIGJ1YmJsaW5nIHJ1bGVzOlxuICAgICAgICAvLyAgKiBtaWxsaXNlY29uZHMgYnViYmxlIHVwIHVudGlsIHRoZXkgYmVjb21lIGhvdXJzXG4gICAgICAgIC8vICAqIGRheXMgZG8gbm90IGJ1YmJsZSBhdCBhbGxcbiAgICAgICAgLy8gICogbW9udGhzIGJ1YmJsZSB1cCB1bnRpbCB0aGV5IGJlY29tZSB5ZWFyc1xuICAgICAgICAvLyBUaGlzIGlzIGJlY2F1c2UgdGhlcmUgaXMgbm8gY29udGV4dC1mcmVlIGNvbnZlcnNpb24gYmV0d2VlbiBob3VycyBhbmQgZGF5c1xuICAgICAgICAvLyAodGhpbmsgb2YgY2xvY2sgY2hhbmdlcylcbiAgICAgICAgLy8gYW5kIGFsc28gbm90IGJldHdlZW4gZGF5cyBhbmQgbW9udGhzICgyOC0zMSBkYXlzIHBlciBtb250aClcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLmludmFsaWREYXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc2Vjb25kcyA9IGFicyQxKHRoaXMuX21pbGxpc2Vjb25kcykgLyAxMDAwO1xuICAgICAgICB2YXIgZGF5cyAgICAgICAgID0gYWJzJDEodGhpcy5fZGF5cyk7XG4gICAgICAgIHZhciBtb250aHMgICAgICAgPSBhYnMkMSh0aGlzLl9tb250aHMpO1xuICAgICAgICB2YXIgbWludXRlcywgaG91cnMsIHllYXJzO1xuXG4gICAgICAgIC8vIDM2MDAgc2Vjb25kcyAtPiA2MCBtaW51dGVzIC0+IDEgaG91clxuICAgICAgICBtaW51dGVzICAgICAgICAgICA9IGFic0Zsb29yKHNlY29uZHMgLyA2MCk7XG4gICAgICAgIGhvdXJzICAgICAgICAgICAgID0gYWJzRmxvb3IobWludXRlcyAvIDYwKTtcbiAgICAgICAgc2Vjb25kcyAlPSA2MDtcbiAgICAgICAgbWludXRlcyAlPSA2MDtcblxuICAgICAgICAvLyAxMiBtb250aHMgLT4gMSB5ZWFyXG4gICAgICAgIHllYXJzICA9IGFic0Zsb29yKG1vbnRocyAvIDEyKTtcbiAgICAgICAgbW9udGhzICU9IDEyO1xuXG5cbiAgICAgICAgLy8gaW5zcGlyZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL2RvcmRpbGxlL21vbWVudC1pc29kdXJhdGlvbi9ibG9iL21hc3Rlci9tb21lbnQuaXNvZHVyYXRpb24uanNcbiAgICAgICAgdmFyIFkgPSB5ZWFycztcbiAgICAgICAgdmFyIE0gPSBtb250aHM7XG4gICAgICAgIHZhciBEID0gZGF5cztcbiAgICAgICAgdmFyIGggPSBob3VycztcbiAgICAgICAgdmFyIG0gPSBtaW51dGVzO1xuICAgICAgICB2YXIgcyA9IHNlY29uZHMgPyBzZWNvbmRzLnRvRml4ZWQoMykucmVwbGFjZSgvXFwuPzArJC8sICcnKSA6ICcnO1xuICAgICAgICB2YXIgdG90YWwgPSB0aGlzLmFzU2Vjb25kcygpO1xuXG4gICAgICAgIGlmICghdG90YWwpIHtcbiAgICAgICAgICAgIC8vIHRoaXMgaXMgdGhlIHNhbWUgYXMgQyMncyAoTm9kYSkgYW5kIHB5dGhvbiAoaXNvZGF0ZSkuLi5cbiAgICAgICAgICAgIC8vIGJ1dCBub3Qgb3RoZXIgSlMgKGdvb2cuZGF0ZSlcbiAgICAgICAgICAgIHJldHVybiAnUDBEJztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0b3RhbFNpZ24gPSB0b3RhbCA8IDAgPyAnLScgOiAnJztcbiAgICAgICAgdmFyIHltU2lnbiA9IHNpZ24odGhpcy5fbW9udGhzKSAhPT0gc2lnbih0b3RhbCkgPyAnLScgOiAnJztcbiAgICAgICAgdmFyIGRheXNTaWduID0gc2lnbih0aGlzLl9kYXlzKSAhPT0gc2lnbih0b3RhbCkgPyAnLScgOiAnJztcbiAgICAgICAgdmFyIGhtc1NpZ24gPSBzaWduKHRoaXMuX21pbGxpc2Vjb25kcykgIT09IHNpZ24odG90YWwpID8gJy0nIDogJyc7XG5cbiAgICAgICAgcmV0dXJuIHRvdGFsU2lnbiArICdQJyArXG4gICAgICAgICAgICAoWSA/IHltU2lnbiArIFkgKyAnWScgOiAnJykgK1xuICAgICAgICAgICAgKE0gPyB5bVNpZ24gKyBNICsgJ00nIDogJycpICtcbiAgICAgICAgICAgIChEID8gZGF5c1NpZ24gKyBEICsgJ0QnIDogJycpICtcbiAgICAgICAgICAgICgoaCB8fCBtIHx8IHMpID8gJ1QnIDogJycpICtcbiAgICAgICAgICAgIChoID8gaG1zU2lnbiArIGggKyAnSCcgOiAnJykgK1xuICAgICAgICAgICAgKG0gPyBobXNTaWduICsgbSArICdNJyA6ICcnKSArXG4gICAgICAgICAgICAocyA/IGhtc1NpZ24gKyBzICsgJ1MnIDogJycpO1xuICAgIH1cblxuICAgIHZhciBwcm90byQyID0gRHVyYXRpb24ucHJvdG90eXBlO1xuXG4gICAgcHJvdG8kMi5pc1ZhbGlkICAgICAgICA9IGlzVmFsaWQkMTtcbiAgICBwcm90byQyLmFicyAgICAgICAgICAgID0gYWJzO1xuICAgIHByb3RvJDIuYWRkICAgICAgICAgICAgPSBhZGQkMTtcbiAgICBwcm90byQyLnN1YnRyYWN0ICAgICAgID0gc3VidHJhY3QkMTtcbiAgICBwcm90byQyLmFzICAgICAgICAgICAgID0gYXM7XG4gICAgcHJvdG8kMi5hc01pbGxpc2Vjb25kcyA9IGFzTWlsbGlzZWNvbmRzO1xuICAgIHByb3RvJDIuYXNTZWNvbmRzICAgICAgPSBhc1NlY29uZHM7XG4gICAgcHJvdG8kMi5hc01pbnV0ZXMgICAgICA9IGFzTWludXRlcztcbiAgICBwcm90byQyLmFzSG91cnMgICAgICAgID0gYXNIb3VycztcbiAgICBwcm90byQyLmFzRGF5cyAgICAgICAgID0gYXNEYXlzO1xuICAgIHByb3RvJDIuYXNXZWVrcyAgICAgICAgPSBhc1dlZWtzO1xuICAgIHByb3RvJDIuYXNNb250aHMgICAgICAgPSBhc01vbnRocztcbiAgICBwcm90byQyLmFzUXVhcnRlcnMgICAgID0gYXNRdWFydGVycztcbiAgICBwcm90byQyLmFzWWVhcnMgICAgICAgID0gYXNZZWFycztcbiAgICBwcm90byQyLnZhbHVlT2YgICAgICAgID0gdmFsdWVPZiQxO1xuICAgIHByb3RvJDIuX2J1YmJsZSAgICAgICAgPSBidWJibGU7XG4gICAgcHJvdG8kMi5jbG9uZSAgICAgICAgICA9IGNsb25lJDE7XG4gICAgcHJvdG8kMi5nZXQgICAgICAgICAgICA9IGdldCQyO1xuICAgIHByb3RvJDIubWlsbGlzZWNvbmRzICAgPSBtaWxsaXNlY29uZHM7XG4gICAgcHJvdG8kMi5zZWNvbmRzICAgICAgICA9IHNlY29uZHM7XG4gICAgcHJvdG8kMi5taW51dGVzICAgICAgICA9IG1pbnV0ZXM7XG4gICAgcHJvdG8kMi5ob3VycyAgICAgICAgICA9IGhvdXJzO1xuICAgIHByb3RvJDIuZGF5cyAgICAgICAgICAgPSBkYXlzO1xuICAgIHByb3RvJDIud2Vla3MgICAgICAgICAgPSB3ZWVrcztcbiAgICBwcm90byQyLm1vbnRocyAgICAgICAgID0gbW9udGhzO1xuICAgIHByb3RvJDIueWVhcnMgICAgICAgICAgPSB5ZWFycztcbiAgICBwcm90byQyLmh1bWFuaXplICAgICAgID0gaHVtYW5pemU7XG4gICAgcHJvdG8kMi50b0lTT1N0cmluZyAgICA9IHRvSVNPU3RyaW5nJDE7XG4gICAgcHJvdG8kMi50b1N0cmluZyAgICAgICA9IHRvSVNPU3RyaW5nJDE7XG4gICAgcHJvdG8kMi50b0pTT04gICAgICAgICA9IHRvSVNPU3RyaW5nJDE7XG4gICAgcHJvdG8kMi5sb2NhbGUgICAgICAgICA9IGxvY2FsZTtcbiAgICBwcm90byQyLmxvY2FsZURhdGEgICAgID0gbG9jYWxlRGF0YTtcblxuICAgIHByb3RvJDIudG9Jc29TdHJpbmcgPSBkZXByZWNhdGUoJ3RvSXNvU3RyaW5nKCkgaXMgZGVwcmVjYXRlZC4gUGxlYXNlIHVzZSB0b0lTT1N0cmluZygpIGluc3RlYWQgKG5vdGljZSB0aGUgY2FwaXRhbHMpJywgdG9JU09TdHJpbmckMSk7XG4gICAgcHJvdG8kMi5sYW5nID0gbGFuZztcblxuICAgIC8vIFNpZGUgZWZmZWN0IGltcG9ydHNcblxuICAgIC8vIEZPUk1BVFRJTkdcblxuICAgIGFkZEZvcm1hdFRva2VuKCdYJywgMCwgMCwgJ3VuaXgnKTtcbiAgICBhZGRGb3JtYXRUb2tlbigneCcsIDAsIDAsICd2YWx1ZU9mJyk7XG5cbiAgICAvLyBQQVJTSU5HXG5cbiAgICBhZGRSZWdleFRva2VuKCd4JywgbWF0Y2hTaWduZWQpO1xuICAgIGFkZFJlZ2V4VG9rZW4oJ1gnLCBtYXRjaFRpbWVzdGFtcCk7XG4gICAgYWRkUGFyc2VUb2tlbignWCcsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xuICAgICAgICBjb25maWcuX2QgPSBuZXcgRGF0ZShwYXJzZUZsb2F0KGlucHV0LCAxMCkgKiAxMDAwKTtcbiAgICB9KTtcbiAgICBhZGRQYXJzZVRva2VuKCd4JywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XG4gICAgICAgIGNvbmZpZy5fZCA9IG5ldyBEYXRlKHRvSW50KGlucHV0KSk7XG4gICAgfSk7XG5cbiAgICAvLyBTaWRlIGVmZmVjdCBpbXBvcnRzXG5cblxuICAgIGhvb2tzLnZlcnNpb24gPSAnMi4yNC4wJztcblxuICAgIHNldEhvb2tDYWxsYmFjayhjcmVhdGVMb2NhbCk7XG5cbiAgICBob29rcy5mbiAgICAgICAgICAgICAgICAgICAgPSBwcm90bztcbiAgICBob29rcy5taW4gICAgICAgICAgICAgICAgICAgPSBtaW47XG4gICAgaG9va3MubWF4ICAgICAgICAgICAgICAgICAgID0gbWF4O1xuICAgIGhvb2tzLm5vdyAgICAgICAgICAgICAgICAgICA9IG5vdztcbiAgICBob29rcy51dGMgICAgICAgICAgICAgICAgICAgPSBjcmVhdGVVVEM7XG4gICAgaG9va3MudW5peCAgICAgICAgICAgICAgICAgID0gY3JlYXRlVW5peDtcbiAgICBob29rcy5tb250aHMgICAgICAgICAgICAgICAgPSBsaXN0TW9udGhzO1xuICAgIGhvb2tzLmlzRGF0ZSAgICAgICAgICAgICAgICA9IGlzRGF0ZTtcbiAgICBob29rcy5sb2NhbGUgICAgICAgICAgICAgICAgPSBnZXRTZXRHbG9iYWxMb2NhbGU7XG4gICAgaG9va3MuaW52YWxpZCAgICAgICAgICAgICAgID0gY3JlYXRlSW52YWxpZDtcbiAgICBob29rcy5kdXJhdGlvbiAgICAgICAgICAgICAgPSBjcmVhdGVEdXJhdGlvbjtcbiAgICBob29rcy5pc01vbWVudCAgICAgICAgICAgICAgPSBpc01vbWVudDtcbiAgICBob29rcy53ZWVrZGF5cyAgICAgICAgICAgICAgPSBsaXN0V2Vla2RheXM7XG4gICAgaG9va3MucGFyc2Vab25lICAgICAgICAgICAgID0gY3JlYXRlSW5ab25lO1xuICAgIGhvb2tzLmxvY2FsZURhdGEgICAgICAgICAgICA9IGdldExvY2FsZTtcbiAgICBob29rcy5pc0R1cmF0aW9uICAgICAgICAgICAgPSBpc0R1cmF0aW9uO1xuICAgIGhvb2tzLm1vbnRoc1Nob3J0ICAgICAgICAgICA9IGxpc3RNb250aHNTaG9ydDtcbiAgICBob29rcy53ZWVrZGF5c01pbiAgICAgICAgICAgPSBsaXN0V2Vla2RheXNNaW47XG4gICAgaG9va3MuZGVmaW5lTG9jYWxlICAgICAgICAgID0gZGVmaW5lTG9jYWxlO1xuICAgIGhvb2tzLnVwZGF0ZUxvY2FsZSAgICAgICAgICA9IHVwZGF0ZUxvY2FsZTtcbiAgICBob29rcy5sb2NhbGVzICAgICAgICAgICAgICAgPSBsaXN0TG9jYWxlcztcbiAgICBob29rcy53ZWVrZGF5c1Nob3J0ICAgICAgICAgPSBsaXN0V2Vla2RheXNTaG9ydDtcbiAgICBob29rcy5ub3JtYWxpemVVbml0cyAgICAgICAgPSBub3JtYWxpemVVbml0cztcbiAgICBob29rcy5yZWxhdGl2ZVRpbWVSb3VuZGluZyAgPSBnZXRTZXRSZWxhdGl2ZVRpbWVSb3VuZGluZztcbiAgICBob29rcy5yZWxhdGl2ZVRpbWVUaHJlc2hvbGQgPSBnZXRTZXRSZWxhdGl2ZVRpbWVUaHJlc2hvbGQ7XG4gICAgaG9va3MuY2FsZW5kYXJGb3JtYXQgICAgICAgID0gZ2V0Q2FsZW5kYXJGb3JtYXQ7XG4gICAgaG9va3MucHJvdG90eXBlICAgICAgICAgICAgID0gcHJvdG87XG5cbiAgICAvLyBjdXJyZW50bHkgSFRNTDUgaW5wdXQgdHlwZSBvbmx5IHN1cHBvcnRzIDI0LWhvdXIgZm9ybWF0c1xuICAgIGhvb2tzLkhUTUw1X0ZNVCA9IHtcbiAgICAgICAgREFURVRJTUVfTE9DQUw6ICdZWVlZLU1NLUREVEhIOm1tJywgICAgICAgICAgICAgLy8gPGlucHV0IHR5cGU9XCJkYXRldGltZS1sb2NhbFwiIC8+XG4gICAgICAgIERBVEVUSU1FX0xPQ0FMX1NFQ09ORFM6ICdZWVlZLU1NLUREVEhIOm1tOnNzJywgIC8vIDxpbnB1dCB0eXBlPVwiZGF0ZXRpbWUtbG9jYWxcIiBzdGVwPVwiMVwiIC8+XG4gICAgICAgIERBVEVUSU1FX0xPQ0FMX01TOiAnWVlZWS1NTS1ERFRISDptbTpzcy5TU1MnLCAgIC8vIDxpbnB1dCB0eXBlPVwiZGF0ZXRpbWUtbG9jYWxcIiBzdGVwPVwiMC4wMDFcIiAvPlxuICAgICAgICBEQVRFOiAnWVlZWS1NTS1ERCcsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8aW5wdXQgdHlwZT1cImRhdGVcIiAvPlxuICAgICAgICBUSU1FOiAnSEg6bW0nLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8aW5wdXQgdHlwZT1cInRpbWVcIiAvPlxuICAgICAgICBUSU1FX1NFQ09ORFM6ICdISDptbTpzcycsICAgICAgICAgICAgICAgICAgICAgICAvLyA8aW5wdXQgdHlwZT1cInRpbWVcIiBzdGVwPVwiMVwiIC8+XG4gICAgICAgIFRJTUVfTVM6ICdISDptbTpzcy5TU1MnLCAgICAgICAgICAgICAgICAgICAgICAgIC8vIDxpbnB1dCB0eXBlPVwidGltZVwiIHN0ZXA9XCIwLjAwMVwiIC8+XG4gICAgICAgIFdFRUs6ICdHR0dHLVtXXVdXJywgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDxpbnB1dCB0eXBlPVwid2Vla1wiIC8+XG4gICAgICAgIE1PTlRIOiAnWVlZWS1NTScgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDxpbnB1dCB0eXBlPVwibW9udGhcIiAvPlxuICAgIH07XG5cbiAgICByZXR1cm4gaG9va3M7XG5cbn0pKSk7XG4iLCJpbXBvcnQgZm9ybWF0IGZyb20gJy4vZm9ybWF0JztcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcblxuZnVuY3Rpb24gdXNTdGF0cyhkYXRhKSB7XG4gIHJldHVybiBwYXJzZVN0YXRzKGRhdGEuZGF0YVswXSk7XG59XG5cbmZ1bmN0aW9uIHN0YXRlU3RhdHMoc3RhdGUsIGRhdGEpIHtcbiAgY29uc3Qgc3RhdGVSYXdEYXRhID0gZGF0YS5kYXRhLmZpbmQoKGQpID0+IGQuU3RhdGUgPT09IHN0YXRlKTtcbiAgY29uc29sZS5sb2coc3RhdGVSYXdEYXRhKTtcblxuICByZXR1cm4gcGFyc2VTdGF0cyhzdGF0ZVJhd0RhdGEpO1xufVxuXG5mdW5jdGlvbiBwYXJzZVN0YXRzKHJhd1N0YXRzKSB7XG4gIHJldHVybiB7XG4gICAgaWROYXRpb246IGZvcm1hdC5zdHJpbmcocmF3U3RhdHNbXCJJRCBOYXRpb25cIl0pLFxuICAgIG5hdGlvbjogZm9ybWF0LnN0cmluZyhyYXdTdGF0cy5OYXRpb24pLFxuICAgIGlkWWVhcjogZm9ybWF0LnN0cmluZyhyYXdTdGF0c1tcIklEIFllYXJcIl0pLFxuICAgIHllYXI6IHJhd1N0YXRzLlllYXIsXG4gICAgcG9wdWxhdGlvbjogZm9ybWF0Lm51bWJlcihyYXdTdGF0cy5Qb3B1bGF0aW9uKSxcbiAgICBzbHVnTmF0aW9uOiBmb3JtYXQuc3RyaW5nKHJhd1N0YXRzW1wiU2x1ZyBOYXRpb25cIl0pXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdXNTdGF0cyxcbiAgc3RhdGVTdGF0cyxcbn07XG4iLCJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0IHBhcnNlcnMgZnJvbSAnLi9wYXJzZXJzJztcblxuYXN5bmMgZnVuY3Rpb24gdXNTdGF0cygpIHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5nZXQoXG4gICAgJ2h0dHBzOi8vZGF0YXVzYS5pby9hcGkvZGF0YT9kcmlsbGRvd25zPU5hdGlvbiZtZWFzdXJlcz1Qb3B1bGF0aW9uJnllYXI9bGF0ZXN0J1xuICApO1xuXG4gIHJldHVybiBwYXJzZXJzLnVzU3RhdHMocmVzcG9uc2UuZGF0YSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHN0YXRlU3RhdHMoc3RhdGUpIHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5nZXQoXG4gICAgJ2h0dHBzOi8vZGF0YXVzYS5pby9hcGkvZGF0YT9kcmlsbGRvd25zPVN0YXRlJm1lYXN1cmVzPVBvcHVsYXRpb24meWVhcj1sYXRlc3QnXG4gICk7XG5cbiAgcmV0dXJuIHBhcnNlcnMuc3RhdGVTdGF0cyhzdGF0ZSwgcmVzcG9uc2UuZGF0YSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdXNTdGF0cyxcbiAgc3RhdGVTdGF0cyxcbn07XG4iLCI8c2NyaXB0PlxuICBleHBvcnQgbGV0IGlkTmF0aW9uO1xuICBleHBvcnQgbGV0IG5hdGlvbjtcbiAgZXhwb3J0IGxldCBpZFllYXI7XG4gIGV4cG9ydCBsZXQgeWVhcjtcbiAgZXhwb3J0IGxldCBwb3B1bGF0aW9uO1xuICBleHBvcnQgbGV0IHNsdWdOYXRpb247XG48L3NjcmlwdD5cblxuPHN0eWxlPlxuICAuY29sdW1ucyB7XG4gICAgYm9yZGVyOiBzb2xpZCAxcHggYmxhY2s7XG4gIH1cbjwvc3R5bGU+XG5cbjxkaXYgY2xhc3M9XCJzZWN0aW9uXCI+XG4gIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICA8ZGl2IGNsYXNzPVwiY29sdW1uc1wiPlxuICAgICAgPGgyIGNsYXNzPVwiaXMtMiBjb2x1bW5cIj48Yj5JRCBOYXRpb246PC9iPiB7aWROYXRpb259PC9oMj5cbiAgICAgIDxoMiBjbGFzcz1cImlzLTIgY29sdW1uXCI+PGI+TmF0aW9uOjwvYj4ge25hdGlvbn08L2gyPlxuICAgICAgPGgyIGNsYXNzPVwiaXMtMiBjb2x1bW5cIj48Yj5JRCBZZWFyOjwvYj4ge2lkWWVhcn08L2gyPlxuICAgICAgPGgyIGNsYXNzPVwiaXMtMiBjb2x1bW5cIj48Yj5ZZWFyOjwvYj4ge3llYXJ9PC9oMj5cbiAgICAgIDxoMiBjbGFzcz1cImlzLTIgY29sdW1uXCI+PGI+UG9wdWxhdGlvbjo8L2I+IHtwb3B1bGF0aW9ufTwvaDI+XG4gICAgICA8aDIgY2xhc3M9XCJpcy0yIGNvbHVtblwiPjxiPlNsdWcgTmF0aW9uOjwvYj4ge3NsdWdOYXRpb259PC9oMj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cbiJdLCJuYW1lcyI6WyJjb29raWVzIiwicmVxdWlyZSQkMCIsInJlcXVpcmUkJDEiLCJkZWZhdWx0cyIsIkludGVyY2VwdG9yTWFuYWdlciIsIkNhbmNlbCIsIkF4aW9zIiwicmVxdWlyZSQkMiIsInJlcXVpcmUkJDMiLCJ0aGlzIiwicmVxdWlyZSIsInVzU3RhdHMiLCJheGlvcyIsInN0YXRlU3RhdHMiXSwibWFwcGluZ3MiOiI7O0FBRUEsUUFBYyxHQUFHLFNBQVMsSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUU7QUFDNUMsRUFBRSxPQUFPLFNBQVMsSUFBSSxHQUFHO0FBQ3pCLElBQUksSUFBSSxJQUFJLEdBQUcsSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzNDLElBQUksS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDMUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzdCLEtBQUs7QUFDTCxJQUFJLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDbkMsR0FBRyxDQUFDO0FBQ0osQ0FBQzs7QUNORDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxPQUFPLENBQUMsR0FBRyxFQUFFO0FBQ3RCLEVBQUUsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLGdCQUFnQixDQUFDO0FBQ2pELENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsV0FBVyxDQUFDLEdBQUcsRUFBRTtBQUMxQixFQUFFLE9BQU8sT0FBTyxHQUFHLEtBQUssV0FBVyxDQUFDO0FBQ3BDLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsUUFBUSxDQUFDLEdBQUcsRUFBRTtBQUN2QixFQUFFLE9BQU8sR0FBRyxLQUFLLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsV0FBVyxLQUFLLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDO0FBQ3ZHLE9BQU8sT0FBTyxHQUFHLENBQUMsV0FBVyxDQUFDLFFBQVEsS0FBSyxVQUFVLElBQUksR0FBRyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdkYsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxhQUFhLENBQUMsR0FBRyxFQUFFO0FBQzVCLEVBQUUsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLHNCQUFzQixDQUFDO0FBQ3ZELENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsVUFBVSxDQUFDLEdBQUcsRUFBRTtBQUN6QixFQUFFLE9BQU8sQ0FBQyxPQUFPLFFBQVEsS0FBSyxXQUFXLE1BQU0sR0FBRyxZQUFZLFFBQVEsQ0FBQyxDQUFDO0FBQ3hFLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsaUJBQWlCLENBQUMsR0FBRyxFQUFFO0FBQ2hDLEVBQUUsSUFBSSxNQUFNLENBQUM7QUFDYixFQUFFLElBQUksQ0FBQyxPQUFPLFdBQVcsS0FBSyxXQUFXLE1BQU0sV0FBVyxDQUFDLE1BQU0sQ0FBQyxFQUFFO0FBQ3BFLElBQUksTUFBTSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDckMsR0FBRyxNQUFNO0FBQ1QsSUFBSSxNQUFNLEdBQUcsQ0FBQyxHQUFHLE1BQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxNQUFNLFlBQVksV0FBVyxDQUFDLENBQUM7QUFDMUUsR0FBRztBQUNILEVBQUUsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxRQUFRLENBQUMsR0FBRyxFQUFFO0FBQ3ZCLEVBQUUsT0FBTyxPQUFPLEdBQUcsS0FBSyxRQUFRLENBQUM7QUFDakMsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxRQUFRLENBQUMsR0FBRyxFQUFFO0FBQ3ZCLEVBQUUsT0FBTyxPQUFPLEdBQUcsS0FBSyxRQUFRLENBQUM7QUFDakMsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxRQUFRLENBQUMsR0FBRyxFQUFFO0FBQ3ZCLEVBQUUsT0FBTyxHQUFHLEtBQUssSUFBSSxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsQ0FBQztBQUNqRCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLE1BQU0sQ0FBQyxHQUFHLEVBQUU7QUFDckIsRUFBRSxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssZUFBZSxDQUFDO0FBQ2hELENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsTUFBTSxDQUFDLEdBQUcsRUFBRTtBQUNyQixFQUFFLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxlQUFlLENBQUM7QUFDaEQsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxNQUFNLENBQUMsR0FBRyxFQUFFO0FBQ3JCLEVBQUUsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLGVBQWUsQ0FBQztBQUNoRCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLFVBQVUsQ0FBQyxHQUFHLEVBQUU7QUFDekIsRUFBRSxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssbUJBQW1CLENBQUM7QUFDcEQsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxRQUFRLENBQUMsR0FBRyxFQUFFO0FBQ3ZCLEVBQUUsT0FBTyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMvQyxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtBQUNoQyxFQUFFLE9BQU8sT0FBTyxlQUFlLEtBQUssV0FBVyxJQUFJLEdBQUcsWUFBWSxlQUFlLENBQUM7QUFDbEYsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxJQUFJLENBQUMsR0FBRyxFQUFFO0FBQ25CLEVBQUUsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3JELENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsb0JBQW9CLEdBQUc7QUFDaEMsRUFBRSxJQUFJLE9BQU8sU0FBUyxLQUFLLFdBQVcsS0FBSyxTQUFTLENBQUMsT0FBTyxLQUFLLGFBQWE7QUFDOUUsMkNBQTJDLFNBQVMsQ0FBQyxPQUFPLEtBQUssY0FBYztBQUMvRSwyQ0FBMkMsU0FBUyxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsRUFBRTtBQUN4RSxJQUFJLE9BQU8sS0FBSyxDQUFDO0FBQ2pCLEdBQUc7QUFDSCxFQUFFO0FBQ0YsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXO0FBQ2pDLElBQUksT0FBTyxRQUFRLEtBQUssV0FBVztBQUNuQyxJQUFJO0FBQ0osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRTtBQUMxQjtBQUNBLEVBQUUsSUFBSSxHQUFHLEtBQUssSUFBSSxJQUFJLE9BQU8sR0FBRyxLQUFLLFdBQVcsRUFBRTtBQUNsRCxJQUFJLE9BQU87QUFDWCxHQUFHO0FBQ0g7QUFDQTtBQUNBLEVBQUUsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUU7QUFDL0I7QUFDQSxJQUFJLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2hCLEdBQUc7QUFDSDtBQUNBLEVBQUUsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDcEI7QUFDQSxJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDaEQsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ3BDLEtBQUs7QUFDTCxHQUFHLE1BQU07QUFDVDtBQUNBLElBQUksS0FBSyxJQUFJLEdBQUcsSUFBSSxHQUFHLEVBQUU7QUFDekIsTUFBTSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUU7QUFDMUQsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQzFDLE9BQU87QUFDUCxLQUFLO0FBQ0wsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLEtBQUssOEJBQThCO0FBQzVDLEVBQUUsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ2xCLEVBQUUsU0FBUyxXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUNqQyxJQUFJLElBQUksT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssUUFBUSxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRTtBQUNwRSxNQUFNLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQzVDLEtBQUssTUFBTTtBQUNYLE1BQU0sTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUN4QixLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0EsRUFBRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3BELElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUN2QyxHQUFHO0FBQ0gsRUFBRSxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxTQUFTLDhCQUE4QjtBQUNoRCxFQUFFLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNsQixFQUFFLFNBQVMsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUU7QUFDakMsSUFBSSxJQUFJLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFFBQVEsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUU7QUFDcEUsTUFBTSxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNoRCxLQUFLLE1BQU0sSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUU7QUFDeEMsTUFBTSxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUN2QyxLQUFLLE1BQU07QUFDWCxNQUFNLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDeEIsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBLEVBQUUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNwRCxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFDdkMsR0FBRztBQUNILEVBQUUsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFO0FBQy9CLEVBQUUsT0FBTyxDQUFDLENBQUMsRUFBRSxTQUFTLFdBQVcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFO0FBQzVDLElBQUksSUFBSSxPQUFPLElBQUksT0FBTyxHQUFHLEtBQUssVUFBVSxFQUFFO0FBQzlDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDbEMsS0FBSyxNQUFNO0FBQ1gsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ25CLEtBQUs7QUFDTCxHQUFHLENBQUMsQ0FBQztBQUNMLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDWCxDQUFDO0FBQ0Q7QUFDQSxTQUFjLEdBQUc7QUFDakIsRUFBRSxPQUFPLEVBQUUsT0FBTztBQUNsQixFQUFFLGFBQWEsRUFBRSxhQUFhO0FBQzlCLEVBQUUsUUFBUSxFQUFFLFFBQVE7QUFDcEIsRUFBRSxVQUFVLEVBQUUsVUFBVTtBQUN4QixFQUFFLGlCQUFpQixFQUFFLGlCQUFpQjtBQUN0QyxFQUFFLFFBQVEsRUFBRSxRQUFRO0FBQ3BCLEVBQUUsUUFBUSxFQUFFLFFBQVE7QUFDcEIsRUFBRSxRQUFRLEVBQUUsUUFBUTtBQUNwQixFQUFFLFdBQVcsRUFBRSxXQUFXO0FBQzFCLEVBQUUsTUFBTSxFQUFFLE1BQU07QUFDaEIsRUFBRSxNQUFNLEVBQUUsTUFBTTtBQUNoQixFQUFFLE1BQU0sRUFBRSxNQUFNO0FBQ2hCLEVBQUUsVUFBVSxFQUFFLFVBQVU7QUFDeEIsRUFBRSxRQUFRLEVBQUUsUUFBUTtBQUNwQixFQUFFLGlCQUFpQixFQUFFLGlCQUFpQjtBQUN0QyxFQUFFLG9CQUFvQixFQUFFLG9CQUFvQjtBQUM1QyxFQUFFLE9BQU8sRUFBRSxPQUFPO0FBQ2xCLEVBQUUsS0FBSyxFQUFFLEtBQUs7QUFDZCxFQUFFLFNBQVMsRUFBRSxTQUFTO0FBQ3RCLEVBQUUsTUFBTSxFQUFFLE1BQU07QUFDaEIsRUFBRSxJQUFJLEVBQUUsSUFBSTtBQUNaLENBQUM7O0FDblZELFNBQVMsTUFBTSxDQUFDLEdBQUcsRUFBRTtBQUNyQixFQUFFLE9BQU8sa0JBQWtCLENBQUMsR0FBRyxDQUFDO0FBQ2hDLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUM7QUFDekIsSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQztBQUN6QixJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDO0FBQ3hCLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUM7QUFDekIsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQztBQUN4QixJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDO0FBQ3pCLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztBQUMxQixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQWMsR0FBRyxTQUFTLFFBQVEsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFFO0FBQ2xFO0FBQ0EsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFO0FBQ2YsSUFBSSxPQUFPLEdBQUcsQ0FBQztBQUNmLEdBQUc7QUFDSDtBQUNBLEVBQUUsSUFBSSxnQkFBZ0IsQ0FBQztBQUN2QixFQUFFLElBQUksZ0JBQWdCLEVBQUU7QUFDeEIsSUFBSSxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNoRCxHQUFHLE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLEVBQUU7QUFDOUMsSUFBSSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDekMsR0FBRyxNQUFNO0FBQ1QsSUFBSSxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7QUFDbkI7QUFDQSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLFNBQVMsU0FBUyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUU7QUFDdkQsTUFBTSxJQUFJLEdBQUcsS0FBSyxJQUFJLElBQUksT0FBTyxHQUFHLEtBQUssV0FBVyxFQUFFO0FBQ3RELFFBQVEsT0FBTztBQUNmLE9BQU87QUFDUDtBQUNBLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQzlCLFFBQVEsR0FBRyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUM7QUFDekIsT0FBTyxNQUFNO0FBQ2IsUUFBUSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNwQixPQUFPO0FBQ1A7QUFDQSxNQUFNLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLFNBQVMsVUFBVSxDQUFDLENBQUMsRUFBRTtBQUNoRCxRQUFRLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUM3QixVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDOUIsU0FBUyxNQUFNLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUN0QyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hDLFNBQVM7QUFDVCxRQUFRLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNsRCxPQUFPLENBQUMsQ0FBQztBQUNULEtBQUssQ0FBQyxDQUFDO0FBQ1A7QUFDQSxJQUFJLGdCQUFnQixHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdkMsR0FBRztBQUNIO0FBQ0EsRUFBRSxJQUFJLGdCQUFnQixFQUFFO0FBQ3hCLElBQUksSUFBSSxhQUFhLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN6QyxJQUFJLElBQUksYUFBYSxLQUFLLENBQUMsQ0FBQyxFQUFFO0FBQzlCLE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0FBQ3hDLEtBQUs7QUFDTDtBQUNBLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxJQUFJLGdCQUFnQixDQUFDO0FBQ3BFLEdBQUc7QUFDSDtBQUNBLEVBQUUsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDOztBQ2xFRCxTQUFTLGtCQUFrQixHQUFHO0FBQzlCLEVBQUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDckIsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsU0FBUyxHQUFHLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRTtBQUNyRSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO0FBQ3JCLElBQUksU0FBUyxFQUFFLFNBQVM7QUFDeEIsSUFBSSxRQUFRLEVBQUUsUUFBUTtBQUN0QixHQUFHLENBQUMsQ0FBQztBQUNMLEVBQUUsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFDbEMsQ0FBQyxDQUFDO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxTQUFTLEtBQUssQ0FBQyxFQUFFLEVBQUU7QUFDeEQsRUFBRSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDekIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztBQUM3QixHQUFHO0FBQ0gsQ0FBQyxDQUFDO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxTQUFTLE9BQU8sQ0FBQyxFQUFFLEVBQUU7QUFDNUQsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsU0FBUyxjQUFjLENBQUMsQ0FBQyxFQUFFO0FBQzFELElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO0FBQ3BCLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ1osS0FBSztBQUNMLEdBQUcsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBQ0Y7QUFDQSx3QkFBYyxHQUFHLGtCQUFrQjs7QUMvQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBYyxHQUFHLFNBQVMsYUFBYSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFO0FBQzVEO0FBQ0EsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxTQUFTLFNBQVMsQ0FBQyxFQUFFLEVBQUU7QUFDNUMsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztBQUM3QixHQUFHLENBQUMsQ0FBQztBQUNMO0FBQ0EsRUFBRSxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7O0FDakJELFlBQWMsR0FBRyxTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUU7QUFDMUMsRUFBRSxPQUFPLENBQUMsRUFBRSxLQUFLLElBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3ZDLENBQUM7O0FDQUQsdUJBQWMsR0FBRyxTQUFTLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUU7QUFDdkUsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxTQUFTLGFBQWEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFO0FBQzdELElBQUksSUFBSSxJQUFJLEtBQUssY0FBYyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxjQUFjLENBQUMsV0FBVyxFQUFFLEVBQUU7QUFDeEYsTUFBTSxPQUFPLENBQUMsY0FBYyxDQUFDLEdBQUcsS0FBSyxDQUFDO0FBQ3RDLE1BQU0sT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDM0IsS0FBSztBQUNMLEdBQUcsQ0FBQyxDQUFDO0FBQ0wsQ0FBQzs7QUNURDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFjLEdBQUcsU0FBUyxZQUFZLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRTtBQUMvRSxFQUFFLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ3hCLEVBQUUsSUFBSSxJQUFJLEVBQUU7QUFDWixJQUFJLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ3RCLEdBQUc7QUFDSDtBQUNBLEVBQUUsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDMUIsRUFBRSxLQUFLLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztBQUM1QixFQUFFLEtBQUssQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO0FBQzVCO0FBQ0EsRUFBRSxLQUFLLENBQUMsTUFBTSxHQUFHLFdBQVc7QUFDNUIsSUFBSSxPQUFPO0FBQ1g7QUFDQSxNQUFNLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztBQUMzQixNQUFNLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtBQUNyQjtBQUNBLE1BQU0sV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO0FBQ25DLE1BQU0sTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO0FBQ3pCO0FBQ0EsTUFBTSxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7QUFDN0IsTUFBTSxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVU7QUFDakMsTUFBTSxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVk7QUFDckMsTUFBTSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7QUFDdkI7QUFDQSxNQUFNLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtBQUN6QixNQUFNLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtBQUNyQixLQUFLLENBQUM7QUFDTixHQUFHLENBQUM7QUFDSixFQUFFLE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQzs7QUNyQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFjLEdBQUcsU0FBUyxXQUFXLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRTtBQUNoRixFQUFFLElBQUksS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2pDLEVBQUUsT0FBTyxZQUFZLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQzlELENBQUM7O0FDYkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFjLEdBQUcsU0FBUyxNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUU7QUFDNUQsRUFBRSxJQUFJLGNBQWMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQztBQUN0RCxFQUFFLElBQUksQ0FBQyxjQUFjLElBQUksY0FBYyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtBQUMxRCxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN0QixHQUFHLE1BQU07QUFDVCxJQUFJLE1BQU0sQ0FBQyxXQUFXO0FBQ3RCLE1BQU0sa0NBQWtDLEdBQUcsUUFBUSxDQUFDLE1BQU07QUFDMUQsTUFBTSxRQUFRLENBQUMsTUFBTTtBQUNyQixNQUFNLElBQUk7QUFDVixNQUFNLFFBQVEsQ0FBQyxPQUFPO0FBQ3RCLE1BQU0sUUFBUTtBQUNkLEtBQUssQ0FBQyxDQUFDO0FBQ1AsR0FBRztBQUNILENBQUM7O0FDdEJEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFjLEdBQUcsU0FBUyxhQUFhLENBQUMsR0FBRyxFQUFFO0FBQzdDO0FBQ0E7QUFDQTtBQUNBLEVBQUUsT0FBTywrQkFBK0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbkQsQ0FBQzs7QUNYRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWMsR0FBRyxTQUFTLFdBQVcsQ0FBQyxPQUFPLEVBQUUsV0FBVyxFQUFFO0FBQzVELEVBQUUsT0FBTyxXQUFXO0FBQ3BCLE1BQU0sT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQztBQUN6RSxNQUFNLE9BQU8sQ0FBQztBQUNkLENBQUM7O0FDUkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWMsR0FBRyxTQUFTLGFBQWEsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFO0FBQy9ELEVBQUUsSUFBSSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLEVBQUU7QUFDL0MsSUFBSSxPQUFPLFdBQVcsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDOUMsR0FBRztBQUNILEVBQUUsT0FBTyxZQUFZLENBQUM7QUFDdEIsQ0FBQzs7QUNmRDtBQUNBO0FBQ0EsSUFBSSxpQkFBaUIsR0FBRztBQUN4QixFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLE1BQU07QUFDbEUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxtQkFBbUIsRUFBRSxxQkFBcUI7QUFDdkUsRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxxQkFBcUI7QUFDcEUsRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLFlBQVk7QUFDeEMsQ0FBQyxDQUFDO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFjLEdBQUcsU0FBUyxZQUFZLENBQUMsT0FBTyxFQUFFO0FBQ2hELEVBQUUsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ2xCLEVBQUUsSUFBSSxHQUFHLENBQUM7QUFDVixFQUFFLElBQUksR0FBRyxDQUFDO0FBQ1YsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNSO0FBQ0EsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsT0FBTyxNQUFNLENBQUMsRUFBRTtBQUNsQztBQUNBLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLFNBQVMsTUFBTSxDQUFDLElBQUksRUFBRTtBQUMzRCxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFCLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUN0RCxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDekM7QUFDQSxJQUFJLElBQUksR0FBRyxFQUFFO0FBQ2IsTUFBTSxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQzlELFFBQVEsT0FBTztBQUNmLE9BQU87QUFDUCxNQUFNLElBQUksR0FBRyxLQUFLLFlBQVksRUFBRTtBQUNoQyxRQUFRLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDckUsT0FBTyxNQUFNO0FBQ2IsUUFBUSxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUNuRSxPQUFPO0FBQ1AsS0FBSztBQUNMLEdBQUcsQ0FBQyxDQUFDO0FBQ0w7QUFDQSxFQUFFLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7O0FDaERELG1CQUFjO0FBQ2QsRUFBRSxLQUFLLENBQUMsb0JBQW9CLEVBQUU7QUFDOUI7QUFDQTtBQUNBO0FBQ0EsSUFBSSxDQUFDLFNBQVMsa0JBQWtCLEdBQUc7QUFDbkMsTUFBTSxJQUFJLElBQUksR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzdELE1BQU0sSUFBSSxjQUFjLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN2RCxNQUFNLElBQUksU0FBUyxDQUFDO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxTQUFTLFVBQVUsQ0FBQyxHQUFHLEVBQUU7QUFDL0IsUUFBUSxJQUFJLElBQUksR0FBRyxHQUFHLENBQUM7QUFDdkI7QUFDQSxRQUFRLElBQUksSUFBSSxFQUFFO0FBQ2xCO0FBQ0EsVUFBVSxjQUFjLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNwRCxVQUFVLElBQUksR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDO0FBQ3JDLFNBQVM7QUFDVDtBQUNBLFFBQVEsY0FBYyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDbEQ7QUFDQTtBQUNBLFFBQVEsT0FBTztBQUNmLFVBQVUsSUFBSSxFQUFFLGNBQWMsQ0FBQyxJQUFJO0FBQ25DLFVBQVUsUUFBUSxFQUFFLGNBQWMsQ0FBQyxRQUFRLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUU7QUFDNUYsVUFBVSxJQUFJLEVBQUUsY0FBYyxDQUFDLElBQUk7QUFDbkMsVUFBVSxNQUFNLEVBQUUsY0FBYyxDQUFDLE1BQU0sR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRTtBQUN2RixVQUFVLElBQUksRUFBRSxjQUFjLENBQUMsSUFBSSxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFO0FBQ2hGLFVBQVUsUUFBUSxFQUFFLGNBQWMsQ0FBQyxRQUFRO0FBQzNDLFVBQVUsSUFBSSxFQUFFLGNBQWMsQ0FBQyxJQUFJO0FBQ25DLFVBQVUsUUFBUSxFQUFFLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRztBQUM5RCxZQUFZLGNBQWMsQ0FBQyxRQUFRO0FBQ25DLFlBQVksR0FBRyxHQUFHLGNBQWMsQ0FBQyxRQUFRO0FBQ3pDLFNBQVMsQ0FBQztBQUNWLE9BQU87QUFDUDtBQUNBLE1BQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxPQUFPLFNBQVMsZUFBZSxDQUFDLFVBQVUsRUFBRTtBQUNsRCxRQUFRLElBQUksTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxVQUFVLENBQUMsVUFBVSxDQUFDLEdBQUcsVUFBVSxDQUFDO0FBQ3hGLFFBQVEsUUFBUSxNQUFNLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FBQyxRQUFRO0FBQ3RELFlBQVksTUFBTSxDQUFDLElBQUksS0FBSyxTQUFTLENBQUMsSUFBSSxFQUFFO0FBQzVDLE9BQU8sQ0FBQztBQUNSLEtBQUssR0FBRztBQUNSO0FBQ0E7QUFDQSxJQUFJLENBQUMsU0FBUyxxQkFBcUIsR0FBRztBQUN0QyxNQUFNLE9BQU8sU0FBUyxlQUFlLEdBQUc7QUFDeEMsUUFBUSxPQUFPLElBQUksQ0FBQztBQUNwQixPQUFPLENBQUM7QUFDUixLQUFLLEdBQUc7QUFDUixDQUFDOztBQy9ERCxXQUFjO0FBQ2QsRUFBRSxLQUFLLENBQUMsb0JBQW9CLEVBQUU7QUFDOUI7QUFDQTtBQUNBLElBQUksQ0FBQyxTQUFTLGtCQUFrQixHQUFHO0FBQ25DLE1BQU0sT0FBTztBQUNiLFFBQVEsS0FBSyxFQUFFLFNBQVMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFO0FBQzFFLFVBQVUsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQzFCLFVBQVUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDOUQ7QUFDQSxVQUFVLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtBQUN2QyxZQUFZLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7QUFDdEUsV0FBVztBQUNYO0FBQ0EsVUFBVSxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDcEMsWUFBWSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQztBQUN4QyxXQUFXO0FBQ1g7QUFDQSxVQUFVLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtBQUN0QyxZQUFZLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxDQUFDO0FBQzVDLFdBQVc7QUFDWDtBQUNBLFVBQVUsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO0FBQy9CLFlBQVksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNsQyxXQUFXO0FBQ1g7QUFDQSxVQUFVLFFBQVEsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM5QyxTQUFTO0FBQ1Q7QUFDQSxRQUFRLElBQUksRUFBRSxTQUFTLElBQUksQ0FBQyxJQUFJLEVBQUU7QUFDbEMsVUFBVSxJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxZQUFZLEdBQUcsSUFBSSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUM7QUFDM0YsVUFBVSxRQUFRLEtBQUssR0FBRyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQUU7QUFDL0QsU0FBUztBQUNUO0FBQ0EsUUFBUSxNQUFNLEVBQUUsU0FBUyxNQUFNLENBQUMsSUFBSSxFQUFFO0FBQ3RDLFVBQVUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxRQUFRLENBQUMsQ0FBQztBQUN0RCxTQUFTO0FBQ1QsT0FBTyxDQUFDO0FBQ1IsS0FBSyxHQUFHO0FBQ1I7QUFDQTtBQUNBLElBQUksQ0FBQyxTQUFTLHFCQUFxQixHQUFHO0FBQ3RDLE1BQU0sT0FBTztBQUNiLFFBQVEsS0FBSyxFQUFFLFNBQVMsS0FBSyxHQUFHLEVBQUU7QUFDbEMsUUFBUSxJQUFJLEVBQUUsU0FBUyxJQUFJLEdBQUcsRUFBRSxPQUFPLElBQUksQ0FBQyxFQUFFO0FBQzlDLFFBQVEsTUFBTSxFQUFFLFNBQVMsTUFBTSxHQUFHLEVBQUU7QUFDcEMsT0FBTyxDQUFDO0FBQ1IsS0FBSyxHQUFHO0FBQ1IsQ0FBQzs7QUMxQ0QsT0FBYyxHQUFHLFNBQVMsVUFBVSxDQUFDLE1BQU0sRUFBRTtBQUM3QyxFQUFFLE9BQU8sSUFBSSxPQUFPLENBQUMsU0FBUyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFO0FBQ2xFLElBQUksSUFBSSxXQUFXLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztBQUNsQyxJQUFJLElBQUksY0FBYyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7QUFDeEM7QUFDQSxJQUFJLElBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFBRTtBQUN2QyxNQUFNLE9BQU8sY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQzVDLEtBQUs7QUFDTDtBQUNBLElBQUksSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztBQUN2QztBQUNBO0FBQ0EsSUFBSSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUU7QUFDckIsTUFBTSxJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUM7QUFDaEQsTUFBTSxJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUM7QUFDaEQsTUFBTSxjQUFjLENBQUMsYUFBYSxHQUFHLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsR0FBRyxRQUFRLENBQUMsQ0FBQztBQUNoRixLQUFLO0FBQ0w7QUFDQSxJQUFJLElBQUksUUFBUSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM3RCxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsRUFBRSxRQUFRLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDaEg7QUFDQTtBQUNBLElBQUksT0FBTyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO0FBQ3JDO0FBQ0E7QUFDQSxJQUFJLE9BQU8sQ0FBQyxrQkFBa0IsR0FBRyxTQUFTLFVBQVUsR0FBRztBQUN2RCxNQUFNLElBQUksQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsS0FBSyxDQUFDLEVBQUU7QUFDaEQsUUFBUSxPQUFPO0FBQ2YsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsV0FBVyxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO0FBQ3hHLFFBQVEsT0FBTztBQUNmLE9BQU87QUFDUDtBQUNBO0FBQ0EsTUFBTSxJQUFJLGVBQWUsR0FBRyx1QkFBdUIsSUFBSSxPQUFPLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQ3RILE1BQU0sSUFBSSxZQUFZLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxJQUFJLE1BQU0sQ0FBQyxZQUFZLEtBQUssTUFBTSxHQUFHLE9BQU8sQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztBQUMxSCxNQUFNLElBQUksUUFBUSxHQUFHO0FBQ3JCLFFBQVEsSUFBSSxFQUFFLFlBQVk7QUFDMUIsUUFBUSxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU07QUFDOUIsUUFBUSxVQUFVLEVBQUUsT0FBTyxDQUFDLFVBQVU7QUFDdEMsUUFBUSxPQUFPLEVBQUUsZUFBZTtBQUNoQyxRQUFRLE1BQU0sRUFBRSxNQUFNO0FBQ3RCLFFBQVEsT0FBTyxFQUFFLE9BQU87QUFDeEIsT0FBTyxDQUFDO0FBQ1I7QUFDQSxNQUFNLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3hDO0FBQ0E7QUFDQSxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUM7QUFDckIsS0FBSyxDQUFDO0FBQ047QUFDQTtBQUNBLElBQUksT0FBTyxDQUFDLE9BQU8sR0FBRyxTQUFTLFdBQVcsR0FBRztBQUM3QyxNQUFNLElBQUksQ0FBQyxPQUFPLEVBQUU7QUFDcEIsUUFBUSxPQUFPO0FBQ2YsT0FBTztBQUNQO0FBQ0EsTUFBTSxNQUFNLENBQUMsV0FBVyxDQUFDLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUM5RTtBQUNBO0FBQ0EsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDO0FBQ3JCLEtBQUssQ0FBQztBQUNOO0FBQ0E7QUFDQSxJQUFJLE9BQU8sQ0FBQyxPQUFPLEdBQUcsU0FBUyxXQUFXLEdBQUc7QUFDN0M7QUFDQTtBQUNBLE1BQU0sTUFBTSxDQUFDLFdBQVcsQ0FBQyxlQUFlLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQ2xFO0FBQ0E7QUFDQSxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUM7QUFDckIsS0FBSyxDQUFDO0FBQ047QUFDQTtBQUNBLElBQUksT0FBTyxDQUFDLFNBQVMsR0FBRyxTQUFTLGFBQWEsR0FBRztBQUNqRCxNQUFNLElBQUksbUJBQW1CLEdBQUcsYUFBYSxHQUFHLE1BQU0sQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDO0FBQy9FLE1BQU0sSUFBSSxNQUFNLENBQUMsbUJBQW1CLEVBQUU7QUFDdEMsUUFBUSxtQkFBbUIsR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUM7QUFDekQsT0FBTztBQUNQLE1BQU0sTUFBTSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsRUFBRSxNQUFNLEVBQUUsY0FBYztBQUNwRSxRQUFRLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDbEI7QUFDQTtBQUNBLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQztBQUNyQixLQUFLLENBQUM7QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksSUFBSSxLQUFLLENBQUMsb0JBQW9CLEVBQUUsRUFBRTtBQUN0QyxNQUFNLElBQUlBLFNBQU8sR0FBR0MsT0FBK0IsQ0FBQztBQUNwRDtBQUNBO0FBQ0EsTUFBTSxJQUFJLFNBQVMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxlQUFlLElBQUksZUFBZSxDQUFDLFFBQVEsQ0FBQyxLQUFLLE1BQU0sQ0FBQyxjQUFjO0FBQ3BHLFFBQVFELFNBQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQztBQUMzQyxRQUFRLFNBQVMsQ0FBQztBQUNsQjtBQUNBLE1BQU0sSUFBSSxTQUFTLEVBQUU7QUFDckIsUUFBUSxjQUFjLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLFNBQVMsQ0FBQztBQUMxRCxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQSxJQUFJLElBQUksa0JBQWtCLElBQUksT0FBTyxFQUFFO0FBQ3ZDLE1BQU0sS0FBSyxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsU0FBUyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFO0FBQ3hFLFFBQVEsSUFBSSxPQUFPLFdBQVcsS0FBSyxXQUFXLElBQUksR0FBRyxDQUFDLFdBQVcsRUFBRSxLQUFLLGNBQWMsRUFBRTtBQUN4RjtBQUNBLFVBQVUsT0FBTyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDckMsU0FBUyxNQUFNO0FBQ2Y7QUFDQSxVQUFVLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDN0MsU0FBUztBQUNULE9BQU8sQ0FBQyxDQUFDO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsRUFBRTtBQUNwRCxNQUFNLE9BQU8sQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUM7QUFDekQsS0FBSztBQUNMO0FBQ0E7QUFDQSxJQUFJLElBQUksTUFBTSxDQUFDLFlBQVksRUFBRTtBQUM3QixNQUFNLElBQUk7QUFDVixRQUFRLE9BQU8sQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQztBQUNuRCxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7QUFDbEI7QUFDQTtBQUNBLFFBQVEsSUFBSSxNQUFNLENBQUMsWUFBWSxLQUFLLE1BQU0sRUFBRTtBQUM1QyxVQUFVLE1BQU0sQ0FBQyxDQUFDO0FBQ2xCLFNBQVM7QUFDVCxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQSxJQUFJLElBQUksT0FBTyxNQUFNLENBQUMsa0JBQWtCLEtBQUssVUFBVSxFQUFFO0FBQ3pELE1BQU0sT0FBTyxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUN0RSxLQUFLO0FBQ0w7QUFDQTtBQUNBLElBQUksSUFBSSxPQUFPLE1BQU0sQ0FBQyxnQkFBZ0IsS0FBSyxVQUFVLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtBQUN6RSxNQUFNLE9BQU8sQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQzNFLEtBQUs7QUFDTDtBQUNBLElBQUksSUFBSSxNQUFNLENBQUMsV0FBVyxFQUFFO0FBQzVCO0FBQ0EsTUFBTSxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxVQUFVLENBQUMsTUFBTSxFQUFFO0FBQ2xFLFFBQVEsSUFBSSxDQUFDLE9BQU8sRUFBRTtBQUN0QixVQUFVLE9BQU87QUFDakIsU0FBUztBQUNUO0FBQ0EsUUFBUSxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDeEIsUUFBUSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDdkI7QUFDQSxRQUFRLE9BQU8sR0FBRyxJQUFJLENBQUM7QUFDdkIsT0FBTyxDQUFDLENBQUM7QUFDVCxLQUFLO0FBQ0w7QUFDQSxJQUFJLElBQUksV0FBVyxLQUFLLFNBQVMsRUFBRTtBQUNuQyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUM7QUFDekIsS0FBSztBQUNMO0FBQ0E7QUFDQSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDOUIsR0FBRyxDQUFDLENBQUM7QUFDTCxDQUFDOztBQzlLRCxJQUFJLG9CQUFvQixHQUFHO0FBQzNCLEVBQUUsY0FBYyxFQUFFLG1DQUFtQztBQUNyRCxDQUFDLENBQUM7QUFDRjtBQUNBLFNBQVMscUJBQXFCLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRTtBQUMvQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUU7QUFDakYsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLEdBQUcsS0FBSyxDQUFDO0FBQ3BDLEdBQUc7QUFDSCxDQUFDO0FBQ0Q7QUFDQSxTQUFTLGlCQUFpQixHQUFHO0FBQzdCLEVBQUUsSUFBSSxPQUFPLENBQUM7QUFDZCxFQUFFLElBQUksT0FBTyxjQUFjLEtBQUssV0FBVyxFQUFFO0FBQzdDO0FBQ0EsSUFBSSxPQUFPLEdBQUdDLEdBQXlCLENBQUM7QUFDeEMsR0FBRyxNQUFNLElBQUksT0FBTyxPQUFPLEtBQUssV0FBVyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxrQkFBa0IsRUFBRTtBQUMvRztBQUNBLElBQUksT0FBTyxHQUFHQyxHQUEwQixDQUFDO0FBQ3pDLEdBQUc7QUFDSCxFQUFFLE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUM7QUFDRDtBQUNBLElBQUksUUFBUSxHQUFHO0FBQ2YsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUU7QUFDOUI7QUFDQSxFQUFFLGdCQUFnQixFQUFFLENBQUMsU0FBUyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFO0FBQzlELElBQUksbUJBQW1CLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQzNDLElBQUksbUJBQW1CLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBQ2pELElBQUksSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztBQUM5QixNQUFNLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO0FBQy9CLE1BQU0sS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7QUFDMUIsTUFBTSxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztBQUMxQixNQUFNLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ3hCLE1BQU0sS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7QUFDeEIsTUFBTTtBQUNOLE1BQU0sT0FBTyxJQUFJLENBQUM7QUFDbEIsS0FBSztBQUNMLElBQUksSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDdkMsTUFBTSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDekIsS0FBSztBQUNMLElBQUksSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDdkMsTUFBTSxxQkFBcUIsQ0FBQyxPQUFPLEVBQUUsaURBQWlELENBQUMsQ0FBQztBQUN4RixNQUFNLE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQzdCLEtBQUs7QUFDTCxJQUFJLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUM5QixNQUFNLHFCQUFxQixDQUFDLE9BQU8sRUFBRSxnQ0FBZ0MsQ0FBQyxDQUFDO0FBQ3ZFLE1BQU0sT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2xDLEtBQUs7QUFDTCxJQUFJLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLEdBQUcsQ0FBQztBQUNKO0FBQ0EsRUFBRSxpQkFBaUIsRUFBRSxDQUFDLFNBQVMsaUJBQWlCLENBQUMsSUFBSSxFQUFFO0FBQ3ZEO0FBQ0EsSUFBSSxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtBQUNsQyxNQUFNLElBQUk7QUFDVixRQUFRLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2hDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxnQkFBZ0I7QUFDbEMsS0FBSztBQUNMLElBQUksT0FBTyxJQUFJLENBQUM7QUFDaEIsR0FBRyxDQUFDO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsT0FBTyxFQUFFLENBQUM7QUFDWjtBQUNBLEVBQUUsY0FBYyxFQUFFLFlBQVk7QUFDOUIsRUFBRSxjQUFjLEVBQUUsY0FBYztBQUNoQztBQUNBLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO0FBQ3RCO0FBQ0EsRUFBRSxjQUFjLEVBQUUsU0FBUyxjQUFjLENBQUMsTUFBTSxFQUFFO0FBQ2xELElBQUksT0FBTyxNQUFNLElBQUksR0FBRyxJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUM7QUFDekMsR0FBRztBQUNILENBQUMsQ0FBQztBQUNGO0FBQ0EsUUFBUSxDQUFDLE9BQU8sR0FBRztBQUNuQixFQUFFLE1BQU0sRUFBRTtBQUNWLElBQUksUUFBUSxFQUFFLG1DQUFtQztBQUNqRCxHQUFHO0FBQ0gsQ0FBQyxDQUFDO0FBQ0Y7QUFDQSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsRUFBRSxTQUFTLG1CQUFtQixDQUFDLE1BQU0sRUFBRTtBQUM5RSxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ2hDLENBQUMsQ0FBQyxDQUFDO0FBQ0g7QUFDQSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsRUFBRSxTQUFTLHFCQUFxQixDQUFDLE1BQU0sRUFBRTtBQUMvRSxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQy9ELENBQUMsQ0FBQyxDQUFDO0FBQ0g7QUFDQSxjQUFjLEdBQUcsUUFBUTs7QUN6RnpCO0FBQ0E7QUFDQTtBQUNBLFNBQVMsNEJBQTRCLENBQUMsTUFBTSxFQUFFO0FBQzlDLEVBQUUsSUFBSSxNQUFNLENBQUMsV0FBVyxFQUFFO0FBQzFCLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0FBQzFDLEdBQUc7QUFDSCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBYyxHQUFHLFNBQVMsZUFBZSxDQUFDLE1BQU0sRUFBRTtBQUNsRCxFQUFFLDRCQUE0QixDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3ZDO0FBQ0E7QUFDQSxFQUFFLE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7QUFDeEM7QUFDQTtBQUNBLEVBQUUsTUFBTSxDQUFDLElBQUksR0FBRyxhQUFhO0FBQzdCLElBQUksTUFBTSxDQUFDLElBQUk7QUFDZixJQUFJLE1BQU0sQ0FBQyxPQUFPO0FBQ2xCLElBQUksTUFBTSxDQUFDLGdCQUFnQjtBQUMzQixHQUFHLENBQUM7QUFDSjtBQUNBO0FBQ0EsRUFBRSxNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxLQUFLO0FBQzlCLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksRUFBRTtBQUMvQixJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7QUFDdkMsSUFBSSxNQUFNLENBQUMsT0FBTztBQUNsQixHQUFHLENBQUM7QUFDSjtBQUNBLEVBQUUsS0FBSyxDQUFDLE9BQU87QUFDZixJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDO0FBQy9ELElBQUksU0FBUyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUU7QUFDdkMsTUFBTSxPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDcEMsS0FBSztBQUNMLEdBQUcsQ0FBQztBQUNKO0FBQ0EsRUFBRSxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxJQUFJQyxVQUFRLENBQUMsT0FBTyxDQUFDO0FBQ25EO0FBQ0EsRUFBRSxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUU7QUFDckUsSUFBSSw0QkFBNEIsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN6QztBQUNBO0FBQ0EsSUFBSSxRQUFRLENBQUMsSUFBSSxHQUFHLGFBQWE7QUFDakMsTUFBTSxRQUFRLENBQUMsSUFBSTtBQUNuQixNQUFNLFFBQVEsQ0FBQyxPQUFPO0FBQ3RCLE1BQU0sTUFBTSxDQUFDLGlCQUFpQjtBQUM5QixLQUFLLENBQUM7QUFDTjtBQUNBLElBQUksT0FBTyxRQUFRLENBQUM7QUFDcEIsR0FBRyxFQUFFLFNBQVMsa0JBQWtCLENBQUMsTUFBTSxFQUFFO0FBQ3pDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtBQUMzQixNQUFNLDRCQUE0QixDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzNDO0FBQ0E7QUFDQSxNQUFNLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUU7QUFDckMsUUFBUSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxhQUFhO0FBQzVDLFVBQVUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJO0FBQzlCLFVBQVUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPO0FBQ2pDLFVBQVUsTUFBTSxDQUFDLGlCQUFpQjtBQUNsQyxTQUFTLENBQUM7QUFDVixPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0EsSUFBSSxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDbEMsR0FBRyxDQUFDLENBQUM7QUFDTCxDQUFDOztBQzFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBYyxHQUFHLFNBQVMsV0FBVyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUU7QUFDeEQ7QUFDQSxFQUFFLE9BQU8sR0FBRyxPQUFPLElBQUksRUFBRSxDQUFDO0FBQzFCLEVBQUUsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ2xCO0FBQ0EsRUFBRSxJQUFJLG9CQUFvQixHQUFHLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDakUsRUFBRSxJQUFJLHVCQUF1QixHQUFHLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztBQUM3RCxFQUFFLElBQUksb0JBQW9CLEdBQUc7QUFDN0IsSUFBSSxTQUFTLEVBQUUsS0FBSyxFQUFFLGtCQUFrQixFQUFFLG1CQUFtQixFQUFFLGtCQUFrQjtBQUNqRixJQUFJLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsY0FBYyxFQUFFLGdCQUFnQjtBQUM3RSxJQUFJLGdCQUFnQixFQUFFLGtCQUFrQixFQUFFLG9CQUFvQjtBQUM5RCxJQUFJLGtCQUFrQixFQUFFLGdCQUFnQixFQUFFLGNBQWMsRUFBRSxXQUFXO0FBQ3JFLElBQUksWUFBWSxFQUFFLGFBQWEsRUFBRSxZQUFZO0FBQzdDLEdBQUcsQ0FBQztBQUNKO0FBQ0EsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLG9CQUFvQixFQUFFLFNBQVMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFO0FBQ3RFLElBQUksSUFBSSxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxXQUFXLEVBQUU7QUFDOUMsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25DLEtBQUs7QUFDTCxHQUFHLENBQUMsQ0FBQztBQUNMO0FBQ0EsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLHVCQUF1QixFQUFFLFNBQVMsbUJBQW1CLENBQUMsSUFBSSxFQUFFO0FBQzVFLElBQUksSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO0FBQ3ZDLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ25FLEtBQUssTUFBTSxJQUFJLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLFdBQVcsRUFBRTtBQUNyRCxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbkMsS0FBSyxNQUFNLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtBQUM5QyxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ3BELEtBQUssTUFBTSxJQUFJLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLFdBQVcsRUFBRTtBQUNyRCxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbkMsS0FBSztBQUNMLEdBQUcsQ0FBQyxDQUFDO0FBQ0w7QUFDQSxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEVBQUUsU0FBUyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUU7QUFDdEUsSUFBSSxJQUFJLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLFdBQVcsRUFBRTtBQUM5QyxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbkMsS0FBSyxNQUFNLElBQUksT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssV0FBVyxFQUFFO0FBQ3JELE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNuQyxLQUFLO0FBQ0wsR0FBRyxDQUFDLENBQUM7QUFDTDtBQUNBLEVBQUUsSUFBSSxTQUFTLEdBQUcsb0JBQW9CO0FBQ3RDLEtBQUssTUFBTSxDQUFDLHVCQUF1QixDQUFDO0FBQ3BDLEtBQUssTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDbEM7QUFDQSxFQUFFLElBQUksU0FBUyxHQUFHLE1BQU07QUFDeEIsS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQ2xCLEtBQUssTUFBTSxDQUFDLFNBQVMsZUFBZSxDQUFDLEdBQUcsRUFBRTtBQUMxQyxNQUFNLE9BQU8sU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUMzQyxLQUFLLENBQUMsQ0FBQztBQUNQO0FBQ0EsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxTQUFTLHlCQUF5QixDQUFDLElBQUksRUFBRTtBQUNwRSxJQUFJLElBQUksT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssV0FBVyxFQUFFO0FBQzlDLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNuQyxLQUFLLE1BQU0sSUFBSSxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxXQUFXLEVBQUU7QUFDckQsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25DLEtBQUs7QUFDTCxHQUFHLENBQUMsQ0FBQztBQUNMO0FBQ0EsRUFBRSxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDOztBQ2hFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxLQUFLLENBQUMsY0FBYyxFQUFFO0FBQy9CLEVBQUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxjQUFjLENBQUM7QUFDakMsRUFBRSxJQUFJLENBQUMsWUFBWSxHQUFHO0FBQ3RCLElBQUksT0FBTyxFQUFFLElBQUlDLG9CQUFrQixFQUFFO0FBQ3JDLElBQUksUUFBUSxFQUFFLElBQUlBLG9CQUFrQixFQUFFO0FBQ3RDLEdBQUcsQ0FBQztBQUNKLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxTQUFTLE9BQU8sQ0FBQyxNQUFNLEVBQUU7QUFDbkQ7QUFDQTtBQUNBLEVBQUUsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7QUFDbEMsSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNoQyxJQUFJLE1BQU0sQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzlCLEdBQUcsTUFBTTtBQUNULElBQUksTUFBTSxHQUFHLE1BQU0sSUFBSSxFQUFFLENBQUM7QUFDMUIsR0FBRztBQUNIO0FBQ0EsRUFBRSxNQUFNLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDOUM7QUFDQTtBQUNBLEVBQUUsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO0FBQ3JCLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQ2hELEdBQUcsTUFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO0FBQ25DLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUN2RCxHQUFHLE1BQU07QUFDVCxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0FBQzFCLEdBQUc7QUFDSDtBQUNBO0FBQ0EsRUFBRSxJQUFJLEtBQUssR0FBRyxDQUFDLGVBQWUsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUMzQyxFQUFFLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDeEM7QUFDQSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLDBCQUEwQixDQUFDLFdBQVcsRUFBRTtBQUNyRixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDL0QsR0FBRyxDQUFDLENBQUM7QUFDTDtBQUNBLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsd0JBQXdCLENBQUMsV0FBVyxFQUFFO0FBQ3BGLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUM1RCxHQUFHLENBQUMsQ0FBQztBQUNMO0FBQ0EsRUFBRSxPQUFPLEtBQUssQ0FBQyxNQUFNLEVBQUU7QUFDdkIsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7QUFDekQsR0FBRztBQUNIO0FBQ0EsRUFBRSxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDLENBQUM7QUFDRjtBQUNBLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLFNBQVMsTUFBTSxDQUFDLE1BQU0sRUFBRTtBQUNqRCxFQUFFLE1BQU0sR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUM5QyxFQUFFLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3pGLENBQUMsQ0FBQztBQUNGO0FBQ0E7QUFDQSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDLEVBQUUsU0FBUyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUU7QUFDekY7QUFDQSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsU0FBUyxHQUFHLEVBQUUsTUFBTSxFQUFFO0FBQ2xELElBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLEVBQUUsRUFBRTtBQUNsRCxNQUFNLE1BQU0sRUFBRSxNQUFNO0FBQ3BCLE1BQU0sR0FBRyxFQUFFLEdBQUc7QUFDZCxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ1IsR0FBRyxDQUFDO0FBQ0osQ0FBQyxDQUFDLENBQUM7QUFDSDtBQUNBLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxFQUFFLFNBQVMscUJBQXFCLENBQUMsTUFBTSxFQUFFO0FBQy9FO0FBQ0EsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLFNBQVMsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7QUFDeEQsSUFBSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksRUFBRSxFQUFFO0FBQ2xELE1BQU0sTUFBTSxFQUFFLE1BQU07QUFDcEIsTUFBTSxHQUFHLEVBQUUsR0FBRztBQUNkLE1BQU0sSUFBSSxFQUFFLElBQUk7QUFDaEIsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUNSLEdBQUcsQ0FBQztBQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0g7QUFDQSxXQUFjLEdBQUcsS0FBSzs7QUMzRnRCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsTUFBTSxDQUFDLE9BQU8sRUFBRTtBQUN6QixFQUFFLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0FBQ3pCLENBQUM7QUFDRDtBQUNBLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLFNBQVMsUUFBUSxHQUFHO0FBQ2hELEVBQUUsT0FBTyxRQUFRLElBQUksSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQztBQUM5RCxDQUFDLENBQUM7QUFDRjtBQUNBLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztBQUNuQztBQUNBLFlBQWMsR0FBRyxNQUFNOztBQ2R2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLFdBQVcsQ0FBQyxRQUFRLEVBQUU7QUFDL0IsRUFBRSxJQUFJLE9BQU8sUUFBUSxLQUFLLFVBQVUsRUFBRTtBQUN0QyxJQUFJLE1BQU0sSUFBSSxTQUFTLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQUN4RCxHQUFHO0FBQ0g7QUFDQSxFQUFFLElBQUksY0FBYyxDQUFDO0FBQ3JCLEVBQUUsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxTQUFTLGVBQWUsQ0FBQyxPQUFPLEVBQUU7QUFDL0QsSUFBSSxjQUFjLEdBQUcsT0FBTyxDQUFDO0FBQzdCLEdBQUcsQ0FBQyxDQUFDO0FBQ0w7QUFDQSxFQUFFLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQztBQUNuQixFQUFFLFFBQVEsQ0FBQyxTQUFTLE1BQU0sQ0FBQyxPQUFPLEVBQUU7QUFDcEMsSUFBSSxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7QUFDdEI7QUFDQSxNQUFNLE9BQU87QUFDYixLQUFLO0FBQ0w7QUFDQSxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSUMsUUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3ZDLElBQUksY0FBYyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNqQyxHQUFHLENBQUMsQ0FBQztBQUNMLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEdBQUcsU0FBUyxnQkFBZ0IsR0FBRztBQUNyRSxFQUFFLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtBQUNuQixJQUFJLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQztBQUN0QixHQUFHO0FBQ0gsQ0FBQyxDQUFDO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsQ0FBQyxNQUFNLEdBQUcsU0FBUyxNQUFNLEdBQUc7QUFDdkMsRUFBRSxJQUFJLE1BQU0sQ0FBQztBQUNiLEVBQUUsSUFBSSxLQUFLLEdBQUcsSUFBSSxXQUFXLENBQUMsU0FBUyxRQUFRLENBQUMsQ0FBQyxFQUFFO0FBQ25ELElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztBQUNmLEdBQUcsQ0FBQyxDQUFDO0FBQ0wsRUFBRSxPQUFPO0FBQ1QsSUFBSSxLQUFLLEVBQUUsS0FBSztBQUNoQixJQUFJLE1BQU0sRUFBRSxNQUFNO0FBQ2xCLEdBQUcsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUNGO0FBQ0EsaUJBQWMsR0FBRyxXQUFXOztBQ3RENUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQWMsR0FBRyxTQUFTLE1BQU0sQ0FBQyxRQUFRLEVBQUU7QUFDM0MsRUFBRSxPQUFPLFNBQVMsSUFBSSxDQUFDLEdBQUcsRUFBRTtBQUM1QixJQUFJLE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDckMsR0FBRyxDQUFDO0FBQ0osQ0FBQzs7QUNsQkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxjQUFjLENBQUMsYUFBYSxFQUFFO0FBQ3ZDLEVBQUUsSUFBSSxPQUFPLEdBQUcsSUFBSUMsT0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ3pDLEVBQUUsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDQSxPQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztBQUN4RDtBQUNBO0FBQ0EsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRUEsT0FBSyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNuRDtBQUNBO0FBQ0EsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNsQztBQUNBLEVBQUUsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQztBQUNEO0FBQ0E7QUFDQSxJQUFJLEtBQUssR0FBRyxjQUFjLENBQUNILFVBQVEsQ0FBQyxDQUFDO0FBQ3JDO0FBQ0E7QUFDQSxLQUFLLENBQUMsS0FBSyxHQUFHRyxPQUFLLENBQUM7QUFDcEI7QUFDQTtBQUNBLEtBQUssQ0FBQyxNQUFNLEdBQUcsU0FBUyxNQUFNLENBQUMsY0FBYyxFQUFFO0FBQy9DLEVBQUUsT0FBTyxjQUFjLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQztBQUNyRSxDQUFDLENBQUM7QUFDRjtBQUNBO0FBQ0EsS0FBSyxDQUFDLE1BQU0sR0FBR0wsUUFBMEIsQ0FBQztBQUMxQyxLQUFLLENBQUMsV0FBVyxHQUFHQyxhQUErQixDQUFDO0FBQ3BELEtBQUssQ0FBQyxRQUFRLEdBQUdLLFFBQTRCLENBQUM7QUFDOUM7QUFDQTtBQUNBLEtBQUssQ0FBQyxHQUFHLEdBQUcsU0FBUyxHQUFHLENBQUMsUUFBUSxFQUFFO0FBQ25DLEVBQUUsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQztBQUNGLEtBQUssQ0FBQyxNQUFNLEdBQUdDLE1BQTJCLENBQUM7QUFDM0M7QUFDQSxXQUFjLEdBQUcsS0FBSyxDQUFDO0FBQ3ZCO0FBQ0E7QUFDQSxhQUFzQixHQUFHLEtBQUs7OztBQ3BEOUIsV0FBYyxHQUFHUCxPQUFzQjs7QUNBdkMsU0FBUyxNQUFNLENBQUMsR0FBRyxFQUFFO0FBQ3JCLEVBQUUsSUFBSSxHQUFHLEtBQUssSUFBSSxJQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUU7QUFDekMsSUFBSSxPQUFPLFNBQVMsQ0FBQztBQUNyQixHQUFHO0FBQ0g7QUFDQSxFQUFFLE9BQU8sR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQzlCLENBQUM7QUFDRDtBQUNBLFNBQVMsTUFBTSxDQUFDLEdBQUcsRUFBRTtBQUNyQixFQUFFLElBQUksR0FBRyxLQUFLLElBQUksSUFBSSxHQUFHLEtBQUssU0FBUyxFQUFFO0FBQ3pDLElBQUksT0FBTyxFQUFFLENBQUM7QUFDZCxHQUFHO0FBQ0gsRUFBRSxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFDRDtBQUNBLGFBQWU7QUFDZixFQUFFLE1BQU07QUFDUixFQUFFLE1BQU07QUFDUixDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7QUNsQkYsQUFFQyxDQUFDLFVBQVUsTUFBTSxFQUFFLE9BQU8sRUFBRTtBQUM3QixJQUFJLENBQStELGNBQWMsR0FBRyxPQUFPLEVBQUUsRUFFaEU7QUFDN0IsQ0FBQyxDQUFDUSxjQUFJLEdBQUcsWUFBWSxDQUNyQjtBQUNBLElBQUksSUFBSSxZQUFZLENBQUM7QUFDckI7QUFDQSxJQUFJLFNBQVMsS0FBSyxJQUFJO0FBQ3RCLFFBQVEsT0FBTyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUNuRCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsSUFBSSxTQUFTLGVBQWUsRUFBRSxRQUFRLEVBQUU7QUFDeEMsUUFBUSxZQUFZLEdBQUcsUUFBUSxDQUFDO0FBQ2hDLEtBQUs7QUFDTDtBQUNBLElBQUksU0FBUyxPQUFPLENBQUMsS0FBSyxFQUFFO0FBQzVCLFFBQVEsT0FBTyxLQUFLLFlBQVksS0FBSyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxnQkFBZ0IsQ0FBQztBQUNwRyxLQUFLO0FBQ0w7QUFDQSxJQUFJLFNBQVMsUUFBUSxDQUFDLEtBQUssRUFBRTtBQUM3QjtBQUNBO0FBQ0EsUUFBUSxPQUFPLEtBQUssSUFBSSxJQUFJLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLGlCQUFpQixDQUFDO0FBQzVGLEtBQUs7QUFDTDtBQUNBLElBQUksU0FBUyxhQUFhLENBQUMsR0FBRyxFQUFFO0FBQ2hDLFFBQVEsSUFBSSxNQUFNLENBQUMsbUJBQW1CLEVBQUU7QUFDeEMsWUFBWSxRQUFRLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO0FBQ2xFLFNBQVMsTUFBTTtBQUNmLFlBQVksSUFBSSxDQUFDLENBQUM7QUFDbEIsWUFBWSxLQUFLLENBQUMsSUFBSSxHQUFHLEVBQUU7QUFDM0IsZ0JBQWdCLElBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUMzQyxvQkFBb0IsT0FBTyxLQUFLLENBQUM7QUFDakMsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYixZQUFZLE9BQU8sSUFBSSxDQUFDO0FBQ3hCLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQSxJQUFJLFNBQVMsV0FBVyxDQUFDLEtBQUssRUFBRTtBQUNoQyxRQUFRLE9BQU8sS0FBSyxLQUFLLEtBQUssQ0FBQyxDQUFDO0FBQ2hDLEtBQUs7QUFDTDtBQUNBLElBQUksU0FBUyxRQUFRLENBQUMsS0FBSyxFQUFFO0FBQzdCLFFBQVEsT0FBTyxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLGlCQUFpQixDQUFDO0FBQ3hHLEtBQUs7QUFDTDtBQUNBLElBQUksU0FBUyxNQUFNLENBQUMsS0FBSyxFQUFFO0FBQzNCLFFBQVEsT0FBTyxLQUFLLFlBQVksSUFBSSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxlQUFlLENBQUM7QUFDbEcsS0FBSztBQUNMO0FBQ0EsSUFBSSxTQUFTLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFO0FBQzFCLFFBQVEsSUFBSSxHQUFHLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUN4QixRQUFRLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRTtBQUN6QyxZQUFZLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BDLFNBQVM7QUFDVCxRQUFRLE9BQU8sR0FBRyxDQUFDO0FBQ25CLEtBQUs7QUFDTDtBQUNBLElBQUksU0FBUyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUM5QixRQUFRLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMxRCxLQUFLO0FBQ0w7QUFDQSxJQUFJLFNBQVMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDMUIsUUFBUSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUN6QixZQUFZLElBQUksVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtBQUNsQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM1QixhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0EsUUFBUSxJQUFJLFVBQVUsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLEVBQUU7QUFDdkMsWUFBWSxDQUFDLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUM7QUFDcEMsU0FBUztBQUNUO0FBQ0EsUUFBUSxJQUFJLFVBQVUsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLEVBQUU7QUFDdEMsWUFBWSxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7QUFDbEMsU0FBUztBQUNUO0FBQ0EsUUFBUSxPQUFPLENBQUMsQ0FBQztBQUNqQixLQUFLO0FBQ0w7QUFDQSxJQUFJLFNBQVMsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRTtBQUN2RCxRQUFRLE9BQU8sZ0JBQWdCLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQzNFLEtBQUs7QUFDTDtBQUNBLElBQUksU0FBUyxtQkFBbUIsR0FBRztBQUNuQztBQUNBLFFBQVEsT0FBTztBQUNmLFlBQVksS0FBSyxhQUFhLEtBQUs7QUFDbkMsWUFBWSxZQUFZLE1BQU0sRUFBRTtBQUNoQyxZQUFZLFdBQVcsT0FBTyxFQUFFO0FBQ2hDLFlBQVksUUFBUSxVQUFVLENBQUMsQ0FBQztBQUNoQyxZQUFZLGFBQWEsS0FBSyxDQUFDO0FBQy9CLFlBQVksU0FBUyxTQUFTLEtBQUs7QUFDbkMsWUFBWSxZQUFZLE1BQU0sSUFBSTtBQUNsQyxZQUFZLGFBQWEsS0FBSyxLQUFLO0FBQ25DLFlBQVksZUFBZSxHQUFHLEtBQUs7QUFDbkMsWUFBWSxHQUFHLGVBQWUsS0FBSztBQUNuQyxZQUFZLGVBQWUsR0FBRyxFQUFFO0FBQ2hDLFlBQVksUUFBUSxVQUFVLElBQUk7QUFDbEMsWUFBWSxPQUFPLFdBQVcsS0FBSztBQUNuQyxZQUFZLGVBQWUsR0FBRyxLQUFLO0FBQ25DLFNBQVMsQ0FBQztBQUNWLEtBQUs7QUFDTDtBQUNBLElBQUksU0FBUyxlQUFlLENBQUMsQ0FBQyxFQUFFO0FBQ2hDLFFBQVEsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLElBQUksRUFBRTtBQUMzQixZQUFZLENBQUMsQ0FBQyxHQUFHLEdBQUcsbUJBQW1CLEVBQUUsQ0FBQztBQUMxQyxTQUFTO0FBQ1QsUUFBUSxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUM7QUFDckIsS0FBSztBQUNMO0FBQ0EsSUFBSSxJQUFJLElBQUksQ0FBQztBQUNiLElBQUksSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRTtBQUM5QixRQUFRLElBQUksR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztBQUNwQyxLQUFLLE1BQU07QUFDWCxRQUFRLElBQUksR0FBRyxVQUFVLEdBQUcsRUFBRTtBQUM5QixZQUFZLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQyxZQUFZLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO0FBQ3JDO0FBQ0EsWUFBWSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzFDLGdCQUFnQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtBQUMxRCxvQkFBb0IsT0FBTyxJQUFJLENBQUM7QUFDaEMsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBLFlBQVksT0FBTyxLQUFLLENBQUM7QUFDekIsU0FBUyxDQUFDO0FBQ1YsS0FBSztBQUNMO0FBQ0EsSUFBSSxTQUFTLE9BQU8sQ0FBQyxDQUFDLEVBQUU7QUFDeEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxRQUFRLElBQUksSUFBSSxFQUFFO0FBQ2hDLFlBQVksSUFBSSxLQUFLLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzNDLFlBQVksSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLFVBQVUsQ0FBQyxFQUFFO0FBQzVFLGdCQUFnQixPQUFPLENBQUMsSUFBSSxJQUFJLENBQUM7QUFDakMsYUFBYSxDQUFDLENBQUM7QUFDZixZQUFZLElBQUksVUFBVSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDbkQsZ0JBQWdCLEtBQUssQ0FBQyxRQUFRLEdBQUcsQ0FBQztBQUNsQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsS0FBSztBQUM1QixnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsWUFBWTtBQUNuQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsY0FBYztBQUNyQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsZUFBZTtBQUN0QyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsU0FBUztBQUNoQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsYUFBYTtBQUNwQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsZUFBZTtBQUN0QyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsUUFBUSxLQUFLLEtBQUssQ0FBQyxRQUFRLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQztBQUNyRTtBQUNBLFlBQVksSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFO0FBQzNCLGdCQUFnQixVQUFVLEdBQUcsVUFBVTtBQUN2QyxvQkFBb0IsS0FBSyxDQUFDLGFBQWEsS0FBSyxDQUFDO0FBQzdDLG9CQUFvQixLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sS0FBSyxDQUFDO0FBQ25ELG9CQUFvQixLQUFLLENBQUMsT0FBTyxLQUFLLFNBQVMsQ0FBQztBQUNoRCxhQUFhO0FBQ2I7QUFDQSxZQUFZLElBQUksTUFBTSxDQUFDLFFBQVEsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ2hFLGdCQUFnQixDQUFDLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztBQUN4QyxhQUFhO0FBQ2IsaUJBQWlCO0FBQ2pCLGdCQUFnQixPQUFPLFVBQVUsQ0FBQztBQUNsQyxhQUFhO0FBQ2IsU0FBUztBQUNULFFBQVEsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDO0FBQzFCLEtBQUs7QUFDTDtBQUNBLElBQUksU0FBUyxhQUFhLEVBQUUsS0FBSyxFQUFFO0FBQ25DLFFBQVEsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQy9CLFFBQVEsSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO0FBQzNCLFlBQVksTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUM5QyxTQUFTO0FBQ1QsYUFBYTtBQUNiLFlBQVksZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7QUFDdEQsU0FBUztBQUNUO0FBQ0EsUUFBUSxPQUFPLENBQUMsQ0FBQztBQUNqQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsSUFBSSxJQUFJLGdCQUFnQixHQUFHLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7QUFDdkQ7QUFDQSxJQUFJLFNBQVMsVUFBVSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUU7QUFDbEMsUUFBUSxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDO0FBQ3pCO0FBQ0EsUUFBUSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO0FBQ2pELFlBQVksRUFBRSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztBQUN4RCxTQUFTO0FBQ1QsUUFBUSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNuQyxZQUFZLEVBQUUsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztBQUM1QixTQUFTO0FBQ1QsUUFBUSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNuQyxZQUFZLEVBQUUsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztBQUM1QixTQUFTO0FBQ1QsUUFBUSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNuQyxZQUFZLEVBQUUsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztBQUM1QixTQUFTO0FBQ1QsUUFBUSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTtBQUN4QyxZQUFZLEVBQUUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUN0QyxTQUFTO0FBQ1QsUUFBUSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUNyQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztBQUNoQyxTQUFTO0FBQ1QsUUFBUSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtBQUN2QyxZQUFZLEVBQUUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztBQUNwQyxTQUFTO0FBQ1QsUUFBUSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTtBQUN4QyxZQUFZLEVBQUUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUN0QyxTQUFTO0FBQ1QsUUFBUSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUNwQyxZQUFZLEVBQUUsQ0FBQyxH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QU8sRUFBRSxFQUFFO0FBQzdCLFlBQVksT0FBTyxHQUFHLENBQUM7QUFDdkIsU0FBUztBQUNUO0FBQ0EsUUFBUSxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEdBQUcsQ0FBQztBQUNoRTtBQUNBLFFBQVEsS0FBSyxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN0QztBQUNBLFFBQVEsUUFBUSxLQUFLO0FBQ3JCLFlBQVksS0FBSyxNQUFNLEVBQUUsTUFBTSxHQUFHLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsTUFBTTtBQUNwRSxZQUFZLEtBQUssT0FBTyxFQUFFLE1BQU0sR0FBRyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTTtBQUNoRSxZQUFZLEtBQUssU0FBUyxFQUFFLE1BQU0sR0FBRyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU07QUFDdEUsWUFBWSxLQUFLLFFBQVEsRUFBRSxNQUFNLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQU07QUFDL0QsWUFBWSxLQUFLLFFBQVEsRUFBRSxNQUFNLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQU07QUFDL0QsWUFBWSxLQUFLLE1BQU0sRUFBRSxNQUFNLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLE1BQU07QUFDOUQsWUFBWSxLQUFLLEtBQUssRUFBRSxNQUFNLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxHQUFHLFNBQVMsSUFBSSxLQUFLLENBQUMsQ0FBQyxNQUFNO0FBQzFFLFlBQVksS0FBSyxNQUFNLEVBQUUsTUFBTSxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksR0FBRyxTQUFTLElBQUksTUFBTSxDQUFDLENBQUMs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Ozs7Ozs7Ozs7OztPQXRCaEQsUUFBUTtPQUNSLE1BQU07T0FDTixNQUFNO09BQ04sSUFBSTtPQUNKLFVBQVU7T0FDVixVQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
