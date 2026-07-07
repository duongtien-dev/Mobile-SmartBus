import { Tabs } from "expo-router";

import { NavigationTabs } from "@/components/navigation";
import { TAB_CONFIG, TAB_ROUTES } from "@/constants/tabs";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
            }}
            tabBar={(props) => <NavigationTabs {...props} />}
        >
            {TAB_ROUTES.map((name) => (
                <Tabs.Screen
                    key={name}
                    name={name}
                    options={{ title: TAB_CONFIG[name].label }}
                />
            ))}
        </Tabs>
    );
}
