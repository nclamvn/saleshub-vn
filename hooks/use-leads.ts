'use client';

import { useState, useMemo } from 'react';
import { Lead, LeadStage } from '@/types';
import { leads as mockLeads } from '@/data/leads';
import { useAuthStore } from '@/stores/auth-store';

export function useLeads(options: { filterByOwner?: boolean } = {}) {
  const { filterByOwner = false } = options;
  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState<LeadStage | 'all'>('all');
  const [sortBy, setSortBy] = useState<'createdAt' | 'value' | 'company'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const leads = useMemo(() => {
    let filtered = [...mockLeads];
    if (filterByOwner && user) filtered = filtered.filter((lead) => lead.ownerId === user.id);
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((lead) => lead.company.toLowerCase().includes(query) || lead.contact.toLowerCase().includes(query) || lead.email.toLowerCase().includes(query));
    }
    if (stageFilter !== 'all') filtered = filtered.filter((lead) => lead.stage === stageFilter);
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'createdAt': comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(); break;
        case 'value': comparison = a.value - b.value; break;
        case 'company': comparison = a.company.localeCompare(b.company); break;
      }
      return sortOrder === 'desc' ? -comparison : comparison;
    });
    return filtered;
  }, [searchQuery, stageFilter, sortBy, sortOrder, filterByOwner, user]);

  const leadsByStage = useMemo(() => {
    const grouped: Record<LeadStage, Lead[]> = { new: [], contacted: [], qualified: [], negotiation: [], closed_won: [], closed_lost: [] };
    const leadsToGroup = filterByOwner && user ? mockLeads.filter((lead) => lead.ownerId === user.id) : mockLeads;
    leadsToGroup.forEach((lead) => grouped[lead.stage].push(lead));
    return grouped;
  }, [filterByOwner, user]);

  const stats = useMemo(() => {
    const leadsToCount = filterByOwner && user ? mockLeads.filter((lead) => lead.ownerId === user.id) : mockLeads;
    const total = leadsToCount.length;
    const won = leadsToCount.filter((l) => l.stage === 'closed_won').length;
    const lost = leadsToCount.filter((l) => l.stage === 'closed_lost').length;
    const active = total - won - lost;
    const totalValue = leadsToCount.reduce((sum, l) => sum + l.value, 0);
    const wonValue = leadsToCount.filter((l) => l.stage === 'closed_won').reduce((sum, l) => sum + l.value, 0);
    return { total, won, lost, active, totalValue, wonValue, conversionRate: total > 0 ? Math.round((won / total) * 100) : 0 };
  }, [filterByOwner, user]);

  return { leads, leadsByStage, stats, searchQuery, setSearchQuery, stageFilter, setStageFilter, sortBy, setSortBy, sortOrder, setSortOrder };
}
