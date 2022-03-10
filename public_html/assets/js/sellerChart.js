import utils from '../../../src/js/utils.js';
import { getPosition, echartSetOption, tooltipFormatter } from '../../../src/js/charts/echarts/echarts-utils.js';
var url = "../admin/api/v1/keepaProduct/";

var _window3 = window,
    dayjs = _window3.dayjs;

var sellerStackedAreaChartInit = function sellerStackedAreaChartInit(period) {
  var $stackedAreaChartEl = document.querySelector('.echart-stacked-area-chart-seller');

  if ($stackedAreaChartEl) {
    //指定された期間
    if(period === "" || period === undefined || period === null) {
        let period = 3;
    }

    // Get options from data attribute
    var userOptions = utils.getData($stackedAreaChartEl, 'options');
    var chart = window.echarts.init($stackedAreaChartEl);

    //横軸。新品の日付
    let now = new Date();
    now = now.setMonth(now.getMonth() - Number(period));
    let nowStopDate = new Date(now);
    nowStopDate = (nowStopDate.getTime() / 60000) - 21564000;

    var days = [];
    $.each(jsonResult.csv[11], function(key, value) {
      if(key % 2 === 0 || String(key) === "0") {
        if(value < nowStopDate) {
          return true;
        }

        //日付をyy/mm/ddに変換する
        let keeperTimeStamp = 60000 * (value + 21564000);
        let dateTime = new Date(keeperTimeStamp);
        let obtainDate = dateTime.getFullYear().toString().slice(2) + "/" + (dateTime.getMonth() + 1).toString().padStart(2, '0') + "/" + dateTime.getDate().toString().padStart(2, '0');

        if(days.includes(obtainDate)) {
          return true;
        }

        days.push(obtainDate);
      }
    });

    //横軸。新品の日付を追加
    $.each(jsonResult.csv[12], function(key, value) {
      if(key % 2 === 0 || String(key) === "0") {
        if(value < nowStopDate) {
          return true;
        }

        //日付をyy/mm/ddに変換する
        let keeperTimeStamp = 60000 * (value + 21564000);
        let dateTime = new Date(keeperTimeStamp);
        let obtainDate = dateTime.getFullYear().toString().slice(2) + "/" + (dateTime.getMonth() + 1).toString().padStart(2, '0') + "/" + dateTime.getDate().toString().padStart(2, '0');

        if(days.includes(obtainDate)) {
          return true;
        }

        days.push(obtainDate);
      }
    });

    //日付をソート
    days.sort(function(a, b){
    	return (a > b ? 1 : -1);
    });

    // color: info   => 新品出品
    // color: success   => 中古出品
    let colorInfoTwoD    = {};
    let colorSuccessTwoD = {};

    //新品出品
    let loopthrough = false;
    let date;
    $.each(jsonResult.csv[11], function(key, value) {
      if(key % 2 === 0 || String(key) === "0") {
        if(value < nowStopDate) {
          loopthrough = "skip";
          return true;
        }

        //日付をyy/mm/ddに変換する
        let keeperTimeStampValue = 60000 * (value + 21564000);
        let dateTimeValue = new Date(keeperTimeStampValue);
        let obtainDateValue = dateTimeValue.getFullYear().toString().slice(2) + "/" + (dateTimeValue.getMonth() + 1).toString().padStart(2, '0') + "/" + dateTimeValue.getDate().toString().padStart(2, '0');

        if(days.includes(obtainDateValue)) {
          loopthrough = true;
        } else {
          loopthrough = false;
        }
        date = obtainDateValue;
      }

      if (key % 2 !== 0 || String(key) === "1") {
        if(loopthrough === true && value !== -1) {
          colorInfoTwoD[date] = value;
        } else if (loopthrough !== "skip") {
          colorSuccessTwoD[date] = 0;
        }
      }
    });

    //中古出品
    loopthrough = false;
    date = "";
    $.each(jsonResult.csv[12], function(key, value) {
      if(key % 2 === 0 || String(key) === "0") {
        if(value < nowStopDate) {
          loopthrough = "skip";
          return true;
        }

        //日付をyy/mm/ddに変換する
        let keeperTimeStampValue = 60000 * (value + 21564000);
        let dateTimeValue = new Date(keeperTimeStampValue);
        let obtainDateValue = dateTimeValue.getFullYear().toString().slice(2) + "/" + (dateTimeValue.getMonth() + 1).toString().padStart(2, '0') + "/" + dateTimeValue.getDate().toString().padStart(2, '0');

        if(days.includes(obtainDateValue)) {
          loopthrough = true;
        } else {
          loopthrough = false;
        }
        date = obtainDateValue;
      }

      if (key % 2 !== 0 || String(key) === "1") {
        if(loopthrough === true && value !== -1) {
          colorSuccessTwoD[date] = value;
        } else if (loopthrough !== "skip") {
          colorSuccessTwoD[date] = 0;
        }
      }
    });

    // color: info   => 新品出品
    // color: success   => 中古出品
    let colorInfo    = [];
    let colorSuccess = [];

    //中古
    $.each(days, function(key, value) {
      if(colorInfoTwoD[value] === undefined) {
        colorInfo.push(0);
      } else {
        colorInfo.push(colorInfoTwoD[value]);
      }

      if(colorSuccessTwoD[value] === undefined) {
        colorSuccess.push(0);
      } else {
        colorSuccess.push(colorSuccessTwoD[value]);
      }
    });

    var getDefaultOptions = function getDefaultOptions() {
      return {
        tooltip: {
          trigger: 'axis',
          padding: [7, 10],
          backgroundColor: utils.getGrays()['100'],
          borderColor: utils.getGrays()['300'],
          textStyle: {
            color: utils.getColors().dark
          },
          borderWidth: 1,
          transitionDuration: 0,
          position: function position(pos, params, dom, rect, size) {
            return getPosition(pos, params, dom, rect, size);
          },
          axisPointer: {
            type: 'none'
          },
          formatter: tooltipFormatter
        },
        xAxis: {
          type: 'category',
          data: days,
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: utils.getGrays()['300'],
              type: 'solid'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: utils.getGrays()['400'],
            margin: 15,
            formatter: function formatter(value) {
              return value;
            }
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              color: utils.getGrays()['200']
            }
          },
          boundaryGap: false,
          axisLabel: {
            show: true,
            color: utils.getGrays()['400'],
            margin: 15
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          ticks:{
          max:2000,
          min:0,
        }
        },
        series: [{
          name: '新品出品者数',
          type: 'line',
          symbolSize: 10,
          stack: 'product',
          data: colorInfo,
          areaStyle: {
            color: utils.rgbaColor(utils.getColor('info'), 0.3)
          },
          itemStyle: {
            color: utils.getGrays().white,
            borderColor: utils.getColor('info'),
            borderWidth: 2
          },
          lineStyle: {
            color: utils.getColor('info')
          },
          symbol: 'circle'
        }, {
          name: '中古出品者数',
          type: 'line',
          symbolSize: 10,
          stack: 'product',
          data: colorSuccess,
          areaStyle: {
            color: utils.rgbaColor(utils.getColor('success'), 0.3)
          },
          itemStyle: {
            color: utils.getGrays().white,
            borderColor: utils.getColor('success'),
            borderWidth: 2
          },
          lineStyle: {
            color: utils.getColor('success')
          },
          symbol: 'circle'
        }],
        grid: {
          right: 10,
          left: 5,
          bottom: 5,
          top: 8,
          containLabel: true
        }
      };
    };

    echartSetOption(chart, userOptions, getDefaultOptions);
  };
};

docReady(sellerStackedAreaChartInit(3));
export default sellerStackedAreaChartInit;
