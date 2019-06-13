Boilerplate POC using latest React goodies like Context, Hooks, Suspense, and Lazy. Goal is to get a feel for using Context as a replacement for redux for global state management and useState hooks for component-level state. It uses Suspense and Lazy to automatically code-split the main app bundle from the initial loading bootstrapper and then further split out each top-level Route component. The current User is asynchronously fetched as part of the initial load so there is just a single uninterrupted loading indicator that displays while both fetching bundles and required global context data (rather than a glitchy transition from one loader to another). Only non-React dependency is Reach router.

See it live at:
https://codesandbox.io/s/github/dvonlehman/react-modern-boilerplate

Inspiration taken from:

- https://codesandbox.io/s/jn1z75mx4y
- https://kentcdodds.com/blog/application-state-management-with-react
