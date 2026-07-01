# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
  "# Coursera-Native"

Structure & Tasks
app/
\_layout.tsx # Root Stack (providers, theme, query client...)
+not-found.tsx

(onboarding)/
\_layout.tsx
welcome.tsx
sign-in.tsx
sign-up.tsx
forgot-password.tsx

(tabs)/ # Main tabs
\_layout.tsx # <Tabs>
discover/ # Tab 1: Khám phá
\_layout.tsx # Stack riêng tab
index.tsx # /discover (feed, banner, categories)
category/[slug].tsx # /discover/category/:slug
search.tsx # /discover/search
learning/ # Tab 2: Học (enrollments)
\_layout.tsx
index.tsx # /learning (My Courses)
progress.tsx # tổng quan tiến độ
downloads/ # Tab 3: Tải về
\_layout.tsx
index.tsx
profile/ # Tab 4: Hồ sơ
\_layout.tsx
index.tsx
settings.tsx
notifications.tsx

course/ # Nhóm route chi tiết khóa học (ngoài tabs)
\_layout.tsx # Stack cho course
[courseId]/ # /course/:courseId/\*
index.tsx # Tổng quan khóa học, syllabus
about.tsx # mô tả, giảng viên
reviews.tsx
enroll.tsx # màn enroll/payment (nếu cần)

learn/ # Trình phát bài học, quiz
\_layout.tsx
[courseId]/[itemId].tsx # /learn/:courseId/:itemId (video/reading/quiz)
[courseId]/\_modal-note.tsx # ghi chú dạng modal (tuỳ chọn)

components/
ui/ # Button, Typography, Card, Tag...
course/
learning/
skeletons/

lib/
api/ # gọi API (axios/fetch), interceptor
queries/ # react-query hooks (useCourse, useEnrollments…)
store/ # Zustand/Redux (auth, player, downloads)
types/ # Course, Lesson, Quiz, Enrollment...
utils/ # formatters, time, secureStore helpers
constants/ # queryKeys, routes, colors, spacing

assets/
fonts/
images/
