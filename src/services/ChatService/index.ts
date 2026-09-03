import BaseService from "@/services/BaseService";
import type { ApiResponse } from "@/services/type";
import type { ChatMessagePayload, ChatReply } from "@/models/chat";

class ChatService extends BaseService {
    constructor() {
        super("/chat");
    }

    send(body: { messages: ChatMessagePayload[]; locale: string }) {
        return this.api
            .post<ApiResponse<ChatReply>>("/", body, { timeout: 45000 })
            .then(({ data }) => data);
    }
}

export const chatService = new ChatService();
