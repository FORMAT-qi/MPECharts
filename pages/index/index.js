//index.js
//获取应用实例
const app = getApp()

import * as echarts from '../../lib/ec-canvas/echarts';
import geoJson from "./mapData.js";


var ChartMap = null;
var mapDate = [];
var ChartBar = null;
var nameList = [];
var valueList = [];
Page({
  data: {
    ecMap: {
      onInit: initChartMap
    },
    ecBar: {
      onInit: initChartBar
    },
  },
  onLoad: function (options) {

  },
  onShow: function () {
    // 模拟请求数据
    this.getMapData();
  },
  getMapData: function (e) {
    mapDate = [{
      name: '北京',
      value: randomData()
    },
    {
      name: '天津',
      value: randomData()
    },
    {
      name: '上海',
      value: randomData()
    },
    {
      name: '重庆',
      value: randomData()
    },
    {
      name: '河北',
      value: randomData()
    },
    {
      name: '河南',
      value: randomData()
    },
    {
      name: '云南',
      value: randomData()
    },
    {
      name: '辽宁',
      value: randomData()
    },
    {
      name: '黑龙江',
      value: randomData()
    },
    {
      name: '湖南',
      value: randomData()
    },
    {
      name: '安徽',
      value: randomData()
    },
    {
      name: '山东',
      value: randomData()
    },
    {
      name: '新疆',
      value: randomData()
    },
    {
      name: '江苏',
      value: randomData()
    },
    {
      name: '浙江',
      value: randomData()
    },
    {
      name: '江西',
      value: randomData()
    },
    {
      name: '湖北',
      value: randomData()
    },
    {
      name: '广西',
      value: randomData()
    },
    {
      name: '甘肃',
      value: randomData()
    },
    {
      name: '山西',
      value: randomData()
    },
    {
      name: '内蒙古',
      value: randomData()
    },
    {
      name: '陕西',
      value: randomData()
    },
    {
      name: '吉林',
      value: randomData()
    },
    {
      name: '福建',
      value: randomData()
    },
    {
      name: '贵州',
      value: randomData()
    },
    {
      name: '广东',
      value: randomData()
    },
    {
      name: '青海',
      value: randomData()
    },
    {
      name: '西藏',
      value: randomData()
    },
    {
      name: '四川',
      value: randomData()
    },
    {
      name: '宁夏',
      value: randomData()
    },
    {
      name: '海南',
      value: randomData()
    },
    {
      name: '台湾',
      value: randomData()
    },
    {
      name: '香港',
      value: randomData()
    },
    {
      name: '澳门',
      value: randomData()
    }
    ];
    var list = mapDate;
    var name = [];
    var value = [];
    for (var i = 0; i < mapDate.length; i++) {
      name[i] = mapDate[i].name;
      value[i] = mapDate[i].value;
    }
    nameList = name;
    valueList = value;
    setTimeout(()=>{
      getBarOption()
      getMapOption()
     
    },200)
  
   
  },
  onButtonClick(){
    wx.navigateTo({
      url: '/pages/dialog/dialog',
    })
  }
})

/**
 * 生成1000以内的随机数
 */
function randomData() {
  return Math.round(Math.random() * 2000);
}

/**
 * 全国分布地图
 */
function initChartMap(canvas, width, height) {

  ChartMap = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(ChartMap);
  echarts.registerMap('china', geoJson);
  ChartMap.setOption(getMapOption());
  return ChartMap;
}

function getMapOption() {
  var option = {
    tooltip: {
      trigger: 'item',
      backgroundColor: "#FFF",
      padding: [
        10, // 上
        15, // 右
        8, // 下
        15, // 左
      ],
      extraCssText: 'box-shadow: 2px 2px 10px rgba(21, 126, 245, 0.35);',
      textStyle: {
        fontFamily: "'Microsoft YaHei', Arial, 'Avenir', Helvetica, sans-serif",
        color: '#005dff',
        fontSize: 12,
      },
      formatter: `{b} :  {c}人`
    },
    // grid: {
    //   width: '80%',
    //   height: '80%',
    //   left: '13%',
    //   bottom: 90,
    // },
    geo: [{
      // 地理坐标系组件
      map: "china",
      roam: false, // 可以缩放和平移
      aspectScale: 0.8, // 比例
      layoutCenter: ["50%", "43%"], // position位置
      layoutSize: 340, // 地图大小，保证了不超过 370x370 的区域
      label: {
        // 图形上的文本标签
        normal: {
          show: true,
          textStyle: {
            color: "rgba(0, 0, 0, 0.9)",
            fontSize: '8'
          }
        },
        emphasis: { // 高亮时样式
          color: "#333"
        }
      },
      itemStyle: {
        // 图形上的地图区域
        normal: {
          borderColor: "rgba(0,0,0,0.2)",
          areaColor: "#005dff"
        }
      }
    }],
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      feature: {
        dataView: {
          readOnly: false
        },
        restore: {},
        saveAsImage: {}
      }
    },
    visualMap: {
      type: "piecewise",
      splitNumber: 5,
      pieces: [{
        min: 1000,
        label: ">1000"
      }, // 不指定 max，表示 max 为无限大（Infinity）。
      {
        min: 100,
        max: 999,
        label: "100-999"
      },
      {
        min: 10,
        max: 99,
        label: "10-99"
      },
      {
        min: 1,
        max: 9,
        label: "1-9"
      }, // 表示 value 等于 123 的情况。
      {
        value: 0,
        label: "0"
      } // 不指定 min，表示 min 为无限大（-Infinity）。
      ],
      textStyle: {
        fontSize: 10
      },
      realtime: false,
      calculable: false,
      inRange: {
        color: ['lightskyblue', 'yellow', 'orangered'],
      },
      orient: "horizontal",
      bottom: 10,
      left: 50,
      itemHeight: 10,
      itemWidth: 10,
    },
    series: [{
      type: 'map',
      mapType: 'china',
      geoIndex: 0,
      roam: false, // 鼠标是否可以缩放
      label: {
        normal: {
          show: true
        },
        emphasis: {
          show: true
        }
      },
      data: mapDate
    }]
  };
  return option;
}
/**
 * 柱状图
 */
function initChartBar(canvas, width, height) {

  ChartBar = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(ChartBar);
  
  ChartBar.setOption(getBarOption());
  return ChartBar;
}

function getBarOption() {
  var option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '4%',
      top: 0,
      // right: '4%',
      bottom: '0',
      containLabel: true
    },

    xAxis: {
      type: 'value',
      splitArea: {
        show: false
      },
      name: "人",
      nameGap: 5,
      nameLocation: "end",
      min: 0,
      max: 2000,

    },

    yAxis: {
      type: 'category',
      data: nameList,
      silent: false,
      splitLine: {
        show: false
      },
      splitArea: {
        show: false
      }
    },
    series: [{
      type: 'bar',
      data: valueList,
      // Set `large` for large data amount
      large: true
    }]
  };
  return option;
  
 
}