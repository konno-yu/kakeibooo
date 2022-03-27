import { supabase } from '../supabaseClient';

export const signIn = async (obj: { email: string; password: string }) => {
  const { error, session } = await supabase.auth.signIn(obj);
  return { error, session };
};
