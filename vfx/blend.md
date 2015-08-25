////
/// @group VFX
/// @author [Carlos Araya](http://publishing-project.rivendellweb.net/)
////


 $cool-grad: linear-gradient(aqua, royalblue);
 $meh-grad: linear-gradient(tomato, transparent);
 $snarky-grad: linear-gradient(orange 75%, blue);
 
/// Provides a basic css blend  between an image and the background color
/// @link http://sassbreak.com/css-blend-modes-with-sass/
/// @link http://publishing-project.rivendellweb.net/getting-fancy-blend-modes/
/// @example
///   .blend {
///  @include blendy("http://sassbreak.com/assets/mountains.jpg", $grad: $cool-grad);
///  width: 200px;
///  height: 200px;
///  border-radius: 50%;
///  background-size: cover;
///  margin: 1.5em auto;
/// }
/// @access public
/// @param {String} $img - image to blend.
/// @param {String} $color [null] - color to blend with
/// @param {String} $grad [null] - gradient to use
/// @param {String} $blend [multiply] - what blending mode to use
@mixin blendy($img, $color: null, $grad: null, $blend: multiply) {
  $img-path: url('#{$img}');
  @if $grad {
    background: $grad, $img-path;
  } @else {
    background-image: $img-path;
    background-color: $color;
  }
  background-blend-mode: $blend;
}
