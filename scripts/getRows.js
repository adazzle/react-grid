module.exports = function(start, end) {
  var result = []
  for (var i = start; i < end; i++) {
    result.push({
      id: i,
      title: 'Title ' + i,
      count: i * 1000
    });
  }
  return result;
};
