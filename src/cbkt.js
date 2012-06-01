var cbkt = (function(undefined) {
  // Object.create未実装のブラウザ対応
  if (!Object.create) {
    (function() {
      Object.create = function(base) {
        var F = function() {};
        F.prototype = base;
        return new F();
      };
    })();
  }

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
    },

    enumurator: {
      // 列挙型オブジェクトを作成する。
      create: function(elements, baseClass) {
        var elementsLen = elements.length;
        var obj = {};
        var element;
        var prop;

        // 各列挙値に対応する、baseClassのprototypeを引き継いだ列挙型オブジェクト作成
        for (prop in elements) {
          if (elements.hasOwnProperty(prop)) {
            obj[prop] = Object.create(baseClass);

            // 列挙値をenumオブジェクトに追加
            obj[prop].value = elements[prop];
          }
        }

        // 列挙値からの逆引きメソッドをenumオブジェクトに追加
        obj.valueOf = function(value) {
          for (prop in obj) {
            if (obj.hasOwnProperty(prop) && obj[prop].value === value) {
              return obj[prop];
            }
          }
          return null;
        };

        return obj;
      }
    }
  };

  return cbkt;
})();


