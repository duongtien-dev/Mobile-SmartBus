import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { TAB_CONFIG, type TabRouteName } from "@/constants/tabs";

export function NavigationTabs({
    state,
    descriptors,
    navigation,
}: BottomTabBarProps) {
    const insets = useSafeAreaInsets();

    return (
        <View
            className="border-t border-border bg-surface-elevated"
            style={{ paddingBottom: Math.max(insets.bottom, 8) }}
        >
            <View className="h-16 flex-row items-end justify-around px-2">
                {state.routes.map((route) => {
                    const routeName = route.name as TabRouteName;
                    const config = TAB_CONFIG[routeName];
                    if (!config) return null;

                    const isFocused =
                        state.routes[state.index]?.name === route.name;
                    const { options } = descriptors[route.key];
                    const Icon = config.icon;
                    const color = isFocused
                        ? config.activeColor
                        : config.inactiveColor;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: "tabPress",
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name, route.params);
                        }
                    };

                    if (config.isCenter) {
                        return (
                            <Pressable
                                key={route.key}
                                accessibilityRole="button"
                                accessibilityState={
                                    isFocused ? { selected: true } : {}
                                }
                                accessibilityLabel={
                                    options.tabBarAccessibilityLabel
                                }
                                className="-mt-6 items-center active:opacity-90"
                                onPress={onPress}
                            >
                                <View className="h-14 w-14 items-center justify-center rounded-full bg-accent shadow-lg">
                                    <Icon color="#ffffff" size={26} />
                                </View>
                            </Pressable>
                        );
                    }

                    return (
                        <Pressable
                            key={route.key}
                            accessibilityRole="button"
                            accessibilityState={
                                isFocused ? { selected: true } : {}
                            }
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            className="h-12 w-14 items-center justify-center active:opacity-80"
                            onPress={onPress}
                        >
                            <Icon
                                color={color}
                                fill={isFocused ? color : "transparent"}
                                size={24}
                                strokeWidth={isFocused ? 2.5 : 2}
                            />
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
}
