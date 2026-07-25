import { useTranslation } from "@/i18n";
import { LegalDocumentScreen } from "@/screen/Profile/LegalDocumentScreen";
import { useMemo } from "react";

export default function PrivacyScreen() {
    const { t } = useTranslation();

    const paragraphs = useMemo(
        () => [
            t("profile.privacy.p1"),
            t("profile.privacy.p2"),
            t("profile.privacy.p3"),
            t("profile.privacy.p4"),
            t("profile.privacy.p5"),
        ],
        [t],
    );

    return (
        <LegalDocumentScreen
            title={t("profile.privacy.title")}
            updatedLabel={t("profile.privacy.updated")}
            paragraphs={paragraphs}
        />
    );
}
