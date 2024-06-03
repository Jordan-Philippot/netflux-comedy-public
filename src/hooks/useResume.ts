import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { addResume, getUserResumeList } from "api/resume";
import { ResumeType } from "api/resume.type";

interface ResumeHook {
  userResumeList:
    | { resumes: ResumeType[]; watchAgain: ResumeType[] }
    | null;
  addResume: (videoId: string, resumeTime: number) => void;
  isLoading: boolean;
}

export function useResume(): ResumeHook {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const shouldFetchUserResume = user !== null;

  const { data, isLoading } = useQuery({
    queryKey: ["userResumeList"],
    queryFn: shouldFetchUserResume
      ? getUserResumeList
      : () => Promise.resolve(null),
  });

  const mutationUserLike = useMutation({
    mutationFn: getUserResumeList,
    mutationKey: ["userResumeList"],
    onSuccess: async () => {
      if (user) {
        await queryClient.invalidateQueries({ queryKey: ["userResumeList"] });
        const initialDataQuery = await queryClient.getQueryData([
          "userResumeList",
        ]);
        await queryClient.setQueryData(["userResumeList"], initialDataQuery);
      }
    },
    onError: () => {
      queryClient.removeQueries({ queryKey: ["userResumeList"] });
    },
  });

  const handleAddResume = async (videoId: string, resumeTime: number) => {
    try {
      const response = await addResume(videoId, resumeTime);
      if (response) {
        mutationUserLike.mutate();
      }
    } catch (error) {
      console.log("Resume not added");
    }
  };

  return {
    userResumeList: data ?? null,
    addResume: handleAddResume,
    isLoading: isLoading,
  };
}
