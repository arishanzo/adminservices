const SkeletonPenarikan = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-8 animate-pulse">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="h-7 w-64 bg-gray-200 rounded-xl"></div>
        <div className="h-4 w-80 bg-gray-200 rounded-xl"></div>
      </div>

      {/* Statistik Ringkas */}
      <div className="grid grid-cols-3 gap-4">
        {[1,2,3].map((i) => (
          <div key={i} className="bg-white p-5 rounded-2xl shadow-sm flex items-center justify-between">
            <div className="space-y-2 w-full">
              <div className="h-3 w-24 bg-gray-200 rounded"></div>
              <div className="h-6 w-12 bg-gray-200 rounded"></div>
            </div>
            <div className="h-10 w-10 bg-gray-200 rounded-xl"></div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="w-full md:w-1/2">
          <div className="h-10 w-full bg-gray-200 rounded-xl"></div>
        </div>

        <div className="flex gap-3">
          <div className="h-10 w-28 bg-gray-200 rounded-xl"></div>
          <div className="h-10 w-28 bg-gray-200 rounded-xl"></div>
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="bg-white shadow-sm rounded-2xl p-4">
        <div className="h-6 w-40 bg-gray-200 rounded mb-4"></div>

        {/* Header */}
        <div className="grid grid-cols-4 gap-4 mb-3">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>

        {/* Rows */}
        <div className="space-y-3">
          {[1,2,3,4,5].map((i) => (
            <div key={i} className="grid grid-cols-4 gap-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center gap-2">
          {[1,2,3,4].map((i) => (
            <div key={i} className="h-8 w-8 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>

    </div>
  );
};
export default SkeletonPenarikan;   