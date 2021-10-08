## [1.0.7](https://github.com/s-r-x/eminus/compare/v1.0.6...v1.0.7) (2021-10-07)


### Bug Fixes

* detach all active event listeners on unmount if there are any ([e477903](https://github.com/s-r-x/eminus/commit/e47790311d2e98293063af93a77cfd3ac995febb))

## [1.0.6](https://github.com/s-r-x/eminus/compare/v1.0.5...v1.0.6) (2021-10-07)


### Performance Improvements

* memoize value ([aaa5d43](https://github.com/s-r-x/eminus/commit/aaa5d43bc16afb2cb5a786d9126aa32e74fb3b74))

## [1.0.5](https://github.com/s-r-x/eminus/compare/v1.0.4...v1.0.5) (2021-09-28)


### Bug Fixes

* optional props become required when styling with linaria ([c467141](https://github.com/s-r-x/eminus/commit/c467141c8515b2495e581b5e77c4997afd4227e5))

## [1.0.4](https://github.com/s-r-x/eminus/compare/v1.0.3...v1.0.4) (2021-09-25)


### Bug Fixes

* move react and react-dom to peerDependencies ([073c0b5](https://github.com/s-r-x/eminus/commit/073c0b519aca3cb2d0740353a4f910829e986b09))

## [1.0.3](https://github.com/s-r-x/eminus/compare/v1.0.2...v1.0.3) (2021-09-22)


### Bug Fixes

* move control to the positive direction on ArrowDown and to the negative on ArrowUp ([b88c751](https://github.com/s-r-x/eminus/commit/b88c751ba9a970cedcb12dce1faca4f4f0b7c226))

## [1.0.2](https://github.com/s-r-x/eminus/compare/v1.0.1...v1.0.2) (2021-09-22)


### Bug Fixes

* remove exports from package.json ([0824258](https://github.com/s-r-x/eminus/commit/0824258cb0c1c067b045dec088461109b942005f))

## [1.0.1](https://github.com/s-r-x/eminus/compare/v1.0.0...v1.0.1) (2021-09-22)

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
