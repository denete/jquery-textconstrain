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
            //console.log('at init');
            return this.each(function() {
                $this = $(this);
                data = $this.data('cmtextconstrain');
                if(!data){

                    opts = $.extend({}, $.fn.cmtextconstrain.defaults, options);
                    $this.data('cmtextconstrain', opts);


                    $this.wrap('<div class="cmConstrainContainer" style="overflow:hidden;"></div>');

                    // clone and append
                    var cloneID = $this.attr('id') + '_clone';
                    $this.clone().prependTo($this.parents('.cmConstrainContainer')).attr({id: cloneID});
                    //$this.hide();
                    var $elemClone = $('#' + cloneID);
                    
                   // _resizeParent($elemClone);
                     $this.parents('.cmConstrainContainer').css({
                        marginTop: $this.css('marginTop'),
                        marginBottom: $this.css('marginBottom'),
                        marginLeft: $this.css('marginLeft'),
                        marginRight: $this.css('marginRight'),
                        paddingTop: $this.css('paddingTop'),
                        paddingBottom: $this.css('paddingBottom'),
                        paddingLeft: $this.css('paddingLeft'),
                        paddingRight: $this.css('paddingRight')
                    });
                    $elemClone.css({padding:0,margin:0});
                    $this.css({padding:0,margin:0});
                }
               // _constrain($this);
                _constrain($elemClone);
            });
        },
        destroy: function(){
            return this.each(function(){
                $this = $(this);
                data = $this.data('cmtextconstrain');
                if(data){
                    $('#' + $this.attr('id')).remove();
                    $wrapParent = $this.parents('.cmConstrainContainer');
                    $this.css({
                        marginTop: $wrapParent.css('marginTop'),
                        marginBottom: $wrapParent.css('marginBottom'),
                        marginLeft: $wrapParent.css('marginLeft'),
                        marginRight: $wrapParent.css('marginRight'),
                        paddingTop: $wrapParent.css('paddingTop'),
                        paddingBottom: $wrapParent.css('paddingBottom'),
                        paddingLeft: $wrapParent.css('paddingLeft'),
                        paddingRight: $wrapParent.css('paddingRight')
                    }).unwrap().show().removeData('cmtextconstrain');
                }
            })
        }
    };
    
    // private methods
    function _resizeParent($elem){
        //console.log('$this.outerWidth(): ' + $elem.outerWidth());
        console.log('resizeParent');
        $elem.parents('.cmConstrainContainer').css({width: $elem.outerWidth(),height: $elem.outerHeight()});
    }
    
    function _constrain($elem){
        if(opts.restrict["width"] > 0){
            // nothing
        } else if(opts.restrict["height"] > 0){
            // nothing
        } else if(opts.restrict["words"] > 0){
            //var wordArr = $this.text().split(/\b\W+\b/);
            var wordArr = $elem.text().split(' ');
            var countIs = $elem.text().match(/\S+/g).length;
        } else if(opts.restrict["chars"] > 0){
            var charPointer = opts.restrict["chars"];
            var tempString = $elem.text().substr(0,opts.restrict["chars"]);
            var nextChar = '';
            while(nextChar != ' '){
                tempString += nextChar;
                nextChar = $elem.text().charAt(charPointer++);
            }
            //console.log('char restrict: (' + opts.restrict["chars"] + ') ' + tempString + opts.trailingString);
            $elem.text(tempString + opts.trailingString);
            $elem.append('<a href="javascript:void(0);" class="cmExpose">Expose</a>');
            $this.append('<a href="javascript:void(0);" class="cmConstrain">Constrain</a>');
            $elem.find('.cmExpose').click(function(){
                _expose($this,$elem);
            });
            $this.find('.cmConstrain').click(function(){
                _expose($elem,$this);
            });
            _resizeParent($elem);
        }
    }
    
    function _expose($elemIn,$elemOut){
        //console.log('$elemOut id: ' + $elemOut.attr('id') + ', $elemIn id: ' + $elemIn.attr('id'));
        var newWidth = $elemIn.width();
        var newHeight = $elemIn.height();
        var oldWidth = $elemOut.width();
        var oldHeight = $elemOut.height();
        console.log('oldHeight: ' + oldHeight + ', oldWidth: ' + oldWidth);
        console.log('newHeight: ' + newHeight + ', newWidth: ' + newWidth);
        $elemOut.hide();
        //$elemIn.css({width:oldWidth,height:oldHeight}).show();
        $elemIn.show();
        $elemIn.parents('.cmConstrainContainer').css({width:newWidth,height:newHeight});
        /*$elemIn.parents('.cmConstrainContainer').animate({
            width: newWidth,
            height: newHeight
        }, opts.animSpeed, function() {
            //
        });*/
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
        control: 'text', // '' equals image
        onExpose: function(){},
        onConstrain: function(){},
        fade: true,
        restrict: {width: 0, height: 0, words: 0, chars: 24},
        trailingString: '...'
    };

})(cmg.query);