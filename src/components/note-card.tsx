import { togglePinnedStatus } from "@/lib/actions/note";
import { Pin, PinOff, Square, SquareCheck } from "lucide-react";
import Link from "next/link";
import NoteMoreMenu from "./note-more-menu";

const LIST_LENGTH = 5;

export default function NoteCard({ note }: { note: Note }) {
  console.log("render: NOTE CARD");

  const formatOfNoteItems = (content: NoteItem[]) => {
    const notesInProcess = content.filter((item) => !item.isDone);
    const completedNotes = content.filter((item) => item.isDone);

    if (notesInProcess.length >= LIST_LENGTH)
      return [notesInProcess.slice(0, LIST_LENGTH), []];

    return [
      notesInProcess,
      completedNotes.slice(0, LIST_LENGTH - notesInProcess.length),
    ];
  };
  const [activeNotes, completedNotes] = formatOfNoteItems(note.content);

  return (
    <>
      <div className="relative shadow-xl p-4 rounded-md w-full select-none border-2 border-gray-300">
        {/*---------------------*/}
        <div className="absolute top-4 right-4">
          <form action={togglePinnedStatus.bind(null, note.id)}>
            <button className="p-1 rounded-full outline-none hover:bg-gray-300">
              {note.isPinned ? <PinOff size={20} /> : <Pin size={20} />}
            </button>
          </form>
        </div>
        {/*---------------------*/}
        <Link href={`/notes/${note.id}`}>
          <div className="">
            <div className="float-right w-7 h-7"></div>
            <h1 className="text-xl break-words">{note.title}</h1>
          </div>

          <div className="mt-3">
            {note.type === "TODO" ? (
              <>
                <div className="flex flex-col gap-2">
                  {activeNotes.map((item) => (
                    <div key={item.id} className="flex items-center gap-2">
                      <div>
                        <Square size={20} />
                      </div>
                      <span className="break-all">{item.content}</span>
                    </div>
                  ))}
                </div>
                {completedNotes.length > 0 ? (
                  <div className="mt-4 text-gray-500">
                    <h3 className="text-sm mb-1">Completed:</h3>
                    {completedNotes.map((item) => (
                      <div key={item.id} className="flex items-center gap-2">
                        <div>
                          <SquareCheck size={20} />
                        </div>
                        <span className="line-through break-all">
                          {item.content}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : null}
              </>
            ) : (
              <div className="flex flex-col gap-2 ">
                {note.content.map((item) => (
                  <span key={item.id} className="break-all">
                    {item.content}
                  </span>
                ))}
              </div>
            )}
            {note.content.length > LIST_LENGTH ? <div>...</div> : null}
          </div>
          <div className="h-[60px]"></div>
        </Link>

        {/* <div>
          {note.labels.map((label) => (
            <div key={label.id}>{label.name}</div>
          ))}
        </div> */}

        <div className="absolute right-0 bottom-0 flex items-center justify-end p-4 ">
          <NoteMoreMenu noteId={note.id} />
        </div>
      </div>
    </>
  );
}
