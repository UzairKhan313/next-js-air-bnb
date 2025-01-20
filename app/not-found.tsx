import React, { Suspense } from "react";

const NotFoundPage = () => {
  return (
    <Suspense fallback={<div>Loading....</div>}>
      <div>NotFoundPage</div>
    </Suspense>
  );
};

export default NotFoundPage;
