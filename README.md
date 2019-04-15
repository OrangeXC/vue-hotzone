# vue-hotzone

> A vue2 hotzone component

[![NPM](https://nodei.co/npm/vue-hotzone.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/vue-hotzone/)

## [Demo](http://orangex_c.coding.me/vue-hotzone/) | [案例](http://orangex_c.coding.me/vue-hotzone/)

### Install

```bash
npm install vue-hotzone --save
# or
yarn add vue-hotzone
```

### Use

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

### Options

#### Attributes
You can set them to your data function

| Attribute | Type   | Description                      | Keys                                       |
|:----------|:-------|:---------------------------------|:-------------------------------------------|
| image     | String | image of hotzone(required: true) |                                            |
| max       | Number | max number of zones              |                                            |
| zonesInit | Array  | init zones                       | item(heightPer, leftPer, topPer, widthPer) |
| minLimit  | Number | Minimum square size of zone      |                                            |

#### Events

| Event Name | Description                                                              | Parameters                      |
|:-----------|:-------------------------------------------------------------------------|:--------------------------------|
| change     | triggers when the zones changes                                          | the array of the zones          |
| add        | triggers when the zone add                                               | the add zone item               |
| remove     | triggers when the zone remove                                            | the index of the remove zone    |
| overRange  | triggers when zones number > max                                         | the index of the overRange zone |
| erase      | triggers when add zone overRange or smaller than the minimum area(48*48) | the index of the erase zone     |

### Develop

```bash
git clone https://github.com/OrangeXC/vue-hotzone.git

cd vue-hotzone

yarn # or npm install

yarn serve # or npm run serve
```

### License

MIT
