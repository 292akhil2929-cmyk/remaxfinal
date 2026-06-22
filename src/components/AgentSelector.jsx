import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { CheckCircle2, User, Loader2 } from 'lucide-react';

const FALLBACK = 'https://remax-zam.b-cdn.net/wp-content/uploads/2025/12/man.jpg';

export default function AgentSelector({ propertyId, currentAgentId, onAgentSelected }) {
  const [selectedId, setSelectedId] = useState(currentAgentId || null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const { data: agents = [], isLoading } = useQuery({
    queryKey: ['agents'],
    queryFn: () => base44.entities.Agent.list('sort_order'),
  });

  const activeAgents = agents.filter(a => a.active !== false);

  const handleSelect = async (agent) => {
    setSelectedId(agent.id);
    setSaving(true);
    setSaved(false);
    await base44.entities.Property.update(propertyId, { assigned_agent: agent.id });
    setSaving(false);
    setSaved(true);
    if (onAgentSelected) onAgentSelected(agent);
  };

  if (isLoading) return (
    <div className="mt-4 p-4 bg-white/50 rounded-lg border border-emerald-100 flex items-center gap-2 text-sm text-muted-foreground">
      <Loader2 className="w-4 h-4 animate-spin" /> Loading agents...
    </div>
  );

  return (
    <div className="mt-4 p-4 bg-white/50 rounded-lg border border-emerald-100">
      <p className="text-xs font-heading font-semibold text-foreground mb-3 flex items-center gap-1.5">
        <User className="w-3.5 h-3.5" /> Assign Agent
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {activeAgents.map(agent => {
          const isSelected = selectedId === agent.id;
          return (
            <button
              key={agent.id}
              onClick={() => handleSelect(agent)}
              disabled={saving}
              className={`flex flex-col items-center gap-1.5 p-2 rounded-lg border-2 transition-all text-center ${
                isSelected
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-border/50 bg-white hover:border-primary/40 hover:bg-slate-50'
              }`}
            >
              <div className="relative">
                <img
                  src={agent.photo || FALLBACK}
                  alt={agent.name}
                  className="w-10 h-10 rounded-full object-cover object-top"
                  onError={e => { e.target.src = FALLBACK; }}
                />
                {isSelected && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 absolute -bottom-1 -right-1 bg-white rounded-full" />
                )}
              </div>
              <p className="text-[10px] font-heading font-semibold text-foreground leading-tight">{agent.name}</p>
              <p className="text-[9px] font-body text-muted-foreground leading-tight">{agent.role}</p>
            </button>
          );
        })}
      </div>

      {saved && (
        <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-700 font-body">
          <CheckCircle2 className="w-3.5 h-3.5" /> Agent assigned successfully!
        </div>
      )}
    </div>
  );
}