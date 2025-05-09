
import { useState, useEffect } from 'react';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/storageUtils';

export const useCodeWordState = () => {
  const [codeWord, setCodeWord] = useState('pause');
  const [codeWordEstablished, setCodeWordEstablished] = useState(false);

  // Load code word state
  useEffect(() => {
    const savedCodeWord = loadFromLocalStorage('bridge-code-word');
    const savedCodeWordEstablished = loadFromLocalStorage('bridge-code-word-established');
    
    if (savedCodeWord) {
      setCodeWord(savedCodeWord);
    }
    
    if (savedCodeWordEstablished === 'true') {
      setCodeWordEstablished(true);
    }
  }, []);

  const handleChangeCodeWord = (word: string) => {
    setCodeWord(word);
    saveToLocalStorage('bridge-code-word', word);
    setCodeWordEstablished(true);
    saveToLocalStorage('bridge-code-word-established', 'true');
  };

  return {
    codeWord,
    codeWordEstablished,
    handleChangeCodeWord
  };
};
