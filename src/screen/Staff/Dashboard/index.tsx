import { ScrollView, View } from "react-native";
import { AssignedRoutesSection } from "./AssignedRoutesSection";
import { DashboardHeader } from "./DashboardHeader";
import { ScheduleSection } from "./ScheduleSection";
import { ShiftActionBanner } from "./ShiftActionBanner";
import { UtilitySection } from "./UtilitySection";

export default function StaffDashboardScreen() {
    return (
        <View className="flex-1 bg-app-shell">
            <DashboardHeader />

            <ScrollView
                className="flex-1"
                contentContainerClassName="gap-5 px-4 py-5 pb-10"
                showsVerticalScrollIndicator={false}
            >
                <ShiftActionBanner />
                <UtilitySection />
                <AssignedRoutesSection />
                <ScheduleSection />
            </ScrollView>
        </View>
    );
}
