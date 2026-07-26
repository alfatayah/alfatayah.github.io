exports.id = "component---src-pages-index-js";
exports.ids = ["component---src-pages-index-js"];
exports.modules = {

/***/ "./node_modules/gatsby-plugin-smoothscroll/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/gatsby-plugin-smoothscroll/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

/**
 * Smooth scrolling onClick event handler
 * @param {string} selector argument will be passed to `querySelector`, usually an HTML id
 * @param {string} [blockPosition='start'] argument will be used to determine position where will be scrolled to (start, center, end, nearest)
 * @returns {boolean} false if `document.querySelector` doesn't find a match, otherwise true
 */
var scrollTo = function scrollTo(selector, blockPosition) {
  if (blockPosition === void 0) {
    blockPosition = 'start';
  }
  var element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: blockPosition
    });
    return true;
  }
  if (true) {
    console.warn("gatsby-plugin-smoothscroll:\n The selector: '%s' wasn't found in the document.\n Make sure you pass in a valid CSS selector string.", selector);
  }
  return false;
};
var _default = scrollTo;
exports["default"] = _default;

/***/ }),

/***/ "./node_modules/react-reveal/Fade.js":
/*!*******************************************!*\
  !*** ./node_modules/react-reveal/Fade.js ***!
  \*******************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";
function _interopRequireDefault(o){return o&&o.__esModule?o:{default:o}}function _objectWithoutProperties(o,e){var r={};for(var t in o)e.indexOf(t)>=0||Object.prototype.hasOwnProperty.call(o,t)&&(r[t]=o[t]);return r}function make(o,e){var r=e.distance,t=e.left,p=e.right,a=e.up,l=e.down,i=e.top,u=e.bottom,n=e.big,s=e.mirror,d=e.opposite,_=(r?r.toString():0)+((t?1:0)|(p?2:0)|(i||l?4:0)|(u||a?8:0)|(s?16:0)|(d?32:0)|(o?64:0)|(n?128:0));if(lookup.hasOwnProperty(_))return lookup[_];var f=t||p||a||l||i||u,y=void 0,b=void 0;if(f){if(!s!=!(o&&d)){var v=[p,t,u,i,l,a];t=v[0],p=v[1],i=v[2],u=v[3],a=v[4],l=v[5]}var c=r||(n?"2000px":"100%");y=t?"-"+c:p?c:"0",b=l||i?"-"+c:a||u?c:"0"}return lookup[_]=(0,_globals.animation)((o?"to":"from")+" {opacity: 0;"+(f?" transform: translate3d("+y+", "+b+", 0);":"")+"}\n     "+(o?"from":"to")+" {opacity: 1;transform: none;} "),lookup[_]}function Fade(){var o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:_globals.defaults,e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=o.children,t=(o.out,o.forever),p=o.timeout,a=o.duration,l=void 0===a?_globals.defaults.duration:a,i=o.delay,u=void 0===i?_globals.defaults.delay:i,n=o.count,s=void 0===n?_globals.defaults.count:n,d=_objectWithoutProperties(o,["children","out","forever","timeout","duration","delay","count"]),_={make:make,duration:void 0===p?l:p,delay:u,forever:t,count:s,style:{animationFillMode:"both"},reverse:d.left};return e?(0,_wrap2.default)(d,_,_,r):_}Object.defineProperty(exports, "__esModule", ({value:!0}));var _propTypes=__webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js"),_globals=__webpack_require__(/*! ./globals */ "./node_modules/react-reveal/globals.js"),_wrap=__webpack_require__(/*! ./wrap */ "./node_modules/react-reveal/wrap.js"),_wrap2=_interopRequireDefault(_wrap),propTypes={out:_propTypes.bool,left:_propTypes.bool,right:_propTypes.bool,top:_propTypes.bool,bottom:_propTypes.bool,big:_propTypes.bool,mirror:_propTypes.bool,opposite:_propTypes.bool,duration:_propTypes.number,timeout:_propTypes.number,distance:_propTypes.string,delay:_propTypes.number,count:_propTypes.number,forever:_propTypes.bool},lookup={};Fade.propTypes=propTypes,exports["default"]=Fade,module.exports=exports.default;

/***/ }),

/***/ "./node_modules/react-reveal/RevealBase.js":
/*!*************************************************!*\
  !*** ./node_modules/react-reveal/RevealBase.js ***!
  \*************************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";
function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _defineProperty(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports, "__esModule", ({value:!0}));var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_slicedToArray=function(){function e(e,t){var i=[],s=!0,o=!1,n=void 0;try{for(var r,a=e[Symbol.iterator]();!(s=(r=a.next()).done)&&(i.push(r.value),!t||i.length!==t);s=!0);}catch(e){o=!0,n=e}finally{try{!s&&a.return&&a.return()}finally{if(o)throw n}}return i}return function(t,i){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,i);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),_extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var s in i)Object.prototype.hasOwnProperty.call(i,s)&&(e[s]=i[s])}return e},_createClass=function(){function e(e,t){for(var i=0;i<t.length;i++){var s=t[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(t,i,s){return i&&e(t.prototype,i),s&&e(t,s),t}}(),_react=__webpack_require__(/*! react */ "react"),_react2=_interopRequireDefault(_react),_propTypes=__webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js"),_globals=__webpack_require__(/*! ./globals */ "./node_modules/react-reveal/globals.js"),inOut=(0,_propTypes.shape)({make:_propTypes.func,duration:_propTypes.number.isRequired,delay:_propTypes.number.isRequired,forever:_propTypes.bool,count:_propTypes.number.isRequired,style:_propTypes.object.isRequired,reverse:_propTypes.bool}),propTypes={collapse:_propTypes.bool,collapseEl:_propTypes.element,cascade:_propTypes.bool,wait:_propTypes.number,force:_propTypes.bool,disabled:_propTypes.bool,appear:_propTypes.bool,enter:_propTypes.bool,exit:_propTypes.bool,fraction:_propTypes.number,refProp:_propTypes.string,innerRef:_propTypes.func,onReveal:_propTypes.func,unmountOnExit:_propTypes.bool,mountOnEnter:_propTypes.bool,inEffect:inOut.isRequired,outEffect:(0,_propTypes.oneOfType)([inOut,(0,_propTypes.oneOf)([!1])]).isRequired,ssrReveal:_propTypes.bool,collapseOnly:_propTypes.bool,ssrFadeout:_propTypes.bool},defaultProps={fraction:.2,refProp:"ref"},contextTypes={transitionGroup:_propTypes.object},RevealBase=function(e){function t(e,i){_classCallCheck(this,t);var s=_possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i));return s.isOn=void 0===e.when||!!e.when,s.state={collapse:e.collapse?t.getInitialCollapseStyle(e):void 0,style:{opacity:s.isOn&&!e.ssrReveal||!e.outEffect?void 0:0}},s.savedChild=!1,s.isShown=!1,_globals.observerMode?s.handleObserve=s.handleObserve.bind(s):(s.revealHandler=s.makeHandler(s.reveal),s.resizeHandler=s.makeHandler(s.resize)),s.saveRef=s.saveRef.bind(s),s}return _inherits(t,e),_createClass(t,[{key:"saveRef",value:function(e){this.childRef&&this.childRef(e),this.props.innerRef&&this.props.innerRef(e),this.el!==e&&(this.el=e&&"offsetHeight"in e?e:void 0,this.observe(this.props,!0))}},{key:"invisible",value:function(){this&&this.el&&(this.savedChild=!1,this.isShown||(this.setState({hasExited:!0,collapse:this.props.collapse?_extends({},this.state.collapse,{visibility:"hidden"}):null,style:{opacity:0}}),!_globals.observerMode&&this.props.collapse&&window.document.dispatchEvent(_globals.collapseend)))}},{key:"animationEnd",value:function(e,t,i){var s=this,o=i.forever,n=i.count,r=i.delay,a=i.duration;if(!o){var l=function(){s&&s.el&&(s.animationEndTimeout=void 0,e.call(s))};this.animationEndTimeout=window.setTimeout(l,r+(a+(t?a:0)*n))}}},{key:"getDimensionValue",value:function(){return this.el.offsetHeight+parseInt(window.getComputedStyle(this.el,null).getPropertyValue("margin-top"),10)+parseInt(window.getComputedStyle(this.el,null).getPropertyValue("margin-bottom"),10)}},{key:"collapse",value:function(e,t,i){var s=i.duration+(t.cascade?i.duration:0),o=this.isOn?this.getDimensionValue():0,n=void 0,r=void 0;if(t.collapseOnly)n=i.duration/3,r=i.delay;else{var a=s>>2,l=a>>1;n=a,r=i.delay+(this.isOn?0:s-a-l),e.style.animationDuration=s-a+(this.isOn?l:-l)+"ms",e.style.animationDelay=i.delay+(this.isOn?a-l:0)+"ms"}return e.collapse={height:o,transition:"height "+n+"ms ease "+r+"ms",overflow:t.collapseOnly?"hidden":void 0},e}},{key:"animate",value:function(e){if(this&&this.el&&(this.unlisten(),this.isShown!==this.isOn)){this.isShown=this.isOn;var t=!this.isOn&&e.outEffect,i=e[t?"outEffect":"inEffect"],s="style"in i&&i.style.animationName||void 0,o=void 0;e.collapseOnly?o={hasAppeared:!0,hasExited:!1,style:{opacity:1}}:((e.outEffect||this.isOn)&&i.make&&(s=i.make),o={hasAppeared:!0,hasExited:!1,collapse:void 0,style:_extends({},i.style,{animationDuration:i.duration+"ms",animationDelay:i.delay+"ms",animationIterationCount:i.forever?"infinite":i.count,opacity:1,animationName:s}),className:i.className}),this.setState(e.collapse?this.collapse(o,e,i):o),t?(this.savedChild=_react2.default.cloneElement(this.getChild()),this.animationEnd(this.invisible,e.cascade,i)):this.savedChild=!1,this.onReveal(e)}}},{key:"onReveal",value:function(e){e.onReveal&&this.isOn&&(this.onRevealTimeout&&(this.onRevealTimeout=window.clearTimeout(this.onRevealTimeout)),e.wait?this.onRevealTimeout=window.setTimeout(e.onReveal,e.wait):e.onReveal())}},{key:"componentWillUnmount",value:function(){this.unlisten(),_globals.ssr&&(0,_globals.disableSsr)()}},{key:"handleObserve",value:function(e,t){_slicedToArray(e,1)[0].intersectionRatio>0&&(t.disconnect(),this.observer=null,this.reveal(this.props,!0))}},{key:"observe",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(this.el&&_globals.observerMode){if(this.observer){if(!t)return;this.observer.disconnect()}else if(t)return;this.observer=new IntersectionObserver(this.handleObserve,{threshold:e.fraction}),this.observer.observe(this.el)}}},{key:"reveal",value:function(e){var t=this,i=arguments.length>1&&void 0!==arguments[1]&&arguments[1];_globals.globalHide||(0,_globals.hideAll)(),this&&this.el&&(e||(e=this.props),_globals.ssr&&(0,_globals.disableSsr)(),this.isOn&&this.isShown&&void 0!==e.spy?(this.isShown=!1,this.setState({style:{}}),window.setTimeout(function(){return t.reveal(e)},200)):i||this.inViewport(e)||e.force?this.animate(e):_globals.observerMode?this.observe(e):this.listen())}},{key:"componentDidMount",value:function(){var e=this;if(this.el&&!this.props.disabled){this.props.collapseOnly||("make"in this.props.inEffect&&this.props.inEffect.make(!1,this.props),void 0!==this.props.when&&this.props.outEffect&&"make"in this.props.outEffect&&this.props.outEffect.make(!0,this.props));var i=this.context.transitionGroup,s=i&&!i.isMounting?!("enter"in this.props&&!1===this.props.enter):this.props.appear;return this.isOn&&((void 0!==this.props.when||void 0!==this.props.spy)&&!s||_globals.ssr&&!_globals.fadeOutEnabled&&!this.props.ssrFadeout&&this.props.outEffect&&!this.props.ssrReveal&&t.getTop(this.el)<window.pageYOffset+window.innerHeight)?(this.isShown=!0,this.setState({hasAppeared:!0,collapse:this.props.collapse?{height:this.getDimensionValue()}:this.state.collapse,style:{opacity:1}}),void this.onReveal(this.props)):_globals.ssr&&(_globals.fadeOutEnabled||this.props.ssrFadeout)&&this.props.outEffect&&t.getTop(this.el)<window.pageYOffset+window.innerHeight?(this.setState({style:{opacity:0,transition:"opacity 1000ms 1000ms"}}),void window.setTimeout(function(){return e.reveal(e.props,!0)},2e3)):void(this.isOn&&(this.props.force?this.animate(this.props):this.reveal(this.props)))}}},{key:"cascade",value:function(e){var t=this,i=void 0;i="string"==typeof e?e.split("").map(function(e,t){return _react2.default.createElement("span",{key:t,style:{display:"inline-block",whiteSpace:"pre"}},e)}):_react2.default.Children.toArray(e);var s=this.props[this.isOn||!this.props.outEffect?"inEffect":"outEffect"],o=s.duration,n=s.reverse,r=i.length,a=2*o;this.props.collapse&&(a=parseInt(this.state.style.animationDuration,10),o=a/2);var l=n?r:0;return i=i.map(function(e){return"object"===(void 0===e?"undefined":_typeof(e))&&e?_react2.default.cloneElement(e,{style:_extends({},e.props.style,t.state.style,{animationDuration:Math.round((0,_globals.cascade)(n?l--:l++,0,r,o,a))+"ms"})}):e})}},{key:"componentWillReceiveProps",value:function(e){if(void 0!==e.when&&(this.isOn=!!e.when),e.fraction!==this.props.fraction&&this.observe(e,!0),!this.isOn&&e.onExited&&"exit"in e&&!1===e.exit)return void e.onExited();e.disabled||(e.collapse&&!this.props.collapse&&(this.setState({style:{},collapse:t.getInitialCollapseStyle(e)}),this.isShown=!1),e.when===this.props.when&&e.spy===this.props.spy||this.reveal(e),this.onRevealTimeout&&!this.isOn&&(this.onRevealTimeout=window.clearTimeout(this.onRevealTimeout)))}},{key:"getChild",value:function(){if(this.savedChild&&!this.props.disabled)return this.savedChild;if("object"===_typeof(this.props.children)){var e=_react2.default.Children.only(this.props.children);return"type"in e&&"string"==typeof e.type||"ref"!==this.props.refProp?e:_react2.default.createElement("div",null,e)}return _react2.default.createElement("div",null,this.props.children)}},{key:"render",value:function(){var e=void 0;e=this.state.hasAppeared?!this.props.unmountOnExit||!this.state.hasExited||this.isOn:!this.props.mountOnEnter||this.isOn;var t=this.getChild();"function"==typeof t.ref&&(this.childRef=t.ref);var i=!1,s=t.props,o=s.style,n=s.className,r=s.children,a=this.props.disabled?n:(this.props.outEffect?_globals.namespace:"")+(this.state.className?" "+this.state.className:"")+(n?" "+n:"")||void 0,l=void 0;"function"==typeof this.state.style.animationName&&(this.state.style.animationName=this.state.style.animationName(!this.isOn,this.props)),this.props.cascade&&!this.props.disabled&&r&&this.state.style.animationName?(i=this.cascade(r),l=_extends({},o,{opacity:1})):l=this.props.disabled?o:_extends({},o,this.state.style);var p=_extends({},this.props.props,_defineProperty({className:a,style:l},this.props.refProp,this.saveRef)),h=_react2.default.cloneElement(t,p,e?i||r:void 0);return void 0!==this.props.collapse?this.props.collapseEl?_react2.default.cloneElement(this.props.collapseEl,{style:_extends({},this.props.collapseEl.style,this.props.disabled?void 0:this.state.collapse),children:h}):_react2.default.createElement("div",{style:this.props.disabled?void 0:this.state.collapse,children:h}):h}},{key:"makeHandler",value:function(e){var t=this,i=function(){e.call(t,t.props),t.ticking=!1};return function(){t.ticking||((0,_globals.raf)(i),t.ticking=!0)}}},{key:"inViewport",value:function(e){if(!this.el||window.document.hidden)return!1;var i=this.el.offsetHeight,s=window.pageYOffset-t.getTop(this.el),o=Math.min(i,window.innerHeight)*(_globals.globalHide?e.fraction:0);return s>o-window.innerHeight&&s<i-o}},{key:"resize",value:function(e){this&&this.el&&this.isOn&&this.inViewport(e)&&(this.unlisten(),this.isShown=this.isOn,this.setState({hasExited:!this.isOn,hasAppeared:!0,collapse:void 0,style:{opacity:this.isOn||!e.outEffect?1:0}}),this.onReveal(e))}},{key:"listen",value:function(){_globals.observerMode||this.isListener||(this.isListener=!0,window.addEventListener("scroll",this.revealHandler,{passive:!0}),window.addEventListener("orientationchange",this.revealHandler,{passive:!0}),window.document.addEventListener("visibilitychange",this.revealHandler,{passive:!0}),window.document.addEventListener("collapseend",this.revealHandler,{passive:!0}),window.addEventListener("resize",this.resizeHandler,{passive:!0}))}},{key:"unlisten",value:function(){!_globals.observerMode&&this.isListener&&(window.removeEventListener("scroll",this.revealHandler,{passive:!0}),window.removeEventListener("orientationchange",this.revealHandler,{passive:!0}),window.document.removeEventListener("visibilitychange",this.revealHandler,{passive:!0}),window.document.removeEventListener("collapseend",this.revealHandler,{passive:!0}),window.removeEventListener("resize",this.resizeHandler,{passive:!0}),this.isListener=!1),this.onRevealTimeout&&(this.onRevealTimeout=window.clearTimeout(this.onRevealTimeout)),this.animationEndTimeout&&(this.animationEndTimeout=window.clearTimeout(this.animationEndTimeout))}}],[{key:"getInitialCollapseStyle",value:function(e){return{height:0,visibility:e.when?void 0:"hidden"}}},{key:"getTop",value:function(e){for(;void 0===e.offsetTop;)e=e.parentNode;for(var t=e.offsetTop;e.offsetParent;t+=e.offsetTop)e=e.offsetParent;return t}}]),t}(_react2.default.Component);RevealBase.propTypes=propTypes,RevealBase.defaultProps=defaultProps,RevealBase.contextTypes=contextTypes,RevealBase.displayName="RevealBase",exports["default"]=RevealBase,module.exports=exports.default;

