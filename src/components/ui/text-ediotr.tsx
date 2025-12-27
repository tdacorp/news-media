
"use client"

import { useEditor, EditorContent, Editor, useEditorState } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Toggle } from './toggle'
import { BoldIcon, CodeIcon, HighlighterIcon, ItalicIcon, LinkIcon, ListIcon, ListOrderedIcon, QuoteIcon, RedoIcon, StrikethroughIcon, Underline, UndoIcon, UnlinkIcon } from 'lucide-react'
import HighLight from '@tiptap/extension-highlight'
import { ReactNode, useState } from 'react'
import { Popover, PopoverContent } from './popover'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { Input } from './input'
import { Button } from './button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'
import { BubbleMenu as TiptapBubbleMenu } from "@tiptap/react/menus";
import { FloatingMenu as TiptapFloatingMenu } from "@tiptap/react/menus";

const Tiptap = () => {
    const editor = useEditor({
        extensions: [StarterKit.configure({
            heading: {
                levels: [1, 2, 3, 4, 5, 6]
            }
        })

            , HighLight.configure({ multicolor: true })], // define your extension array
        content: '<p>Hello World!</p>', // initial content
        editorProps: {
            attributes: {
                class:
                    "prose dark:prose-invert prose-sm sm:prose-base focus:outline-none max-w-none"
            },
        },
        immediatelyRender: false
    })

    return (
        <div className="bg-background relative rounded-lg border shadow-sm">
            {editor && (
                <>
                    <ToolBar editor={editor} />
                    <BubbleMenu editor={editor} />
                    <FloatingMenu editor={editor} />
                </>
            )}
            <EditorContent editor={editor} className="min-h-[300px] px-4 py-3" />
        </div>
    )
}

export default Tiptap

function LinkComponent({
    editor,
    children,

}: {
    editor: Editor;
    children: ReactNode;
}) {
    const [linkUrl, setLinkUrl] = useState("");
    const [isLinkPoppverOpen, setIsLinkPopoverOpen] = useState(false);

    const handlesetLink = () => {
        if (linkUrl) {
            editor
                .chain()
                .focus()
                .extendMarkRange("link")
                .setLink({ href: linkUrl })
                .run();
        } else {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
        }
        setIsLinkPopoverOpen(false);
        setLinkUrl("");
    };


    return (
        <Popover open={isLinkPoppverOpen} onOpenChange={setIsLinkPopoverOpen} >
            <PopoverTrigger asChild >{children}</PopoverTrigger>

            <PopoverContent className="w-80 p-4">
                <div className="flex flex-col gap-4">
                    <h3 className='font-medium'>Insert Link</h3>
                    <Input
                        placeholder="https://newsmedia.com"
                        type="url"
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handlesetLink();
                            }
                        }}
                    />
                    <div className='flex justify-between'>
                        <Button
                            variant={"outline"}
                            onClick={() => setIsLinkPopoverOpen(false)}
                        >
                            Cancle
                        </Button>
                        <Button onClick={handlesetLink}>Save</Button>
                    </div>
                </div>

            </PopoverContent>

        </Popover>
    )
}

