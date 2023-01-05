import React, { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { defaultTheme, getThemeValue } from "../utils/themes";
export const Logo = ({
  color = "#000",
  className
}) => {
  return /*#__PURE__*/React.createElement("svg", {
    width: "85",
    height: "30",
    viewBox: "0 0 85 30",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: className
  }, /*#__PURE__*/React.createElement("path", {
    d: "M40.585 16.5286C40.585 17.5495 40.4368 18.4799 40.1404 19.3197C39.844 20.1595 39.4241 20.8758 38.8807 21.4686C38.3373 22.0614 37.6786 22.5225 36.9047 22.8518C36.1472 23.1811 35.3074 23.3458 34.3853 23.3458C33.4632 23.3458 32.6234 23.1811 31.8659 22.8518C31.1084 22.5225 30.458 22.0614 29.9146 21.4686C29.3712 20.8758 28.9431 20.1595 28.6302 19.3197C28.3338 18.4799 28.1856 17.5495 28.1856 16.5286C28.1856 15.5077 28.3338 14.5855 28.6302 13.7622C28.9431 12.9224 29.3712 12.2061 29.9146 11.6133C30.4745 11.0205 31.1331 10.5677 31.8906 10.2548C32.6481 9.92547 33.4796 9.7608 34.3853 9.7608C35.291 9.7608 36.1225 9.92547 36.88 10.2548C37.6539 10.5677 38.3126 11.0205 38.856 11.6133C39.3994 12.2061 39.8193 12.9224 40.1157 13.7622C40.4286 14.5855 40.585 15.5077 40.585 16.5286ZM37.5222 16.5286C37.5222 15.2442 37.2423 14.2315 36.6824 13.4905C36.139 12.733 35.3733 12.3543 34.3853 12.3543C33.3973 12.3543 32.6234 12.733 32.0635 13.4905C31.5201 14.2315 31.2484 15.2442 31.2484 16.5286C31.2484 17.8295 31.5201 18.8586 32.0635 19.6161C32.6234 20.3736 33.3973 20.7523 34.3853 20.7523C35.3733 20.7523 36.139 20.3736 36.6824 19.6161C37.2423 18.8586 37.5222 17.8295 37.5222 16.5286ZM51.0246 12.7742C50.7776 12.6919 50.4318 12.6095 49.9872 12.5272C49.5591 12.4284 49.0568 12.379 48.4805 12.379C48.1512 12.379 47.7971 12.4119 47.4184 12.4778C47.0561 12.5437 46.8009 12.6013 46.6527 12.6507V23H43.664V10.6994C44.2403 10.4853 44.9566 10.2877 45.8129 10.1066C46.6856 9.909 47.6489 9.8102 48.7028 9.8102C48.9004 9.8102 49.1309 9.82667 49.3944 9.8596C49.6579 9.87607 49.9213 9.909 50.1848 9.9584C50.4483 9.99133 50.7035 10.0407 50.9505 10.1066C51.1975 10.156 51.3951 10.2054 51.5433 10.2548L51.0246 12.7742ZM62.1969 16.5039C62.1969 15.236 61.9417 14.2315 61.4312 13.4905C60.9372 12.7495 60.1468 12.379 59.06 12.379C58.566 12.379 58.0967 12.4531 57.6521 12.6013C57.224 12.7495 56.8782 12.9142 56.6147 13.0953V20.53C56.8288 20.5794 57.1005 20.6288 57.4298 20.6782C57.7756 20.7111 58.1873 20.7276 58.6648 20.7276C59.7681 20.7276 60.6326 20.3571 61.2583 19.6161C61.8841 18.8586 62.1969 17.8212 62.1969 16.5039ZM65.2597 16.5533C65.2597 17.5907 65.1033 18.5293 64.7904 19.3691C64.494 20.1924 64.0577 20.9005 63.4813 21.4933C62.9215 22.0861 62.2381 22.5389 61.4312 22.8518C60.6244 23.1647 59.7105 23.3211 58.6895 23.3211C57.7015 23.3211 56.7547 23.247 55.849 23.0988C54.9598 22.9506 54.2188 22.7859 53.626 22.6048V4.3268L56.6147 3.8328V10.5265C56.9605 10.3454 57.3804 10.1807 57.8744 10.0325C58.3849 9.8843 58.9448 9.8102 59.554 9.8102C60.4597 9.8102 61.2666 9.97487 61.9746 10.3042C62.6992 10.6171 63.3002 11.0699 63.7777 11.6627C64.2553 12.2555 64.6175 12.9718 64.8645 13.8116C65.128 14.6349 65.2597 15.5488 65.2597 16.5533ZM71.3533 23H68.3646V10.0819H71.3533V23ZM71.6744 6.3028C71.6744 6.86267 71.4933 7.30727 71.131 7.6366C70.7687 7.96593 70.3406 8.1306 69.8466 8.1306C69.3361 8.1306 68.8998 7.96593 68.5375 7.6366C68.1752 7.30727 67.9941 6.86267 67.9941 6.3028C67.9941 5.72647 68.1752 5.27363 68.5375 4.9443C68.8998 4.61497 69.3361 4.4503 69.8466 4.4503C70.3406 4.4503 70.7687 4.61497 71.131 4.9443C71.4933 5.27363 71.6744 5.72647 71.6744 6.3028ZM78.4019 20.8511C79.1923 20.8511 79.7686 20.7605 80.1309 20.5794C80.4931 20.3818 80.6743 20.0525 80.6743 19.5914C80.6743 19.1633 80.4767 18.8092 80.0815 18.5293C79.7027 18.2494 79.0688 17.9447 78.1796 17.6154C77.6362 17.4178 77.1339 17.212 76.6729 16.9979C76.2283 16.7674 75.8413 16.5039 75.512 16.2075C75.1826 15.9111 74.9192 15.5571 74.7216 15.1454C74.5404 14.7173 74.4499 14.1986 74.4499 13.5893C74.4499 12.4037 74.8862 11.4733 75.759 10.7982C76.6317 10.1066 77.8173 9.7608 79.3158 9.7608C80.0732 9.7608 80.7978 9.8349 81.4894 9.9831C82.181 10.1148 82.6997 10.2466 83.0455 10.3783L82.5021 12.7989C82.1727 12.6507 81.7528 12.519 81.2424 12.4037C80.7319 12.272 80.1391 12.2061 79.464 12.2061C78.8547 12.2061 78.3607 12.3131 77.982 12.5272C77.6032 12.7248 77.4139 13.0377 77.4139 13.4658C77.4139 13.6799 77.4468 13.8692 77.5127 14.0339C77.595 14.1986 77.7267 14.355 77.9079 14.5032C78.089 14.6349 78.3278 14.7749 78.6242 14.9231C78.9206 15.0548 79.2828 15.1948 79.711 15.343C80.419 15.6065 81.0201 15.8699 81.5141 16.1334C82.0081 16.3804 82.4115 16.6686 82.7244 16.9979C83.0537 17.3108 83.2925 17.673 83.4407 18.0847C83.5889 18.4964 83.663 18.9904 83.663 19.5667C83.663 20.8017 83.2019 21.7403 82.2798 22.3825C81.3741 23.0082 80.0732 23.3211 78.3772 23.3211C77.241 23.3211 76.3271 23.2223 75.6355 23.0247C74.9439 22.8436 74.4581 22.6954 74.1782 22.5801L74.6969 20.0854C75.1415 20.2665 75.6684 20.4394 76.2777 20.6041C76.9034 20.7688 77.6115 20.8511 78.4019 20.8511Z",
    fill: color
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "11.5",
    cy: "11.5",
    r: "10.4",
    stroke: color,
    "stroke-width": "2.2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "11.5",
    cy: "22.5",
    r: "6.4",
    stroke: color,
    "stroke-width": "2.2"
  }));
};
export const BoltIcon = ({
  color = "#FFF",
  className
}) => {
  return /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "16",
    viewBox: "0 0 16 18",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: className
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9.98337 0.907179C10.0546 0.574607 9.89318 0.235712 9.59001 0.0815249C9.28684 -0.0726625 8.91787 -0.0035371 8.69108 0.249936L0.191082 9.74994C-0.00614659 9.97037 -0.0553972 10.2861 0.065334 10.5562C0.186065 10.8262 0.454227 11 0.750013 11H7.32227L6.01666 17.0929C5.9454 17.4255 6.10685 17.7644 6.41002 17.9185C6.71318 18.0727 7.08215 18.0036 7.30894 17.7501L15.8089 8.25013C16.0062 8.0297 16.0554 7.71393 15.9347 7.4439C15.814 7.17388 15.5458 7.00003 15.25 7.00003H8.67775L9.98337 0.907179Z",
    fill: color
  }));
};
export const MenuHorizontal = ({
  color = "#FFF",
  className
}) => {
  return /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "3",
    viewBox: "0 0 14 3",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: className
  }, /*#__PURE__*/React.createElement("path", {
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M0.75 1.5C0.75 0.809644 1.30964 0.25 2 0.25C2.69036 0.25 3.25 0.809644 3.25 1.5C3.25 2.19036 2.69036 2.75 2 2.75C1.30964 2.75 0.75 2.19036 0.75 1.5ZM5.75 1.5C5.75 0.809644 6.30964 0.25 7 0.25C7.69036 0.25 8.25 0.809644 8.25 1.5C8.25 2.19036 7.69036 2.75 7 2.75C6.30964 2.75 5.75 2.19036 5.75 1.5ZM10.75 1.5C10.75 0.809644 11.3096 0.25 12 0.25C12.6904 0.25 13.25 0.809644 13.25 1.5C13.25 2.19036 12.6904 2.75 12 2.75C11.3096 2.75 10.75 2.19036 10.75 1.5Z",
    fill: "#798496"
  }));
};
export const CheckIcon = ({
  color = "#0F172A",
  className
}) => {
  return /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "13",
    viewBox: "0 0 16 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: className
  }, /*#__PURE__*/React.createElement("path", {
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M14.7045 1.15347C15.034 1.4045 15.0976 1.87509 14.8466 2.20457L6.84657 12.7046C6.71541 12.8767 6.51627 12.9838 6.30033 12.9983C6.08439 13.0129 5.87271 12.9334 5.71967 12.7804L1.21967 8.28037C0.926777 7.98748 0.926777 7.5126 1.21967 7.21971C1.51256 6.92682 1.98744 6.92682 2.28033 7.21971L6.17351 11.1129L13.6534 1.29551C13.9045 0.966029 14.3751 0.902435 14.7045 1.15347Z",
    fill: color,
    stroke: color,
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }));
};
export const EmptyStateComments = () => {
  const {
    theme
  } = useContext(GlobalContext);
  return /*#__PURE__*/React.createElement("svg", {
    width: "500",
    viewBox: "0 0 522 260",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: "max-w-[65%]"
  }, /*#__PURE__*/React.createElement("g", {
    filter: "url(#filter0_dd_999_7901)"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "18.5",
    y: "7",
    width: "427",
    height: "124",
    rx: "24",
    fill: getThemeValue("bg", theme, "tertiary")
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "80.4999",
    cy: "68.9999",
    r: "17.7778",
    fill: getThemeValue("border", theme, "secondary")
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "80.5",
    cy: "69",
    r: "26.6667",
    stroke: "#B291F4",
    "stroke-width": "6.66667"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "124.5",
    y: "42",
    width: "289",
    height: "18",
    rx: "9",
    fill: getThemeValue("border", theme, "secondary")
  }), /*#__PURE__*/React.createElement("rect", {
    x: "124.5",
    y: "78",
    width: "183",
    height: "18",
    rx: "9",
    fill: getThemeValue("border", theme, "secondary")
  }), /*#__PURE__*/React.createElement("rect", {
    x: "19",
    y: "7.5",
    width: "426",
    height: "123",
    rx: "23.5",
    stroke: getThemeValue("border", theme, "secondary")
  })), /*#__PURE__*/React.createElement("g", {
    filter: "url(#filter1_dd_999_7901)"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "76.5",
    y: "107",
    width: "427",
    height: "124",
    rx: "24",
    fill: getThemeValue("bg", theme, "tertiary")
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "138.5",
    cy: "169",
    r: "17.7778",
    fill: getThemeValue("border", theme, "secondary")
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "138.5",
    cy: "169",
    r: "26.6667",
    stroke: "#4E75F6",
    "stroke-width": "6.66667"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "182.5",
    y: "142",
    width: "289",
    height: "18",
    rx: "9",
    fill: getThemeValue("border", theme, "secondary")
  }), /*#__PURE__*/React.createElement("rect", {
    x: "182.5",
    y: "178",
    width: "183",
    height: "18",
    rx: "9",
    fill: getThemeValue("border", theme, "secondary")
  }), /*#__PURE__*/React.createElement("rect", {
    x: "77",
    y: "107.5",
    width: "426",
    height: "123",
    rx: "23.5",
    stroke: getThemeValue("border", theme, "secondary")
  })), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("filter", {
    id: "filter0_dd_999_7901",
    x: "0.5",
    y: "0",
    width: "463",
    height: "160",
    filterUnits: "userSpaceOnUse",
    "color-interpolation-filters": "sRGB"
  }, /*#__PURE__*/React.createElement("feFlood", {
    "flood-opacity": "0",
    result: "BackgroundImageFix"
  }), /*#__PURE__*/React.createElement("feColorMatrix", {
    in: "SourceAlpha",
    type: "matrix",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
    result: "hardAlpha"
  }), /*#__PURE__*/React.createElement("feMorphology", {
    radius: "2",
    operator: "erode",
    in: "SourceAlpha",
    result: "effect1_dropShadow_999_7901"
  }), /*#__PURE__*/React.createElement("feOffset", {
    dy: "11"
  }), /*#__PURE__*/React.createElement("feGaussianBlur", {
    stdDeviation: "10"
  }), /*#__PURE__*/React.createElement("feColorMatrix", {
    type: "matrix",
    values: "0 0 0 0 0.0509804 0 0 0 0 0.117647 0 0 0 0 0.2 0 0 0 0.04 0"
  }), /*#__PURE__*/React.createElement("feBlend", {
    mode: "normal",
    in2: "BackgroundImageFix",
    result: "effect1_dropShadow_999_7901"
  }), /*#__PURE__*/React.createElement("feColorMatrix", {
    in: "SourceAlpha",
    type: "matrix",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
    result: "hardAlpha"
  }), /*#__PURE__*/React.createElement("feMorphology", {
    radius: "14",
    operator: "erode",
    in: "SourceAlpha",
    result: "effect2_dropShadow_999_7901"
  }), /*#__PURE__*/React.createElement("feOffset", {
    dy: "14"
  }), /*#__PURE__*/React.createElement("feGaussianBlur", {
    stdDeviation: "6"
  }), /*#__PURE__*/React.createElement("feColorMatrix", {
    type: "matrix",
    values: "0 0 0 0 0.0509804 0 0 0 0 0.117647 0 0 0 0 0.2 0 0 0 0.08 0"
  }), /*#__PURE__*/React.createElement("feBlend", {
    mode: "normal",
    in2: "effect1_dropShadow_999_7901",
    result: "effect2_dropShadow_999_7901"
  }), /*#__PURE__*/React.createElement("feBlend", {
    mode: "normal",
    in: "SourceGraphic",
    in2: "effect2_dropShadow_999_7901",
    result: "shape"
  })), /*#__PURE__*/React.createElement("filter", {
    id: "filter1_dd_999_7901",
    x: "58.5",
    y: "100",
    width: "463",
    height: "160",
    filterUnits: "userSpaceOnUse",
    "color-interpolation-filters": "sRGB"
  }, /*#__PURE__*/React.createElement("feFlood", {
    "flood-opacity": "0",
    result: "BackgroundImageFix"
  }), /*#__PURE__*/React.createElement("feColorMatrix", {
    in: "SourceAlpha",
    type: "matrix",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
    result: "hardAlpha"
  }), /*#__PURE__*/React.createElement("feMorphology", {
    radius: "2",
    operator: "erode",
    in: "SourceAlpha",
    result: "effect1_dropShadow_999_7901"
  }), /*#__PURE__*/React.createElement("feOffset", {
    dy: "11"
  }), /*#__PURE__*/React.createElement("feGaussianBlur", {
    stdDeviation: "10"
  }), /*#__PURE__*/React.createElement("feColorMatrix", {
    type: "matrix",
    values: "0 0 0 0 0.0509804 0 0 0 0 0.117647 0 0 0 0 0.2 0 0 0 0.04 0"
  }), /*#__PURE__*/React.createElement("feBlend", {
    mode: "normal",
    in2: "BackgroundImageFix",
    result: "effect1_dropShadow_999_7901"
  }), /*#__PURE__*/React.createElement("feColorMatrix", {
    in: "SourceAlpha",
    type: "matrix",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
    result: "hardAlpha"
  }), /*#__PURE__*/React.createElement("feMorphology", {
    radius: "14",
    operator: "erode",
    in: "SourceAlpha",
    result: "effect2_dropShadow_999_7901"
  }), /*#__PURE__*/React.createElement("feOffset", {
    dy: "14"
  }), /*#__PURE__*/React.createElement("feGaussianBlur", {
    stdDeviation: "6"
  }), /*#__PURE__*/React.createElement("feColorMatrix", {
    type: "matrix",
    values: "0 0 0 0 0.0509804 0 0 0 0 0.117647 0 0 0 0 0.2 0 0 0 0.08 0"
  }), /*#__PURE__*/React.createElement("feBlend", {
    mode: "normal",
    in2: "effect1_dropShadow_999_7901",
    result: "effect2_dropShadow_999_7901"
  }), /*#__PURE__*/React.createElement("feBlend", {
    mode: "normal",
    in: "SourceGraphic",
    in2: "effect2_dropShadow_999_7901",
    result: "shape"
  }))));
};