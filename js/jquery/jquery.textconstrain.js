/**
 * Plugin: jQuery Text-constrain, jquery.textconstrain.js
 * Copyright: Copyright (c) 2016 David Enete
 * Version: 1.0.1
 * Author: David A. Enete
 * Date: 6 May 2016
 * Description: jQuery Text-constrain plugin - A jQuery plugin to allow text elements on a page to be constrained by size.
 */

(function($) {

    // public methods
    var methods = {
        init: function(options) {
            return this.each(function() {
                var $this = $(this);
                data = $this.data('textconstrain');
                if(!data){
                    opts = $.extend({}, $.fn.textconstrain.defaults, options);
                    $this.data('textconstrain', opts);
                    if(!($this.attr('id'))){
                        var dateObj = new Date();
                        var dateString = String(dateObj.getTime());
                        $this.attr({id: dateString});
                    }
                    cloneID = $this.attr('id') + '_clone';
                    $this.clone().insertBefore($this).attr({id: cloneID});
                    $this.hide();
                    var $elemClone = $('#' + cloneID);

                    // create constrained string
                    if(opts.restrict['type'] == 'words'){
                        var wordArr = $elemClone.text().split(/\s+/);
                        if(wordArr.length <= opts.restrict['limit']){
                            $this.textconstrain('destroy');
                            return;
                        } else {
                            var shortString = wordArr.slice(0,opts.restrict['limit']).join(' ');
                        }
                    } else if(opts.restrict['type'] == 'chars'){
                        if($this.text().length <= opts.restrict['limit']){
                            $this.textconstrain('destroy');
                            return;
                        } else {
                            var charPointer = opts.restrict['limit'];
                            var shortString = $this.text().substr(0,opts.restrict['limit']);
                            var nextChar = '';
                            while(nextChar != ' '){
                                shortString += nextChar;
                                nextChar = $elemClone.text().charAt(charPointer++);
                            }
                        }
                    }
                    shortString += opts.trailingString;

                    $elemClone.text(shortString);
                    $elemClone.append('&nbsp;<a href="javascript:void(0);" class="expose ' + opts.showControl['addclass'] + '" title="' + opts.showControl['title'] + '">' + opts.showControl['string'] + '</a>');
                    $this.append('&nbsp;<a href="javascript:void(0);" class="constrain ' + opts.hideControl['addclass'] + '" title="' + opts.hideControl['title'] + '">' + opts.hideControl['string'] + '</a>');

                    // need to implement delay if event is hover / mouseover
                    $elemClone.find('.expose').bind(opts.event, function(){
                        _expose($this,$elemClone);
                        opts.onExpose.call(this);
                    });
                    $this.find('.constrain').bind(opts.event, function(){
                        _expose($elemClone,$this);
                        opts.onConstrain.call(this);
                    });
                }
            });
        },
        destroy: function(){
            return this.each(function(){
                var $this = $(this);
                data = $this.data('textconstrain');
                if(data){
                    $('#' + $this.attr('id') + '_clone').remove();
                    $this.show().removeData('textconstrain');
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
    $.fn.textconstrain = function(method){
        if(methods[method]){
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || ! method){
            return methods.init.apply(this, arguments);
        } else {
            console.log('Method ' +  method + ' does not exist on jQuery.textconstrain');
        }
    };

    // setting defaults for the plugin
    $.fn.textconstrain.defaults = {
        event: 'click',
        onExpose: function(){},
        onConstrain: function(){},
        restrict: {type: 'chars', limit: 121}, // ['chars', 'words']
        showControl: {string: '[&nbsp;+&nbsp;]', title: 'Show More', addclass: 'show-hide'},
        hideControl: {string: '[&nbsp;-&nbsp;]', title: 'Show Less', addclass: 'show-hide'},
        trailingString: '...'
    };

})(jQuery);