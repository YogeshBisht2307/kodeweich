"use client"

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import MarkdownRenderer from "@/components/MarkdownRenderer";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const MarkdownEditor = ({ value, onChange, placeholder }: MarkdownEditorProps) => {
  const [showPreview, setShowPreview] = useState<boolean>(false);

  const preview = useMemo(() => {
    if (!value.trim()) {
      return <p className="text-sm text-muted-foreground">Nothing to preview yet.</p>;
    }

    return <MarkdownRenderer content={value} />;
  }, [value]);

  return (
    <section className="my-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-medium">Article Content (Markdown)</h3>
        <Button type="button" variant="secondary" onClick={() => setShowPreview((prev) => !prev)}>
          {showPreview ? "Hide Preview" : "Preview"}
        </Button>
      </div>

      <div className={`grid gap-4 ${showPreview ? "md:grid-cols-2" : "grid-cols-1"}`}>
        <textarea
          rows={16}
          className="block w-full resize-y rounded-lg border bg-muted p-3 text-sm text-muted-foreground"
          placeholder={placeholder ?? "Write markdown content here..."}
          onChange={(e) => onChange(e.target.value)}
          value={value}
        />

        {showPreview && (
          <div className="min-h-[220px] rounded-lg border bg-background p-4 text-sm text-foreground">
            {preview}
          </div>
        )}
      </div>
    </section>
  );
};

export default MarkdownEditor;