function mk(a){return document.createElement(a)}function q1(a){return document.querySelector(a)}function qa(a){return document.querySelectorAll(a)}(function(){var a,j;var k={a:false,x:0,y:0,suppress:false,hidden:false};var m=[];var f=["#111213","#CC0000","#4E9A06","#C4A000","#3465A4","#75507B","#06989A","#D3D7CF","#555753","#EF2929","#8AE234","#FCE94F","#729FCF","#AD7FA8","#34E2E2","#EEEEEC"];function n(){m.forEach(function(p,q){p.t=" ";p.fg=7;p.bg=0;c(p)})}function b(q,p){return m[q*a+p]}function h(){return b(k.y,k.x)}function o(p){k.hidden=!p;k.a&=p;c(h(),k.a)}function e(q,p){k.suppress=true;c(h(),false);k.x=p;k.y=q;k.suppress=false;c(h(),k.a)}function c(q,p){var t=q.e,r,s;r=p?q.bg:q.fg;s=p?q.fg:q.bg;t.innerText=(q.t+" ")[0];t.style.color=d(r);t.style.backgroundColor=d(s);t.style.fontWeight=r>7?"bold":"normal"}function g(){m.forEach(function(q,r){var p=k.a&&(r==k.y*a+k.x);c(q,p)})}function i(s){k.x=s.x;k.y=s.y;if(s.w!=a||s.h!=j){Term.init(s);return}var u=0,A=0,w=s.screen;var p=7,v=0;while(u<w.length&&A<a*j){var y=m[A++];var r=w[u];if(r!=","){p=y.fg=parseInt(w[u++],16);v=y.bg=parseInt(w[u++],16)}else{u++;y.fg=p;y.bg=v}var z=y.t=w[u++];var q=0;switch(w[u]){case"r":q=1;break;case"s":q=2;break;case"t":q=3;break;case"u":q=4;break;default:q=0}if(q>0){var x=parseInt(w.substr(u+1,q));u=u+q+1;for(;x>0&&A<a*j;x--){y=m[A++];y.fg=p;y.bg=v;y.t=z}}}g()}function d(p){p=parseInt(p);if(p<0||p>15){p=0}return f[p]}function l(t){a=t.w;j=t.h;var s,p,r=q1("#screen");while(r.firstChild){r.removeChild(r.firstChild)}m=[];for(var q=0;q<a*j;q++){s=mk("span");(function(){var u=q%a;var v=Math.floor(q/a);s.addEventListener("click",function(){Kinp.onTap(v,u)})})();if((q>0)&&(q%a==0)){r.appendChild(mk("br"))}r.appendChild(s);p={t:" ",fg:7,bg:0,e:s};m.push(p);c(p)}setInterval(function(){k.a=!k.a;if(k.hidden){k.a=false}if(!k.suppress){c(h(),k.a)}},500);i(t)}window.Term={init:l,load:i,setCursor:e,enableCursor:o,clear:n}})();(function(){var g="ws://"+window.location.host+"/ws/update.cgi";var d;function c(i){console.log("CONNECTED")}function b(i){console.error("SOCKET CLOSED")}function f(i){try{console.log("RX: ",i.data);Term.load(JSON.parse(i.data))}catch(j){console.error(j)}}function e(i){console.error(i.data)}function a(i){console.log("TX: ",i);if(d.readyState!=1){console.error("Socket not ready");return}if(typeof i!="string"){i=JSON.stringify(i)}d.send(i)}function h(){d=new WebSocket(g);d.onopen=c;d.onclose=b;d.onmessage=f;d.onerror=e;console.log("Opening socket.")}window.Conn={ws:null,init:h,send:a}})();(function(){function a(e){Conn.send("STR:"+e)}function b(f,e){Conn.send("TAP:"+f+","+e)}function d(e){Conn.send("BTN:"+e)}function c(){window.addEventListener("keypress",function(h){var g=+h.which;if(g>=32&&g<127){var f=String.fromCharCode(g);a(f)}});window.addEventListener("keydown",function(g){var f=g.keyCode;switch(f){case 8:a("\x08");break;case 13:a("\x0d\x0a");break;case 27:a("\x1b");break;case 37:a("\x1b[D");break;case 38:a("\x1b[A");break;case 39:a("\x1b[C");break;case 40:a("\x1b[B");break}});qa("#buttons button").forEach(function(e){e.addEventListener("click",function(){d(+this.dataset.n)})})}window.Kinp={init:c,onTap:b}})();function init(a){Term.init(a);Conn.init();Kinp.init()};