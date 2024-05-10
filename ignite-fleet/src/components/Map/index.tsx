import MapView, {
  LatLng,
  MapViewProps,
  Marker,
  PROVIDER_GOOGLE,
  Polyline,
} from 'react-native-maps'
import { IconBox } from '../IconBox'
import { Car, FlagCheckered } from 'phosphor-react-native'
import { useRef } from 'react'
import { useTheme } from 'styled-components/native'

interface MapProps extends MapViewProps {
  coordinates: LatLng[]
}

export function Map({ coordinates, ...props }: MapProps) {
  const { COLORS } = useTheme()

  const mapRef = useRef<MapView>(null)

  // shows the first coordinate if the arrray contains only one coordinate
  const lastCoordinate = coordinates[coordinates.length - 1]

  async function onMapLoaded() {
    if (coordinates.length <= 1) return

    // show markers with padding around
    mapRef.current?.fitToSuppliedMarkers(['departure', 'arrival'], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    })
  }

  return (
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      region={{
        /*
          latitude and longitude, // person position
          latitudeDelta and longitudeDelta, // proximity and region to show
        */
        latitude: lastCoordinate.latitude,
        longitude: lastCoordinate.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      onMapLoaded={onMapLoaded}
      style={{ width: '100%', height: 200 }}
      {...props}
    >
      <Marker identifier="departure" coordinate={coordinates[0]}>
        <IconBox size="SM" icon={Car} />
      </Marker>

      {coordinates.length > 1 && (
        <>
          <Polyline
            coordinates={[...coordinates]}
            strokeColor={COLORS.GRAY_700}
            strokeWidth={5}
          />

          <Marker identifier="arrival" coordinate={lastCoordinate}>
            <IconBox size="SM" icon={FlagCheckered} />
          </Marker>
        </>
      )}
    </MapView>
  )
}
