<template>
  <div id="container" :style="{ width: mapwidth, height: mapheight }"></div>
</template>



<style lang="less" scoped>
.container {
  width: 900px;
  height: 900px;
}
</style>
<script>
import { reactive, toRefs } from "@vue/reactivity";
import { nextTick, onMounted } from "@vue/runtime-core";
import { ElMessage } from "element-plus";

export default {
  name: "showmap",
  props: {
    mapwidth: {
      type: String,
      default: "100%",
    },
    mapheight: {
      type: String,
      default: "600px",
    },
    addname: {
      type: String,
      default: "",
    },
  },
  setup(props, context) {
    const state = reactive({});
    onMounted(() => {
      nextTick(() => {
        initMap();
      });
    });
    const initMap = () => {
      var map = new BMap.Map("container");
      var point = new BMap.Point(116.404, 39.915);
      map.centerAndZoom(point, 15);
      map.enableScrollWheelZoom(true);
      map.centerAndZoom(new BMap.Point(116.331398, 39.897445), 12);
      //创建地址解析器实例
      var myGeo = new BMap.Geocoder();
      // 将地址解析结果显示在地图上，并调整地图视野
      myGeo.getPoint(
        props.addname,
        function (point) {
          if (point) {
            map.centerAndZoom(point, 16);
            map.addOverlay(new BMap.Marker(point, { title: props.addname }));
            ElMessage({
              message: "定位成功",
              center: true,
              type: "success",
              duration: 1000,
            });
          }
        },
        "北京市"
      );
      // var geolocation = new BMap.Geolocation();
      // geolocation.getCurrentPosition(
      //   function (r) {
      //     if (this.getStatus() == BMAP_STATUS_SUCCESS) {
      //       var mk = new BMap.Marker(r.point);
      //       map.addOverlay(mk);
      //       map.panTo(r.point);
      //     } else {
      //       alert("failed" + this.getStatus());
      //     }
      //   },
      //   { enableHighAccuracy: true }
      // );
    };

    return {
      ...toRefs(state),
      initMap,
    };
  },
};
</script>