/***/ }),

/***/ "./node_modules/react-reveal/globals.js":
/*!**********************************************!*\
  !*** ./node_modules/react-reveal/globals.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
function insertRule(e){try{return sheet.insertRule(e,sheet.cssRules.length)}catch(e){console.warn("react-reveal - animation failed")}}function cascade(e,n,t,o,r){var s=Math.log(o),i=Math.log(r),a=(i-s)/(t-n);return Math.exp(s+a*(e-n))}function animation(e){if(!sheet)return"";var n="@keyframes "+(name+counter)+"{"+e+"}",t=effectMap[e];return t?""+name+t:(sheet.insertRule(n,sheet.cssRules.length),effectMap[e]=counter,""+name+counter++)}function hideAll(){globalHide||(exports.globalHide=globalHide=!0,window.removeEventListener("scroll",hideAll,!0),insertRule("."+namespace+" { opacity: 0; }"),window.removeEventListener("orientationchange",hideAll,!0),window.document.removeEventListener("visibilitychange",hideAll))}function config(e){var n=e.ssrFadeout;exports.fadeOutEnabled=fadeOutEnabled=n}Object.defineProperty(exports, "__esModule", ({value:!0})),exports.insertRule=insertRule,exports.cascade=cascade,exports.animation=animation,exports.hideAll=hideAll,exports["default"]=config;var namespace=exports.namespace="react-reveal",defaults=exports.defaults={duration:1e3,delay:0,count:1},ssr=exports.ssr=!0,observerMode=exports.observerMode=!1,raf=exports.raf=function(e){return window.setTimeout(e,66)},disableSsr=exports.disableSsr=function(){return exports.ssr=ssr=!1},fadeOutEnabled=exports.fadeOutEnabled=!1,ssrFadeout=exports.ssrFadeout=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return exports.fadeOutEnabled=fadeOutEnabled=e},globalHide=exports.globalHide=!1,ie10=exports.ie10=!1,collapseend=exports.collapseend=void 0,counter=1,effectMap={},sheet=!1,name=namespace+"-"+Math.floor(1e15*Math.random())+"-";if("undefined"!=typeof window&&"nodejs"!==window.name&&window.document&&"undefined"!=typeof navigator){exports.observerMode=observerMode="IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"intersectionRatio"in window.IntersectionObserverEntry.prototype&&/\{\s*\[native code\]\s*\}/.test(""+IntersectionObserver),exports.raf=raf=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||raf,exports.ssr=ssr=window.document.querySelectorAll("div[data-reactroot]").length>0,-1!==navigator.appVersion.indexOf("MSIE 10")&&(exports.ie10=ie10=!0),ssr&&"performance"in window&&"timing"in window.performance&&"domContentLoadedEventEnd"in window.performance.timing&&window.performance.timing.domLoading&&Date.now()-window.performance.timing.domLoading<300&&(exports.ssr=ssr=!1),ssr&&window.setTimeout(disableSsr,1500),observerMode||(exports.collapseend=collapseend=document.createEvent("Event"),collapseend.initEvent("collapseend",!0,!0));var element=document.createElement("style");document.head.appendChild(element),element.sheet&&element.sheet.cssRules&&element.sheet.insertRule&&(sheet=element.sheet,window.addEventListener("scroll",hideAll,!0),window.addEventListener("orientationchange",hideAll,!0),window.document.addEventListener("visibilitychange",hideAll))}

/***/ }),

/***/ "./node_modules/react-reveal/wrap.js":
/*!*******************************************!*\
  !*** ./node_modules/react-reveal/wrap.js ***!
  \*******************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";
function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function wrap(e,t,a,r){return"in"in e&&(e.when=e.in),_react2.default.Children.count(r)<2?_react2.default.createElement(_RevealBase2.default,_extends({},e,{inEffect:t,outEffect:a,children:r})):(r=_react2.default.Children.map(r,function(r){return _react2.default.createElement(_RevealBase2.default,_extends({},e,{inEffect:t,outEffect:a,children:r}))}),"Fragment"in _react2.default?_react2.default.createElement(_react2.default.Fragment,null,r):_react2.default.createElement("span",null,r))}Object.defineProperty(exports, "__esModule", ({value:!0}));var _extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e};exports["default"]=wrap;var _react=__webpack_require__(/*! react */ "react"),_react2=_interopRequireDefault(_react),_RevealBase=__webpack_require__(/*! ./RevealBase */ "./node_modules/react-reveal/RevealBase.js"),_RevealBase2=_interopRequireDefault(_RevealBase);module.exports=exports.default;

/***/ }),

/***/ "./public/page-data/sq/d/63159454.json":
/*!*********************************************!*\
  !*** ./public/page-data/sq/d/63159454.json ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"data":{"site":{"siteMetadata":{"title":"Portofolio","description":"Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.","author":"@gatsbyjs"}}}}');

/***/ }),

/***/ "./src/components/Footer.js":
/*!**********************************!*\
  !*** ./src/components/Footer.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_reveal_Fade__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-reveal/Fade */ "./node_modules/react-reveal/Fade.js");
/* harmony import */ var react_reveal_Fade__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_reveal_Fade__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _yourdata__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../yourdata */ "./src/yourdata.js");



const Footer = () => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "section",
    id: "contact"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "footer-container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react_reveal_Fade__WEBPACK_IMPORTED_MODULE_1___default()), {
    bottom: true,
    cascade: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", null, "Contact"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", null, _yourdata__WEBPACK_IMPORTED_MODULE_2__["default"].contactSubHeading)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    className: "email-link",
    href: `mailto:${_yourdata__WEBPACK_IMPORTED_MODULE_2__["default"].contactEmail}`
  }, _yourdata__WEBPACK_IMPORTED_MODULE_2__["default"].contactEmail), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "social-icons"
  }, _yourdata__WEBPACK_IMPORTED_MODULE_2__["default"].social.map(socialLink => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    href: socialLink.url,
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", {
    src: socialLink.img,
    alt: "icons"
  })))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Footer);

/***/ }),

/***/ "./src/components/Header.js":
/*!**********************************!*\
  !*** ./src/components/Header.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_reveal_Fade__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-reveal/Fade */ "./node_modules/react-reveal/Fade.js");
/* harmony import */ var react_reveal_Fade__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_reveal_Fade__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _yourdata__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../yourdata */ "./src/yourdata.js");



const Header = () => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "section",
    id: "home"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "header-wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react_reveal_Fade__WEBPACK_IMPORTED_MODULE_1___default()), {
    bottom: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", null, "Hi there, ", _yourdata__WEBPACK_IMPORTED_MODULE_2__["default"].name, " here!", " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    role: "img",
    "aria-label": "Emoji"
  }, "\uD83D\uDC4B"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react_reveal_Fade__WEBPACK_IMPORTED_MODULE_1___default()), {
    bottom: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    style: {
      fontSize: 17
    }
  }, _yourdata__WEBPACK_IMPORTED_MODULE_2__["default"].headerParagraph)))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Header);

/***/ }),

/***/ "./src/components/Navbar.js":
/*!**********************************!*\
  !*** ./src/components/Navbar.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var gatsby_plugin_smoothscroll__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gatsby-plugin-smoothscroll */ "./node_modules/gatsby-plugin-smoothscroll/index.js");


const Navbar = () => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "section"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "navbar-wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    role: "button",
    onClick: () => (0,gatsby_plugin_smoothscroll__WEBPACK_IMPORTED_MODULE_1__["default"])("#home"),
    onKeyDown: () => (0,gatsby_plugin_smoothscroll__WEBPACK_IMPORTED_MODULE_1__["default"])("#home"),
    className: "name",
    tabIndex: 0
  }, "Portfolio."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "links-wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: () => (0,gatsby_plugin_smoothscroll__WEBPACK_IMPORTED_MODULE_1__["default"])("#work")
  }, "Work"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: () => (0,gatsby_plugin_smoothscroll__WEBPACK_IMPORTED_MODULE_1__["default"])("#about")
  }, "About"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: () => (0,gatsby_plugin_smoothscroll__WEBPACK_IMPORTED_MODULE_1__["default"])("#contact")
  }, "Contact")))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Navbar);

/***/ }),

/***/ "./src/components/Work.js":
/*!********************************!*\
  !*** ./src/components/Work.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _atoms_Card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./atoms/Card */ "./src/components/atoms/Card.js");
/* harmony import */ var react_reveal_Fade__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-reveal/Fade */ "./node_modules/react-reveal/Fade.js");
/* harmony import */ var react_reveal_Fade__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_reveal_Fade__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _yourdata__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../yourdata */ "./src/yourdata.js");




const Work = () => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "section",
    id: "work"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "work-wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react_reveal_Fade__WEBPACK_IMPORTED_MODULE_2___default()), {
    bottom: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", null, "Work"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4", null, "Please hover cursor to image for details")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "grid"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react_reveal_Fade__WEBPACK_IMPORTED_MODULE_2___default()), {
    bottom: true
  }, _yourdata__WEBPACK_IMPORTED_MODULE_3__["default"].projects.map(project => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_atoms_Card__WEBPACK_IMPORTED_MODULE_1__["default"], {
    key: project.id,
    heading: project.title,
    paragraph: project.para,
    imgUrl: project.imageSrc,
    projectLink: project.url
  })))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Work);

/***/ }),

/***/ "./src/components/about.js":
/*!*********************************!*\
  !*** ./src/components/about.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_reveal_Fade__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-reveal/Fade */ "./node_modules/react-reveal/Fade.js");
/* harmony import */ var react_reveal_Fade__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_reveal_Fade__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _yourdata__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../yourdata */ "./src/yourdata.js");



const imgProfile = "https://user-images.githubusercontent.com/23058601/152922506-f44c4da0-d0ea-4bef-869a-235cb30dcc2f.png";
const About = () => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "secion",
    id: "about"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "about-section"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react_reveal_Fade__WEBPACK_IMPORTED_MODULE_1___default()), {
    bottom: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", null, "About Me"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    style: {
      fontSize: 17
    }
  }, _yourdata__WEBPACK_IMPORTED_MODULE_2__["default"].aboutParaOne))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "image-wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react_reveal_Fade__WEBPACK_IMPORTED_MODULE_1___default()), {
    bottom: true,
    cascade: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", {
    src: imgProfile,
    alt: "about"
  }))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (About);

/***/ }),

/***/ "./src/components/atoms/Card.js":
/*!**************************************!*\
  !*** ./src/components/atoms/Card.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const Card = ({
  heading,
  paragraph,
  imgUrl,
  projectLink
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "card",
    style: {
      backgroundImage: "linear-gradient(to bottom, rgba(245, 246, 252, 0), rgba(0, 0, 0, 0)),url(" + imgUrl + ")"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "content",
    style: {
      backgroundColor: "black"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", {
    className: "header"
  }, heading), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "text",
    style: {
      fontSize: 14
    }
  }, paragraph), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    href: projectLink ? projectLink : "#",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "btn"
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Card);

/***/ }),

