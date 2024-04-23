import { useState } from 'react';
import { toast } from 'react-toastify';

export default function useClipboard() {
  const [isCopied, setIsCopied] = useState(false);
  const handleItemCopy = (text, item) => {
    try {
      navigator.clipboard.writeText(text).then(() => {
        const notify = () =>
          toast.success(`${item} copied!`, { theme: 'colored', autoClose: 2000 });
        notify();
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false); // Update isCopied state here
        }, 1000); // Update isCopied state here
      });
    } catch (error) {
      const notify = () => toast.error(`${error}`, { theme: 'colored', autoClose: 2000 });
      notify();
    }
  };

  return [handleItemCopy, isCopied];
}
