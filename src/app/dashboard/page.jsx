'use client';

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stats Cards */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Total Members</h3>
          <p className="text-2xl font-bold mt-2">1,234</p>
          <p className="text-green-500 text-sm mt-1">+12% from last month</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Active Members</h3>
          <p className="text-2xl font-bold mt-2">856</p>
          <p className="text-green-500 text-sm mt-1">+8% from last month</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Monthly Revenue</h3>
          <p className="text-2xl font-bold mt-2">$24,560</p>
          <p className="text-green-500 text-sm mt-1">+15% from last month</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Classes Today</h3>
          <p className="text-2xl font-bold mt-2">8</p>
          <p className="text-gray-500 text-sm mt-1">Next class in 2 hours</p>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-medium">JD</span>
                </div>
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-gray-500">Checked in for Yoga Class</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
