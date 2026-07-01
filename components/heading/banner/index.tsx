import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Banner() {
  return (
    <View className="items-center justify-center">
      <View className="w-screen">
        <View className="bg-blue-900 px-6 py-8">
          <View className="flex-row items-center justify-between">
            <View className="flex-1 pr-4">
              <Text className="mb-3 text-2xl font-bold text-white">
                Gain essential AI skills to enhance your career
              </Text>
              <Text className="mb-4 text-sm text-blue-200">
                Get started by learning from AI experts and industry leaders
                such as Google, Microsoft, IBM, and Vanderbilt University.
              </Text>
              <View className="flex-row gap-3">
                {/* <TouchableOpacity
                  className="rounded-lg bg-white px-4 py-2"
                  onPress={() => router.push('/(tabs)/discover')}
                >
                  <Text className="text-sm font-semibold text-blue-900">
                    Explore programs
                  </Text>
                </TouchableOpacity> */}
                <Link href="/(tabs)/discover" asChild>
                  <TouchableOpacity className="rounded-lg bg-white px-4 py-2">
                    <Text className="text-sm font-semibold text-blue-900">
                      Explore programs
                    </Text>
                  </TouchableOpacity>
                </Link>
                <TouchableOpacity className="rounded-lg border border-blue-300 px-4 py-2">
                  <Text className="text-sm font-semibold text-white">
                    Try Coursera for Business
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className="h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-blue-500">
              <Ionicons name="sparkles" size={32} color="white" />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
