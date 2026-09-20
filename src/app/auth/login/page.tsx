"use client";
import {useState} from "react";import {useRouter} from "next/navigation";import Link from "next/link";import {createClient} from "@/lib/supabase/client";import {ArrowLeft,ArrowRight,Loader2,Sparkles} from "lucide-react";
export default function LoginPage(){const router=useRouter();const[email,setEmail]=useState("");const[password,setPassword]=useState("");const[loading,setLoading]=useState(false);const[error,setError]=useState<string|null>(null);const[isSignUp,setIsSignUp]=useState(false);const supabase=createClient();const emailAuth=async(e:React.FormEvent)=>{e.preventDefault();setLoading(true);setError(null);try{if(isSignUp){const{error}=await supabase.auth.signUp({email,password,options:{emailRedirectTo:`${window.location.origin}/auth/callback`}});if(error)throw error;setError("Check your email to confirm your account.")}else{const{error}=await supabase.auth.signInWithPassword({email,password});if(error)throw error;router.push("/dashboard");router.refresh()}}catch(err){setError(err instanceof Error?err.message:"Authentication failed")}finally{setLoading(false)}};const oauth=async(provider:"google"|"github")=>{setLoading(true);setError(null);try{const{error}=await supabase.auth.signInWithOAuth({provider,options:{redirectTo:`${window.location.origin}/auth/callback`}});if(error)throw error}catch(err){setError(err instanceof Error?err.message:"OAuth failed");setLoading(false)}};return <main className="auth-page"><section className="auth-story"><div className="auth-story-copy"><Link href="/" className="relative z-10 flex items-center gap-3 self-start"><span className="brand-mark"><Sparkles className="relative z-10 h-4 w-4"/></span><strong>Democrat<span className="text-[#ff5b3f]">.ai</span></strong></Link><div className="auth-quote">One source.<em>A complete distribution system.</em></div><div className="auth-process"><span>01 Understand</span><span>02 Generate</span><span>03 Optimize</span><span>04 Review</span></div></div></section><section className="auth-form-wrap"><div className="auth-form"><Link href="/" className="mb-10 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.12em] text-[#77736b]"><ArrowLeft className="h-3.5 w-3.5"/>Back to product</Link><span className="section-index">YOUR WORKSPACE</span><h1 className="mt-3">{isSignUp?"Create your account":"Welcome back"}</h1><p>{isSignUp?"Start turning source material into native content.":"Continue building your content pipeline."}</p><div className="auth-socials"><button onClick={()=>oauth("google")} disabled={loading}>Continue with Google</button><button onClick={()=>oauth("github")} disabled={loading}>Continue with GitHub</button></div><div className="auth-divider">OR USE EMAIL</div><form onSubmit={emailAuth} className="space-y-4"><div><label htmlFor="email" className="text-[10px] font-semibold uppercase tracking-[.1em]">Email</label><input id="email" type="email" autoComplete="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com" className="mt-2 h-12 w-full rounded-[10px] border border-black/10 bg-[#faf8f3] px-4 text-sm outline-none focus:border-[#ff5b3f]"/></div><div><label htmlFor="password" className="text-[10px] font-semibold uppercase tracking-[.1em]">Password</label><input id="password" type="password" autoComplete={isSignUp?"new-password":"current-password"} minLength={6} required value={password} onChange={e=>setPassword(e.target.value)} placeholder="At least 6 characters" className="mt-2 h-12 w-full rounded-[10px] border border-black/10 bg-[#faf8f3] px-4 text-sm outline-none focus:border-[#ff5b3f]"/></div>{error&&<p role="alert" className={`rounded-lg px-3 py-2 text-xs ${error.startsWith("Check")?"bg-emerald-50 text-emerald-800":"bg-red-50 text-red-700"}`}>{error}</p>}<button type="submit" disabled={loading} className="signal-button !mt-6 w-full">{loading?<Loader2 className="h-4 w-4 animate-spin"/>:<>{isSignUp?"Create account":"Enter workspace"}<ArrowRight className="h-4 w-4"/></>}</button></form><p className="mt-6 text-center text-xs text-[#77736b]">{isSignUp?"Already have an account?":"New to Democrat.ai?"} <button onClick={()=>{setIsSignUp(v=>!v);setError(null)}} className="font-semibold text-[#11110f] underline decoration-[#ff5b3f] underline-offset-4">{isSignUp?"Log in":"Create account"}</button></p><p className="mt-8 text-center text-[9px] leading-4 text-[#99948a]">By continuing, you agree to use AI-generated output responsibly and review content before publishing.</p></div></section></main>}"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/client";
import { Sparkles, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);

  const supabase = createClient();

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        if (error) throw error;
        setError(null);
        alert("Check your email for the confirmation link!");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: "google" | "github") => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err.message : "OAuth failed");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-muted/30 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mb-2 flex justify-center">
            <Sparkles className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </CardTitle>
          <CardDescription>
            {isSignUp
              ? "Start repurposing content with AI"
              : "Log in to your Democrat.ai account"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleOAuthLogin("google")}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            )}
            Continue with Google
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleOAuthLogin("github")}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            )}
            Continue with GitHub
          </Button>

          <div className="relative">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
              or
            </span>
          </div>

          <form onSubmit={handleEmailAuth} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {isSignUp ? "Create Account" : "Log In"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError(null);
              }}
              className="text-primary hover:underline"
            >
              {isSignUp ? "Log In" : "Sign Up"}
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