/***/ "./src/components/layout.js":
/*!**********************************!*\
  !*** ./src/components/layout.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Navbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Navbar */ "./src/components/Navbar.js");
/* harmony import */ var _styles_mains_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/mains.scss */ "./src/styles/mains.scss");
/* harmony import */ var _styles_mains_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_mains_scss__WEBPACK_IMPORTED_MODULE_2__);
/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */




const Layout = ({
  children
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Navbar__WEBPACK_IMPORTED_MODULE_1__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("main", null, children));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Layout);

/***/ }),

/***/ "./src/components/seo.js":
/*!*******************************!*\
  !*** ./src/components/seo.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _public_page_data_sq_d_63159454_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../public/page-data/sq/d/63159454.json */ "./public/page-data/sq/d/63159454.json");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-helmet */ "./node_modules/react-helmet/es/Helmet.js");

/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */




function SEO({
  description,
  lang,
  meta,
  title
}) {
  var _site$siteMetadata, _site$siteMetadata2;
  const {
    site
  } = _public_page_data_sq_d_63159454_json__WEBPACK_IMPORTED_MODULE_0__.data;
  const metaDescription = description || site.siteMetadata.description;
  const defaultTitle = (_site$siteMetadata = site.siteMetadata) === null || _site$siteMetadata === void 0 ? void 0 : _site$siteMetadata.title;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_helmet__WEBPACK_IMPORTED_MODULE_2__.Helmet, {
    htmlAttributes: {
      lang
    },
    title: title,
    titleTemplate: defaultTitle ? `%s | ${defaultTitle}` : null,
    meta: [{
      name: `description`,
      content: metaDescription
    }, {
      property: `og:title`,
      content: title
    }, {
      property: `og:description`,
      content: metaDescription
    }, {
      property: `og:type`,
      content: `website`
    }, {
      name: `twitter:card`,
      content: `summary`
    }, {
      name: `twitter:creator`,
      content: ((_site$siteMetadata2 = site.siteMetadata) === null || _site$siteMetadata2 === void 0 ? void 0 : _site$siteMetadata2.author) || ``
    }, {
      name: `twitter:title`,
      content: title
    }, {
      name: `twitter:description`,
      content: metaDescription
    }].concat(meta)
  });
}
SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``
};
SEO.propTypes = {
  description: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string),
  lang: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string),
  meta: prop_types__WEBPACK_IMPORTED_MODULE_3___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_3___default().object)),
  title: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string).isRequired
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SEO);

/***/ }),

/***/ "./src/components/skills.js":
/*!**********************************!*\
  !*** ./src/components/skills.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_reveal_Fade__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-reveal/Fade */ "./node_modules/react-reveal/Fade.js");
/* harmony import */ var react_reveal_Fade__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_reveal_Fade__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _yourdata__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../yourdata */ "./src/yourdata.js");



const Skills = () => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "section",
    id: "skill"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "skills-container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", null, "Skills"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react_reveal_Fade__WEBPACK_IMPORTED_MODULE_1___default()), {
    bottom: true,
    cascade: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "skills-grid"
  }, _yourdata__WEBPACK_IMPORTED_MODULE_2__["default"].skills.map(skill => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "skill",
    key: skill.id
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", {
    src: skill.img,
    alt: "css"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, skill.para))))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Skills);

/***/ }),

/***/ "./src/images/css.svg":
/*!****************************!*\
  !*** ./src/images/css.svg ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE4LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDQ3MC42OTkgNDcwLjY5OSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDcwLjY5OSA0NzAuNjk5OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8cGF0aCBkPSJNNDI2Ljk4MSwwSDQzLjcwMUMzNC41MiwwLDI3LjYzMiw3Ljc2OSwyOC40NDIsMTYuOTQ5TDYzLjQ1LDQwOS4yNTRjMC44MTEsOS4xNzMsOC43NDUsMTguNzc0LDE3LjY0NCwyMS4yNTMNCglsMTM4LjAwNiwzOC4zMzVjOC44ODcsMi40NjMsMjMuNDEzLDIuNDc5LDMyLjMxMywwLjAzMmwxMzguMTc3LTM4LjI4MWM4LjkwMS0yLjQ3MiwxNi44MzUtMTEuOTg2LDE3LjY0NS0yMS4xNzVsMzUuMDIzLTM5Mi40NjkNCglDNDQzLjA2OCw3Ljc2OSw0MzYuMjA5LDAsNDI2Ljk4MSwweiBNMzYwLjUxLDE0MS42MTFjLTAuMDA2LDAuMDYtMC4wNTMsMC4xMDctMC4xMTIsMC4xMTdjLTAuMDYsMC4wMS0wLjExOC0wLjAyMS0wLjE0NC0wLjA3Nw0KCUwyNTIuMTMsMTg1Ljk2Yy0xLjU0LDAuNjMxLTIuNDE4LDIuMjY0LTIuMDk4LDMuODk3YzAuMzIyLDEuNjMzLDEuNzU0LDIuODExLDMuNDE5LDIuODExaDg0LjEwM2M0LjQ3NCwwLDguNzM2LDEuOSwxMS43MjgsNS4yMjcNCgljMi45OTEsMy4zMjcsNC40MjksNy43NjgsMy45NTQsMTIuMjE2bC0xMy4xNDEsMTIzLjI3M2MtMC42NDUsNi4wNDgtNC43MDksMTEuMTg2LTEwLjQ0NywxMy4yMDVsLTg5LjI2OSwzMS40MQ0KCWMtMy4zNjIsMS4xODQtNy4wMjcsMS4xOTMtMTAuMzk3LDAuMDI1bC04OC44NTItMzAuNzc4Yy01Ljc3My0yLTkuODcxLTcuMTUzLTEwLjUyLTEzLjIyOGwtNS45NTctNTUuODI4DQoJYy0wLjMxMy0yLjkzMSwwLjYzNC01Ljg1NywyLjYwNC04LjA0OGMxLjk3MS0yLjE5Miw0Ljc3OS0zLjQ0NCw3LjcyNy0zLjQ0NGgyNC43MjVjNS4zMTMsMCw5Ljc2OSw0LjAwNywxMC4zMzEsOS4yODlsMy42NTUsMzQuMzE2DQoJbDYxLjUyMSwyMS4zODVsNjEuODAzLTIxLjU4bDcuNTU5LTcxLjE3SDEyOS44MzVjLTUuMjk3LDAtOS43NDYtMy45ODUtMTAuMzI3LTkuMjVsLTMuMzI3LTMwLjE2NA0KCWMtMC41MDgtNC42MDEsMi4wODgtOC45ODIsNi4zNjYtMTAuNzQ1bDExMS44MzctNDYuMTA5YzEuMjY5LTAuNTIzLDEuOTktMS44NjgsMS43MjQtMy4yMTRjLTAuMjY3LTEuMzQ1LTEuNDQ2LTIuMzE0LTIuODE3LTIuMzE0DQoJSDExNS41NDJjLTMuNTQ1LDAtNi41MTgtMi42NzctNi44ODgtNi4yMDFsLTMuNDA2LTMyLjQyMWMtMC4yMDUtMS45NTEsMC40MjgtMy44OTgsMS43NDEtNS4zNTcNCgljMS4zMTMtMS40NTgsMy4xODQtMi4yOTEsNS4xNDYtMi4yOTFoMjQ2LjM3OWMxLjk3MywwLDMuODUyLDAuODQyLDUuMTY2LDIuMzEzYzEuMzE0LDEuNDcyLDEuOTM4LDMuNDM0LDEuNzE1LDUuMzk0TDM2MC41MSwxNDEuNjExDQoJeiIvPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=");

/***/ }),

/***/ "./src/images/express.svg":
/*!********************************!*\
  !*** ./src/images/express.svg ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAyMDAxMDkwNC8vRU4iDQogImh0dHA6Ly93d3cudzMub3JnL1RSLzIwMDEvUkVDLVNWRy0yMDAxMDkwNC9EVEQvc3ZnMTAuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4wIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogd2lkdGg9IjI0Ni4wMDAwMDBwdCIgaGVpZ2h0PSIyMDUuMDAwMDAwcHQiIHZpZXdCb3g9IjAgMCAyNDYuMDAwMDAwIDIwNS4wMDAwMDAiDQogcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCI+DQoNCjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMDAwMDAwLDIwNS4wMDAwMDApIHNjYWxlKDAuMTAwMDAwLC0wLjEwMDAwMCkiDQpmaWxsPSIjMDAwMDAwIiBzdHJva2U9Im5vbmUiPg0KPHBhdGggZD0iTTEwMzUgMTkwNSBjLTkwIC0xOSAtMjEyIC02OSAtMjg1IC0xMTcgLTkyIC01OSAtMjM3IC0yMDggLTI5NSAtMzAxDQotOTMgLTE1MSAtMTMxIC0zMTEgLTEyMiAtNTEyIDggLTIwMyA2NiAtMzU0IDE5NSAtNTE2IDM2MCAtNDUxIDEwNDMgLTQ0OQ0KMTQwOCA0IDEyNSAxNTcgMTgzIDMxMyAxOTEgNTIzIDkgMjEwIC0zMyAzNjcgLTE0MiA1MjkgLTEzNSAyMDIgLTMzOSAzNDINCi01NjYgMzkwIC04NyAxOCAtMzAxIDE5IC0zODQgMHogbS0xOCAtNTYxIGM1OCAtMjggOTMgLTY0IDEyNyAtMTMzIDI1IC00OSA0Ng0KLTEzMyA0NiAtMTgxIGwwIC0zMCAtMjUwIDAgLTI1MCAwIDAgLTQzIGMwIC0xMjggMTM0IC0yMTYgMjY5IC0xNzcgMzkgMTEgODkNCjU0IDEwMiA4OCA3IDE5IDE2IDIyIDY0IDIyIDU0IDAgNTYgLTEgNDkgLTIyIC0yNCAtODAgLTcyIC0xMzQgLTE0OSAtMTcwIC03Mg0KLTMzIC0yMDkgLTMyIC0yNzkgMiAtNjUgMzEgLTExMyA4MSAtMTQ0IDE0OSAtMzcgODEgLTQzIDIzMiAtMTMgMzEzIDcwIDE4Mw0KMjU3IDI2MyA0MjggMTgyeiBtNDQ0IC04NCBjNDUgLTY3IDg1IC0xMjAgOTAgLTExOCA1IDIgNDYgNTUgOTEgMTE4IGw4MyAxMTUNCjY4IDMgYzM3IDIgNjcgMCA2NyAtNCAwIC00IC01MiAtNzYgLTExNSAtMTYwIC02MyAtODUgLTExNSAtMTU4IC0xMTUgLTE2NCAwDQotNiA1OSAtOTEgMTMwIC0xOTAgNzIgLTk5IDEzMCAtMTgzIDEzMCAtMTg1IDAgLTMgLTMzIC01IC03MyAtNSBsLTczIDAgLTk0DQoxNDAgYy01MSA3NyAtOTcgMTQwIC0xMDEgMTQwIC00IDAgLTQ5IC02MyAtMTAwIC0xNDAgbC05NCAtMTM5IC02NyAtMSBjLTM4IDANCi02OCAzIC02OCA2IDAgNCA1NCA4MyAxMjAgMTc1IDY2IDkzIDEyMyAxNzUgMTI2IDE4MyAzIDggLTQ0IDgwIC0xMTAgMTcxIC02NA0KODYgLTExNiAxNjEgLTExNiAxNjYgMCA1IDMxIDkgNzAgOSBsNjkgMCA4MiAtMTIweiIvPg0KPHBhdGggZD0iTTg1NSAxMjc1IGMtNSAtMiAtMjIgLTYgLTM3IC05IC01OCAtMTMgLTEyOCAtOTggLTEyOCAtMTU2IDAgLTE5IDYNCi0yMCAxOTAgLTIwIDEwNSAwIDE5MCA0IDE5MCA5IDAgMTggLTI0IDc4IC00MiAxMDQgLTMwIDQyIC0xMzMgODUgLTE3MyA3MnoiLz4NCjwvZz4NCjwvc3ZnPg0K");

/***/ }),

/***/ "./src/images/github.svg":
/*!*******************************!*\
  !*** ./src/images/github.svg ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iTGF5ZXIgMSIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIsMi4yNDY3QTEwLjAwMDQyLDEwLjAwMDQyLDAsMCwwLDguODM3NTIsMjEuNzM0MTljLjUuMDg3NTIuNjg3NS0uMjEyNDcuNjg3NS0uNDc1LDAtLjIzNzQ5LS4wMTI1MS0xLjAyNS0uMDEyNTEtMS44NjI0OUM3LDE5Ljg1OTE5LDYuMzUsMTguNzg0MjMsNi4xNSwxOC4yMjE3M0EzLjYzNiwzLjYzNiwwLDAsMCw1LjEyNSwxNi44MDkyYy0uMzUtLjE4NzUtLjg1LS42NS0uMDEyNTEtLjY2MjQ4QTIuMDAxMTcsMi4wMDExNywwLDAsMSw2LjY1LDE3LjE3MTY5YTIuMTM3NDIsMi4xMzc0MiwwLDAsMCwyLjkxMjQ4LjgyNUEyLjEwMzc2LDIuMTAzNzYsMCwwLDEsMTAuMiwxNi42NTkyM2MtMi4yMjUtLjI1LTQuNTUtMS4xMTI1NC00LjU1LTQuOTM3NWEzLjg5MTg3LDMuODkxODcsMCwwLDEsMS4wMjUtMi42ODc1LDMuNTkzNzMsMy41OTM3MywwLDAsMSwuMS0yLjY1cy44Mzc0Ny0uMjYyNTEsMi43NSwxLjAyNWE5LjQyNzQ3LDkuNDI3NDcsMCwwLDEsNSwwYzEuOTEyNDgtMS4zLDIuNzUtMS4wMjUsMi43NS0xLjAyNWEzLjU5MzIzLDMuNTkzMjMsMCwwLDEsLjEsMi42NSwzLjg2OSwzLjg2OSwwLDAsMSwxLjAyNSwyLjY4NzVjMCwzLjgzNzQ3LTIuMzM3NTIsNC42ODc1LTQuNTYyNSw0LjkzNzVhMi4zNjgxNCwyLjM2ODE0LDAsMCwxLC42NzUsMS44NWMwLDEuMzM3NTItLjAxMjUxLDIuNDEyNDgtLjAxMjUxLDIuNzUsMCwuMjYyNTEuMTg3NS41NzUuNjg3NS40NzVBMTAuMDA1MywxMC4wMDUzLDAsMCwwLDEyLDIuMjQ2N1oiLz48L3N2Zz4=");

/***/ }),

