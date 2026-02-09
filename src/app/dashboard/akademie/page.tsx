"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft,
  Search,
  Clock,
  ChevronRight,
  BookOpen,
  Star,
  Sparkles,
  Zap,
  Filter,
  X,
  Crown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { academyCategories, academyArticles, AcademyArticle } from "@/lib/academyData";
import { MobileNav } from "@/components/MobileNav";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function AcademyPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | "all">("all");
  const [selectedArticle, setSelectedArticle] = useState<AcademyArticle | null>(null);

  const filteredArticles = academyArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(search.toLowerCase()) || 
                         article.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "all" || article.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="p-2 -ml-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-xl font-bold">Fitness Akademie</h1>
                <p className="text-xs text-gray-500">Vzdělávání pro tvůj progres</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                <Sparkles className="w-4 h-4 text-[#ff6b35]" />
                <span className="text-xs font-bold text-gray-300">Nové články týdně</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Hledat v akademii (např. Arnold, Kreatin)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-[#ff6b35] focus:ring-1 focus:ring-[#ff6b35]/20 transition-all"
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 pb-32">
        {/* Categories Grid */}
        <section className="mb-12">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">Kategorie</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <button
              onClick={() => setActiveCategory("all")}
              className={`p-4 rounded-2xl border transition-all text-left flex flex-col gap-3 group ${
                activeCategory === "all" 
                  ? "bg-[#ff6b35]/10 border-[#ff6b35] shadow-lg shadow-[#ff6b35]/10" 
                  : "bg-white/[0.02] border-white/5 hover:border-white/20"
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                activeCategory === "all" ? "bg-[#ff6b35] text-white" : "bg-white/5 text-gray-400 group-hover:text-white"
              }`}>
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-sm block">Vše</span>
                <span className="text-[10px] text-gray-500">Kompletní knihovna</span>
              </div>
            </button>

            {academyCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`p-4 rounded-2xl border transition-all text-left flex flex-col gap-3 group ${
                  activeCategory === cat.id 
                    ? "bg-[#ff6b35]/10 border-[#ff6b35] shadow-lg shadow-[#ff6b35]/10" 
                    : "bg-white/[0.02] border-white/5 hover:border-white/20"
                }`}
              >
                <div 
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                    activeCategory === cat.id ? "text-white" : "text-gray-400 group-hover:text-white"
                  }`}
                  style={{ backgroundColor: activeCategory === cat.id ? cat.color : `${cat.color}15` }}
                >
                  <cat.icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-sm block">{cat.name}</span>
                  <span className="text-[10px] text-gray-500 truncate">{cat.description}</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Featured Banner (only if 'all' is active and no search) */}
        {activeCategory === "all" && !search && (
          <section className="mb-12">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#ff6b35] to-[#e53935] p-8 md:p-12">
              <div className="relative z-10 max-w-lg">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest mb-4">
                  <Star className="w-3 h-3 fill-white" />
                  Výběr měsíce
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                  Tajemství Arnoldova tréninku
                </h2>
                <p className="text-white/80 text-lg mb-8">
                  Hluboký rozbor techniky Golden Era, která funguje dodnes. Propojení mysli a svalu v praxi.
                </p>
                <Button 
                  onClick={() => setSelectedArticle(academyArticles.find(a => a.id === "legend-arnold") || null)}
                  size="lg" 
                  className="bg-black text-white hover:bg-black/80"
                >
                  Číst článek
                  <ChevronRight className="w-5 h-5 ml-1" />
                </Button>
              </div>
              <Crown className="absolute -right-12 -bottom-12 w-64 h-64 text-white/10 rotate-12" />
            </div>
          </section>
        )}

        {/* Articles List */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold flex items-center gap-3">
              <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              Články k tématu
            </h2>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Filter className="w-4 h-4" />
              Seřazeno podle popularity
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredArticles.map((article, index) => {
                const category = academyCategories.find(c => c.id === article.category);
                return (
                  <motion.div
                    key={article.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card 
                      hover 
                      className="p-6 h-full flex flex-col border-white/5 hover:border-[#ff6b35]/30 cursor-pointer group"
                      onClick={() => setSelectedArticle(article)}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div 
                          className="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider"
                          style={{ backgroundColor: `${category?.color}15`, color: category?.color }}
                        >
                          {category?.name}
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </div>
                      </div>

                      <h3 className="text-xl font-bold mb-3 group-hover:text-[#ff6b35] transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-500 text-sm mb-6 flex-1 line-clamp-3">
                        {article.description}
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                        <div className="flex gap-1">
                          {article.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="text-[10px] text-gray-600">#{tag}</span>
                          ))}
                        </div>
                        <div className="flex items-center gap-1 text-[#ff6b35] font-bold text-xs uppercase tracking-widest">
                          Číst více
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-20 bg-white/[0.02] border border-dashed border-white/10 rounded-3xl">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-lg font-bold">Nebyly nalezeny žádné články</h3>
              <p className="text-gray-500 mb-6">Zkus změnit filtry nebo hledaný výraz.</p>
              <Button variant="outline" onClick={() => { setSearch(""); setActiveCategory("all"); }}>
                Vymazat vše
              </Button>
            </div>
          )}
        </section>
      </main>

      <MobileNav />

      {/* Article Detail Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <ArticleModal 
            article={selectedArticle} 
            onClose={() => setSelectedArticle(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ArticleModal({ article, onClose }: { article: AcademyArticle, onClose: () => void }) {
  const category = academyCategories.find(c => c.id === article.category);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[100] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.95 }}
        className="bg-[var(--bg-secondary)] border border-white/10 w-full max-w-4xl max-h-full overflow-y-auto rounded-3xl shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Banner */}
        <div 
          className="h-48 md:h-64 w-full relative"
          style={{ background: `linear-gradient(135deg, ${category?.color}40 0%, #0a0a0a 100%)` }}
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-3 rounded-2xl bg-black/50 text-white hover:bg-black transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="absolute inset-0 flex items-center justify-center">
            {category && <category.icon className="w-24 h-24 opacity-20 text-white" />}
          </div>

          <div className="absolute bottom-8 left-8 md:left-12">
            <div 
              className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4"
              style={{ backgroundColor: category?.color, color: "white" }}
            >
              {category?.name}
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white">{article.title}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12">
          <div className="flex flex-wrap items-center gap-6 mb-10 text-gray-500 text-sm border-b border-white/5 pb-6">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Doba čtení: {article.readTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span>Obtížnost: {article.difficulty}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-500" />
              <span>Metodika 1.0</span>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-xl text-gray-300 leading-relaxed mb-8 font-medium italic border-l-4 border-[#ff6b35] pl-6">
              {article.description}
            </p>
            <div className="text-gray-400 text-lg leading-loose space-y-6">
              {article.content.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          <div className="mt-12 pt-12 border-t border-white/5">
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Tagy k článku</h4>
            <div className="flex gap-2">
              {article.tags.map(tag => (
                <span key={tag} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-gray-400">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-12 flex gap-4">
            <Button size="lg" className="flex-1" onClick={onClose}>
              Hotovo, naučeno
            </Button>
            <Button size="lg" variant="outline" className="flex-1">
              Sdílet článek
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
