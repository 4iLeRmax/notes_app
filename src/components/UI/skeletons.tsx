const UserIconSkeleton = () => {
  return (
    <div className="w-[41px] h-[41px] bg-secondary shadow-outside rounded-full animate-pulse"></div>
  );
};

const LabelsIconSkeleton = () => {
  return (
    <div className="w-full px-4">
      <div className="w-full h-[41px] rounded-3xl shadow-outside-small bg-secondary animate-pulse"></div>
    </div>
  );
};

const NoteCardSkeleton = () => {
  return (
    <div
      style={{
        height: `${Math.floor(Math.random() * (500 - 200 + 1)) + 200}px`,
      }}
      className="break-inside-avoid w-full lg:w-[250px] mb-2 xs:mb-5 bg-secondary rounded-xl sm:rounded-3xl shadow-outside animate-pulse"
    ></div>
  );
};

const NoteGroupSkeleton = () => {
  return (
    <div className="columns-2 md:columns-3 xl:columns-4 3xl:columns-5! gap-2 xs:gap-5 h-full">
      {Array(10)
        .fill(0)
        .map((_, index) => (
          <NoteCardSkeleton key={index} />
        ))}
    </div>
  );
};

const NoteDisplaySkeleton = () => {
  return (
    <div className="flex flex-col lg:items-center gap-3 w-full mt-10 h-full">
      <div className="flex items-center justify-center">
        <div className="w-25 h-6 rounded-3xl bg-secondary shadow-outside"></div>
      </div>
      <NoteGroupSkeleton />
    </div>
  );
};

export { UserIconSkeleton, LabelsIconSkeleton, NoteDisplaySkeleton };
