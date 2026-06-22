import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import usePageSEO from '@/lib/usePageSEO';
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit2, Trash2, Loader2, X, CheckCircle2, Users } from 'lucide-react';

const FALLBACK = 'https://remax-zam.b-cdn.net/wp-content/uploads/2025/12/man.jpg';

const EMPTY_FORM = { name: '', role: '', photo: '', phone: '', whatsapp: '', email: '', about: '', active: true, sort_order: 0, bitrix_user_id: null };

function AgentForm({ initial, onSave, onCancel, saving }) {
  const [form, setForm] = useState(initial || EMPTY_FORM);
  const [uploading, setUploading] = useState(false);

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      set('photo', file_url);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-heading font-medium text-foreground mb-1 block">Name *</label>
          <input value={form.name} onChange={e => set('name', e.target.value)} className="w-full px-3 py-2 text-sm border border-input rounded-lg font-body bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="text-xs font-heading font-medium text-foreground mb-1 block">Role *</label>
          <input value={form.role} onChange={e => set('role', e.target.value)} className="w-full px-3 py-2 text-sm border border-input rounded-lg font-body bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
      </div>

      <div>
        <label className="text-xs font-heading font-medium text-foreground mb-1 block">Photo</label>
        <div className="flex gap-3 items-center">
          {form.photo && <img src={form.photo} alt="preview" className="w-14 h-14 rounded-full object-cover object-top border" onError={e => { e.target.src = FALLBACK; }} />}
          <div className="flex-1 space-y-1">
            <input value={form.photo} onChange={e => set('photo', e.target.value)} placeholder="Paste image URL..." className="w-full px-3 py-2 text-sm border border-input rounded-lg font-body bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
            <label className="inline-flex items-center gap-1.5 text-xs text-primary cursor-pointer hover:underline">
              {uploading ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
              {uploading ? 'Uploading...' : 'Or upload file'}
              <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="text-xs font-heading font-medium text-foreground mb-1 block">Phone</label>
          <input value={form.phone} onChange={e => set('phone', e.target.value)} className="w-full px-3 py-2 text-sm border border-input rounded-lg font-body bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="text-xs font-heading font-medium text-foreground mb-1 block">WhatsApp</label>
          <input value={form.whatsapp} onChange={e => set('whatsapp', e.target.value)} className="w-full px-3 py-2 text-sm border border-input rounded-lg font-body bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="text-xs font-heading font-medium text-foreground mb-1 block">Email</label>
          <input value={form.email} onChange={e => set('email', e.target.value)} className="w-full px-3 py-2 text-sm border border-input rounded-lg font-body bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
      </div>

      <div>
        <label className="text-xs font-heading font-medium text-foreground mb-1 block">Bitrix24 User ID</label>
        <input
          type="number"
          value={form.bitrix_user_id ?? ''}
          onChange={e => set('bitrix_user_id', e.target.value === '' ? null : Number(e.target.value))}
          placeholder="e.g. 32 — leave empty to use default routing"
          className="w-full px-3 py-2 text-sm border border-input rounded-lg font-body bg-background focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <p className="text-[10px] text-muted-foreground font-body mt-1">Maps this agent to a Bitrix24 CRM user for lead assignment.</p>
      </div>

      <div>
        <label className="text-xs font-heading font-medium text-foreground mb-1 block">Bio / About</label>
        <textarea value={form.about} onChange={e => set('about', e.target.value)} rows={3} className="w-full px-3 py-2 text-sm border border-input rounded-lg font-body bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
      </div>

      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 text-sm font-body cursor-pointer">
          <input type="checkbox" checked={form.active} onChange={e => set('active', e.target.checked)} className="rounded" />
          Active (visible on public pages)
        </label>
        <div className="ml-auto flex items-center gap-2">
          <label className="text-xs font-heading text-muted-foreground">Sort Order</label>
          <input type="number" value={form.sort_order} onChange={e => set('sort_order', Number(e.target.value))} className="w-20 px-2 py-1 text-sm border border-input rounded-lg font-body bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
      </div>

      <div className="flex gap-2 pt-2 border-t border-border/50">
        <Button variant="outline" onClick={onCancel} disabled={saving} className="flex-1">Cancel</Button>
        <Button onClick={() => onSave(form)} disabled={saving || !form.name || !form.role} className="flex-1">
          {saving ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : null}
          Save Agent
        </Button>
      </div>
    </div>
  );
}

