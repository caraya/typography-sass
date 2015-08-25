////
/// @group Typography
/// @author [Carlos Araya](http://publishing-project.rivendellweb.net/)
////

// Max breakpoint
$max-breakpoint: 1025;
$wide-screen: "(min-width: #{$max-breakpoint}px)"; 

/// @access public
/// @example scss
/// .headline {
///   font-size: 4.5em; // Fallback
///   @include vw(72px);
/// }
/// @param {String} $target - Target size for conversion
/// @link http://sassbreak.com/viewport-relative-headings-with-sass
@function get-vw($target) {
  // 1 vw is equal to 1% of the viewport width
  $vw-context: ($max-breakpoint * .01) * 1px; // 1% viewport width
  @return ($target/$vw-context) * 1vw;
}

/// @access public
/// @param {String} $size - Target size for conversion
/// @link http://sassbreak.com/viewport-relative-headings-with-sass
  font-size: get-vw($size);
  // Prevent font-size from getting too big
  @media #{$wide-screen} {
    font-size: $size;
  }
}

