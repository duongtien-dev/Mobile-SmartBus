import { Link, Stack } from 'expo-router';
import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center p-6">
          <Text className="mb-4 text-6xl font-bold text-gray-300">404</Text>
          <Text className="mb-2 text-2xl font-bold text-gray-900">
            Page Not Found
          </Text>
          <Text className="mb-8 text-center text-gray-600">
            Sorry, we couldnt find the page youre looking for.
          </Text>
          <Link href="/" className="rounded-lg bg-blue-600 px-6 py-3">
            <Text className="font-semibold text-white">Go to home</Text>
          </Link>
        </View>
      </SafeAreaView>
    </>
  );
}
