"use client";

import { useState, useEffect } from "react";
import { Check, ChevronsUpDown, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import type { Tag } from "@/lib/schemas/tag";
import { getTags, findOrCreateTag } from "@/actions/tags/tagActions";

interface TagManagerProps {
  selectedTagIds: string[];
  onChange: (tagIds: string[]) => void;
  className?: string;
}

export function TagManager({
  selectedTagIds,
  onChange,
  className,
}: Readonly<TagManagerProps>) {
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    loadTags();
  }, []);

  async function loadTags() {
    try {
      setIsLoading(true);
      const allTags = await getTags();
      setTags(allTags);
    } catch (error) {
      console.error("Error loading tags:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreateTag() {
    if (!searchValue.trim() || isCreating) return;

    try {
      setIsCreating(true);
      const newTag = await findOrCreateTag(searchValue.trim());
      setTags((prev) => [...prev, newTag]);
      onChange([...selectedTagIds, newTag.id]);
      setSearchValue("");
    } catch (error) {
      console.error("Error creating tag:", error);
    } finally {
      setIsCreating(false);
    }
  }

  function handleToggleTag(tagId: string) {
    if (selectedTagIds.includes(tagId)) {
      onChange(selectedTagIds.filter((id) => id !== tagId));
    } else {
      onChange([...selectedTagIds, tagId]);
    }
  }

  function handleRemoveTag(tagId: string) {
    onChange(selectedTagIds.filter((id) => id !== tagId));
  }

  const selectedTags = tags.filter((tag) => selectedTagIds.includes(tag.id));
  const isExactMatch = tags.some(
    (tag) => tag.name.toLowerCase() === searchValue.toLowerCase()
  );

  return (
    <div className={cn("space-y-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedTags.length > 0
              ? `${selectedTags.length} tag(s) seleccionado(s)`
              : "Seleccionar tags..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput
              placeholder="Buscar o crear tag..."
              value={searchValue}
              onValueChange={setSearchValue}
            />
            <CommandList>
              {isLoading ? (
                <CommandEmpty>Cargando tags...</CommandEmpty>
              ) : (
                <>
                  {tags.length === 0 ? (
                    <CommandEmpty>No hay tags disponibles.</CommandEmpty>
                  ) : (
                    <CommandGroup>
                      {tags.map((tag) => (
                        <CommandItem
                          key={tag.id}
                          value={tag.name}
                          onSelect={() => {
                            handleToggleTag(tag.id);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedTagIds.includes(tag.id)
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {tag.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}
                  {searchValue && !isExactMatch && (
                    <CommandGroup>
                      <CommandItem
                        onSelect={handleCreateTag}
                        disabled={isCreating}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        {isCreating
                          ? "Creando..."
                          : `Crear "${searchValue}"`}
                      </CommandItem>
                    </CommandGroup>
                  )}
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <Badge key={tag.id} variant="secondary" className="gap-1">
              {tag.name}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag.id)}
                className="ml-1 rounded-full hover:bg-muted"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
