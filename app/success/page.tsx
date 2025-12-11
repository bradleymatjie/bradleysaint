// app/success/page.tsx
"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Package, Truck, Home, ShoppingBag, Clock, MapPin, Mail, Phone } from "lucide-react";

// Define types for cart items
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageurl: string;
  selectedSize?: string;
  selectedMaterial?: string;
}

interface OrderDetails {
  orderId: string;
  amount: string;
  email: string;
  phone: string;
  customer_name: string;
  shipping_method: string;
  shipping_address: string;
  pickup_location: string;
  cartItems: CartItem[];
  timestamp: Date;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (searchParams) {
      try {
        // Extract and decode all parameters
        const orderId = searchParams.get('orderId') || '';
        const amount = searchParams.get('amount') || '0';
        const email = decodeURIComponent(searchParams.get('email') || '');
        const phone = decodeURIComponent(searchParams.get('phone') || '');
        const customer_name = decodeURIComponent(searchParams.get('customer_name') || '');
        const shipping_method = decodeURIComponent(searchParams.get('shipping_method') || '');
        const shipping_address = decodeURIComponent(searchParams.get('shipping_address') || '');
        const pickup_location = decodeURIComponent(searchParams.get('pickup_location') || '');
        
        // Parse cart items
        const cartItemsParam = searchParams.get('cartItems');
        let cartItems: CartItem[] = [];
        
        if (cartItemsParam) {
          try {
            cartItems = JSON.parse(decodeURIComponent(cartItemsParam));
          } catch (parseError) {
            console.error("Error parsing cart items:", parseError);
            cartItems = [];
          }
        }

        setOrderDetails({
          orderId,
          amount,
          email,
          phone,
          customer_name,
          shipping_method,
          shipping_address,
          pickup_location,
          cartItems,
          timestamp: new Date()
        });
      } catch (error) {
        console.error("Error processing order details:", error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [searchParams]);

  // Calculate subtotal
  const calculateSubtotal = (items: CartItem[]) => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Calculate shipping
  const calculateShipping = (items: CartItem[], method: string) => {
    if (method === 'pickup') return 0;
    const subtotal = calculateSubtotal(items);
    return subtotal < 500 ? 75 : 0;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your order details...</p>
        </div>
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Processing Your Order</h1>
          <p className="text-gray-600 mb-6">
            We're still processing your payment. This may take a few moments.
          </p>
          <div className="space-y-4">
            <Link
              href="/orders"
              className="inline-block px-6 py-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition-colors"
            >
              Check Order Status
            </Link>
            <Link
              href="/"
              className="inline-block px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-50 transition-colors ml-4"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = calculateSubtotal(orderDetails.cartItems);
  const shipping = calculateShipping(orderDetails.cartItems, orderDetails.shipping_method);
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 text-lg">
            Thank you for your purchase, {orderDetails.customer_name.split(' ')[0]}!
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Order #{orderDetails.orderId} • {orderDetails.timestamp.toLocaleDateString()}
          </p>
        </div>

             {/* Order Timeline - Responsive Version */}
<div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
  <h2 className="text-lg font-bold text-gray-900 mb-4">Order Timeline</h2>
  
  {/* Mobile: Stack vertically, Desktop: Row layout */}
  <div className="relative">
    {/* Horizontal line - Hidden on mobile, shown on desktop */}
    <div className="hidden md:block absolute top-4 left-0 right-0 h-0.5 bg-gray-200"></div>
    
    {/* Vertical line - Shown on mobile, hidden on desktop */}
    <div className="md:hidden absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
    
    <div className="flex flex-col md:flex-row md:justify-between space-y-6 md:space-y-0">
      {/* Step 1 */}
      <div className="relative flex items-start md:flex-col md:items-center">
        <div className="flex-shrink-0 z-10 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 md:mr-0 md:mb-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
        </div>
        <div className="md:text-center">
          <span className="block text-sm font-medium text-gray-900">Order Placed</span>
          <span className="block text-xs text-gray-500">Now</span>
        </div>
      </div>
      
      {/* Step 2 */}
      <div className="relative flex items-start md:flex-col md:items-center">
        <div className="flex-shrink-0 z-10 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-4 md:mr-0 md:mb-2">
          <Package className="w-5 h-5 text-gray-400" />
        </div>
        <div className="md:text-center">
          <span className="block text-sm font-medium text-gray-900">Processing</span>
          <span className="block text-xs text-gray-500">Soon</span>
        </div>
      </div>
      
      {/* Step 3 */}
      <div className="relative flex items-start md:flex-col md:items-center">
        <div className="flex-shrink-0 z-10 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-4 md:mr-0 md:mb-2">
          {orderDetails.shipping_method === 'delivery' ? (
            <Truck className="w-5 h-5 text-gray-400" />
          ) : (
            <MapPin className="w-5 h-5 text-gray-400" />
          )}
        </div>
        <div className="md:text-center">
          <span className="block text-sm font-medium text-gray-900">
            {orderDetails.shipping_method === 'delivery' ? 'Shipped' : 'Ready for Pickup'}
          </span>
          <span className="block text-xs text-gray-500">1-2 Days</span>
        </div>
      </div>
      
      {/* Step 4 */}
      <div className="relative flex items-start md:flex-col md:items-center">
        <div className="flex-shrink-0 z-10 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-4 md:mr-0 md:mb-2">
          <CheckCircle className="w-5 h-5 text-gray-400" />
        </div>
        <div className="md:text-center">
          <span className="block text-sm font-medium text-gray-900">Delivered</span>
          <span className="block text-xs text-gray-500">3-5 Days</span>
        </div>
      </div>
    </div>
  </div>
</div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
          {/* Left Column - Order Summary */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Details Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Order Details
                </h2>
              </div>
              <div className="p-6">
                {/* Cart Items */}
                <div className="space-y-4 mb-6">
                  {orderDetails.cartItems.map((item, index) => (
                    <div key={`${item.id}-${index}`} className="flex gap-4 py-4 border-b border-gray-100 last:border-0">
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200">
                        <Image
                          src={item.imageurl || "/noImage.jpg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                        {item.selectedSize && item.selectedMaterial && (
                          <p className="text-sm text-gray-500 mb-2">
                            {item.selectedSize} / {item.selectedMaterial}
                          </p>
                        )}
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-600">
                            Qty: {item.quantity}
                          </div>
                          <div className="font-semibold text-gray-900">
                            R{(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Total */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium text-gray-900">R{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {orderDetails.shipping_method === 'delivery' ? 'Shipping' : 'Pickup'}
                      </span>
                      <span className="font-medium text-gray-900">
                        {shipping === 0 ? "Free" : `R${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                      <span>Total Paid</span>
                      <span>R{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Contact Information
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Name</p>
                    <p className="font-medium text-gray-900">{orderDetails.customer_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <p className="font-medium text-gray-900">{orderDetails.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Phone</p>
                    <p className="font-medium text-gray-900">{orderDetails.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Order Number</p>
                    <p className="font-medium text-gray-900 font-mono">{orderDetails.orderId}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Delivery & Next Steps */}
          <div className="space-y-6">
            {/* Delivery Method Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  {orderDetails.shipping_method === 'delivery' ? (
                    <Truck className="w-5 h-5" />
                  ) : (
                    <MapPin className="w-5 h-5" />
                  )}
                  {orderDetails.shipping_method === 'delivery' ? 'Delivery Details' : 'Pickup Details'}
                </h2>
              </div>
              <div className="p-6">
                {orderDetails.shipping_method === 'delivery' ? (
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Shipping Address</p>
                    <p className="font-medium text-gray-900 whitespace-pre-line">
                      {orderDetails.shipping_address}
                    </p>
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <p className="text-sm text-blue-700">
                        📦 Your order will be shipped within 2-3 business days. 
                        You'll receive a tracking number via email once shipped.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Pickup Location</p>
                    <p className="font-medium text-gray-900 mb-2">{orderDetails.pickup_location}</p>
                    <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-100">
                      <p className="text-sm text-green-700">
                        ✅ Ready for pickup in 1-2 hours. Please bring your order confirmation and ID.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Next Steps Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">What's Next?</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold text-sm">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Order Confirmation Email</p>
                      <p className="text-sm text-gray-600">
                        We've sent a confirmation email to {orderDetails.email}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {orderDetails.shipping_method === 'delivery' ? 'Shipping Update' : 'Pickup Notification'}
                      </p>
                      <p className="text-sm text-gray-600">
                        {orderDetails.shipping_method === 'delivery' 
                          ? 'You\'ll receive tracking information within 48 hours'
                          : 'We\'ll notify you when your order is ready for pickup'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Need Help?</p>
                      <p className="text-sm text-gray-600">
                        Contact us at support@thevillage.co.za with your order number
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link
                href="/products"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                Continue Shopping
              </Link>
              
              <Link
                href="/"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 text-gray-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </Link>
            </div>

            {/* Support Info */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-600 text-center">
                Questions about your order?<br />
                <a href="mailto:support@thevillage.co.za" className="text-blue-600 hover:text-blue-800 font-medium">
                  support@thevillage.co.za
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main success page with Suspense boundary
export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your order confirmation...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}