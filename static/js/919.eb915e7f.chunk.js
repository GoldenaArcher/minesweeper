"use strict";(self.webpackChunkminesweeper=self.webpackChunkminesweeper||[]).push([[919],{5749:function(e,n,t){t.d(n,{T:function(){return a}});var r=t(7094),i=t(2600),s=t(184),a=function(e){var n=e.top,t=e.children;return(0,s.jsxs)(i.i,{children:[n,(0,s.jsx)(r.i,{children:t})]})}},1167:function(e,n,t){t.d(n,{e:function(){return L}});var r,i,s,a,o,c,l,u=t(8683),f=t(4925),v=t(168),d=t(4934),m=t(2791),h=t(184),Z=d.Z.h1(r||(r=(0,v.Z)(["\n  font-size: 2em;\n"]))),g=function(e){var n=e.name,t=e.children;return(0,h.jsxs)(Z,{children:[n,", ",t]})},p=d.Z.legend(i||(i=(0,v.Z)(["\n  font-size: 1em;\n  margin: 0 auto 2vw;\n  line-height: 1.25em;\n"]))),x=d.Z.code(s||(s=(0,v.Z)(["\n  background: #e3e3e3;\n"]))),C=d.Z.span(a||(a=(0,v.Z)(["\n  font-weight: 700;\n  display: inline-block;\n  margin-right: 0.5vw;\n  &:first-letter {\n    text-transform: capitalize;\n  }\n"]))),k=d.Z.span(o||(o=(0,v.Z)(["\n  color: #ec433c;\n"]))),j=d.Z.span(c||(c=(0,v.Z)(["\n  color: #2a48ec;\n"]))),G=function(e){var n=e.feature,t=e.firstAction,r=e.secondAction;return(0,h.jsxs)(p,{children:[(0,h.jsx)(C,{children:n}),(0,h.jsxs)(x,{children:[(0,h.jsx)(k,{children:t})," +"," ",(0,h.jsx)(j,{children:r})]})]})},w=["name","children"],S=d.Z.header(l||(l=(0,v.Z)(["\n  text-align: center;\n  position: relative;\n  display: inline-block;\n"]))),L=(0,m.memo)((function(e){var n=e.name,t=e.children,r=(0,f.Z)(e,w);return(0,h.jsxs)(S,{children:[(0,h.jsx)(g,{name:n,children:t}),(0,h.jsx)(G,(0,u.Z)({},r))]})}));L.displayName="Top"},8919:function(e,n,t){t.r(n),t.d(n,{MinesweeperWithHooks:function(){return G}});var r,i=t(9439),s=t(7689),a=t(1087),o=t(5749),c=t(1167),l=t(2791),u=t(321),f=t(1179),v=t(7554),d=t(5078),m=t(3433),h=t(1105),Z=t(3340),g=t(6934),p=function(e,n){var t=(0,l.useState)(0),r=(0,i.Z)(t,2),s=r[0],a=r[1];(0,l.useEffect)((function(){var t;return e&&(t=setInterval((function(){a((function(e){return e+1}))}),1e3),n&&clearInterval(t)),function(){clearInterval(t)}}),[n,e,s]);return[s,function(){return a(0)}]};!function(e){e[e.NewGame=0]="NewGame",e[e.InProgress=1]="InProgress",e[e.Win=2]="Win",e[e.Loose=3]="Loose"}(r||(r={}));var x=function(){var e=r.NewGame,n=r.InProgress,t=r.Win,s=r.Loose,a=(0,l.useState)(!1),o=(0,i.Z)(a,2),c=o[0],u=o[1],f=(0,l.useState)(!1),v=(0,i.Z)(f,2),d=v[0],m=v[1],h=(0,l.useState)(!1),Z=(0,i.Z)(h,2),g=Z[0],p=Z[1],x=function(e){p(e===n),m(e===t),u(e===t||e===s)};return{isGameOver:c,isWin:d,isGameStarted:g,setNewGame:function(){return x(e)},setInProgress:function(){return x(n)},setGameWin:function(){return x(t)},setGameLoose:function(){return x(s)}}},C=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"easy",n=(0,l.useState)(e),t=(0,i.Z)(n,2),r=t[0],s=t[1],a=u.p[r];return{settings:a,level:r,setLevel:function(e){return s(e),u.p[e]}}},k=t(184),j=function(){var e=(0,a.lr)(),n=(0,i.Z)(e,2),t=n[0],r=n[1],s=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"easy",n=C(e),t=(0,i.Z)(n.settings,2),r=t[0],s=t[1],a=n.level,o=n.setLevel,c=x(),f=c.isGameOver,v=c.isWin,d=c.isGameStarted,k=c.setNewGame,j=c.setInProgress,G=c.setGameWin,w=c.setGameLoose,S=(0,l.useState)(0),L=(0,i.Z)(S,2),W=L[0],b=L[1],I=p(d,f),y=(0,i.Z)(I,2),M=y[0],N=y[1],R=(0,l.useState)((0,h.RC)(r,h.f$.hidden)),F=(0,i.Z)(R,2),O=F[0],P=F[1],z=(0,l.useState)((0,h.M$)(r,s/(r*r))),A=(0,i.Z)(z,2),$=A[0],T=A[1],H=(0,l.useCallback)((function(e){if(!d&&j(),!f)try{var n=(0,g.Z)(e,O,$),t=(0,i.Z)(n,2),r=t[0];t[1]&&G(),P((0,m.Z)(r))}catch(s){P((0,m.Z)($)),w()}}),[f,d,v,a,W,O,$]),E=(0,l.useCallback)((function(e){!d&&j();var n=(0,Z.m)(e,O,$,W,s),t=(0,i.Z)(n,3),r=t[0],a=t[1],o=t[2];b(o),a&&G(),P((0,m.Z)(r))}),[d,f,v,a,W,$,O]),K=function(e){var n=(0,i.Z)(e,2),t=n[0],r=n[1],s=(0,h.M$)(t,r/(t*t)),a=(0,h.RC)(t,h.f$.hidden);T((0,m.Z)(s)),P((0,m.Z)(a)),k(),N(),b(0)},U=(0,l.useCallback)((function(e){o(e);var n=u.p[e];K(n)}),[]),q=(0,l.useCallback)((function(){return K([r,s])}),[r,s]);return{level:a,isGameOver:f,isWin:v,settings:[r,s],playerField:O,onClick:H,onChangeLevel:U,onReset:q,gameField:$,onContextMenu:E,time:M,flagCounter:W,isGameStarted:d}}(t.get("level")||void 0),o=s.level,c=s.isGameOver,j=s.isWin,G=s.settings,w=s.playerField,S=s.onClick,L=s.onChangeLevel,W=s.onReset,b=s.onContextMenu,I=s.time,y=(0,i.Z)(G,2)[1],M=(0,l.useCallback)((function(e){var n=e.target.value;r({level:n}),L(n)}),[]);return(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)(f.z,{time:String(I),mines:String(y),levels:u.f,defaultLevel:o,onChangeLevel:M,onReset:W}),c&&(0,k.jsx)(v.K,{onClick:W,isWin:j}),(0,k.jsx)(d.r,{onClick:S,onContextMenu:b,children:w})]})},G=function(){var e=(0,s.UO)().username,n=(0,a.lr)(),t=(0,i.Z)(n,1)[0].get("id");return(0,k.jsx)(o.T,{top:(0,k.jsxs)(c.e,{name:"Minesweeper with ReactHooks",feature:"Flag",firstAction:"right",secondAction:"click",children:[e&&"".concat(e),t&&"; userId:".concat(t)]}),children:(0,k.jsx)(j,{})})}}}]);
//# sourceMappingURL=919.eb915e7f.chunk.js.map