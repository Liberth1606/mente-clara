import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type SiteSettings = {
  id: string;
  company_name: string;
  tagline: string | null;
  logo_url: string | null;
  favicon_url: string | null;
  primary_color: string;
  accent_color: string;
  background_color: string;
  foreground_color: string;
  phone: string | null;
  whatsapp: string | null;
  whatsapp_message: string | null;
  email: string | null;
  address: string | null;
  business_hours: string | null;
  cta_label: string | null;
  seo_title: string | null;
  seo_description: string | null;
  hero_title: string | null;
  hero_description: string | null;
  hero_image_url: string | null;
};

export function useSiteSettings() {
  return useQuery({
    queryKey: ["site_settings"],
    staleTime: 60_000,
    queryFn: async (): Promise<SiteSettings | null> => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data as SiteSettings | null;
    },
  });
}

function listHook<T>(table: string, orderCol = "sort_order") {
  return () =>
    useQuery({
      queryKey: [table],
      staleTime: 60_000,
      queryFn: async (): Promise<T[]> => {
        const { data, error } = await supabase
          .from(table as never)
          .select("*")
          .order(orderCol as never, { ascending: true });
        if (error) throw error;
        return (data ?? []) as T[];
      },
    });
}

export type Service = { id: string; title: string; description: string | null; price: string | null; highlight: boolean; cta_label: string | null; sort_order: number; active: boolean };
export type Testimonial = { id: string; name: string; role: string | null; quote: string; photo_url: string | null; sort_order: number; active: boolean };
export type TeamMember = { id: string; name: string; credential: string | null; specialty: string | null; approach: string | null; bio: string | null; photo_url: string | null; sort_order: number; active: boolean };
export type Banner = { id: string; title: string | null; subtitle: string | null; image_url: string | null; link_url: string | null; link_label: string | null; sort_order: number; active: boolean };
export type Faq = { id: string; question: string; answer: string; sort_order: number; active: boolean };
export type SocialLink = { id: string; platform: string; url: string; icon: string | null; sort_order: number; active: boolean };
export type BlogPost = { id: string; slug: string; title: string; excerpt: string | null; cover_url: string | null; content: string | null; published: boolean; published_at: string | null };

export const useServices = listHook<Service>("services");
export const useTestimonials = listHook<Testimonial>("testimonials");
export const useTeam = listHook<TeamMember>("team_members");
export const useBanners = listHook<Banner>("banners");
export const useFaqs = listHook<Faq>("faqs");
export const useSocial = listHook<SocialLink>("social_links");

export function useBlogPosts() {
  return useQuery({
    queryKey: ["blog_posts"],
    staleTime: 60_000,
    queryFn: async (): Promise<BlogPost[]> => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("published_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as BlogPost[];
    },
  });
}

/** Generic mutations used by the admin panel. */
export function useUpsert(table: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (row: Record<string, unknown>) => {
      const { error } = await supabase.from(table as never).upsert(row as never);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: [table] }),
  });
}

export function useDelete(table: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from(table as never).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: [table] }),
  });
}

export function useUpdateSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (patch: Partial<SiteSettings> & { id: string }) => {
      const { error } = await supabase
        .from("site_settings")
        .update(patch)
        .eq("id", patch.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["site_settings"] }),
  });
}
