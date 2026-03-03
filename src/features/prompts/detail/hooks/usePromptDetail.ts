"use client";
import { useRouter } from "next/navigation";
import { usePromptDetailStore } from "../stores/PromptDetailStore";
import { deletePrompt } from "@/actions/prompts/promptActions";

export function usePromptDetail(promptId: string) {
  const router = useRouter();
  const { deleteDialogOpen, loading, setDeleteDialogOpen, setLoading } =
    usePromptDetailStore();

  async function handleDelete() {
    try {
      setLoading(true);
      await deletePrompt(promptId);
      router.push("/prompts");
      router.refresh();
    } catch (error) {
      console.error("Error deleting prompt:", error);
      setLoading(false);
    }
  }

  function handleCloseDialog() {
    if (!loading) {
      setDeleteDialogOpen(false);
    }
  }

  function handleEdit() {
    router.push(`/prompt/${promptId}/edit`);
  }

  return {
    deleteDialogOpen,
    setDeleteDialogOpen,
    handleDelete,
    handleCloseDialog,
    handleEdit,
    loading,
  };
}
