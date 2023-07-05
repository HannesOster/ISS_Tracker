import { useEffect, useState } from "react";
import Controls from "../Controls/index";
import Map from "../Map/index";
import useSWR from "swr";

const URL = "https://api.wheretheiss.at/v1/satellites/25544";

export default function ISSTracker() {
  const [coords, setCoords] = useState({
    longitude: 0,
    latitude: 0,
  });
  const { data, error, isLoading } = useSWR(URL, { refreshInterval: 5000 });

  async function getISSCoords() {
    setCoords({ longitude: data.longitude, latitude: data.latitude });
  }

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }
  if (error) {
    return <h1>{error.message}</h1>;
  }

  return (
    <main>
      <Map longitude={coords.longitude} latitude={coords.latitude} />
      <Controls
        longitude={coords.longitude}
        latitude={coords.latitude}
        onRefresh={getISSCoords}
      />
    </main>
  );
}
