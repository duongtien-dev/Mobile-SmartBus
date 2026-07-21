import { Star } from "lucide-react-native";
import { Pressable, View } from "react-native";

type StarRatingProps = {
    value: number;
    onChange?: (value: number) => void;
    size?: number;
    readonly?: boolean;
};

export function StarRating({
    value,
    onChange,
    size = 28,
    readonly = false,
}: StarRatingProps) {
    return (
        <View className="flex-row gap-1">
            {Array.from({ length: 5 }).map((_, index) => {
                const starValue = index + 1;
                const filled = starValue <= value;

                return (
                    <Pressable
                        key={starValue}
                        accessibilityRole="button"
                        accessibilityLabel={`${starValue} sao`}
                        disabled={readonly}
                        hitSlop={4}
                        onPress={() => onChange?.(starValue)}
                    >
                        <Star
                            size={size}
                            color="#ffc20e"
                            fill={filled ? "#ffc20e" : "transparent"}
                        />
                    </Pressable>
                );
            })}
        </View>
    );
}
