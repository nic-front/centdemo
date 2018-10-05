/**
 * Normalizes the responses from APIs so that the methods implemented here
 * can expect the same response format.
 *
 * @param response
 * @returns {Promise}
 */
function normalizeResponse(response, isFile) {
  if (response.status >= 400) {
    return Promise.reject(response);
  }
  return isFile ? response.blob() : response.json();
}

/**
 * Implements utility methods that facilitate API calls.
 * Currently they are implemented as wrappers around the Fetch API. But the
 * clients are abstracted away from that.
 */
export default {
  /**
   * Makes an HTTP request using the given method and url. It accepts optional params and
   * authToken.
   * If present the authToken is sent in the Authorization header.
   *
   * @param {string} method The HTTP method to use (GET, POST, PUT, DELETE, etc)
   * @param {string} url The url
   * @param params Optional JSON object to be sent in the body
   * @param authToken Optional auth token to be sent in Authorization header.
   * @returns {Promise} Returns a promise that resolves to the response from the endpoint.
   */
  request(method, url, params, authToken, isFile = false) {
    const csrftoken = document.cookie?document.cookie.match(/csrftoken=(\w+)/)[1]:'';
    const config = {
      method,
      headers: {
        'X-CSRFToken': csrftoken,
      },
      credentials: 'same-origin', // To enable cookies
    };

    if (params && Object.keys(params).length) {
      if (!(method === 'GET' || method === 'HEAD')) {
        config.body = JSON.stringify(params);
      }
      else {
        const queryString = (Object.keys(params).map(key => params[key] ? `${key}=${params[key]}` : '').filter(item => !!item).join('&'));
        if (url.indexOf('?') !== -1) {
          url += '&' + queryString;
        }
        else {
          url += '?' + queryString;
        }
      }
    }

    if (!isFile && ['POST', 'DELETE', 'PUT', 'PATCH'].indexOf(method.toUpperCase()) !== -1) {
      config.headers['Content-Type'] = 'application/json;charset=utf-8';
    }

    if (authToken) {
      config.headers.Authorization = authToken;
    }
    return fetch(`${url}`, config)
      .then(response => normalizeResponse(response, isFile))
      .catch((response) => {
        const { headers } = response;

        if (headers && headers.get('Content-Type').indexOf('application/json') === 0) {
          return response.json().then(r => Promise.reject(r));
        }

        return Promise.reject(response);
      });
  },

  /**
   * Shortcut method to perform GET request. See request()
   *
   * @param {string} url The url
   * @param params Optional JSON object to be sent in the body
   * @param authToken Optional auth token to be sent in Authorization header.
   * @returns {Promise} Returns a promise that resolves to the response from the endpoint.
   */
  get(url, params, authToken) {
    return this.request('GET', url, params, authToken);
  },

  /**
   * Shortcut method to perform DELETE request. See request()
   *
   * @param {string} url The url
   * @param params Optional JSON object to be sent in the body
   * @param authToken Optional auth token to be sent in Authorization header.
   * @returns {Promise} Returns a promise that resolves to the response from the endpoint.
   */
  del(url, params, authToken) {
    return this.request('DELETE', url, params, authToken);
  },

  /**
   * Shortcut method to perform POST request. See request()
   *
   * @param {string} url The url
   * @param params Optional JSON object to be sent in the body
   * @param authToken Optional auth token to be sent in Authorization header.
   * @returns {Promise} Returns a promise that resolves to the response from the endpoint.
   */
  post(url, params, authToken) {
    return this.request('POST', url, params, authToken);
  },

  /**
   * Shortcut method to perform PUT request. See request()
   *
   * @param {string} url The url
   * @param params Optional JSON object to be sent in the body
   * @param authToken Optional auth token to be sent in Authorization header.
   * @returns {Promise} Returns a promise that resolves to the response from the endpoint.
   */
  put(url, params, authToken) {
    return this.request('PUT', url, params, authToken);
  },

  /**
   * Shortcut method to perform PATH request. See request()
   *
   * @param {string} url The url
   * @param params Optional JSON object to be sent in the body
   * @param authToken Optional auth token to be sent in Authorization header.
   * @returns {Promise} Returns a promise that resolves to the response from the endpoint.
   */
  patch(url, params, authToken) {
    return this.request('PATCH', url, params, authToken);
  },

  postToBlob(url, params, authToken) {
    return this.request('POST', url, params, authToken, true);
  },

  toQueryString (params) {
    return (Object.keys(params).map(key => params[key] ? `${key}=${params[key]}` : '').filter(item => !!item).join('&'));
  }
};
