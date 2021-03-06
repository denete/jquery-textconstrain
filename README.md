Text-constrain plugin for jQuery
===========================

A jQuery plugin to allow text elements on a page to be constrained by size (currently by words or by characters).

***

## Usage:

>        $('.text-element').textconstrain({
>            event: 'click', // for future extensibility to allow other events
>            onExpose: function(){}, // a function to be run once the element is exposed
>            onConstrain: function(){}, // a function to be run once the element is constrained
>            restrict: {type: 'words', limit: 6}, // type can be 'words' or 'chars'
>            showControl: {string: '[ + ]', title: 'Show More', addclass: 'show-hide'}, // element shown to expose
>            hideControl: {string: '[ - ]', title: 'Show Less', addclass: 'show-hide'}, // element shown to constrain
>            trailingString: '...' // string to show at end of truncated text
>        });

## Methods:

>        $('.text-element').textconstrain('destroy'); // destroy the instance of textconstrain
