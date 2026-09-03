import type { ChatUiMessage } from "@/models/chat";
import { create } from "zustand";

type ChatState = {
    isOpen: boolean;
    messages: ChatUiMessage[];
    draft: string;
    sending: boolean;
    open: () => void;
    close: () => void;
    setDraft: (draft: string) => void;
    setSending: (sending: boolean) => void;
    setMessages: (
        updater:
            | ChatUiMessage[]
            | ((prev: ChatUiMessage[]) => ChatUiMessage[]),
    ) => void;
    reset: () => void;
};

const useChatStore = create<ChatState>((set) => ({
    isOpen: false,
    messages: [],
    draft: "",
    sending: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
    setDraft: (draft) => set({ draft }),
    setSending: (sending) => set({ sending }),
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
            messages: [],
            draft: "",
            sending: false,
        }),
}));

export default useChatStore;
