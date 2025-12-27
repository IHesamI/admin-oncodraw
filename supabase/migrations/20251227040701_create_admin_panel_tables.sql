/*
  # Admin Panel Database Schema

  1. New Tables
    - `posts`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `content` (text, rich text content from WYSIWYG)
      - `author` (text)
      - `published` (boolean, default false)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `files`
      - `id` (uuid, primary key)
      - `filename` (text, required)
      - `file_url` (text, required)
      - `file_type` (text)
      - `file_size` (bigint, in bytes)
      - `uploaded_at` (timestamptz)
    
    - `subscriptions`
      - `id` (uuid, primary key)
      - `email` (text, unique, required)
      - `plan` (text, e.g., 'free', 'pro', 'enterprise')
      - `status` (text, e.g., 'active', 'inactive', 'cancelled')
      - `created_at` (timestamptz)
      - `expires_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage all data
    
  Note: This is an admin panel, so policies allow authenticated users full access.
  For production, you may want to add role-based access control.
*/

-- Posts table
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL DEFAULT '',
  author text DEFAULT '',
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view all posts"
  ON posts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert posts"
  ON posts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update posts"
  ON posts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete posts"
  ON posts FOR DELETE
  TO authenticated
  USING (true);

-- Files table
CREATE TABLE IF NOT EXISTS files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  filename text NOT NULL,
  file_url text NOT NULL,
  file_type text DEFAULT '',
  file_size bigint DEFAULT 0,
  uploaded_at timestamptz DEFAULT now()
);

ALTER TABLE files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view all files"
  ON files FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert files"
  ON files FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update files"
  ON files FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete files"
  ON files FOR DELETE
  TO authenticated
  USING (true);

-- Subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  plan text DEFAULT 'free',
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz
);

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view all subscriptions"
  ON subscriptions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert subscriptions"
  ON subscriptions FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update subscriptions"
  ON subscriptions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete subscriptions"
  ON subscriptions FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(published);
CREATE INDEX IF NOT EXISTS idx_files_uploaded_at ON files(uploaded_at DESC);
CREATE INDEX IF NOT EXISTS idx_subscriptions_email ON subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);