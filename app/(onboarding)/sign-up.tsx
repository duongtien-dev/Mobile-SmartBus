import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/(tabs)/discover');
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
            <Ionicons name="arrow-back-outline" size={24} color="blue" />
          </TouchableOpacity>
        </View>
        <View className="mb-8">
          <Text className="text-3xl font-bold text-gray-900">
            Create Account
          </Text>
          <Text className="mt-2 text-gray-600">
            Lets get started with your account
          </Text>
        </View>

        <View className="gap-3 space-y-4">
          <View>
            <Text className="mb-2 text-gray-700">Full Name</Text>
            <TextInput
              className="rounded-lg border border-gray-300 px-4 py-3 text-gray-900"
              placeholder="Enter your full name"
              value={name}
              onChangeText={setName}
            />
          </View>

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

          <View>
            <Text className="mb-2 text-gray-700">Password</Text>
            <TextInput
              className="rounded-lg border border-gray-300 px-4 py-3 text-gray-900"
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <View>
            <Text className="mb-2 text-gray-700">Confirm Password</Text>
            <TextInput
              className="rounded-lg border border-gray-300 px-4 py-3 text-gray-900"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            className={`mt-6 items-center rounded-lg py-4 ${loading ? 'bg-gray-400' : 'bg-blue-600'}`}
            onPress={handleSignUp}
            disabled={loading}
          >
            <Text className="text-lg font-semibold text-white">
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Text>
          </TouchableOpacity>
        </View>

        <View className="my-8">
          <View className="flex-row items-center">
            <View className="h-px flex-1 bg-gray-300"></View>
            <Text className="mx-4 text-gray-500">or continue with</Text>
            <View className="h-px flex-1 bg-gray-300"></View>
          </View>

          <View className="mt-6 flex-row justify-center gap-3 space-x-6">
            <TouchableOpacity className="h-12 w-12 items-center justify-center rounded-full border border-gray-300">
              <Text className="text-2xl">G</Text>
            </TouchableOpacity>
            <TouchableOpacity className="h-12 w-12 items-center justify-center rounded-full border border-gray-300">
              <Text className="text-2xl">f</Text>
            </TouchableOpacity>
            <TouchableOpacity className="h-12 w-12 items-center justify-center rounded-full border border-gray-300">
              <Text className="text-2xl">in</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="mt-auto flex-row justify-center py-6">
          <Text className="text-center text-gray-600">
            Already have an account?
          </Text>
          <Link href="/sign-in">
            <Text className="ml-2 font-semibold text-blue-600">Sign in</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
