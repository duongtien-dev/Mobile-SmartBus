import NoticeDetailScreen from "@/screen/Notification/Detail";
import { useLocalSearchParams } from "expo-router";

export default function NewsDetailPage() {
    const { id } = useLocalSearchParams<{ id: string }>();

    return <NoticeDetailScreen id={id ?? ""} />;
}
