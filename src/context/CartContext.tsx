import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, PRODUCTS } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  discount: number;
  appliedPromo: string | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  shippingFee: number;
  freeShippingThreshold: number;
  freeShippingRemaining: number;
  total: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('lier_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Verify products still exist
        return parsed.map((item: { productId: string; quantity: number }) => {
          const prod = PRODUCTS.find((p) => p.id === item.productId);
          return prod ? { product: prod, quantity: item.quantity } : null;
        }).filter(Boolean);
      }
    } catch (e) {
      console.warn('Failed to parse cart storage', e);
    }
    // Default initial cart: Duo Combo pack for immediate rich demo preview
    return [{ product: PRODUCTS[2], quantity: 1 }];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<string | null>('LIER10');

  useEffect(() => {
    try {
      const serializable = items.map((i) => ({ productId: i.product.id, quantity: i.quantity }));
      localStorage.setItem('lier_cart', JSON.stringify(serializable));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [items]);

  const addItem = (product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedPromo(null);
  };

  const applyPromoCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'LIER10') {
      setAppliedPromo('LIER10');
      return { success: true, message: 'VIP Promo applied: 10% privilege discount!' };
    }
    if (cleanCode === 'FIRSTDRIVE') {
      setAppliedPromo('FIRSTDRIVE');
      return { success: true, message: 'Welcome code applied: 15% inaugural discount!' };
    }
    return { success: false, message: 'Invalid promotional code. Try "LIER10" or "FIRSTDRIVE".' };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const discountRate = appliedPromo === 'FIRSTDRIVE' ? 0.15 : appliedPromo === 'LIER10' ? 0.10 : 0;
  const discount = Math.round(subtotal * discountRate);

  const freeShippingThreshold = 999;
  const freeShippingRemaining = Math.max(0, freeShippingThreshold - subtotal);
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 99;
  const total = Math.max(0, subtotal - discount + shippingFee);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        discount,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        shippingFee,
        freeShippingThreshold,
        freeShippingRemaining,
        total,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
