# jQuery Selector Cache Plugin
- Extends jQuery to allow for caching of jQuery objects.
- Helps avoiding unnecessary selector lookups or having to use extra variables to store them.
- Supports contexts and cache refreshes.

Based on [Justin Sternberg's $-cache-with-find.js](https://gist.github.com/jtsternberg/14978579a9edf42ed069).

## Why?
Selector lookups are expensive. You should avoid them unless they are needed.

Instead of this:

```javascript
$("#container .box").css("color", "red");
// somewhere else...
$("#container .box").css("font-weight", "bold");
// somewhere else...
$("#container .box").css("background-color", "yellow");
```

You should be doing this:

```javascript
var $containerBox = $("#container .box");
 
$containerBox.css("color", "red");
// somewhere else...
$containerBox.css("font-weight", "bold");
// somewhere else...
$containerBox.css("background-color", "yellow");
```

With this plugin you don't need the helper variable.

```javascript
$.q("#container .box").css("color", "red");
// somewhere else...
$.q("#container .box").css("font-weight", "bold");
// somewhere else...
$.q("#container .box").css("background-color", "yellow");
```

## Usage

Include the script in your page after jQuery.

```html
<script src="jquery.selectorcache.js"></script>
```

I tried to mimic [jQuery()](https://api.jquery.com/jQuery/)'s usage as much as possible.

Use the q method to retrieve a jQuery object. If the object is in cache it will be retrieved directly, otherwise it will be saved to cache first.

```javascript
// query elements and store them in cache
$.q(".container");
```

Optionally pass a second argument to use as a context.

```javascript
// use a context by passing a second argument
$.q(".container", ".parent");

// also accepts a jQuery object as a context
$.q(".container", $.q(".parent"));
```

You can refresh the cache for a particular selector by passing true as the second or third argument.

```javascript
// refresh cache for a specific selector/context
$.q(".container", true);
$.q(".container", ".parent", true);
```

The cache is stored in jQuery. You can access it directly.

Clear the cache by assigning an empty object.

```javascript
// reset entire cache
$.selectorCache = {};
```

Manually update the cache.

```javascript
// save to cache directly
$.selectorCache[".container"] = $(".container");

// access it later
$.selectorCache[".container"];

// or
$.q(".container");
```

## Why q?
Stands for "query". Since it's something that will be used many times throughout the code, I wanted something short.

You can easily replace it with something else by editing the source code.