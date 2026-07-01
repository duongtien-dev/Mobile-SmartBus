import { useState } from 'react';
import { ActivityIndicator, Image, View } from 'react-native';

type Props = {
  uri: string;
  ratio?: number;
  rounded?: string;
  className?: string;
  alt?: string;
};

export default function ImageX({
  uri,
  ratio = 16 / 9,
  rounded = 'rounded-xl',
  className,
  alt,
}: Props) {
  const [loading, setLoading] = useState(true);
  return (
    <View
      className={`overflow-hidden ${rounded} ${className ?? ''}`}
      style={{ aspectRatio: ratio }}
    >
      {loading && (
        <View className="absolute inset-0 items-center justify-center bg-neutral-100">
          <ActivityIndicator />
        </View>
      )}
      <Image
        source={{ uri }}
        onLoadEnd={() => setLoading(false)}
        accessibilityLabel={alt}
        className="h-full w-full"
        resizeMode="cover"
      />
    </View>
  );
}
