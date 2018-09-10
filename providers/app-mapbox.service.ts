// Documentation: https://www.mapbox.com/mapbox-gl-js/api/

import { Injectable } from "@angular/core";

import mapboxgl from 'mapbox-gl';
import * as _ from 'lodash';


const DEFAULT_LOCATION: any = [2.213749, 46.227638];
const DEFAULT_ZOOM: number = 5;
const MAPBOX_ACCESS_TOKEN: string = 'pk.eyJ1IjoieW91bm4iLCJhIjoiY2o4eDNxd3gyMWg2YzJ3cXUzbXd6YnhqMyJ9.vJdgK65U2Zv1gamVQuX0ug';
const MAPBOX_STYLE: string = 'mapbox://styles/younn/cj8yrxxifi9jh2ro3vz75ejwa';
// TODO Issue #296: Use environments to manage different versions of APIs

@Injectable()
export class AppMapboxService {

    private maps: {[selector: string]: any} = {};

    static MARKER_TRUCK;
    static MARKER_PARCEL;
    static MARKER_UNLOADING_POINT;

    constructor() {
    }

    /**
     * Init a map
     * @param selector selector id HTML
     * @param options map options
     */
    init(selector: string, options?: Object) {

        let _options: any = {
            'center': DEFAULT_LOCATION, // France
            'zoom': DEFAULT_ZOOM,
            'style': MAPBOX_STYLE
        };
        _options = _.merge(_options, options || {});

        let divMap: any = document.querySelector(selector);
        _options.container = divMap;

        mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
        const map = new mapboxgl.Map(_options);

        this.maps[selector] = map;
        this.addMarker(selector, _options.center);

        return this.maps[selector];
    }

    /**
     * Destroys the map and clears all related event listeners
     */
    destroy(selector: string) {

        if(this.maps[selector]) {
            this.maps[selector].remove();
            delete this.maps[selector];
        }
    }

    /**
     * Redraw map layer tiles
     * @param selector
     */
    redraw(selector: string) {
        this.maps[selector].invalidateSize();
    }

    /**
     * Reverse order of lng/lat of geojson to lat/lng
     */
    reverseCoords(coords: any) {

        let coordsCopy = JSON.parse(JSON.stringify(coords));

        if(typeof coordsCopy[0] === "number") {
            coordsCopy.reverse();
        }
        else if(typeof coordsCopy[0] === "object") {

            for(let coord of coordsCopy) {
                coord.reverse();
            }
        }

        return coordsCopy;
    }

    /**
     * Zoom in the map
     * @param selector
     */
    zoomIn(selector: string) {

        let zoomLevel = this.maps[selector].getZoom() + 1;
        this.maps[selector].setZoom(zoomLevel);
    }

    /**
     * Zoom out the map
     * @param selector
     */
    zoomOut(selector: string) {

        let zoomLevel = this.maps[selector].getZoom() - 1;
        this.maps[selector].setZoom(zoomLevel);
    }

    /**
     * add a marker to the map
     */
    addMarker(selector: string, coords: any) {
        var el = document.createElement('div');
        el.className = 'map-marker';
        var marker = new mapboxgl.Marker(el)
        .setLngLat(coords)
        .addTo(this.maps[selector]);
    }
}
