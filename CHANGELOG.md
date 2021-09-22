# 1.0.0 (2021-09-22)


### Bug Fixes

* control deadlock when cross is disabled ([02d9c3e](https://github.com/s-r-x/eminus/commit/02d9c3ec53bd664a429f79d475cc813211eeb044))
* deadlock on handler click when disableCross is true and more than one handler are at the start of the slider ([43df2f6](https://github.com/s-r-x/eminus/commit/43df2f6f7cbc05a4bf0737d647156796de3400fc))
* do not calculate style for track progress if it is disabled ([22867fa](https://github.com/s-r-x/eminus/commit/22867faeb44e00fd1c3018d32cb9bc3e34443b47))
* ignore minDist props if disableCross is not true ([ca6ff67](https://github.com/s-r-x/eminus/commit/ca6ff671ed360c100cd41ddc4715517e6160a5d3))
* pointer-events: none on control when it is disabled ([290d8fb](https://github.com/s-r-x/eminus/commit/290d8fb062046e7002256a8c4eeeabefa724af10))
* when dragging set pointerEvents on rest controls to none ([1ab5710](https://github.com/s-r-x/eminus/commit/1ab57103d38d1c3afc58606dd44721037dbf90de))


### Features

* add control-shadow-color css custom property ([d4b433b](https://github.com/s-r-x/eminus/commit/d4b433b55aefea8429bb2d4a8fb2fbd4a95301f0))
* add data-value attr to the Tooltip ([a63da6e](https://github.com/s-r-x/eminus/commit/a63da6ecb69887921b3b941cd87a44ff98af7f73))
* add value clamping to Control ([0754087](https://github.com/s-r-x/eminus/commit/0754087b7ec6d378006dc0d4edbfdb361a4d5817))
* alwaysShowTooltip prop ([ad2ed37](https://github.com/s-r-x/eminus/commit/ad2ed376665c983e230979f7d8ec9e3b8cfbdc6e))
* clamp values ([637b024](https://github.com/s-r-x/eminus/commit/637b0243bea5f87a92e61512642a68fc255b6a2e))
* clamping mark x/y style ([19c7a60](https://github.com/s-r-x/eminus/commit/19c7a60100d49cc00a3e0100d5c9c80ffc1efd13))
* markLabelFormatter prop now accepts exactly the passed mark value / render mark even if there is no label in Mark, but only value ([bc9a2dd](https://github.com/s-r-x/eminus/commit/bc9a2dd187dc36558cf9223b543d3ad0cee70708))
* new default colors ([01c6287](https://github.com/s-r-x/eminus/commit/01c6287bacde9147d93992146ab7ff2f3b718428))
* support marks prop as a plain array of numbers ([fa4ad34](https://github.com/s-r-x/eminus/commit/fa4ad34495057d344714ab905930e17faaf67e2c))
* tooltipRenderer prop ([b126056](https://github.com/s-r-x/eminus/commit/b12605614cb314909f357f7bc94576f13851d950))
