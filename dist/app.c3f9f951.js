// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/app.js":[function(require,module,exports) {
var sliderInit = function sliderInit() {
  // slider

  var activeIndex = 0;
  var sliderImages = document.querySelectorAll('.mainImageWrap .imgBox');
  var sliderLenght = sliderImages.length;
  var navButton = document.querySelectorAll('[data-nav]');
  var textWrap = document.querySelector('.textBox');
  navButton.forEach(function (btn) {
    var dir = btn.dataset.nav;
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      if (!textWrap.classList.contains('animating')) {
        var tempIndex = activeIndex;
        if (dir == 'left' && activeIndex != 0) {
          activeIndex -= 1;
          textTransition(tempIndex);
          imageTransition(tempIndex);
          // button animation
          buttonAnimation(dir);
        } else if (dir == 'right' && activeIndex < sliderLenght - 1) {
          activeIndex += 1;
          textTransition(tempIndex);
          imageTransition(tempIndex);

          // button animation
          buttonAnimation(dir);
        }
        pagination();
      }
    });
  });
  var thumbSlide = document.querySelectorAll('.smallthumb .sItem');
  thumbSlide.forEach(function (thumb, index) {
    thumb.addEventListener('click', function () {
      if (!textWrap.classList.contains('animating')) {
        var tempIndex = activeIndex;
        activeIndex = index;
        textTransition(tempIndex);
        imageTransition(tempIndex);
        pagination();

        // button animation
        var dir = activeIndex < tempIndex ? 'left' : 'right';
        buttonAnimation(dir);
      }
    });
  });
  gsap.set('.h-title', {
    yPercent: 100
  });
  var sliderTexts = document.querySelectorAll('.h-title');
  gsap.set(sliderImages, {
    clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'
  });
  var buttonAnimation = function buttonAnimation(dir) {
    // button animation
    gsap.fromTo('[data-nav]', 0.5, {
      rotate: 0
    }, {
      rotate: dir == 'left' ? 90 * -1 : 90
    });
  };
  var pagination = function pagination() {
    var pageTrans = document.querySelector('.paginationWrap i').getBoundingClientRect().height;
    gsap.to('.paginationWrap .inner', 0.4, {
      y: pageTrans * activeIndex * -1
    });
  };
  var textTransition = function textTransition(preIndex) {
    var tl = gsap.timeline();
    textWrap.classList.add('animating');
    if (preIndex >= 0) {
      tl.to(sliderTexts[preIndex], 0.3, {
        yPercent: -100
      }).fromTo(sliderTexts[activeIndex], 0.6, {
        yPercent: 100
      }, {
        yPercent: 0,
        onComplete: function onComplete() {
          textWrap.classList.remove('animating');
        }
      });
    } else {
      tl.fromTo(sliderTexts[activeIndex], 0.6, {
        yPercent: 100
      }, {
        yPercent: 0,
        onComplete: function onComplete() {
          textWrap.classList.remove('animating');
        }
      });
    }
  };
  var imageTransition = function imageTransition(preIndex) {
    var tl = gsap.timeline();
    if (preIndex >= 0) {
      var dir = activeIndex > preIndex ? 'right' : 'left';
      tl.fromTo(sliderImages[preIndex], 0.6, {
        zIndex: 2,
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
      }, {
        zIndex: 2,
        clipPath: dir == 'right' ? 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' : 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)'
      }).fromTo(sliderImages[preIndex].querySelector('img'), 0.6, {
        xPercent: 0
      }, {
        xPercent: dir == 'right' ? -50 : 50
      }, '-=.6').fromTo(sliderImages[activeIndex].querySelector('img'), 0.6, {
        xPercent: dir == 'right' ? 50 : -50
      }, {
        xPercent: 0
      }, '-=.6').fromTo(sliderImages[activeIndex], 0.6, {
        zIndex: 5,
        clipPath: dir == 'right' ? 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)' : 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'
      }, {
        zIndex: 5,
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
      }, '-=.6');
    } else {
      tl.to(sliderImages[activeIndex], 0.2, {
        zIndex: 5,
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
      });
    }
  };
  // init event
  imageTransition(-1);
  textTransition(-1);
};
var abouttransition = function abouttransition() {
  var smallNav = document.querySelector('.smallNav');
  smallNavBounding = smallNav.getBoundingClientRect();
  gsap.to('.smallNav', {
    scrollTrigger: {
      trigger: '.aboutSection',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true
    },
    y: window.innerHeight - smallNavBounding.height,
    ease: 'Linear.easeIn'
  });
  var frameBox = document.querySelector('.frameBox');
  frameBoxBounding = frameBox.getBoundingClientRect();
  frmH = frameBoxBounding.height;
  var smallNavpadding = window.getComputedStyle(smallNav);
  gsap.to('.frameBox', {
    scrollTrigger: {
      trigger: '.aboutSection',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true
      // markers: true,
    },

    y: window.innerHeight - frmH - frameBoxBounding.top - parseInt(smallNavpadding.paddingBottom) + 20,
    ease: 'Linear.easeIn'
  });
};
barba.init({
  debug: true,
  transitions: [{
    sync: true,
    leave: function leave(data) {
      // create your stunning leave animation here

      return gsap.to(data.current.container, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)'
      });
    },
    enter: function enter(data) {
      // create your amazing enter animation here

      return gsap.fromTo(data.next.container, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)'
      }, {
        delay: 0.5,
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
      });
    }
  }],
  views: [{
    namespace: 'home',
    beforeEnter: function beforeEnter() {
      // update the menu based on user navigation
      // init event
      sliderInit();
    },
    afterEnter: function afterEnter() {
      // refresh the parallax based on new page content
    }
  }, {
    namespace: 'about',
    beforeEnter: function beforeEnter() {
      // update the menu based on user navigation
      //abouttransition()
    },
    afterEnter: function afterEnter() {
      setTimeout(function () {
        // init event
        abouttransition();
      }, 50);
    }
  }]
});
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51015" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/app.js"], null)
//# sourceMappingURL=/app.c3f9f951.js.map