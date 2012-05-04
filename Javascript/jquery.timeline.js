/**
 * Created with JetBrains WebStorm.
 * Date: 5/3/12
 *
 * Copyright © 2012 Nicolas Embleton
 *
 * v1.1
 *
 * Change log:
 * 1.1: Better detector of currently active bullet ( Todo 4 ). Might cause problems in some cases.
 *      You can disable it by initializing with auto_detect_active_bullet:false
 * 1.0: Initial release. Stable. Tested with most browsers on Mac OS X
 *
 * Todo:
 * 1. More flexible line changing
 * 2. Customizable separators
 * 3. More shapes for bullets and left/right ends
 * 4. Detector for currently active bullet ( shouldn't be too hard )
 * 5. Better hash option ( auto-detection or better customization? )
 * 6. Vertical version ( should be neat but lot of work for this one )
 * 7. Better "responsivitiy" ( working but up to some extents )
 */

(function( $ ){

    $.fn.timeline = function( options ) {

        // Create some defaults, extending them with any options that were provided
        var settings = $.extend( {
            left_action: "",       // url for + sign
            left_symbol: "+",      // Symbol for + sign
            right_action: "",      // url for - sign
            right_symbol: "-",     // Symbol for - sign
            use_alternative_position: false,
            link_is_hash: true,     // If set to true, the links will be treated as a hash ( thus not reloading )
            normal_color: "#58595b",
            hover_color: "#ed145b",
            auto_detect_active_bullet: true // If set to false, it will disable the pattern matching, if set to true, it will try to guess which page is currently enabled
        }, options);

        return this.each(function() {

            var normal_color = settings.normal_color;
            var hover_color = settings.hover_color;

            /** ensure symbols are 1 char long */
            settings.left_symbol = settings.left_symbol.substr(0,1);
            settings.right_symbol = settings.right_symbol.substr(0,1);

            var timeline = settings.times;
            var item_counter = 0; // Will count items that are not separator ( because they don't use actual space )
            $(timeline).each(function(i,el) {
                if(el.type && el.type == "separator") {
                    $("#timeline ul").append("<li class='separator'>&nbsp;<span>"+el.text +"</span></li>");
                } else {
                    var add_class = [];
                    if((!settings.auto_detect_active_bullet && el.selected) ||
                       (settings.auto_detect_active_bullet && (
                       el.link && el.link.match(/^#[0-9a-zA-Z\-_:]+$/) && window.location.hash == el.link || // Checking if the link is a hash then checking if the current hash is somehow matching
                       el.link && !el.link.match(/^#[0-9a-zA-Z\-_:]$/) && window.location.href == el.link ))) {
                        add_class.push("selected");
                    }
                    if(i % 2 && settings.use_alternative_position) add_class.push("odd_row");
                    var classes_list = "";
                    $(add_class).each(function(i2, el2) {
                        classes_list += " " + el2;
                    });

                    $("#timeline ul").append("<li class='empty'>&nbsp;</li>");
                    $("#timeline ul").append("<li><a "+(classes_list!=""?"class='"+classes_list+"'":"") +" href='"+el.link+"'>&nbsp;</a><span "+(classes_list!=""?"class='"+classes_list+"'":"") +" >" +el.text +"</span></li>");
                }
            });
            $("#timeline ul").prepend("<li id='plus'><a href='"+settings.left_action+"'>"+settings.left_symbol+"</a></li>");
            $("#timeline ul").append("<li class='empty'>&nbsp;</li>");
            $("#timeline ul").append("<li id='minus'><a href='"+settings.right_action+"'>"+settings.right_symbol+"</a></li>");

            var width = $("#timeline").width();                                 // Container width
            var plus_width = $("#plus").width();                                // Plus sign width
            var minus_width = $("#minus").width();                              // Minus sign width
            // Here it becomes a little bit tricky. We find an anchor ( the bubble is an anchor )
            // We look for the 2nd one ( first one is actually the left and right anchors )
            // And we get its parent width() to get the actual size of a bubble
            var bubble_width = $($("#timeline ul li").find("a")[1]).parent().width();       // Bubble

            var edge_count = timeline.length+1;
/*
            console.log(width);
            console.log(plus_width);
            console.log(minus_width);
            console.log(bubble_width);
            console.log(edge_count);
 */
            var efficient_width = width - ( plus_width + minus_width + bubble_width*timeline.length ); // 30 for Padding
//            console.log(efficient_width);
            var best_border_width = ( efficient_width - 40 )/ edge_count;
//            console.log(best_border_width);
            var best_border_width_ratio = (best_border_width / width)*100;
//            console.log(best_border_width_ratio);

            $(".empty").css("width", best_border_width_ratio +"%");
//            $(".empty").attr("style", "width: " +best_border_width_ratio +"% !important;");

            $("#timeline ul li a, #timeline ul li span").bind({
                mouseover: function(e) {
                    $($(e.target).parent().find("a")).css("background-color", hover_color);
                    $($(e.target).parent().find("span")).css("color",hover_color);
                },
                mouseout: function(e) {
                    $($(e.target).parent().find("a")).css("background-color", normal_color);
                    $($(e.target).parent().find("span")).css("color",normal_color);
                },
                click: function(e) {
//                    console.log($($(e.target).parent().find("a")).attr("href"));
                    if(settings.link_is_hash) {
                        window.location.hash = $($(e.target).parent().find("a")).attr("href");
                    } else {
                        window.location.href = $($(e.target).parent().find("a")).attr("href");
                    }
                }
            });

//            console.log($("#color_hover_helper").css("color"));
        });

    };
})( jQuery );