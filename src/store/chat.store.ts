import type { ChatUiMessage } from "@/models/chat";
import { create } from "zustand";

function createConversationId() {
    return `c_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

type ChatState = {
    isOpen: boolean;
    conversationId: string | null;
    messages: ChatUiMessage[];
    draft: string;
    sending: boolean;
    open: () => void;
    close: () => void;
    setDraft: (draft: string) => void;
    setSending: (sending: boolean) => void;
    setConversationId: (conversationId: string | null) => void;
    ensureConversationId: () => string;
    setMessages: (
        updater:
            | ChatUiMessage[]
            | ((prev: ChatUiMessage[]) => ChatUiMessage[]),
    ) => void;
    reset: () => void;
};

const useChatStore = create<ChatState>((set, get) => ({
    isOpen: false,
    conversationId: null,
    messages: [],
    draft: "",
    sending: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
    setDraft: (draft) => set({ draft }),
    setSending: (sending) => set({ sending }),
    setConversationId: (conversationId) => set({ conversationId }),
    ensureConversationId: () => {
        const current = get().conversationId;
        if (current) return current;
        const next = createConversationId();
        set({ conversationId: next });
        return next;
    },
    setMessages: (updater) =>
        set((state) => ({
            messages:
                typeof updater === "function"
                    ? updater(state.messages)
                    : updater,
        })),
    reset: () =>
        set({
            isOpen: false,
            conversationId: null,
            messages: [],
            draft: "",
            sending: false,
        }),
}));

export default useChatStore;
