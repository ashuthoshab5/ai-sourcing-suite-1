/*
  # Fix Function Search Path Security

  1. Security Changes
    - Fix `update_updated_at_column` function to use immutable search_path
    - Fix `handle_new_user` function to use immutable search_path
    
  2. Important Notes
    - Setting search_path to 'public' prevents search_path hijacking attacks
    - Both functions now explicitly set search_path before executing
    - This addresses security vulnerability where functions had mutable search_path
*/

-- Fix update_updated_at_column function with secure search_path
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER 
SECURITY INVOKER
SET search_path = 'public'
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Fix handle_new_user function with secure search_path
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role, department)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'role', 'user'),
    COALESCE(NEW.raw_user_meta_data->>'department', '')
  );
  RETURN NEW;
END;
$$ language 'plpgsql';
