export const Fallback: React.FC = () => {
  return (
    <div className="h-full flex items-center justify-center text-gray-500 bg-black">
      <div className="text-center">
        <p className="text-white text-xl mb-2">Something went wrong</p>
        <p className="text-gray-400">Please refresh the page and try again.</p>
      </div>
    </div>
  );
};
