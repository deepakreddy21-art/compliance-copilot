import { supabase } from '../utils/supabaseClient';

export function Auth() {
  const signInWithGitHub = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'github' });
  };

  return (
    <button
      onClick={signInWithGitHub}
      className="px-4 py-2 bg-black text-white rounded"
    >
      Sign in with GitHub
    </button>
  );
} 