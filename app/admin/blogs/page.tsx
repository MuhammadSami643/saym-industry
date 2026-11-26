"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { BLOG_POSTS, BLOG_DRAFTS, BlogPost } from '../../lib/blogs';
import AnimatedCounter from '../../components/AnimatedCounter';
import { PlusIcon, ExternalLinkIcon } from '../../components/AdminIcons';

const TOP_PERFORMING_ARTICLES: Array<{
  rank: number;
  title: string;
  slug: string;
  category: string;
  views: number;
  pct: number;
  rfqs: number;
  color: string;
}> = [];

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>(BLOG_POSTS);
  const [drafts, setDrafts] = useState<BlogPost[]>(BLOG_DRAFTS);
  const [activeTab, setActiveTab] = useState<'published' | 'drafts'>('drafts');
  const [previewDraft, setPreviewDraft] = useState<BlogPost | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalTab, setModalTab] = useState<'editor' | 'preview'>('editor');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load from /api/blogs dynamically on mount
  useEffect(() => {
    fetch('/api/blogs')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          const published = json.data.filter((b: BlogPost) => b.status === 'published');
          const draftsList = json.data.filter((b: BlogPost) => b.status === 'draft');
          setBlogs(published);
          setDrafts(draftsList);
        }
      })
      .catch((err) => console.warn('Could not load blogs from API, using fallback:', err));
  }, []);

  // New blog form state
  const [newBlog, setNewBlog] = useState({
    title: '',
    category: 'Activewear Manufacturing',
    readTime: '6 min read',
    author: 'Bin Rasool Technical Team',
    image: '/images/blog/how-to-start-a-private-label-activewear-brand-2026.jpg',
    excerpt: '',
    contentRaw: '',
    tagsRaw: 'Activewear, Private Label, Sialkot',
  });

  const categories = ['All', ...Array.from(new Set([...blogs, ...drafts].map((b) => b.category)))];

  const currentList = activeTab === 'published' ? blogs : drafts;

  const filteredItems = currentList.filter((b) => {
    const matchCat = selectedCategory === 'All' || b.category === selectedCategory;
    const query = search.toLowerCase();
    const matchSearch =
      b.title.toLowerCase().includes(query) ||
      b.excerpt.toLowerCase().includes(query) ||
      b.tags.some((t) => t.toLowerCase().includes(query)) ||
      b.author.toLowerCase().includes(query);
    return matchCat && matchSearch;
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'blog');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const json = await res.json();
      if (json.success && json.url) {
        setNewBlog((prev) => ({ ...prev, image: json.url }));
        setNotification('Cover image uploaded successfully!');
        setTimeout(() => setNotification(null), 3500);
      } else {
        alert(json.error || 'Failed to upload image.');
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Upload failed. Check console.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handlePublishDraft = async (draft: BlogPost) => {
    try {
      const idOrSlug = (draft as any).id || draft.slug;
      const res = await fetch(`/api/blogs/${idOrSlug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'published' }),
      });

      if (res.ok) {
        setDrafts((prev) => prev.filter((d) => d.slug !== draft.slug));
        const publishedItem: BlogPost = { ...draft, status: 'published' };
        setBlogs((prev) => [publishedItem, ...prev]);
        setPreviewDraft(null);
        setNotification(`"${draft.title}" published to live site!`);
        setTimeout(() => setNotification(null), 4000);
      }
    } catch (err) {
      console.error('Error publishing draft:', err);
    }
  };

  const handleUnpublishToDraft = async (post: BlogPost) => {
    try {
      const idOrSlug = (post as any).id || post.slug;
      const res = await fetch(`/api/blogs/${idOrSlug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'draft' }),
      });

      if (res.ok) {
        setBlogs((prev) => prev.filter((b) => b.slug !== post.slug));
        const draftItem: BlogPost = { ...post, status: 'draft' };
        setDrafts((prev) => [draftItem, ...prev]);
        setNotification(`"${post.title}" moved to Drafts.`);
        setTimeout(() => setNotification(null), 4000);
      }
    } catch (err) {
      console.error('Error unpublishing post:', err);
    }
  };

  const handleDeleteDraft = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    try {
      const res = await fetch(`/api/blogs/${slug}`, { method: 'DELETE' });
      if (res.ok) {
        setDrafts((prev) => prev.filter((d) => d.slug !== slug));
        setBlogs((prev) => prev.filter((b) => b.slug !== slug));
        setNotification('Article deleted permanently from database.');
        setTimeout(() => setNotification(null), 4000);
      }
    } catch (err) {
      console.error('Error deleting draft:', err);
    }
  };

  const handleCreateBlog = async (e: React.FormEvent, publishImmediately = false) => {
    e.preventDefault();
    if (!newBlog.title.trim() || !newBlog.excerpt.trim()) return;

    setIsSubmitting(true);
    const slug = newBlog.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const paragraphs = newBlog.contentRaw
      .split('\n\n')
      .map((p) => p.trim())
      .filter(Boolean);

    const tags = newBlog.tagsRaw
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const postPayload = {
      slug,
      title: newBlog.title.trim(),
      category: newBlog.category,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: newBlog.readTime,
      author: newBlog.author,
      image: newBlog.image,
      excerpt: newBlog.excerpt.trim(),
      content: paragraphs.length > 0 ? paragraphs : [newBlog.excerpt.trim()],
      tags: tags.length > 0 ? tags : ['Manufacturing', 'Sialkot'],
      status: publishImmediately ? 'published' : 'draft',
    };

    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postPayload),
      });

      const json = await res.json();
      const created = json.data || postPayload;

      if (publishImmediately) {
        setBlogs((prev) => [created, ...prev]);
        setActiveTab('published');
        setNotification(`"${created.title}" published live in database!`);
      } else {
        setDrafts((prev) => [created, ...prev]);
        setActiveTab('drafts');
        setNotification(`"${created.title}" saved to Drafts in database!`);
      }

      setShowAddModal(false);
      setTimeout(() => setNotification(null), 4000);

      // Reset form
      setNewBlog({
        title: '',
        category: 'Activewear Manufacturing',
        readTime: '6 min read',
        author: 'Bin Rasool Technical Team',
        image: '/images/blog/how-to-start-a-private-label-activewear-brand-2026.jpg',
        excerpt: '',
        contentRaw: '',
        tagsRaw: 'Activewear, Private Label, Sialkot',
      });
    } catch (err) {
      console.error('Error saving blog to database:', err);
      alert('Could not save to database. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: '24px 32px', maxWidth: '1440px', margin: '0 auto', color: '#ffffff' }}>
      <style jsx global>{`
        .blog-card {
          background: rgba(14, 21, 26, 0.72);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 22px;
          transition: all 0.22s ease;
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
        }
        .blog-card:hover {
          border-color: rgba(52, 211, 153, 0.35);
          transform: translateY(-2px);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(52, 211, 153, 0.08);
        }
        .kpi-mini {
          background: rgba(14, 21, 26, 0.65);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          padding: 16px 20px;
        }
      `}</style>

      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <h1 style={{ fontSize: '26px', fontWeight: 800, margin: 0, color: '#ffffff', letterSpacing: '-0.02em' }}>
              Blog Articles &amp; Technical Guides
            </h1>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                background: 'rgba(52, 211, 153, 0.15)',
                color: '#34d399',
                padding: '3px 10px',
                borderRadius: '9999px',
                border: '1px solid rgba(52, 211, 153, 0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00e599' }}></span>
              SEO CONTENT HUB
            </span>
          </div>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '13.5px' }}>
            Manage technical export guides, private label activewear tips, and factory manufacturing insights shown to international buyers.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Link
            href="/blog"
            target="_blank"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              color: '#cbd5e1',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              fontWeight: 700,
              fontSize: '12px',
              padding: '8px 16px',
              borderRadius: '9999px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease',
            }}
          >
            <span>View Public Blog</span>
            <ExternalLinkIcon size={12} />
          </Link>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(5, 150, 105, 0.35) 100%)',
              color: '#ffffff',
              border: '1px solid rgba(52, 211, 153, 0.45)',
              fontWeight: 700,
              fontSize: '12px',
              padding: '8px 18px',
              borderRadius: '9999px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              transition: 'all 0.15s ease',
            }}
          >
            <PlusIcon size={13} style={{ color: '#34d399' }} />
            <span>Write New Article</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
              color: '#ffffff',
              padding: '12px 20px',
              borderRadius: '10px',
              marginBottom: '20px',
              fontWeight: 700,
              fontSize: '13.5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 8px 24px rgba(16, 185, 129, 0.35)',
            }}
          >
            <span>✨ {notification}</span>
            <button
              type="button"
              onClick={() => setNotification(null)}
              style={{ background: 'none', border: 'none', color: '#fff', fontSize: '16px', cursor: 'pointer' }}
            >
              &times;
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '14px', marginBottom: '24px' }}>
        <div className="kpi-mini">
          <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8' }}>
            TOTAL PUBLISHED ARTICLES
          </span>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', margin: '4px 0 2px' }}>
            <AnimatedCounter value={blogs.length} duration={1.2} delay={0.1} />
          </div>
          <span style={{ fontSize: '11.5px', color: '#00e599', fontWeight: 600 }}>Live on website</span>
        </div>

        <div className="kpi-mini">
          <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8' }}>
            DRAFTS READY FOR REVIEW
          </span>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--brand-orange, #f3a626)', margin: '4px 0 2px' }}>
            <AnimatedCounter value={drafts.length} duration={1.2} delay={0.2} />
          </div>
          <span style={{ fontSize: '11.5px', color: 'var(--brand-orange, #f3a626)', fontWeight: 600 }}>Ready to review &amp; publish</span>
        </div>

        <div className="kpi-mini">
          <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8' }}>
            AVERAGE READ TIME
          </span>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', margin: '4px 0 2px' }}>
            {blogs.length > 0 ? '7.0' : '0'} <span style={{ fontSize: '16px', color: '#94a3b8', fontWeight: 600 }}>Mins</span>
          </div>
          <span style={{ fontSize: '11.5px', color: '#fbbf24', fontWeight: 600 }}>High B2B engagement</span>
        </div>

        <div className="kpi-mini">
          <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8' }}>
            SEARCH ENGINE INDEXING
          </span>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#00e599', margin: '4px 0 2px' }}>
            100%
          </div>
          <span style={{ fontSize: '11.5px', color: '#94a3b8' }}>Optimized JSON-LD Schema</span>
        </div>
      </div>

      {/* 2-Column Analytics Split: Readership Curve (Left) + Top Performing Blog Traffic Leaderboard (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.35fr) minmax(0, 1fr)', gap: '18px', marginBottom: '24px' }}>
        
        {/* LEFT: Overall Organic Readership & Growth Curve */}
        <div
          style={{
            background: 'rgba(14, 21, 26, 0.72)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderTop: '1px solid rgba(52, 211, 153, 0.35)',
            borderRadius: '16px',
            padding: '22px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.4)',
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '15px' }}>📈</span>
                  <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: '#ffffff' }}>
                    Buyer Readership &amp; Technical Impressions
                  </h3>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '8px', flexWrap: 'wrap' }}>
                  <div>
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 800 }}>MONTHLY READERS</span>
                    <div style={{ fontSize: '17px', fontWeight: 800, color: '#00e599' }}>
                      0 <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>0%</span>
                    </div>
                  </div>
                  <div style={{ borderLeft: '1px solid rgba(255,255,255,0.08)', paddingLeft: '16px' }}>
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 800 }}>AVG. READ DURATION</span>
                    <div style={{ fontSize: '17px', fontWeight: 800, color: '#38bdf8' }}>0m 00s</div>
                  </div>
                  <div style={{ borderLeft: '1px solid rgba(255,255,255,0.08)', paddingLeft: '16px' }}>
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 800 }}>INQUIRY CONVERSION</span>
                    <div style={{ fontSize: '17px', fontWeight: 800, color: '#fbbf24' }}>
                      0.0% <span style={{ fontSize: '10.5px', color: '#94a3b8', fontWeight: 600 }}>RFQ pass</span>
                    </div>
                  </div>
                </div>
              </div>

              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#00e599', fontWeight: 700, background: 'rgba(0, 229, 153, 0.1)', padding: '4px 10px', borderRadius: '9999px', border: '1px solid rgba(0, 229, 153, 0.25)' }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#00e599', boxShadow: '0 0 6px #00e599' }}></span>
                STANDBY
              </span>
            </div>

            {/* Readership SVG Curve */}
            <div style={{ height: '160px', width: '100%', position: 'relative', marginTop: '6px' }}>
              <svg viewBox="0 0 600 160" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                <defs>
                  <linearGradient id="blogWaveGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00e599" stopOpacity="0.25" />
                    <stop offset="65%" stopColor="#00e599" stopOpacity="0.03" />
                    <stop offset="100%" stopColor="#00e599" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Grid lines */}
                <line x1="0" y1="25" x2="600" y2="25" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                <line x1="0" y1="70" x2="600" y2="70" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                <line x1="0" y1="135" x2="600" y2="135" stroke="rgba(255,255,255,0.08)" />

                {/* Area Fill */}
                <motion.path
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.9 }}
                  d="M 10 135 L 590 135 L 590 150 L 10 150 Z"
                  fill="url(#blogWaveGrad)"
                />

                {/* Baseline Line */}
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.1, ease: "easeOut" }}
                  d="M 10 135 L 590 135"
                  fill="none"
                  stroke="#00e599"
                  strokeWidth="2.5"
                />

                {/* Interactive Data Nodes on Baseline */}
                {[
                  { cx: 10, cy: 135, label: 'Mon' },
                  { cx: 130, cy: 135, label: 'Tue' },
                  { cx: 260, cy: 135, label: 'Wed' },
                  { cx: 390, cy: 135, label: 'Thu' },
                  { cx: 510, cy: 135, label: 'Fri' },
                  { cx: 590, cy: 135, label: 'Sat' },
                ].map((pt, idx) => (
                  <g key={idx}>
                    <circle cx={pt.cx} cy={pt.cy} r="3.5" fill="#070b0d" stroke="#00e599" strokeWidth="2.5" />
                    <circle cx={pt.cx} cy={pt.cy} r="6.5" fill="none" stroke="#00e599" strokeOpacity="0.28" />
                  </g>
                ))}
              </svg>
            </div>
          </div>

          {/* Reader Geography Breakdown Placeholder */}
          <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '10px 14px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.04)', fontSize: '11.5px', color: '#94a3b8', textAlign: 'center' }}>
            Global reader geolocation standby &bull; Reads across US, UK, Australia, Germany &amp; Canada will populate as articles are published.
          </div>
        </div>

        {/* RIGHT: Top Performing Blog Traffic Leaderboard Chart ("Kis blog py zyada traffic aa rahi") */}
        <div
          style={{
            background: 'rgba(14, 21, 26, 0.72)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderTop: '1px solid rgba(56, 189, 248, 0.35)',
            borderRadius: '16px',
            padding: '22px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.4)',
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                  <span style={{ fontSize: '15px' }}>🏆</span>
                  <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: '#ffffff' }}>
                    Top Performing Articles by Traffic
                  </h3>
                </div>
                <p style={{ margin: '3px 0 0', fontSize: '11.5px', color: '#94a3b8' }}>
                  Kis blog par sab se zyada global buyer traffic &amp; RFQs aa rahi hain
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    fontSize: '10.5px',
                    fontWeight: 800,
                    background: 'rgba(56, 189, 248, 0.12)',
                    color: '#38bdf8',
                    padding: '3px 8px',
                    borderRadius: '9999px',
                    border: '1px solid rgba(56, 189, 248, 0.28)',
                  }}
                >
                  TOP 4 &bull; SCROLL
                </span>
              </div>
            </div>

            {/* Ranked Articles Horizontal Bar Chart (Top 4 Visible, Remainder Scrollable) */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                maxHeight: '268px',
                overflowY: 'auto',
                paddingRight: '6px',
              }}
            >
              {TOP_PERFORMING_ARTICLES.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '54px 16px', color: '#94a3b8' }}>
                  <div style={{ fontSize: '26px', marginBottom: '8px' }}>📊</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#f1f5f9', marginBottom: '4px' }}>No Article Traffic Yet</div>
                  <p style={{ margin: 0, fontSize: '11.5px', color: '#64748b' }}>
                    Rankings will appear here once new articles are published and receive views.
                  </p>
                </div>
              ) : (
                TOP_PERFORMING_ARTICLES.map((article) => (
                  <div
                    key={article.rank}
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      padding: '8px 12px',
                      borderRadius: '10px',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: 1 }}>
                        <span
                          style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            background: article.rank === 1 ? 'linear-gradient(135deg, #fbbf24, #d97706)' : article.rank === 2 ? '#94a3b8' : article.rank === 3 ? '#d97706' : 'rgba(255,255,255,0.08)',
                            color: article.rank <= 3 ? '#070b0d' : '#94a3b8',
                            fontSize: '10.5px',
                            fontWeight: 900,
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          {article.rank}
                        </span>
                        <Link
                          href={`/blog/${article.slug}`}
                          target="_blank"
                          style={{
                            color: '#f1f5f9',
                            fontWeight: 700,
                            fontSize: '12px',
                            textDecoration: 'none',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                          title={article.title}
                        >
                          {article.title}
                        </Link>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                        <span style={{ fontSize: '11px', fontWeight: 800, color: article.color }}>
                          {article.views.toLocaleString()}
                        </span>
                        <span style={{ fontSize: '10px', color: '#64748b' }}>({article.pct}%)</span>
                      </div>
                    </div>

                    {/* Relative Traffic Bar */}
                    <div style={{ height: '5px', background: 'rgba(255,255,255,0.06)', borderRadius: '999px', overflow: 'hidden', position: 'relative' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(article.views / 2840) * 100}%` }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, delay: article.rank * 0.08, ease: "easeOut" as const }}
                        style={{
                          height: '100%',
                          background: article.color,
                          borderRadius: '999px',
                          boxShadow: `0 0 6px ${article.color}55`,
                        }}
                      />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px', fontSize: '10px', color: '#64748b' }}>
                      <span style={{ color: '#94a3b8' }}>Category: {article.category}</span>
                      <span style={{ color: '#00e599', fontWeight: 700 }}>⚡ {article.rfqs} Inquiries</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Bottom Highlight Key */}
          <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px' }}>
            <span style={{ color: '#94a3b8' }}>
              Highest Converting: <strong style={{ color: '#00e599' }}>Awaiting published traffic</strong>
            </span>
            <span style={{ color: '#38bdf8', fontWeight: 700 }}>
              Total: 0 Inbound RFQs
            </span>
          </div>
        </div>
      </div>

      {/* Two Tabs: Published vs Drafts */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '14px' }}>
        <button
          type="button"
          onClick={() => setActiveTab('published')}
          style={{
            padding: '11px 22px',
            borderRadius: '12px',
            fontSize: '13px',
            fontWeight: 800,
            border: activeTab === 'published' ? '1px solid rgba(0, 229, 153, 0.45)' : '1px solid rgba(255, 255, 255, 0.08)',
            background: activeTab === 'published' ? 'linear-gradient(135deg, rgba(0, 229, 153, 0.18) 0%, rgba(5, 150, 105, 0.1) 100%)' : 'rgba(255, 255, 255, 0.03)',
            color: activeTab === 'published' ? '#00e599' : '#94a3b8',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '9px',
            transition: 'all 0.18s ease',
            boxShadow: activeTab === 'published' ? '0 4px 16px rgba(0, 229, 153, 0.15)' : 'none',
          }}
        >
          <span>🟢 Published Articles</span>
          <span
            style={{
              background: activeTab === 'published' ? '#00e599' : 'rgba(255, 255, 255, 0.1)',
              color: activeTab === 'published' ? '#070b0d' : '#cbd5e1',
              fontSize: '11px',
              fontWeight: 900,
              padding: '2px 8px',
              borderRadius: '999px',
            }}
          >
            {blogs.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('drafts')}
          style={{
            padding: '11px 22px',
            borderRadius: '12px',
            fontSize: '13px',
            fontWeight: 800,
            border: activeTab === 'drafts' ? '1px solid rgba(243, 166, 38, 0.55)' : '1px solid rgba(255, 255, 255, 0.08)',
            background: activeTab === 'drafts' ? 'linear-gradient(135deg, rgba(243, 166, 38, 0.2) 0%, rgba(217, 119, 6, 0.12) 100%)' : 'rgba(255, 255, 255, 0.03)',
            color: activeTab === 'drafts' ? 'var(--brand-orange, #f3a626)' : '#94a3b8',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '9px',
            transition: 'all 0.18s ease',
            boxShadow: activeTab === 'drafts' ? '0 4px 16px rgba(243, 166, 38, 0.2)' : 'none',
          }}
        >
          <span>📝 Review Drafts &amp; AI Posts</span>
          <span
            style={{
              background: activeTab === 'drafts' ? 'var(--brand-orange, #f3a626)' : 'rgba(255, 255, 255, 0.1)',
              color: activeTab === 'drafts' ? '#070b0d' : '#cbd5e1',
              fontSize: '11px',
              fontWeight: 900,
              padding: '2px 8px',
              borderRadius: '999px',
            }}
          >
            {drafts.length}
          </span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ background: 'rgba(14, 21, 26, 0.65)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '14px', padding: '14px 18px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '8px 14px', width: '360px', maxWidth: '100%' }}>
          <span style={{ color: '#94a3b8', fontSize: '14px' }}>🔍</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={activeTab === 'published' ? 'Search published articles...' : 'Search draft articles...'}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#ffffff',
              fontSize: '13px',
              width: '100%',
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '6px 12px',
                borderRadius: '9999px',
                fontSize: '11.5px',
                fontWeight: 700,
                border: selectedCategory === cat ? '1px solid rgba(0, 229, 153, 0.35)' : '1px solid rgba(255, 255, 255, 0.08)',
                background: selectedCategory === cat ? 'rgba(0, 229, 153, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                color: selectedCategory === cat ? '#00e599' : '#94a3b8',
                cursor: 'pointer',
                transition: 'all 0.18s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
        {filteredItems.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '64px 20px', background: 'rgba(14, 21, 26, 0.65)', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.08)', color: '#94a3b8' }}>
            <div style={{ fontSize: '38px', marginBottom: '12px' }}>
              {activeTab === 'published' ? '🌐' : '📝'}
            </div>
            <div style={{ fontSize: '17px', fontWeight: 700, color: '#f1f5f9', marginBottom: '6px' }}>
              {activeTab === 'published' ? 'No Articles Published to Live Site Yet' : 'No Draft Articles in Queue'}
            </div>
            <p style={{ margin: '0 auto 20px', fontSize: '13px', color: '#64748b', maxWidth: '440px' }}>
              {activeTab === 'published'
                ? `You currently have ${drafts.length} draft article(s) waiting for review. Switch to the Drafts tab to preview and publish them.`
                : 'Write your first article or prompt the AI to generate a technical B2B manufacturing guide.'}
            </p>
            {activeTab === 'published' && drafts.length > 0 ? (
              <button
                type="button"
                onClick={() => setActiveTab('drafts')}
                style={{
                  background: 'var(--brand-orange, #f3a626)',
                  color: '#070b0d',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '9px 20px',
                  fontSize: '12.5px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 0 16px rgba(243, 166, 38, 0.35)',
                }}
              >
                Review Draft Articles ({drafts.length}) &rarr;
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                style={{
                  background: '#00e599',
                  color: '#070b0d',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '9px 20px',
                  fontSize: '12.5px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 0 16px rgba(0, 229, 153, 0.35)',
                }}
              >
                + Write New Article
              </button>
            )}
          </div>
        ) : (
          filteredItems.map((b) => (
            <div
              key={b.slug}
              className="blog-card"
              style={{
                borderColor: activeTab === 'drafts' ? 'rgba(243, 166, 38, 0.25)' : 'rgba(255, 255, 255, 0.08)',
              }}
            >
              {/* Image Thumbnail */}
              <div style={{ width: '100%', height: '175px', borderRadius: '10px', overflow: 'hidden', position: 'relative', marginBottom: '14px', background: '#090d0f' }}>
                <img
                  src={b.image}
                  alt={b.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />

                {/* Status Badge */}
                <span
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    background: activeTab === 'drafts' ? 'rgba(243, 166, 38, 0.95)' : 'rgba(0, 229, 153, 0.95)',
                    color: '#070b0d',
                    fontSize: '10px',
                    fontWeight: 900,
                    padding: '3px 9px',
                    borderRadius: '6px',
                    letterSpacing: '0.05em',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                  }}
                >
                  {activeTab === 'drafts' ? 'DRAFT • READY FOR REVIEW' : 'LIVE'}
                </span>

                {/* Category Pill */}
                <span
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '10px',
                    background: 'rgba(7, 11, 13, 0.85)',
                    backdropFilter: 'blur(8px)',
                    color: '#38bdf8',
                    fontSize: '10.5px',
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: '6px',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  {b.category}
                </span>
              </div>

              {/* Meta */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11.5px', color: '#94a3b8', marginBottom: '8px' }}>
                <span>{b.date}</span>
                <span style={{ color: '#00e599', fontWeight: 600 }}>⏱️ {b.readTime}</span>
              </div>

              {/* Title */}
              <h3 style={{ fontSize: '15.5px', fontWeight: 800, color: '#ffffff', margin: '0 0 8px', lineHeight: 1.35, minHeight: '42px' }}>
                {b.title}
              </h3>

              {/* Excerpt */}
              <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 16px', lineHeight: 1.5, flex: 1 }}>
                {b.excerpt.length > 130 ? `${b.excerpt.slice(0, 130)}...` : b.excerpt}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                {b.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: '10.5px',
                      color: '#cbd5e1',
                      background: 'rgba(255, 255, 255, 0.05)',
                      padding: '2px 7px',
                      borderRadius: '4px',
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Card Footer Actions */}
              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '11px', color: '#64748b' }}>
                  By {b.author.split(' ')[0]}
                </span>

                {activeTab === 'drafts' ? (
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button
                      type="button"
                      onClick={() => setPreviewDraft(b)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '7px',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#cbd5e1',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        transition: 'all 0.15s ease',
                      }}
                      title="Preview formatting before publishing"
                    >
                      <span>👁️ Preview</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handlePublishDraft(b)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '7px',
                        fontSize: '11.5px',
                        fontWeight: 800,
                        background: 'linear-gradient(135deg, #00e599 0%, #059669 100%)',
                        border: 'none',
                        color: '#070b0d',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        boxShadow: '0 2px 10px rgba(0, 229, 153, 0.3)',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <span>🚀 Publish Live</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteDraft(b.slug)}
                      style={{
                        padding: '6px 9px',
                        borderRadius: '7px',
                        fontSize: '11.5px',
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.25)',
                        color: '#f87171',
                        cursor: 'pointer',
                      }}
                      title="Discard Draft"
                    >
                      🗑️
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button
                      type="button"
                      onClick={() => handleUnpublishToDraft(b)}
                      style={{
                        padding: '5px 10px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: 600,
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        color: '#94a3b8',
                        cursor: 'pointer',
                      }}
                      title="Move back to drafts"
                    >
                      Unpublish
                    </button>

                    <Link
                      href={`/blog/${b.slug}`}
                      target="_blank"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        fontSize: '12px',
                        fontWeight: 700,
                        color: '#00e599',
                        textDecoration: 'none',
                        padding: '5px 12px',
                        borderRadius: '6px',
                        background: 'rgba(0, 229, 153, 0.1)',
                        border: '1px solid rgba(0, 229, 153, 0.25)',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <span>Read Live</span>
                      <ExternalLinkIcon size={12} />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Full Preview Modal for Drafts */}
      <AnimatePresence>
        {previewDraft && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 100000,
              padding: '24px',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.2 }}
              style={{
                width: '860px',
                maxWidth: '100%',
                maxHeight: '92vh',
                display: 'flex',
                flexDirection: 'column',
                background: 'rgba(14, 21, 26, 0.98)',
                border: '1px solid rgba(243, 166, 38, 0.4)',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 25px 70px rgba(0, 0, 0, 0.8), 0 0 30px rgba(243, 166, 38, 0.15)',
              }}
            >
              {/* Preview Header */}
              <div
                style={{
                  padding: '16px 24px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'rgba(243, 166, 38, 0.08)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span
                    style={{
                      background: 'var(--brand-orange, #f3a626)',
                      color: '#070b0d',
                      fontSize: '11px',
                      fontWeight: 900,
                      padding: '3px 10px',
                      borderRadius: '999px',
                      letterSpacing: '0.04em',
                    }}
                  >
                    DRAFT PREVIEW
                  </span>
                  <span style={{ fontSize: '13px', color: '#cbd5e1', fontWeight: 600 }}>
                    Review layout, headings (H2/H3), and content
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button
                    type="button"
                    onClick={() => handlePublishDraft(previewDraft)}
                    style={{
                      background: 'linear-gradient(135deg, #00e599 0%, #059669 100%)',
                      color: '#070b0d',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px 18px',
                      fontSize: '12.5px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: '0 2px 12px rgba(0, 229, 153, 0.35)',
                    }}
                  >
                    <span>🚀 Publish to Live Site</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPreviewDraft(null)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#94a3b8',
                      fontSize: '24px',
                      cursor: 'pointer',
                      lineHeight: 1,
                    }}
                  >
                    &times;
                  </button>
                </div>
              </div>

              {/* Preview Body (Scrollable) */}
              <div style={{ padding: '28px 36px', overflowY: 'auto', flex: 1 }}>
                {/* Category & Meta */}
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap' }}>
                  <span style={{ color: '#38bdf8', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {previewDraft.category}
                  </span>
                  <span style={{ color: '#64748b' }}>•</span>
                  <span style={{ color: '#94a3b8', fontSize: '12px' }}>{previewDraft.date}</span>
                  <span style={{ color: '#64748b' }}>•</span>
                  <span style={{ color: '#00e599', fontSize: '12px', fontWeight: 700 }}>⏱️ {previewDraft.readTime}</span>
                </div>

                {/* Article Title */}
                <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', lineHeight: 1.3, marginBottom: '16px' }}>
                  {previewDraft.title}
                </h1>

                {/* Cover Image */}
                <div style={{ width: '100%', aspectRatio: '16/9', maxHeight: '420px', borderRadius: '12px', overflow: 'hidden', marginBottom: '24px', background: '#090d0f' }}>
                  <img
                    src={previewDraft.image}
                    alt={previewDraft.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Excerpt Callout */}
                <div
                  style={{
                    padding: '16px 20px',
                    borderRadius: '10px',
                    background: 'rgba(56, 189, 248, 0.08)',
                    borderLeft: '4px solid #38bdf8',
                    marginBottom: '28px',
                    fontSize: '14.5px',
                    lineHeight: 1.6,
                    color: '#e2e8f0',
                    fontStyle: 'italic',
                  }}
                >
                  {previewDraft.excerpt}
                </div>

                {/* Rendered Markdown Content */}
                <div style={{ display: 'grid', gap: '18px', color: '#cbd5e1', fontSize: '14.5px', lineHeight: 1.8 }}>
                  {previewDraft.content.map((block, idx) => {
                    if (block.startsWith('### ')) {
                      return (
                        <h3 key={idx} style={{ fontSize: '18px', fontWeight: 800, color: '#f1f5f9', margin: '14px 0 4px', borderLeft: '3px solid #38bdf8', paddingLeft: '10px' }}>
                          {block.replace('### ', '')}
                        </h3>
                      );
                    }
                    if (block.startsWith('## ')) {
                      return (
                        <h2 key={idx} style={{ fontSize: '21px', fontWeight: 800, color: '#00e599', margin: '20px 0 6px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
                          {block.replace('## ', '')}
                        </h2>
                      );
                    }
                    if (block.startsWith('* **')) {
                      return (
                        <div key={idx} style={{ paddingLeft: '16px', borderLeft: '2px solid rgba(255,255,255,0.15)', margin: '4px 0' }}>
                          <span style={{ color: '#00e599', marginRight: '6px' }}>•</span>
                          <span dangerouslySetInnerHTML={{
                            __html: block
                              .replace(/^\* \*\*/, '<strong>')
                              .replace(/\*\*:?/, ':</strong>')
                          }} />
                        </div>
                      );
                    }
                    return <p key={idx} style={{ margin: 0 }}>{block}</p>;
                  })}
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '32px', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  {previewDraft.tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: '11px',
                        color: '#94a3b8',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        padding: '3px 10px',
                        borderRadius: '6px',
                      }}
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Preview Footer Call-to-action */}
              <div
                style={{
                  padding: '16px 24px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  background: 'rgba(7, 11, 13, 0.95)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                  Target Live URL: <code style={{ color: '#00e599' }}>/blog/{previewDraft.slug}</code>
                </span>

                <button
                  type="button"
                  onClick={() => handlePublishDraft(previewDraft)}
                  style={{
                    background: 'linear-gradient(135deg, #00e599 0%, #059669 100%)',
                    color: '#070b0d',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 22px',
                    fontSize: '13px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    boxShadow: '0 0 16px rgba(0, 229, 153, 0.4)',
                  }}
                >
                  🚀 Publish to Live Site Now
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Write New Article Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 100000,
              padding: '20px',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.2 }}
              style={{
                width: '680px',
                maxWidth: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                background: 'rgba(14, 21, 26, 0.95)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '18px',
                padding: '28px',
                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(52, 211, 153, 0.15)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: 800, margin: 0, color: '#ffffff' }}>
                    Author New Technical Article
                  </h2>
                  <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#94a3b8' }}>
                    Save directly as a draft for review, or publish live instantly.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#94a3b8',
                    fontSize: '22px',
                    cursor: 'pointer',
                    lineHeight: 1,
                  }}
                >
                  &times;
                </button>
              </div>

              <form onSubmit={(e) => handleCreateBlog(e, false)} style={{ display: 'grid', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#cbd5e1', marginBottom: '6px' }}>
                    Article Headline / Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newBlog.title}
                    onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                    placeholder="e.g. Complete Guide to 500 GSM Heavyweight French Terry Hoodies"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: '#fff', fontSize: '13.5px' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#cbd5e1', marginBottom: '6px' }}>
                      Category
                    </label>
                    <select
                      value={newBlog.category}
                      onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: '#090d0f', color: '#fff', fontSize: '13px' }}
                    >
                      <option value="Activewear Manufacturing">Activewear Manufacturing</option>
                      <option value="Streetwear & Hoodies">Streetwear &amp; Hoodies</option>
                      <option value="Combat & Boxing Gear">Combat &amp; Boxing Gear</option>
                      <option value="Sportswear & Teamwear">Sportswear &amp; Teamwear</option>
                      <option value="Production & Sourcing">Production &amp; Sourcing</option>
                      <option value="Sustainable Manufacturing">Sustainable Manufacturing</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#cbd5e1', marginBottom: '6px' }}>
                      Read Time
                    </label>
                    <input
                      type="text"
                      value={newBlog.readTime}
                      onChange={(e) => setNewBlog({ ...newBlog, readTime: e.target.value })}
                      placeholder="e.g. 7 min read"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: '#fff', fontSize: '13px' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#cbd5e1', marginBottom: '6px' }}>
                    Featured Cover Image (Upload from PC or Paste URL)
                  </label>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <input
                      type="text"
                      value={newBlog.image}
                      onChange={(e) => setNewBlog({ ...newBlog, image: e.target.value })}
                      placeholder="/images/blog/..."
                      style={{ flex: 1, padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: '#fff', fontSize: '13px' }}
                    />
                    <label
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '10px 16px',
                        borderRadius: '10px',
                        background: uploadingImage ? 'rgba(56, 189, 248, 0.3)' : 'rgba(56, 189, 248, 0.15)',
                        border: '1px solid rgba(56, 189, 248, 0.4)',
                        color: '#38bdf8',
                        fontSize: '12.5px',
                        fontWeight: 800,
                        cursor: uploadingImage ? 'not-allowed' : 'pointer',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <span>{uploadingImage ? '⏳ Uploading...' : '📷 Upload From PC'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploadingImage}
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                  {newBlog.image && (
                    <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '80px', height: '45px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.2)', background: '#000' }}>
                        <img src={newBlog.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <span style={{ fontSize: '11px', color: '#00e599', fontWeight: 600 }}>✓ Cover Image Ready</span>
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#cbd5e1', marginBottom: '6px' }}>
                    Summary / Excerpt *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={newBlog.excerpt}
                    onChange={(e) => setNewBlog({ ...newBlog, excerpt: e.target.value })}
                    placeholder="Brief 2-3 sentence overview that appears in the card and meta description..."
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: '#fff', fontSize: '13px', resize: 'vertical' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#cbd5e1' }}>
                      Article Body / HTML (Paste Formatted Content from Antigravity) *
                    </label>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        type="button"
                        onClick={() => setModalTab('editor')}
                        style={{
                          padding: '4px 12px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: 800,
                          background: modalTab === 'editor' ? '#38bdf8' : 'rgba(255,255,255,0.06)',
                          color: modalTab === 'editor' ? '#070b0d' : '#94a3b8',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        ✏️ Write / Paste
                      </button>
                      <button
                        type="button"
                        onClick={() => setModalTab('preview')}
                        style={{
                          padding: '4px 12px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: 800,
                          background: modalTab === 'preview' ? '#00e599' : 'rgba(255,255,255,0.06)',
                          color: modalTab === 'preview' ? '#070b0d' : '#94a3b8',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        👁️ Live Formatted Preview
                      </button>
                    </div>
                  </div>

                  {modalTab === 'editor' ? (
                    <textarea
                      rows={9}
                      value={newBlog.contentRaw}
                      onChange={(e) => setNewBlog({ ...newBlog, contentRaw: e.target.value })}
                      placeholder={`Paste formatted article text or HTML here...\n\nAntigravity can generate this for you directly.\nExample:\n## Step 1: Fabric Selection\nChoose 75/25 Nylon Spandex interlock...\n\n* **Squat-proof opacity**\n* **4-way stretch**`}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '10px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        background: 'rgba(255,255,255,0.04)',
                        color: '#fff',
                        fontSize: '13px',
                        fontFamily: 'monospace',
                        lineHeight: 1.6,
                        resize: 'vertical',
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        minHeight: '200px',
                        maxHeight: '300px',
                        overflowY: 'auto',
                        padding: '16px 20px',
                        borderRadius: '10px',
                        border: '1px solid rgba(0,229,153,0.3)',
                        background: '#070b0d',
                        color: '#e2e8f0',
                        fontSize: '13px',
                        lineHeight: 1.7,
                      }}
                    >
                      {newBlog.contentRaw.trim() ? (
                        newBlog.contentRaw.split('\n\n').map((block, idx) => {
                          const trimmed = block.trim();
                          if (trimmed.startsWith('### ')) {
                            return <h4 key={idx} style={{ fontSize: '15px', fontWeight: 800, color: '#f3a626', margin: '14px 0 6px' }}>{trimmed.replace('### ', '')}</h4>;
                          }
                          if (trimmed.startsWith('## ')) {
                            return <h3 key={idx} style={{ fontSize: '17px', fontWeight: 800, color: '#38bdf8', margin: '18px 0 8px' }}>{trimmed.replace('## ', '')}</h3>;
                          }
                          if (trimmed.startsWith('* ')) {
                            const items = trimmed.split('\n').filter(l => l.trim().startsWith('* '));
                            return (
                              <ul key={idx} style={{ paddingLeft: '20px', margin: '8px 0' }}>
                                {items.map((it, i) => (
                                  <li key={i} style={{ marginBottom: '4px' }}>
                                    {it.replace('* ', '').replace(/\*\*(.*?)\*\*/g, '$1')}
                                  </li>
                                ))}
                              </ul>
                            );
                          }
                          return <p key={idx} style={{ margin: '0 0 10px', color: '#cbd5e1' }}>{trimmed}</p>;
                        })
                      ) : (
                        <p style={{ color: '#64748b', fontStyle: 'italic', margin: 0 }}>
                          Paste content in the editor tab to see the live formatted preview here.
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#cbd5e1', marginBottom: '6px' }}>
                    Tags (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={newBlog.tagsRaw}
                    onChange={(e) => setNewBlog({ ...newBlog, tagsRaw: e.target.value })}
                    placeholder="Hoodies, GSM, Streetwear, Sialkot"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: '#fff', fontSize: '13px' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: '#cbd5e1',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '10px 18px',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleCreateBlog(e, false)}
                    style={{
                      background: 'rgba(243, 166, 38, 0.15)',
                      color: 'var(--brand-orange, #f3a626)',
                      border: '1px solid rgba(243, 166, 38, 0.4)',
                      borderRadius: '8px',
                      padding: '10px 18px',
                      fontSize: '13px',
                      fontWeight: 800,
                      cursor: 'pointer',
                    }}
                  >
                    {isSubmitting ? '⏳ Saving...' : '💾 Save as Draft to Database'}
                  </button>

                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={(e) => handleCreateBlog(e, true)}
                    style={{
                      background: '#00e599',
                      color: '#070b0d',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '10px 22px',
                      fontSize: '13px',
                      fontWeight: 800,
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      opacity: isSubmitting ? 0.7 : 1,
                      boxShadow: '0 0 16px rgba(0, 229, 153, 0.4)',
                    }}
                  >
                    {isSubmitting ? '⏳ Publishing...' : '🚀 Publish Live to Database'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
