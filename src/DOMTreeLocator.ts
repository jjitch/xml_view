import { LatLngBounds, LatLng } from "leaflet";

export type ElementSkelton = {
    node: Element;
    sub_tree_latlng_bound: LatLngBounds;
};

const step_lat: number = 0.5;
const step_lng: number = 2.5;

export function calcTreeNodeLocation(
    node: Element,
    node_latlng_north_west: LatLng
): ElementSkelton[] {
    let lat_south = node_latlng_north_west.lat;
    let lng_east = node_latlng_north_west.lng;
    let lat_child_north = node_latlng_north_west.lat;
    let lng_child_west = node_latlng_north_west.lng + step_lng;
    let node_with_latlng: ElementSkelton[] = [];
    for (let elm of node.children) {
        let child_latlag_north_west = new LatLng(
            lat_child_north,
            lng_child_west
        );
        let child_nodes = calcTreeNodeLocation(elm, child_latlag_north_west);
        let child_tree_latlng_bound = child_nodes[0].sub_tree_latlng_bound;
        lat_child_north = child_tree_latlng_bound.getSouth() - step_lat;
        lng_child_west = child_tree_latlng_bound.getWest();
        lat_south = child_tree_latlng_bound.getSouth();
        lng_east = Math.max(lng_east, child_tree_latlng_bound.getEast());
        node_with_latlng = [...node_with_latlng, ...child_nodes];
    }
    console.log(node_with_latlng);
    let sub_tree_latlng_bound = new LatLngBounds(
        [lat_south, node_latlng_north_west.lng],
        [node_latlng_north_west.lat, lng_east]
    );
    return [{ node, sub_tree_latlng_bound }, ...node_with_latlng];
}
