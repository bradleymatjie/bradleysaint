import { ChevronRight } from "lucide-react";

export default function Collaboration() {
    const collaborationItems = [
        { 
            name: 'CUSTOM TEE', 
            price: 'R427.42', 
            soldOut: false,
            imageUrl: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        { 
            name: 'DESIGNER LONG SLEEVE', 
            price: 'R598.46', 
            soldOut: false,
            imageUrl: 'https://velocityrecords.com/cdn/shop/products/shirt_front_1080x.jpg?v=1621977506'
        },
        { 
            name: 'PREMIUM PRINT TEE', 
            price: 'R512.94', 
            soldOut: false,
            imageUrl: 'https://images.unsplash.com/photo-1613480838954-10d9f4de0128?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        { 
            name: 'CLASSIC HOODIE', 
            price: 'R855.01', 
            soldOut: false,
            imageUrl: 'https://printify.com/wp-content/uploads/2023/03/Choose-the-Right-Printing-Method-Direct-to-Garment.png'
        }
    ];
    
    return (
        <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
                    <h2 className="text-2xl sm:text-3xl font-black">COLLABORATION</h2>
                    <button className="flex items-center gap-2 text-xs sm:text-sm font-bold hover:underline">
                        SEE MORE <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                    {collaborationItems.map((item, index) => (
                        <div key={index} className="group cursor-pointer">
                            <div className="aspect-square bg-gray-100 mb-2 sm:mb-3 overflow-hidden">
                                <img 
                                    src={item.imageUrl} 
                                    alt={item.name}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform"
                                />
                            </div>
                            <div className="flex justify-between items-start gap-2">
                                <div>
                                    <h3 className="font-bold text-xs sm:text-sm">{item.name}</h3>
                                </div>
                                <span className="text-xs sm:text-sm font-bold whitespace-nowrap">{item.price}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}