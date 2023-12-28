import { CRS, LatLng, divIcon } from "leaflet";
import L from "leaflet";
import { MapContainer, Polyline } from "react-leaflet";

import { useLeafletContext } from "@react-leaflet/core";
import { useEffect } from "react";
import {
    calcTreeNodeLocation,
    ElementSkelton,
    STEP_LNG,
} from "./DOMTreeLocator";

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
        <span class='icon_text'>${prop.elm.localName}</span>
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
        new LatLng(0, 0),
        null
    );
    const root = domLocation[0];
    const bounds = root.sub_tree_latlng_bound;
    const map_content = domLocation.map((elm_skelton: ElementSkelton) => (
        <ElmMarker
            elm={elm_skelton.node}
            latlng={elm_skelton.sub_tree_latlng_bound.getNorthWest()}
        />
    ));
    const tree_rep = domLocation.map(
        (elm_skelton: ElementSkelton, index: number) => {
            let positions: Array<LatLng> = [];
            const node_latlng =
                elm_skelton.sub_tree_latlng_bound.getNorthWest();
            if (elm_skelton.parent_latlng_north_west !== null) {
                const parent_latlng = elm_skelton.parent_latlng_north_west;
                if (node_latlng.lat !== parent_latlng.lat) {
                    positions.push(
                        new LatLng(
                            parent_latlng.lat,
                            parent_latlng.lng + STEP_LNG / 2
                        )
                    );
                }
                positions.push(
                    new LatLng(
                        node_latlng.lat,
                        parent_latlng.lng + STEP_LNG / 2
                    )
                );
            }
            positions.push(node_latlng);
            if (elm_skelton.node.children.length) {
                positions.push(
                    new LatLng(node_latlng.lat, node_latlng.lng + STEP_LNG / 2)
                );
            }
            return <Polyline positions={positions} />;
        }
    );
    return (
        <div>
            <MapContainer
                center={bounds.getNorthWest()}
                zoom={6}
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
                {tree_rep}
                {map_content}
            </MapContainer>
        </div>
    );
};
