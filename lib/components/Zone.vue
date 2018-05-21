<template>
  <li
    v-drag-item
    :style="{top: zoneTop, left: zoneLeft, width: zoneWidth, height: zoneHeight}"
  >
    <ul
      v-change-size
      class="hz-m-box"
      :class="{
        'hz-z-hidden': tooSmall,
        'hz-m-hoverbox': !hideZone
      }"
    >
      <li class="hz-u-index" :title="`热区${index + 1}`">{{index + 1}}</li>
      <li
        title="删除该热区"
        v-show="!hideZone"
        class="hz-u-close hz-icon hz-icon-trash"
        @click.stop="delItem($event, index)"
      ></li>
      <li class="hz-u-square hz-u-square-tl" data-pointer="dealTL"></li>
      <li class="hz-u-square hz-u-square-tc" data-pointer="dealTC"></li>
      <li class="hz-u-square hz-u-square-tr" data-pointer="dealTR"></li>
      <li class="hz-u-square hz-u-square-cl" data-pointer="dealCL"></li>
      <li class="hz-u-square hz-u-square-cr" data-pointer="dealCR"></li>
      <li class="hz-u-square hz-u-square-bl" data-pointer="dealBL"></li>
      <li class="hz-u-square hz-u-square-bc" data-pointer="dealBC"></li>
      <li class="hz-u-square hz-u-square-br" data-pointer="dealBR"></li>
    </ul>
  </li>
</template>

<script>
import changeSize from '../directives/changeSize'
import dragItem from '../directives/dragItem'

export default {
  name: 'Zone',
  data () {
    return {
      zoneTop: '',
      zoneLeft: '',
      zoneWidth: '',
      zoneHeight: '',
      hideZone: false,
      tooSmall: false
    }
  },
  props: [
    'index',
    'setting'
  ],
  mounted () {
    this.setZoneInfo(this.setting)
  },
  methods: {
    setZoneInfo (val) {
      this.zoneTop = this.getZoneStyle(val.topPer)
      this.zoneLeft = this.getZoneStyle(val.leftPer)
      this.zoneWidth = this.getZoneStyle(val.widthPer)
      this.zoneHeight = this.getZoneStyle(val.heightPer)
      this.tooSmall = val.widthPer < 0.01 && val.heightPer < 0.01
    },
    handlehideZone (isHide = true) {
      if (this.hideZone === isHide) {
        return
      }

      this.hideZone = isHide
    },
    changeInfo (info = {}) {
      let { index } = this
      this.$emit('changeInfo', {
        info,
        index
      })
    },
    delItem (e, index) {
      this.$emit('delItem', index)
    },
    getZoneStyle (val) {
      return `${(val || 0) * 100}%`
    }
  },
  watch: {
    setting: {
      handler: function (val) {
        this.setZoneInfo(val)
      },
      deep: true
    }
  },
  directives: {
    changeSize,
    dragItem
  }
}
</script>
