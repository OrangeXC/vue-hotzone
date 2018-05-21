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

Vue.component('hotzone', hotzone)
```

```html
<hotzone [options]></hotzone>
```

### Options

#### Attributes
You can set them to your data function

| Attribute      | Type         | Description    | Keys |
| :------------- |:-------------|:---------------| :------ |
| zones          | Array        |  hotzones(required: true) |  heightPer, leftPer, topPer, widthPer |
| image          | String       |  image of hotzone |  |

#### Events

| Event Name     | description    | Parameters |
| :------------- |:---------------| :--------- |
| change         | triggers when the zones changes |  the array of the zones |
| add            | triggers when the zone add |  the add zone item |
| remove         | triggers when the zone remove |  the index of the remove zone |

### Develop

```bash
git clone https://github.com/OrangeXC/vue-hotzone.git

cd vue-hotzone

yarn
# or
npm i

npm run serve
# or
yarn serve
```

### License

MIT
