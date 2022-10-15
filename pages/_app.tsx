import "../styles/globals.css";
import type { AppProps } from "next/app";
import { authentication, db } from "../firebase";
import { Provider } from "react-redux";
import { store } from "../App/store";
import AuthMiddleWare from "../components/AuthMiddleWare";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

// Create a client
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthMiddleWare>
          <Component {...pageProps} />
        </AuthMiddleWare>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