/***/ "./src/images/html.svg":
/*!*****************************!*\
  !*** ./src/images/html.svg ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjE3OTIiIGhlaWdodD0iMTc5MiIgdmlld0JveD0iMCAwIDE3OTIgMTc5MiI+PHBhdGggZD0iTTEzMjIgNTk3bDE2LTE3NWgtODg0bDQ3IDUzNGg2MTJsLTIyIDIyOC0xOTcgNTMtMTk2LTUzLTEzLTE0MGgtMTc1bDIyIDI3OCAzNjIgMTAwaDR2LTFsMzU5LTk5IDUwLTU0NGgtNjQ0bC0xNS0xODFoNjc0em0tMTEzMC00NjloMTQwOGwtMTI4IDE0MzgtNTc4IDE2Mi01NzQtMTYyeiIvPg0KCQ0KCTxtZXRhZGF0YT4NCgkJPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIiB4bWxuczpyZGZzPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwLzAxL3JkZi1zY2hlbWEjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iPg0KCQkJPHJkZjpEZXNjcmlwdGlvbiBhYm91dD0iaHR0cHM6Ly9pY29uc2NvdXQuY29tL2xlZ2FsI2xpY2Vuc2VzIiBkYzp0aXRsZT0iSHRtbCwgUHJvZ3JhbW1pbmcsIExhbmd1YWdlLCBDc3MsIEVkaXRpbmcsIFN0eWxlIiBkYzpkZXNjcmlwdGlvbj0iSHRtbCwgUHJvZ3JhbW1pbmcsIExhbmd1YWdlLCBDc3MsIEVkaXRpbmcsIFN0eWxlIiBkYzpwdWJsaXNoZXI9Ikljb25zY291dCIgZGM6ZGF0ZT0iMjAxNi0xMi0xNCIgZGM6Zm9ybWF0PSJpbWFnZS9zdmcreG1sIiBkYzpsYW5ndWFnZT0iZW4iPg0KCQkJCTxkYzpjcmVhdG9yPg0KCQkJCQk8cmRmOkJhZz4NCgkJCQkJCTxyZGY6bGk+Rm9udCBBd2Vzb21lPC9yZGY6bGk+DQoJCQkJCTwvcmRmOkJhZz4NCgkJCQk8L2RjOmNyZWF0b3I+DQoJCQk8L3JkZjpEZXNjcmlwdGlvbj4NCgkJPC9yZGY6UkRGPg0KICAgIDwvbWV0YWRhdGE+PC9zdmc+DQo=");

/***/ }),

/***/ "./src/images/instagram.svg":
/*!**********************************!*\
  !*** ./src/images/instagram.svg ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iTGF5ZXIgMSIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTcuMzQsNS40NmgwYTEuMiwxLjIsMCwxLDAsMS4yLDEuMkExLjIsMS4yLDAsMCwwLDE3LjM0LDUuNDZabTQuNiwyLjQyYTcuNTksNy41OSwwLDAsMC0uNDYtMi40Myw0Ljk0LDQuOTQsMCwwLDAtMS4xNi0xLjc3LDQuNyw0LjcsMCwwLDAtMS43Ny0xLjE1LDcuMyw3LjMsMCwwLDAtMi40My0uNDdDMTUuMDYsMiwxNC43MiwyLDEyLDJzLTMuMDYsMC00LjEyLjA2YTcuMyw3LjMsMCwwLDAtMi40My40N0E0Ljc4LDQuNzgsMCwwLDAsMy42OCwzLjY4LDQuNyw0LjcsMCwwLDAsMi41Myw1LjQ1YTcuMyw3LjMsMCwwLDAtLjQ3LDIuNDNDMiw4Ljk0LDIsOS4yOCwyLDEyczAsMy4wNi4wNiw0LjEyYTcuMyw3LjMsMCwwLDAsLjQ3LDIuNDMsNC43LDQuNywwLDAsMCwxLjE1LDEuNzcsNC43OCw0Ljc4LDAsMCwwLDEuNzcsMS4xNSw3LjMsNy4zLDAsMCwwLDIuNDMuNDdDOC45NCwyMiw5LjI4LDIyLDEyLDIyczMuMDYsMCw0LjEyLS4wNmE3LjMsNy4zLDAsMCwwLDIuNDMtLjQ3LDQuNyw0LjcsMCwwLDAsMS43Ny0xLjE1LDQuODUsNC44NSwwLDAsMCwxLjE2LTEuNzcsNy41OSw3LjU5LDAsMCwwLC40Ni0yLjQzYzAtMS4wNi4wNi0xLjQuMDYtNC4xMlMyMiw4Ljk0LDIxLjk0LDcuODhaTTIwLjE0LDE2YTUuNjEsNS42MSwwLDAsMS0uMzQsMS44NiwzLjA2LDMuMDYsMCwwLDEtLjc1LDEuMTUsMy4xOSwzLjE5LDAsMCwxLTEuMTUuNzUsNS42MSw1LjYxLDAsMCwxLTEuODYuMzRjLTEsLjA1LTEuMzcuMDYtNCwuMDZzLTMsMC00LS4wNkE1LjczLDUuNzMsMCwwLDEsNi4xLDE5LjgsMy4yNywzLjI3LDAsMCwxLDUsMTkuMDVhMywzLDAsMCwxLS43NC0xLjE1QTUuNTQsNS41NCwwLDAsMSwzLjg2LDE2YzAtMS0uMDYtMS4zNy0uMDYtNHMwLTMsLjA2LTRBNS41NCw1LjU0LDAsMCwxLDQuMjEsNi4xLDMsMywwLDAsMSw1LDUsMy4xNCwzLjE0LDAsMCwxLDYuMSw0LjIsNS43Myw1LjczLDAsMCwxLDgsMy44NmMxLDAsMS4zNy0uMDYsNC0uMDZzMywwLDQsLjA2YTUuNjEsNS42MSwwLDAsMSwxLjg2LjM0QTMuMDYsMy4wNiwwLDAsMSwxOS4wNSw1LDMuMDYsMy4wNiwwLDAsMSwxOS44LDYuMSw1LjYxLDUuNjEsMCwwLDEsMjAuMTQsOGMuMDUsMSwuMDYsMS4zNy4wNiw0UzIwLjE5LDE1LDIwLjE0LDE2Wk0xMiw2Ljg3QTUuMTMsNS4xMywwLDEsMCwxNy4xNCwxMiw1LjEyLDUuMTIsMCwwLDAsMTIsNi44N1ptMCw4LjQ2QTMuMzMsMy4zMywwLDEsMSwxNS4zMywxMiwzLjMzLDMuMzMsMCwwLDEsMTIsMTUuMzNaIi8+PC9zdmc+");

/***/ }),

/***/ "./src/images/javascript.svg":
/*!***********************************!*\
  !*** ./src/images/javascript.svg ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgZmlsbD0ibm9uZSIgdmlld0JveD0iMCAwIDE2IDE2Ij48cGF0aCBmaWxsPSIjMjEyMTIxIiBkPSJNMiA0LjVDMiAzLjExOTI5IDMuMTE5MjkgMiA0LjUgMkgxMS41QzEyLjg4MDcgMiAxNCAzLjExOTI5IDE0IDQuNVYxMS41QzE0IDEyLjg4MDcgMTIuODgwNyAxNCAxMS41IDE0SDQuNUMzLjExOTI5IDE0IDIgMTIuODgwNyAyIDExLjVWNC41Wk03LjUgNkM3LjIyMzg2IDYgNyA2LjIyMzg2IDcgNi41VjEwLjVDNyAxMC43NzYxIDYuNzc2MTQgMTEgNi41IDExSDUuNUM1LjIyMzg2IDExIDUgMTEuMjIzOSA1IDExLjVDNSAxMS43NzYxIDUuMjIzODYgMTIgNS41IDEySDYuNUM3LjMyODQzIDEyIDggMTEuMzI4NCA4IDEwLjVWNi41QzggNi4yMjM4NiA3Ljc3NjE0IDYgNy41IDZaTTguNSA3LjVWOEM4LjUgOC44Mjg0MyA5LjE3MTU3IDkuNSAxMCA5LjVIMTAuNUMxMC43NzYxIDkuNSAxMSA5LjcyMzg2IDExIDEwVjEwLjVDMTEgMTAuNzc2MSAxMC43NzYxIDExIDEwLjUgMTFIOUM4LjcyMzg2IDExIDguNSAxMS4yMjM5IDguNSAxMS41QzguNSAxMS43NzYxIDguNzIzODYgMTIgOSAxMkgxMC41QzExLjMyODQgMTIgMTIgMTEuMzI4NCAxMiAxMC41VjEwQzEyIDkuMTcxNTcgMTEuMzI4NCA4LjUgMTAuNSA4LjVIMTBDOS43MjM4NiA4LjUgOS41IDguMjc2MTQgOS41IDhWNy41QzkuNSA3LjIyMzg2IDkuNzIzODYgNyAxMCA3SDExLjVDMTEuNzc2MSA3IDEyIDYuNzc2MTQgMTIgNi41QzEyIDYuMjIzODYgMTEuNzc2MSA2IDExLjUgNkgxMEM5LjE3MTU3IDYgOC41IDYuNjcxNTcgOC41IDcuNVoiLz48L3N2Zz4=");

/***/ }),

/***/ "./src/images/linkdin.svg":
/*!********************************!*\
  !*** ./src/images/linkdin.svg ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gU3ZnIFZlY3RvciBJY29ucyA6IGh0dHA6Ly93d3cub25saW5ld2ViZm9udHMuY29tL2ljb24gLS0+DQo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTAwMCAxMDAwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxMDAwIDEwMDAiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPG1ldGFkYXRhPiBTdmcgVmVjdG9yIEljb25zIDogaHR0cDovL3d3dy5vbmxpbmV3ZWJmb250cy5jb20vaWNvbiA8L21ldGFkYXRhPg0KPGc+PGc+PGc+PGc+PHBhdGggZD0iTTU4OS4zLDQzMC40Yy00MS45LDAtNjAuNywyMy4xLTcxLjEsMzkuMlY0MzZoLTc5YzEsMjIuMywwLDIzNy43LDAsMjM3LjdoNzlWNTQwLjljMC03LjEsMC41LTE0LjIsMi42LTE5LjNjNS43LTE0LjIsMTguNy0yOC45LDQwLjUtMjguOWMyOC42LDAsNDAsMjEuOCw0MCw1My44djEyNy4yaDc5aDBWNTM3LjNDNjgwLjIsNDY0LjMsNjQxLjIsNDMwLjQsNTg5LjMsNDMwLjR6IE01MTguMSw0NzAuNGgtMC41YzAuMi0wLjMsMC40LTAuNSwwLjUtMC44VjQ3MC40eiIvPjxyZWN0IHg9IjMxNi40IiB5PSI0MzYiIHdpZHRoPSI3OSIgaGVpZ2h0PSIyMzcuNyIvPjxwYXRoIGQ9Ik01MDAsMTBDMjI5LjgsMTAsMTAsMjI5LjgsMTAsNTAwYzAsMjcwLjIsMjE5LjgsNDkwLDQ5MCw0OTBjMjcwLjIsMCw0OTAtMjE5LjgsNDkwLTQ5MEM5OTAsMjI5LjgsNzcwLjIsMTAsNTAwLDEweiBNNzU5LjgsNzIxLjZjMCwyMC45LTE3LjMsMzcuNy0zOC43LDM3LjdIMjc1LjVjLTIxLjMsMC0zOC42LTE2LjgtMzguNi0zNy43VjI3MC43YzAtMjAuOCwxNy4zLTM3LjcsMzguNi0zNy43aDQ0NS43YzIxLjMsMCwzOC43LDE2LjksMzguNywzNy43VjcyMS42eiIvPjxwYXRoIGQ9Ik0zNTYuNCwzMjEuNGMtMjcsMC00NC43LDE3LjctNDQuNyw0MS4xYzAsMjIuOCwxNy4yLDQxLjEsNDMuNiw0MS4xaDAuNWMyNy42LDAsNDQuNy0xOC4zLDQ0LjctNDEuMUM0MDAuMSwzMzkuMSwzODMuNCwzMjEuNCwzNTYuNCwzMjEuNHoiLz48L2c+PC9nPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48L2c+DQo8L3N2Zz4=");

/***/ }),

