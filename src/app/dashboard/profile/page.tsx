"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  User as UserIcon,
  Target,
  Activity,
  Award,
  Settings,
  Save,
  ChevronRight,
  LogOut,
  Camera,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth";
import { MobileNav } from "@/components/MobileNav";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useRouter } from "next/navigation";

type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced' | 'pro';
type ActivityLevel = 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extra_active';
type PrimaryGoal = 'lose_weight' | 'gain_muscle' | 'improve_endurance' | 'health_wellness' | 'strength';

interface FormData {
  name: string;
  experience: ExperienceLevel;
  activityLevel: ActivityLevel;
  primaryGoal: PrimaryGoal;
}

export default function ProfilePage() {
  const { user, updateProfile, logout } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    experience: "beginner",
    activityLevel: "lightly_active",
    primaryGoal: "gain_muscle",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        experience: (user.experience as ExperienceLevel) || "beginner",
        activityLevel: (user.activityLevel as ActivityLevel) || "lightly_active",
        primaryGoal: (user.primaryGoal as PrimaryGoal) || "gain_muscle",
      });
    }
  }, [user]);

  const handleSave = async () => {
    setIsSaving(true);
    await updateProfile(formData);
    setIsSaving(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const goalOptions = [
    { id: "lose_weight", label: "Hubnutí", icon: "🔥" },
    { id: "gain_muscle", label: "Nabírání svalů", icon: "💪" },
    { id: "strength", label: "Síla", icon: "🏋️‍♂️" },
    { id: "improve_endurance", label: "Vytrvalost", icon: "🏃‍♂️" },
    { id: "health_wellness", label: "Zdraví", icon: "🧘" },
  ];

  const experienceOptions = [
    { id: "beginner", label: "Začátečník" },
    { id: "intermediate", label: "Středně pokročilý" },
    { id: "advanced", label: "Pokročilý" },
    { id: "pro", label: "Profi" },
  ];

  const activityOptions = [
    { id: "sedentary", label: "Sedavé (kancelář)" },
    { id: "lightly_active", label: "Lehce aktivní" },
    { id: "moderately_active", label: "Středně aktivní" },
    { id: "very_active", label: "Velmi aktivní" },
    { id: "extra_active", label: "Extrémně aktivní" },
  ];

  return (
    <div className="min-h-screen bg-[#030303] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#030303]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold">Můj Profil</h1>
          </div>
          <Button 
            size="sm" 
            onClick={handleSave} 
            disabled={isSaving}
            className={showSuccess ? "bg-[#10b981]" : ""}
          >
            {isSaving ? "Ukládám..." : showSuccess ? "Uloženo!" : "Uložit změny"}
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 pb-24">
        <div className="space-y-8">
          {/* User Hero */}
          <section className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#ff6b35] to-[#e53935] flex items-center justify-center text-4xl font-bold border-4 border-[#030303] shadow-xl">
                {user?.name?.charAt(0) || "U"}
              </div>
              <button className="absolute bottom-0 right-0 p-2 rounded-full bg-white text-black shadow-lg hover:bg-gray-200 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <h2 className="text-2xl font-bold">{user?.name}</h2>
            <p className="text-gray-500">{user?.email}</p>
          </section>

          {/* Goals Selection */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-5 h-5 text-[#ff6b35]" />
              <h3 className="text-lg font-bold">Můj hlavní cíl</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {goalOptions.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => setFormData({ ...formData, primaryGoal: goal.id as PrimaryGoal })}
                  className={`p-4 rounded-2xl border transition-all text-center flex flex-col items-center gap-2 ${
                    formData.primaryGoal === goal.id
                      ? "border-[#ff6b35] bg-[#ff6b35]/10"
                      : "border-white/5 bg-white/[0.02] hover:border-white/10"
                  }`}
                >
                  <span className="text-2xl">{goal.icon}</span>
                  <span className="text-xs font-medium">{goal.label}</span>
                  {formData.primaryGoal === goal.id && (
                    <div className="w-4 h-4 rounded-full bg-[#ff6b35] flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* Profile Settings */}
          <section className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-5 h-5 text-[#8b5cf6]" />
                <h3 className="font-bold">Zkušenosti</h3>
              </div>
              <div className="space-y-2">
                {experienceOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setFormData({ ...formData, experience: opt.id as ExperienceLevel })}
                    className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                      formData.experience === opt.id
                        ? "border-[#8b5cf6] bg-[#8b5cf6]/10"
                        : "border-white/5 bg-white/[0.02] hover:bg-white/5"
                    }`}
                  >
                    <span className="text-sm font-medium">{opt.label}</span>
                    {formData.experience === opt.id && <Check className="w-4 h-4 text-[#8b5cf6]" />}
                  </button>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Activity className="w-5 h-5 text-[#10b981]" />
                <h3 className="font-bold">Denní aktivita</h3>
              </div>
              <div className="space-y-2">
                {activityOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setFormData({ ...formData, activityLevel: opt.id as ActivityLevel })}
                    className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                      formData.activityLevel === opt.id
                        ? "border-[#10b981] bg-[#10b981]/10"
                        : "border-white/5 bg-white/[0.02] hover:bg-white/5"
                    }`}
                  >
                    <span className="text-sm font-medium">{opt.label}</span>
                    {formData.activityLevel === opt.id && <Check className="w-4 h-4 text-[#10b981]" />}
                  </button>
                ))}
              </div>
            </Card>
          </section>

          {/* Account Actions */}
          <section className="pt-8 border-t border-white/5">
            <button
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="w-full p-4 rounded-xl bg-red-500/10 text-red-500 font-bold flex items-center justify-center gap-2 hover:bg-red-500/20 transition-all"
            >
              <LogOut className="w-5 h-5" />
              Odhlásit se
            </button>
          </section>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
