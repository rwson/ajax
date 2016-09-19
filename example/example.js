"use strtct";

window.onload = function() {

    var sameDomain = {
        "json": "/json",
        "xml": "/xml",
        "script": "/script",
        "other": "/other"
    };

    //  dataType json
    ajax({
        url: sameDomain.json,
        method: "POST",
        dataType: "JSON",
        data: {
            send: "data",
            array: [{
                key1: "value1",
                key2: "value2",
                key3: "value3"
            }, {
                key1: "value1",
                key2: "value2",
                key3: "value3"
            }]
        },
        success: function(res, xhr) {
            console.group("same domain json data type - POST");
            console.log(res);
            console.groupEnd();
        },
        error: function(res, ex, xhr) {}
    });

    ajax({
        url: sameDomain.json,
        method: "GET",
        dataType: "JSON",
        data: {
            send: "data",
            array: [{
                key1: "value1",
                key2: "value2",
                key3: "value3"
            }, {
                key1: "value1",
                key2: "value2",
                key3: "value3"
            }]
        },
        success: function(res, xhr) {
            console.group("same domain json data type - GET");
            console.log(res);
            console.groupEnd();
        },
        error: function(res, ex, xhr) {}
    });

    //  dataType XML
    ajax({
        url: sameDomain.xml,
        method: "POST",
        dataType: "XML",
        data: {
            send: "data",
            array: [{
                key1: "value1",
                key2: "value2",
                key3: "value3"
            }, {
                key1: "value1",
                key2: "value2",
                key3: "value3"
            }]
        },
        success: function(res, xhr) {
            console.group("same domain xml data type - POST");
            console.log(res);
            console.groupEnd();
        },
        error: function(res, ex, xhr) {}
    });

    ajax({
        url: sameDomain.xml,
        method: "GET",
        dataType: "XML",
        data: {
            send: "data",
            array: [{
                key1: "value1",
                key2: "value2",
                key3: "value3"
            }, {
                key1: "value1",
                key2: "value2",
                key3: "value3"
            }]
        },
        success: function(res, xhr) {
            console.group("same domain xml data type - GET");
            console.log(res);
            console.groupEnd();
        },
        error: function(res, ex, xhr) {}
    });

    //  dataType script
    ajax({
        url: sameDomain.script,
        method: "POST",
        dataType: "script",
        data: {
            send: "data",
            array: [{
                key1: "value1",
                key2: "value2",
                key3: "value3"
            }, {
                key1: "value1",
                key2: "value2",
                key3: "value3"
            }]
        },
        success: function(res, xhr) {
            console.group("same domain script data type - POST");
            console.log(res);
            console.groupEnd();
        },
        error: function(res, ex, xhr) {

        }
    });

    ajax({
        url: sameDomain.script,
        method: "GET",
        dataType: "script",
        data: {
            send: "data",
            array: [{
                key1: "value1",
                key2: "value2",
                key3: "value3"
            }, {
                key1: "value1",
                key2: "value2",
                key3: "value3"
            }]
        },
        success: function(res, xhr) {
            console.group("same domain script data type - GET");
            console.log(res);
            console.groupEnd();
        },
        error: function(res, ex, xhr) {

        }
    });

    //  dataType text
    ajax({
        url: sameDomain.other,
        method: "POST",
        dataType: "text",
        data: {
            send: "data",
            array: [{
                key1: "value1",
                key2: "value2",
                key3: "value3"
            }, {
                key1: "value1",
                key2: "value2",
                key3: "value3"
            }]
        },
        success: function(res, xhr) {
            console.group("same domain text data type - POST");
            console.log(res);
            console.groupEnd();
        },
        error: function(res, ex, xhr) {

        }
    });

    ajax({
        url: sameDomain.other,
        method: "GET",
        dataType: "text",
        data: {
            send: "data",
            array: [{
                key1: "value1",
                key2: "value2",
                key3: "value3"
            }, {
                key1: "value1",
                key2: "value2",
                key3: "value3"
            }]
        },
        success: function(res, xhr) {
            console.group("same domain text data type - GET");
            console.log(res);
            console.groupEnd();
        },
        error: function(res, ex, xhr) {

        }
    });


    var differentPrefix = "http://localhost:3000";
    var differentDomain = {
        "json": differentPrefix + "/json",
        "xml": differentPrefix + "/xml",
        "script": differentPrefix + "/script",
        "other": differentPrefix + "/other",
        "jsonp": differentPrefix + "/jsonp"
    };

    //  dataType json
    ajax({
        url: differentDomain.json,
        method: "POST",
        dataType: "JSON",
        withCredentials: true,
        data: {
            send: "data",
            array: [{
                key1: "value1",
                key2: "value2",
                key3: "value3"
            }, {
                key1: "value1",
                key2: "value2",
                key3: "value3"
            }]
        },
        success: function(res, xhr) {
            console.group("different domain json data type - POST");
            console.log(res);
            console.groupEnd();
        },
        error: function(res, ex, xhr) {}
    });

    ajax({
        url: differentDomain.json,
        method: "GET",
        dataType: "JSON",
        withCredentials: true,
        data: {
            send: "data",
            array: [{
                key1: "value1",
                key2: "value2",
                key3: "value3"
            }, {
                key1: "value1",
                key2: "value2",
                key3: "value3"
            }]
        },
        success: function(res, xhr) {
            console.group("different domain json data type - GET");
            console.log(res);
            console.groupEnd();
        },
        error: function(res, ex, xhr) {}
    });

    //  dataType XML
    ajax({
        url: differentDomain.xml,
        withCredentials: true,
        method: "POST",
        dataType: "XML",
        data: {
            send: "data",
            array: [{
                key1: "value1",
                key2: "value2",
                key3: "value3"
            }, {
                key1: "value1",
                key2: "value2",
                key3: "value3"
            }]
        },
        success: function(res, xhr) {
            console.group("different domain xml data type - POST");
            console.log(res);
            console.groupEnd();
        },
        error: function(res, ex, xhr) {}
    });

    ajax({
        url: differentDomain.xml,
        withCredentials: true,
        method: "GET",
        dataType: "XML",
        data: {
            send: "data",
            array: [{
                key1: "value1",
                key2: "value2",
                key3: "value3"
            }, {
                key1: "value1",
                key2: "value2",
                key3: "value3"
            }]
        },
        success: function(res, xhr) {
            console.group("different domain xml data type - GET");
            console.log(res);
            console.groupEnd();
        },
        error: function(res, ex, xhr) {}
    });

    //  dataType script
    ajax({
        url: differentDomain.script,
        withCredentials: true,
        method: "POST",
        dataType: "script",
        data: {
            send: "data",
            array: [{
                key1: "value1",
                key2: "value2",
                key3: "value3"
            }, {
                key1: "value1",
                key2: "value2",
                key3: "value3"
            }]
        },
        success: function(res, xhr) {
            console.group("different domain script data type - POST");
            console.log(res);
            console.groupEnd();
        },
        error: function(res, ex, xhr) {

        }
    });

    ajax({
        url: differentDomain.script,
        withCredentials: true,
        method: "GET",
        dataType: "script",
        data: {
            send: "data",
            array: [{
                key1: "value1",
                key2: "value2",
                key3: "value3"
            }, {
                key1: "value1",
                key2: "value2",
                key3: "value3"
            }]
        },
        success: function(res, xhr) {
            console.group("different domain script data type - GET");
            console.log(res);
            console.groupEnd();
        },
        error: function(res, ex, xhr) {

        }
    });

    //  dataType text
    ajax({
        url: differentDomain.other,
        withCredentials: true,
        method: "POST",
        dataType: "text",
        data: {
            send: "data",
            array: [{
                key1: "value1",
                key2: "value2",
                key3: "value3"
            }, {
                key1: "value1",
                key2: "value2",
                key3: "value3"
            }]
        },
        success: function(res, xhr) {
            console.group("different domain text data type - POST");
            console.log(res);
            console.groupEnd();
        },
        error: function(res, ex, xhr) {

        }
    });

    ajax({
        url: differentDomain.other,
        withCredentials: true,
        method: "GET",
        dataType: "text",
        data: {
            send: "data",
            array: [{
                key1: "value1",
                key2: "value2",
                key3: "value3"
            }, {
                key1: "value1",
                key2: "value2",
                key3: "value3"
            }]
        },
        success: function(res, xhr) {
            console.group("different domain text data type - GET");
            console.log(res);
            console.groupEnd();
        },
        error: function(res, ex, xhr) {

        }
    });

    //  JSONP cross domain request
    ajax({
        url: differentDomain.jsonp,
        dataType: "jsonp",
        async: false,
        data: {
            send: "data",
            array: [{
                key1: "value1",
                key2: "value2",
                key3: "value3"
            }, {
                key1: "value1",
                key2: "value2",
                key3: "value3"
            }]
        },
        success: function(res) {
            console.group("different domain jsonp request");
            console.log(res);
            console.groupEnd();
        },
        error: function(ex) {

        }
    });

};
