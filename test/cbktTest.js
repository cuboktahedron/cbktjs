(function(undefined) {
  module('nameSpaceTest', {
    teardown: function() {
      delete cbkt.nstest;
    }
  });

  test('新しいnamespaceオブジェクトが作成されること', function() {
    cbkt.namespace('nstest');
    same(cbkt.nstest, {});
  });

  test('多階層のnamespaceオブジェクトが作成されること', function() {
    cbkt.namespace('nstest.nested1.nested2');
    same(cbkt.nstest.nested1.nested2, {});
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
        return this.value + 10;
      }
    };

    var enumObj = cbkt.enumurator.create({
      E1: 1,
      E2: 2
    }, enumClass);

    ok(enumObj.E1);
    ok(enumObj.E2);
    same(enumObj.E1, enumObj.E1);
    same(enumObj.E2, enumObj.E2);
    same(enumObj.E1.value, 1);
    same(enumObj.E2.value, 2);
    same(enumObj.E1.add10(), 11);
    same(enumObj.E2.add10(), 12);
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

    same(enumObj.valueOf(1), enumObj.E1);
    same(enumObj.valueOf(2), enumObj.E2);
  });
}());


