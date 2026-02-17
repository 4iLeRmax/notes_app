// import CreateNote from "@/components/create-note";
// import NotePreview from "@/components/note-preview";
// import { SignOutAction } from "@/lib/actions/auth";
// import { getAllNotes } from "@/lib/actions/note";
// import { auth } from "@/lib/auth";
// import { headers } from "next/headers";

// export default async function HomePage() {
//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });
//   if (!session) return null;

//   const notes = await getAllNotes();
//   if (!notes) return null;

//   const pinnedNotes = notes.filter((note) => note.isPinned);
//   const regularNotes = notes.filter((note) => !note.isPinned);

//   return (
//     <>
//       <div>
//         {session ? (
//           <div>
//             <div>
//               <h1>{session.user.email}</h1>
//               <p>{session.user.name}</p>
//             </div>
//             <form action={SignOutAction}>
//               <button>Log Out</button>
//             </form>
//           </div>
//         ) : null}
//         <CreateNote />
//         {pinnedNotes.length > 0 ? (
//           <div className="flex flex-col items-center justify-center mt-10">
//             <h1 className="text-gray-400 mb-2">Pinned Notes</h1>
//             <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 gap-5">
//               {pinnedNotes.map((note) => (
//                 <div key={note.id} className="break-inside-avoid mb-5 ">
//                   <NotePreview note={note} />
//                 </div>
//               ))}
//             </div>
//           </div>
//         ) : null}

//         <div className="flex flex-col items-center justify-center mt-10">
//           {pinnedNotes.length > 0 ? (
//             <h1 className="text-gray-400 mb-2">Other Notes</h1>
//           ) : null}
//           <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 gap-5">
//             {regularNotes.map((note) => (
//               <div key={note.id} className="break-inside-avoid mb-5 ">
//                 <NotePreview note={note} />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import Link from "next/link";
import React from "react";

export default function HomePage() {
  return <Link href="/notes">Notes</Link>;
}
