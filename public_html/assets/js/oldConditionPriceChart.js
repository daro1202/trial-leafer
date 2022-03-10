import utils from '../../../src/js/utils.js';
import { getPosition, echartSetOption, tooltipFormatter } from '../../../src/js/charts/echarts/echarts-utils.js';
var url = "../admin/api/v1/keepaProduct/";

var _window3 = window,
    dayjs = _window3.dayjs;

var oldConditionPriceStackedLineChartInit = function oldConditionPriceStackedLineChartInit(period) {
  var $stackedLineChartEl = document.querySelector('.echart-stacked-line-chart-oldConditionPrice');

  if ($stackedLineChartEl) {
    //指定された期間
    if(period === "" || period === undefined || period === null) {
        let period = 3;
    }

    // Get options from data attribute
    var userOptions = utils.getData($stackedLineChartEl, 'options');
    var chart = window.echarts.init($stackedLineChartEl);

    //横軸。ほぼ新品の日付で揃える
    let now = new Date();
    now = now.setMonth(now.getMonth() - Number(period));
    let nowStopDate = new Date(now);
    nowStopDate = (nowStopDate.getTime() / 60000) - 21564000;

    var days = [];
    $.each(jsonResult.csv[19], function(key, value) {
      if(key % 3 === 0 || String(key) === "0") {
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

    //各種dataに渡すデータを作成
    // color: danger    => ほぼ新品
    // color: warning   => 非常に良い
    // color: primary   => 良い
    // color: success   => 可
    let colorDanger  = [];
    let colorWarning = [];
    let colorPrimary = [];
    let colorSuccess = [];

    let loopthrough = false;
    for (let csvI = 19; csvI < 23; csvI++) {
      loopthrough = false;
      let i = 1;
      $.each(jsonResult.csv[csvI], function(key, value) {
        if(key % 3 === 0 || String(key) === "0") {
          //日付をyy/mm/ddに変換する
          let keeperTimeStampValue = 60000 * (value + 21564000);
          let dateTimeValue = new Date(keeperTimeStampValue);
          let obtainDateValue = dateTimeValue.getFullYear().toString().slice(2) + "/" + (dateTimeValue.getMonth() + 1).toString().padStart(2, '0') + "/" + dateTimeValue.getDate().toString().padStart(2, '0');

          if(days.includes(obtainDateValue)) {
            loopthrough = true;
          } else {
            loopthrough = false;
          }
        }

        if (key === i) {
          if(loopthrough === true && value !== -1) {
            switch (csvI) {
              case 19:
                colorDanger.push(value);
                break;
              case 20:
                colorWarning.push(value);
                break;
              case 21:
                colorPrimary.push(value);
                break;
              case 22:
                colorSuccess.push(value);
                break;
            }
          }

          i = key + 3;

        }
      });
    }

    var getDefaultOptions = () => ({
      color: [utils.getColor('danger'), utils.getColor('warning'), utils.getColor('primary'), utils.getColor('success')],

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
            color: utils.getGrays()['200'],
            type: 'dashed'
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
      series: [
        {
          name: 'ほぼ新品',
          type: 'line',
          symbolSize: 6,
          itemStyle: {
            color: utils.getGrays().white,
            borderColor: utils.getColor('danger'),
            borderWidth: 2
          },
          lineStyle: {
            color: utils.getColor('danger')
          },
          symbol: 'circle',
          stack: 'product',
          data: colorDanger
        }, {
          name: '非常に良い',
          type: 'line',
          symbolSize: 10,
          itemStyle: {
            color: utils.getGrays().white,
            borderColor: utils.getColor('warning'),
            borderWidth: 2
          },
          lineStyle: {
            color: utils.getColor('warning')
          },
          symbol: 'circle',
          stack: 'product',
          data: colorWarning
        }, {
          name: '良い',
          type: 'line',
          symbolSize: 10,
          itemStyle: {
            color: utils.getGrays().white,
            borderColor: utils.getColor('primary'),
            borderWidth: 2
          },
          lineStyle: {
            color: utils.getColor('primary')
          },
          symbol: 'circle',
          stack: 'product',
          data: colorPrimary
        }, {
          name: '可',
          type: 'line',
          symbolSize: 10,
          itemStyle: {
            color: utils.getGrays().white,
            borderColor: utils.getColor('success'),
            borderWidth: 2
          },
          lineStyle: {
            color: utils.getColor('success')
          },
          symbol: 'circle',
          stack: 'product',
          data: colorSuccess
        }
      ],
      grid: {
        right: 10,
        left: 5,
        bottom: 5,
        top: 8,
        containLabel: true
      }
    });

    echartSetOption(chart, userOptions, getDefaultOptions);
  }
}

docReady(oldConditionPriceStackedLineChartInit(3));
export default oldConditionPriceStackedLineChartInit;
