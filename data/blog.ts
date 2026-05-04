import { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "How to Choose the Perfect Wig for Your Face Shape",
    slug: "how-to-choose-perfect-wig-face-shape",
    excerpt:
      "Finding the right wig starts with understanding your face shape. We break down exactly which styles flatter each shape.",
    content: `
      <h2>Know Your Face Shape First</h2>
      <p>Before investing in a luxury wig, the most important step is identifying your face shape. The right wig can accentuate your best features and create beautiful balance.</p>
      <h2>Oval Face Shape</h2>
      <p>Lucky you — oval faces are the most versatile. Almost any wig style works beautifully. You can rock a short bob, long waves, or anything in between. Our Silky Straight Lace Front is a crowd favorite for oval faces.</p>
      <h2>Round Face Shape</h2>
      <p>You want to add length and create the illusion of a slimmer face. Go for wigs with volume at the crown and length past the chin. Avoid blunt bobs that hit at jaw level. Our Deep Wave Full Lace at 22 inches is perfect.</p>
      <h2>Square Face Shape</h2>
      <p>Soft waves and curls are your best friend. They soften the strong jawline beautifully. Our Body Wave HD Lace wig is an excellent choice for square face shapes.</p>
      <h2>Heart Face Shape</h2>
      <p>You have a wider forehead and a narrow chin. Side-swept styles and chin-length bobs balance your proportions perfectly. Try our Short Bob Lace Front for a stunning look.</p>
      <h2>The Golden Rule</h2>
      <p>At the end of the day, the best wig is the one that makes you feel confident and beautiful. Use these tips as a starting guide, but always trust your instincts.</p>
    `,
    coverImage:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200",
    category: "Style Guide",
    tags: ["style guide", "face shape", "beginners"],
    publishedAt: "2024-11-15",
    readTime: 5,
  },
  {
    id: "2",
    title: "The Complete Guide to Caring for Your Human Hair Wig",
    slug: "complete-guide-caring-human-hair-wig",
    excerpt:
      "A quality human hair wig is an investment. Here is everything you need to know to keep it looking flawless for years.",
    content: `
      <h2>Why Proper Care Matters</h2>
      <p>A premium human hair wig can last two to five years with proper care. Neglect it and you could be shopping for a replacement in just a few months. Think of it like caring for your natural hair — consistency is everything.</p>
      <h2>How Often Should You Wash It?</h2>
      <p>Wash your wig every 7 to 14 days depending on how often you wear it. Over-washing strips the hair of its natural oils and leads to dryness and breakage.</p>
      <h2>The Right Way to Wash</h2>
      <p>Always detangle gently before washing. Use a sulfate-free shampoo and lukewarm water. Never scrub — instead, smooth the shampoo through the hair in a downward motion. Rinse thoroughly and follow with a moisturizing conditioner.</p>
      <h2>Drying Your Wig</h2>
      <p>Always let your wig air dry on a wig stand. Avoid wringing or twisting the hair. If you must use a blow dryer, use the lowest heat setting with a diffuser attachment.</p>
      <h2>Storage Tips</h2>
      <p>Store your wig on a wig stand or in a silk bag away from direct sunlight. Never store it loosely in a drawer — this causes tangles and matting that are difficult to reverse.</p>
      <h2>Heat Styling</h2>
      <p>Human hair wigs can handle heat tools, but always use a heat protectant spray first. Keep your flat iron or curling wand below 380°F to maintain the hair's integrity.</p>
    `,
    coverImage:
      "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=1200",
    category: "Hair Care",
    tags: ["hair care", "maintenance", "human hair"],
    publishedAt: "2024-11-28",
    readTime: 7,
  },
  {
    id: "3",
    title: "HD Lace vs Regular Lace — What is the Difference?",
    slug: "hd-lace-vs-regular-lace-difference",
    excerpt:
      "Not all lace is created equal. We break down the key differences between HD lace and regular lace so you can make the best choice.",
    content: `
      <h2>What is Lace in a Wig?</h2>
      <p>The lace in a lace wig is a sheer fabric that sits along your hairline. Hair strands are individually hand-tied to this lace, creating the illusion that the hair is growing directly from your scalp.</p>
      <h2>Regular Lace</h2>
      <p>Regular lace has been the industry standard for years. It comes in various color shades — light brown, medium brown, dark brown — to match different skin tones. It is durable and budget-friendly, but it is visible up close and requires more blending work.</p>
      <h2>HD Lace</h2>
      <p>HD lace (High Definition lace) is an ultra-thin, ultra-sheer Swiss lace that virtually disappears on the skin. It blends seamlessly with all skin tones without the need for tinting. The result is the most natural, undetectable hairline possible.</p>
      <h2>Which Should You Choose?</h2>
      <p>If you are new to wigs, regular lace is a great starting point — it is more forgiving and easier to work with. If you want the most natural look possible and you are comfortable with wig application, HD lace is absolutely worth the investment.</p>
      <h2>Our HD Lace Pick</h2>
      <p>Our Body Wave HD Lace wig is our most popular HD lace style. Customers consistently say it gives them the most undetectable install they have ever experienced.</p>
    `,
    coverImage:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200",
    category: "Education",
    tags: ["HD lace", "lace front", "education"],
    publishedAt: "2024-12-05",
    readTime: 6,
  },
];

export const blogCategories = ["All", "Style Guide", "Hair Care", "Education"];

export const getPostBySlug = (slug: string) =>
  blogPosts.find((p) => p.slug === slug);

export const getPostsByCategory = (category: string) =>
  category === "All"
    ? blogPosts
    : blogPosts.filter((p) => p.category === category);
