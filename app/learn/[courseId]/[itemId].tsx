import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

export default function LessonScreen() {
  const { courseId, itemId } = useLocalSearchParams();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 p-6">
        <Text className="mb-6 text-2xl font-bold text-gray-900">
          Lesson: {itemId}
        </Text>
        <Text className="mb-4 text-lg text-gray-700">Course: {courseId}</Text>
        <View className="flex-1 rounded-lg bg-gray-50 p-4">
          <Text className="text-gray-700">Lesson Content</Text>
          <Text className="mt-1 text-sm text-gray-500">
            Lesson materials will appear here
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
