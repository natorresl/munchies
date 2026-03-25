export default function Loading() {
  return (
    <main className="min-h-screen h-screen py-10 pl-6 overflow-y-hidden sm:pl-10 sm:py-10 sm:pl-10 max-w-[1440px] items-center ">
      <div className="mb-6 sm:mb-12 w-[250px] h-[40px] bg-gray-200 rounded animate-pulse" />
      <div className="sm:flex h-full w-full gap-5 ">
        <div className="sm:min-w-36 sm:w-60 sm:w-1/6">
          <div className="h-8 w-24 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="flex flex-col gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-10 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        </div>
        <div className="sm:w-5/6 h-full flex flex-col">
          <div className="flex h-20 min-h-20 w-full gap-2.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="min-w-40 w-40 h-full bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
          <div className="flex w-full gap-4 flex-wrap pt-10">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-[280px] h-[200px] bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
