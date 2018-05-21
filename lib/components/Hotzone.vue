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
      this.$emit('add', setting)
      this.hasChange()
    },
    eraseItem (index = this.zones.length - 1) {
      this.$emit('erase', index)
      this.removeItem(index)
    },
    isOverRange () {
      let { config = {}, zones = [] } = this

      return config.hasOwnProperty('maxNum') && zones.length > config.maxNum
    },
    overRange (index = this.zones.length - 1) {
      this.$emit('overRange', index)
      this.removeItem(index)
    },
    removeItem (index = this.zones.length - 1) {
      this.zones.splice(index, 1)
      this.$emit('remove', index)
      this.hasChange()
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
