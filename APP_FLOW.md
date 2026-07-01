# App Flow Structure

## 🚀 **Flow mới hợp lý:**

### **1. Entry Point (`app/index.tsx`)**

```
/ → Redirect to main app (/(tabs)/discover)
```

- **Check authentication** status
- **Redirect** đến main app hoặc auth flow

### **2. Main App (`app/(tabs)/`)**

```
/(tabs)/discover    → Discover courses
/(tabs)/learning    → My learning progress
/(tabs)/downloads   → Downloaded courses
/(tabs)/profile     → User profile
```

### **3. Authentication Flow (`app/(onboarding)/`)**

```
/welcome           → Landing page (marketing)
/sign-in          → Login form
/sign-up          → Register form
/forgot-password  → Reset password
```

### **4. Course Flow (`app/course/`)**

```
/course/[courseId]        → Course overview
/course/[courseId]/about  → Course details
/course/[courseId]/enroll → Enrollment
/course/[courseId]/reviews → Reviews
```

### **5. Learning Flow (`app/learn/`)**

```
/learn/[courseId]/[itemId] → Course content
/learn/[courseId]/_modal-note → Take notes
```

## 📱 **Navigation Logic:**

### **From Main App:**

- **Profile** → `/sign-in` (if not authenticated)
- **Course** → `/course/[id]` (course details)
- **Enroll** → `/course/[id]/enroll`

### **From Auth Flow:**

- **Sign In Success** → `/(tabs)/discover`
- **Sign Up Success** → `/(tabs)/discover`
- **Welcome** → `/sign-in` or `/sign-up`

### **From Course:**

- **Start Learning** → `/learn/[courseId]/[itemId]`
- **View Reviews** → `/course/[courseId]/reviews`

## 🔄 **State Management:**

```typescript
// TODO: Add authentication state
const isAuthenticated = false; // Check from storage/context

if (isAuthenticated) {
  return <Redirect href="/(tabs)/discover" />;
} else {
  return <Redirect href="/welcome" />;
}
```

## 🎯 **Benefits:**

- ✅ **Clear separation** between auth and main app
- ✅ **Logical flow** from landing → auth → main app
- ✅ **Consistent navigation** patterns
- ✅ **Easy to understand** structure
- ✅ **Scalable** for future features