/***/ "./src/images/mongodb.svg":
/*!********************************!*\
  !*** ./src/images/mongodb.svg ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjIxMnB4IiBoZWlnaHQ9IjIzN3B4IiB2aWV3Qm94PSIwIDAgMjEyIDIzNyIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjEyIDIzNyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+ICA8aW1hZ2UgaWQ9ImltYWdlMCIgd2lkdGg9IjIxMiIgaGVpZ2h0PSIyMzciIHg9IjAiIHk9IjAiDQogICAgeGxpbms6aHJlZj0iZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFOUUFBQUR0Q0FBQUFBRGl3QVNoQUFBQUJHZEJUVUVBQUxHUEMveGhCUUFBQUNCalNGSk4NCkFBQjZKZ0FBZ0lRQUFQb0FBQUNBNkFBQWRUQUFBT3BnQUFBNm1BQUFGM0NjdWxFOEFBQUFBbUpMUjBRQS80ZVB6TDhBQUFBSGRFbE4NClJRZmtEQmdMTEIxSFBvblRBQUFPelVsRVFWUjQydTJkWFd6YjFoWEhUK2kwY1ZKSGlXdlhqWk9tSDNMUzJiWFd3aGdhdFNzMEZDcmENCnp0Z1dvUEFHZU1EcWh3N3dQdUFCQXZiZ2h3N3pIdVlIdnhWRzBjRjlpSUhPeFJZTUhyWlYvWUF4QkZIZG9jcldLWENxTkE2cTJJdXkNCnlHa20xNHFWbWs0cjQreUIrcURJeTQ5TEh1cEtSdjV2bGtueC9FVHk4dkxlOHo5M0I0SVhXdDNJWnZQeTU2dWJYNnpuMXRZMmJtNTkNCnRRNEF2anVhV3ZhMHR1NzM3ZHpYZHZmdXZlMitQUjFOWGh4OUJ5blV5clhsN05MbFpKSmpsNTVIRGovY2RyVDljQjFDM1ZoYVhreDgNCmNzSEZOM1E4MFhmMHlKRzIrb0RhdkxwNC92UzdKTEVBQUlSRGozNnRxMWtrMUpWekMrL05rL0ZVRlBqT3NjZTZSRUJkaXMrOTRRRlANClJRUFBQZFh0c0JseEJIWGx3N2U5QlNycCtBc2hSMmNNZVJVZnF3bFBXWkU1bVRkRVBpZzUrbUp0aVJRZFA1bnpDaW9mSFJSQnBDak0NCncyVWJLallzamtqUndGeUJGQ285THBwSVVTUkpCalhYTHhxbW91Q3NqZE5sQ1NWUGllYlFhc0x5N3JLQXlvNktSbUJwSk8wQ0tqTWkNCk9ud2pEYVljUW1YckZna0E0TVcwQXlpNXhoMEhma1Z5dkZBem9rTzJvMGt1cUdTUDZIanR5UmV6RFZXSWlBN1d2b2J5OXFEaW9nUGwNCjA1d2RxTHA4TXBscHVHQUZsV21RdTZsS0tYT29tT2o0bkduV0RPbzEwZEU1MVpneFZFUjBiTTQxYUFRbDhNWFd2Y0lGSmxRZHZUVTUNClViREFnR3B3Sm9DZ0htcElkRXp1MWErRnFwTkJDSGNhcVlhYUV4MFBqV2JVVUJuUjBWQXBwWUlLaWc2R1NoMFZxTG9iTUhLdThSSlUNClRuUWtsRW9Yb2VwNmdJVlhBd3BVV25RY3RFb2lRa04zWTFrYVFnU1VSVWRCclN4SzhJN29JS2oxRmdBZUZ4MEV0WUlJQmRFeDBDc3YNCm5STWRBcjBTMHFlaVE2RFhrdlNKNkJEb3RTaXRpZzZCWHBlbGJkYWZBQUJZbG02S0RvRmVYMGd0b2tPZzExM1NBZEVoME9zK3FWTjANCkNQUTZMRDBvT2dSNjlVaU5PSFZqb1c3SWl3NkJYam5ZUGlOSkpmV2dCQytKRG9KYVB3UEFyT2dncUpWQmFQQnBLYjJPSXdKaVFuUVkNCnRFb280MzdiNm9VK1hCek1USWtPaEZMSjBsaDZ3K1dER0N1Q2lMZ0RBV0JycCtoWXlGUm9BZ0FKQUtCcDI3UVZDY1Vkb3N5OVRZcU8NCmhrWVQxWE8rMitKaE5hQ2RuZDhHWGNDQUx1VkE3aEFkazF0MXlEb296RGM0VlZzbFQxaVZ4cFAzaTQ3TGpmeXF2Rk4xd3BVY0VoMloNCmM0WFV6ckhxZkwrR3plVjUwVGpmcjJHZlY1b0VkZEM0Q3hvczFWbFJ2Sm9oQzM1TlZtMnU0Vkxrd2hwN1JEb0lRZEM2eDZaRlI4bW4NCmFVMzRLUWhCRUVEckxVZzNVQ3NZMHBwekVnQmhDRUk1bzZ5aWs2Smp0YXVUMnNpalVJTFNaRUFqb2h3UkhhNGRSWFMyNWdtb1FFRy8NCjd0K3B1bTh3d25xM20vS3VVWUlDMEp0TjR3SFJZWnNwR05jRm5QYUJCZ3BlMDIyRXNickZDakNNVStXR1FBVUYvVmtHVmxoMCtDeUYNCjlXY0o4NVhYWERXVXpnZUNpSWhKNGZaeXJZWlp0bXgxWm5NMUZQUm5HTnRuNjZwRE9NRzRuakJYVlh4QkE4VzhzeEF4VmlkTllmOGMNCk16eU5LMVFIWmVSZHpFNEpmekZ1bThveVEwdG9KMFAxVUFEOUJtN241SVJJcEhHREFnY1pmZGtQRmhUQUNQc25RVXhPQ0RsZkhSTkcNCkpSdHlMSXMxR3dwZzFBZ0wwOU0xdnIvQzA0YUc4anpib1dJRUJUQ2FRY1B2aW8zVmFJekdQeGJMRzRhUk16TGRHRU1aUEEvS2wzSjANCjFPTmtoYTdSYU1Za2dMVHhWSTBaRkVBNGhtYkt4U1k5bXE4N1Boa3pyNlNSR0RBTEd5eUdtNmZ5YUs3MDNDVHBPUHpBUk5TaWhBWVcNClpzeXYvdkNPNEJtTG93ejkzSHFZZmZYYXhjWEVyRnVjd0NOSDc3Y3VHM2YyalZjc3RyQUJCUUFUUDdSVmZtL3JldnJxNHYvT2ZiVE8NCkJ4Tjh2TFA3ME1GN2JKV0tXL25MYjY1YmJtUVBDaUR3eStmdHA1dHQ1VGF5MmJYUFZqY3pWMWRXTi9XSXZ1YTJ6bzRIbXR2dWJmVzENCjc5OXZ2NGphNm50VHRtclUyWVVDZ09CUG4zRldMbkhycThKVytZK21uWGM0S3dXM2N1cE51MVVFdy9abmU4K2NBZjlQbnUzakQ2ZkoNCmZWM004NmRlNXlsWmFkWDY2VFEwbThHYUtodmw5WGRaTnVsTW1UOFdLWUhteGh4ME5qbnVLWTFHUXIyOXp2YTBxVXNMOHljNDIxSFgNClVBQUFvZkNqcm1wYkd1bkt1WVVQWE5RVzVXZ29HSnFmQjREQU41L3NPVWhWUm5ZbGZXSGgzNjVyaTdvNlV5b0YrZ0tIanRoOGdqSzANCmRmM2E4dFdQTHRMRTR1NU1xVlNxRWh4OHVIdnZvVU10QjNidHRtN0l0K1JiMTI2dUwyY3ZMbCswN2lid2lEb3I2VXo1eC9iZDAzN3YNCmdkYm1QYnQzM2JubnJqdUxIMzU1YS8zTFcvTEc1dHJxZjlldmUrYWQ4UzdWYW4zOWttZmZiU0ZKMUlGdlE5Mkd1ZzNWT0xvTjFTaXENCkpaUnZPMExkei9YMjZnYnFydHBCYmZUV0pxMS9sM1JmN2FBQXVtcmlLajVjWTZQbDRWcFVhR3FWdXIwL1NMOXE1S1N6QmxUZE5UQmENCit0NVIzN2Mxb09xUnZCMDlBUUJZaEZ2cVB6czlieTE2cFJhdnMremoycnUyeStQc3oyQ0w1MGJMS2YyUEZuUTdQMkt1bHp3M1dnNGoNCmxpc3orY3VEbEo3TzgyY1JFTDFjcWtQaDBFRjU2WmNaUUFSRUx6c3ZhUU9vZ25lcEN3bEVDYUIzd1AwM0dXakdhSkN6NlNPdkR0bmYNCkIrQ3AwYkpVOFRhaS9PbFhqLzE3VldXK2JMVDBxaksvYkFLRjNsd2ZFU3hCSWMycVkxcVZVNzZZVU40VWRpc2dJaXJ2VTU0VTN4NTgNCjF2VGZ6VjVVVkkycmpaWmVWTTJzWkdCRWxBK3F6NVFYRjZER2FFbWZWS3JLZ3plQUluL3M2NHlXMUJuQUFiU0VvalkyNlkyV1NKeXUNCm5iQUJSYnVhWmx2Wk1GQVplUGtYNlp2VnNLM2NoQ2poRVgyWEtqTitxcTRMNWJtcW1yNlBLSi9wenhUU3pSaDNxRExEVkVOa1RSL1QNCkpicU4yaHo2K0IzVkFZT1gxZlhIa1BHVHVsY083WjBwSkVyeHJGcUNRR3UwSk9xUmphRmRLSnIzUmEzUlVtT2JvSGtQeWRtR0lta0ENCk5RbWtHZW1KOTZ2KzN5c1R2TDlGOW5IOHlLNlBGc3A5cStydjh6K0dBRVRKcndodHRuNUUrWmg1cGx4M0s3UkdqZ1FNUWtCdlNjeTYNCnpEd1BJd2VVeTFwQUFXM0M3UndvVUhwTG9yc09kSXdMeXRXeGRCYlJhU2hCbFh1Q1pSWGN2RGNpRjVTTGtzWER1bFRzVWFoQWdWK1gNCndKZHgzR0NNODBFNWZrRUk2Y3dBc3RJckwwR0JycmxBVERxOHRWS2NVTTZ1UDRZcnNmUTRxa0FwYi9mVmlqdDVIMkdFYmc3bHBHeGkNCkQ4TWRWbjQ0cUtDZ2plSHRTUEMzVFl4MS9zeWhrTnZWSG1RZ1pTc25RQTNGdWhzUVV4SE9JekorR2dzb3p1ZnZZSUx4SGVxSGF6VVUNCitGamI1L2tHTUJqZllBSEZOUXN5enZTQ1Z0MG5HaWhXSzRtSUdMUGZGSTR3ZHJlQXNuOVRoYUxNTDlDczJxYUQwdGQzVUpTYnR2a0sNCnlmSUtXMERaZkZYMFRiRHRPakh0dUR3RENqcll2bE5NVGRvWjFXY2QyQXJLVGpiOWFNSWdLdjFBR3dzS0lCUTNPSHBxMG5JZ2c3V2INCkZaVGxvbjlHUkppTk1MWm1Rd0gwRzMwTFptWk1XL2tCMWo1V1VLWUR4TUZKUXh0aGp0MlpNNEppbSs2TGttUGpobS9oRTA2Z2pLZGQNCklsRkRHeXRtamZxbnhsRHNwM2JsUnpKd1lURDNzWUppTjM4ako4MThmR25qRzlFTUNnQ21aSk92eFh4Y2I3UmtYaXBXVUxxT2VtRE0NCndpSVRON3NITEtBQVJxeVdyOC9NVGFnZllzekhuQldVZWt3cE9EYWJ0RmhhWHA0MmI0WUhyZkxTWDMyMTUrWHZtZzA1ZEhZK0MzKzQNCnNiUzhtSmkvRGdDN3dZbDJBUUFFbis3Mkg3VWVMeng3NGxXclRheVQ3Uy84Q0FaZkNwdWJIUGIxOVFIQTVscjZxak5YMjIvM0hyelANCjFtQ05MYU1sV0YxK0pVWGk2RnlsMTBBWFg0R0ltSjJ4MTU4ZjNCR3dQZElYZWVHWVE5UE41cTNDQnNDWDRHYmtmT1hVaVZNMk43VnMNCktEU2JuNnl4SWJHb3BIVlB4amtVQVBqSFl3WDNVZkpjZE54R1M4dldUNmVsbHdGQ1B6ajJtRlA3RjVkdS9QTWZ2MS9pMzgyUjFXaCsNCkhpQXc4UGlqVktZOXBpNHR6TC9sMEt6azJEK1ZUQUpBLzlOOTNRZmRlNU0xMnNvc25qM3R3bWpwMGhUMjdyc0FFSHl5cC90b0s4bmwNCnVKVkxwVDQrN2RxWlNPQjBVeHg3L21OZlAzTGdVRHZIZklkYW0ydlhNdWV2bkNaS2FDT3o3eTB0L1JFQTJoeE5ZbXc2NjF4NUQ2V0kNCjdaMTg4OU03ZCs3ZUNVMUdBOHpVS3dCU0d5MDNXZmRXWE9tQytveWdQaU1PZ3RyQXNzYjZzUGpMdFJ2dFJKM1BRdzNseU14eHVjNmgNCkxqalppVG8xbEJwcXdjbE9OSlo1NzZEKzdtU24wM1VPbGR6azMyZlZXUzJOMmtFNXVhbk9VOGRBRHZVQi95N2toaFp5cUQveDcwS1oNCjlhZEFVUnN0NTIvdzdySHB1dnlKUmo3cFllSnY1TC8rcUptZ1ZUcEkvWlhjTmVUSlZ4NC9SRyswbk9WZGQvWVY2Z2o4SGhndC84cTMNCk9YVjNBcUJiZW96OE8zL050L2tKOGdDNnBHYnlPdHRMWjNtMjNueWQrdmpENElYUmNweG5ZM3JUNWZjQkhLVUdXVWc3QXhoUlBtYk8NClQ5RzduQkFsYU9FZDFiWFdyK3h2K2o1NVJhaHhBRUQwb1BKQXl2YVpvcmRPNXhBbGdNUDBOcU5mMk4zd2ZmSUdmV3dmQUtBSFBpWnQNCkdtMUUrWkJ4cHVpZmtqSXFYbzgyeTR3VGJuM1AzbVovZGpTa1lhYlpab0RpbENYOWxUMXU1MHpSZXkyUEkyTEo2K0ZCallpa0RhZ0kNCitWSHpLaWdrZjArRERuM3dYUm9tK3NWQmk3UHRwUmx6cmw2QUxRMVhvaTltajRTcW1haEgwQUdtc0JyS2d6WHFLdmJSNGdkRDFWRGsNClJ4eEZMWlFINnkrWGJxdlNIVHRXeFVTK0lGbmwwbEFsYk5Bdm1GQk1heXYxV2F1TUdlUTNsT282VUdlaGtGZSs4Q21OVWFuSG9uNGkNCms3ZTM2b1RrcXRTYUNQV1JlbVRWTGFWMmxPYW9qMVQxWEt6T0Z5THZXZ1JrMVlWV09RNzVNcWZWYTd0cGtxREl5eDM0YytVcU5aV0wNClBrZGRERVdUOGF2TjdNcVFkekhMQ2UzbGRvTDZYU2Vrelp6VXA2dDV0bDU3MmlNbXZXT0drWVBuVVFHcVVyK0p1QmZid2NpSFpTVVcNCkZqdzVXU1dYSjIxSGdtVWtRbmEyWk5LRFduTEZCcDEwZmpmRVhpckxLQVdVdkFKUXFRSUc1VlVRTlFqZU1LOVZKcTQ3VkxJVzBIM2oNCnBHRXlwVW15THRNYzRsakZQaEpaOTJqTVpOa2owd3prRE9HUVlMRkJKK3JIanBxdTVHU1JWcDBsdXdXSzF3cEpsMlhjWXYwb3kxeHgNCm1haWtFbEpCK1dZc0U1UHRKTURQVWJ4cEVVRU54R3dFYkMrclArMStDSU1FYXNKZVdyeHRxMExNNWVDMGU2Z1IyODRNRHY5RlB1cW0NCmVKaExxS0dvYkQ5U1BsT0pISFg4eWkvTHNpekxCVWZ1LzJFZUltNG9STVM0VnlVTzJmS044L3VCZGpqcHQxejU4TzAzYWtJMC9QeVQNClRncHFPNElDQUxnVW4vTVdiUGlaYnppMUpqbUdBZ0M0Y203aGIvUnBFQUNoYno4ZWNGUHkzQlVVQU1EV2Z4WmRyWUJWTGQvVFQvVjINClAraldQZUlhU3RHTnBVOVRaNUlPWEVGbCtZLzFIWG5JNzlCVjRRMVVVU3ZYbGorN2ZIbUJaMzR3K05BRC92YUhEcEFXMktlRkttdDENCkk1dk55NSt2M2lpczU5YldObTV1ZmJVTzRJTTdtbHIyZExUc3YzdVhyN1Z0NTk2RHpUenJXWExvLzhNNE1ubTF2a0pKQUFBQUpYUkYNCldIUmtZWFJsT21OeVpXRjBaUUF5TURJd0xURXlMVEkwVkRFeE9qUTBPakk1S3pBek9qQXdJZUdCVGdBQUFDVjBSVmgwWkdGMFpUcHQNCmIyUnBabmtBTWpBeU1DMHhNaTB5TkZReE1UbzBORG95T1Nzd016b3dNRkM4T2ZJQUFBQUFTVVZPUks1Q1lJST0iIC8+DQo8L3N2Zz4NCg==");

/***/ }),

