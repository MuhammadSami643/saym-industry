import fs from 'fs';
import path from 'path';
import { supabase, isSupabaseConfigured } from './supabase';
import { BlogPost, BLOG_DRAFTS } from './blogs';

const DATA_DIR = path.join(process.cwd(), 'data');
const BLOGS_FILE = path.join(DATA_DIR, 'blogs.json');

const SEED_BLOGS: BlogPost[] = BLOG_DRAFTS.map((d, index) => ({
  id: `blog-${index + 1}`,
  ...d,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}));

function ensureFileExists() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(BLOGS_FILE)) {
      fs.writeFileSync(BLOGS_FILE, JSON.stringify(SEED_BLOGS, null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('[BlogsStore] Error ensuring blogs file exists:', err);
  }
}

export function getAllBlogs(): BlogPost[] {
  ensureFileExists();
  try {
    const raw = fs.readFileSync(BLOGS_FILE, 'utf-8');
    const items: BlogPost[] = JSON.parse(raw || '[]');
    if (items.length === 0) {
      return SEED_BLOGS;
    }
    return items.sort((a, b) => new Date(b.created_at || b.date).getTime() - new Date(a.created_at || a.date).getTime());
  } catch (err) {
    console.error('[BlogsStore] Error reading blogs.json:', err);
    return SEED_BLOGS;
  }
}

export function getPublishedBlogs(): BlogPost[] {
  return getAllBlogs().filter((b) => b.status === 'published');
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return getAllBlogs().find((b) => b.slug === slug);
}

export async function createBlog(post: Partial<BlogPost>): Promise<BlogPost> {
  ensureFileExists();
  const all = getAllBlogs();
  
  const id = `blog-${Date.now()}`;
  const now = new Date().toISOString();
  
  const newPost: BlogPost = {
    id,
    slug: post.slug || (post.title ? post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : `post-${Date.now()}`),
    title: post.title || 'Untitled Article',
    category: post.category || 'Activewear Manufacturing',
    date: post.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    readTime: post.readTime || '6 min read',
    author: post.author || 'Bin Rasool Technical Team',
    image: post.image || '/images/blog/how-to-start-a-private-label-activewear-brand-2026.jpg',
    excerpt: post.excerpt || '',
    content: Array.isArray(post.content) ? post.content : [post.excerpt || ''],
    tags: Array.isArray(post.tags) ? post.tags : ['Manufacturing', 'Sialkot'],
    status: post.status || 'draft',
    created_at: now,
    updated_at: now,
  };

  all.unshift(newPost);
  try {
    fs.writeFileSync(BLOGS_FILE, JSON.stringify(all, null, 2), 'utf-8');
  } catch (err) {
    console.error('[BlogsStore] Error writing to blogs.json:', err);
  }

  // Also sync to Supabase if active
  if (isSupabaseConfigured) {
    try {
      await supabase.from('blogs').insert([{
        id: newPost.id,
        slug: newPost.slug,
        title: newPost.title,
        category: newPost.category,
        date: newPost.date,
        read_time: newPost.readTime,
        author: newPost.author,
        image: newPost.image,
        excerpt: newPost.excerpt,
        content: newPost.content,
        tags: newPost.tags,
        status: newPost.status,
        created_at: newPost.created_at,
        updated_at: newPost.updated_at,
      }]);
    } catch (dbErr) {
      console.warn('[BlogsStore] Supabase sync skipped:', dbErr);
    }
  }

  return newPost;
}

export async function updateBlog(idOrSlug: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
  ensureFileExists();
  const all = getAllBlogs();
  const index = all.findIndex((b) => b.id === idOrSlug || b.slug === idOrSlug);
  
  if (index === -1) return null;

  const current = all[index];
  const updated: BlogPost = {
    ...current,
    ...updates,
    updated_at: new Date().toISOString(),
  };

  all[index] = updated;
  try {
    fs.writeFileSync(BLOGS_FILE, JSON.stringify(all, null, 2), 'utf-8');
  } catch (err) {
    console.error('[BlogsStore] Error updating blogs.json:', err);
  }

  if (isSupabaseConfigured) {
    try {
      const dbUpdates: Record<string, any> = {
        updated_at: updated.updated_at,
      };
      if (updates.title !== undefined) dbUpdates.title = updates.title;
      if (updates.status !== undefined) dbUpdates.status = updates.status;
      if (updates.content !== undefined) dbUpdates.content = updates.content;
      if (updates.excerpt !== undefined) dbUpdates.excerpt = updates.excerpt;
      if (updates.image !== undefined) dbUpdates.image = updates.image;
      if (updates.tags !== undefined) dbUpdates.tags = updates.tags;
      if (updates.category !== undefined) dbUpdates.category = updates.category;

      await supabase.from('blogs').update(dbUpdates).or(`id.eq.${current.id},slug.eq.${current.slug}`);
    } catch (dbErr) {
      console.warn('[BlogsStore] Supabase update skipped:', dbErr);
    }
  }

  return updated;
}

export async function deleteBlog(idOrSlug: string): Promise<boolean> {
  ensureFileExists();
  const all = getAllBlogs();
  const target = all.find((b) => b.id === idOrSlug || b.slug === idOrSlug);
  const filtered = all.filter((b) => b.id !== idOrSlug && b.slug !== idOrSlug);
  
  if (filtered.length === all.length) return false;

  try {
    fs.writeFileSync(BLOGS_FILE, JSON.stringify(filtered, null, 2), 'utf-8');
  } catch (err) {
    console.error('[BlogsStore] Error deleting from blogs.json:', err);
  }

  if (isSupabaseConfigured && target) {
    try {
      await supabase.from('blogs').delete().or(`id.eq.${target.id},slug.eq.${target.slug}`);
    } catch (dbErr) {
      console.warn('[BlogsStore] Supabase delete skipped:', dbErr);
    }
  }

  return true;
}
