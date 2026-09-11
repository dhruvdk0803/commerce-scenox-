export type ServiceExample = {
  id: string;
  title: string;
  desc: string;
  before: string[];
  after: string[];
  beforeLabel?: string;
  afterLabel?: string;
  wide?: boolean;
};

export const services: ServiceExample[] = [
  {
    id: "cleanup",
    title: "Data Cleanup",
    desc: "Inconsistent values become one canonical value.",
    before: ["blu", "Blue", "BLUE", "navy blue"],
    after: ["Blue"],
  },
  {
    id: "titles",
    title: "Product Titles",
    desc: "Abbreviations expand into readable, searchable titles.",
    before: ["blk office chr ergo"],
    after: ["Black Ergonomic Office Chair"],
  },
  {
    id: "descriptions",
    title: "Descriptions",
    desc: "Missing copy prepared from specifications and context.",
    before: ["NULL"],
    after: [
      "Adjustable lumbar support, breathable mesh back and a 120 kg rated base.",
    ],
  },
  {
    id: "categories",
    title: "Categories & Collections",
    desc: "Loose labels become a real taxonomy.",
    before: ["home", "homeware", "home products"],
    after: ["Home", "→ Kitchen", "→ Storage"],
  },
  {
    id: "variants",
    title: "Variants",
    desc: "Duplicate rows consolidate into option structures.",
    before: ["AX-442-BLK", "AX-442-BLU", "AX-442-WHT"],
    after: ["Color: Black · Blue · White", "Size: S · M · L"],
    beforeLabel: "3 separate products",
    afterLabel: "1 product · 9 variants",
  },
  {
    id: "images",
    title: "Images",
    desc: "Files matched to SKUs, renamed and resized.",
    before: ["IMG_99283.jpg", "DSC0041 (2).JPG"],
    after: ["ax-442-black-01.jpg", "ax-442-black-02.jpg"],
  },
  {
    id: "seo",
    title: "SEO",
    desc: "Handles, titles and meta descriptions written per product.",
    before: ["/products/ax442-blk-chr-1"],
    after: ["/products/black-ergonomic-office-chair"],
  },
  {
    id: "metafields",
    title: "Tags & Metafields",
    desc: "Specifications structured into typed fields.",
    before: ["spec: 120kg, mesh, 5yr"],
    after: ["weight_capacity: 120 kg", "material: Mesh", "warranty: 5 years"],
  },
  {
    id: "upload",
    title: "Upload",
    desc: "Formatted for the target platform and published in batches.",
    before: ["4 files · 3 formats"],
    after: ["1,000 / 1,000 published"],
  },
  {
    id: "qa",
    title: "Quality Checks",
    desc: "Every product validated before and after publish.",
    before: ["46 missing · 19 duplicates"],
    after: ["0 missing · 0 duplicates"],
  },
];