/***/ "./src/images/react.svg":
/*!******************************!*\
  !*** ./src/images/react.svg ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMzQiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzNCAzMiI+PHBhdGggZmlsbD0iIzQ0NCIgZD0iTTE5LjMxNCAxNS45ODdhMi4zOTIgMi4zOTIgMCAxIDEtNC43ODQgMCAyLjM5MiAyLjM5MiAwIDAgMSA0Ljc4NCAweiIvPjxwYXRoIGZpbGw9IiM0NDQiIGQ9Ik0xNi45MjIgMjQuNzgzYzEuODc4IDEuODI2IDMuNzI5IDIuOTA2IDUuMjIxIDIuOTA2LjQ4OSAwIC45NTItLjEwMyAxLjMzNy0uMzM0IDEuMzM3LS43NzIgMS44MjYtMi43MDEgMS4zNjMtNS40NTMtLjA3Ny0uNDg5LS4xOC0uOTc3LS4zMDktMS40OTIuNTE0LS4xNTQuOTc3LS4zMDkgMS40NC0uNDYzIDIuNTk4LTEuMDAzIDQuMDM4LTIuMzkyIDQuMDM4LTMuOTA5IDAtMS41NDMtMS40NC0yLjkzMi00LjAzOC0zLjkwOS0uNDYzLS4xOC0uOTI2LS4zMzQtMS40NC0uNDYzLjEyOS0uNTE0LjIzMi0xLjAwMy4zMDktMS40OTIuNDM3LTIuODAzLS4wNTEtNC43NTgtMS4zODktNS41My0uMzg2LS4yMzEtLjg0OS0uMzM0LTEuMzM3LS4zMzQtMS40NjYgMC0zLjM0NCAxLjA4LTUuMjIxIDIuOTA2LTEuODUyLTEuODI2LTMuNzA0LTIuOTA2LTUuMTk1LTIuOTA2LS40ODkgMC0uOTUyLjEwMy0xLjMzNy4zMzQtMS4zMzcuNzcyLTEuODI2IDIuNzAxLTEuMzYzIDUuNDUzLjA3Ny40ODkuMTguOTc3LjMwOSAxLjQ5Mi0uNTE0LjE1NC0uOTc3LjMwOS0xLjQ0LjQ2My0yLjU5OCAxLjAwMy00LjAzOCAyLjM5Mi00LjAzOCAzLjkwOSAwIDEuNTQzIDEuNDQgMi45MzIgNC4wMzggMy45MDkuNDYzLjE4LjkyNi4zMzQgMS40NC40NjNhMTYuODgyIDE2Ljg4MiAwIDAgMC0uMzA5IDEuNDkyYy0uNDM3IDIuNzUyLjA1MSA0LjcwNyAxLjM2MyA1LjQ1My4zODYuMjMyLjg0OS4zMzQgMS4zMzcuMzM0IDEuNDkyLjA1MSAzLjM0NC0xLjAyOSA1LjIyMS0yLjgyOXptLTEuNDQxLTMuNDcyYy40NjMuMDI2Ljk1Mi4wMjYgMS40NC4wMjZzLjk3NyAwIDEuNDQtLjAyNmEyNC41MjMgMjQuNTIzIDAgMCAxLTEuNDQgMS43MjMgMjQuMjUyIDI0LjI1MiAwIDAgMS0xLjQ0LTEuNzIzem0tMy4xODktMi42NDljLjI1Ny40MzcuNDg5Ljg0OS43NzIgMS4yNmEyNy43ODYgMjcuNzg2IDAgMCAxLTIuMjYzLS4zODZjLjIzMi0uNjk0LjQ4OS0xLjQxNS43OTctMi4xMzUuMjA2LjQxMS40MzcuODQ5LjY5NCAxLjI2ek0xMC44IDEyLjQ2M2MuNzItLjE1NCAxLjQ2Ni0uMjgzIDIuMjYzLS4zODYtLjI1Ny40MTItLjUxNC44MjMtLjc3MiAxLjI2cy0uNDg5Ljg0OS0uNjk0IDEuMjg2YTE3LjEwOSAxNy4xMDkgMCAwIDEtLjc5Ny0yLjE2MXptMS40MTUgMy41MjRjLjMzNC0uNjk0LjY5NC0xLjM4OSAxLjEwNi0yLjA4My4zODYtLjY2OS44MjMtMS4zMzcgMS4yNi0yLjAwNmEzNS4yOTMgMzUuMjkzIDAgMCAxIDQuNjgyIDBjLjQ2My42NjkuODc0IDEuMzM3IDEuMjYgMi4wMDYuNDEyLjY5NC43NzIgMS4zODkgMS4xMDYgMi4wODNhMjYuOTIyIDI2LjkyMiAwIDAgMS0xLjEwNiAyLjA4M2MtLjM4Ni42NjktLjgyMyAxLjMzNy0xLjI2IDIuMDA2YTM1LjI5MyAzNS4yOTMgMCAwIDEtNC42ODIgMCAyOC42OTUgMjguNjk1IDAgMCAxLTEuMjYtMi4wMDYgMjcuMTA2IDI3LjEwNiAwIDAgMS0xLjEwNi0yLjA4M3ptMTAuMDU3LTEuMzg5bC0uNjk0LTEuMjg2Yy0uMjU3LS40MzctLjQ4OS0uODQ5LS43NzItMS4yNi43OTcuMTAzIDEuNTQzLjIzMiAyLjI2My4zODYtLjIzMS43Mi0uNDg5IDEuNDQtLjc5NyAyLjE2MXptMCAyLjc3OGMuMzA5LjcyLjU2NiAxLjQ0Ljc5NyAyLjEzNS0uNzIuMTU0LTEuNDY2LjI4My0yLjI2My4zODYuMjU3LS40MTIuNTE0LS44MjMuNzcyLTEuMjYuMjMyLS4zODYuNDYzLS44MjMuNjk0LTEuMjZ6bS41OTEgOC45MjVjLS4yMDYuMTI5LS40NjMuMTgtLjc0Ni4xOC0xLjI2IDAtMi44MjktMS4wMjktNC4zNzItMi41NzJhMjYuODY4IDI2Ljg2OCAwIDAgMCAyLjE4Ni0yLjcwMSAyMy42MTkgMjMuNjE5IDAgMCAwIDMuNDQ3LS41NGMuMTI5LjQ2My4yMDYuOTI2LjI4MyAxLjM4OS4zNiAyLjE4Ni4wNzcgMy43NTUtLjc5NyA0LjI0NHptMS4zMzgtMTMuNTU1YzIuODgxLjgyMyA0LjYwNCAyLjA4MyA0LjYwNCAzLjI0MSAwIDEuMDAzLTEuMTgzIDIuMDA2LTMuMjY2IDIuODA0LS40MTIuMTU0LS44NzQuMzA5LTEuMzM3LjQzN2EyNy4wMSAyNy4wMSAwIDAgMC0xLjI2LTMuMjQxYy41MTQtMS4xMDYuOTUyLTIuMTg2IDEuMjYtMy4yNDF6bS0yLjA1OC03LjI1M2MuMjgzIDAgLjUxNC4wNTEuNzQ2LjE4Ljg0OS40ODkgMS4xNTcgMi4wMzIuNzk3IDQuMjQ0LS4wNzcuNDM3LS4xOC45LS4yODMgMS4zODlhMzMuMDcyIDMzLjA3MiAwIDAgMC0zLjQ0Ny0uNTQgMjMuNzc0IDIzLjc3NCAwIDAgMC0yLjE4Ni0yLjcwMWMxLjU0My0xLjUxOCAzLjExMi0yLjU3MiA0LjM3Mi0yLjU3MnptLTMuNzgxIDUuMTdjLS40NjMtLjAyNi0uOTUyLS4wMjYtMS40NC0uMDI2cy0uOTc3IDAtMS40NC4wMjZjLjQ2My0uNjE3Ljk1Mi0xLjE4MyAxLjQ0LTEuNzIzLjQ4OS41NC45NzcgMS4xMzIgMS40NCAxLjcyM3ptLTcuMzgyLTQuOTljLjIwNi0uMTI5LjQ2My0uMTguNzQ2LS4xOCAxLjI2IDAgMi44MjkgMS4wMjkgNC4zNzIgMi41NzJhMjYuNzU2IDI2Ljc1NiAwIDAgMC0yLjE4NiAyLjcwMSAyMy42MTkgMjMuNjE5IDAgMCAwLTMuNDQ3LjU0Yy0uMTI5LS40NjMtLjIwNi0uOTI2LS4yODMtMS4zODktLjM2LTIuMTg2LS4wNzctMy43MjkuNzk3LTQuMjQ0ek05LjY0MyAxOS4yMjhjLTIuODgxLS44MjMtNC42MDQtMi4wODMtNC42MDQtMy4yNDEgMC0xLjAwMyAxLjE4My0yLjAwNiAzLjI2Ni0yLjgwMy40MTItLjE1NC44NzQtLjMwOSAxLjMzNy0uNDM3YTI3LjAxIDI3LjAxIDAgMCAwIDEuMjYgMy4yNDFjLS41MTQgMS4xMDYtLjk1MiAyLjIxMi0xLjI2IDMuMjQxem0uNTQgMi44MjljLjA3Ny0uNDM3LjE4LS45LjI4My0xLjM4OSAxLjA4LjIzMiAyLjIzOC40MTIgMy40NDcuNTRhMjMuNzc0IDIzLjc3NCAwIDAgMCAyLjE4NiAyLjcwMWMtMS41NDMgMS41MTctMy4xMTIgMi41NzItNC4zNzIgMi41NzItLjI4MyAwLS41MTQtLjA1MS0uNzQ2LS4xOC0uODc1LS40ODktMS4xNTctMi4wNTgtLjc5Ny00LjI0NHoiLz48bWV0YWRhdGE+PHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIiB4bWxuczpyZGZzPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwLzAxL3JkZi1zY2hlbWEjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iPjxyZGY6RGVzY3JpcHRpb24gYWJvdXQ9Imh0dHBzOi8vaWNvbnNjb3V0LmNvbS9sZWdhbCNsaWNlbnNlcyIgZGM6dGl0bGU9InJlYWN0IiBkYzpkZXNjcmlwdGlvbj0icmVhY3QiIGRjOnB1Ymxpc2hlcj0iSWNvbnNjb3V0IiBkYzpkYXRlPSIyMDE3LTA5LTI0IiBkYzpmb3JtYXQ9ImltYWdlL3N2Zyt4bWwiIGRjOmxhbmd1YWdlPSJlbiI+PGRjOmNyZWF0b3I+PHJkZjpCYWc+PHJkZjpsaT5Wb3JpbGxhejwvcmRmOmxpPjwvcmRmOkJhZz48L2RjOmNyZWF0b3I+PC9yZGY6RGVzY3JpcHRpb24+PC9yZGY6UkRGPjwvbWV0YWRhdGE+PC9zdmc+");

/***/ }),

