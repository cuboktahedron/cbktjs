(function(undefined) {
  module('ObjectCreateTest');

  test('渡されたオブジェクトを継承したオブジェクトが作成されること', function() {
    var base = {
      value: 3,
      calculate: function() {
        return this.value * 5;
      }
    };

    var sub = Object.create(base);
    sub.calculate = function() {
      return 4 * base.calculate.call(this);
    };

    deepEqual(sub.calculate(), 60);
  });
})();

(function(undefined) {
  module('nameSpaceTest', {
    teardown: function() {
      delete cbkt.nstest;
    }
  });

  test('新しいnamespaceオブジェクトが作成されること', function() {
    cbkt.namespace('nstest');
    deepEqual(cbkt.nstest, {});
  });

  test('多階層のnamespaceオブジェクトが作成されること', function() {
    cbkt.namespace('nstest.nested1.nested2');
    deepEqual(cbkt.nstest.nested1.nested2, {});
  });

  test('既に存在するnamespaceオブジェクトを上書きしないこと', function() {
    cbkt.nstest = { nested: {} };
    var nstest = cbkt.namespace('nstest');
    ok(cbkt.nstest.nested);
  });

  test('任意のオブジェクトをnamespaceのrootにできること', function() {
    var nsObj = { namespace: cbkt.namespace };
    nsObj.namespace ('nstest');
    ok(nsObj.nstest);
    ok(!cbkt.nstest);
  });
}());

(function(undefined) {
  module('enumTest');

  test('enumオブジェクトが作成されること', function() {
    var enumClass = {
      add10: function() {
        return this.value() + 10;
      }
    };

    var enumObj = cbkt.enumurator.create({
      E1: 1,
      E2: 2
    }, enumClass);

    ok(enumObj.E1);
    ok(enumObj.E2);
    deepEqual(enumObj.E1, enumObj.E1);
    deepEqual(enumObj.E2, enumObj.E2);
    deepEqual(enumObj.E1.value(), 1);
    deepEqual(enumObj.E2.value(), 2);
    deepEqual(enumObj.E1.add10(), 11);
    deepEqual(enumObj.E2.add10(), 12);
  });

  test('列挙値にオブジェクトを渡してenumオブジェクトが作成されること', function() {
    var enumObj = cbkt.enumurator.create({
      E1: { value: 1, isE1: true }
    }, {});

    equal(enumObj.E1.value(), 1);
    equal(enumObj.E1.isE1(), true);
  });

  test('switchで分岐できること', function() {
    var enumObj = cbkt.enumurator.create({
      E1: 1,
      E2: 2
    }, {});

    switch (enumObj.E2) {
      case enumObj.E1:
        ok(false);
      break;
      case enumObj.E2:
        ok(true);
      break;
      default:
        ok(false);
      break;
    }
  });

  test('列挙値から逆引きできること', function() {
    var enumObj = cbkt.enumurator.create({
      E1: 1,
      E2: 2
    }, {});

    deepEqual(enumObj.elementOf(1), enumObj.E1);
    deepEqual(enumObj.elementOf(2), enumObj.E2);
  });

  test('列挙値をオブジェクトのキーとして使用できること', function() {
    var enumObj = cbkt.enumurator.create({
      E1: 1,
      E2: 2
    }, {});

    var obj = {};
    obj[enumObj.E1] = 10;
    obj[enumObj.E2] = 20;
    deepEqual(obj, { E1: 10, E2: 20 });
  });
}());

(function() {
  module('requireTest', {
    teardown: function() {
      delete cbkt.test;
    }
  });

  test('jsファイルが動的読み込みされること', function() {
    stop();
    cbkt.require('dynamic.js', 'cbkt.test.value', function(isLoaded) {
      ok(isLoaded);
      equal(cbkt.test.value, 10);

      cbkt.require('dynamic.js', 'cbkt.test.value', function(isLoaded) {
        ok(!isLoaded, 'require is once only');
        equal(cbkt.test.value, 10, 'require is once only');
        start();
      });
    });
  });
})();

