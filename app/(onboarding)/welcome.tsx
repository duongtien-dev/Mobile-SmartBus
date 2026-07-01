import { Banner, CourseCard, Header, MySpace, University } from '@/components';
import { router } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

export default function WelcomeScreen() {
  return (
    <MySpace>
      <MySpace.Header>
        <Header
          showBackButton={false}
          showProfileButton={true}
          onProfilePress={() => router.push('/sign-in')}
        />
      </MySpace.Header>

      <MySpace.ScrollableContent>
        <Banner />
        <University />

        <MySpace.Content>
          <View className="mb-6 items-center">
            <Text className="text-center text-3xl font-bold text-gray-900">
              Expand your career opportunities
            </Text>
            <Text className="mt-4 text-center text-gray-600">
              Advance your career with online courses from top universities and
              companies
            </Text>
          </View>

          <View className="mb-6 w-full">
            <Text className="mb-4 text-center text-3xl font-bold text-gray-900">
              Our Top Courses
            </Text>
          </View>

          {/* Hiển thị 2 card course trên 1 hàng */}
          <View className="mb-6 flex-row gap-3">
            <View className="flex-1">
              <CourseCard
                thumbnail="https://th.bing.com/th/id/OIP.eKsFhSm2OUU9uVt-0qUBHwHaEK?w=303&h=180&c=7&r=0&o=7&cb=12&dpr=1.1&pid=1.7&rm=3"
                title="Flutter từ cơ bản đến nâng cao"
                provider="DNREA"
                rating={4.8}
                learners="12k"
                price="Free"
                onPress={() => {}}
              />
            </View>
            <View className="flex-1">
              <CourseCard
                thumbnail="https://th.bing.com/th/id/OIP.eKsFhSm2OUU9uVt-0qUBHwHaEK?w=303&h=180&c=7&r=0&o=7&cb=12&dpr=1.1&pid=1.7&rm=3"
                title="React Native từ A đến Z"
                provider="Tech"
                rating={4.9}
                learners="8k"
                price="$29.99"
                onPress={() => {}}
              />
            </View>
          </View>

          <View className="mt-6 p-5">
            <Text className="text-center text-gray-500">
              By continuing, you agree to our{' '}
              <Text className="text-blue-600">Terms of Use</Text> and{' '}
              <Text className="text-blue-600">Privacy Policy</Text>
            </Text>
          </View>
        </MySpace.Content>
      </MySpace.ScrollableContent>
    </MySpace>
  );
}
