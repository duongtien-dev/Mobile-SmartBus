import React from 'react';
import { SafeAreaView, Text, TextInput, View } from 'react-native';

export default function SearchScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 p-6">
        <Text className="mb-6 text-2xl font-bold text-gray-900">
          Search Courses
        </Text>
        <TextInput
          className="mb-6 rounded-lg border border-gray-300 px-4 py-3 text-gray-900"
          placeholder="Search for courses, skills, or subjects"
        />
        <View className="rounded-lg bg-gray-50 p-4">
          <Text className="text-gray-700">Search Results</Text>
          <Text className="mt-1 text-sm text-gray-500">
            Your search results will appear here
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
