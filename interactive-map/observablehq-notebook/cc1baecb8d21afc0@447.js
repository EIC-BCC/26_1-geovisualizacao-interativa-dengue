function _1(md){return(
md`# Casos de Dengue no RJ 2014-2023`
)}

function _container(html){return(
html `<div style="height:600px"></div>`
)}

function _anoSelecionado(Inputs){return(
Inputs.select(
  ["2014","2015","2016","2017","2018",
   "2019","2020","2021","2022","2023"],
  {
    label: "Ano",
    value: "2023"
  }
)
)}

function _radiusSlider(html){return(
html`<input type=range min="400" max="1600" value="800">`
)}

function _radius(Generators,radiusSlider){return(
Generators.input(radiusSlider, 1000)
)}

function _upperPercentileSlider(html){return(
html`<input type=range min="90" max="100" value="100">`
)}

function _upperPercentile(Generators,upperPercentileSlider){return(
Generators.input(upperPercentileSlider, 1000)
)}

async function _dados(FileAttachment)
{
  const r2014 = await FileAttachment("casos_georef_2014.csv").csv({typed: true});
  const r2015 = await FileAttachment("casos_georef_2015.csv").csv({typed: true});
  const r2016 = await FileAttachment("casos_georef_2016.csv").csv({typed: true});
  const r2017 = await FileAttachment("casos_georef_2017.csv").csv({typed: true});
  const r2018 = await FileAttachment("casos_georef_2018.csv").csv({typed: true});
  const r2019 = await FileAttachment("casos_georef_2019.csv").csv({typed: true});
  const r2020 = await FileAttachment("casos_georef_2020.csv").csv({typed: true});
  const r2021 = await FileAttachment("casos_georef_2021.csv").csv({typed: true});
  const r2022 = await FileAttachment("casos_georef_2022.csv").csv({typed: true});
  const r2023 = await FileAttachment("casos_georef_2023.csv").csv({typed: true});

  return {
    2014: r2014, 2015: r2015, 2016: r2016, 2017: r2017, 2018: r2018,
    2019: r2019, 2020: r2020, 2021: r2021, 2022: r2022, 2023: r2023
  };
}


function _data(dados,anoSelecionado){return(
dados[anoSelecionado]
)}

function _colorRange()
{
  return [
    [1, 152, 189],
    [73, 227, 206],
    [216, 254, 181],
    [254, 237, 177],
    [254, 173, 84],
    [209, 55, 78]
  ];
}


function _deckgl(container,mapboxgl,hexagonLayer,deck)
{
  const props = {
    container,
    map: mapboxgl,
    mapStyle: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
    initialViewState: {
      longitude: -43.4435059,
      latitude: -22.931756,
      zoom: 10,
      minZoom: 5,
      maxZoom: 15,
      pitch: 40.5
    },
    controller: {
      dragRotate: true,
      touchRotate: true,
      touchZoom: false,
      keyboard: true,
      scrollZoom: true,
      doubleClickZoom: true,
    },
    layers: [hexagonLayer]
  };
  
  // Avoid creating multiple instances
  const prevDeckInstance = this;
  if (prevDeckInstance) {
    prevDeckInstance.setProps(props);
    return prevDeckInstance;
  }
  
  return new deck.DeckGL(props);
}


function _hexagonLayer(deck,colorRange,data,radius,upperPercentile)
{
  return new deck.HexagonLayer({
    id: 'heatmap',
    colorRange,
    data,
    elevationRange: [0, 500],
    elevationScale: 35,
    extruded: true,
    getPosition: d => [d.lng, d.lat],
    opacity: 1,
    radius,
    upperPercentile
  });
}


function _mapboxgl(require){return(
require('mapbox-gl@^0.53.1/dist/mapbox-gl.js')
)}

function _deck(require){return(
require.alias({
  // optional dependencjei
  h3: {}
})('deck.gl@^8.0.0/dist.min.js')
)}

function _d3(require){return(
require("https://d3js.org/d3.v5.min.js")
)}

function _16(deckgl){return(
deckgl.setProps({
  controller: {
    dragRotate: true,
    touchRotate: true,
    touchZoom: true,
  }
})
)}

