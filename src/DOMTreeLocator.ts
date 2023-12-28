import { LatLngBounds, LatLng } from "leaflet";

export type ElementSkelton = {
    node: Element;
    sub_tree_latlng_bound: LatLngBounds;
    parent_latlng_north_west: LatLng | null;
};

export const STEP_LAT: number = 0.7;
export const STEP_LNG: number = 2.5;

export function calcTreeNodeLocation(
    node: Element,
    node_latlng_north_west: LatLng,
    parent_latlng_north_west: LatLng | null
): ElementSkelton[] {
    let lat_south = node_latlng_north_west.lat;
    let lng_east = node_latlng_north_west.lng;
    let lat_child_north = node_latlng_north_west.lat;
    let lng_child_west = node_latlng_north_west.lng + STEP_LNG;
    let node_with_latlng: ElementSkelton[] = [];
    for (let elm of node.children) {
        let child_latlag_north_west = new LatLng(
            lat_child_north,
            lng_child_west
        );
        let child_nodes = calcTreeNodeLocation(
            elm,
            child_latlag_north_west,
            node_latlng_north_west
        );
        let child_tree_latlng_bound = child_nodes[0].sub_tree_latlng_bound;
        lat_child_north = child_tree_latlng_bound.getSouth() - STEP_LAT;
        lng_child_west = child_tree_latlng_bound.getWest();
        lat_south = child_tree_latlng_bound.getSouth();
        lng_east = Math.max(lng_east, child_tree_latlng_bound.getEast());
        node_with_latlng = [...node_with_latlng, ...child_nodes];
    }
    let sub_tree_latlng_bound = new LatLngBounds(
        [lat_south, node_latlng_north_west.lng],
        [node_latlng_north_west.lat, lng_east]
    );
    return [
        { node, sub_tree_latlng_bound, parent_latlng_north_west },
        ...node_with_latlng,
    ];
}
