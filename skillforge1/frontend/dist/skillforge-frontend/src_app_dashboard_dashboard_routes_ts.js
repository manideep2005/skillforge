"use strict";
(self["webpackChunkskillforge_frontend"] = self["webpackChunkskillforge_frontend"] || []).push([["src_app_dashboard_dashboard_routes_ts"],{

/***/ 2045:
/*!*******************************************************************!*\
  !*** ./src/app/dashboard/components/admin-dashboard.component.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdminDashboardComponent: () => (/* binding */ AdminDashboardComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 5072);



class AdminDashboardComponent {
  constructor(router) {
    this.router = router;
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
  static {
    this.ɵfac = function AdminDashboardComponent_Factory(t) {
      return new (t || AdminDashboardComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__.Router));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: AdminDashboardComponent,
      selectors: [["app-admin-dashboard"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵStandaloneFeature"]],
      decls: 91,
      vars: 0,
      consts: [[1, "dashboard-container"], [1, "sidebar"], [1, "nav-menu"], ["href", "#", 1, "nav-link", "active"], ["href", "#", 1, "nav-link"], ["href", "#", 1, "nav-link", 3, "click"], [1, "main-content"], [1, "welcome-card"], [1, "dashboard-stats"], [1, "stat-card"], [1, "big-number"], [1, "performance-indicator", "good"], [1, "user-table"], [1, "status", "active"], [1, "btn-small"]],
      template: function AdminDashboardComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "nav", 1)(2, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "SkillForge - Admin");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "ul", 2)(5, "li")(6, "a", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "User Management");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "li")(9, "a", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "System Analytics");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "li")(12, "a", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Platform Settings");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "li")(15, "a", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "Reports");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "li")(18, "a", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AdminDashboardComponent_Template_a_click_18_listener() {
            return ctx.logout();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "Logout");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "main", 6)(21, "div", 7)(22, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "Welcome, Admin!");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, "Manage platform users and monitor system performance");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div", 8)(27, "div", 9)(28, "h4");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29, "Total Users");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "div", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, "1,247");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, "\u2191 12% from last month");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "div", 9)(35, "h4");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](36, "Active Courses");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "div", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, "89");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40, "Across all instructors");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "div", 9)(42, "h4");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](43, "System Performance");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "div", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](45, "Excellent");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](47, "99.8% uptime");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "div", 12)(49, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](50, "Recent User Activity");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "table")(52, "thead")(53, "tr")(54, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](55, "User");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](57, "Role");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](59, "Last Active");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](61, "Status");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](63, "Actions");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](64, "tbody")(65, "tr")(66, "td");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](67, "John Doe");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](68, "td");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](69, "Student");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](70, "td");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](71, "2 hours ago");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](72, "td")(73, "span", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](74, "Active");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](75, "td")(76, "button", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](77, "Manage");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](78, "tr")(79, "td");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](80, "Jane Smith");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](81, "td");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](82, "Instructor");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](83, "td");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](84, "1 day ago");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](85, "td")(86, "span", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](87, "Active");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](88, "td")(89, "button", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](90, "Manage");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()()()()()();
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule],
      styles: [".dashboard-container[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n}\n\n.sidebar[_ngcontent-%COMP%] {\n  width: 250px;\n  background: #2c3e50;\n  color: white;\n  padding: 20px;\n}\n\n.nav-menu[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n}\n\n.nav-menu[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin: 10px 0;\n}\n\n.nav-link[_ngcontent-%COMP%] {\n  color: white;\n  text-decoration: none;\n  padding: 10px;\n  display: block;\n  border-radius: 5px;\n}\n\n.nav-link[_ngcontent-%COMP%]:hover, .nav-link.active[_ngcontent-%COMP%] {\n  background: #34495e;\n}\n\n.main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 20px;\n  background: #ecf0f1;\n}\n\n.welcome-card[_ngcontent-%COMP%] {\n  background: white;\n  padding: 30px;\n  border-radius: 10px;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\n}\n\n.dashboard-stats[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 20px;\n  margin-top: 20px;\n}\n\n.stat-card[_ngcontent-%COMP%] {\n  background: #f8f9fa;\n  padding: 20px;\n  border-radius: 8px;\n  border-left: 4px solid #f39c12;\n}\n\n.big-number[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-weight: bold;\n  color: #f39c12;\n  margin: 10px 0;\n}\n\n.performance-indicator[_ngcontent-%COMP%] {\n  padding: 4px 12px;\n  border-radius: 15px;\n  font-size: 12px;\n  font-weight: bold;\n}\n\n.performance-indicator.good[_ngcontent-%COMP%] {\n  background: #2ecc71;\n  color: white;\n}\n\n.btn-small[_ngcontent-%COMP%] {\n  background: #f39c12;\n  color: white;\n  border: none;\n  padding: 4px 8px;\n  border-radius: 3px;\n  cursor: pointer;\n  font-size: 12px;\n}\n\n.user-table[_ngcontent-%COMP%] {\n  margin-top: 30px;\n}\n\ntable[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  margin-top: 15px;\n}\n\nth[_ngcontent-%COMP%], td[_ngcontent-%COMP%] {\n  padding: 12px;\n  text-align: left;\n  border-bottom: 1px solid #ddd;\n}\n\nth[_ngcontent-%COMP%] {\n  background: #f8f9fa;\n  font-weight: bold;\n}\n\n.status[_ngcontent-%COMP%] {\n  padding: 2px 8px;\n  border-radius: 10px;\n  font-size: 12px;\n}\n\n.status.active[_ngcontent-%COMP%] {\n  background: #2ecc71;\n  color: white;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZGFzaGJvYXJkL2NvbXBvbmVudHMvYWRtaW4tZGFzaGJvYXJkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDSTtFQUF1QixhQUFBO0VBQWUsaUJBQUE7QUFFMUM7O0FBREk7RUFBVyxZQUFBO0VBQWMsbUJBQUE7RUFBcUIsWUFBQTtFQUFjLGFBQUE7QUFRaEU7O0FBUEk7RUFBWSxnQkFBQTtFQUFrQixVQUFBO0FBWWxDOztBQVhJO0VBQWUsY0FBQTtBQWVuQjs7QUFkSTtFQUFZLFlBQUE7RUFBYyxxQkFBQTtFQUF1QixhQUFBO0VBQWUsY0FBQTtFQUFnQixrQkFBQTtBQXNCcEY7O0FBckJJO0VBQW9DLG1CQUFBO0FBeUJ4Qzs7QUF4Qkk7RUFBZ0IsT0FBQTtFQUFTLGFBQUE7RUFBZSxtQkFBQTtBQThCNUM7O0FBN0JJO0VBQWdCLGlCQUFBO0VBQW1CLGFBQUE7RUFBZSxtQkFBQTtFQUFxQix5Q0FBQTtBQW9DM0U7O0FBbkNJO0VBQW1CLGFBQUE7RUFBZSwyREFBQTtFQUE2RCxTQUFBO0VBQVcsZ0JBQUE7QUEwQzlHOztBQXpDSTtFQUFhLG1CQUFBO0VBQXFCLGFBQUE7RUFBZSxrQkFBQTtFQUFvQiw4QkFBQTtBQWdEekU7O0FBL0NJO0VBQWMsZUFBQTtFQUFpQixpQkFBQTtFQUFtQixjQUFBO0VBQWdCLGNBQUE7QUFzRHRFOztBQXJESTtFQUF5QixpQkFBQTtFQUFtQixtQkFBQTtFQUFxQixlQUFBO0VBQWlCLGlCQUFBO0FBNER0Rjs7QUEzREk7RUFBOEIsbUJBQUE7RUFBcUIsWUFBQTtBQWdFdkQ7O0FBL0RJO0VBQWEsbUJBQUE7RUFBcUIsWUFBQTtFQUFjLFlBQUE7RUFBYyxnQkFBQTtFQUFrQixrQkFBQTtFQUFvQixlQUFBO0VBQWlCLGVBQUE7QUF5RXpIOztBQXhFSTtFQUFjLGdCQUFBO0FBNEVsQjs7QUEzRUk7RUFBUSxXQUFBO0VBQWEseUJBQUE7RUFBMkIsZ0JBQUE7QUFpRnBEOztBQWhGSTtFQUFTLGFBQUE7RUFBZSxnQkFBQTtFQUFrQiw2QkFBQTtBQXNGOUM7O0FBckZJO0VBQUssbUJBQUE7RUFBcUIsaUJBQUE7QUEwRjlCOztBQXpGSTtFQUFVLGdCQUFBO0VBQWtCLG1CQUFBO0VBQXFCLGVBQUE7QUErRnJEOztBQTlGSTtFQUFpQixtQkFBQTtFQUFxQixZQUFBO0FBbUcxQyIsInNvdXJjZXNDb250ZW50IjpbIlxuICAgIC5kYXNoYm9hcmQtY29udGFpbmVyIHsgZGlzcGxheTogZmxleDsgbWluLWhlaWdodDogMTAwdmg7IH1cbiAgICAuc2lkZWJhciB7IHdpZHRoOiAyNTBweDsgYmFja2dyb3VuZDogIzJjM2U1MDsgY29sb3I6IHdoaXRlOyBwYWRkaW5nOiAyMHB4OyB9XG4gICAgLm5hdi1tZW51IHsgbGlzdC1zdHlsZTogbm9uZTsgcGFkZGluZzogMDsgfVxuICAgIC5uYXYtbWVudSBsaSB7IG1hcmdpbjogMTBweCAwOyB9XG4gICAgLm5hdi1saW5rIHsgY29sb3I6IHdoaXRlOyB0ZXh0LWRlY29yYXRpb246IG5vbmU7IHBhZGRpbmc6IDEwcHg7IGRpc3BsYXk6IGJsb2NrOyBib3JkZXItcmFkaXVzOiA1cHg7IH1cbiAgICAubmF2LWxpbms6aG92ZXIsIC5uYXYtbGluay5hY3RpdmUgeyBiYWNrZ3JvdW5kOiAjMzQ0OTVlOyB9XG4gICAgLm1haW4tY29udGVudCB7IGZsZXg6IDE7IHBhZGRpbmc6IDIwcHg7IGJhY2tncm91bmQ6ICNlY2YwZjE7IH1cbiAgICAud2VsY29tZS1jYXJkIHsgYmFja2dyb3VuZDogd2hpdGU7IHBhZGRpbmc6IDMwcHg7IGJvcmRlci1yYWRpdXM6IDEwcHg7IGJveC1zaGFkb3c6IDAgMnB4IDEwcHggcmdiYSgwLDAsMCwwLjEpOyB9XG4gICAgLmRhc2hib2FyZC1zdGF0cyB7IGRpc3BsYXk6IGdyaWQ7IGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZml0LCBtaW5tYXgoMjUwcHgsIDFmcikpOyBnYXA6IDIwcHg7IG1hcmdpbi10b3A6IDIwcHg7IH1cbiAgICAuc3RhdC1jYXJkIHsgYmFja2dyb3VuZDogI2Y4ZjlmYTsgcGFkZGluZzogMjBweDsgYm9yZGVyLXJhZGl1czogOHB4OyBib3JkZXItbGVmdDogNHB4IHNvbGlkICNmMzljMTI7IH1cbiAgICAuYmlnLW51bWJlciB7IGZvbnQtc2l6ZTogMnJlbTsgZm9udC13ZWlnaHQ6IGJvbGQ7IGNvbG9yOiAjZjM5YzEyOyBtYXJnaW46IDEwcHggMDsgfVxuICAgIC5wZXJmb3JtYW5jZS1pbmRpY2F0b3IgeyBwYWRkaW5nOiA0cHggMTJweDsgYm9yZGVyLXJhZGl1czogMTVweDsgZm9udC1zaXplOiAxMnB4OyBmb250LXdlaWdodDogYm9sZDsgfVxuICAgIC5wZXJmb3JtYW5jZS1pbmRpY2F0b3IuZ29vZCB7IGJhY2tncm91bmQ6ICMyZWNjNzE7IGNvbG9yOiB3aGl0ZTsgfVxuICAgIC5idG4tc21hbGwgeyBiYWNrZ3JvdW5kOiAjZjM5YzEyOyBjb2xvcjogd2hpdGU7IGJvcmRlcjogbm9uZTsgcGFkZGluZzogNHB4IDhweDsgYm9yZGVyLXJhZGl1czogM3B4OyBjdXJzb3I6IHBvaW50ZXI7IGZvbnQtc2l6ZTogMTJweDsgfVxuICAgIC51c2VyLXRhYmxlIHsgbWFyZ2luLXRvcDogMzBweDsgfVxuICAgIHRhYmxlIHsgd2lkdGg6IDEwMCU7IGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7IG1hcmdpbi10b3A6IDE1cHg7IH1cbiAgICB0aCwgdGQgeyBwYWRkaW5nOiAxMnB4OyB0ZXh0LWFsaWduOiBsZWZ0OyBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2RkZDsgfVxuICAgIHRoIHsgYmFja2dyb3VuZDogI2Y4ZjlmYTsgZm9udC13ZWlnaHQ6IGJvbGQ7IH1cbiAgICAuc3RhdHVzIHsgcGFkZGluZzogMnB4IDhweDsgYm9yZGVyLXJhZGl1czogMTBweDsgZm9udC1zaXplOiAxMnB4OyB9XG4gICAgLnN0YXR1cy5hY3RpdmUgeyBiYWNrZ3JvdW5kOiAjMmVjYzcxOyBjb2xvcjogd2hpdGU7IH1cbiAgIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ }),

/***/ 1603:
/*!************************************************************************!*\
  !*** ./src/app/dashboard/components/instructor-dashboard.component.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InstructorDashboardComponent: () => (/* binding */ InstructorDashboardComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 5072);