/***/ "./src/images/twitter.png":
/*!********************************!*\
  !*** ./src/images/twitter.png ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAHphJREFUeNrs3SuUXMeZAOCSY5BFGTEzt9gyj5iZrpiZx2wXucUS5BFzkEYoCRoZ5SyaMdpdNBI0mhYLmxFbphYL04g5yHsrXR23RppHd99n1fedU2d0lMiW6z7+v/563BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHJ2RxdAFnbqtnvp9yapbWOe2qrzul3ocpAAAO0H9Sr9/HwlqO+m/0+fLlJCsEwW3qRfzy79BCQAwEdG6ctg/uCK0fzYLROBlytJg0oCSACgmNF8bF+koF/pln8lB7F68EpiABIAyCHYVynY74bt5+JLM0+JwKuUIEgKQAIAg7Mc2T9IQV+wb8eyOvBypWoASACg04BfrQT8HV3Si4uUCLxcqRIAEgBozGQl4O8J+IM1X0kIngdTBiABgA1H+d+mwL+rO0YpVgRepGRAdQCAK8XR/VHd3tbtFy2r9jZd2z23OagAwE4KCF8Hc/kluUhVgWV1AIDCRvpGxprKAEDmqqC8r90uGbDmA2DkJnU7qNtrwU1bs8V7Zj840wFgVGI590QQ0xpqJ8EUARmyCJCcRvvTsNi6Z9RGG+Z1+7Fux8EphAC9q4IFfVr37Sj4mBNAL+Jo/0wg0npuZ+leBKBFcZ/+QbCSXxvmosGD4CwJgEZNBH4tjGcroUQAoIHAb35fG/M6gYnHGEDg1yQCAAj8mkQAoGxxvvRQgNAKaQfBGgFA4Le4T7NYEKAkU4Ff0/75DEy9DuiDo4DpWhXMhcJl87o9qttMVyABIDeT4PhUuMksJQJzXUHbfqMLaFmc4/w+LL6oZtQPNyfK+2lwdl63n3UJMEbxE6rxiFRzvZq22fHCPkNMa0wB0NYoRrkfmjELpgVogSkAmnaQgv+/6wpoLKGe1u3fgkWCqAAwQLsp8O/qCmjNeaoGnOsKVADoW1zk96e6HdftM90BrYrP2O/T4E01ABUAelMFe/pBNQAVAIpykIK/o0xBNQAVAApgrh9UA1ABoDDxgJKTYK4fhlgN+I+6/aNuf9MdqADQlJ0U+CtdAYM3q9s3dbvQFUgA2EaVgr+5fhiPi5QEzHQFVzEFwHUOwmK+/7e6AkYlPrPTYIEgKgCsSckf8jELpgSQAHALVVDyh9yYEuADpgBYFVf5/3dQ8ofcLKcE3gW7BJAAsCKO9v9at+91BWTtq7A4ufNl3X7WHWUzBUB8GcSSv4N9oBzxwKA4JTDXFRIAyhSD/mkw3w8liusCHganBxbrE11QrGndzgR/KNZOegdMdUWZrAEo02Hd/qwbgNpeSgZ+0hUSAPLO+ONiv9/rCmDFl8HiwOJYA1BW8I/z/Rb7AVeJ6wHiugCHBhXAGoAy7Ar+wBrviomuUAEgnwfaYj/gtuwQkAAg+AOSAHJkCiBf02CbH7C55bqhqa7Ik10A+Qb/I90AbCl+QyBuE3yjEiABQPAHyiMJkAAg+AOSACQACP6AJAAJAII/IAlAAoDgD0gCkAAg+AOSACQACP6AJAAJAII/IAlAAoDgD0gCaJFvAYxLPNv/TDcAA+TbASPjWwDjCv6nugEYqOW3A3x2XAWAFoK/D/sAKgFIAGTVAIN0npKAC10hAUDwByQBDIhdAMP217p9pRuAEfostRe6QgLAeg7r9nvdAIxYrF7GSuZPukICwO1M6/Zn3QBk4MvgjIBBsgZgmBmzvf5Abu5LAiQAXG2Sgr/tfkBuLlISMNcVw+AgoOGIQf9E8Ae84+iCNQDDYcU/kDs7AyQAXLJft+91A1CAuM7pXd3+piv6ZQ1A/6rgjH+gPPGQoJlukACUKs6FvQ7mxIDyxEWB94KTAntjEWC/LIgBSh4AneiG/lgD0J+DsDjwB6BUk7CoRM90RfdMAfSjCub9AZasB5AAFMG8P8D7rAfogTUA3TPvD/DhwMh6gI5ZA9CtuN/fF/4APjQJzgfolCmA7vjID8DNfDRIApCds5QEAHC185QE0DJTAN04qNt/6AaAG30WbA1UAchEFWz5A1iXqQAJwKjFla2x9D/RFQBrMRXQMlMA7fpT8IlfgE2YClABGC2r/gG2ZypAAjA6Vv0DbM9UQEtMAbTjIFj1D9AEUwEqAKMxSaN/x/0CNOMiVQHmuqI5vgXQvCPBH6BRO+ndigRgsPbCYt8/AM2q0juWhpgCaDZDtecfoD3zsJgK8NngBlgE2JzvZacArQ+0/hEsCFQBGJA46n+tGwA6cS9YELg1awCaYXEKgHeuBKAwVbDwD8B7d2RMAWwvlv4nugGgU/OwmApABaAXU8EfoBeT9A5GBaBzO2n079AfgH5cpCqAbYEqAJ3aF/wBeh+I7esGFQCjfwBVAG7JQUCb+VOwAhVgCH6b2k+6QgWgbZPg0B+AoXE40Jo+1QVre6ILoDXnYVHKjT/fXfq91SR8kn79u7rtXvo9yn03P9INKgBG/zB8cbQ2q9urFORnDfwzq5QQPEi/tk5HFQAJQCPi8ZNT3QBbjfBf1O15+nXbYjLwbVh8qEuFIH/HqgASAKN/GI6L9GL+saOgf10y8F1KBlQGVAFgrdH/L5qm3brFhHk6wGC73Dv+egR9+LZuB3U7cT/duvlQEI2P/j1YmrZe4B+DaQqyQw1kO94/G7WJsHUzJwHe/iUBXC+W+p+mEuzxSP7Ox+nv+zQM5yCZ5d/pUfo7ef94Z9NjuXCoIwRNG0o7yWDUFf/+pz2P+D/Wh6/dXxtNnVjnwdYOPEyadu2Ldi+zZ36/w6Q//nsOr0mepu6xjduB8MW2ZN/ttPjSO9MPo25nId+51knL9+frcLsPinn/bNfHsNU8kgepvQfT9Mq4E7gSpv+a3P3zNv3zKu+fztpUGGNTRqjtP5S7kgAv1RFMCWy7PmIa1p+TNvpvpkoFa6s8PJ2V5fb0i/n+jKqBb7cI+k0lHdqvrRLOWJeDf7pdmKPcOfzgv2tK8NqR5mFDwcbUmIOB6NHEQ9Na2zHqEfxHngTE/jhNyWwVmt9u5tQ/BwPRowMPTG+ZuMrL8NqeV0JnTIfZEkjPLL7pN5BIAiz4K5HSvy2ByMCzLSOvQxJgq19pTt1zKln0y/zbcBbiSAL6a6deBZ06dM91clw1XGniIRlc9i0JcI567qbuOYsB++BrgB8+iLRjtuGfi19EO9Z9nVp+hY727QXb1LzjGQSL/4Z7GpdKgDJpbpyCaTGgCsCAHkbloWGN/i+PSp/pylZdpH6mm/dNXGexs+VzpVKznklwpoUE4CO+0wWtedXQP+exANWqpwJKJ6ZbBP+LlAjfq9sPwVoN73oaoRQ3nrO4p66X0uiIg/82HxRacmZAd1uSyZy9/+22Npg/deDP2Ky7juW6Dwo5M8CZAPT0YGr9JwDRJPhks9H/8N32Pn2d3kV7N5T2D9yzPhBEM3Y8DKM+UGYnOLzJ6H/Y1cWrKlVnKRBNw+0XIFfuV2dd0JyphyGLE+WcpGb0P7RR/8ml5yAG+/2w+RcEJ8G0l8QX5X8JwNqjLc1X0rq0G5r9VPBOMN1lGoDGCRh5fVBm14vS0agZMs1lN0DjSj8H4KbFNmzvXcf/vvO6PQyOD76NWd3mumEUVUqr1pu3U3q/lp4AfO0ZyNLyRLtvgoNtrvNCFwxeXDMw1Q1iAM1T/s//m/KTYM+08v84Td2jpgFUANqxG5T/u+rnPs3DYkrgsUvxnvOg/D/04G+RWvt2QsHfBig5AfjWvV+UeH76/RT4aOYDTQj+YoEEYJQq932Ro977qRpQ+tqAl24HwR+xoESTYO4rh6OAt70HSl4bMPEaGGTw977wPKgAyPho2Tws1gZ8E8qbC78I5v+N/Ck+JpSaADxwv3u4kudhMS3wtKDrYR3EsOwL/mIC3bH9z5nbHzMJZRwNLdgMh6PIbQdUAeiQ7X/d+2Ikf895WBwgFKcGZhlfjzduyd7Fd9BpcMjPkK5HcdsBS0wAKve6Pr/BLCUBuSYCTkfsfxBy6l3kPSUB6J65nn5eeGOsuiwTgUchr0Vz1gD0Zy8F/11dITZIAGR5+n34jut2Lyx2DMxcSjZ0EBZf9TMF6R0lATASLUoOH914HvKeGqAdy/n+J7pi8NepqMpMiQkA/cjps5uzlATcS9UBc+rc9N6pdIMYIQHol/n/frPr3L69PQ+L9QExEXgcHK4DYoQEQHbHR+X67e1YAXiWEoGHqSoAiBESgAGNQCUA/ZqG/NdgzFJV4G76OXPZYVQJQDHrxD4p7MLSv/1C/jsvUiVguVYgThEMZfvdxG0IYkVJCUDlvh6E7wr8b56HxRTB/ZVk4LkEAMQKCUA3vnBfD0Isr00L/u9fJgPxTIG76edx6HYB4e/chiBW3Cnoor428hmMizQStn3uw5H5XnoBVS3er7OwmJqguxHlqW4YVZJ+TwKQ16jzrft6UOLndw90w40JQZUSgib3khfzgpMAsKG7JQxQ7ngA6bEKcD/YO7+u3ZQYxJ8Pwua7W4p4wXn/sKEiTvv8tKCXJsMSA9dhWMyBc3vnqT3/SLVgmRjEvv08/DqFUF3xTMx0J1wZMyQAmbAAcJj2UnuuK7Y2T+2ml1a18v8HCo4ZpSQAE/fzYB2loKUc3Q2jfhAz/qmUbYCV+3mwYrn6RDeQMVOQYoYEQCbHNQ/bgW4g4yQXsUMC4CJyhfit9D3dAIgdEoCmKL+Nx5HrRYacvCh2SAB6ovw2rmt1KglAIEHskAA04YH7WBIAIHaoANCt+OW7mSQAFQDEDrr2i9Zrq9J1iD+P1vyzb7088Q7SemwqADI4GhCrAI/C4iM08UNA8zUqAVPdh9E/YogEwMM3bjHwH6REIH4M6NkNycBOqhwc6joEEMQQCQDjMbnmf4sftXmckoF7qUJwnH7/sv26nQXnOiCAQCNy/xZA5RIPOgG4XBk4Tm315blz6ToepqRhrmtRAaCDGDKTAMBmPt/izy4rATPdyEjZhsxg5T4F8LlLPJoKALj/EUMkAB6+jJgDRQKA6ycBoEA7XoIUqtIFSACMPlUBwOgR7y4JQMejT/pnIRQl+kIXiCESAEpX6QKMHmFY7mSeub11iQcjHvQz1w0U5BddkIW7dbtQAZB9s7k9XUBBKl0glkgAYOFbXYCgARIAynwhTnQDhbDwFQkArJjqAgpR6QIkAP0x2hye73QBBVh+xAqxRALgopHsqAJg9I9YIgGgTE90AZkz/48EAK7IplUBUAEACQCqAJAN8/9IAOCGKsCBbiBDzrtAAgA3+C5YqEl+Kl2ABACuF8ukh7qBjMSE1gmASADgFvaCbwSQ1/0MEgC4paNgKoA8fK0LkADA7cWpgBPdQAb3caUbkADAenZTJQDGaqoLkADA5i9QL1HGyvY/JACwhSNJACM0CVb/IwEASQDFsfofCQBIAiiQz1wjAQBJAIWpgm2sSAAGZ+7yZpEE7OsGBsziv/xlG0skAAzdYUoEfGGNoYn35FQ3SAAkANCe+JI9DVZaM7z7EiQA0LLdlASYEmAoLP5DAgAdWX5BMCYCE91Bjyr3IGN3J/Ng8dYlztrTuj2r24WuoGOnwdn/pbib6zvmTuYX7hf3bvbig/mDRIAOxZH/a91goDx2pgAYu1jpeZJeyAfBbgHa90QXILMZvrcCQpGO6/aibs91BUb/bGFet3sqAON07v4t0rRuJykBjGcIOKudJu8tykoAsmUKgJztrCQDcT1IXLh1EJwnwOb3k61/ZONT2RsjuIaTLf8Zs/TPeRkWVSGVITaxH0wpqgBIAEbjjft39OLK/jvpxbscuVc3/Jnz9OfmkkCM/hFDykwAGL/d1M7TSD6s/ASjf9hQ7msABIo8+OIafZoY/Rcr6xhiESBjMDX6okdP3H/kKPdzABwHnI9HYbG/H7oe/dv3L0b6jxspxwHnYR4yPpCDwYpbSJ0jIQHIUglTALZ85TMSm+oGOlQJ/kWb5f4fWEIC4AMx+TAXS5cOdQESgHF76TJnVQXY1w10IN5nTowsW/axQwWAsfkubH8yIFxn+YVJypZ97LAGgDG+nI90Ay06DKaaKCB2lLALwFbAPD2u2zPdQMOqsPhoFNzNvQpwp5ALaStgfuKDeT84659mBwtnwRQThcTHUk4CnLmXs3xZn+gGGvRE8KekmFFKAmCUmKe4Stt6AJq6l+wwoaiYUUoC8Mr9nK2pFzdbsrCUImNGKQmAnQB5OwxOCWRzT4I9/xQYM0pZBGgnQBl8MIh1VcGqfz6U/Q6AkioA8ULO3dPZO1IJYM2BgYWkXDYPhRwg90lBF9U0gCQALt8rDvyh2FhRUgJgIWBZL3YLA7lOvD986Y+iY0VJCcDMfV2UQyM8rrAbfOkPsaKYRYAhWAhYqljOexRMAfHre+C1xJBrFLEAsLQKwIUgUOxoL67yNiVAdCL4c8OAoZgvyH5S4MWlzFHfYUoEJrqjWPEeqHQDYkSZCcBL93fR4ss/ln8PjAKLMw2qQIgR77lT2MWN5eAz9zhhUeaLnxQ+1hWee0juhYLOjLlT4AV+a/THiviw/1i3Z6Ggub/Cgv+pZ55bDgrulvQf/EmBF3nmPmfFJCzOgo9TA0fBmfA5WX7kR/BHbJAA/JN1AFwVLKZhUSqOycChZGD01/PUNURsuFqJUwDmA1nHRRoZxJfDeVBBGou43c9Jf6zjfihsF8CdQi90HOFN3O9saJ5afFm8W/m982Cr6RD4HgSbPNP3dEM5L4hfNK3BFqtKys2ebW2c7ajEh+WTQl8S1gHQpOO6PTT6N/JHTBiTUqcAJmExDQDbcJaA4E8eijn/XwXg1/la2NQsLBYNCf6CP+NW1Pn/EoBfX+Cw6aj/YSjoxDDBn4y90AXliQu2LH7R1mk+JjS84O++1LZtxS7evVP4C8SxwNzGPI36n+uKQVh+3dHIn20Vd/zvqk8Kv/he6Nz0cngaFnP97pXhBP9TwR8xQAKwLXM/XOU4Bf6D4CNBQzEJjvdFDGjMHdffNAAfBP446p/rikHxVT+aVnT5XwVgQWmXZeCPR4E+EvwHZyr4490vAWiDUwHLHgEI/MN2EHzSl3YUPwVsCmDxYnntBVOUGOh/SMHf/P5wn8sY+H3Rj7aS/7uld4IKwOJGMA1QhhjwH6YR/zPBf7CWn+wW/GmLd74E4F/sBsj7QX+Usv34c6ZLBm0aHLiEd34nTAH8ym6AvIL+i/TTKH8clPzpivJ/8qkueC9oTHXDKJ2nkf3LoLQ3RlUK/kb9dPWuRwXgPct5R4ZvloL+y/Rro/zxikf67usGOnQ/+BqsBOAjXhuFDG5kP6/bq5Vfe3DzSbiPglP96FZ8h9zTDQumAN73Y92e6Ia1LE/NWyZOv1vjpR7/3Jv064uV4F7s97kLsJNG/J4z+vCDLuAqMYj5POb67UTlhFuowqLK5pnR+mreU1zrxEOyUYu7KA7cPlyRWHuutCEMVOBaex6UrdrrNNKDnZQUvvVcaANotphyK8qU27dTiUDRpp4jbWADEy5xEuDH/agLtlalJMD+7vKu+5nrjnc6YzWRMTfeBIQyEj73umbxH6N35KGRCCDwa1m8c2DtF5uHp92H0iEwAr+mtd0qjyubOPPwdLJY0Orc8ZgGi/u08TTHu7PVy85D1N0q3XhCnC8yDs8k2M6njbNNPb5X8y2Am/k+QPeOw2LV7kxX9CpWZr5VoWGk5sG5/9eyDfBmto/0U3k5XakKSMC6E9dlHKbR/ongj3e3CkDJdlIgUpru1yw90PFb3j4U1KzJymjfwkxycJFG/94VbO0gmEsb2pneU5WBrUf68b620FXLsR14xFUAmhwhOUpymOKng1+kysC57ri2klXV7ev0U/JEzuLof64bJABNOQpWlA5dLPfN6vYy/Sw9IahSexDshaYcx3V7pBskAKoAEoKYCLxKP2eZ35+7KdjvCvgY/SMBUAXgfeepvVmpEoxtoVCVAv4XKdjHZpEqGP1LAFQB2MAsjRrepJ+rrY/7bJKCegzun6+M8AV6MPqXAKgC0HGCsFpFeHfpf78pWag+8nvLwB5Wgj1g9C8BUAUAwOi/Hb/RBWu7SKO1L3UFwCA8DYutwKgAtM7pgADDGZQ59W8DvgWw+Q33g24A6N0Pgr8KgCoAgNE/KgCd3HiPdQNAbx4L/ioAfYpVgIluAOjUPI3+UQHojX2nAN69EoACzULeZ8wDeO9myBRAMybB4UAAXXHoTwMcBNSMi5RMVboCoFUO/VEBGJy4HfAsWBAI0JY46r8frPxvhDUAzVYBbAsEaI9tfyoAg3YaTAUANG1Wt4e6QQIwZJOwmApwQiBAM+KoP5b+57qiOaYAmhdvUN8JAGjOD4K/CsCYxCrArm4A2Mp5Gv0jARiN3ZQEALC5+ykJoGHOAWjP34OzAQC2Eff8/49uUAEYI2cDAGxG6V8CMHqmAgDWp/TfMlMA7TMVALAepX8VgKzYFQBwM6V/CUB2TAUA3EzpvyOmALoTpwLe1e0rXQHwUfGsf1/6UwHIlm8FAHxoFpz1LwHIXNwa+Dr4VgDAUjzr/17wpb9O+RZAPzf6N7oB4F++Efy7Zw1AP+bB1kCAKG75O9YN3TMF0C/rAYCSzYJ5fwlAoawHAEpl3r9n1gD0/wBYDwCUyLx/z6wB6N88OB8AKEvc7++oXwkAtb+FxRcDHRUM5O64bn/UDf2zBmA44jqAU0kAkLF4xG9c9Kf0LwHgklgFOAsWBQL5iUE/nvM/1xUSAD7OR4OAHPnIz8DYBTA88QF5pBuAjDwS/IfHIsDhJgFxGuBLXQGM3LO6/UU3SAC4vZ+CnQHAuB3X7Q+6YZisARg2OwOAsbLiXwKAJAAQ/JEAsIndlATYHggMne1+I2EXgGwaoMng/1DwVwGgnUqAMwKAIQd/2/1UAGipEuCMAGCIHgv+42Ib4DiTgDd129MVwEDEgcmxbpAAIAkABH8kAEgCAMEfCQCSAEDwRwKAJAAQ/JEAIAkABH8kAEgCAMEfCQCSAEDwRwKAJAAQ/JEAIAkAmhWP9/2D4J8n3wLIm68IAtsEf2f7SwCQBACCPznxMaD8nXuQgTXfGfe9M1QAyMdOqgTs6grghgHDha5QASAfy5Lesa4APuJY8C+LXQBl+bluL1I14EvdASTPwmK1/8+6ohymAMo1rduRboDi2eMvAaBAdghAuaz0L5w1AGWz2hc8+xTKGgDiKOB/6/ZZsEMASnBct/+s2991hQQAlosD39XtK90B2Xpctz8Gi/0I1gDwoapuJ8G6AMhJrPR9U7eZrkACwHV2UhJQ6QoYvVkK/vb38x5TAHxMLA/+mBJESQCM19Ow2Oan5I8KAGurgikBGBslfyQANMKUAIzHLCj5cwvOAeC2o4l4YMhjXQGDfk4fB+f5owJAS+JZAUfBmQEwJPFAn0fBwT6swSJA1hUPD/mvYIEgDEVc6OdgH1QA6FSVqgETXQFG/agAUI55WGwX/G3weWEw6kcFgCJZGwBG/agAUKDVtQG7qSoANCOu6v+LUT8qAAzdJFUDKl0BW5ulUf9cV9Ak5wDQhviiinuRv/HSgq2eo2/Ss+Q5onGmAGjT/4XFIsF/qAbAWpZn+JvrpzWmAOjKJJgWgJvMgnI/EgAyVQVnB8Bl8xT4Z7oCyN20bm/r9oumFdzepmcBOmcNAH2Jc5tx22BcH2DbIKVZ3db3N90BlCp+bvjQaFArpB2kex6AZBIW6wMECS3HZu0LgERAE/gBkAhoAj8AH00EDoJdA9o4VvXHe9UcP4PnHADGJL5U9+v2rZEVAzMPi1Mvn4XFCn8AWjKt25kRp9ZzOwv28QP0ogrWCWj9zO9XHj/GzBQAuZikkZjpAdoyD4sy/3FwVj/AIO3V7cQoVWuonaR7CoARVQUO6vZaENPWbPGe2VdNAhi/KizmbW0l1K7bwhfvkV2PCyWwBoASxXLu1+mn/dpli1v2ntftRfoJEgAowM5KMlBJBgR9AMqtDJgmyLu8bzEfqADAteI88LepMmBOeJzOV0b557oDJACwrklKBB4E6waGbF63Wd1epqDvSF6QAEDj1YFlQlBJCHpzsRLwZ0b5IAGAPhKC3ZWEYKJLWnGe2suVXwMSABiMnZUqwRfp15KC9cxTgH+1MrpX0gcJAIw2KdhNScEk+JjM0iwF/FcrI3vBHiQAkLVJarspSXiwkizkFuSjlym4C/QgAQBuqBqElWrB5+HX6YRl0tCnZTAPaRT/5lLAn7mMIAEAukkWliZh+7UH8/Dhp2+N3AEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgIH7fwEGAI8NayA/QQAUAAAAAElFTkSuQmCC");

/***/ }),

