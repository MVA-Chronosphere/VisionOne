import { useState } from "react";
import { Layout } from "../components/Layout";
import { MdCalendarToday, MdAccessTime, MdCheckCircle, MdWarning, MdChevronLeft, MdChevronRight, MdPeople, MdMenuBook, MdSchool, MdFavorite, MdShoppingCart, MdContentCut } from 'react-icons/md';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const services = [
  { id: 1, name: "School Counselor", duration: "30 min", color: "blue", capacity: 1 },
  { id: 2, name: "Library Visit", duration: "60 min", color: "teal", capacity: 10 },
  { id: 3, name: "Teacher Meeting", duration: "20 min", color: "purple", capacity: 3 },
  { id: 4, name: "Health Check", duration: "15 min", color: "green", capacity: 2 },
  { id: 5, name: "Shopee", duration: "45 min", color: "orange", capacity: 5 },
  { id: 6, name: "Salon", duration: "40 min", color: "pink", capacity: 2 },
];

const iconMap = {
  1: MdPeople,
  2: MdMenuBook,
  3: MdSchool,
  4: MdFavorite,
  5: MdShoppingCart,
  6: MdContentCut,
};

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

export function Appointments() {
  const [myBookings, setMyBookings] = useState([
    {
      id: 1,
      serviceId: 1,
      service: "School Counselor",
      iconId: 1,
      date: "May 19, 2025",
      time: "2:00 PM",
      with: "Ms. Sarah Williams",
      status: "Confirmed",
    },
    {
      id: 2,
      serviceId: 2,
      service: "Library Visit",
      iconId: 2,
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

  const today = new Date();

  const handleServiceSelect = (serviceId: number) => {
    setSelectedService(serviceId);
    setSelectedTime(null); // Reset time when service changes
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
      iconId: selectedService,
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
            <div className="bg-white rounded-md p-12 text-center shadow-sm">
              <MdCalendarToday size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No upcoming appointments</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {myBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white rounded-md p-6 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-md bg-blue-600 flex items-center justify-center text-3xl">
                      {(() => { const Icon = iconMap[booking.iconId]; return <Icon size={32} className="text-white" />; })()}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-gray-800 mb-1">
                        {booking.service}
                      </h4>
                      <p className="text-sm text-gray-500 mb-2">with {booking.with}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <MdCalendarToday size={16} />
                          <span>{booking.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <MdAccessTime size={16} />
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
        <div className="bg-white rounded-md p-10 shadow-lg">
          {/* Step 1: Select Service */}
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                1
              </div>
              <h3 className="text-3xl font-bold text-gray-800">Select Service</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleServiceSelect(service.id)}
                  className={`p-8 rounded-md border-2 transition-all ${
                    selectedService === service.id
                      ? "border-blue-500 bg-blue-50 shadow-lg"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="w-16 h-16 bg-blue-600 rounded-md flex items-center justify-center mx-auto mb-4">
                    {(() => { const Icon = iconMap[service.id]; return <Icon size={32} className="text-white" />; })()}
                  </div>
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
              
              <div className="bg-gray-50 rounded-md p-8">
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    setSelectedDate(date || null);
                    setSelectedTime(null); // Reset time when date changes
                  }}
                  disabled={{ before: new Date() }}
                  className="react-day-picker-custom"
                />
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
              <div className="mb-6 p-4 bg-blue-50 rounded-md border border-blue-200">
                <p className="text-sm text-blue-700">
                  <strong>Note:</strong> Time slots show availability based on current time and service capacity.
                  {(() => {
                    const selectedSvc = services.find(s => s.id === selectedService);
                    return selectedSvc ? ` ${selectedSvc.name} has ${selectedSvc.capacity} ${selectedSvc.capacity === 1 ? 'spot' : 'spots'} per time slot.` : '';
                  })()}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
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
                      className={`p-5 rounded-md border-2 transition-all ${
                        selectedTime === timeSlot
                          ? "border-purple-500 bg-purple-50 shadow-lg"
                          : available
                          ? "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                          : "border-gray-100 bg-gray-100 opacity-50 cursor-not-allowed"
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <MdAccessTime size={20} className={available ? "text-gray-600" : "text-gray-400"} />
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
                className="w-full py-6 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-md font-bold text-2xl hover:from-green-600 hover:to-teal-600 transition-all shadow-lg hover:shadow-xl"
              >
                Confirm Booking
              </button>
            </div>
          )}
        </div>

        {/* Success Modal */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-md p-12 text-center shadow-2xl max-w-md">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MdCheckCircle size={60} className="text-green-500" />
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
            <div className="bg-white rounded-md p-8 max-w-md mx-4 shadow-2xl">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MdWarning size={32} className="text-red-600" />
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
                  className="flex-1 px-6 py-4 bg-gray-100 text-gray-700 rounded-md font-medium hover:bg-gray-200 transition-colors"
                >
                  Keep Appointment
                </button>
                <button
                  onClick={() => handleCancelBooking(showCancelConfirm)}
                  className="flex-1 px-6 py-4 bg-red-500 text-white rounded-md font-medium hover:bg-red-600 transition-colors shadow-md"
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