const ToolBar = ({ editor }: { editor: Editor }) => {
    const editorState = useEditorState({
        editor, selector: (ctx) => {
            const e = ctx.editor;
            if (!e) {
                return {
                    isBold: false,
                    isItalic: false,
                    isUnderline: false,
                    isStrike: false,
                    isHiglight: false,
                    isCode: false,
                    isBulletList: false,
                    isOrderedList: false,
                    isBlockquote: false,
                    isLink: false,
                    canRedo: false,
                    canUndo: false,
                    isHeading2: false,
                    isHeading3: false,
                    isHeading4: false,
                    isHeading5: false,
                    isHeading6: false,
                    isParagraph: false,


                }
            }
            return {
                isBold: e.isActive("bold") ?? false,
                isItalic: e.isActive("italic") ?? false,
                isUnderline: e.isActive("underline") ?? false,
                isStrike: e.isActive("strike") ?? false,
                isHiglight: e.isActive("highlight") ?? false,
                isCode: e.isActive("code") ?? false,
                isBulletList: e.isActive("bulletList") ?? false,
                isOrderedList: e.isActive("orderedList") ?? false,
                isBlockquote: e.isActive("blockquote") ?? false,
                isLink: e.isActive("link") ?? false,
                canRedo: e.can().redo(),
                canUndo: e.can().undo(),
                isHeading1: e.isActive("heading", { level: 1 }) ?? false,
                isHeading2: e.isActive("heading", { level: 2 }) ?? false,
                isHeading3: e.isActive("heading", { level: 3 }) ?? false,
                isHeading4: e.isActive("heading", { level: 4 }) ?? false,
                isHeading5: e.isActive("heading", { level: 5 }) ?? false,
                isHeading6: e.isActive("heading", { level: 6 }) ?? false,
                isParagraph: e.isActive("paragraph") ?? false,

            };

        },
    });

    console.log("🧪=== EDITOR DEBUG ===", {
        isHeading1: editorState.isHeading1,
        isHeading2: editorState.isHeading2,
        isHeading3: editorState.isHeading3,
        isParagraph: editorState.isParagraph,
        isBulletList: editorState.isBulletList,
        isOrderedList: editorState.isOrderedList,
        isBlockquote: editorState.isBlockquote,
        currentNode: editor?.getAttributes("heading")?.level || "OTHER",
        selection: editor?.state.selection?.from || "none"
    });

    const handleHeadinChange = (value: string) => {
        if (!editor) return;
        if (value === "paragraph") {
            editor.chain().focus().setParagraph().run();
        } else {
            const level = Number.parseInt(value.replace("heading", "")) as
                | 1
                | 2
                | 3
                | 4
                | 5
                | 6;
            editor.chain().focus().setHeading({ level }).run();

        }
    };

    return (
        <>
            <div
                className={
                    "bg-bakground stricky top-0 z-10 flex flex-wrap item-center gap-1 border-b p-2"
                }
            >
                <Select
                    onValueChange={handleHeadinChange}
                    value={
                        editorState.isHeading1 ? "heading1" :
                            editorState.isHeading2 ? "heading2" :
                                editorState.isHeading3 ? "heading3" :
                                    editorState.isHeading4 ? "heading4" :
                                        editorState.isHeading5 ? "heading5" :
                                            editorState.isHeading6 ? "heading6" :
                                                editorState.isParagraph ? "paragraph" :
                                                    "paragraph"
                    }
                >
                    <SelectTrigger className='w-[180px]'>
                        <SelectValue placeholder="Paragrah" />

                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="paragraph">Paragraph</SelectItem>
                        <SelectItem value="heading1">Heading1</SelectItem>
                        <SelectItem value="heading2">Heading 2</SelectItem>
                        <SelectItem value="heading3">Heading 3</SelectItem>
                        <SelectItem value="heading4">Heading 4</SelectItem>
                        <SelectItem value="heading5">Heading 5</SelectItem>
                        <SelectItem value="heading6">Heading 6</SelectItem>
                    </SelectContent>

                </Select>

                {/* bold */}
                <Toggle
                    size={"sm"}
                    pressed={editorState.isBold}
                    onPressedChange={() => editor.chain().toggleBold().run()}
                    aria-label="Toggle bold"
                >
                    <BoldIcon className='h-4 w-4' />
                </Toggle>

                {/* italic */}

                <Toggle
                    size={"sm"}
                    pressed={editorState.isItalic}
                    onPressedChange={() => editor.chain().focus().toggleItalic().run()}
                    aria-label="Toggle italic"
                >
                    <ItalicIcon className='h-4 w-4' />
                </Toggle>

                {/* underline */}

                <Toggle
                    size={"sm"}
                    pressed={editorState.isUnderline}
                    onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
                    aria-label="Toggle underline"
                >
                    <Underline className='h-4 w-4' />
                </Toggle>

                {/* Strike */}

                <Toggle
                    size={"sm"}
                    pressed={editorState.isStrike}
                    onPressedChange={() => editor.chain().focus().toggleStrike().run()}
                    aria-label="Toggle underline"
                >
                    <StrikethroughIcon className='h-4 w-4' />
                </Toggle>

                {/* Highlight*/}
                <Toggle
                    size={"sm"}
                    pressed={editorState.isHiglight}
                    onPressedChange={() => editor.chain().focus().toggleHighlight({ color: "#fdeb80" }).run()}
                    aria-label="Toggle Quote"
                >
                    <HighlighterIcon className='h-4 w-4' />
                </Toggle>

                {/* code */}
                <Toggle
                    size={"sm"}
                    pressed={editorState.isCode}
                    onPressedChange={() => editor.chain().focus().toggleCode().run()}
                    aria-label="Toggle code"
                >
                    <CodeIcon className='h-4 w-4' />
                </Toggle>

                {/* Bullet List */}
                <Toggle
                    size={"sm"}
                    pressed={editorState.isBulletList}
                    onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
                    aria-label="Toggle buller List"
                >
                    <ListIcon className='h-4 w-4' />
                </Toggle>

                {/* Orderlist */}
                <Toggle
                    size={"sm"}
                    pressed={editorState.isOrderedList}
                    onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
                    aria-label="Toggle Ordered List"
                >
                    <ListOrderedIcon className='h-4 w-4' />
                </Toggle>


                {/* Quote */}
                <Toggle
                    size={"sm"}
                    pressed={editorState.isBlockquote}
                    onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
                    aria-label="Toggle Quote"
                >
                    <QuoteIcon className='h-4 w-4' />
                </Toggle>

                <div className='bg-border mx-1 h-6 w-px' />

                {/* Link */}

                {editorState.isLink ? (
                    <Toggle
                        pressed
                        onPressedChange={() =>
                            editor.chain().focus().extendMarkRange("link").unsetLink().run()
                        }
                    >
                        <UnlinkIcon className="h-4 w-4 " />
                    </Toggle>
                ) : (
                    <LinkComponent editor={editor}>
                        <Toggle
                            size={"sm"} aria-label="toggle link"
                        >
                            <LinkIcon className="h-4 w-4" />
                        </Toggle>
                    </LinkComponent>
                )}

                {/* undo and redo */}
                <div className='bg-border mx-1 h-6 w-px' />

                <Button
                    type="button"
                    size={"sm"}
                    variant={"ghost"}
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editorState.canUndo}
                    aria-label="undo"
                >
                    <UndoIcon className="h-4 w-4" />

                </Button>
                <Button
                    type="button"
                    size={"sm"}
                    variant={"ghost"}
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editorState.canRedo}
                    aria-label="Redo"
                >
                    <RedoIcon className="h-4 w-4" />

                </Button>
            </div>

        </>
    )
};

