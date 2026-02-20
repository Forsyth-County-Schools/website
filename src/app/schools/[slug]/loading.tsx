import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function SchoolLoading() {
  return (
    <main className="min-h-screen pt-20 bg-[#050505]">
      {/* Hero Skeleton */}
      <section className="relative py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Skeleton className="h-6 w-24 bg-[#FCD34D]/10" />
              <Skeleton className="h-16 w-full bg-[#FCD34D]/10" />
              <Skeleton className="h-4 w-3/4 bg-[#FCD34D]/10" />
              <Skeleton className="h-4 w-1/2 bg-[#FCD34D]/10" />
              <div className="flex gap-4">
                <Skeleton className="h-10 w-32 bg-[#FCD34D]/10" />
                <Skeleton className="h-10 w-32 bg-[#FCD34D]/10" />
              </div>
            </div>
            <Card className="bg-[#0A0A0A] border-[#FCD34D]/10">
              <CardContent className="p-8">
                <div className="grid grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="text-center space-y-2">
                      <Skeleton className="h-8 w-16 mx-auto bg-[#FCD34D]/10" />
                      <Skeleton className="h-4 w-20 mx-auto bg-[#FCD34D]/10" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tabs Skeleton */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Skeleton className="h-12 w-96 bg-[#FCD34D]/10 mb-8" />
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-[#0A0A0A] border-[#FCD34D]/10">
              <CardContent className="p-8 space-y-4">
                <Skeleton className="h-6 w-1/3 bg-[#FCD34D]/10" />
                <Skeleton className="h-4 w-full bg-[#FCD34D]/10" />
                <Skeleton className="h-4 w-3/4 bg-[#FCD34D]/10" />
              </CardContent>
            </Card>
            <Card className="bg-[#0A0A0A] border-[#FCD34D]/10">
              <CardContent className="p-8 space-y-4">
                <Skeleton className="h-6 w-1/3 bg-[#FCD34D]/10" />
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-6 w-24 bg-[#FCD34D]/10" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
