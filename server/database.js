const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial products mock data to seed the database
const initialProducts = [
  {
    id: "1",
    name: "Handcrafted Ceramic Bowl",
    price: 45.0,
    image: "https://images.unsplash.com/photo-1582140099533-11fe4d348e01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMHBvdHRlcnklMjBhcnRpc2FufGVufDF8fHx8MTc2OTk0MDA2MHww&ixlib=rb-4.1.0&q=80&w=1080",
    artisan: {
      name: "Sarah Mitchell",
      avatar: "https://i.pravatar.cc/150?img=1",
      id: "artisan-1",
    },
    description: "A beautiful handcrafted ceramic bowl, perfect for serving salads or as a decorative piece. Each piece is unique and made with love.",
    materials: ["Ceramic", "Glazed", "Hand-thrown"],
    category: "Pottery",
    rating: 4.8,
    reviews: 24,
    inStock: 3,
    customizable: false,
    images: [
      "https://images.unsplash.com/photo-1582140099533-11fe4d348e01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMHBvdHRlcnklMjBhcnRpc2FufGVufDF8fHx8MTc2OTk0MDA2MHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1633738674687-9505aa528801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwaGFuZG1hZGUlMjBtdWd8ZW58MXx8fHwxNzY5OTQwMDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    location: "Portland, OR",
  },
  {
    id: "2",
    name: "Leather Journal",
    price: 68.0,
    image: "https://images.unsplash.com/photo-1689844495806-321b5adaf5d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kY3JhZnRlZCUyMGxlYXRoZXIlMjBnb29kc3xlbnwxfHx8fDE3Njk5MzMwNzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    artisan: {
      name: "James Cooper",
      avatar: "https://i.pravatar.cc/150?img=12",
      id: "artisan-2",
    },
    description: "Handcrafted leather journal with recycled paper. Perfect for journaling, sketching, or note-taking. Can be personalized with initials.",
    materials: ["Full-grain leather", "Recycled paper", "Hand-stitched"],
    category: "Leather Goods",
    rating: 4.9,
    reviews: 42,
    inStock: 8,
    customizable: true,
    images: [
      "https://images.unsplash.com/photo-1689844495806-321b5adaf5d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kY3JhZnRlZCUyMGxlYXRoZXIlMjBnb29kc3xlbnwxfHx8fDE3Njk5MzMwNzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    location: "Austin, TX",
  },
  {
    id: "3",
    name: "Woven Wall Hanging",
    price: 125.0,
    image: "https://images.unsplash.com/photo-1755991699037-73eb5dff62f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwd2VhdmluZyUyMHRleHRpbGVzfGVufDF8fHx8MTc2OTk0MDA2MXww&ixlib=rb-4.1.0&q=80&w=1080",
    artisan: {
      name: "Emma Rodriguez",
      avatar: "https://i.pravatar.cc/150?img=5",
      id: "artisan-3",
    },
    description: "Beautiful macramé wall hanging, hand-woven with natural cotton rope. Adds warmth and texture to any space.",
    materials: ["100% Cotton", "Natural dye", "Hand-woven"],
    category: "Textiles",
    rating: 5.0,
    reviews: 18,
    inStock: 2,
    customizable: true,
    images: [
      "https://images.unsplash.com/photo-1755991699037-73eb5dff62f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwd2VhdmluZyUyMHRleHRpbGVzfGVufDF8fHx8MTc2OTk0MDA2MXww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    location: "Santa Fe, NM",
  },
  {
    id: "4",
    name: "Artisan Necklace",
    price: 89.0,
    image: "https://images.unsplash.com/photo-1633459653247-c09d20fb22e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGpld2VscnklMjBjcmFmdHN8ZW58MXx8fHwxNzY5OTQwMDYxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    artisan: {
      name: "Olivia Chen",
      avatar: "https://i.pravatar.cc/150?img=9",
      id: "artisan-4",
    },
    description: "Elegant handmade necklace featuring semi-precious stones and sterling silver. Each piece is one-of-a-kind.",
    materials: ["Sterling silver", "Semi-precious stones", "Handcrafted"],
    category: "Jewelry",
    rating: 4.7,
    reviews: 31,
    inStock: 5,
    customizable: false,
    images: [
      "https://images.unsplash.com/photo-1633459653247-c09d20fb22e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGpld2VscnklMjBjcmFmdHN8ZW58MXx8fHwxNzY5OTQwMDYxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    location: "San Francisco, CA",
  },
  {
    id: "5",
    name: "Wooden Serving Board",
    price: 52.0,
    image: "https://images.unsplash.com/photo-1648650983937-cbac420329b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kY3JhZnRlZCUyMHdvb2RlbiUyMGJvd2x8ZW58MXx8fHwxNzY5OTI2MDY5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    artisan: {
      name: "Michael Wood",
      avatar: "https://i.pravatar.cc/150?img=13",
      id: "artisan-5",
    },
    description: "Hand-carved wooden serving board made from sustainable walnut. Perfect for charcuterie and entertaining.",
    materials: ["Walnut wood", "Food-safe finish", "Hand-carved"],
    category: "Woodwork",
    rating: 4.9,
    reviews: 27,
    inStock: 6,
    customizable: true,
    images: [
      "https://images.unsplash.com/photo-1648650983937-cbac420329b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kY3JhZnRlZCUyMHdvb2RlbiUyMGJvd2x8ZW58MXx8fHwxNzY5OTI2MDY5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    location: "Asheville, NC",
  },
  {
    id: "6",
    name: "Woven Basket Set",
    price: 78.0,
    image: "https://images.unsplash.com/photo-1768734836548-5be5fd6ef617?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3ZlbiUyMGJhc2tldCUyMGhhbmRtYWRlfGVufDF8fHx8MTc2OTk0MDA2M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    artisan: {
      name: "Aisha Osman",
      avatar: "https://i.pravatar.cc/150?img=16",
      id: "artisan-6",
    },
    description: "Set of 3 handwoven baskets made from natural materials. Perfect for storage and organization with a beautiful rustic look.",
    materials: ["Natural grass", "Hand-woven", "Eco-friendly"],
    category: "Baskets",
    rating: 4.8,
    reviews: 19,
    inStock: 4,
    customizable: false,
    images: [
      "https://images.unsplash.com/photo-1768734836548-5be5fd6ef617?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3ZlbiUyMGJhc2tldCUyMGhhbmRtYWRlfGVufDF8fHx8MTc2OTk0MDA2M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    location: "Seattle, WA",
  },
  {
    id: "7",
    name: "Soy Candle Collection",
    price: 42.0,
    image: "https://images.unsplash.com/photo-1764587492706-cea197b4376d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGNhbmRsZXMlMjBuYXR1cmFsfGVufDF8fHx8MTc2OTk0MDA2M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    artisan: {
      name: "Lily Nguyen",
      avatar: "https://i.pravatar.cc/150?img=20",
      id: "artisan-7",
    },
    description: "Hand-poured soy candles with natural essential oils. Set of 3 calming scents in reusable ceramic vessels.",
    materials: ["Soy wax", "Essential oils", "Cotton wick"],
    category: "Candles",
    rating: 5.0,
    reviews: 45,
    inStock: 12,
    customizable: true,
    images: [
      "https://images.unsplash.com/photo-1764587492706-cea197b4376d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGNhbmRsZXMlMjBuYXR1cmFsfGVufDF8fHx8MTc2OTk0MDA2M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    location: "Boulder, CO",
  },
  {
    id: "8",
    name: "Ceramic Coffee Mug",
    price: 28.0,
    image: "https://images.unsplash.com/photo-1633738674687-9505aa528801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwaGFuZG1hZGUlMjBtdWd8ZW58MXx8fHwxNzY5OTQwMDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    artisan: {
      name: "Sarah Mitchell",
      avatar: "https://i.pravatar.cc/150?img=1",
      id: "artisan-1",
    },
    description: "Handcrafted ceramic mug with unique glaze patterns. Perfect for your morning coffee or tea ritual.",
    materials: ["Stoneware", "Lead-free glaze", "Microwave safe"],
    category: "Pottery",
    rating: 4.7,
    reviews: 36,
    inStock: 7,
    customizable: true,
    images: [
      "https://images.unsplash.com/photo-1633738674687-9505aa528801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwaGFuZG1hZGUlMjBtdWd8ZW58MXx8fHwxNzY5OTQwMDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    location: "Portland, OR",
  }
];

class Collection {
  constructor(name) {
    this.name = name;
    this.filePath = path.join(DATA_DIR, `${name}.json`);
    this.init();
  }

  init() {
    if (!fs.existsSync(this.filePath)) {
      const defaultData = this.name === 'products' ? initialProducts : [];
      fs.writeFileSync(this.filePath, JSON.stringify(defaultData, null, 2), 'utf8');
    }
  }

  read() {
    try {
      const content = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(content);
    } catch (err) {
      console.error(`Error reading database file ${this.filePath}:`, err);
      return [];
    }
  }

  write(data) {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf8');
      return true;
    } catch (err) {
      console.error(`Error writing database file ${this.filePath}:`, err);
      return false;
    }
  }

  find(query = {}) {
    const data = this.read();
    return data.filter(item => {
      for (const key in query) {
        if (item[key] !== query[key]) {
          return false;
        }
      }
      return true;
    });
  }

  findOne(query = {}) {
    const data = this.read();
    return data.find(item => {
      for (const key in query) {
        if (item[key] !== query[key]) {
          return false;
        }
      }
      return true;
    }) || null;
  }

  insertOne(document) {
    const data = this.read();
    const newDoc = {
      id: document.id || Math.random().toString(36).substring(2, 11),
      ...document,
      createdAt: new Date().toISOString()
    };
    data.push(newDoc);
    this.write(data);
    return newDoc;
  }

  updateOne(query, updates) {
    const data = this.read();
    const index = data.findIndex(item => {
      for (const key in query) {
        if (item[key] !== query[key]) {
          return false;
        }
      }
      return true;
    });

    if (index !== -1) {
      data[index] = { ...data[index], ...updates, updatedAt: new Date().toISOString() };
      this.write(data);
      return data[index];
    }
    return null;
  }

  deleteOne(query) {
    const data = this.read();
    const index = data.findIndex(item => {
      for (const key in query) {
        if (item[key] !== query[key]) {
          return false;
        }
      }
      return true;
    });

    if (index !== -1) {
      const deletedItem = data.splice(index, 1)[0];
      this.write(data);
      return deletedItem;
    }
    return null;
  }
}

const db = {
  products: new Collection('products'),
  users: new Collection('users'),
  carts: new Collection('carts')
};

module.exports = db;
