import { useState } from 'react';
import { toast } from 'react-toastify';

export default function useClipboard() {
  const [isCopied, setIsCopied] = useState(false);
  const copyToClipboard = ({ text, item = '', toastEnabled = true, timeout = 1000 }) => {
    try {
      navigator.clipboard.writeText(text).then(() => {
        const notify = () =>
          toast.success(`${item} copied!`, { theme: 'colored', autoClose: 2000 });

        if (toastEnabled) {
          notify();
        }
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, timeout);
      });
    } catch (error) {
      const notify = () => toast.error(`${error}`, { theme: 'colored', autoClose: 2000 });
      notify();
    }
  };

  return { copyToClipboard, isCopied };
}
