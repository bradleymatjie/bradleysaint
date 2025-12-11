'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash, Image as ImageIcon, LogIn, LogOut, X } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

interface Product {
  id: string;
  slug: string;
  name: string;
  price: string;
  category?: string;
  soldout: boolean;
  imageurl?: string;
  description?: string;
  availablesizes?: string[];
  availablematerials?: string[];
  created_at?: string;
  updated_at?: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [adminProfile, setAdminProfile] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    soldout: false,
    description: "",
    sizes: "",
    materials: "",
    image: null as File | null,
  });

  // Auth: Check user and admin status
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      if (session?.user) {
        const { data: adminData } = await supabase
          .from("admins")
          .select("id, full_name")
          .eq("id", session.user.id)
          .single();
        
        if (adminData) {
          setIsAdmin(true);
          setAdminProfile(adminData);
        } else {
          setIsAdmin(false);
          setAdminProfile(null);
        }
      } else {
        setIsAdmin(false);
        setAdminProfile(null);
      }
      setAuthLoading(false);
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      checkAuth();
    });

    return () => subscription.unsubscribe();
  }, []);

  // Login
  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginForm.email,
      password: loginForm.password,
    });
    if (error) alert("Login failed: " + error.message);
    else setLoginForm({ email: "", password: "" });
  };

  // Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
    setUser(null);
  };

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("thevillageproducts").select("*");
    if (error) console.error(error);
    else setProducts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) fetchProducts();
  }, [isAdmin]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked, files } = target;
    if (name === "image" && files && files[0]) {
      setForm({ ...form, image: files[0] });
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      const previewUrl = URL.createObjectURL(files[0]);
      setImagePreview(previewUrl);
    } else if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Cleanup image preview
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  // Generate slug
  const generateSlug = (name: string) =>
    name.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  // Upload image
  const uploadImage = async (file: File, productId: string) => {
    const filePath = `products/${productId}-${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from("thevillageProductsBucket")
      .upload(filePath, file, { upsert: true });

    if (error) throw error;

    const { data: urlData } = supabase.storage
      .from("thevillageProductsBucket")
      .getPublicUrl(data.path);

    return urlData.publicUrl;
  };

  // Submit product
  const handleSubmit = async () => {
    if (!form.name || !form.price) return alert("Name and price required");

    setLoading(true);

    try {
      const productId = editingProduct?.id || crypto.randomUUID();
      let imageUrl = editingProduct?.imageurl || "";

      if (form.image) {
        imageUrl = await uploadImage(form.image, productId);
      }

      const sizesArray = form.sizes ? form.sizes.split(',').map(s => s.trim()).filter(Boolean) : [];
      const materialsArray = form.materials ? form.materials.split(',').map(m => m.trim()).filter(Boolean) : [];

      const payload = {
        id: productId,
        slug: generateSlug(form.name),
        name: form.name,
        price: form.price,
        category: form.category || null,
        soldout: form.soldout,
        description: form.description || null,
        imageurl: imageUrl || null,
        availablesizes: sizesArray.length ? sizesArray : null,
        availablematerials: materialsArray.length ? materialsArray : null,
      };

      if (editingProduct) {
        const { error: updateError } = await supabase
          .from("thevillageproducts")
          .update(payload)
          .eq("id", productId);
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from("thevillageproducts")
          .insert([payload]);
        if (insertError) throw insertError;
      }

      setForm({
        name: "",
        price: "",
        category: "",
        soldout: false,
        description: "",
        sizes: "",
        materials: "",
        image: null,
      });
      setImagePreview(null);
      setEditingProduct(null);
      setDrawerOpen(false);
      await fetchProducts();
    } catch (error) {
      console.error("Error submitting product:", error);
      alert("Failed to submit product. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    const { error } = await supabase.from("thevillageproducts").delete().eq("id", id);
    if (error) {
      console.error("Delete error:", error);
      alert("Failed to delete product.");
    } else {
      await fetchProducts();
    }
  };

  // Edit product
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      price: product.price,
      category: product.category || "",
      soldout: product.soldout,
      description: product.description || "",
      sizes: product.availablesizes?.join(', ') || "",
      materials: product.availablematerials?.join(', ') || "",
      image: null,
    });
    setImagePreview(null);
    setDrawerOpen(true);
  };

  // Open drawer for new product
  const handleAddNew = () => {
    setEditingProduct(null);
    setForm({
      name: "",
      price: "",
      category: "",
      soldout: false,
      description: "",
      sizes: "",
      materials: "",
      image: null,
    });
    setImagePreview(null);
    setDrawerOpen(true);
  };

  // Close drawer
  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setEditingProduct(null);
    setForm({
      name: "",
      price: "",
      category: "",
      soldout: false,
      description: "",
      sizes: "",
      materials: "",
      image: null,
    });
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
  };

  // Guards
  if (authLoading) return <div className="flex justify-center items-center h-screen bg-black text-white">Loading...</div>;
  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center justify-center">
        <h1 className="text-2xl mb-4 uppercase tracking-widest">ADMIN ACCESS REQUIRED</h1>
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 w-full max-w-md">
          <Input
            type="email"
            placeholder="Email"
            value={loginForm.email}
            onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
            className="mb-4 bg-gray-800 border-gray-600 text-white"
          />
          <Input
            type="password"
            placeholder="Password"
            value={loginForm.password}
            onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
            className="mb-4 bg-gray-800 border-gray-600 text-white"
          />
          <Button onClick={handleLogin} className="w-full bg-white text-black hover:bg-gray-100">
            <LogIn size={18} className="mr-2" /> LOGIN AS ADMIN
          </Button>
        </div>
      </div>
    );
  }
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center justify-center">
        <h1 className="text-2xl mb-4 uppercase tracking-widest">ADMIN ACCESS DENIED</h1>
        <p className="text-gray-400 mb-4">You're logged in as a customer. Contact support to become an admin.</p>
        <Button onClick={handleLogout} variant="outline" className="border-white text-white">
          <LogOut size={18} className="mr-2" /> LOGOUT
        </Button>
      </div>
    );
  }

  // Admin UI
  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wider">
            THE VILLAGE
          </h1>
          <p className="text-sm text-gray-400 mt-1">Product Management</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400 hidden sm:inline">
            {adminProfile?.full_name || user.email}
          </span>
          <Button
            onClick={handleAddNew}
            className="bg-white text-black hover:bg-gray-200"
          >
            <Plus size={18} className="mr-2" /> Add Product
          </Button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
        {loading ? (
          <div className="text-center text-gray-400 py-12">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon size={48} className="mx-auto text-gray-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No products yet</h3>
            <p className="text-gray-400 mb-6">Get started by adding your first product</p>
            <Button onClick={handleAddNew} className="bg-white text-black hover:bg-gray-200">
              <Plus size={18} className="mr-2" /> Add Your First Product
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden hover:border-gray-600 transition-all"
              >
                <div className="relative aspect-square bg-gray-900">
                  {product.imageurl ? (
                    <img
                      src={product.imageurl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon size={48} className="text-gray-700" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleEdit(product)}
                      className="h-8 w-8 p-0"
                    >
                      <Pencil size={14} />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(product.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Trash size={14} />
                    </Button>
                  </div>
                  {product.soldout && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      SOLD OUT
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1 truncate">{product.name}</h3>
                  <p className="text-xl font-bold mb-2">R{product.price}</p>
                  {product.category && (
                    <p className="text-xs text-gray-400 uppercase mb-2">{product.category}</p>
                  )}
                  {product.availablesizes && product.availablesizes.length > 0 && (
                    <p className="text-xs text-gray-500">
                      Sizes: {product.availablesizes.join(', ')}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Drawer */}
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent className="w-full sm:max-w-lg bg-gray-900 border-gray-800 text-white overflow-y-auto p-3">
          <SheetHeader>
            <SheetTitle className="text-white text-xl">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </SheetTitle>
            <SheetDescription className="text-gray-400">
              {editingProduct ? "Update product details below" : "Fill in the product details below"}
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-4">
            {/* Product Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter product name"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label htmlFor="price">Price *</Label>
              <Input
                id="price"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="49.99"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="e.g., T-Shirts, Hoodies"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Product description..."
                rows={3}
                className="bg-gray-800 border-gray-700 text-white resize-none"
              />
            </div>

            {/* Sizes */}
            <div className="space-y-2">
              <Label htmlFor="sizes">Available Sizes</Label>
              <Input
                id="sizes"
                name="sizes"
                value={form.sizes}
                onChange={handleChange}
                placeholder="S, M, L, XL"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            {/* Materials */}
            <div className="space-y-2">
              <Label htmlFor="materials">Materials</Label>
              <Input
                id="materials"
                name="materials"
                value={form.materials}
                onChange={handleChange}
                placeholder="Cotton, Polyester"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label htmlFor="image">Product Image</Label>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="bg-gray-800 border-gray-700 text-white file:bg-gray-700 file:text-white file:border-0 file:mr-4"
              />
              {imagePreview && (
                <div className="mt-3 relative rounded-lg overflow-hidden border border-gray-700">
                  <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover" />
                </div>
              )}
              {editingProduct?.imageurl && !form.image && (
                <div className="mt-3 relative rounded-lg overflow-hidden border border-gray-700">
                  <img src={editingProduct.imageurl} alt="Current" className="w-full h-48 object-cover" />
                  <p className="text-xs text-gray-400 mt-2">Current image - upload new to replace</p>
                </div>
              )}
            </div>

            {/* Sold Out */}
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="soldout"
                checked={form.soldout}
                onCheckedChange={(checked) => setForm({ ...form, soldout: checked as boolean })}
              />
              <Label htmlFor="soldout" className="text-sm font-normal cursor-pointer">
                Mark as sold out
              </Label>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleCloseDrawer}
                variant="outline"
                className="flex-1 border-gray-700"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={loading || !form.name || !form.price}
                className="flex-1 bg-white text-black hover:bg-gray-200"
              >
                {loading ? "Saving..." : editingProduct ? "Update Product" : "Add Product"}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}