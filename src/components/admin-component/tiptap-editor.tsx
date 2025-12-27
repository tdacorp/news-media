"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { 
  Bold, Italic, List, ListOrdered, Quote, Undo, Redo, Code, LinkIcon 
} from "lucide-react";
import { Button } from "../ui/button";

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export function TiptapEditor({ content, onChange }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start writing your news article here...",
      }),
      Link.configure({ openOnClick: false }),
      Image,
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML()); // Parent component ko HTML bhejega
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none min-h-[250px]",
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="border rounded-lg bg-background overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border-b bg-secondary/20">
        <Button
          variant="ghost" size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "bg-secondary" : ""}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost" size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "bg-secondary" : ""}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost" size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "bg-secondary" : ""}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost" size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "bg-secondary" : ""}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost" size="sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "bg-secondary" : ""}
        >
          <Quote className="h-4 w-4" />
        </Button>
        <div className="w-[1px] h-6 bg-border mx-1" />
        <Button
          variant="ghost" size="sm"
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost" size="sm"
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  );
}