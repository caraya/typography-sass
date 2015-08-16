# Using SASS maps to media queries

Version 3 of SASS introduced the map data type. If you've done work in any other programming type you'll problably be familiar with maps as associate arrays or hashes; SASS uses the same principle: maps are a collection of key-value pairs.

How does this affect typography? Simple: We can build a map to store media query breakpoints and associated font sizes and use those in our code without having to remember what rules we set up and how we  

## SASS Maps

Sass script maps are a list of one or more key-value pairs assigned to a variable. We can use the map with looping functions to get one result for each key-value pair on the map when running the loop. Let's use a basic set of colors for our social media profiles as an example:

```sass
$sm-profiles: (
  facebook: #3b5998,
  flickr: #0063db,
  github: #4183c4,
  googleplus: #dd4b39,
  linkedin: #007bb6,
  twitter: #00aced,
  vimeo: #aad450,
  youtube: #b00
);
```

We then create a function that loops through our map and, for each profile value, we make the background equal to the value of the profile key. The code to do that is show below:

```sass
@each $profile, $bgcolor in $sm-profiles {
  .profile-link--#{$profile}:focus,
  .profile-link--#{$profile}:hover {
    background: $bgcolor;
  }
}
```

And the result for Vimeo (using the $sm-profiles map and the function discussed above) looks like this:

```css
.profile-link--vimeo:focus,
.profile-link--vimeo:hover {
    background: #aad450;
}



## Applying maps to typography

```sass
$breakpoints: (
  small : 480px,
  medium: 700px,
  large : 1024px
);

$p-font-sizes: (
  null  : (15px, 1.3),
  small : 16px,
  medium: (17px, 1.4),
  900px : 18px,
  large : (19px, 1.45),
  1440px: 20px,
);
```
Although line-height values can be defined using any valid CSS unit (percentages, pixels, ems, etc.), "unitless" values are recommended and preferred.

We then modify the mixin to include line height when generating the CSS.


```sass
@mixin font-size($fs-map, $fs-breakpoints: $breakpoints) {
  @each $fs-breakpoint, $fs-font-size in $fs-map {
    @if $fs-breakpoint == null {
      @include make-font-size($fs-font-size);
    }
    @else {
      // If $fs-font-size is a key that exists in
      // $fs-breakpoints, use the value
      @if map-has-key($fs-breakpoints, $fs-breakpoint) {
        $fs-breakpoint: map-get($fs-breakpoints, $fs-breakpoint);
      }
      @media screen and (min-width: $fs-breakpoint) {
        @include make-font-size($fs-font-size);
      }
    }
  }
}

// Utility function for mixin font-size
@mixin make-font-size($fs-font-size) {
  @if type-of($fs-font-size) == "list" {
    font-size: nth($fs-font-size, 1);
    // If $fs-font-size is a list ($fs-font-size 
    //has more than 1 value), include
    // both font-size and line-height
    @if (length($fs-font-size) > 1) {
      line-height: nth($fs-font-size, 2);
    }
  }
  @else {
    font-size: $fs-font-size;
  }
}
```

The mixin checks to see whether the value of the key in the font-sizes map is a list as opposed to a font-size value. If it’s a list, then it gets the correct value from the list by index value, with the help of the nth function. It assumes that the first value is the font size and the second is the line height. Let’s see it in action:

```sass
p {
  @include font-size($p-font-sizes);
}
```

* [http://www.smashingmagazine.com/2015/06/responsive-typography-with-sass-maps/](http://www.smashingmagazine.com/2015/06/responsive-typography-with-sass-maps/)
* [http://www.sitepoint.com/using-sass-maps/](http://www.sitepoint.com/using-sass-maps/)

