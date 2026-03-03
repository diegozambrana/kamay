"use client";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { usePromptListStore } from "../stores/PromptListStore";
import { deletePrompt } from "@/actions/prompts/promptActions";
import type { PromptWithRelations } from "@/services/prompts";

export function usePromptList(initialPrompts: PromptWithRelations[]) {
  const router = useRouter();
  const {
    prompts,
    searchQuery,
    deleteDialogOpen,
    promptToDelete,
    loading,
    setPrompts,
    setSearchQuery,
    setDeleteDialogOpen,
    setPromptToDelete,
    setLoading,
  } = usePromptListStore();

  useEffect(() => {
    setPrompts(initialPrompts);
  }, [initialPrompts, setPrompts]);

  const filteredPrompts = useMemo(() => {
    if (!searchQuery.trim()) return prompts;

    const query = searchQuery.toLowerCase();
    return prompts.filter(
      (prompt) =>
        prompt.title.toLowerCase().includes(query) ||
        prompt.description?.toLowerCase().includes(query) ||
        prompt.content.toLowerCase().includes(query) ||
        prompt.tags?.some((tag) => tag.name.toLowerCase().includes(query)),
    );
  }, [prompts, searchQuery]);

  async function handleDelete() {
    if (!promptToDelete) return;

    try {
      setLoading(true);
      await deletePrompt(promptToDelete.id);
      setDeleteDialogOpen(false);
      setPromptToDelete(null);
      router.refresh();
    } catch (error) {
      console.error("Error deleting prompt:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleCloseDialog() {
    if (!loading) {
      setDeleteDialogOpen(false);
      setPromptToDelete(null);
    }
  }

  return {
    prompts: filteredPrompts,
    searchQuery,
    setSearchQuery,
    deleteDialogOpen,
    promptToDelete,
    setPromptToDelete,
    setDeleteDialogOpen,
    handleDelete,
    handleCloseDialog,
    loading,
  };
}
