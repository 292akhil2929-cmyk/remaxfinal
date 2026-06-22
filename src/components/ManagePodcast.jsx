import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Mic, Plus, Pencil, Trash2, X, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import moment from 'moment';

function extractYoutubeId(link) {
  if (!link) return '';
  // Handle youtu.be/ID
  const shortMatch = link.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return shortMatch[1];
  // Handle youtube.com/watch?v=ID
  const longMatch = link.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (longMatch) return longMatch[1];
  // Handle youtube.com/embed/ID
  const embedMatch = link.match(/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch) return embedMatch[1];
  // If it looks like a raw 11-char ID already
  if (/^[a-zA-Z0-9_-]{11}$/.test(link.trim())) return link.trim();
  return '';
}

const EMPTY_FORM = { title: '', description: '', youtubeLink: '', episodeNumber: '' };

function EpisodeForm({ initial, onSave, onCancel, saving }) {
  const [form, setForm] = useState(initial || EMPTY_FORM);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return setError('Title is required.');
    if (!form.youtubeLink.trim()) return setError('YouTube link is required.');
    const youtubeVideoId = extractYoutubeId(form.youtubeLink);
    if (!youtubeVideoId) return setError('Could not extract a valid YouTube video ID from that link.');
    setError('');
    onSave({ ...form, youtubeVideoId, episodeNumber: form.episodeNumber ? Number(form.episodeNumber) : null });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-heading font-semibold text-foreground mb-1.5 block">Title *</label>
          <input
            value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            placeholder="Episode title"
            className="w-full px-3 py-2 text-sm border border-input rounded-lg font-body bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div>
          <label className="text-xs font-heading font-semibold text-foreground mb-1.5 block">Episode Number</label>
          <input
            type="number"
            value={form.episodeNumber}
            onChange={e => setForm(f => ({ ...f, episodeNumber: e.target.value }))}
            placeholder="e.g. 5"
            className="w-full px-3 py-2 text-sm border border-input rounded-lg font-body bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>
      <div>
        <label className="text-xs font-heading font-semibold text-foreground mb-1.5 block">YouTube Link *</label>
        <input
          value={form.youtubeLink}
          onChange={e => setForm(f => ({ ...f, youtubeLink: e.target.value }))}
          placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
          className="w-full px-3 py-2 text-sm border border-input rounded-lg font-body bg-background focus:outline-none focus:ring-2 focus:ring-ring"
        />
        {form.youtubeLink && (
          <p className="text-xs mt-1 font-body">
            {extractYoutubeId(form.youtubeLink)
              ? <span className="text-emerald-600">✓ Extracted ID: <strong>{extractYoutubeId(form.youtubeLink)}</strong></span>
              : <span className="text-red-500">Could not extract video ID — check the link</span>
            }
          </p>
        )}
      </div>
      <div>
        <label className="text-xs font-heading font-semibold text-foreground mb-1.5 block">Description</label>
        <textarea
          value={form.description}
          onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          placeholder="Brief episode description..."
          rows={3}
          className="w-full px-3 py-2 text-sm border border-input rounded-lg font-body bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
        />
      </div>
      {error && (
        <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          <AlertCircle className="w-4 h-4 shrink-0" /> {error}
        </div>
      )}
      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" size="sm" onClick={onCancel} disabled={saving}>Cancel</Button>
        <Button type="submit" size="sm" disabled={saving}>
          {saving ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <CheckCircle2 className="w-4 h-4 mr-1" />}
          {initial?.id ? 'Save Changes' : 'Add Episode'}
        </Button>
      </div>
    </form>
  );
}

export default function ManagePodcast() {
  const qc = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editingEpisode, setEditingEpisode] = useState(null);

  const { data: episodes = [], isLoading } = useQuery({
    queryKey: ['podcast-episodes-admin'],
    queryFn: () => base44.entities.PodcastEpisode.list('-episodeNumber'),
  });

  const createMutation = useMutation({
    mutationFn: data => base44.entities.PodcastEpisode.create(data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['podcast-episodes-admin'] }); setShowForm(false); },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.PodcastEpisode.update(id, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['podcast-episodes-admin'] }); setEditingEpisode(null); },
  });

  const deleteMutation = useMutation({
    mutationFn: id => base44.entities.PodcastEpisode.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['podcast-episodes-admin'] }),
  });

  const handleSave = (formData) => {
    if (editingEpisode) {
      updateMutation.mutate({ id: editingEpisode.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const saving = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="bg-card border border-border/50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
            <Mic className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-foreground">Manage Podcast Episodes</h3>
            <p className="text-xs text-muted-foreground font-body">Add, edit, or remove episodes from the Dubai Real Estate Unfiltered page</p>
          </div>
        </div>
        {!showForm && !editingEpisode && (
          <Button size="sm" onClick={() => setShowForm(true)} className="font-heading">
            <Plus className="w-4 h-4 mr-1" /> Add Episode
          </Button>
        )}
      </div>

      {/* Add form */}
      {showForm && (
        <div className="mb-6 bg-muted/30 border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-heading font-semibold text-foreground text-sm">New Episode</h4>
            <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          </div>
          <EpisodeForm onSave={handleSave} onCancel={() => setShowForm(false)} saving={saving} />
        </div>
      )}

      {/* Episodes table */}
      {isLoading ? (
        <div className="space-y-2">
          {[1,2,3].map(i => <div key={i} className="h-14 bg-muted animate-pulse rounded-lg" />)}
        </div>
      ) : episodes.length === 0 ? (
        <p className="text-sm text-muted-foreground font-body text-center py-8">No episodes yet. Add your first episode above!</p>
      ) : (
        <div className="space-y-2">
          {episodes.map(ep => (
            <div key={ep.id}>
              {editingEpisode?.id === ep.id ? (
                <div className="bg-muted/30 border border-border/50 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-heading font-semibold text-foreground text-sm">Edit Episode</h4>
                    <button onClick={() => setEditingEpisode(null)} className="text-muted-foreground hover:text-foreground">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <EpisodeForm
                    initial={ep}
                    onSave={handleSave}
                    onCancel={() => setEditingEpisode(null)}
                    saving={saving}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-between p-3 bg-muted/40 rounded-lg group">
                  <div className="flex items-center gap-3 min-w-0">
                    {ep.youtubeVideoId && (
                      <img
                        src={`https://i.ytimg.com/vi/${ep.youtubeVideoId}/default.jpg`}
                        alt=""
                        className="w-12 h-9 object-cover rounded shrink-0"
                      />
                    )}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        {ep.episodeNumber && (
                          <span className="text-[10px] font-heading font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded shrink-0">
                            EP {ep.episodeNumber}
                          </span>
                        )}
                        <p className="text-sm font-heading font-medium text-foreground line-clamp-1">{ep.title}</p>
                      </div>
                      <p className="text-xs text-muted-foreground font-body mt-0.5">
                        {moment(ep.created_date).format('D MMM YYYY')}
                        {ep.youtubeVideoId && <span className="ml-2 text-emerald-600">ID: {ep.youtubeVideoId}</span>}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-3">
                    <Button size="sm" variant="ghost" onClick={() => setEditingEpisode(ep)}>
                      <Pencil className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => { if (confirm('Delete this episode?')) deleteMutation.mutate(ep.id); }}
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}