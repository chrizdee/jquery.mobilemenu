/**
 * jQuery mobileMenu v0.1 based on meanmenu form Chris Wharton (themes@meanthemes.com)
 * Copyright (C) 2013 Christian Duell (@novowebdesign)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * THIS SOFTWARE AND DOCUMENTATION IS PROVIDED "AS IS," AND COPYRIGHT
 * HOLDERS MAKE NO REPRESENTATIONS OR WARRANTIES, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO, WARRANTIES OF MERCHANTABILITY OR
 * FITNESS FOR ANY PARTICULAR PURPOSE OR THAT THE USE OF THE SOFTWARE
 * OR DOCUMENTATION WILL NOT INFRINGE ANY THIRD PARTY PATENTS,
 * COPYRIGHTS, TRADEMARKS OR OTHER RIGHTS.COPYRIGHT HOLDERS WILL NOT
 * BE LIABLE FOR ANY DIRECT, INDIRECT, SPECIAL OR CONSEQUENTIAL
 * DAMAGES ARISING OUT OF ANY USE OF THE SOFTWARE OR DOCUMENTATION.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://gnu.org/licenses/>.
 *
 *
 */
(function ($) {
    $.fn.mobilemenu = function (options) {
        var defaults = {
            menuTarget: jQuery(this), // Target the current HTML markup you wish to replace
            screenWidth: 480,
            showButtonLabel: "Show navigation",
            hideButtonLabel: "Hide navigation",
            removeAttrs: false,
            scrollBodyTop: false
        };
        var options = $.extend(defaults, options);
        
        // Get browser width
        currentWidth = window.innerWidth || document.documentElement.clientWidth;

        return this.each(function () {
            var desktopMenu = options.menuTarget;
            var screenWidth = options.screenWidth;
            var showButtonLabel = options.showButtonLabel;
            var hideButtonLabel = options.hideButtonLabel;
            var removeAttrs = options.removeAttrs;
            var scrollBodyTop = options.scrollBodyTop;

            // get current windows width
            var currentWidth = window.innerWidth || document.documentElement.clientWidth;
                        
            // detect known mobile/tablet usage
            if ( (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/Android/i)) || (navigator.userAgent.match(/Blackberry/i)) || (navigator.userAgent.match(/Windows Phone/i)) ) {
                var isMobile = true;
            }
            
            if ( (navigator.userAgent.match(/MSIE 8/i)) || (navigator.userAgent.match(/MSIE 7/i)) ) {
                // add scrollbar for IE7 & 8 to stop breaking resize function on small content sites
                jQuery('html').css("overflow-y" , "scroll");
            }
            
            menuOn = false;
            menuExist = false;
            
            // re-instate original nav (and call this on window.width functions)
            function showDesktopMenu() 
            {
                jQuery('.mobilemenu').hide();
                jQuery(desktopMenu).show();
                menuOn = false;
            }
            
            // generate mobile nav
            function generateMobileMenu() 
            {
                
                menuExist = true;
                jQuery('body').prepend('<div class="mobilemenu"><div class="mobilemenu-bar"><a href="#nav" class="mobilemenu-reveal close"></a></div><nav class="mobilemenu-nav"></nav></div>');
                
                // push desktopMenu navigation into .mobilemenu-nav
                var menuContents = jQuery(desktopMenu).html();
                jQuery('.mobilemenu-nav').html(menuContents);
                
                // remove all items with class "hide_on_mobile"
                jQuery('nav.mobilemenu-nav .hide_on_mobile').remove();

                // remove all classes from everthing inside mobile nav
                if(removeAttrs) {
                    jQuery('nav.mobilemenu-nav .invisible').remove();
                    jQuery('nav.mobilemenu-nav *').each(function() {
                        jQuery(this).removeAttr("class");
                        jQuery(this).removeAttr("id");
                    });
                }

                // set last class
                jQuery('nav.mobilemenu-nav li').last().addClass('last');
                
                // hide mobile navigation on init
                jQuery('.mobilemenu').hide();
                jQuery('.mobilemenu-nav ul:first').hide();

                $navreveal = jQuery(".mobilemenu-reveal");
                jQuery($navreveal).text(showButtonLabel);
                
                jQuery($navreveal).click(function(e) {
                    e.preventDefault();
                    if(menuOn == false) {
                        if(scrollBodyTop == true) jQuery('html, body').animate({ scrollTop: 0 }, 600);
                        jQuery('.mobilemenu-nav ul:first').slideDown();
                        jQuery($navreveal).text(hideButtonLabel);
                        menuOn = true;
                    } else {
                        jQuery('.mobilemenu-nav ul:first').slideUp();
                        jQuery($navreveal).text(showButtonLabel);
                        menuOn = false;
                    }    
                    $navreveal.toggleClass("close");
                });
            }

            // navigation reveal 
            function showMobileMenu() 
            {
                if (currentWidth <= screenWidth) 
                {
                    jQuery(desktopMenu).hide();
                    jQuery(".mobilemenu").show();
                    
                } else {
                    showDesktopMenu();
                }   
            } 
            
            function checkWindowSize()
            {
                currentWidth = window.innerWidth || document.documentElement.clientWidth;
                if (currentWidth > screenWidth) {
                    showDesktopMenu();
                } else {
                    showDesktopMenu();
                } 
                if (currentWidth <= screenWidth) {
                    showMobileMenu();
                } else {
                    showDesktopMenu();
                }
            }

            if (!isMobile) {
                // reset menu on resize above screenWidth
                jQuery(window).resize(function () {
                    checkWindowSize();
                });
            }


            // adjust menu positioning on centered navigation     
            window.onorientationchange = function() {
                checkWindowSize();
            }
           
           // run main function on load
           generateMobileMenu();

           if (currentWidth <= screenWidth) showMobileMenu();

        });
    };
})(jQuery);