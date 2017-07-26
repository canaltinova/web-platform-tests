setup({explicit_done : true});

var styleValidTests = {
  'weight': [
    'bold',
    '700',
    '900',
    '850',
    '850.3',
  ],
  'stretch': ['51%', '199%', 'calc(10% + 20%)']
};

var styleInvalidTests = {
  'weight': ['100 400'],
  'stretch': ['100% 110%', '0%', '100% 150%']
};

function testParseStyle() {
  for (validStyleTestCategory of Object.keys(styleValidTests)) {
    for (validStyleTest of styleValidTests[validStyleTestCategory]) {
      test(
          function() {
            assert_true(
                CSS.supports('font-' + validStyleTestCategory, validStyleTest));
          },
          'Valid value ' + validStyleTest + ' for font property ' +
              validStyleTestCategory + ' used for styling.')
    }
  }
  for (invalidStyleTestCategory of Object.keys(styleInvalidTests)) {
    for (invalidStyleTest of styleInvalidTests[invalidStyleTestCategory]) {
      test(
          function() {
            assert_false(CSS.supports(
                'font-' + invalidStyleTestCategory, invalidStyleTest));
          },
          'Invalid value ' + invalidStyleTest + ' for font property ' +
              invalidStyleTestCategory + ' used for styling.')
    }
  }
}

var faceTests = {
  'weight': [
    ['100', '100'], ['700', '700'], ['900', '900'], ['bold', 'bold'],
    ['normal', 'normal']
  ],
  'stretch': [
    ['100%', '100%'],
    ['110%', '110%'],
    ['111.5%', '111.5%'],
    ['ultra-condensed', 'ultra-condensed'],
    ['ultra-expanded', 'ultra-expanded'],
  ],
};

var faceInvalidTests = {
  'weight': [
    '1001',
    '1000.5',
    '100 200 300',
    'a',
    'a b c',
  ],
  'stretch': [
    '0%', '60% 70% 80%', 'a%', 'a b c', '0.1', '-60% 80%', 'ultra-expannnned',
    '50% 0'
  ],
};

function testParseFace() {
  for (var theProperty of Object.keys(faceTests)) {
    for (var faceTest of faceTests[theProperty]) {
      test(
          () => {
            var fontFace = new FontFace('testfont', 'url()');
            assert_equals(fontFace[theProperty], 'normal');
            fontFace[theProperty] = faceTest[0];
            assert_equals(fontFace[theProperty], faceTest[1]);
          },
          'Valid value ' + faceTest[0] + ' matches ' + faceTest[1] + ' for ' +
              theProperty + ' in @font-face.');
    }
  }

  for (var theProperty of Object.keys(faceInvalidTests)) {
    for (var faceTest of faceInvalidTests[theProperty]) {
      test(
          () => {
            var fontFace = new FontFace('testfont', 'url()');
            assert_throws('SyntaxError', () => {
              fontFace[theProperty] = faceTest;
            }, 'Value must not be accepted as weight value.');
          },
          'Value ' + faceTest + ' must not be accepted as ' + theProperty +
              ' in @font-face.')
    }
  }
}

window.addEventListener('load', function() {
  testParseStyle();
  testParseFace();
  done();
});
