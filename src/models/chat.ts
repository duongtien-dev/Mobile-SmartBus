export type ChatRole = "user" | "model";

export type ChatActionType =
    | "open_home"
    | "open_tickets"
    | "open_payment"
    | "open_my_tickets"
    | "open_language";

export type ChatAction = {
    type: ChatActionType;
};

export type ChatMessagePayload = {
    role: ChatRole;
    text: string;
};

export type ChatReply = {
    reply: string;
    actions?: ChatAction[];
    conversationId?: string;
};

export type ChatUiMessage = {
    id: string;
    role: ChatRole;
    text: string;
    actions?: ChatAction[];
    pending?: boolean;
};
