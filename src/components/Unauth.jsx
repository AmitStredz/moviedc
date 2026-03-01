export default function Unauth() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-red-500">401</h1>
        <h2 className="mt-4 text-2xl font-semibold">Access Denied</h2>
        <h3 className="mt-4 text-lg text-slate-50/70">Please sign in to access this page.</h3>
        <button
          className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="button"
          onClick={() => {window.location.href = '/sign-in';}}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
