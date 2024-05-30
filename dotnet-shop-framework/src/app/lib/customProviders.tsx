"use client";

import { store } from "../../Redux/store";
import { Provider } from "react-redux";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const CustomProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <AntdRegistry>{children}</AntdRegistry>
    </Provider>
  );
}

export default CustomProviders;

// "use client";

// import { useEffect } from "react";
// import { store } from "../../Redux/store";
// import { Provider } from "react-redux";
// import { AntdRegistry } from "@ant-design/nextjs-registry";

// const CustomProviders = ({ children }: { children: React.ReactNode }) => {

//   useEffect(() => {
//     // Function to disable right-click context menu
//     const disableContextMenu = (e: MouseEvent) => {
//       e.preventDefault();
//     };

//     // Function to disable F12, Ctrl+Shift+I, Ctrl+Shift+J, and Ctrl+U
//     const disableInspect = (e: KeyboardEvent) => {
//       if (
//         (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) || // Ctrl+Shift+I and Ctrl+Shift+J
//         (e.key === 'F12') || // F12
//         (e.ctrlKey && e.key === 'U') // Ctrl+U
//       ) {
//         e.preventDefault();
//       }
//     };

//     // Add event listeners
//     document.addEventListener('contextmenu', disableContextMenu);
//     document.addEventListener('keydown', disableInspect);

//     // Cleanup event listeners on component unmount
//     return () => {
//       document.removeEventListener('contextmenu', disableContextMenu);
//       document.removeEventListener('keydown', disableInspect);
//     };
//   }, []);

//   return (
//     <Provider store={store}>
//       <AntdRegistry>{children}</AntdRegistry>
//     </Provider>
//   );
// }

// export default CustomProviders;
