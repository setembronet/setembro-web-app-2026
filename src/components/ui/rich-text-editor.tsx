"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    List,
    ListOrdered,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Link as LinkIcon,
    Image as ImageIcon,
    Heading1,
    Heading2,
    Heading3,
    Code,
    Undo,
    Redo,
    Type,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const Toolbar = ({ editor }: { editor: Editor | null }) => {
    if (!editor) return null;

    const addImage = () => {
        const url = window.prompt("URL da imagem:");
        if (url) {
            const alt = window.prompt("Texto alternativo (Alt Text):");
            editor.chain().focus().setImage({ src: url, alt: alt || "" }).run();
        }
    };

    const setLink = () => {
        const previousUrl = editor.getAttributes("link").href;
        const url = window.prompt("URL do link:", previousUrl);

        // cancelled
        if (url === null) {
            return;
        }

        // empty
        if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
        }

        // update link
        editor
            .chain()
            .focus()
            .extendMarkRange("link")
            .setLink({ href: url })
            .run();
    };

    return (
        <div className="border border-input bg-transparent rounded-t-lg p-2 flex flex-wrap gap-1 items-center">
            <Toggle
                size="sm"
                pressed={editor.isActive("bold")}
                onPressedChange={() => editor.chain().focus().toggleBold().run()}
                aria-label="Negrito"
            >
                <Bold className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("italic")}
                onPressedChange={() => editor.chain().focus().toggleItalic().run()}
                aria-label="Itálico"
            >
                <Italic className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("underline")}
                onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
                aria-label="Sublinhado"
            >
                <UnderlineIcon className="h-4 w-4" />
            </Toggle>

            <div className="w-px h-6 bg-border mx-1" />

            <Toggle
                size="sm"
                pressed={editor.isActive("heading", { level: 1 })}
                onPressedChange={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                aria-label="H1"
            >
                <Heading1 className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("heading", { level: 2 })}
                onPressedChange={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                aria-label="H2"
            >
                <Heading2 className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("heading", { level: 3 })}
                onPressedChange={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                aria-label="H3"
            >
                <Heading3 className="h-4 w-4" />
            </Toggle>

            <div className="w-px h-6 bg-border mx-1" />

            <Toggle
                size="sm"
                pressed={editor.isActive("bulletList")}
                onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
                aria-label="Lista com marcadores"
            >
                <List className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("orderedList")}
                onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
                aria-label="Lista numerada"
            >
                <ListOrdered className="h-4 w-4" />
            </Toggle>

            <div className="w-px h-6 bg-border mx-1" />

            <Toggle
                size="sm"
                pressed={editor.isActive({ textAlign: "left" })}
                onPressedChange={() =>
                    editor.chain().focus().setTextAlign("left").run()
                }
                aria-label="Alinhar à esquerda"
            >
                <AlignLeft className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive({ textAlign: "center" })}
                onPressedChange={() =>
                    editor.chain().focus().setTextAlign("center").run()
                }
                aria-label="Centralizar"
            >
                <AlignCenter className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive({ textAlign: "right" })}
                onPressedChange={() =>
                    editor.chain().focus().setTextAlign("right").run()
                }
                aria-label="Alinhar à direita"
            >
                <AlignRight className="h-4 w-4" />
            </Toggle>

            <div className="w-px h-6 bg-border mx-1" />

            <Button
                variant="ghost"
                size="sm"
                onClick={setLink}
                className={cn(
                    "h-9 w-9 p-0",
                    editor.isActive("link") && "bg-accent text-accent-foreground"
                )}
                title="Inserir Link"
            >
                <LinkIcon className="h-4 w-4" />
            </Button>

            <Button
                variant="ghost"
                size="sm"
                onClick={addImage}
                className="h-9 w-9 p-0"
                title="Inserir Imagem"
            >
                <ImageIcon className="h-4 w-4" />
            </Button>

            <div className="flex-1" />

            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
                className="h-9 w-9 p-0"
            >
                <Undo className="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
                className="h-9 w-9 p-0"
            >
                <Redo className="h-4 w-4" />
            </Button>
        </div>
    );
};

export function RichTextEditor({
    value,
    onChange,
    placeholder,
}: RichTextEditorProps) {
    const [isSourceMode, setIsSourceMode] = useState(false);
    const [sourceCode, setSourceCode] = useState("");

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: "text-primary underline cursor-pointer",
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: "rounded-lg border shadow-sm max-w-full",
                },
            }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Placeholder.configure({
                placeholder: placeholder || "Comece a escrever...",
            }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: "prose prose-sm dark:prose-invert max-w-none min-h-[300px] p-4 focus:outline-none",
            }
        },
        immediatelyRender: false,
    });

    // Sync value change if specificed externally (e.g. form reset)
    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            // Only update if content is different to avoid cursor jumps
            // This is tricky, simplified check:
            if (editor.getText() === "" && value === "") return;
            // editor.commands.setContent(value);
        }
    }, [value, editor]);


    const toggleSourceMode = () => {
        if (isSourceMode) {
            // Switching back to visual editor
            editor?.commands.setContent(sourceCode);
            onChange(sourceCode);
        } else {
            // Switching to source mode
            setSourceCode(editor?.getHTML() || "");
        }
        setIsSourceMode(!isSourceMode);
    };

    return (
        <div className="border rounded-lg bg-card text-card-foreground shadow-sm w-full overflow-hidden">
            {!isSourceMode && <Toolbar editor={editor} />}
            <div className="border-t bg-muted/20 flex justify-end p-1">
                <Button
                    variant="ghost"
                    size="xs"
                    onClick={toggleSourceMode}
                    className="text-xs text-muted-foreground gap-2 h-6"
                >
                    <Code className="h-3 w-3" />
                    {isSourceMode ? "Visual Editor" : "Source Code"}
                </Button>
            </div>

            {isSourceMode ? (
                <textarea
                    value={sourceCode}
                    onChange={(e) => {
                        setSourceCode(e.target.value);
                        onChange(e.target.value);
                    }}
                    className="w-full h-[300px] p-4 font-mono text-sm bg-muted/50 resize-y focus:outline-none"
                />
            ) : (
                <EditorContent editor={editor} />
            )}
        </div>
    );
}
