delphic.gatracking
==================

Google Analytics tracking module.

Include delphic.gatracking.js after including jQuery/Zepto.

```html
<script src="delphic.gatracking.js"> </script>
```

Initialize:

```html
<script>
	$.ace();
</script>
```

## Usage:

Add a *data-delphic-event* attribute to the link you want track. Possible values: `data-track-event="category, action, label, value, noninteraction"`

Only category and action values are required.

```html
<a href="http://www.hackaday.com" data-delphic-event="External Link, Click, Exited site with external link">HACKADAY</a>
```

### Why ace?

http://www.comicvine.com/ace-the-bat-hound/4005-31302/