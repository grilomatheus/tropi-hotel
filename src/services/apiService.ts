// src/services/apiService.ts
export async function fetchStates() {
    const response = await fetch('/states.json');
    return response.json();
}

export async function fetchHotels() {
    const response = await fetch('/hotels.json');
    return response.json();
}
