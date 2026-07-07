import { TabPlaceholderScreen } from "@/components/tabs/tab-placeholder-screen";

export default function ScanScreen() {
    return (
        <TabPlaceholderScreen
            route="scan"
            description="Đưa mã QR vào khung quét để kiểm tra vé"
            iconSize={36}
            iconWrapperClassName="mb-4 h-20 w-20 items-center justify-center rounded-full bg-accent"
        />
    );
}
