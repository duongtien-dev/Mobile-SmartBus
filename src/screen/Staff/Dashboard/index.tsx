import { ScrollView, View } from "react-native";
import { AssignedRoutesSection } from "./AssignedRoutesSection";
import { DashboardHeader } from "./DashboardHeader";
import { ScheduleSection } from "./ScheduleSection";
import { ShiftActionBanner } from "./ShiftActionBanner";
import { UtilitySection } from "./UtilitySection";
import { useStaffDashboard } from "./useStaffDashboard";

export default function StaffDashboardScreen() {
    const {
        displayName,
        routes,
        loadingRoutes,
        schedules,
        loadingSchedule,
        activeShift,
        loadingActiveShift,
        activeScanTotal,
        hasActiveShift,
        primaryRoute,
        isCheckingIn,
        expandedId,
        checkInLabel,
        handleLogout,
        handleCheckIn,
        toggleExpanded,
    } = useStaffDashboard();

    return (
        <View className="flex-1 bg-app-shell">
            <DashboardHeader
                displayName={displayName}
                onLogout={handleLogout}
            />

            <ScrollView
                className="flex-1"
                contentContainerClassName="gap-5 px-4 py-5 pb-10"
                showsVerticalScrollIndicator={false}
            >
                <ShiftActionBanner
                    loading={loadingActiveShift}
                    hasActiveShift={hasActiveShift}
                    activeShift={activeShift}
                    scanTotal={activeScanTotal}
                    primaryRoute={primaryRoute}
                    isCheckingIn={isCheckingIn}
                    onCheckIn={() => handleCheckIn()}
                />

                <UtilitySection />

                <AssignedRoutesSection
                    routes={routes}
                    loading={loadingRoutes}
                />

                <ScheduleSection
                    items={schedules}
                    loading={loadingSchedule}
                    expandedId={expandedId}
                    checkInLabel={checkInLabel}
                    isCheckingIn={isCheckingIn}
                    onToggle={toggleExpanded}
                    onCheckIn={handleCheckIn}
                />
            </ScrollView>
        </View>
    );
}
