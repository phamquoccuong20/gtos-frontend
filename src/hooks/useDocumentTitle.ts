import { useEffect, useRef } from 'react';

/**
 * A hook to dynamically update the document title (browser tab title).
 * 
 * @param title The title to set.
 * @param retainOnUnmount If true, the title won't reset when component unmounts. Default is false (resets to previous).
 */
export function useDocumentTitle(title: string, retainOnUnmount: boolean = false) {
  const defaultTitle = useRef<string>(typeof document !== 'undefined' ? document.title : '');

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    // Store the original title on mount
    const originalTitle = defaultTitle.current;
    
    return () => {
      if (!retainOnUnmount) {
        document.title = originalTitle;
      }
    };
  }, [retainOnUnmount]);
}
