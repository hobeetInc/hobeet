const Skeleton = ({ className }: { className?: string }) => {
  return <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`} />;
};

export default Skeleton;
