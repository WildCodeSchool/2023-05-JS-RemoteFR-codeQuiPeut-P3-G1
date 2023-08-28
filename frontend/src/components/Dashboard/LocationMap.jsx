// import React from "react"
// import { GoogleMap, useJsApiLoader } from "@react-google-maps/api"

// const containerStyle = {
//   width: "400px",
//   height: "250px",
// }

// const center = {
//   lat: -3.745,
//   lng: -38.523,
// }

// const MyComponent = () => {
//   const [map, setMap] = React.useState(null)

//   const onLoad = React.useCallback(function callback(map) {
//     const bounds = new window.google.maps.LatLngBounds(center)
//     map.fitBounds(bounds)

//     setMap(map)
//     setIsLoaded(true)
//   }, [])

//   return isLoaded ? (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={center}
//       zoom={10}
//       onLoad={onLoad}
//     >
//       {/* <SearchBox
//         onLoad={(ref) => console.log(ref)}
//         onPlacesChanged={() => console.log('places changed')}
//       > */}
//       <input
//         type="text"
//         placeholder="Enter a location"
//         style={{
//           boxSizing: `border-box`,
//           border: `1px solid transparent`,
//           width: `240px`,
//           height: `32px`,
//           padding: `0 12px`,
//           borderRadius: `3px`,
//           boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
//           fontSize: `14px`,
//           outline: `none`,
//           textOverflow: `ellipses`,
//           position: "absolute",
//           left: "50%",
//           marginLeft: "-120px",
//         }}
//       />
//       {/* </SearchBox> */}
//       <></>
//     </GoogleMap>
//   ) : (
//     <></>
//   )
// }

// const [isLoaded, setIsLoaded] = React.useState(false)

// export default React.memo(MyComponent)
