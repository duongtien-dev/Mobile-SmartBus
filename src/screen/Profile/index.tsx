import { PageHeader } from "@/components/PageHeader";
import {
    PROFILE_AUTH_ACTIONS,
    PROFILE_MENU_SECTIONS,
    type ProfileMenuItemConfig,
} from "@/constants/profile";
import { useTranslation } from "@/i18n";
import useAuthStore from "@/store/auth.store";
import { router, type Href } from "expo-router";
import { useMemo } from "react";
import { Alert, ScrollView, View } from "react-native";
import { ProfileMenuSection } from "./MenuSection";
import { ProfileUserCard } from "./UserCard";

type DisplayMenuItem = {
    id: string;
    label: string;
    description?: string;
    icon: ProfileMenuItemConfig["icon"];
    href?: string;
    destructive?: boolean;
    authOnly?: boolean;
    guestOnly?: boolean;
};

function toDisplayItem(
    item: ProfileMenuItemConfig,
    t: (key: string) => string,
    localeLabel: string,
): DisplayMenuItem {
    return {
        id: item.id,
        label: t(item.labelKey),
        description: item.descriptionFromLocale
            ? localeLabel
            : item.descriptionKey
              ? t(item.descriptionKey)
              : undefined,
        icon: item.icon,
        href: item.href,
        destructive: item.destructive,
        authOnly: item.authOnly,
        guestOnly: item.guestOnly,
    };
}

export default function ProfileScreen() {
    const { user, isAuthenticated, logout } = useAuthStore();
    const { t, localeLabel } = useTranslation();

    const sections = useMemo(
        () =>
            PROFILE_MENU_SECTIONS.map((section) => ({
                id: section.id,
                title: t(section.titleKey),
                items: section.items
                    .filter((item) => {
                        if (item.authOnly && !isAuthenticated) return false;
                        if (item.guestOnly && isAuthenticated) return false;
                        return true;
                    })
                    .map((item) => toDisplayItem(item, t, localeLabel)),
            })),
        [t, localeLabel, isAuthenticated],
    );

    const authActions = useMemo(
        () =>
            PROFILE_AUTH_ACTIONS.filter((item) => {
                if (item.authOnly && !isAuthenticated) return false;
                if (item.guestOnly && isAuthenticated) return false;
                return true;
            }).map((item) => toDisplayItem(item, t, localeLabel)),
        [t, localeLabel, isAuthenticated],
    );

    const handleEditProfilePress = () => {
        router.push("/profile/edit" as Href);
    };

    const handleItemPress = (item: DisplayMenuItem) => {
        if (item.href) {
            router.push(item.href as Href);
            return;
        }

        if (item.id === "logout") {
            Alert.alert(
                t("profile.logout.confirmTitle"),
                t("profile.logout.confirmMessage"),
                [
                    { text: t("profile.logout.cancel"), style: "cancel" },
                    {
                        text: t("profile.logout.confirm"),
                        style: "destructive",
                        onPress: () => {
                            logout();
                            router.replace("/login");
                        },
                    },
                ],
            );
            return;
        }

        Alert.alert(item.label, t("profile.featureComingSoon"));
    };

    return (
        <View className="flex-1 bg-app-shell">
            <PageHeader title={t("profile.title")} isIconBack={false} />
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

                {sections.map((section) => (
                    <ProfileMenuSection
                        key={section.id}
                        title={section.title}
                        items={section.items}
                        onItemPress={handleItemPress}
                    />
                ))}

                <ProfileMenuSection
                    title={t("profile.section.session")}
                    items={authActions}
                    onItemPress={handleItemPress}
                />
            </ScrollView>
        </View>
    );
}
