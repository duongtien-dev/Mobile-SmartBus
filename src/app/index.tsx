import { View } from "react-native";

import { Button } from "@/components/Button";
import { useRouter } from "expo-router";

export default function Index() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-background px-6 py-10">
            <View className="flex-1 items-center justify-center">
                <Button type="primary" variant="bold" onPress={ () => router.push('/dev-demo/page')}>
                    Demo design tokens
                </Button>
            </View>
        </View>
    );
}
