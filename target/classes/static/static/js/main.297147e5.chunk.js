(this.webpackJsonpproject=this.webpackJsonpproject||[]).push([[0],{14:function(e,t,s){},15:function(e,t,s){},16:function(e,t,s){},17:function(e,t,s){"use strict";s.r(t);var c=s(0),a=s(1),n=s.n(a),r=s(3),i=s.n(r),l=s(7),j=s(4),d=s(5),o=s(8),u=s(6),m=(s(14),function(e){return Object(c.jsxs)("div",{className:"login-box",children:[Object(c.jsx)("h1",{children:"Inventory"}),Object(c.jsxs)("form",{children:[Object(c.jsxs)("div",{className:"login-cred",children:[Object(c.jsx)("input",{onChange:e.changeU,type:"text",placeholder:"Username"}),Object(c.jsx)("input",{onChange:e.changeP,type:"password",placeholder:"Password"})]}),Object(c.jsx)("div",{children:Object(c.jsx)("input",{onClick:e.click,type:"submit",className:"login-button",value:"LogIn"})})]}),Object(c.jsxs)("div",{className:"sign-up",children:[Object(c.jsxs)("p",{children:["Don't Have an account? ",Object(c.jsx)("a",{href:"#",children:"Sign Up"})]}),Object(c.jsxs)("p",{children:["Forgot Password? ",Object(c.jsx)("a",{href:"#",children:"Reset Password"})]})]})]})}),h=(s(15),s.p+"static/media/r1.cf7900e0.jpg"),b=function(e){var t=Object(c.jsxs)("ul",{className:"itemArea",children:[Object(c.jsxs)("ul",{className:"itemSelector",children:[Object(c.jsx)("ul",{onClick:function(){e.itemTab(0)},className:e.tabs[0].classes,children:"All Inventory"}),Object(c.jsx)("ul",{onClick:function(){e.itemTab(1)},className:e.tabs[1].classes,children:"Search"}),Object(c.jsx)("ul",{onClick:function(){e.logOut(!0)},className:"itemTab",children:"Logout"})]}),Object(c.jsxs)("li",{className:"item",children:[Object(c.jsx)("img",{className:"image",src:h}),Object(c.jsx)("div",{className:"itemDes",children:"Name"})]}),Object(c.jsx)("li",{className:"item",children:Object(c.jsx)("img",{className:"image",src:h})}),Object(c.jsx)("li",{className:"item",children:Object(c.jsx)("img",{className:"image",src:h})}),Object(c.jsx)("li",{className:"item",children:Object(c.jsx)("img",{className:"image",src:h})}),Object(c.jsx)("li",{className:"item",children:Object(c.jsx)("img",{className:"image",src:h})})]});return e.tabs[1].classes.includes("selectedItem")&&(t=Object(c.jsxs)("ul",{className:"itemArea",children:[Object(c.jsxs)("ul",{className:"itemSelector",children:[Object(c.jsx)("ul",{onClick:function(){e.itemTab(0)},className:e.tabs[0].classes,children:"All Inventory"}),Object(c.jsx)("ul",{onClick:function(){e.itemTab(1)},className:e.tabs[1].classes,children:"Search"}),Object(c.jsx)("ul",{onClick:function(){e.logOut(!0)},className:"itemTab",children:"Logout"})]}),Object(c.jsx)("input",{onChange:e.updateSearch,className:"searchBar",type:"text",value:e.searchBar})]})),Object(c.jsxs)(a.Fragment,{children:[Object(c.jsxs)("ul",{className:"header",children:[Object(c.jsx)("li",{className:"headerItem",children:"Inventory"}),Object(c.jsx)("li",{className:"headerItem",children:"Profile"})]}),t]})},O=(s(16),function(e){Object(o.a)(s,e);var t=Object(u.a)(s);function s(){var e;Object(j.a)(this,s);for(var c=arguments.length,a=new Array(c),n=0;n<c;n++)a[n]=arguments[n];return(e=t.call.apply(t,[this].concat(a))).state={userName:"",passWord:"",verified:!1,tabs:[{name:"All Inventory",classes:"itemTab selectedItem"},{name:"Search",classes:"itemTab"}],currentSearch:""},e.updateUser=function(t){return e.setState({userName:t.target.value})},e.updatePass=function(t){return e.setState({passWord:t.target.value})},e.updateSelected=function(t){var s=[{name:"All Inventory",classes:"itemTab"},{name:"Search",classes:"itemTab"}],c=Object(l.a)({},s[t]);c.classes+=" selectedItem",s[t]=c,e.setState({tabs:s})},e.updateSearch=function(t){e.setState({currentSearch:t.target.value})},e.checkCred=function(t){var s=!1;if("admin"===e.state.userName&&"password"===e.state.passWord||!0===t){var c=e.state.verified;e.setState({verified:!c}),e.setState({passWord:"",userName:"",currentSearch:""}),e.updateSelected(0),s=!0}s||alert("Incorrect Username or Password")},e}return Object(d.a)(s,[{key:"render",value:function(){var e=null;return e=this.state.verified?Object(c.jsx)(b,{logOut:this.checkCred,itemTab:this.updateSelected,tabs:this.state.tabs,updateSearch:this.updateSearch,searchBar:this.state.currentSearch}):Object(c.jsx)(m,{changeU:this.updateUser,changeP:this.updatePass,click:this.checkCred,verified:this.state.verified}),Object(c.jsx)("div",{children:e})}}]),s}(a.Component)),x=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,18)).then((function(t){var s=t.getCLS,c=t.getFID,a=t.getFCP,n=t.getLCP,r=t.getTTFB;s(e),c(e),a(e),n(e),r(e)}))};i.a.render(Object(c.jsx)(n.a.StrictMode,{children:Object(c.jsx)(O,{})}),document.getElementById("root")),x()}},[[17,1,2]]]);
//# sourceMappingURL=main.297147e5.chunk.js.map