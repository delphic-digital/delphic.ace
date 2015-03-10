Ace
==================

Google Analytics tracking module.

Include delphic.ace.js after including jQuery/Zepto.

```html
<script src="delphic.ace.js"> </script>
```

## Usage:

Add a *data-track-event* attribute to the link you want to track.
Possible values: `data-track-event="category, action, label, value, noninteraction"`

Only category and action values are required.

```html
<a href="http://www.hackaday.com" data-track-event="External Link, Click, Exited site with external link">HACKADAY</a>
```

You can also initialize a manual call to GA with the following parameters:

```html
<script>
	$.ace(category, action, label, value, noninteraction);
</script>
```

### Why ace?

Because [Ace the Bat-Hound](http://www.comicvine.com/ace-the-bat-hound/4005-31302/) is good at tracking.

![Ace the Bat-Hound](http://static.comicvine.com/uploads/scale_small/1/14487/1288836-ace.jpg)