//bubblemenu

export function BubbleMenu({ editor }: { editor: Editor }) {
    const editorState = useEditorState({
        editor, selector: (ctx) => {
            const e = ctx.editor;
            if (!e) {
                return {
                    isBold: false,
                    isItalic: false,
                    isUnderline: false,
                    isStrike: false,
                    isHiglight: false,
                    isCode: false,
                    isBulletList: false,
                    isOrderedList: false,
                    isBlockquote: false,
                    isLink: false,
                    canRedo: false,
                    canUndo: false,
                }
            }
            return {
                isBold: e.isActive("bold") ?? false,
                isItalic: e.isActive("italic") ?? false,
                isUnderline: e.isActive("underline") ?? false,
                isStrike: e.isActive("strike") ?? false,
                isHiglight: e.isActive("highlight") ?? false,
                isCode: e.isActive("code") ?? false,
                isBulletList: e.isActive("bulletList") ?? false,
                isOrderedList: e.isActive("orderedList") ?? false,
                isBlockquote: e.isActive("blockquote") ?? false,
                isLink: e.isActive("link") ?? false,
                canRedo: e.can().redo(),
                canUndo: e.can().undo(),
            };

        },
    });

    return (
        <TiptapBubbleMenu
            editor={editor}
            className="bg-background flex items-center rounded-md border shadow-md relative z-200"
        >
            {/* bold */}
            <Toggle
                size={"sm"}
                pressed={editorState.isBold}
                onPressedChange={() => editor.chain().toggleBold().run()}
                aria-label="Toggle bold"
            >
                <BoldIcon className='h-4 w-4' />
            </Toggle>

            {/* italic */}

            <Toggle
                size={"sm"}
                pressed={editorState.isItalic}
                onPressedChange={() => editor.chain().focus().toggleItalic().run()}
                aria-label="Toggle italic"
            >
                <ItalicIcon className='h-4 w-4' />
            </Toggle>

            {/* underline */}

            <Toggle
                size={"sm"}
                pressed={editorState.isUnderline}
                onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
                aria-label="Toggle underline"
            >
                <Underline className='h-4 w-4' />
            </Toggle>

            {/* Strike */}

            <Toggle
                size={"sm"}
                pressed={editorState.isStrike}
                onPressedChange={() => editor.chain().focus().toggleStrike().run()}
                aria-label="Toggle underline"
            >
                <StrikethroughIcon className='h-4 w-4' />
            </Toggle>

            {/* Highlight*/}
            <Toggle
                size={"sm"}
                pressed={editorState.isHiglight}
                onPressedChange={() => editor.chain().focus().toggleHighlight({ color: "#fdeb80" }).run()}
                aria-label="Toggle Quote"
            >
                <HighlighterIcon className='h-4 w-4' />
            </Toggle>

            {/* code */}
            <Toggle
                size={"sm"}
                pressed={editorState.isCode}
                onPressedChange={() => editor.chain().focus().toggleCode().run()}
                aria-label="Toggle code"
            >
                <CodeIcon className='h-4 w-4' />
            </Toggle>

            {/* Bullet List */}
            <Toggle
                size={"sm"}
                pressed={editorState.isBulletList}
                onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
                aria-label="Toggle buller List"
            >
                <ListIcon className='h-4 w-4' />
            </Toggle>

            {/* Orderlist */}
            <Toggle
                size={"sm"}
                pressed={editorState.isOrderedList}
                onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
                aria-label="Toggle Ordered List"
            >
                <ListOrderedIcon className='h-4 w-4' />
            </Toggle>


            {/* Quote */}
            <Toggle
                size={"sm"}
                pressed={editorState.isBlockquote}
                onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
                aria-label="Toggle Quote"
            >
                <QuoteIcon className='h-4 w-4' />
            </Toggle>

            <div className='bg-border mx-1 h-6 w-px' />

            {/* Link */}

            {editorState.isLink ? (
                <Toggle
                    pressed
                    onPressedChange={() =>
                        editor.chain().focus().extendMarkRange("link").unsetLink().run()
                    }
                >
                    <UnlinkIcon className="h-4 w-4 " />
                </Toggle>
            ) : (
                <LinkComponent editor={editor}>
                    <Toggle
                        size={"sm"} aria-label="toggle link"
                    >
                        <LinkIcon className="h-4 w-4" />
                    </Toggle>
                </LinkComponent>
            )}

            {/* undo and redo */}
            <div className='bg-border mx-1 h-6 w-px' />

            <Button
                type="button"
                size={"sm"}
                variant={"ghost"}
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editorState.canUndo}
                aria-label="undo"
            >
                <UndoIcon className="h-4 w-4" />

            </Button>
            <Button
                type="button"
                size={"sm"}
                variant={"ghost"}
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editorState.canRedo}
                aria-label="Redo"
            >
                <RedoIcon className="h-4 w-4" />

            </Button>
        </TiptapBubbleMenu>


    )
};


