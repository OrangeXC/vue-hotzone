<template>
  <div id="app">
    <h1>VUE-HOTZONE</h1>
    <hr>
    <h2>Try drag red area or drag create a new area</h2>
    <h2>👇</h2>
    <hotzone
      :image="image"
      :zonesInit="zones"
      @add="handleAdd"
      @remove="handleRemove"
      @change="handleChange"
    ></hotzone>
    <input
      type="text"
      v-for="(zone, index) in zones"
      :key="index"
      v-model="zone.url"
      :placeholder="`Area ${index + 1} url`"
    >
    <h2>Try click your areas</h2>
    <h2>👇</h2>
    <div class="wrap">
      <img :src="image" alt="cover">
      <div
        class="zone"
        v-for="(zone, index) in zones"
        :key="index"
        :style="{
          width: getZoneStyle(zone.widthPer),
          height: getZoneStyle(zone.heightPer),
          top: getZoneStyle(zone.topPer),
          left: getZoneStyle(zone.leftPer)
        }"
        @click="handleZoneClick(zone.url)"
      ></div>
    </div>
  </div>
</template>

<script>
import hotzone from '../lib'

export default {
  name: 'app',
  data: function () {
    return {
      image: "https://haitao.nos.netease.com/EbrC2L4UuXFI1CPmWall%20o207T1705221905_1920_1080.jpg",
      zones: [{
        heightPer: 0.4374,
        leftPer: 0.1153,
        topPer: 0.238,
        widthPer: 0.2827,
        url: 'https://github.com/OrangeXC'
      }]
    }
  },
  methods: {
    handleAdd (zone) {
      zone.url = this.zones.length ? '' : 'https://github.com/OrangeXC'

      this.zones.push(zone)
    },
    handleRemove (index) {
      this.zones.splice(index, 1)
    },
    handleChange () {
      // eslint-disable-next-line
      console.log('Zones data updated')
    },
    getZoneStyle (val) {
      return `${(val || 0) * 100}%`
    },
    handleZoneClick (url) {
      url && window.open(url)
    }
  },
  components: {
    hotzone
  }
}
</script>

<style lang="scss">
#app {
  width: 980px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 auto;
}

.wrap {
  position: relative;

  img {
    width: 100%;
    user-select: none;
    -webkit-user-drag: none;
    -webkit-touch-callout: none;
  }

  .zone {
    position: absolute;
    cursor: pointer;

    border: 2px dashed red;
  }
}

input {
  width: 100%;
  box-sizing: border-box;
  margin-top: 20px;
  padding: 10px;

  background: #fff;
  border: 1px solid #ccc;
  outline: none;

  color: #555;

  transition: all 0.30s ease-in-out;

  &:focus {
    box-shadow: 0 0 5px #43D1AF;
    border: 1px solid #43D1AF;
  }
}
</style>
