(this.webpackJsonpfood_sharing=this.webpackJsonpfood_sharing||[]).push([[0],{157:function(e,t,n){e.exports=n(245)},245:function(e,t,n){"use strict";n.r(t);n(158),n(185),n(187),n(188),n(190),n(191),n(192),n(193),n(194),n(195),n(196),n(197),n(199),n(200),n(201),n(202),n(203),n(204),n(205),n(206),n(207),n(208),n(210),n(211),n(212),n(213),n(214),n(215),n(216),n(217),n(218),n(219),n(220),n(221),n(222),n(223),n(224),n(225),n(226),n(227);var a=n(0),i=n.n(a),c=n(30),r=n.n(c),s=n(21),o=n.n(s),l=n(28),u=n(29),p=n(35),h=n(34),d=n(46),m=n(36),f=n(11),b=(n(243),n(92)),g=n.n(b),y=function(e){function t(e){return Object(l.a)(this,t),Object(p.a)(this,Object(h.a)(t).call(this,e))}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.props,t=e.id,n=e.items;return i.a.createElement(f.e,{id:t},i.a.createElement(f.f,null,"\u0422\u043e\u0432\u0430\u0440\u044b"),i.a.createElement(f.c,null,i.a.createElement(f.d,null,n.length>0&&n.map((function(e,t){return i.a.createElement(f.a,{key:t,before:i.a.createElement("img",{style:{width:40,height:40,margin:10},src:e.thumb_photo}),multiline:!0,description:e.description},e.title,", ",e.price.amount," ",e.price.currency.name)})),0==n.length&&i.a.createElement(f.b,null,"\u0425\u043c, \u043d\u043e \u043c\u044b \u043d\u0435 \u043d\u0430\u0448\u043b\u0438 \u0442\u043e\u0432\u0430\u0440\u043e\u0432."))))}}]),t}(i.a.Component),j=n(47),v=n.n(j),k=(new(function(){function e(){Object(l.a)(this,e),this.apiURL="https://ec2-35-175-144-115.compute-1.amazonaws.com/api/v1/"}return Object(u.a)(e,[{key:"shareItem",value:function(e,t,n,a,i,c,r,s){return v.a.async((function(o){for(;;)switch(o.prev=o.next){case 0:return o.abrupt("return",fetch(this.apiURL+"share/",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({user_id:e,caption:t,description:n,image_url:r,lat:a,lon:i,price:c,expiration:s})}).then((function(e){return e.json()})));case 1:case"end":return o.stop()}}),null,this)}},{key:"getNearby",value:function(e,t){return v.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.abrupt("return",fetch(this.apiURL+"nearby/",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({lat:e,lon:t})}).then((function(e){return console.log(e),console.log(e.json()),e.json()})));case 1:case"end":return n.stop()}}),null,this)}},{key:"deleteMyItem",value:function(e,t){return v.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.abrupt("return",fetch(this.apiURL+"delete/",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({share_id:e,vk_id:t})}).then((function(e){return e.json()})));case 1:case"end":return n.stop()}}),null,this)}}]),e}()),function(e){function t(e){return Object(l.a)(this,t),Object(p.a)(this,Object(h.a)(t).call(this,e))}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.props,t=e.id,n=e.items;return i.a.createElement(f.e,{id:t},i.a.createElement(f.f,null,"\u041f\u043e\u0431\u043b\u0438\u0437\u043e\u0441\u0442\u0438, \u0433\u043e\u0442\u043e\u0432\u044b \u043f\u043e\u0434\u0435\u043b\u0438\u0442\u044c\u0441\u044f:"),i.a.createElement(f.c,null,i.a.createElement(f.d,null,n.length>0&&n.map((function(e,t){return i.a.createElement(f.a,{key:t,before:i.a.createElement("img",{style:{width:40,height:40,margin:10},src:e.ImageURL}),multiline:!0,description:e.description},e.caption,", ",e.price,", \u0420\u0430\u0441\u0442\u043e\u044f\u043d\u0438\u0435: ",e.distance,"\u043c")})),0==n.length&&i.a.createElement(f.b,null,"\u0425\u043c, \u0441\u0435\u0433\u043e\u0434\u043d\u044f \u0432\u0441\u0435 \u0436\u0430\u0434\u043d\u044b\u0435..."))))}}]),t}(i.a.Component)),O=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(p.a)(this,Object(h.a)(t).call(this,e))).go=function(e){n.setState({activePanel:e.currentTarget.dataset.to})},n.state={activePanel:"home",fetchedUser:null,authToken:null,items:[]},n.getItems=n.getItems.bind(Object(d.a)(n)),n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=this;o.a.subscribe((function(t){switch(t.detail.type){case"VKWebAppGetUserInfoResult":e.setState({fetchedUser:t.detail.data});break;case"VKWebAppAccessTokenReceived":e.setState({authToken:t.detail.data.access_token}),o.a.send("VKWebAppGetGeodata",{});break;case"VKWebAppGeodataResult":console.log(t.detail.data),console.log(t.detail.data.available);break;default:console.log(t.detail.type)}})),o.a.send("VKWebAppGetUserInfo",{}),o.a.send("VKWebAppGetAuthToken",{app_id:7234568,scope:"photos, friends"})}},{key:"getItems",value:function(){var e=this,t="https://api.vk.com/method/market.get?v=5.52&access_token=".concat(this.state.authToken,"&owner_id=-").concat(124527492);g()(t).then((function(e){return e.json()})).then((function(t){return e.setState({items:t.response.items})})).catch((function(e){return[]}))}},{key:"render",value:function(){return i.a.createElement(f.g,{activePanel:this.state.activePanel},i.a.createElement(y,{id:"home",items:this.state.items,fetchedUser:this.state.fetchedUser,go:this.go}),i.a.createElement(k,{id:"shared_items",items:this.state.items}))}}]),t}(i.a.Component);o.a.send("VKWebAppInit"),r.a.render(i.a.createElement(O,null),document.getElementById("root"))}},[[157,1,2]]]);
//# sourceMappingURL=main.451540b3.chunk.js.map