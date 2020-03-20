const app = getApp()
import * as echarts from '../../lib/ec-canvas/echarts.js';
var ChartLine = null;
var useOneYearList = [];
var useFiveYearList = [];

Page({
  data: {

    isShow: false, //LPR解释框

    ec: {
      onInit: initLineChart
    },
    timeYears: [{
      id: 1,
      year: Number(new Date().getFullYear()) - 1,
      selected: true,
      oneRetList: [null, null, null, null, null, null, null, 4.25, 4.2, 4.2, 4.15,4.15],
      fiveRetList: [null, null, null, null, null, null, null, 4.85, 4.85, 4.85, 4.8,4.8],
    },
      {
        id: 2,
        year: Number(new Date().getFullYear()),
        selected: false,
        oneRetList: [4.8, 4.75],
        fiveRetList: [4.15, 4.05],
      }
    ]
  },
  onLoad: function(e) {

  },



  //弹框
  onDetaliClick: function() {
    this.setData({
      isShow: true
    })
    this.onDaiLogYearsClick();
  },
  onDetaliCloseClick: function() {
    this.setData({
      isShow: false
    })
  },
  onDaiLogYearsClick: function(e) {
    var id = e ? e.currentTarget.dataset.id : 2;
    var list = this.data.timeYears;
    console.log(list);
    for (var i = 0; i < list.length; i++) {
      list[i].selected = false;
      if (id == list[i].id) {
        list[i].selected = true;
        useOneYearList = list[i].oneRetList;
        useFiveYearList = list[i].fiveRetList;
      }
    }
    this.setData({
      timeYears: list
    })

    setTimeout(() => {
      getOption();
    }, 200);
  },

  catchtouchmove: function() {

  },

})

function initLineChart(canvas, width, height,dpr) {
  ChartLine = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // 像素
  });
  canvas.setChart(ChartLine);
  getOption();
  return ChartLine;
}

function getOption() {
  var option = {
    color: ["#FA46A4", "#438fe5"],
    legend: {
      data: ['1年', '5年'],
      top: 0,
      left: 'center',
      backgroundColor: '#fff',
    },
    grid: {
      containLabel: true,
      width: '80%',
      height: '80%',
      left: '8%',
      bottom: '0',
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      formatter: function(params) {
        var res = "";
        for (var i = 0; i < params.length; i++) {
          if (params[i].value == undefined) {
            return "";
          }
          res += params[i].seriesName + ' : ' + params[i].value + '%';
          if (i == 0 && params.length > 1) {
            res += "\n"
          }
        }
        return res;
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      splitNumber: 1,
      name: "月",
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dotted'
        },
        // interval: 0.25
      },
      axisLabel: {
        show: true,
        interval: 0,
        showMinLabel: true,
        fontSize: 10,
      }
      // show: false
    },
    yAxis: {

      x: 'center',
      type: 'value',
      min: 4,
      max: 5,
      name: "%",
      nameGap: 5,
      nameLocation: "end",
      splitNumber: 2,
      axisTick: {
        show: false
      },

      axisLine: {
        onZero: false,
      },
      splitLine: {
        lineStyle: {
          type: 'dotted'
        },
        show: true
      },

    },
    series: [{
      name: '5年',
      type: 'line',
      smooth: true,
      data: useFiveYearList
    }, {
      name: '1年',
      type: 'line',
      smooth: true,
      data: useOneYearList
    }],
    animation: true,
  };
  ChartLine.setOption(option);
}