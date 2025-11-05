export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center from-indigo-50 via-white to-indigo-100 text-center px-6">
      {/* Hero Content */}
      <h1 className="text-6xl font-extrabold text-indigo-700 mb-6 tracking-tight">
        SlotSwapper
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl mb-10">
        Trade your calendar slots effortlessly. Save time, stay flexible, and keep your schedule under control.
      </p>

      {/* Call to Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-5">
        <a
          href="/login"
          className="px-8 py-3 rounded-full bg-indigo-600 text-white font-semibold shadow-lg hover:scale-105 hover:bg-indigo-700 transition-transform duration-200"
        >
          Login
        </a>
        <a
          href="/signup"
          className="px-8 py-3 rounded-full bg-white border-2 border-indigo-600 text-indigo-600 font-semibold shadow-md hover:bg-indigo-50 hover:scale-105 transition-transform duration-200"
        >
          Create Account
        </a>
      </div>
    </div>
  );
}
