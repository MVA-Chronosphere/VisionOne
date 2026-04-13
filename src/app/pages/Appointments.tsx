import { useState } from "react";
import { Layout } from "../components/Layout";
import { Calendar, Clock, CheckCircle, X, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";

const services = [
  { id: 1, name: "School Counselor", icon: "👥", duration: "30 min", color: "blue", capacity: 1 },
  { id: 2, name: "Library Visit", icon: "📚", duration: "60 min", color: "teal", capacity: 10 },
  { id: 3, name: "Teacher Meeting", icon: "👨‍🏫", duration: "20 min", color: "purple", capacity: 3 },
  { id: 4, name: "Health Check", icon: "🏥", duration: "15 min", color: "green", capacity: 2 },
  { id: 5, name: "Shopee", icon: "🛒", duration: "45 min", color: "orange", capacity: 5 },
  { id: 6, name: "Salon", icon: "💇", duration: "40 min", color: "pink", capacity: 2 },
];

const allTimeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
];

// Mock existing bookings for demonstration
const initialBookingsData = [
  { serviceId: 1, date: "Apr 13, 2026", time: "09:00 AM" },
  { serviceId: 1, date: "Apr 13, 2026", time: "10:00 AM" },
  { serviceId: 6, date: "Apr 13, 2026", time: "02:00 PM" },
  { serviceId: 6, date: "Apr 13, 2026", time: "02:30 PM" },
];

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

