"use client";

import { createLabel, getLabels } from "@/lib/actions/label";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import CreateLabelBtn from "./create-label-btn";
import FormInput from "@/components/UI/formElements/form-input";

interface CreateLabelProps {
  customRef: React.Ref<HTMLInputElement | null>;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function CreateLabel({
  customRef,
  searchValue,
  setSearchValue,
}: CreateLabelProps) {
  const { data: labels } = useQuery({
    queryKey: [`labels`],
    queryFn: () => getLabels(),
  });

  const queryClient = useQueryClient();

  const handleCreateLabel = async (formData: FormData) => {
    await createLabel(formData);
    await queryClient.invalidateQueries({
      queryKey: ["labels"],
    });
    setSearchValue("");
  };

  if (!labels || labels.length === 0) return null;

  const sortedLabels = labels.filter((label) =>
    label.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <div className="px-2 py-2 flex flex-col mt-2">
      <form action={handleCreateLabel}>
        <FormInput
          // ref={customRef}
          customRef={customRef}
          type="text"
          name="label"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="label..."
          className="w-full shadow-inside px-4 py-2 rounded-2xl outline-none text-txt-primary"
        />
        {sortedLabels.length === 1 &&
        sortedLabels[0].name === searchValue.toLowerCase() ? null : (
          <CreateLabelBtn />
        )}
      </form>
    </div>
  );
}
