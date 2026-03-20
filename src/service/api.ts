export const BASE_URL = import.meta.env.VITE_AL_GORCERIES_2_API_URL;

export async function GET<T>(url: string): Promise<T> {
    const res = await fetch(BASE_URL + url, {
        method: "GET",
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error(`GET ${url} failed: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data as T;
}

export async function POST<T>(url: string, body?: unknown): Promise<T> {
    const res = await fetch(BASE_URL + url, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : null,
    });

    if (!res.ok) {
        throw new Error(`POST ${url} failed: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data as T;
}

export async function PATCH<T>(url: string, body: unknown): Promise<T> {
    const res = await fetch(BASE_URL + url, {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        throw new Error(`POST ${url} failed: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data as T;
}

export async function DELETE(url: string): Promise<void> {
    const res = await fetch(BASE_URL + url, {
        method: "DELETE",
        credentials: "include",
    });
    
    if (!res.ok) {
        throw new Error(`DELETE ${url} failed: ${res.status} ${res.statusText}`);
    }
}
