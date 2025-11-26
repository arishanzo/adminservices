const SkeletonDashboard = () => {
  return (
     <div className="p-6 bg-gray-50 min-h-screen space-y-8 animate-pulse">

      {/* Header */}
      <header>
        <div className="h-7 w-48 bg-gray-300 rounded mb-3"></div>
        <div className="h-4 w-64 bg-gray-200 rounded"></div>
      </header>

      {/* Balance Card */}
      <div className="bg-gray-200 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-4 w-40 bg-gray-300 rounded mb-2"></div>
            <div className="h-8 w-52 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 w-44 bg-gray-200 rounded"></div>
          </div>
          <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[1,2,3,4].map((i) => (
          <div key={i} className="bg-white p-5 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="h-4 w-28 bg-gray-300 rounded"></div>
              <div className="w-7 h-7 bg-gray-300 rounded-full"></div>
            </div>
            <div className="h-7 w-24 bg-gray-300 rounded mb-2"></div>
            <div className="h-3 w-24 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1,2,3,4].map((i) => (
          <div key={i} className="flex flex-col items-center p-5 bg-gray-200 rounded-xl">
            <div className="w-10 h-10 bg-gray-300 rounded mb-3"></div>
            <div className="h-4 w-28 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>


    <div className="bg-white p-6 rounded-xl shadow-md animate-pulse">
        <h2 className="text-xl font-semibold mb-4 h-4 w-40 bg-gray-200 rounded"></h2>
        <table className="w-full text-sm">
        <thead>
        <tr className="border-b text-gray-300">
        <th className="py-2 text-left h-3 w-20 bg-gray-200 rounded"></th>
        <th className="py-2 text-left h-3 w-20 bg-gray-200 rounded"></th>
        <th className="py-2 text-left h-3 w-20 bg-gray-200 rounded"></th>
        </tr>
        </thead>
        <tbody>
        {[1, 2, 3, 4].map((i) => (
        <tr key={i} className="border-b">
        <td className="py-3">
        <div className="h-3 w-32 bg-gray-200 rounded"></div>
        </td>
        <td className="py-3">
        <div className="h-3 w-24 bg-gray-200 rounded"></div>
        </td>
        <td className="py-3">
        <div className="h-3 w-20 bg-gray-200 rounded"></div>
        </td>
        </tr>
        ))}
        </tbody>
        </table>
        </div>
    </div>
  );
};
export default SkeletonDashboard;   