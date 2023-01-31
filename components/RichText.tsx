import dynamic from 'next/dynamic';
import { useMemo, useRef } from 'react';

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    return ({ forwardedRef, ...props }: any) => <RQ ref={forwardedRef} {...props} />;
  },
  {
    ssr: false,
  }
);

const QuillNoSSRWrapper = ({value, onChange}: any) => {
  const editorRef = useRef<any>(null);

  const imageHandler = () => {
    const editor = editorRef.current.getEditor();
    const range = editor.getSelection();
    // show a cusome model
    const value = prompt("Please enter the image URL")

    if (value && range) {
      editor.insertEmbed(range.index, "image", value, "user")
    }
  };

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        ['blockquote', 'code-block'],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' },
        ],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean'],
        ['link', 'image', 'video'],
      ],
      handlers: {
        image: imageHandler
      }
    },
    syntax: true,
    clipboard: {
      matchVisual: false,
    },
  }), []);
  return (
      <ReactQuill
          theme={"snow"}
          modules={modules}
          value={value}
          onChange={onChange}
          forwardedRef={editorRef}
          className={`block w-full my-4 text-sm rounded-lg focus:outline-none dark:border-gray-600`}
      />
  )
}

export default QuillNoSSRWrapper;