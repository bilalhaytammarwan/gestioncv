import React from 'react';
import { TrendingUp, TrendingDown, Users, Eye, MousePointer, BarChart2 } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: { value: number; positive: boolean };
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold mt-1 text-gray-900">{value}</p>
          
          {change && (
            <div className="flex items-center mt-1">
              {change.positive ? (
                <TrendingUp size={16} className="text-green-500 mr-1" />
              ) : (
                <TrendingDown size={16} className="text-red-500 mr-1" />
              )}
              <span className={change.positive ? 'text-green-600' : 'text-red-600'}>
                {change.value}%
              </span>
              <span className="text-gray-500 text-sm ml-1">vs last period</span>
            </div>
          )}
        </div>
        <div className="p-3 bg-blue-50 rounded-lg">
          {icon}
        </div>
      </div>
    </div>
  );
};

const DashboardStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Applications"
        value="245"
        change={{ value: 12, positive: true }}
        icon={<Users size={24} className="text-blue-600" />}
      />
      <StatCard
        title="Job Listings"
        value="8"
        change={{ value: 8, positive: true }}
        icon={<BarChart2 size={24} className="text-blue-600" />}
      />
      <StatCard
        title="Profile Views"
        value="1,542"
        change={{ value: 5, positive: true }}
        icon={<Eye size={24} className="text-blue-600" />}
      />
      <StatCard
        title="Click Rate"
        value="3.2%"
        change={{ value: 1, positive: false }}
        icon={<MousePointer size={24} className="text-blue-600" />}
      />
    </div>
  );
};

export default DashboardStats;