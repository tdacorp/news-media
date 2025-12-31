"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import Tiptap from "@/components/ui/text-ediotr";

export default function CreateNewsPage() {
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    const payload = {
        // 👈 hindi / english
      content,       // 👈 html from tiptap
    };

    console.log(payload);

    // later → server action / API
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
     
      <Tiptap content={content} onChange={setContent} />

      <Button onClick={handleSubmit}>Publish News</Button>
    </div>
  );
}