/***/ "./src/pages/index.js?export=default":
/*!*******************************************!*\
  !*** ./src/pages/index.js?export=default ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/layout */ "./src/components/layout.js");
/* harmony import */ var _components_seo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/seo */ "./src/components/seo.js");
/* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Header */ "./src/components/Header.js");
/* harmony import */ var _components_Work__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Work */ "./src/components/Work.js");
/* harmony import */ var _components_about__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/about */ "./src/components/about.js");
/* harmony import */ var _components_skills__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/skills */ "./src/components/skills.js");
/* harmony import */ var _components_Footer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/Footer */ "./src/components/Footer.js");



// Components





const IndexPage = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_layout__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_seo__WEBPACK_IMPORTED_MODULE_2__["default"], {
  title: "Fadhil Alfatayah"
}), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Header__WEBPACK_IMPORTED_MODULE_3__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_about__WEBPACK_IMPORTED_MODULE_5__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Work__WEBPACK_IMPORTED_MODULE_4__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_skills__WEBPACK_IMPORTED_MODULE_6__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Footer__WEBPACK_IMPORTED_MODULE_7__["default"], null));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (IndexPage);

/***/ }),

/***/ "./src/styles/mains.scss":
/*!*******************************!*\
  !*** ./src/styles/mains.scss ***!
  \*******************************/
/***/ (() => {



/***/ }),

/***/ "./src/yourdata.js":
/*!*************************!*\
  !*** ./src/yourdata.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _images_html_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./images/html.svg */ "./src/images/html.svg");
/* harmony import */ var _images_css_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./images/css.svg */ "./src/images/css.svg");
/* harmony import */ var _images_react_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./images/react.svg */ "./src/images/react.svg");
/* harmony import */ var _images_javascript_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./images/javascript.svg */ "./src/images/javascript.svg");
/* harmony import */ var _images_express_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./images/express.svg */ "./src/images/express.svg");
/* harmony import */ var _images_mongodb_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./images/mongodb.svg */ "./src/images/mongodb.svg");
/* harmony import */ var _images_github_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./images/github.svg */ "./src/images/github.svg");
/* harmony import */ var _images_instagram_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./images/instagram.svg */ "./src/images/instagram.svg");
/* harmony import */ var _images_twitter_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./images/twitter.png */ "./src/images/twitter.png");
/* harmony import */ var _images_linkdin_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./images/linkdin.svg */ "./src/images/linkdin.svg");
// Skills Icons







// Social Icon





//portofolio
// import nusa from "./images/nusakamera.jpg"
// import stay from "./images/stay.jpg"
// import mobile from "./images/mobile.jpg"
// import agro from "./images/global.jpg"

// image source
const mobile = "https://user-images.githubusercontent.com/23058601/108582730-97c49280-7367-11eb-9473-50c3c6e11fba.jpg";
const nusa = "https://user-images.githubusercontent.com/23058601/108582930-becf9400-7368-11eb-8d1e-7280d86d7437.jpg";
const stay = "https://user-images.githubusercontent.com/23058601/108582920-afe8e180-7368-11eb-96c9-9293b0e58b96.jpg";
const agro = "https://user-images.githubusercontent.com/23058601/108583283-03f4c580-736b-11eb-8dc2-b03faf1859f1.jpg";
const nusaPos = "https://user-images.githubusercontent.com/23058601/152916544-187f4dfe-fafa-4f32-9b51-663959dfb2fc.png";
const nusabooking = 'https://user-images.githubusercontent.com/23058601/225804230-25c49fa2-8421-41bb-8c0d-f561e629b68b.png';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  //(Please Do Not Remove The comma(,) after every variable)
  //Change The Website Template

  //   Header Details ---------------------
  name: "Fadhil",
  headerTagline: [
  //Line 1 For Header
  "Lets get in touch",
  //Line 2 For Header
  "Im Software Developer",
  //Line 3 For Header
  "and experience"],
  //   Header Paragraph
  headerParagraph: "Im working with newest front-end framework like React Native and React. Love to lern React and Express. Cant wait to be a touch with you!",
  //Contact Email
  contactEmail: "fadhil.alfatayah@gmail.com",
  // End Header Details -----------------------

  // Work Section ------------------------
  projects: [{
    id: 1,
    //DO NOT CHANGE THIS (Please)😅
    title: "Nusa Kamera",
    //Project Title - Add Your Project Title Here
    para: "Web Apps to provide information, product, booking and estimate order in rental camera ",
    // Add Your Service Type Here
    //Project Image - Add Your Project Image Here
    imageSrc: nusa
    //Project URL - Add Your Project Url Here
    // url: "",
  }, {
    id: 2,
    //DO NOT CHANGE THIS (Please)😅
    title: "BAF Mobile",
    //Project Title - Add Your Project Title Here
    para: "Mobile apps to help customers submit credit product, track the installment credit and estimatation credit product",
    // Add Your Service Type Here
    //Project Image - Add Your Project Image Here
    imageSrc: mobile
    //Project URL - Add Your Project Url Here
    // url:
    //   "",
  }, {
    id: 3,
    //DO NOT CHANGE THIS (Please)😅
    title: "Staycation",
    //Project Title - Add Your Project Title Here
    para: "Web Apps to provide admin booking hotel to book hotel, check status room and validation payment for rent",
    // Add Your Service Type Here
    //Project Image - Add Your Project Image Here
    imageSrc: stay
    //Project URL - Add Your Project Url Here
    // url: "",
  }, {
    id: 4,
    //DO NOT CHANGE THIS (Please)😅
    title: "Nusa POS",
    //Project Title - Add Your Project Title Here
    para: "Website to provide point of sales and payment for rental product",
    // Add Your Service Type Here
    //Project Image - Add Your Project Image Heres
    imageSrc: nusaPos
    //Project URL - Add Your Project Url Here
    // url: "",
  }, {
    id: 5,
    //DO NOT CHANGE THIS (Please)😅
    title: "Global Agro Coco",
    //Project Title - Add Your Project Title Here
    para: "Landing Page Web to provide information about PT Global Agro Coco to sell them products",
    //Project Image - Add Your Project Image Heres
    imageSrc: agro
    //Project URL - Add Your Project Url Here
    // url: "",
  }, {
    id: 6,
    //DO NOT CHANGE THIS (Please)😅
    title: "Booking System Nusa",
    //Project Title - Add Your Project Title Here
    para: "Web Apps to provide a booking system for the rental products in Nusa Kamera",
    //Project Image - Add Your Project Image Heres
    imageSrc: nusabooking
    //Project URL - Add Your Project Url Here
    // url: "",
  }],
  // End Work Section -----------------------

  // About Secton --------------
  aboutParaOne: "Hi guys, nice to meet you! , Im software developer interested in Mobile Apps. Im currently work at PT Bussan Auto Finance. Im focused to build product with react native. Happy to lern the new thing about tech",
  aboutParaTwo: "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  aboutParaThree: "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  aboutImage: "https://images.unsplash.com/photo-1519713958759-6254243c4a53?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
  //   End About Section ---------------------

  // Skills Section ---------------

  //   Import Icons from the top and link it here

  skills: [{
    id: 1,
    img: _images_html_svg__WEBPACK_IMPORTED_MODULE_0__["default"],
    para: "HTML"
  }, {
    id: 2,
    img: _images_css_svg__WEBPACK_IMPORTED_MODULE_1__["default"],
    para: "CSS"
  }, {
    id: 3,
    img: _images_javascript_svg__WEBPACK_IMPORTED_MODULE_3__["default"],
    para: "Javascript"
  }, {
    id: 4,
    img: _images_react_svg__WEBPACK_IMPORTED_MODULE_2__["default"],
    para: "React Native"
  }, {
    id: 5,
    img: _images_express_svg__WEBPACK_IMPORTED_MODULE_4__["default"],
    para: "Express Js"
  }, {
    id: 6,
    img: _images_mongodb_svg__WEBPACK_IMPORTED_MODULE_5__["default"],
    para: "Mongo DB"
  }],
  // End Skills Section --------------------------

  //   Promotion Section --------------------------

  promotionHeading: "Heading",
  promotionPara: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  // End Promotion Section -----------------

  //   Contact Section --------------

  contactSubHeading: "Let's create your next experience together",
  social: [
  // Add Or Remove The Link Accordingly
  {
    img: _images_github_svg__WEBPACK_IMPORTED_MODULE_6__["default"],
    url: "https://github.com/alfatayah"
  }, {
    img: _images_linkdin_svg__WEBPACK_IMPORTED_MODULE_9__["default"],
    url: "https://www.linkedin.com/in/fadhillah-alfatayah-1b5976130/"
  }
  // {
  //   img: twitterIcon,
  //   url: "",
  // },
  // {
  //   img: instagramIcon,
  //   url: "",
  // },
  ]

  // End Contact Section ---------------
});

/***/ })

};
;
//# sourceMappingURL=component---src-pages-index-js.js.map