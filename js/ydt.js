(() => {
  const e = document.documentElement,
    t = window.MutationObserver || window.WebKitMutationObserver,
    n = {
      hide_feed: !1,
      hide_redirect_home: !1,
      hide_subs: !1,
      hide_notifs: !1,
    },
    i = Object.keys(n),
    o = "https://www.youtube.com/feed/subscriptions";
  let c,
    s,
    u = !1,
    r = !1,
    d = !1,
    l = !1,
    a = !1,
    m = !1,
    f = !1;
  function h(e, t, n) {
    ((n && c) || (!n && s)) &&
      "true" === t.getAttribute("aria-checked") &&
      (t.click(), setTimeout(h.bind(null, e, t, n), e));
  }
  function g(e, t) {
    "true" === e.getAttribute("aria-checked")
      ? (e.click(), setTimeout(h.bind(null, t, e, !1), t))
      : document.getElementsByClassName("ytp-iv-video-content").length &&
        (e.click(), e.click());
  }
  function y(e) {
    const t = e.getElementsByClassName("annOption");
    for (let e = 0; e < t.length; e += 1) g(t[e], 1500);
    return !t.length;
  }
  function b(e, t) {
    const n = e.querySelectorAll(".ytp-menuitem[role=menuitemcheckbox]");
    if (n.length) {
      const e = n[n.length - 1];
      "Ambient mode" !== e.innerText &&
        (e.classList.add("annOption"), s && g(e, t));
    }
  }
  function w(e, t) {
    const n = 2500;
    e.firstChild
      ? b(e, n)
      : setTimeout(() => {
          t.click(), t.click(), b(e, n);
        }, n);
  }
  function p(e, n) {
    new t(() => {
      y(e) && w(e, n);
    }).observe(e, { childList: !0 });
  }
  function v(e, n) {
    const i = e.getElementsByClassName("ytp-settings-button");
    if (i.length) {
      const t = i[i.length - 1];
      t.click(), t.click();
      const o = e.getElementsByClassName("ytp-panel-menu"),
        c = o[o.length - 1];
      w(c, t), n ? m || (p(c, t), (m = !0)) : f || (p(c, t), (f = !0));
    } else
      e.hidden ||
        !document.body.contains(e) ||
        e.getElementsByClassName("ytp-unmute").length ||
        e.getElementsByClassName("watchThumbImageContainer").length ||
        new t(function () {
          e.getElementsByClassName("ytp-unmute").length &&
            (v(e, n), this.disconnect());
        }).observe(e, { childList: !0, subtree: !0 });
  }
  function E(e, t) {
    y(e) && v(e, t);
  }
  function _(e, t) {
    const n = e.getElementsByClassName("ytp-autonav-toggle-button")[0];
    return (
      !!n &&
      ("true" === n.getAttribute("aria-checked") &&
        (n.click(), t && setTimeout(h.bind(null, 1500, n, !0), 1500)),
      !0)
    );
  }
  function k(e, n) {
    if (!window.Polymer) return !1;
    const i = document.getElementsByTagName("ytd-watch-flexy")[0];
    if (i && !i.hidden)
      e &&
        (function (e) {
          r ||
            _(e, !1) ||
            ((r = !0),
            new t(function () {
              _(e, !0) && ((r = !1), this.disconnect());
            }).observe(e, { childList: !0, subtree: !0 }));
        })(i),
        n && E(i, !0);
    else if (n) {
      const e = document.querySelector("ytd-browse[page-subtype=channels]");
      e &&
        !e.hidden &&
        e.getElementsByTagName("ytd-channel-video-player-renderer").length &&
        E(e, !1);
    }
    return !0;
  }
  function N(e, t) {
    if (!document.getElementById("player-container-id")) return !1;
    const n = document.getElementById("player");
    if (n && !n.hidden) {
      if (e) {
        const e = document.getElementsByClassName(
          "ytm-autonav-toggle-button-container"
        )[0];
        e && "true" === e.getAttribute("aria-pressed") && e.click();
      }
      t && E(n, !0);
    }
    return !0;
  }
  function B(e) {
    s && E(e, !0);
  }
  function A(e) {
    const t = e.getElementsByTagName("video")[0];
    return !!t && (t.addEventListener("loadeddata", () => B(e)), B(e), !0);
  }
  function L() {
    if (window === window.parent) return !1;
    const e = document.getElementById("player");
    if (!e) return !1;
    if (d) B(e);
    else {
      d = !0;
      A(e) ||
        new t(function () {
          A(e) && this.disconnect();
        }).observe(e, { childList: !0 });
    }
    return !0;
  }
  function T(e) {
    const t = /^\(\d+\) +/;
    t.test(e.innerText) && (e.innerText = e.innerText.replace(t, ""));
  }
  function C() {
    if (l) return;
    const e = document.getElementsByTagName("title")[0];
    e &&
      (T(e),
      (function (e) {
        new t(function () {
          n.hide_notifs ? T(e) : ((l = !1), this.disconnect());
        }).observe(e, { childList: !0 });
      })(e),
      (l = !0));
  }
  function x(e) {
    e.stopPropagation();
  }
  function P(e) {
    e.href !== o &&
      (e.addEventListener("click", x, !0),
      e.addEventListener("touchend", x, !0),
      (e.href = o));
  }
  function S() {
    return n.hide_feed && n.hide_redirect_home && !n.hide_subs;
  }
  function I() {
    if (a) return;
    const e = document.querySelector("a#logo");
    e &&
      (P(e),
      (function (e) {
        new t(function () {
          u ? P(e) : ((a = !1), this.disconnect());
        }).observe(e, { attributes: !0, attributeFilter: ["href"] });
      })(e),
      (a = !0));
  }
  function O() {
    const e = document.querySelector("a#logo");
    e &&
      e.href === o &&
      (e.removeEventListener("click", x, !0),
      e.removeEventListener("touchend", x, !0),
      (e.href = "/"));
  }
  function q(t) {
    if (
      null == s &&
      ((c = "true" === e.getAttribute("hide_autoplay")),
      (s = "true" === e.getAttribute("hide_annotations")),
      window.Polymer)
    ) {
      for (let t = 0; t <= i.length; t += 1)
        n[i[t]] = "true" === e.getAttribute(i[t]);
      (u = S()),
        -1 === document.cookie.indexOf("SAPISID=") &&
          e.setAttribute("yt-signed-out", "");
    }
    if ((window.Polymer && (n.hide_notifs && C(), u && I()), c || s))
      if (window.Polymer) k(c, s);
      else if (1 === t) {
        !N(c, s) && s && L();
      } else 2 === t && N(c, s);
  }
  window.addEventListener("load", q.bind(null, 1)),
    window.addEventListener("yt-page-data-updated", q),
    window.addEventListener("state-navigateend", q.bind(null, 2)),
    "complete" === document.readyState && q(1),
    new t((t) => {
      if (null != s)
        for (let i = 0; i < t.length; i += 1)
          if ("hide_autoplay" === t[i].attributeName) {
            if (((c = "true" === e.getAttribute("hide_autoplay")), c)) {
              k(!0, !1) || N(!0, !1);
            }
          } else if ("hide_annotations" === t[i].attributeName) {
            if (((s = "true" === e.getAttribute("hide_annotations")), s)) {
              if (!k(!1, !0)) {
                N(!1, !0) || L();
              }
            }
          } else if (window.Polymer)
            if (
              ((n[t[i].attributeName] =
                "true" === e.getAttribute(t[i].attributeName)),
              "hide_notifs" === t[i].attributeName)
            )
              n.hide_notifs && C();
            else {
              const e = u;
              (u = S()), u ? I() : e && O();
            }
    }).observe(e, {
      attributes: !0,
      attributeFilter: ["hide_autoplay", "hide_annotations", ...i],
    });
})();
