export interface ChatMessage {
    role: "user" | "assistant";
    content: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const api = {
    chat: async (message: string, history: ChatMessage[] = []) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message,
                    history,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to send message");
            }

            const data = await response.json();
            return data as ChatMessage;
        } catch (error) {
            console.error("API Error:", error);
            throw error;
        }
    },

    healthCheck: async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/health`);
            return res.ok;
        } catch (e) {
            return false;
        }
    }
};
