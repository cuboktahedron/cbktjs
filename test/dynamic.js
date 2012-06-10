if (cbkt.test) {
  cbkt.test.value += 10;
} else {
  cbkt.namespace('test');
  cbkt.test.value = 10;
}

