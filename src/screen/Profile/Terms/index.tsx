import { useTranslation } from "@/i18n";
import { LegalDocumentScreen } from "@/screen/Profile/LegalDocumentScreen";
import { useMemo } from "react";

export default function TermsScreen() {
    const { t } = useTranslation();

    const paragraphs = useMemo(
        () => [
            t("profile.terms.p1"),
            t("profile.terms.p2"),
            t("profile.terms.p3"),
            t("profile.terms.p4"),
            t("profile.terms.p5"),
        ],
        [t],
    );

    return (
        <LegalDocumentScreen
            title={t("profile.terms.title")}
            updatedLabel={t("profile.terms.updated")}
            paragraphs={paragraphs}
        />
    );
}
