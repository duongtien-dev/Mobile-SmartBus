import { Redirect } from "expo-router";

/** Alias cũ → Lịch sử hoạt động */
export default function StaffShiftHistoryRedirect() {
    return <Redirect href={"/staff/activity-history" as never} />;
}
