import { useState, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import PropertyEditor from './PropertyEditor';
import {
  Search,
  Trash2,
  Edit3,
  Loader2,
  ImageOff,
  Home,
  AlertCircle,
  CheckCircle2,
  SlidersHorizontal,
} from 'lucide-react';
import moment from 'moment';

const ITEMS_PER_PAGE = 15;

const STATUS_OPTIONS = [
  { value: 'all', label: 'All Statuses' },
  { value: 'Available', label: 'Available' },
  { value: 'Reserved', label: 'Reserved' },
  { value: 'Sold', label: 'Sold' },
  { value: 'Leased', label: 'Leased' },
];

const LISTING_STATUS_OPTIONS = [
  { value: 'all', label: 'All Listing Types' },
  { value: 'Off-Plan', label: 'Off-Plan' },
  { value: 'Ready', label: 'Ready' },
  { value: 'Resale', label: 'Resale' },
];

const POCKET_FILTER_OPTIONS = [
  { value: 'all', label: 'All Listings' },
  { value: 'standard', label: 'Standard Only' },
  { value: 'pocket', label: 'Pocket Only' },
];

function PropertyStatusBadge({ status }) {
  const variants = {
    Available: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    Reserved: 'bg-amber-100 text-amber-700 border-amber-200',
    Sold: 'bg-red-100 text-red-700 border-red-200',
    Leased: 'bg-blue-100 text-blue-700 border-blue-200',
  };
  const variant = variants[status] || 'bg-gray-100 text-gray-700 border-gray-200';
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${variant}`}>
      {status || '—'}
    </span>
  );
}

function ListingStatusBadge({ status }) {
  const variants = {
    'Off-Plan': 'bg-purple-100 text-purple-700 border-purple-200',
    Ready: 'bg-green-100 text-green-700 border-green-200',
    Resale: 'bg-orange-100 text-orange-700 border-orange-200',
  };
  const variant = variants[status] || 'bg-gray-100 text-gray-700 border-gray-200';
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${variant}`}>
      {status || '—'}
    </span>
  );
}

