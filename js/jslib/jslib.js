/*=============================================================================
  Created by NxtChg (admin@nxtchg.com), 2017. License: Public Domain.
=============================================================================*/

var js = {}; // it all starts with a small first step

function defined(a){ return (a !== void 0 && a !== null); }

js.$ = function(id){ return document.getElementById(id); }

js.cb = function(obj, fn){ return function(){ return fn.apply(obj, arguments); }; }; // bind 'this' and function together
//_____________________________________________________________________________

js.get_cookie = function(name)
{
	var arr = document.cookie.split(';');

	for(var i = 0; i < arr.length; i++)
	{
		var c = arr[i], p = -1; while(c.charCodeAt(++p) < 33);
		
		if(c.indexOf(name+'=', p) == p)
		{
			return decodeURIComponent(c.substr(p + name.length + 1));
		}
	}
};//___________________________________________________________________________

js.set_cookie = function(name, val, days, path) // (name, "", -1) to delete a cookie
{
	var enc = encodeURIComponent, v = enc(val);
	
	if(days)
	{
		var d = new Date(); d.setDate(d.getDate() + days);

		v += '; expires=' + d.toUTCString();
	}

	if(path) v += '; path=' + path;

	document.cookie = enc(name) + '=' + v; // + '; Secure'
};//___________________________________________________________________________

js.check_cookies = function()
{
	var n = 'testcookie';

	if(navigator.cookieEnabled)
	{
		js.set_cookie(n,1); if(js.get_cookie(n)){ js.set_cookie(n, '', -1); return true; }
	}
};//___________________________________________________________________________

js.debounced = function(fn, delay) // returns a version of fn with delay; if called again sooner the delay is reset
{
	return function()
	{
		clearTimeout(this.timer);
		
		var self = this, args = arguments;

		this.timer = setTimeout(function(){ fn.apply(self, args); }, delay);
	};
};

js.throttled = function(fn, delay, immediate) // returns a version of fn with delay; if called again sooner the call is ignored
{
	return function()
	{
		if(this.timer) return;

		var self = this, args = arguments;

		if(immediate) fn.apply(self, args);

		this.timer = setTimeout(function(){ self.timer = null; fn.apply(self, args); }, delay);
	};
};//___________________________________________________________________________
