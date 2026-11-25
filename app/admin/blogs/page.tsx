"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { BLOG_POSTS, BlogPost } from '../../lib/blogs';
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
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // New blog form state
  const [newBlog, setNewBlog] = useState({
    title: '',
    category: 'Activewear Manufacturing',
    readTime: '6 min read',
    author: 'Bin Rasool Technical Team',
    image: '/images/catalog/fitness-wear/compression-activewear-set.webp',
    excerpt: '',
    contentRaw: '',
    tagsRaw: 'Activewear, Private Label, Sialkot',
  });

  const categories = ['All', ...Array.from(new Set(BLOG_POSTS.map((b) => b.category)))];

  const filteredBlogs = blogs.filter((b) => {
    const matchCat = selectedCategory === 'All' || b.category === selectedCategory;
    const query = search.toLowerCase();
    const matchSearch =
      b.title.toLowerCase().includes(query) ||
      b.excerpt.toLowerCase().includes(query) ||
      b.tags.some((t) => t.toLowerCase().includes(query)) ||
      b.author.toLowerCase().includes(query);
    return matchCat && matchSearch;
  });

  const handleCreateBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlog.title.trim() || !newBlog.excerpt.trim()) return;

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

    const created: BlogPost = {
      slug,
      title: newBlog.title,
      category: newBlog.category,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: newBlog.readTime,
      author: newBlog.author,
      image: newBlog.image,
      excerpt: newBlog.excerpt,
      content: paragraphs.length > 0 ? paragraphs : [newBlog.excerpt],
      tags,
    };

    setBlogs([created, ...blogs]);
    setShowAddModal(false);
    setNewBlog({
      title: '',
      category: 'Activewear Manufacturing',
      readTime: '6 min read',
      author: 'Bin Rasool Technical Team',
      image: '/images/catalog/fitness-wear/compression-activewear-set.webp',
      excerpt: '',
      contentRaw: '',
      tagsRaw: 'Activewear, Private Label, Sialkot',
    });
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
            CONTENT CATEGORIES
          </span>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', margin: '4px 0 2px' }}>
            <AnimatedCounter value={categories.length > 1 ? categories.length - 1 : 0} duration={1.2} delay={0.2} />
          </div>
          <span style={{ fontSize: '11.5px', color: '#38bdf8', fontWeight: 600 }}>Active manufacturing topics</span>
        </div>

        <div className="kpi-mini">
          <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8' }}>
            AVERAGE READ TIME
          </span>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', margin: '4px 0 2px' }}>
            {blogs.length > 0 ? '6.5' : '0'} <span style={{ fontSize: '16px', color: '#94a3b8', fontWeight: 600 }}>Mins</span>
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
                      {blogs.length > 0 ? '8,420' : '0'} <span style={{ fontSize: '11px', color: '#34d399', fontWeight: 700 }}>{blogs.length > 0 ? '+18.4%' : '0%'}</span>
                    </div>
                  </div>
                  <div style={{ borderLeft: '1px solid rgba(255,255,255,0.08)', paddingLeft: '16px' }}>
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 800 }}>AVG. READ DURATION</span>
                    <div style={{ fontSize: '17px', fontWeight: 800, color: '#38bdf8' }}>{blogs.length > 0 ? '4m 38s' : '0m 00s'}</div>
                  </div>
                  <div style={{ borderLeft: '1px solid rgba(255,255,255,0.08)', paddingLeft: '16px' }}>
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 800 }}>INQUIRY CONVERSION</span>
                    <div style={{ fontSize: '17px', fontWeight: 800, color: '#fbbf24' }}>
                      {blogs.length > 0 ? '14.2%' : '0.0%'} <span style={{ fontSize: '10.5px', color: '#94a3b8', fontWeight: 600 }}>RFQ pass</span>
                    </div>
                  </div>
                </div>
              </div>

              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#00e599', fontWeight: 700, background: 'rgba(0, 229, 153, 0.1)', padding: '4px 10px', borderRadius: '9999px', border: '1px solid rgba(0, 229, 153, 0.25)' }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#00e599', boxShadow: '0 0 6px #00e599' }}></span>
                LIVE RADAR
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
                <line x1="0" y1="115" x2="600" y2="115" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />

                {/* Area Fill */}
                <motion.path
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.9 }}
                  d="M 10 110 C 90 75, 170 38, 260 60 C 350 82, 430 22, 510 35 C 550 42, 575 18, 590 12 L 590 150 L 10 150 Z"
                  fill="url(#blogWaveGrad)"
                />

                {/* Glowing Line */}
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.4, ease: "easeOut" }}
                  d="M 10 110 C 90 75, 170 38, 260 60 C 350 82, 430 22, 510 35 C 550 42, 575 18, 590 12"
                  fill="none"
                  stroke="#00e599"
                  strokeWidth="2.5"
                />

                {/* Interactive Data Nodes */}
                {[
                  { cx: 10, cy: 110, label: 'Mon: 720' },
                  { cx: 130, cy: 55, label: 'Tue: 980' },
                  { cx: 260, cy: 60, label: 'Wed: 1,140' },
                  { cx: 390, cy: 50, label: 'Thu: 1,290' },
                  { cx: 510, cy: 35, label: 'Fri: 1,480' },
                  { cx: 590, cy: 12, label: 'Today: 1,620' },
                ].map((pt, idx) => (
                  <g key={idx}>
                    <circle cx={pt.cx} cy={pt.cy} r="3.5" fill="#070b0d" stroke="#00e599" strokeWidth="2.5" />
                    <circle cx={pt.cx} cy={pt.cy} r="6.5" fill="none" stroke="#00e599" strokeOpacity="0.28" />
                  </g>
                ))}
              </svg>
            </div>
          </div>

          {/* Reader Geography Breakdown Bars */}
          <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '8px' }}>
            {[
              { country: '🇺🇸 US', share: '44%', count: '3.7k', color: '#00e599' },
              { country: '🇬🇧 UK', share: '22%', count: '1.8k', color: '#38bdf8' },
              { country: '🇦🇺 AUS', share: '14%', count: '1.1k', color: '#fbbf24' },
              { country: '🇩🇪 DE', share: '12%', count: '1.0k', color: '#2dd4bf' },
              { country: '🇨🇦 CA', share: '8%', count: '0.6k', color: '#f87171' },
            ].map((geo, idx) => (
              <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', padding: '8px 10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontSize: '11px', color: '#cbd5e1', fontWeight: 700 }}>{geo.country}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: geo.color }}>{geo.share}</span>
                  <span style={{ fontSize: '10px', color: '#64748b' }}>{geo.count}</span>
                </div>
              </div>
            ))}
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
              Highest Converting: <strong style={{ color: '#00e599' }}>Activewear Guide</strong>
            </span>
            <span style={{ color: '#38bdf8', fontWeight: 700 }}>
              Total: 114 Inbound RFQs
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ background: 'rgba(14, 21, 26, 0.65)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '14px', padding: '14px 18px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '8px 14px', width: '360px', maxWidth: '100%' }}>
          <span style={{ color: '#94a3b8', fontSize: '14px' }}>🔍</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles by title, tag, author..."
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
        {filteredBlogs.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '64px 20px', background: 'rgba(14, 21, 26, 0.65)', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.08)', color: '#94a3b8' }}>
            <div style={{ fontSize: '36px', marginBottom: '12px' }}>📝</div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#f1f5f9', marginBottom: '6px' }}>No Blog Articles Published Yet</div>
            <p style={{ margin: '0 auto 20px', fontSize: '13px', color: '#64748b', maxWidth: '440px' }}>
              Publish your first B2B technical guide or private label activewear article to attract international buyers.
            </p>
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
              + Write First Article
            </button>
          </div>
        ) : (
          filteredBlogs.map((b) => (
          <div key={b.slug} className="blog-card">
            {/* Image Thumbnail */}
            <div style={{ width: '100%', height: '170px', borderRadius: '10px', overflow: 'hidden', position: 'relative', marginBottom: '14px', background: '#090d0f' }}>
              <img
                src={b.image}
                alt={b.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span
                style={{
                  position: 'absolute',
                  top: '10px',
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
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff', margin: '0 0 8px', lineHeight: 1.35, minHeight: '44px' }}>
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
            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', color: '#64748b' }}>
                By {b.author}
              </span>

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
                  padding: '5px 10px',
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
          </div>
        )))}
      </div>

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
                <h2 style={{ fontSize: '20px', fontWeight: 800, margin: 0, color: '#ffffff' }}>
                  Draft &amp; Publish New Article
                </h2>
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

              <form onSubmit={handleCreateBlog} style={{ display: 'grid', gap: '16px' }}>
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
                    Featured Cover Image URL
                  </label>
                  <input
                    type="text"
                    value={newBlog.image}
                    onChange={(e) => setNewBlog({ ...newBlog, image: e.target.value })}
                    placeholder="/images/catalog/hoodies/luxury-heavyweight-zip-hoodie.webp"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: '#fff', fontSize: '13px' }}
                  />
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
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#cbd5e1', marginBottom: '6px' }}>
                    Article Body (Separate paragraphs with double Enter)
                  </label>
                  <textarea
                    rows={6}
                    value={newBlog.contentRaw}
                    onChange={(e) => setNewBlog({ ...newBlog, contentRaw: e.target.value })}
                    placeholder="Write article content here. You can start headings with ### and bullet points with * **..."
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: '#fff', fontSize: '13px', resize: 'vertical' }}
                  />
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
                    type="submit"
                    style={{
                      background: '#00e599',
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
                    Publish Article
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
