var xxx;
NProgress.start(),
jQuery(window).resize(function() {
    768 > roar.getWidthBrowser() && $("#popup-mailchimp.hidden-xs").find(".mfp-close").trigger("click")
}),
jQuery(document).ready(function() {
    try {
        roar.initLazyLoading(),
        roar.init(),
        roarLookbook.init(),
        theme.CurrencyPicker.init(),
        theme.LanguagePicker.init()
    } finally {
        NProgress.done()
    }
}),
jQuery(window).load(function() {
    roar.initLazyLoading(),
    setTimeout(function() {
        roar.handleSeasonalFrame()
    }, 3e3)
});
var roar = {
    init: function() {
        this.handleAccount(),
        this.handleCartAgree(),
        this.handleAddress(),
        this.initProductQuickShopItem(),
        this.initFilterSidebar(),
        this.initFooterCollapse(),
        this.initVerticalMenuSidebar(),
        this.initChangeInputNameCartPage(),
        this.handleOrder(),
        this.initCountdown(),
        this.addToCart(),
        this.cartSidebar(),
        this.removeCart(),
        this.addToWishlist(),
        this.handleCompare(),
        this.removeToWishlist(),
        this.handlePopups(),
        this.handleSearch(),
        this.handleGMap(),
        this.handleScrollToTop(),
        this.handleSmoothScroll(),
        this.mapFilters(),
        this.handleQuickshop(),
        this.handleBlog(),
        this.handleCookie(),
        this.fixedHeaderMenu(),
        this.searchAutoComplete(),
        this.handleDropdown(),
        this.toggleFilter(),
        this.handleHeaderNotice(),
        this.handleInstagramFloatBar()
    },
    handleSeasonalFrame: function() {
        jQuery(window).resize(function() {
            if (0 < $(".rt-seasonal-frames").length) {
                var y = !1;
                if (!1 == $(".rt-seasonal-frames").data("mobile") && 768 < roar.getWidthBrowser() && (y = !0),
                !0 == $(".rt-seasonal-frames").data("mobile") && (y = !0),
                !0 == y) {
                    $(".rt-seasonal-frames").show();
                    for (var S = $(".rt-seasonal-frames"), T = S.data("ow"), P = S.data("oh"), I = 0; I < S.children().length; I++) {
                        var B, D, W, H, A = $(S.children()[I]), z = A.data("position"), N = A.data("idx"), L = A.data("w"), M = A.data("h"), q = A.data("x"), O = A.data("y"), F = A.data("src"), E = 1e3 + N;
                        "top" == z || "bottom" == z ? (B = window.innerWidth / T,
                        D = L * B,
                        _newHeight = M * B,
                        W = q * B,
                        H = "top" == z ? O * B : (P - O - M) * B,
                        A.html(""),
                        A.html("<img width=\"" + D + "\" height=\"" + _newHeight + "\" style=\"z-index:" + E + ";left:" + W + "px;" + z + ":" + H + "px\" src=\"" + F + "\"/>")) : (B = window.innerHeight / P,
                        D = L * B,
                        _newHeight = M * B,
                        H = O * B,
                        W = "left" == z ? q * B : (T - q - L) * B,
                        A.html(""),
                        A.html("<img width=\"" + D + "\" height=\"" + _newHeight + "\" style=\"z-index:" + E + ";top:" + H + "px;" + z + ":" + W + "px\" src=\"" + F + "\"/>"))
                    }
                } else
                    $(".rt-seasonal-frames").hide()
            }
        }).resize()
    },
    handleCartAgree: function() {
        $("body").on("change", ".product-cart__agree", function() {
            var S = $(this)
              , T = $(this).closest(".cart__condition__wrapper").find(".checkout-button");
            S.is(":checked") ? T.removeClass("btn-disabled") : T.addClass("btn-disabled")
        })
    },
    handleAddress: function() {
        var y = $("#AddressNewForm");
        y.length && (Shopify && new Shopify.CountryProvinceSelector("AddressCountryNew","AddressProvinceNew",{
            hideElement: "AddressProvinceContainerNew"
        }),
        $(".address-country-option").each(function() {
            var S = $(this).data("form-id");
            new Shopify.CountryProvinceSelector("AddressCountry_" + S,"AddressProvince_" + S,{
                hideElement: "AddressProvinceContainer_" + S
            })
        }),
        $(".address-new-toggle").on("click", function() {
            y.toggleClass("hide")
        }),
        $(".address-edit-toggle").on("click", function() {
            var S = $(this).data("form-id");
            $("#EditAddress_" + S).toggleClass("hide")
        }),
        $(".address-delete").on("click", function() {
            var S = $(this)
              , T = S.data("form-id")
              , P = S.data("confirm-message");
            confirm(P || "Are you sure you wish to delete this address?") && Shopify.postLink("/account/addresses/" + T, {
                parameters: {
                    _method: "delete"
                }
            })
        }))
    },
    handleAccount: function() {
        function y() {
            return $("#recover-password").fadeIn(),
            $("#customer-login").hide(),
            window.location.hash = "#recover",
            !1
        }
        function S() {
            return $("#recover-password").hide(),
            $("#customer-login").fadeIn(),
            window.location.hash = "",
            !1
        }
        $("#forgot_password a").click(function() {
            y()
        }),
        "#recover" == window.location.hash ? y() : S(),
        $("#recover-password .cancel").click(function() {
            S()
        })
    },
    handleHeaderNotice: function() {
        if (window.hn_use) {
            var y = !0;
            window.hn_once && "yes" == localStorage.getItem("displayNotice") && (y = !1),
            !0 == y && ($("#header-notice .header-notice").children().show(),
            $("#header-notice .close-notice").on("click", function() {
                return window.hn_once && localStorage.setItem("displayNotice", "yes"),
                $("#header-notice .header-notice").children().hide(),
                !1
            }))
        }
    },
    handleInstagramFloatBar: function() {
        if (window.social_instagram) {
            var y = new Instafeed({
                get: "user",
                target: "instagram_list",
                accessToken: $("#instagram_list").data("token"),
                userId: $("#instagram_list").data("uid"),
                limit: $("#instagram_list").data("limit"),
                resolution: "thumbnail",
                resolution2: "standard_resolution",
                template: "<a target=\"_blank\" href=\"{{link}}\"><img src=\"{{image}}\" alt=\"{{caption}}\" width=\"150\" height=\"150\" /></a>"
            });
            y.run()
        }
    },
    initLazyLoading: function(y, S) {
        var y = y || "body"
          , S = S || !1
          , T = new Blazy({
            selector: y + " .b-lazy",
            success: function(P) {
                setTimeout(function() {
                    var I = P.parentNode;
                    I.className = I.className.replace(/\bb-loading\b/, "")
                }, 200)
            }
        });
        !0 == S && T.load($(y + " .b-lazy"), !0)
    },
    initProductQuickShopItem: function(y) {
        function S(E) {
            return (E + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
        }
        function T(E) {
            return E.toLowerCase().replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-")
        }
        function P(E) {
            var B = E.replace("https:", "").replace("http:", "").split("?v=")[0].split("/")
              , D = B[B.length - 1].split(".")
              , U = D.pop()
              , W = D.join(".") + "_100x." + U;
            return E.replace(B[B.length - 1], W)
        }
        function I(E, B) {
            var D = E.replace("https:", "").replace("http:", "").split("?v=")[0].split("/")
              , U = D[D.length - 1].split(".")
              , W = U.pop()
              , H = U.join(".") + B + "@2x." + W
              , V = U.join(".") + B + "." + W
              , G = {};
            return G.srcset = E.replace(D[D.length - 1], H) + " 500w," + E.replace(D[D.length - 1], V) + " 166w",
            G.src = E.replace(D[D.length - 1], V),
            G
        }
        function A(E, B) {
            var D = B.replace("https:", "").replace("http:", "").split("?v=")[0]
              , U = "";
            0 < E.find(".item-images-wrapper a").length && E.find(".item-images-wrapper a").each(function() {
                var W = $(this).data("_image").replace("https:", "").replace("http:", "").split("?v=")[0];
                if (W == D)
                    return void (U = $(this))
            }),
            E.find(".item-images-wrapper a").removeClass("active"),
            "" != U && U.addClass("active")
        }
        function z(E, B, D, U) {
            if (1 < B.options.length)
                for (i = 0; i < B.options.length; i++)
                    i != D && $("#single-option-selector-" + B.id + "-" + i + "-" + E + " option").each(function() {
                        var W = $(this).closest(".product-item-advanced-wrapper")
                          , H = "unavailable"
                          , V = $(this).attr("value");
                        for (j = 0; j < B.variants.length; j++) {
                            var G = B.variants[j];
                            if (G.options[D] != U)
                                continue;
                            else if (G.options[i] == V) {
                                H = !0 == G.available ? "available" : "sold_out";
                                break
                            }
                        }
                        var R = W.find(".variations-content-" + B.id + " #swatch-" + i + "-" + V.toLowerCase().replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-") + "-" + E);
                        $(R).closest(".swatch-element").removeClass("available").removeClass("sold_out").removeClass("unavailable").addClass(H)
                    });
            else
                for (i = 0; i < B.options.length; i++)
                    $("#single-option-selector-" + B.id + "-" + i + "-" + E + " option").each(function() {
                        var W = $(this).closest(".product-item-advanced-wrapper")
                          , H = "unavailable"
                          , V = $(this).attr("value");
                        for (j = 0; j < B.variants.length; j++)
                            if (B.variants[j].options[i] == V) {
                                H = B.variants[j].available ? "available" : "sold_out";
                                break
                            }
                        var G = W.find(".variations-content-" + B.id + " #swatch-" + i + "-" + V.toLowerCase().replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-") + "-" + E);
                        $(G).closest(".swatch-element").removeClass("available").removeClass("sold_out").removeClass("unavailable").addClass(H)
                    })
        }
        function N(E) {
            var B, D = E, W = [], H = D.get(0).attributes, V = H.length;
            for (B = 0; B < V; B++)
                "data-" === H[B].name.substring(0, 5) && W.push(H[B].name);
            $.each(W, function(G, R) {
                D.removeAttr(R)
            })
        }
        function L(E, B) {
            if (B.available ? (E.find("div.price").data("price", B.price),
            E.find(".btn-action.addtocart-item-js span").text(theme.strings.addToCart),
            E.find(".btn-action.addtocart-item-js").prop("disabled", !1)) : (E.find("div.price").data("price", "0"),
            E.find(".btn-action.addtocart-item-js span").text(theme.strings.soldOut),
            E.find(".btn-action.addtocart-item-js").prop("disabled", !0)),
            0 < E.closest(".grouped-product").length && roar.updateGroupedPrice(),
            E.find("select.variation-select.no-js").val(B.id),
            E.find("span.price-new.money").html(theme.Currency.formatMoney(B.price, theme.settings.moneyFormat)),
            !(B.compare_at_price > B.price))
                E.find("span.price-old.money").addClass("hide"),
                E.find(".sale").addClass("hide");
            else if (E.find("span.price-old.money").html(theme.Currency.formatMoney(B.compare_at_price, theme.settings.moneyFormat)).removeClass("hide"),
            E.find(".sale").text(theme.strings.sale).removeClass("hide"),
            E.find(".sale").hasClass("percentage")) {
                var D = Math.round(100 * (B.compare_at_price - B.price) / B.compare_at_price);
                E.find(".sale").text("-" + D + "%")
            }
            if (window.show_multiple_currencies && (N(E.find(".money")),
            theme.CurrencyPicker.convert(".product-item-advanced-wrapper .money")),
            null !== B.featured_image) {
                A(E, B.featured_image.src);
                var U = I(B.featured_image.src, E.data("_dim"));
                E.find("img.mpt-image").attr("srcset", U.srcset).attr("src", U.src)
            }
        }
        var y = y || "body"
          , M = $(y).find(".single-option-selector-item");
        0 < M.length && M.unbind("change") && M.on("change", function() {
            var E = $(this).closest(".product-item-advanced-wrapper");
            if (0 < $(E.find(".product-item-option").data("id")).length) {
                var B = JSON.parse($(E.find(".product-item-option").data("id")).html())
                  , D = {}
                  , U = "not_found";
                for ($(this).closest(".variations-content").find(".single-option-selector-item").each(function() {
                    D[$(this).data("index")] = $(this).val()
                }),
                k = 0; k < B.variants.length; k++) {
                    var W = !1;
                    for (ol = 1; ol <= B.options.length; ol++)
                        if (D["option" + ol] == B.variants[k]["option" + ol])
                            W = !0;
                        else {
                            W = !1;
                            break
                        }
                    if (!0 == W) {
                        U = "found",
                        L(E, B.variants[k]);
                        break
                    }
                }
                "not_found" == U && (E.find(".btn-action.addtocart-item-js span").text(theme.strings.unavailable),
                E.closest(".product-item-advanced-wrapper").find(".btn-action.addtocart-item-js").prop("disabled", !0))
            }
        });
        var q = $(y).find(".product-item-option");
        if (0 < q.length) {
            var O = 0
              , F = {};
            q.each(function() {
                if (!$(this).hasClass("has-swatch-finished")) {
                    ++O;
                    var E = $(this).closest(".product-item-advanced-wrapper").addClass("product-item-advanced-wrapper-" + O);
                    if ($(this).find(".single-option-selector-item").each(function() {
                        var ue = $(this).data("id") + "-" + O;
                        $(this).attr("id", ue),
                        $(this).data("_index", O)
                    }),
                    0 < $($(this).data("id")).length) {
                        var B = JSON.parse($($(this).data("id")).html());
                        0 < $($(this).data("swatch_id")).length && (F = JSON.parse($($(this).data("swatch_id")).html()));
                        var D = [];
                        if ("1" == window.swatch_size && D.push("Size"),
                        D.push("size"),
                        "1" == window.swatch_color && (D.push("Color"),
                        D.push("Colour"),
                        D.push("color"),
                        D.push("colour")),
                        0 < D.length) {
                            var U = !1
                              , W = !1
                              , H = 0
                              , V = theme.asset_url.substring(0, theme.asset_url.lastIndexOf("?"))
                              , G = theme.asset_url.substring(theme.asset_url.lastIndexOf("?"), theme.asset_url.length);
                            for (i = 0; i < B.options.length; i++) {
                                var R = ""
                                  , Q = ""
                                  , J = ""
                                  , Y = ""
                                  , K = ""
                                  , Z = ""
                                  , X = ""
                                  , ee = "img btooltip";
                                if (R = "object" == typeof B.options[i] ? B.options[i].name : B.options[i],
                                U = !1,
                                W = !1,
                                -1 < D.indexOf(R)) {
                                    U = !0,
                                    H = i;
                                    var te = R.toLowerCase();
                                    if (/color|colour/i.test(te) && (W = !0),
                                    U) {
                                        var ie = [];
                                        for (j = 0; j < B.variants.length; j++) {
                                            var oe = B.variants[j]
                                              , se = S(oe.options[H])
                                              , ne = T(se);
                                            0 > ie.indexOf(se) && ("color" != te && "colour" != te ? (X = se,
                                            ee = "btooltip") : "1" == window.swatch_color_advanced ? null !== F[ne] && void 0 !== F[ne] && "" != F[ne] ? (ee = "img btooltip swatch_color_advanced",
                                            X = "<i style=\"background-image: url(" + V + F[ne] + ".png" + G + ")\"></i>") : null === oe.featured_image ? X = "<i style=\"background-color:" + se + "; background-image: url(" + V + ne + ".png" + G + ")\"></i>" : (ee = "img btooltip swatch_color_advanced",
                                            X = "<i style=\"background-image: url(" + P(oe.featured_image.src) + ")\"></i>") : X = "<i style=\"background-color:" + se + "; background-image: url(" + V + ne + ".png" + G + ")\"></i>",
                                            Z = $("#single-option-selector-" + B.id + "-" + H + "-" + O).val() == se ? "selected " : "",
                                            J = J + "<div class=\"swatch-element " + te + ne + " " + "available" + "\"><input data-id=\"#single-option-selector-" + B.id + "-" + H + "-" + O + "\" data-value=\"" + se + "\"  class=\"swatch-radio " + Z + "\" id=\"swatch-" + H + "-" + ne + "-" + O + "\" type=\"radio\" data-swatch=\"" + te + "\" data-poption=\"" + H + "\" name=\"option-" + H + "\" value=\"" + se + "\"><label for=\"swatch-" + H + "-" + ne + "-" + O + "\" class=\"" + ee + "\" title=\"" + se + "\"><span class=\"soldout-image\"></span>" + X + "</label></div>",
                                            ie.push(se))
                                        }
                                        Q = "<div class=\"wrapper-swatches-product-item wrapper-swatches swatch " + te + "\" data-attribute_name=\"attribute_pa_" + te + "\"><div>" + J + "</div></div>",
                                        Y = E.find("#single-option-selector-" + B.id + "-" + H + "-" + O),
                                        K = E.find("#single-option-selector-" + B.id + "-" + H + "-" + O),
                                        "" != Q && (Y.after(Q),
                                        Y.hide(),
                                        K.addClass("hide-choose-option"))
                                    }
                                }
                            }
                        }
                        var ce = "";
                        0 < E.find(".wrapper-swatches-product-item").length && (ce = E.find(".wrapper-swatches-product-item .swatch-radio"),
                        ce.unbind("click"),
                        ce.on("click", function() {
                            var ue = $(this).closest(".product-item-advanced-wrapper")
                              , me = ue.find($(this).data("id"))
                              , he = $(this).data("poption")
                              , ge = $(this).data("value");
                            $(this).data("value") != me.val() && (me.val($(this).data("value")).trigger("change"),
                            me.closest(".selector-wrapper").find(".swatch-radio").removeClass("selected"),
                            $(this).addClass("selected")),
                            z(me.data("_index"), B, he, ge)
                        })),
                        $(".swatch-radio.selected").trigger("click")
                    }
                    $(this).addClass("has-swatch-finished")
                }
            })
        }
        $(document).on("mouseenter mouseleave click", ".product-item-advanced-wrapper:not(.ag-column-content.col-sm-3 .product-item-advanced-wrapper):not(.ag-column-content.col-sm-4 .product-item-advanced-wrapper)", function(E) {
            var B = $(this)
              , D = window.innerWidth
              , U = B.find(".product-item-content")
              , W = B.find(".product-item-inside-hover")
              , H = parseInt(W.height()) + parseInt(W.css("marginTop")) + 3
              , V = B.find(".count_holder_item .is-countdown")
              , G = B.find(".count_holder_item .is-countdown").innerHeight()
              , R = B.find(".item-images-wrapper")
              , Q = B.find(".item-images-wrapper").innerHeight();
            G += Q,
            E.target,
            "mouseenter" === E.type && 1024 < D ? (B.css({
                height: "100%"
            }).addClass("hovered"),
            U.css("transform", "translateY(-" + H + "px)"),
            W.css("opacity", "1"),
            V.css("transform", "translateY(-" + parseInt(H + 10) + "px)"),
            R.css("transform", "translateY(-" + parseInt(H) + "px)")) : "mouseleave" === E.type && E.relatedTarget && 1024 < D && (B.removeClass("hovered").removeAttr("style"),
            U.removeAttr("style"),
            W.removeAttr("style"),
            V.removeAttr("style"),
            R.removeAttr("style"))
        }),
        0 < $(".item-images-wrapper").length && $(".item-images-wrapper a").on("click", function() {
            if (!$(this).hasClass("active")) {
                var E = $(this).data("_image")
                  , B = $(this).data("_dim")
                  , D = I(E, B);
                $(this).closest(".item-images-wrapper").find("a").removeClass("active"),
                $(this).addClass("active"),
                $(this).closest(".product-content-wrapper").find("img.mpt-image").attr("srcset", D.srcset).attr("src", D.src)
            }
        }),
        $(".items-image-buttons a").on("click", function(E) {
            E.preventDefault(),
            $(this).hasClass("next") ? $(this).closest(".product").find(".item-images-wrapper a.active").next().trigger("click") : $(this).closest(".product").find(".item-images-wrapper a.active").prev().trigger("click")
        })
    },
    initFilterSidebar: function() {
        $(".filter_title .arrow").click(function() {
            $(this).toggleClass("rotArr"),
            $(this).parent().next().slideToggle(300)
        })
    },
    initFooterCollapse: function() {
        $(".footer-accordion-heading").on("click", function(y) {
            y.preventDefault();
            var S = $(this).closest(".footer-accordion").find(".footer-accordion-content")
              , T = $(this).find("i.fa");
            T.hasClass("aDown") ? T.removeClass("aDown") && S.slideUp() : T.addClass("aDown") && S.slideDown()
        })
    },
    initVerticalMenuSidebar: function() {
        $(".ver-dropdown-parent-submenu a.dropdown-link").on("click", function(y) {
            y.preventDefault();
            var S = $(this).closest(".ver-dropdown-parent-submenu").find("ul.ver-dropdown-menu")
              , T = $(this).find("i.fa");
            T.hasClass("aDown") ? T.removeClass("aDown") && S.slideUp() : T.addClass("aDown") && S.slideDown()
        });
      
      	$(".ver-dropdown-parent-submenu a[href='"+window.location.pathname+"']").length > 0  && 
          $(".ver-dropdown-parent-submenu a[href='"+window.location.pathname+"']").trigger("click")

    },
    changeInputNameCartPage: function() {
        var y = "updates[]";
        767 < $(window).width() ? ($(".input-mobile").attr("name", ""),
        $(".input-desktop").attr("name", y)) : ($(".input-mobile").attr("name", y),
        $(".input-desktop").attr("name", ""))
    },
    initChangeInputNameCartPage: function() {
        $(".input-mobile").length && $(".input-desktop").length && (roar.changeInputNameCartPage(),
        $(window).resize(function() {
            roar.changeInputNameCartPage()
        }))
    },
    fixedHeaderMenu: function() {
        if (!(991 >= $(window).width())) {
            if (0 < $("#header-phantom").length && $("#header-phantom").remove(),
            0 < $(".section-megamenu-content").length && $(".section-megamenu-content").each(function() {
                var S = $(this).data("menu_width_class");
                0 < $(this).closest(".shopify-section").length && ($(this).closest(".shopify-section").hasClass(S) || $(this).closest(".shopify-section").addClass(S))
            }),
            "menu" == window.fixed_header) {
                var y = $("<div id=\"header-phantom\" class=\"fixed-header-1 sticky-header\"></div>");
                y.insertAfter(".megamenu-background"),
                $(".megamenu-background").clone().appendTo("#header-phantom"),
                roar.fixedMenu(),
                $(window).resize(function() {
                    roar.fixedMenu()
                }),
                $(window).scroll(function() {
                    roar.fixedMenu()
                })
            } else if ("header" == window.fixed_header) {
                var y = $("<div id=\"header-phantom\" class=\"fixed-header-1 sticky-header\"></div>");
                y.insertAfter("#top"),
                $("#top").clone().appendTo("#header-phantom"),
                roar.fixedHeader(),
                $(window).resize(function() {
                    roar.fixedHeader()
                }),
                $(window).scroll(function() {
                    roar.fixedHeader()
                })
            }
            0 < $("#header-phantom .shopify-section").length && $("#header-phantom .shopify-section").each(function() {
                $(this).removeClass("shopify-section")
            })
        }
    },
    fixedHeader: function() {
        var y = $("header #top").first().width();
        $("header #top .background").first().width() != $("header").first().width() && $(".sticky-header").css("background", "none"),
        $(".sticky-header").css("width", y).css("left", "50%").css("right", "auto").css("margin-left", "-" + Math.ceil(y / 2) + "px").css("margin-right", "-" + Math.ceil(y / 2) + "px"),
        1160 <= roar.getWidthBrowser() && 280 < $(window).scrollTop() ? $(".sticky-header").addClass("fixed-header") : $(".sticky-header").removeClass("fixed-header")
    },
    fixedMenu: function() {
        var y = $("header .megamenu-background").first().width();
        $("header #top .background").first().width() != $("header").first().width() && $(".sticky-header").css("background", "none"),
        $(".sticky-header").css("width", y).css("left", "50%").css("right", "auto").css("margin-left", "-" + Math.ceil(y / 2) + "px").css("margin-right", "-" + Math.ceil(y / 2) + "px"),
        1160 <= roar.getWidthBrowser() && 280 < $(window).scrollTop() ? $(".sticky-header").addClass("fixed-header") : $(".sticky-header").removeClass("fixed-header")
    },
    toggleFilter: function() {
        $("#filter-sidebar").on("click", function() {
            $("body").toggleClass("open_filter")
        }),
        $(document).on("click", ".open_filter .spinner", function() {
            $("body").removeClass("open_filter")
        }),
        $("#filter-addtocart").on("click", function() {
            $("#product .add-to-cart").trigger("click")
        })
    },
    searchAutoComplete: function() {
        var y = null;
        $("form[action=\"/search\"]").each(function() {
            var S = "product"
              , T = $(this).find("select[name=\"category_id\"]")
              , P = $(this).find("input[name=\"type\"]");
            0 < T.length && 0 < P.length && $(T).bind("change", function() {
                $(P).val($(this).val()),
                S = $(this).val()
            });
            var I = $(this).find("input[name=\"q\"]");
            $("<ul class=\"ui-autocomplete ui-front\"></ul>").appendTo($(this).find(".autocomplete-results")).hide(),
            I.attr("autocomplete", "off").bind("keyup change", function() {
                var A = $(this).val()
                  , z = $(this).closest("form")
                  , N = "/search?type=" + S + "&q=*" + A + "*"
                  , L = z.find(".ui-autocomplete");
                3 <= A.length && A != $(this).attr("data-old-term") && (I.addClass("ui-autocomplete-loading"),
                $(this).attr("data-old-term", A),
                null != y && y.abort(),
                y = $.getJSON(N + "&view=json", function(M) {
                    I.removeClass("ui-autocomplete-loading"),
                    L.empty(),
                    0 == M.results_count ? L.hide() : ($.each(M.results, function(q, O) {
                        var F = $("<a></a>").attr("href", O.url);
                        F.append("<span class=\"thumbnail\"><img src=\"" + O.thumbnail + "\" /></span>"),
                        F.append("<span class=\"title\">" + O.title + "</span>"),
                        F.wrap("<li></li>"),
                        L.append(F.parent())
                    }),
                    1 < M.results_count && L.append("<li><span class=\"title\"><a href=\"" + N + "\">" + window.all_results_text + " (" + M.results_count + ")</a></span></li>"),
                    L.fadeIn(200))
                }))
            })
        }),
        $("body").bind("click", function() {
            $(".ui-autocomplete").hide()
        })
    },
    destroyCountdown: function() {
        $.fn.countdown && $(".is-countdown").countdown("destroy")
    },
    initCountdown: function() {
        $.fn.countdown && $(".countdown:not(.is-countdown)").each(function() {
            var y = $(this)
              , S = new Date
              , T = new Date(parseInt(y.data("year")),parseInt(y.data("month")) - 1,y.data("day"));
            T > S ? y.countdown({
                until: T
            }) : y.parent().hide()
        })
    },
    handleCookie: function() {
        function S() {
            try {
                var P = "domain=." + document.domain
                  , z = new Date;
                z.setTime(z.getTime() + 31536e6);
                var N = "; expires=" + z.toGMTString();
                document.cookie = "popup-module-cookie" + "=" + "true" + N + "; path=/; " + P
            } catch (L) {
                console.log(L.message)
            }
        }
        !function() {
            try {
                var P = "popup-module-cookie";
                if (0 < document.cookie.length) {
                    var I = document.cookie.indexOf(P + "=");
                    if (-1 != I) {
                        I = I + P.length + 1;
                        var A = document.cookie.indexOf(";", I);
                        return -1 == A && (A = document.cookie.length),
                        unescape(document.cookie.substring(I, A))
                    }
                }
            } catch (z) {
                console.log(z.message)
            }
        }() && $("#cookie").length && (function() {
            $("#cookie.cookie").length ? $("#cookie").fadeIn("slow") : $("#cookie.popup").length && $.magnificPopup.open({
                items: {
                    src: "#cookie",
                    type: "inline"
                },
                tLoading: "",
                mainClass: "popup-module mfp-with-zoom popup-type-2",
                removalDelay: 200,
                modal: !0
            })
        }(),
        $("#cookie .accept").click(function() {
            S(),
            $("#cookie.cookie").length ? $("#cookie").fadeOut("slow") : $("#cookie.popup").length && $.magnificPopup.close()
        }))
    },
    handleBlog: function() {
        function y(P) {
            $.ajax({
                url: location.href,
                type: "get",
                dataType: "html",
                data: {
                    page: P
                },
                success: function(I) {
                    "" != $(I).find(".blog-page .empty").html() && $(".pagination-ajax").hide()
                },
                error: function() {
                    $(".pagination-ajax").hide()
                }
            })
        }
        function S() {
            T = $(".posts").masonry({
                itemSelector: ".post"
            }),
            T.imagesLoaded().progress(function() {
                T.masonry("layout")
            })
        }
        if ($("body").hasClass("templateBlog")) {
            var T = {};
            $(".posts").hasClass("posts-grid") && S(),
            $("#load-more").click(function() {
                var P = $(this).attr("data-page");
                $.ajax({
                    url: location.href,
                    type: "get",
                    dataType: "html",
                    data: {
                        page: P
                    },
                    beforeSend: function() {
                        $("#load-more").button("loading")
                    },
                    complete: function() {
                        $("#load-more").button("reset")
                    },
                    success: function(I) {
                        return "" == I ? void $(".pagination-ajax").fadeOut() : ($(".posts").hasClass("posts-grid") ? ($(".posts").append($(I).find(".posts").html()),
                        $(".posts").masonry("reloadItems").masonry({
                            sortBy: "original-order"
                        }),
                        setTimeout(function() {
                            $(".posts").masonry("reloadItems").masonry({
                                sortBy: "original-order"
                            })
                        }, 500)) : $(".posts").append($(I).find(".posts").html()),
                        $("#load-more").attr("data-page", parseInt(++P)),
                        void y(P))
                    }
                })
            })
        }
    },
    handleCompare: function() {
        "1" == window.compare && (roar.handleCompareEvent(),
        roar.autoloadCompare(),
        roar.handleCompareScroll())
    },
    handleCompareEvent: function() {
        var y = $("body")
          , S = $("a.add_to_compare");
        y.on("click", "a.add_to_compare", function() {
            var P = $(this)
              , I = P.data("pid")
              , A = ""
              , z = RoarCookie.cookie.rtread("rt-compare");
            if (z = null != z && "" != z ? z.split(",") : [],
            0 > z.indexOf(I) && !1 === $(this).hasClass("added")) {
                z.push(I);
                var N = z.join(",");
                "," == N.substring(0, 1) && (N = N.substring(1)),
                RoarCookie.cookie.rtwrite("rt-compare", N)
            }
            !1 === $(this).hasClass("added") || "" == A ? (A = "",
            $.ajax({
                url: "/search?view=compare&q=" + z,
                dataType: "html",
                type: "GET",
                success: function(L) {
                    A = L
                },
                error: function() {
                    console.log("ajax error")
                },
                complete: function() {
                    $.magnificPopup.open({
                        items: {
                            src: A,
                            type: "inline"
                        },
                        preloader: !0,
                        tLoading: "",
                        mainClass: "quickview compareview",
                        removalDelay: 200,
                        gallery: {
                            enabled: !0
                        },
                        callbacks: {
                            open: function() {
                                $("[data-pid=\"" + I + "\"]").addClass("added").attr("title", $("[data-pid=\"" + I + "\"]").attr("data-added")),
                                $("[data-pid=\"" + I + "\"]").find("span").html($("[data-pid=\"" + I + "\"]").attr("data-add")),
                                window.show_multiple_currencies && theme.CurrencyPicker.convert(".compare-content .money"),
                                roar.handleReviews(),
                                roar.handleCompareScroll()
                            }
                        }
                    })
                }
            })) : $.ajax({
                url: "/search?view=compare&q=" + z,
                dataType: "html",
                type: "GET",
                success: function(L) {
                    A = L
                },
                error: function() {
                    console.log("ajax error")
                },
                complete: function() {
                    $.magnificPopup.open({
                        items: {
                            src: A,
                            type: "inline"
                        },
                        preloader: !0,
                        tLoading: "",
                        mainClass: "quickview compareview",
                        removalDelay: 200,
                        gallery: {
                            enabled: !0
                        },
                        callbacks: {
                            open: function() {
                                window.show_multiple_currencies && theme.CurrencyPicker.convert(".compare-content .money"),
                                roar.handleReviews(),
                                roar.handleCompareScroll()
                            }
                        }
                    })
                }
            })
        }),
        y.on("click", ".remove_from_compare", function(P) {
            P.preventDefault();
            var I = $(this)
              , A = I.attr("data-rev")
              , z = $(".compare-content");
            $("[data-pid=\"" + A + "\"]").removeClass("added").attr("title", $("[data-pid=\"" + A + "\"]").attr("data-add")),
            $("[data-pid=\"" + A + "\"]").find("span").html($("[data-pid=\"" + A + "\"]").attr("data-add"));
            var N = decodeURI(RoarCookie.cookie.rtread("rt-compare"));
            null != N && (N = N.split(",")),
            N = jQuery.grep(N, function(L) {
                return L != A
            }),
            N = $.trim(N),
            RoarCookie.cookie.rtwrite("rt-compare", N),
            $(".fastor_" + A).remove(),
            0 >= N.length && $(".mfp-close").trigger("click")
        })
    },
    autoloadCompare: function() {
        if (0 != parseInt(theme.compare)) {
            var y = RoarCookie.cookie.rtread("rt-compare");
            null == y ? y = [] : (y = y.split(","),
            y.map(function(S) {
                $("[data-pid=\"" + S + "\"]").addClass("added").attr("title", $("[data-pid=\"" + S + "\"]").attr("data-added")),
                $("[data-pid=\"" + S + "\"]").find("span").html($("[data-pid=\"" + S + "\"]").attr("data-added"))
            }))
        }
    },
    handleCompareScroll: function() {
        jQuery("#be_compare_features_table").on("scroll", function() {
            var y = jQuery(this).parent();
            jQuery(this).scrollLeft() + jQuery(this).innerWidth() >= jQuery(this)[0].scrollWidth ? y.hasClass("scroll-right") && y.removeClass("scroll-right") : 0 === jQuery(this).scrollLeft() ? y.hasClass("scroll-left") && y.removeClass("scroll-left") : (!y.hasClass("scroll-right") && y.addClass("scroll-right"),
            !y.hasClass("scroll-left") && y.addClass("scroll-left"))
        }),
        be_compare_container = document.getElementById("be_compare_features_table"),
        null !== be_compare_container && be_compare_container.offsetWidth < be_compare_container.scrollWidth && !jQuery("#be_compare_features_table_inner").hasClass("scroll-right") && jQuery("#be_compare_features_table_inner").addClass("scroll-right"),
        jQuery(window).on("resize", function() {
            roar.be_compare_products_table_shadows()
        }),
        jQuery("#be_compare_features_table_inner").hasClass("scroll-left") || jQuery("#be_compare_features_table_inner").hasClass("scroll-right") ? $(".compareview").addClass("no-flex") : $(".compareview").removeClass("no-flex")
    },
    be_compare_products_table_shadows: function() {
        be_compare_container = document.getElementById("be_compare_features_table");
        null === be_compare_container || (be_compare_container.offsetWidth < be_compare_container.scrollWidth ? !jQuery("#be_compare_features_table_inner").hasClass("scroll-right") && jQuery("#be_compare_features_table_inner").addClass("scroll-right") : (jQuery("#be_compare_features_table_inner").hasClass("scroll-right") && jQuery("#be_compare_features_table_inner").removeClass("scroll-right"),
        jQuery("#be_compare_features_table_inner").hasClass("scroll-left") && jQuery("#be_compare_features_table_inner").removeClass("scroll-left")),
        jQuery("#be_compare_features_table_inner").hasClass("scroll-left") || jQuery("#be_compare_features_table_inner").hasClass("scroll-right") ? $(".compareview").addClass("no-flex") : $(".compareview").removeClass("no-flex"))
    },
    removeToWishlist: function() {
        $(document).on("click", ".remove-wishlist", function(y) {
            y.preventDefault();
            var S = $(this)
              , T = S.closest("form")
              , P = {
                action: "remove_wishlist"
            };
            return P = T.serialize() + "&" + $.param(P),
            $.ajax({
                type: "POST",
                url: "/a/wishlist",
                async: !0,
                cache: !1,
                data: P,
                dataType: "json",
                beforeSend: function() {
                    $(".page-wishlist").addClass("is_loading")
                },
                error: function(I) {
                    console.log(I),
                    $(".page-wishlist").removeClass("is_loading")
                },
                success: function(I) {
                    1 == I.code ? S.closest(".item").slideUp("fast", function() {
                        S.closest(".item").remove(),
                        $(".page-wishlist .infos").removeClass("hide"),
                        $(".wishlist_items_number").text(I.json),
                        0 == I.json && $(".wishlist-empty").removeClass("hide")
                    }) : (alert(I.json),
                    console.log(I.json)),
                    $(".page-wishlist").removeClass("is_loading")
                }
            }),
            !1
        })
    },
    addToWishlist: function() {
        $(document).on("click", ".add-to-wishlist:not(.added)", function() {
            if ($(this).hasClass("need-login")) {
                var S = $("#wishlist_error").html();
                return $.notify({
                    message: S,
                    target: "_blank"
                }, {
                    type: "info",
                    showProgressbar: !0,
                    z_index: 2031,
                    mouse_over: "pause",
                    placement: {
                        from: "top",
                        align: window.rtl ? "left" : "right"
                    }
                }),
                !1
            }
            var T = $(this)
              , P = T.closest("form")
              , I = {
                action: "add_wishlist"
            };
            return I = P.serialize() + "&" + $.param(I),
            $.ajax({
                type: "POST",
                url: "/a/wishlist",
                async: !0,
                cache: !1,
                data: I,
                dataType: "json",
                beforeSend: function() {
                    T.hasClass("btooltip") ? T.addClass("loading") : T.attr("title", T.attr("data-loading-text")).find("span").text(T.attr("data-loading-text"))
                },
                complete: function() {
                    T.hasClass("btooltip") && T.removeClass("loading"),
                    $(".wishlist" + T.prev().val()).attr("title", T.attr("data-added")).addClass("added").find("span").text(T.attr("data-added"))
                },
                error: function(A) {
                    var z = i = $.parseJSON(A.responseText)
                      , N = z.message + ": " + z.description;
                    $.notify({
                        message: N,
                        target: "_blank"
                    }, {
                        type: "info",
                        showProgressbar: !0,
                        z_index: 2031,
                        mouse_over: "pause",
                        placement: {
                            from: "top",
                            align: window.rtl ? "left" : "right"
                        }
                    })
                },
                success: function() {
                    var A = T.closest(".product")
                      , z = [{
                        product_url: A.find(".name a").attr("href"),
                        product_name: A.find(".name a").text()
                    }];
                    $.notify({
                        message: $("<div>").append($("#wishlist_success").tmpl(z).clone()).html(),
                        target: "_blank"
                    }, {
                        type: "success",
                        showProgressbar: !0,
                        z_index: 2031,
                        mouse_over: "pause",
                        placement: {
                            from: "top",
                            align: window.rtl ? "left" : "right"
                        }
                    })
                }
            }),
            !1
        })
    },
    addToCart: function() {
        "direct" != window.shopping_cart_type && $(document).on("click", ".add-to-cart:not(.disabled)", function() {
            var y = $(this)
              , T = y.closest("form");
            return $.ajax({
                type: "POST",
                url: "/cart/add.js",
                async: !0,
                cache: !1,
                data: T.serialize(),
                dataType: "json",
                beforeSend: function() {
                    y.hasClass("btooltip") ? y.addClass("loading") : y.button("loading") && $("#filter-addtocart span").text(y.attr("data-loading-text")) && $("#filter-addtocart").addClass("active")
                },
                complete: function() {
                    y.hasClass("btooltip") ? y.removeClass("loading") : y.button("reset") && $("#filter-addtocart").removeClass("active")
                },
                error: function(P) {
                    roar.updateCart(P, !1)
                },
                success: function(P) {
                  cspHandleCart()
                  .then(function(){
                    "sidebar" == window.shopping_cart_type ? roar.updateCartSidebar(P, !0) : roar.updateCart(P, !0)                  
                  });                    
                }
            }).done(function() {}),
            !1
        })
    },
    cartSidebar: function() {
        "sidebar" != window.shopping_cart_type || ($("body").on("click", ".cart-item a.remove-cart", function(y) {
            y.preventDefault();
            var S = $(this)
              , T = S.attr("data-id");
            $.ajax({
                type: "POST",
                url: "/cart/change.js",
                data: "quantity=0&id=" + T,
                dataType: "json",
                beforeSend: function() {
                    $(".cart-window-body").addClass("loading")
                },
                success: function(cart) {
                  cspHandleCart(cart)
                  .then(function(){
                    $.ajax({
                      url: "/search",
                      beforeSend: function() {},
                      success: function() {
                        roar.updateCart(S, !0)
                      },
                      error: function(I) {
                        console.log(I)
                      }
                    }).done(function() {
                      $(".cart-window-body").removeClass("loading")
                    })
                  })
                },
                error: function(I, A) {
                    Shopify.onError(I, A),
                    $(".cart-window-body").removeClass("loading")
                }
            })
        }),
        $(document).on("focus", "#cart_info .update", function() {
            $(this).select()
        }).on("blur", "#cart_info .update", function() {
            var y = $(this)
              , S = y.val()
              , T = y.attr("data-id");
            $.ajax({
                type: "POST",
                url: "/cart/change.js",
                data: "quantity=" + S + "&id=" + T,
                dataType: "json",
                beforeSend: function() {
                    $(".cart-window-body").addClass("loading")
                },
                success: function(cart) {
                  cspHandleCart(cart)
                  .then(function(){
                    roar.updateCart(y, !0)
                  })
                },
                error: function(I, A) {
                    Shopify.onError(I, A)
                }
            }).done(function() {
                $(".cart-window-body").removeClass("loading")
            })
        }),
        $("body").on("click", ".cart-block-click", function(y) {
            y.preventDefault();
            y.target !== this || $(".cart-window-bg").toggleClass("window-hide")
        }),
        $("body").on("click", ".close-cart", function(y) {
            y.preventDefault(),
            $(".cart-window-bg").addClass("window-hide")
        }),
        $("body").on("click", ".qty-btn.cart-plus", function() {
            var S = $(this).data("id")
              , T = parseInt($(S).val()) + 1;
            $(S).val(T);
            var P = $(S)
              , I = P.val()
              , A = P.attr("data-id");
            $.ajax({
                type: "POST",
                url: "/cart/change.js",
                data: "quantity=" + I + "&id=" + A,
                dataType: "json",
                beforeSend: function() {
                    $(".cart-window-body").addClass("loading")
                },
                success: function(cart) {
                  cspHandleCart(cart)
                  .then(function(){
                    roar.updateCart(P, !0)
                  });
                },
                error: function(N, L) {
                    Shopify.onError(N, L)
                }
            }).done(function() {
                $(".cart-window-body").removeClass("loading")
            })
        }),
        $("body").on("click", ".qty-btn.cart-minus", function() {
            var S = $(this).data("id")
              , T = parseInt($(S).val());
            if (1 < T) {
                $(S).val(T - 1);
                var P = $(S)
                  , I = P.val()
                  , A = P.attr("data-id")
                  , z = {
                    type: "POST",
                    url: "/cart/change.js",
                    data: "quantity=" + I + "&id=" + A,
                    dataType: "json",
                    beforeSend: function() {
                        $(".cart-window-body").addClass("loading")
                    },
                    success: function(cart) {
                      cspHandleCart(cart)
                      .then(function(){
                        roar.updateCart(P, !0)
                      })
                    },
                    error: function(N, L) {
                        Shopify.onError(N, L)
                    }
                };
                $.ajax(z).done(function() {
                    $(".cart-window-body").removeClass("loading")
                })
            }
        }))
    },
    updateCartSidebar: function() {
        $.ajax({
            url: "/search",
            beforeSend: function() {
                $(".cart-window-body").addClass("loading")
            },
            success: function(T) {
              

              
              var P = "div#cart_block"
                  , I = "div#cart_popup"
                  , A = ".mobile-nav-cart"
                  , z = "#filter-cart"
                  , N = "div#cart-sidebar";
                0 < $(N).length && ($(N).html($(T).find(N).html()),
                setTimeout(function() {
                    $(".cart-block-click").trigger("click")
                }, 100)),
                $(P).html($(T).find(P).html()),
                $(I).html($(T).find(I).html()),
                $(A).html($(T).find(A).html()),
                $(z).html($(T).find(z).html()),
                window.show_multiple_currencies && (theme.CurrencyPicker.convert("#cart_block .money"),
                theme.CurrencyPicker.convert("#cart_popup .money"),
                theme.CurrencyPicker.convert("#cart-sidebar .money")),
                roar.handleReviews()
              
             
                
            },
            error: function(T) {
                console.log(T)
            }
        }).done(function() {
            $(".cart-window-body").removeClass("loading")
        })
    },
    updateCart: function(y, S) {
      if (window.BOLD && BOLD.common && BOLD.common.cartDoctor) {
        y = BOLD.common.cartDoctor.fixItem(y)
      }
        if (!0 == S)
            "sidebar" == window.shopping_cart_type ? $.ajax({
                url: "/search",
                beforeSend: function() {
                    $(".cart-window-body").addClass("loading")
                },
                success: function(P) {
              
                  
                    var I = "div#cart_block"
                      , A = "div#cart_popup"
                      , z = ".mobile-nav-cart"
                      , N = "#filter-cart"
                      , L = "#cart-sidebar";
                    0 < $(L).length && $(L).html($(P).find(L).html()),
                    $(I).html($(P).find(I).html()),
                    $(A).html($(P).find(A).html()),
                    $(z).html($(P).find(z).html()),
                    $(N).html($(P).find(N).html()),
                    window.show_multiple_currencies && (theme.CurrencyPicker.convert("#cart_block .money"),
                    theme.CurrencyPicker.convert("#cart_popup .money"),
                    theme.CurrencyPicker.convert("#cart-sidebar .money")),
                    roar.handleReviews()
                    
                },
                error: function(P) {
                    console.log(P)
                }
            }).done(function() {
                $(".cart-window-body").removeClass("loading")
            }) : $.ajax({
                url: "/search?view=cart&q=" + y.handle + "_sp_" + y.variant_id + "_sp_" + y.quantity + "_sp_" + y.price,
                beforeSend: function() {},
                success: function(P) {
                  debugger;
                    var I = "div#cart_block"
                      , A = "div#cart_popup"
                      , z = ".mobile-nav-cart"
                      , N = "#filter-cart";
                    $(I).html($(P).filter(I).html()),
                    $(A).html($(P).filter(A).html()),
                    $(z).html($(P).filter(z).html()),
                    $(N).html($(P).filter(N).html()),
                    window.show_multiple_currencies && (theme.CurrencyPicker.convert("#cart_popup .money"),
                    theme.CurrencyPicker.convert("#cart_block .money"))
                },
                error: function(P) {
                    console.log(P)
                }
            }).done(function() {
                if ("ajax_notify" == window.shopping_cart_type) {
                    var P = [{
                        product_url: y.url,
                        product_name: y.title
                    }];
                    $.notify({
                        message: $("<div>").append($("#cart_success").tmpl(P).clone()).html(),
                        target: "_blank"
                    }, {
                        type: "success",
                        showProgressbar: !0,
                        z_index: 2031,
                        mouse_over: "pause",
                        placement: {
                            from: "top",
                            align: window.rtl ? "left" : "right"
                        }
                    })
                } else
                    roar.popupCart(S)
            });
        else {
            var T = $.parseJSON(y.responseText);
            $.ajax({
                url: "/search?view=cart_error&q=" + T.description,
                beforeSend: function() {},
                success: function(P) {
                    var I = "div#cart_error_popup";
                    $(I).html($(P).filter(I).html())
                },
                error: function(P) {
                    console.log(P)
                }
            }).done(function() {
              debugger;
                if ("ajax_notify" == window.shopping_cart_type) {
                    var P = i = $.parseJSON(y.responseText)
                      , I = P.message + ": " + P.description;
                    $.notify({
                        message: I,
                        target: "_blank"
                    }, {
                        type: "info",
                        showProgressbar: !0,
                        z_index: 2031,
                        mouse_over: "pause",
                        placement: {
                            from: "top",
                            align: window.rtl ? "left" : "right"
                        }
                    })
                } else
                    roar.popupCart(S)
            })
        }
    },
    removeCart: function() {
        $(document).on("click", ".mini-cart-info .remove a", function(y) {
            y.preventDefault();
            var S = $(this)
              , T = S.attr("data-id");
            $.ajax({
                type: "POST",
                url: "/cart/change.js",
                data: "quantity=0&id=" + T,
                dataType: "json",
                beforeSend: function() {
                    $("#cart_content").addClass("loading")
                },
                success: function(cart) {
                  cspHandleCart(cart)
                  .then(function(){
                    $.ajax({
                      url: "/search?view=cart",
                      beforeSend: function() {},
                      success: function(I) {
                        var A = "div#cart_block"
                        , z = "div#cart_popup"
                        , N = ".mobile-nav-cart"
                        , L = "#filter-cart";
                        $(A).html($(I).filter(A).html()),
                          $(z).html($(I).filter(z).html()),
                          $(N).html($(I).filter(N).html()),
                          $(L).html($(I).filter(L).html()),
                          window.show_multiple_currencies && (theme.CurrencyPicker.convert("#cart_popup .money"),
                                                              theme.CurrencyPicker.convert("#cart_block .money"))
                        // Bold:POv2
                        if (window.BOLD && BOLD.common && BOLD.common.eventEmitter &&
                            typeof BOLD.common.eventEmitter.emit === 'function'){
                          BOLD.common.eventEmitter.emit('BOLD_COMMON_cart_loaded', cart);
                          BOLD.csp && BOLD.csp.app.cartDoctor.correctCart()
                        }
                        // Bold:POv2
                      },
                      error: function(I) {
                        console.log(I)
                      }
                    }).done(function() {
                      $("#cart_content").removeClass("loading")
                    })

                  });
                },
                error: function(I, A) {
                    Shopify.onError(I, A),
                    $("#cart_content").removeClass("loading")
                }
            })
        })
    },
    popupCart: function(y) {
        !0 == y ? $.magnificPopup.open({
            items: {
                src: "#cart_popup",
                type: "inline"
            },
            tLoading: "",
            mainClass: "popup-module mfp-with-zoom popup-type-1",
            removalDelay: 200,
            callbacks: {
                open: function() {
                    $("#cart_popup .continue-shopping").unbind("click"),
                    $("body").on("click", "#cart_popup .continue-shopping", function(S) {
                        S.preventDefault(),
                        $.magnificPopup.close()
                    })
                }
            }
        }) : $.magnificPopup.open({
            items: {
                src: "#cart_error_popup",
                type: "inline"
            },
            tLoading: "",
            mainClass: "popup-module mfp-with-zoom popup-type-1",
            removalDelay: 200
        })
    },
    handlePopups: function() {
        function y() {
            if (0 == window.popup_mailchimp_expire ? $("#popup-mailchimp .dont-show-me").change(function() {
                $(this).is(":checked") ? S() : T()
            }) : 1 == window.popup_mailchimp_expire && T(),
            !P()) {
                var I = parseInt(window.popup_mailchimp_delay, 20)
                  , A = parseInt(window.popup_mailchimp_close, 20);
                setTimeout(function() {
                    $.magnificPopup.open({
                        items: {
                            src: "#popup-mailchimp",
                            type: "inline"
                        },
                        tLoading: "",
                        mainClass: "popup-module mfp-with-zoom popup-type-1",
                        removalDelay: 200
                    }),
                    0 < A && setTimeout(function() {
                        $.magnificPopup.close()
                    }, A)
                }, I),
                2 == window.popup_mailchimp_expire && S()
            }
            var z = $("#mc-form")
              , N = z.attr("action");
            z.ajaxChimp({
                url: N,
                callback: function() {}
            })
        }
        function S() {
            try {
                var I = parseInt(window.popup_mailchimp_period);
                0 >= I && (I = 1);
                var A = "domain=." + document.domain
                  , L = new Date;
                L.setTime(L.getTime() + 1e3 * (60 * (60 * (24 * I))));
                var M = "; expires=" + L.toGMTString();
                document.cookie = "popup-module-mailchimp" + "=" + "true" + M + "; path=/; " + A
            } catch (q) {
                console.log(q.message)
            }
        }
        function T() {
            try {
                var I = "domain=." + document.domain;
                document.cookie = "popup-module-mailchimp=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; " + I
            } catch (A) {
                console.log(A.message)
            }
        }
        function P() {
            try {
                var I = "popup-module-mailchimp";
                if (0 < document.cookie.length) {
                    var A = document.cookie.indexOf(I + "=");
                    if (-1 != A) {
                        A = A + I.length + 1;
                        var z = document.cookie.indexOf(";", A);
                        return -1 == z && (z = document.cookie.length),
                        unescape(document.cookie.substring(A, z))
                    }
                }
            } catch (N) {
                console.log(N.message)
            }
        }
        $("#popup-mailchimp").length && ($("#popup-mailchimp").hasClass("hidden-xs") ? 768 <= roar.getWidthBrowser() && y() : y())
    },
    handleVerticalMenu: function() {
        $(".category_trigger").click(function() {
            (768 > roar.getWidthBrowser() || $("html").hasClass("touch")) && ($(".shop_category").hasClass("is_open") ? ($(".shop_category").removeClass("is_open"),
            $(".shop_category .submenu-group").slideUp()) : ($(".shop_category").addClass("is_open"),
            $(".shop_category .submenu-group").slideDown()))
        }),
        $(".shop_category .has-children>span>.fa").click(function() {
            var y = $(this).closest(".menu-item")
              , S = y.find(".submenu");
            (768 > roar.getWidthBrowser() || $("html").hasClass("touch")) && (y.hasClass("is_open") ? (y.removeClass("is_open"),
            S.slideUp()) : (y.addClass("is_open"),
            S.slideDown()))
        })
    },
    updateGroupedPrice: function() {
        if (0 != $("#grouped-price").length) {
            var y = 0;
            $(".grouped-product-item .grouped-checkbox").each(function() {
                $(this).is(":checked") && (y += parseFloat($($(this).data("id")).find("div.price").data("price")),
                $("#grouped-price").html("<span class=\"money\">" + theme.Currency.formatMoney(y, theme.settings.moneyFormat) + "</span>"),
                window.show_multiple_currencies && theme.CurrencyPicker.convert("#grouped-price .money"))
            })
        }
    },
    handleQuickshop: function(y) {
        var y = y || "body"
          , S = "";
        return $(y).find(".quickview .quick_view").magnificPopup({
            type: "ajax",
            preloader: !0,
            tLoading: "",
            mainClass: "quickview",
            removalDelay: 200,
            gallery: {
                enabled: !1
            },
            callbacks: {
                open: function() {
                    0 < $("#main").next(".product-360-view-wrapper").length && $("#main").next(".product-360-view-wrapper").remove()
                },
                ajaxContentAdded: function() {
                  roar.handleReviews();
                  var T = new theme.Sections;
                  T.register("product-quickview-template", theme.Product),
                    roar.initCountdown(),
                    window.show_multiple_currencies && theme.CurrencyPicker.convert("#ProductSection-product-quickview-template .money"),
                    Shopify.PaymentButton.init();
                  var P = $(".quickview").find(".add-to-wishlist");
                  P.attr("title", P.attr("data-added")).addClass("added").find("span").text(P.attr("data-added"));
                  setTimeout(function(){ $(window).trigger('resize'); }, 1000);                    
                },
                beforeClose: function() {
                    0 < $(".quickview._reopen").length && "" != $(".quickview._reopen").data("_qid") && (S = $(".quickview._reopen").data("_qid"))
                },
                afterClose: function() {
                    "" != S && ($(S).trigger("click"),
                    S = "")
                }
            }
        }),
        !1
    },
    mapClearFilter: function() {
        $(".mfilter-box .column").each(function() {
            var y = $(this);
            0 < y.find("input:checked").length && y.find(".clear").on("click", function(S) {
                var T = [];
                Shopify.queryParams.constraint && (T = Shopify.queryParams.constraint.split("+")),
                y.find("input:checked").each(function() {
                    var P = $(this)
                      , I = P.val();
                    if (I) {
                        var A = T.indexOf(I);
                        0 <= A && T.splice(A, 1)
                    }
                }),
                T.length ? Shopify.queryParams.constraint = T.join("+") : delete Shopify.queryParams.constraint,
                roar.filterAjaxClick(),
                S.preventDefault()
            })
        })
    },
    mapSingleFilter: function() {
        $("body").on("change", ".advanced-filter .field:not(.disable) input", function() {
            var y = $(this).parent()
              , S = $(this).val()
              , T = [];
            if (Shopify.queryParams.constraint && (T = Shopify.queryParams.constraint.split("+")),
            !window.enable_filter_multiple_choice && !y.hasClass("active")) {
                var P = y.parents(".advanced-filter").find(".active");
                0 < P.length && P.each(function() {
                    var A = $(this).data("handle");
                    if ($(this).removeClass("active"),
                    A) {
                        var z = T.indexOf(A);
                        0 <= z && T.splice(z, 1)
                    }
                })
            }
            if (S) {
                var I = T.indexOf(S);
                0 > I ? (T.push(S),
                y.addClass("active")) : (T.splice(I, 1),
                y.removeClass("active"))
            }
            T.length ? Shopify.queryParams.constraint = T.join("+") : delete Shopify.queryParams.constraint,
            roar.filterAjaxClick()
        })
    },
    mapSingleCollection: function() {
        $("body").on("click", ".advanced-collection .field", function(y) {
            var S = $(this)
              , T = S.attr("href");
            S.hasClass("active") || (roar.filterAjaxClick(T),
            $(".advanced-collection .field").removeClass("active"),
            S.addClass("active"),
            y.preventDefault())
        })
    },
    mapSingleSort: function() {
        $("body").on("change", ".advanced-sortby .field", function(y) {
            var S = $(this)
              , T = S.val();
            Shopify.queryParams.sort_by = T,
            roar.filterAjaxClick(),
            y.preventDefault()
        })
    },
    mapSingleLimit: function() {
        $("body").on("change", ".advanced-limit .field", function(y) {
            var S = $(this)
              , T = S.val();
            Shopify.queryParams.view = T,
            roar.filterAjaxClick(),
            y.preventDefault()
        })
    },
    mapSinglePagination: function() {
        $("body").on("click", "#mfilter-content-container .advanced-pagination a", function(y) {
            var S = $(this);
            delete Shopify.queryParams.page,
            delete Shopify.queryParams.constraint,
            delete Shopify.queryParams.q,
            delete Shopify.queryParams.sort_by,
            roar.filterAjaxClickPaging(S.attr("href")),
            y.preventDefault()
        })
    },
    mapFilters: function() {
        roar.handleGridList(),
        roar.handleShopView(),
        roar.mapPagination()
    },
    mapPaginationCallback: function() {
        roar.handleGridList(),
        roar.handleShopView(),
        roar.handleQuickshop(),
        roar.handleReviews(),
        roar.initCountdown(),
        roar.initProductQuickShopItem("#mfilter-content-container"),
        roar.initLazyLoading("#sandbox", !0),
        window.show_multiple_currencies && theme.CurrencyPicker.convert("#sandbox .money")
    },
    mapPagination: function() {
        if ($(document.body).on("click", ".fastor_ajax_load_button a", function(S) {
            if (S.preventDefault(),
            $(".pagination a.next").length) {
                $(".fastor_ajax_load_button a").attr("data-processing", 1);
                var T = $(".pagination a.next").attr("href")
                  , P = $(".fastor_ajax_load_button a").attr("data-loading-items")
                  , I = $(".fastor_ajax_load_button a").attr("data-no-more");
                $(".fastor_ajax_load_button").hide(),
                $(".pagination").before("<div class=\"fastor_ajax_load_more_loader animated fadeIn\"><a href=\"#\"><i class=\"icon-px-outline-load\"></i>&nbsp;&nbsp;<span>" + P + "</span></a></div>"),
                $.get(T, function(A) {
                    $(".advanced-pagination").html($(A).find(".advanced-pagination").html()),
                    $(A).find(".product-list .product").each(function() {
                        $(".product-list .product:last").after($(this))
                    }),
                    $(A).find(".product-grid .product-item").each(function() {
                        $(".product-grid .product-item:last").after($(this))
                    }),
                    roar.mapPaginationCallback(),
                    $(".fastor_ajax_load_more_loader").fadeOut("slow"),
                    $(".fastor_ajax_load_button").fadeIn("slow"),
                    $(".fastor_ajax_load_button a").attr("data-processing", 0),
                    0 == $(".pagination a.next").length && ($(".fastor_ajax_load_button").addClass("finished").removeClass("fastor_ajax_load_more_hidden"),
                    $(".fastor_ajax_load_button a").show().html(I).addClass("disabled"))
                })
            } else {
                var I = $(".fastor_ajax_load_button a").attr("data-no-more");
                $(".fastor_ajax_load_button").addClass("finished").removeClass("fastor_ajax_load_more_hidden"),
                $(".fastor_ajax_load_button a").show().html(I).addClass("disabled")
            }
        }),
        $(".fastor_ajax_load_button").hasClass("fastor_ajax_load_more_hidden")) {
            var y = Math.abs(0);
            $(window).scroll(function() {
                if ($(".products").length) {
                    var S = $(".products").offset().top + $(".products").outerHeight()
                      , T = S - $(window).scrollTop();
                    T - y < $(window).height() && 0 == $(".fastor_ajax_load_button a").attr("data-processing") && $(".fastor_ajax_load_button a").trigger("click")
                }
            })
        }
    },
    filterCreateUrl: function(y) {
        var S = $.param(Shopify.queryParams).replace(/%2B/g, "+");
        return y ? "" == S ? y : y + "?" + S : location.pathname + "?" + S
    },
    updateQueryStringParameter: function(y, S, T) {
        var P = new RegExp("([?&])" + S + "=.*?(&|$)","i")
          , I = -1 === y.indexOf("?") ? "?" : "&";
        return y.match(P) ? y.replace(P, "$1" + S + "=" + T + "$2") : y + I + S + "=" + T
    },
    filterCreateUrlPaging: function(y) {
        var S = 1
          , T = y.split("page=");
        return 1 < T.length && (S = parseInt(T[1])),
        roar.updateQueryStringParameter(window.location.href, "page", S)
    },
    filterAjaxClick: function(y) {
        delete Shopify.queryParams.page;
        var S = roar.filterCreateUrl(y);
        roar.filterGetContent(S)
    },
    filterAjaxClickPaging: function(y) {
        delete Shopify.queryParams.page;
        var S = roar.filterCreateUrlPaging(y);
        roar.filterGetContent(S)
    },
    filterGetContent: function(y) {
        $.ajax({
            type: "get",
            url: y,
            beforeSend: function() {
                roar.destroyCountdown(),
                $("body").addClass("is_loading").removeClass("open_filter")
            },
            success: function(S) {
                var T = S.match("<title>(.*?)</title>")[1];
                $(S).find(".breadcrumb-content").length && $(".breadcrumb-content").html($(S).find(".breadcrumb-content").html()),
                $(".category-info").remove(),
                $(S).find(".category-info").length && $("#mfilter-content-container").prepend($(S).find(".category-info")),
                $("#sandbox").empty().html($(S).find("#sandbox").html()),
                $(".mfilter-box .mfilter-content").empty().html($(S).find(".mfilter-box .mfilter-content").html()),
                $("#mfilter-content-container .advanced-pagination").empty().html($(S).find("#mfilter-content-container .advanced-pagination").html()),
                $(".page-top").empty().html($(S).find(".page-top").html()),
                History.pushState({
                    param: Shopify.queryParams
                }, T, y),
                setTimeout(function() {
                    $("html,body").animate({
                        scrollTop: $("body #sandbox").offset().top
                    }, 500, "swing")
                }, 100),
                $("body").removeClass("is_loading"),
                roar.mapClearFilter(),
                roar.handleQuickshop(),
                roar.handleReviews(),
                roar.initCountdown(),
                roar.initProductQuickShopItem("#mfilter-content-container"),
                roar.initFilterSidebar(),
                roar.initLazyLoading("#sandbox", !0),
                window.show_multiple_currencies && theme.CurrencyPicker.convert("#sandbox .money")
            },
            error: function() {
                $("body").removeClass("is_loading")
            }
        })
    },
    handleReviews: function() {
        "undefined" != typeof SPR && (SPR.registerCallbacks(),
        SPR.initRatingHandler(),
        SPR.initDomEls(),
        SPR.loadProducts(),
        SPR.loadBadges())
    },
    convertToSlug: function(y) {
        return y.toLowerCase().replace(/[^\w\u00C0-\u024f]+/g, "-").replace(/^-+|-+$/g, "")
    },
    getWidthBrowser: function() {
        var y;
        return "number" == typeof window.innerWidth ? y = window.innerWidth : document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight) ? y = document.documentElement.clientWidth : document.body && (document.body.clientWidth || document.body.clientHeight) && (y = document.body.clientWidth),
        y
    },
    handleScrollToTop: function() {
        $(window).scroll(function() {
            if (767 < $(window).width()) {
                var y = $(this).scrollTop()
                  , S = $(this).height()
                  , T = 1;
                0 < y && (T = y + S / 2);
                var P = $("#scroll-top");
                1e3 > T ? P.removeClass("on") : P.addClass("on")
            } else {
                var y = $(this).scrollTop();
                if (0 < $("#shopify-section-mobile-nav").length)
                    var S = $("#shopify-section-mobile-nav").offset().top + $("#shopify-section-mobile-nav").height();
                else
                    var S = $("header").offset().top + $("header").height();
                var P = $("#widgets");
                S > y ? P.removeClass("on") : P.addClass("on")
            }
        }),
        $("#scroll-top").click(function(y) {
            y.preventDefault(),
            $("html,body").animate({
                scrollTop: 0
            }, 800, "swing")
        })
    },
    handleGMap: function() {
        $("#contact_map").length && $().gMap && $("#contact_map").gMap({
            zoom: 17,
            scrollwheel: !1,
            maptype: "ROADMAP",
            markers: [{
                address: window.contact_map_address,
                html: "_address",
                icon: {
                    iconsize: [188, 68],
                    iconanchor: [0, 68]
                }
            }]
        })
    },
    handleGridList: function() {
        $(document).on("click", "#grid", function() {
            $("#mfilter-content-container").removeClass("list").addClass("grid")
        }),
        $(document).on("click", "#list", function() {
            $("#mfilter-content-container").removeClass("grid").addClass("list"),
            $("body").removeClass("flex-view-2 flex-view-3 flex-view-4 flex-view-6").addClass("flex-view-1")
        })
    },
    handleShopView: function() {
        var y, S;
        0 < $("#mfilter-content-container .shop__view").length && ($("#mfilter-content-container .shop__view").unbind("click"),
        $("#mfilter-content-container .shop__view").on("click", function() {
            y = "flex-view-1 flex-view-" + $("#mfilter-content-container .shop__view.active").data("per_row"),
            !$(this).hasClass("active") && ("grid" == $(this).data("view") ? (S = "flex-view-" + $(this).data("per_row"),
            $(document.body).removeClass("flex-view-1 flex-view-2 flex-view-3 flex-view-4 flex-view-6").addClass(S),
            $("#mfilter-content-container").removeClass("list").addClass("grid")) : ($("#mfilter-content-container").removeClass("grid").addClass("list"),
            $("body").removeClass("flex-view-2 flex-view-3 flex-view-4 flex-view-6").addClass("flex-view-1")),
            $("#mfilter-content-container .shop__view").removeClass("active"),
            $(this).addClass("active")),
            roar.initLazyLoading()
        }))
    },
    handleSearch: function() {
        $(".button-search, .header-type-3 #top .search_form, .header-type-8 .search_form").bind("click", function() {
            $(this).closest("form").submit()
        })
    },
    handleSmoothScroll: function() {
        $(document).on("click", ".smoothscroll", function(y) {
            y.preventDefault();
            var S = $(this).attr("href");
            $(S).trigger("click"),
            setTimeout(function() {
                $("html,body").animate({
                    scrollTop: $(S).offset().top - 100
                }, 800, "swing")
            }, 300)
        })
    },
    handleOrder: function() {
        $(".orderable").each(function(y, S) {
            var T = $(S).children("div[data-order]");
            T.sort(function(P, I) {
                return +$(P).data("order") - +$(I).data("order")
            }),
            T.appendTo(S)
        })
    },
    handleDropdown: function() {
        $("[data-toggle='dropdown']").on("click", function() {
            $(this).parent().toggleClass("open")
        })
    }
}
  , roarLookbook = {
    getSizedImageUrl: function(y, S) {
        var T = document.createElement("a");
        if (T.href = y,
        "cdn.shopify.com" != T.hostname)
            return y;
        if (null == S)
            return y;
        if ("master" == S)
            return roarLookbook.removeProtocol(y);
        var P = y.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);
        if (null != P) {
            var T = y.split(P[0])
              , I = P[0];
            return roarLookbook.removeProtocol(T[0] + "_" + S + I)
        }
        return null
    },
    removeProtocol: function(y) {
        return y.replace(/http(s)?:/, "")
    },
    isProductUrl: function(y) {
        var S = window.location.hostname
          , T = document.createElement("a");
        return T.href = y,
        console.log(S),
        console.log(T.hostname),
        T.hostname == S
    },
    buildLookbook: function() {
        $(".roarlookbook").each(function(y) {
            var S = $(this);
            if (!S.hasClass("roarlookbook_init")) {
                var T = S.attr("data-lookbook")
                  , P = {
                    lookbook: T,
                    action: "lookbook_get"
                };
                P = $.param(P),
                $.ajax({
                    type: "POST",
                    url: "/apps/roarlookbook",
                    async: !0,
                    cache: !1,
                    data: P,
                    dataType: "json",
                    beforeSend: function() {},
                    error: function() {},
                    success: function(I) {
                        S.append(I);
                        var A = S.find(".media__blank-preview");
                        A.imagesLoaded(function() {
                            S.addClass("roarlookbook_init").attr("data-lookbook", T + y),
                            A.addClass("sfx-fadeIn")
                        })
                    }
                })
            }
        })
    },
    resetHotspots: function(y) {
        var S = $(".hotspot", y)
          , T = y.attr("data-lookbook");
        S.each(function() {
            var P = $(this)
              , I = P.attr("data-id")
              , A = $("#" + T + "-" + I, y);
            A.fadeOut("fast", function() {
                A.remove(),
                P.removeClass("hotspot_init")
            })
        })
    },
    hotspotPopup: function() {
        $(".roarlookbook").on("click", ".hotspot", function() {
            var S = $(this);
            if (!S.hasClass("hotspot_init")) {
                var T = S.closest(".roarlookbook")
                  , P = S.attr("data-id")
                  , I = S.closest(".roarlookbook").attr("data-lookbook") + "-" + P
                  , A = "#" + S.closest(".roarlookbook").attr("data-lookbook") + "-" + P
                  , z = S.attr("data-title")
                  , N = S.attr("data-image")
                  , L = S.attr("data-price")
                  , M = S.attr("data-url")
                  , q = "";
                if ("" == z && "" == M)
                    return !1;
                if (roarLookbook.resetHotspots(T),
                q += "<div id=\"" + I + "\" class=\"hotspot-widget hotspot-loading\">",
                q += "<div class=\"hotspot-content\">",
                q += "<span class=\"hotspot-close\">\xD7</span>",
                q += "<div class=\"hotspot-inner\">",
                "" != N) {
                    var O = "<img src=\"" + roarLookbook.getSizedImageUrl(N, "80x") + "\" src=\"" + roarLookbook.getSizedImageUrl(N, "300x") + "\" data-srcset=\"" + roarLookbook.getSizedImageUrl(N, "300x") + " 1x, " + roarLookbook.getSizedImageUrl(N, "600x") + " 2x\" alt=\"\" />";
                    q += "" == M ? O : "<a href=\"" + M + "\">" + O + "</a>"
                }
                if ("" != z && (q += "<h3>",
                q += "" == M ? z : "<a href=\"" + M + "\">" + z + "</a>",
                q += "</h3>"),
                "" != L && (q += "<div class=\"price\"><span class=\"money\">" + L + "</span></div>",
                roarLookbook.isProductUrl(M) && (q += "<div class=\"hotspot-btns\">",
                q += "<div class=\"hotspot-btn\"><a href=\"" + M + "\">" + theme.apps.details + "</a></div>",
                q += "<div class=\"hotspot-btn\"><a class=\"roar_add_to_cart\" href=\"" + M + "?add-to-cart=true\">" + theme.apps.buyNow + "</a></div>",
                q += "</div>")),
                q += "</div>",
                q += "</div>",
                q += "</div>",
                $(A).length || T.append(q),
                $(A).imagesLoaded(function() {
                    var E = $(A)
                      , B = S.offset().left
                      , D = S.offset().top
                      , U = E.outerWidth()
                      , W = E.outerHeight()
                      , H = T.offset().left
                      , V = T.offset().top
                      , G = T.outerWidth() - (B + U)
                      , R = "hotspot-right";
                    50 > G ? (B = B - U - 5,
                    R = "hotspot-left") : B = B + S.outerWidth() + 5,
                    D = D + S.outerHeight() / 2 - W / 2,
                    E.css({
                        left: B - H,
                        top: D - V
                    }).removeClass("hotspot-left").removeClass("hotspot-right").addClass(R),
                    S.addClass("hotspot_init"),
                    E.removeClass("hotspot-loading").fadeIn("fast")
                }),
                $(A).find("img").length) {
                    var F = $(A).find("img");
                    F.attr("src", F.attr("data-src")).removeAttr("data-src").attr("srcset", F.attr("data-srcset")).removeAttr("data-srcset")
                }
            } else {
                var T = S.closest(".roarlookbook");
                roarLookbook.resetHotspots(T)
            }
        }),
        $(document).on("click", ".hotspot-close", function() {
            var S = $(this)
              , T = S.closest(".hotspot-widget")
              , P = T.attr("id")
              , I = P.split("-")
              , A = I[1];
            $(".roarlookbook .hotspot[data-id=\"" + A + "\"]").removeClass("hotspot_init"),
            T.fadeOut("fast", function() {
                T.remove()
            })
        }),
        $(".roarlookbook").on("click", ".image-preview", function() {
            var S = $(this).closest(".roarlookbook");
            roarLookbook.resetHotspots(S)
        }),
        $(window).resize(function() {
            $(".roarlookbook .hotspot_init").length && $(".roarlookbook .hotspot_init").each(function() {
                var S = $(this);
                S.removeClass("hotspot_init").trigger("click")
            })
        })
    },
    addToCart: function() {
        $(document).on("click", ".roar_add_to_cart", function(y) {
            y.preventDefault();
            var S = $(this)
              , T = S.closest(".roarlookbook")
              , P = S.attr("href");
            $.ajax({
                type: "GET",
                url: P,
                beforeSend: function() {},
                success: function(I) {
                    var A = $(I).find("form[action=\"/cart/add\"]");
                    A.appendTo(T).submit().remove()
                },
                dataType: "html"
            })
        })
    },
    init: function() {
        $(".roarlookbook").length && (roarLookbook.buildLookbook(),
        roarLookbook.hotspotPopup(),
        roarLookbook.addToCart())
    }
};
theme.CurrencyPicker = function() {
    function y() {
        if ("false" == N.auto_switch)
            return !1;
        var L = Currency.cookie.read();
        null == L && $.getJSON("//ipinfo.io/json", function(M) {
            var q = JSON.parse(JSON.stringify(M, null, 2));
            "undefined" != typeof q.country && $.getJSON("//restcountries.eu/rest/v1/alpha/" + q.country, function(O) {
                var F = O.currencies
                  , E = F[0];
                $(z.currencyPicker + "[data-code=\"" + E + "\"]").trigger("click")
            })
        })
    }
    function S() {
        if ("false" == N.original_price)
            return !1;
        var L = Currency.currentCurrency
          , M = Currency.cookie.read()
          , q = N.shop_currency;
        M && (L = M),
        $(z.selector).each(function() {
            var O = $(this);
            if (O.removeAttr("data-currency-default"),
            q != L) {
                var F = O.attr("data-currency-" + q);
                "USD" == q && (F += " USD"),
                O.attr("data-currency-default", F)
            }
        })
    }
    function T() {
        return $(z.currencyNotification).length ? Currency.currentCurrency == N.shop_currency ? void $(z.currencyNotification).removeClass("loaded").slideUp() : void $(z.currencyNotification).each(function() {
            var L = $(this)
              , M = L.data("html")
              , q = "<strong>" + Currency.currentCurrency + "</strong>";
            M = M.replace(/{{ current_currency }}/g, q),
            L.html(M),
            L.hasClass("loaded") || L.addClass("loaded").slideDown()
        }) : void 0
    }
    var z = {
        selector: ".money",
        container: ".currency__picker",
        currency: ".currency__picker .currency__switcher",
        currencyPicker: ".currency__picker .currency",
        currencyActive: ".currency__picker .currency.active",
        currencyCurrent: ".currency__picker .currency__current",
        currencyNotification: ".currency__notification"
    }
      , N = {
        currency_format: "",
        shop_currency: "",
        default_currency: "",
        money_with_currency_format: "",
        money_format: "",
        auto_switch: "true",
        original_price: "true"
    };
    return {
        init: function() {
            if ($(z.currency).length) {
                var L = $(z.container);
                N.currency_format = L.find(".currency_format").val(),
                N.shop_currency = L.find(".shop_currency").val(),
                N.default_currency = L.find(".default_currency").val(),
                N.money_with_currency_format = L.find(".money_with_currency_format").val(),
                N.money_format = L.find(".money_format").val(),
                N.auto_switch = L.find(".auto_switch").val(),
                N.original_price = L.find(".original_price").val(),
                Currency.format = N.currency_format;
                var M = N.shop_currency;
                Currency.moneyFormats[M].money_with_currency_format = N.money_with_currency_format,
                Currency.moneyFormats[M].money_format = N.money_format;
                var q = N.default_currency
                  , O = Currency.cookie.read();
                $(".money .money").each(function() {
                    $(this).parents(".money").removeClass("money")
                }),
                $(z.selector).each(function() {
                    var B = $(this);
                    if ("undefined" == typeof B.attr("data-currency-" + N.shop_currency)) {
                        var D = B.text();
                        B.attr("data-currency-" + N.shop_currency, D)
                    }
                }),
                null == O ? M === q ? Currency.currentCurrency = q : Currency.convertAll(M, q, z.selector) : $(z.currency).length && 0 === $(z.currency + " .currency[data-code=" + O + "]").size() ? (Currency.currentCurrency = M,
                Currency.cookie.write(M)) : O === M ? Currency.currentCurrency = M : Currency.convertAll(M, O, z.selector),
                $(z.currency).on("click", ".currency:not(.active)", function() {
                    var B = $(this).data("code");
                    Currency.convertAll(Currency.currentCurrency, B, z.selector),
                    $(z.currencyPicker).removeClass("active"),
                    $(this).addClass("active"),
                    $(z.currencyCurrent).text(Currency.currentCurrency).attr("data-code", Currency.currentCurrency),
                    S(),
                    T()
                });
                var F = window.selectCallback;
                $(z.currencyPicker).removeClass("active"),
                $(z.currency + " .currency[data-code=" + Currency.currentCurrency + "]").addClass("active"),
                $(z.currencyCurrent).text(Currency.currentCurrency).attr("data-code", Currency.currentCurrency),
                S(),
                y(),
                T()
            }
        },
        convert: function(L) {
            $(z.currency).length && ($(L).each(function() {
                var M = $(this);
                if ("undefined" == typeof M.attr("data-currency-" + N.shop_currency)) {
                    var q = M.text();
                    M.attr("data-currency-" + N.shop_currency, q)
                }
            }),
            Currency.convertAll(N.shop_currency, $(z.currencyActive).attr("data-code"), L, N.currency_format),
            S())
        },
        convertAll: function() {
            $(z.currency).length && ($(z.selector).each(function() {
                var L = $(this);
                if ("undefined" == typeof L.attr("data-currency-" + N.shop_currency)) {
                    var M = L.text();
                    L.attr("data-currency-" + N.shop_currency, M)
                }
            }),
            Currency.convertAll(N.shop_currency, $(z.currencyActive).attr("data-code"), z.selector),
            S())
        }
    }
}(),
theme.LanguagePicker = function() {
    function y(P) {
        $(T.selector + " .goog-te-combo").val(P);
        var I = document.getElementsByClassName("goog-te-combo")[0], A = "change", z;
        document.createEvent ? (z = document.createEvent("HTMLEvents"),
        z.initEvent(A, !0, !0),
        I.dispatchEvent(z)) : (z = document.createEventObject(),
        z.eventType = A,
        I.fireEvent("on" + z.eventType, z))
    }
    var T = {
        language: ".language__picker .language__switcher",
        languagePicker: ".language__picker .language",
        languageCurrent: ".language__picker .language__current",
        selector: "#weketing_google_translate_element"
    };
    return {
        init: function() {
            $(T.language).length && $(T.selector).length && ($(T.selector).bind("google_translate", function() {
                var P = weketingJS.settingsJS[8];
                if ("yes" == P.enable) {
                    for (var I = P.default_language, A = P.custom_languages, z = weketingSGT.languages(), N = localStorage.getItem("roarStorage_language"), L = 0; L < A.length - 1; L++)
                        if (A[L] == I) {
                            A.pop();
                            break
                        }
                    for (var L = 0; L < A.length; L++)
                        if (A[L] == N) {
                            I = N;
                            break
                        }
                    for (var M, L = 0; L < A.length; L++)
                        M = "<li class=\"language active notranslate\" data-code=\"" + I + "\">" + z[I] + "</li>",
                        A[L] != I && (M = "<li class=\"language notranslate\" data-code=\"" + A[L] + "\">" + z[A[L]] + "</li>"),
                        $(T.language).append(M);
                    $(T.languageCurrent).text(z[I]),
                    y(I)
                }
            }),
            $("body").on("click", T.languagePicker + ":not(.active)", function() {
                var P = $(this).data("code");
                if ("" != P) {
                    var I = $(this).text();
                    $(T.languagePicker).removeClass("active"),
                    $(T.languagePicker + "[data-code=\"" + P + "\"]").addClass("active"),
                    $(T.languageCurrent).text(I),
                    localStorage.setItem("roarStorage_language", P),
                    y(P)
                }
            }),
            0 < $(".dropdown.language-switcher").length && $(".dropdown.language-switcher").hover(function() {
                0 < $(".dropdown.language-switcher select").length && $(".dropdown.language-switcher select").attr("size", "4")
            }))
        }
    }
}(),
window.theme = window.theme || {},
theme.Sections = function() {
    this.constructors = {},
    this.instances = [],
    $(document).on("shopify:section:load", this._onSectionLoad.bind(this)).on("shopify:section:unload", this._onSectionUnload.bind(this)).on("shopify:section:select", this._onSelect.bind(this)).on("shopify:section:deselect", this._onDeselect.bind(this)).on("shopify:block:select", this._onBlockSelect.bind(this)).on("shopify:block:deselect", this._onBlockDeselect.bind(this))
}
,
theme.Sections.prototype = _.assignIn({}, theme.Sections.prototype, {
    _createInstance: function(y, S) {
        var T = $(y)
          , P = T.attr("data-section-id")
          , I = T.attr("data-section-type");
        if (S = S || this.constructors[I],
        !_.isUndefined(S)) {
            var A = _.assignIn(new S(y), {
                id: P,
                type: I,
                container: y
            });
            this.instances.push(A)
        }
    },
    _onSectionLoad: function(y) {
        var S = $("[data-section-id]", y.target)[0];
        S && this._createInstance(S),
        roar.initLazyLoading()
    },
    _onSectionUnload: function(y) {
        this.instances = _.filter(this.instances, function(S) {
            var T = S.id === y.originalEvent.detail.sectionId;
            return T && _.isFunction(S.onUnload) && S.onUnload(y),
            !T
        })
    },
    _onSelect: function(y) {
        var S = _.find(this.instances, function(T) {
            return T.id === y.originalEvent.detail.sectionId
        });
        !_.isUndefined(S) && _.isFunction(S.onSelect) && S.onSelect(y)
    },
    _onDeselect: function(y) {
        var S = _.find(this.instances, function(T) {
            return T.id === y.originalEvent.detail.sectionId
        });
        !_.isUndefined(S) && _.isFunction(S.onDeselect) && S.onDeselect(y)
    },
    _onBlockSelect: function(y) {
        var S = _.find(this.instances, function(T) {
            return T.id === y.originalEvent.detail.sectionId
        });
        !_.isUndefined(S) && _.isFunction(S.onBlockSelect) && S.onBlockSelect(y)
    },
    _onBlockDeselect: function(y) {
        var S = _.find(this.instances, function(T) {
            return T.id === y.originalEvent.detail.sectionId
        });
        !_.isUndefined(S) && _.isFunction(S.onBlockDeselect) && S.onBlockDeselect(y)
    },
    register: function(y, S) {
        this.constructors[y] = S,
        $("[data-section-type=" + y + "]").each(function(T, P) {
            this._createInstance(P, S)
        }
        .bind(this))
    }
}),
window.slate = window.slate || {},
theme.Images = function() {
    return {
        preload: function(z, N) {
            "string" == typeof z && (z = [z]);
            for (var M, L = 0; L < z.length; L++)
                M = z[L],
                this.loadImage(this.getSizedImageUrl(M, N))
        },
        loadImage: function(z) {
            new Image().src = z
        },
        switchImage: function(z, N, L) {
            var M = this.imageSize(N.src)
              , q = this.getSizedImageUrl(z.src, M);
            L ? L(q, z, N) : N.src = q
        },
        imageSize: function(z) {
            var N = z.match(/.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[_\.@]/);
            return null === N ? null : N[1]
        },
        getSizedImageUrl: function(z, N) {
            if (null == N)
                return z;
            if ("master" === N)
                return this.removeProtocol(z);
            var L = z.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);
            if (null != L) {
                var M = z.split(L[0])
                  , q = L[0];
                return this.removeProtocol(M[0] + "_" + N + q)
            }
            return null
        },
        removeProtocol: function(z) {
            return z.replace(/http(s)?:/, "")
        }
    }
}(),
theme.Currency = function() {
    return {
        formatMoney: function(T, P) {
            function I(L, M, q, O) {
                if (q = q || ",",
                O = O || ".",
                isNaN(L) || null === L)
                    return 0;
                L = (L / 100).toFixed(M);
                var F = L.split(".")
                  , E = F[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + q)
                  , B = F[1] ? O + F[1] : "";
                return E + B
            }
            "string" == typeof T && (T = T.replace(".", ""));
            var A = ""
              , z = /\{\{\s*(\w+)\s*\}\}/
              , N = P || "${{amount}}";
            switch (N.match(z)[1]) {
            case "amount":
                A = I(T, 2);
                break;
            case "amount_no_decimals":
                A = I(T, 0);
                break;
            case "amount_with_comma_separator":
                A = I(T, 2, ".", ",");
                break;
            case "amount_no_decimals_with_comma_separator":
                A = I(T, 0, ".", ",");
                break;
            case "amount_no_decimals_with_space_separator":
                A = I(T, 0, " ");
                break;
            case "amount_with_apostrophe_separator":
                A = I(T, 2, "'");
            }
            return N.replace(z, A)
        }
    }
}(),
slate.Variants = function() {
    function y(S) {
        this.$container = S.$container,
        this.product = S.product,
        this.singleOptionSelector = S.singleOptionSelector,
        this.originalSelectorId = S.originalSelectorId,
        this.enableHistoryState = S.enableHistoryState,
        this.currentVariant = this._getVariantFromOptions(),
        $(this.singleOptionSelector, this.$container).on("change", this._onSelectChange.bind(this))
    }
    return y.prototype = _.assignIn({}, y.prototype, {
        _getCurrentOptions: function() {
            var S = _.map($(this.singleOptionSelector, this.$container), function(T) {
                var P = $(T)
                  , I = P.attr("type")
                  , A = {};
                return "radio" === I || "checkbox" === I ? !!P[0].checked && (A.value = P.val(),
                A.index = P.data("index"),
                A) : (A.value = P.val(),
                A.index = P.data("index"),
                A)
            });
            return S = _.compact(S),
            S
        },
        _getVariantFromOptions: function() {
            var S = this._getCurrentOptions()
              , T = this.product.variants
              , P = _.find(T, function(I) {
                return S.every(function(A) {
                    return _.isEqual(I[A.index], A.value)
                })
            });
            return P
        },
        _onSelectChange: function() {
            var S = this._getVariantFromOptions();
            this.$container.trigger({
                type: "variantChange",
                variant: S
            }),
            S && (this._updateMasterSelect(S),
            this._updateImages(S),
            this._updatePrice(S),
            this._updateSKU(S),
            this.currentVariant = S,
            this.enableHistoryState && this._updateHistoryState(S))
        },
        _updateImages: function(S) {
            var T = S.featured_image || {}
              , P = this.currentVariant.featured_image || {};
            S.featured_image && T.src !== P.src && this.$container.trigger({
                type: "variantImageChange",
                variant: S
            })
        },
        _updatePrice: function(S) {
            S.price === this.currentVariant.price && S.compare_at_price === this.currentVariant.compare_at_price || this.$container.trigger({
                type: "variantPriceChange",
                variant: S
            })
        },
        _updateSKU: function(S) {
            S.sku === this.currentVariant.sku || this.$container.trigger({
                type: "variantSKUChange",
                variant: S
            })
        },
        _updateHistoryState: function(S) {
            if (history.replaceState && S) {
                var T = window.location.protocol + "//" + window.location.host + window.location.pathname + "?variant=" + S.id;
                window.history.replaceState({
                    path: T
                }, "", T)
            }
        },
        _updateMasterSelect: function(S) {
            $(this.originalSelectorId, this.$container).val(S.id)
        }
    }),
    y
}(),
window.theme = window.theme || {},
theme.Product = function() {
    function y(S) {
        var T = this.$container = $(S)
          , P = this.sectionId = T.attr("data-section-id")
          , I = T.attr("data-section-type");
        this.settings = {
            imageSize: null,
            namespace: ".product-page-section",
            sectionId: P,
            sliderActive: !1,
            swatch_color: T.attr("data-product_swatch_color"),
            swatch_size: T.attr("data-product_swatch_size"),
            variant_image_grouped: T.attr("data-variant_image_grouped"),
            swatch_color_advanced: T.attr("data-product_swatch_color_advanced"),
            product_design: T.attr("data-product_design"),
            product_image_count: T.data("product_image_count")
        },
        this.selectors = {
            product: "#ProductSection-" + P,
            addToCart: "#AddToCart-" + P,
            addToCartText: "#AddToCartText-" + P,
            stockText: ".stock-" + P,
            comparePrice: "#ComparePrice-" + P,
            originalPrice: "#ProductPrice-" + P,
            SKU: ".variant-sku",
            originalPriceWrapper: ".product-price__price-" + P,
            originalSelectorId: "#ProductSelect-" + P,
            productFeaturedImage: ".FeaturedImage-" + P,
            productImageWrap: "#FeaturedImageZoom-" + P,
            productPrices: ".product-single__price-" + P,
            productThumbImages: "#product-thumbnails-" + P,
            productMainImages: "#product-images-" + P,
            productPreviewMainImages: ".product-preview-images-" + P,
            saleLabel: ".product-price__sale-label-" + P,
            singleOptionSelector: ".single-option-selector-" + P,
            singleOptionSelectorId: "#single-option-selector-" + P,
            singleOptionSwatches: "wrapper-swatches-" + P,
            instagramProduct: "#product-instagram-" + P,
            instagramProductNameSpace: "product-instagram-" + P,
            variationsSelector: "#variations-" + P,
            variationSelector: ".variation-select-" + P,
            qtyVariant: ".qty-variant-" + P,
            threedId: ".threed-id-" + P,
            countDownId: ".countdown-" + P,
            couponCode: "#coupon-code-" + P,
            couponBtn: "#coupon-btn-" + P,
            sidebarSlide: ".sidebar-slick-vertical-" + P,
            optionsSelect: "#single-option-selector-" + P,
            stickCart: "#sticky-info-" + P,
            cartAgree: "#product-cart__agree-" + P,
            cartCheckout: "#product-buy__1click-" + P,
            groupedProduct: "#products-grouped-" + P,
            groupedButton: "#grouped-add-button-" + P,
            groupedCheckbox: "#products-grouped-" + P + " .grouped-checkbox"
        },
        $("#ProductJson-" + P).html() && (this.productSingleObject = JSON.parse(document.getElementById("ProductJson-" + P).innerHTML),
        this.productSwatchSingleObject = JSON.parse(document.getElementById("ProductSwatchJson-" + P).innerHTML),
        this._stringOverrides(),
        this._initVariants(),
        this._initSwatches(),
        this._initFeature(),
        this._initCompact(),
        this._initStickyImages(),
        this._initThumbnailsGallery(),
        this._initImages(),
        this._initSidebar(),
        this._initZoom(),
        this._initGallery(),
        this._instagramProducts(),
        this._initQuantity(),
        this._initTabs(),
        this._initHandleProduct(),
        this._checkoutCart(),
        "product-template" == P && this._initRelatedProducts(),
        "product-template" == P && this._initViewedProducts(),
        "product-template" == P && this._initUpsellProducts(),
        "product-template" == P && this._initStickyInfo(),
        "product-template" == P && this._initGroupedProduct())
    }
    return y.prototype = _.assignIn({}, y.prototype, {
        _stringOverrides: function() {
            theme.productStrings = theme.productStrings || {},
            $.extend(theme.strings, theme.productStrings)
        },
        _initGroupedProduct: function() {
            var S = $(this.selectors.groupedProduct);
            0 == S.length || ($(document).on("change", this.selectors.groupedCheckbox, function() {
                $(this).is(":checked") ? $($(this).data("id")).removeClass("hide") : $($(this).data("id")).addClass("hide"),
                roar.updateGroupedPrice()
            }),
            0 < $(this.selectors.groupedButton).length && $(this.selectors.groupedButton).unbind("click"),
            $(document).on("click", this.selectors.groupedButton, function() {
                var T = $(this);
                return Shopify.queue = [],
                S.find(".grouped-checkbox").each(function() {
                    if ($(this).is(":checked")) {
                        var P = $($(this).data("id")).find("form .variation-select").val();
                        null !== P && Shopify.queue.push({
                            variantId: P,
                            quantity: 1
                        })
                    }
                }),
                Shopify.moveAlong = function() {
                    if (Shopify.queue.length)
                        var P = Shopify.queue.shift()
                          , I = $.ajax({
                            type: "POST",
                            url: "/cart/add.js",
                            async: !0,
                            cache: !1,
                            data: {
                                quantity: P.quantity,
                                id: P.variantId
                            },
                            dataType: "json",
                            beforeSend: function() {
                                T.addClass("loading")
                            },
                            complete: function() {
                                roar.updateCart(T, !1)
                            },
                            error: function(A) {
                                var z = $.parseJSON(A.responseText)
                                  , N = z.message + ": " + z.description;
                                alert(N)
                            },
                            success: function() {
                              cspHandleCart()
                              .then(Shopify.moveAlong);
                              
                              // Shopify.moveAlong()
                            }
                        });
                    else
                        window.location.href = "/cart"
                }
                ,
                Shopify.moveAlong(),
                !1
            }))
        },
        _initStickyInfo: function() {
            if ($(this.selectors.stickCart).length) {
                var S = this
                  , T = 0
                  , P = $("header").outerHeight() + $(".mini-breadcrumb").outerHeight() + $(".product-section-wrapper").offset().top;
                $(window).scroll(function() {
                    var I = $(this).scrollTop();
                    I > P ? $("body").addClass("show-sticky-info-product") : $("body").removeClass("show-sticky-info-product"),
                    T = I
                }),
                $("body").on("click", ".sticky-button.button-cart", function() {
                    0 < $(S.selectors.addToCart).length && $(S.selectors.addToCart).trigger("click")
                })
            }
        },
        _checkoutCart: function() {
            var S = this;
            $(document).on("DOMNodeInserted", S.selectors.cartCheckout, function() {
                var T = $(this);
                setTimeout(function() {
                    var P = T.find(".shopify-payment-button__button");
                    P.length && (T.hide(),
                    setTimeout(function() {
                        var I = $(S.selectors.cartAgree);
                        I.is(":checked") ? P.removeClass("btn-disabled") : P.addClass("btn-disabled"),
                        T.fadeIn()
                    }, 300))
                }, 0)
            }),
            $(document).on("change", S.selectors.cartAgree, function() {
                var P = $(this)
                  , I = $(S.selectors.cartCheckout).find(".shopify-payment-button__button");
                P.is(":checked") ? I.removeClass("btn-disabled") : I.addClass("btn-disabled")
            })
        },
        _initTabs: function() {
            $("#tabs a").tabs()
        },
        _initHandleProduct: function() {
            0 == $("#main").next("#popup-product-sizechart").length && $("#main").after($("#popup-product-sizechart")),
            0 == $("#main").next("#popup-product-question").length && $("#main").after($("#popup-product-question")),
            $(".button-product-question").click(function() {
                var T = $(this).data("question")
                  , P = $(this).data("_qid");
                return $.magnificPopup.open({
                    items: {
                        src: "#popup-product-question",
                        type: "inline"
                    },
                    tLoading: "",
                    mainClass: "popup-module mfp-with-zoom",
                    removalDelay: 200
                }),
                !1,
                void ((0 < $(".quickview .mfp-content").find("#popup-product-question").length || 0 < $(".quickview .mfp-content").find("#popup-product-sizechart").length) && ($(".quickview.mfp-wrap").addClass("_reopen"),
                $(".quickview.mfp-wrap").data("_qid", P)))
            }),
            $(".button-product-sizechart").click(function() {
                var T = $(this).data("sizechart")
                  , P = $(this).data("_qid");
                return $.magnificPopup.open({
                    items: {
                        src: T,
                        type: "inline"
                    },
                    tLoading: "",
                    mainClass: "popup-module mfp-with-zoom",
                    removalDelay: 200
                }),
                !1,
                void ((0 < $(".quickview .mfp-content").find("#popup-product-sizechart").length || 0 < $(".quickview .mfp-content").find("#popup-product-question").length) && ($(".quickview.mfp-wrap").addClass("_reopen"),
                $(".quickview.mfp-wrap").data("_qid", P)))
            }),
            $(document).on("click", "#tabProduct a", function(S) {
                S.preventDefault(),
                $(this).tab("show")
            })
        },
        _initUpsellProducts: function() {
            var S = "#upsellProducts .carousel-inner";
            0 < $("#upsellProducts.carousel").length && $(S).slick({
                arrows: !1,
                slidesToShow: 4,
                responsive: [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4
                    }
                }, {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4
                    }
                }, {
                    breakpoint: 550,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }],
                rtl: window.rtl
            }),
            $("#upsellProduct_next").click(function() {
                return $(S).slick("slickNext"),
                !1
            }),
            $("#upsellProduct_prev").click(function() {
                return $(S).slick("slickPrev"),
                !1
            }),
            roar.initLazyLoading(S, !0)
        },
        _initRelatedProducts: function() {
            var S = "#myCarouselRelated .carousel-inner";
            0 < $("#myCarouselRelated.carousel").length && $(S).slick({
                arrows: !1,
                slidesToShow: 4,
                responsive: [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4
                    }
                }, {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4
                    }
                }, {
                    breakpoint: 550,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }],
                rtl: window.rtl
            }),
            $("#myCarouselRelated_next").click(function() {
                return $(S).slick("slickNext"),
                !1
            }),
            $("#myCarouselRelated_prev").click(function() {
                return $(S).slick("slickPrev"),
                !1
            }),
            roar.initLazyLoading(S, !0)
        },
        _initViewedProducts: function() {
            var S = RoarCookie.cookie.rtread("rt-recent")
              , T = $(".templateProduct #recently-viewed-products").data("handle")
              , P = $(".templateProduct #recently-viewed-products").data("id")
              , I = $(".templateProduct #recently-viewed-products").data("limit");
            if (null != S) {
                S = S.split(",");
                var S = S.reverse();
                if (1 < S.length ? $("#recently-viewed-products").show() : S != T && $("#recently-viewed-products").show(),
                $.ajax({
                    url: "/search?view=viewed&q=" + S + "_sp_" + P,
                    dataType: "html",
                    type: "GET",
                    success: function(A) {
                        $("#recently-viewed-products").html(A),
                        roar.initLazyLoading("#recently-viewed-products", !0),
                        roar.initProductQuickShopItem("#recently-viewed-products")
                    },
                    error: function() {
                        console.log("ajax error")
                    },
                    complete: function() {
                        var A = $("#myCarouselViewed .carousel-inner");
                        A.slick({
                            arrows: !1,
                            slidesToShow: 4,
                            responsive: [{
                                breakpoint: 1200,
                                settings: {
                                    slidesToShow: 4,
                                    slidesToScroll: 4
                                }
                            }, {
                                breakpoint: 768,
                                settings: {
                                    slidesToShow: 4,
                                    slidesToScroll: 4
                                }
                            }, {
                                breakpoint: 550,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 2
                                }
                            }],
                            rtl: window.rtl
                        }),
                        $("#myCarouselViewed_next").click(function() {
                            return A.slick("slickNext"),
                            !1
                        }),
                        $("#myCarouselViewed_prev").click(function() {
                            return A.slick("slickPrev"),
                            !1
                        }),
                        roar.handleQuickshop("#recently-viewed-products")
                    }
                }),
                0 > S.indexOf(T)) {
                    S.length >= I && S.pop(),
                    S.push(T);
                    try {
                        S = S.join(",")
                    } catch (A) {}
                }
            } else
                S = T;
            RoarCookie.cookie.rtwrite("rt-recent", S)
        },
        _initImages: function() {
            var S = this
              , T = $(S.selectors.productMainImages)
              , P = !1;
            if (1 == parseInt(window.rtl) && (P = !0),
            "left" == this.settings.product_design || "bottom" == this.settings.product_design || "compact2" == this.settings.product_design || "split" == this.settings.product_design || "sidebar" == this.settings.product_design || "simple" == this.settings.product_design || "full-screen" == this.settings.product_design) {
                if (0 < $(S.selectors.productThumbImages).length) {
                    var I = $(S.selectors.productThumbImages).find(".thumbnails")
                      , A = "0" != $(S.selectors.productThumbImages).data("vertical")
                      , z = 6
                      , N = !1;
                    if (6 < this.settings.product_image_count ? (z = 6,
                    N = !0) : z = this.settings.product_image_count - 1,
                    $(".product-page-section").hasClass("product-has-sidebar") && (3 < this.settings.product_image_count ? (z = 3,
                    N = !0) : z = this.settings.product_image_count - 1),
                    !0 == N)
                        T.not(".slick-initialized").slick({
                            rtl: P,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            infinite: !1,
                            adaptiveHeight: !0,
                            asNavFor: I,
                            prevArrow: "<span class=\"fa fa-angle-left slick-prev-arrow\"></span>",
                            nextArrow: "<span class=\"fa fa-angle-right slick-next-arrow\"></span>"
                        }),
                        I.not(".slick-initialized").slick({
                            slidesToShow: z,
                            slidesToScroll: 1,
                            asNavFor: T,
                            focusOnSelect: !0,
                            vertical: A,
                            infinite: !1,
                            prevArrow: "<span class=\"fa fa-angle-up slick-prev-arrow\"></span>",
                            nextArrow: "<span class=\"fa fa-angle-down slick-next-arrow\"></span>",
                            responsive: [{
                                breakpoint: 1024,
                                settings: {
                                    slidesToShow: 3
                                }
                            }, {
                                breakpoint: 992,
                                settings: {
                                    slidesToShow: 3
                                }
                            }, {
                                breakpoint: 768,
                                settings: {
                                    slidesToShow: 3
                                }
                            }]
                        });
                    else {
                        T.not(".slick-initialized").slick({
                            rtl: P,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            infinite: !1,
                            adaptiveHeight: !0,
                            prevArrow: "<span class=\"fa fa-angle-left slick-prev-arrow\"></span>",
                            nextArrow: "<span class=\"fa fa-angle-right slick-next-arrow\"></span>"
                        });
                        var L = this.settings.product_design
                          , M = $(this.selectors.productFeaturedImage)
                          , q = $(this.selectors.productMainImages);
                        I.find(".thumbnails-item").on("click", function(F) {
                            F.preventDefault();
                            var E = $(this).data("href").replace("https:", "").replace("http:", "").split("?v=")[0];
                            M.each(function() {
                                var D = $(this)
                                  , U = D.attr("href");
                                if (0 <= U.indexOf(E) && !D.closest(".slick-slide").hasClass("slick-cloned")) {
                                    var W = D.closest(".slick-slide").attr("data-slick-index");
                                    return void ("carousel" == L ? q.slick("slickGoTo", W) : q.slick("slickGoTo", W, !0))
                                }
                            }),
                            I.find(".thumbnails-item").removeClass("current"),
                            $(this).addClass("current")
                        }),
                        q.on("beforeChange", function(F, E, B, D) {
                            console.log(D),
                            console.log(M);
                            var U = $(M[D]).attr("href").replace("https:", "").replace("http:", "").split("?v=")[0];
                            I.find(".thumbnails-item").each(function() {
                                var H = $(this)
                                  , V = H.data("href");
                                if (0 <= V.indexOf(U))
                                    return I.find(".thumbnails-item").removeClass("current"),
                                    void $(this).addClass("current")
                            })
                        })
                    }
                }
            } else if ("carousel" == this.settings.product_design) {
                var O = T.width() / 4;
                T.not(".slick-initialized").slick({
                    rtl: P,
                    centerMode: !0,
                    centerPadding: O + "px",
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    adaptiveHeight: !0,
                    prevArrow: "<span class=\"fa fa-angle-left slick-prev-arrow\"></span>",
                    nextArrow: "<span class=\"fa fa-angle-right slick-next-arrow\"></span>",
                    responsive: [{
                        breakpoint: 1680,
                        settings: {
                            centerMode: !0,
                            centerPadding: "400px",
                            slidesToShow: 1
                        }
                    }, {
                        breakpoint: 1440,
                        settings: {
                            centerMode: !0,
                            centerPadding: "350px",
                            slidesToShow: 1
                        }
                    }, {
                        breakpoint: 1200,
                        settings: {
                            centerMode: !0,
                            centerPadding: "300px",
                            slidesToShow: 1
                        }
                    }, {
                        breakpoint: 1024,
                        settings: {
                            arrows: !1,
                            centerMode: !0,
                            centerPadding: "250px",
                            slidesToShow: 1
                        }
                    }, {
                        breakpoint: 992,
                        settings: {
                            centerMode: !0,
                            centerPadding: "200px",
                            slidesToShow: 1
                        }
                    }, {
                        breakpoint: 768,
                        settings: {
                            arrows: !1,
                            centerMode: !0,
                            centerPadding: "125px",
                            slidesToShow: 1
                        }
                    }, {
                        breakpoint: 480,
                        settings: {
                            arrows: !1,
                            centerMode: !0,
                            centerPadding: "50px",
                            slidesToShow: 1
                        }
                    }]
                })
            } else
                T.not(".slick-initialized").slick({
                    rtl: P,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: !1,
                    adaptiveHeight: !0,
                    asNavFor: I,
                    prevArrow: "<span class=\"fa fa-angle-left slick-prev-arrow\"></span>",
                    nextArrow: "<span class=\"fa fa-angle-right slick-next-arrow\"></span>"
                });
            T.imagesLoaded(function() {
                T.addClass("loaded")
            })
        },
        _initThumbnailsGallery: function() {
            var S = $(this.selectors.productMainImages);
            "gallery" == this.settings.product_design && $(".thumbnail-gallery-item").on("click", function() {
                var T = $(this);
                T.hasClass("active") || ($(".thumbnail-gallery-item").removeClass("active"),
                T.addClass("active"),
                $(".thumbnail-gallery-item").each(function(P) {
                    if ($(this).attr("id") == T.attr("id"))
                        return void S.slick("slickGoTo", P, !0)
                }))
            })
        },
        _initQuantity: function() {
            $(".q_up").unbind("click"),
            $(".q_up").on("click", function() {
                var S = $(this).data("product_id")
                  , T = parseInt($(".quantity-cart-" + S).val()) + 1;
                $(".quantity-cart-" + S).val(T)
            }),
            $(".q_down").unbind("click"),
            $(".q_down").on("click", function() {
                var S = $(this).data("product_id")
                  , T = parseInt($(".quantity-cart-" + S).val());
                1 < T && $(".quantity-cart-" + S).val(T - 1)
            })
        },
        _initPopup: function() {
            $(".sizechart-btn").magnificPopup({
                type: "image",
                midClick: !0
            }),
            $(".return-btn").click(function() {
                return $.magnificPopup.open({
                    items: {
                        src: "#delivery-return",
                        type: "inline"
                    },
                    tLoading: "",
                    mainClass: "popup-wrapper mfp-with-zoom",
                    removalDelay: 200
                }),
                !1
            })
        },
        _initFeature: function() {
            if (0 < $(this.selectors.product + " .product-video-button a").length && $(this.selectors.product + " .product-video-button a").unbind("click") && $(this.selectors.product + " .product-video-button a").click(function(q) {
                q.stopPropagation();
                var O = $(this).data("video")
                  , F = $(this).data("_qid");
                $.magnificPopup.open({
                    items: {
                        src: O,
                        type: "iframe"
                    },
                    type: "iframe",
                    mainClass: "mfp-fade",
                    removalDelay: 160,
                    preloader: !1,
                    disableOn: !1,
                    fixedContentPos: !1,
                    callbacks: {
                        beforeClose: function() {
                            console.log("Popup close has been initiated")
                        }
                    }
                }),
                (0 < $(".quickview .mfp-content").find(".product-360-view-wrapper").length || 0 < $(".quickview .mfp-content").find(".mfp-iframe-scaler").length) && ($(".quickview.mfp-wrap").addClass("_reopen"),
                $(".quickview.mfp-wrap").data("_qid", F))
            }),
            0 < $(this.selectors.product + " .product-360-button a").length) {
                for (var L, T = $(this.selectors.product + " .product-360-button a").data("id"), P = $(this.selectors.product + " .product-360-button a").data("_qid"), I = $(this.selectors.product + " .product-360-button a"), A = [], z = JSON.parse(document.getElementById("threed-id-" + this.sectionId).innerHTML), N = 1; 72 >= N; N++)
                    L = "f" + N,
                    z[L] && A.push(z[L]);
                if (0 < A.length) {
                    var M = A.length;
                    $(this.selectors.threedId).ThreeSixty({
                        totalFrames: M,
                        endFrame: M,
                        currentFrame: 1,
                        imgList: ".threed-view-images",
                        progress: ".spinner",
                        imgArray: A,
                        height: null,
                        width: null,
                        responsive: !0,
                        navigation: !0,
                        onReady: function() {
                            0 == $("#main").next(".product-360-view-wrapper").length && $("#main").after($(T)),
                            I.unbind("click") && I.click(function() {
                                $.magnificPopup.open({
                                    items: {
                                        src: T,
                                        type: "inline"
                                    },
                                    type: "inline",
                                    mainClass: "mfp-fade",
                                    removalDelay: 160,
                                    disableOn: !1,
                                    preloader: !1,
                                    fixedContentPos: !1,
                                    callbacks: {
                                        open: function() {
                                            console.log("xx11"),
                                            $(window).resize()
                                        }
                                    }
                                }),
                                $(window).resize(),
                                (0 < $(".quickview .mfp-content").find(".product-360-view-wrapper").length || 0 < $(".quickview .mfp-content").find(".mfp-iframe-scaler").length) && ($(".quickview.mfp-wrap").addClass("_reopen"),
                                $(".quickview.mfp-wrap").data("_qid", P))
                            })
                        }
                    })
                }
            }
        },
        _initCompact: function() {
            0 < $(".product-accordions").length && $(".product-accordions .tab-heading").unbind("click") && $(".product-accordions .tab-heading").click(function(S) {
                S.preventDefault();
                var T = $(this)
                  , P = T.closest(".product-accordion")
                  , I = T.closest(".product-accordions");
                P.hasClass("active") ? (P.removeClass("active"),
                P.find(".product-accordion-content").stop(!0, !0).slideUp()) : (I.find(".product-accordion").removeClass("active"),
                P.addClass("active"),
                I.find(".product-accordion-content").stop(!0, !0).slideUp(),
                P.find(".product-accordion-content").stop(!0, !0).slideDown())
            })
        },
        _initStickyImages: function() {
            $("body").hasClass("fastor-product-design-sticky") && $(".product-design-sticky .product-summary").stick_in_parent()
        },
        _instagramProducts: function() {
            if (0 < $("#instagram_product").length) {
                var T = $("#instagram_product").data("instagram_token")
                  , P = $("#instagram_product").data("user_id")
                  , I = $("#instagram_product").data("instagram_limit")
                  , A = new Instafeed({
                    get: "user",
                    target: "instagram_product",
                    accessToken: T,
                    userId: P,
                    limit: I,
                    resolution: "thumbnail",
                    resolution2: "standard_resolution",
                    template: "<div class=\"wrap animated\"><a target=\"_blank\" href=\"{{link}}\"><img src=\"{{image}}\" alt=\"{{caption}}\" width=\"150\" height=\"150\" /><span class=\"hover_border\"></span></a></div>"
                });
                A.run()
            }
        },
        _initGallery: function() {
            (function(T) {
                function P(E, B) {
                    return -1 < (" " + E.className + " ").indexOf(" " + B + " ")
                }
                for (var I = function(E) {
                    for (var W, H, V, G, B = $(E).find(".photoswipe-item").get(), D = B.length, U = [], R = 0; R < D; R++)
                        if (W = B[R],
                        1 === W.nodeType)
                            if (H = W.children[0],
                            V = H.getAttribute("data-size").split("x"),
                            "video" == $(H).data("type")) {
                                var Q = $($(H).data("id")).html();
                                U.push({
                                    html: Q
                                })
                            } else
                                G = {
                                    src: H.getAttribute("href"),
                                    w: parseInt(V[0], 10),
                                    h: parseInt(V[1], 10)
                                },
                                1 < W.children.length && (G.title = $(W).find(".caption").html()),
                                0 < H.children.length && (G.msrc = H.children[0].getAttribute("src")),
                                G.el = W,
                                U.push(G);
                    return U
                }, A = function E(B, D) {
                    return B && (D(B) ? B : E(B.parentNode, D))
                }, z = function(E) {
                    E = E || window.event,
                    E.preventDefault ? E.preventDefault() : E.returnValue = !1;
                    var B = E.target || E.srcElement
                      , D = A(B, function(Q) {
                        return P(Q, "photoswipe-item")
                    });
                    if (D) {
                        for (var G, U = D.closest(".photoswipe-wrapper"), W = $(D.closest(".photoswipe-wrapper")).find(".photoswipe-item").get(), H = W.length, V = 0, R = 0; R < H; R++)
                            if (1 === W[R].nodeType) {
                                if (W[R] === D) {
                                    G = V;
                                    break
                                }
                                V++
                            }
                        return 0 <= G && L(G, U),
                        !1
                    }
                }, N = function() {
                    var E = window.location.hash.substring(1)
                      , B = {};
                    if (5 > E.length)
                        return B;
                    for (var D = E.split("&"), U = 0; U < D.length; U++)
                        if (D[U]) {
                            var W = D[U].split("=");
                            2 > W.length || (B[W[0]] = W[1])
                        }
                    return B.gid && (B.gid = parseInt(B.gid, 10)),
                    B
                }, L = function(E, B, D, U) {
                    var H, V, G, W = document.querySelectorAll(".pswp")[0];
                    if (G = I(B),
                    V = {
                        closeOnScroll: !1,
                        galleryUID: B.getAttribute("data-pswp-uid")
                    },
                    !U)
                        V.index = parseInt(E, 10);
                    else if (V.galleryPIDs) {
                        for (var R = 0; R < G.length; R++)
                            if (G[R].pid == E) {
                                V.index = R;
                                break
                            }
                    } else
                        V.index = parseInt(E, 10) - 1;
                    isNaN(V.index) || (D && (V.showAnimationDuration = 0),
                    H = new PhotoSwipe(W,PhotoSwipeUI_Default,G,V),
                    H.init(),
                    H.listen("beforeChange", function() {
                        var Q = $(H.currItem.container);
                        $(".pswp__video").removeClass("active");
                        Q.find(".pswp__video").addClass("active");
                        $(".pswp__video").each(function() {
                            $(this).hasClass("active") || $(this).attr("src", $(this).attr("src"))
                        })
                    }),
                    H.listen("close", function() {
                        $(".pswp__video").each(function() {
                            $(this).attr("src", $(this).attr("src"))
                        }),
                        $(".pswp__container .video-wrapper").empty()
                    }))
                }, M = document.querySelectorAll(T), q = 0, O = M.length; q < O; q++)
                    M[q].setAttribute("data-pswp-uid", q + 1),
                    M[q].onclick = z;
                var F = N();
                F.pid && F.gid && L(F.pid, M[F.gid - 1], !0, !0)
            }
            )(this.selectors.product + " .photoswipe-wrapper")
        },
        _initZoom: function() {
            if ($(".easyzoom").length)
                if (1024 < $(window).width())
                    var S = $(".easyzoom:not(.feature-video)").easyZoom({
                        loadingNotice: "",
                        errorNotice: "",
                        preventClicks: !1
                    })
                      , T = S.data("easyZoom");
                else
                    $(".easyzoom a").click(function(P) {
                        P.preventDefault()
                    })
        },
        _initSidebar: function() {
            var S = this;
            $sidebarSlide = $(S.selectors.sidebarSlide),
            0 < $sidebarSlide.length && $sidebarSlide.each(function() {
                var T = $(this)
                  , P = $(this).data("per_view");
                $(this).not(".slick-initialized").slick({
                    slidesToShow: P,
                    slidesToScroll: 1,
                    vertical: !0,
                    focusOnSelect: !0,
                    infinite: !1,
                    prevArrow: "<span class=\"fa fa-angle-up slick-prev-arrow\"></span>",
                    nextArrow: "<span class=\"fa fa-angle-down slick-next-arrow\"></span>"
                }),
                T.imagesLoaded(function() {
                    T.addClass("loaded")
                })
            })
        },
        _initForceHeight: function() {
            0 < $(this.selectors.productPreviewMainImages).length && $(this.selectors.productPreviewMainImages).not(".slick-initialized").slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: !1,
                prevArrow: "<span class=\"fa fa-angle-left slick-prev-arrow\"></span>",
                nextArrow: "<span class=\"fa fa-angle-right slick-next-arrow\"></span>"
            })
        },
        _initSwatches: function() {
            function S(ie) {
                var oe = ie.replace("https:", "").replace("http:", "").split("?v=")[0].split("/")
                  , se = oe[oe.length - 1].split(".")
                  , ne = se.pop()
                  , le = se.join(".") + "_100x." + ne;
                return ie.replace(oe[oe.length - 1], le)
            }
            function T(ie, oe, se, ne, le) {
                if (1 < ie.options.length)
                    for (i = 0; i < ie.options.length; i++)
                        i != oe && $(P + "-" + i + " option").each(function() {
                            var ye = "unavailable"
                              , be = $(this).attr("value");
                            for (j = 0; j < ie.variants.length; j++) {
                                var we = ie.variants[j];
                                if (we.options[oe] != se)
                                    continue;
                                else if (we.options[i] == be) {
                                    ye = !0 == we.available ? "available" : "sold_out";
                                    break
                                }
                            }
                            var ke = "#swatch-" + i + "-" + be.toLowerCase().replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
                            $(ke).closest(".swatch-element").removeClass("available").removeClass("sold_out").removeClass("unavailable").addClass(ye)
                        });
                else
                    for (i = 0; i < ie.options.length; i++)
                        $("#single-option-selector-product-template-" + i + " option").each(function() {
                            var ye = "unavailable"
                              , be = $(this).attr("value");
                            for (j = 0; j < ie.variants.length; j++)
                                if (ie.variants[j].options[i] == be) {
                                    ye = ie.variants[j].available ? "available" : "sold_out";
                                    break
                                }
                            var we = "#swatch-" + i + "-" + be.toLowerCase().replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
                            $(we).closest(".swatch-element").removeClass("available").removeClass("sold_out").removeClass("unavailable").addClass(ye)
                        });
                var de = le.settings.variant_image_grouped
                  , ce = le.selectors.productMainImages + ".slick-slider"
                  , pe = le.selectors.productThumbImages + " .slick-slider"
                  , ue = se
                  , me = le.productSingleObject
                  , he = le.selectors.originalSelectorId;
                if ("1" == de && ("color" == ne || "colour" == ne)) {
                    $(pe).slick("slickUnfilter").slick("slickFilter", "[data-color='" + ue + "']");
                    var ge = $(pe).find(".slick-slide")
                      , fe = 0
                      , ve = !1;
                    ge.each(function(ye, be) {
                        $(be).attr("data-slick-index", ye),
                        jQuery.each(me.variants, function(we, ke) {
                            if (ke.id == $(he).val() && !1 == ve) {
                                var Ce = ke.featured_image.src.replace(/^https?\:/i, "").split("?")[0].replace(".png", "").replace(".jpg", "")
                                  , xe = $(be).find("img").first().attr("src");
                                0 <= xe.indexOf(Ce) && (fe = ye,
                                ve = !0)
                            }
                        })
                    }),
                    $(pe).slick("slickGoTo", fe, !0),
                    $(ce).slick("slickUnfilter").slick("slickFilter", "[data-color='" + ue + "']");
                    var ge = $(ce).find(".slick-slide")
                      , fe = 0
                      , ve = !1;
                    ge.each(function(ye, be) {
                        $(be).attr("data-slick-index", ye),
                        jQuery.each(me.variants, function(we, ke) {
                            if (ke.id == $(he).val() && !1 == ve) {
                                var Ce = ke.featured_image.src.replace(/^https?\:/i, "").split("?")[0].replace(".png", "").replace(".jpg", "")
                                  , xe = $(be).find("img").first().attr("src");
                                0 <= xe.indexOf(Ce) && (fe = ye,
                                ve = !0)
                            }
                        })
                    }),
                    $(ce).slick("slickGoTo", fe, !0),
                    $(".templateProduct .thumbnails .slick-list").width() >= $(".templateProduct .thumbnails .slick-track").width() ? $("body").append("<style id=\"product-images-filtering-style\" type=\"text/css\">.templateProduct .thumbnails .slick-track{transform:none!important;}</style>") : 0 < $("style#product-images-filtering-style").length && $("style#product-images-filtering-style").remove()
                }
            }
            var P = this.selectors.optionsSelect
              , I = this.productSingleObject
              , A = this.productSwatchSingleObject
              , z = [];
            if ("1" == this.settings.swatch_size && z.push("Size"),
            z.push("size"),
            "1" == this.settings.swatch_color && (z.push("Color"),
            z.push("Colour"),
            z.push("color"),
            z.push("colour")),
            0 < z.length) {
                var N = !1
                  , L = !1
                  , M = 0
                  , q = theme.asset_url.substring(0, theme.asset_url.lastIndexOf("?"))
                  , O = theme.asset_url.substring(theme.asset_url.lastIndexOf("?"), theme.asset_url.length);
                for (i = 0; i < I.options.length; i++) {
                    var F = ""
                      , E = ""
                      , B = ""
                      , D = ""
                      , U = ""
                      , W = ""
                      , H = ""
                      , V = "img btooltip";
                    if (F = "object" == typeof I.options[i] ? I.options[i].name : I.options[i],
                    N = !1,
                    L = !1,
                    -1 < z.indexOf(F)) {
                        N = !0,
                        M = i;
                        var G = F.toLowerCase();
                        if (/color|colour/i.test(G) && (L = !0),
                        N) {
                            var Q = [];
                            for (j = 0; j < I.variants.length; j++) {
                                var J = I.variants[j]
                                  , Y = this.htmlEntities(J.options[M])
                                  , K = this.convertToSlug(Y);
                                0 > Q.indexOf(Y) && ("color" != G && "colour" != G ? (H = Y,
                                V = "btooltip") : "1" == this.settings.swatch_color_advanced ? null !== A[K] && void 0 !== A[K] && "" != A[K] ? (V = "img btooltip swatch_color_advanced",
                                H = "<i style=\"background-image: url(" + q + A[K] + ".png" + O + ")\"></i>") : null === J.featured_image ? H = "<i style=\"background-color:" + Y + "; background-image: url(" + q + K + ".png" + O + ")\"></i>" : (V = "img btooltip swatch_color_advanced",
                                H = "<i style=\"background-image: url(" + S(J.featured_image.src) + ")\"></i>") : H = "<i style=\"background-color:" + Y + "; background-image: url(" + q + K + ".png" + O + ")\"></i>",
                                W = $(this.selectors.singleOptionSelectorId + "-" + M).val() == Y ? "selected " : "",
                                B = B + "<div class=\"swatch-element " + G + K + " " + "available" + "\"><input data-id=\"" + this.selectors.singleOptionSelectorId + "-" + M + "\" data-value=\"" + Y + "\"  class=\"swatch-radio " + W + "\" id=\"swatch-" + M + "-" + K + "\" type=\"radio\" data-swatch=\"" + G + "\" data-poption=\"" + M + "\" name=\"option-" + M + "\" value=\"" + Y + "\"><label for=\"swatch-" + M + "-" + K + "\" class=\"" + V + "\" title=\"" + Y + "\"><span class=\"soldout-image\"></span>" + H + "</label></div>",
                                Q.push(Y))
                            }
                            E = "<div class=\"" + this.selectors.singleOptionSwatches + " wrapper-swatches swatch " + G + "\" data-attribute_name=\"attribute_pa_" + G + "\"><div>" + B + "</div></div>",
                            D = $(this.selectors.singleOptionSelectorId + "-" + M),
                            U = $(this.selectors.variationSelector + "-" + M),
                            "" != E && (D.after(E),
                            D.hide(),
                            U.addClass("hide-choose-option"))
                        }
                    }
                }
            }
            var ee = ""
              , te = "." + this.selectors.singleOptionSwatches + " .swatch-radio"
              , ae = this;
            0 < $("." + this.selectors.singleOptionSwatches).length && (ee = $(te),
            ee.unbind("click"),
            ee.on("click", function() {
                var ie = $(this).data("id")
                  , oe = $(this).data("poption")
                  , se = $(this).data("value")
                  , ne = $(this).data("swatch");
                $(this).data("value") != $(ie).val() && ($(ie).val($(this).data("value")).trigger("change"),
                $(ie).closest(".selector-wrapper").find(".swatch-radio").removeClass("selected"),
                $(this).addClass("selected"),
                $(ie).closest(".selector-wrapper"),
                $(ie).closest(".selector-wrapper").find(".option-select-value").html($(this).data("value"))),
                T(I, oe, se, ne, ae)
            })),
            $(".swatch-radio.selected").trigger("click")
        },
        htmlEntities: function(S) {
            return (S + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
        },
        convertToSlug: function(S) {
            return S.toLowerCase().replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-")
        },
        _initVariants: function() {
            var S = {
                $container: this.$container,
                enableHistoryState: this.$container.data("enable-history-state") || !1,
                singleOptionSelector: this.selectors.singleOptionSelector,
                originalSelectorId: this.selectors.originalSelectorId,
                product: this.productSingleObject
            };
            this.variants = new slate.Variants(S),
            this.$container.on("variantChange" + this.settings.namespace, this._updateAddToCart.bind(this)),
            this.$container.on("variantImageChange" + this.settings.namespace, this._updateImages.bind(this)),
            this.$container.on("variantPriceChange" + this.settings.namespace, this._updatePrice.bind(this)),
            this.$container.on("variantSKUChange" + this.settings.namespace, this._updateSKU.bind(this))
        },
        _updateAddToCart: function(S) {
            var T = S.variant;
            T ? ($(this.selectors.productPrices).removeClass("invisible").attr("aria-hidden", "true"),
            $(".variations_button").removeClass("hide"),
            T.available ? ($(this.selectors.addToCart).prop("disabled", !1).toggleClass("hide", !1),
            $(this.selectors.addToCart).val(theme.strings.addToCart),
            $(this.selectors.stockText).html(theme.strings.inStock).removeClass("out-of-stock unavailable").addClass("in-stock"),
            "shopify" == T.inventory_management && "continue" != T.inventory_policy && (0 < T.inventory_quantity && 1 == parseInt(theme.inventory) ? $(this.selectors.stockText).html(T.inventory_quantity + " " + theme.strings.inStock) : $(this.selectors.stockText).html(theme.strings.inStock))) : ($(this.selectors.addToCart).prop("disabled", !0).toggleClass("hide", !1),
            $(this.selectors.addToCart).val(theme.strings.soldOut),
            $(this.selectors.stockText).html(theme.strings.outStock).removeClass("in-stock unavailable").addClass("out-of-stock"))) : ($(".variations_button").addClass("hide"),
            $(this.selectors.addToCart).prop("disabled", !0).toggleClass("hide", !0),
            $(this.selectors.addToCart).val(theme.strings.unavailable),
            $(this.selectors.stockText).html(theme.strings.unavailable).removeClass("in-stock").addClass("out-of-stock unavailable"),
            $(this.selectors.productPrices).addClass("invisible").attr("aria-hidden", "false"))
        },
        _updateImages: function(S) {
            var T = S.variant
              , P = this
              , I = this.settings.product_design
              , A = T.featured_image.src.replace("https:", "").replace("http:", "").split("?v=")[0];
            console.log(1),
            $(this.selectors.productFeaturedImage).each(function() {
                console.log(2);
                var N = $(this)
                  , L = N.attr("href");
                if (0 <= L.indexOf(A) && !N.closest(".slick-slide").hasClass("slick-cloned")) {
                    console.log(3);
                    var M = $(P.selectors.productMainImages)
                      , q = N.closest(".slick-slide").attr("data-slick-index");
                    if (console.log("pos: " + q),
                    "carousel" == I ? M.slick("slickGoTo", q) : (console.log(4),
                    M.slick("slickGoTo", q, !0)),
                    "scroll" == I) {
                        var O = parseInt(N.closest(".shopify-product-gallery__image").offset().top) - 50;
                        $("html,body").animate({
                            scrollTop: O
                        }, "slow")
                    }
                    return void ("gallery" == I && 0 < $(".thumbnails .thumbnail-gallery-item").length && $(".thumbnails .thumbnail-gallery-item").each(function() {
                        var F = $(this).data("href");
                        0 <= F.indexOf(A) && $(this).trigger("click")
                    }))
                }
            })
        },
        _updatePrice: function(S) {
            var T = S.variant;
            if ($(this.selectors.originalPrice).html("<span class=\"money\">" + theme.Currency.formatMoney(T.price, theme.settings.moneyFormat) + "</span>"),
            T.compare_at_price > T.price) {
                if ($(this.selectors.productPrices).addClass("has-sale"),
                $(this.selectors.productPrices).removeClass("not-sale"),
                $(this.selectors.comparePrice).html("<span class=\"money\">" + theme.Currency.formatMoney(T.compare_at_price, theme.settings.moneyFormat) + "</span>").removeClass("hide"),
                $(this.selectors.saleLabel).find("span").text(theme.strings.sale),
                "" != theme.sale_percentages) {
                    var P = Math.round(100 * (T.compare_at_price - T.price) / T.compare_at_price);
                    $(this.selectors.saleLabel).find("span").text("-" + P + "%")
                }
                $(this.selectors.saleLabel).addClass("hide")
            } else
                $(this.selectors.productPrices).removeClass("has-sale"),
                $(this.selectors.productPrices).addClass("not-sale"),
                $(this.selectors.comparePrice).addClass("hide"),
                $(this.selectors.saleLabel).addClass("hide");
            theme.CurrencyPicker.convert(this.selectors.product + " .money")
        },
        _updateSKU: function(S) {
            var T = S.variant;
            "" == T.sku ? $(this.selectors.SKU).addClass("hide") : $(this.selectors.SKU).removeClass("hide").find(".sku").text(T.sku)
        },
        onUnload: function() {
            this.$container.off(this.settings.namespace)
        }
    }),
    y
}(),
window.theme = window.theme || {},
theme.Filters = function() {
    function y() {
        $(P.filter).length && ($(P.fiterTarget).html(""),
        $(P.filter).clone().appendTo(P.fiterTarget),
        $(".offcanvas_shop_sidebar").fitVids())
    }
    function S(I) {
        var A = this.$container = $(I);
        this.$filterSelect = $(P.filter, A),
        this.$sortSelect = $(P.sortSelection, A),
        this.$viewSelect = $(P.defaultView, A),
        this.$filterClear = $(P.filterClear, A),
        y(),
        $(document).on("change", P.viewSelection, this._onViewChange.bind(this)),
        $(document).on("change", P.sortSelection, this._onSortChange.bind(this)),
        $(document).on("change", P.filterSelection, this._onFilterChange.bind(this)),
        $(document).on("click", P.filterClear, this._onFilterClear.bind(this))
    }
    var P = {
        sortSelection: ".filters-toolbar__input--sort",
        defaultSort: ".collection-header__default-sort",
        viewSelection: ".filters-toolbar__input--view",
        defaultView: ".collection-header__default-view",
        filter: ".shop-page #secondary",
        fiterTarget: ".offcanvas_aside_left .offcanvas_shop_sidebar .widget-area",
        filterSelection: ".mfilter-content .filter",
        filterClear: ".mfilter-content .clear"
    };
    return S.prototype = _.assignIn({}, S.prototype, {
        _filterAjaxClick: function(I) {
            delete Shopify.queryParams.page;
            var A = this._filterCreateUrl(I);
            this._filterGetContent(A)
        },
        _filterCreateUrl: function(I) {
            var A = $.param(Shopify.queryParams).replace(/%2B/g, "+");
            return I ? "" == A ? I : I + "?" + A : location.pathname + "?" + A
        },
        _filterGetContent: function(I) {
            var A = "#mfilter-content-container"
              , z = ".mfilter-box .mfilter-content"
              , N = this;
            $.ajax({
                type: "get",
                url: I,
                beforeSend: function() {
                    roar.destroyCountdown(),
                    $("body").addClass("is_loading").removeClass("open_filter")
                },
                success: function(L) {
                    var M = $(L).filter("title").text();
                    $(A).empty().html($(L).find(A).html()),
                    $(z).empty().html($(L).find(z).html()),
                    roar.mapPaginationCallback(),
                    History.pushState({
                        param: Shopify.queryParams
                    }, M, I),
                    setTimeout(function() {
                        $("html,body").animate({
                            scrollTop: $("body #sandbox").offset().top
                        }, 500, "swing")
                    }, 100),
                    $("body").removeClass("is_loading"),
                    N._mapReviews()
                },
                error: function() {
                    $("body").removeClass("is_loading")
                }
            })
        },
        _mapReviews: function() {
            "undefined" != typeof SPR && (SPR.registerCallbacks(),
            SPR.initRatingHandler(),
            SPR.initDomEls(),
            SPR.loadProducts(),
            SPR.loadBadges())
        },
        _onFilterClear: function(I) {
            var A = [];
            Shopify.queryParams.constraint && (A = Shopify.queryParams.constraint.split("+"));
            var z = $(I.currentTarget)
              , N = z.closest(".column").find("input:checked");
            0 < N.length && N.each(function() {
                var L = $(this).val();
                if (L) {
                    var M = A.indexOf(L);
                    0 <= M && A.splice(M, 1)
                }
            }),
            A.length ? Shopify.queryParams.constraint = A.join("+") : delete Shopify.queryParams.constraint,
            this._filterAjaxClick()
        },
        _onViewChange: function(I) {
            var A = $(I.currentTarget)
              , z = $(P.defaultView, this.$container).val()
              , N = A.val() ? A.val() : z;
            Shopify.queryParams.view = N,
            this._filterAjaxClick()
        },
        _onSortChange: function(I) {
            var A = $(I.currentTarget)
              , z = $(P.defaultSort, this.$container).val()
              , N = A.val() ? A.val() : z;
            Shopify.queryParams.sort_by = N,
            this._filterAjaxClick()
        },
        _onFilterChange: function(I) {
            var A = $(I.currentTarget)
              , z = A.closest(".column").attr("data-multi_choice")
              , N = [];
            if (Shopify.queryParams.constraint && (N = Shopify.queryParams.constraint.split("+")),
            "false" == z && !A.closest(".field").hasClass("active")) {
                var L = A.closest(".column").find("input:checked");
                0 < L.length && L.each(function() {
                    var O = $(this).val();
                    if (O) {
                        var F = N.indexOf(O);
                        0 <= F && N.splice(F, 1)
                    }
                })
            }
            var M = A.val();
            if (M) {
                console.log(N);
                var q = N.indexOf(M);
                0 <= q ? (console.log(M),
                N.splice(q, 1)) : N.push(M)
            }
            N.length ? Shopify.queryParams.constraint = N.join("+") : delete Shopify.queryParams.constraint,
            this._filterAjaxClick()
        },
        onUnload: function() {
            this.$sortSelect.off("change", this._onSortChange),
            this.$filterSelect.off("change", this._onFilterChange),
            this.$filterClear.off("click", this._onFilterClear)
        }
    }),
    S
}(),
theme.MegaMenuSection = function() {
    function y(S) {
        var T = this.$container = $(S)
          , P = T.attr("data-section-id")
          , I = T.attr("data-section-type");
        this.MegaMenu = $("#megamenu-" + P),
        this.megaMenuNamspace = "#megamenu-" + P,
        this.megaMenuId = $("#shopify-section-" + P),
        0 < $(".section-megamenu-content").length && $(".section-megamenu-content").each(function() {
            var A = $(this).data("menu_width_class");
            0 < $(this).closest(".shopify-section").length && (!$(this).closest(".shopify-section").hasClass(A) && $(this).closest(".shopify-section").addClass(A),
            $(this).closest(".shopify-section").removeClass("hidden"))
        }),
        0 < $("#header-phantom .shopify-section").length && $("#header-phantom .shopify-section").each(function() {
            $(this).removeClass("shopify-section")
        }),
        this._init()
    }
    return y.prototype = _.assignIn({}, y.prototype, {
        _init: function() {
            roar.fixedHeaderMenu(),
            this._products(),
            this._handleMegaMenu(),
            this._handleVermenuCategory()
        },
        _products: function() {
            0 < $(".products-carousel-megamenu").length && $(".products-carousel-megamenu").each(function() {
                var S = $(this).data("_id")
                  , T = $(this).data("_one")
                  , P = $(this).data("_two")
                  , I = $(this).data("_three")
                  , A = $(this).data("_four")
                  , z = $("#productsCarousel" + S);
                z.not(".slick-initialized").slick({
                    arrows: !1,
                    slidesToShow: A,
                    slidesToScroll: A,
                    responsive: [{
                        breakpoint: 1920,
                        settings: {
                            slidesToShow: A,
                            slidesToScroll: A
                        }
                    }, {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: I,
                            slidesToScroll: I
                        }
                    }, {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: P,
                            slidesToScroll: P
                        }
                    }],
                    rtl: window.rtl
                }),
                $(".productsCarousel" + S + "_next").click(function() {
                    return z.slick("slickNext"),
                    !1
                }),
                $(".productsCarousel" + S + "_prev").click(function() {
                    return z.slick("slickPrev"),
                    !1
                }),
                $(window).resize(function() {
                    z.slick("setPosition")
                })
            })
        },
        _handleVermenuCategory: function() {
            if ($("#vermenu_cat_gap").length && 992 <= roar.getWidthBrowser() && 0 < $(".container-megamenu.vertical .megamenu-wrapper").length) {
                var S = $(".container-megamenu.vertical .megamenu-wrapper").outerHeight()
                  , T = $(".container-megamenu.vertical .megamenu-wrapper").offset().top
                  , P = $("#sidebar").offset().top;
                $("#vermenu_cat_gap").css("height", S - (P - T))
            }
        },
        _handleMegaMenu: function() {
            var S = this._handleVermenuCategory();
            "yes" == window.megamenu_responsive_design && 992 > $(window).width() && (window.megamenu_responsive = !0),
            $("ul.megamenu > li").each(function() {
                var T = 0;
                $(this).find(".mobile-enabled").each(function() {
                    T++
                }),
                0 == T && $(this).find(".open-menu").addClass("mobile-disabled")
            }),
            $("ul.megamenu li .sub-menu .content .hover-menu ul li").hover(function() {
                $(this).children("ul").addClass("active")
            }, function() {
                $(this).children("ul").removeClass("active")
            }),
            $(".close-categories").unbind("click"),
            $(".close-categories").on("click", function() {
                return $(this).parent().removeClass("active"),
                $(this).next().animate({
                    height: "hide"
                }, 400),
                !1
            }),
            $(".open-categories").unbind("click"),
            $(".open-categories").on("click", function() {
                return $(".open-categories").parent().removeClass("active"),
                $(".open-categories").next().next().animate({
                    height: "hide"
                }, 400),
                $(this).parent().addClass("active"),
                $(this).next().next().animate({
                    height: "show"
                }, 400),
                !1
            }),
            $(".close-menu").unbind("click"),
            $(".close-menu").on("click", function() {
                return $(this).parent().removeClass("active"),
                $(this).next().next().next().animate({
                    height: "hide"
                }, 400),
                !1
            }),
            $(".open-menu").unbind("click"),
            $(".open-menu").on("click", function() {
                return $("ul.megamenu > li").removeClass("active"),
                $("ul.megamenu > li").find(".sub-menu").animate({
                    height: "hide"
                }, 400),
                $(this).parent().addClass("active"),
                $(this).next().next().animate({
                    height: "show"
                }, 400),
                $(window).trigger("resize"),
                window.megamenu_responsive = !0,
                !1
            }),
            $("ul.megamenu > li.click .content a").unbind("click"),
            $("ul.megamenu > li.click .content a").click(function() {
                window.location = $(this).attr("href")
            }),
            jQuery(window).resize(function() {
                $("ul.megamenu > li.hover").hover(function() {
                    if (0 == window.megamenu_responsive) {
                        if (window.megamenu_active = $(this),
                        window.megamenu_hover = !0,
                        $("ul.megamenu > li").removeClass("active"),
                        $(this).addClass("active"),
                        window.rtl) {
                            $(this).children(".sub-menu").css("right", "auto"),
                            $(this).children(".sub-menu").css("left", "auto");
                            var T = $(this).children(".sub-menu")
                              , P = T.offset().left
                              , I = $(".horizontal ul.megamenu")
                              , A = I.offset().left - 45;
                            A > P && $(this).children(".sub-menu").css("left", "0")
                        } else {
                            $(this).children(".sub-menu").css("right", "auto");
                            var T = $(this).children(".sub-menu")
                              , P = $(window).width() - (T.offset().left + T.outerWidth());
                            if ($(".header-type-3").length || $(".header-type-30").length)
                                var I = $("#top .container")
                                  , A = $(window).width() - (I.offset().left + I.outerWidth());
                            else
                                var I = $(".overflow-megamenu")
                                  , A = $(window).width() - (I.offset().left + I.outerWidth());
                            A > P && $(this).children(".sub-menu").css("right", "0")
                        }
                        var z = $(this).children("a").outerWidth() / 2
                          , N = $(this).children("a").offset().left - $(this).find(".content").offset().left;
                        $(this).find(".content > .arrow").css("left", N + z)
                    }
                }, function() {
                    if (0 == window.megamenu_responsive) {
                        var T = $(this).attr("title");
                        if (window.megamenu_hover = !1,
                        "hover-intent" == T) {
                            var P = $(this);
                            setTimeout(function() {
                                0 == window.megamenu_hover && $(P).removeClass("active")
                            }, 500)
                        } else
                            $(this).removeClass("active")
                    }
                })
            }).resize(),
            $("ul.megamenu > li.click").unbind("click"),
            $("ul.megamenu > li.click").click(function() {
                if (1 == $(this).removeClass("active"))
                    return !1;
                if (window.megamenu_active = $(this),
                window.megamenu_hover = !0,
                $("ul.megamenu > li").removeClass("active"),
                $(this).addClass("active"),
                1 == window.megamenu_responsive && $(this).children(".sub-menu").animate({
                    height: "show"
                }, 400),
                window.rtl) {
                    $(this).children(".sub-menu").css("right", "auto"),
                    $(this).children(".sub-menu").css("left", "auto");
                    var T = $(this).children(".sub-menu")
                      , P = T.offset().left
                      , I = $(".horizontal ul.megamenu")
                      , A = I.offset().left - 45;
                    A > P && $(this).children(".sub-menu").css("left", "0")
                } else {
                    $(this).children(".sub-menu").css("right", "auto");
                    var T = $(this).children(".sub-menu")
                      , P = $(window).width() - (T.offset().left + T.outerWidth());
                    if ($(".header-type-3").length)
                        var I = $("#top .container")
                          , A = $(window).width() - (I.offset().left + I.outerWidth());
                    else
                        var I = $(".overflow-megamenu")
                          , A = $(window).width() - (I.offset().left + I.outerWidth());
                    A > P && $(this).children(".sub-menu").css("right", "0")
                }
                var z = $(this).children("a").outerWidth() / 2
                  , N = $(this).children("a").offset().left - $(this).find(".content").offset().left;
                return $(this).find(".content > .arrow").css("left", N + z),
                !1
            }),
            $(".categories-image-right ul > li > a").hover(function() {
                $(this).closest(".categories-image-right").find("img").attr("src", $(this).attr("data-image"))
            }, function() {
                var T = $(this).closest(".categories-image-right").attr("data-image");
                $(this).closest(".categories-image-right").find("img").attr("src", T)
            }),
            $(".megaMenuToggle").unbind("click"),
            $(".megaMenuToggle").click(function() {
                return 1 == $(this).removeClass("active") ? $(this).parent().find(".megamenu-wrapper").stop(!0, !0).animate({
                    height: "hide"
                }, 400) : ($(this).parent().find(".megamenu-wrapper").stop(!0, !0).animate({
                    height: "toggle"
                }, 400),
                $(this).addClass("active")),
                !1
            }),
            $("html").unbind("click"),
            $("html").on("click", function() {
                "yes" == window.megamenu_responsive_design && 992 > $(window).width() || $("ul.megamenu > li.click").removeClass("active")
            }),
            S,
            $(window).resize(function() {
                window.megamenu_responsive = !1,
                "yes" == window.megamenu_responsive_design && 992 > $(window).width() && (window.megamenu_responsive = !0),
                S
            }),
            roar.initLazyLoading(".section-megamenu-content", !0)
        },
        onUnload: function() {
            this.$container.off(this.megaMenuNamspace)
        },
        onSelect: function() {
            0 < $(this.megaMenuNamspace + " .product-grid.rich-banner").length && roar.initCountdown(),
            roar.initProductQuickShopItem(this.megaMenuNamspace + " .product-grid.rich-banner"),
            roar.handleQuickshop(this.megaMenuNamspace + " .product-grid.rich-banner")
        },
        onBlockSelect: function() {},
        onBlockDeselect: function() {}
    }),
    y
}(),
theme.TopBlockSection = function() {
    function y(S) {
        var T = this.$container = $(S)
          , P = this.sectionId = T.attr("data-section-id")
          , I = T.attr("data-section-type");
        this.topBlockId = $("#shopify-section-" + P),
        this.topBlock = $("#top-block-" + P),
        this.topBlockNamspace = "#top-block-wrapper-" + P,
        this._init()
    }
    return y.prototype = _.assignIn({}, y.prototype, {
        _init: function() {},
        onUnload: function() {
            this.$container.off(this.topBlockNamspace)
        }
    }),
    y
}(),
theme.CustomWidgetSection = function() {
    function y(S) {
        var T = this.$container = $(S)
          , P = this.sectionId = T.attr("data-section-id")
          , I = T.attr("data-section-type");
        this.customWidgetId = $("#shopify-section-" + P),
        this.customWidgetNamspace = "#custom-widget-" + P,
        this.placement_fullwidth = $(this.customWidgetNamspace).data("placement_fullwidth"),
        this._init()
    }
    return y.prototype = _.assignIn({}, y.prototype, {
        _init: function() {
            if ("1" == this.placement_fullwidth && !window.sidebar) {
                var S = this.sectionId;
                onFullWidthOption(S)
            }
        },
        onUnload: function() {
            this.$container.off(this.customWidgetNamspace)
        }
    }),
    y
}(),
theme.BannerSection = function() {
    function y(S) {
        var T = this.$container = $(S)
          , P = this.sectionId = T.attr("data-section-id")
          , I = T.attr("data-section-type");
        this.bannerId = $("#shopify-section-" + P),
        this.bannerNamspace = "#rich-banners-" + P,
        this.placement_fullwidth = $(this.bannerNamspace).data("placement_fullwidth"),
        this.placement_background = $(this.bannerNamspace).data("placement_background"),
        this._init()
    }
    return y.prototype = _.assignIn({}, y.prototype, {
        _init: function() {
            if ("1" == this.placement_fullwidth && !window.sidebar) {
                var S = this.sectionId;
                onFullWidthOption(S)
            }
            this._initFx(),
            this._handleFontSize(),
            this._initSlider(),
            this._initTilt(),
            "1" == this.placement_background && this._initBackground()
        },
        _initBackground: function() {
            var S = $("#shopify-section-" + this.sectionId)
              , T = this.$container.data("placement_background_c")
              , P = this.$container.data("placement_background_i");
            $(window).resize(function() {
                if (S.removeAttr("style"),
                !(768 > $(window).width())) {
                    var I = S.offset();
                    S.width($("body").width()),
                    S.css("left", "-" + I.left + "px").css("padding-left", I.left).css("padding-right", I.left),
                    S.css("background-color", T).css("background-image", "url(" + P + ")").css("background-size", "cover")
                }
            }).resize()
        },
        _initTilt: function() {
            var S = this.$container.find(".rt-tilt-container");
            0 >= S.length || (S.on("mousemove", function(T) {
                const {left: P, top: I} = $(this).offset()
                  , A = T.pageX - P
                  , z = T.pageY - I
                  , N = $(this).width() / 2 - A
                  , L = $(this).height() / 2 - z;
                $(this).css("transform", "perspective(500px) rotateX(" + L / 40 + "deg) rotateY(" + -(N / 40) + "deg) translateZ(10px)");
                0 < Math.sign(N) ? -Math.abs(N) : Math.abs(N);
                $(this).removeClass("rt-leave")
            }),
            S.on("mouseleave", function() {
                $(this).addClass("rt-leave")
            }))
        },
        _initSlider: function() {
            this.$container.find(".rich-banner--group.is-slider").each(function(S, T) {
                var P = {
                    interval: $(T).data("interval"),
                    autoplay: $(T).data("autoplay"),
                    itemsperslide: $(T).data("itemsperslide"),
                    blockid: $(T).data("blockid"),
                    variablewidth: $(T).data("variablewidth")
                }
                  , I = $(T).not(".slick-initialized");
                I.slick({
                    dots: !1,
                    arrows: !1,
                    slidesToShow: P.itemsperslide,
                    slidesToScroll: 1,
                    autoplay: P.autoplay,
                    autoplaySpeed: P.interval,
                    slide: "div, a.rich-banner-wrapper",
                    variableWidth: P.variablewidth,
                    centerMode: P.variablewidth
                }),
                $(T).find(".next-button").first().click(function() {
                    return I.slick("slickNext"),
                    !1
                }),
                $(T).find(".prev-button").first().click(function() {
                    return I.slick("slickPrev"),
                    !1
                }),
                roar.initLazyLoading("#rich-banner--group" + P.blockid, !0)
            })
        },
        _initFx: function() {
            this.$container.find(".rich-banner.has-text-fx").each(function(S, T) {
                var P = {
                    used: $(T).data("fx"),
                    type: $(T).data("fx-type")
                };
                !0 == P.used && ("0" == P.type ? anime.timeline({
                    loop: !0
                }).add({
                    targets: $(T).find(".rt-fx-dominos .letter").toArray(),
                    rotateY: [-90, 0],
                    duration: 1300,
                    delay: function(I, A) {
                        return 45 * A
                    }
                }).add({
                    targets: $(T).find(".rt-fx-dominos").toArray(),
                    opacity: 0,
                    duration: 1e3,
                    easing: "easeOutExpo",
                    delay: 1e3
                }) : "1" == P.type ? anime.timeline({
                    loop: !0
                }).add({
                    targets: $(T).find(".rt-fx-vertical-lines .letter").toArray(),
                    scale: [0.3, 1],
                    opacity: [0, 1],
                    translateZ: 0,
                    easing: "easeOutExpo",
                    duration: 600,
                    delay: function(I, A) {
                        return 70 * (A + 1)
                    }
                }).add({
                    targets: $(T).find(".rt-fx-vertical-lines .line").toArray(),
                    scaleX: [0, 1],
                    opacity: [0.5, 1],
                    easing: "easeOutExpo",
                    duration: 700,
                    offset: "-=875",
                    delay: function(I, A, z) {
                        return 80 * (z - A)
                    }
                }).add({
                    targets: $(T).find(".rt-fx-vertical-lines").toArray(),
                    opacity: 0,
                    duration: 1e3,
                    easing: "easeOutExpo",
                    delay: 1e3
                }) : "2" == P.type ? anime.timeline({
                    loop: !0
                }).add({
                    targets: $(T).find(".rt-fx-fading .letter").toArray(),
                    opacity: [0, 1],
                    easing: "easeInOutQuad",
                    duration: 2250,
                    delay: function(I, A) {
                        return 150 * (A + 1)
                    }
                }).add({
                    targets: $(T).find(".rt-fx-fading").toArray(),
                    opacity: 0,
                    duration: 1e3,
                    easing: "easeOutExpo",
                    delay: 1e3
                }) : "3" == P.type ? anime.timeline({
                    loop: !0
                }).add({
                    targets: $(T).find(".rt-fx-intro .letter").toArray(),
                    translateX: [40, 0],
                    translateZ: 0,
                    opacity: [0, 1],
                    easing: "easeOutExpo",
                    duration: 1200,
                    delay: function(I, A) {
                        return 500 + 30 * A
                    }
                }).add({
                    targets: $(T).find(".rt-fx-intro .letter").toArray(),
                    translateX: [0, -30],
                    opacity: [1, 0],
                    easing: "easeInExpo",
                    duration: 1100,
                    delay: function(I, A) {
                        return 100 + 30 * A
                    }
                }) : "4" == P.type ? anime.timeline({
                    loop: !0
                }).add({
                    targets: $(T).find(".rt-fx-surprising .word").toArray(),
                    scale: [14, 1],
                    opacity: [0, 1],
                    easing: "easeOutCirc",
                    duration: 800,
                    delay: function(I, A) {
                        return 800 * A
                    }
                }).add({
                    targets: $(T).find(".rt-fx-surprising").toArray(),
                    opacity: 0,
                    duration: 1e3,
                    easing: "easeOutExpo",
                    delay: 1e3
                }) : anime.timeline({
                    loop: !0
                }).add({
                    targets: $(T).find(".rt-fx-typing .line").toArray(),
                    scaleY: [0, 1],
                    opacity: [0.5, 1],
                    easing: "easeOutExpo",
                    duration: 700
                }).add({
                    targets: $(T).find(".rt-fx-typing .line").toArray(),
                    translateX: [0, $(T).find(".rt-fx-typing .letters").first().width()],
                    easing: "easeOutExpo",
                    duration: 700,
                    delay: 100
                }).add({
                    targets: $(T).find(".rt-fx-typing .letter").toArray(),
                    opacity: [0, 1],
                    easing: "easeOutExpo",
                    duration: 600,
                    offset: "-=775",
                    delay: function(I, A) {
                        return 34 * (A + 1)
                    }
                }).add({
                    targets: $(T).find(".rt-fx-typing").toArray(),
                    opacity: 0,
                    duration: 1e3,
                    easing: "easeOutExpo",
                    delay: 1e3
                }))
            })
        },
        _handleFontSize: function() {
            var S = this.$container;
            $(window).resize(function() {
                var T = parseInt($(window).width());
                S.find(".self-fontsize-adj").each(function() {
                    if ($(this).css("fontSize", $(this).data("oriFontsize")),
                    767 >= T) {
                        var P = parseInt($(this).data("oriFontsize")) / 2;
                        P = 10 > P ? 10 : P,
                        $(this).css("fontSize", P + "px")
                    }
                }),
                S.find("a.self-fontsize-adj").each(function() {
                    $(this).css("fontSize", $(this).data("oriFontsize"))
                }),
                767 >= T ? (S.find("a.self-fontsize-adj").css("fontSize", ""),
                S.find("a.self-fontsize-adj").css("padding", "7px 19px 5px")) : S.find("a.self-fontsize-adj").css("padding", "")
            }).resize()
        },
        onUnload: function() {
            this.$container.off(this.bannerNamspace)
        },
        onBlockSelect: function(S) {
            console.log(S)
        },
        onSelect: function() {
            0 < $(this.bannerNamspace + " .product-grid.rich-banner").length && roar.initCountdown(),
            roar.initLazyLoading(this.bannerNamspace + " .product-grid.rich-banner", !0),
            roar.initProductQuickShopItem(this.bannerNamspace + " .product-grid.rich-banner"),
            roar.handleQuickshop(this.bannerNamspace + " .product-grid.rich-banner")
        }
    }),
    y
}(),
theme.DeliveryBarSection = function() {
    function y(S) {
        var T = this.$container = $(S)
          , P = this.sectionId = T.attr("data-section-id")
          , I = T.attr("data-section-type");
        this.deliveryBarId = $("#shopify-section-" + P),
        this.deliveryBar = $("#delivery-bar-" + P),
        this.deliveryBarNamspace = "#delivery-bar-" + P,
        this.placement_fullwidth = $(this.deliveryBarNamspace).data("placement_fullwidth"),
        this._init()
    }
    return y.prototype = _.assignIn({}, y.prototype, {
        _init: function() {
            if ("1" == this.placement_fullwidth && !window.sidebar) {
                var S = this.sectionId;
                onFullWidthOption(S)
            }
        },
        onUnload: function() {
            this.$container.off(this.deliveryBarNamspace)
        }
    }),
    y
}(),
theme.SlideShowSection = function() {
    function y(S) {
        var T = this.$container = $(S)
          , P = this.sectionId = T.attr("data-section-id")
          , I = T.attr("data-section-type");
        this.slideShowId = $("#shopify-section-" + P),
        this.slideShow = $("#home-slider-" + P),
        this.slideShowNamspace = "#home-slider-" + P,
        this.option = {
            slider_auto: this.slideShow.data("slider_auto"),
            slider_interval: this.slideShow.data("slider_interval"),
            slider_scale: this.slideShow.data("slider_scale"),
            slider_auto_height: this.slideShow.data("slider_auto_height"),
            slider_height: this.slideShow.data("slider_height"),
            slider_align_top: this.slideShow.data("slider_align_top"),
            is_header_slider: this.slideShow.data("is_header_slider"),
            full_width: this.slideShow.data("full_width"),
            is_megamenu: this.slideShow.data("is_megamenu")
        },
        this._init()
    }
    return y.prototype = _.assignIn({}, y.prototype, {
        _init: function() {
            if ("1" == this.option.is_header_slider && ("1" == this.option.slider_align_top ? $(".templateIndex").addClass("slider-align-top") : $(".templateIndex").removeClass("slider-align-top")),
            this._handleSlideshow(),
            this._initResize(),
            "1" == this.option.full_width && !window.sidebar) {
                var S = this.sectionId;
                onFullWidthOption(S)
            }
            "1" == this.option.is_megamenu && this._handleMegaMenu()
        },
        _handleVermenuCategory: function() {
            if ($("#vermenu_cat_gap").length && 992 <= roar.getWidthBrowser() && 0 < $(".container-megamenu.vertical .megamenu-wrapper").length) {
                var S = $(".container-megamenu.vertical .megamenu-wrapper").outerHeight()
                  , T = $(".container-megamenu.vertical .megamenu-wrapper").offset().top
                  , P = $("#sidebar").offset().top;
                $("#vermenu_cat_gap").css("height", S - (P - T))
            }
        },
        _handleMegaMenu: function() {
            var S = this._handleVermenuCategory();
            "yes" == window.megamenu_responsive_design && 992 > $(window).width() && (window.megamenu_responsive = !0),
            $("ul.megamenu > li").each(function() {
                var T = 0;
                $(this).find(".mobile-enabled").each(function() {
                    T++
                }),
                0 == T && $(this).find(".open-menu").addClass("mobile-disabled")
            }),
            $("ul.megamenu li .sub-menu .content .hover-menu ul li").hover(function() {
                $(this).children("ul").addClass("active")
            }, function() {
                $(this).children("ul").removeClass("active")
            }),
            $(".close-categories").unbind("click"),
            $(".close-categories").on("click", function() {
                return $(this).parent().removeClass("active"),
                $(this).next().animate({
                    height: "hide"
                }, 400),
                !1
            }),
            $(".open-categories").unbind("click"),
            $(".open-categories").on("click", function() {
                return $(".open-categories").parent().removeClass("active"),
                $(".open-categories").next().next().animate({
                    height: "hide"
                }, 400),
                $(this).parent().addClass("active"),
                $(this).next().next().animate({
                    height: "show"
                }, 400),
                !1
            }),
            $(".close-menu").unbind("click"),
            $(".close-menu").on("click", function() {
                return $(this).parent().removeClass("active"),
                $(this).next().next().next().animate({
                    height: "hide"
                }, 400),
                !1
            }),
            $(".open-menu").unbind("click"),
            $(".open-menu").on("click", function() {
                return $("ul.megamenu > li").removeClass("active"),
                $("ul.megamenu > li").find(".sub-menu").animate({
                    height: "hide"
                }, 400),
                $(this).parent().addClass("active"),
                $(this).next().next().animate({
                    height: "show"
                }, 400),
                $(window).trigger("resize"),
                window.megamenu_responsive = !0,
                !1
            }),
            $("ul.megamenu > li.click .content a").unbind("click"),
            $("ul.megamenu > li.click .content a").click(function() {
                window.location = $(this).attr("href")
            }),
            $("ul.megamenu > li.hover").hover(function() {
                if (0 == window.megamenu_responsive) {
                    if (window.megamenu_active = $(this),
                    window.megamenu_hover = !0,
                    $("ul.megamenu > li").removeClass("active"),
                    $(this).addClass("active"),
                    window.rtl) {
                        $(this).children(".sub-menu").css("right", "auto"),
                        $(this).children(".sub-menu").css("left", "auto");
                        var T = $(this).children(".sub-menu")
                          , P = T.offset().left
                          , I = $(".horizontal ul.megamenu")
                          , A = I.offset().left - 45;
                        A > P && $(this).children(".sub-menu").css("left", "0")
                    } else {
                        $(this).children(".sub-menu").css("right", "auto");
                        var T = $(this).children(".sub-menu")
                          , P = $(window).width() - (T.offset().left + T.outerWidth());
                        if ($(".header-type-3").length)
                            var I = $("#top .container")
                              , A = $(window).width() - (I.offset().left + I.outerWidth());
                        else
                            var I = $(".overflow-megamenu")
                              , A = $(window).width() - (I.offset().left + I.outerWidth());
                        A > P && $(this).children(".sub-menu").css("right", "0")
                    }
                    var z = $(this).children("a").outerWidth() / 2
                      , N = $(this).children("a").offset().left - $(this).find(".content").offset().left;
                    $(this).find(".content > .arrow").css("left", N + z)
                }
            }, function() {
                if (0 == window.megamenu_responsive) {
                    var T = $(this).attr("title");
                    if (window.megamenu_hover = !1,
                    "hover-intent" == T) {
                        var P = $(this);
                        setTimeout(function() {
                            0 == window.megamenu_hover && $(P).removeClass("active")
                        }, 500)
                    } else
                        $(this).removeClass("active")
                }
            }),
            $("ul.megamenu > li.click").unbind("click"),
            $("ul.megamenu > li.click").click(function() {
                if (1 == $(this).removeClass("active"))
                    return !1;
                if (window.megamenu_active = $(this),
                window.megamenu_hover = !0,
                $("ul.megamenu > li").removeClass("active"),
                $(this).addClass("active"),
                1 == window.megamenu_responsive && $(this).children(".sub-menu").animate({
                    height: "show"
                }, 400),
                window.rtl) {
                    $(this).children(".sub-menu").css("right", "auto"),
                    $(this).children(".sub-menu").css("left", "auto");
                    var T = $(this).children(".sub-menu")
                      , P = T.offset().left
                      , I = $(".horizontal ul.megamenu")
                      , A = I.offset().left - 45;
                    A > P && $(this).children(".sub-menu").css("left", "0")
                } else {
                    $(this).children(".sub-menu").css("right", "auto");
                    var T = $(this).children(".sub-menu")
                      , P = $(window).width() - (T.offset().left + T.outerWidth());
                    if ($(".header-type-3").length)
                        var I = $("#top .container")
                          , A = $(window).width() - (I.offset().left + I.outerWidth());
                    else
                        var I = $(".overflow-megamenu")
                          , A = $(window).width() - (I.offset().left + I.outerWidth());
                    A > P && $(this).children(".sub-menu").css("right", "0")
                }
                var z = $(this).children("a").outerWidth() / 2
                  , N = $(this).children("a").offset().left - $(this).find(".content").offset().left;
                return $(this).find(".content > .arrow").css("left", N + z),
                !1
            }),
            $(".categories-image-right ul > li > a").hover(function() {
                $(this).closest(".categories-image-right").find("img").attr("src", $(this).attr("data-image"))
            }, function() {
                var T = $(this).closest(".categories-image-right").attr("data-image");
                $(this).closest(".categories-image-right").find("img").attr("src", T)
            }),
            $(".megaMenuToggle").unbind("click"),
            $(".megaMenuToggle").click(function() {
                return 1 == $(this).removeClass("active") ? $(this).parent().find(".megamenu-wrapper").stop(!0, !0).animate({
                    height: "hide"
                }, 400) : ($(this).parent().find(".megamenu-wrapper").stop(!0, !0).animate({
                    height: "toggle"
                }, 400),
                $(this).addClass("active")),
                !1
            }),
            $("html").unbind("click"),
            $("html").on("click", function() {
                "yes" == window.megamenu_responsive_design && 992 > $(window).width() || $("ul.megamenu > li.click").removeClass("active")
            }),
            S,
            $(window).resize(function() {
                window.megamenu_responsive = !1,
                "yes" == window.megamenu_responsive_design && 992 > $(window).width() && (window.megamenu_responsive = !0),
                S
            })
        },
        _handleSlideshow: function() {
            var S, T, P, I, A, z, N, L;
            if (this.slideShow.length) {
                var M = this.slideShow;
                S = M.data("afx-head"),
                T = M.data("afx-cap"),
                P = M.data("afx-cta"),
                I = M.data("afx-sticker"),
                A = M.data("dfx-head"),
                z = M.data("dfx-cap"),
                N = M.data("dfx-cta"),
                L = M.data("dfx-sticker")
            }
            var D, q = this.slideShowNamspace, O = this.option.slider_auto, F = this.option.slider_interval, E = this.option.slider_scale, B = this;
            this.slideShow.length && (D = this.slideShow.flexslider({
                animation: "fade",
                prevText: "",
                nextText: "",
                controlNav: !1,
                directionNav: !1,
                slideshowSpeed: F,
                slideshow: O,
                controlNav: !1,
                start: function() {
                    jQuery("body").removeClass("loading"),
                    jQuery(q + " ul.slides h2.caption-content").css("opacity", "0"),
                    jQuery(q + " ul.slides .real-caption").css("opacity", "0"),
                    jQuery(q + " ul.slides .caption-link").css("opacity", "0"),
                    jQuery(q + " ul.slides .slide-sticker-wrapper img").css("opacity", "0"),
                    jQuery(q + " ul.slides li:nth-child(1) h2.caption-content").css("opacity", "1.0").addClass("rt-animated " + S).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                        $(this).removeClass("rt-animated " + S)
                    }),
                    jQuery(q + " ul.slides li:nth-child(1) .real-caption").css("opacity", "1.0").addClass("rt-animated " + T).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                        $(this).removeClass("rt-animated " + T)
                    }),
                    jQuery(q + " ul.slides li:nth-child(1) .caption-link").css("opacity", "1.0").addClass("rt-animated " + P).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                        $(this).removeClass("rt-animated " + P)
                    }),
                    jQuery(q + " ul.slides li:nth-child(1) .slide-sticker-wrapper img").css("opacity", "1.0").addClass("rt-animated " + I).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                        $(this).removeClass("rt-animated " + I)
                    })
                },
                after: function(U) {
                    var W = parseInt(U.currentSlide, 10) + 1;
                    jQuery(q + " ul.slides li:nth-child(" + W + ") h2.caption-content").css("opacity", "1.0").addClass("rt-animated " + S).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                        $(this).removeClass("rt-animated " + S)
                    }),
                    jQuery(q + " ul.slides li:nth-child(" + W + ") .real-caption").css("opacity", "1.0").addClass("rt-animated " + T).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                        $(this).removeClass("rt-animated " + T)
                    }),
                    jQuery(q + " ul.slides li:nth-child(" + W + ") .caption-link").css("opacity", "1.0").addClass("rt-animated " + P).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                        $(this).removeClass("rt-animated " + P)
                    }),
                    jQuery(q + " ul.slides li:nth-child(" + W + ") .slide-sticker-wrapper img").css("opacity", "1.0").addClass("rt-animated " + I).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                        $(this).removeClass("rt-animated " + I)
                    })
                },
                before: function(U) {
                    var W = parseInt(U.currentSlide, 10) + 1;
                    jQuery(q + " ul.slides li:nth-child(" + W + ") h2.caption-content").addClass("rt-animated " + A).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                        $(this).removeClass("rt-animated " + A).css("opacity", "0")
                    }),
                    jQuery(q + " ul.slides li:nth-child(" + W + ") .real-caption").addClass("rt-animated " + z).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                        $(this).removeClass("rt-animated " + z).css("opacity", "0")
                    }),
                    jQuery(q + " ul.slides li:nth-child(" + W + ") .caption-link").addClass("rt-animated " + N).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                        $(this).removeClass("rt-animated " + N).css("opacity", "0")
                    }),
                    jQuery(q + " ul.slides li:nth-child(" + W + ") .slide-sticker-wrapper img").addClass("rt-animated " + L).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                        $(this).removeClass("rt-animated " + L).css("opacity", "0")
                    })
                }
            }),
            imagesLoaded(q, function() {
                E ? B._mockupCaptionSlider2() : B._mockupCaptionSlider()
            })),
            this.slideShow.find(".flex-direction-nav .flex-next").click(function(U) {
                return U.preventDefault(),
                U.stopPropagation(),
                D.flexslider("next"),
                !1
            }),
            this.slideShow.find(".flex-direction-nav .flex-prev").click(function(U) {
                return U.preventDefault(),
                U.stopPropagation(),
                D.flexslider("prev"),
                !1
            })
        },
        _mockupCaptionSlider2: function() {
            if (this.slideShow.length) {
                var S = this.slideShowNamspace
                  , T = roar.getWidthBrowser();
                $(S + " .slide-body").each(1200 > T ? function() {
                    var P = $(this).data("height");
                    $(this).css({
                        height: P * T / 1200
                    })
                }
                : function() {
                    var P = $(this).data("height");
                    $(this).css({
                        height: P
                    })
                }
                ),
                $(S + " .caption-content").each(1200 > T ? function() {
                    var P = $(this).data("min")
                      , I = $(this).data("max")
                      , A = I * T / 1200;
                    P > A && (A = P),
                    $(this).css({
                        "font-size": A
                    })
                }
                : function() {
                    var P = $(this).data("max");
                    $(this).css({
                        "font-size": P
                    })
                }
                )
            }
        },
        _mockupCaptionSlider: function() {
            if (this.slideShow.length) {
                var S = this.slideShowNamspace
                  , T = this.option.slider_auto_height
                  , P = this.option.slider_height
                  , I = roar.getWidthBrowser();
                if (767 > I && 0 == T && 0 < P) {
                    $(S + " .slide-body").css("height", P * I / 1200)
                }
                767 <= I && 0 == T && 0 < P && $(S + " .slide-body").css("height", P),
                $(S + " .caption-content").each(767 > I ? function() {
                    var z = $(this).data("min")
                      , N = $(this).data("max")
                      , L = N;
                    50 < N && (L = 50),
                    z > L && (L = z),
                    $(this).css({
                        "font-size": L
                    })
                }
                : function() {
                    var z = $(this).data("max");
                    $(this).css({
                        "font-size": z
                    })
                }
                )
            }
        },
        _initResize: function() {
            var S = this.option.slider_scale
              , T = this;
            jQuery(window).resize(function() {
                S ? T._mockupCaptionSlider2() : T._mockupCaptionSlider()
            })
        },
        onUnload: function() {
            this.$container.off(this.slideShowNamspace)
        }
    }),
    y
}(),
theme.SidebarSection = function() {
    function y(S) {
        var T = this.$container = $(S)
          , P = this.sectionId = T.attr("data-section-id")
          , I = T.attr("data-section-type");
        this.sideBarId = $("#shopify-section-" + P),
        this.sideBar = $("#sidebar-" + P),
        this.sideBarNamspace = "#sidebar-" + P,
        this.tabSideBar = $(".tab-filter-tabs" + P + " a"),
        this.tabItem = $(".procduct_tab_item-" + P),
        this._init()
    }
    return y.prototype = _.assignIn({}, y.prototype, {
        _init: function() {
            var S = this;
            0 < this.tabItem.length && this.tabItem.each(function() {
                var T = {
                    _tabcount: $(this).data("_tabcount"),
                    _ptab_carousel: $(this).data("_ptab_carousel"),
                    _id: $(this).data("_id")
                };
                0 < parseInt(T._tabcount) ? (S._initTab(),
                T._ptab_carousel && S._initMultiSlide(T),
                S._initMultiSlides(T)) : (T._ptab_carousel && S._initSlide(T),
                S._initSlides(T))
            })
        },
        _initTab: function() {
            this.tabSideBar.each(function() {
                $(this).click(function(S) {
                    S.preventDefault(),
                    $(this).tab("show")
                })
            })
        },
        _initSlide: function(S) {
            var T = $(".box #myCarousel" + S._id + " .carousel-inner");
            $("#myCarousel" + S._id + "_next").click(function() {
                return T.trigger("next.owl.carousel"),
                !1
            }),
            $("#myCarousel" + S._id + "_prev").click(function() {
                return T.trigger("prev.owl.carousel"),
                !1
            }),
            T.owlCarousel({
                slideSpeed: 500,
                items: 1,
                rtl: window.rtl
            })
        },
        _initSlides: function(S) {
            var T = $(".box #myCarousel" + S._id + "s .carousel-inner");
            T.owlCarousel({
                slideSpeed: 500,
                rtl: window.rtl,
                responsive: {
                    0: {
                        items: 1
                    },
                    320: {
                        items: 1
                    },
                    479: {
                        items: 1
                    },
                    767: {
                        items: 1
                    },
                    979: {
                        items: 1
                    },
                    1199: {
                        items: 1
                    }
                }
            }),
            $("#myCarousel" + S._id + "s_next").click(function() {
                return T.trigger("next.owl.carousel"),
                !1
            }),
            $("#myCarousel" + S._id + "s_prev").click(function() {
                return T.trigger("prev.owl.carousel"),
                !1
            })
        },
        _initMultiSlide: function(S) {
            var T = $(".filter-product #myCarousel" + S._id + " .carousel-inner");
            $("#myCarousel" + S._id + "_next").click(function() {
                return T.trigger("next.owl.carousel"),
                !1
            }),
            $("#myCarousel" + S._id + "_prev").click(function() {
                return T.trigger("prev.owl.carousel"),
                !1
            }),
            T.owlCarousel({
                slideSpeed: 500,
                items: 1,
                rtl: window.rtl
            })
        },
        _initMultiSlides: function(S) {
            var T = $(".filter-product #myCarousel" + S._id + "s .carousel-inner");
            $("#myCarousel" + S._id + "s_next").click(function() {
                return T.trigger("next.owl.carousel"),
                !1
            }),
            $("#myCarousel" + S._id + "s_prev").click(function() {
                return T.trigger("prev.owl.carousel"),
                !1
            }),
            T.owlCarousel({
                slideSpeed: 500,
                rtl: window.rtl,
                responsive: {
                    0: {
                        items: 1
                    },
                    320: {
                        items: 1
                    },
                    479: {
                        items: 1
                    },
                    767: {
                        items: 1
                    },
                    979: {
                        items: 1
                    },
                    1199: {
                        items: 1
                    }
                }
            })
        },
        onUnload: function() {
            this.$container.off(this.sideBarNamspace)
        }
    }),
    y
}(),
theme.ProductTabSection = function() {
    function y(S) {
        var T = this.$container = $(S)
          , P = this.sectionId = T.attr("data-section-id")
          , I = T.attr("data-section-type");
        this.productTabId = $("#shopify-section-" + P),
        this.productTab = $("#product-tab-" + P),
        this.productTabNamspace = "#product-tab-" + P,
        this.tabProductTabVertical = $(".tab-filter-tabs-vertical-" + P + " a"),
        this.tabProductTab = $(".tab-filter-tabs-" + P + " a"),
        this.tabItem = $(".product-tab-item-" + P),
        this._tabcount = this.productTab.data("_tabcount"),
        this.placement_fullwidth = this.productTab.data("placement_fullwidth"),
        this._init()
    }
    return y.prototype = _.assignIn({}, y.prototype, {
        _init: function() {
            var S = this
              , T = this._tabcount;
            if (0 < this.tabItem.length && this.tabItem.each(function() {
                var I = {
                    _tabcount: T,
                    _ptab_carousel: $(this).data("_ptab_carousel"),
                    _id: $(this).data("_id"),
                    _nextpage: $(this).data("_nextpage"),
                    _itemsperpage: $(this).data("_itemsperpage"),
                    _limit: parseInt($(this).data("_limit"), 10),
                    _colclass: $(this).data("_colclass"),
                    _catid: $(this).data("_catid"),
                    _all_loaded: !1,
                    _loaded_count: parseInt($(this).data("_itemsperpage"), 10)
                };
                S._initTab(),
                S._initMultiSlide(I)
            }),
            "1" == this.placement_fullwidth && !window.sidebar) {
                var P = this.sectionId;
                onFullWidthOption(P)
            }
        },
        _initTab: function() {
            0 < this.tabProductTab.length && this.tabProductTab.each(function() {
                $(this).click(function(S) {
                    S.preventDefault(),
                    $(this).tab("show")
                })
            }),
            0 < this.tabProductTabVertical.length && this.tabProductTabVertical.each(function() {
                $(this).click(function(S) {
                    S.preventDefault(),
                    $(this).tab("show")
                })
            })
        },
        _initMultiSlide: function(S) {
            var T = 1
              , P = 0;
            if (S._ptab_carousel) {
                var I = $(".filter-product #myCarousel" + S._id)
                  , A = $(".filter-product #myCarousel" + S._id + " .carousel-inner");
                A.slick({
                    autoplaySpeed: 500,
                    rtl: window.rtl,
                    slidesToShow: 1,
                    arrows: !1,
                    infinite: !1
                }),
                A.on("reInit ", function(z, N) {
                    T = N.slideCount
                }),
                A.on("afterChange", function(z, N) {
                    P = N.currentSlide
                }),
                $("#myCarousel" + S._id + "_next").click(function() {
                    return T == P + 1 && "" != S._catid && !1 == S._all_loaded && S._loaded_count < S._limit ? (console.log("There we go..."),
                    I.addClass("b-loading"),
                    $.ajax({
                        url: "/collections/" + S._catid,
                        type: "get",
                        dataType: "html",
                        data: {
                            view: "customlim",
                            limit: S._itemsperpage + "a" + S._colclass,
                            page: S._nextpage
                        },
                        success: function(z) {
                            var N = z.trim();
                            if ("" == N)
                                S._all_loaded = !0;
                            else {
                                var L = $(N)
                                  , M = "row-" + S._id + "-" + S._nextpage
                                  , q = L.find(".row").first().attr("id", M).children();
                                if (S._loaded_count + q.length <= S._limit)
                                    ++S._nextpage,
                                    S._loaded_count += q.length;
                                else {
                                    for (var O = S._loaded_count + q.length - S._limit, F = 0; F < O; F++)
                                        q.last().remove(),
                                        q = L.find(".row").first().children();
                                    S._loaded_count = S._limit
                                }
                                A.slick("slickAdd", L[0].outerHTML),
                                A.slick("slickNext"),
                                roar.initCountdown(),
                                roar.initLazyLoading("#" + M, !0),
                                roar.initProductQuickShopItem("#" + M),
                                roar.handleQuickshop("#" + M),
                                window.show_multiple_currencies && theme.CurrencyPicker.convert("#sandbox .money")
                            }
                            I.removeClass("b-loading")
                        },
                        error: function() {
                            console.log("Something went wrong")
                        }
                    }),
                    !1) : (A.slick("slickNext"),
                    !1)
                }),
                $("#myCarousel" + S._id + "_prev").click(function() {
                    return A.slick("slickPrev"),
                    !1
                })
            }
        },
        onUnload: function() {
            this.$container.off(this.productTabNamspace)
        }
    }),
    y
}(),
theme.AdvancedGridSection = function() {
    function y(S) {
        var T = this.$container = $(S)
          , P = this.sectionId = T.attr("data-section-id")
          , I = T.attr("data-section-type");
        this.advancedGridId = $("#shopify-section-" + P),
        this.advancedGrid = $("#advanced-grid-" + P),
        this.advancedGridNamspace = "#advanced-grid-" + P,
        this._ag_bgtype = this.advancedGrid.data("_ag_bgtype"),
        this._ag_fullwidth = this.advancedGrid.data("_ag_fullwidth"),
        this._agProductsCarousel = $(".myProductsCarousel-" + P),
        this._init()
    }
    return y.prototype = _.assignIn({}, y.prototype, {
        _init: function() {
            if (this._ag_fullwidth && !window.sidebar) {
                var S = this.sectionId;
                onFullWidthOption(S)
            }
            "2" == this._ag_bgtype && this._initParalax(),
            this._initProductTab(),
            this._initProductsSlide(),
            this._initCountdown()
        },
        _initCountdown: function() {
            0 < $(".ag_product_countdown").length && $(".ag_product_countdown").each(function() {
                var S = parseInt($(this).data("offer_date_year"))
                  , T = parseInt($(this).data("offer_date_month"))
                  , P = parseInt($(this).data("offer_date_day"))
                  , I = new Date
                  , A = new Date(S,T - 1,P);
                I < A ? $(this).countdown({
                    until: A
                }) : $(this).hide()
            })
        },
        _initParalax: function() {
            var S = this.sectionId;
            $(".advanced-grid-" + S + " .parallax-window").scrolly({
                bgParallax: !0
            })
        },
        _initProductsSlide: function() {
            0 < this._agProductsCarousel.length && this._agProductsCarousel.each(function() {
                var S = $(this)
                  , T = S.data("_skin_type")
                  , P = S.data("_id");
                "sportwinter" == T ? S.owlCarousel({
                    slideSpeed: 500,
                    items: 1,
                    rtl: window.rtl
                }) : S.owlCarousel({
                    responsive: {
                        0: {
                            items: window.pitem_row
                        },
                        320: {
                            items: window.pitem_row
                        },
                        479: {
                            items: 2
                        },
                        767: {
                            items: 3
                        },
                        979: {
                            items: 4
                        },
                        1199: {
                            items: 5
                        }
                    },
                    rtl: window.rtl
                }),
                $("#myCarousel" + P + "_next").click(function() {
                    return S.trigger("next.owl.carousel"),
                    !1
                }),
                $("#myCarousel" + P + "_prev").click(function() {
                    return S.trigger("prev.owl.carousel"),
                    !1
                })
            })
        },
        _initProductTab: function() {
            var S = this.sectionId
              , T = this;
            $(".ag-products-tabs-" + S).each(function() {
                var P = $(this).data("_tabcount")
                  , I = $(this).data("_block_id");
                T._initTab(I),
                T._initMultiSlide(I)
            })
        },
        _initTab: function(S) {
            0 < $(".tab-filter-tabs-" + S).length && $(".tab-filter-tabs-" + S + " a").each(function() {
                $(this).click(function(T) {
                    T.preventDefault(),
                    $(this).tab("show")
                })
            })
        },
        _initMultiSlide: function(S) {
            0 < $(".ag-product-tab-item-" + S).length && $(".ag-product-tab-item-" + S).each(function() {
                var T = $(this).data("_pid")
                  , P = $(this).data("_acm_carousel")
                  , I = $(this).data("_catid")
                  , A = $(this).data("_nextpage")
                  , z = $(this).data("_itemsperpage")
                  , N = parseInt($(this).data("_limit"), 10)
                  , L = $(this).data("_colclass")
                  , M = !1
                  , q = parseInt($(this).data("_itemsperpage"), 10)
                  , O = 1
                  , F = 0;
                if (P) {
                    var E = $(".filter-product #myCarousel" + T)
                      , B = $(".filter-product #myCarousel" + T + " .carousel-inner");
                    B.slick({
                        autoplaySpeed: 500,
                        rtl: window.rtl,
                        slidesToShow: 1,
                        arrows: !1,
                        infinite: !1
                    }),
                    B.on("reInit ", function(D, U) {
                        O = U.slideCount
                    }),
                    B.on("afterChange", function(D, U) {
                        F = U.currentSlide
                    }),
                    $("#myCarousel" + T + "_next").click(function() {
                        return O == F + 1 && "" != I && !1 == M && q < N ? (E.addClass("b-loading"),
                        $.ajax({
                            url: "/collections/" + I,
                            type: "get",
                            dataType: "html",
                            data: {
                                view: "customlim",
                                limit: z + "a" + L,
                                page: A
                            },
                            success: function(D) {
                                var U = D.trim();
                                if ("" == U)
                                    M = !0;
                                else {
                                    var W = $(U)
                                      , H = "row-" + T + "-" + A
                                      , V = W.find(".row").first().attr("id", H).children();
                                    if (q + V.length <= N)
                                        ++A,
                                        q += V.length;
                                    else {
                                        for (var G = q + V.length - N, R = 0; R < G; R++)
                                            V.last().remove(),
                                            V = W.find(".row").first().children();
                                        q = N
                                    }
                                    B.slick("slickAdd", W[0].outerHTML),
                                    B.slick("slickNext"),
                                    roar.initCountdown(),
                                    roar.initLazyLoading("#" + H, !0),
                                    roar.initProductQuickShopItem("#" + H),
                                    roar.handleQuickshop("#" + H),
                                    window.show_multiple_currencies && theme.CurrencyPicker.convert("#sandbox .money")
                                }
                                E.removeClass("b-loading")
                            },
                            error: function() {
                                console.log("Something went wrong")
                            }
                        }),
                        !1) : (B.slick("slickNext"),
                        !1)
                    }),
                    $("#myCarousel" + T + "_prev").click(function() {
                        return B.slick("slickPrev"),
                        !1
                    })
                }
            })
        },
        onUnload: function() {
            this.$container.off(this.advancedGridNamspace)
        }
    }),
    y
}(),
theme.PrefaceFooterSection = function() {
    function y(S) {
        var T = this.$container = $(S)
          , P = this.sectionId = T.attr("data-section-id")
          , I = T.attr("data-section-type");
        this.prefaceFooterId = $("#shopify-section-" + P),
        this.prefaceFooter = $("#preface-footer-" + P),
        this.prefaceFooterNamspace = "#preface-footer-" + P,
        this._init()
    }
    return y.prototype = _.assignIn({}, y.prototype, {
        _init: function() {},
        onUnload: function() {
            this.$container.off(this.prefaceFooterNamspace)
        }
    }),
    y
}(),
theme.FooterTopSection = function() {
    function y(S) {
        var T = this.$container = $(S)
          , P = this.sectionId = T.attr("data-section-id")
          , I = T.attr("data-section-type");
        this.footerTopId = $("#shopify-section-" + P),
        this.footerTop = $("#footer-top-" + P),
        this.footerTopNamspace = "#footer-top-" + P,
        this._init()
    }
    return y.prototype = _.assignIn({}, y.prototype, {
        _init: function() {},
        onUnload: function() {
            this.$container.off(this.footerTopNamspace)
        }
    }),
    y
}(),
theme.FooterBottomSection = function() {
    function y(S) {
        var T = this.$container = $(S)
          , P = this.sectionId = T.attr("data-section-id")
          , I = T.attr("data-section-type");
        this.footerTopId = $("#shopify-section-" + P),
        this.footerTop = $("#footer-top-" + P),
        this.footerTopNamspace = "#footer-top-" + P,
        this._init()
    }
    return y.prototype = _.assignIn({}, y.prototype, {
        _init: function() {},
        onUnload: function() {
            this.$container.off(this.footerTopNamspace)
        }
    }),
    y
}(),
theme.FooterCopyRightSection = function() {
    function y(S) {
        var T = this.$container = $(S)
          , P = this.sectionId = T.attr("data-section-id")
          , I = T.attr("data-section-type");
        this.footerCopyRightId = $("#shopify-section-" + P),
        this.footerCopyRight = $("#footer-copyright-" + P),
        this.footerCopyRightNamspace = "#footer-copyright-" + P,
        this._init()
    }
    return y.prototype = _.assignIn({}, y.prototype, {
        _init: function() {},
        onUnload: function() {
            this.$container.off(this.footerCopyRightNamspace)
        }
    }),
    y
}(),
theme.FooterColumn = function() {
    function y(S) {
        var T = this.$container = $(S)
          , P = this.sectionId = T.attr("data-section-id")
          , I = T.attr("data-section-type");
        this.footerColumnId = $("#shopify-section-" + P),
        this.footerColumn = $("#footer-column-" + P),
        this.footerColumnNamspace = "#footer-column-" + P,
        this._class = this.footerColumn.data("_class"),
        this._init()
    }
    return y.prototype = _.assignIn({}, y.prototype, {
        _init: function() {
            "" != this._class && this.footerColumnId.addClass(this._class)
        },
        onUnload: function() {
            this.$container.off(this.footerColumnNamspace)
        }
    }),
    y
}(),
theme.TestimonialSection = function() {
    function y(S) {
        var T = this.$container = $(S)
          , P = this.sectionId = T.attr("data-section-id")
          , I = T.attr("data-section-type");
        this.testimonialId = $("#shopify-section-" + P),
        this.testimonial = $("#testimonial-" + P),
        this.testimonialNamspace = "#testimonial-" + P,
        this.placement_fullwidth = this.testimonial.data("placement_fullwidth"),
        this._init()
    }
    return y.prototype = _.assignIn({}, y.prototype, {
        _init: function() {
            var S = this.sectionId
              , T = $(".box #myCarousel_testi_" + S + " .testimonial-slide")
              , P = !1;
            if (1 == parseInt(window.rtl) && (P = !0),
            T.not(".slick-initialized").slick({
                arrows: !1,
                slidesToShow: 1,
                slidesToScroll: 1,
                rtl: P
            }),
            $("#myCarousel_testi_next_" + S).click(function() {
                return T.slick("slickNext"),
                !1
            }),
            $("#myCarousel_testi_prev_" + S).click(function() {
                return T.slick("slickPrev"),
                !1
            }),
            $(window).resize(function() {
                T.slick("setPosition")
            }),
            "1" == this.placement_fullwidth && !window.sidebar) {
                var S = this.sectionId;
                onFullWidthOption(S)
            }
        },
        onUnload: function() {
            this.$container.off(this.testimonialNamspace)
        }
    }),
    y
}(),
theme.LatestBlogSection = function() {
    function y(S) {
        var T = this.$container = $(S)
          , P = this.sectionId = T.attr("data-section-id")
          , I = T.attr("data-section-type");
        this.latestBlogId = $("#shopify-section-" + P),
        this.latestBlog = $("#latest_blog-" + P),
        this.latestBlogSlider = $("#latest_blog-" + P + " .blog-slick-slider"),
        this.latestBlogNamspace = "#latest_blog-" + P,
        this.placement_fullwidth = this.latestBlog.data("placement_fullwidth"),
        this._init()
    }
    return y.prototype = _.assignIn({}, y.prototype, {
        _init: function() {
            if ("1" == this.placement_fullwidth && !window.sidebar) {
                var S = this.sectionId;
                onFullWidthOption(S)
            }
            this._initSlide()
        },
        _initSlide: function() {
            var S = !1;
            1 == parseInt(window.rtl) && (S = !0),
            0 < this.latestBlogSlider.length && this.latestBlogSlider.not(".slick-initialized").slick({
                rtl: S,
                slidesToShow: 3,
                slidesToScroll: 1,
                prevArrow: "<a class=\"prev-button arrow-btn\" href=\"#\"><svg><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#global__symbols-prev\"></use></svg></a>",
                nextArrow: "<a class=\"next-button arrow-btn\" href=\"#\"><svg><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#global__symbols-next\"></use></svg></a>",
                responsive: [{
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }]
            })
        },
        onUnload: function() {
            this.$container.off(this.latestBlogNamspace)
        }
    }),
    y
}(),
theme.InstafeedSection = function() {
    function y(S) {
        var T = this.$container = $(S)
          , P = this.sectionId = T.attr("data-section-id")
          , I = T.attr("data-section-type");
        this.instafeedId = $("#shopify-section-" + P),
        this.instafeed = $("#home-instagram-widget-" + P),
        this.instafeedNamspace = "#home-instagram-widget-" + P,
        this.instagram_list = $("#instagram_home_" + P),
        this.instagram_target = "instagram_home_" + P,
        this.placement_fullwidth = this.instafeed.data("placement_fullwidth"),
        this._init()
    }
    return y.prototype = _.assignIn({}, y.prototype, {
        _init: function() {
            if ("1" == this.placement_fullwidth && !window.sidebar) {
                var S = this.sectionId;
                onFullWidthOption(S)
            }
            0 < this.instagram_list.length && this._instafeedRun()
        },
        _instafeedRun: function() {
            var S = this.instagram_target
              , T = this.instagram_list.data("social_instagram_token")
              , P = this.instagram_list.data("user_id")
              , I = this.instagram_list.data("home_instafeed_limit")
              , A = new Instafeed({
                get: "user",
                target: S,
                accessToken: T,
                userId: P,
                limit: I,
                resolution: "thumbnail",
                resolution2: "standard_resolution",
                template: "<div class=\"wrap animated\"><a target=\"_blank\" href=\"{{link}}\"><img src=\"{{image}}\" alt=\"{{caption}}\" width=\"150\" height=\"150\" /><span class=\"hover_border\"></span></a></div>"
            });
            A.run()
        },
        onUnload: function() {
            this.$container.off(this.instafeedNamspace)
        }
    }),
    y
}(),
theme.mobileNavSection = function() {
    function y(S) {
        var T = this.$container = $(S)
          , P = this.sectionId = T.attr("data-section-id")
          , I = T.attr("data-section-type");
        this.mobileNavId = $("#shopify-section-" + P),
        this.mobileNav = $("#primary-" + P),
        this.mobilenavNamespace = "#primary-" + P,
        this._init()
    }
    return y.prototype = _.assignIn({}, y.prototype, {
        _init: function() {
            this._initMobile()
        },
        _initMobile: function() {
            $("#off-canvas-layer").on("click", function() {
                $(document.body).removeClass("open-canvas-panel"),
                $(document.body).removeClass("open_filter")
            }),
            $(".mobile-nav-icon").on("click", function() {
                $(document.body).toggleClass("open-canvas-panel")
            }),
            $(".mobile-child-menu").on("click", function() {
                var S = $(this).closest(".menu-item-has-children");
                S.toggleClass("mobile-active")
            }),
            $(".mobile-nav-search, .mobile-nav-search-close").on("click", function() {
                $(document.body).toggleClass("open-search-form"),
                $(".mobile-nav-search-form input").focus()
            }),
            $(window).on("resize", function() {
                991 < $(window).width() && $(document.body).removeClass("open-canvas-panel")
            })
        },
        onUnload: function() {
            this.$container.off(this.mobilenavNamespace)
        }
    }),
    y
}(),
theme.ProductVariantMobile = function() {
    function y(S) {
        var T = this.$container = $(S)
          , P = this.sectionId = T.attr("data-section-id")
          , I = T.attr("data-section-type");
        this.wrapperId = $("#" + P),
        this.wrapper = $("#" + P),
        this.wrapperNamspace = "#" + P,
        this.addCartId = $("#btn-" + P + ".m-allow-cart"),
        this.addCartClass = $(".variant-item-" + P + ".m-allow-cart"),
        this._init()
    }
    return y.prototype = _.assignIn({}, y.prototype, {
        _init: function() {
            var S = this;
            S._initScroll(),
            S._initCompact(),
            S._initEvents(),
            $(window).resize(function() {
                991 >= $(window).width() && S._initCompact()
            })
        },
        _initScroll: function() {
            $(window).on("scroll", function() {
                var S = $("#shopify-section-product-variants-mobile").height();
                $(window).scrollTop() > S ? $(document.body).addClass("sticky-product-variants-mobile") : ($(document.body).removeClass("sticky-product-variants-mobile"),
                $(".product-variants-mobile").hasClass("active") && $(".product-variants-mobile").height($(".variants-header").data("height")))
            })
        },
        _initCompact: function() {
            if (0 < $(".product-variant-mobile-section").length) {
                var S = $(".product-variant-mobile-section")
                  , T = $(".product-variants-mobile");
                T.each(function() {
                    var P = $(this)
                      , I = P.find(".variants-header")
                      , A = I.innerHeight()
                      , z = P.find(".variants-content").outerHeight()
                      , N = I.closest(".product-variants-mobile");
                    I.data("height", A),
                    P.data("height", A + z)
                }),
                T.each(function() {
                    var P = $(this)
                      , I = P.find(".variants-header")
                      , A = I.innerHeight()
                      , z = P.find(".variants-content").outerHeight()
                      , N = I.closest(".product-variants-mobile");
                    I.data("height", A),
                    P.data("height", A + z),
                    N.hasClass("active") && N.height(N.data("height"))
                }),
                S.unbind("click") && S.on("click", ".variants-header .title", function() {
                    var P = $(this)
                      , I = P.closest(".variants-header")
                      , A = P.closest(".product-variants-mobile");
                    A.hasClass("active") || T.closest(".active").removeClass("active").height(P.data("height")),
                    A.toggleClass("active"),
                    A.hasClass("active") ? A.height(A.data("height")) : A.height(I.data("height"))
                })
            }
        },
        _initEvents: function() {
            var S = $("#ProductSelect-product-template.variation-select").val();
            0 < this.addCartId.length && (this.addCartId.unbind("click"),
            this.addCartId.on("click", function() {
                $("#ProductSelect-product-template.variation-select").val(S),
                $("#AddToCart-product-template").trigger("click")
            })),
            0 < this.addCartClass.length && (this.addCartClass.unbind("click"),
            this.addCartClass.on("click", function() {
                var T = $(this).data("id");
                $("#ProductSelect-product-template.variation-select").val(T),
                $("#AddToCart-product-template").trigger("click")
            }))
        },
        onUnload: function() {
            this.$container.off(this.wrapperNamspace)
        }
    }),
    y
}(),
theme.CartVariantMobile = function() {
    function y(S) {
        var T = this.$container = $(S)
          , P = this.sectionId = T.attr("data-section-id")
          , I = T.attr("data-section-type");
        this.wrapperId = $("#" + P),
        this.wrapper = $("#" + P),
        this.wrapperNamspace = "#" + P,
        this.addCartId = $("#btn-" + P + ".m-allow-cart"),
        this.addCartClass = $(".variant-item-" + P + ".m-allow-cart"),
        this._init()
    }
    return y.prototype = _.assignIn({}, y.prototype, {
        _init: function() {
            var S = this;
            S._initScroll()
        },
        _initScroll: function() {
            $(window).on("scroll", function() {
                var S = $("#shopify-section-product-variants-mobile").height();
                $(window).scrollTop() > S ? $(document.body).addClass("sticky-product-variants-mobile") : ($(document.body).removeClass("sticky-product-variants-mobile"),
                $(".product-variants-mobile").hasClass("active") && $(".product-variants-mobile").height($(".variants-header").data("height")))
            })
        },
        onUnload: function() {
            this.$container.off(this.wrapperNamspace)
        }
    }),
    y
}(),
theme.Brands = function() {
    function y(S) {
        var T = this.$container = $(S)
          , P = this.sectionId = T.attr("data-section-id")
          , I = T.attr("data-section-type");
        this.brandsId = $("#brands-" + P),
        this.featuredBrands = $(".featured-brands-" + P),
        this.brandsNamspace = "#brands-" + P,
        this._init()
    }
    return y.prototype = _.assignIn({}, y.prototype, {
        _init: function() {
            var S = this.featuredBrands.data("perview")
              , T = this.featuredBrands.data("autoplay")
              , P = this.featuredBrands.data("speed")
              , I = !1;
            "1" == T && (I = !0),
            this.featuredBrands.not(".slick-initialized").slick({
                rtl: window.rtl,
                slidesToShow: S,
                slidesToScroll: 1,
                autoplaySpeed: P,
                autoplay: T,
                infinite: !0,
                prevArrow: "<a class=\"prev-button arrow-btn\" href=\"#\"><svg><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#global__symbols-prev\"></use></svg></a>",
                nextArrow: "<a class=\"next-button arrow-btn\" href=\"#\"><svg><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#global__symbols-next\"></use></svg></a>",
                responsive: [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1
                    }
                }, {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                }, {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                }]
            })
        },
        onUnload: function() {
            this.$container.off(this.brandsNamspace)
        }
    }),
    y
}(),
theme.rvsVideo = function() {
    function y(S) {
        var T = this.$container = $(S)
          , P = this.sectionId = T.attr("data-section-id")
          , I = T.attr("data-section-type");
        this.rvsId = $("#shopify-section-" + P),
        this.rvsNamspace = "#rvsvideo-" + P + "_wrapper",
        this.rvsMain = "#rvsvideo-" + P,
        this.placement_fullwidth = $(this.rvsNamspace).data("placement_fullwidth"),
        this.delayTime = $(this.rvsNamspace).data("delaytime"),
        this._init()
    }
    return y.prototype = _.assignIn({}, y.prototype, {
        _init: function() {
            var z, S = this.sectionId, T = this.rvsMain, P = this.delayTime, I = this.placement_fullwidth, A = jQuery;
            A(document).ready(function() {
                void 0 == A(T).revolution ? revslider_showDoubleJqueryError(T) : (z = A(T).show().revolution({
                    sliderType: "carousel",
                    jsFileLocation: "https://storage.googleapis.com/revolutionslider/revolution/js/",
                    sliderLayout: "fullwidth",
                    dottedOverlay: "none",
                    delay: P,
                    navigation: {
                        keyboardNavigation: "off",
                        keyboard_direction: "horizontal",
                        mouseScrollNavigation: "off",
                        mouseScrollReverse: "default",
                        onHoverStop: "off",
                        touch: {
                            touchenabled: "on",
                            touchOnDesktop: "off",
                            swipe_threshold: 75,
                            swipe_min_touches: 1,
                            swipe_direction: "horizontal",
                            drag_block_vertical: !1
                        },
                        arrows: {
                            style: "gyges",
                            enable: !0,
                            hide_onmobile: !1,
                            hide_onleave: !1,
                            tmp: "",
                            left: {
                                h_align: "left",
                                v_align: "center",
                                h_offset: 20,
                                v_offset: 0
                            },
                            right: {
                                h_align: "right",
                                v_align: "center",
                                h_offset: 20,
                                v_offset: 0
                            }
                        },
                        tabs: {
                            style: "gyges",
                            enable: !0,
                            width: 250,
                            height: 80,
                            min_width: 250,
                            wrapper_padding: 30,
                            wrapper_color: "rgba(38,41,43,1)",
                            tmp: "<div class=\"tp-tab-content\">  <span class=\"tp-tab-date\">{{param1}}</span>  <span class=\"tp-tab-title\">{{title}}</span></div><div class=\"tp-tab-image\"></div>",
                            visibleAmount: 5,
                            hide_onmobile: !1,
                            hide_onleave: !1,
                            hide_delay: 200,
                            direction: "horizontal",
                            span: !0,
                            position: "outer-bottom",
                            space: 0,
                            h_align: "center",
                            v_align: "bottom",
                            h_offset: 0,
                            v_offset: 0
                        }
                    },
                    carousel: {
                        horizontal_align: "center",
                        vertical_align: "center",
                        fadeout: "on",
                        vary_fade: "on",
                        maxVisibleItems: 3,
                        infinity: "on",
                        space: 0,
                        stretch: "off",
                        showLayersAllTime: "off",
                        easing: "Power3.easeInOut",
                        speed: "800"
                    },
                    visibilityLevels: [1240, 1024, 778, 480],
                    gridwidth: 720,
                    gridheight: 405,
                    lazyType: "none",
                    shadow: 0,
                    spinner: "off",
                    stopLoop: "on",
                    stopAfterLoops: 0,
                    stopAtSlide: 1,
                    shuffle: "off",
                    autoHeight: "off",
                    disableProgressBar: "on",
                    hideThumbsOnMobile: "off",
                    hideSliderAtLimit: 0,
                    hideCaptionAtLimit: 0,
                    hideAllCaptionAtLilmit: 0,
                    debugMode: !1,
                    fallbacks: {
                        simplifyAll: "off",
                        nextSlideOnWindowFocus: "off",
                        disableFocusListener: !1
                    }
                }),
                z.one("revolution.slide.onloaded", function() {
                    "1" != I || window.sidebar || onFullWidthOption(S),
                    z.revredraw()
                }))
            })
        },
        onUnload: function() {}
    }),
    y
}(),
theme.rvsHighlight = function() {
    function y(S) {
        var T = this.$container = $(S)
          , P = this.sectionId = T.attr("data-section-id")
          , I = T.attr("data-section-type");
        this.rvshighlightId = $("#shopify-section-" + P),
        this.rvshighlightNamspace = "#rvshighlight-" + P + "_wrapper",
        this.rvshighlightMain = "#rvshighlight-" + P,
        this.placement_fullwidth = $(this.rvshighlightNamspace).data("placement_fullwidth"),
        this.delayTime = $(this.rvshighlightNamspace).data("delaytime"),
        this._init()
    }
    return y.prototype = _.assignIn({}, y.prototype, {
        _init: function() {
            var z, S = this.sectionId, T = this.rvshighlightMain, P = this.delayTime, I = this.placement_fullwidth, A = jQuery;
            A(document).ready(function() {
                void 0 == A(T).revolution ? revslider_showDoubleJqueryError(T) : (z = A(T).show().revolution({
                    sliderType: "standard",
                    jsFileLocation: "https://storage.googleapis.com/revolutionslider/revolution/js/",
                    sliderLayout: "auto",
                    dottedOverlay: "none",
                    delay: P,
                    navigation: {
                        keyboardNavigation: "off",
                        keyboard_direction: "horizontal",
                        mouseScrollNavigation: "off",
                        mouseScrollReverse: "default",
                        onHoverStop: "off",
                        touch: {
                            touchenabled: "on",
                            swipe_threshold: 75,
                            swipe_min_touches: 1,
                            swipe_direction: "horizontal",
                            drag_block_vertical: !1
                        },
                        tabs: {
                            style: "zeus",
                            enable: !0,
                            width: 100,
                            height: 30,
                            min_width: 100,
                            wrapper_padding: 0,
                            wrapper_color: "transparent",
                            wrapper_opacity: "0",
                            tmp: "<span class=\"tp-tab-title\">{{title}}</span>",
                            visibleAmount: 3,
                            hide_onmobile: !0,
                            hide_under: 480,
                            hide_onleave: !1,
                            hide_delay: 200,
                            direction: "horizontal",
                            span: !0,
                            position: "inner",
                            space: 1,
                            h_align: "left",
                            v_align: "top",
                            h_offset: 30,
                            v_offset: 30
                        }
                    },
                    viewPort: {
                        enable: !0,
                        outof: "pause",
                        visible_area: "90%",
                        presize: !1
                    },
                    responsiveLevels: [1240, 1024, 778, 480],
                    visibilityLevels: [1240, 1024, 778, 480],
                    gridwidth: [1230, 1024, 767, 480],
                    gridheight: [720, 720, 480, 360],
                    lazyType: "none",
                    parallax: {
                        type: "scroll",
                        origo: "enterpoint",
                        speed: 400,
                        levels: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 46, 47, 48, 49, 50, 55],
                        type: "scroll"
                    },
                    shadow: 0,
                    spinner: "off",
                    stopLoop: "off",
                    stopAfterLoops: -1,
                    stopAtSlide: -1,
                    shuffle: "off",
                    autoHeight: "off",
                    hideThumbsOnMobile: "off",
                    hideSliderAtLimit: 0,
                    hideCaptionAtLimit: 0,
                    hideAllCaptionAtLilmit: 0,
                    debugMode: !1,
                    fallbacks: {
                        simplifyAll: "off",
                        nextSlideOnWindowFocus: "off",
                        disableFocusListener: !1
                    }
                }),
                z.one("revolution.slide.onloaded", function() {
                    "1" != I || window.sidebar || onFullWidthOption(S),
                    z.revredraw()
                }))
            })
        },
        onUnload: function() {}
    }),
    y
}(),
theme.rvsProducts = function() {
    function y(S) {
        var T = this.$container = $(S)
          , P = this.sectionId = T.attr("data-section-id")
          , I = T.attr("data-section-type");
        this.rvsproductsId = $("#shopify-section-" + P),
        this.rvsproductsNamspace = "#rvsproducts-" + P + "_wrapper",
        this.rvsproductsMain = "#rvsproducts-" + P,
        this.placement_fullwidth = $(this.rvsproductsNamspace).data("placement_fullwidth"),
        this.delayTime = $(this.rvsproductsNamspace).data("delaytime"),
        this._init()
    }
    return y.prototype = _.assignIn({}, y.prototype, {
        _init: function() {
            var z, S = this.sectionId, T = this.rvsproductsMain, P = this.delayTime, I = this.placement_fullwidth, A = jQuery;
            A(document).ready(function() {
                void 0 == A(T).revolution ? revslider_showDoubleJqueryError(T) : (z = A(T).show().revolution({
                    sliderType: "standard",
                    jsFileLocation: "https://storage.googleapis.com/revolutionslider/revolution/js/",
                    sliderLayout: "auto",
                    dottedOverlay: "none",
                    delay: P,
                    navigation: {
                        keyboardNavigation: "off",
                        keyboard_direction: "horizontal",
                        mouseScrollNavigation: "off",
                        mouseScrollReverse: "default",
                        onHoverStop: "on",
                        touch: {
                            touchenabled: "on",
                            swipe_threshold: 75,
                            swipe_min_touches: 50,
                            swipe_direction: "horizontal",
                            drag_block_vertical: !1
                        },
                        arrows: {
                            style: "gyges",
                            enable: !0,
                            hide_onmobile: !1,
                            hide_onleave: !1,
                            tmp: "",
                            left: {
                                h_align: "right",
                                v_align: "bottom",
                                h_offset: 40,
                                v_offset: 0
                            },
                            right: {
                                h_align: "right",
                                v_align: "bottom",
                                h_offset: 0,
                                v_offset: 0
                            }
                        }
                    },
                    responsiveLevels: [1240, 1024, 778, 480],
                    visibilityLevels: [1240, 1024, 778, 480],
                    gridwidth: [1200, 1024, 778, 480],
                    gridheight: [600, 600, 600, 600],
                    lazyType: "single",
                    parallax: {
                        type: "scroll",
                        origo: "slidercenter",
                        speed: 400,
                        levels: [5, 10, 15, 20, 25, 30, 35, 40, 45, 46, 47, 48, 49, 50, 51, 55],
                        type: "scroll"
                    },
                    shadow: 0,
                    spinner: "off",
                    stopLoop: "off",
                    stopAfterLoops: -1,
                    stopAtSlide: -1,
                    shuffle: "off",
                    autoHeight: "off",
                    disableProgressBar: "on",
                    hideThumbsOnMobile: "off",
                    hideSliderAtLimit: 0,
                    hideCaptionAtLimit: 0,
                    hideAllCaptionAtLilmit: 0,
                    debugMode: !1,
                    fallbacks: {
                        simplifyAll: "off",
                        nextSlideOnWindowFocus: "off",
                        disableFocusListener: !1
                    }
                }),
                z.one("revolution.slide.onloaded", function() {
                    "1" != I || window.sidebar || onFullWidthOption(S),
                    z.revredraw()
                }))
            })
        },
        onUnload: function() {}
    }),
    y
}(),
theme.YourCollections = function() {
    function y(S) {
        var T = this.$container = $(S)
          , P = this.sectionId = T.attr("data-section-id")
          , I = T.attr("data-section-type");
        this.latestCategoryId = $("#shopify-section-" + P),
        this.latestCategoryNamspace = $(".your-collections-" + P),
        this._limit = this.latestCategoryNamspace.data("limit"),
        this._speed = this.latestCategoryNamspace.data("speed"),
        this._autoplay = this.latestCategoryNamspace.data("autoplay"),
        this.placement_fullwidth = this.latestCategoryNamspace.data("placement_fullwidth"),
        this._init()
    }
    return y.prototype = _.assignIn({}, y.prototype, {
        _init: function() {
            var S = this.sectionId
              , T = ".your-collections-wrapper .CollectionGrid-" + S;
            "1" != this.placement_fullwidth || window.sidebar || onFullWidthOption(S),
            $(T).slick({
                slidesToShow: this._limit,
                slidesToScroll: 1,
                autoplay: this._autoplay,
                autoplaySpeed: this._speed,
                prevArrow: "<a class=\"prev-button arrow-btn\" href=\"#\"><svg><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#global__symbols-prev\"></use></svg></a>",
                nextArrow: "<a class=\"next-button arrow-btn\" href=\"#\"><svg><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#global__symbols-next\"></use></svg></a>",
                rtl: window.rtl,
                responsive: [{
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1
                    }
                }, {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                }, {
                    breakpoint: 469,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                }]
            }),
            roar.initLazyLoading(T, !0)
        },
        onUnload: function() {
            this.$container.off(this.latestCategoryNamspace)
        }
    }),
    y
}(),
theme.CollectionsList = function() {
    function y(S) {
        var T = this.$container = $(S)
          , P = this.sectionId = T.attr("data-section-id")
          , I = T.attr("data-section-type");
        this.latestCollectionId = $("#shopify-section-" + P),
        this.latestCollectionNamspace = $(".collections-list-" + P),
        this._limit = this.latestCollectionNamspace.data("limit"),
        this._total = this.latestCollectionNamspace.data("count"),
        this._speed = this.latestCollectionNamspace.data("speed"),
        this._autoplay = this.latestCollectionNamspace.data("autoplay"),
        this.placement_fullwidth = this.latestCollectionNamspace.data("placement_fullwidth"),
        this._init()
    }
    return y.prototype = _.assignIn({}, y.prototype, {
        _init: function() {
            var S = this.sectionId
              , T = ".content-colection-list-" + this.sectionId;
            roar.initLazyLoading(T, !0),
            $(T).slick({
                slidesToShow: this._limit,
                slidesToScroll: 1,
                autoplay: this._autoplay,
                autoplaySpeed: this._speed,
                prevArrow: "<a class=\"prev-button arrow-btn\" href=\"#\"><svg><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#global__symbols-prev\"></use></svg></a>",
                nextArrow: "<a class=\"next-button arrow-btn\" href=\"#\"><svg><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#global__symbols-next\"></use></svg></a>",
                rtl: window.rtl,
                responsive: [{
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                }, {
                    breakpoint: 469,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }]
            })
        },
        onUnload: function() {
            this.$container.off(this.latestCollectionNamspace)
        }
    }),
    y
}(),
theme.ShippingCalculator = function() {
    function ShippingCalculator(y) {
        var S = this.$container = $(y)
          , T = S.attr("data-section-id");
        this.selectors = {
            shipping_btn: "#cart__shipping-btn-" + T,
            shipping_calculator: "#shipping__calculator-" + T,
            get_rates: "#shipping__calculator-btn-" + T,
            response: "#shipping__calculator-response-" + T,
            template: "<p id =\"shipping-rates-feedback-" + T + "\" class=\"shipping-rates-feedback\"></p>",
            address_country: "address_country-" + T,
            address_province: "address_province-" + T,
            address_zip: "address_zip-" + T,
            address_province_label: "address_province_label-" + T,
            address_province_container: "address_province_container-" + T
        },
        this.strings = {
            submitButton: "Calculate shipping",
            submitButtonDisabled: "Calculating...",
            customerIsLoggedIn: !1,
            moneyFormat: theme.settings.moneyFormat
        },
        this._init()
    }
    return ShippingCalculator.prototype = _.assignIn({}, ShippingCalculator.prototype, {
        _disableButtons: function() {
            var y = this.selectors
              , S = this.strings;
            $(y.get_rates).text(S.submitButtonDisabled).attr("disabled", "disabled").addClass("disabled")
        },
        _enableButtons: function() {
            var y = this.selectors
              , S = this.strings;
            $(y.get_rates).removeAttr("disabled").removeClass("disabled").text(S.submitButton)
        },
        _render: function(y) {
            var S = this.selectors
              , T = this.strings
              , P = $(S.template)
              , I = $(S.response);
            if (I.length) {
                if (!y.success)
                    P.addClass("error"),
                    P.append(y.errorFeedback);
                else if (P.addClass("success"),
                y.rates) {
                    P.append(y.rates);
                    var A = y.rates;
                    if (A[0]) {
                        var z = A[0];
                        P.append("Rates start at <span class=\"money\">" + z.price + "</span>.")
                    }
                } else
                    P.append("We do not ship to this destination.");
                P.appendTo(I),
                theme.CurrencyPicker.convert(S.response + " .money")
            }
        },
        _formatRate: function(y) {
            function S(L, M) {
                return "undefined" == typeof L ? M : L
            }
            function T(L, M, q, O) {
                if (M = S(M, 2),
                q = S(q, ","),
                O = S(O, "."),
                isNaN(L) || null == L)
                    return 0;
                L = (L / 100).toFixed(M);
                var F = L.split(".")
                  , E = F[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + q)
                  , B = F[1] ? O + F[1] : "";
                return E + B
            }
            var P = this.selectors
              , I = this.strings;
            if ("function" == typeof theme.Currency.formatMoney)
                return theme.Currency.formatMoney(y, I.moneyFormat);
            "string" == typeof y && (y = y.replace(".", ""));
            var A = ""
              , z = /\{\{\s*(\w+)\s*\}\}/
              , N = I.moneyFormat;
            switch (N.match(z)[1]) {
            case "amount":
                A = T(y, 2);
                break;
            case "amount_no_decimals":
                A = T(y, 0);
                break;
            case "amount_with_comma_separator":
                A = T(y, 2, ".", ",");
                break;
            case "amount_no_decimals_with_comma_separator":
                A = T(y, 0, ".", ",");
            }
            return N.replace(z, A)
        },
        _onCartShippingRatesUpdate: function(y, S) {
            var T = this
              , P = this.selectors
              , I = this.strings;
            T._enableButtons();
            var A = "";
            if (S.zip && (A += S.zip + ", "),
            S.province && (A += S.province + ", "),
            A += S.country,
            y.length)
                for (var z = 0; z < y.length; z++)
                    y[z].price = T._formatRate(y[z].price);
            T._render({
                rates: y,
                address: A,
                success: !0
            }),
            $(P.response).fadeIn()
        },
        _pollForCartShippingRatesForDestination: function(y) {
            var S = this
              , T = this.selectors
              , P = this.strings
              , I = function() {
                $.ajax("/cart/async_shipping_rates", {
                    dataType: "json",
                    success: function(A, z, N) {
                        200 === N.status ? S._onCartShippingRatesUpdate(A.shipping_rates, y) : setTimeout(I, 500)
                    },
                    error: function(A, z) {
                        S._onError(A, z, S)
                    }
                })
            };
            return I
        },
        _fullMessagesFromErrors: function(y) {
            var S = this.selectors
              , T = this.strings
              , P = [];
            return $.each(y, function(I, A) {
                $.each(A, function(z, N) {
                    P.push(I + " " + N)
                })
            }),
            P
        },
        _onError: function(XMLHttpRequest, textStatus, self) {
            var selectors = self.selectors
              , strings = self.strings;
            self._enableButtons();
            var feedback = ""
              , data = eval("(" + XMLHttpRequest.responseText + ")");
            feedback = data.message ? data.message + "(" + data.status + "): " + data.description : "Error : " + self._fullMessagesFromErrors(data).join("; ") + ".",
            "Error : country is not supported." == feedback && (feedback = "We do not ship to this destination."),
            self._render({
                rates: [],
                errorFeedback: feedback,
                success: !1
            }),
            $(selectors.response).show()
        },
        _getCartShippingRatesForDestination: function(y) {
            var S = this
              , T = this.selectors
              , P = this.strings;
            $.ajax({
                type: "POST",
                url: "/cart/prepare_shipping_rates",
                data: $.param({
                    shipping_address: y
                }),
                success: S._pollForCartShippingRatesForDestination(y),
                error: function(I, A) {
                    S._onError(I, A, S)
                }
            })
        },
        _init: function() {
            var y = this
              , S = this.selectors
              , T = this.strings;
            if ($(S.shipping_calculator).length) {
                new Shopify.CountryProvinceSelector(S.address_country,S.address_province,{
                    hideElement: S.address_province_container
                });
                var P = $("#" + S.address_country)
                  , I = $("#" + S.address_province_label).get(0);
                "undefined" != typeof Countries && (Countries.updateProvinceLabel(P.val(), I),
                P.change(function() {
                    Countries.updateProvinceLabel(P.val(), I)
                })),
                $(S.get_rates).click(function() {
                    y._disableButtons(),
                    $(S.response).empty().hide();
                    var A = {};
                    A.zip = $("#" + S.address_zip).val() || "",
                    A.country = $("#" + S.address_country).val() || "",
                    A.province = $("#" + S.address_province).val() || "",
                    y._getCartShippingRatesForDestination(A)
                }),
                T.customerIsLoggedIn && $(S.get_rates + ":eq(0)").trigger("click"),
                $(S.shipping_btn).click(function() {
                    $(S.shipping_calculator).slideToggle()
                })
            }
        },
        onUnload: function() {}
    }),
    ShippingCalculator
}(),
theme.GalleryTemplate = function() {
    function y(S) {
        var T = this.$container = $(S)
          , P = T.attr("data-section-id");
        this.selectors = {
            grid_gallery: "grid-gallery-" + P
        },
        this._init()
    }
    return y.prototype = _.assignIn({}, y.prototype, {
        _init: function() {
            new CBPGridGallery(document.getElementById(this.selectors.grid_gallery))
        },
        onUnload: function() {}
    }),
    y
}();
function onFullWidthOption(y) {
    _force_full_width(y),
    $(window).resize(function() {
        _force_full_width(y)
    })
}
function _force_full_width(y) {
    var S = $(".standard-body .full-width #shopify-section-" + y);
    if (!window.rtl) {
        if (0 < S.size()) {
            S.width($("body").width()),
            S.css("left", "0px");
            var T = S.offset();
            S.css("left", "-" + T.left + "px"),
            S.find(".container").css("padding-left", T.left),
            S.find(".container").css("padding-right", T.left)
        }
    } else if (0 < S.size()) {
        S.width($("body").width()),
        S.css("right", "0px");
        var T = S.offset();
        S.css("right", "-" + -1 * T.left + "px"),
        S.find(".container").css("padding-left", -1 * T.left),
        S.find(".container").css("padding-right", -1 * T.left)
    }
    var P = $(".standard-body .fixed #shopify-section-" + y);
    if (!window.rtl) {
      /// 
        if (0 < P.size()) {
            P.width($(".standard-body #main").width()),
            P.css("left", "0px");
            var T = P.offset()
              , I = $(".standard-body #main").offset()
              , A = T.left - I.left;
            P.css("left", "-" + A + "px"),
            P.find(".container").css("padding-left", A),
            P.find(".container").css("padding-right", A)
        }
    } else if (0 < P.size()) {
        P.width($(".standard-body").width()),
        P.css("right", "0px");
        var T = P.offset()
          , I = $(".standard-body").offset()
          , A = T.left - I.left;
        P.css("right", "-" + -1 * A + "px"),
        P.find(".container").css("padding-left", -1 * A),
        P.find(".container").css("padding-right", -1 * A)
    }
    var z = $(".standard-body .fixed2 #shopify-section-" + y);
    if (0 < z.size()) {
        z.width($("body").width()),
        z.css("left", "0px");
        var T = z.offset();
        z.css("left", "-" + T.left + "px"),
        z.find(".container").css("padding-left", T.left),
        z.find(".container").css("padding-right", T.left)
    }
    var N = $(".fixed-body #shopify-section-" + y);
    if (!window.rtl) {
        if (0 < N.size()) {
            N.width($(".fixed-body .main-fixed").width()),
            N.css("left", "0px");
            var T = N.offset()
              , I = $(".fixed-body .main-fixed").offset()
              , A = T.left - I.left;
            N.css("left", "-" + A + "px"),
            N.find(".container").css("padding-left", A),
            N.find(".container").css("padding-right", A)
        }
    } else if (0 < N.size()) {
        N.width($(".fixed-body .main-fixed").width()),
        N.css("right", "0px");
        var T = N.offset()
          , I = $(".fixed-body .main-fixed").offset()
          , A = T.left - I.left;
        N.css("right", "-" + -1 * A + "px"),
        N.find(".container").css("padding-left", -1 * A),
        N.find(".container").css("padding-right", -1 * A)
    }
}
	var links = document.links;
	for (let i = 0, linksLength = links.length ; i < linksLength ; i++) {
 	 if (links[i].hostname !== window.location.hostname) {
      links[i].target = '_blank';
  }
}
$(document).ready(function() {
    var y = new theme.Sections;
    y.register("product-template", theme.Product),
    y.register("mega-menu", theme.MegaMenuSection),
    y.register("topblock-section", theme.TopBlockSection),
    y.register("custom-widget", theme.CustomWidgetSection),
    y.register("banner", theme.BannerSection),
    y.register("delivery-bar", theme.DeliveryBarSection),
    y.register("slideshow", theme.SlideShowSection),
    y.register("slideshow-with-html", theme.SlideShowSection),
    y.register("slideshow-with-megamenu", theme.SlideShowSection),
    y.register("sidebar", theme.SidebarSection),
    y.register("product-tab", theme.ProductTabSection),
    y.register("advanced-grid", theme.AdvancedGridSection),
    y.register("preface-footer", theme.PrefaceFooterSection),
    y.register("footer-top", theme.FooterTopSection),
    y.register("footer-bottom", theme.FooterBottomSection),
    y.register("footer-copyright", theme.FooterCopyRightSection),
    y.register("footer-column-1", theme.FooterColumn),
    y.register("footer-column-2", theme.FooterColumn),
    y.register("footer-column-3", theme.FooterColumn),
    y.register("footer-column-4", theme.FooterColumn),
    y.register("testimonial", theme.TestimonialSection),
    y.register("instafeed", theme.InstafeedSection),
    y.register("latest-blog", theme.LatestBlogSection),
    y.register("mobile-nav-section", theme.mobileNavSection),
    y.register("product-variant-mobile", theme.ProductVariantMobile),
    y.register("cart-variant-mobile", theme.CartVariantMobile),
    y.register("brands", theme.Brands),
    y.register("rvsvideo", theme.rvsVideo),
    y.register("rvshighlight", theme.rvsHighlight),
    y.register("rvsproducts", theme.rvsProducts),
    y.register("your-collections", theme.YourCollections),
    y.register("collections-list", theme.CollectionsList),
    y.register("shipping-calculator", theme.ShippingCalculator),
    y.register("collection-template", theme.Filters),
    y.register("search-template", theme.Filters),
    y.register("gallery-template", theme.GalleryTemplate)
});
