import { PageHeader } from "@/components/PageHeader";
import {
    PROFILE_AUTH_ACTIONS,
    PROFILE_MENU_SECTIONS,
    type ProfileMenuItem as ProfileMenuItemType,
} from "@/constants/profile";
import useAuthStore from "@/store/auth.store";
import Constants from "expo-constants";
import { router, type Href } from "expo-router";
import { Alert, ScrollView, Text, View } from "react-native";
import { ProfileMenuSection } from "./MenuSection";
import { ProfileUserCard } from "./UserCard";

function filterMenuItems(
    items: ProfileMenuItemType[],
    isAuthenticated: boolean,
) {
    return items.filter((item) => {
        if (item.authOnly && !isAuthenticated) return false;
        if (item.guestOnly && isAuthenticated) return false;
        return true;
    });
}

export default function ProfileScreen() {
    const { user, isAuthenticated, logout } = useAuthStore();
    const appVersion =
        Constants.expoConfig?.version ?? Constants.nativeAppVersion ?? "1.0.0";

    const handleEditProfilePress = () => {
        router.push("/profile/edit" as Href);
    };

    const handleItemPress = (item: ProfileMenuItemType) => {
        switch (item.id) {
            case "login":
                router.push("/login");
                return;
            case "logout":
                Alert.alert("Đăng xuất", "Bạn có chắc muốn đăng xuất?", [
                    { text: "Hủy", style: "cancel" },
                    {
                        text: "Đăng xuất",
                        style: "destructive",
                        onPress: () => {
                            logout();
                            router.replace("/login");
                        },
                    },
                ]);
                return;
            case "payment":
            case "notifications":
            case "nearby":
            case "help":
            case "favorites":
                if (item.href) {
                    router.push(item.href as Href);
                }
                return;
            case "edit-profile":
                handleEditProfilePress();
                return;
            case "about":
                Alert.alert(
                    "Về DanaBus",
                    `Ứng dụng xe buýt thông minh\nPhiên bản ${appVersion}`,
                );
                return;
            default:
                Alert.alert(
                    item.label,
                    "Tính năng đang được phát triển. Vui lòng quay lại sau.",
                );
        }
    };

    return (
        <View className="flex-1 bg-background">
            <PageHeader title="Tài khoản" isIconBack={false} />
            <ScrollView
                className="flex-1"
                contentContainerClassName="gap-5 px-5 pb-10 pt-5"
                showsVerticalScrollIndicator={false}
            >
                <ProfileUserCard
                    name={user?.full_name}
                    email={user?.email}
                    isAuthenticated={isAuthenticated}
                    onEditPress={handleEditProfilePress}
                />

                {PROFILE_MENU_SECTIONS.map((section) => (
                    <ProfileMenuSection
                        key={section.id}
                        title={section.title}
                        items={filterMenuItems(section.items, isAuthenticated)}
                        onItemPress={handleItemPress}
                    />
                ))}

                <ProfileMenuSection
                    title="Phiên đăng nhập"
                    items={filterMenuItems(
                        PROFILE_AUTH_ACTIONS,
                        isAuthenticated,
                    )}
                    onItemPress={handleItemPress}
                />

                <Text className="mt-2 text-center text-xs text-text-muted">
                    DanaBus · v{appVersion}
                </Text>
            </ScrollView>
        </View>
    );
}
