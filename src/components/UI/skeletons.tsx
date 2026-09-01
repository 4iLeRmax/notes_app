const UserIconSkeleton = () => {
  return (
    <div
      className="w-[41px] h-[41px] bg-secondary shadow-outside rounded-full animate-pulse"
      data-testid="user-skeleton"
    ></div>
  );
};

const LabelsIconSkeleton = () => {
  return (
    <div className="w-full px-4">
      <div className="w-full h-[41px] rounded-3xl shadow-outside-small bg-secondary animate-pulse"></div>
    </div>
  );
};

const ThemeIconSkeleton = () => {
  return (
    <div className="w-[41px] h-[41px] rounded-full shadow-outside-small bg-secondary animate-pulse"></div>
  );
};

const CreateNoteSkeleton = () => {
  return (
    <>
      <div className="w-full sm:max-w-120 h-20 rounded-4xl bg-secondary shadow-outside animate-pulse"></div>
    </>
  );
};

const NoteCardSkeleton = ({ height }: { height: number }) => {
  return (
    <div
      style={{
        height: `${height}px`,
      }}
      className="break-inside-avoid w-full lg:w-[250px] mb-2 xs:mb-5 bg-secondary rounded-xl sm:rounded-3xl shadow-outside animate-pulse"
    ></div>
  );
};

const NotesGroupSkeleton = () => {
  const blocksHeights = [450, 500, 280, 200, 300, 270, 400, 400, 420, 330];

  return (
    <div className="columns-2 md:columns-3 xl:columns-4 3xl:columns-5! gap-2 xs:gap-5 h-full">
      {blocksHeights.map((height, index) => (
        <NoteCardSkeleton key={index} height={height} />
      ))}
    </div>
  );
};

const NotesDisplaySkeleton = () => {
  return (
    <div className="flex flex-col lg:items-center gap-3 w-full mt-10 h-full">
      <div className="flex items-center justify-center">
        <div className="w-25 h-6 rounded-3xl bg-secondary shadow-outside"></div>
      </div>
      <NotesGroupSkeleton />
    </div>
  );
};

const NoteViewSkeleton = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full md:w-150 bg-secondary shadow-outside-small rounded-4xl pt-15 pb-4 px-8">
        <div className="flex items-center">
          <div className="w-9 h-9 rounded-full shadow-outside-small bg-primary animate-pulse"></div>
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <div className="w-full h-16 rounded-4xl shadow-outside-small bg-primary animate-pulse"></div>
          <div className="w-full h-16 rounded-4xl shadow-outside-small bg-primary animate-pulse"></div>
          <div className="w-full h-16 rounded-4xl shadow-outside-small bg-primary animate-pulse"></div>
          <div className="w-full h-16 rounded-4xl shadow-outside-small bg-primary animate-pulse"></div>
          <div className="w-full h-16 rounded-4xl shadow-outside-small bg-primary animate-pulse"></div>
        </div>

        <div className="flex items-center justify-end mt-10">
          <div className="w-8 h-8 rounded-full shadow-outside-small bg-primary animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export {
  UserIconSkeleton,
  LabelsIconSkeleton,
  ThemeIconSkeleton,
  CreateNoteSkeleton,
  NotesDisplaySkeleton,
  NoteViewSkeleton,
  NotesGroupSkeleton,
};
