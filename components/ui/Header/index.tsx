import { useAuth } from '@/lib/contexts/authContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import ImageX from '../ImageX';

type HeaderProps = {
  showBackButton?: boolean;
  showProfileButton?: boolean;
  onBackPress?: () => void;
  onProfilePress?: () => void;
  backTo?: string;
};

export default function Header({
  showBackButton = false,
  showProfileButton = false,
  onBackPress,
  onProfilePress,
  backTo,
}: HeaderProps) {
  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else if (backTo) {
      router.push(backTo as any);
    } else {
      router.back();
    }
  };

  const { user } = useAuth();

  const handleProfilePress = () => {
    if (onProfilePress) {
      onProfilePress();
    } else {
      router.push('/profile');
    }
  };

  return (
    <View className="mb-4">
      <View className="flex-row items-center justify-between">
        {showBackButton ? (
          <TouchableOpacity
            className="h-10 w-10 items-center justify-center rounded-full border border-gray-300"
            onPress={handleBackPress}
          >
            <Ionicons name="arrow-back-outline" size={20} color="gray" />
          </TouchableOpacity>
        ) : (
          <View className="h-10 w-10" />
        )}

        <TouchableOpacity onPress={() => router.push('/welcome')}>
          <Text className="text-2xl font-bold text-blue-600">Coursera</Text>
        </TouchableOpacity>

        {showProfileButton ? (
          <TouchableOpacity
            className="h-10 w-10 items-center justify-center rounded-full bg-gray-100"
            onPress={handleProfilePress}
          >
            {user?.avatar ? (
              <ImageX
                uri={user?.avatar}
                className="h-10 w-10 rounded-full"
                ratio={1}
                rounded="rounded-full"
              />
            ) : (
              <Ionicons name="person-outline" size={20} color="gray" />
            )}
          </TouchableOpacity>
        ) : (
          <View className="h-10 w-10" />
        )}
      </View>
    </View>
  );
}
