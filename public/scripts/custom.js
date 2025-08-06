/**********************

Custom.js
=============

Author:  Gino Aliaj
Template: Movify - Movies, Series & Cinema HTML Template
Version: 1.0

Author URI: gnodesign.com
***************************/


(function ($) {
    "use strict";

    
    
    /*----------------------------------------------------
      LOADING PAGE
    ----------------------------------------------------*/
    $(window).on('load', function () {
        var loading = $('.loading');
        loading.delay(1000).fadeOut(1000);        
    }); // end of window load function




    $(document).ready(function () {
                
        /*----------------------------------------------------
          STICKY HEADER
        ----------------------------------------------------*/    
        if ( $('header').hasClass('sticky') ) {

            $("header.sticky").clone(true).addClass('cloned').insertAfter("header.sticky").removeClass('header-transparent text-white');

            var stickyHeader = document.querySelector(".sticky.cloned");
            var stickyHeaderHeight = $("header.sticky").height();
            
            var headroom = new Headroom(stickyHeader, {
                "offset": stickyHeaderHeight + 100,
                "tolerance": 0
            });

            // disabling on devices
            $(window).bind("load resize", function (e) {

                var winWidth = $(window).width();

                if (winWidth > 1200) {
                    headroom.init();
                } else if (winWidth < 1200) {
                    headroom.destroy();
                }
            });

        }
        
        
        
        
        /*----------------------------------------------------
          MAIN MENU FOR RESPONSIVE MODE
         ----------------------------------------------------*/
        
        // Simple custom mobile menu implementation
        function initMobileMenu() {
            console.log('Window width:', $(window).width());
            
            // Remove width restriction for testing
            // if ($(window).width() <= 991) {
                var main_menu = $('#main-mobile-nav');
                var menu_toggler = $("#mobile-nav-toggler");
                
                console.log('Initializing custom mobile menu...');
                console.log('Navigation element found:', main_menu.length > 0);
                console.log('Menu toggler found:', menu_toggler.length > 0);
                
                if (main_menu.length > 0 && menu_toggler.length > 0) {
                    // Remove the hidden class and add custom mobile menu styles
                    main_menu.removeClass('mobile-nav-hidden');
                    main_menu.addClass('mobile-menu-custom');
                    
                    // Set initial state - menu closed
                    main_menu.addClass('menu-closed');
                    
                    // Handle submenu toggles
                    main_menu.find('li:has(ul)').each(function() {
                        var $li = $(this);
                        var $link = $li.children('a').first();
                        
                        $link.on('click', function(e) {
                            e.preventDefault();
                            console.log('Submenu toggle clicked');
                            
                            // Toggle expanded class
                            $li.toggleClass('expanded');
                        });
                    });
                    
                    // Bind click event to toggler
                    menu_toggler.off('click.mobilemenu').on('click.mobilemenu', function(e) {
                        e.preventDefault();
                        console.log('Hamburger clicked!');
                        
                        if (main_menu.hasClass('menu-closed')) {
                            // Open menu
                            main_menu.removeClass('menu-closed').addClass('menu-open');
                            menu_toggler.addClass('is-active');
                            menu_toggler.attr('aria-expanded', 'true');
                            console.log('Menu opened');
                        } else {
                            // Close menu
                            main_menu.removeClass('menu-open').addClass('menu-closed');
                            menu_toggler.removeClass('is-active');
                            menu_toggler.attr('aria-expanded', 'false');
                            console.log('Menu closed');
                        }
                    });
                    
                    // Close menu when clicking outside
                    $(document).off('click.mobilemenu').on('click.mobilemenu', function(e) {
                        if (!main_menu.is(e.target) && main_menu.has(e.target).length === 0 && 
                            !menu_toggler.is(e.target) && menu_toggler.has(e.target).length === 0) {
                            if (main_menu.hasClass('menu-open')) {
                                main_menu.removeClass('menu-open').addClass('menu-closed');
                                menu_toggler.removeClass('is-active');
                                menu_toggler.attr('aria-expanded', 'false');
                                console.log('Menu closed by outside click');
                            }
                        }
                    });
                    
                    console.log('Custom mobile menu initialized successfully');
                } else {
                    console.warn('Mobile menu elements not found');
                }
            // }
        }

        // Wait for React components to render
        function waitForReactComponents() {
            var checkCount = 0;
            var maxChecks = 50; // 5 seconds max wait
            
            function checkForNav() {
                checkCount++;
                
                if ($('nav#main-mobile-nav').length > 0) {
                    initMobileMenu();
                } else if (checkCount < maxChecks) {
                    setTimeout(checkForNav, 100);
                } else {
                    console.warn('Mobile navigation not found after waiting');
                }
            }
            
            checkForNav();
        }

        // Start checking after DOM is ready
        waitForReactComponents();

        // Also reinitialize on window resize
        $(window).on('resize.mmenu', function() {
            setTimeout(initMobileMenu, 100);
        });
        
        
        
        
        /*----------------------------------------------------
           BUTTON EFFECT
         ----------------------------------------------------*/
        var button = $('.btn-effect');

        $(button).on('click', function (e) {

            // Remove any old one
            $('.ripple').remove();

            // Setup
            var posX = $(this).offset().left,
                posY = $(this).offset().top,
                buttonWidth = $(this).width(),
                buttonHeight = $(this).height();

            // Add the element
            $(this).prepend("<span class='ripple'></span>");


            // Make it round!
            if (buttonWidth >= buttonHeight) {
                buttonHeight = buttonWidth;
            } else {
                buttonWidth = buttonHeight;
            }

            // Get the center of the element
            var x = e.pageX - posX - buttonWidth / 2;
            var y = e.pageY - posY - buttonHeight / 2;


            // Add the ripples CSS and start the animation
            $('.ripple').css({
                width: buttonWidth,
                height: buttonHeight,
                top: y + 'px',
                left: x + 'px'
            }).addClass("rippleEffect");
        });
        
        
        
        
        /*----------------------------------------------------
           BACK TO TOP
         ----------------------------------------------------*/
        var pxShow=100;
        var scrollSpeed=500;
        
        $(window).scroll(function () {
            if ($(window).scrollTop() >= pxShow) {
                $("#backtotop").addClass('visible');
            } else {
                $("#backtotop").removeClass('visible');
            }
        });
        
        $('#backtotop a').on('click', function () {
            $('html, body').animate({
                scrollTop: 0
            }, scrollSpeed);
            return false;
        });
        
        
        
        
        /*----------------------------------------------------
          GENERAL SEARCH FORM
        ----------------------------------------------------*/
        var search_btn = $( '.extra-nav .toggle-search' );
        var general_searchform = $( '.general-search-wrapper' );
        var search_close = $( '.general-search-wrapper .toggle-search' );
        
        search_btn.on( 'click', function(){
            general_searchform.addClass('open');
        });
        
        search_close.on( 'click', function(){
            general_searchform.removeClass('open');
        });



    }); //end of document ready function

})(jQuery);