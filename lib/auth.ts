import { User } from "./types";

// Mock users for authentication
export const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "salesman",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
];

// Mock function to authenticate user
export function authenticateUser(email: string, password: string) {
  // In a real app, this would check against a secure database
  // and properly hash the password
  const user = users.find((u) => u.email === email);
  
  // For demo, any password works for existing emails
  if (user) {
    return { success: true, user };
  }
  
  return { success: false, message: "Invalid email or password" };
}

// Mock function to create new user
export function createUser(name: string, email: string, password: string) {
  // In a real app, this would add to a secure database
  // and properly hash the password
  const existingUser = users.find((u) => u.email === email);
  
  if (existingUser) {
    return { success: false, message: "Email already exists" };
  }
  
  const newUser: User = {
    id: String(users.length + 1),
    name,
    email,
    role: "salesman",
  };
  
  users.push(newUser);
  
  return { success: true, user: newUser };
}