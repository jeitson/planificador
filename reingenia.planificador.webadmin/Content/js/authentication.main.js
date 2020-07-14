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
        
        $.fn[sr] = function (fn) 
        {
		    return fn ? this.on('resize', debounce(fn)) : this.trigger(sr);
	    };
    }
)($, 'clipresize');

// Main Function
var Main = function ()
{
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

    return {
		// main function to initiate template pages
        init: function ()
        {
			runInit();
		}
	};
}();
