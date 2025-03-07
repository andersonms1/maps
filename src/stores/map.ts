import { defineStore } from "pinia";

export enum BgTileLayerSources {
  CARTO_DB_DARK = "CARTO_DB_DARK",
  CARTO_DB_LIGHT = "CARTO_DB_LIGHT",
  ESRI = "ESRI",
  OPEN_STREET_MAPS = "OPEN_STREET_MAPS",
  OPEN_TOPO_MAP = "OPEN_TOPO_MAP",
}

const bgTileLayerSources = {
  [BgTileLayerSources.OPEN_STREET_MAPS]: {
    title: "Open Street Maps",
    description: "Um mapa livre e editável de todo o mundo",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  },
  [BgTileLayerSources.CARTO_DB_LIGHT]: {
    title: "CartoDB - Positron (Light)",
    description:
      "Um mapa claro e minimalista, ótimo para visualização de dados",
    attribution:
      "&copy; Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.",
    url: "https://basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
  },
  [BgTileLayerSources.CARTO_DB_DARK]: {
    title: "CartoDB - Dark Matter",
    description: "Um mapa escuro, ideal para destacar dados coloridos",
    attribution:
      "&copy; Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.",
    url: "https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
  },
  [BgTileLayerSources.OPEN_TOPO_MAP]: {
    title: "Open Topo Map",
    description:
      "Um mapa topográfico baseado em dados do OSM, com linhas de contorno e sombreamento de colinas",
    attribution: '&copy; <a href="https://opentopomap.org">OpenTopoMap</a>',
    url: "https://tile.opentopomap.org/{z}/{x}/{y}.png",
  },
  [BgTileLayerSources.ESRI]: {
    title: "ESRI - World Street Map",
    description: "Um mapa de ruas limpo e detalhado",
    attribution: '&copy; <a href="https://www.esri.com/en-us/home">ESRI</a>',
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
  },
};

import { ref, computed, watch, } from "vue";

export const useMapStore = defineStore("map", () => {
  const baseLayer = ref(bgTileLayerSources?.[BgTileLayerSources.ESRI])

  return {
    baseLayer
  }

})