class InstructorDashboardComponent {
  constructor(router) {
    this.router = router;
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
  static {
    this.ɵfac = function InstructorDashboardComponent_Factory(t) {
      return new (t || InstructorDashboardComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__.Router));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: InstructorDashboardComponent,
      selectors: [["app-instructor-dashboard"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵStandaloneFeature"]],
      decls: 83,
      vars: 0,
      consts: [[1, "dashboard-container"], [1, "sidebar"], [1, "nav-menu"], ["href", "#", 1, "nav-link", "active"], ["href", "#", 1, "nav-link"], ["href", "#", 1, "nav-link", 3, "click"], [1, "main-content"], [1, "welcome-card"], [1, "dashboard-stats"], [1, "stat-card"], [1, "big-number"], [1, "btn-primary"], [1, "course-table"], [1, "btn-small"]],
      template: function InstructorDashboardComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "nav", 1)(2, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "SkillForge - Instructor");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "ul", 2)(5, "li")(6, "a", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Course Management");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "li")(9, "a", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Generate Quiz");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "li")(12, "a", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Student Analytics");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "li")(15, "a", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "Upload Content");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "li")(18, "a", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function InstructorDashboardComponent_Template_a_click_18_listener() {
            return ctx.logout();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "Logout");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "main", 6)(21, "div", 7)(22, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "Welcome, Instructor!");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, "Manage your courses and create AI-powered assessments");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div", 8)(27, "div", 9)(28, "h4");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29, "Total Courses");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "div", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, "12");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "button", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, "Create New Course");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "div", 9)(35, "h4");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](36, "AI Quiz Generator");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, "Generate quizzes using AI for any topic");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "button", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40, "Generate Quiz");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "div", 9)(42, "h4");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](43, "Active Students");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "div", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](45, "248");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](47, "Across all courses");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "div", 12)(49, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](50, "Recent Courses");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "table")(52, "thead")(53, "tr")(54, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](55, "Course Name");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](57, "Students");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](59, "Difficulty");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](61, "Actions");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "tbody")(63, "tr")(64, "td");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](65, "JavaScript Fundamentals");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "td");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](67, "45");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](68, "td");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](69, "Beginner");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](70, "td")(71, "button", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](72, "Edit");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](73, "tr")(74, "td");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](75, "React Advanced");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](76, "td");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](77, "32");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](78, "td");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](79, "Advanced");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](80, "td")(81, "button", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](82, "Edit");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()()()()()();
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule],
      styles: [".dashboard-container[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n}\n\n.sidebar[_ngcontent-%COMP%] {\n  width: 250px;\n  background: #2c3e50;\n  color: white;\n  padding: 20px;\n}\n\n.nav-menu[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n}\n\n.nav-menu[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin: 10px 0;\n}\n\n.nav-link[_ngcontent-%COMP%] {\n  color: white;\n  text-decoration: none;\n  padding: 10px;\n  display: block;\n  border-radius: 5px;\n}\n\n.nav-link[_ngcontent-%COMP%]:hover, .nav-link.active[_ngcontent-%COMP%] {\n  background: #34495e;\n}\n\n.main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 20px;\n  background: #ecf0f1;\n}\n\n.welcome-card[_ngcontent-%COMP%] {\n  background: white;\n  padding: 30px;\n  border-radius: 10px;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\n}\n\n.dashboard-stats[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 20px;\n  margin-top: 20px;\n}\n\n.stat-card[_ngcontent-%COMP%] {\n  background: #f8f9fa;\n  padding: 20px;\n  border-radius: 8px;\n  border-left: 4px solid #e74c3c;\n}\n\n.big-number[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-weight: bold;\n  color: #e74c3c;\n  margin: 10px 0;\n}\n\n.btn-primary[_ngcontent-%COMP%] {\n  background: #e74c3c;\n  color: white;\n  border: none;\n  padding: 8px 16px;\n  border-radius: 5px;\n  cursor: pointer;\n}\n\n.btn-small[_ngcontent-%COMP%] {\n  background: #3498db;\n  color: white;\n  border: none;\n  padding: 4px 8px;\n  border-radius: 3px;\n  cursor: pointer;\n  font-size: 12px;\n}\n\n.course-table[_ngcontent-%COMP%] {\n  margin-top: 30px;\n}\n\ntable[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  margin-top: 15px;\n}\n\nth[_ngcontent-%COMP%], td[_ngcontent-%COMP%] {\n  padding: 12px;\n  text-align: left;\n  border-bottom: 1px solid #ddd;\n}\n\nth[_ngcontent-%COMP%] {\n  background: #f8f9fa;\n  font-weight: bold;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZGFzaGJvYXJkL2NvbXBvbmVudHMvaW5zdHJ1Y3Rvci1kYXNoYm9hcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNJO0VBQXVCLGFBQUE7RUFBZSxpQkFBQTtBQUUxQzs7QUFESTtFQUFXLFlBQUE7RUFBYyxtQkFBQTtFQUFxQixZQUFBO0VBQWMsYUFBQTtBQVFoRTs7QUFQSTtFQUFZLGdCQUFBO0VBQWtCLFVBQUE7QUFZbEM7O0FBWEk7RUFBZSxjQUFBO0FBZW5COztBQWRJO0VBQVksWUFBQTtFQUFjLHFCQUFBO0VBQXVCLGFBQUE7RUFBZSxjQUFBO0VBQWdCLGtCQUFBO0FBc0JwRjs7QUFyQkk7RUFBb0MsbUJBQUE7QUF5QnhDOztBQXhCSTtFQUFnQixPQUFBO0VBQVMsYUFBQTtFQUFlLG1CQUFBO0FBOEI1Qzs7QUE3Qkk7RUFBZ0IsaUJBQUE7RUFBbUIsYUFBQTtFQUFlLG1CQUFBO0VBQXFCLHlDQUFBO0FBb0MzRTs7QUFuQ0k7RUFBbUIsYUFBQTtFQUFlLDJEQUFBO0VBQTZELFNBQUE7RUFBVyxnQkFBQTtBQTBDOUc7O0FBekNJO0VBQWEsbUJBQUE7RUFBcUIsYUFBQTtFQUFlLGtCQUFBO0VBQW9CLDhCQUFBO0FBZ0R6RTs7QUEvQ0k7RUFBYyxlQUFBO0VBQWlCLGlCQUFBO0VBQW1CLGNBQUE7RUFBZ0IsY0FBQTtBQXNEdEU7O0FBckRJO0VBQWUsbUJBQUE7RUFBcUIsWUFBQTtFQUFjLFlBQUE7RUFBYyxpQkFBQTtFQUFtQixrQkFBQTtFQUFvQixlQUFBO0FBOEQzRzs7QUE3REk7RUFBYSxtQkFBQTtFQUFxQixZQUFBO0VBQWMsWUFBQTtFQUFjLGdCQUFBO0VBQWtCLGtCQUFBO0VBQW9CLGVBQUE7RUFBaUIsZUFBQTtBQXVFekg7O0FBdEVJO0VBQWdCLGdCQUFBO0FBMEVwQjs7QUF6RUk7RUFBUSxXQUFBO0VBQWEseUJBQUE7RUFBMkIsZ0JBQUE7QUErRXBEOztBQTlFSTtFQUFTLGFBQUE7RUFBZSxnQkFBQTtFQUFrQiw2QkFBQTtBQW9GOUM7O0FBbkZJO0VBQUssbUJBQUE7RUFBcUIsaUJBQUE7QUF3RjlCIiwic291cmNlc0NvbnRlbnQiOlsiXG4gICAgLmRhc2hib2FyZC1jb250YWluZXIgeyBkaXNwbGF5OiBmbGV4OyBtaW4taGVpZ2h0OiAxMDB2aDsgfVxuICAgIC5zaWRlYmFyIHsgd2lkdGg6IDI1MHB4OyBiYWNrZ3JvdW5kOiAjMmMzZTUwOyBjb2xvcjogd2hpdGU7IHBhZGRpbmc6IDIwcHg7IH1cbiAgICAubmF2LW1lbnUgeyBsaXN0LXN0eWxlOiBub25lOyBwYWRkaW5nOiAwOyB9XG4gICAgLm5hdi1tZW51IGxpIHsgbWFyZ2luOiAxMHB4IDA7IH1cbiAgICAubmF2LWxpbmsgeyBjb2xvcjogd2hpdGU7IHRleHQtZGVjb3JhdGlvbjogbm9uZTsgcGFkZGluZzogMTBweDsgZGlzcGxheTogYmxvY2s7IGJvcmRlci1yYWRpdXM6IDVweDsgfVxuICAgIC5uYXYtbGluazpob3ZlciwgLm5hdi1saW5rLmFjdGl2ZSB7IGJhY2tncm91bmQ6ICMzNDQ5NWU7IH1cbiAgICAubWFpbi1jb250ZW50IHsgZmxleDogMTsgcGFkZGluZzogMjBweDsgYmFja2dyb3VuZDogI2VjZjBmMTsgfVxuICAgIC53ZWxjb21lLWNhcmQgeyBiYWNrZ3JvdW5kOiB3aGl0ZTsgcGFkZGluZzogMzBweDsgYm9yZGVyLXJhZGl1czogMTBweDsgYm94LXNoYWRvdzogMCAycHggMTBweCByZ2JhKDAsMCwwLDAuMSk7IH1cbiAgICAuZGFzaGJvYXJkLXN0YXRzIHsgZGlzcGxheTogZ3JpZDsgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsIG1pbm1heCgyNTBweCwgMWZyKSk7IGdhcDogMjBweDsgbWFyZ2luLXRvcDogMjBweDsgfVxuICAgIC5zdGF0LWNhcmQgeyBiYWNrZ3JvdW5kOiAjZjhmOWZhOyBwYWRkaW5nOiAyMHB4OyBib3JkZXItcmFkaXVzOiA4cHg7IGJvcmRlci1sZWZ0OiA0cHggc29saWQgI2U3NGMzYzsgfVxuICAgIC5iaWctbnVtYmVyIHsgZm9udC1zaXplOiAycmVtOyBmb250LXdlaWdodDogYm9sZDsgY29sb3I6ICNlNzRjM2M7IG1hcmdpbjogMTBweCAwOyB9XG4gICAgLmJ0bi1wcmltYXJ5IHsgYmFja2dyb3VuZDogI2U3NGMzYzsgY29sb3I6IHdoaXRlOyBib3JkZXI6IG5vbmU7IHBhZGRpbmc6IDhweCAxNnB4OyBib3JkZXItcmFkaXVzOiA1cHg7IGN1cnNvcjogcG9pbnRlcjsgfVxuICAgIC5idG4tc21hbGwgeyBiYWNrZ3JvdW5kOiAjMzQ5OGRiOyBjb2xvcjogd2hpdGU7IGJvcmRlcjogbm9uZTsgcGFkZGluZzogNHB4IDhweDsgYm9yZGVyLXJhZGl1czogM3B4OyBjdXJzb3I6IHBvaW50ZXI7IGZvbnQtc2l6ZTogMTJweDsgfVxuICAgIC5jb3Vyc2UtdGFibGUgeyBtYXJnaW4tdG9wOiAzMHB4OyB9XG4gICAgdGFibGUgeyB3aWR0aDogMTAwJTsgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTsgbWFyZ2luLXRvcDogMTVweDsgfVxuICAgIHRoLCB0ZCB7IHBhZGRpbmc6IDEycHg7IHRleHQtYWxpZ246IGxlZnQ7IGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZGRkOyB9XG4gICAgdGggeyBiYWNrZ3JvdW5kOiAjZjhmOWZhOyBmb250LXdlaWdodDogYm9sZDsgfVxuICAiXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ }),

/***/ 7273:
/*!*********************************************************************!*\
  !*** ./src/app/dashboard/components/student-dashboard.component.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StudentDashboardComponent: () => (/* binding */ StudentDashboardComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 5072);



