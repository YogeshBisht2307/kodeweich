"use client"

import * as React from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface MultiSelectProps {
  options: string[]
  selected: string[]
  onSelectionChange: (selected: string[]) => void
  placeholder?: string
  className?: string
}

export const MultiSelect = React.forwardRef<
  HTMLDivElement,
  MultiSelectProps
>(
  (
    {
      options,
      selected,
      onSelectionChange,
      placeholder = "Select items...",
      className = "",
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [searchInput, setSearchInput] = React.useState("")
    const containerRef = React.useRef<HTMLDivElement>(null)

    const filteredOptions = options.filter(
      (option) =>
        option.toLowerCase().includes(searchInput.toLowerCase()) &&
        !selected.includes(option)
    )

    const handleSelect = (option: string) => {
      onSelectionChange([...selected, option])
      setSearchInput("")
    }

    const handleRemove = (option: string) => {
      onSelectionChange(selected.filter((item) => item !== option))
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape") {
        setIsOpen(false)
      }
      if (e.key === "Enter" && filteredOptions.length > 0) {
        e.preventDefault()
        handleSelect(filteredOptions[0])
      }
    }

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false)
        }
      }

      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
      <div ref={containerRef} className={`relative w-full ${className}`}>
        <div className="block w-full p-3 border rounded-lg bg-muted text-muted-foreground cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}>
          {selected.length === 0 ? (
            <span className="text-muted-foreground">{placeholder}</span>
          ) : (
            <div className="flex flex-wrap gap-2">
              {selected.map((item) => (
                <Badge
                  key={item}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {item}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemove(item)
                    }}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        {isOpen && (
          <div className="absolute z-50 w-full mt-2 border rounded-lg bg-background shadow-lg">
            <div className="p-2 border-b">
              <input
                type="text"
                placeholder="Search..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full px-3 py-2 border rounded-md text-sm bg-muted text-muted-foreground outline-none"
                autoFocus
              />
            </div>

            <div className="max-h-48 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className="w-full px-3 py-2 text-left hover:bg-accent text-sm"
                  >
                    {option}
                  </button>
                ))
              ) : (
                <div className="px-3 py-2 text-sm text-muted-foreground">
                  No options available
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }
)

MultiSelect.displayName = "MultiSelect"
