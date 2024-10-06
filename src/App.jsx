
import{lazy, Suspense } from "react";



const Location  = lazy(()=> import("./Location"))

const App = () => {
  return (
    <div>
      <h1>Location Section ..</h1>
   <Suspense fallback={<div>Loading Loading</div>}>
   <Location />
   </Suspense>
    </div>
  );
};

export default App;
