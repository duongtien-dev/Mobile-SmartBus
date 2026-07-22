import { PageHeader } from "@/components/PageHeader";
import {
    PROFILE_AUTH_ACTIONS,
    PROFILE_MENU_SECTIONS,
} from "@/constants/profile";
import useAuthStore from "@/store/auth.store";
import { router, type Href } from "expo-router";
import { Alert, ScrollView, View } from "react-native";
import { ProfileMenuSection } from "./MenuSection";
import { ProfileUserCard } from "./UserCard";

type MenuItem =
    | (typeof PROFILE_MENU_SECTIONS)[number]["items"][number]
    | (typeof PROFILE_AUTH_ACTIONS)[number];

export default function ProfileScreen() {
    const { user, isAuthenticated, logout } = useAuthStore();

    const handleEditProfilePress = () => {
        router.push("/profile/edit" as Href);
    };

    const handleItemPress = (item: MenuItem) => {
        if ("href" in item && item.href) {
            router.push(item.href as Href);
            return;
        }

        if (item.id === "logout") {
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
        }

        Alert.alert(
            item.label,
            "Tính năng đang được phát triển. Vui lòng quay lại sau.",
        );
    };

    return (
        <View className="flex-1 bg-app-shell">
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
                        items={section.items}
                        onItemPress={handleItemPress}
                    />
                ))}

                <ProfileMenuSection
                    title="Phiên đăng nhập"
                    items={PROFILE_AUTH_ACTIONS}
                    onItemPress={handleItemPress}
                />
            </ScrollView>
        </View>
    );
}
