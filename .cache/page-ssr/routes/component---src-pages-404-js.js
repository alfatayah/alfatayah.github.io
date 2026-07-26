"use strict";
exports.id = 125;
exports.ids = [125];
exports.modules = {

/***/ 3331:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3464);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4446);
/* harmony import */ var _components_seo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7528);
const NotFoundPage=()=>/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_layout__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A,null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_seo__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A,{title:"404: Not found"}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1",null,"404: Not Found"),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p",null,"You just hit a route that doesn't exist... the sadness."));/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NotFoundPage);

/***/ }),

/***/ 4446:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ layout)
});

// EXTERNAL MODULE: external "D:\\Repo\\alfatayah.github.io\\node_modules\\react\\index.js"
var external_D_Repo_alfatayah_github_io_node_modules_react_index_js_ = __webpack_require__(3464);
var external_D_Repo_alfatayah_github_io_node_modules_react_index_js_default = /*#__PURE__*/__webpack_require__.n(external_D_Repo_alfatayah_github_io_node_modules_react_index_js_);
// EXTERNAL MODULE: ./node_modules/gatsby-plugin-smoothscroll/index.js
var gatsby_plugin_smoothscroll = __webpack_require__(9285);
;// ./src/components/Navbar.js
const Navbar=()=>{const{0:menuOpen,1:setMenuOpen}=(0,external_D_Repo_alfatayah_github_io_node_modules_react_index_js_.useState)(false);return/*#__PURE__*/external_D_Repo_alfatayah_github_io_node_modules_react_index_js_default().createElement("nav",{className:"navbar-container"},/*#__PURE__*/external_D_Repo_alfatayah_github_io_node_modules_react_index_js_default().createElement("div",{className:"navbar-wrapper"},/*#__PURE__*/external_D_Repo_alfatayah_github_io_node_modules_react_index_js_default().createElement("div",{role:"button",tabIndex:0,onClick:()=>(0,gatsby_plugin_smoothscroll/* default */.A)("#home"),onKeyDown:()=>(0,gatsby_plugin_smoothscroll/* default */.A)("#home"),className:"nav-logo"},"Fadhil",/*#__PURE__*/external_D_Repo_alfatayah_github_io_node_modules_react_index_js_default().createElement("span",{className:"dot"},".")),/*#__PURE__*/external_D_Repo_alfatayah_github_io_node_modules_react_index_js_default().createElement("div",{className:`links-wrapper${menuOpen?" open":""}`},/*#__PURE__*/external_D_Repo_alfatayah_github_io_node_modules_react_index_js_default().createElement("button",{onClick:()=>{(0,gatsby_plugin_smoothscroll/* default */.A)("#work");setMenuOpen(false);}},"Work"),/*#__PURE__*/external_D_Repo_alfatayah_github_io_node_modules_react_index_js_default().createElement("button",{onClick:()=>{(0,gatsby_plugin_smoothscroll/* default */.A)("#about");setMenuOpen(false);}},"About"),/*#__PURE__*/external_D_Repo_alfatayah_github_io_node_modules_react_index_js_default().createElement("button",{onClick:()=>{(0,gatsby_plugin_smoothscroll/* default */.A)("#contact");setMenuOpen(false);},className:"nav-cta"},"Contact")),/*#__PURE__*/external_D_Repo_alfatayah_github_io_node_modules_react_index_js_default().createElement("button",{className:`hamburger${menuOpen?" is-active":""}`,onClick:()=>setMenuOpen(!menuOpen),"aria-label":"Toggle menu"},/*#__PURE__*/external_D_Repo_alfatayah_github_io_node_modules_react_index_js_default().createElement("span",null),/*#__PURE__*/external_D_Repo_alfatayah_github_io_node_modules_react_index_js_default().createElement("span",null),/*#__PURE__*/external_D_Repo_alfatayah_github_io_node_modules_react_index_js_default().createElement("span",null))));};/* harmony default export */ const components_Navbar = (Navbar);
;// ./src/components/layout.js
/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */const Layout=({children})=>{return/*#__PURE__*/external_D_Repo_alfatayah_github_io_node_modules_react_index_js_default().createElement((external_D_Repo_alfatayah_github_io_node_modules_react_index_js_default()).Fragment,null,/*#__PURE__*/external_D_Repo_alfatayah_github_io_node_modules_react_index_js_default().createElement(components_Navbar,null),/*#__PURE__*/external_D_Repo_alfatayah_github_io_node_modules_react_index_js_default().createElement("main",null,children));};/* harmony default export */ const layout = (Layout);

/***/ }),

/***/ 7528:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3464);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5556);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8154);
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(123);
/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */function SEO({description,lang,meta,title}){var _site$siteMetadata,_site$siteMetadata2;const{site}=(0,gatsby__WEBPACK_IMPORTED_MODULE_2__.useStaticQuery)("63159454");const metaDescription=description||site.siteMetadata.description;const defaultTitle=(_site$siteMetadata=site.siteMetadata)===null||_site$siteMetadata===void 0?void 0:_site$siteMetadata.title;return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_helmet__WEBPACK_IMPORTED_MODULE_1__.Helmet,{htmlAttributes:{lang},title:title,titleTemplate:defaultTitle?`%s | ${defaultTitle}`:null,meta:[{name:`description`,content:metaDescription},{property:`og:title`,content:title},{property:`og:description`,content:metaDescription},{property:`og:type`,content:`website`},{name:`twitter:card`,content:`summary`},{name:`twitter:creator`,content:((_site$siteMetadata2=site.siteMetadata)===null||_site$siteMetadata2===void 0?void 0:_site$siteMetadata2.author)||``},{name:`twitter:title`,content:title},{name:`twitter:description`,content:metaDescription}].concat(meta)});}SEO.defaultProps={lang:`en`,meta:[],description:``};SEO.propTypes={description:(prop_types__WEBPACK_IMPORTED_MODULE_3___default().string),lang:(prop_types__WEBPACK_IMPORTED_MODULE_3___default().string),meta:prop_types__WEBPACK_IMPORTED_MODULE_3___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_3___default().object)),title:(prop_types__WEBPACK_IMPORTED_MODULE_3___default().string).isRequired};/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SEO);

/***/ }),

/***/ 9285:
/***/ ((__unused_webpack_module, exports) => {

var __webpack_unused_export__;
__webpack_unused_export__=true;exports.A=void 0;/**
 * Smooth scrolling onClick event handler
 * @param {string} selector argument will be passed to `querySelector`, usually an HTML id
 * @param {string} [blockPosition='start'] argument will be used to determine position where will be scrolled to (start, center, end, nearest)
 * @returns {boolean} false if `document.querySelector` doesn't find a match, otherwise true
 */var scrollTo=function scrollTo(selector,blockPosition){if(blockPosition===void 0){blockPosition='start';}var element=document.querySelector(selector);if(element){element.scrollIntoView({behavior:'smooth',block:blockPosition});return true;}if(false){}return false;};var _default=scrollTo;exports.A=_default;

/***/ })

};
;
//# sourceMappingURL=component---src-pages-404-js.js.map