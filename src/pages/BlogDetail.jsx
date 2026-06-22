import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowLeft, Tag, Share2 } from 'lucide-react';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';

const CATEGORY_COLORS = {
  'Market Analysis': 'bg-blue-100 text-blue-700',
  'Investment Guide': 'bg-green-100 text-green-700',
  'Golden Visa': 'bg-yellow-100 text-yellow-800',
  'Area Spotlight': 'bg-purple-100 text-purple-700',
  'Developer News': 'bg-orange-100 text-orange-700',
  'Agent Tips': 'bg-pink-100 text-pink-700',
};

export default function BlogDetail() {
  const { postId } = useParams();

  const { data: post, isLoading } = useQuery({
    queryKey: ['blog-post', postId],
    queryFn: () => base44.entities.BlogPost.get(postId),
    enabled: !!postId,
  });

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post?.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20">
        <div className="h-8 bg-muted rounded w-1/3 mb-4 animate-pulse" />
        <div className="h-64 bg-muted rounded-2xl mb-8 animate-pulse" />
        <div className="space-y-3">
          {[...Array(6)].map((_, i) => <div key={i} className="h-4 bg-muted rounded animate-pulse" style={{ width: `${85 + Math.random() * 15}%` }} />)}
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-32">
        <p className="text-xl font-semibold mb-4">Article not found.</p>
        <Button asChild><Link to="/blog">Back to Blog</Link></Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image */}
      {post.image_url && (
        <div className="w-full h-72 md:h-96 overflow-hidden">
          <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* Back */}
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${CATEGORY_COLORS[post.category] || 'bg-muted text-muted-foreground'}`}>
            {post.category}
          </span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {format(new Date(post.created_date), 'MMMM d, yyyy')}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">{post.title}</h1>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-lg text-muted-foreground border-l-4 border-accent pl-4 mb-8 leading-relaxed">{post.excerpt}</p>
        )}

        {/* Share */}
        <div className="flex justify-end mb-8">
          <button onClick={handleShare} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <Share2 className="w-4 h-4" /> Share
          </button>
        </div>

        {/* Content */}
        {post.content ? (
          <div className="prose prose-slate max-w-none prose-headings:font-heading prose-headings:font-bold prose-a:text-primary prose-img:rounded-xl">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        ) : (
          <p className="text-muted-foreground italic">No content available for this article yet.</p>
        )}

        {/* Keywords */}
        {post.seo_keywords && (
          <div className="mt-12 pt-6 border-t border-border flex flex-wrap gap-2 items-center">
            <Tag className="w-4 h-4 text-muted-foreground" />
            {post.seo_keywords.split(',').map(kw => (
              <span key={kw.trim()} className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-full">{kw.trim()}</span>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
          <h3 className="font-heading text-xl font-bold text-foreground mb-2">Ready to Invest in Dubai?</h3>
          <p className="text-muted-foreground mb-6 text-sm">Our expert advisors are ready to help you find the right property and maximise your returns.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild><Link to="/contact">Get Free Consultation</Link></Button>
            <Button variant="outline" asChild><Link to="/properties">Browse Properties</Link></Button>
          </div>
        </div>
      </div>
    </div>
  );
}