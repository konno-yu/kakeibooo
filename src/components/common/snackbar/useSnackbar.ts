import { useCallback, useEffect, useState } from 'react';

export const useSnackbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<'success' | 'error'>('success');
  const [text, setText] = useState('');
  const [subText, setSubText] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    // 表示してから3秒経ったら勝手に消す;
    setTimeout(() => setIsOpen(false), 3000);
  }, [isOpen]);

  const showSnackbar = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const setSnackbarDetails = useCallback((newType: 'success' | 'error', newText: string, newSubText: string) => {
    setType(newType);
    setText(newText);
    setSubText(newSubText);
  }, []);
  return {
    isOpen,
    type,
    text,
    subText,
    showSnackbar,
    setSnackbarDetails,
  };
};

// TODO もっと賢いやり方
export type UseSnackbarReturnType = {
  isOpen: boolean;
  type: 'success' | 'error';
  text: string;
  subText: string;
  showSnackbar: () => void;
  setSnackbarDetails: (newType: string, newText: string, newSubText: string) => void;
};