export default function AdminTeam() {
  usePageSEO({ robots: 'noindex, nofollow' });

  const queryClient = useQueryClient();
  const [modal, setModal] = useState(null); // null | { mode: 'add' } | { mode: 'edit', agent }
  const [savingId, setSavingId] = useState(null);

  const { data: agents = [], isLoading } = useQuery({
    queryKey: ['agents'],
    queryFn: () => base44.entities.Agent.list('sort_order'),
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Agent.create(data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['agents'] }); setModal(null); },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Agent.update(id, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['agents'] }); setModal(null); setSavingId(null); },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Agent.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['agents'] }),
  });

  const handleSave = (form) => {
    if (modal.mode === 'add') createMutation.mutate(form);
    else updateMutation.mutate({ id: modal.agent.id, data: form });
  };

  const handleDelete = (agent) => {
    if (confirm(`Delete ${agent.name}? This cannot be undone.`)) deleteMutation.mutate(agent.id);
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="min-h-screen bg-background">
      <section className="py-10 bg-[#0d1b3e] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <p className="text-[#c9a84c] font-heading font-semibold text-xs tracking-widest uppercase mb-1">RE/MAX ZAM — Admin</p>
            <h1 className="text-2xl font-display font-black text-white">Team Management</h1>
            <p className="text-white/60 font-body text-sm mt-1">Add, edit, or remove agents. Changes appear live on public pages.</p>
          </div>
          <Button onClick={() => setModal({ mode: 'add' })} className="bg-[#c9a84c] hover:bg-[#c9a84c]/90 text-[#0d1b3e] font-heading font-bold border-0">
            <PlusCircle className="w-4 h-4 mr-2" /> Add Agent
          </Button>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1,2,3,4,5,6].map(i => <div key={i} className="h-40 bg-muted animate-pulse rounded-xl" />)}
          </div>
        ) : agents.length === 0 ? (
          <div className="text-center py-20">
            <Users className="w-12 h-12 text-muted mx-auto mb-4" />
            <p className="font-heading font-semibold text-foreground mb-1">No agents yet</p>
            <p className="text-sm text-muted-foreground font-body mb-4">Click "Add Agent" to create your first team member.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.map(agent => (
              <div key={agent.id} className={`bg-card border rounded-xl overflow-hidden transition-all ${agent.active ? 'border-border/50 hover:border-primary/30' : 'border-dashed border-border opacity-60'}`}>
                <div className="relative">
                  <img
                    src={agent.photo || FALLBACK}
                    alt={agent.name}
                    className="w-full h-44 object-cover object-top"
                    onError={e => { e.target.src = FALLBACK; }}
                  />
                  {!agent.active && (
                    <span className="absolute top-2 left-2 text-[10px] font-heading font-bold px-2 py-0.5 rounded bg-slate-700 text-white">Inactive</span>
                  )}
                  {agent.active && (
                    <span className="absolute top-2 left-2 text-[10px] font-heading font-bold px-2 py-0.5 rounded bg-emerald-600 text-white flex items-center gap-1">
                      <CheckCircle2 className="w-2.5 h-2.5" /> Active
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-heading font-bold text-foreground">{agent.name}</h3>
                  <p className="text-xs font-heading text-accent mb-2">{agent.role}</p>
                  {agent.email && <p className="text-xs text-muted-foreground font-body truncate mb-3">{agent.email}</p>}
                  {agent.bitrix_user_id != null && (
                    <p className="text-[10px] font-mono text-muted-foreground/60 mb-3">Bitrix ID: {agent.bitrix_user_id}</p>
                  )}
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 text-xs h-8" onClick={() => setModal({ mode: 'edit', agent })}>
                      <Edit2 className="w-3 h-3 mr-1" /> Edit
                    </Button>
                    <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50 text-xs h-8 px-2" onClick={() => handleDelete(agent)}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 flex items-center justify-between p-5 bg-card border-b border-border/50">
              <h2 className="font-heading font-bold text-foreground">
                {modal.mode === 'add' ? 'Add New Agent' : `Edit — ${modal.agent.name}`}
              </h2>
              <button onClick={() => setModal(null)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5">
              <AgentForm
                initial={modal.mode === 'edit' ? modal.agent : undefined}
                onSave={handleSave}
                onCancel={() => setModal(null)}
                saving={isSaving}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}