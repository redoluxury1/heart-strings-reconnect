
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import feelingDismissedSubcategories from '@/data/feeling-dismissed-subcategories';

export const useFeelingDismissedPrompts = () => {
  const { subcategoryId } = useParams<{ subcategoryId: string }>();
  
  const subcategory = useMemo(() => {
    return feelingDismissedSubcategories.find(sc => sc.id === subcategoryId);
  }, [subcategoryId]);
  
  const openEndedPrompts = useMemo(() => {
    return subcategory?.prompts.filter(p => p.type === 'open-ended') || [];
  }, [subcategory]);
  
  const yesNoPrompts = useMemo(() => {
    return subcategory?.prompts.filter(p => p.type === 'yes-no') || [];
  }, [subcategory]);
  
  return {
    subcategory,
    openEndedPrompts,
    yesNoPrompts,
    allPrompts: subcategory?.prompts || []
  };
};

export default useFeelingDismissedPrompts;
