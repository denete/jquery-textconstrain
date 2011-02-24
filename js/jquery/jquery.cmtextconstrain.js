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
                    $this.clone().insertBefore($this).attr({id: cloneID});
                    $this.hide();
                    var $elemClone = $('#' + cloneID);
                    
                    // create constrained string
                    if(opts.restrict['type'] == 'words'){
                        var wordArr = $elemClone.text().split(/\s+/);
                        var shortString = wordArr.length > opts.restrict['val'] ? wordArr.slice(0,opts.restrict['val']).join(' ') : $elemClone.text();
                        
                        
                    } else if(opts.restrict['type'] == 'chars'){
                        var charPointer = opts.restrict['val'];
                        var shortString = $elemClone.text().substr(0,opts.restrict['val']);
                        var nextChar = '';
                        while(nextChar != ' '){
                            shortString += nextChar;
                            nextChar = $elemClone.text().charAt(charPointer++);
                        }
                    }
                    
                    if(shortString == $this.text()){
                        $this.cmtextconstrain('destroy');
                        return;
                    } else {
                        shortString += opts.trailingString;
                    }
                    
                    $elemClone.text(shortString);
                    $elemClone.append('&nbsp;<a href="javascript:void(0);" class="cmExpose ' + opts.showControl['addclass'] + '" title="' + opts.showControl['title'] + '">' + opts.showControl['string'] + '</a>');
                    $this.append('&nbsp;<a href="javascript:void(0);" class="cmConstrain ' + opts.hideControl['addclass'] + '" title="' + opts.hideControl['title'] + '">' + opts.hideControl['string'] + '</a>');
                    //$this.data({cloneW: $elemClone.width(),cloneH: $elemClone.height(),fullW: $this.width(),fullH: $this.height(), current: $elemClone.attr('id')});
                    
                    // need to implement delay if event is hover / mouseover
                    $elemClone.find('.cmExpose').bind(opts.event, function(){
                        _expose($this,$elemClone);
                    });
                    $this.find('.cmConstrain').bind(opts.event, function(){
                        _expose($elemClone,$this);
                    });
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
    function _expose($elemIn,$elemOut){
        $elemOut.hide();
        $elemIn.show();
    }

    // passing public method calls
    $.fn.cmtextconstrain = function(method){
        if(methods[method]){
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || ! method){
            return methods.init.apply(this, arguments);
        } else {
            console.log('Method ' +  method + ' does not exist on jQuery.cmtextconstrain');
        }
    };

    // setting defaults for the plugin
    $.fn.cmtextconstrain.defaults = {
        event: 'click',
        onExpose: function(){},
        onConstrain: function(){},
        restrict: {type: 'chars', val: 121}, // ['chars', 'words']
        showControl: {string: '[&nbsp;+&nbsp;]', title: 'Show More', addclass: 'cmShowHide'},
        hideControl: {string: '[&nbsp;-&nbsp;]', title: 'Show Less', addclass: 'cmShowHide'},
        trailingString: '...'
    };

})(cmg.query);