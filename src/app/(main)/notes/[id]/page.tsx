import NoteView from "@/components/note-view/note-view";

export default async function NotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <>
      <NoteView noteId={id} />
    </>
  );
}
