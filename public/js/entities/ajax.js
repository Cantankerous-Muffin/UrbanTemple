define(
  [
  ], function() {
    var Ajax = {};
    Ajax.perform = function(options) {
      //options = {
      //  $.ajax options ->
      //    type: "GET", "POST",
      //    url: "",
      //    callback: function(data),
      //    data: Optional
      //}

      // TODO: if Backend comply to add the prefix, uncomment this line
      var apiUrl = options.url;
      //apiUrl = '/api' + options.url;

      var defer = $.Deferred();

      var ajaxSettings = {
        url: apiUrl,
        type: options.type
      };

      if (options.data) {
        ajaxSettings.data = options.data;
      }

      var jqXHR = $.ajax(ajaxSettings);


      jqXHR.done(function(data) {
        defer.resolve(options.callback(data));
      });

      jqXHR.fail(function(jqXHR, textStatus, errorThrown) {
        if (jqXHR.status === 401) {
          window.location.assign("/");
        }

        defer.reject({
          statusCode: jqXHR.status,
          errorMessage: jqXHR.responseText
        });
      });

      return defer;
    };

    return Ajax;
  }
);
