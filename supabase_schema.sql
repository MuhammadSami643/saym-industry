-- ========================================================
-- ZYPFIT Supabase Database Schema
-- Run this script in the Supabase SQL Editor:
-- https://supabase.com/dashboard/project/usgibssilkfhjbqycnfj/sql
-- ========================================================

-- 1. Create Inquiries Table
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  details TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Disable Row Level Security so inquiries can be submitted and read freely
ALTER TABLE public.inquiries DISABLE ROW LEVEL SECURITY;

-- 2. Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Disable Row Level Security for products
ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;

-- 3. Insert Initial Default Products
INSERT INTO public.products (name, category, description, image_url)
VALUES
  (
    'Slim Fit Gym Joggers',
    'Fitness Wear',
    'Custom Slim Fit Gym Joggers manufactured in Sialkot. 4-way stretch, tapered fit with zip pockets.',
    '/images/products/1780565647_slim-fit-gym-joggers.webp'
  ),
  (
    'High-Waist Compression Leggings',
    'Fitness Wear',
    'Squat-proof performance leggings with moisture-wicking interlock fabric.',
    '/images/categories/1776540259_fitness-wear.webp'
  ),
  (
    'Performance Sports Tracksuit',
    'Sports Wear',
    'Breathable moisture-wicking team and training tracksuit for sports clubs and athletes.',
    '/images/categories/1776540279_sports-wear.webp'
  ),
  (
    'Pro Fight Boxing Shorts & Robe',
    'Boxing Wear',
    'Custom satin and microfiber boxing shorts with embroidered waistband and side panels.',
    '/images/categories/1776540301_boxing-wear.webp'
  ),
  (
    'Heavyweight Oversized Hoodie',
    'Streetwear',
    '450 GSM luxury French Terry oversized drop-shoulder hoodie with custom branding.',
    '/images/categories/1789894942_streetwear.webp'
  )
ON CONFLICT DO NOTHING;

