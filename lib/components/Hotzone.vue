<template>
  <div
    ref="content"
    class="hz-m-wrap"
  >
    <img class="hz-u-img" :src="image" />
    <ul
      class="hz-m-area"
      v-add-item
    >
      <zone
        class="hz-m-item"
        v-for="(zone, index) in zones"
        :key="index"
        :index="index"
        :setting="zone"
        @delItem="removeItem($event)"
        @changeInfo="changeInfo($event)"
      ></zone>
    </ul>
  </div>
</template>

<script>
import Zone from './Zone'
import addItem from '../directives/addItem'

export default {
  name: 'HotZone',
  data () {
    return {
      zones: []
    }
  },
  props: {
    image: {
      type: String,
      required: true
    },
    zonesInit: {
      type: Array,
      required: true
    },
    config: {
      type: Object
    }
  },
  mounted () {
    this.zones = this.zonesInit.concat()
  },
  methods: {
    changeInfo (res) {
      let { info, index } = res

      this.changeItem(info, index)
    },
    addItem (setting = {}) {
      this.zones.push(setting)
      this.hasChange()
      this.$emit('add', setting)
    },
    eraseItem (index = this.zones.length - 1) {
      this.removeItem(index)
      this.$emit('erase', index)
    },
    isOverRange () {
      let { config = {}, zones = [] } = this

      return config.hasOwnProperty('maxNum') && zones.length > config.maxNum
    },
    overRange (index = this.zones.length - 1) {
      this.removeItem(index)
      this.$emit('overRange', index)
    },
    removeItem (index = this.zones.length - 1) {
      this.zones.splice(index, 1)
      this.hasChange()
      this.$emit('remove', index)
    },
    changeItem (info = {}, index = this.zones.length - 1) {
      Object.assign(this.zones[index], info)
      this.hasChange()
    },
    hasChange () {
      this.$emit('change', this.zones)
    }
  },
  directives: {
    addItem
  },
  components: {
    Zone
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../assets/styles/main.css';
</style>