export function Appointments() {
  const [myBookings, setMyBookings] = useState([
    {
      id: 1,
      serviceId: 1,
      service: "School Counselor",
      icon: "👥",
      date: "May 19, 2025",
      time: "2:00 PM",
      with: "Ms. Sarah Williams",
      status: "Confirmed",
    },
    {
      id: 2,
      serviceId: 2,
      service: "Library Visit",
      icon: "📚",
      date: "May 22, 2025",
      time: "10:00 AM",
      with: "Library Staff",
      status: "Confirmed",
    },
  ]);

  const [allBookingsData, setAllBookingsData] = useState(initialBookingsData);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState<number | null>(null);

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
  const today = new Date();

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentYear, currentMonth, day);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    // Only allow selecting today or future dates
    if (clickedDate >= todayStart) {
      setSelectedDate(clickedDate);
      setSelectedTime(null); // Reset time when date changes
    }
  };

  const handleServiceSelect = (serviceId: number) => {
    setSelectedService(serviceId);
    setSelectedTime(null); // Reset time when service changes
  };

  const isDateDisabled = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return date < todayStart;
  };

  const isDateSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getFullYear() === currentYear
    );
  };

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  // Check if a time slot has passed (only for today)
  const isTimePassed = (timeSlot: string) => {
    if (!selectedDate) return false;

    const selectedDateStart = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    // Only check for today
    if (selectedDateStart.getTime() !== todayStart.getTime()) return false;

    // Parse time slot
    const [time, period] = timeSlot.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    let hour24 = hours;

    if (period === 'PM' && hours !== 12) {
      hour24 = hours + 12;
    } else if (period === 'AM' && hours === 12) {
      hour24 = 0;
    }

    const slotTime = new Date();
    slotTime.setHours(hour24, minutes, 0, 0);

    return today.getTime() > slotTime.getTime();
  };

  // Check capacity for a specific service/date/time
  const getAvailableCapacity = (serviceId: number, dateStr: string, timeSlot: string) => {
    const service = services.find(s => s.id === serviceId);
    if (!service) return 0;

    const bookingsCount = allBookingsData.filter(
      b => b.serviceId === serviceId && b.date === dateStr && b.time === timeSlot
    ).length;

    return service.capacity - bookingsCount;
  };

  // Check if a time slot is available
  const isTimeSlotAvailable = (timeSlot: string) => {
    if (!selectedService || !selectedDate) return false;

    // Check if time has passed
    if (isTimePassed(timeSlot)) return false;

    // Check capacity
    const dateStr = selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const availableCapacity = getAvailableCapacity(selectedService, dateStr, timeSlot);

    return availableCapacity > 0;
  };

  const handleBooking = () => {
    if (!selectedService || !selectedDate || !selectedTime) return;

    const service = services.find(s => s.id === selectedService);
    const formattedDate = selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const newBooking = {
      id: Date.now(),
      serviceId: selectedService,
      service: service?.name || "",
      icon: service?.icon || "",
      date: formattedDate,
      time: selectedTime,
      with: service?.name === "Library Visit" ? "Library Staff" : "Staff Member",
      status: "Confirmed",
    };

    // Add to user bookings
    setMyBookings([...myBookings, newBooking]);

    // Add to all bookings data for capacity tracking
    setAllBookingsData([
      ...allBookingsData,
      { serviceId: selectedService, date: formattedDate, time: selectedTime }
    ]);

    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      setSelectedService(null);
      setSelectedDate(null);
      setSelectedTime(null);
    }, 2000);
  };

  const handleCancelBooking = (id: number) => {
    const booking = myBookings.find(b => b.id === id);
    if (booking) {
      // Remove from all bookings data
      setAllBookingsData(allBookingsData.filter(
        b => !(b.serviceId === booking.serviceId && b.date === booking.date && b.time === booking.time)
      ));
    }
    setMyBookings(myBookings.filter(b => b.id !== id));
    setShowCancelConfirm(null);
  };

  const isBookingComplete = selectedService && selectedDate && selectedTime;

  // Generate calendar grid
  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null); // Empty cells before month starts
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="mb-2">
          <h2 className="text-4xl font-bold text-gray-800 mb-3">Book Appointment</h2>
          <p className="text-lg text-gray-500">Select service, date, and time to book your appointment</p>
        </div>

        {/* My Bookings */}
        <div>
          <h3 className="text-3xl font-bold text-gray-800 mb-6">My Bookings</h3>
          {myBookings.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
              <Calendar size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No upcoming appointments</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {myBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-teal-100 flex items-center justify-center text-3xl">
                      {booking.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-gray-800 mb-1">
                        {booking.service}
                      </h4>
                      <p className="text-sm text-gray-500 mb-2">with {booking.with}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar size={16} />
                          <span>{booking.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock size={16} />
                          <span>{booking.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="px-6 py-2 bg-green-50 text-green-600 rounded-lg font-medium">
                        {booking.status}
                      </span>
                      <button
                        onClick={() => setShowCancelConfirm(booking.id)}
                        className="px-6 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Booking Flow - Single Screen */}
        <div className="bg-white rounded-3xl p-10 shadow-lg">
          {/* Step 1: Select Service */}
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                1
              </div>
              <h3 className="text-3xl font-bold text-gray-800">Select Service</h3>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleServiceSelect(service.id)}
                  className={`p-8 rounded-3xl border-2 transition-all ${
                    selectedService === service.id
                      ? "border-blue-500 bg-blue-50 shadow-lg"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h4 className="font-bold text-gray-800 mb-2 text-lg">
                    {service.name}
                  </h4>
                  <p className="text-base text-gray-500 mb-1">{service.duration}</p>
                  <p className="text-sm text-blue-600 font-medium">
                    Capacity: {service.capacity} {service.capacity === 1 ? 'spot' : 'spots'}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Select Date - Calendar View */}
          {selectedService && (
            <div className="mb-10 animate-in fade-in duration-300">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <h3 className="text-3xl font-bold text-gray-800">Select Date</h3>
              </div>
              
              <div className="bg-gray-50 rounded-3xl p-8">
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-8">
                  <button
                    onClick={handlePreviousMonth}
                    className="p-3 hover:bg-white rounded-xl transition-colors"
                  >
                    <ChevronLeft size={32} className="text-gray-600" />
                  </button>
                  <h4 className="text-2xl font-bold text-gray-800">
                    {monthNames[currentMonth]} {currentYear}
                  </h4>
                  <button
                    onClick={handleNextMonth}
                    className="p-3 hover:bg-white rounded-xl transition-colors"
                  >
                    <ChevronRight size={32} className="text-gray-600" />
                  </button>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-3">
                  {/* Day headers */}
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="text-center font-bold text-gray-600 py-3 text-base">
                      {day}
                    </div>
                  ))}
                  
                  {/* Calendar days */}
                  {calendarDays.map((day, index) => {
                    if (day === null) {
                      return <div key={`empty-${index}`} className="aspect-square" />;
                    }

                    const disabled = isDateDisabled(day);
                    const selected = isDateSelected(day);
                    const isTodayDate = isToday(day);

                    return (
                      <button
                        key={day}
                        onClick={() => handleDateClick(day)}
                        disabled={disabled}
                        className={`aspect-square rounded-2xl flex items-center justify-center font-semibold text-lg transition-all ${
                          selected
                            ? "bg-teal-500 text-white shadow-lg scale-105"
                            : isTodayDate
                            ? "bg-blue-100 text-blue-600 border-2 border-blue-500"
                            : disabled
                            ? "text-gray-300 cursor-not-allowed"
                            : "hover:bg-white text-gray-700 hover:shadow-md"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 flex items-center gap-6 text-base">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-lg bg-blue-100 border-2 border-blue-500"></div>
                    <span className="text-gray-600 font-medium">Today</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-lg bg-teal-500"></div>
                    <span className="text-gray-600 font-medium">Selected</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Select Time Slot */}
          {selectedService && selectedDate && (
            <div className="mb-10 animate-in fade-in duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <h3 className="text-3xl font-bold text-gray-800">Select Time Slot</h3>
              </div>

              {/* Info Banner */}
              <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-sm text-blue-700">
                  <strong>Note:</strong> Time slots show availability based on current time and service capacity.
                  {(() => {
                    const selectedSvc = services.find(s => s.id === selectedService);
                    return selectedSvc ? ` ${selectedSvc.name} has ${selectedSvc.capacity} ${selectedSvc.capacity === 1 ? 'spot' : 'spots'} per time slot.` : '';
                  })()}
                </p>
              </div>

              <div className="grid grid-cols-4 gap-4">
                {allTimeSlots.map((timeSlot) => {
                  const available = isTimeSlotAvailable(timeSlot);
                  const isPast = isTimePassed(timeSlot);
                  const dateStr = selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                  const availableCapacity = getAvailableCapacity(selectedService, dateStr, timeSlot);

                  return (
                    <button
                      key={timeSlot}
                      onClick={() => available && setSelectedTime(timeSlot)}
                      disabled={!available}
                      className={`p-5 rounded-2xl border-2 transition-all ${
                        selectedTime === timeSlot
                          ? "border-purple-500 bg-purple-50 shadow-lg"
                          : available
                          ? "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                          : "border-gray-100 bg-gray-100 opacity-50 cursor-not-allowed"
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Clock size={20} className={available ? "text-gray-600" : "text-gray-400"} />
                        <span className={`font-semibold text-base ${available ? "text-gray-800" : "text-gray-400"}`}>
                          {timeSlot}
                        </span>
                      </div>
                      {!available && (
                        <p className="text-sm text-red-500 mt-2">
                          {isPast ? "Time Passed" : "Full"}
                        </p>
                      )}
                      {available && availableCapacity > 0 && (
                        <p className="text-xs text-green-600 mt-2">
                          {availableCapacity} spot{availableCapacity > 1 ? 's' : ''} left
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Confirm Button */}
          {isBookingComplete && (
            <div className="pt-8 border-t border-gray-200 animate-in fade-in duration-300">
              <button
                onClick={handleBooking}
                className="w-full py-6 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-2xl font-bold text-2xl hover:from-green-600 hover:to-teal-600 transition-all shadow-lg hover:shadow-xl"
              >
                Confirm Booking
              </button>
            </div>
          )}
        </div>

        {/* Success Modal */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-12 text-center shadow-2xl max-w-md">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={60} className="text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Appointment Booked!
              </h3>
              <p className="text-gray-600">
                Your appointment has been confirmed successfully.
              </p>
            </div>
          </div>
        )}

        {/* Cancel Confirmation Modal */}
        {showCancelConfirm !== null && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 max-w-md mx-4 shadow-2xl">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle size={32} className="text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                Cancel Appointment?
              </h3>
              <p className="text-gray-600 mb-8 text-center">
                Are you sure you want to cancel this appointment? This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowCancelConfirm(null)}
                  className="flex-1 px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  Keep Appointment
                </button>
                <button
                  onClick={() => handleCancelBooking(showCancelConfirm)}
                  className="flex-1 px-6 py-4 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors shadow-md"
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}