'use client'
import { useRouter } from 'next/router';
import  { useState } from 'react'

export default function Dashboard() {
const router = useRouter();
const [isLoading, setIsLoading] = useState(true);
if (isLoading) return <FeaturedDashboardSkeleton />;

function FeaturedDashboardSkeleton() {
return (
<div className="container mx-auto p-6">
<div className="w-full h-96 bg-gray-200 animate-pulse rounded-lg mb-8"></div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
{[...Array(6)].map((_, i) => (
<div key={i} className="h-64 bg-gray-200 animate-pulse rounded-lg"></div>
))}
</div>
</div>
);
}

return (
<div>Dashboard</div>
)
}
