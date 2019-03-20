<template>
  <div>
    <div class="mask" @click="_hideLinkage"></div>
    <div class="clearfix linkage">
      <div class="province pickerWrapper">
        <mt-picker :slots="provinces" @change="onProvinceChange" value-key="name"></mt-picker>
      </div>
      <div class="city pickerWrapper">
        <mt-picker :slots="citys" @change="onCityChange" value-key="name"></mt-picker>
      </div>
      <div class="area pickerWrapper">
        <mt-picker :slots="areas" @change="onAreaChange" value-key="name"></mt-picker>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "city"
}
</script>

<style scoped>

</style>
