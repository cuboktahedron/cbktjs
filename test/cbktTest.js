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
