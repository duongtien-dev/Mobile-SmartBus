import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

export default function SettingsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 p-6">
        <Text className="mb-6 text-2xl font-bold text-gray-900">Settings</Text>
        <View className="rounded-lg bg-gray-50 p-4">
          <Text className="text-gray-700">Account Settings</Text>
          <Text className="mt-1 text-sm text-gray-500">
            Manage your account preferences
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
