<p align="center"><img width="100" src="https://i.loli.net/2019/09/03/dSJuMvDHA4izh3k.png" alt="vue-hotzone logo"></p>

<p align="center">
  <a href="https://travis-ci.com/OrangeXC/vue-hotzone"><img src="https://travis-ci.com/OrangeXC/vue-hotzone.svg?branch=master" alt="Build Status"></a>
  <a href="https://codecov.io/gh/OrangeXC/vue-hotzone"><img src="https://img.shields.io/codecov/c/github/OrangeXC/vue-hotzone/master.svg" alt="Coverage Status"></a>
  <a href="https://npmcharts.com/compare/vue-hotzone?minimal=true"><img src="https://img.shields.io/npm/dm/vue-hotzone" alt="Npm download"></a>
  <a href="https://www.npmjs.com/package/vue-hotzone"><img src="https://img.shields.io/npm/v/vue-hotzone" alt="Npm version"></a>
  <a href="https://github.com/OrangeXC/vue-hotzone/blob/master/LICENSE"><img src="https://img.shields.io/github/license/orangexc/vue-hotzone" alt="GitHub License"></a>
</p>

## Introduction

A vue2 hotzone component

### [Demo](http://orangex_c.coding.me/vue-hotzone/) | [案例](http://orangex_c.coding.me/vue-hotzone/)

## Install

```bash
npm i vue-hotzone --save
# or
yarn add vue-hotzone
```

## Use

```js
// Use in component
import hotzone from 'vue-hotzone'

export default {
  components: {
    hotzone
  }
}

// Use in global
import hotzone from 'vue-hotzone'

Vue.component(hotzone.name, hotzone)

// or
Vue.use(hotzone)
```

```html
<hotzone [options]></hotzone>
```

## Options

### Attributes
You can set them to your data function

| Attribute | Type   | Description                      | Keys                                       |
|:----------|:-------|:---------------------------------|:-------------------------------------------|
| image     | String | image of hotzone(required: true) |                                            |
| max       | Number | max number of zones              |                                            |
| zonesInit | Array  | init zones                       | item(heightPer, leftPer, topPer, widthPer) |

### Events

| Event Name | Description                                                              | Parameters                      |
|:-----------|:-------------------------------------------------------------------------|:--------------------------------|
| change     | triggers when the zones changes                                          | the array of the zones          |
| add        | triggers when the zone add                                               | the add zone item               |
| remove     | triggers when the zone remove                                            | the index of the remove zone    |
| overRange  | triggers when zones number > max                                         | the index of the overRange zone |
| erase      | triggers when add zone overRange or smaller than the minimum area(48*48) | the index of the erase zone     |

## Develop

```bash
$ git clone https://github.com/OrangeXC/vue-hotzone.git

$ cd vue-hotzone

$ yarn

$ yarn serve
```

## License

Vue-hotzone is [MIT licensed](https://github.com/OrangeXC/vue-hotzone/blob/master/LICENSE).
