import {CustomError, FormLogEntry, LogEntry, URL} from "./types";

const fetch = require("node-fetch");
const API_URL: URL = 'http://localhost:3131'

export async function listLogEntries(): Promise<LogEntry[]> {
    const response = await fetch(`${API_URL}/api/logs`)
    return response.json()
}

export async function createLogEntry(entry: FormLogEntry): Promise<object> {

    let response = await fetch(`${API_URL}/api/logs`, {
        method: "POST",
        headers: new Headers({
            'content-type': 'application/json'
        }),
        body: JSON.stringify(entry)
    });
    let json;
    console.log(response)
    if (response?.headers.get('content-type').includes('text/html')) {
        const message = await response.text()
        json = {message}
    } else {
        json = await response.json()
    }
    if (response.ok) return json
    const error: CustomError = new Error(json.message)
    // response.headers
    error.response = json
    return response.json()
}