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

  var cbkt = {
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

    require: (function() {
      // 読み込み済みファイルのストア用
      var loadedSrcs = {};
      
      return function(url, checker, onLoadHandler) {
        if (loadedSrcs[url]) {
          onLoadHandler(false);
          return;
        }

        var waitLoadCompletion = function() {

          // 読み込み完了判定処理
          var isLoaded = new Function('return !!(' + checker + ')');

          // 読み込み完了チェックループ
          setTimeout(function() {
            if (isLoaded()) {
              loadedSrcs[url] = true;
              onLoadHandler(true);
            } else {
              setTimeout(arguments.callee, 100);
            }
          }, 100);
        };

        // <script>タグを動的に作成しファイルを読み込む
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(script);

        // 読み込み完了を待ち合わせる
        waitLoadCompletion();
      };
    })(),

    enumurator: {
      // 列挙型オブジェクトを作成する。
      create: function(elements, baseClass) {
        var obj = {};
        var element;
        var prop;

        // 各列挙値に対応する、baseClassのprototypeを引き継いだ列挙型オブジェクト作成
        for (prop in elements) {
          if (elements.hasOwnProperty(prop)) {
            obj[prop] = Object.create(baseClass);

            // 列挙値を返す関数を列挙型オブジェクトに追加
            obj[prop].value = (function () {
              var value = elements[prop];
              return function() {
                return value;
              };
            })();
          }
        }

        // 列挙値からの逆引きメソッドを列挙型オブジェクトに追加
        obj.elementOf = function(value) {
          for (prop in obj) {
            if (obj.hasOwnProperty(prop) && obj[prop].value() === value) {
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


