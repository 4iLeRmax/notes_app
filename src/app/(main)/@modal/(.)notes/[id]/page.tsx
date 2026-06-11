import NoteView from "@/components/note-view/note-view";

export default async function InterceptRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <NoteView noteId={id} modal />
    </>
  );
}
