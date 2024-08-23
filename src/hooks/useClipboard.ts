import { useState } from 'react';
import { toast } from 'react-toastify';

interface CopyToClipboardProps {
  text: string;
  item?: string;
  toastEnabled?: boolean;
  timeout?: number;
}

interface UseClipboardProps {
  copyToClipboard: (props: CopyToClipboardProps) => void;
  isCopied: boolean;
}

const useClipboard: () => UseClipboardProps = () => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const copyToClipboard = ({
    text,
    item = '',
    toastEnabled = true,
    timeout = 1000
  }: CopyToClipboardProps) => {
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
};

export default useClipboard;
