import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold text-gray-900">Profile</Text>
        <Text className="mt-4 text-gray-600">
          Your profile information will appear here
        </Text>
      </View>
    </SafeAreaView>
  );
}
