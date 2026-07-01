import { ImageX } from '@/components';
import { Pressable, Text, View } from 'react-native';

type Props = {
  thumbnail: string;
  title: string;
  provider?: string;
  rating?: number;
  learners?: string;
  price?: string;
  onPress?: () => void;
};

export default function CourseCard({
  thumbnail,
  title,
  provider,
  rating,
  learners,
  price = 'Free',
  onPress,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      className="rounded-2xl bg-white p-3 dark:bg-neutral-900"
      style={{
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        elevation: 3,
      }}
    >
      <ImageX uri={thumbnail} ratio={16 / 9} rounded="rounded-xl" />
      <View className="mt-3">
        <Text
          numberOfLines={2}
          className="text-base font-semibold text-neutral-900 dark:text-neutral-100"
        >
          {title}
        </Text>

        <View className="mt-1 flex-row items-center justify-between">
          <View className="flex-row items-center">
            {provider ? (
              <Text className="text-xs text-neutral-500">{provider}</Text>
            ) : null}
            {typeof rating === 'number' && (
              <Text className="ml-2 text-xs text-amber-600">
                ★ {rating.toFixed(1)}
              </Text>
            )}
          </View>
          <View className="flex-row items-center">
            {learners && (
              <Text className="text-xs text-neutral-500">
                {learners} học viên
              </Text>
            )}
          </View>
        </View>

        <View className="mt-2 flex-row items-center justify-between">
          <Text className="text-sm font-semibold text-emerald-600">
            {price}
          </Text>
          <Text className="rounded-full bg-neutral-100 px-2 py-1 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
            Course
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
