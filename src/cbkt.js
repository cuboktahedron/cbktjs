var cbkt = (function(undefined) {
  cbkt = {
    namespace: function(ns) {
      var obj = this;
      var levels = ns.split('.');

      for (var i = 0; i < levels.length; i++) {
        if (obj[levels[i]] === undefined) {
          obj[levels[i]] = {};
        }
        obj = obj[levels[i]];
      }

      return obj;
    }
  };

  return cbkt;
})();


