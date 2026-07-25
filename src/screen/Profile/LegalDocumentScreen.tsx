import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/Card";
import { ScrollView, Text, View } from "react-native";

type LegalDocumentScreenProps = {
    title: string;
    updatedLabel: string;
    paragraphs: string[];
};

export function LegalDocumentScreen({
    title,
    updatedLabel,
    paragraphs,
}: LegalDocumentScreenProps) {
    return (
        <View className="flex-1 bg-app-shell">
            <PageHeader title={title} isIconBack />

            <ScrollView
                className="flex-1"
                contentContainerClassName="gap-4 px-5 pb-10 pt-5"
                showsVerticalScrollIndicator={false}
            >
                <Text className="px-1 text-xs text-text-muted">{updatedLabel}</Text>

                <Card className="gap-4" padding="md">
                    {paragraphs.map((paragraph, index) => (
                        <Text
                            key={index}
                            className="text-sm leading-6 text-text-secondary"
                        >
                            {paragraph}
                        </Text>
                    ))}
                </Card>
            </ScrollView>
        </View>
    );
}
