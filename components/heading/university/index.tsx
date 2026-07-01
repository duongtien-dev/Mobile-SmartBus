import { Text, View } from 'react-native';

export default function University() {
  return (
    <View className="mb-3 w-screen">
      <View className="bg-gray-100 px-6 py-8">
        <Text className="mb-6 text-center font-semibold text-gray-800">
          We collaborate with 350+ leading universities and companies
        </Text>
        <View className="flex-row flex-wrap items-center justify-center gap-4">
          <View className="rounded-lg bg-white px-3 py-2">
            <Text className="text-xs font-bold text-orange-600">ILLINOIS</Text>
          </View>
          <View className="rounded-lg bg-white px-3 py-2">
            <Text className="text-xs font-bold text-blue-600">Duke</Text>
          </View>
          <View className="rounded-lg bg-white px-3 py-2">
            <Text className="text-xs font-bold text-blue-500">Google</Text>
          </View>
          <View className="rounded-lg bg-white px-3 py-2">
            <Text className="text-xs font-bold text-yellow-600">MICHIGAN</Text>
          </View>
          <View className="rounded-lg bg-white px-3 py-2">
            <Text className="text-xs font-bold text-blue-600">IBM</Text>
          </View>
          <View className="rounded-lg bg-white px-3 py-2">
            <Text className="text-xs font-bold text-blue-700">Imperial</Text>
          </View>
          <View className="rounded-lg bg-white px-3 py-2">
            <Text className="text-xs font-bold text-red-600">Stanford</Text>
          </View>
          <View className="rounded-lg bg-white px-3 py-2">
            <Text className="text-xs font-bold text-red-600">Penn</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
