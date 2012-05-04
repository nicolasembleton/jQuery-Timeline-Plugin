jQuery-Timeline-Plugin
======================

jQuery Timeline Plugin is a tiny jQuery plugin to output a nice looking timeline that can be used for navigation, archive, or playing around with Hash Changes ( it's hash change compatible ), or anything you can think of.

## Dependencies:

jQuery. 1.7.2 is better. I think from 1.5 ( maybe even below ) it's supposed to work. 

## Description

jQuery Timeline Plugin allows to create a nice timeline using jQuery. This timeline is easily controlled with nice effects. You can overwrite the effects, change the colors, play with the forms and eventually change the bullets to something more appropriate for you.

It's designed to be responsive ( it has some current limitations if the #timeline_container width is set below 500px ), flexible, and extensible.
There are a bunch of nice to use options, some never to be used but fancy, some very handy. Up to you to have a look at the option set.

A few CSS 3 transitions are enabled for color fading.

## Screenshots 

![A small screenshot of the alternate way](https://github.com/nicolasembleton/jQuery-Timeline-Plugin/raw/master/Screenshots/jquery.timeline.js.alternate.png)

![A small screenshot of the plain way](https://github.com/nicolasembleton/jQuery-Timeline-Plugin/raw/master/Screenshots/jquery.timeline.js.plain.png)

## Setup

To setup, you need the following markup:

```html
        <!-- minimum markup -->
        <div id="timeline_container">
            <div id="timeline">
                <ul>
                </ul>
            </div>
        </div>
```

And you then activate the plugin using the following options ( full set, most of them are not necessary, at the very exception of the "items" )

```js
        $(document).ready(function() {
            $("#timeline_container").timeline({
                left_symbol:"+",
                left_action:"",                                     // Needs to be a URL or a Hash
                right_symbol: "-",
                right_action: "",                                   // Needs to be a URL or a Hash
                use_alternative_position: false,                    // Use odds and even positioning for labels ( bottom and top )
                link_is_hash: true,                                 // If the link is a hash, it will update the location.hash, otherwise open a new window
                normal_color: "#58595b",                            // Overwrites the normal color
                hover_color: "#ed145b",                             // Overwrites the hovered color
                auto_detect_active_bullet: true,		            // If set to true, will parse the current link or hash ( depending on the type ) to match
                times: [
                    { text: "2011", type: "separator" },            // Will generate a separator
                    { link: "#open-me", text: "05"},
                    { link: "", text: "06", selected: true  },
                    { link: "", text: "08" },
                    { link: "", text: "12" },
                    { text: "2012", type: "separator" },
                    { link: "", text: "01" },
                    { link: "", text: "03" },
                    { link: "", text: "05" },
                    { link: "", text: "06" },
                    { link: "", text: "07" },
                    { link: "", text: "08" },
                    { link: "", text: "09" },
                    { link: "", text: "10" },
                    { link: "", text: "12" },
                    { text: "2013", type: "separator" }
                ]
            });
        });
```

Remember to include the scripts in the header:

```html
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
         <script src="jquery.timeline.js"></script>
         <link href="jquery.timeline.css" rel="stylesheet" type="text/css" />
```

## License

Copyright (c) 2012 Nicolas Embleton
Licensed under the [MIT license](https://github.com/nicolasembleton/jQuery-Timeline-Plugin/blob/master/MIT-license.txt)