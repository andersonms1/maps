<template>
  <div ref="mapContainer" style="width: 100vw; height: 100vh" />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { Map, Marker, TileLayer, geoJSON, GeoJSON, Icon } from 'leaflet'

import { useMapStore } from '../stores/map'

const mapStore = useMapStore()

import 'leaflet/dist/leaflet.css'

let map: Map
let baseTileLayer: TileLayer
let marker: Marker
let setoresGeojsonLayer: GeoJSON

const mapContainer = ref()

export interface Props {
  lat?: number
  lng?: number
  zoom?: number
}
const props = withDefaults(defineProps<Props>(), {
  lat: Number(import.meta.env.VITE_MAP_INITIAL_LAT ?? -23.5489),
  lng: Number(import.meta.env.VITE_MAP_INITIAL_LNG ?? -46.6388),
  zoom: Number(import.meta.env.VITE_MAP_INITIAL_ZOOM ?? 14),
})

onMounted(async () => {
  initMap(props)
})

function initMap(initialValues: { lat: number; lng: number; zoom: number }) {
  // Create map
  map = new Map(mapContainer.value, {
    preferCanvas: true,
    zoomControl: false,
  }).setView(
    {
      lat: initialValues.lat,
      lng: initialValues.lng,
    },
    initialValues.zoom,
  )

  // Base tile layer
  updateBaseTileLayer(mapStore.baseLayer)
  console.log(mapStore.baseLayer)
  // Add marker
  marker = new Marker(
    {
      lat: initialValues.lat,
      lng: initialValues.lng,
    },
    {
      icon: new Icon({
        iconUrl: '/marker/default.png',
        iconSize: [25, 41], // Size of the icon
        iconAnchor: [25 / 2, 41], // Point of the icon which will correspond to marker's location
        // popupAnchor: [25 / 2, 0], // Point from which the popup should open relative to the iconAnchor
      }),
    },
  )
  marker.addTo(map)
  marker.addEventListener('moveend', () => {
    map.setView(marker.getLatLng())
  })

  // Layer setores geojson
  setoresGeojsonLayer = geoJSON().addTo(map)
}

function updateBaseTileLayer(baseTileLayerSource: { url: string; attribution: string }) {
  if (baseTileLayer) {
    map.removeLayer(baseTileLayer)
  }
  baseTileLayer = new TileLayer(baseTileLayerSource.url, {
    attribution: baseTileLayerSource.attribution,
    minZoom: 4,
    maxZoom: 18,
  })
  baseTileLayer.addTo(map)
  console.log('Aqui')
}

function clearGeojsonSetores() {
  setoresGeojsonLayer.clearLayers()
  // map.setZoom(props.zoom);
}
</script>
