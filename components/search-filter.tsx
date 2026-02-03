"use client"

import { useState } from "react"
import { Search, Filter, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface SearchFilterProps {
  placeholder?: string
  categories: { id: string; label: string }[]
  onSearch: (query: string) => void
  onFilterChange: (category: string | null) => void
  selectedCategory: string | null
}

export function SearchFilter({
  placeholder = "Search...",
  categories,
  onSearch,
  onFilterChange,
  selectedCategory,
}: SearchFilterProps) {
  const [query, setQuery] = useState("")

  const handleSearch = (value: string) => {
    setQuery(value)
    onSearch(value)
  }

  return (
    <div className="mb-8 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="h-12 rounded-xl border-border bg-card pl-12 pr-4"
        />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <Badge
          variant={selectedCategory === null ? "default" : "secondary"}
          className={`cursor-pointer transition-colors ${
            selectedCategory === null
              ? "bg-primary text-primary-foreground"
              : "hover:bg-secondary/80"
          }`}
          onClick={() => onFilterChange(null)}
        >
          All
        </Badge>
        {categories.map((category) => (
          <Badge
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "secondary"}
            className={`cursor-pointer transition-colors ${
              selectedCategory === category.id
                ? "bg-primary text-primary-foreground"
                : "hover:bg-secondary/80"
            }`}
            onClick={() => onFilterChange(category.id)}
          >
            {category.label}
          </Badge>
        ))}
        {(selectedCategory || query) && (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-muted-foreground hover:text-foreground"
            onClick={() => {
              setQuery("")
              onSearch("")
              onFilterChange(null)
            }}
          >
            <X className="mr-1 h-3 w-3" />
            Clear
          </Button>
        )}
      </div>
    </div>
  )
}