class StudentDashboardComponent {
  constructor(router) {
    this.router = router;
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
  static {
    this.ɵfac = function StudentDashboardComponent_Factory(t) {
      return new (t || StudentDashboardComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__.Router));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: StudentDashboardComponent,
      selectors: [["app-student-dashboard"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵStandaloneFeature"]],
      decls: 48,
      vars: 2,
      consts: [[1, "dashboard-container"], [1, "sidebar"], [1, "nav-menu"], ["href", "#", 1, "nav-link", "active"], ["href", "#", 1, "nav-link"], ["href", "#", 1, "nav-link", 3, "click"], [1, "main-content"], [1, "welcome-card"], [1, "dashboard-stats"], [1, "stat-card"], [1, "progress-bar"], [1, "progress-fill"], [1, "btn-primary"], [1, "score-circle"]],
      template: function StudentDashboardComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "nav", 1)(2, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "SkillForge - Student");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "ul", 2)(5, "li")(6, "a", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Learning Path");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "li")(9, "a", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Take Quiz");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "li")(12, "a", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Progress");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "li")(15, "a", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "Analytics");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "li")(18, "a", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function StudentDashboardComponent_Template_a_click_18_listener() {
            return ctx.logout();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "Logout");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "main", 6)(21, "div", 7)(22, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "Welcome, Student!");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, "Continue your personalized learning journey");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div", 8)(27, "div", 9)(28, "h4");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29, "Current Progress");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "div", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](31, "div", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, "75% Complete");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "div", 9)(35, "h4");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](36, "Next Suggested Lesson");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, "Advanced JavaScript Concepts");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "button", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40, "Start Learning");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "div", 9)(42, "h4");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](43, "Recent Quiz Score");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "div", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](45, "85%");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](47, "JavaScript Basics");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](31);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("width", 75, "%");
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule],
      styles: [".dashboard-container[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n}\n\n.sidebar[_ngcontent-%COMP%] {\n  width: 250px;\n  background: #2c3e50;\n  color: white;\n  padding: 20px;\n}\n\n.nav-menu[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n}\n\n.nav-menu[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin: 10px 0;\n}\n\n.nav-link[_ngcontent-%COMP%] {\n  color: white;\n  text-decoration: none;\n  padding: 10px;\n  display: block;\n  border-radius: 5px;\n}\n\n.nav-link[_ngcontent-%COMP%]:hover, .nav-link.active[_ngcontent-%COMP%] {\n  background: #34495e;\n}\n\n.main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 20px;\n  background: #ecf0f1;\n}\n\n.welcome-card[_ngcontent-%COMP%] {\n  background: white;\n  padding: 30px;\n  border-radius: 10px;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\n}\n\n.dashboard-stats[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 20px;\n  margin-top: 20px;\n}\n\n.stat-card[_ngcontent-%COMP%] {\n  background: #f8f9fa;\n  padding: 20px;\n  border-radius: 8px;\n  border-left: 4px solid #667eea;\n}\n\n.progress-bar[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 10px;\n  background: #e0e0e0;\n  border-radius: 5px;\n  overflow: hidden;\n  margin: 10px 0;\n}\n\n.progress-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  background: #667eea;\n  transition: width 0.3s ease;\n}\n\n.score-circle[_ngcontent-%COMP%] {\n  width: 60px;\n  height: 60px;\n  border-radius: 50%;\n  background: #667eea;\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: bold;\n  margin: 10px 0;\n}\n\n.btn-primary[_ngcontent-%COMP%] {\n  background: #667eea;\n  color: white;\n  border: none;\n  padding: 8px 16px;\n  border-radius: 5px;\n  cursor: pointer;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZGFzaGJvYXJkL2NvbXBvbmVudHMvc3R1ZGVudC1kYXNoYm9hcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNJO0VBQXVCLGFBQUE7RUFBZSxpQkFBQTtBQUUxQzs7QUFESTtFQUFXLFlBQUE7RUFBYyxtQkFBQTtFQUFxQixZQUFBO0VBQWMsYUFBQTtBQVFoRTs7QUFQSTtFQUFZLGdCQUFBO0VBQWtCLFVBQUE7QUFZbEM7O0FBWEk7RUFBZSxjQUFBO0FBZW5COztBQWRJO0VBQVksWUFBQTtFQUFjLHFCQUFBO0VBQXVCLGFBQUE7RUFBZSxjQUFBO0VBQWdCLGtCQUFBO0FBc0JwRjs7QUFyQkk7RUFBb0MsbUJBQUE7QUF5QnhDOztBQXhCSTtFQUFnQixPQUFBO0VBQVMsYUFBQTtFQUFlLG1CQUFBO0FBOEI1Qzs7QUE3Qkk7RUFBZ0IsaUJBQUE7RUFBbUIsYUFBQTtFQUFlLG1CQUFBO0VBQXFCLHlDQUFBO0FBb0MzRTs7QUFuQ0k7RUFBbUIsYUFBQTtFQUFlLDJEQUFBO0VBQTZELFNBQUE7RUFBVyxnQkFBQTtBQTBDOUc7O0FBekNJO0VBQWEsbUJBQUE7RUFBcUIsYUFBQTtFQUFlLGtCQUFBO0VBQW9CLDhCQUFBO0FBZ0R6RTs7QUEvQ0k7RUFBZ0IsV0FBQTtFQUFhLFlBQUE7RUFBYyxtQkFBQTtFQUFxQixrQkFBQTtFQUFvQixnQkFBQTtFQUFrQixjQUFBO0FBd0QxRzs7QUF2REk7RUFBaUIsWUFBQTtFQUFjLG1CQUFBO0VBQXFCLDJCQUFBO0FBNkR4RDs7QUE1REk7RUFBZ0IsV0FBQTtFQUFhLFlBQUE7RUFBYyxrQkFBQTtFQUFvQixtQkFBQTtFQUFxQixZQUFBO0VBQWMsYUFBQTtFQUFlLG1CQUFBO0VBQXFCLHVCQUFBO0VBQXlCLGlCQUFBO0VBQW1CLGNBQUE7QUF5RXRMOztBQXhFSTtFQUFlLG1CQUFBO0VBQXFCLFlBQUE7RUFBYyxZQUFBO0VBQWMsaUJBQUE7RUFBbUIsa0JBQUE7RUFBb0IsZUFBQTtBQWlGM0ciLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICAuZGFzaGJvYXJkLWNvbnRhaW5lciB7IGRpc3BsYXk6IGZsZXg7IG1pbi1oZWlnaHQ6IDEwMHZoOyB9XG4gICAgLnNpZGViYXIgeyB3aWR0aDogMjUwcHg7IGJhY2tncm91bmQ6ICMyYzNlNTA7IGNvbG9yOiB3aGl0ZTsgcGFkZGluZzogMjBweDsgfVxuICAgIC5uYXYtbWVudSB7IGxpc3Qtc3R5bGU6IG5vbmU7IHBhZGRpbmc6IDA7IH1cbiAgICAubmF2LW1lbnUgbGkgeyBtYXJnaW46IDEwcHggMDsgfVxuICAgIC5uYXYtbGluayB7IGNvbG9yOiB3aGl0ZTsgdGV4dC1kZWNvcmF0aW9uOiBub25lOyBwYWRkaW5nOiAxMHB4OyBkaXNwbGF5OiBibG9jazsgYm9yZGVyLXJhZGl1czogNXB4OyB9XG4gICAgLm5hdi1saW5rOmhvdmVyLCAubmF2LWxpbmsuYWN0aXZlIHsgYmFja2dyb3VuZDogIzM0NDk1ZTsgfVxuICAgIC5tYWluLWNvbnRlbnQgeyBmbGV4OiAxOyBwYWRkaW5nOiAyMHB4OyBiYWNrZ3JvdW5kOiAjZWNmMGYxOyB9XG4gICAgLndlbGNvbWUtY2FyZCB7IGJhY2tncm91bmQ6IHdoaXRlOyBwYWRkaW5nOiAzMHB4OyBib3JkZXItcmFkaXVzOiAxMHB4OyBib3gtc2hhZG93OiAwIDJweCAxMHB4IHJnYmEoMCwwLDAsMC4xKTsgfVxuICAgIC5kYXNoYm9hcmQtc3RhdHMgeyBkaXNwbGF5OiBncmlkOyBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgbWlubWF4KDI1MHB4LCAxZnIpKTsgZ2FwOiAyMHB4OyBtYXJnaW4tdG9wOiAyMHB4OyB9XG4gICAgLnN0YXQtY2FyZCB7IGJhY2tncm91bmQ6ICNmOGY5ZmE7IHBhZGRpbmc6IDIwcHg7IGJvcmRlci1yYWRpdXM6IDhweDsgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCAjNjY3ZWVhOyB9XG4gICAgLnByb2dyZXNzLWJhciB7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwcHg7IGJhY2tncm91bmQ6ICNlMGUwZTA7IGJvcmRlci1yYWRpdXM6IDVweDsgb3ZlcmZsb3c6IGhpZGRlbjsgbWFyZ2luOiAxMHB4IDA7IH1cbiAgICAucHJvZ3Jlc3MtZmlsbCB7IGhlaWdodDogMTAwJTsgYmFja2dyb3VuZDogIzY2N2VlYTsgdHJhbnNpdGlvbjogd2lkdGggMC4zcyBlYXNlOyB9XG4gICAgLnNjb3JlLWNpcmNsZSB7IHdpZHRoOiA2MHB4OyBoZWlnaHQ6IDYwcHg7IGJvcmRlci1yYWRpdXM6IDUwJTsgYmFja2dyb3VuZDogIzY2N2VlYTsgY29sb3I6IHdoaXRlOyBkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogY2VudGVyOyBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgZm9udC13ZWlnaHQ6IGJvbGQ7IG1hcmdpbjogMTBweCAwOyB9XG4gICAgLmJ0bi1wcmltYXJ5IHsgYmFja2dyb3VuZDogIzY2N2VlYTsgY29sb3I6IHdoaXRlOyBib3JkZXI6IG5vbmU7IHBhZGRpbmc6IDhweCAxNnB4OyBib3JkZXItcmFkaXVzOiA1cHg7IGN1cnNvcjogcG9pbnRlcjsgfVxuICAiXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ }),

/***/ 9724:
/*!******************************************************************!*\
  !*** ./src/app/dashboard/components/test-dashboard.component.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TestDashboardComponent: () => (/* binding */ TestDashboardComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);


