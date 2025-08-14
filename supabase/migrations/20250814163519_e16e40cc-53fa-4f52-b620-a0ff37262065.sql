-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Service role can manage verification tokens" ON public.email_verification_tokens;

-- Create secure policies that only allow service role access
-- This ensures only edge functions can manage tokens, not regular users
CREATE POLICY "Only service role can manage verification tokens"
ON public.email_verification_tokens
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Add a policy that prevents any authenticated users from accessing tokens directly
-- This ensures the table is completely inaccessible to regular users
CREATE POLICY "Block user access to verification tokens"
ON public.email_verification_tokens
FOR ALL
TO authenticated
USING (false)
WITH CHECK (false);

-- Add a policy that prevents anonymous users from accessing tokens
CREATE POLICY "Block anonymous access to verification tokens"
ON public.email_verification_tokens
FOR ALL
TO anon
USING (false)
WITH CHECK (false);