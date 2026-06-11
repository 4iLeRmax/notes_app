"use client";

import FormInput from "@/components/UI/formElements/form-input";
import { useNotesStore } from "@/lib/store/useNotesStore";
import { authClient } from "@/lib/auth-client";
import CreateLabelBtn from "@/components/aside/edit-labels/UI/create-label-btn";
import { LABEL_LIMITS } from "@/lib/constants";

interface CreateLabelProps {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function CreateLabel({
  searchValue,
  setSearchValue,
}: CreateLabelProps) {
  const labels = useNotesStore((s) => s.labels);
  const addLabel = useNotesStore((s) => s.addLabel);
  if (!labels) return null;

  const session = authClient.useSession();
  if (!session.data) return null;
  const userId = session.data.session.userId;

  const handleCreateLabel = async () => {
    await addLabel(searchValue, userId);
    setSearchValue("");
  };

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value.slice(0, LABEL_LIMITS.MAX_LABEL_NAME_CHARS));
  };

  const sortedLabels = labels.filter((label) =>
    label.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const exactMatchOfSearch = sortedLabels.some(
    (l) => l.name.toLowerCase() === searchValue.toLowerCase(),
  );

  return (
    <div className="px-2 py-2 mt-2">
      <div className="flex flex-col gap-2">
        <FormInput
          // ref={customRef}
          autoFocus
          type="text"
          name="label"
          value={searchValue}
          onChange={handleChangeValue}
          placeholder="label..."
          className="w-full shadow-inside px-4 py-2 rounded-2xl outline-none text-txt-primary"
        />
        <CreateLabelBtn
          onClick={handleCreateLabel}
          disabled={exactMatchOfSearch}
        />
      </div>
    </div>
  );
}