export default function PropertyManagementDashboard() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [listingStatusFilter, setListingStatusFilter] = useState('all');
  const [pocketFilter, setPocketFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingProperty, setEditingProperty] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  const { data: properties = [], isLoading, error, refetch } = useQuery({
    queryKey: ['admin-all-properties'],
    queryFn: () => base44.entities.Property.list('-created_date', 200),
    staleTime: 30_000,
  });

  const filtered = useMemo(() => {
    let result = properties;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.location?.toLowerCase().includes(q) ||
          p.community?.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== 'all') {
      result = result.filter((p) => p.status === statusFilter);
    }

    if (listingStatusFilter !== 'all') {
      result = result.filter((p) => p.listing_status === listingStatusFilter);
    }

    if (pocketFilter === 'standard') {
      result = result.filter((p) => !p.isPocketListing);
    } else if (pocketFilter === 'pocket') {
      result = result.filter((p) => p.isPocketListing);
    }

    return result;
  }, [properties, search, statusFilter, listingStatusFilter, pocketFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = useMemo(() => {
    const start = (safePage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, safePage]);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this listing? This action cannot be undone.')) return;
    setDeletingId(id);
    setDeleteError(null);
    try {
      await base44.entities.Property.delete(id);
      queryClient.invalidateQueries({ queryKey: ['admin-all-properties'] });
    } catch (err) {
      setDeleteError(err?.response?.data?.error || err.message || 'Failed to delete');
    } finally {
      setDeletingId(null);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate pagination range
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, safePage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Home className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-foreground">Property Management</h3>
              <p className="text-xs text-muted-foreground font-body">
                {filtered.length} {filtered.length === 1 ? 'listing' : 'listings'}
                {filtered.length !== properties.length && ` (filtered from ${properties.length} total)`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => refetch()}
              disabled={isLoading}
              className="text-xs"
            >
              {isLoading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" />
              ) : null}
              Refresh
            </Button>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by title, location, or community..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="pl-9 h-9 text-sm"
            />
          </div>
          <div className="flex gap-2">
            <div className="w-40">
              <Select
                value={statusFilter}
                onValueChange={(v) => { setStatusFilter(v); setCurrentPage(1); }}
              >
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value} className="text-xs">
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-40">
              <Select
                value={listingStatusFilter}
                onValueChange={(v) => { setListingStatusFilter(v); setCurrentPage(1); }}
              >
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue placeholder="Listing Type" />
                </SelectTrigger>
                <SelectContent>
                  {LISTING_STATUS_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value} className="text-xs">
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-36">
              <Select
                value={pocketFilter}
                onValueChange={(v) => { setPocketFilter(v); setCurrentPage(1); }}
              >
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue placeholder="Pocket" />
                </SelectTrigger>
                <SelectContent>
                  {POCKET_FILTER_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value} className="text-xs">
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Error Banner */}
      {deleteError && (
        <div className="mx-6 mt-4 flex items-start gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span className="font-body">{deleteError}</span>
          <button onClick={() => setDeleteError(null)} className="ml-auto text-red-400 hover:text-red-600">&times;</button>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="p-12 text-center">
          <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-3" />
          <p className="text-sm font-heading font-medium text-foreground mb-1">Failed to load properties</p>
          <p className="text-xs text-muted-foreground font-body mb-4">{error?.message || 'Unknown error'}</p>
          <Button size="sm" variant="outline" onClick={() => refetch()}>Retry</Button>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="p-12 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-3" />
          <p className="text-sm text-muted-foreground font-body">Loading properties...</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && filtered.length === 0 && (
        <div className="p-12 text-center">
          <Home className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
          <p className="text-sm font-heading font-medium text-foreground mb-1">
            {properties.length === 0 ? 'No listings yet' : 'No listings match your filters'}
          </p>
          <p className="text-xs text-muted-foreground font-body mb-4">
            {properties.length === 0
              ? 'Import a listing from the panel above to get started.'
              : 'Try adjusting your search or filters.'}
          </p>
          {properties.length > 0 && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => { setSearch(''); setStatusFilter('all'); setListingStatusFilter('all'); }}
            >
              Clear Filters
            </Button>
          )}
        </div>
      )}

      {/* Data Table */}
      {!isLoading && !error && filtered.length > 0 && (
        <>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead className="min-w-[200px]">Title</TableHead>
                  <TableHead className="w-28">Price</TableHead>
                  <TableHead className="min-w-[140px]">Location</TableHead>
                  <TableHead className="w-24">Status</TableHead>
                  <TableHead className="w-24">Type</TableHead>
                  <TableHead className="w-20">Featured</TableHead>
                  <TableHead className="w-28">Created</TableHead>
                  <TableHead className="w-28 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.map((property) => (
                  <TableRow key={property.id} className="group">
                    {/* Thumbnail */}
                    <TableCell>
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                        {property.image_url || (property.gallery_images && property.gallery_images[0]) ? (
                          <img
                            src={property.image_url || property.gallery_images[0]}
                            alt=""
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <ImageOff className="w-4 h-4 text-muted-foreground/50" />
                        )}
                      </div>
                    </TableCell>

                    {/* Title */}
                    <TableCell>
                      <p className="text-sm font-heading font-medium text-foreground line-clamp-1">
                        {property.title}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        {property.bedrooms != null && (
                          <span className="text-xs text-muted-foreground">
                            {property.bedrooms} bed
                          </span>
                        )}
                        {property.bathrooms != null && (
                          <>
                            <span className="text-xs text-muted-foreground">·</span>
                            <span className="text-xs text-muted-foreground">
                              {property.bathrooms} bath
                            </span>
                          </>
                        )}
                        {property.area_sqft && (
                          <>
                            <span className="text-xs text-muted-foreground">·</span>
                            <span className="text-xs text-muted-foreground">
                              {property.area_sqft.toLocaleString()} sqft
                            </span>
                          </>
                        )}
                      </div>
                    </TableCell>

                    {/* Price */}
                    <TableCell>
                      <span className="text-sm font-heading font-semibold text-foreground">
                        AED {(property.price_aed || 0).toLocaleString()}
                      </span>
                    </TableCell>

                    {/* Location */}
                    <TableCell>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {property.location}
                      </p>
                      {property.community && (
                        <p className="text-xs text-muted-foreground/60 line-clamp-1">
                          {property.community}
                        </p>
                      )}
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <PropertyStatusBadge status={property.status} />
                    </TableCell>

                    {/* Listing Type */}
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <ListingStatusBadge status={property.listing_status} />
                        {property.isPocketListing && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200">
                            Pocket
                          </span>
                        )}
                      </div>
                    </TableCell>

                    {/* Featured */}
                    <TableCell>
                      {property.featured ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-100 text-sky-700 border border-sky-200">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                          Featured
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground/50">—</span>
                      )}
                    </TableCell>

                    {/* Created Date */}
                    <TableCell>
                      <span className="text-xs text-muted-foreground">
                        {property.created_date
                          ? moment(property.created_date).format('MMM D, YYYY')
                          : '—'}
                      </span>
                    </TableCell>

                    {/* Actions */}
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-primary hover:text-primary hover:bg-primary/10"
                          onClick={() => setEditingProperty(property)}
                          title="Edit property"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => handleDelete(property.id)}
                          disabled={deletingId === property.id}
                          title="Delete property"
                        >
                          {deletingId === property.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-border/50 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                Showing {(safePage - 1) * ITEMS_PER_PAGE + 1}–
                {Math.min(safePage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length}
              </p>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => safePage > 1 && handlePageChange(safePage - 1)}
                      className={safePage <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                  {getPageNumbers().map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => handlePageChange(page)}
                        isActive={page === safePage}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => safePage < totalPages && handlePageChange(safePage + 1)}
                      className={safePage >= totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      )}

      {/* Property Editor Modal */}
      {editingProperty && (
        <PropertyEditor
          property={editingProperty}
          onClose={() => setEditingProperty(null)}
          onSaved={() => {
            queryClient.invalidateQueries({ queryKey: ['admin-all-properties'] });
            setEditingProperty(null);
          }}
        />
      )}
    </div>
  );
}
