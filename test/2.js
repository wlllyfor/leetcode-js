const str = `<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <link rel="shortcut icon" href="https://ticket1000-1253841380.file.myqcloud.com/favicon%28andon2019-7-29%29.ico">
        <link rel="stylesheet" href="https://ticket1000-1253841380.file.myqcloud.com/assets/independent-release/static/element/2.15.7/index.2.15.7.ed5129ad.css">
        <script src="https://cdn-go.cn/aegis/aegis-sdk/latest/aegis.min.js"></script>
        <script type="text/javascript">
            var env;
            env = 0 === window.location.hostname.indexOf("test") || 0 === window.location.hostname.indexOf("dev") ? Aegis.environment.test : 0 === window.location.hostname.indexOf("huidu") ? Aegis.environment.gray : Aegis.environment.production;
            var ignoreApis = ["/watermark", "tim_web_report", "/tool/websocket/", "v4/openim/longpolling", "tpstelemetry.tencent.com", "/persistence/get"]
              , isIE = window.ActiveXObject || "ActiveXObject"in window;
            window.logger = new Aegis({
                env: env,
                id: "TDwldUiElVIwDhQRpP",
                reportApiSpeed: !0,
                reportAssetSpeed: !0,
                offlineLog: !isIE,
                beforeReport: e=>!ignoreApis.some((function(n) {
                    return e && e.msg && -1 !== e.msg.indexOf(ignoreApi)
                }
                )) && e,
                spa: !0
            })
        </script>
        <script src="https://andon-sdk-1258344699.file.myqcloud.com/polyfill/qidian/index.1.0.0.js"></script>
        <script type="text/javascript" src="https://tool-1253841380.file.myqcloud.com/assets/release/react.production.min.js"></script>
        <script type="text/javascript" src="https://tool-1253841380.file.myqcloud.com/assets/release/react-dom.production.min.js"></script>
        <script type="text/javascript" src="https://ticket1000-1253841380.file.myqcloud.com/assets/independent-release/static/vue/index.61612d362d08b0d0a340.js"></script>
        <script type="text/javascript" src="https://ticket1000-1253841380.file.myqcloud.com/assets/independent-release/static/moment/moment2.29.1-with-locales.min.js"></script>
        <title>Andon平台</title>
        <link href="https://ticket-1253841380.file.myqcloud.com/dev-static/mono/base/static/css/2.b3788b26.chunk.css" rel="stylesheet">
        <link href="https://ticket-1253841380.file.myqcloud.com/dev-static/mono/base/static/css/main.885996a5.chunk.css" rel="stylesheet">
    </head>
    <body>
        <noscript>
            <strong>We're sorry but Webpack App doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
        </noscript>
        <div id="root"></div>
        <script>
            !function(e) {
                function t(t) {
                    for (var n, a, l = t[0], p = t[1], i = t[2], f = 0, s = []; f < l.length; f++)
                        a = l[f],
                        Object.prototype.hasOwnProperty.call(o, a) && o[a] && s.push(o[a][0]),
                        o[a] = 0;
                    for (n in p)
                        Object.prototype.hasOwnProperty.call(p, n) && (e[n] = p[n]);
                    for (c && c(t); s.length; )
                        s.shift()();
                    return u.push.apply(u, i || []),
                    r()
                }
                function r() {
                    for (var e, t = 0; t < u.length; t++) {
                        for (var r = u[t], n = !0, l = 1; l < r.length; l++) {
                            var p = r[l];
                            0 !== o[p] && (n = !1)
                        }
                        n && (u.splice(t--, 1),
                        e = a(a.s = r[0]))
                    }
                    return e
                }
                var n = {}
                  , o = {
                    1: 0
                }
                  , u = [];
                function a(t) {
                    if (n[t])
                        return n[t].exports;
                    var r = n[t] = {
                        i: t,
                        l: !1,
                        exports: {}
                    };
                    return e[t].call(r.exports, r, r.exports, a),
                    r.l = !0,
                    r.exports
                }
                a.m = e,
                a.c = n,
                a.d = function(e, t, r) {
                    a.o(e, t) || Object.defineProperty(e, t, {
                        enumerable: !0,
                        get: r
                    })
                }
                ,
                a.r = function(e) {
                    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                        value: "Module"
                    }),
                    Object.defineProperty(e, "__esModule", {
                        value: !0
                    })
                }
                ,
                a.t = function(e, t) {
                    if (1 & t && (e = a(e)),
                    8 & t)
                        return e;
                    if (4 & t && "object" == typeof e && e && e.__esModule)
                        return e;
                    var r = Object.create(null);
                    if (a.r(r),
                    Object.defineProperty(r, "default", {
                        enumerable: !0,
                        value: e
                    }),
                    2 & t && "string" != typeof e)
                        for (var n in e)
                            a.d(r, n, function(t) {
                                return e[t]
                            }
                            .bind(null, n));
                    return r
                }
                ,
                a.n = function(e) {
                    var t = e && e.__esModule ? function() {
                        return e.default
                    }
                    : function() {
                        return e
                    }
                    ;
                    return a.d(t, "a", t),
                    t
                }
                ,
                a.o = function(e, t) {
                    return Object.prototype.hasOwnProperty.call(e, t)
                }
                ,
                a.p = "https://ticket-1253841380.file.myqcloud.com/dev-static/mono/base/";
                var l = window["webpackJsonp_@apps/base"] = window["webpackJsonp_@apps/base"] || []
                  , p = l.push.bind(l);
                l.push = t,
                l = l.slice();
                for (var i = 0; i < l.length; i++)
                    t(l[i]);
                var c = p;
                r()
            }([])
        </script>
        <script src="https://ticket-1253841380.file.myqcloud.com/dev-static/mono/base/static/js/2.9cc645c7.chunk.js"></script>
        <script src="https://ticket-1253841380.file.myqcloud.com/dev-static/mono/base/static/js/main.c81751d5.chunk.js"></script>
    </body>
</html>
`


let scriptsCahe = [];

const scriptReg = /<script[^>]+src=['"]([^'"]+)['"]+/gm;
scriptReg.lastIndex = 0;
const result = [];
let match = null;
while (match = scriptReg.exec(str)) {
  result.push(match[1]);
}

console.log(result)