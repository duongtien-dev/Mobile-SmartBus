import { AuthResponse, User } from '../types/user';

// Fake users for authentication testing
export const fakeUsers: (User & { password: string })[] = [
  {
    id: 1,
    email: 'admin@coursera.com',
    password: '123456',
    name: 'Admin User',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    role: 'admin',
  },
  {
    id: 2,
    email: 'user@coursera.com',
    password: '123456',
    name: 'John Doe',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    role: 'student',
  },
  {
    id: 3,
    email: 'student@coursera.com',
    password: '123456',
    name: 'Jane Smith',
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    role: 'student',
  },
];

export const authenticateUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const user = fakeUsers.find(
    u => u.email === email && u.password === password
  );

  if (user) {
    const { password, ...userWithoutPassword } = user;
    return {
      success: true,
      user: userWithoutPassword,
      token: `fake_token_${user.id}_${Date.now()}`,
    };
  }

  return {
    success: false,
    error: 'Invalid email or password',
  };
};

export const userProfile = {
  id: 1,
  name: 'John Doe',
  email: 'user@coursera.com',
  avatar:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  role: 'student',
  enrolledCourses: 5,
  completedCourses: 2,
  certificates: 1,
  learningStreak: 7,
  totalHours: 45,
  joinDate: '2024-01-15',
  bio: 'Passionate about learning new technologies and improving my skills.',
  skills: ['React Native', 'JavaScript', 'TypeScript', 'Flutter'],
  achievements: [
    {
      id: 1,
      title: 'First Course Completed',
      description: 'Completed your first course',
      icon: 'trophy',
      date: '2024-01-20',
    },
    {
      id: 2,
      title: '7-Day Learning Streak',
      description: 'Learned for 7 consecutive days',
      icon: 'flame',
      date: '2024-01-25',
    },
  ],
};

export const courses = [
  {
    id: 1,
    thumbnail:
      'https://th.bing.com/th/id/OIP.eKsFhSm2OUU9uVt-0qUBHwHaEK?w=303&h=180&c=7&r=0&o=7&cb=12&dpr=1.1&pid=1.7&rm=3',
    title: 'Flutter từ cơ bản - nâng cao',
    provider: 'DNREA',
    rating: 4.8,
    learners: '12k',
    price: 'Free',
  },
  {
    id: 2,
    thumbnail:
      'https://th.bing.com/th/id/OIP.eKsFhSm2OUU9uVt-0qUBHwHaEK?w=303&h=180&c=7&r=0&o=7&cb=12&dpr=1.1&pid=1.7&rm=3',
    title: 'React Native từ A đến Z',
    provider: 'Tech',
    rating: 4.9,
    learners: '8k',
    price: '$29.99',
  },
  {
    id: 3,
    thumbnail:
      'https://th.bing.com/th/id/OIP.eKsFhSm2OUU9uVt-0qUBHwHaEK?w=303&h=180&c=7&r=0&o=7&cb=12&dpr=1.1&pid=1.7&rm=3',
    title: 'JavaScript ES6+ Advanced',
    provider: 'CodeAcademy',
    rating: 4.7,
    learners: '15k',
    price: '$19.99',
  },
  {
    id: 4,
    thumbnail:
      'https://th.bing.com/th/id/OIP.eKsFhSm2OUU9uVt-0qUBHwHaEK?w=303&h=180&c=7&r=0&o=7&cb=12&dpr=1.1&pid=1.7&rm=3',
    title: 'Python Data Science',
    provider: 'DataCamp',
    rating: 4.9,
    learners: '25k',
    price: '$39.99',
  },
  {
    id: 5,
    thumbnail:
      'https://th.bing.com/th/id/OIP.eKsFhSm2OUU9uVt-0qUBHwHaEK?w=303&h=180&c=7&r=0&o=7&cb=12&dpr=1.1&pid=1.7&rm=3',
    title: 'UI/UX Design Fundamentals',
    provider: 'DesignSchool',
    rating: 4.6,
    learners: '18k',
    price: 'Free',
  },
  {
    id: 6,
    thumbnail:
      'https://th.bing.com/th/id/OIP.eKsFhSm2OUU9uVt-0qUBHwHaEK?w=303&h=180&c=7&r=0&o=7&cb=12&dpr=1.1&pid=1.7&rm=3',
    title: 'Machine Learning Basics',
    provider: 'AI Academy',
    rating: 4.8,
    learners: '30k',
    price: '$49.99',
  },
  {
    id: 7,
    thumbnail:
      'https://th.bing.com/th/id/OIP.eKsFhSm2OUU9uVt-0qUBHwHaEK?w=303&h=180&c=7&r=0&o=7&cb=12&dpr=1.1&pid=1.7&rm=3',
    title: 'Web Development Bootcamp',
    provider: 'WebDev Pro',
    rating: 4.9,
    learners: '22k',
    price: '$79.99',
  },
];
