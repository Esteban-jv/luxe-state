import { supabase } from "./supabase";

export interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  price_suffix: string | null;
  beds: number;
  baths: number;
  area: string;
  image: string;
  tag: string | null;
  badge: string | null;
  is_featured: boolean;
  created_at: string;
}

export interface PaginatedProperties {
  data: Property[];
  count: number;
  totalPages: number;
  currentPage: number;
}

/** Returns up to 2 featured properties for the hero section */
export async function getFeaturedProperties(): Promise<Property[]> {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("is_featured", true)
    .order("created_at", { ascending: true })
    .limit(2);

  if (error) {
    console.error("Error fetching featured properties:", error.message);
    return [];
  }

  return data ?? [];
}

const PAGE_SIZE = 8;

/** Returns paginated non-featured properties */
export async function getProperties(
  page: number = 1
): Promise<PaginatedProperties> {
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, error, count } = await supabase
    .from("properties")
    .select("*", { count: "exact" })
    .eq("is_featured", false)
    .order("created_at", { ascending: true })
    .range(from, to);

  if (error) {
    console.error("Error fetching properties:", error.message);
    return { data: [], count: 0, totalPages: 0, currentPage: page };
  }

  const total = count ?? 0;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  return {
    data: data ?? [],
    count: total,
    totalPages,
    currentPage: page,
  };
}
