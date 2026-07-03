import { Text, View } from "react-native";

import { Alert, Badge, Button } from "@/components/ui";
import { router } from "expo-router";

export default function Index() {
    return (
        <View className="flex-1 bg-background px-6 py-10">
            <View className="mb-6 rounded-2xl bg-primary px-5 py-4">
                <Text className="text-lg font-bold text-on-primary">
                    SmartBus
                </Text>
                <Text className="mt-1 text-sm text-primary-muted">
                    Design token preview
                </Text>
            </View>

            <View className="mb-4 gap-4 rounded-2xl border border-border bg-surface-elevated p-4">
                <View className="flex-row flex-wrap items-center gap-2">
                    <Badge label="NEW" variant="promo" />
                    <Badge label="HOT" variant="promo" />
                    <Badge label="3" variant="alert" />
                    <Badge label="Scheduled" variant="neutral" />
                </View>

                <Text className="text-base text-text-primary">
                    Primary text on surface background
                </Text>
                <Text className="text-sm text-text-secondary">
                    Secondary text maintains readable contrast on light and dark
                    surfaces.
                </Text>
            </View>

            <View className="mb-4 gap-3">
                <Button type="primary" variant="bold" onPress={ () => router.push('/dev-demo/page')}>
                    Book a ticket
                </Button>
                <Button type="primary" variant="outline">
                    View routes
                </Button>
                <Button type="secondary" variant="bold">
                    More options
                </Button>
                <Button type="danger" variant="outline">
                    Cancel trip
                </Button>
                <Button disabled type="primary" variant="bold">
                    Unavailable
                </Button>
            </View>

            <Alert
                message="This route has been cancelled. Refund will be processed within 3–5 business days."
                title="Trip cancelled"
            />

            <View className="mt-6 flex-row gap-3">
                <View className="h-10 flex-1 rounded-lg bg-primary" />
                <View className="h-10 flex-1 rounded-lg bg-accent" />
                <View className="h-10 flex-1 rounded-lg bg-highlight" />
                <View className="h-10 flex-1 rounded-lg bg-alert" />
            </View>
        </View>
    );
}
