"use client";

import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { PageHeader } from "@/components/layout/page-header";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { authenticateUser, createUser } from "@/lib/auth";
import { LockKeyhole, Mail, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Form schema for login
const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

// Form schema for signup
const signupSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  confirmPassword: z.string().min(1, {
    message: "Please confirm your password.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

export default function SalesmanLoginPage() {
  const [activeTab, setActiveTab] = useState<string>("login");
  const [loginMessage, setLoginMessage] = useState<{ 
    message: string; 
    type: "success" | "error"; 
  } | null>(null);
  const [signupMessage, setSignupMessage] = useState<{ 
    message: string; 
    type: "success" | "error"; 
  } | null>(null);
  
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  
  const onLoginSubmit = (values: z.infer<typeof loginSchema>) => {
    const result = authenticateUser(values.email, values.password);
    
    if (result.success) {
      setLoginMessage({
        message: "Login successful!",
        type: "success",
      });
      loginForm.reset();
    } else {
      setLoginMessage({
        message: result.message || "Invalid email or password.",
        type: "error",
      });
    }
  };
  
  const onSignupSubmit = (values: z.infer<typeof signupSchema>) => {
    const result = createUser(values.name, values.email, values.password);
    
    if (result.success) {
      setSignupMessage({
        message: "Account created successfully! You can now login.",
        type: "success",
      });
      signupForm.reset();
      // Switch to login tab after successful signup
      setTimeout(() => {
        setActiveTab("login");
        setSignupMessage(null);
      }, 2000);
    } else {
      setSignupMessage({
        message: result.message || "Error creating account.",
        type: "error",
      });
    }
  };
  
  const handleForgotPassword = () => {
    // In a real app, this would trigger a password reset flow
    alert("Password reset functionality would be triggered here.");
  };

  return (
    <div>
      <PageHeader
        title="Salesman Portal"
        subtitle="Login or create a new salesman account"
      />
      
      <div className="max-w-md mx-auto">
        <Card className="border-none shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome to Salesman Portal</CardTitle>
            <CardDescription>
              Login or create a new account to access sales tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                {loginMessage && (
                  <div 
                    className={`p-3 mb-4 rounded-md text-sm ${
                      loginMessage.type === "success" 
                        ? "bg-green-100 text-green-800 border border-green-200" 
                        : "bg-red-100 text-red-800 border border-red-200"
                    }`}
                  >
                    {loginMessage.message}
                  </div>
                )}
                
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input 
                                placeholder="Enter your email" 
                                className="pl-10" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input 
                                type="password" 
                                placeholder="Enter your password" 
                                className="pl-10" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                          <div className="text-right">
                            <Button
                              type="button"
                              variant="link"
                              className="p-0 h-auto text-sm"
                              onClick={handleForgotPassword}
                            >
                              Forgot Password?
                            </Button>
                          </div>
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">Login</Button>
                  </form>
                </Form>
              </TabsContent>
              
              <TabsContent value="signup">
                {signupMessage && (
                  <div 
                    className={`p-3 mb-4 rounded-md text-sm ${
                      signupMessage.type === "success" 
                        ? "bg-green-100 text-green-800 border border-green-200" 
                        : "bg-red-100 text-red-800 border border-red-200"
                    }`}
                  >
                    {signupMessage.message}
                  </div>
                )}
                
                <Form {...signupForm}>
                  <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
                    <FormField
                      control={signupForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input 
                                placeholder="Enter your full name" 
                                className="pl-10" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input 
                                placeholder="Enter your email" 
                                className="pl-10" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input 
                                type="password" 
                                placeholder="Create a password" 
                                className="pl-10" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input 
                                type="password" 
                                placeholder="Confirm your password" 
                                className="pl-10" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">Create Account</Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}