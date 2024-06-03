import { useResume } from "hooks/useResume";

// --------------
// Components
// --------------
import Loader from "components/ui/Loader";
import Carousel from "./Carousel";
import { Suspense, useDeferredValue } from "react";
import LoaderSuspense from "components/ui/LoaderSuspense";

export default function CarouselResume() {
  const { userResumeList, isLoading: isResumeLoading } = useResume();
  const deferredUserResumeList = useDeferredValue(userResumeList);

  return (
    <>
      {isResumeLoading ? (
        <Loader />
      ) : (
        deferredUserResumeList?.resumes &&
        deferredUserResumeList.resumes.length > 0 && (
          <Suspense fallback={<LoaderSuspense />}>
            <Carousel resumes={deferredUserResumeList.resumes} />
          </Suspense>
        )
      )}
      {isResumeLoading ? (
        <Loader />
      ) : (
        deferredUserResumeList?.watchAgain &&
        deferredUserResumeList.watchAgain.length > 0 && (
          <Suspense fallback={<LoaderSuspense />}>
            <Carousel resumes={deferredUserResumeList.watchAgain} />
          </Suspense>
        )
      )}
    </>
  );
}
