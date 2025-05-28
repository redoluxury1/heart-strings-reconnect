
import { supabase } from '@/integrations/supabase/client';

export interface SmallWinSubmission {
  small_win: string;
  email?: string;
  user_id?: string;
}

export interface HeroQuoteSubmission {
  quote: string;
  author_name?: string;
  email?: string;
  user_id?: string;
}

export const submitSmallWin = async (submission: SmallWinSubmission) => {
  const { data, error } = await supabase
    .from('small_wins_submissions')
    .insert({
      small_win: submission.small_win,
      email: submission.email || null,
      user_id: submission.user_id || null,
      status: 'pending'
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const submitHeroQuote = async (submission: HeroQuoteSubmission) => {
  const { data, error } = await supabase
    .from('hero_quote_submissions')
    .insert({
      quote: submission.quote,
      author_name: submission.author_name || null,
      email: submission.email || null,
      user_id: submission.user_id || null,
      status: 'pending'
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const getUserSubmissions = async (userId: string) => {
  const [smallWinsResult, heroQuotesResult] = await Promise.all([
    supabase
      .from('small_wins_submissions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false }),
    
    supabase
      .from('hero_quote_submissions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
  ]);

  return {
    smallWins: smallWinsResult.data || [],
    heroQuotes: heroQuotesResult.data || [],
    errors: {
      smallWins: smallWinsResult.error,
      heroQuotes: heroQuotesResult.error
    }
  };
};
