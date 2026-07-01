import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleResetPassword = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1000);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 pt-6">
        <View className="mb-6">
          <TouchableOpacity
            className="h-10 w-10 items-center justify-center rounded-full border border-gray-300"
            onPress={() => router.back()}
          >
            <Text className="text-xl">←</Text>
          </TouchableOpacity>
        </View>
        <View className="mb-8">
          <Text className="text-3xl font-bold text-gray-900">
            Forgot Password?
          </Text>
          <Text className="mt-2 text-gray-600">
            No worries, well send you reset instructions
          </Text>
        </View>

        {success ? (
          <View className="flex-1 items-center justify-center">
            <View className="mb-6 h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <Text className="text-2xl text-green-600">✓</Text>
            </View>
            <Text className="text-center text-xl font-semibold text-gray-900">
              Reset instructions sent!
            </Text>
            <Text className="mt-2 text-center text-gray-600">
              We&apos;ve sent password reset instructions to your email
            </Text>
          </View>
        ) : (
          <View className="gap-3 space-y-6">
            <View>
              <Text className="mb-2 text-gray-700">Email</Text>
              <TextInput
                className="rounded-lg border border-gray-300 px-4 py-3 text-gray-900"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity
              className={`items-center rounded-lg py-4 ${loading ? 'bg-gray-400' : 'bg-blue-600'}`}
              onPress={handleResetPassword}
              disabled={loading}
            >
              <Text className="text-lg font-semibold text-white">
                {loading ? 'Sending...' : 'Reset Password'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
