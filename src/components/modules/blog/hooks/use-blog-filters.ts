"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { BlogMeta, slugify } from "@/lib/mdx-utils";

export function useBlogFilters(posts: BlogMeta[]) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get initial values from URL
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedTag, setSelectedTag] = useState<string | null>(searchParams.get("tag"));
  const [selectedCategory, setSelectedCategory] = useState<string | null>(searchParams.get("cat"));
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(searchParams.get("diff"));

  // Sync state with URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (selectedTag) params.set("tag", selectedTag);
    if (selectedCategory) params.set("cat", selectedCategory);
    if (selectedDifficulty) params.set("diff", selectedDifficulty);

    const query = params.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    
    // Use replace to avoid bloating history
    router.replace(url, { scroll: false });
  }, [searchQuery, selectedTag, selectedCategory, selectedDifficulty, pathname, router]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTag = selectedTag 
        ? post.tags?.some(t => slugify(t) === selectedTag) 
        : true;

      const matchesCategory = selectedCategory
        ? post.category && slugify(post.category) === selectedCategory
        : true;

      const matchesDifficulty = selectedDifficulty
        ? post.difficulty === selectedDifficulty
        : true;
      
      return matchesSearch && matchesTag && matchesCategory && matchesDifficulty;
    });
  }, [posts, searchQuery, selectedTag, selectedCategory, selectedDifficulty]);

  const hasActiveFilters = searchQuery.length > 0 || selectedTag !== null || selectedCategory !== null || selectedDifficulty !== null;
  
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTag(null);
    setSelectedCategory(null);
    setSelectedDifficulty(null);
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedTag,
    setSelectedTag,
    selectedCategory,
    setSelectedCategory,
    selectedDifficulty,
    setSelectedDifficulty,
    filteredPosts,
    hasActiveFilters,
    clearFilters
  };
}
