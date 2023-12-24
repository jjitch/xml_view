import { CRS, LatLng, divIcon } from "leaflet";
import L from "leaflet";
import { MapContainer } from "react-leaflet";

import { useLeafletContext } from "@react-leaflet/core";
import { useEffect } from "react";
import { calcTreeNodeLocation, ElementSkelton } from "./DOMTreeLocator";

type XmlMapViewProp = {
    node: Element;
};

type ElmMarkerProp = {
    elm: Element;
    latlng: LatLng;
};

const ElmMarker = (prop: ElmMarkerProp) => {
    const context = useLeafletContext();
    const d = `
    <div class='div_icon'>
    ${prop.elm.localName}
    </div>
    `;
    const icon = divIcon({ html: d, className: "" });
    useEffect(() => {
        const square = new L.Marker(prop.latlng, { icon });
        const container = context.layerContainer || context.map;
        container.addLayer(square);
        return () => {
            container.removeLayer(square);
        };
    });

    return null;
};

export const XmlMapView = (prop: XmlMapViewProp) => {
    const domLocation: Array<ElementSkelton> = calcTreeNodeLocation(
        prop.node,
        new LatLng(0, 0)
    );
    const root = domLocation[0];
    const bounds = root.sub_tree_latlng_bound;
    const map_content = domLocation.map((elm_skelton: ElementSkelton) => (
        <ElmMarker
            elm={elm_skelton.node}
            latlng={elm_skelton.sub_tree_latlng_bound.getNorthWest()}
        />
    ));
    return (
        <div>
            <MapContainer
                center={bounds.getCenter()}
                zoom={5}
                bounds={bounds}
                scrollWheelZoom={true}
                crs={CRS.Simple}
                style={{
                    height: "700px",
                    marginLeft: "10%",
                    marginRight: "10%",
                    border: "1px solid black",
                }}
                doubleClickZoom={false}
            >
                {map_content}
            </MapContainer>
        </div>
    );
};