class TestDashboardComponent {
  static {
    this.ɵfac = function TestDashboardComponent_Factory(t) {
      return new (t || TestDashboardComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: TestDashboardComponent,
      selectors: [["app-test-dashboard"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵStandaloneFeature"]],
      decls: 5,
      vars: 0,
      consts: [[2, "padding", "20px", "background", "white", "margin", "20px"]],
      template: function TestDashboardComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "h1");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Test Dashboard Working!");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "If you see this, the routing is working.");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule],
      encapsulation: 2
    });
  }
}

/***/ }),

/***/ 4169:
/*!***********************************************!*\
  !*** ./src/app/dashboard/dashboard.routes.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dashboardRoutes: () => (/* binding */ dashboardRoutes)
/* harmony export */ });
/* harmony import */ var _components_test_dashboard_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/test-dashboard.component */ 9724);
/* harmony import */ var _components_student_dashboard_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/student-dashboard.component */ 7273);
/* harmony import */ var _components_instructor_dashboard_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/instructor-dashboard.component */ 1603);
/* harmony import */ var _components_admin_dashboard_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/admin-dashboard.component */ 2045);




const dashboardRoutes = [{
  path: 'test',
  component: _components_test_dashboard_component__WEBPACK_IMPORTED_MODULE_0__.TestDashboardComponent
}, {
  path: 'student',
  component: _components_student_dashboard_component__WEBPACK_IMPORTED_MODULE_1__.StudentDashboardComponent
}, {
  path: 'instructor',
  component: _components_instructor_dashboard_component__WEBPACK_IMPORTED_MODULE_2__.InstructorDashboardComponent
}, {
  path: 'admin',
  component: _components_admin_dashboard_component__WEBPACK_IMPORTED_MODULE_3__.AdminDashboardComponent
}, {
  path: '',
  redirectTo: 'test',
  pathMatch: 'full'
}];

/***/ })

}]);
//# sourceMappingURL=src_app_dashboard_dashboard_routes_ts.js.map