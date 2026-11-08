import { useToastify } from "@/hooks/useToastify";
import { useTranslation } from "@/i18n";
import type { ChatMessagePayload, ChatUiMessage } from "@/models/chat";
import { chatService } from "@/services/ChatService";
import useChatStore from "@/store/chat.store";
import { useEffect, useMemo } from "react";

let messageSeq = 0;

function nextId() {
    messageSeq += 1;
    return `chat-${messageSeq}`;
}

export function useDaGoChat() {
    const { t, locale } = useTranslation();
    const showToast = useToastify();
    const messages = useChatStore((state) => state.messages);
    const draft = useChatStore((state) => state.draft);
    const sending = useChatStore((state) => state.sending);
    const setDraft = useChatStore((state) => state.setDraft);
    const setSending = useChatStore((state) => state.setSending);
    const setMessages = useChatStore((state) => state.setMessages);
    const ensureConversationId = useChatStore(
        (state) => state.ensureConversationId,
    );
    const setConversationId = useChatStore((state) => state.setConversationId);

    useEffect(() => {
        setMessages((current) => {
            if (!current.length) {
                return [
                    {
                        id: "greeting",
                        role: "model",
                        text: t("chat.greeting"),
                    },
                ];
            }
            if (current[0]?.id !== "greeting") return current;
            return [
                { ...current[0], text: t("chat.greeting") },
                ...current.slice(1),
            ];
        });
    }, [locale, setMessages, t]);

    const historyPayload = useMemo<ChatMessagePayload[]>(
        () =>
            messages
                .filter(
                    (item) =>
                        item.id !== "greeting" &&
                        !item.pending &&
                        item.text.trim(),
                )
                .map((item) => ({ role: item.role, text: item.text })),
        [messages],
    );

    const sendText = async (raw: string) => {
        const text = raw.trim();
        if (!text || sending) return;

        const userMessage: ChatUiMessage = {
            id: nextId(),
            role: "user",
            text,
        };
        const pendingId = nextId();
        const pending: ChatUiMessage = {
            id: pendingId,
            role: "model",
            text: "",
            pending: true,
        };

        setDraft("");
        setSending(true);
        setMessages((current) => [...current, userMessage, pending]);

        try {
            const conversationId = ensureConversationId();
            const response = await chatService.send({
                messages: [...historyPayload, { role: "user", text }],
                locale,
                conversationId,
            });
            const reply = response.data?.reply?.trim() || t("chat.error");
            const actions = response.data?.actions;
            if (response.data?.conversationId) {
                setConversationId(response.data.conversationId);
            }

            setMessages((current) =>
                current.map((item) =>
                    item.id === pendingId
                        ? { ...item, pending: false, text: reply, actions }
                        : item,
                ),
            );
        } catch (error: any) {
            const apiMessage = error?.response?.data?.message as
                | string
                | undefined;
            const status = error?.response?.status as number | undefined;
            const fallback =
                status === 429 ? t("chat.rateLimit") : t("chat.error");

            setMessages((current) =>
                current.map((item) =>
                    item.id === pendingId
                        ? {
                              ...item,
                              pending: false,
                              text: apiMessage || fallback,
                          }
                        : item,
                ),
            );
            showToast({ type: "error", content: apiMessage || fallback });
        } finally {
            setSending(false);
        }
    };

    return {
        messages,
        draft,
        sending,
        setDraft,
        sendText,
    };
}
