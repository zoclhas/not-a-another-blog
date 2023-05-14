import "@/styles/main.scss";

import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

import { Provider } from "react-redux";
import { wrapper } from "@/redux/store";

import { Header } from "@/components/header/header";

export default function App({ Component, pageProps, ...rest }: AppProps) {
    const { store, props } = wrapper.useWrappedStore(rest);

    return (
        <Provider store={store}>
            <ThemeProvider defaultTheme="system" attribute="class">
                <Header />
                <main className="h-[200vh]">
                    <Component {...pageProps} />
                </main>
            </ThemeProvider>
        </Provider>
    );
}
