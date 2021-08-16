export interface SVGStyle {
    height: string;
    width: string;
}

export interface GEOCoordinate {
    latitude: number;
    longitude: number;
}

export interface Viewport extends SVGStyle, GEOCoordinate {
    zoom: number;
}

export interface LogEntry extends GEOCoordinate {
    rating: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    visitedDate: string;
    _id: string;
    comments?: string;
    description?: string;
    image?: string;
    __v?: number;
}

export interface FormLogEntry extends GEOCoordinate {
    rating: string;
    title: string;
    visitedDate: string;
    comments?: string;
    description?: string;
    image?: string;
}

export type URL = string;

export type RequestConfig = {
    method: string;
    headers: object;
    body: string;
}

export interface CustomError extends Error {
    response?: object;
}

export interface MapEvent extends Event{
    lngLat: GEOCoordinate;
}