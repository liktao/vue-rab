import httpInstance from "@/utils/http";

export function getCategoryAPI(id) {
  return httpInstance({
    url: `/category?id=${id}`,
    // params: { id },
  });
}
