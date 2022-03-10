import utils from '../../../src/js/utils.js';
import { getPosition, echartSetOption, tooltipFormatter } from '../../../src/js/charts/echarts/echarts-utils.js';
var url = "../admin/api/v1/keepaProduct/";

var _window3 = window,
    dayjs = _window3.dayjs;

var echartsStepLineChartInit = function echartsStepLineChartInit(period) {
  var $stepLineChartLowestPrice = document.querySelector('.step-line-chart-lowestPrice');
  if ($stepLineChartLowestPrice) {

    //指定された期間
    if(period === "" || period === undefined || period === null) {
      let period = 3;
    }

    // Get options from data attribute
    var userOptions = utils.getData($stepLineChartLowestPrice, 'options');
    var chart = window.echarts.init($stepLineChartLowestPrice);

    //横軸。最安値(AMAZON)の日付で揃える
    let now = new Date();
    now = now.setMonth(now.getMonth() - Number(period));
    let nowStopDate = new Date(now);
    nowStopDate = (nowStopDate.getTime() / 60000) - 21564000;

    var days = [];
    $.each(jsonResult.csv[0], function(key, value) {
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

    //new
    $.each(jsonResult.csv[1], function(key, value) {
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

    //old used
    $.each(jsonResult.csv[2], function(key, value) {
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

    //各種dataに渡すデータを作成
    // color: danger    => カート価格 -> BUY_BOX_SHIPPING
    // color: warning   => 新品最安値
    // color: primary   => 中古最安値
    // color: success   => アマゾン本体最安値
    let colorDangerTwoD   = {};
    let colorWarningTwoD  = {};
    let colorPrimaryTwoD  = {};
    let colorSuccessTwoD  = {};

    let loopthrough = false;
    let date;
    for (let csvI = 0; csvI < 3; csvI++) {
      loopthrough = false;
      $.each(jsonResult.csv[csvI], function(key, value) {
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
            switch (csvI) {
              case 0:
                colorSuccessTwoD[date] = value;
                break;
              case 1:
                colorWarningTwoD[date] = value;
                break;
              case 2:
                colorPrimaryTwoD[date] = value;
                break;
            }
          } else if (loopthrough !== "skip") {
            switch (csvI) {
              case 0:
                colorSuccessTwoD[date] = 0;
                break;
              case 1:
                colorWarningTwoD[date] = 0;
                break;
              case 2:
                colorPrimaryTwoD[date] = 0;
                break;
            }
          }
        }
      });
    }

    //カート情報
    loopthrough = false;
    $.each(jsonResult.csv[18], function(key, value) {
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
          colorDangerTwoD[date] = value;
        } else if (loopthrough !== "skip") {
          colorSuccessTwoD[date] = 0;
        }
      }
    });

    // color: danger    => カート価格 -> BUY_BOX_SHIPPING
    // color: warning   => 新品最安値
    // color: primary   => 中古最安値
    // color: success   => アマゾン本体最安値
    let colorDanger  = [];
    let colorWarning = [];
    let colorPrimary = [];
    let colorSuccess = [];

    $.each(days, function(key, value) {
      if(colorDangerTwoD[value] === undefined) {
        colorDanger.push(0);
      } else {
        colorDanger.push(colorDangerTwoD[value]);
      }

      if(colorWarningTwoD[value] === undefined) {
        colorWarning.push(0);
      } else {
        colorWarning.push(colorWarningTwoD[value]);
      }

      if(colorPrimaryTwoD[value] === undefined) {
        colorPrimary.push(0);
      } else {
        colorPrimary.push(colorPrimaryTwoD[value]);
      }

      if(colorSuccessTwoD[value] === undefined) {
        colorSuccess.push(0);
      } else {
        colorSuccess.push(colorSuccessTwoD[value]);
      }
    });

    //グラフ
    var getDefaultOptions = () => ({
      color: [utils.getColor('danger'), utils.getColor('warning'), utils.getColor('primary'), utils.getColor('success')],

      tooltip: {
        trigger:            'axis',
        padding:            [7, 10],
        backgroundColor:    utils.getGrays()['100'],
        borderColor:        utils.getGrays()['300'],
        textStyle: { color: utils.getColors().dark },
        borderWidth:        1,
        transitionDuration: 0,
        formatter:          tooltipFormatter,
        position(pos, params, dom, rect, size) {
          return getPosition(pos, params, dom, rect, size);
        }
      },

      xAxis: {
        type: 'category',
        data: days,
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: utils.getGrays()['300'],
            type: "dashed"
          }
        },
        axisTick: { show: false },
        axisLabel: {
          color: utils.getGrays()['400'],
          formatter: function formatter(value) {
            return value;
          },
          margin: 15
        },
        splitLine: {
          show: false
        },
        axisPointer: {
          lineStyle: {
            color: utils.getGrays()['300']
          }
        }
      },
      yAxis: {
        type: 'value',
        splitNumber: 3,
        axisPointer: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: utils.getGrays()['200'],
            type: "dashed"
          }
        },
        boundaryGap: false,
        axisLabel: {
          show: true,
          color: utils.getGrays()['400'],
          formatter: function formatter(value) {
            return value;
          },
          margin: 15
        },
        axisTick: { show: false },
        axisLine: { show: false }
      },
      // color: danger    => カート価格 -> BUY_BOX_SHIPPING
      // color: warning   => 新品最安値
      // color: primary   => 中古最安値
      // color: success   => アマゾン本体価格
      series: [
        {
          name: 'カート価格',
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
          data: colorDanger
        },
        {
          name: '新品最安値',
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
          data: colorWarning
        },
        {
          name: '中古最安値',
          type: 'line',
          symbolSize: 10,
          itemStyle: {
            color: utils.getGrays().white,
            borderColor: utils.getColor('danger'),
            borderWidth: 2
          },
          lineStyle: {
            color: utils.getColor('danger')
          },
          symbol: 'circle',
          data: colorPrimary
        },
        {
          name: 'アマゾン本体価格',
          type: 'line',
          symbolSize: 10,
          itemStyle: {
            color: utils.getGrays().white,
            borderColor: utils.getColor('danger'),
            borderWidth: 2
          },
          lineStyle: {
            color: utils.getColor('danger')
          },
          symbol: 'circle',
          data: colorSuccess
        }
      ],
      grid: { right: '3%', left: '8%', bottom: '10%', top: '5%' }
    });

    //グラフを書き出す
    echartSetOption(chart, userOptions, getDefaultOptions);
  }
};

docReady(echartsStepLineChartInit(3));
export default echartsStepLineChartInit;
