if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function(a) {
    "use strict";
    var b = a.fn.jquery.split(" ")[0].split(".");
    if (b[0] < 2 && b[1] < 9 || 1 == b[0] && 9 == b[1] && b[2] < 1 || b[0] > 3) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")
}(jQuery), + function(a) {
    "use strict";

    function b() {
        var a = document.createElement("bootstrap"),
            b = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var c in b)
            if (void 0 !== a.style[c]) return {
                end: b[c]
            };
        return !1
    }
    a.fn.emulateTransitionEnd = function(b) {
        var c = !1,
            d = this;
        a(this).one("bsTransitionEnd", function() {
            c = !0
        });
        var e = function() {
            c || a(d).trigger(a.support.transition.end)
        };
        return setTimeout(e, b), this
    }, a(function() {
        a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = {
            bindType: a.support.transition.end,
            delegateType: a.support.transition.end,
            handle: function(b) {
                if (a(b.target).is(this)) return b.handleObj.handler.apply(this, arguments)
            }
        })
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var c = a(this),
                e = c.data("bs.alert");
            e || c.data("bs.alert", e = new d(this)), "string" == typeof b && e[b].call(c)
        })
    }
    var c = '[data-dismiss="alert"]',
        d = function(b) {
            a(b).on("click", c, this.close)
        };
    d.VERSION = "3.3.7", d.TRANSITION_DURATION = 150, d.prototype.close = function(b) {
        function c() {
            g.detach().trigger("closed.bs.alert").remove()
        }
        var e = a(this),
            f = e.attr("data-target");
        f || (f = e.attr("href"), f = f && f.replace(/.*(?=#[^\s]*$)/, ""));
        var g = a("#" === f ? [] : f);
        b && b.preventDefault(), g.length || (g = e.closest(".alert")), g.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (g.removeClass("in"), a.support.transition && g.hasClass("fade") ? g.one("bsTransitionEnd", c).emulateTransitionEnd(d.TRANSITION_DURATION) : c())
    };
    var e = a.fn.alert;
    a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function() {
        return a.fn.alert = e, this
    }, a(document).on("click.bs.alert.data-api", c, d.prototype.close)
}(jQuery), +
    function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.button"),
                f = "object" == typeof b && b;
            e || d.data("bs.button", e = new c(this, f)), "toggle" == b ? e.toggle() : b && e.setState(b)
        })
    }
    var c = function(b, d) {
        this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1
    };
    c.VERSION = "3.3.7", c.DEFAULTS = {
        loadingText: "loading..."
    }, c.prototype.setState = function(b) {
        var c = "disabled",
            d = this.$element,
            e = d.is("input") ? "val" : "html",
            f = d.data();
        b += "Text", null == f.resetText && d.data("resetText", d[e]()), setTimeout(a.proxy(function() {
            d[e](null == f[b] ? this.options[b] : f[b]), "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c).prop(c, !0)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c).prop(c, !1))
        }, this), 0)
    }, c.prototype.toggle = function() {
        var a = !0,
            b = this.$element.closest('[data-toggle="buttons"]');
        if (b.length) {
            var c = this.$element.find("input");
            "radio" == c.prop("type") ? (c.prop("checked") && (a = !1), b.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == c.prop("type") && (c.prop("checked") !== this.$element.hasClass("active") && (a = !1), this.$element.toggleClass("active")), c.prop("checked", this.$element.hasClass("active")), a && c.trigger("change")
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active")
    };
    var d = a.fn.button;
    a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function() {
        return a.fn.button = d, this
    }, a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(c) {
        var d = a(c.target).closest(".btn");
        b.call(d, "toggle"), a(c.target).is('input[type="radio"], input[type="checkbox"]') || (c.preventDefault(), d.is("input,button") ? d.trigger("focus") : d.find("input:visible,button:visible").first().trigger("focus"))
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(b) {
        a(b.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(b.type))
    })
}(jQuery), +
    function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.tooltip"),
                f = "object" == typeof b && b;
            !e && /destroy|hide/.test(b) || (e || d.data("bs.tooltip", e = new c(this, f)), "string" == typeof b && e[b]())
        })
    }
    var c = function(a, b) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", a, b)
    };
    c.VERSION = "3.3.7", c.TRANSITION_DURATION = 150, c.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, c.prototype.init = function(b, c, d) {
        if (this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.$viewport = this.options.viewport && a(a.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
            click: !1,
            hover: !1,
            focus: !1
        }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
            var g = e[f];
            if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));
            else if ("manual" != g) {
                var h = "hover" == g ? "mouseenter" : "focusin",
                    i = "hover" == g ? "mouseleave" : "focusout";
                this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = a.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, c.prototype.getDefaults = function() {
        return c.DEFAULTS
    }, c.prototype.getOptions = function(b) {
        return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
            show: b.delay,
            hide: b.delay
        }), b
    }, c.prototype.getDelegateOptions = function() {
        var b = {},
            c = this.getDefaults();
        return this._options && a.each(this._options, function(a, d) {
            c[a] != d && (b[a] = d)
        }), b
    }, c.prototype.enter = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusin" == b.type ? "focus" : "hover"] = !0), c.tip().hasClass("in") || "in" == c.hoverState ? void(c.hoverState = "in") : (clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void(c.timeout = setTimeout(function() {
            "in" == c.hoverState && c.show()
        }, c.options.delay.show)) : c.show())
    }, c.prototype.isInStateTrue = function() {
        for (var a in this.inState)
            if (this.inState[a]) return !0;
        return !1
    }, c.prototype.leave = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        if (c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusout" == b.type ? "focus" : "hover"] = !1), !c.isInStateTrue()) return clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void(c.timeout = setTimeout(function() {
            "out" == c.hoverState && c.hide()
        }, c.options.delay.hide)) : c.hide()
    }, c.prototype.show = function() {
        var b = a.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(b);
            var d = a.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (b.isDefaultPrevented() || !d) return;
            var e = this,
                f = this.tip(),
                g = this.getUID(this.type);
            this.setContent(), f.attr("id", g), this.$element.attr("aria-describedby", g), this.options.animation && f.addClass("fade");
            var h = "function" == typeof this.options.placement ? this.options.placement.call(this, f[0], this.$element[0]) : this.options.placement,
                i = /\s?auto?\s?/i,
                j = i.test(h);
            j && (h = h.replace(i, "") || "top"), f.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(h).data("bs." + this.type, this), this.options.container ? f.appendTo(this.options.container) : f.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
            var k = this.getPosition(),
                l = f[0].offsetWidth,
                m = f[0].offsetHeight;
            if (j) {
                var n = h,
                    o = this.getPosition(this.$viewport);
                h = "bottom" == h && k.bottom + m > o.bottom ? "top" : "top" == h && k.top - m < o.top ? "bottom" : "right" == h && k.right + l > o.width ? "left" : "left" == h && k.left - l < o.left ? "right" : h, f.removeClass(n).addClass(h)
            }
            var p = this.getCalculatedOffset(h, k, l, m);
            this.applyPlacement(p, h);
            var q = function() {
                var a = e.hoverState;
                e.$element.trigger("shown.bs." + e.type), e.hoverState = null, "out" == a && e.leave(e)
            };
            a.support.transition && this.$tip.hasClass("fade") ? f.one("bsTransitionEnd", q).emulateTransitionEnd(c.TRANSITION_DURATION) : q()
        }
    }, c.prototype.applyPlacement = function(b, c) {
        var d = this.tip(),
            e = d[0].offsetWidth,
            f = d[0].offsetHeight,
            g = parseInt(d.css("margin-top"), 10),
            h = parseInt(d.css("margin-left"), 10);
        isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top += g, b.left += h, a.offset.setOffset(d[0], a.extend({
            using: function(a) {
                d.css({
                    top: Math.round(a.top),
                    left: Math.round(a.left)
                })
            }
        }, b), 0), d.addClass("in");
        var i = d[0].offsetWidth,
            j = d[0].offsetHeight;
        "top" == c && j != f && (b.top = b.top + f - j);
        var k = this.getViewportAdjustedDelta(c, b, i, j);
        k.left ? b.left += k.left : b.top += k.top;
        var l = /top|bottom/.test(c),
            m = l ? 2 * k.left - e + i : 2 * k.top - f + j,
            n = l ? "offsetWidth" : "offsetHeight";
        d.offset(b), this.replaceArrow(m, d[0][n], l)
    }, c.prototype.replaceArrow = function(a, b, c) {
        this.arrow().css(c ? "left" : "top", 50 * (1 - a / b) + "%").css(c ? "top" : "left", "")
    }, c.prototype.setContent = function() {
        var a = this.tip(),
            b = this.getTitle();
        a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
    }, c.prototype.hide = function(b) {
        function d() {
            "in" != e.hoverState && f.detach(), e.$element && e.$element.removeAttr("aria-describedby").trigger("hidden.bs." + e.type), b && b()
        }
        var e = this,
            f = a(this.$tip),
            g = a.Event("hide.bs." + this.type);
        if (this.$element.trigger(g), !g.isDefaultPrevented()) return f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", d).emulateTransitionEnd(c.TRANSITION_DURATION) : d(), this.hoverState = null, this
    }, c.prototype.fixTitle = function() {
        var a = this.$element;
        (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
    }, c.prototype.hasContent = function() {
        return this.getTitle()
    }, c.prototype.getPosition = function(b) {
        b = b || this.$element;
        var c = b[0],
            d = "BODY" == c.tagName,
            e = c.getBoundingClientRect();
        null == e.width && (e = a.extend({}, e, {
            width: e.right - e.left,
            height: e.bottom - e.top
        }));
        var f = window.SVGElement && c instanceof window.SVGElement,
            g = d ? {
                top: 0,
                left: 0
            } : f ? null : b.offset(),
            h = {
                scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop()
            },
            i = d ? {
                width: a(window).width(),
                height: a(window).height()
            } : null;
        return a.extend({}, e, h, i, g)
    }, c.prototype.getCalculatedOffset = function(a, b, c, d) {
        return "bottom" == a ? {
            top: b.top + b.height,
            left: b.left + b.width / 2 - c / 2
        } : "top" == a ? {
            top: b.top - d,
            left: b.left + b.width / 2 - c / 2
        } : "left" == a ? {
            top: b.top + b.height / 2 - d / 2,
            left: b.left - c
        } : {
            top: b.top + b.height / 2 - d / 2,
            left: b.left + b.width
        }
    }, c.prototype.getViewportAdjustedDelta = function(a, b, c, d) {
        var e = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return e;
        var f = this.options.viewport && this.options.viewport.padding || 0,
            g = this.getPosition(this.$viewport);
        if (/right|left/.test(a)) {
            var h = b.top - f - g.scroll,
                i = b.top + f - g.scroll + d;
            h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i)
        } else {
            var j = b.left - f,
                k = b.left + f + c;
            j < g.left ? e.left = g.left - j : k > g.right && (e.left = g.left + g.width - k)
        }
        return e
    }, c.prototype.getTitle = function() {
        var a, b = this.$element,
            c = this.options;
        return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
    }, c.prototype.getUID = function(a) {
        do a += ~~(1e6 * Math.random()); while (document.getElementById(a));
        return a
    }, c.prototype.tip = function() {
        if (!this.$tip && (this.$tip = a(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip
    }, c.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, c.prototype.enable = function() {
        this.enabled = !0
    }, c.prototype.disable = function() {
        this.enabled = !1
    }, c.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }, c.prototype.toggle = function(b) {
        var c = this;
        b && (c = a(b.currentTarget).data("bs." + this.type), c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c))), b ? (c.inState.click = !c.inState.click, c.isInStateTrue() ? c.enter(c) : c.leave(c)) : c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
    }, c.prototype.destroy = function() {
        var a = this;
        clearTimeout(this.timeout), this.hide(function() {
            a.$element.off("." + a.type).removeData("bs." + a.type), a.$tip && a.$tip.detach(), a.$tip = null, a.$arrow = null, a.$viewport = null, a.$element = null
        })
    };
    var d = a.fn.tooltip;
    a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function() {
        return a.fn.tooltip = d, this
    }
}
(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.popover"),
                f = "object" == typeof b && b;
            !e && /destroy|hide/.test(b) || (e || d.data("bs.popover", e = new c(this, f)), "string" == typeof b && e[b]())
        })
    }
    var c = function(a, b) {
        this.init("popover", a, b)
    };
    if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
    c.VERSION = "3.3.7", c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, c.prototype.getDefaults = function() {
        return c.DEFAULTS
    }, c.prototype.setContent = function() {
        var a = this.tip(),
            b = this.getTitle(),
            c = this.getContent();
        a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide()
    }, c.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }, c.prototype.getContent = function() {
        var a = this.$element,
            b = this.options;
        return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
    }, c.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    };
    var d = a.fn.popover;
    a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function() {
        return a.fn.popover = d, this
    }
}
(jQuery), + function(a) {
    "use strict";

    function b(c, d) {
        this.$body = a(document.body), this.$scrollElement = a(a(c).is(document.body) ? window : c), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", a.proxy(this.process, this)), this.refresh(), this.process()
    }

    function c(c) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.scrollspy"),
                f = "object" == typeof c && c;
            e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }
    b.VERSION = "3.3.7", b.DEFAULTS = {
        offset: 10
    }, b.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }, b.prototype.refresh = function() {
        var b = this,
            c = "offset",
            d = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), a.isWindow(this.$scrollElement[0]) || (c = "position", d = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function() {
            var b = a(this),
                e = b.data("target") || b.attr("href"),
                f = /^#./.test(e) && a(e);
            return f && f.length && f.is(":visible") && [
                [f[c]().top + d, e]
            ] || null
        }).sort(function(a, b) {
            return a[0] - b[0]
        }).each(function() {
            b.offsets.push(this[0]), b.targets.push(this[1])
        })
    }, b.prototype.process = function() {
        var a, b = this.$scrollElement.scrollTop() + this.options.offset,
            c = this.getScrollHeight(),
            d = this.options.offset + c - this.$scrollElement.height(),
            e = this.offsets,
            f = this.targets,
            g = this.activeTarget;
        if (this.scrollHeight != c && this.refresh(), b >= d) return g != (a = f[f.length - 1]) && this.activate(a);
        if (g && b < e[0]) return this.activeTarget = null, this.clear();
        for (a = e.length; a--;) g != f[a] && b >= e[a] && (void 0 === e[a + 1] || b < e[a + 1]) && this.activate(f[a])
    }, b.prototype.activate = function(b) {
        this.activeTarget = b, this.clear();
        var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
            d = a(c).parents("li").addClass("active");
        d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate.bs.scrollspy")
    }, b.prototype.clear = function() {
        a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };
    var d = a.fn.scrollspy;
    a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function() {
        return a.fn.scrollspy = d, this
    }, a(window).on("load.bs.scrollspy.data-api", function() {
        a('[data-spy="scroll"]').each(function() {
            var b = a(this);
            c.call(b, b.data())
        })
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.affix"),
                f = "object" == typeof b && b;
            e || d.data("bs.affix", e = new c(this, f)), "string" == typeof b && e[b]()
        })
    }
    var c = function(b, d) {
        this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(b), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
    };
    c.VERSION = "3.3.7", c.RESET = "affix affix-top affix-bottom", c.DEFAULTS = {
        offset: 0,
        target: window
    }, c.prototype.getState = function(a, b, c, d) {
        var e = this.$target.scrollTop(),
            f = this.$element.offset(),
            g = this.$target.height();
        if (null != c && "top" == this.affixed) return e < c && "top";
        if ("bottom" == this.affixed) return null != c ? !(e + this.unpin <= f.top) && "bottom" : !(e + g <= a - d) && "bottom";
        var h = null == this.affixed,
            i = h ? e : f.top,
            j = h ? g : b;
        return null != c && e <= c ? "top" : null != d && i + j >= a - d && "bottom"
    }, c.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(c.RESET).addClass("affix");
        var a = this.$target.scrollTop(),
            b = this.$element.offset();
        return this.pinnedOffset = b.top - a
    }, c.prototype.checkPositionWithEventLoop = function() {
        setTimeout(a.proxy(this.checkPosition, this), 1)
    }, c.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var b = this.$element.height(),
                d = this.options.offset,
                e = d.top,
                f = d.bottom,
                g = Math.max(a(document).height(), a(document.body).height());
            "object" != typeof d && (f = e = d), "function" == typeof e && (e = d.top(this.$element)), "function" == typeof f && (f = d.bottom(this.$element));
            var h = this.getState(g, b, e, f);
            if (this.affixed != h) {
                null != this.unpin && this.$element.css("top", "");
                var i = "affix" + (h ? "-" + h : ""),
                    j = a.Event(i + ".bs.affix");
                if (this.$element.trigger(j), j.isDefaultPrevented()) return;
                this.affixed = h, this.unpin = "bottom" == h ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == h && this.$element.offset({
                top: g - b - f
            })
        }
    };
    var d = a.fn.affix;
    a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function() {
        return a.fn.affix = d, this
    }, a(window).on("load", function() {
        a('[data-spy="affix"]').each(function() {
            var c = a(this),
                d = c.data();
            d.offset = d.offset || {}, null != d.offsetBottom && (d.offset.bottom = d.offsetBottom), null != d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d)
        })
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        var c, d = b.attr("data-target") || (c = b.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "");
        return a(d)
    }

    function c(b) {
        return this.each(function() {
            var c = a(this),
                e = c.data("bs.collapse"),
                f = a.extend({}, d.DEFAULTS, c.data(), "object" == typeof b && b);
            !e && f.toggle && /show|hide/.test(b) && (f.toggle = !1), e || c.data("bs.collapse", e = new d(this, f)), "string" == typeof b && e[b]()
        })
    }
    var d = function(b, c) {
        this.$element = a(b), this.options = a.extend({}, d.DEFAULTS, c), this.$trigger = a('[data-toggle="collapse"][href="#' + b.id + '"],[data-toggle="collapse"][data-target="#' + b.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
    };
    d.VERSION = "3.3.7", d.TRANSITION_DURATION = 350, d.DEFAULTS = {
        toggle: !0
    };
    var e = function(a) {
            return (a || "ui-id") + "-" + Math.floor(1e3 * Math.random() + 1)
        },
        f = a('[data-multipleAtATime="true"]');
    f && f.each(function() {
        a(this).attr({
            role: "tablist",
            "aria-multiselectable": "true"
        })
    });
    var g = a('[data-toggle="collapse"]:not(.navbar-toggle)');
    g.attr({
        role: "tab",
        "aria-expanded": "false"
    }), g.each(function() {
        var b = a(this),
            c = a(b.attr("data-target") ? b.attr("data-target") : b.attr("href")),
            d = b.attr("data-parent"),
            f = d && a(d),
            g = b.attr("id") || e("ui-collapse"),
            h = "";
        b.attr("id", g), f && (f.attr({
            role: "tablist"
        }), h = c.parent().children().first(), c.hasClass("in") ? (b.attr({
            "aria-controls": c.attr("id"),
            "aria-expanded": "true"
        }), b.hasClass("navbar-toggle") || c.attr({
            role: "tabpanel",
            tabindex: "0",
            "aria-labelledby": g,
            "aria-hidden": "false"
        })) : (b.attr({
            "aria-controls": c.attr("id")
        }), b.hasClass("navbar-toggle") || c.attr({
            role: "tabpanel",
            tabindex: "-1",
            "aria-labelledby": g,
            "aria-hidden": "true"
        }), h.hasClass("panel-heading") && b.addClass("collapsed")))
    }), d.prototype.dimension = function() {
        var a = this.$element.hasClass("width");
        return a ? "width" : "height"
    }, d.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var b, e = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(e && e.length && (b = e.data("bs.collapse"), b && b.transitioning))) {
                var f = a.Event("show.bs.collapse");
                if (this.$element.trigger(f), !f.isDefaultPrevented()) {
                    e && e.length && !a(this.options.parent).attr("data-multipleAtATime") && (c.call(e, "hide"), b || e.data("bs.collapse", null));
                    var g = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded", !0).attr("aria-hidden", !1).attr("tabindex", 0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var h = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[g](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    };
                    if (!a.support.transition) return h.call(this);
                    var i = a.camelCase(["scroll", g].join("-"));
                    this.$element.one("bsTransitionEnd", a.proxy(h, this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])
                }
            }
        }
    }, d.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var b = a.Event("hide.bs.collapse");
            if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                var c = this.dimension();
                this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1).attr("aria-expanded", !1).attr("aria-hidden", !0).attr("tabindex", -1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var e = function() {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(e, this)).emulateTransitionEnd(d.TRANSITION_DURATION) : e.call(this)
            }
        }
    }, d.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }, d.prototype.getParent = function() {
        return a(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(a.proxy(function(c, d) {
            var e = a(d);
            this.addAriaAndCollapsedClass(b(e), e)
        }, this)).end()
    }, d.prototype.addAriaAndCollapsedClass = function(a, b) {
        var c = a.hasClass("in");
        a.attr("aria-expanded", c), a.attr("aria-hidden", !c), a.attr("tabindex", c ? 0 : -1), b.toggleClass("collapsed", !c).attr("aria-expanded", c)
    };
    var h = a.fn.collapse;
    a.fn.collapse = c, a.fn.collapse.Constructor = d, a.fn.collapse.noConflict = function() {
        return a.fn.collapse = h, this
    }, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(d) {
        var e = a(this);
        e.attr("data-target") || d.preventDefault();
        var f = b(e),
            g = f.data("bs.collapse"),
            h = g ? "toggle" : e.data();
        c.call(f, h)
    }), a(".o-nav-local .nav-local.collapse a").on("click", function() {
        a(this).parent().parent().prev(".local-select").text(a(this).text())
    }), a(".o-nav-local .nav-local.collapse").on("shown.bs.collapse", function() {
        a(this).find("li:first-child a").focus()
    }), a(".o-nav-local .nav-local.collapse").on("hidden.bs.collapse", function() {
        a(this).prev(".local-select").focus()
    }), a(document).ready(function() {
        a(".o-nav-local .local-select").each(function() {
            a(this).text(a(this).next(".nav-local.collapse").find("li:first-child a").text())
        })
    }), a(document).on("click", function() {
        c.call(a(".o-nav-local .collapse.in"), "hide")
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.carousel"),
                f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b),
                g = "string" == typeof b ? b : f.slide;
            e || d.data("bs.carousel", e = new c(this, f)), "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle()
        })
    }
    var c = function(b, c) {
        this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", a.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this))
    };
    c.VERSION = "3.3.7", c.TRANSITION_DURATION = 600, c.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, c.prototype.keydown = function(a) {
        if (!/input|textarea/i.test(a.target.tagName)) {
            switch (a.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return
            }
            a.preventDefault()
        }
    }, c.prototype.cycle = function(b) {
        return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this
    }, c.prototype.getItemIndex = function(a) {
        return this.$items = a.parent().children(".item"), this.$items.index(a || this.$active)
    }, c.prototype.getItemForDirection = function(a, b) {
        var c = this.getItemIndex(b),
            d = "prev" == a && 0 === c || "next" == a && c == this.$items.length - 1;
        if (d && !this.options.wrap) return b;
        var e = "prev" == a ? -1 : 1,
            f = (c + e) % this.$items.length;
        return this.$items.eq(f)
    }, c.prototype.to = function(a) {
        var b = this,
            c = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        if (!(a > this.$items.length - 1 || a < 0)) return this.sliding ? this.$element.one("slid.bs.carousel", function() {
            b.to(a)
        }) : c == a ? this.pause().cycle() : this.slide(a > c ? "next" : "prev", this.$items.eq(a))
    }, c.prototype.pause = function(b) {
        return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, c.prototype.next = function() {
        if (!this.sliding) return this.slide("next")
    }, c.prototype.prev = function() {
        if (!this.sliding) return this.slide("prev")
    }, c.prototype.slide = function(b, d) {
        var e = this.$element.find(".item.active"),
            f = d || this.getItemForDirection(b, e),
            g = this.interval,
            h = "next" == b ? "left" : "right",
            i = this;
        if (f.hasClass("active")) return this.sliding = !1;
        var j = f[0],
            k = a.Event("slide.bs.carousel", {
                relatedTarget: j,
                direction: h
            });
        if (this.$element.trigger(k), !k.isDefaultPrevented()) {
            if (this.sliding = !0, g && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var l = a(this.$indicators.children()[this.getItemIndex(f)]);
                l && l.addClass("active")
            }
            var m = a.Event("slid.bs.carousel", {
                relatedTarget: j,
                direction: h
            });
            return a.support.transition && this.$element.hasClass("slide") ? (f.addClass(b), f[0].offsetWidth, e.addClass(h), f.addClass(h), e.one("bsTransitionEnd", function() {
                f.removeClass([b, h].join(" ")).addClass("active"), e.removeClass(["active", h].join(" ")), i.sliding = !1, setTimeout(function() {
                    i.$element.trigger(m)
                }, 0)
            }).emulateTransitionEnd(c.TRANSITION_DURATION)) : (e.removeClass("active"), f.addClass("active"), this.sliding = !1, this.$element.trigger(m)), g && this.cycle(), this
        }
    };
    var d = a.fn.carousel;
    a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function() {
        return a.fn.carousel = d, this
    };
    var e = function(c) {
        var d, e = a(this),
            f = a(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));
        if (f.hasClass("carousel")) {
            var g = a.extend({}, f.data(), e.data()),
                h = e.attr("data-slide-to");
            h && (g.interval = !1), b.call(f, g), h && f.data("bs.carousel").to(h), c.preventDefault()
        }
    };
    a(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e), a(window).on("load", function() {
        a('[data-ride="carousel"]').each(function() {
            var c = a(this);
            b.call(c, c.data())
        })
    }), a(".carousel-indicators").attr("aria-hidden", "true"), a(document).on("keydown.carousel.data-api", "div[role=option]", a.fn.carousel.Constructor.prototype.keydown)
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        var c = b.attr("data-target");
        c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
        var d = c && a(c),
            e = a(this).closest(".dropdown");
        return e.length || (e = b.parent()), d && d.length ? d : e
    }

    function c(c) {
        c && 3 === c.which || (a(e).remove(), a(f).each(function() {
            var d = a(this),
                e = b(d),
                f = {
                    relatedTarget: this
                };
            e.hasClass("open") && (c && "click" == c.type && /input|textarea/i.test(c.target.tagName) && a.contains(e[0], c.target) || (e.trigger(c = a.Event("hide.bs.dropdown", f)), c.isDefaultPrevented() || (d.attr("aria-expanded", "false"), e.removeClass("open").trigger(a.Event("hidden.bs.dropdown", f)), a(f.relatedTarget).trigger("focus"))))
        }))
    }

    function d(b) {
        return this.each(function() {
            var c = a(this),
                d = c.data("bs.dropdown");
            d || c.data("bs.dropdown", d = new g(this)), "string" == typeof b && d[b].call(c)
        })
    }
    var e = ".dropdown-backdrop",
        f = '[data-toggle="dropdown"]',
        g = function(b) {
            a(b).on("click.bs.dropdown", this.toggle)
        },
        h = a(f).parent().find("ul").attr("role", "menu"),
        i = h.find("li").attr("role", "presentation");
    i.find("a").attr({
        tabIndex: "0"
    }), g.VERSION = "3.3.7", g.prototype.toggle = function(d) {
        var e = a(this);
        if (!e.is(".disabled, :disabled")) {
            var f = b(e),
                g = f.hasClass("open");
            if (c(), !g) {
                "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click", c);
                var h = {
                    relatedTarget: this
                };
                if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return;
                e.attr("aria-expanded", "true"), f.toggleClass("open").trigger(a.Event("shown.bs.dropdown", h)), f.find(".dropdown-menu li.active").length > 0 ? f.find(".dropdown-menu li.active a").trigger("focus") : f.find(".dropdown-menu a").first().trigger("focus")
            }
            return !1
        }
    }, g.prototype.keydown = function(c) {
        if (/(37|38|39|40|27|32)/.test(c.which) && !/input|textarea/i.test(c.target.tagName)) {
            var d = a(this);
            if (c.preventDefault(), c.stopPropagation(), !d.is(".disabled, :disabled")) {
                var e = b(d),
                    g = e.hasClass("open");
                if (!g && 27 != c.which || g && 27 == c.which) return void(27 == c.which && e.find(f).trigger("focus"));
                var h = " li:not(.disabled):visible a",
                    i = e.find(".dropdown-menu" + h);
                if (i.length) {
                    var j = i.index(c.target);
                    (37 == c.which || 38 == c.which) && j > 0 && j--, (40 == c.which || 39 == c.which) && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).trigger("focus")
                }
            }
        }
    };
    var j = a.fn.dropdown;
    a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function() {
        return a.fn.dropdown = j, this
    }, a(document).on("click.bs.dropdown.data-api", c).on("click.bs.dropdown.data-api", ".dropdown form", function(a) {
        a.stopPropagation()
    }).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f, g.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", g.prototype.keydown)
}(jQuery),
    function(a) {
        "use strict";

        function b() {
            return "ui-" + (Math.random().toString(16) + "000000000").substr(2, 8)
        }
        var c = ".mega-menu ul.navbar-nav > li > a";
        a(document).on("keydown", c, function(b) {
            if (/(37|38|39|40)/.test(b.which)) {
                b.preventDefault(), b.stopPropagation();
                var d = b.which || b.keyCode,
                    e = a(c).index(b.target);
                (37 === d || 38 === d) && e > 0 && e--, (39 === d || 40 === d) && e < a(c).length - 1 && e++, a(c).eq(e).trigger("focus")
            }
        }), a(".mega-menu .dropdown-toggle").each(function() {
            var c = b(),
                d = a(this).next("ul.dropdown-menu"),
                e = b();
            a(this).attr("id", c), a(d).attr("id", e), a(this).attr("aria-owns", e), a(this).attr("aria-controls", e), a(d).attr("aria-labelledby", c);
        })
    }(jQuery), + function(a) {
    "use strict";

    function b(b, d) {
        return this.each(function() {
            var e = a(this),
                f = e.data("bs.modal"),
                g = a.extend({}, c.DEFAULTS, e.data(), "object" == typeof b && b);
            f || e.data("bs.modal", f = new c(this, g)), "string" == typeof b ? f[b](d) : g.show && f.show(d)
        })
    }
    var c = function(b, c) {
        this.options = c, this.$body = a(document.body), this.$element = a(b), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function() {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    c.VERSION = "3.3.7", c.TRANSITION_DURATION = 300, c.BACKDROP_TRANSITION_DURATION = 150, c.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    };
    var d = a('[data-toggle="modal"]');
    d.each(function() {
        var b = a(this),
            c = a(b.attr("data-target") ? b.attr("data-target") : b.attr("href"));
        c.attr({
            role: "dialog"
        });
        var d = c.find(".modal-title");
        if (d) {
            var e = d.attr("id");
            e && c.attr({
                "aria-labelledby": e
            })
        }
    }), a(".modal-dialog").attr({
        role: "document"
    }), c.prototype.toggle = function(a) {
        return this.isShown ? this.hide() : this.show(a)
    }, c.prototype.show = function(b) {
        var d = this,
            e = a.Event("show.bs.modal", {
                relatedTarget: b
            });
        this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function() {
            d.$element.one("mouseup.dismiss.bs.modal", function(b) {
                a(b.target).is(d.$element) && (d.ignoreBackdropClick = !0)
            })
        }), this.backdrop(function() {
            var e = a.support.transition && d.$element.hasClass("fade");
            d.$element.parent().length || d.$element.appendTo(d.$body), d.$element.show().scrollTop(0), d.adjustDialog(), e && d.$element[0].offsetWidth, d.$element.addClass("in"), d.enforceFocus();
            var f = a.Event("shown.bs.modal", {
                relatedTarget: b
            });
            e ? d.$dialog.one("bsTransitionEnd", function() {
                d.$element.trigger("focus").trigger(f)
            }).emulateTransitionEnd(c.TRANSITION_DURATION) : d.$element.trigger("focus").trigger(f)
        }))
    }, c.prototype.hide = function(b) {
        b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(c.TRANSITION_DURATION) : this.hideModal())
    }, c.prototype.enforceFocus = function() {
        a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function(a) {
            document === a.target || this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus")
        }, this))
    }, c.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", a.proxy(function(a) {
            27 == a.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    }, c.prototype.resize = function() {
        this.isShown ? a(window).on("resize.bs.modal", a.proxy(this.handleUpdate, this)) : a(window).off("resize.bs.modal")
    }, c.prototype.hideModal = function() {
        var a = this;
        this.$element.hide(), this.backdrop(function() {
            a.$body.removeClass("modal-open"), a.resetAdjustments(), a.resetScrollbar(), a.$element.trigger("hidden.bs.modal")
        })
    }, c.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, c.prototype.backdrop = function(b) {
        var d = this,
            e = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var f = a.support.transition && e;
            if (this.$backdrop = a(document.createElement("div")).addClass("modal-backdrop " + e).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", a.proxy(function(a) {
                return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
            }, this)), f && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;
            f ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : b()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var g = function() {
                d.removeBackdrop(), b && b()
            };
            a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : g()
        } else b && b()
    }, c.prototype.handleUpdate = function() {
        this.adjustDialog()
    }, c.prototype.adjustDialog = function() {
        var a = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && a ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !a ? this.scrollbarWidth : ""
        })
    }, c.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        })
    }, c.prototype.checkScrollbar = function() {
        var a = window.innerWidth;
        if (!a) {
            var b = document.documentElement.getBoundingClientRect();
            a = b.right - Math.abs(b.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < a, this.scrollbarWidth = this.measureScrollbar()
    }, c.prototype.setScrollbar = function() {
        var a = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", a + this.scrollbarWidth)
    }, c.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", this.originalBodyPad)
    }, c.prototype.measureScrollbar = function() {
        var a = document.createElement("div");
        a.className = "modal-scrollbar-measure", this.$body.append(a);
        var b = a.offsetWidth - a.clientWidth;
        return this.$body[0].removeChild(a), b
    };
    var e = a.fn.modal;
    a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function() {
        return a.fn.modal = e, this
    }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(c) {
        var d = a(this),
            e = d.attr("href"),
            f = a(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")),
            g = f.data("bs.modal") ? "toggle" : a.extend({
                remote: !/#/.test(e) && e
            }, f.data(), d.data());
        d.is("a") && c.preventDefault(), f.one("show.bs.modal", function(a) {
            a.isDefaultPrevented() || f.one("hidden.bs.modal", function() {
                d.is(":visible") && d.trigger("focus")
            })
        }), b.call(f, g, this)
    })
}(jQuery),
    function($) {
        $.extend({
            tablesorter: new function() {
                function benchmark(a, b) {
                    log(a + "," + ((new Date).getTime() - b.getTime()) + "ms")
                }

                function log(a) {
                    "undefined" != typeof console && "undefined" != typeof console.debug ? console.log(a) : alert(a)
                }

                function buildParserCache(a, b) {
                    if (a.config.debug) var c = "";
                    if (0 != a.tBodies.length) {
                        var d = a.tBodies[0].rows;
                        if (d[0])
                            for (var e = [], f = d[0].cells, g = f.length, h = 0; h < g; h++) {
                                var i = !1;
                                $.metadata && $(b[h]).metadata() && $(b[h]).metadata().sorter ? i = getParserById($(b[h]).metadata().sorter) : a.config.headers[h] && a.config.headers[h].sorter && (i = getParserById(a.config.headers[h].sorter)), i || (i = detectParserForColumn(a, d, -1, h)), a.config.debug && (c += "column:" + h + " parser:" + i.id + "\n"), e.push(i)
                            }
                        return a.config.debug && log(c), e
                    }
                }

                function detectParserForColumn(a, b, c, d) {
                    for (var e = parsers.length, f = !1, g = !1, h = !0;
                         "" == g && h;) c++, b[c] ? (f = getNodeFromRowAndCellIndex(b, c, d), g = trimAndGetNodeText(a.config, f), a.config.debug && log("Checking if value was empty on row:" + c)) : h = !1;
                    for (var i = 1; i < e; i++)
                        if (parsers[i].is(g, a, f)) return parsers[i];
                    return parsers[0]
                }

                function getNodeFromRowAndCellIndex(a, b, c) {
                    return a[b].cells[c]
                }

                function trimAndGetNodeText(a, b) {
                    return $.trim(getElementText(a, b))
                }

                function getParserById(a) {
                    for (var b = parsers.length, c = 0; c < b; c++)
                        if (parsers[c].id.toLowerCase() == a.toLowerCase()) return parsers[c];
                    return !1
                }

                function buildCache(a) {
                    if (a.config.debug) var b = new Date;
                    for (var c = a.tBodies[0] && a.tBodies[0].rows.length || 0, d = a.tBodies[0].rows[0] && a.tBodies[0].rows[0].cells.length || 0, e = a.config.parsers, f = {
                        row: [],
                        normalized: []
                    }, g = 0; g < c; ++g) {
                        var h = $(a.tBodies[0].rows[g]),
                            i = [];
                        if (h.hasClass(a.config.cssChildRow)) f.row[f.row.length - 1] = f.row[f.row.length - 1].add(h);
                        else {
                            f.row.push(h);
                            for (var j = 0; j < d; ++j) i.push(e[j].format(getElementText(a.config, h[0].cells[j]), a, h[0].cells[j]));
                            i.push(f.normalized.length), f.normalized.push(i), i = null
                        }
                    }
                    return a.config.debug && benchmark("Building cache for " + c + " rows:", b), f
                }

                function getElementText(a, b) {
                    var c = "";
                    return b ? (a.supportsTextContent || (a.supportsTextContent = b.textContent || !1), c = "simple" == a.textExtraction ? a.supportsTextContent ? b.textContent : b.childNodes[0] && b.childNodes[0].hasChildNodes() ? b.childNodes[0].innerHTML : b.innerHTML : "function" == typeof a.textExtraction ? a.textExtraction(b) : $(b).text()) : ""
                }

                function appendToTable(a, b) {
                    if (a.config.debug) var c = new Date;
                    for (var d = b, e = d.row, f = d.normalized, g = f.length, h = f[0].length - 1, i = $(a.tBodies[0]), j = [], k = 0; k < g; k++) {
                        var l = f[k][h];
                        if (j.push(e[l]), !a.config.appender)
                            for (var m = e[l].length, n = 0; n < m; n++) i[0].appendChild(e[l][n])
                    }
                    a.config.appender && a.config.appender(a, j), j = null, a.config.debug && benchmark("Rebuilt table:", c), applyWidget(a), setTimeout(function() {
                        $(a).trigger("sortEnd")
                    }, 0)
                }

                function buildHeaders(a) {
                    if (a.config.debug) var b = new Date;
                    var c = (!!$.metadata, computeTableHeaderCellIndexes(a));
                    return $tableHeaders = $(a.config.selectorHeaders, a).each(function(b) {
                        if (this.column = c[this.parentNode.rowIndex + "-" + this.cellIndex], this.order = formatSortingOrder(a.config.sortInitialOrder), this.count = this.order, (checkHeaderMetadata(this) || checkHeaderOptions(a, b)) && (this.sortDisabled = !0), checkHeaderOptionsSortingLocked(a, b) && (this.order = this.lockedOrder = checkHeaderOptionsSortingLocked(a, b)), !this.sortDisabled) {
                            var d = $(this).addClass(a.config.cssHeader);
                            a.config.onRenderHeader && a.config.onRenderHeader.apply(d)
                        }
                        a.config.headerList[b] = this
                    }), a.config.debug && (benchmark("Built headers:", b), log($tableHeaders)), $tableHeaders
                }

                function computeTableHeaderCellIndexes(a) {
                    for (var b = [], c = {}, d = a.getElementsByTagName("THEAD")[0], e = d.getElementsByTagName("TR"), f = 0; f < e.length; f++)
                        for (var g = e[f].cells, h = 0; h < g.length; h++) {
                            var i, j = g[h],
                                k = j.parentNode.rowIndex,
                                l = k + "-" + j.cellIndex,
                                m = j.rowSpan || 1,
                                n = j.colSpan || 1;
                            "undefined" == typeof b[k] && (b[k] = []);
                            for (var o = 0; o < b[k].length + 1; o++)
                                if ("undefined" == typeof b[k][o]) {
                                    i = o;
                                    break
                                }
                            c[l] = i;
                            for (var o = k; o < k + m; o++) {
                                "undefined" == typeof b[o] && (b[o] = []);
                                for (var p = b[o], q = i; q < i + n; q++) p[q] = "x"
                            }
                        }
                    return c
                }

                function checkCellColSpan(a, b, c) {
                    for (var d = [], e = a.tHead.rows, f = e[c].cells, g = 0; g < f.length; g++) {
                        var h = f[g];
                        h.colSpan > 1 ? d = d.concat(checkCellColSpan(a, headerArr, c++)) : (1 == a.tHead.length || h.rowSpan > 1 || !e[c + 1]) && d.push(h)
                    }
                    return d
                }

                function checkHeaderMetadata(a) {
                    return !(!$.metadata || $(a).metadata().sorter !== !1)
                }

                function checkHeaderOptions(a, b) {
                    return !(!a.config.headers[b] || a.config.headers[b].sorter !== !1)
                }

                function checkHeaderOptionsSortingLocked(a, b) {
                    return !(!a.config.headers[b] || !a.config.headers[b].lockedOrder) && a.config.headers[b].lockedOrder
                }

                function applyWidget(a) {
                    for (var b = a.config.widgets, c = b.length, d = 0; d < c; d++) getWidgetById(b[d]).format(a)
                }

                function getWidgetById(a) {
                    for (var b = widgets.length, c = 0; c < b; c++)
                        if (widgets[c].id.toLowerCase() == a.toLowerCase()) return widgets[c]
                }

                function formatSortingOrder(a) {
                    return "Number" != typeof a ? "desc" == a.toLowerCase() ? 1 : 0 : 1 == a ? 1 : 0
                }

                function isValueInArray(a, b) {
                    for (var c = b.length, d = 0; d < c; d++)
                        if (b[d][0] == a) return !0;
                    return !1
                }

                function setHeadersCss(a, b, c, d) {
                    var e = ["descending", "ascending"];
                    b.removeClass(d[0]).removeClass(d[1]), b.attr({
                        "aria-sort": "none"
                    });
                    var f = [];
                    b.each(function(a) {
                        this.sortDisabled || (f[this.column] = $(this))
                    });
                    for (var g = c.length, h = 0; h < g; h++) f[c[h][0]].addClass(d[c[h][1]]), f[c[h][0]].attr({
                        "aria-sort": e[c[h][1]]
                    })
                }

                function fixColumnWidth(a, b) {
                    var c = a.config;
                    if (c.widthFixed) {
                        var d = $("<colgroup>");
                        $("tr:first td", a.tBodies[0]).each(function() {
                            d.append($("<col>").css("width", $(this).width()))
                        }), $(a).prepend(d)
                    }
                }

                function updateHeaderSortCount(a, b) {
                    for (var c = a.config, d = b.length, e = 0; e < d; e++) {
                        var f = b[e],
                            g = c.headerList[f[0]];
                        g.count = f[1], g.count++
                    }
                }

                function multisort(table, sortList, cache) {
                    if (table.config.debug) var sortTime = new Date;
                    for (var dynamicExp = "var sortWrapper = function(a,b) {", l = sortList.length, i = 0; i < l; i++) {
                        var c = sortList[i][0],
                            order = sortList[i][1],
                            s = "text" == table.config.parsers[c].type ? 0 == order ? makeSortFunction("text", "asc", c) : makeSortFunction("text", "desc", c) : 0 == order ? makeSortFunction("numeric", "asc", c) : makeSortFunction("numeric", "desc", c),
                            e = "e" + i;
                        dynamicExp += "var " + e + " = " + s, dynamicExp += "if(" + e + ") { return " + e + "; } ", dynamicExp += "else { "
                    }
                    var orgOrderCol = cache.normalized[0].length - 1;
                    dynamicExp += "return a[" + orgOrderCol + "]-b[" + orgOrderCol + "];";
                    for (var i = 0; i < l; i++) dynamicExp += "}; ";
                    return dynamicExp += "return 0; ", dynamicExp += "}; ", table.config.debug && benchmark("Evaling expression:" + dynamicExp, new Date), eval(dynamicExp), cache.normalized.sort(sortWrapper), table.config.debug && benchmark("Sorting on " + sortList.toString() + " and dir " + order + " time:", sortTime), cache
                }

                function makeSortFunction(a, b, c) {
                    var d = "a[" + c + "]",
                        e = "b[" + c + "]";
                    return "text" == a && "asc" == b ? "(" + d + " == " + e + " ? 0 : (" + d + " === null ? Number.POSITIVE_INFINITY : (" + e + " === null ? Number.NEGATIVE_INFINITY : (" + d + " < " + e + ") ? -1 : 1 )));" : "text" == a && "desc" == b ? "(" + d + " == " + e + " ? 0 : (" + d + " === null ? Number.POSITIVE_INFINITY : (" + e + " === null ? Number.NEGATIVE_INFINITY : (" + e + " < " + d + ") ? -1 : 1 )));" : "numeric" == a && "asc" == b ? "(" + d + " === null && " + e + " === null) ? 0 :(" + d + " === null ? Number.POSITIVE_INFINITY : (" + e + " === null ? Number.NEGATIVE_INFINITY : " + d + " - " + e + "));" : "numeric" == a && "desc" == b ? "(" + d + " === null && " + e + " === null) ? 0 :(" + d + " === null ? Number.POSITIVE_INFINITY : (" + e + " === null ? Number.NEGATIVE_INFINITY : " + e + " - " + d + "));" : void 0
                }

                function makeSortText(a) {
                    return "((a[" + a + "] < b[" + a + "]) ? -1 : ((a[" + a + "] > b[" + a + "]) ? 1 : 0));"
                }

                function makeSortTextDesc(a) {
                    return "((b[" + a + "] < a[" + a + "]) ? -1 : ((b[" + a + "] > a[" + a + "]) ? 1 : 0));"
                }

                function makeSortNumeric(a) {
                    return "a[" + a + "]-b[" + a + "];"
                }

                function makeSortNumericDesc(a) {
                    return "b[" + a + "]-a[" + a + "];"
                }

                function sortText(a, b) {
                    return table.config.sortLocaleCompare ? a.localeCompare(b) : a < b ? -1 : a > b ? 1 : 0
                }

                function sortTextDesc(a, b) {
                    return table.config.sortLocaleCompare ? b.localeCompare(a) : b < a ? -1 : b > a ? 1 : 0
                }

                function sortNumeric(a, b) {
                    return a - b
                }

                function sortNumericDesc(a, b) {
                    return b - a
                }

                function getCachedSortType(a, b) {
                    return a[b].type
                }
                var parsers = [],
                    widgets = [];
                this.defaults = {
                    cssHeader: "header",
                    cssAsc: "headerSortUp",
                    cssDesc: "headerSortDown",
                    cssChildRow: "expand-child",
                    sortInitialOrder: "asc",
                    sortMultiSortKey: "shiftKey",
                    sortForce: null,
                    sortAppend: null,
                    sortLocaleCompare: !0,
                    textExtraction: "simple",
                    parsers: {},
                    widgets: [],
                    widgetZebra: {
                        css: ["even", "odd"]
                    },
                    headers: {},
                    widthFixed: !1,
                    cancelSelection: !0,
                    sortList: [],
                    headerList: [],
                    dateFormat: "us",
                    decimal: "/.|,/g",
                    onRenderHeader: null,
                    selectorHeaders: "thead th",
                    debug: !1
                }, this.benchmark = benchmark, this.construct = function(a) {
                    return this.each(function() {
                        if (this.tHead && this.tBodies) {
                            var b, c, d, e;
                            this.config = {}, e = $.extend(this.config, $.tablesorter.defaults, a), b = $(this), $.data(this, "tablesorter", e), c = buildHeaders(this), this.config.parsers = buildParserCache(this, c), d = buildCache(this);
                            var f = [e.cssDesc, e.cssAsc];
                            fixColumnWidth(this), c.click(function(a) {
                                var g = b[0].tBodies[0] && b[0].tBodies[0].rows.length || 0;
                                if (!this.sortDisabled && g > 0) {
                                    b.trigger("sortStart");
                                    var h = ($(this), this.column);
                                    if (this.order = this.count++ % 2, this.lockedOrder && (this.order = this.lockedOrder), a[e.sortMultiSortKey])
                                        if (isValueInArray(h, e.sortList))
                                            for (var i = 0; i < e.sortList.length; i++) {
                                                var j = e.sortList[i],
                                                    k = e.headerList[j[0]];
                                                j[0] == h && (k.count = j[1], k.count++, j[1] = k.count % 2)
                                            } else e.sortList.push([h, this.order]);
                                    else {
                                        if (e.sortList = [], null != e.sortForce)
                                            for (var l = e.sortForce, i = 0; i < l.length; i++) l[i][0] != h && e.sortList.push(l[i]);
                                        e.sortList.push([h, this.order])
                                    }
                                    return setTimeout(function() {
                                        setHeadersCss(b[0], c, e.sortList, f), appendToTable(b[0], multisort(b[0], e.sortList, d))
                                    }, 1), !1
                                }
                            }).mousedown(function() {
                                if (e.cancelSelection) return this.onselectstart = function() {
                                    return !1
                                }, !1
                            }), b.bind("update", function() {
                                var a = this;
                                setTimeout(function() {
                                    a.config.parsers = buildParserCache(a, c), d = buildCache(a)
                                }, 1)
                            }).bind("updateCell", function(a, b) {
                                var c = this.config,
                                    e = [b.parentNode.rowIndex - 1, b.cellIndex];
                                d.normalized[e[0]][e[1]] = c.parsers[e[1]].format(getElementText(c, b), b)
                            }).bind("sorton", function(a, b) {
                                $(this).trigger("sortStart"), e.sortList = b;
                                var g = e.sortList;
                                updateHeaderSortCount(this, g), setHeadersCss(this, c, g, f), appendToTable(this, multisort(this, g, d))
                            }).bind("appendCache", function() {
                                appendToTable(this, d)
                            }).bind("applyWidgetId", function(a, b) {
                                getWidgetById(b).format(this)
                            }).bind("applyWidgets", function() {
                                applyWidget(this)
                            }), $.metadata && $(this).metadata() && $(this).metadata().sortlist && (e.sortList = $(this).metadata().sortlist), e.sortList.length > 0 && b.trigger("sorton", [e.sortList]), applyWidget(this)
                        }
                    })
                }, this.addParser = function(a) {
                    for (var b = parsers.length, c = !0, d = 0; d < b; d++) parsers[d].id.toLowerCase() == a.id.toLowerCase() && (c = !1);
                    c && parsers.push(a)
                }, this.addWidget = function(a) {
                    widgets.push(a)
                }, this.formatFloat = function(a) {
                    var b = parseFloat(a);
                    return isNaN(b) ? 0 : b
                }, this.formatInt = function(a) {
                    var b = parseInt(a);
                    return isNaN(b) ? 0 : b
                }, this.isDigit = function(a, b) {
                    return /^[-+]?\d*$/.test($.trim(a.replace(/[,.']/g, "")))
                }, this.clearTableBody = function(a) {
                    a.tBodies[0].innerHTML = ""
                }
            }
        }), $.fn.extend({
            tablesorter: $.tablesorter.construct
        });
        var ts = $.tablesorter;
        ts.addParser({
            id: "text",
            is: function(a) {
                return !0
            },
            format: function(a) {
                return $.trim(a.toLocaleLowerCase())
            },
            type: "text"
        }), ts.addParser({
            id: "digit",
            is: function(a, b) {
                var c = b.config;
                return $.tablesorter.isDigit(a, c)
            },
            format: function(a) {
                return $.tablesorter.formatFloat(a)
            },
            type: "numeric"
        }), ts.addParser({
            id: "currency",
            is: function(a) {
                return /^[£$€?.]/.test(a)
            },
            format: function(a) {
                return $.tablesorter.formatFloat(a.replace(new RegExp(/[£$€]/g), ""))
            },
            type: "numeric"
        }), ts.addParser({
            id: "ipAddress",
            is: function(a) {
                return /^\d{2,3}[\.]\d{2,3}[\.]\d{2,3}[\.]\d{2,3}$/.test(a)
            },
            format: function(a) {
                for (var b = a.split("."), c = "", d = b.length, e = 0; e < d; e++) {
                    var f = b[e];
                    c += 2 == f.length ? "0" + f : f
                }
                return $.tablesorter.formatFloat(c)
            },
            type: "numeric"
        }), ts.addParser({
            id: "url",
            is: function(a) {
                return /^(https?|ftp|file):\/\/$/.test(a)
            },
            format: function(a) {
                return jQuery.trim(a.replace(new RegExp(/(https?|ftp|file):\/\//), ""))
            },
            type: "text"
        }), ts.addParser({
            id: "isoDate",
            is: function(a) {
                return /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(a)
            },
            format: function(a) {
                return $.tablesorter.formatFloat("" != a ? new Date(a.replace(new RegExp(/-/g), "/")).getTime() : "0")
            },
            type: "numeric"
        }), ts.addParser({
            id: "percent",
            is: function(a) {
                return /\%$/.test($.trim(a))
            },
            format: function(a) {
                return $.tablesorter.formatFloat(a.replace(new RegExp(/%/g), ""))
            },
            type: "numeric"
        }), ts.addParser({
            id: "usLongDate",
            is: function(a) {
                return a.match(new RegExp(/^[A-Za-z]{3,10}\.? [0-9]{1,2}, ([0-9]{4}|'?[0-9]{2}) (([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(AM|PM)))$/))
            },
            format: function(a) {
                return $.tablesorter.formatFloat(new Date(a).getTime())
            },
            type: "numeric"
        }), ts.addParser({
            id: "shortDate",
            is: function(a) {
                return /\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/.test(a)
            },
            format: function(a, b) {
                var c = b.config;
                return a = a.replace(/\-/g, "/"), "us" == c.dateFormat ? a = a.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/, "$3/$1/$2") : "uk" == c.dateFormat ? a = a.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/, "$3/$2/$1") : "dd/mm/yy" != c.dateFormat && "dd-mm-yy" != c.dateFormat || (a = a.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2})/, "$1/$2/$3")), $.tablesorter.formatFloat(new Date(a).getTime())
            },
            type: "numeric"
        }), ts.addParser({
            id: "time",
            is: function(a) {
                return /^(([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(am|pm)))$/.test(a)
            },
            format: function(a) {
                return $.tablesorter.formatFloat(new Date("2000/01/01 " + a).getTime())
            },
            type: "numeric"
        }), ts.addParser({
            id: "metadata",
            is: function(a) {
                return !1
            },
            format: function(a, b, c) {
                var d = b.config,
                    e = d.parserMetadataName ? d.parserMetadataName : "sortValue";
                return $(c).metadata()[e]
            },
            type: "numeric"
        }), ts.addWidget({
            id: "zebra",
            format: function(a) {
                if (a.config.debug) var b = new Date;
                var c, d, e = -1;
                $("tr:visible", a.tBodies[0]).each(function(b) {
                    c = $(this), c.hasClass(a.config.cssChildRow) || e++, d = e % 2 == 0, c.removeClass(a.config.widgetZebra.css[d ? 0 : 1]).addClass(a.config.widgetZebra.css[d ? 1 : 0])
                }), a.config.debug && $.tablesorter.benchmark("Applying Zebra widget", b)
            }
        })
    }(jQuery), $(document).ready(function() {
    "use strict";
    "function" == typeof validate && ($("form").validate({
        errorPlacement: function(a, b) {
            a.appendTo("label[for=" + $(b).attr("id") + "]")
        },
        errorElement: "em"
    }), $("#sign-up input:not([type=submit]):not([type=file])[title]").each(function() {
        var a = $(this).attr("title");
        $(this).attr("x-moz-errormessage", a)
    }), $("form").removeAttr("novalidate")), $(".toggle .checkbox:checked").each(function() {
        $(this).toggleClass("checked", !0)
    }), $(".toggle .checkbox").on("click", function() {
        $(this).toggleClass("checked", $(this).prop("checked")), $(this).parent().toggleClass("forceiepaint")
    }), $(".toggle .checkbox").parent().find("label").on("click", function(a) {
        $("#" + $(this).attr("for")).trigger("click"), a.preventDefault(), a.stopPropagation()
    })
}), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.tab");
            e || d.data("bs.tab", e = new c(this)), "string" == typeof b && e[b]()
        })
    }
    var c = function(b) {
        this.element = a(b)
    };
    c.VERSION = "3.3.7", c.TRANSITION_DURATION = 150;
    var d = function(a) {
            return (a || "ui-id") + "-" + Math.floor(1e3 * Math.random() + 1)
        },
        e = a(".nav-tabs, .nav-pills"),
        f = e.children("li"),
        g = e.find('[data-toggle="tab"], [data-toggle="pill"]');
    e.attr("role", "tablist"), f.attr("role", "presentation"), g.attr("role", "tab"), g.each(function() {
        var b = a(a(this).attr("href")),
            c = a(this),
            e = c.attr("id") || d("ui-tab");
        c.attr("id", e), c.parent().hasClass("active") ? (c.attr({
            tabIndex: "0",
            "aria-selected": "true",
            "aria-controls": c.attr("href").substr(1)
        }), b.attr({
            role: "tabpanel",
            tabIndex: "0",
            "aria-hidden": "false",
            "aria-labelledby": e
        })) : (c.attr({
            tabIndex: "-1",
            "aria-selected": "false",
            "aria-controls": c.attr("href").substr(1)
        }), b.attr({
            role: "tabpanel",
            tabIndex: "-1",
            "aria-hidden": "true",
            "aria-labelledby": e
        }))
    }), c.prototype.keydown = function(b) {
        var c, d, e = a(this),
            f = e.closest("ul[role=tablist] "),
            g = b.which || b.keyCode;
        if (e = a(this), /(37|38|39|40)/.test(g)) {
            c = f.find("[role=tab]:visible"), d = c.index(c.filter(":focus")), 38 != g && 37 != g || d--, 39 != g && 40 != g || d++, d < 0 && (d = c.length - 1), d == c.length && (d = 0);
            var h = c.eq(d);
            "tab" === h.attr("role") && h.tab("show").focus(), b.preventDefault(), b.stopPropagation()
        }
    }, a(document).on("keydown.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', c.prototype.keydown), c.prototype.show = function() {
        var b = this.element,
            c = b.closest("ul:not(.dropdown-menu)"),
            d = b.data("target");
        if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
            var e = c.find(".active:last a"),
                f = a.Event("hide.bs.tab", {
                    relatedTarget: b[0]
                }),
                g = a.Event("show.bs.tab", {
                    relatedTarget: e[0]
                });
            if (e.trigger(f), b.trigger(g), !g.isDefaultPrevented() && !f.isDefaultPrevented()) {
                var h = a(d);
                this.activate(b.closest("li"), c), this.activate(h, h.parent(), function() {
                    e.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: b[0]
                    }), b.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: e[0]
                    })
                })
            }
        }
    }, c.prototype.activate = function(b, d, e) {
        function f() {
            g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), b.find("[data-toggle=tab], [data-toggle=pill]").attr({
                tabIndex: "0",
                "aria-selected": !0
            }), b.filter(".tab-pane").attr({
                "aria-hidden": !1,
                tabIndex: "0"
            }), h ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu").length && b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), e && e()
        }
        var g = d.find("> .active"),
            h = e && a.support.transition && (g.length && g.hasClass("fade") || !!d.find("> .fade").length);
        g.find("[data-toggle=tab], [data-toggle=pill]").attr({
            tabIndex: "-1",
            "aria-selected": !1
        }), g.filter(".tab-pane").attr({
            "aria-hidden": !0,
            tabIndex: "-1"
        }), g.length && h ? g.one("bsTransitionEnd", f).emulateTransitionEnd(c.TRANSITION_DURATION) : f(), g.removeClass("in")
    };
    var h = a.fn.tab;
    a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function() {
        return a.fn.tab = h, this
    };
    var i = function(c) {
        c.preventDefault(), b.call(a(this), "show")
    };
    a(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', i).on("click.bs.tab.data-api", '[data-toggle="pill"]', i)
}(jQuery),
    function(a) {
        "use strict";
        var b = function(b, d) {
                var e, f, g, h = b.nodeName.toLowerCase();
                return "area" === h ? (e = b.parentNode, f = e.name, !(!b.href || !f || "map" !== e.nodeName.toLowerCase()) && (g = a("img[usemap='#" + f + "']")[0], !!g && c(g))) : (/input|select|textarea|button|object/.test(h) ? !b.disabled : "a" === h ? b.href || d : d) && c(b)
            },
            c = function(b) {
                return a.expr.filters.visible(b) && !a(b).parents().addBack().filter(function() {
                    return "hidden" === a.css(this, "visibility")
                }).length
            };
        a.extend(a.expr[":"], {
            data: a.expr.createPseudo ? a.expr.createPseudo(function(b) {
                return function(c) {
                    return !!a.data(c, b)
                }
            }) : function(b, c, d) {
                return !!a.data(b, d[3])
            },
            focusable: function(c) {
                return b(c, !isNaN(a.attr(c, "tabindex")))
            },
            tabbable: function(c) {
                var d = a.attr(c, "tabindex"),
                    e = isNaN(d);
                return (e || d >= 0) && b(c, !e)
            }
        }), a(".alert").attr("role", "alert"), a(".close").removeAttr("aria-hidden").wrapInner('<span aria-hidden="true"></span>').append('<span class="sr-only">Close</span>'), a(".modal-dialog").attr({
            role: "document"
        });
        var d = a.fn.modal.Constructor.prototype.hide;
        a.fn.modal.Constructor.prototype.hide = function() {
            var b = this.$element.parent().find('[data-target="#' + this.$element.attr("id") + '"]');
            d.apply(this, arguments), b.focus(), a(document).off("keydown.bs.modal")
        };
        var e = a.fn.modal.Constructor.prototype.enforceFocus;
        a.fn.modal.Constructor.prototype.enforceFocus = function() {
            var b = this.$element.find(":tabbable"),
                c = b[b.length - 1];
            a(document).on("keydown.bs.modal", a.proxy(function(a) {
                !this.$element.has(a.target).length && a.shiftKey && 9 === a.keyCode && (c.focus(), a.preventDefault())
            }, this)), e.apply(this, arguments)
        }
    }(jQuery);
