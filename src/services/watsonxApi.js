const API_URL = import.meta.env.VITE_API_URL;

export async function fetchGuidance(prompt) {
    const response = await fetch(`${API_URL}/ask`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            prompt,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.detail?.error ??
            "Unable to contact OpsPilot backend."
        );
    }

    return data;
}