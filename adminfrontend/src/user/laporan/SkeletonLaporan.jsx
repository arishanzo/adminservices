const SkeletonLaporan = () => {
  return (
    <div className="p-6 py-16 md:py-8 bg-gray-50 min-h-screen space-y-8 animate-pulse">

      {/* Header */}
      <header>
        <div className="h-8 w-64 bg-gray-300 rounded mb-3"></div>
        <div className="h-4 w-96 bg-gray-200 rounded"></div>
      </header>

      {/* Filter & Export */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        
        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2">
          {[1,2,3,4].map((i) => (
            <div key={i} className="h-10 w-28 bg-gray-300 rounded-xl"></div>
          ))}
        </div>

        {/* Export buttons */}
        <div className="flex gap-2">
          <div className="h-10 w-24 bg-gray-300 rounded-xl"></div>
          <div className="h-10 w-24 bg-gray-300 rounded-xl"></div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1,2,3].map((i) => (
          <div key={i} className="p-5 bg-white rounded-2xl shadow-sm border flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-300 rounded-xl"></div>
            <div className="space-y-2">
              <div className="h-3 w-32 bg-gray-300 rounded"></div>
              <div className="h-5 w-40 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Grafik Placeholder */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border">
        <div className="h-5 w-60 bg-gray-300 rounded mb-6"></div>
        <div className="h-72 w-full bg-gray-200 rounded"></div>
      </div>

    </div>
  );
};

export default SkeletonLaporan;   