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

export const QuillModules = {
  toolbar: [
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
  syntax: true,
  clipboard: {
    matchVisual: false,
  },
}

const QuillNoSSRWrapper = ({value, onChange}: any) => {
  const editorRef = useRef(null);
  const modules = useMemo(() => (QuillModules), []);
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