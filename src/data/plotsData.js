/**
 * White Wolf Infra & Osiyan Habitat
 * Complete Plot Inventory Database (94 Plots)
 * Source: Verified project spreadsheet data (full table)
 */
export const PLOTS_DATA = Array.from({ length: 94 }, (_, i) => {
  const plotNo = i + 1;
  let data = {};
  if (plotNo === 1) {
    data = {
      widthMt: 12.533,
      lengthMt: 17,
      sqMtr: 139.112,
      widthFt: 41.12,
      lengthFt: 55.77,
      sqYd: 166.378,
      facing: "North East",
      plc: "7%",
    };
  } else if (plotNo >= 2 && plotNo <= 8) {
    data = {
      widthMt: 6,
      lengthMt: 17,
      sqMtr: 102,
      widthFt: 19.69,
      lengthFt: 55.77,
      sqYd: 121.992,
      facing: "North East",
      plc: "7%",
    };
  } else if (plotNo === 9) {
    data = {
      widthMt: 7.42,
      lengthMt: 17,
      sqMtr: 126.285,
      widthFt: 24.34,
      lengthFt: 55.77,
      sqYd: 151.037,
      facing: "NE Corner",
      plc: "10%",
    };
  } else if (plotNo >= 10 && plotNo <= 20) {
    data = {
      widthMt: 6.572,
      lengthMt: 17.082,
      sqMtr: 112.263,
      widthFt: 21.56,
      lengthFt: 56.04,
      sqYd: 134.267,
      facing: "South East",
      plc: "5%",
    };
  } else if (plotNo === 21) {
    data = {
      widthMt: 9.14,
      lengthMt: 15.24,
      sqMtr: 104.304,
      widthFt: 29.99,
      lengthFt: 50,
      sqYd: 124.748,
      facing: "South East",
      plc: "5%",
    };
  } else if (plotNo === 22) {
    data = {
      widthMt: 9.14,
      lengthMt: 15.24,
      sqMtr: 88.366,
      widthFt: 29.99,
      lengthFt: 50,
      sqYd: 105.686,
      facing: "South East",
      plc: "5%",
    };
  } else if (plotNo === 23) {
    data = {
      widthMt: 6.228,
      lengthMt: 17,
      sqMtr: 105.876,
      widthFt: 20.43,
      lengthFt: 55.77,
      sqYd: 126.628,
      facing: "North",
      plc: "5%",
    };
  } else if (plotNo >= 24 && plotNo <= 32) {
    data = {
      widthMt: 6.2,
      lengthMt: 17,
      sqMtr: 105.4,
      widthFt: 20.34,
      lengthFt: 55.77,
      sqYd: 126.058,
      facing: "North",
      plc: "5%",
    };
  } else if (plotNo === 33) {
    data = {
      widthMt: 6.275,
      lengthMt: 19.352,
      sqMtr: 121.434,
      widthFt: 20.59,
      lengthFt: 63.49,
      sqYd: 145.235,
      facing: "SE Corner",
      plc: "7%",
    };
  } else if (plotNo >= 34 && plotNo <= 48) {
    data = {
      widthMt: 6.275,
      lengthMt: 19.352,
      sqMtr: 121.434,
      widthFt: 20.59,
      lengthFt: 63.49,
      sqYd: 145.235,
      facing: "East",
      plc: "5%",
    };
  } else if (plotNo === 49) {
    data = {
      widthMt: 6.275,
      lengthMt: 19.352,
      sqMtr: 121.434,
      widthFt: 20.59,
      lengthFt: 63.49,
      sqYd: 145.235,
      facing: "NE Corner",
      plc: "10%",
    };
  } else if (plotNo === 50) {
    data = {
      widthMt: 6.275,
      lengthMt: 19.352,
      sqMtr: 121.434,
      widthFt: 20.59,
      lengthFt: 63.49,
      sqYd: 145.235,
      facing: "NW Corner",
      plc: "5%",
    };
  } else if (plotNo >= 51 && plotNo <= 65) {
    data = {
      widthMt: 6.275,
      lengthMt: 19.352,
      sqMtr: 121.434,
      widthFt: 20.59,
      lengthFt: 63.49,
      sqYd: 145.235,
      facing: "West",
      plc: "-",
    };
  } else if (plotNo === 66) {
    data = {
      widthMt: 6.275,
      lengthMt: 19.352,
      sqMtr: 121.434,
      widthFt: 20.59,
      lengthFt: 63.49,
      sqYd: 145.235,
      facing: "SW Corner",
      plc: "5%",
    };
  } else if (plotNo === 67) {
    data = {
      widthMt: 6.275,
      lengthMt: 19.352,
      sqMtr: 121.434,
      widthFt: 20.59,
      lengthFt: 63.49,
      sqYd: 145.235,
      facing: "SE Corner",
      plc: "7%",
    };
  } else if (plotNo >= 68 && plotNo <= 82) {
    data = {
      widthMt: 6.275,
      lengthMt: 19.352,
      sqMtr: 121.434,
      widthFt: 20.59,
      lengthFt: 63.49,
      sqYd: 145.235,
      facing: "East",
      plc: "5%",
    };
  } else if (plotNo === 83) {
    data = {
      widthMt: 6.275,
      lengthMt: 19.352,
      sqMtr: 121.434,
      widthFt: 20.59,
      lengthFt: 63.49,
      sqYd: 145.235,
      facing: "NE Corner",
      plc: "10%",
    };
  } else if (plotNo === 84) {
    data = {
      widthMt: 6.095,
      lengthMt: 21.175,
      sqMtr: 129.061,
      widthFt: 20,
      lengthFt: 69.47,
      sqYd: 154.357,
      facing: "NE Corner",
      plc: "10%",
    };
  } else if (plotNo >= 85 && plotNo <= 93) {
    data = {
      widthMt: 6.095,
      lengthMt: 21.175,
      sqMtr: 129.061,
      widthFt: 20,
      lengthFt: 69.47,
      sqYd: 154.357,
      facing: "North",
      plc: "5%",
    };
  } else if (plotNo === 94) {
    data = {
      widthMt: 6.095,
      lengthMt: 21.175,
      sqMtr: 129.061,
      widthFt: 20,
      lengthFt: 69.47,
      sqYd: 154.357,
      facing: "NW Corner",
      plc: "5%",
    };
  }
  return {
    plotNo,
    ...data,
  };
});