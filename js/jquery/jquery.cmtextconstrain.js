/**
 * Plugin: jQuery Text-constrain, jquery.cmtextconstrain.js
 * Copyright: Copyright (c) 2011 CMGdigital
 * Version: xxx
 * Author: David A. Enete
 * Date: xxx
 * Description: jQuery Text-constrain plugin - A jQuery plugin to allow text elements on a page to be constrained by size.
 */

(function($) {
    
    // public methods
    var methods = {
        init: function(options) {
            return this.each(function() {
                var $this = $(this);
                data = $this.data('cmtextconstrain');
                if(!data){
                    opts = $.extend({}, $.fn.cmtextconstrain.defaults, options);
                    $this.data('cmtextconstrain', opts);
                    // clone and append
                    // need sanity check for id, add id if none
                    cloneID = $this.attr('id') + '_clone';
                    //$this.clone().prependTo($this.parents('.cmConstrainContainer')).attr({id: cloneID});
                    $this.clone().insertBefore($this).attr({id: cloneID});
                    $this.hide();
                    var $elemClone = $('#' + cloneID);
                    //_constrain($elemClone);
                    if(opts.restrict["width"] > 0){
                        // nothing
                    } else if(opts.restrict["height"] > 0){
                        // nothing
                    } else if(opts.restrict["words"] > 0){
                        //var wordArr = $this.text().split(/\b\W+\b/);
                        var wordArr = $elemClone.text().split(' ');
                        var countIs = $elemClone.text().match(/\S+/g).length;
                    } else if(opts.restrict["chars"] > 0){
                        var charPointer = opts.restrict["chars"];
                        var tempString = $elemClone.text().substr(0,opts.restrict['chars']);
                        var nextChar = '';
                        while(nextChar != ' '){
                            tempString += nextChar;
                            nextChar = $elemClone.text().charAt(charPointer++);
                        }
                        //console.log('char restrict: (' + opts.restrict["chars"] + ') ' + tempString + opts.trailingString);
                        $elemClone.text(tempString + opts.trailingString);
                        $elemClone.append('&nbsp;<a href="javascript:void(0);" class="cmExpose ' + opts.showControl['class'] + '" title="' + opts.showControl['title'] + '">' + opts.showControl['string'] + '</a>');
                        $this.append('&nbsp;<a href="javascript:void(0);" class="cmConstrain ' + opts.hideControl['class'] + '" title="' + opts.hideControl['title'] + '">' + opts.hideControl['string'] + '</a>');
                        $this.data({cloneW: $elemClone.width(),cloneH: $elemClone.height(),fullW: $this.width(),fullH: $this.height(), current: $elemClone.attr('id')});
                        $elemClone.find('.cmExpose').click(function(){
                            console.log('expose this id: ' + $this.attr('id'));
                            $this.data({current: $this.attr('id')});
                            _expose($this,$elemClone);
                        });
                        $this.find('.cmConstrain').click(function(){
                            console.log('constrain this id: ' + $this.attr('id'));
                            $this.data({current: $elemClone.attr('id')});
                            _expose($elemClone,$this);
                        });
                    }
                }
            });
        },
        destroy: function(){
            return this.each(function(){
                var $this = $(this);
                data = $this.data('cmtextconstrain');
                if(data){
                    $('#' + $this.attr('id') + '_clone').remove();
                    $this.show().removeData('cmtextconstrain');
                }
            })
        }
    };
    
    // private methods
    function _constrain($elem){
        /*if(opts.restrict["width"] > 0){
            // nothing
        } else if(opts.restrict["height"] > 0){
            // nothing
        } else if(opts.restrict["words"] > 0){
            //var wordArr = $this.text().split(/\b\W+\b/);
            var wordArr = $elem.text().split(' ');
            var countIs = $elem.text().match(/\S+/g).length;
        } else if(opts.restrict["chars"] > 0){
            var charPointer = opts.restrict["chars"];
            var tempString = $elem.text().substr(0,opts.restrict['chars']);
            var nextChar = '';
            while(nextChar != ' '){
                tempString += nextChar;
                nextChar = $elem.text().charAt(charPointer++);
            }
            //console.log('char restrict: (' + opts.restrict["chars"] + ') ' + tempString + opts.trailingString);
            $elem.text(tempString + opts.trailingString);
            $elem.append('&nbsp;<a href="javascript:void(0);" class="cmExpose ' + opts.showControl['class'] + '" title="' + opts.showControl['title'] + '">' + opts.showControl['string'] + '</a>');
            $this.append('&nbsp;<a href="javascript:void(0);" class="cmConstrain ' + opts.hideControl['class'] + '" title="' + opts.hideControl['title'] + '">' + opts.hideControl['string'] + '</a>');
            $this.data({cloneW: $elem.width(),cloneH: $elem.height(),fullW: $this.width(),fullH: $this.height(), current: $elem.attr('id')});
            $elem.find('.cmExpose').click(function(){
                console.log('expose this id: ' + $this.attr('id'));
                _expose($this,$elem);
            });
            $this.find('.cmConstrain').click(function(){
                console.log('constrain this id: ' + $this.attr('id'));
                _expose($elem,$this);
            });
        }*/
    }
    
    function _expose($elemIn,$elemOut){
        $elemOut.hide();
        $elemIn.show();
    }

    // passing public method calls
    $.fn.cmtextconstrain = function(method) {
        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            console.log( 'Method ' +  method + ' does not exist on jQuery.cmtextconstrain' );
        }
    };

    // setting defaults for the plugin
    $.fn.cmtextconstrain.defaults = {
        animSpeed: 250,
        delay: 100,
        event: 'click', // 'hover'
        onExpose: function(){},
        onConstrain: function(){},
        fade: false,
        restrict: {width: 0, height: 0, words: 0, chars: 24},
        showControl: {string: '[&nbsp;+&nbsp;]', title: 'Show More', class: 'cmShowHide'},
        hideControl: {string: '[&nbsp;-&nbsp;]', title: 'Show Less', class: 'cmShowHide'},
        trailingString: '...'
    };

})(cmg.query);