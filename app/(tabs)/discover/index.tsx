import { CourseCard, Header, MySpace } from '@/components';
import { courses } from '@/lib/constants/data';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const categories = [
  { id: 'all', name: 'All', icon: 'grid-outline' },
  { id: 'tech', name: 'Technology', icon: 'laptop-outline' },
  { id: 'business', name: 'Business', icon: 'briefcase-outline' },
  { id: 'design', name: 'Design', icon: 'color-palette-outline' },
  { id: 'data', name: 'Data Science', icon: 'analytics-outline' },
  { id: 'health', name: 'Health', icon: 'medical-outline' },
];

export default function DiscoverScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = courses.filter(course => {
    const matchesCategory =
      selectedCategory === 'all' ||
      course.provider.toLowerCase().includes(selectedCategory);
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <MySpace>
      <MySpace.Header>
        <Header
          showProfileButton={true}
          onProfilePress={() => router.push('/profile')}
        />
        <View className="mt-4 flex-row items-center rounded-xl bg-gray-100 px-4 py-3">
          <Ionicons name="search-outline" size={20} color="gray" />
          <TextInput
            className="ml-3 flex-1 text-gray-900"
            placeholder="Search courses..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="gray"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="gray" />
            </TouchableOpacity>
          )}
        </View>
      </MySpace.Header>

      <MySpace.ScrollableContent>
        <View className="mb-6">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-3 px-6">
              {categories.map(category => (
                <TouchableOpacity
                  key={category.id}
                  className={`flex-row items-center rounded-full px-4 py-2 ${
                    selectedCategory === category.id
                      ? 'bg-blue-600'
                      : 'bg-gray-100'
                  }`}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <Ionicons
                    name={category.icon as any}
                    size={16}
                    color={selectedCategory === category.id ? 'white' : 'gray'}
                  />
                  <Text
                    className={`ml-2 text-sm font-medium ${
                      selectedCategory === category.id
                        ? 'text-white'
                        : 'text-gray-700'
                    }`}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        <View className="mb-6">
          <View className="mb-4 flex-row items-center justify-between px-6">
            <Text className="text-xl font-bold text-gray-900">
              Featured Courses
            </Text>
            <TouchableOpacity>
              <Text className="font-medium text-blue-600">See all</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-4 px-6">
              {courses.slice(0, 3).map(course => (
                <View key={course.id} className="w-64">
                  <CourseCard
                    thumbnail={course.thumbnail}
                    title={course.title}
                    provider={course.provider}
                    rating={course.rating}
                    learners={course.learners}
                    price={course.price}
                    onPress={() => router.push(`/course/${course.id}`)}
                  />
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        <MySpace.Content>
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-xl font-bold text-gray-900">All Courses</Text>
            <View className="flex-row gap-2">
              <TouchableOpacity className="rounded-lg bg-gray-100 p-2">
                <Ionicons name="grid-outline" size={16} color="gray" />
              </TouchableOpacity>
              <TouchableOpacity className="rounded-lg bg-blue-600 p-2">
                <Ionicons name="list-outline" size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex-row flex-wrap gap-3">
            {filteredCourses.map(course => (
              <View key={course.id} className="w-[48%]">
                <CourseCard
                  thumbnail={course.thumbnail}
                  title={course.title}
                  provider={course.provider}
                  rating={course.rating}
                  learners={course.learners}
                  price={course.price}
                  onPress={() => router.push(`/course/${course.id}`)}
                />
              </View>
            ))}
          </View>

          {filteredCourses.length === 0 && (
            <View className="items-center py-12">
              <Ionicons name="search-outline" size={48} color="gray" />
              <Text className="mt-4 text-lg font-medium text-gray-500">
                No courses found
              </Text>
              <Text className="mt-2 text-center text-gray-400">
                Try adjusting your search or category filter
              </Text>
            </View>
          )}
        </MySpace.Content>
      </MySpace.ScrollableContent>
    </MySpace>
  );
}
