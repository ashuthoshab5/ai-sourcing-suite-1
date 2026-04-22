/*
  # APDE Initial Database Schema

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text, unique)
      - `full_name` (text)
      - `role` (text, default 'user')
      - `department` (text)
      - `avatar_url` (text, nullable)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `decision_requests`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `title` (text)
      - `description` (text)
      - `category` (text)
      - `estimated_value` (numeric)
      - `urgency` (text, default 'medium')
      - `status` (text, default 'pending')
      - `confidence_score` (numeric, nullable)
      - `ai_analysis` (jsonb, nullable)
      - `preferred_suppliers` (text array, nullable)
      - `constraints` (jsonb, nullable)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `completed_at` (timestamp, nullable)
    
    - `suppliers`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `category` (text)
      - `location` (text)
      - `contact_email` (text)
      - `contact_phone` (text, nullable)
      - `website` (text, nullable)
      - `risk_score` (integer, default 50)
      - `risk_level` (text, default 'medium')
      - `performance_score` (integer, default 80)
      - `contract_value` (numeric, default 0)
      - `active_contracts` (integer, default 0)
      - `certifications` (text array, nullable)
      - `last_assessment` (timestamp)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `decision_outcomes`
      - `id` (uuid, primary key)
      - `decision_request_id` (uuid, references decision_requests)
      - `supplier_id` (uuid, nullable, references suppliers)
      - `outcome_type` (text, default 'single_supplier')
      - `final_value` (numeric, default 0)
      - `savings_achieved` (numeric, default 0)
      - `savings_percentage` (numeric, default 0)
      - `execution_status` (text, default 'pending')
      - `user_satisfaction` (integer, nullable)
      - `lessons_learned` (jsonb, nullable)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `agent_activities`
      - `id` (uuid, primary key)
      - `agent_type` (text)
      - `decision_request_id` (uuid, nullable, references decision_requests)
      - `status` (text, default 'idle')
      - `current_task` (text, nullable)
      - `performance_score` (integer, default 90)
      - `tasks_completed` (integer, default 0)
      - `last_activity` (timestamp)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Profiles: Users can read/update own data
    - Decision Requests: Users can manage own requests, read all
    - Suppliers: All authenticated users can read
    - Decision Outcomes: Users can read all, manage own request outcomes
    - Agent Activities: All authenticated users can read

  3. Important Notes
    - All tables use uuid primary keys with gen_random_uuid()
    - Timestamps use timestamptz with now() default
    - RLS policies ensure data isolation and security
    - Proper foreign key constraints maintain referential integrity
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL DEFAULT 'user',
  department text NOT NULL DEFAULT '',
  avatar_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create decision_requests table
CREATE TABLE IF NOT EXISTS decision_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  estimated_value numeric NOT NULL DEFAULT 0,
  urgency text NOT NULL DEFAULT 'medium' CHECK (urgency IN ('low', 'medium', 'high', 'critical')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'analyzing', 'evaluating', 'optimizing', 'reviewing', 'approved', 'rejected', 'completed')),
  confidence_score numeric,
  ai_analysis jsonb,
  preferred_suppliers text[],
  constraints jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz
);

-- Create suppliers table
CREATE TABLE IF NOT EXISTS suppliers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  category text NOT NULL,
  location text NOT NULL,
  contact_email text NOT NULL,
  contact_phone text,
  website text,
  risk_score integer NOT NULL DEFAULT 50 CHECK (risk_score >= 0 AND risk_score <= 100),
  risk_level text NOT NULL DEFAULT 'medium' CHECK (risk_level IN ('low', 'medium', 'high', 'critical')),
  performance_score integer NOT NULL DEFAULT 80 CHECK (performance_score >= 0 AND performance_score <= 100),
  contract_value numeric NOT NULL DEFAULT 0,
  active_contracts integer NOT NULL DEFAULT 0,
  certifications text[],
  last_assessment timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create decision_outcomes table
CREATE TABLE IF NOT EXISTS decision_outcomes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  decision_request_id uuid NOT NULL REFERENCES decision_requests(id) ON DELETE CASCADE,
  supplier_id uuid REFERENCES suppliers(id) ON DELETE SET NULL,
  outcome_type text NOT NULL DEFAULT 'single_supplier' CHECK (outcome_type IN ('single_supplier', 'multi_supplier', 'negotiated', 'manual_override')),
  final_value numeric NOT NULL DEFAULT 0,
  savings_achieved numeric NOT NULL DEFAULT 0,
  savings_percentage numeric NOT NULL DEFAULT 0,
  execution_status text NOT NULL DEFAULT 'pending' CHECK (execution_status IN ('pending', 'in_progress', 'completed', 'failed')),
  user_satisfaction integer CHECK (user_satisfaction >= 1 AND user_satisfaction <= 5),
  lessons_learned jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create agent_activities table
CREATE TABLE IF NOT EXISTS agent_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_type text NOT NULL CHECK (agent_type IN ('requirement', 'discovery', 'evaluation', 'optimization', 'negotiation', 'learning', 'verification')),
  decision_request_id uuid REFERENCES decision_requests(id) ON DELETE SET NULL,
  status text NOT NULL DEFAULT 'idle' CHECK (status IN ('idle', 'active', 'processing', 'completed')),
  current_task text,
  performance_score integer NOT NULL DEFAULT 90 CHECK (performance_score >= 0 AND performance_score <= 100),
  tasks_completed integer NOT NULL DEFAULT 0,
  last_activity timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE decision_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE decision_outcomes ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_activities ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Decision requests policies
CREATE POLICY "Users can read all decision requests"
  ON decision_requests FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create own decision requests"
  ON decision_requests FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own decision requests"
  ON decision_requests FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own decision requests"
  ON decision_requests FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Suppliers policies
CREATE POLICY "Authenticated users can read suppliers"
  ON suppliers FOR SELECT
  TO authenticated
  USING (true);

-- Decision outcomes policies
CREATE POLICY "Users can read all decision outcomes"
  ON decision_outcomes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create decision outcomes for own requests"
  ON decision_outcomes FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM decision_requests
      WHERE decision_requests.id = decision_outcomes.decision_request_id
      AND decision_requests.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update decision outcomes for own requests"
  ON decision_outcomes FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM decision_requests
      WHERE decision_requests.id = decision_outcomes.decision_request_id
      AND decision_requests.user_id = auth.uid()
    )
  );

-- Agent activities policies
CREATE POLICY "Authenticated users can read agent activities"
  ON agent_activities FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_decision_requests_user_id ON decision_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_decision_requests_status ON decision_requests(status);
CREATE INDEX IF NOT EXISTS idx_decision_requests_created_at ON decision_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_suppliers_category ON suppliers(category);
CREATE INDEX IF NOT EXISTS idx_suppliers_risk_level ON suppliers(risk_level);
CREATE INDEX IF NOT EXISTS idx_decision_outcomes_request_id ON decision_outcomes(decision_request_id);
CREATE INDEX IF NOT EXISTS idx_agent_activities_type ON agent_activities(agent_type);
CREATE INDEX IF NOT EXISTS idx_agent_activities_status ON agent_activities(status);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_decision_requests_updated_at
  BEFORE UPDATE ON decision_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_suppliers_updated_at
  BEFORE UPDATE ON suppliers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_decision_outcomes_updated_at
  BEFORE UPDATE ON decision_outcomes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agent_activities_updated_at
  BEFORE UPDATE ON agent_activities
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
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
$$ language 'plpgsql' SECURITY DEFINER;

-- Create trigger for new user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();
