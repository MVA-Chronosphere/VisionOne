import { Layout } from "../components/Layout";
import { Users, FileText, ClipboardCheck, Calendar, TrendingUp, UserCheck, BookOpen, ChevronRight } from "lucide-react";

const stats = [
  { label: "Total Students", value: "1,245", change: "+12%", icon: Users, color: "blue" },
  { label: "Total Teachers", value: "87", change: "+3", icon: UserCheck, color: "teal" },
  { label: "Pending Forms", value: "156", change: "-8%", icon: FileText, color: "amber" },
  { label: "Active Tests", value: "23", change: "+5", icon: ClipboardCheck, color: "green" },
];

const recentActivity = [
  { user: "Alex Johnson", action: "Submitted Event Participation Form", time: "5 min ago" },
  { user: "Sarah Williams", action: "Created new test: Math Midterm", time: "15 min ago" },
  { user: "Emma Davis", action: "Booked counselor appointment", time: "1 hour ago" },
  { user: "Michael Brown", action: "Submitted Science Quiz", time: "2 hours ago" },
];

const upcomingEvents = [
  { title: "Parent-Teacher Meeting", date: "May 29-21", attendees: "450" },
  { title: "Science Fair", date: "June 5", attendees: "320" },
  { title: "Sports Day", date: "June 12", attendees: "890" },
];

export function AdminDashboard() {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h2>
          <p className="text-gray-500">System overview and management</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const colorClasses = {
              blue: "from-blue-100 to-blue-200 text-blue-500",
              teal: "from-teal-100 to-teal-200 text-teal-500",
              amber: "from-amber-100 to-amber-200 text-amber-500",
              green: "from-green-100 to-green-200 text-green-500",
            };
            return (
              <div
                key={stat.label}
                className={`bg-gradient-to-br ${colorClasses[stat.color as keyof typeof colorClasses].split(' ')[0]} ${colorClasses[stat.color as keyof typeof colorClasses].split(' ')[1]} rounded-3xl p-6`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colorClasses[stat.color as keyof typeof colorClasses].split(' ')[2]}`}>
                  <Icon size={24} />
                </div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.change} this month</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Management Cards */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800">Manage Users</h3>
            
            <button className="w-full bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all text-left border border-gray-100 flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Users size={24} className="text-blue-500" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">Manage Users</h4>
                  <p className="text-sm text-gray-500">View and edit user accounts</p>
                </div>
              </div>
              <ChevronRight size={24} className="text-gray-400 group-hover:text-gray-600" />
            </button>

            <button className="w-full bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all text-left border border-gray-100 flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-teal-100 flex items-center justify-center">
                  <BookOpen size={24} className="text-teal-500" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">Manage Students</h4>
                  <p className="text-sm text-gray-500">Student records and grades</p>
                </div>
              </div>
              <ChevronRight size={24} className="text-gray-400 group-hover:text-gray-600" />
            </button>

            <button className="w-full bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all text-left border border-gray-100 flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-amber-100 flex items-center justify-center">
                  <Calendar size={24} className="text-amber-500" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">Manage Appointments</h4>
                  <p className="text-sm text-gray-500">Schedule and availability</p>
                </div>
              </div>
              <ChevronRight size={24} className="text-gray-400 group-hover:text-gray-600" />
            </button>
          </div>

          {/* Recent Activity */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="pb-4 border-b border-gray-100 last:border-b-0 last:pb-0"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <Users size={20} className="text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">
                        {activity.user}
                      </p>
                      <p className="text-sm text-gray-600">{activity.action}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Upcoming Events</h3>
            <button className="px-6 py-2 text-blue-500 hover:text-blue-600 font-medium">
              View All
            </button>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                  <Calendar size={24} className="text-blue-500" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  {event.title}
                </h4>
                <p className="text-sm text-gray-500 mb-3">{event.date}</p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users size={16} />
                  <span>{event.attendees} attendees</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-blue-500 to-teal-500 rounded-3xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Server Activity</h3>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-blue-100 mb-1">Active Users</p>
              <p className="text-4xl font-bold">342</p>
            </div>
            <div>
              <p className="text-blue-100 mb-1">Server Load</p>
              <p className="text-4xl font-bold">67%</p>
            </div>
            <div>
              <p className="text-blue-100 mb-1">Response Time</p>
              <p className="text-4xl font-bold">45ms</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
