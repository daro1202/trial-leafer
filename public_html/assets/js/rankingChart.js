import utils from '../../../src/js/utils.js';
import { getPosition, echartSetOption, tooltipFormatter } from '../../../src/js/charts/echarts/echarts-utils.js';
var url = "../admin/api/v1/keepaProduct/";

var _window3 = window,
    dayjs = _window3.dayjs;

var rankingDynamicLineChartInit = function rankingDynamicLineChartInit(period) {
  var $dynamicLineChartEl = document.querySelector('.echart-dynamic-line-chart-ranking');

  if ($dynamicLineChartEl) {
    //指定された期間
    if(period === "" || period === undefined || period === null) {
        let period = 3;
    }

    // Get options from data attribute
    var userOptions = utils.getData($dynamicLineChartEl, 'options');
    var chart = window.echarts.init($dynamicLineChartEl);

    //横軸。新品の日付で揃える
    let now = new Date();
    now = now.setMonth(now.getMonth() - Number(period));
    let nowStopDate = new Date(now);
    nowStopDate = (nowStopDate.getTime() / 60000) - 21564000;

    var days = [];
    $.each(jsonResult.csv[3], function(key, value) {
      if(key % 2 === 0 || String(key) === "0") {
        if(value < nowStopDate) {
          return true;
        }

        //日付をyy/mm/ddに変換する
        let keeperTimeStamp = 60000 * (value + 21564000);
        let dateTime = new Date(keeperTimeStamp);
        let obtainDate = dateTime.getFullYear().toString().slice(2) + "/" + (dateTime.getMonth() + 1).toString().padStart(2, '0') + "/" + dateTime.getDate().toString().padStart(2, '0');

        days.push(obtainDate);
      }
    });

    let colorSuccess = [];
    let noloop = false;
    $.each(jsonResult.csv[3], function(key, value) {
      if(key % 2 === 0 || String(key) === "0") {
        if(value < nowStopDate) {
          noloop = true;
          return true;
        } else {
          noloop = false;
        }
      }

      if (key % 2 !== 0 || String(key) === "1") {
        if(noloop === false && value !== -1) {
          colorSuccess.push(value);
        } else if (noloop === true && value === -1) {
          colorSuccess.push(0);
        }
      }
    });

    var getDefaultOptions = function getDefaultOptions() {
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            animation: false
          },
          padding: [7, 10],
          backgroundColor: utils.getGrays()['100'],
          borderColor: utils.getGrays()['300'],
          textStyle: {
            color: utils.getColors().dark
          },
          borderWidth: 1,
          transitionDuration: 0,
          formatter: tooltipFormatter
        },
        xAxis: {
          type: 'category',
          data: days,
          splitLine: {
            show: false
          },
          axisLabel: {
            color: utils.getGrays()['500']
          },
          axisLine: {
            lineStyle: {
              color: utils.getGrays()['300']
            }
          },
          axisPointer: {
            lineStyle: {
              color: utils.getGrays()['300']
            }
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
          }
        },
        series: {
          areaStyle: {
            color: utils.rgbaColor(utils.getColor('info'), 0.3)
          },
          name: 'ランキング',
          type: 'line',
          showSymbol: false,
          hoverAnimation: false,
          data: colorSuccess,
          lineStyle: {
            color: utils.getColor('primary')
          },
          itemStyle: {
            color: utils.getGrays().white,
            borderColor: utils.getColor('primary'),
            borderWidth: 2
          },
          symbol: 'circle',
          symbolSize: 10
        },
        grid: {
          right: '3%',
          left: '8%',
          bottom: '10%',
          top: '5%'
        }
      };
    };
    echartSetOption(chart, userOptions, getDefaultOptions);
  };
};

docReady(rankingDynamicLineChartInit(3));
export default rankingDynamicLineChartInit;