//floatingmenu
export function FloatingMenu({ editor }: { editor: Editor }) {
    const editorState = useEditorState({
        editor, selector: (ctx) => {
            const e = ctx.editor;
            if (!e) {
                return {
                    isBold: false,
                    isItalic: false,
                    isUnderline: false,
                    isStrike: false,
                    isHiglight: false,
                    isCode: false,
                    isBulletList: false,
                    isOrderedList: false,
                    isBlockquote: false,
                    isLink: false,
                    canRedo: false,
                    canUndo: false,
                }
            }
            return {
                isBold: e.isActive("bold") ?? false,
                isItalic: e.isActive("italic") ?? false,
                isUnderline: e.isActive("underline") ?? false,
                isStrike: e.isActive("strike") ?? false,
                isHiglight: e.isActive("highlight") ?? false,
                isCode: e.isActive("code") ?? false,
                isBulletList: e.isActive("bulletList") ?? false,
                isOrderedList: e.isActive("orderedList") ?? false,
                isBlockquote: e.isActive("blockquote") ?? false,
                isLink: e.isActive("link") ?? false,
                canRedo: e.can().redo(),
                canUndo: e.can().undo(),
            };

        },
    });

    return (
        <TiptapFloatingMenu
            editor={editor}
            className="bg-background flex items-center rounded-md border shadow-md relative z-200"
        >
            {/* bold */}
            <Toggle
                size={"sm"}
                pressed={editorState.isBold}
                onPressedChange={() => editor.chain().toggleBold().run()}
                aria-label="Toggle bold"
            >
                <BoldIcon className='h-4 w-4' />
            </Toggle>

            {/* italic */}

            <Toggle
                size={"sm"}
                pressed={editorState.isItalic}
                onPressedChange={() => editor.chain().focus().toggleItalic().run()}
                aria-label="Toggle italic"
            >
                <ItalicIcon className='h-4 w-4' />
            </Toggle>

            {/* underline */}

            <Toggle
                size={"sm"}
                pressed={editorState.isUnderline}
                onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
                aria-label="Toggle underline"
            >
                <Underline className='h-4 w-4' />
            </Toggle>

            {/* Strike */}

            <Toggle
                size={"sm"}
                pressed={editorState.isStrike}
                onPressedChange={() => editor.chain().focus().toggleStrike().run()}
                aria-label="Toggle underline"
            >
                <StrikethroughIcon className='h-4 w-4' />
            </Toggle>

            {/* Highlight*/}
            <Toggle
                size={"sm"}
                pressed={editorState.isHiglight}
                onPressedChange={() => editor.chain().focus().toggleHighlight({ color: "#fdeb80" }).run()}
                aria-label="Toggle Quote"
            >
                <HighlighterIcon className='h-4 w-4' />
            </Toggle>

            {/* code */}
            <Toggle
                size={"sm"}
                pressed={editorState.isCode}
                onPressedChange={() => editor.chain().focus().toggleCode().run()}
                aria-label="Toggle code"
            >
                <CodeIcon className='h-4 w-4' />
            </Toggle>

            {/* Bullet List */}
            <Toggle
                size={"sm"}
                pressed={editorState.isBulletList}
                onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
                aria-label="Toggle buller List"
            >
                <ListIcon className='h-4 w-4' />
            </Toggle>

            {/* Orderlist */}
            <Toggle
                size={"sm"}
                pressed={editorState.isOrderedList}
                onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
                aria-label="Toggle Ordered List"
            >
                <ListOrderedIcon className='h-4 w-4' />
            </Toggle>


            {/* Quote */}
            <Toggle
                size={"sm"}
                pressed={editorState.isBlockquote}
                onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
                aria-label="Toggle Quote"
            >
                <QuoteIcon className='h-4 w-4' />
            </Toggle>

            <div className='bg-border mx-1 h-6 w-px' />

            {/* Link */}

            {editorState.isLink ? (
                <Toggle
                    pressed
                    onPressedChange={() =>
                        editor.chain().focus().extendMarkRange("link").unsetLink().run()
                    }
                >
                    <UnlinkIcon className="h-4 w-4 " />
                </Toggle>
            ) : (
                <LinkComponent editor={editor}>
                    <Toggle
                        size={"sm"} aria-label="toggle link"
                    >
                        <LinkIcon className="h-4 w-4" />
                    </Toggle>
                </LinkComponent>
            )}

            {/* undo and redo */}
            <div className='bg-border mx-1 h-6 w-px' />

            <Button
                type="button"
                size={"sm"}
                variant={"ghost"}
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editorState.canUndo}
                aria-label="undo"
            >
                <UndoIcon className="h-4 w-4" />

            </Button>
            <Button
                type="button"
                size={"sm"}
                variant={"ghost"}
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editorState.canRedo}
                aria-label="Redo"
            >
                <RedoIcon className="h-4 w-4" />

            </Button>
        </TiptapFloatingMenu>


    )
};
