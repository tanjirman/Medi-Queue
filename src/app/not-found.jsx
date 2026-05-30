import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-7xl font-black text-red-500">
        404
      </h1>

      <h2 className="text-3xl font-bold mt-4">
        Page Not Found
      </h2>

      <p className="text-default-500 mt-2">
        The page you are looking for does not
        exist.
      </p>

      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-cyan-500 text-white rounded-xl font-bold"
      >
        Go Home
      </Link>
    </div>
  );
}