function _17(deckgl){return(
deckgl._map._map.touchZoomRotate.enableRotation()
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["casos_georef_2022.csv", {url: new URL("./files/a4c7067343eeffe4982023b73e6aaf95f8ced8342fe5d4a9e695aff5b7d65d45b7eba226a9c8e050d4e57bff0f1e3bce581565edcceecb0507a16d349977c5a5.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["casos_georef_2014.csv", {url: new URL("./files/562c4f5fb529c94c5218344de9e5dc79fb419996794438d504f2fc83e81a19582c0980818b06b2d1e5dc16761324328dec49ee12802f42d5ff3b46c474a5fa8c.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["casos_georef_2021.csv", {url: new URL("./files/c8ed516f9def63c365ceab336c9e140adbfa72aba7db9c67f194c4a53355a6976bacdc9c32a4db28aa1e0fea58458e1e7f696ae0ec0639815651212001600c97.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["casos_georef_2020.csv", {url: new URL("./files/5dd5f7420af7f644fb56eed26c19f28df5f405ae3377ac437de2c58449039662aeb0ac390051d858af2df80cd749ccf80ebc900a13393f743a4781f0c4ed5a4d.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["casos_georef_2017.csv", {url: new URL("./files/22e0f5805f66bcf9c7bb3d6c0111751e64d369952f180187a7a3b9582dd2f814494775ac3d10769890e42af88833b3c457b6bc88a9d7f8ef286f876de644d976.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["casos_georef_2015.csv", {url: new URL("./files/0c8d79f0b4cd253b48f5af407ef22223084a3214ae9fa55e7e7686cce93c8280a4241b9b0b263f46fa14bb54e9d43d14b351e8760188e5218357fd458266ac47.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["casos_georef_2016.csv", {url: new URL("./files/543037a840929d186dc12f135a16e9a74f55d2a4d7fcade452b7e2269e7884b619e502250b61c6d4cccc07ca80eeb08dd9f1f3634cba9cc7b32af18f01de26f9.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["casos_georef_2018.csv", {url: new URL("./files/e13e5bbec1ac947f21338e65c1893af4c3a85338424b906431d8587cf971a12949493ddb3fffb4deb9e0f8b01871e85a6735a47cfac43eaba90f9d0c8a35e9d7.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["casos_georef_2019.csv", {url: new URL("./files/bb475e74c53f32b3f144b06256c8b9270591fd077fa5d910a958721e238e09b216146f7b053dd975f9ea574317cb623de8c2912fb356bc85cbdeae2355303626.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["casos_georef_2023.csv", {url: new URL("./files/e2f51e0c09caf2ef2f988efc8b26513c89d4969bd0b3eff5a5d682d59fa512fee739a678f8d0d6d2556688e192d47487816488d5e2101d0db9a56c59fe03344a.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("container")).define("container", ["html"], _container);
  main.variable(observer("viewof anoSelecionado")).define("viewof anoSelecionado", ["Inputs"], _anoSelecionado);
  main.variable(observer("anoSelecionado")).define("anoSelecionado", ["Generators", "viewof anoSelecionado"], (G, _) => G.input(_));
  main.variable(observer("radiusSlider")).define("radiusSlider", ["html"], _radiusSlider);
  main.variable(observer("radius")).define("radius", ["Generators","radiusSlider"], _radius);
  main.variable(observer("upperPercentileSlider")).define("upperPercentileSlider", ["html"], _upperPercentileSlider);
  main.variable(observer("upperPercentile")).define("upperPercentile", ["Generators","upperPercentileSlider"], _upperPercentile);
  main.variable(observer("dados")).define("dados", ["FileAttachment"], _dados);
  main.variable(observer("data")).define("data", ["dados","anoSelecionado"], _data);
  main.variable(observer("colorRange")).define("colorRange", _colorRange);
  main.variable(observer("deckgl")).define("deckgl", ["container","mapboxgl","hexagonLayer","deck"], _deckgl);
  main.variable(observer("hexagonLayer")).define("hexagonLayer", ["deck","colorRange","data","radius","upperPercentile"], _hexagonLayer);
  main.variable(observer("mapboxgl")).define("mapboxgl", ["require"], _mapboxgl);
  main.variable(observer("deck")).define("deck", ["require"], _deck);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer()).define(["deckgl"], _16);
  main.variable(observer()).define(["deckgl"], _17);
  return main;
}
