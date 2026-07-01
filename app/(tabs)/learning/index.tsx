import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

export default function LearningScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold text-gray-900">My Learning</Text>
        <Text className="mt-4 text-gray-600">
          Your enrolled courses will appear here
        </Text>
      </View>
    </SafeAreaView>
  );
}
