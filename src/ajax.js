/**
 * ajax library
 * @author rwson
 * @mail   rw_Song@sina.com
 */

"use strtct";

(function(root, factory, undefined) {

    if (typeof root.define === "function" && typeof define.amd !== typeof undefined) {
        return factory(root, undefined);
    } else {
        factory(root, undefined);
    }

})(window, function(root) {

    //  cache some regexps
    var xmlRe = /xml/i,
        scriptRe = /script/i,
        jsonRe = /json$/i,
        jsonpRe = /jsonp$/i;

    //  cache accept map
    var typeMaps = {
        script: "text/javascript, application/javascript",
        json: "application/json",
        xml: "application/xml, text/xml",
        html: "text/html",
        text: "text/plain"
    };

    //  cache the head tag
    var body = document.getElementsByTagName("head");

    //  default configs about ajax
    var defaultCfg = {
        url: location.href,
        method: "GET",
        data: {},
        headers: {},
        dataType: "JSON",
        withCredentials: false,
        timeout: -1,
        contentType: "",
        async: true,
        context: root,
        before: function() {},
        abort: function() {},
        success: function() {},
        error: function() {}
    };

    /**
     * constructor of ajax class
     */
    function Ajax(opt) {
        var finalCfg = _merge(defaultCfg, opt || {}),
            data = _serializenData(finalCfg.data),
            timeout = null,
            hasTimeout = false,
            supportCors = true,
            xhr, headers, scriptNode, response, data, dataType;

        data = _serializenData(finalCfg.data);
        dataType = _getDataType(finalCfg.dataType);

        if (finalCfg.method.toLowerCase() === "get") {
            if (finalCfg.url.indexOf("?") === -1) {
                finalCfg.url += ("?" + data);
            } else {
                finalCfg.url += ("&" + data);
            }
            data = null;
        }

        //  configed the timeout
        if (finalCfg.timeout > 0) {
            timeout = setTimeout(function() {
                if (_typeOf(finalCfg.abort) === "Function") {
                    finalCfg.abort.call(finalCfg.context, xhr);
                }
                hasTimeout = true;
            }, finalCfg.timeout);
        }

        //  before the request start
        if (_typeOf(finalCfg.before) === "Function") {
            finalCfg.before.call(finalCfg.context);
        }

        //  jsonp type request
        if (dataType === "jsonp") {
            scriptNode = document.createElement("script");
            if (finalCfg.url.indexOf("?") > -1) {
                finalCfg.url += data;
            } else {
                finalCfg.url += ("?" + data);
            }
            scriptNode.src = finalCfg.url;
            head.appendChild(scriptNode);
            scriptNode.onload = function() {
                head.removeChild(scriptNode);
                if (!hasTimeout && timeout) {
                    clearTimeout(timeout);
                }
                //  excute the success callback
                if (_typeOf(finalCfg.success) === "Function") {
                    finalCfg.success.call(finalCfg.context, response, xhr);
                }
            };
        } else {
            xhr = root.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
            supportCors = "withCredentials" in xhr;

            //  bind the readystate change event
            xhr.onreadystatechange = function() {
                //  already timeout
                if (hasTimeout) {
                    return;
                }
                if (xhr.readyState === 4) {
                    //  setted the time out, and not timeout until now
                    if (timeout) {
                        clearTimeout(timeout);
                    }

                    response = xhr.responseText;

                    //  2xx -> success
                    //  304 -> not modified
                    if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                        try {
                            if (dataType === "script") {
                                response = (new Function("return " + response)).call(root);
                            } else if (dataType === "xml") {
                                //   responseXML is not empty
                                if (xhr.responseXML !== null) {
                                    response = xhr.responseXML;
                                }
                            } else if (dataType === "json") {
                                response = response ? JSON.parse(response) : null;
                            } else {
                                response = xhr.responseText;
                            }
                            //  excute the success callback
                            if (_typeOf(finalCfg.success) === "Function") {
                                finalCfg.success.call(finalCfg.context, response, xhr);
                            }
                        } catch (ex) {
                            if (_typeOf(finalCfg.error) === "Function") {
                                //  excute the error callback
                                finalCfg.error.call(finalCfg.context, response, ex, xhr);
                            }
                        }
                    } else {
                        if (_typeOf(finalCfg.error) === "Function") {
                            //  excute the error callback
                            finalCfg.error.call(finalCfg.context, response, null, xhr);
                        }
                    }
                }
            };

            //  mark this request is a XMLHttpRequest(ajax), not a common request
            //  cross domain can not distinguish "X-Requested-With"
            if (!finalCfg.withCredentials) {
                finalCfg.headers = _merge(finalCfg.headers, {
                    "X-Requested-With": "XMLHttpRequest",
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Accept": typeMaps[dataType].indexOf(",") > -1 ? typeMaps[dataType].split(",")[0] : typeMaps[dataType]
                });
            } else {
                finalCfg.headers = _merge(finalCfg.headers, {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Accept": typeMaps[dataType].indexOf(",") > -1 ? typeMaps[dataType].split(",")[0] : typeMaps[dataType]
                });
            }

            //  set the withCredentials attribute
            if (supportCors) {
                xhr.withCredentials = finalCfg.withCredentials;
            }

            xhr.open(finalCfg.method, finalCfg.url, finalCfg.async);
            _setHeaders(xhr, finalCfg.headers);
            xhr.send(data);
        }

    }

    //  set request headers
    function _setHeaders(xhr, headers) {
        if (_typeOf(headers) === "Object") {
            for (var i in headers) {
                if (headers.hasOwnProperty(i)) {
                    xhr.setRequestHeader(i, headers[i]);
                }
            }
        }
    }

    //  serialization data
    function _encode(data) {
        data = data || "";
        return encodeURIComponent(data);
    }

    //  serialize an object to an encoded url string to post
    function _serializenData(data) {
        var res = data,
            typeIn;
        if (_typeOf(data) === "Object") {
            res = [];
            for (var i in data) {
                typeIn = _typeOf(data[i]);
                switch (typeIn) {

                    //  two refrence type(Object/Array) need to loop them and push the return value to the result array
                    case "Object":
                        res.push(_encode(_loopObject(data[i], i)));
                        break;

                    case "Array":
                        res.push(_encode(_loopArray(data[i], i)));
                        break;

                        //  not Object/Array type direct push to the result array
                    default:
                        res.push(_encode(i) + "=" + _encode(data[i]));
                        break;

                }
            }
            res = res.join("&").replace("%20", "+")
        }
        return ("" + res);
    }

    /**
     * deep loop an array, tranfer to an string as return value
     */
    function _loopArray(array, key) {
        var res = [],
            typeIn;
        for (var i = 0, len = array.length; i < len; i++) {
            typeIn = _typeOf(array[i]);
            switch (typeIn) {

                //  two refrence type(Object/Array) need to loop them and push the return value to the result array
                case "Array":
                    res.push(_encode(_loopArray(array[i], (key + "[" + i + "]"))));
                    break;

                case "Object":
                    res.push(_encode(_loopObject(array[i], (key + "[" + i + "]"))));
                    break;

                    //  not Object/Array type direct push to the result array
                default:
                    res.push(_encode(key + "[]" + "=" + array[i]));
                    break;

            }
        }
        return res.join("&");
    }

    /**
     * deep loop an object, tranfer to an string as return value
     */
    function _loopObject(object, key) {
        var res = [],
            typeIn;
        for (var i in object) {
            typeIn = _typeOf(object[i]);
            switch (typeIn) {
                //  two refrence type(Object/Array) need to loop them and push the return value to the result array
                case "Array":
                    res.push(_loopArray(object[i], key + "[" + i + "]"));
                    break;

                case "Object":
                    res.push(_loopObject(object[i], key + "[" + i + "]"));
                    break;

                    //  not Object/Array type direct push to the result array
                default:
                    res.push(_encode(key + "[" + i + "]" + "=" + object[i]));
                    break;
            }
        }
        return res.join("&");
    }

    //  get data type
    function _getDataType(type) {
        var res = "text";
        if (xmlRe.test(type)) {
            res = "xml";
        } else if (scriptRe.test(type)) {
            res = "script";
        } else if (jsonRe.test(type)) {
            res = "json";
        } else if (jsonpRe.test(type)) {
            res = "jsonp";
        }
        return res;
    }

    //  get the className of an object
    function _typeOf(obj) {
        return {}.toString.call(obj).slice(8, -1);
    }

    //  deep copy an object
    function _copy(obj) {
        var _type, _typeIn, _isNative, res;
        _type = _typeOf(obj);
        _isNative = /\[native\s{1}code\]/g;

        switch (_type) {

            case "Array":
                res = [];
                for (var i = 0, len = obj.length; i < len; i++) {
                    _typeIn = _typeOf(obj[i]);
                    if (_typeIn === "Array" || _typeIn === "Object" || _typeIn === "Function") {
                        _copy(obj[i]);
                    } else {
                        res.push(obj[i]);
                    }
                }
                break;

            case "Object":
                res = {};
                for (var i in obj) {
                    if (obj.hasOwnProperty(i)) {
                        _typeIn = _typeOf(obj[i]);
                        if (_typeIn === "Array" || _typeIn === "Object" || _typeIn === "Function") {
                            _copy(obj[i]);
                        } else {
                            res[i] = obj[i];
                        }
                    }
                }
                break;

            case "Function":
                res = obj.toString();
                if (_isNative.test(res)) {
                    res = new Function("return " + res);
                } else {
                    res = new Function("return " + res);
                    for (var i in obj) {
                        res[i] = obj[i];
                    }
                }
                break;

            default:
                res = obj;
                break;

        }
        return res;
    }

    //  merge two objects
    function _merge(obj1, obj2) {
        var res = _copy(obj1) || {};
        for (var i in obj2) {
            res[i] = obj2[i];
        }
        return res;
    }


    root.ajax = Ajax;

    return Ajax;

});
