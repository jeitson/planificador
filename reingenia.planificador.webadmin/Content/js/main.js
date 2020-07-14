// global variables
var isIE8 = false;
var isIE9 = false;
var $windowWidth;
var $windowHeight;
var $pageArea;
var isMobile = false;

// Debounce Function
(
    function ($, sr)
    {
	    // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
        var debounce = function (func, threshold, execAsap)
        {
		    var timeout;

		    return function debounced()
		    {
			    var obj = this, args = arguments;

			    function delayed()
			    {
				    if (!(execAsap))
				        func.apply(obj, args);

				    timeout = null;
			    };

			    if (timeout)
				    clearTimeout(timeout);
			    else if (execAsap)
				    func.apply(obj, args);

			    timeout = setTimeout(delayed, threshold || 100);
		    };
	    };

        // smartresize
        $.fn[sr] = function (fn) 
        {
		    return fn ? this.on('resize', debounce(fn)) : this.trigger(sr);
	    };
    }
)($, 'clipresize');

// Main Function
var Main = function ()
{
    // Window Resize Function
    var runWindowResize = function (func, threshold, execAsap)
    {
        // wait until the user is done resizing the window, then execute
        $(window).clipresize(function ()
        {
            runElementsPosition();
        });
    };

    // function to detect explorer browser and its version
    var runInit = function ()
    {
        if (/MSIE (\d+\.\d+);/.test(navigator.userAgent))
        {
            var ieversion = new Number(RegExp.$1);

			if (ieversion == 8)
				isIE8 = true;
			else if (ieversion == 9)
				isIE9 = true;
        }

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
            isMobile = true;
    };

    // function to adjust the template elements based on the window size
    var runElementsPosition = function ()
    {
        $windowWidth = $(window).width();
        $windowHeight = $(window).height();
        $pageArea = $windowHeight - $('body > .navbar').outerHeight() - $('body > .footer').outerHeight();

        if (!isMobile)
            $('.sidebar-search input').removeAttr('style').removeClass('open');

        runContainerHeight();
    };

    // function to adapt the Main Content height to the Main Navigation height
    var runContainerHeight = function ()
    {
        mainContainer = $('.main-content > .container');
        mainNavigation = $('.main-navigation');

        if ($pageArea < 760)
            $pageArea = 760;

        if (mainContainer.outerHeight() < mainNavigation.outerHeight() && mainNavigation.outerHeight() > $pageArea)
            mainContainer.css('min-height', mainNavigation.outerHeight());
        else
            mainContainer.css('min-height', $pageArea);
            
        if ($windowWidth < 768)
            mainNavigation.css('min-height', $windowHeight - $('body > .navbar').outerHeight());
    };

    // function to reduce the size of the Main Menu
    var runNavigationToggler = function ()
    {
        $('.navigation-toggler').on('click',
            function ()
            {
                if (!($('body').hasClass('navigation-small')))
                    $('body').addClass('navigation-small');
                else
                    $('body').removeClass('navigation-small');
            }
        );
    };

    // function to Main Menu
    var runNavigationMenu = function ()
    {
        $('.main-navigation-menu li.active').addClass('open');
        $('.main-navigation-menu > li a').on('click', function ()
        {
            if ($(this).parent().children('ul').hasClass('sub-menu') && ((!$('body').hasClass('navigation-small') || $windowWidth < 767) || !$(this).parent().parent().hasClass('main-navigation-menu')))
            {
                if (!$(this).parent().hasClass('open'))
                {
                    $(this).parent().addClass('open');
                    $(this).parent().parent().children('li.open').not($(this).parent()).not($('.main-navigation-menu > li.active')).removeClass('open').children('ul').slideUp(200);
                    $(this).parent().children('ul').slideDown(200, function () { runContainerHeight(); } );
                }
                else
                {
                    if (!$(this).parent().hasClass('active'))
                        $(this).parent().parent().children('li.open').not($('.main-navigation-menu > li.active')).removeClass('open').children('ul').slideUp(200, function () { runContainerHeight(); });
                    else
                        $(this).parent().parent().children('li.open').removeClass('open').children('ul').slideUp(200, function () { runContainerHeight(); });
                }
            }
        });
    };

    // function to activate the Go-Top button
    var runGoTop = function ()
    {
        $('.go-top').on('click', function (e)
        {
            $("html, body").animate({ scrollTop: 0 }, "slow");

            e.preventDefault();
        });
    };

    // function to avoid closing the dropdown on click
    var runDropdownEnduring = function ()
    {
        if ($('.dropdown-menu.dropdown-enduring').length)
        {
            $('.dropdown-menu.dropdown-enduring').click(function (event)
            {
                event.stopPropagation();
            });
        }
    };

    return {
		// main function to initiate template pages
        init:
            function ()
            {
                runWindowResize();
                runInit();
                runElementsPosition();
                runNavigationToggler();
                runNavigationMenu();
                runGoTop();
                runDropdownEnduring();
		    }
	};
}();
