var test = require('tape');
var transpile = require('../');

var fs = require('fs');
function cssFile(name) {
  return fs.readFileSync(__dirname+'/css/'+name+'.css', 'utf8');
}

// because I have obsessive tendencies...
test('formats empty rules', function(t) {
  t.plan(1);
  var style = {
    a: {},
    div: {}
  };
  t.equal(transpile(style), cssFile('empty-rules'));
});

test('simple rules', function(t) {
  t.plan(1);
  var style = {
    p: {
      height: '20px',
      color: '#0c0'
    },
    a: {
      background: 'black',
      padding: '10px 5px'
    },
  };
  t.equal(transpile(style), cssFile('simple-rules'));
});

test('number values', function(t) {
  t.plan(1);
  var style = {
    p: {
      opacity: 1
    }
  };
  t.equal(transpile(style), cssFile('number-values'));
});

test('dashed declarations', function(t) {
  t.plan(1);
  var style = {
    p: {
      'line-height': 1
    }
  };
  t.equal(transpile(style), cssFile('dashed-decl'));
});

test('camelCased declarations', function(t) {
  t.plan(1);
  var style = {
    p: {
      lineHeight: 1,
      '-webkitFlex': 1
    }
  };
  t.equal(transpile(style), cssFile('camel-cased'));
});

test('nested rules', function(t) {
  t.plan(1);
  var style = {
    p: {
      color: '#000',
      background: 'white',
      a: {
        color: '#990000',
        background: 'black',
        span: {
          color: '#AAA'
        }
      }
    }
  };
  t.equal(transpile(style), cssFile('nested-rules'));
});

test('complex selectors', function(t) {
  t.plan(1);
  var style = {
    '#foo div .nest-fest': {
      color: '#777'
    },
    '.foo.bar:hover': {
      color: '#FFF'
    }
  };
  t.equal(transpile(style), cssFile('complex-rules'));
});

test('reference selector', function(t) {
  t.plan(1);
  var style = {
    '#foo': {
      color: '#333',
      '&:hover': {
        color: '#777'
      }
    }
  };
  t.equal(transpile(style), cssFile('reference-selector'));
});

test('referece selector (nested)', function(t) {
  t.plan(1);
  var style = {
    '#foo': {
      color: '#333',
      a: {
        color: '#555',
        '&:hover': {
          color: '#777'
        },
        span: {
          color: '#999'
        }
      }
    }
  };
  t.equal(transpile(style), cssFile('reference-selector-nested'));
});

test('reference selector (nested, complex)', function(t) {
  t.plan(1);
  var style = {
    '#foo': {
      color: '#333',
      a: {
        color: '#555',
        '&:hover': {
          color: '#777',
          span: {
            color: '#999'
          }
        },
        span: {
          color: '#CCC',
          '&:hover': {
            color: 'red'
          }
        }
      }
    }
  };
  t.equal(transpile(style), cssFile('reference-selector-nested-complex'));
});
